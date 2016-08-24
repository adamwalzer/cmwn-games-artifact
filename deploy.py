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
    export CMWN_GAMES_AWS_BUCKET='cmwn-games'


'''

import logging  # logging
import os  # Operating system functions
import argparse  # parse args from the command line
import boto.s3  # Aws API
import subprocess  # makes system calls
import hashlib  # used to compare files
from boto.s3.key import Key

try:
    import colorlog  # makes the logs nice and colorful in the console

    have_colorlog = True
except ImportError:
    have_colorlog = False


# Creates a logger that is used for output
def mk_logger():
    log = logging.getLogger(__name__)
    log.setLevel(logging.DEBUG)
    color_format = '%(log_color)s' + '%(levelname)-7s - %(message)s'
    ch = logging.StreamHandler()
    ch.setFormatter(logging.Formatter(format))
    if have_colorlog & os.isatty(2):
        cf = colorlog.ColoredFormatter(color_format,
                                       log_colors={'DEBUG': 'green', 'INFO': 'bold_blue',
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

parser.add_argument('env', help='The environment to deploy', choices=['demo', 'staging', 'production', 'qa'])

parser.add_argument('-v', '--verbose', help='Turn on debugging logging', action='store_true')
parser.add_argument('-f', '--force', help='Deploy the file even if the file has not changed on s3', action='store_true')

args = parser.parse_args()

if args.verbose:
    logger.setLevel(logging.DEBUG)

# Fill these in - you get them when you sign up for S3
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', failobj=False)
AWS_ACCESS_KEY_SECRET = os.environ.get('AWS_SECRET_ACCESS_KEY', failobj=False)

# destination bucket name
BUCKET_NAME = os.environ.get('CMWN_GAMES_AWS_BUCKET', failobj=False)

# source directory
sourceDir = os.getcwd() + '/'

# destination directory name (on s3)
destDir = args.env

# max size in bytes before uploading in parts. between 1 and 5 GB recommended
MAX_SIZE = 20 * 1000 * 1000

# size of parts when uploading in parts
PART_SIZE = 6 * 1000 * 1000

logger.debug('Turning on debug')

logger.info('Starting to deploy to: {}'.format(destDir))
logger.info('Deploying to bucket: {}'.format(BUCKET_NAME))

thingsOK = True
if BUCKET_NAME is False:
    logger.error('Bucket is not set')
    thingsOK = False

if AWS_ACCESS_KEY_ID is False:
    logger.error('AWS Access Key is not set')
    thingsOK = False

if AWS_ACCESS_KEY_SECRET is False:
    logger.error('AWS Access Secret is not set')
    thingsOK = False

if thingsOK is False:
    logger.error('Unable to deploy')
    exit(1)

filesToUpload = []

logger.debug('Connecting to Amazon')
conn = boto.connect_s3(AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY_SECRET)

logger.debug('Opening bucket')
S3_BUCKET = conn.create_bucket(BUCKET_NAME, location=boto.s3.connection.Location.DEFAULT)
bucket_path = os.path.join(args.env)
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
    if args.force is True:
        return True

    remote_file = os.path.join(bucket_path, local_file)
    remote_key = S3_BUCKET.get_key(remote_file)
    if remote_key is None:
        return True

    local_hash = get_md5(local_file)
    etag = remote_key.etag
    return local_hash == etag


def filter_file(filter_file_name, path):
    check_file = os.path.join(path, filter_file_name)
    if check_file.startswith('.git'):
        return

    logger.debug('Checking file %s' % check_file)
    check_ignore = subprocess.Popen(['git', 'ls-files', '--error-unmatch', '--exclude-standard', str(check_file)],
                                    stdout=subprocess.PIPE,
                                    stderr=subprocess.PIPE)
    status = check_ignore.wait()
    if status is not 0:
        logger.warn('File %s is ignored by git' % check_file)
        return

    changed = compare_file_to_s3(check_file)
    if changed is False:
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


logger.info('Building file list')
for realDir, dirName, fileNames in os.walk(sourceDir, topdown=True):
    baseDir = realDir.replace(sourceDir, "")
    test = [filter_file(file_name, baseDir) for file_name in fileNames]
    filesToUpload += filter(lambda v: v is not None, test)

logger.info('Uploading Amazon S3 bucket %s' % BUCKET_NAME)

for fileName in filesToUpload:
    push_to_s3(fileName)

logger.info('Deploy complete')
