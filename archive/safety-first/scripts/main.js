$(document).ready(function () {
    ///// background image is set to display none in main.css, and brought back with fade in,
    //// to prevent glitch ////
    title.volume = '.5';
    bkgsong.volume = '.3';
    secondmaze.volume = '.3';

    /**********************************************/
    /**********************************************/
    /**************MAZE********************/
    /**********************************************/

        function maze1() {
            $('#maze').append('<div id="dynamic-map"></div><div id="static-map"></div>');
            var map, player = { x: 2, y: 2 }, i, win, maze = document.getElementById('dynamic-map'), mazestatic = document.getElementById('static-map');

            function mapToHTML(map) {
                var html = '', x, y, dictionary = {
                    'H': '<span class="tile wall">H</span>',
                    '.': '<span class="tile floor">.</span>',
                    '@': '<span class="tile player">@</span>',
                    'A': '<span class="tile goal A">A</span>',
                    'B': '<span class="tile goal B">B</span>',
                    'C': '<span class="tile goal C">C</span>',
                    'D': '<span class="tile goal D">D</span>',
                    'E': '<span class="tile goal E">E</span>',
                    'F': '<span class="tile goal F">F</span>',
                    'G': '<span class="tile goal G">G</span>',
                    'X': '<span class="tile goal X">X</span>'
                };

                for (y = 0; y < map.length; y += 1) {
                    for (x = 0; x < map[y].length; x += 1) {
                        html += dictionary[map[y][x]];
                    }
                    html += '<br>';
                }

                return html;
            }

            function updateMap() {
                var displayMap = [], x, y;
                for (y = 0; y < map.length; y += 1) {
                    displayMap[y] = displayMap[y] || [];
                    for (x = 0; x < map[y].length; x += 1) {
                        displayMap[y][x] = map[y][x];
                    }
                }
                displayMap[player.y][player.x] = '@';
                for (y = 0; y < displayMap.length; y += 1) {
                    displayMap[y] = displayMap[y].join('');
                }

                maze.innerHTML = mapToHTML(displayMap);

            }

            function playerMove(x, y) {
                var toX = player.x + x, toY = player.y + y;
                var obj = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'X'];

                jQuery.each(obj, function (i, val) {
                    if ($('#maze + #mazepopup #' + val).hasClass('poped')) {
                        setTimeout(function () {
                            $('#maze .' + val).addClass('poped');

                        }, 50);
                    }

                    if (map[toY][toX] === '.' || map[toY][toX] === val) {
                        player.x = toX;
                        player.y = toY;
                    }

                    updateMap();
                    if (map[toY][toX] === val) {
                        console.log('win!', val);
                        if (val == 'X') {
                            $('#mazepopup button.sliderClose').click(function () {
                             $('#labyrinth a.next').fadeIn(500);
                             $('#labyrinth a.next').addClass('open');
                         });

                        }
                        document.onkeydown = function (e) {

                            switch (e.keyCode) {
                                case 37:

                                    break;
                                case 38:

                                    break;
                                case 39:

                                    break;
                                case 40:

                                    break;
                            }
                        };
                        $('#mazepopup').fadeIn(1);

                        $('#labyrinth #mazepopup #' + val).fadeIn(1);
                        $('#labyrinth #mazepopup #' + val).addClass('poped');

                        var the_sound = $('#sound-' + val).attr("data-sound");

                        $('#' + the_sound).get(0).play();

                        /////pause previous sound /////


                        if ($('#maze .goal').length == $("#labyrinth #mazepopup .poped").length - 1) {
                            $('#labyrinth a.next').fadeIn(5000);
                            $('#labyrinth a.next').addClass('open');
                            $('#bkgsong').get(0).currentTime=0;
                            $('#bkgsong').get(0).pause();
                            $('#Slide_19').get(0).currentTime=0;
                            $('#Slide_19').get(0).play();
                            bkgsong.volume = "0.1";
                            secondmaze.volume = '0.1';

                        }

                    }

                });
            }

            map = [
                'HHHHHHHHHHHHHHHHH',
                'HHHHHHHHHHHHHHHHH',
                'HH...........HHHH',
                'HHHHHHHHHHHHAHHHH',
                '.....H.......HHHH',
                '.HHHBH.HHHHHHHHHH',
                '..C....H....FHHHH',
                '.HHHHHHH.HHH.H...',
                'DHHHHHHH.HHH.H.H.',
                '.......E.HHHG..HX',
            ];

            for (i = 0; i < map.length; i += 1) {
                map[i] = map[i].split('');
            }
            if ($('#mazepopup').is(':hidden')) {

                document.onkeydown = function (e) {
                    switch (e.keyCode) {
                        case 37:
                            playerMove(-1, 0);
                            break;
                        case 38:
                            playerMove(0, -1);
                            break;
                        case 39:
                            playerMove(1, 0);
                            break;
                        case 40:
                            playerMove(0, 1);
                            break;
                    }
                };
            }
            mazestatic.innerHTML = mapToHTML(map);
            updateMap();

            $('#mazepopup button.sliderClose').click(function () {
                $('#mazepopup .slide').fadeOut(500);
                $('#mazepopup ').fadeOut(500);
                sound5.pause();
                sound6.pause();
                sound7.pause();
                sound8.pause();
                sound9.pause();
                sound10.pause();
                sound11.pause();
                sound13.pause();
                sound14.pause();
                sound15.pause();
                sound16.pause();
                sound17.pause();
                sound18.pause();
                sound19.pause();
                sound20.pause();
                sound21.pause();
                sound22.pause();
                document.onkeydown = function (e) {
                    switch (e.keyCode) {
                        case 37:
                            playerMove(-1, 0);
                            break;
                        case 38:
                            playerMove(0, -1);
                            break;
                        case 39:
                            playerMove(1, 0);
                            break;
                        case 40:
                            playerMove(0, 1);
                            break;
                    }
                };

            });

        }

        /**********************************************/
        /**********************************************/
        /**************MAZE********************/
        /**********************************************/
        var maze2 = function () {
            $('#maze2').append('<div id="dynamic-map2"></div><div id="static-map2"></div>');
            var map, player = { x: 15, y: 6 }, i, maze2 = document.getElementById('maze2'), win,
                maze2 = document.getElementById('dynamic-map2'), mazestatic2 = document.getElementById('static-map2');
            function mapToHTML(map) {
                var html = '', x, y, dictionary = {
                    'H': '<span class="tile wall">H</span>',
                    '.': '<span class="tile floor">.</span>',
                    '@': '<span class="tile player">@</span>',
                    'J': '<span class="tile goal J">J</span>',
                    'K': '<span class="tile goal K">K</span>',
                    'L': '<span class="tile goal L">L</span>',
                    'M': '<span class="tile goal M">M</span>',
                    'N': '<span class="tile goal N">N</span>',
                    'O': '<span class="tile goal O">O</span>',
                    'P': '<span class="tile goal P">P</span>',
                    'Q': '<span class="tile goal Q">Q</span>',
                    'R': '<span class="tile goal R">R</span>',
                };

                for (y = 0; y < map.length; y += 1) {
                    for (x = 0; x < map[y].length; x += 1) {
                        html += dictionary[map[y][x]];
                    }
                    html += '<br>';

                }

                return html;
            }

            function updateMap() {
                var displayMap = [], x, y;
                for (y = 0; y < map.length; y += 1) {
                    displayMap[y] = displayMap[y] || [];
                    for (x = 0; x < map[y].length; x += 1) {
                        displayMap[y][x] = map[y][x];
                    }
                }
                displayMap[player.y][player.x] = '@';
                for (y = 0; y < displayMap.length; y += 1) {
                    displayMap[y] = displayMap[y].join('');
                }

                maze2.innerHTML = mapToHTML(displayMap);

            }

            function playerMove(x, y) {
                var toX = player.x + x, toY = player.y + y;
                var obj = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
                jQuery.each(obj, function (i, val) {
                    if ($('#maze2 + #mazepopup #' + val).hasClass('poped')) {
                        setTimeout(function () {
                            $('#maze2 .' + val).addClass('poped');

                        }, 50);
                    }
                    if (map[toY][toX] === '.' || map[toY][toX] === val) {
                        player.x = toX;
                        player.y = toY;
                    }

                    updateMap();
                    if (map[toY][toX] === val) {

                        document.onkeydown = function (e) {

                            switch (e.keyCode) {
                                case 37:
                                    break;
                                case 38:
                                    break;
                                case 39:
                                    break;
                                case 40:
                                    break;
                            }
                        };
                        $('#mazepopup').fadeIn(1);

                        $('#labyrinthHome #mazepopup #' + val).fadeIn(1);
                        $('#labyrinthHome #mazepopup #' + val).addClass('poped');


                        var the_sound = $('#second-' + val).attr("data-sound");

                        $('#' + the_sound).get(0).play();



                        setTimeout(function () {
                            console.log($('#maze2 .goal').length/2);
                            console.log('!!!!!!!!!!!!!poped', $("#labyrinthHome #mazepopup .poped").length - 1);
                            //console.log($("#maze2 .poped").size());
                        }, 50);

                        if (($('#maze2 .goal').length/2 -0.5)== $("#labyrinthHome #mazepopup .poped").length - 1) {

                            setTimeout(function(){
                                $('#labyrinthHome .popup2').fadeIn(500);
                                // $('#secondmaze').get(0).currentTime=0;
                                // $('#secondmaze').get(0).pause();
                                $('#slide41').get(0).currentTime=0;
                                $('#slide41').get(0).play();
                            }

                                , 500);

                            $('.popup2 button.sliderClose').click(function () {
                                $('#labyrinthHome a.next').fadeIn(500);
                                $('#labyrinthHome a.next').addClass('open');
                            });

                        }

                    }
                    if (map[toY][toX] == "K" ) {

                        $('#slide34').get(0).currentTime=0;
                        $('#slide34').get(0).play();
                    }
                    if (map[toY][toX] == "N" ) {

                        $('#slide37').get(0).currentTime=0;
                        $('#slide37').get(0).play();
                    }
                    if (map[toY][toX] == "P" ) {
                        setTimeout(function() {
                            $('#slide39').get(0).currentTime=0;
                            $('#slide39').get(0).play();
                        },3000);

                    }
                    if (map[toY][toX] == "Q" ) {

                        // $('#slide19').get(0).currentTime=0;
                        // $('#slide19').get(0).play();

                    }

                });
            }

            map = [
                'HHHHHHHHHHHHHHHHH',
                'HHHHHHHHHHHHHHHHH',
                'HHHHQHHNHHMHHHHHH',
                'HHHH.HH.H.....LHH',
                'HHHH......H.HHHHH',
                'HHHHPH.HHHH.HHHHH',
                'HHHHHH.HHHH...JHH',
                'HHHHHH.HHHHKHHHHH',
                'HHHHHH.HHHHHHHHHH',
                'HHHHHHOHHHHHHHHHH',
            ];

            for (i = 0; i < map.length; i += 1) {
                map[i] = map[i].split('');
            }
            if ($('#mazepopup').is(':hidden')) {

                document.onkeydown = function (e) {
                    switch (e.keyCode) {
                        case 37:
                            playerMove(-1, 0);
                            break;
                        case 38:
                            playerMove(0, -1);
                            break;
                        case 39:
                            playerMove(1, 0);
                            break;
                        case 40:
                            playerMove(0, 1);
                            break;
                    }
                };
            }
            mazestatic2.innerHTML = mapToHTML(map);
            updateMap();

            $('#mazepopup button.sliderClose').click(function () {
                if (($('#maze2 .goal').length/2 -0.5)== $("#labyrinthHome #mazepopup .poped").length - 1) {
                    $('#secondmaze').get(0).currentTime=0;
                    $('#secondmaze').get(0).pause();
                    $('#jobs').get(0).play();
                }
                $('#mazepopup .slide').fadeOut(500);
                $('#mazepopup ').fadeOut(500);
                $('#slide39').get(0).pause();

                document.onkeydown = function (e) {
                    switch (e.keyCode) {
                        case 37:
                            playerMove(-1, 0);
                            break;
                        case 38:
                            playerMove(0, -1);
                            break;
                        case 39:
                            playerMove(1, 0);
                            break;
                        case 40:
                            playerMove(0, 1);
                            break;
                    }
                };

            });

        }

    /**************************************/
    /**************************************/
    /**************MAZE********************/
    /**************************************/


    setTimeout(function () { $('.hover-box .img-hover').height($('.sidebar .img-box img').height() * 1.065); }, 500);
    $('#title').get(0).currentTime=0;
    $('#title').get(0).play();
    $('.btn-click, .next, .prev, .sliderClose').click(function () {
        $('#btnClick').get(0).currentTime=0;
        $('#btnClick').get(0).play();
    });

    $('#home .play').click(function () {
        $('#home').fadeOut(50);
        $('#noseWords').fadeIn(50);
        sound1.load();
        sound1.play();

        setTimeout(function () {
            $('#noseWords .text-box .headig-box:last-child').fadeIn(500);
            setTimeout(function () { $('#noseWords .arrows > .next').fadeIn();
                $('#noseWords .arrows > .next').addClass('open');
            }, 3000);
        }, 500);

        // $('#slide19').get(0).currentTime=0;
        // $('#slide19').get(0).play();
        // $('#goodjob').fadeOut(50);
        // $('#labyrinth').fadeIn(50);
        // sound4.load();
        // sound4.play();
        // maze1();

    });

    $('#noseWords .next').click(function () {
        $('#noseWords').fadeOut(50);
        $('#letsSee').fadeIn(50);
        $('#title').get(0).currentTime=0;
        $('#title').get(0).pause();
        sound2.load();
        sound2.play();
        setTimeout(function () {
            $('#letsSee .arrows > .next').fadeIn();
            $('#letsSee .arrows > .next').addClass('open');
        }, 3000);
    });

    $('#letsSee .next').click(function () {
        $('#slide4').get(0).currentTime=0;
        $('#slide4').get(0).play();
        $('.bkg-image').css('background-image','url(_assets/background/BKG_2.png)');
        $('#letsSee').fadeOut(50);
        $('#letsSee1').fadeIn(50);
        $('#ex').wave(null, 100, 1200);
        setTimeout(function () {
            $('#letsSee1 .arrows > .next').fadeIn();
            $('#letsSee1 .arrows > .next').addClass('open');
            $('#step .slider .slide.openslide .img-hover').removeClass('view');
        }, 1500);
    });

    $('#letsSee1 .next').click(function () {

        $('#letsSee1').fadeOut(50);
        $('#step').fadeIn(50);

        setInterval(function () {
            $('#step .slider .slide.openslide .img-hover').addClass('view');
        }, 100);
    });

    $('#goodjob .next').click(function () {
        $('#slide19').get(0).currentTime=0;
        $('#slide19').get(0).play();
        $('#goodjob').fadeOut(50);
        $('#labyrinth').fadeIn(50);
        setTimeout(function(){
        sound4.load();
        sound4.play();
    },1500);
               maze1();
    });

    $('#labyrinth .sliderClose').click(function () {
        $('#slide18').get(0).currentTime=0;
        $('#slide18').get(0).play();
        sound4.pause();
        $('#labyrinth .popup').fadeOut(50);

        $('#bkgsong').get(0).play();
         bkgsong.volume = "0.1";
        $('#maze').fadeIn(500);
    });

    $('#labyrinthHome .popup .sliderClose').click(function () {

        $('#labyrinthHome .popup').fadeOut(500);

    });$('#labyrinthHome .popup2 .sliderClose').click(function () {

        $('#labyrinthHome .popup2').fadeOut(500);

    });

    // $('#mainSound').get(0).play();

    /*slider
    /*---------------------------------------------------*/
    /*---------------------------------------------------*/
    /*---------------------------------------------------*/

    setTimeout(function () {
        $('#step .slider .slide').hide();

        $('#step .slider .slide').first().show();
        setTimeout(function () { $('#step .slider .slide:nth-child(' + 1 + ') .cs-buttons a').trigger('click'); }, 1500);
        $('#step .slider .slide').first().addClass('openslide');
        $('#step .slider .slide.openslide .img-hover').addClass('view');

        var num = $('#step .slider .slide').first().index() + 1;

        $('#step .arrows > .next').click(function (i) {
             // $('#mainSound').get(0).play();
            $('.content-box .btn-hold .btn-hover').fadeOut(100);
            if ($('#step .slider .slide').hasClass('openslide')) {
                if (num <= $('#step .slider .slide').length) {
                    $('#step .slider .slide:nth-child(' + num + ')').removeClass('openslide').fadeOut(10);
                    $('#step .slider .slide:nth-child(' + (num + 1) + ')').addClass('openslide').fadeIn(500);
                    setTimeout(function () {
                        $('#step .slider .slide.openslide .img-hover').removeClass('view');
                        $('#step .slider .slide.openslide .img-hover').addClass('view');
                     }, 100);
                    num++;
                    $('#bell').get(0).currentTime=0;
                    $('#bell').get(0).play();
                    $('.arrows > .next').fadeOut();
                    $('.arrows > .next').removeClass('open');
                    $('.content-box .btn-hold .clearfix').fadeIn(200);
                    $('.content-box .btn-hold  .correct-ansver').fadeOut(10);
                    if ((num - 1) == ($('#step .slider .slide').length)) {
                        $('#step').fadeOut(500);
                        $('#goodjob').fadeIn(500);
                        sound3.load();
                        sound3.play();
                        setTimeout(function () {
                            $('#slide18').get(0).currentTime=0;
                            $('#slide18').get(0).play();
                            $('#goodjob .arrows > .next').fadeIn();
                            $('#goodjob .arrows > .next').addClass('open');
                        }, 1500);

                        //$('#letsPlay').fadeIn(500);
                        /* $('#mainSound').get(0).pause();
                         $('#slide29').get(0).play();*/
                    }
                }
            }
        });

    }, 200);
    /*---------------------------------------------------*/
    /*---------------------------------------------------*/
    /*---------------------------------------------------*/


    $('.content-box .btn-hold a').click(function (e) {
        console.log('click!!!!');
        var parrentSlide = angular.element(e.target);
        var parrentSlideId = parrentSlide.parents().eq(5).get(0).id;
        parrentSlide.addClass('done');
        console.log(parrentSlideId);
        $('.content-box .btn-hold .clearfix').fadeOut(10);
        $('.content-box .btn-hold  .correct-ansver').fadeIn(200);
        setTimeout(function () { $(' #step .slider .next').fadeIn(500); }, 500);
        setTimeout(function () {

             $('.arrows > .next').fadeIn();
            $('.arrows > .next').addClass('open');
        }, 1000);

        $('#' + parrentSlideId + ' .correct-ansver img').css('visibility', 'visible');
        $('#' + parrentSlideId + ' .bg .pointer').fadeOut(1000);

        if ($(this).hasClass('correct')) {
            $(this).addClass('Correct1');
            parrentSlide.find(".correct-ansver").css('z-index', '10');
            $(' .arrows-inctive').css('z-index', '0');

            $('#incorrect').get(0).pause();
            $('#incorrect').get(0).currentTime = 0;
            $('#correct').get(0).pause();
            $('#correct').get(0).currentTime = 0;
            $('#correct').get(0).play();
        }

        else if ($(this).hasClass('incorrect')) {
            $(this).addClass('Incorrect1');
            $('#correct').get(0).pause();
            $('#correct').get(0).currentTime = 0;
            $('#incorrect').get(0).pause();
            $('#incorrect').get(0).currentTime = 0;
            $('#incorrect').get(0).play();
        }
    });

    $('#labyrinth a.next').click(function () {

        $('#labyrinth').fadeOut(500);
        $('#labyrinth').html('');
        $('.maze2-start').trigger('click');

        $('#labyrinthHome').fadeIn(50);
        title.pause();
        sound14.load();
        sound14.play();
        $('#bkgsong').get(0).currentTime=0;
        $('#bkgsong').get(0).pause();
        $('#secondmaze').get(0).currentTime = 0;
        $('#secondmaze').get(0).play();
        maze2();
    });

    $('#labyrinthHome a.next').click(function () {
        $('#secondmaze').get(0).currentTime = 0;
        $('#secondmaze').get(0).pause();
        $('#bkgsong').get(0).currentTime=0;
        $('#bkgsong').get(0).pause();
        $('#slide19').get(0).currentTime = 0;
        $('#slide19').get(0).play();
        $('#labyrinthHome').fadeOut(500);
        $('#flip').fadeIn(500);

        $('.flip-content').hide();
        setTimeout(function () { $(' #step .slider .next').fadeIn(500); }, 500);
        setTimeout(function () {

             $('.arrows > .next').fadeIn();
            $('.arrows > .next').addClass('open');
        }, 1000);
    });

    $('#flip a.next').click(function() {
        $('.flip-content').show();
        $('.mcu-text').hide();
        $('.mcu-logo').hide();
        pickup.load();
        pickup.play();
        // sound23.load();
        // sound23.play();
    });

    /*//////////////////////// OLD scripts for purple box and popups /////////////////////////////*/
    // $('#pop-up').modal('show');

    //to use the close modal, use this function
    $('.modal .no').click(function () {
        $('.modal').modal('hide');
    });

    //to use the close modal, use this function

    $('.close-Btn').click(function () {
        $('#game-info').modal('show');
    });

    $('.A').click(function () {
        $("#level-complete").modal('show');
    });

    $('.B').click(function () {
        $("#retry-level").modal('show');
    });

    // $('.purple-button').click(function () {
    //     $('#retry-level').modal('hide');
    // });

    $('.close-Btn').click(function () {
        $("#retry-level").modal('show');
    });

    $('.close-Btn').click(function () {
        $("#game-info").modal('hide');
    });
});

// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () { };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());