$(document).ready(function () {

    setTimeout(function () { $('.hover-box .img-hover').height($('.sidebar .img-box img').height() * 1.065); }, 500);
    $('#mainSound').get(0).play();

    $('.btn-click, .next, .prev').click(function () {
        $('#btnClick').get(0).play();
    });
    
    $('#home .play').click(function () {
        $('#home').fadeOut(200);
        $('#noseWords').fadeIn(200);
        $('#mainSound').get(0).pause();

        $('.shnose li').each(function (i) {
            var row = $(this);
            setTimeout(function () {
                row.addClass('flip');
                setTimeout(function () {
                    row.removeClass('flip');
                }, 400);
            }, 400 * i);
        });   
    });

    $('#noseWords .card').click(function () {
        $(this).addClass('flipped');
        $('#cardFlip').get(0).play();
        
        setTimeout(function () { $('#noseWords .next').fadeIn(500); }, 1000);    
    });

    $('#noseWords .next').click(function () {
        $('#mainSound').get(0).pause();
        $('#noseWords').fadeOut(500);
        $('#balance').fadeIn(500);
    });

    $("#balance .correct-ansver a").click(function () {
        $('.balance-right-cup .img-box img').attr('src', '');
        $('.balance-right-cup .img-box img').css('visibility', 'hidden');  
    });

    $("#balance > .arrows a.next").click(function () {
        $('#balance').fadeOut(500);
        $('#garbage').fadeIn(500);
    });

    $("#garbage > .arrows a.next").click(function () {
        $('#garbage').fadeOut(100);
        $('#landfills').fadeIn(500);
    });

    $("#landfills  > .arrows  a.next").click(function () {
        $('#landfills').fadeOut(500);
        $('#step').fadeIn(500);
        $('#step .arrows  a.next').fadeOut(10);
        $('#step .correct-ansver').fadeOut(100);
    });

    $("#oneThing a.next").click(function () {
        $('#oneThing').fadeOut(500);
        $('#iCommit').fadeIn(500);
    });

    $("#iCommit .commit-btn a").click(function () {
        $('#iCommit').fadeOut(500);
        $('#slide32').get(0).play();
        $('#googjob').fadeIn(500);
        $('#googjob a.next').fadeIn(500);
    });

    $('#feelings .next').click(function () {
        $('#feelings').fadeOut(500);
        $('#step').fadeIn(500);
    });

    $('#startGame .next , #googjob .again').click(function () {
        $('#startGame').fadeOut(500);
        $('#step').fadeIn(500);

        $('#game').get(0).play();
        
        /*---------------------------------------------------*/
        /*---------------------------------------------------*/
        /*---------------------------------------------------*/
    });

    $('#step .slider > .arrows  a.next').click(function () {
        $('#spin2').hide();
        $('#step').fadeOut(500);
        $('#SlotMachine').fadeIn(500);
        $(function () {

            var msa = [
                    { name: " Use cloth towels <br/> instead of <br/> paper towels." },

                    { name: "Use real plates<br/>  instead of <br/> paper or plastic." },

                    { name: "Offer to wash the dishes <br/>  at home to avoid <br/> paper and plastic." },
                    { name: "Get a re-usable <br/> shopping bag." },
                    { name: "<b>Re-use things like:</b>  <br/> boxes, gift bags, gift wrap, <br/> clothing, furniture, toys.  " },
                    { name: "Give away rather <br/>than throw away." },
                    { name: "Sort your trash and <br/> remove anything that <br/> can be recycled." },
            ],
                $input = $('.input');
                random_index = _.random(msa.length - 1);
           

            //make list for slots recursively and call spin when complete
            function makeSlotList(list) {
                //could choose one random index and then populate with next 18 values instead, but need to account for looping at end
                if (list.length < 7) {//length chosen based on appearance of spin, can be changed
                    if (list.length === 1) {
                        /*
                            This index will be second item in the list, which is our winning number
                            Save this for future reference
                            Instead of saving it, we could get the index attribute from the list item we end on*/
                      
                        }

                        $.each(msa, function (data) {
                            list.push('<li index=' + data + '>' + msa[data].name + '</li>');
                        });
                       
                    return makeSlotList(list);
                    
                } else {
                    //slot list is complete
                    //clear search field
                    /*var removeItem = msa;

                    msa = jQuery.grep(msa, function (value) {
                        return value != removeItem;
                    });*/
                    $input.html('');
                    //attach list, show jslots, run animation
                    $('#slot').html(list.join('')).parent().show().trigger('spin');
                    return list;
                }
            }

            //before spinning, build out list to spin through and insert into the DOM
            function makeSlots() {
                //start with current value
                var list = ['<li>' + $input.html() + '</li>'];

                //call recursive list builder that won't spin slots until it's finished
                makeSlotList(list);
                
            }

            $('#slot').jSlots({
                number: 1,
                spinner: '.jSlots-wrapper',
                spinEvent: 'spin',
                time: 5500,
                loops: 25,
                endNum: 2,//spins backwards through the list. endNum 1 ends on the same value we started on
                onEnd: function (finalElement) {
                    $('#slotStop').get(0).play();
                    //set result
                    random_index = _.random(msa.length - 1);
                    random_index_old = _.random(msa.length - 1);;
                   
                    console.log(random_index);
                    console.log(random_index_old);
                    $('#slot li[index=' + random_index + ']').remove();
                    if (random_index_old != random_index) {
                        random_index = _.random(msa.length - 1);
                    } else {
                        random_index = _.random(random_index_old);
                    }
                    ;
                    
                    $input.html(msa[random_index].name);
                    //hide spinner
                    $(this.spinner).hide();
                }
            });

            //bind random button
            var q = 0;
            $('#random_location').on('click', function () {
                $('#spin2').show().fadeOut(5000);
                $('#slotStart').get(0).currentTime = 0;
                $('#slotStart').get(0).play();
                
                $('#slotSpin').get(0).currentTime = 0;
                $('#slotSpin').get(0).play();
                q++;
                if (q == 6) {
                    $('#SlotMachine .next').fadeIn(500);
                    $('#slotEnd').get(0).play();
                    $('#slotEnd').get(0).currentTime = 0;
                }
               
                makeSlots();
                $('#slot li[index=' + q + ']').remove();
            });
        });
        /*$('#mainSound').get(0).pause();
        $('#slide14').get(0).play();*/
    });

    $('#SlotMachine > .arrows  a.next').click(function () {        
        $('#SlotMachine').fadeOut(500);
        $('#takeaPlage').fadeIn(500);
        $('#takeaPlage .next').fadeIn(500);
        $('#slide30').get(0).play();
    });

    $('#takeaPlage .next').click(function () {
        $('#takeaPlage').fadeOut(500);
        $('#oneThing').fadeIn(500);
    });

    $('#googjob .next').click(function () {
        $('#googjob').fadeOut(500);
        $('#flip').fadeIn(500);
        $('#flip .next').fadeIn(500);
        completeFlip(12938);
    });

    /*$('#googjob .fliptime').click(function () {
        $('#googjob').fadeOut(500);
        $('#game').get(0).pause();
        $('#showOff').fadeIn(500);
        $('#showOff .next').fadeIn(500);
        
        $('#mainSound').get(0).play();
    });
    */
   
    $('#flip .next.arrow').click(function () {
        $('#flip').fadeOut(500);
        $('#quit').fadeIn(500);
    });
    /*-----------------------------------------*/
        // Turn multiple selections on in IE


    /*//////////////////////// OLD scripts for purple box and popups /////////////////////////////*/
   // $('#pop-up').modal('show');


    //to use the close modal, use this function
    $('.modal .no').click(function () {
        $('.modal').modal('hide');
    });
    //to use the close modal, use this function
    /*$('.modal .yes').click(function () {
        function close_window(url) {
            var newWindow = window.open('', '_self', ''); //open the current window
            window.close(url);
        }
        });*/

    $('.close-Btn').click(function () {
        $('#game-info').modal('show');
    });

    $('.A').click(function () {
        $("#level-complete").modal('show');
    });

    $('.B').click(function () {
        $("#retry-level").modal('show');
    });

    $('.purple-button').click(function () {
        $('#retry-level').modal('hide')
    });

    $('.close-Btn').click(function () {
        $("#retry-level").modal('show');
    });

    $('.close-Btn').click(function () {
        $("#game-info").modal('hide');
    });

    /*----------------------------------------------------------*/

});