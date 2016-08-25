#!/usr/bin/env python

'''
Change my world now deploy script
=================================

Packages up the compiled code and deploys to AWS S3
using the Boto library.

NOTE: This script assumes it is being executed where the environment
variables needed for Boto have already been set:
    export AWS_ACCESS_KEY_ID='AK123'
    export AWS_SECRET_ACCESS_KEY='abc123'

or using aws configure
    export AWS_ACCESS_KEY_ID=`aws configure get aws_access_key_id`
    export AWS_SECRET_ACCESS_KEY=`aws configure get aws_secret_access_key`

You will also need the bucke name to be set.  You will also need to
configure the S3 bucket you whish to deploy to:
    export CMWN_GAMES_AWS_BUCKET='<bucket-name>'

'''

import logging  # logging
import os  # Operating system functions
import argparse  # parse args from the command line
import boto.s3  # Aws API
import subprocess  # makes system calls
import hashlib  # used to compare files
from boto.s3.key import Key
import boto.s3.connection

try:
    import colorlog  # makes the logs nice and colorful in the console

    have_colorlog = True
except ImportError:
    have_colorlog = False


# Creates a logger that is used for output
def mk_logger():
    log = logging.getLogger(__name__)
    log.setLevel(logging.DEBUG)
    color_format = '%(log_color)s' + '%(message)s'
    ch = logging.StreamHandler()
    ch.setFormatter(logging.Formatter(format))
    if have_colorlog & os.isatty(2):
        cf = colorlog.ColoredFormatter(color_format,
                                       log_colors={'DEBUG': 'reset', 'INFO': 'bold_blue',
                                                   'WARNING': 'yellow', 'ERROR': 'bold_red',
                                                   'CRITICAL': 'bold_red'})
        ch.setFormatter(cf)

    log.addHandler(ch)
    return log


# initiate logger
logger = mk_logger()
logger.setLevel(logging.INFO)

# load in arguments
parser = argparse.ArgumentParser(description='Deploys skribble to to environment', prog='deploy')
parser.add_argument('-v', '--verbose', help='Turn on debugging logging', action='store_true')
parser.add_argument('-P', '--prune', help='Remove files from s3 that are not local', action='store_true')
parser.add_argument('-f', '--force', help='Force deploy even if file has not changed', action='store_true')

args = parser.parse_args()

VERBOSE = args.verbose
PRUNE = args.prune
FORCE = args.force

if VERBOSE:
    logger.setLevel(logging.DEBUG)
    logger.debug('Turning on debug')

# Fill these in - you get them when you sign up for S3
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', failobj=False)
AWS_ACCESS_KEY_SECRET = os.environ.get('AWS_SECRET_ACCESS_KEY', failobj=False)

# destination bucket name
BUCKET_NAME = os.environ.get('CMWN_GAMES_AWS_BUCKET', failobj=False)

# source directory
SOURCE_DIR = os.getcwd() + '/'

# max size in bytes before uploading in parts. between 1 and 5 GB recommended
MAX_SIZE = 20 * 1000 * 1000

# size of parts when uploading in parts
PART_SIZE = 6 * 1000 * 1000

# set the destination directory to be the current branch name
current_branch_cmd = subprocess.Popen(['git', 'branch', '-q'],
                                      stdout=subprocess.PIPE,
                                      stderr=subprocess.PIPE)

current_branch_status = current_branch_cmd.wait()
logger.debug('git branch status: %s' % current_branch_status)
if current_branch_status != 0:
    logger.critical('Cannot get the active branch!')
    exit(1)

current_branch = None
for branch_line in current_branch_cmd.stdout:
    if branch_line.startswith('*'):
        current_branch = branch_line.split('*')[1].strip()
        break

logger.debug('git branch name: %s' % current_branch)
if current_branch is None:
    logger.critical('git branch did not return active branch')
    exit(1)

allowed_environments = {
    'rc': 'staging',
    'master': 'qa',
    'production': 'production',
    'demo': 'demo'
}

if current_branch not in allowed_environments:
    logger.critical('The branch %s is not allowed to be deployed' % current_branch)
    exit(1)


DEST_DIR = allowed_environments[current_branch]
logger.info('Starting to deploy to: {}'.format(DEST_DIR))
logger.info('Deploying to bucket: {}'.format(BUCKET_NAME))

thingsOK = True
if BUCKET_NAME is False:
    logger.critical('Bucket is not set! Run: export CMWN_GAMES_AWS_BUCKET=\'<bucket-name>\'')
    thingsOK = False

if AWS_ACCESS_KEY_ID is False:
    logger.critical('AWS Access Key is not set! Run: export AWS_ACCESS_KEY_ID=`aws configure get aws_access_key_id`')
    thingsOK = False

if AWS_ACCESS_KEY_SECRET is False:
    logger.critical(
        'AWS Access Secret is not set! Run: export AWS_SECRET_ACCESS_KEY=`aws configure get aws_secret_access_key`')
    thingsOK = False

if thingsOK is False:
    logger.critical('Unable to deploy')
    exit(1)

filesToUpload = []

logger.debug('Connecting to Amazon')
conn = boto.connect_s3(AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY_SECRET)

logger.debug('Opening bucket')
S3_BUCKET = conn.create_bucket(BUCKET_NAME, location=boto.s3.connection.Location.DEFAULT)
bucket_path = os.path.join(DEST_DIR)
logger.debug('Bucket path: %s' % bucket_path)


# Gets the md5 of a file
def get_md5(filename):
    f = open(filename, 'rb')
    m = hashlib.md5()
    while True:
        data = f.read(10240)
        if len(data) == 0:
            break
        m.update(data)
    return m.hexdigest()


# checks if the file has changed
def compare_file_to_s3(local_file):
    if FORCE is True:
        return True

    remote_file = os.path.join(bucket_path, local_file)
    remote_key = S3_BUCKET.get_key(remote_file)
    if remote_key is None:
        logger.debug('%s has not been deployed yet' % local_file)
        return True

    local_hash = get_md5(local_file)
    remote_hash = remote_key.etag
    logger.debug('local hash: %s' % local_hash)
    logger.debug('remote hash: %s' % remote_hash)
    return local_hash == remote_hash


def filter_file(filter_file_name, path):
    check_file = os.path.join(path, filter_file_name)
    if check_file.startswith('.git'):
        return

    logger.debug('Checking file %s' % check_file)
    check_ignore = subprocess.Popen(['git', 'ls-files', '--error-unmatch', '--exclude-standard', str(check_file)],
                                    stdout=subprocess.PIPE,
                                    stderr=subprocess.PIPE)
    check_ignore_status = check_ignore.wait()
    if check_ignore_status is not 0:
        logger.warn('File %s is ignored by git' % check_file)
        return

    local_changed = compare_file_to_s3(check_file)
    if local_changed is False:
        logger.debug('File %s has not changed on s3' % check_file)
        return

    logger.debug('Adding file %s' % check_file)
    return check_file


# uploads a file to s3
def push_to_s3(source_file):
    soure_file_path = os.path.splitext(source_file)[0]
    dest_file = os.path.join(bucket_path, soure_file_path) + os.path.splitext(source_file)[1]
    logger.info('Uploading %s to %s' % (source_file, dest_file))

    file_size = os.path.getsize(source_file)
    if file_size > MAX_SIZE:
        logger.debug('multipart upload for %s' % source_file)
        mp = S3_BUCKET.initiate_multipart_upload(dest_file)
        fp = open(source_file, 'rb')
        fp_num = 0
        while fp.tell() < file_size:
            fp_num += 1
            logger.debug('uploading part %i' % fp_num)
            mp.upload_part_from_file(fp, fp_num, size=PART_SIZE)

        mp.complete_upload()

    else:
        logger.debug('single part upload')
        k = boto.s3.key.Key(S3_BUCKET)
        k.key = dest_file
        k.set_contents_from_filename(source_file)

    # set the file to be public
    logger.debug('Setting file %s to be open' % dest_file)
    S3_BUCKET.set_acl('public-read', dest_file)


def prune_files():
    if PRUNE is False:
        logger.debug('Not pruning')
        return

    logger.info('Pruning files on s3')
    s3_files_to_remove = []
    for key in S3_BUCKET.list(prefix=DEST_DIR + '/'):
        s3_file_name = key.name.replace(DEST_DIR + '/', '')
        if os.path.isfile(s3_file_name) is False:
            logger.warn('Adding %s to be removed' % s3_file_name)
            s3_files_to_remove.append(key.name)

    if len(s3_files_to_remove) < 1:
        logger.info('No files to remove on s3')
        return

    s3_delete_result = S3_BUCKET.delete_keys(s3_files_to_remove, quiet=True)
    if len(s3_delete_result.errors) < 1:
        logger.info('Successfully removed files from bucket')
        return

    for s3_delete_error in s3_delete_result.errors:
        logger.error(s3_delete_error)

    exit(128)


logger.info('Building file list')
for realDir, dirName, fileNames in os.walk(SOURCE_DIR, topdown=True):
    baseDir = realDir.replace(SOURCE_DIR, "")
    test = [filter_file(file_name, baseDir) for file_name in fileNames]
    filesToUpload += filter(lambda v: v is not None, test)

logger.info('Uploading Amazon S3 bucket %s' % BUCKET_NAME)

for fileName in filesToUpload:
    push_to_s3(fileName)

prune_files()
logger.info('Deploy complete')
