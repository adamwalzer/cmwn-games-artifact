/*test comment*/
var moduleGame = angular.module('GameApp', ['ngRoute', 'underscore', 'gamecatControllers', 'ngAnimate', 'ngDragDrop'])
var content_path = "http://actionitems.changemyworldnow.com/safetyfirst";
var content_path = "";
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

moduleGame.controller('stepController', function ($scope, $http, $sce, $window) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data = [
    {
        'name': "parrent",
        'mainImageUrl': content_path + "content/_assets/elements/person_parent.png",
        'imgHeader': content_path + "content/_assets/elements/header_yes.png",
        'correct' : 1,
        'text': "<p style='margin-top:10px;'>Open for <br/> parents or guardians.</p>"
    },
     {
         'name': "brother",
         'mainImageUrl': content_path + "content/_assets/elements/person_brother.png",
         'imgHeader': content_path + "content/_assets/elements/header_yes.png",
         'correct': 1,
         'text': "<p style='margin-top:10px;'>You know your brother!</p>"
     },
      {
          'name': "sister",
          'mainImageUrl': content_path + "content/_assets/elements/person_sister.png",
          'imgHeader': content_path + "content/_assets/elements/header_yes.png",
          'correct': 1,
          'text': "<p style='margin-top:17px;'>That's right, you can <br/>let your sister in!</p>"
      },
      {
          'name': "friend",
          'mainImageUrl': content_path + "content/_assets/elements/person_friend.png",
          'imgHeader': content_path + "content/_assets/elements/header_yes.png",
          'correct': 1,
          'text': "<p style='margin-top:10px;'>A friend that you know <br/>well can come in!</p>"
      },
      {
          'name': "grandparent",
          'mainImageUrl': content_path + "content/_assets/elements/person_grandparent.png",
          'imgHeader': content_path + "content/_assets/elements/header_yes.png",
          'correct': 1,
          'text': "<p style='margin-top:10px;'>Grandparents<br/>can come in!</p>"
      },
      {
          'name': "relative",
          'mainImageUrl': content_path + "content/_assets/elements/person_relative.png",
          'imgHeader': content_path + "content/_assets/elements/header_yes.png",
          'correct': 1,
          'text': "A close relative that <br/>you see frequently who<br/>your parents approve<br/>can come in."
      }, {
          'name': "cable_guy",
          'mainImageUrl': content_path + "content/_assets/elements/person_cable_guy.png",
          'imgHeader': content_path + "content/_assets/elements/header_ding_dong.png",
          'correct': 2,
          'text': "You don't know them! <br/> They'll have to come <br/>back when your<br/>parents are home."
      },
      {
          'name': "neighbor",
          'mainImageUrl': content_path + "content/_assets/elements/person_neighbor.png",
          'imgHeader': content_path + "content/_assets/elements/header_ding_dong.png",
          'correct': 2,
          'text': "<p style='margin-top:-8px;'>Keyword is new. <br/> They will have to<br/> come back and visit<br/> when your parents<br/> are home.</p>"
      }, {
          'name': "gas_man",
          'mainImageUrl': content_path + "content/_assets/elements/person_gas_man.png",
          'imgHeader': content_path + "content/_assets/elements/header_ding_dong.png",
          'correct': 2,
          'text': "Not today. <br/>Even if the person is <br/>wearing a uniform,<br/>they are still a stranger."
      },{
          'name': "flat_tire",
          'mainImageUrl': content_path + "content/_assets/elements/person_flat_tire.png",
          'imgHeader': content_path + "content/_assets/elements/header_ding_dong.png",
          'correct': 2,
          'text': "<p style='margin-top:10px;'>That person will <br/>have to call AAA.</p>"
      },{
          'name': "delivery",
          'mainImageUrl': content_path + "content/_assets/elements/person_delivery.png",
          'imgHeader': content_path + "content/_assets/elements/header_ding_dong.png",
          'correct': 2,
          'text': "Your door is not opening! <br/>They can leave the <br/>package on the stoop!"
      },
    ]
    //setTimeout(function () {
        $scope.data1 = [];
        angular.forEach($scope.data, function (item) {
            $scope.data1.push({
                item: item,
                rank: 0.5 - $window.Math.random()
            });
        });

       // console.log($scope.data1);

    //}, 500);
});

/*------------------------------*/
moduleGame.controller('mazeController', function ($scope, $http, $sce, $window) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data = [
    {
        'name': "A",
        'mainImageUrl': content_path + "content/_assets/elements/map_element_crosswalk.png",
        'mainImageUrlHover': content_path + "content/_assets/elements/map_element_crosswalk_off.png",
        'imgHeader': content_path + "content/_assets/elements/info_window_1.png",
        'text': "<p style='color:#ffffff; padding: 170px 0 0 0;'>Always look both ways <br/> when crossing the street. <br/> Stop, look and listen!</p>",
        'sound' : 'sound5',
    },

     {
         'name': "B",
         'mainImageUrl': content_path + "content/_assets/elements/map_element_bus_1.png",
         'mainImageUrlHover': content_path + "content/_assets/elements/map_element_bus_1_off.png",
         'imgHeader': content_path + "content/_assets/elements/info_window_2.png",
         'text': "<p style=' padding: 78px 0 0 12px;'>Wait for the <br/> bus on the sidewalk, <br/> not the street.</p>",
         'sound' : 'sound6',
     },
      {
          'name': "C",
          'mainImageUrl': content_path + "content/_assets/elements/map_element_bus_2.png",
          'mainImageUrlHover': content_path + "content/_assets/elements/map_element_bus_2_off.png",
          'imgHeader': content_path + "content/_assets/elements/info_window_3.png",
          'text': "<p style=' padding: 68px 0 0 0;'>If you drop <br/> something under <br/>or in front of the bus,<br/> tell the driver!<br/><br/>Don’t just reach for it.</p>",
          'sound' : 'sound7',
      },
       {
           'name': "D",
           'mainImageUrl': content_path + "content/_assets/elements/map_element_playground.png",
           'mainImageUrlHover': content_path + "content/_assets/elements/map_element_playground_off.png",
           'imgHeader': content_path + "content/_assets/elements/info_window_4.png",
           'text': "<p style=' padding: 105px 0 0 0;'>Play with others!<br/> There’s safety in numbers.</p>",
           'sound' : 'sound8',
       },
        {
            'name': "E",
            'mainImageUrl': content_path + "content/_assets/elements/map_element_electronics.png",
            'mainImageUrlHover': content_path + "content/_assets/elements/map_element_electronics_off.png",
            'imgHeader': content_path + "content/_assets/elements/info_window_5a.png",
            'text': "<p style=' padding: 130px 0 0 0;'>If a stranger tries to take <br/>your belongings, let them!<br/>Your life is more important!</p>",
            'sound' : 'sound9',
        },
         {
             'name': "F",
             'mainImageUrl': content_path + "content/_assets/elements/map_element_car.png",
             'mainImageUrlHover': content_path + "content/_assets/elements/map_element_car_off.png",
             'imgHeader': content_path + "content/_assets/elements/info_window_6.png",
             'text': "<p style=' padding: 100px 0 0 0;'>Never get into a car<br/> with a stranger.<br/>It’s always okay to say no <br/>to an adult.</p>",
             'sound' : 'sound10',
         },
          {
              'name': "G",
              'mainImageUrl': content_path + "content/_assets/elements/map_element_granny.png",
              'mainImageUrlHover': content_path + "content/_assets/elements/map_element_granny_off.png",
              'imgHeader': content_path + "content/_assets/elements/info_window_7.png",
              'text': "<p style=' padding: 170px 0 0 0;font-size:23px;'>If a stranger offers<br/> you a gift, get away<br/> as fast as you can<br/> and tell an adult!</p>",
              'sound' : 'sound11',
          }, {
              'name': "X",
              'mainImageUrl': content_path + "",
              'mainImageUrlHover': content_path + "",
              'imgHeader': content_path + "content/_assets/elements/info_window_home.png",
              'text': "<p style=' padding: 80px 0 0 0; font-size:30px'>You made<br/>it home safe!<br/>Let’s <img src='http://actionitems.changemyworldnow.com/safetyfirst/content/_assets/elements/header_stay.png' class='safe'>safe!</p>",
              'sound' : 'sound13',
          },

    ];

   function repaint2() {
    jQuery.each($scope.data, function (i, val) {
        setTimeout(function () {
            console.log(val.name);
            $('#labyrinth #maze .' + val.name).html(val.name + '<div class="box"></div>');
            $('.' + val.name + ' > .box').attr('style', 'background-image:url(' + val.mainImageUrl + ')');
            $('.poped.' + val.name + ' > .box').attr('style', 'background-image:url(' + + ')');
            $('.poped.' + val.name + ' > .box').attr('style', 'background-image:url(' + val.mainImageUrlHover + ')');
        }, 1);
    });
   };

   function onKeyup2() {
        onkeyup = function (e) {
            switch (e.keyCode) {
                case 37:
                    {
                        repaint2();
                        $('.player').removeClass('up left down');
                        $('.player').addClass('right');
                        break;
                    }
                case 38:
                    {
                        repaint2();
                        $('.player').removeClass('up left up');
                        $('.player').addClass('down');
                        break;
                    }
                case 39:
                    {
                        repaint2();
                        $('.player').removeClass('right up down');
                        $('.player').addClass('left');

                        break;
                    }
                case 40:
                    {
                        repaint2();

                        $('.player').removeClass('right left down');
                        $('.player').addClass('up');
                        break;
                    }
            }
        };
    }
    $scope.data.doClick = function (event) {
        setTimeout(function () {

            repaint2();
            onKeyup2();
        }, 200);

    };

}

);

/*------------------------------*/
moduleGame.controller('mazeHomeController', function ($scope, $http, $sce, $window) {
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    }
    $scope.data = [
    {
        'name': "J",
        'mainImageUrl': content_path + "content/_assets/elements/map_element_glass.png",
        'mainImageUrlHover': content_path + "content/_assets/elements/map_element_glass_off.png",
        'imgHeader': content_path + "content/_assets/elements/info_window_8.png",
        'text': "<p style=' padding: 137px 0 0 0;'>If you see broken glass<br/> near a door or window, <br/> don't go inside. <br/> Find a trusted adult!</p>",
        'sound': 'sound15',
    },

     {
         'name': "K",
         'mainImageUrl': content_path + "content/_assets/elements/map_element_phone.png",
         'mainImageUrlHover': content_path + "content/_assets/elements/map_element_phone_off.png",
         'imgHeader': content_path + "content/_assets/elements/info_window_9.png",
         'text': "<p style=' padding: 108px 0 0 0;'>If the phone rings <br/> and you don't know <br/> the caller, don't tell them <br/> you're home alone.</p>",
         'sound': 'sound22',
     },
      {
          'name': "L",
          'mainImageUrl': content_path + "content/_assets/elements/map_element_sink.png",
          'mainImageUrlHover': content_path + "content/_assets/elements/map_element_sink_off.png",
          'imgHeader': content_path + "content/_assets/elements/info_window_10.png",
          'text': "<p style=' padding: 111px 0 0 4px;'>Never eat or drink<br/> from bottles under the sink.</p>",
          'sound': 'sound16',
      },
       {
           'name': "M",
           'mainImageUrl': content_path + "content/_assets/elements/map_element_name.png",
           'mainImageUrlHover': content_path + "content/_assets/elements/map_element_name_off.png",
           'imgHeader': content_path + "content/_assets/elements/info_window_11.png",
           'text': "<p style=' padding: 95px 0 0 7px;'>Always know<br/> your name and address. <br/> Know who to call<br/> in case of emergency.</p>",
           'sound': 'sound17',
       },
        {
            'name': "N",
            'mainImageUrl': content_path + "content/_assets/elements/map_element_electric_plug.png",
            'mainImageUrlHover': content_path + "content/_assets/elements/map_element_electric_plug_off.png",
            'imgHeader': content_path + "content/_assets/elements/info_window_12.png",
            'text': "<p style=' padding: 150px 0 0 0;'>Never have electrical wires<br/>near water.</p>",
            'sound': 'sound18',
        },
         {
             'name': "O",
             'mainImageUrl': content_path + "content/_assets/elements/map_element_pills.png",
             'mainImageUrlHover': content_path + "content/_assets/elements/map_element_pills_off.png",
             'imgHeader': content_path + "content/_assets/elements/info_window_13.png",
             'text': "<p style=' padding: 100px 0 0 4px;'>Never, ever swallow <br/> pills you find.</p>",
             'sound': 'sound21',
         },
          {
              'name': "P",
              'mainImageUrl': content_path + "content/_assets/elements/map_element_911.png",
              'mainImageUrlHover': content_path + "content/_assets/elements/map_element_911_off.png",
              'imgHeader': content_path + "content/_assets/elements/info_window_14.png",
              'text': "<p style=' padding: 110px 0 0 0;'>If you're home alone<br/> and need help, dial 911.</p>",
              'sound': 'sound20',
          },
          {
              'name': "Q",
              'mainImageUrl': content_path + "content/_assets/elements/map_element_fire_alarm.png",
              'mainImageUrlHover': content_path + "content/_assets/elements/map_element_fire_alarm_off.png",
              'imgHeader': content_path + "content/_assets/elements/info_window_15.png",
              'text': "<p style=' padding: 134px 0 0 0;'>Ask your parents<br/>to be sure the smoke<br/>and carbon monoxide<br/> alarms are working.</p>",
              'sound': 'sound19',
          }, {
              'name': "R",
              'mainImageUrl': content_path + "",
              'mainImageUrlHover': content_path + "",
              'imgHeader': content_path + "",
              'text': "<p style=' padding: 80px 0 0 0; font-size:30px'>Ask you parrents<br/>to be sure the smoke<br/>and carbon monoxide <br/ > alarms are working.</p>",
              'sound': 'sound19',
          },

    ];

    function repaint() {
        jQuery.each($scope.data, function (i, val) {
            setTimeout(function () {
                console.log(val.name);
                $('#labyrinthHome #maze2 .' + val.name).html(val.name + '<div class="box"></div>');
                $('.' + val.name + ' > .box').attr('style', 'background-image:url(' + val.mainImageUrl + ')');
                $('.poped.' + val.name + ' > .box').attr('style', 'background-image:url(' + + ')');
                $('.poped.' + val.name + ' > .box').attr('style', 'background-image:url(' + val.mainImageUrlHover + ')');
            }, 1);
        });
    };

    function onKeyup() {
        onkeyup = function (e) {
            switch (e.keyCode) {
                case 37:
                    {
                        repaint();
                        $('.player').removeClass('up left down');
                        $('.player').addClass('right');
                        break;
                    }
                case 38:
                    {
                        repaint();
                        $('.player').removeClass('up left up');
                        $('.player').addClass('down');
                        break;
                    }
                case 39:
                    {
                        repaint();
                        $('.player').removeClass('right up down');
                        $('.player').addClass('left');

                        break;
                    }
                case 40:
                    {
                        repaint();

                        $('.player').removeClass('right left down');
                        $('.player').addClass('up');
                        break;
                    }
            }
        };

    }
    $scope.data.doClick = function (event) {
        setTimeout(function () {
            repaint();
            onKeyup();
        }, 200);

    };

}

);


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