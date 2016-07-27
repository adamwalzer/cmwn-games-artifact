var moduleGame = angular.module('GameApp', ['ngRoute', 'underscore', 'gamecatControllers', 'ngAnimate', 'ngDragDrop']);
var content_path = "http://actionitems.changemyworldnow.com/wastepro";
//var content_path = "";


// configure our routes
moduleGame.config(function ($routeProvider) {
   
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: '/home.html',
            controller: 'mainController'
        })
        // route for the home page
        .when('/video', {
            templateUrl: '/video.html',
            controller: 'videoController'
        })

        // route for the step page
        .when('/step', {
            templateUrl: '/step.html',
            controller: 'stepController'
        })
        .otherwise({
            redirectTo: '/'
        });

});

// create the controller and inject Angular's $scope
moduleGame.controller('mainController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.teplate = ['/home.html', '/video.html', '/step.html']
});
moduleGame.controller('videoController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

moduleGame.controller('stepController', function ($scope, $http, $sce, $window, $rootScope) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data2 = [];
    $scope.data3 = [];
    $scope.data = [
        {
            'name': "Aluminium_can",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_aluminum_can.png",
            'text': "<h3>Aluminium can</h3> <p>80-200 years</p>"
        },
        {
            'name': "battery",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_battery.png",
            'text': "<h3>Batteries</h3> <p>100 years</p>"
        },
        {
            'name': "Cardboard",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_cardboard.png",
            'text': "<h3>Cardboard</h3> <p>2 months</p>"
        },
        {
            'name': "Canvas",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_canvas.png",
            'text': "<h3>Canvas</h3> <p>1 year</p>"
        },
        {
            'name': "Cotton",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_cotton.png",
            'text': "<h3>Cotton Clothing</h3> <p>6 months</p>"
        },
        {
            'name': "Glass",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_glass.png",
            'text': "<h3>Glass</h3> <p>Millions of years</p><p class='small'>(Some say never)</p>"
        },
        {
            'name': "Leather_shoe",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_leather_shoe.png",
            'text': "<h3>Leather shoes</h3> <p>25-40 years</p>"
        },
        {
            'name': "Lumber",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_lumber.png",
            'text': "<h3>Lumber</h3> <p>10-15 years</p>"
        },
        {
            'name': "Milk_Carton",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_milk_carton.png",
            'text': "<h3>Milk Carton</h3> <p>5 years</p>"
        },
        {
            'name': "Orange_Peel",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_orange_peel.png",
            'text': "<h3>Orange Peel</h3> <p>6 months</p>"
        },
        {
            'name': "Paper",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_paper.png",
            'text': "<h3>Paper</h3> <p>2-5 months</p>"
        },
        {
            'name': "Plastic_Bag",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_plastic_bag.png",
            'text': "<h3>Plastic Bag</h3> <p>500 years</p>"
        },
        {
            'name': "Plastic_Bottle",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_plastic_bottle.png",
            'text': "<h3>Plastic Bottle</h3> <p>450 years</p>"
        },
         {
             'name': "Plastic_Cup",
             'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_platic_cup.png",
             'text': "<h3>Plastic Cup</h3> <p> 50 years</p>"
         },
        {
            'name': "Rope",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_rope.png",
            'text': "<h3>Rope</h3> <p>3-14 months</p>"
        },
        {
            'name': "Rubber_sole",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_rubber_sole.png",
            'text': "<h3>Rubber Sole</h3> <p>50-80 years</p>"
        },

        {
            'name': "Styrofoam",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_styrofoam.png",
            'text': "<h3>Styrofoam</h3> <p>Never EVER goes away</p>"
        },
        {
            'name': "Tin_can",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_tin_can.png",
            'text': "<h3>Tin can</h3> <p>50 years</p>"
        },
        {
            'name': "Tin_Foil",
            'mainImageUrl': content_path + "/content/_assets/elements/Trash/Untitled-14_tin_foil.png",
            'text': "<h3>Tin Foil</h3> <p>It does not biodegrade</p>"
        },

    ]

    $scope.onDrag = function (e) {
        angular.element(e.target).parent().addClass("dragstarted");
        $scope.data3 = [];
        $('.correct-ansver').fadeOut(500).css('z-index', '10');
    };

    $scope.onDrop = function (e, ui) {
        /*console.log(ui.draggable.scope().item.name);*/
        
        $("#" + ui.draggable.scope().item.name).addClass("drag");
        var parrentSlide = angular.element(e.target);
        parrentSlide.addClass('done');
        $('.sidebar-hover ').fadeIn();
        
        $('#drop16-21').get(0).currentTime = 0;
        $('#drop16-21').get(0).play();
        $('.correct-ansver').fadeIn(500).css('z-index', '10');
        $('.correct-ansver-hover').fadeIn(500);
        $('.sidebar-hover ').fadeOut();
        setTimeout(function () {
            $('.correct-ansver a').fadeIn(500);
           
        }, 1000);
        $('.dragstarted .img-hold ').remove();
      /* console.log($(".sidebar.right").children().length, '$(".sidebar.right").children().length');
       console.log($(".sidebar.right").children(".dragstarted").length , '$(".sidebar.right").children(".dragstarted").length');*/
        if ( ($(".sidebar.right").children().length == $(".sidebar.right").children(".dragstarted").length)) {
            $("#step .slider a.next").fadeIn(500);
        }

       /* var parrentSlideId = parrentSlide.parents().eq(2).get(0).id
        if ($('#' + parrentSlideId + ' .dragstarted').hasClass('correct')) {

            parrentSlide.find(".correct-ansver").css('z-index', '10');
            $(' .arrows-inctive').css('z-index', '0');
            setTimeout(function () { $(' #step .slider .next').fadeIn(500); }, 500);
            $('#incorrect').get(0).pause();
            $('#incorrect').get(0).currentTime = 0;
            $('#correct').get(0).pause();
            $('#correct').get(0).currentTime = 0;
            $('#correct').get(0).play();
        }
        else if ($('#' + parrentSlideId + ' .dragstarted').hasClass('incorrect')) {
            $('#correct').get(0).pause();
            $('#correct').get(0).currentTime = 0;
            $('#incorrect').get(0).pause();
            $('#incorrect').get(0).currentTime = 0;
            $('#incorrect').get(0).play();
        }
        $('.img-hold img').removeClass('dragstarted');*/
    };

    $rootScope.triggerRelink = function () {
        $rootScope.$broadcast('myEventName');
    };
   
       $scope.data2 = [];
        angular.forEach($scope.data, function (item) {
            $scope.data2.push({
                item: item,
                rank: 0.5 - $window.Math.random()
            });
        });

        /*console.log($scope.data2);*/

    $('.correct-ansver a.next').click(function () {
        $('.correct-ansver a.next').fadeOut(500);
        $('.correct-ansver > p').fadeOut(500);

        $('.correct-ansver').fadeOut(500).css('z-index', '10');
        $('.correct-ansver-hover').fadeOut(500);
        $scope.data3 = [];
       
        /*console.log($(".sidebar.left").children().length, '$(".sidebar.left").children().length');
        console.log($(".sidebar.left").children(".dragstarted").length, '$(".sidebar.left").children(".dragstarted").length');
        console.log($(".sidebar.right").children().length, '$(".sidebar.right").children().length');
        console.log($(".sidebar.right").children(".dragstarted").length , '$(".sidebar.right").children(".dragstarted").length');*/
        if (($(".sidebar.left").children().length == $(".sidebar.left").children(".dragstarted").length) && ($(".sidebar.right").children().length == $(".sidebar.right").children(".dragstarted").length))
        {
            $("#step .slider a.next").fadeIn(500);
        }  
    });
    
});

/*---------------------------------------------------------------------*/

moduleGame.controller('balanceController', function ($scope, $http, $sce, $window, $rootScope) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data2 = [];
    $scope.data3 = [];
    $scope.data = [
          {
              'name': "Elephant",
              'mainImageUrl': content_path + "/content/_assets/elements/weight_elephants.png",
              'headerImageUrl': content_path + "/content/_assets/elements/header_elephant.png",
              'text': "An elephant weighs 15,000 pounds.",
              'correct': 1
          }, {
              'name': "Car",
              'mainImageUrl': content_path + "/content/_assets/elements/weight_cars.png",
              'headerImageUrl': content_path + "/content/_assets/elements/header_car.png",
              'text': "A car weighs 4,000 pounds.",
              'correct': 1
          }, {
              'name': "Hippopotamus",
              'mainImageUrl': content_path + "/content/_assets/elements/weight_hippos.png",
              'headerImageUrl': content_path + "/content/_assets/elements/header_hippo.png",
              'text': "A hippo weighs 3,000 pounds.",
              'correct': 1
          }, {
              'name': "School_bus",
              'mainImageUrl': content_path + "/content/_assets/elements/weight_buses.png",
              'headerImageUrl': content_path + "/content/_assets/elements/header_bus.png",
              'text': "A school bus weighs 25,000 pounds.",
              'correct': 2
          }, {
              'name': "Kittens",
              'mainImageUrl': content_path + "/content/_assets/elements/weight_kittens.png",
              'headerImageUrl': content_path + "/content/_assets/elements/header_kitten.png",
              'text': "A kitten weighs a pound.",
              'correct': 2
          },

    ]

    $scope.onDrag = function (e) {
        angular.element(e.target).parent().addClass("dragstarted");
        $scope.data3 = [];
        $('.correct-ansver').fadeOut(500).css('z-index', '10');
        $('.balance-right-cup .img-box img').attr('src', '');
        $('.balance-right-cup .img-box img').css('visibility', 'hidden');
        $('.balansir').removeClass('correct');
    };

    $scope.onDrop = function (e, ui) {
        /*console.log(ui.draggable.scope().item.item.name);
        console.log($("#" + ui.draggable.scope().item.item.name).children());*/
        $("#" + ui.draggable.scope().item.item.name).addClass("drag");
        if ($("#" + ui.draggable.scope().item.item.name).children().hasClass("correct")) {
           
            $('.balansir ').addClass('correct');
        };
        var parrentSlide = angular.element(e.target);
        parrentSlide.addClass('done');
        $('.sidebar-hover ').fadeIn();
        $('.balance-right-cup .img-box img').css('visibility', 'visible');
        $('#drop').get(0).currentTime = 0;
        $('#drop').get(0).play();
        $('.correct-ansver').fadeIn(500).css('z-index', '10');
        $('.correct-ansver-hover').fadeIn(500);
        $('.sidebar-hover ').fadeOut();
        $('#balance > .headig-box').css('visibility','hidden');
        setTimeout(function () {
            $('.correct-ansver a').fadeIn(500);
        }, 1000);

        /*console.log(ui.draggable.scope().item.item.name);*/
        if ($("#" + ui.draggable.scope().item.item.name + " .img-hold").hasClass('correct')) {

            parrentSlide.find(".correct-ansver").css('z-index', '10');
            $(' .arrows-inctive').css('z-index', '0');
            setTimeout(function () { $(' #step .slider .next').fadeIn(500); }, 500);
            $('#incorrect').get(0).pause();
            $('#incorrect').get(0).currentTime = 0;
            $('#correct').get(0).pause();
            $('#correct').get(0).currentTime = 0;
            $('#correct').get(0).play();
        }
        else if ($("#" + ui.draggable.scope().item.item.name + " .img-hold").hasClass('incorrect')) {
            $('#correct').get(0).pause();
            $('#correct').get(0).currentTime = 0;
            $('#incorrect').get(0).pause();
            $('#incorrect').get(0).currentTime = 0;
            $('#incorrect').get(0).play();
        }

        /*console.log($scope.data3.mainImageUrl);*/
        if (($(".balance-footer").children().length == $(".balance-footer").children(".drag").length)) {
           
            $("#balance > .arrows a.next").fadeIn(500);
            setTimeout(function () {
                $('#balance .correct-ansver .arrows a.next').fadeOut(500);

            }, 1500);
        }
       
    };

    $rootScope.triggerRelink = function () {
        $rootScope.$broadcast('myEventName');
    };

    $scope.data2 = [];
    angular.forEach($scope.data, function (item) {
        $scope.data2.push({
            item: item,
            rank: 0.5 - $window.Math.random()
        });
    });

    /*console.log($scope.data2);*/

    $('.correct-ansver a.next').click(function () {
        $('.balansir').removeClass('correct');
        $('.correct-ansver a.next').fadeOut(500);
        $('.correct-ansver > p').fadeOut(500);
        $('#balance > .headig-box').css('visibility', 'visible');

        $('.correct-ansver').fadeOut(500).css('z-index', '10');
        $('.correct-ansver-hover').fadeOut(500);
        $scope.data3 = [];

        /*console.log($(".sidebar.left").children().length, '$(".sidebar.left").children().length');
        console.log($(".sidebar.left").children(".dragstarted").length, '$(".sidebar.left").children(".dragstarted").length');
        console.log($(".sidebar.right").children().length, '$(".sidebar.right").children().length');
        console.log($(".sidebar.right").children(".dragstarted").length , '$(".sidebar.right").children(".dragstarted").length');*/
        if (($(".sidebar.left").children().length == $(".sidebar.left").children(".dragstarted").length) && ($(".sidebar.right").children().length == $(".sidebar.right").children(".dragstarted").length)) {
            $("#step .slider a.next").fadeIn(500);
        }
    });

});

/*----------------------------------------------------*/

moduleGame.controller('garbageController', function ($scope, $http, $sce, $window, $rootScope) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data = [
    {
        'name': "Landfill",
        'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_1.png",
        'noseImages': content_path + "/content/_assets/elements/buttons/btn_1_on.png",
        'text': "A landfill is a place to <br/> bury solid waste.<br/>  It is lined and covered.<br/> It is not a dump."
    },
     {
         'name': "Recycling",
         'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_2.png",
         'noseImages': content_path + "/content/_assets/elements/buttons/btn_2_on.png",
         'text': "Recycling means to  convert <br/> the waste into usable material. <br/> 75% of waste is recyclable but <br/> in US we recycle only 30%."
     },
      {
          'name': "Composting",
          'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_3.png",
          'noseImages': content_path + "/content/_assets/elements/buttons/btn_3_on.png",
          'text': "Composting is how you <br/>  manage the decay of organic <br/> material to use to improve soil."
      },
       {
           'name': "Incineration",
           'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_4.png",
           'noseImages': content_path + "/content/_assets/elements/buttons/btn_4_on.png",
           'text': "Incineration is the burning <br/> of waste at high heat."
       },
    ]

    $scope.test = function (item) {
        $("#" + item.name).addClass('ckick');
        $("#btnClick10-15").get(0).currentTime = 0;
        $("#btnClick10-15").get(0).play();
       
        $("#" + item.name + " .img-hold img").attr('src', item.noseImages);
        $('#garbage #bag').html('');
        $('#garbage #bag').html('<h3>' + item.name + '</h3> <p>' + item.text + '</p>');
        if (($("#garbage .btn-box.left .ckick").length == 2) && ($("#garbage .btn-box.right .ckick").length == 2)) {
            ;
        $("#garbage a.next").fadeIn(500);
        }
        setTimeout(function () {
            $("#" + item.name + " .img-hold img").attr('src', item.mainImageUrl)
        }, 1500);
    }

});

/*--------------------------------------------------------*/

moduleGame.controller('landfillsController', function ($scope, $http, $sce, $window, $rootScope) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data = [
    {
        'name': "Contamination",
        'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_1.png",
        'noseImages': content_path + "/content/_assets/elements/buttons/btn_1_on.png",
        'text': "Waste changes the chemistry <br/> of the water. Hazardous  <br/> chemicals get into the soil. <br/> Both harm plants, animals,<br/>  humans and  ecosystem."
    },
     {
         'name': "Pollution",
         'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_2.png",
         'noseImages': content_path + "/content/_assets/elements/buttons/btn_2_on.png",
         'text': "Bad waste management <br/> leads to land and air pollution <br/>  causing respiratory and other <br/> health problems."
     },
      {
          'name': "Leachate",
          'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_3.png",
          'noseImages': content_path + "/content/_assets/elements/buttons/btn_3_on.png",
          'text': "The water that trickles <br/> through contamination is <br/> called leachate. <br/> It is a harmful substance that <br/> enters water and soil."
      },
       {
           'name': "Methane Gas",
           'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_4.png",
           'noseImages': content_path + "/content/_assets/elements/buttons/btn_4_on.png",
           'text': "Food waste in a landfill <br/> produces 34% of ALL toxic <br/> methane emissions in US. <br/> Methane is is 21 times more <br/> environmentally damaging <br/> than carbon dioxide!"
       },
    ]

    $scope.test = function (item) {
        $("#" + item.name).addClass('ckick');
       
        $("#btnClick10-15").get(0).currentTime = 0;
        $("#btnClick10-15").get(0).play();
        
        $("#" + item.name + " .img-hold img").attr('src', item.noseImages);
        $('#landfills #bag').html('');
        $('#landfills #bag').html('<h3>' + item.name + '</h3> <p>' + item.text + '</p>');

        if (item.name == "Methane Gas") {
            $(".garbage .btn-box.right .img-box").last().addClass('ckick');
        };
        
        if (($("#landfills .btn-box.left .ckick").length == 2) && ($("#landfills .btn-box.right .ckick").length == 2)) {
            $("#landfills a.next").fadeIn(500);
        }

        setTimeout(function () {
            $("#" + item.name + " .img-hold img").attr('src', item.mainImageUrl)
        }, 500);

    }

});

/*----------------------------------------------------*/
/*--------------------------------------------------------*/

moduleGame.controller('pledgeController', function ($scope, $http, $sce, $window, $rootScope) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data = [
    {
        'name': "Paper_Towels",
        'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_towels_on.png",
        'noseImages': content_path + "/content/_assets/elements/buttons/btn_towels.png",
        'headerImages': content_path + "/content/_assets/elements/header_towels.png",
    },
     {
         'name': "Plastic_Bottles",
         'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_bottles_on.png",
         'noseImages': content_path + "/content/_assets/elements/buttons/btn_bottles.png",
         'headerImages': content_path + "/content/_assets/elements/header_bottles.png",
     },
      {
          'name': "Plastic_Bags",
          'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_bags_on.png",
          'noseImages': content_path + "/content/_assets/elements/buttons/btn_bags.png",
          'headerImages': content_path + "/content/_assets/elements/header_bags.png",
      },
       // {
       //     'name': "Paper_Napkins",
       //     'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_napkins_on.png",
       //     'noseImages': content_path + "/content/_assets/elements/buttons/btn_napkins.png",
       //     'headerImages': content_path + "/content/_assets/elements/header_napkins.png",
       // },
       {
           'name': "Paper_Utensils",
           'mainImageUrl': content_path + "/content/_assets/elements/buttons/btn_utensils_on.png",
           'noseImages': content_path + "/content/_assets/elements/buttons/btn_utensils.png",
           'headerImages': content_path + "/content/_assets/elements/header_utensils.png",
       },
    ]

    $scope.test = function (item) {
        $("#oneThing #" + item.name).addClass('ckick');
        $('#slide31').get(0).currentTime = 0;
        $('#slide31').get(0).play();

        $("#oneThing #" + item.name + " img").attr('src', item.mainImageUrl);
        $("#iCommit h1 img").attr('src', item.headerImages);
        $("#oneThing a.next").fadeIn(500);
        $("#oneThing .pledge-hover").fadeIn(500);
    }

});

/*----------------------------------------------------*/
/*----------------------------------------------------*/
/*----------------------------------------------------*/

moduleGame.directive('relinkEvent', function ($rootScope) {
    return {
        transclude: 'element',
        restrict: 'A',
        link: function (scope, element, attr, ctrl, transclude) {
            var previousContent = null;

            var triggerRelink = function () {
                if (previousContent) {
                    previousContent.remove();
                    previousContent = null;
                }

                transclude(function (clone) {
                   /* console.log('relinking');*/
                    element.parent().append(clone);
                    previousContent = clone;
                });
            };

            triggerRelink();
            $rootScope.$on(attr.relinkEvent, triggerRelink);

        }
    };

});

/*-----------------------------------*/

var gamecatControllers = angular.module('gamecatControllers', []);

gamecatControllers.controller('gameListCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get('game.json').success(function (data) {
          $scope.game = data;
      });

      $scope.orderProp = 'age';
  }]);

gamecatControllers.controller('gameDenoseCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
      $scope.gameId = $routeParams.gameId;
  }]);

/*-----------------------------*/
