/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	window.ENVIRONMENT = {
	  MEDIA: 'https://media-staging.changemyworldnow.com/f/'
		};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _ = __webpack_require__(4);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(5);

	var _4 = _interopRequireDefault(_3);

	var _title_screen = __webpack_require__(6);

	var _title_screen2 = _interopRequireDefault(_title_screen);

	var _imagine_screen = __webpack_require__(7);

	var _imagine_screen2 = _interopRequireDefault(_imagine_screen);

	var _lets_learn_screen = __webpack_require__(9);

	var _lets_learn_screen2 = _interopRequireDefault(_lets_learn_screen);

	var _video_screen = __webpack_require__(10);

	var _video_screen2 = _interopRequireDefault(_video_screen);

	var _many_materials_screen = __webpack_require__(11);

	var _many_materials_screen2 = _interopRequireDefault(_many_materials_screen);

	var _sort_game_level_one_screen = __webpack_require__(12);

	var _sort_game_level_one_screen2 = _interopRequireDefault(_sort_game_level_one_screen);

	var _sort_game_level_two_screen = __webpack_require__(24);

	var _sort_game_level_two_screen2 = _interopRequireDefault(_sort_game_level_two_screen);

	var _sort_game_level_three_screen = __webpack_require__(25);

	var _sort_game_level_three_screen2 = _interopRequireDefault(_sort_game_level_three_screen);

	var _congratulations_screen = __webpack_require__(26);

	var _congratulations_screen2 = _interopRequireDefault(_congratulations_screen);

	var _help_the_world_screen = __webpack_require__(27);

	var _help_the_world_screen2 = _interopRequireDefault(_help_the_world_screen);

	var _bunch_of_problems_screen = __webpack_require__(29);

	var _bunch_of_problems_screen2 = _interopRequireDefault(_bunch_of_problems_screen);

	var _printer_screen = __webpack_require__(30);

	var _printer_screen2 = _interopRequireDefault(_printer_screen);

	var _now_that_you_learned_screen = __webpack_require__(35);

	var _now_that_you_learned_screen2 = _interopRequireDefault(_now_that_you_learned_screen);

	var _list_screen = __webpack_require__(36);

	var _list_screen2 = _interopRequireDefault(_list_screen);

	var _flip_screen = __webpack_require__(38);

	var _flip_screen2 = _interopRequireDefault(_flip_screen);

	var _5 = __webpack_require__(39);

	var _6 = _interopRequireDefault(_5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.MEDIA_SERVER = ENVIRONMENT.MEDIA;
	ENVIRONMENT.MEDIA += 'Games/3DWorld/';

	var ThreeDWorld = React.createElement(skoash.Game, {
	  config: _config2.default,
	  loader: React.createElement(_2.default, null),
	  screens: {
	    0: _4.default,
	    1: _title_screen2.default,
	    2: _imagine_screen2.default,
	    3: _lets_learn_screen2.default,
	    4: _video_screen2.default,
	    5: _many_materials_screen2.default,
	    6: _sort_game_level_one_screen2.default,
	    7: _sort_game_level_two_screen2.default,
	    8: _sort_game_level_three_screen2.default,
	    9: _congratulations_screen2.default,
	    10: _help_the_world_screen2.default,
	    11: _bunch_of_problems_screen2.default,
	    12: _printer_screen2.default,
	    13: _now_that_you_learned_screen2.default,
	    14: _list_screen2.default,
	    15: _flip_screen2.default
	  },
	  menus: {
	    quit: _6.default
	  },
	  assets: [React.createElement(skoash.Font, { name: 'Molot' }), React.createElement(skoash.Font, { name: 'Source Sans Pro' }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Back.mp3' }), React.createElement(skoash.Audio, { ref: 'next', type: 'sfx', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Next.mp3' }), React.createElement(skoash.Audio, { ref: 'back', type: 'sfx', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Back.mp3' }), React.createElement(skoash.Audio, { ref: 'screen-complete', type: 'sfx', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/NextAppear.mp3' }), React.createElement(skoash.Audio, { type: 'background', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/TitleScreen.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/BKG1.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/BKG2.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/BKG3.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/BKG4.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/BKG5.mp3', loop: true }), React.createElement(skoash.Image, { className: 'hidden', src: ENVIRONMENT.MEDIA + 'ImageAssets/bkg.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: ENVIRONMENT.MEDIA + 'ImageAssets/bk.1.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: ENVIRONMENT.MEDIA + 'ImageAssets/bkg.2.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: ENVIRONMENT.MEDIA + 'ImageAssets/bkg.win.jpg' }), React.createElement('div', { className: 'background bkg-imagine' }), React.createElement('div', { className: 'background bkg-congratulations' }), React.createElement('div', { className: 'background bkg-printer' })],
	  getBackgroundIndex: function getBackgroundIndex(index, id) {
	    switch (id) {
	      case 'ios-splash':
	        return;
	      case 'title':
	        return 0;
	      case 'imageine':
	      case 'lets-learn':
	        return 1;
	      case 'sort-game-level-one':
	      case 'sort-game-level-two':
	      case 'sort-game-level-three':
	      case 'congratulations':
	        return 3;
	      case 'help-the-world':
	      case 'bunch-of-problems':
	        return 4;
	      case 'printer':
	        return 5;
	      default:
	        return 2;
	    }
	  }
	});

		skoash.start(ThreeDWorld);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  id: '3d-world',
	  title: '3D World',
	  version: 1,
	  skoash: '1.0.5',
	  dimensions: {
	    width: 960,
	    ratio: 16 / 9
	  }
	};

		exports.default = config;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loader = function (_skoash$Component) {
	  _inherits(Loader, _skoash$Component);

	  function Loader() {
	    _classCallCheck(this, Loader);

	    return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this));
	  }

	  _createClass(Loader, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { id: "loader", className: "center" },
	        React.createElement(
	          "div",
	          { className: "group" },
	          React.createElement(
	            "h2",
	            null,
	            "Loading!"
	          ),
	          React.createElement(
	            "div",
	            { className: "spinner animated" },
	            React.createElement(
	              "div",
	              { className: "spinner animated" },
	              React.createElement("div", { className: "spinner animated" })
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Loader;
	}(skoash.Component);

		exports.default = Loader;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: "ios-splash",
	      checkComplete: false,
	      completeDelay: 6000,
	      nextDelay: 3000,
	      completeOnStart: true,
	      hidePrev: true
	    }),
	    React.createElement(skoash.Image, { className: "hidden", src: "../shared/images/ios_start_ball.png" }),
	    React.createElement(skoash.Image, { className: "hidden", src: "../shared/images/ios_start_ball_anim.gif" })
	  );
		};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: "title"
	    }),
	    React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA + 'SpritesAnimations/title.gif' })
	  );
		};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: "imagine"
	    }),
	    React.createElement(skoash.Audio, {
	      type: "sfx",
	      ref: "start",
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/animation_appear.mp3'
	    }),
	    React.createElement(
	      skoash.MediaSequence,
	      null,
	      React.createElement(skoash.Audio, {
	        type: "sfx",
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/text_type.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: "sfx",
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/text_type.mp3',
	        sprite: [0, 2000]
	      })
	    ),
	    React.createElement(
	      skoash.MediaSequence,
	      null,
	      React.createElement(skoash.Audio, {
	        type: "voiceOver",
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_imagine.mp3',
	        completeTarget: "imagine"
	      }),
	      React.createElement(skoash.Audio, {
	        type: "voiceOver",
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_it_already.mp3'
	      })
	    ),
	    React.createElement(skoash.Image, {
	      className: (0, _classnames2.default)('question', {
	        show: !_.get(props, 'data.imagine.complete')
	      }),
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/wand.gif'
	    }),
	    React.createElement(skoash.Image, {
	      className: (0, _classnames2.default)('answer', {
	        show: _.get(props, 'data.imagine.complete')
	      }),
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/wand.and.printer_.gif'
	    }),
	    React.createElement(skoash.Image, {
	      className: "hidden",
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: "hidden",
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/intro.speech.balloon.png'
	    }),
	    React.createElement(
	      "div",
	      { className: "right" },
	      React.createElement(
	        "div",
	        {
	          className: (0, _classnames2.default)('words', 'imagine', {
	            start: !_.get(props, 'data.imagine.complete')
	          })
	        },
	        React.createElement(
	          "div",
	          null,
	          React.createElement(
	            "p",
	            null,
	            "Imagine a magical item"
	          )
	        ),
	        React.createElement(
	          "div",
	          null,
	          React.createElement(
	            "p",
	            null,
	            "that can make anything"
	          )
	        ),
	        React.createElement(
	          "div",
	          null,
	          React.createElement(
	            "p",
	            null,
	            "you can think of!"
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        {
	          className: (0, _classnames2.default)('words', 'exists', {
	            start: _.get(props, 'data.imagine.complete')
	          })
	        },
	        React.createElement(
	          "div",
	          null,
	          React.createElement(
	            "p",
	            null,
	            "It already exists today."
	          )
	        ),
	        React.createElement(
	          "div",
	          null,
	          React.createElement(
	            "p",
	            null,
	            "It's called 3D printing!"
	          )
	        )
	      ),
	      React.createElement("div", { className: "minion" })
	    )
	  );
	};

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: 'lets-learn',
	      onStart: function onStart() {
	        this.updateGameState({
	          path: 'start',
	          data: true
	        });
	      }
	    }),
	    React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_lets.mp3'
	    }),
	    React.createElement(skoash.Audio, {
	      type: 'sfx',
	      ref: 'start',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/text_type.mp3'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.closeupminion.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'balloon',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/speech.balloon.1.png'
	    }),
	    React.createElement(
	      skoash.Component,
	      null,
	      React.createElement(
	        'div',
	        {
	          className: (0, _classnames2.default)('words', {
	            start: _.get(props, 'data.start')
	          })
	        },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            'Let\u2019s learn about the'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            '3D printing process'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            'with this video'
	          )
	        )
	      )
	    )
	  );
	};

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: "video"
	    }),
	    React.createElement(skoash.Image, {
	      className: "hidden",
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/vid.scrn.png'
	    }),
	    React.createElement(
	      skoash.Component,
	      null,
	      React.createElement(skoash.Video, {
	        src: "https://res.cloudinary.com/changemyworldnow/video/upload/v1479831566/3D_Printing_FINAL_FILE_SMALLER_pfzv84.mp4"
	      })
	    )
	  );
		};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: 'many-materials',
	      onStart: function onStart() {
	        this.updateGameState({
	          path: 'start',
	          data: true
	        });
	      }
	    }),
	    React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_wow.mp3'
	    }),
	    React.createElement(
	      skoash.MediaSequence,
	      null,
	      React.createElement(skoash.Audio, {
	        type: 'sfx',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/text_type.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'sfx',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/text_type.mp3',
	        sprite: [0, 1000]
	      })
	    ),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.closeupminion.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'balloon',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/speech.balloon.frame7.png'
	    }),
	    React.createElement(
	      skoash.Component,
	      null,
	      React.createElement(
	        'div',
	        {
	          className: (0, _classnames2.default)('words', {
	            start: _.get(props, 'data.start')
	          })
	        },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            'Wow, there are many materials you can use'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            'to make things with a 3D printer!'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            'The most common are plastic and metal,'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            'but other materials can be used.'
	          )
	        )
	      )
	    )
	  );
	};

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (props, ref, key) {
	  return (0, _sort_game_screen_component2.default)(props, ref, key, {
	    id: 'sort-game-level-one',
	    timeout: 60000,
	    prepTimeout: 1000,
	    openOnStart: 'in-this',
	    vos: [React.createElement(
	      skoash.MediaSequence,
	      {
	        ref: 'in-this',
	        silentOnStart: true
	      },
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        completeTarget: 'in-this',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_in_this.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_be_sure.mp3'
	      })
	    ), React.createElement(
	      skoash.MediaSequence,
	      {
	        ref: 'level-up',
	        silentOnStart: true
	      },
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/level_up.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_did_you1.mp3'
	      })
	    ), React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      ref: 'try-again',
	      complete: true,
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_try_again.mp3'
	    })],
	    sfx: [React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      completeTarget: 'sfx',
	      ref: 'print',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/print_item.mp3',
	      sprite: [0, 500]
	    })],
	    revealList: [React.createElement(
	      skoash.Component,
	      { ref: 'in-this', type: 'li' },
	      React.createElement(skoash.Image, {
	        className: 'frame',
	        src: ENVIRONMENT.MEDIA + 'Frames/ins.green.frame.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'balloon',
	        src: ENVIRONMENT.MEDIA + 'ImageAssets/img.quit.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'bins',
	        src: ENVIRONMENT.MEDIA + 'ImageAssets/ins.bins.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	      }),
	      React.createElement(
	        'div',
	        {
	          className: (0, _classnames2.default)('words', 'in-this-game', {
	            show: !_.get(props, 'data.in-this.complete', false)
	          })
	        },
	        React.createElement(
	          'div',
	          null,
	          'In this game, you will sort items'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'dropped from the 3D printer'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'by the material it is made from.'
	        ),
	        React.createElement('div', { className: 'line' }),
	        React.createElement(
	          'div',
	          null,
	          'Slide the printer head to'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'drop items into the correct bin.'
	        )
	      ),
	      React.createElement(
	        'div',
	        {
	          className: (0, _classnames2.default)('words', 'be-sure', {
	            show: _.get(props, 'data.in-this.complete', false)
	          })
	        },
	        React.createElement(
	          'div',
	          null,
	          'Be sure to collect enough points'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'before the timer runs out!'
	        ),
	        React.createElement(
	          'button',
	          {
	            onClick: function onClick() {
	              skoash.trigger('updateState', {
	                path: 'reveal',
	                data: {
	                  close: true
	                }
	              });
	            }
	          },
	          'Start Game'
	        )
	      )
	    ), React.createElement(
	      skoash.Component,
	      {
	        ref: 'level-up',
	        type: 'li'
	      },
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	      }),
	      React.createElement(
	        'h3',
	        null,
	        'LEVEL UP'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        'Did You Know?'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'Even food can be 3D printed!',
	        React.createElement('br', null),
	        'While still in the experimental stages,',
	        React.createElement('br', null),
	        'NASA hopes one day',
	        React.createElement('br', null),
	        'to print food in space!'
	      )
	    ), React.createElement(
	      skoash.Component,
	      {
	        ref: 'try-again',
	        type: 'li'
	      },
	      React.createElement(skoash.Image, {
	        className: 'minion',
	        src: ENVIRONMENT.MEDIA + 'ImageAssets/try.again.minion.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'Frames/try.again.frame.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.nav.png'
	      }),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          'TRY AGAIN'
	        ),
	        'You didn\'t win this time —',
	        React.createElement('br', null),
	        'but don\'t worry, you have another chance!'
	      )
	    )]
	  });
	};

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _sort_game_screen_component = __webpack_require__(13);

	var _sort_game_screen_component2 = _interopRequireDefault(_sort_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  var onCloseReveal, onScoreComplete, getTime, onTimerComplete, onAddClassName, onCorrectCatch, onIncorrectCatch;

	  onCloseReveal = function onCloseReveal() {
	    this.updateGameState({
	      path: 'game',
	      data: {
	        stop: false,
	        start: true,
	        restart: false
	      }
	    });
	    this.updateGameState({
	      path: 'closeReveal',
	      data: false
	    });
	    this.updateGameState({
	      path: 'openReveal',
	      data: null
	    });
	    this.updateGameState({
	      path: 'score',
	      data: {
	        correct: 0,
	        incorrect: 0
	      }
	    });
	  };

	  onScoreComplete = function onScoreComplete() {
	    this.updateGameState({
	      path: 'openReveal',
	      data: 'level-up'
	    });
	    this.updateGameState({
	      path: 'game',
	      data: {
	        complete: true
	      }
	    });
	  };

	  getTime = function getTime() {
	    var timeLeft, minutesLeft, secondsLeft;
	    timeLeft = this.props.timeout / 1000 - this.state.time;
	    minutesLeft = Math.floor(timeLeft / 60);
	    secondsLeft = timeLeft % 60;
	    secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
	    return minutesLeft + ':' + secondsLeft;
	  };

	  onTimerComplete = function onTimerComplete() {
	    if (_.get(props, 'data.openReveal') === 'level-up') return;
	    this.updateGameState({
	      path: 'openReveal',
	      data: 'try-again'
	    });
	    this.updateGameState({
	      path: 'game',
	      data: {
	        start: false
	      }
	    });
	  };

	  onAddClassName = function onAddClassName(className) {
	    if (className === 'go') return;
	    this.updateGameState({
	      path: 'sfx',
	      data: {
	        playing: 'print'
	      }
	    });
	  };

	  onCorrectCatch = function onCorrectCatch(bucketRef) {
	    bucketRef.addClassName('correct');
	    setTimeout(function () {
	      bucketRef.removeClassName('correct');
	    }, 1000);
	    this.updateGameState({
	      path: 'score',
	      data: {
	        correct: _.get(props, 'data.score.correct', 0) + 1
	      }
	    });
	  };

	  onIncorrectCatch = function onIncorrectCatch(bucketRef) {
	    bucketRef.addClassName('incorrect');
	    setTimeout(function () {
	      bucketRef.removeClassName('incorrect');
	    }, 1000);
	    this.updateGameState({
	      path: 'score',
	      data: {
	        incorrect: _.get(props, 'data.score.incorrect', 0) + 1
	      }
	    });
	  };

	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: opts.id
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/thick.border.png'
	    }),
	    React.createElement(_3.default, {
	      play: _.get(props, 'data.reveal.open'),
	      children: opts.vos
	    }),
	    React.createElement(_3.default, {
	      play: _.get(props, 'data.sfx.playing'),
	      children: opts.sfx
	    }),
	    React.createElement(
	      skoash.Component,
	      { className: 'left' },
	      React.createElement(
	        _5.default,
	        {
	          max: 100,
	          increment: 10,
	          correct: _.get(props, 'data.score.correct', 0),
	          incorrect: _.get(props, 'data.score.incorrect', 0),
	          onComplete: onScoreComplete
	        },
	        React.createElement('div', null)
	      ),
	      React.createElement(_7.default, {
	        countDown: true,
	        timeout: opts.timeout,
	        leadingContent: 'TIME LEFT',
	        getTime: getTime,
	        stop: _.get(props, 'data.game.complete', false),
	        complete: _.get(props, 'data.game.complete', false),
	        checkComplete: _.get(props, 'data.game.start', false),
	        restart: _.get(props, 'data.game.start', false),
	        onComplete: onTimerComplete
	      })
	    ),
	    React.createElement(
	      skoash.Component,
	      { className: 'main' },
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.game1.bins.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.game1.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.game1.printer.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'ImageAssets/plus.png'
	      }),
	      React.createElement(
	        _9.default,
	        {
	          leftBound: 70,
	          rightBound: 820,
	          on: _.get(props, 'data.game.start', false),
	          start: _.get(props, 'data.game.start', false),
	          stop: _.get(props, 'data.game.complete', false),
	          prepClasses: ['starting', 'ready', 'set', 'go'],
	          prepTimeout: opts.prepTimeout,
	          onAddClassName: onAddClassName,
	          bin: React.createElement(_11.default, {
	            completeOnStart: true,
	            checkComplete: false,
	            bin: [React.createElement(_15.default, {
	              className: 'milk',
	              message: 'other'
	            }), React.createElement(_15.default, {
	              className: 'shoes',
	              message: 'other'
	            }), React.createElement(_15.default, {
	              className: 'cup',
	              message: 'plastic'
	            }), React.createElement(_15.default, {
	              className: 'box',
	              message: 'other'
	            }), React.createElement(_15.default, {
	              className: 'glasses',
	              message: 'metal'
	            }), React.createElement(_15.default, {
	              className: 'whistle',
	              message: 'metal'
	            }), React.createElement(_15.default, {
	              className: 'car',
	              message: 'metal'
	            }), React.createElement(_15.default, {
	              className: 'lego',
	              message: 'plastic'
	            }), React.createElement(_15.default, {
	              className: 'silver',
	              message: 'metal'
	            }), React.createElement(_15.default, {
	              className: 'slinky',
	              message: 'metal'
	            }), React.createElement(_15.default, {
	              className: 'gears',
	              message: 'metal'
	            }), React.createElement(_15.default, {
	              className: 'nails',
	              message: 'metal'
	            })]
	          })
	        },
	        React.createElement(
	          'div',
	          { className: 'left' },
	          React.createElement('div', null),
	          React.createElement('div', null),
	          React.createElement('div', null)
	        ),
	        React.createElement(
	          'div',
	          { className: 'right' },
	          React.createElement('div', null),
	          React.createElement('div', null),
	          React.createElement('div', null)
	        )
	      ),
	      React.createElement(_13.default, {
	        completeOnStart: true,
	        checkComplete: false,
	        start: _.get(props, 'data.game.start', false),
	        bucket: [React.createElement(skoash.Component, { className: 'plastic', message: 'plastic' }), React.createElement(skoash.Component, { className: 'metal', message: 'metal' }), React.createElement(skoash.Component, { className: 'other', message: 'other' })],
	        catchableRefs: _.get(props, 'data.dropper.refs', []),
	        onCorrect: onCorrectCatch,
	        onIncorrect: onIncorrectCatch,
	        assets: [React.createElement(skoash.Audio, {
	          type: 'voiceOver',
	          ref: 'correct',
	          src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Correct.mp3'
	        }), React.createElement(skoash.Audio, {
	          type: 'voiceOver',
	          ref: 'incorrect',
	          src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Incorrect.mp3'
	        })]
	      })
	    ),
	    React.createElement(_17.default, {
	      openOnStart: opts.openOnStart,
	      openTarget: 'reveal',
	      openReveal: _.get(props, 'data.openReveal', false),
	      closeReveal: _.get(props, 'data.reveal.close', false),
	      onClose: onCloseReveal,
	      list: opts.revealList
	    })
	  );
	};

	var _2 = __webpack_require__(14);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(15);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(16);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(17);

	var _9 = _interopRequireDefault(_8);

	var _10 = __webpack_require__(19);

	var _11 = _interopRequireDefault(_10);

	var _12 = __webpack_require__(21);

	var _13 = _interopRequireDefault(_12);

	var _14 = __webpack_require__(20);

	var _15 = _interopRequireDefault(_14);

	var _16 = __webpack_require__(23);

	var _17 = _interopRequireDefault(_16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MediaCollection = function (_skoash$Component) {
	  _inherits(MediaCollection, _skoash$Component);

	  function MediaCollection() {
	    _classCallCheck(this, MediaCollection);

	    return _possibleConstructorReturn(this, (MediaCollection.__proto__ || Object.getPrototypeOf(MediaCollection)).apply(this, arguments));
	  }

	  _createClass(MediaCollection, [{
	    key: "play",
	    value: function play(ref) {
	      if (this.refs[ref]) {
	        this.refs[ref].play();
	        this.props.onPlay.call(this, ref);
	      }
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(props) {
	      _get(MediaCollection.prototype.__proto__ || Object.getPrototypeOf(MediaCollection.prototype), "componentWillReceiveProps", this).call(this, props);

	      if (props.play && props.play !== this.props.play) {
	        this.play(props.play);
	      }
	    }
	  }]);

	  return MediaCollection;
	}(skoash.Component);

	MediaCollection.defaultProps = _.defaults({
	  onPlay: _.noop
	}, skoash.Component.defaultProps);

		exports.default = MediaCollection;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Score = function (_skoash$Component) {
	  _inherits(Score, _skoash$Component);

	  function Score() {
	    _classCallCheck(this, Score);

	    var _this = _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).call(this));

	    _this.state = {
	      score: 0
	    };

	    _this.checkComplete = _this.checkComplete.bind(_this);
	    return _this;
	  }

	  _createClass(Score, [{
	    key: 'checkComplete',
	    value: function checkComplete() {
	      if (!this.props.checkComplete || !this.state.ready) return;
	      if (!this.props.max) return;
	      if ((this.state.score >= this.props.max || this.props.correct >= this.props.max) && !this.state.complete) this.complete();
	    }
	  }, {
	    key: 'bootstrap',
	    value: function bootstrap() {
	      _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'bootstrap', this).call(this);

	      this.setState({
	        score: this.props.startingScore
	      });
	    }
	  }, {
	    key: 'complete',
	    value: function complete() {
	      var _this2 = this;

	      _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'complete', this).call(this);

	      setTimeout(function () {
	        if (_this2.props.resetOnComplete) {
	          _this2.setScore({
	            correct: 0,
	            incorrect: 0
	          });
	        }
	      }, this.props.completeDelay);
	    }
	  }, {
	    key: 'checkScore',
	    value: function checkScore(props) {
	      if (!props.max) return;
	      if (this.state.score >= props.max && (!this.state.complete || props.multipleCompletes)) {
	        this.complete();
	      } else if (this.state.complete && !props.complete) {
	        this.incomplete();
	      }
	    }
	  }, {
	    key: 'up',
	    value: function up(increment) {
	      increment = _.isFinite(increment) ? increment : _.isFinite(this.props.increment) ? this.props.increment : 1;
	      if (!_.isFinite(increment)) throw 'increment must be finite';

	      this.updateScore(increment);
	    }
	  }, {
	    key: 'down',
	    value: function down(increment) {
	      increment = _.isFinite(increment) ? increment : _.isFinite(this.props.downIncrement) ? this.props.downIncrement : _.isFinite(this.props.increment) ? this.props.increment : 1;
	      if (!_.isFinite(increment)) throw 'increment must be finite';

	      this.updateScore(-1 * increment);
	    }
	  }, {
	    key: 'updateScore',
	    value: function updateScore(increment) {
	      var _this3 = this;

	      this.setState({
	        score: this.state.score + increment
	      }, function () {
	        _this3.updateGameState({
	          path: _this3.props.dataTarget,
	          data: {
	            score: _this3.state.score
	          }
	        });

	        _this3.checkScore(_this3.props);
	        _this3.props.onUpdateScore.call(_this3, _this3.state.score);
	      });
	    }
	  }, {
	    key: 'setScore',
	    value: function setScore(props) {
	      var _this4 = this;

	      var upIncrement, downIncrement, score;

	      if (_.isFinite(props)) {
	        score = props;
	      } else {
	        upIncrement = _.isFinite(props.increment) ? props.increment : 1;
	        downIncrement = _.isFinite(props.downIncrement) ? props.downIncrement : _.isFinite(props.increment) ? props.increment : 1;
	        score = upIncrement * props.correct - downIncrement * props.incorrect;
	      }

	      this.setState({
	        score: score
	      }, function () {
	        _this4.checkScore(props);
	        _this4.props.onUpdateScore.call(_this4, score);
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'componentWillReceiveProps', this).call(this, props);

	      if (props.correct !== this.props.correct || props.incorrect !== this.props.incorrect) {
	        this.setScore(props);
	      }
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('score', 'score-' + this.state.score, _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        _extends({}, this.props, { className: this.getClassNames(), 'data-max': this.props.max, 'data-score': this.state.score, score: this.state.score }),
	        this.props.leadingContent,
	        React.createElement(
	          'span',
	          null,
	          this.state.score
	        ),
	        this.props.children
	      );
	    }
	  }]);

	  return Score;
	}(skoash.Component);

	Score.defaultProps = _.defaults({
	  checkComplete: false,
	  startingScore: 0,
	  correct: 0,
	  incorrect: 0,
	  onUpdateScore: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Score;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Timer = function (_skoash$Component) {
	  _inherits(Timer, _skoash$Component);

	  function Timer() {
	    _classCallCheck(this, Timer);

	    var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this));

	    _this.state = {
	      time: 0,
	      stamp: 0
	    };

	    _this.checkComplete = _this.checkComplete.bind(_this);
	    return _this;
	  }

	  _createClass(Timer, [{
	    key: 'checkComplete',
	    value: function checkComplete() {
	      var _this2 = this;

	      var time = Date.now();

	      if (!this.props.checkComplete) return;

	      if (!this.state.started || this.state.paused) return;

	      if (time >= this.state.stamp) {
	        this.setState({
	          stamp: time + 1000,
	          time: this.state.time + 1000
	        }, function () {
	          if (_this2.state.time >= _this2.props.timeout) {
	            _this2.complete();
	            _this2.stop();
	          } else {
	            if (typeof _this2.props.onCheckComplete === 'function') _this2.props.onCheckComplete.call(_this2);
	            window.requestAnimationFrame(_this2.checkComplete);
	          }
	        });
	      } else {
	        window.requestAnimationFrame(this.checkComplete);
	      }
	    }
	  }, {
	    key: 'incompleteRefs',
	    value: function incompleteRefs() {
	      this.restart();
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      var _this3 = this;

	      if (!this.state.ready) return;
	      if (this.state.complete) this.incomplete();

	      this.setState({
	        time: 0,
	        stamp: 0
	      }, function () {
	        if (_this3.state.started) {
	          _this3.checkComplete();
	        } else {
	          _this3.start();
	        }
	      });
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (!this.state.started) return;
	      this.setState({
	        started: false
	      });
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (!this.state.started) return;
	      this.setState({
	        paused: true
	      });
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      var _this4 = this;

	      if (!this.state.paused) return;
	      this.setState({
	        paused: false
	      }, function () {
	        if (_this4.state.started) {
	          _this4.checkComplete();
	        } else {
	          _this4.start();
	        }
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      _get(Timer.prototype.__proto__ || Object.getPrototypeOf(Timer.prototype), 'componentWillReceiveProps', this).call(this, props);

	      if (props.restart && props.restart !== this.props.restart) {
	        this.restart();
	      }
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('timer', _get(Timer.prototype.__proto__ || Object.getPrototypeOf(Timer.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var time = this.props.getTime.call(this);
	      return React.createElement(
	        'div',
	        _extends({}, this.props, { className: this.getClassNames(), time: time }),
	        this.props.leadingContent,
	        React.createElement(
	          'span',
	          null,
	          time
	        ),
	        this.props.children
	      );
	    }
	  }]);

	  return Timer;
	}(skoash.Component);

	Timer.defaultProps = _.defaults({
	  getTime: function getTime() {
	    return moment(this.props.countDown ? this.props.timeout - this.state.time : this.state.time).format(this.props.format);
	  },
	  format: 'm:ss',
	  leadingContent: '',
	  timeout: 60000,
	  countDown: false
	}, skoash.Component.defaultProps);

		exports.default = Timer;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(18);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(19);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(20);

	var _7 = _interopRequireDefault(_6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropper = function (_Draggable) {
	  _inherits(Dropper, _Draggable);

	  function Dropper() {
	    _classCallCheck(this, Dropper);

	    var _this = _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).call(this));

	    _this.state = _.defaults({
	      items: {},
	      itemCount: 0,
	      itemEndXs: {},
	      direction: ''
	    }, _this.state);

	    _this.next = _this.next.bind(_this);
	    return _this;
	  }

	  _createClass(Dropper, [{
	    key: 'next',
	    value: function next(on) {
	      var _this2 = this;

	      var items, index;

	      if (!this.state.started || !this.props.on && !on) return;

	      index = this.state.itemCount;
	      items = this.state.items;
	      items[index] = this.refs.bin.get(1)[0];

	      this.setState({
	        items: items,
	        itemCount: index + 1
	      }, function () {
	        var timeoutFunction = function timeoutFunction(i) {
	          var itemRef, itemEndXs;
	          itemRef = _this2.refs['items-' + index];
	          if (itemRef) {
	            itemRef.addClassName(_this2.props.prepClasses[i]);
	            _this2.props.onAddClassName.call(_this2, _this2.props.prepClasses[i]);
	            if (i === _this2.props.prepClasses.length - 1) {
	              itemEndXs = _this2.state.itemEndXs;
	              itemEndXs[index] = _this2.state.endX;
	              ReactDOM.findDOMNode(itemRef).addEventListener('transitionend', function () {
	                items = _this2.state.items;
	                delete items[index];
	                _this2.setState({
	                  items: items,
	                  itemEndXs: itemEndXs
	                });
	              });
	            }
	          }

	          if (i === _this2.props.prepClasses.length) _this2.next();
	        };

	        var _loop = function _loop(i) {
	          setTimeout(function () {
	            timeoutFunction(i);
	          }, i * _this2.props.prepTimeout);
	        };

	        for (var i = 0; i <= _this2.props.prepClasses.length; i++) {
	          _loop(i);
	        }

	        _this2.updateGameState({
	          path: _this2.props.refsTarget,
	          data: {
	            refs: _.filter(_this2.refs, function (v, k) {
	              return !k.indexOf('items-');
	            })
	          }
	        });
	      });
	    }
	  }, {
	    key: 'moveEvent',
	    value: function moveEvent(e) {
	      var endX;

	      if (e.targetTouches && e.targetTouches[0]) {
	        e.pageX = e.targetTouches[0].pageX;
	      }

	      endX = Math.min(Math.max(e.pageX - this.state.grabX, this.props.leftBound), this.props.rightBound);

	      this.setState({
	        endX: endX,
	        direction: endX > this.state.endX ? 'right' : 'left'
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'componentWillReceiveProps', this).call(this, props);

	      if (props.on === true && props.on !== this.props.on) {
	        this.next(true);
	      }
	    }
	  }, {
	    key: 'getItemStyle',
	    value: function getItemStyle(key) {
	      var endX, x;

	      endX = this.state.itemEndXs[key] || this.state.endX;
	      x = (endX - this.state.startX) / this.state.zoom;

	      return {
	        transform: 'translateX(' + x + 'px)',
	        WebkitTransform: 'translateX(' + x + 'px)'
	      };
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      var x = (this.state.endX - this.state.startX) / this.state.zoom;

	      return {
	        transform: 'translateX(' + x + 'px)',
	        WebkitTransform: 'translateX(' + x + 'px)'
	      };
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('dropper', this.state.direction, _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'getClassNames', this).call(this));
	    }

	    /*
	     * shortid is intentionally not used for key here because we want to make sure
	     * that the element is transitioned and not replaced.
	     */

	  }, {
	    key: 'renderItems',
	    value: function renderItems() {
	      var _this3 = this;

	      return _.map(this.state.items, function (item, key) {
	        var ref = 'items-' + key;
	        if (!item) return null;
	        return React.createElement(item.type, _extends({}, item.props, {
	          style: _this3.getItemStyle(key),
	          'data-ref': ref,
	          'data-message': item.props.message,
	          ref: ref,
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'renderBin',
	    value: function renderBin() {
	      return React.createElement(this.props.bin.type, _extends({}, this.props.bin.props, {
	        ref: 'bin'
	      }));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        {
	          className: this.getClassNames()
	        },
	        this.renderBin(),
	        React.createElement(
	          'div',
	          {
	            ref: 'el',
	            className: 'el',
	            style: this.getStyle()
	          },
	          this.renderContentList()
	        ),
	        React.createElement(
	          'ul',
	          { className: 'items' },
	          this.renderItems()
	        )
	      );
	    }
	  }]);

	  return Dropper;
	}(_3.default);

	Dropper.defaultProps = _.defaults({
	  prepClasses: ['ready', 'set', 'go'],
	  prepTimeout: 1000,
	  bin: React.createElement(_5.default, {
	    bin: [React.createElement(_7.default, null)]
	  }),
	  onStart: function onStart() {
	    this.next();
	  },
	  leftBound: 0,
	  rightBound: 800,
	  refsTarget: 'dropper',
	  on: true
	}, _3.default.defaultProps);

		exports.default = Dropper;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Draggable = function (_skoash$Component) {
	  _inherits(Draggable, _skoash$Component);

	  function Draggable() {
	    _classCallCheck(this, Draggable);

	    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

	    _this.state = {
	      startX: 0,
	      startY: 0,
	      endX: 0,
	      endY: 0,
	      zoom: 1
	    };

	    _this.mouseDown = _this.mouseDown.bind(_this);
	    _this.mouseUp = _this.mouseUp.bind(_this);

	    _this.moveEvent = _this.moveEvent.bind(_this);

	    _this.touchStart = _this.touchStart.bind(_this);
	    _this.touchEnd = _this.touchEnd.bind(_this);
	    return _this;
	  }

	  _createClass(Draggable, [{
	    key: 'shouldDrag',
	    value: function shouldDrag() {
	      return true;
	    }
	  }, {
	    key: 'incomplete',
	    value: function incomplete() {
	      this.markIncorrect();
	      this.returnToStart();

	      _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'incomplete', this).call(this);
	    }
	  }, {
	    key: 'markCorrect',
	    value: function markCorrect() {
	      this.setState({
	        correct: true
	      });
	    }
	  }, {
	    key: 'markIncorrect',
	    value: function markIncorrect() {
	      this.setState({
	        correct: false
	      });
	    }
	  }, {
	    key: 'startEvent',
	    value: function startEvent(e, cb) {
	      var pageX, pageY, rect, startX, startY, endX, endY, grabX, grabY;

	      if (e.target !== this.refs.el) return;
	      if (!this.shouldDrag()) return;

	      if (e.targetTouches && e.targetTouches[0]) {
	        pageX = e.targetTouches[0].pageX;
	        pageY = e.targetTouches[0].pageY;
	        rect = e.target.getBoundingClientRect();
	        e = e.targetTouches[0];
	        e.offsetX = pageX - rect.left;
	        e.offsetY = pageY - rect.top;
	      }

	      grabX = e.offsetX;
	      grabY = e.offsetY;

	      startX = endX = e.pageX - grabX;
	      startY = endY = e.pageY - grabY;

	      if (!this.state.firstX) {
	        this.setState({
	          firstX: startX,
	          firstY: startY
	        });
	      }

	      if (!this.props.return) {
	        startX = _.isFinite(this.state.grabX) ? this.state.startX + this.state.grabX - grabX : startX;
	        startY = _.isFinite(this.state.grabY) ? this.state.startY + this.state.grabY - grabY : startY;
	      }

	      this.setState({
	        dragging: true,
	        return: false,
	        startX: startX,
	        startY: startY,
	        grabX: grabX,
	        grabY: grabY,
	        endX: endX,
	        endY: endY
	      });

	      if (typeof this.props.dragRespond === 'function') {
	        this.props.dragRespond(this.props.message);
	      }

	      if (typeof cb === 'function') {
	        cb.call(this);
	      }
	    }
	  }, {
	    key: 'attachMouseEvents',
	    value: function attachMouseEvents() {
	      window.addEventListener('mousemove', this.moveEvent);
	      window.addEventListener('mouseup', this.mouseUp);
	    }
	  }, {
	    key: 'attachTouchEvents',
	    value: function attachTouchEvents() {
	      window.addEventListener('touchmove', this.moveEvent);
	      window.addEventListener('touchend', this.touchEnd);
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(e) {
	      this.startEvent(e, this.attachMouseEvents);
	    }
	  }, {
	    key: 'touchStart',
	    value: function touchStart(e) {
	      this.startEvent(e, this.attachTouchEvents);
	    }
	  }, {
	    key: 'moveEvent',
	    value: function moveEvent(e) {
	      if (e.targetTouches && e.targetTouches[0]) {
	        e.pageX = e.targetTouches[0].pageX;
	        e.pageY = e.targetTouches[0].pageY;
	      }

	      this.setState({
	        endX: e.pageX - this.state.grabX,
	        endY: e.pageY - this.state.grabY
	      });
	    }
	  }, {
	    key: 'returnToStart',
	    value: function returnToStart() {
	      if (this.state.firstX) {
	        this.setState({
	          dragging: false,
	          return: true,
	          endX: this.state.firstX,
	          endY: this.state.firstY
	        });
	      }
	    }
	  }, {
	    key: 'endEvent',
	    value: function endEvent(cb) {
	      this.dropRespond();

	      if (this.props.return) {
	        this.returnToStart();
	      } else {
	        this.setState({
	          dragging: false,
	          return: this.state.return
	        });
	      }

	      if (typeof cb === 'function') {
	        cb.call(this);
	      }
	    }
	  }, {
	    key: 'detachMouseEvents',
	    value: function detachMouseEvents() {
	      window.removeEventListener('mousemove', this.moveEvent);
	      window.removeEventListener('mouseup', this.mouseUp);
	    }
	  }, {
	    key: 'detachTouchEvents',
	    value: function detachTouchEvents() {
	      window.removeEventListener('touchmove', this.moveEvent);
	      window.removeEventListener('touchend', this.touchEnd);
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp() {
	      this.endEvent(this.detachMouseEvents);
	    }
	  }, {
	    key: 'touchEnd',
	    value: function touchEnd() {
	      this.endEvent(this.detachTouchEvents);
	    }
	  }, {
	    key: 'dropRespond',
	    value: function dropRespond() {
	      var corners;

	      corners = this.setCorners();

	      if (typeof this.props.dropRespond === 'function') {
	        this.props.dropRespond(this.props.message, corners);
	      }
	    }
	  }, {
	    key: 'setCorners',
	    value: function setCorners() {
	      var top,
	          left,
	          width,
	          height,
	          el,
	          corners = [];

	      left = 0;
	      top = 0;
	      el = this.refs.el;
	      width = el.offsetWidth;
	      height = el.offsetHeight;

	      while (el) {
	        if (el.className.indexOf('screen') !== -1) {
	          break;
	        }

	        left += el.offsetLeft || 0;
	        top += el.offsetTop || 0;
	        el = el.offsetParent;
	      }

	      left += (this.state.endX - this.state.startX) / this.state.zoom;
	      top += (this.state.endY - this.state.startY) / this.state.zoom;

	      for (var i = 0; i < 4; i++) {
	        corners.push({
	          x: left + width * (i === 1 || i === 2 ? 1 : 0),
	          y: top + height * (i > 1 ? 1 : 0)
	        });
	      }

	      this.setState({
	        corners: corners
	      });

	      return corners;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.bootstrap();
	    }
	  }, {
	    key: 'bootstrap',
	    value: function bootstrap() {
	      _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'bootstrap', this).call(this);

	      this.setZoom();

	      this.refs.el.addEventListener('mousedown', this.mouseDown);
	      this.refs.el.addEventListener('touchstart', this.touchStart);

	      window.addEventListener('resize', this.setZoom.bind(this));
	    }
	  }, {
	    key: 'setZoom',
	    value: function setZoom() {
	      var _this2 = this;

	      skoash.trigger('getState').then(function (state) {
	        _this2.setState({
	          zoom: state.scale
	        });
	      });
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      var x, y;

	      x = (this.state.endX - this.state.startX) / this.state.zoom;
	      y = (this.state.endY - this.state.startY) / this.state.zoom;

	      return {
	        transform: 'translateX(' + x + 'px) translateY(' + y + 'px)',
	        WebkitTransform: 'translateX(' + x + 'px) translateY(' + y + 'px)'
	      };
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      var _classNames;

	      return (0, _classnames2.default)((_classNames = {
	        draggable: true
	      }, _defineProperty(_classNames, this.props.className, this.props.className), _defineProperty(_classNames, this.props.message, this.props.message), _defineProperty(_classNames, 'DRAGGING', this.state.dragging), _defineProperty(_classNames, 'RETURN', this.state.return), _defineProperty(_classNames, 'CORRECT', this.state.correct), _classNames), _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        {
	          ref: 'el',
	          className: this.getClassNames(),
	          style: this.getStyle()
	        },
	        this.renderContentList()
	      );
	    }
	  }]);

	  return Draggable;
	}(skoash.Component);

		exports.default = Draggable;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Randomizer = function (_skoash$Component) {
	  _inherits(Randomizer, _skoash$Component);

	  function Randomizer() {
	    _classCallCheck(this, Randomizer);

	    return _possibleConstructorReturn(this, (Randomizer.__proto__ || Object.getPrototypeOf(Randomizer)).apply(this, arguments));
	  }

	  _createClass(Randomizer, [{
	    key: 'getAll',
	    value: function getAll() {
	      return _.shuffle(this.props.bin);
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	      var items,
	          bin = [];

	      if (this.props.remain && this.state.bin) {
	        bin = this.state.bin;
	      }

	      while (bin.length < amount) {
	        bin = bin.concat(_.shuffle(this.props.bin));
	      }

	      items = bin.splice(0, amount);

	      if (this.props.remain) {
	        this.setState({ bin: bin });
	      }

	      return items;
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('randomizer', _get(Randomizer.prototype.__proto__ || Object.getPrototypeOf(Randomizer.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'renderBin',
	    value: function renderBin() {
	      return _.map(this.props.bin, function (li, key) {
	        var ref = li.ref || li.props && li.props['data-ref'] || key;
	        return React.createElement(li.type, _extends({}, li.props, {
	          'data-ref': ref,
	          ref: ref,
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'ul',
	        { className: this.getClassNames() },
	        this.renderBin()
	      );
	    }
	  }]);

	  return Randomizer;
	}(skoash.Component);

	Randomizer.defaultProps = _.defaults({
	  bin: [],
	  remain: false,
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    return false;
	  }
	}, skoash.Component.defaultProps);

		exports.default = Randomizer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catchable = function (_skoash$Component) {
	  _inherits(Catchable, _skoash$Component);

	  function Catchable() {
	    _classCallCheck(this, Catchable);

	    var _this = _possibleConstructorReturn(this, (Catchable.__proto__ || Object.getPrototypeOf(Catchable)).call(this));

	    _this.state = {
	      canCatch: true
	    };
	    _this.reset = _this.reset.bind(_this);
	    return _this;
	  }

	  _createClass(Catchable, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'bootstrap', this).call(this);
	      this.DOMNode = ReactDOM.findDOMNode(this);
	    }
	  }, {
	    key: 'markCaught',
	    value: function markCaught() {
	      if (!this.state.ready) return;
	      this.setState({ canCatch: false });
	      this.props.onCaught.call(this);
	    }
	  }, {
	    key: 'canCatch',
	    value: function canCatch() {
	      return !this.props.disabled && this.state.canCatch;
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('catchable', {
	        CAUGHT: !this.state.canCatch
	      }, _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      if (this.state.ready && !this.props.disabled && this.props.reCatchable) {
	        this.setState({ canCatch: true });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement('li', _extends({}, this.props, { className: this.getClassNames() }));
	    }
	  }]);

	  return Catchable;
	}(skoash.Component);

	Catchable.defaultProps = _.defaults({
	  disabled: false,
	  isCorrect: true,
	  reCatchable: true,
	  onCaught: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Catchable;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _2 = __webpack_require__(22);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catcher = function (_Catch) {
	  _inherits(Catcher, _Catch);

	  function Catcher() {
	    _classCallCheck(this, Catcher);

	    return _possibleConstructorReturn(this, (Catcher.__proto__ || Object.getPrototypeOf(Catcher)).apply(this, arguments));
	  }

	  _createClass(Catcher, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      skoash.Component.prototype.bootstrap.call(this);
	      window.addEventListener('resize', this.onResize);
	      this.onResize();
	    }
	  }, {
	    key: 'onReady',
	    value: function onReady() {
	      this.bucketNodes = _.reduce(this.refs, function (a, v, k) {
	        if (k.indexOf('buckets-')) return a;
	        a[k] = ReactDOM.findDOMNode(v);
	        return a;
	      }, {});
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      var _this2 = this;

	      skoash.trigger('getState').then(function (state) {
	        var zoom = state.scale;
	        _this2.setState({
	          zoom: zoom
	        });
	      });
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      var _this3 = this;

	      if (!this.state.started || this.state.paused) return;
	      _.each(this.bucketNodes, function (bucketNode, bucketRefKey) {
	        var bucketRect = bucketNode.getBoundingClientRect();
	        _.each(_this3.props.catchableRefs, function (catchableRef) {
	          if (_this3.isColliding(bucketRect, catchableRef.DOMNode.getBoundingClientRect())) {
	            _this3.selectCatchable(_this3.refs[bucketRefKey], catchableRef);
	          }
	        });
	      });

	      window.requestAnimationFrame(this.checkCollisions);
	    }
	  }, {
	    key: 'selectCatchable',
	    value: function selectCatchable(bucketRef, catchableRef) {
	      if (!this.state.started || this.state.paused || !this.state.canCatch || !catchableRef.canCatch()) return;
	      catchableRef.markCaught();
	      if (catchableRef.props.message === bucketRef.props.message) {
	        this.correct(bucketRef, catchableRef);
	      } else {
	        this.incorrect(bucketRef, catchableRef);
	      }
	    }
	  }, {
	    key: 'correct',
	    value: function correct(bucketRef, catchableRef) {
	      this.playMedia('correct');
	      this.props.onCorrect.call(this, bucketRef, catchableRef);
	    }
	  }, {
	    key: 'incorrect',
	    value: function incorrect(bucketRef, catchableRef) {
	      this.playMedia('incorrect');
	      this.props.onIncorrect.call(this, bucketRef, catchableRef);
	    }
	  }, {
	    key: 'renderBucket',
	    value: function renderBucket() {
	      var _this4 = this;

	      return _.map([].concat(this.props.bucket), function (bucket, key) {
	        return React.createElement(bucket.type, _extends({}, bucket.props, {
	          ref: 'buckets-' + key,
	          style: _this4.getStyle(),
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: this.getClassNames() },
	        this.renderContentList('assets'),
	        this.renderBucket()
	      );
	    }
	  }]);

	  return Catcher;
	}(_3.default);

		exports.default = Catcher;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(20);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catch = function (_skoash$Component) {
	  _inherits(Catch, _skoash$Component);

	  function Catch() {
	    _classCallCheck(this, Catch);

	    var _this = _possibleConstructorReturn(this, (Catch.__proto__ || Object.getPrototypeOf(Catch)).call(this));

	    _this.state = {
	      canCatch: true
	    };

	    _this.onMouseMove = _this.onMouseMove.bind(_this);
	    _this.onResize = _this.onResize.bind(_this);
	    _this.checkCollisions = _this.checkCollisions.bind(_this);
	    return _this;
	  }

	  _createClass(Catch, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      _get(Catch.prototype.__proto__ || Object.getPrototypeOf(Catch.prototype), 'bootstrap', this).call(this);
	      this.onResize();
	      this.attachMouseEvents();
	      window.addEventListener('resize', this.onResize);

	      this.bucketNode = ReactDOM.findDOMNode(this.refs.bucket);
	      this.catchableNodes = _.map(this.props.catchables, function (val, key) {
	        return ReactDOM.findDOMNode(this.refs[key + '-catchable']);
	      }.bind(this));
	      _.forEach(this.catchableNodes, function (node, key) {
	        var catchableRef = this.refs[key + '-catchable'];
	        node.addEventListener('animationiteration', catchableRef.reset, false);
	      }.bind(this));
	    }
	  }, {
	    key: 'attachMouseEvents',
	    value: function attachMouseEvents() {
	      var catchRef = this.refs['catch-component'];
	      if (catchRef) {
	        catchRef.addEventListener('mousemove', this.onMouseMove);
	        catchRef.addEventListener('touchstart', this.onMouseMove);
	        catchRef.addEventListener('touchmove', this.onMouseMove);
	      }
	    }
	  }, {
	    key: 'onMouseMove',
	    value: function onMouseMove(e) {
	      this.setState({
	        mouseX: e.pageX
	      });
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      var _this2 = this;

	      skoash.trigger('getState').then(function (state) {
	        var zoom = state.scale;
	        var edges = _this2.getEdges(_this2.bucketNode);
	        var bucketWidth = edges.right - edges.left;
	        var leftBound = _this2.bucketNode.offsetParent ? _this2.bucketNode.offsetParent.offsetWidth - bucketWidth : 0;

	        _this2.setState({
	          bucketTop: edges.top,
	          bucketBottom: edges.bottom,
	          bucketWidth: bucketWidth,
	          leftBound: leftBound,
	          zoom: zoom
	        });
	      });
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      _get(Catch.prototype.__proto__ || Object.getPrototypeOf(Catch.prototype), 'start', this).call(this, this.checkCollisions);
	      this.bootstrap();
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      this.checkCollisions();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.setState({
	        started: false
	      });
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.state.started) {
	        this.setState({
	          paused: true
	        });
	      }
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      var _this3 = this;

	      if (this.state.paused) {
	        this.setState({
	          paused: false
	        }, function () {
	          _this3.checkCollisions();
	        });
	      }
	    }
	  }, {
	    key: 'selectCatchable',
	    value: function selectCatchable(catchableNode, key) {
	      if (!this.state.started || this.state.paused || !this.state.canCatch || !catchableNode.canCatch()) return;
	      catchableNode.markCaught();
	      if (catchableNode.props.isCorrect) {
	        this.correct(catchableNode, key);
	      } else {
	        this.incorrect(catchableNode, key);
	      }
	    }
	  }, {
	    key: 'correct',
	    value: function correct(catchable, key) {
	      this.playMedia('correct');
	      this.props.onCorrect.call(this, catchable, key);
	    }
	  }, {
	    key: 'incorrect',
	    value: function incorrect(catchable, key) {
	      this.playMedia('incorrect');
	      this.props.onIncorrect.call(this, catchable, key);
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      if (!this.state.started || this.state.paused) return;
	      var bucketRect = this.bucketNode.getBoundingClientRect();
	      _.forEach(this.catchableNodes, function (val, key) {
	        if (this.isColliding(bucketRect, val.getBoundingClientRect())) {
	          this.selectCatchable(this.refs[key + '-catchable'], key);
	        }
	      }.bind(this));
	      window.requestAnimationFrame(this.checkCollisions);
	    }
	  }, {
	    key: 'isColliding',
	    value: function isColliding(bucketRect, catchRect) {
	      var xCenter = catchRect.left + (catchRect.right - catchRect.left) / 2;
	      var yOffset = (catchRect.bottom - catchRect.top) / 6;
	      return bucketRect.top < catchRect.bottom - yOffset && bucketRect.top > catchRect.top + yOffset && xCenter > bucketRect.left && xCenter < bucketRect.right;
	    }
	  }, {
	    key: 'getEdges',
	    value: function getEdges(el) {
	      var top, left, width, height;

	      left = 0;
	      top = 0;
	      width = el.offsetWidth;
	      height = el.offsetHeight;

	      while (el) {
	        if (el.className && el.className.indexOf('screen') !== -1) {
	          break;
	        }

	        left += el.offsetLeft || 0;
	        top += el.offsetTop || 0;
	        el = el.offsetParent;
	      }

	      return {
	        top: top,
	        bottom: top + height,
	        left: left,
	        right: left + width
	      };
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      var left = this.state.mouseX / this.state.zoom - this.state.bucketWidth / 2;
	      if (this.props.bucketInBounds) {
	        left = left < 1 ? 1 : left;
	        left = left >= this.state.leftBound ? this.state.leftBound - 1 : left;
	      }

	      return {
	        left: left + 'px'
	      };
	    }
	  }, {
	    key: 'renderBucket',
	    value: function renderBucket() {
	      return React.createElement(this.props.bucket.type, _extends({}, this.props.bucket.props, {
	        ref: 'bucket',
	        style: this.getStyle()
	      }));
	    }
	  }, {
	    key: 'renderCatchables',
	    value: function renderCatchables() {
	      return this.props.catchables.map(function (item, key) {
	        return React.createElement(_3.default, _extends({}, item.props, {
	          key: key,
	          ref: key + '-catchable'
	        }));
	      });
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('catch', _get(Catch.prototype.__proto__ || Object.getPrototypeOf(Catch.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { ref: 'catch-component', className: this.getClassNames() },
	        React.createElement(
	          'ul',
	          { className: 'items' },
	          this.renderCatchables()
	        ),
	        this.renderBucket()
	      );
	    }
	  }]);

	  return Catch;
	}(skoash.Component);

	Catch.defaultProps = _.defaults({
	  catchables: [],
	  bucketInBounds: true,
	  bucket: React.createElement(skoash.Component, null),
	  onCorrect: _.noop,
	  onIncorrect: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Catch;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Reveal = function (_skoash$Component) {
	  _inherits(Reveal, _skoash$Component);

	  function Reveal() {
	    _classCallCheck(this, Reveal);

	    var _this = _possibleConstructorReturn(this, (Reveal.__proto__ || Object.getPrototypeOf(Reveal)).call(this));

	    _this.state = {
	      openReveal: '',
	      currentlyOpen: []
	    };

	    _this.index = 0;
	    return _this;
	  }

	  _createClass(Reveal, [{
	    key: 'incomplete',
	    value: function incomplete() {
	      this.setState({
	        openReveal: '',
	        currentlyOpen: []
	      });

	      _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'incomplete', this).call(this);
	    }
	  }, {
	    key: 'open',
	    value: function open(message) {
	      var self = this;
	      var currentlyOpen = this.props.openMultiple ? this.state.currentlyOpen.concat(message) : [message];

	      self.setState({
	        open: true,
	        openReveal: message,
	        currentlyOpen: currentlyOpen
	      });

	      self.playAudio(message);

	      if (self.props.completeOnOpen) {
	        self.complete();
	      } else {
	        _.each(self.refs, function (ref, key) {
	          if (ref && key === message) ref.complete();
	        });
	      }

	      if (self.props.autoClose) {
	        setTimeout(function () {
	          self.close();
	        }, 2000);
	      }

	      if (self.props.openTarget) {
	        self.updateGameState({
	          path: self.props.openTarget,
	          data: {
	            open: '' + message,
	            close: false
	          }
	        });
	      }

	      self.props.onOpen.call(self, message);
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var prevMessage, currentlyOpen, openReveal, open;

	      prevMessage = this.state.openReveal;
	      currentlyOpen = this.state.currentlyOpen;
	      currentlyOpen.splice(currentlyOpen.indexOf(prevMessage), 1);
	      open = currentlyOpen.length > 0;
	      openReveal = open ? currentlyOpen[currentlyOpen.length - 1] : '';

	      this.setState({
	        open: open,
	        openReveal: openReveal,
	        currentlyOpen: currentlyOpen
	      });

	      if (!opts.silent) this.playMedia('close-sound');

	      this.props.onClose.call(this, prevMessage);

	      if (typeof this.props.closeRespond === 'function') {
	        this.props.closeRespond(prevMessage);
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'start', this).call(this);
	      if (this.props.openOnStart != null) {
	        this.open(this.props.openOnStart);
	      } else if (this.props.start && typeof this.props.start === 'function') {
	        this.props.start.call(this);
	      } else {
	        this.close({ silent: true });
	      }
	    }
	  }, {
	    key: 'playAudio',
	    value: function playAudio(message) {
	      var _this2 = this;

	      var messages;

	      message += '';

	      this.playMedia('open-sound');

	      messages = message.split(' ');
	      messages.map(function (audio) {
	        _this2.playMedia(audio);
	      });
	    }
	  }, {
	    key: 'renderAssets',
	    value: function renderAssets() {
	      if (this.props.assets) {
	        return this.props.assets.map(function (asset, key) {
	          var ref = asset.ref || asset.props['data-ref'] || 'asset-' + key;
	          return React.createElement(asset.type, _extends({}, asset.props, {
	            'data-ref': key,
	            ref: ref,
	            key: key
	          }));
	        });
	      }

	      return null;
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList() {
	      var _this3 = this;

	      var list = this.props.list;

	      return list.map(function (li, key) {
	        var ref = li.ref || li.props['data-ref'] || key;
	        return React.createElement(li.type, _extends({}, li.props, {
	          type: 'li',
	          className: _this3.getClass(li, key),
	          'data-ref': ref,
	          ref: ref,
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'componentWillReceiveProps', this).call(this, props);

	      if (props.openReveal != null && props.openReveal !== this.props.openReveal) {
	        this.open(props.openReveal);
	      }

	      if (props.closeReveal !== this.props.closeReveal) {
	        if (props.closeReveal === true) {
	          this.close();
	        } else if (Number.isInteger(props.closeReveal)) {
	          for (var i = 0; i < props.closeReveal; i++) {
	            this.close();
	          }
	        }
	      }
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass(li, key) {
	      var classes = '';

	      if (li.props.className) classes = li.props.className;

	      if (this.state.currentlyOpen.indexOf(key) !== -1 || this.state.currentlyOpen.indexOf('' + key) !== -1 || this.state.currentlyOpen.indexOf(li.props['data-ref']) !== -1 || this.state.currentlyOpen.indexOf(li.ref) !== -1) {
	        classes = (0, _classnames2.default)(classes, 'OPEN');
	      }

	      return classes;
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      var classes,
	          open = 'open-none ';

	      if (this.state.open) {
	        open = '';
	        this.state.currentlyOpen.forEach(function (ref) {
	          open += 'open-' + ref;
	        });
	      }

	      classes = (0, _classnames2.default)('reveal', open, _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'getClassNames', this).call(this));

	      return classes;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: this.getClassNames() },
	        this.renderAssets(),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'ul',
	            null,
	            this.renderList()
	          ),
	          React.createElement('button', { className: 'close-reveal', onClick: this.close.bind(this) })
	        )
	      );
	    }
	  }]);

	  return Reveal;
	}(skoash.Component);

	Reveal.defaultProps = _.defaults({
	  list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
	  openMultiple: false,
	  onOpen: _.noop,
	  onClose: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Reveal;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (props, ref, key) {
	  return (0, _sort_game_screen_component2.default)(props, ref, key, {
	    id: 'sort-game-level-one',
	    timeout: 60000,
	    prepTimeout: 750,
	    vos: [React.createElement(
	      skoash.MediaSequence,
	      {
	        ref: 'level-up',
	        silentOnStart: true
	      },
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/level_up.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_did_you2.mp3'
	      })
	    ), React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      ref: 'try-again',
	      complete: true,
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_try_again.mp3'
	    })],
	    sfx: [React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      completeTarget: 'sfx',
	      ref: 'print',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/print_item.mp3',
	      sprite: [0, 500]
	    })],
	    revealList: [React.createElement(
	      skoash.Component,
	      {
	        ref: 'level-up',
	        type: 'li'
	      },
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	      }),
	      React.createElement(
	        'h3',
	        null,
	        'LEVEL UP'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        'Did You Know?'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'MakerBot Factory in',
	        React.createElement('br', null),
	        'Brooklyn, New York uses 3D printers',
	        React.createElement('br', null),
	        'to print even more 3D printers!'
	      )
	    ), React.createElement(
	      skoash.Component,
	      {
	        ref: 'try-again',
	        type: 'li'
	      },
	      React.createElement(skoash.Image, {
	        className: 'minion',
	        src: ENVIRONMENT.MEDIA + 'ImageAssets/try.again.minion.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'Frames/try.again.frame.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.nav.png'
	      }),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          'TRY AGAIN'
	        ),
	        'You didn\'t win this time —',
	        React.createElement('br', null),
	        'but don\'t worry, you have another chance!'
	      )
	    )]
	  });
	};

	var _sort_game_screen_component = __webpack_require__(13);

	var _sort_game_screen_component2 = _interopRequireDefault(_sort_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (props, ref, key) {
	  return (0, _sort_game_screen_component2.default)(props, ref, key, {
	    id: 'sort-game-level-one',
	    timeout: 60000,
	    prepTimeout: 500,
	    vos: [React.createElement(
	      skoash.MediaSequence,
	      {
	        ref: 'level-up',
	        silentOnStart: true
	      },
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/level_up.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_did_you3.mp3'
	      })
	    ), React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      ref: 'try-again',
	      complete: true,
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_try_again.mp3'
	    })],
	    sfx: [React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      completeTarget: 'sfx',
	      ref: 'print',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/print_item.mp3',
	      sprite: [0, 500]
	    })],
	    revealList: [React.createElement(
	      skoash.Component,
	      {
	        ref: 'level-up',
	        type: 'li'
	      },
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	      }),
	      React.createElement(
	        'h3',
	        null,
	        'LEVEL UP'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        'Did You Know?'
	      ),
	      React.createElement(
	        'div',
	        null,
	        '3D printing can be better',
	        React.createElement('br', null),
	        'for the environment than standard',
	        React.createElement('br', null),
	        'manufacturing, because there is',
	        React.createElement('br', null),
	        'much less waste!'
	      )
	    ), React.createElement(
	      skoash.Component,
	      {
	        ref: 'try-again',
	        type: 'li'
	      },
	      React.createElement(skoash.Image, {
	        className: 'minion',
	        src: ENVIRONMENT.MEDIA + 'ImageAssets/try.again.minion.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'Frames/try.again.frame.png'
	      }),
	      React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.nav.png'
	      }),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          'TRY AGAIN'
	        ),
	        'You didn\'t win this time —',
	        React.createElement('br', null),
	        'but don\'t worry, you have another chance!'
	      )
	    )]
	  });
	};

	var _sort_game_screen_component = __webpack_require__(13);

	var _sort_game_screen_component2 = _interopRequireDefault(_sort_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: "congratulations"
	    }),
	    React.createElement(skoash.Image, {
	      className: "hidden",
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	    }),
	    React.createElement(skoash.Audio, {
	      type: "voiceOver",
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Congratulations.mp3'
	    }),
	    React.createElement(
	      "div",
	      null,
	      "CONGRATULATIONS!"
	    ),
	    React.createElement(
	      "div",
	      null,
	      "YOU\u2019VE"
	    ),
	    React.createElement(
	      "div",
	      null,
	      "WON"
	    ),
	    React.createElement(
	      "div",
	      null,
	      "THE"
	    ),
	    React.createElement(
	      "div",
	      null,
	      "GAME"
	    )
	  );
		};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  var nextPhoto;

	  var jobs = ['designer', 'architect', 'surgeon', 'engineer', 'dentist', 'artist'];

	  nextPhoto = function nextPhoto() {
	    skoash.trigger('updateState', {
	      path: 'selectable',
	      data: {
	        select: jobs[(jobs.indexOf(_.get(props, 'data.selectable.target.props.data-ref')) + 1) % jobs.length]
	      }
	    });
	  };

	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: 'help-the-world'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.realworldgallery.png'
	    }),
	    React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_and_many.mp3'
	    }),
	    React.createElement(
	      _7.default,
	      {
	        play: _.get(props, 'data.reveal.open')
	      },
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: jobs[0],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Product_Designers.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: jobs[1],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Architects.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: jobs[2],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Surgeons.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: jobs[3],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Engineers.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: jobs[4],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Dentists.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: jobs[5],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Artists.mp3'
	      })
	    ),
	    React.createElement(
	      'div',
	      { className: 'header' },
	      '\u2026and many ways to help the world',
	      React.createElement('br', null),
	      'with the wonderful things you create!',
	      React.createElement('br', null),
	      'Click on the image to expand.'
	    ),
	    React.createElement(_3.default, {
	      dataTarget: 'selectable',
	      selectClass: 'HIGHLIGHTED',
	      select: _.get(props, 'data.selectable.select'),
	      list: [React.createElement(skoash.Component, {
	        type: 'li',
	        'data-ref': jobs[0]
	      }), React.createElement(skoash.Component, {
	        type: 'li',
	        'data-ref': jobs[1]
	      }), React.createElement(skoash.Component, {
	        type: 'li',
	        'data-ref': jobs[2]
	      }), React.createElement(skoash.Component, {
	        type: 'li',
	        'data-ref': jobs[3]
	      }), React.createElement(skoash.Component, {
	        type: 'li',
	        'data-ref': jobs[4]
	      }), React.createElement(skoash.Component, {
	        type: 'li',
	        'data-ref': jobs[5]
	      })]
	    }),
	    React.createElement(_5.default, {
	      openTarget: 'reveal',
	      openReveal: _.get(props, 'data.selectable.target.props.data-ref'),
	      list: [React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': jobs[0]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'Product designers'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'design and print useful objects for others!'
	        ),
	        React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': jobs[1]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'Architects'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'create plans for housing that will',
	          React.createElement('br', null),
	          'be 3D printed!'
	        ),
	        React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': jobs[2]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'Surgeon'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'turn x-rays into 3D models',
	          React.createElement('br', null),
	          'and repair injured body parts!'
	        ),
	        React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': jobs[3]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'Engineers'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'make 3D models of you creations,',
	          React.createElement('br', null),
	          'and then print the real thing!'
	        ),
	        React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': jobs[4]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'Dentists'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'print replacement teeth for your patients!'
	        ),
	        React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': jobs[5]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'Artists'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'express themselves through the magic',
	          React.createElement('br', null),
	          'of 3D printing!'
	        ),
	        React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	      )]
	    })
	  );
	};

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(23);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(14);

	var _7 = _interopRequireDefault(_6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Selectable = function (_skoash$Component) {
	  _inherits(Selectable, _skoash$Component);

	  function Selectable() {
	    _classCallCheck(this, Selectable);

	    var _this = _possibleConstructorReturn(this, (Selectable.__proto__ || Object.getPrototypeOf(Selectable)).call(this));

	    _this.state = {
	      classes: {},
	      selectFunction: _this.select
	    };
	    return _this;
	  }

	  _createClass(Selectable, [{
	    key: 'start',
	    value: function start() {
	      _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'start', this).call(this);

	      var selectClass,
	          selectFunction,
	          classes = this.state.classes;

	      selectClass = this.props.selectClass || this.state.selectClass || 'SELECTED';
	      selectFunction = selectClass === 'HIGHLIGHTED' ? this.highlight : this.select;

	      if (this.props.selectOnStart) {
	        classes[this.props.selectOnStart] = selectClass;
	      }

	      this.setState({
	        started: true,
	        classes: classes,
	        selectFunction: selectFunction,
	        selectClass: selectClass
	      });
	    }
	  }, {
	    key: 'bootstrap',
	    value: function bootstrap() {
	      _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'bootstrap', this).call(this);

	      if (this.refs.bin) {
	        this.setState({
	          list: this.refs.bin.getAll()
	        });
	      }
	    }
	  }, {
	    key: 'selectHelper',
	    value: function selectHelper(e, classes) {
	      var ref,
	          dataRef,
	          target,
	          id,
	          isCorrect,
	          self = this;

	      if (typeof e === 'string') {
	        dataRef = e;
	      } else {
	        target = e.target.closest('LI');

	        if (!target) return;

	        dataRef = target.getAttribute('data-ref');
	      }

	      ref = self.refs[dataRef];

	      isCorrect = ref && ref.props && ref.props.correct || !self.props.answers || !self.props.answers.length || self.props.answers.indexOf(dataRef) !== -1;

	      if (self.props.allowDeselect && classes[dataRef]) {
	        delete classes[dataRef];
	      } else if (isCorrect) {
	        classes[dataRef] = self.state.selectClass;
	      }

	      self.setState({
	        classes: classes
	      });

	      self.props.selectRespond.call(self, dataRef);
	      self.props.onSelect.call(self, dataRef);

	      if (self.props.chooseOne) self.complete();

	      if (self.props.dataTarget) {
	        self.updateGameState({
	          path: self.props.dataTarget,
	          data: {
	            target: ref
	          }
	        });
	      }

	      if (self.props.completeListOnClick) {
	        _.each(self.refs, function (r, k) {
	          if (k === id) _.invoke(r, 'complete');
	        });
	      }

	      _.each(self.refs, function (r, k) {
	        if (k === dataRef) _.invoke(r, 'complete');
	      });
	    }
	  }, {
	    key: 'select',
	    value: function select(e) {
	      var classes = [];
	      this.selectHelper(e, classes);
	    }
	  }, {
	    key: 'highlight',
	    value: function highlight(e) {
	      var classes = this.state.classes;
	      this.selectHelper(e, classes);
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass(key, li) {
	      return (0, _classnames2.default)(li.props.className, this.state.classes[key], this.state.classes[li.props['data-ref']], this.state.classes[li.props['data-key']]);
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('selectable', _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'renderBin',
	    value: function renderBin() {
	      if (!this.props.bin) return null;

	      return React.createElement(this.props.bin.type, _extends({}, this.props.bin.props, {
	        ref: 'bin'
	      }));
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList() {
	      var _this2 = this;

	      var list = this.props.list || this.state.list;
	      return list.map(function (li, key) {
	        var dataRef = li.props['data-ref'] || key;
	        var ref = li.ref || li.props.id || dataRef;
	        var message = li.props.message || '' + key;
	        return React.createElement(li.type, _extends({}, li.props, {
	          type: 'li',
	          className: _this2.getClass(key, li),
	          message: message,
	          'data-message': message,
	          'data-ref': dataRef,
	          ref: ref,
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        null,
	        this.renderBin(),
	        React.createElement(
	          'ul',
	          { className: this.getClassNames(), onClick: this.state.selectFunction.bind(this) },
	          this.renderList()
	        )
	      );
	    }
	  }]);

	  return Selectable;
	}(skoash.Component);

	Selectable.defaultProps = _.defaults({
	  list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
	  selectClass: 'SELECTED',
	  completeListOnClick: true,
	  selectRespond: _.noop,
	  onSelect: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Selectable;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: "bunch-of-problems"
	    }),
	    React.createElement(skoash.Audio, {
	      type: "voiceOver",
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_coming_up.mp3'
	    }),
	    React.createElement(skoash.Image, {
	      className: "hidden",
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.closeupminion.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: "balloon",
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.speechballoon.up.png'
	    }),
	    React.createElement(
	      "div",
	      { className: "words" },
	      React.createElement(
	        "div",
	        null,
	        "Coming up are a"
	      ),
	      React.createElement(
	        "div",
	        null,
	        "bunch of problems"
	      ),
	      React.createElement(
	        "div",
	        null,
	        "that need a 3D printer"
	      ),
	      React.createElement(
	        "div",
	        null,
	        "to solve!"
	      )
	    )
	  );
		};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  var onStart, startGame, closeReveal, onCorrect, onPrinted, reset, onTransitionEnd;

	  onStart = function onStart() {
	    _.each(this.refs.bottom.refs.slider.refs, function (slide) {
	      _.each(slide.refs, function (draggable) {
	        draggable.markIncorrect();
	      });
	    });
	  };

	  startGame = function startGame() {
	    skoash.trigger('updateState', {
	      path: 'reveal',
	      data: {
	        open: 'drag-it-here'
	      }
	    });
	  };

	  closeReveal = function closeReveal() {
	    skoash.trigger('updateState', {
	      path: 'reveal',
	      data: {
	        close: true
	      }
	    });

	    if (_.get(props, 'data.setTarget', 0) > 4) {
	      skoash.trigger('goto', {
	        index: parseInt(props.index, 10) + 1
	      });
	    }
	  };

	  onCorrect = function onCorrect(dropped) {
	    skoash.trigger('updateState', {
	      path: 'printed',
	      data: dropped
	    });
	    skoash.trigger('updateState', {
	      path: 'sfx',
	      data: {
	        playing: 'print'
	      }
	    });
	  };

	  onPrinted = function onPrinted() {
	    var dropped = _.get(props, 'data.printed');

	    if (dropped.props.message === _.get(props, 'data.target.object.props.name')) {
	      dropped.markCorrect();
	      skoash.trigger('updateState', {
	        path: 'transition',
	        data: true
	      });
	    } else {
	      dropped.markIncorrect();
	      reset();
	      skoash.trigger('updateState', {
	        path: 'sfx',
	        data: {
	          playing: 'incorrect'
	        }
	      });
	      skoash.trigger('updateState', {
	        path: 'reveal',
	        data: {
	          open: 'try-again'
	        }
	      });
	    }
	  };

	  reset = function reset() {
	    _.each(['printed', 'transition', 'layer1', 'layer2', 'layer3'], function (v) {
	      skoash.trigger('updateState', {
	        path: v,
	        data: false
	      });
	    });
	  };

	  onTransitionEnd = function onTransitionEnd() {
	    if (!_.get(props, 'data.transition')) return;
	    skoash.trigger('updateState', {
	      path: 'sfx',
	      data: {
	        playing: 'correct'
	      }
	    });
	    skoash.trigger('updateState', {
	      path: 'reveal',
	      data: {
	        open: _.get(props, 'data.printed.props.message')
	      }
	    });
	    if (_.get(props, 'data.setTarget', 0) < 4) reset();
	    skoash.trigger('updateState', {
	      path: 'setTarget',
	      data: _.get(props, 'data.setTarget', 0) + 1
	    });
	  };

	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: 'printer',
	      onStart: onStart
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.game2.carouselarrow.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/game-2-sprites.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.printer.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.leftbox.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.game2.brokenobj.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.winframe.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.popup.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/bkg.3.jpg'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.sparkle.png'
	    }),
	    React.createElement(
	      _3.default,
	      {
	        play: _.get(props, 'data.sfx.playing')
	      },
	      React.createElement(
	        skoash.MediaSequence,
	        {
	          ref: 'print',
	          silentOnStart: true
	        },
	        React.createElement(skoash.Audio, {
	          type: 'sfx',
	          playTarget: 'layer1',
	          src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Printing.mp3',
	          sprite: [0, 1700]
	        }),
	        React.createElement(skoash.Audio, {
	          type: 'sfx',
	          playTarget: 'layer2',
	          src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Printing.mp3',
	          sprite: [0, 1700]
	        }),
	        React.createElement(skoash.Audio, {
	          type: 'sfx',
	          playTarget: 'layer3',
	          src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Printing.mp3',
	          onComplete: onPrinted,
	          sprite: [0, 1700]
	        })
	      ),
	      React.createElement(skoash.Audio, {
	        type: 'sfx',
	        ref: 'correct',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Correct2.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'sfx',
	        ref: 'incorrect',
	        complete: true,
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Incorrect2.mp3'
	      })
	    ),
	    React.createElement(
	      _3.default,
	      {
	        play: _.get(props, 'data.reveal.open')
	      },
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: 'instructions',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_drag_item.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: targets[0],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_level1_great.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: targets[1],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_level2_amazing.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: targets[2],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_level3_excellent.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: targets[3],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_level4_one_more.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: targets[4],
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_level5_wizard.mp3'
	      })
	    ),
	    React.createElement(
	      skoash.Component,
	      { className: 'targets' },
	      React.createElement(
	        'div',
	        null,
	        'What ',
	        React.createElement(
	          'span',
	          null,
	          'ITEM'
	        ),
	        ' can',
	        React.createElement('br', null),
	        'solve this problem?'
	      ),
	      React.createElement(_5.default, {
	        setTarget: _.get(props, 'data.setTarget', 0),
	        checkComplete: false,
	        complete: _.get(props, 'data.setTarget', 0) > 4,
	        targets: [React.createElement(skoash.Component, { name: targets[0] }), React.createElement(skoash.Component, { name: targets[1] }), React.createElement(skoash.Component, { name: targets[2] }), React.createElement(skoash.Component, { name: targets[3] }), React.createElement(skoash.Component, { name: targets[4] })]
	      })
	    ),
	    React.createElement(_7.default, {
	      dropped: _.get(props, 'data.draggable.dropped'),
	      dropzones: [React.createElement(skoash.Component, {
	        answers: objects,
	        className: (0, _classnames2.default)(_.get(props, 'data.printed.props.message'), {
	          transition: _.get(props, 'data.transition'),
	          layer1: _.get(props, 'data.layer1.playing'),
	          layer2: _.get(props, 'data.layer2.playing'),
	          layer3: _.get(props, 'data.layer3.playing')
	        }),
	        onTransitionEnd: onTransitionEnd
	      })],
	      onCorrect: onCorrect
	    }),
	    React.createElement(
	      skoash.Component,
	      { ref: 'bottom', className: 'bottom' },
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'span',
	          null,
	          'DRAG AND DROP'
	        ),
	        ' the item onto the printer above'
	      ),
	      React.createElement(
	        _9.default,
	        { ref: 'slider' },
	        React.createElement(
	          skoash.Component,
	          null,
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[0]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[1]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[2]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[3]
	          })
	        ),
	        React.createElement(
	          skoash.Component,
	          null,
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[4]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[5]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[6]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[7]
	          })
	        ),
	        React.createElement(
	          skoash.Component,
	          null,
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[8]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[9]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[10]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[11]
	          })
	        ),
	        React.createElement(
	          skoash.Component,
	          null,
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[12]
	          }),
	          React.createElement(_11.default, {
	            returnOnIncorrect: true,
	            stayOnCorrect: false,
	            message: objects[13]
	          })
	        )
	      )
	    ),
	    React.createElement(_13.default, {
	      openTarget: 'reveal',
	      openOnStart: 'instructions',
	      openReveal: _.get(props, 'data.reveal.open'),
	      closeReveal: _.get(props, 'data.reveal.close'),
	      list: [React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': 'instructions'
	        },
	        React.createElement(
	          'h3',
	          null,
	          'Instructions'
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'span',
	            null,
	            'DRAG'
	          ),
	          ' the item onto the',
	          React.createElement('br', null),
	          '3D printer that is the solution',
	          React.createElement('br', null),
	          'for each situation.'
	        ),
	        React.createElement('button', { onClick: startGame })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': 'drag-it-here',
	          onClick: closeReveal
	        },
	        React.createElement(
	          'div',
	          null,
	          'Drag it here.',
	          React.createElement('br', null),
	          'Press anywhere on the screen',
	          React.createElement('br', null),
	          'to continue.'
	        )
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          ref: targets[0]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'GREAT JOB!'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'Let\u2019s see if you can',
	          React.createElement('br', null),
	          'figure out this next one!'
	        ),
	        React.createElement('button', { onClick: closeReveal })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          ref: targets[1]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'YOU HAVE AMAZING',
	          React.createElement('br', null),
	          'PROBLEM-SOLVING',
	          React.createElement('br', null),
	          'SKILLS!'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'But this one might be harder\u2026'
	        ),
	        React.createElement('button', { onClick: closeReveal })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          ref: targets[2]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'EXCELLENT',
	          React.createElement('br', null),
	          'WORK!'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'Can you solve this next one?'
	        ),
	        React.createElement('button', { onClick: closeReveal })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          ref: targets[3]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'YOU\u2019VE DONE',
	          React.createElement('br', null),
	          'IT AGAIN!'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'Just one more to go!'
	        ),
	        React.createElement('button', { onClick: closeReveal })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          ref: targets[4]
	        },
	        React.createElement(
	          'h3',
	          null,
	          'YOU\u2019RE A',
	          React.createElement('br', null),
	          '3D PRINTING',
	          React.createElement('br', null),
	          'WIZARD'
	        ),
	        React.createElement(
	          'div',
	          null,
	          'and have solved all the problems!',
	          React.createElement('br', null),
	          'Thanks for playing!'
	        ),
	        React.createElement('button', { onClick: closeReveal })
	      ), React.createElement(
	        skoash.Component,
	        {
	          type: 'li',
	          'data-ref': 'try-again'
	        },
	        React.createElement(
	          'h3',
	          null,
	          'TRY',
	          React.createElement('br', null),
	          'AGAIN'
	        ),
	        React.createElement('button', { onClick: closeReveal })
	      )]
	    })
	  );
	};

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(14);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(31);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(32);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(33);

	var _9 = _interopRequireDefault(_8);

	var _10 = __webpack_require__(34);

	var _11 = _interopRequireDefault(_10);

	var _12 = __webpack_require__(23);

	var _13 = _interopRequireDefault(_12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var objects = ['umbrella', 'glasses', 'tire', 'shovel', 'link', 'bucket', 'boots', 'gloves', 'whistle', 'cup', 'phone', 'piece', 'tooth', 'ball'];

		var targets = ['tire', 'link', 'cup', 'phone', 'tooth'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Target = function (_skoash$Component) {
	  _inherits(Target, _skoash$Component);

	  function Target() {
	    _classCallCheck(this, Target);

	    return _possibleConstructorReturn(this, (Target.__proto__ || Object.getPrototypeOf(Target)).call(this));
	  }

	  _createClass(Target, [{
	    key: 'start',
	    value: function start() {
	      _get(Target.prototype.__proto__ || Object.getPrototypeOf(Target.prototype), 'start', this).call(this);
	      this.setTarget();
	    }
	  }, {
	    key: 'setTarget',
	    value: function setTarget() {
	      var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      if (this.props.loop) idx = idx % this.props.targets.length;
	      if (idx >= this.props.targets.length) return;

	      this.updateGameState({
	        path: this.props.dataTarget,
	        data: {
	          object: this.props.targets[idx]
	        }
	      });

	      this.props.onSetTarget.call(this);

	      this.setState({
	        idx: idx,
	        target: this.props.targets[idx]
	      });
	    }
	  }, {
	    key: 'nextTarget',
	    value: function nextTarget() {
	      this.setTarget(this.state.idx + 1);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      _get(Target.prototype.__proto__ || Object.getPrototypeOf(Target.prototype), 'componentWillReceiveProps', this).call(this, props);

	      if (_.isFinite(props.setTarget) && props.setTarget !== this.props.setTarget) {
	        this.setTarget(props.setTarget);
	      }

	      if (props.nextTarget && props.nextTarget !== this.props.nextTarget) {
	        this.nextTarget();
	      }
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('target', _get(Target.prototype.__proto__ || Object.getPrototypeOf(Target.prototype), 'getClassNames', this).call(this), _.get(this.state, 'target.props.name'));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: this.getClassNames() },
	        this.renderContentList('targets')
	      );
	    }
	  }]);

	  return Target;
	}(skoash.Component);

	Target.defaultProps = _.defaults({
	  targets: [React.createElement(skoash.Component, { target: '1' })],
	  dataTarget: 'target',
	  onUpdateState: _.noop,
	  onSetTarget: _.noop,
	  loop: false
	}, skoash.Component.defaultProps);

		exports.default = Target;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropzone = function (_skoash$Component) {
	  _inherits(Dropzone, _skoash$Component);

	  function Dropzone() {
	    _classCallCheck(this, Dropzone);

	    return _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).apply(this, arguments));
	  }

	  _createClass(Dropzone, [{
	    key: 'start',
	    value: function start() {
	      var self = this,
	          dropzone,
	          draggable;

	      _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'start', this).call(this);

	      self.dropzoneCorners = _.map(self.props.dropzones, function (value, key) {
	        return self.getCorners(ReactDOM.findDOMNode(self.refs['dropzone-' + key]));
	      });

	      if (self.loadData && _typeof(self.loadData) === 'object') {
	        _.forIn(self.loadData, function (ref1, key1) {
	          if (ref1.ref && ref1.state) {
	            _.forIn(self.refs, function (ref2, key2) {
	              if (key2.indexOf('draggable-') === -1) return;
	              if (self.refs[key1] && ref2.props.message === ref1.ref) {
	                dropzone = self.refs[key1];
	                draggable = ref2;
	                dropzone.setState({ content: draggable });
	                draggable.setState(ref1.state);
	                self.correct(draggable, key1.replace('dropzone-', ''));
	              }
	            });
	          } else {
	            _.forIn(self.loadData, function (ref2, key2) {
	              self.refs[key2].setState({ content: [] });
	              _.forIn(self.refs, function (ref3, key3) {
	                if (key3.indexOf('draggable-') === -1) return;
	                if (_.includes(ref2, ref3.props.message)) {
	                  self.refs[key2].state.content.push(ref3);
	                  ref3.markCorrect();
	                }
	              });
	            });
	          }
	        });
	      }
	    }
	  }, {
	    key: 'loadDragNDropData',
	    value: function loadDragNDropData() {
	      var self = this,
	          dropzone,
	          draggable;
	      _.forIn(self.loadData, function (ref1, key1) {
	        _.forIn(self.refs, function (ref2, key2) {
	          if (key2.indexOf('draggable-') === -1) return;
	          if (self.refs[key1] && ref2.props.message === ref1.ref) {
	            dropzone = self.refs[key1];
	            draggable = ref2;
	            dropzone.setState({ content: draggable });
	            draggable.setState(ref1.state);
	            self.correct(draggable, key1.replace('dropzone-', ''));
	          }
	        });
	      });
	    }
	  }, {
	    key: 'loadMultiAsnwerData',
	    value: function loadMultiAsnwerData() {
	      var self = this,
	          dropzone,
	          draggable;
	      _.forIn(self.loadData, function (ref1, key1) {
	        dropzone = self.refs[key1];
	        dropzone.setState({ content: [] });
	        _.forIn(self.refs, function (ref2, key2) {
	          if (key2.indexOf('draggable-') === -1) return;
	          draggable = ref2;
	          if (_.includes(ref1, draggable.props.message)) {
	            dropzone.state.content.push(draggable);
	            draggable.markCorrect();
	          }
	        });
	      });
	    }
	  }, {
	    key: 'getCorners',
	    value: function getCorners(el) {
	      var offset,
	          corners = [];

	      offset = el.getBoundingClientRect();

	      for (var i = 0; i < 4; i++) {
	        corners.push({
	          x: offset.left + offset.width * (i === 1 || i === 2 ? 1 : 0),
	          y: offset.top + offset.height * (i > 1 ? 1 : 0)
	        });
	      }

	      return corners;
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(dropped) {
	      var _this2 = this;

	      var droppedDOM, corners, dropzoneRef;

	      droppedDOM = dropped.DOMNode || ReactDOM.findDOMNode(dropped);
	      corners = this.getCorners(droppedDOM);

	      dropzoneRef = _.reduce(this.props.dropzones, function (a, v, k) {
	        if (skoash.util.doIntersect(corners, _this2.dropzoneCorners[k])) {
	          return _this2.refs['dropzone-' + k];
	        }
	        return a;
	      }, false);

	      if (dropzoneRef) {
	        this.inBounds(dropped, dropzoneRef);
	      } else {
	        this.outOfBounds(dropped);
	      }
	    }
	  }, {
	    key: 'onDrag',
	    value: function onDrag(dragging) {
	      var _this3 = this;

	      _.each(this.props.dropzones, function (value, key) {
	        var index, dropzoneRef, contains;
	        dropzoneRef = _this3.refs['dropzone-' + key];
	        contains = dropzoneRef.contains || [];
	        index = contains.indexOf(dragging);
	        if (~index) contains.splice(index, 1);
	        dropzoneRef.contains = contains;
	      });

	      this.props.onDrag.call(this, dragging);
	    }
	  }, {
	    key: 'inBounds',
	    value: function inBounds(dropped, dropzoneRef) {
	      if (!dropzoneRef.props.answers || dropzoneRef.props.answers.indexOf(dropped.props.message) !== -1) {
	        this.correct(dropped, dropzoneRef);
	      } else {
	        this.incorrect(dropped, dropzoneRef);
	      }
	    }
	  }, {
	    key: 'outOfBounds',
	    value: function outOfBounds(dropped) {
	      // respond to an out of bounds drop
	      this.playMedia('out');
	      this.incorrect(dropped);
	    }
	  }, {
	    key: 'correct',
	    value: function correct(dropped, dropzoneRef) {
	      // respond to correct drop
	      dropped.markCorrect();
	      this.playMedia('correct');

	      dropzoneRef.contains = (dropzoneRef.contains || []).concat(dropped);

	      this.props.onCorrect.call(this, dropped, dropzoneRef);
	    }
	  }, {
	    key: 'incorrect',
	    value: function incorrect(dropped, dropzoneRef) {
	      // respond to incorrect drop
	      dropped.markIncorrect();
	      this.playMedia('incorrect');
	      this.props.onIncorrect.call(this, dropped, dropzoneRef);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'componentWillReceiveProps', this).call(this, props);

	      if (props.dropped && props.dropped !== this.props.dropped) {
	        this.onDrop(props.dropped);
	      }

	      if (props.dragging && props.dragging !== this.props.dragging) {
	        this.onDrag(props.dragging);
	      }
	    }
	  }, {
	    key: 'renderDropzones',
	    value: function renderDropzones() {
	      return _.map(this.props.dropzones, function (component, key) {
	        return React.createElement(component.type, _extends({}, component.props, {
	          ref: 'dropzone-' + key,
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('dropzones', _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        _extends({}, this.props, { className: this.getClassNames() }),
	        this.renderContentList('assets'),
	        this.renderDropzones()
	      );
	    }
	  }]);

	  return Dropzone;
	}(skoash.Component);

	Dropzone.defaultProps = _.defaults({
	  dropzones: [React.createElement(skoash.Component, null)],
	  onCorrect: _.noop,
	  onIncorrect: _.noop,
	  onDrag: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Dropzone;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AREA = 'area';
	var CONTENT = 'content';

	var Slider = function (_skoash$Component) {
	  _inherits(Slider, _skoash$Component);

	  function Slider() {
	    _classCallCheck(this, Slider);

	    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

	    _this.state = _.defaults({
	      currentSlide: 0
	    }, _this.state);

	    _this.prev = _this.prev.bind(_this);
	    _this.next = _this.next.bind(_this);
	    _this.getContentStyle = _this.getContentStyle.bind(_this);
	    return _this;
	  }

	  _createClass(Slider, [{
	    key: 'prev',
	    value: function prev() {
	      this.changeSlide(-1);
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      this.changeSlide(1);
	    }
	  }, {
	    key: 'changeSlide',
	    value: function changeSlide() {
	      var increment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	      var currentSlide;

	      if (this.props.loop) {
	        currentSlide = (this.state.currentSlide + increment + this.props.children.length) % this.props.children.length;
	      } else {
	        currentSlide = Math.max(this.state.currentSlide + increment, 0);
	      }

	      this.setState({
	        currentSlide: currentSlide
	      });
	    }
	  }, {
	    key: 'getContentStyle',
	    value: function getContentStyle() {
	      return {
	        marginLeft: this.state.currentSlide * -100 + '%'
	      };
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('slider', _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'renderContentList',
	    value: function renderContentList() {
	      var _this2 = this;

	      var listName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'children';

	      var children = [].concat(this.props[listName]);
	      return children.map(function (component, key) {
	        if (!component) return;
	        var ref, opacity;
	        ref = component.ref || component.props && component.props['data-ref'] || listName + '-' + key;
	        opacity = key === _this2.state.currentSlide ? 1 : 0;
	        return React.createElement(component.type, _extends({
	          gameState: _this2.props.gameState
	        }, component.props, {
	          ref: ref,
	          key: key,
	          style: {
	            left: key * 100 + '%',
	            opacity: opacity
	          }
	        }));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.props.shouldRender) return null;

	      return React.createElement(
	        this.props.type,
	        _extends({}, this.props, { className: this.getClassNames() }),
	        React.createElement('button', { className: 'prev-slide', onClick: this.prev }),
	        React.createElement(
	          'div',
	          { className: AREA },
	          React.createElement(
	            'div',
	            {
	              className: CONTENT,
	              style: this.getContentStyle()
	            },
	            this.renderContentList()
	          )
	        ),
	        React.createElement('button', { className: 'next-slide', onClick: this.next })
	      );
	    }
	  }]);

	  return Slider;
	}(skoash.Component);

	Slider.defaultProps = _.defaults({
	  loop: true
	}, skoash.Component.defaultProps);

		exports.default = Slider;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Draggable = function (_skoash$Component) {
	  _inherits(Draggable, _skoash$Component);

	  function Draggable() {
	    _classCallCheck(this, Draggable);

	    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

	    _this.state = {
	      endX: 0,
	      endY: 0,
	      zoom: 1
	    };

	    _this.mouseDown = _this.mouseDown.bind(_this);
	    _this.mouseUp = _this.mouseUp.bind(_this);

	    _this.moveEvent = _this.moveEvent.bind(_this);

	    _this.touchStart = _this.touchStart.bind(_this);
	    _this.touchEnd = _this.touchEnd.bind(_this);

	    _this.setZoom = _this.setZoom.bind(_this);
	    return _this;
	  }

	  _createClass(Draggable, [{
	    key: 'shouldDrag',
	    value: function shouldDrag() {
	      return this.props.shouldDrag.call(this);
	    }
	  }, {
	    key: 'markCorrect',
	    value: function markCorrect() {
	      this.setState({
	        correct: true
	      });
	    }
	  }, {
	    key: 'markIncorrect',
	    value: function markIncorrect() {
	      this.setState({
	        correct: false
	      });

	      if (this.props.returnOnIncorrect) {
	        this.returnToStart();
	      }
	    }
	  }, {
	    key: 'startEvent',
	    value: function startEvent(e, cb) {
	      var rect, startX, startY, endX, endY, grabX, grabY;

	      if (e.target !== this.DOMNode) return;
	      if (!this.shouldDrag()) return;

	      if (e.targetTouches && e.targetTouches[0]) {
	        rect = e.target.getBoundingClientRect();
	        e = e.targetTouches[0];
	        e.offsetX = e.pageX - rect.left;
	        e.offsetY = e.pageY - rect.top;
	      }

	      grabX = e.offsetX / this.state.zoom;
	      grabY = e.offsetY / this.state.zoom;

	      startX = endX = e.pageX / this.state.zoom - grabX;
	      startY = endY = e.pageY / this.state.zoom - grabY;

	      if (!this.state.return) {
	        startX = _.isFinite(this.state.grabX) ? this.state.startX + this.state.grabX - grabX : startX;
	        startY = _.isFinite(this.state.grabY) ? this.state.startY + this.state.grabY - grabY : startY;
	      }

	      this.setState({
	        dragging: true,
	        return: false,
	        startX: startX,
	        startY: startY,
	        grabX: grabX,
	        grabY: grabY,
	        endX: endX,
	        endY: endY
	      });

	      this.updateGameState({
	        path: this.props.draggableTarget,
	        data: {
	          dragging: this,
	          dropped: null
	        }
	      });

	      this.props.onDrag.call(this, this);

	      if (typeof cb === 'function') cb.call(this);
	    }
	  }, {
	    key: 'attachMouseEvents',
	    value: function attachMouseEvents() {
	      window.addEventListener('mousemove', this.moveEvent);
	      window.addEventListener('mouseup', this.mouseUp);
	    }
	  }, {
	    key: 'attachTouchEvents',
	    value: function attachTouchEvents() {
	      window.addEventListener('touchmove', this.moveEvent);
	      window.addEventListener('touchend', this.touchEnd);
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(e) {
	      this.startEvent(e, this.attachMouseEvents);
	    }
	  }, {
	    key: 'touchStart',
	    value: function touchStart(e) {
	      this.startEvent(e, this.attachTouchEvents);
	    }
	  }, {
	    key: 'moveEvent',
	    value: function moveEvent(e) {
	      e = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e;

	      this.setState({
	        endX: e.pageX / this.state.zoom - this.state.grabX,
	        endY: e.pageY / this.state.zoom - this.state.grabY
	      });
	    }
	  }, {
	    key: 'endEvent',
	    value: function endEvent(cb) {
	      this.onDrop();

	      if (this.props.return) {
	        this.returnToStart();
	      } else {
	        this.setState({
	          dragging: false
	        });
	      }

	      if (typeof cb === 'function') cb.call(this);
	    }
	  }, {
	    key: 'setEnd',
	    value: function setEnd(endX, endY) {
	      this.setState({
	        endX: endX,
	        endY: endY
	      });
	    }
	  }, {
	    key: 'returnToStart',
	    value: function returnToStart() {
	      var endX, endY, doReturn;

	      if (this.props.stayOnCorrect && this.state.correct) {
	        endX = this.state.endX;
	        endY = this.state.endY;
	        doReturn = false;
	      } else {
	        endX = this.state.startX;
	        endY = this.state.startY;
	        doReturn = true;
	      }

	      this.setState({
	        dragging: false,
	        return: doReturn,
	        endX: endX,
	        endY: endY
	      });
	    }
	  }, {
	    key: 'detachMouseEvents',
	    value: function detachMouseEvents() {
	      window.removeEventListener('mousemove', this.moveEvent);
	      window.removeEventListener('mouseup', this.mouseUp);
	    }
	  }, {
	    key: 'detachTouchEvents',
	    value: function detachTouchEvents() {
	      window.removeEventListener('touchmove', this.moveEvent);
	      window.removeEventListener('touchend', this.touchEnd);
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp() {
	      this.endEvent(this.detachMouseEvents);
	    }
	  }, {
	    key: 'touchEnd',
	    value: function touchEnd() {
	      this.endEvent(this.detachTouchEvents);
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop() {
	      this.updateGameState({
	        path: this.props.draggableTarget,
	        data: {
	          dragging: null,
	          dropped: this
	        }
	      });

	      this.props.onDrop.call(this, this);
	    }
	  }, {
	    key: 'bootstrap',
	    value: function bootstrap() {
	      _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'bootstrap', this).call(this);

	      this.setZoom();

	      this.DOMNode = ReactDOM.findDOMNode(this);

	      this.DOMNode.addEventListener('mousedown', this.mouseDown);
	      this.DOMNode.addEventListener('touchstart', this.touchStart);

	      window.addEventListener('resize', this.setZoom);
	    }
	  }, {
	    key: 'setZoom',
	    value: function setZoom() {
	      var _this2 = this;

	      skoash.trigger('getState').then(function (state) {
	        _this2.setState({
	          zoom: state.scale
	        });
	      });
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      var x, y, transform;

	      x = this.state.endX - this.state.startX;
	      y = this.state.endY - this.state.startY;
	      transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';

	      return {
	        transform: transform,
	        WebkitTransform: transform
	      };
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)({
	        DRAGGING: this.state.dragging,
	        RETURN: this.state.return,
	        CORRECT: this.state.correct
	      }, 'draggable', this.state.classes, _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement('div', {
	        className: this.getClassNames(),
	        'data-message': this.props.message,
	        style: this.getStyle(),
	        children: this.props.children
	      });
	    }
	  }]);

	  return Draggable;
	}(skoash.Component);

	Draggable.defaultProps = _.defaults({
	  draggableTarget: 'draggable',
	  shouldDrag: function shouldDrag() {
	    return true;
	  },
	  return: false,
	  returnOnIncorrect: false,
	  stayOnCorrect: true,
	  onDrop: _.noop,
	  onDrag: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Draggable;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: "now-that-you-learned"
	    }),
	    React.createElement(skoash.Image, {
	      className: "hidden",
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.nav.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: "hidden",
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	    }),
	    React.createElement(skoash.Audio, {
	      type: "voiceOver",
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_make_a.mp3'
	    }),
	    React.createElement(
	      "div",
	      null,
	      "Now that you\u2019ve learned",
	      React.createElement("br", null),
	      "so much about ",
	      React.createElement(
	        "span",
	        null,
	        "3D PRINTING"
	      ),
	      React.createElement("br", null),
	      "and what it can do, it\u2019s time to make",
	      React.createElement("br", null),
	      "a list of what YOU would like to print!"
	    )
	  );
		};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  var onDrag, testComplete;

	  onDrag = function onDrag() {
	    this.setState({
	      correct: false,
	      return: false
	    });
	    this.updateGameState({
	      path: 'sfx',
	      data: {
	        playing: 'drag'
	      }
	    });
	  };

	  testComplete = function testComplete() {
	    if (this.refs['dropzone-0'].contains.length) this.complete();else this.incomplete();
	  };

	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: 'list'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.minion.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.notepad.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/sprite.game3.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'arrows',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.greenarrows.png'
	    }),
	    React.createElement(skoash.Audio, {
	      type: 'voiceOver',
	      src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_drag_and.mp3'
	    }),
	    React.createElement(
	      _3.default,
	      {
	        play: _.get(props, 'data.sfx.playing')
	      },
	      React.createElement(skoash.Audio, {
	        ref: 'drag',
	        type: 'sfx',
	        completeTarget: 'sfx',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Drag.mp3'
	      })
	    ),
	    React.createElement(_5.default, {
	      className: 'draggables',
	      amount: 13,
	      item: React.createElement(_7.default, {
	        'return': true,
	        returnOnIncorrect: true,
	        onDrag: onDrag
	      }),
	      props: [{ message: 'shoe' }, { message: 'lego' }, { message: 'dice' }, { message: 'ball' }, { message: 'crown' }, { message: 'bunny' }, { message: 'chess' }, { message: 'helmet' }, { message: 'bowling' }, { message: 'cup' }, { message: 'controller' }, { message: 'headphones' }, { message: 'guitar' }]
	    }),
	    React.createElement(_9.default, {
	      checkComplete: false,
	      onDrag: testComplete,
	      onCorrect: testComplete,
	      dropped: _.get(props, 'data.draggable.dropped'),
	      dragging: _.get(props, 'data.draggable.dragging'),
	      dropzones: [React.createElement(
	        skoash.Component,
	        null,
	        React.createElement(
	          'span',
	          null,
	          'LIST OF ITEMS'
	        )
	      )]
	    }),
	    React.createElement(
	      'div',
	      { className: 'words' },
	      React.createElement(
	        'span',
	        null,
	        'Drag and Drop'
	      ),
	      React.createElement('br', null),
	      'the items to the list above.',
	      React.createElement('br', null),
	      'Choose as many as you like.'
	    )
	  );
	};

	var _2 = __webpack_require__(14);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(37);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(34);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(32);

	var _9 = _interopRequireDefault(_8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Repeater = function (_skoash$Component) {
	  _inherits(Repeater, _skoash$Component);

	  function Repeater() {
	    _classCallCheck(this, Repeater);

	    return _possibleConstructorReturn(this, (Repeater.__proto__ || Object.getPrototypeOf(Repeater)).apply(this, arguments));
	  }

	  _createClass(Repeater, [{
	    key: "renderContentList",
	    value: function renderContentList() {
	      var a = [];
	      for (var i = 0; i < this.props.amount; i++) {
	        a.push(React.createElement(this.props.item.type, _extends({
	          key: i
	        }, this.props.item.props, this.props.props[i])));
	      }
	      return a;
	    }
	  }]);

	  return Repeater;
	}(skoash.Component);

	Repeater.defaultProps = _.defaults({
	  amount: 1,
	  item: React.createElement("div", null),
	  props: []
	}, skoash.Component.defaultProps);

		exports.default = Repeater;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	  var onTransitionEnd;

	  onTransitionEnd = function onTransitionEnd() {
	    if (!_.get(props, 'data.layer2.complete')) return;
	    skoash.trigger('updateState', {
	      path: 'flip',
	      data: {
	        complete: true
	      }
	    });
	  };

	  return React.createElement(
	    skoash.Screen,
	    _extends({}, props, {
	      ref: ref,
	      key: key,
	      id: 'flip',
	      emitOnComplete: {
	        name: 'flip'
	      }
	    }),
	    React.createElement(
	      skoash.MediaSequence,
	      null,
	      React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/vos/VO_Flip.mp3'
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'sfx',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Printing.mp3',
	        playTarget: 'layer1',
	        sprite: [0, 1900]
	      }),
	      React.createElement(skoash.Audio, {
	        type: 'sfx',
	        src: ENVIRONMENT.MEDIA + 'SoundAssets/effects/Printing.mp3',
	        playTarget: 'layer2',
	        completeTarget: 'layer2',
	        sprite: [1900, 1900]
	      })
	    ),
	    React.createElement(skoash.Image, {
	      className: 'printer',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.flip.printer.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: (0, _classnames2.default)('earned-flip', {
	        show: _.get(props, 'data.flip.complete')
	      }),
	      src: ENVIRONMENT.MEDIA + 'SpritesAnimations/3D-World_Earned_Flip.gif'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'hidden',
	      src: window.MEDIA_SERVER + 'Flips/3D%20world/3DW-%20Static%20Image%20Flip/3DW.EarnedFlip.png'
	    }),
	    React.createElement(skoash.Image, {
	      className: 'minion',
	      src: ENVIRONMENT.MEDIA + 'ImageAssets/img.flip.minion.png'
	    }),
	    React.createElement(skoash.Component, {
	      checkComplete: false,
	      complete: _.get(props, 'data.flip.complete'),
	      className: (0, _classnames2.default)('static-flip', {
	        layer1: _.get(props, 'data.layer1.playing'),
	        layer2: _.get(props, 'data.layer2.playing') || _.get(props, 'data.layer2.complete'),
	        move: _.get(props, 'data.layer2.complete'),
	        hide: _.get(props, 'data.flip.complete')
	      }),
	      onTransitionEnd: onTransitionEnd
	    }),
	    React.createElement(
	      'p',
	      { className: 'now' },
	      'Now you\u2019ve learned about ',
	      React.createElement(
	        'span',
	        null,
	        '3D PRINTING'
	      ),
	      React.createElement(
	        'span',
	        null,
	        '\u2026'
	      )
	    ),
	    React.createElement(
	      'p',
	      { className: 'lets' },
	      'Let\u2019s print you out',
	      React.createElement('br', null),
	      'a new ',
	      React.createElement(
	        'span',
	        null,
	        'FLIP'
	      )
	    )
	  );
	};

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QuitScreen = function (_skoash$Screen) {
	  _inherits(QuitScreen, _skoash$Screen);

	  function QuitScreen() {
	    _classCallCheck(this, QuitScreen);

	    return _possibleConstructorReturn(this, (QuitScreen.__proto__ || Object.getPrototypeOf(QuitScreen)).apply(this, arguments));
	  }

	  _createClass(QuitScreen, [{
	    key: 'okay',
	    value: function okay() {
	      skoash.trigger('quit');
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.close();
	      skoash.trigger('menuClose', {
	        id: this.props.id
	      });
	    }
	  }, {
	    key: 'renderAssets',
	    value: function renderAssets() {
	      if (this.props.assets) {
	        return this.props.assets.map(function (asset, key) {
	          return React.createElement(skoash.Audio, _extends({}, asset.props, {
	            ref: asset.ref || asset.props['data-ref'] || 'asset-' + key,
	            key: key,
	            'data-ref': key
	          }));
	        });
	      }

	      return null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { id: this.props.id, className: 'screen ' + this.getClassNames() },
	        this.renderAssets(),
	        React.createElement(
	          'div',
	          { className: 'center' },
	          React.createElement(
	            'div',
	            { className: 'frame' },
	            React.createElement(
	              'h2',
	              null,
	              'Are you sure you',
	              React.createElement('br', null),
	              'want to quit?'
	            ),
	            React.createElement(
	              'h3',
	              null,
	              'Your game progress will be saved'
	            ),
	            React.createElement('button', { className: 'quit-yes', onClick: this.okay.bind(this) }),
	            React.createElement('button', { className: 'quit-no', onClick: this.cancel.bind(this) })
	          )
	        )
	      );
	    }
	  }]);

	  return QuitScreen;
	}(skoash.Screen);

	exports.default = React.createElement(QuitScreen, {
	  id: 'quit'
		});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiM2Qtd29ybGQvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTQ2NTEzOGIzNzQzZTcyOTg0MTgiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9jb25maWcuZ2FtZS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9sb2FkZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2lvc19zcGxhc2hfc2NyZWVuLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL2ltYWdpbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy8uLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9sZXRzX2xlYXJuX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL21hbnlfbWF0ZXJpYWxzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL3NvcnRfZ2FtZV9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvc29ydF9nYW1lX3NjcmVlbl9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbWVkaWFfY29sbGVjdGlvbi8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2NvcmUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3RpbWVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcm9wcGVyLzAuMi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3JhbmRvbWl6ZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjIuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2gvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3JldmVhbC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9zb3J0X2dhbWVfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL3NvcnRfZ2FtZV9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9jb25ncmF0dWxhdGlvbnNfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvaGVscF90aGVfd29ybGRfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvYnVuY2hfb2ZfcHJvYmxlbXNfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvcHJpbnRlcl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvdGFyZ2V0LzAuMi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcm9wem9uZS8wLjQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2xpZGVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC40LmpzIiwid2VicGFjazovLy9saWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvbm93X3RoYXRfeW91X2xlYXJuZWRfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvbGlzdF9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmVwZWF0ZXIvMC4yLmpzIiwid2VicGFjazovLy9saWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvZmxpcF9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4vMC4xLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDk0NjUxMzhiMzc0M2U3Mjk4NDE4XG4gKiovIiwid2luZG93LkVOVklST05NRU5UID0ge1xuICBNRURJQTogJ2h0dHBzOi8vbWVkaWEtc3RhZ2luZy5jaGFuZ2VteXdvcmxkbm93LmNvbS9mLydcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9qcy9kZXYtdmFyaWFibGVzLmpzXG4gKiovIiwidW5kZWZpbmVkXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogXG4gKiovIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZy5nYW1lJztcblxuaW1wb3J0IExvYWRlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9sb2FkZXIvMC4xJztcblxuaW1wb3J0IGlPU1NjcmVlbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEnO1xuaW1wb3J0IFRpdGxlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90aXRsZV9zY3JlZW4nO1xuaW1wb3J0IEltYWdpbmVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ltYWdpbmVfc2NyZWVuJztcbmltcG9ydCBMZXRzTGVhcm5TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldHNfbGVhcm5fc2NyZWVuJztcbmltcG9ydCBWaWRlb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuJztcbmltcG9ydCBNYW55TWF0ZXJpYWxzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYW55X21hdGVyaWFsc19zY3JlZW4nO1xuaW1wb3J0IFNvcnRHYW1lTGV2ZWxPbmVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3NvcnRfZ2FtZV9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBTb3J0R2FtZUxldmVsVHdvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9zb3J0X2dhbWVfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgU29ydEdhbWVMZXZlbFRocmVlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9zb3J0X2dhbWVfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBDb25ncmF0dWxhdGlvbnNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2NvbmdyYXR1bGF0aW9uc19zY3JlZW4nO1xuaW1wb3J0IEhlbHBUaGVXb3JsZFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvaGVscF90aGVfd29ybGRfc2NyZWVuJztcbmltcG9ydCBCdW5jaE9mUHJvYmxlbXNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2J1bmNoX29mX3Byb2JsZW1zX3NjcmVlbic7XG5pbXBvcnQgUHJpbnRlclNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpbnRlcl9zY3JlZW4nO1xuaW1wb3J0IE5vd1RoZVlvdUxlYXJuZWRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL25vd190aGF0X3lvdV9sZWFybmVkX3NjcmVlbic7XG5pbXBvcnQgTGlzdFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGlzdF9zY3JlZW4nO1xuaW1wb3J0IEZsaXBTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZsaXBfc2NyZWVuJztcblxuaW1wb3J0IFF1aXRTY3JlZW4gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4vMC4xJztcblxud2luZG93Lk1FRElBX1NFUlZFUiA9IEVOVklST05NRU5ULk1FRElBO1xuRU5WSVJPTk1FTlQuTUVESUEgKz0gJ0dhbWVzLzNEV29ybGQvJztcblxudmFyIFRocmVlRFdvcmxkID0gKFxuICA8c2tvYXNoLkdhbWVcbiAgICBjb25maWc9e2NvbmZpZ31cbiAgICBsb2FkZXI9ezxMb2FkZXIgLz59XG4gICAgc2NyZWVucz17e1xuICAgICAgMDogaU9TU2NyZWVuLFxuICAgICAgMTogVGl0bGVTY3JlZW4sXG4gICAgICAyOiBJbWFnaW5lU2NyZWVuLFxuICAgICAgMzogTGV0c0xlYXJuU2NyZWVuLFxuICAgICAgNDogVmlkZW9TY3JlZW4sXG4gICAgICA1OiBNYW55TWF0ZXJpYWxzU2NyZWVuLFxuICAgICAgNjogU29ydEdhbWVMZXZlbE9uZVNjcmVlbixcbiAgICAgIDc6IFNvcnRHYW1lTGV2ZWxUd29TY3JlZW4sXG4gICAgICA4OiBTb3J0R2FtZUxldmVsVGhyZWVTY3JlZW4sXG4gICAgICA5OiBDb25ncmF0dWxhdGlvbnNTY3JlZW4sXG4gICAgICAxMDogSGVscFRoZVdvcmxkU2NyZWVuLFxuICAgICAgMTE6IEJ1bmNoT2ZQcm9ibGVtc1NjcmVlbixcbiAgICAgIDEyOiBQcmludGVyU2NyZWVuLFxuICAgICAgMTM6IE5vd1RoZVlvdUxlYXJuZWRTY3JlZW4sXG4gICAgICAxNDogTGlzdFNjcmVlbixcbiAgICAgIDE1OiBGbGlwU2NyZWVuLFxuICAgIH19XG4gICAgbWVudXM9e3tcbiAgICAgIHF1aXQ6IFF1aXRTY3JlZW4sXG4gICAgfX1cbiAgICBhc3NldHM9e1tcbiAgICAgIDxza29hc2guRm9udCBuYW1lPVwiTW9sb3RcIiAvPixcbiAgICAgIDxza29hc2guRm9udCBuYW1lPVwiU291cmNlIFNhbnMgUHJvXCIgLz4sXG4gICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImJ1dHRvblwiIHR5cGU9XCJzZnhcIiBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvQmFjay5tcDMnfSAvPixcbiAgICAgIDxza29hc2guQXVkaW8gcmVmPVwibmV4dFwiIHR5cGU9XCJzZnhcIiBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvTmV4dC5tcDMnfSAvPixcbiAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiYmFja1wiIHR5cGU9XCJzZnhcIiBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvQmFjay5tcDMnfSAvPixcbiAgICAgIDxza29hc2guQXVkaW8gcmVmPVwic2NyZWVuLWNvbXBsZXRlXCIgdHlwZT1cInNmeFwiIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9OZXh0QXBwZWFyLm1wMyd9IC8+LFxuICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9UaXRsZVNjcmVlbi5tcDMnfSBsb29wIC8+LFxuICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9CS0cxLm1wMyd9IGxvb3AgLz4sXG4gICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy9lZmZlY3RzL0JLRzIubXAzJ30gbG9vcCAvPixcbiAgICAgIDxza29hc2guQXVkaW8gdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvQktHMy5tcDMnfSBsb29wIC8+LFxuICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9CS0c0Lm1wMyd9IGxvb3AgLz4sXG4gICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy9lZmZlY3RzL0JLRzUubXAzJ30gbG9vcCAvPixcbiAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy9ia2cuanBnJ30gLz4sXG4gICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvYmsuMS5qcGcnfSAvPixcbiAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy9ia2cuMi5qcGcnfSAvPixcbiAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy9ia2cud2luLmpwZyd9IC8+LFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZy1pbWFnaW5lXCIgLz4sXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnLWNvbmdyYXR1bGF0aW9uc1wiIC8+LFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZy1wcmludGVyXCIgLz4sXG4gICAgXX1cbiAgICBnZXRCYWNrZ3JvdW5kSW5kZXg9eyhpbmRleCwgaWQpID0+IHtcbiAgICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgIGNhc2UgJ2lvcy1zcGxhc2gnOiByZXR1cm47XG4gICAgICBjYXNlICd0aXRsZSc6IHJldHVybiAwO1xuICAgICAgY2FzZSAnaW1hZ2VpbmUnOlxuICAgICAgY2FzZSAnbGV0cy1sZWFybic6XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgY2FzZSAnc29ydC1nYW1lLWxldmVsLW9uZSc6XG4gICAgICBjYXNlICdzb3J0LWdhbWUtbGV2ZWwtdHdvJzpcbiAgICAgIGNhc2UgJ3NvcnQtZ2FtZS1sZXZlbC10aHJlZSc6XG4gICAgICBjYXNlICdjb25ncmF0dWxhdGlvbnMnOlxuICAgICAgICByZXR1cm4gMztcbiAgICAgIGNhc2UgJ2hlbHAtdGhlLXdvcmxkJzpcbiAgICAgIGNhc2UgJ2J1bmNoLW9mLXByb2JsZW1zJzpcbiAgICAgICAgcmV0dXJuIDQ7XG4gICAgICBjYXNlICdwcmludGVyJzpcbiAgICAgICAgcmV0dXJuIDU7XG4gICAgICBkZWZhdWx0OiByZXR1cm4gMjtcbiAgICAgIH1cbiAgICB9fVxuICAvPlxuKTtcblxuc2tvYXNoLnN0YXJ0KFRocmVlRFdvcmxkKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvaW5kZXguanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xuICBpZDogJzNkLXdvcmxkJyxcbiAgdGl0bGU6ICczRCBXb3JsZCcsXG4gIHZlcnNpb246IDEsXG4gIHNrb2FzaDogJzEuMC41JyxcbiAgZGltZW5zaW9uczoge1xuICAgIHdpZHRoOiA5NjAsXG4gICAgcmF0aW86IDE2IC8gOVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb25maWcuZ2FtZS5qc1xuICoqLyIsImNsYXNzIExvYWRlciBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJsb2FkZXJcIiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncm91cFwiPlxuICAgICAgICAgIDxoMj5Mb2FkaW5nITwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgcmV0dXJuIChcbiAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBrZXk9e2tleX1cbiAgICAgIGlkPVwiaW9zLXNwbGFzaFwiXG4gICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgIGNvbXBsZXRlRGVsYXk9ezYwMDB9XG4gICAgICBuZXh0RGVsYXk9ezMwMDB9XG4gICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgIGhpZGVQcmV2XG4gICAgPlxuICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCIuLi9zaGFyZWQvaW1hZ2VzL2lvc19zdGFydF9iYWxsLnBuZ1wiIC8+XG4gICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz1cIi4uL3NoYXJlZC9pbWFnZXMvaW9zX3N0YXJ0X2JhbGxfYW5pbS5naWZcIiAvPlxuICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxza29hc2guU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJ0aXRsZVwiXG4gICAgPlxuICAgICAgPHNrb2FzaC5JbWFnZSBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3RpdGxlLmdpZid9IC8+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiAoXG4gICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cImltYWdpbmVcIlxuICAgID5cbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgIHJlZj1cInN0YXJ0XCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy9lZmZlY3RzL2FuaW1hdGlvbl9hcHBlYXIubXAzJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvdGV4dF90eXBlLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvdGV4dF90eXBlLm1wMyd9XG4gICAgICAgICAgc3ByaXRlPXtbMCwgMjAwMF19XG4gICAgICAgIC8+XG4gICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9faW1hZ2luZS5tcDMnfVxuICAgICAgICAgIGNvbXBsZXRlVGFyZ2V0PVwiaW1hZ2luZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL3Zvcy9WT19pdF9hbHJlYWR5Lm1wMyd9XG4gICAgICAgIC8+XG4gICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3F1ZXN0aW9uJywge1xuICAgICAgICAgIHNob3c6ICFfLmdldChwcm9wcywgJ2RhdGEuaW1hZ2luZS5jb21wbGV0ZScpXG4gICAgICAgIH0pfVxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3dhbmQuZ2lmJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnYW5zd2VyJywge1xuICAgICAgICAgIHNob3c6IF8uZ2V0KHByb3BzLCAnZGF0YS5pbWFnaW5lLmNvbXBsZXRlJylcbiAgICAgICAgfSl9XG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvd2FuZC5hbmQucHJpbnRlcl8uZ2lmJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvc3ByaXRlLm1pbmlvbi5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy9pbnRyby5zcGVlY2guYmFsbG9vbi5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmlnaHRcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnd29yZHMnLCAnaW1hZ2luZScsIHtcbiAgICAgICAgICAgIHN0YXJ0OiAhXy5nZXQocHJvcHMsICdkYXRhLmltYWdpbmUuY29tcGxldGUnKVxuICAgICAgICAgIH0pfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICBJbWFnaW5lIGEgbWFnaWNhbCBpdGVtXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICB0aGF0IGNhbiBtYWtlIGFueXRoaW5nXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICB5b3UgY2FuIHRoaW5rIG9mIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnd29yZHMnLCAnZXhpc3RzJywge1xuICAgICAgICAgICAgc3RhcnQ6IF8uZ2V0KHByb3BzLCAnZGF0YS5pbWFnaW5lLmNvbXBsZXRlJylcbiAgICAgICAgICB9KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgSXQgYWxyZWFkeSBleGlzdHMgdG9kYXkuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICBJdCdzIGNhbGxlZCAzRCBwcmludGluZyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluaW9uXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9pbWFnaW5lX3NjcmVlbi5qc1xuICoqLyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2NsYXNzbmFtZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxza29hc2guU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJsZXRzLWxlYXJuXCJcbiAgICAgIG9uU3RhcnQ9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgIHBhdGg6ICdzdGFydCcsXG4gICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9fVxuICAgID5cbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2xldHMubXAzJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICByZWY9XCJzdGFydFwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy90ZXh0X3R5cGUubXAzJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvc3ByaXRlLmNsb3NldXBtaW5pb24ucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImJhbGxvb25cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL3NwZWVjaC5iYWxsb29uLjEucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnd29yZHMnLCB7XG4gICAgICAgICAgICBzdGFydDogXy5nZXQocHJvcHMsICdkYXRhLnN0YXJ0JyksXG4gICAgICAgICAgfSl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIExldOKAmXMgbGVhcm4gYWJvdXQgdGhlXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAzRCBwcmludGluZyBwcm9jZXNzXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICB3aXRoIHRoaXMgdmlkZW9cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL2xldHNfbGVhcm5fc2NyZWVuLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxza29hc2guU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJ2aWRlb1wiXG4gICAgPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL3ZpZC5zY3JuLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDxza29hc2guVmlkZW9cbiAgICAgICAgICBzcmM9XCJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9jaGFuZ2VteXdvcmxkbm93L3ZpZGVvL3VwbG9hZC92MTQ3OTgzMTU2Ni8zRF9QcmludGluZ19GSU5BTF9GSUxFX1NNQUxMRVJfcGZ6djg0Lm1wNFwiXG4gICAgICAgIC8+XG4gICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiAoXG4gICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cIm1hbnktbWF0ZXJpYWxzXCJcbiAgICAgIG9uU3RhcnQ9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgIHBhdGg6ICdzdGFydCcsXG4gICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9fVxuICAgID5cbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX3dvdy5tcDMnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy90ZXh0X3R5cGUubXAzJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy90ZXh0X3R5cGUubXAzJ31cbiAgICAgICAgICBzcHJpdGU9e1swLCAxMDAwXX1cbiAgICAgICAgLz5cbiAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvc3ByaXRlLmNsb3NldXBtaW5pb24ucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImJhbGxvb25cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL3NwZWVjaC5iYWxsb29uLmZyYW1lNy5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guQ29tcG9uZW50PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd3b3JkcycsIHtcbiAgICAgICAgICAgIHN0YXJ0OiBfLmdldChwcm9wcywgJ2RhdGEuc3RhcnQnKSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgV293LCB0aGVyZSBhcmUgbWFueSBtYXRlcmlhbHMgeW91IGNhbiB1c2VcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIHRvIG1ha2UgdGhpbmdzIHdpdGggYSAzRCBwcmludGVyIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgVGhlIG1vc3QgY29tbW9uIGFyZSBwbGFzdGljIGFuZCBtZXRhbCxcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIGJ1dCBvdGhlciBtYXRlcmlhbHMgY2FuIGJlIHVzZWQuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9tYW55X21hdGVyaWFsc19zY3JlZW4uanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFNvcnRHYW1lU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vc29ydF9nYW1lX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiBTb3J0R2FtZVNjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICBpZDogJ3NvcnQtZ2FtZS1sZXZlbC1vbmUnLFxuICAgIHRpbWVvdXQ6IDYwMDAwLFxuICAgIHByZXBUaW1lb3V0OiAxMDAwLFxuICAgIG9wZW5PblN0YXJ0OiAnaW4tdGhpcycsXG4gICAgdm9zOiBbXG4gICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2VcbiAgICAgICAgcmVmPVwiaW4tdGhpc1wiXG4gICAgICAgIHNpbGVudE9uU3RhcnRcbiAgICAgID5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgIGNvbXBsZXRlVGFyZ2V0PVwiaW4tdGhpc1wiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9faW5fdGhpcy5tcDMnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fYmVfc3VyZS5tcDMnfVxuICAgICAgICAvPlxuICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT4sXG4gICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2VcbiAgICAgICAgcmVmPVwibGV2ZWwtdXBcIlxuICAgICAgICBzaWxlbnRPblN0YXJ0XG4gICAgICA+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvbGV2ZWxfdXAubXAzJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2RpZF95b3UxLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgIGNvbXBsZXRlXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX3RyeV9hZ2Fpbi5tcDMnfVxuICAgICAgLz4sXG4gICAgXSxcbiAgICBzZng6IFtcbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIGNvbXBsZXRlVGFyZ2V0PVwic2Z4XCJcbiAgICAgICAgcmVmPVwicHJpbnRcIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvcHJpbnRfaXRlbS5tcDMnfVxuICAgICAgICBzcHJpdGU9e1swLCA1MDBdfVxuICAgICAgLz5cbiAgICBdLFxuICAgIHJldmVhbExpc3Q6IFtcbiAgICAgIDxza29hc2guQ29tcG9uZW50IHJlZj1cImluLXRoaXNcIiB0eXBlPVwibGlcIj5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImZyYW1lXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ZyYW1lcy9pbnMuZ3JlZW4uZnJhbWUucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJhbGxvb25cIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvaW1nLnF1aXQucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJpbnNcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvaW5zLmJpbnMucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUubWluaW9uLnBuZyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3dvcmRzJywgJ2luLXRoaXMtZ2FtZScsIHtcbiAgICAgICAgICAgIHNob3c6ICFfLmdldChwcm9wcywgJ2RhdGEuaW4tdGhpcy5jb21wbGV0ZScsIGZhbHNlKVxuICAgICAgICAgIH0pfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIEluIHRoaXMgZ2FtZSwgeW91IHdpbGwgc29ydCBpdGVtc1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICBkcm9wcGVkIGZyb20gdGhlIDNEIHByaW50ZXJcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgYnkgdGhlIG1hdGVyaWFsIGl0IGlzIG1hZGUgZnJvbS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpbmVcIiAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICBTbGlkZSB0aGUgcHJpbnRlciBoZWFkIHRvXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIGRyb3AgaXRlbXMgaW50byB0aGUgY29ycmVjdCBiaW4uXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd3b3JkcycsICdiZS1zdXJlJywge1xuICAgICAgICAgICAgc2hvdzogXy5nZXQocHJvcHMsICdkYXRhLmluLXRoaXMuY29tcGxldGUnLCBmYWxzZSlcbiAgICAgICAgICB9KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICBCZSBzdXJlIHRvIGNvbGxlY3QgZW5vdWdoIHBvaW50c1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICBiZWZvcmUgdGhlIHRpbWVyIHJ1bnMgb3V0IVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVN0YXRlJywge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFN0YXJ0IEdhbWVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgcmVmPVwibGV2ZWwtdXBcIlxuICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgPlxuICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3Nwcml0ZS5taW5pb24ucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPGgzPlxuICAgICAgICAgIExFVkVMIFVQXG4gICAgICAgIDwvaDM+XG4gICAgICAgIDxoND5cbiAgICAgICAgICBEaWQgWW91IEtub3c/XG4gICAgICAgIDwvaDQ+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgRXZlbiBmb29kIGNhbiBiZSAzRCBwcmludGVkITxici8+XG4gICAgICAgICAgV2hpbGUgc3RpbGwgaW4gdGhlIGV4cGVyaW1lbnRhbCBzdGFnZXMsPGJyLz5cbiAgICAgICAgICBOQVNBIGhvcGVzIG9uZSBkYXk8YnIvPlxuICAgICAgICAgIHRvIHByaW50IGZvb2QgaW4gc3BhY2UhXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICA+XG4gICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICBjbGFzc05hbWU9XCJtaW5pb25cIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvdHJ5LmFnYWluLm1pbmlvbi5wbmcnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ZyYW1lcy90cnkuYWdhaW4uZnJhbWUucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUubmF2LnBuZyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgzPlxuICAgICAgICAgICAgVFJZIEFHQUlOXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICB7J1lvdSBkaWRuXFwndCB3aW4gdGhpcyB0aW1lIOKAlCd9PGJyLz5cbiAgICAgICAgICB7J2J1dCBkb25cXCd0IHdvcnJ5LCB5b3UgaGF2ZSBhbm90aGVyIGNoYW5jZSEnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgXVxuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9zb3J0X2dhbWVfbGV2ZWxfb25lX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBNZWRpYUNvbGxlY3Rpb24gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWVkaWFfY29sbGVjdGlvbi8wLjEnO1xuXG5pbXBvcnQgU2NvcmUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvc2NvcmUvMC4xJztcbmltcG9ydCBUaW1lciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy90aW1lci8wLjEnO1xuXG5pbXBvcnQgRHJvcHBlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9kcm9wcGVyLzAuMic7XG5pbXBvcnQgUmFuZG9taXplciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMSc7XG5pbXBvcnQgQ2F0Y2hlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuMic7XG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEnO1xuXG5pbXBvcnQgUmV2ZWFsIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3JldmVhbC8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgdmFyIG9uQ2xvc2VSZXZlYWwsXG4gICAgb25TY29yZUNvbXBsZXRlLFxuICAgIGdldFRpbWUsXG4gICAgb25UaW1lckNvbXBsZXRlLFxuICAgIG9uQWRkQ2xhc3NOYW1lLFxuICAgIG9uQ29ycmVjdENhdGNoLFxuICAgIG9uSW5jb3JyZWN0Q2F0Y2g7XG5cbiAgb25DbG9zZVJldmVhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHN0b3A6IGZhbHNlLFxuICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgcmVzdGFydDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgIHBhdGg6ICdjbG9zZVJldmVhbCcsXG4gICAgICBkYXRhOiBmYWxzZSxcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICBwYXRoOiAnb3BlblJldmVhbCcsXG4gICAgICBkYXRhOiBudWxsLFxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgIHBhdGg6ICdzY29yZScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvcnJlY3Q6IDAsXG4gICAgICAgIGluY29ycmVjdDogMCxcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBvblNjb3JlQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgcGF0aDogJ29wZW5SZXZlYWwnLFxuICAgICAgZGF0YTogJ2xldmVsLXVwJyxcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBnZXRUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aW1lTGVmdCwgbWludXRlc0xlZnQsIHNlY29uZHNMZWZ0O1xuICAgIHRpbWVMZWZ0ID0gdGhpcy5wcm9wcy50aW1lb3V0IC8gMTAwMCAtIHRoaXMuc3RhdGUudGltZTtcbiAgICBtaW51dGVzTGVmdCA9IE1hdGguZmxvb3IodGltZUxlZnQgLyA2MCk7XG4gICAgc2Vjb25kc0xlZnQgPSB0aW1lTGVmdCAlIDYwO1xuICAgIHNlY29uZHNMZWZ0ID0gc2Vjb25kc0xlZnQgPCAxMCA/ICcwJyArIHNlY29uZHNMZWZ0IDogc2Vjb25kc0xlZnQ7XG4gICAgcmV0dXJuIGAke21pbnV0ZXNMZWZ0fToke3NlY29uZHNMZWZ0fWA7XG4gIH07XG5cbiAgb25UaW1lckNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChfLmdldChwcm9wcywgJ2RhdGEub3BlblJldmVhbCcpID09PSAnbGV2ZWwtdXAnKSByZXR1cm47XG4gICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgcGF0aDogJ29wZW5SZXZlYWwnLFxuICAgICAgZGF0YTogJ3RyeS1hZ2FpbicsXG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIG9uQWRkQ2xhc3NOYW1lID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgIGlmIChjbGFzc05hbWUgPT09ICdnbycpIHJldHVybjtcbiAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICBwYXRoOiAnc2Z4JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGxheWluZzogJ3ByaW50J1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIG9uQ29ycmVjdENhdGNoID0gZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgIGJ1Y2tldFJlZi5hZGRDbGFzc05hbWUoJ2NvcnJlY3QnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGJ1Y2tldFJlZi5yZW1vdmVDbGFzc05hbWUoJ2NvcnJlY3QnKTtcbiAgICB9LCAxMDAwKTtcbiAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICBwYXRoOiAnc2NvcmUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjb3JyZWN0OiBfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUuY29ycmVjdCcsIDApICsgMSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgb25JbmNvcnJlY3RDYXRjaCA9IGZ1bmN0aW9uIChidWNrZXRSZWYpIHtcbiAgICBidWNrZXRSZWYuYWRkQ2xhc3NOYW1lKCdpbmNvcnJlY3QnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGJ1Y2tldFJlZi5yZW1vdmVDbGFzc05hbWUoJ2luY29ycmVjdCcpO1xuICAgIH0sIDEwMDApO1xuICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgIHBhdGg6ICdzY29yZScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGluY29ycmVjdDogXy5nZXQocHJvcHMsICdkYXRhLnNjb3JlLmluY29ycmVjdCcsIDApICsgMSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBrZXk9e2tleX1cbiAgICAgIGlkPXtvcHRzLmlkfVxuICAgID5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy90aGljay5ib3JkZXIucG5nJ31cbiAgICAgIC8+XG4gICAgICA8TWVkaWFDb2xsZWN0aW9uXG4gICAgICAgIHBsYXk9e18uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicpfVxuICAgICAgICBjaGlsZHJlbj17b3B0cy52b3N9XG4gICAgICAvPlxuICAgICAgPE1lZGlhQ29sbGVjdGlvblxuICAgICAgICBwbGF5PXtfLmdldChwcm9wcywgJ2RhdGEuc2Z4LnBsYXlpbmcnKX1cbiAgICAgICAgY2hpbGRyZW49e29wdHMuc2Z4fVxuICAgICAgLz5cbiAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImxlZnRcIj5cbiAgICAgICAgPFNjb3JlXG4gICAgICAgICAgbWF4PXsxMDB9XG4gICAgICAgICAgaW5jcmVtZW50PXsxMH1cbiAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUuY29ycmVjdCcsIDApfVxuICAgICAgICAgIGluY29ycmVjdD17Xy5nZXQocHJvcHMsICdkYXRhLnNjb3JlLmluY29ycmVjdCcsIDApfVxuICAgICAgICAgIG9uQ29tcGxldGU9e29uU2NvcmVDb21wbGV0ZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgPC9TY29yZT5cbiAgICAgICAgPFRpbWVyXG4gICAgICAgICAgY291bnREb3duXG4gICAgICAgICAgdGltZW91dD17b3B0cy50aW1lb3V0fVxuICAgICAgICAgIGxlYWRpbmdDb250ZW50PVwiVElNRSBMRUZUXCJcbiAgICAgICAgICBnZXRUaW1lPXtnZXRUaW1lfVxuICAgICAgICAgIHN0b3A9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJywgZmFsc2UpfVxuICAgICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb21wbGV0ZScsIGZhbHNlKX1cbiAgICAgICAgICBjaGVja0NvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zdGFydCcsIGZhbHNlKX1cbiAgICAgICAgICByZXN0YXJ0PXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zdGFydCcsIGZhbHNlKX1cbiAgICAgICAgICBvbkNvbXBsZXRlPXtvblRpbWVyQ29tcGxldGV9XG4gICAgICAgIC8+XG4gICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJtYWluXCI+XG4gICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvc3ByaXRlLmdhbWUxLmJpbnMucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUuZ2FtZTEucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUuZ2FtZTEucHJpbnRlci5wbmcnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL3BsdXMucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPERyb3BwZXJcbiAgICAgICAgICBsZWZ0Qm91bmQ9ezcwfVxuICAgICAgICAgIHJpZ2h0Qm91bmQ9ezgyMH1cbiAgICAgICAgICBvbj17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc3RhcnQnLCBmYWxzZSl9XG4gICAgICAgICAgc3RhcnQ9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLnN0YXJ0JywgZmFsc2UpfVxuICAgICAgICAgIHN0b3A9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJywgZmFsc2UpfVxuICAgICAgICAgIHByZXBDbGFzc2VzPXtbJ3N0YXJ0aW5nJywgJ3JlYWR5JywgJ3NldCcsICdnbyddfVxuICAgICAgICAgIHByZXBUaW1lb3V0PXtvcHRzLnByZXBUaW1lb3V0fVxuICAgICAgICAgIG9uQWRkQ2xhc3NOYW1lPXtvbkFkZENsYXNzTmFtZX1cbiAgICAgICAgICBiaW49e1xuICAgICAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0XG4gICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBiaW49e1tcbiAgICAgICAgICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtaWxrXCJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJvdGhlclwiXG4gICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hvZXNcIlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZT1cIm90aGVyXCJcbiAgICAgICAgICAgICAgICAvPixcbiAgICAgICAgICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXBcIlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZT1cInBsYXN0aWNcIlxuICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgIDxDYXRjaGFibGVcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJveFwiXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlPVwib3RoZXJcIlxuICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgIDxDYXRjaGFibGVcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdsYXNzZXNcIlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZT1cIm1ldGFsXCJcbiAgICAgICAgICAgICAgICAvPixcbiAgICAgICAgICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3aGlzdGxlXCJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJtZXRhbFwiXG4gICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2FyXCJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJtZXRhbFwiXG4gICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGVnb1wiXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlPVwicGxhc3RpY1wiXG4gICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2lsdmVyXCJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJtZXRhbFwiXG4gICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2xpbmt5XCJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJtZXRhbFwiXG4gICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2VhcnNcIlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZT1cIm1ldGFsXCJcbiAgICAgICAgICAgICAgICAvPixcbiAgICAgICAgICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuYWlsc1wiXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlPVwibWV0YWxcIlxuICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnRcIj5cbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0XCI+XG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRHJvcHBlcj5cbiAgICAgICAgPENhdGNoZXJcbiAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICBzdGFydD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc3RhcnQnLCBmYWxzZSl9XG4gICAgICAgICAgYnVja2V0PXtbXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJwbGFzdGljXCIgbWVzc2FnZT1cInBsYXN0aWNcIiAvPixcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cIm1ldGFsXCIgbWVzc2FnZT1cIm1ldGFsXCIgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJvdGhlclwiIG1lc3NhZ2U9XCJvdGhlclwiIC8+LFxuICAgICAgICAgIF19XG4gICAgICAgICAgY2F0Y2hhYmxlUmVmcz17Xy5nZXQocHJvcHMsICdkYXRhLmRyb3BwZXIucmVmcycsIFtdKX1cbiAgICAgICAgICBvbkNvcnJlY3Q9e29uQ29ycmVjdENhdGNofVxuICAgICAgICAgIG9uSW5jb3JyZWN0PXtvbkluY29ycmVjdENhdGNofVxuICAgICAgICAgIGFzc2V0cz17W1xuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgcmVmPVwiY29ycmVjdFwiXG4gICAgICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9Db3JyZWN0Lm1wMyd9XG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgIHJlZj1cImluY29ycmVjdFwiXG4gICAgICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9JbmNvcnJlY3QubXAzJ31cbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICA8UmV2ZWFsXG4gICAgICAgIG9wZW5PblN0YXJ0PXtvcHRzLm9wZW5PblN0YXJ0fVxuICAgICAgICBvcGVuVGFyZ2V0PVwicmV2ZWFsXCJcbiAgICAgICAgb3BlblJldmVhbD17Xy5nZXQocHJvcHMsICdkYXRhLm9wZW5SZXZlYWwnLCBmYWxzZSl9XG4gICAgICAgIGNsb3NlUmV2ZWFsPXtfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLmNsb3NlJywgZmFsc2UpfVxuICAgICAgICBvbkNsb3NlPXtvbkNsb3NlUmV2ZWFsfVxuICAgICAgICBsaXN0PXtvcHRzLnJldmVhbExpc3R9XG4gICAgICAvPlxuICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9zb3J0X2dhbWVfc2NyZWVuX2NvbXBvbmVudC5qc1xuICoqLyIsImNsYXNzIE1lZGlhQ29sbGVjdGlvbiBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBwbGF5KHJlZikge1xuICAgIGlmICh0aGlzLnJlZnNbcmVmXSkge1xuICAgICAgdGhpcy5yZWZzW3JlZl0ucGxheSgpO1xuICAgICAgdGhpcy5wcm9wcy5vblBsYXkuY2FsbCh0aGlzLCByZWYpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgIGlmIChwcm9wcy5wbGF5ICYmIHByb3BzLnBsYXkgIT09IHRoaXMucHJvcHMucGxheSkge1xuICAgICAgdGhpcy5wbGF5KHByb3BzLnBsYXkpO1xuICAgIH1cbiAgfVxufVxuXG5NZWRpYUNvbGxlY3Rpb24uZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIG9uUGxheTogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBNZWRpYUNvbGxlY3Rpb247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL21lZGlhX2NvbGxlY3Rpb24vMC4xLmpzXG4gKiovIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFNjb3JlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2NvcmU6IDBcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja0NvbXBsZXRlID0gdGhpcy5jaGVja0NvbXBsZXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBjaGVja0NvbXBsZXRlKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5jaGVja0NvbXBsZXRlIHx8ICF0aGlzLnN0YXRlLnJlYWR5KSByZXR1cm47XG4gICAgaWYgKCF0aGlzLnByb3BzLm1heCkgcmV0dXJuO1xuICAgIGlmICgodGhpcy5zdGF0ZS5zY29yZSA+PSB0aGlzLnByb3BzLm1heCB8fCB0aGlzLnByb3BzLmNvcnJlY3QgPj0gdGhpcy5wcm9wcy5tYXgpICYmICF0aGlzLnN0YXRlLmNvbXBsZXRlKSB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBib290c3RyYXAoKSB7XG4gICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNjb3JlOiB0aGlzLnByb3BzLnN0YXJ0aW5nU2NvcmVcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHN1cGVyLmNvbXBsZXRlKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnJlc2V0T25Db21wbGV0ZSkge1xuICAgICAgICB0aGlzLnNldFNjb3JlKHtcbiAgICAgICAgICBjb3JyZWN0OiAwLFxuICAgICAgICAgIGluY29ycmVjdDogMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgdGhpcy5wcm9wcy5jb21wbGV0ZURlbGF5KTtcbiAgfVxuXG4gIGNoZWNrU2NvcmUocHJvcHMpIHtcbiAgICBpZiAoIXByb3BzLm1heCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnN0YXRlLnNjb3JlID49IHByb3BzLm1heCAmJiAoIXRoaXMuc3RhdGUuY29tcGxldGUgfHwgcHJvcHMubXVsdGlwbGVDb21wbGV0ZXMpKSB7XG4gICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmNvbXBsZXRlICYmICFwcm9wcy5jb21wbGV0ZSkge1xuICAgICAgdGhpcy5pbmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgdXAoaW5jcmVtZW50KSB7XG4gICAgaW5jcmVtZW50ID0gXy5pc0Zpbml0ZShpbmNyZW1lbnQpID8gaW5jcmVtZW50IDogXy5pc0Zpbml0ZSh0aGlzLnByb3BzLmluY3JlbWVudCkgPyB0aGlzLnByb3BzLmluY3JlbWVudCA6IDE7XG4gICAgaWYgKCFfLmlzRmluaXRlKGluY3JlbWVudCkpIHRocm93ICdpbmNyZW1lbnQgbXVzdCBiZSBmaW5pdGUnO1xuXG4gICAgdGhpcy51cGRhdGVTY29yZShpbmNyZW1lbnQpO1xuICB9XG5cbiAgZG93bihpbmNyZW1lbnQpIHtcbiAgICBpbmNyZW1lbnQgPSBfLmlzRmluaXRlKGluY3JlbWVudCkgPyBpbmNyZW1lbnQgOiBfLmlzRmluaXRlKHRoaXMucHJvcHMuZG93bkluY3JlbWVudCkgPyB0aGlzLnByb3BzLmRvd25JbmNyZW1lbnQgOiBfLmlzRmluaXRlKHRoaXMucHJvcHMuaW5jcmVtZW50KSA/IHRoaXMucHJvcHMuaW5jcmVtZW50IDogMTtcbiAgICBpZiAoIV8uaXNGaW5pdGUoaW5jcmVtZW50KSkgdGhyb3cgJ2luY3JlbWVudCBtdXN0IGJlIGZpbml0ZSc7XG5cbiAgICB0aGlzLnVwZGF0ZVNjb3JlKC0xICogaW5jcmVtZW50KTtcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlKGluY3JlbWVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2NvcmU6IHRoaXMuc3RhdGUuc2NvcmUgKyBpbmNyZW1lbnRcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHNjb3JlOiB0aGlzLnN0YXRlLnNjb3JlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNoZWNrU2NvcmUodGhpcy5wcm9wcyk7XG4gICAgICB0aGlzLnByb3BzLm9uVXBkYXRlU2NvcmUuY2FsbCh0aGlzLCB0aGlzLnN0YXRlLnNjb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFNjb3JlKHByb3BzKSB7XG4gICAgdmFyIHVwSW5jcmVtZW50LCBkb3duSW5jcmVtZW50LCBzY29yZTtcblxuICAgIGlmIChfLmlzRmluaXRlKHByb3BzKSkge1xuICAgICAgc2NvcmUgPSBwcm9wcztcbiAgICB9IGVsc2Uge1xuICAgICAgdXBJbmNyZW1lbnQgPSBfLmlzRmluaXRlKHByb3BzLmluY3JlbWVudCkgPyBwcm9wcy5pbmNyZW1lbnQgOiAxO1xuICAgICAgZG93bkluY3JlbWVudCA9IF8uaXNGaW5pdGUocHJvcHMuZG93bkluY3JlbWVudCkgPyBwcm9wcy5kb3duSW5jcmVtZW50IDpcbiAgICAgICAgXy5pc0Zpbml0ZShwcm9wcy5pbmNyZW1lbnQpID8gcHJvcHMuaW5jcmVtZW50IDogMTtcbiAgICAgIHNjb3JlID0gdXBJbmNyZW1lbnQgKiBwcm9wcy5jb3JyZWN0IC0gZG93bkluY3JlbWVudCAqIHByb3BzLmluY29ycmVjdDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNjb3JlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja1Njb3JlKHByb3BzKTtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGVTY29yZS5jYWxsKHRoaXMsIHNjb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgIGlmIChwcm9wcy5jb3JyZWN0ICE9PSB0aGlzLnByb3BzLmNvcnJlY3QgfHxcbiAgICAgIHByb3BzLmluY29ycmVjdCAhPT0gdGhpcy5wcm9wcy5pbmNvcnJlY3QpIHtcbiAgICAgIHRoaXMuc2V0U2NvcmUocHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGdldENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoXG4gICAgICAnc2NvcmUnLFxuICAgICAgYHNjb3JlLSR7dGhpcy5zdGF0ZS5zY29yZX1gLFxuICAgICAgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc30gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gZGF0YS1tYXg9e3RoaXMucHJvcHMubWF4fSBkYXRhLXNjb3JlPXt0aGlzLnN0YXRlLnNjb3JlfSBzY29yZT17dGhpcy5zdGF0ZS5zY29yZX0+XG4gICAgICAgIHt0aGlzLnByb3BzLmxlYWRpbmdDb250ZW50fVxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5zY29yZX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2NvcmUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGNoZWNrQ29tcGxldGU6IGZhbHNlLFxuICBzdGFydGluZ1Njb3JlOiAwLFxuICBjb3JyZWN0OiAwLFxuICBpbmNvcnJlY3Q6IDAsXG4gIG9uVXBkYXRlU2NvcmU6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgU2NvcmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3Njb3JlLzAuMS5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBUaW1lciBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpbWU6IDAsXG4gICAgICBzdGFtcDogMFxuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrQ29tcGxldGUgPSB0aGlzLmNoZWNrQ29tcGxldGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNoZWNrQ29tcGxldGUoKSB7XG4gICAgdmFyIHRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKCF0aGlzLnByb3BzLmNoZWNrQ29tcGxldGUpIHJldHVybjtcblxuICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG5cbiAgICBpZiAodGltZSA+PSB0aGlzLnN0YXRlLnN0YW1wKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc3RhbXA6IHRpbWUgKyAxMDAwLFxuICAgICAgICB0aW1lOiB0aGlzLnN0YXRlLnRpbWUgKyAxMDAwXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRpbWUgPj0gdGhpcy5wcm9wcy50aW1lb3V0KSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkNoZWNrQ29tcGxldGUgPT09ICdmdW5jdGlvbicpIHRoaXMucHJvcHMub25DaGVja0NvbXBsZXRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29tcGxldGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29tcGxldGUpO1xuICAgIH1cbiAgfVxuXG4gIGluY29tcGxldGVSZWZzKCkge1xuICAgIHRoaXMucmVzdGFydCgpO1xuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUucmVhZHkpIHJldHVybjtcbiAgICBpZiAodGhpcy5zdGF0ZS5jb21wbGV0ZSkgdGhpcy5pbmNvbXBsZXRlKCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWU6IDAsXG4gICAgICBzdGFtcDogMCxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5zdGFydGVkKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCkgcmV0dXJuO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3RhcnRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkKSByZXR1cm47XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYXVzZWQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3VtZSgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYXVzZWQ6IGZhbHNlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhcnRlZCkge1xuICAgICAgICB0aGlzLmNoZWNrQ29tcGxldGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgIGlmIChwcm9wcy5yZXN0YXJ0ICYmIHByb3BzLnJlc3RhcnQgIT09IHRoaXMucHJvcHMucmVzdGFydCkge1xuICAgICAgdGhpcy5yZXN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcygndGltZXInLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB0aW1lID0gdGhpcy5wcm9wcy5nZXRUaW1lLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IHRpbWU9e3RpbWV9PlxuICAgICAgICB7dGhpcy5wcm9wcy5sZWFkaW5nQ29udGVudH1cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge3RpbWV9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRpbWVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICBnZXRUaW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG1vbWVudCh0aGlzLnByb3BzLmNvdW50RG93biA/IHRoaXMucHJvcHMudGltZW91dCAtIHRoaXMuc3RhdGUudGltZSA6IHRoaXMuc3RhdGUudGltZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KTtcbiAgfSxcbiAgZm9ybWF0OiAnbTpzcycsXG4gIGxlYWRpbmdDb250ZW50OiAnJyxcbiAgdGltZW91dDogNjAwMDAsXG4gIGNvdW50RG93bjogZmFsc2UsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy90aW1lci8wLjEuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IERyYWdnYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC4xJztcblxuaW1wb3J0IFJhbmRvbWl6ZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEnO1xuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xJztcblxuY2xhc3MgRHJvcHBlciBleHRlbmRzIERyYWdnYWJsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0gXy5kZWZhdWx0cyh7XG4gICAgICBpdGVtczoge30sXG4gICAgICBpdGVtQ291bnQ6IDAsXG4gICAgICBpdGVtRW5kWHM6IHt9LFxuICAgICAgZGlyZWN0aW9uOiAnJyxcbiAgICB9LCB0aGlzLnN0YXRlKTtcblxuICAgIHRoaXMubmV4dCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmV4dChvbikge1xuICAgIHZhciBpdGVtcywgaW5kZXg7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCAoIXRoaXMucHJvcHMub24gJiYgIW9uKSkgcmV0dXJuO1xuXG4gICAgaW5kZXggPSB0aGlzLnN0YXRlLml0ZW1Db3VudDtcbiAgICBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXM7XG4gICAgaXRlbXNbaW5kZXhdID0gdGhpcy5yZWZzLmJpbi5nZXQoMSlbMF07XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGl0ZW1zLFxuICAgICAgaXRlbUNvdW50OiBpbmRleCArIDEsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdmFyIHRpbWVvdXRGdW5jdGlvbiA9IGkgPT4ge1xuICAgICAgICB2YXIgaXRlbVJlZiwgaXRlbUVuZFhzO1xuICAgICAgICBpdGVtUmVmID0gdGhpcy5yZWZzWydpdGVtcy0nICsgaW5kZXhdO1xuICAgICAgICBpZiAoaXRlbVJlZikge1xuICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKHRoaXMucHJvcHMucHJlcENsYXNzZXNbaV0pO1xuICAgICAgICAgIHRoaXMucHJvcHMub25BZGRDbGFzc05hbWUuY2FsbCh0aGlzLCB0aGlzLnByb3BzLnByZXBDbGFzc2VzW2ldKTtcbiAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5wcm9wcy5wcmVwQ2xhc3Nlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBpdGVtRW5kWHMgPSB0aGlzLnN0YXRlLml0ZW1FbmRYcztcbiAgICAgICAgICAgIGl0ZW1FbmRYc1tpbmRleF0gPSB0aGlzLnN0YXRlLmVuZFg7XG4gICAgICAgICAgICBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXM7XG4gICAgICAgICAgICAgIGRlbGV0ZSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGl0ZW1zLFxuICAgICAgICAgICAgICAgIGl0ZW1FbmRYc1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpID09PSB0aGlzLnByb3BzLnByZXBDbGFzc2VzLmxlbmd0aCkgdGhpcy5uZXh0KCk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnByZXBDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRpbWVvdXRGdW5jdGlvbihpKTtcbiAgICAgICAgfSwgaSAqIHRoaXMucHJvcHMucHJlcFRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgIHBhdGg6IHRoaXMucHJvcHMucmVmc1RhcmdldCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHJlZnM6IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoJ2l0ZW1zLScpKSxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlRXZlbnQoZSkge1xuICAgIHZhciBlbmRYO1xuXG4gICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgIGUucGFnZVggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgfVxuXG4gICAgZW5kWCA9IE1hdGgubWluKE1hdGgubWF4KGUucGFnZVggLSB0aGlzLnN0YXRlLmdyYWJYLCB0aGlzLnByb3BzLmxlZnRCb3VuZCksIHRoaXMucHJvcHMucmlnaHRCb3VuZCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGVuZFgsXG4gICAgICBkaXJlY3Rpb246IGVuZFggPiB0aGlzLnN0YXRlLmVuZFggPyAncmlnaHQnIDogJ2xlZnQnXG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMub24gPT09IHRydWUgJiYgcHJvcHMub24gIT09IHRoaXMucHJvcHMub24pIHtcbiAgICAgIHRoaXMubmV4dCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXRJdGVtU3R5bGUoa2V5KSB7XG4gICAgdmFyIGVuZFgsIHg7XG5cbiAgICBlbmRYID0gdGhpcy5zdGF0ZS5pdGVtRW5kWHNba2V5XSB8fCB0aGlzLnN0YXRlLmVuZFg7XG4gICAgeCA9ICgoZW5kWCAtIHRoaXMuc3RhdGUuc3RhcnRYKSAvIHRoaXMuc3RhdGUuem9vbSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3h9cHgpYCxcbiAgICAgIFdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KWAsXG4gICAgfTtcbiAgfVxuXG4gIGdldFN0eWxlKCkge1xuICAgIHZhciB4ID0gKCh0aGlzLnN0YXRlLmVuZFggLSB0aGlzLnN0YXRlLnN0YXJ0WCkgLyB0aGlzLnN0YXRlLnpvb20pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KWAsXG4gICAgICBXZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7eH1weClgLFxuICAgIH07XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKCdkcm9wcGVyJywgdGhpcy5zdGF0ZS5kaXJlY3Rpb24sIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gIH1cblxuICAvKlxuICAgKiBzaG9ydGlkIGlzIGludGVudGlvbmFsbHkgbm90IHVzZWQgZm9yIGtleSBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICovXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHJldHVybiBfLm1hcCh0aGlzLnN0YXRlLml0ZW1zLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICB2YXIgcmVmID0gJ2l0ZW1zLScgKyBrZXk7XG4gICAgICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGl0ZW0udHlwZVxuICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgIHN0eWxlPXt0aGlzLmdldEl0ZW1TdHlsZShrZXkpfVxuICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgZGF0YS1tZXNzYWdlPXtpdGVtLnByb3BzLm1lc3NhZ2V9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQmluKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICB7Li4udGhpcy5wcm9wcy5iaW4ucHJvcHN9XG4gICAgICAgIHJlZj1cImJpblwiXG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9XCJlbFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZWxcIlxuICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50TGlzdCgpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1zXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRHJvcHBlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgcHJlcENsYXNzZXM6IFsncmVhZHknLCAnc2V0JywgJ2dvJ10sXG4gIHByZXBUaW1lb3V0OiAxMDAwLFxuICBiaW46IChcbiAgICA8UmFuZG9taXplclxuICAgICAgYmluPXtbXG4gICAgICAgIDxDYXRjaGFibGUgLz4sXG4gICAgICBdfVxuICAgIC8+XG4gICksXG4gIG9uU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm5leHQoKTtcbiAgfSxcbiAgbGVmdEJvdW5kOiAwLFxuICByaWdodEJvdW5kOiA4MDAsXG4gIHJlZnNUYXJnZXQ6ICdkcm9wcGVyJyxcbiAgb246IHRydWUsXG59LCBEcmFnZ2FibGUuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcHBlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJvcHBlci8wLjIuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhcnRYOiAwLFxuICAgICAgc3RhcnRZOiAwLFxuICAgICAgZW5kWDogMCxcbiAgICAgIGVuZFk6IDAsXG4gICAgICB6b29tOiAxLFxuICAgIH07XG5cbiAgICB0aGlzLm1vdXNlRG93biA9IHRoaXMubW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZVVwID0gdGhpcy5tb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm1vdmVFdmVudCA9IHRoaXMubW92ZUV2ZW50LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnRvdWNoU3RhcnQgPSB0aGlzLnRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRvdWNoRW5kID0gdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc2hvdWxkRHJhZygpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGluY29tcGxldGUoKSB7XG4gICAgdGhpcy5tYXJrSW5jb3JyZWN0KCk7XG4gICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG5cbiAgICBzdXBlci5pbmNvbXBsZXRlKCk7XG4gIH1cblxuICBtYXJrQ29ycmVjdCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvcnJlY3Q6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBtYXJrSW5jb3JyZWN0KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29ycmVjdDogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBzdGFydEV2ZW50KGUsIGNiKSB7XG4gICAgdmFyIHBhZ2VYLCBwYWdlWSwgcmVjdCwgc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGdyYWJYLCBncmFiWTtcblxuICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcy5yZWZzLmVsKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLnNob3VsZERyYWcoKSkgcmV0dXJuO1xuXG4gICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgIHBhZ2VYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgcGFnZVkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBlID0gZS50YXJnZXRUb3VjaGVzWzBdO1xuICAgICAgZS5vZmZzZXRYID0gcGFnZVggLSByZWN0LmxlZnQ7XG4gICAgICBlLm9mZnNldFkgPSBwYWdlWSAtIHJlY3QudG9wO1xuICAgIH1cblxuICAgIGdyYWJYID0gZS5vZmZzZXRYO1xuICAgIGdyYWJZID0gZS5vZmZzZXRZO1xuXG4gICAgc3RhcnRYID0gZW5kWCA9IGUucGFnZVggLSBncmFiWDtcbiAgICBzdGFydFkgPSBlbmRZID0gZS5wYWdlWSAtIGdyYWJZO1xuXG4gICAgaWYgKCF0aGlzLnN0YXRlLmZpcnN0WCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGZpcnN0WDogc3RhcnRYLFxuICAgICAgICBmaXJzdFk6IHN0YXJ0WSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wcm9wcy5yZXR1cm4pIHtcbiAgICAgIHN0YXJ0WCA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWCkgP1xuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WCArIHRoaXMuc3RhdGUuZ3JhYlggLSBncmFiWCA6XG4gICAgICAgIHN0YXJ0WDtcbiAgICAgIHN0YXJ0WSA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWSkgP1xuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WSArIHRoaXMuc3RhdGUuZ3JhYlkgLSBncmFiWSA6XG4gICAgICAgIHN0YXJ0WTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiB0cnVlLFxuICAgICAgcmV0dXJuOiBmYWxzZSxcbiAgICAgIHN0YXJ0WCxcbiAgICAgIHN0YXJ0WSxcbiAgICAgIGdyYWJYLFxuICAgICAgZ3JhYlksXG4gICAgICBlbmRYLFxuICAgICAgZW5kWSxcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5kcmFnUmVzcG9uZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcm9wcy5kcmFnUmVzcG9uZCh0aGlzLnByb3BzLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoTW91c2VFdmVudHMoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gIH1cblxuICBhdHRhY2hUb3VjaEV2ZW50cygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICB9XG5cbiAgbW91c2VEb3duKGUpIHtcbiAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hNb3VzZUV2ZW50cyk7XG4gIH1cblxuICB0b3VjaFN0YXJ0KGUpIHtcbiAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hUb3VjaEV2ZW50cyk7XG4gIH1cblxuICBtb3ZlRXZlbnQoZSkge1xuICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdKSB7XG4gICAgICBlLnBhZ2VYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgZS5wYWdlWSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGVuZFg6IGUucGFnZVggLSB0aGlzLnN0YXRlLmdyYWJYLFxuICAgICAgZW5kWTogZS5wYWdlWSAtIHRoaXMuc3RhdGUuZ3JhYlksXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm5Ub1N0YXJ0KCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmZpcnN0WCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgcmV0dXJuOiB0cnVlLFxuICAgICAgICBlbmRYOiB0aGlzLnN0YXRlLmZpcnN0WCxcbiAgICAgICAgZW5kWTogdGhpcy5zdGF0ZS5maXJzdFksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlbmRFdmVudChjYikge1xuICAgIHRoaXMuZHJvcFJlc3BvbmQoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnJldHVybikge1xuICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIHJldHVybjogdGhpcy5zdGF0ZS5yZXR1cm4sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYi5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGRldGFjaE1vdXNlRXZlbnRzKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICB9XG5cbiAgZGV0YWNoVG91Y2hFdmVudHMoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgfVxuXG4gIG1vdXNlVXAoKSB7XG4gICAgdGhpcy5lbmRFdmVudCh0aGlzLmRldGFjaE1vdXNlRXZlbnRzKTtcbiAgfVxuXG4gIHRvdWNoRW5kKCkge1xuICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hUb3VjaEV2ZW50cyk7XG4gIH1cblxuICBkcm9wUmVzcG9uZCgpIHtcbiAgICB2YXIgY29ybmVycztcblxuICAgIGNvcm5lcnMgPSB0aGlzLnNldENvcm5lcnMoKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5kcm9wUmVzcG9uZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcm9wcy5kcm9wUmVzcG9uZCh0aGlzLnByb3BzLm1lc3NhZ2UsIGNvcm5lcnMpO1xuICAgIH1cbiAgfVxuXG4gIHNldENvcm5lcnMoKSB7XG4gICAgdmFyIHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCwgZWwsIGNvcm5lcnMgPSBbXTtcblxuICAgIGxlZnQgPSAwO1xuICAgIHRvcCA9IDA7XG4gICAgZWwgPSB0aGlzLnJlZnMuZWw7XG4gICAgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgIGlmIChlbC5jbGFzc05hbWUuaW5kZXhPZignc2NyZWVuJykgIT09IC0xKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZWZ0ICs9IGVsLm9mZnNldExlZnQgfHwgMDtcbiAgICAgIHRvcCArPSBlbC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIGxlZnQgKz0gKCh0aGlzLnN0YXRlLmVuZFggLSB0aGlzLnN0YXRlLnN0YXJ0WCkgLyB0aGlzLnN0YXRlLnpvb20pO1xuICAgIHRvcCArPSAoKHRoaXMuc3RhdGUuZW5kWSAtIHRoaXMuc3RhdGUuc3RhcnRZKSAvIHRoaXMuc3RhdGUuem9vbSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgY29ybmVycy5wdXNoKHtcbiAgICAgICAgeDogbGVmdCArIHdpZHRoICogKGkgPT09IDEgfHwgaSA9PT0gMiA/IDEgOiAwKSxcbiAgICAgICAgeTogdG9wICsgaGVpZ2h0ICogKGkgPiAxID8gMSA6IDApLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb3JuZXJzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvcm5lcnM7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmJvb3RzdHJhcCgpO1xuICB9XG5cbiAgYm9vdHN0cmFwKCkge1xuICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgdGhpcy5zZXRab29tKCk7XG5cbiAgICB0aGlzLnJlZnMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xuICAgIHRoaXMucmVmcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldFpvb20uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXRab29tKCkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHpvb206IHN0YXRlLnNjYWxlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTdHlsZSgpIHtcbiAgICB2YXIgeCwgeTtcblxuICAgIHggPSAoKHRoaXMuc3RhdGUuZW5kWCAtIHRoaXMuc3RhdGUuc3RhcnRYKSAvIHRoaXMuc3RhdGUuem9vbSk7XG4gICAgeSA9ICgodGhpcy5zdGF0ZS5lbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFkpIC8gdGhpcy5zdGF0ZS56b29tKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7eH1weCkgdHJhbnNsYXRlWSgke3l9cHgpYCxcbiAgICAgIFdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KSB0cmFuc2xhdGVZKCR7eX1weClgLFxuICAgIH07XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgW3RoaXMucHJvcHMubWVzc2FnZV06IHRoaXMucHJvcHMubWVzc2FnZSxcbiAgICAgIERSQUdHSU5HOiB0aGlzLnN0YXRlLmRyYWdnaW5nLFxuICAgICAgUkVUVVJOOiB0aGlzLnN0YXRlLnJldHVybixcbiAgICAgIENPUlJFQ1Q6IHRoaXMuc3RhdGUuY29ycmVjdCxcbiAgICB9LCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj1cImVsXCJcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhZ2dhYmxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC4xLmpzXG4gKiovIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFJhbmRvbWl6ZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgZ2V0QWxsKCkge1xuICAgIHJldHVybiBfLnNodWZmbGUodGhpcy5wcm9wcy5iaW4pO1xuICB9XG5cbiAgZ2V0KGFtb3VudCA9IDEpIHtcbiAgICB2YXIgaXRlbXMsIGJpbiA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMucmVtYWluICYmIHRoaXMuc3RhdGUuYmluKSB7XG4gICAgICBiaW4gPSB0aGlzLnN0YXRlLmJpbjtcbiAgICB9XG5cbiAgICB3aGlsZSAoYmluLmxlbmd0aCA8IGFtb3VudCkge1xuICAgICAgYmluID0gYmluLmNvbmNhdChfLnNodWZmbGUodGhpcy5wcm9wcy5iaW4pKTtcbiAgICB9XG5cbiAgICBpdGVtcyA9IGJpbi5zcGxpY2UoMCwgYW1vdW50KTtcblxuICAgIGlmICh0aGlzLnByb3BzLnJlbWFpbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7YmlufSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcygncmFuZG9taXplcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gIH1cblxuICByZW5kZXJCaW4oKSB7XG4gICAgcmV0dXJuIF8ubWFwKHRoaXMucHJvcHMuYmluLCAobGksIGtleSkgPT4ge1xuICAgICAgdmFyIHJlZiA9IGxpLnJlZiB8fCAobGkucHJvcHMgJiYgbGkucHJvcHNbJ2RhdGEtcmVmJ10pIHx8IGtleTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG5cblJhbmRvbWl6ZXIuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGJpbjogW10sXG4gIHJlbWFpbjogZmFsc2UsXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogKCkgPT4gZmFsc2UsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFJhbmRvbWl6ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3JhbmRvbWl6ZXIvMC4xLmpzXG4gKiovIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIENhdGNoYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYW5DYXRjaDogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5yZXNldCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgfVxuXG4gIG1hcmtDYXVnaHQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnJlYWR5KSByZXR1cm47XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IGZhbHNlfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNhdWdodC5jYWxsKHRoaXMpO1xuICB9XG5cbiAgY2FuQ2F0Y2goKSB7XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuc3RhdGUuY2FuQ2F0Y2g7XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaGFibGUnLCB7XG4gICAgICBDQVVHSFQ6ICF0aGlzLnN0YXRlLmNhbkNhdGNoXG4gICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnJlYWR5ICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMucHJvcHMucmVDYXRjaGFibGUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2NhbkNhdGNoOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IC8+XG4gICAgKTtcbiAgfVxufVxuXG5DYXRjaGFibGUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgaXNDb3JyZWN0OiB0cnVlLFxuICByZUNhdGNoYWJsZTogdHJ1ZSxcbiAgb25DYXVnaHQ6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2hhYmxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xLmpzXG4gKiovIiwiaW1wb3J0IENhdGNoIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoLzAuMSc7XG5cbmNsYXNzIENhdGNoZXIgZXh0ZW5kcyBDYXRjaCB7XG4gIGJvb3RzdHJhcCgpIHtcbiAgICBza29hc2guQ29tcG9uZW50LnByb3RvdHlwZS5ib290c3RyYXAuY2FsbCh0aGlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZSk7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLmJ1Y2tldE5vZGVzID0gXy5yZWR1Y2UodGhpcy5yZWZzLCAoYSwgdiwgaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignYnVja2V0cy0nKSkgcmV0dXJuIGE7XG4gICAgICBhW2tdID0gUmVhY3RET00uZmluZERPTU5vZGUodik7XG4gICAgICByZXR1cm4gYTtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgIHZhciB6b29tID0gc3RhdGUuc2NhbGU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgem9vbVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbnMoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQpIHJldHVybjtcbiAgICBfLmVhY2godGhpcy5idWNrZXROb2RlcywgKGJ1Y2tldE5vZGUsIGJ1Y2tldFJlZktleSkgPT4ge1xuICAgICAgdmFyIGJ1Y2tldFJlY3QgPSBidWNrZXROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgXy5lYWNoKHRoaXMucHJvcHMuY2F0Y2hhYmxlUmVmcywgY2F0Y2hhYmxlUmVmID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hhYmxlUmVmLkRPTU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDYXRjaGFibGUodGhpcy5yZWZzW2J1Y2tldFJlZktleV0sIGNhdGNoYWJsZVJlZik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gIH1cblxuICBzZWxlY3RDYXRjaGFibGUoYnVja2V0UmVmLCBjYXRjaGFibGVSZWYpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCB0aGlzLnN0YXRlLnBhdXNlZCB8fCAhdGhpcy5zdGF0ZS5jYW5DYXRjaCB8fCAhY2F0Y2hhYmxlUmVmLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICBjYXRjaGFibGVSZWYubWFya0NhdWdodCgpO1xuICAgIGlmIChjYXRjaGFibGVSZWYucHJvcHMubWVzc2FnZSA9PT0gYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5jb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKTtcbiAgICB9XG4gIH1cblxuICBjb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKSB7XG4gICAgdGhpcy5wbGF5TWVkaWEoJ2NvcnJlY3QnKTtcbiAgICB0aGlzLnByb3BzLm9uQ29ycmVjdC5jYWxsKHRoaXMsIGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKTtcbiAgfVxuXG4gIGluY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZikge1xuICAgIHRoaXMucGxheU1lZGlhKCdpbmNvcnJlY3QnKTtcbiAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgYnVja2V0UmVmLCBjYXRjaGFibGVSZWYpO1xuICB9XG5cbiAgcmVuZGVyQnVja2V0KCkge1xuICAgIHJldHVybiBfLm1hcChbXS5jb25jYXQodGhpcy5wcm9wcy5idWNrZXQpLCAoYnVja2V0LCBrZXkpID0+XG4gICAgICA8YnVja2V0LnR5cGVcbiAgICAgICAgey4uLmJ1Y2tldC5wcm9wc31cbiAgICAgICAgcmVmPXsnYnVja2V0cy0nICsga2V5fVxuICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgICBrZXk9e2tleX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoJ2Fzc2V0cycpfVxuICAgICAgICB7dGhpcy5yZW5kZXJCdWNrZXQoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2hlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjIuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xJztcblxuY2xhc3MgQ2F0Y2ggZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYW5DYXRjaDogdHJ1ZSxcbiAgICB9O1xuXG4gICAgdGhpcy5vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zID0gdGhpcy5jaGVja0NvbGxpc2lvbnMuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgdGhpcy5hdHRhY2hNb3VzZUV2ZW50cygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKTtcblxuICAgIHRoaXMuYnVja2V0Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5idWNrZXQpO1xuICAgIHRoaXMuY2F0Y2hhYmxlTm9kZXMgPSBfLm1hcCh0aGlzLnByb3BzLmNhdGNoYWJsZXMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgcmV0dXJuIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1tgJHtrZXl9LWNhdGNoYWJsZWBdKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIF8uZm9yRWFjaCh0aGlzLmNhdGNoYWJsZU5vZGVzLCBmdW5jdGlvbiAobm9kZSwga2V5KSB7XG4gICAgICB2YXIgY2F0Y2hhYmxlUmVmID0gdGhpcy5yZWZzW2Ake2tleX0tY2F0Y2hhYmxlYF07XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbml0ZXJhdGlvbicsIGNhdGNoYWJsZVJlZi5yZXNldCwgZmFsc2UpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICB2YXIgY2F0Y2hSZWYgPSB0aGlzLnJlZnNbJ2NhdGNoLWNvbXBvbmVudCddO1xuICAgIGlmIChjYXRjaFJlZikge1xuICAgICAgY2F0Y2hSZWYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICBjYXRjaFJlZi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICBjYXRjaFJlZi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlTW92ZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3VzZVg6IGUucGFnZVhcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgdmFyIHpvb20gPSBzdGF0ZS5zY2FsZTtcbiAgICAgIHZhciBlZGdlcyA9IHRoaXMuZ2V0RWRnZXModGhpcy5idWNrZXROb2RlKTtcbiAgICAgIHZhciBidWNrZXRXaWR0aCA9IGVkZ2VzLnJpZ2h0IC0gZWRnZXMubGVmdDtcbiAgICAgIHZhciBsZWZ0Qm91bmQgPSB0aGlzLmJ1Y2tldE5vZGUub2Zmc2V0UGFyZW50ID8gdGhpcy5idWNrZXROb2RlLm9mZnNldFBhcmVudC5vZmZzZXRXaWR0aCAtIGJ1Y2tldFdpZHRoIDogMDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJ1Y2tldFRvcDogZWRnZXMudG9wLFxuICAgICAgICBidWNrZXRCb3R0b206IGVkZ2VzLmJvdHRvbSxcbiAgICAgICAgYnVja2V0V2lkdGgsXG4gICAgICAgIGxlZnRCb3VuZCxcbiAgICAgICAgem9vbVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gICAgdGhpcy5ib290c3RyYXAoKTtcbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5jaGVja0NvbGxpc2lvbnMoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFydGVkOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc3RhcnRlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBhdXNlZDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVzdW1lKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnBhdXNlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBhdXNlZDogZmFsc2VcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbnMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdENhdGNoYWJsZShjYXRjaGFibGVOb2RlLCBrZXkpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCB0aGlzLnN0YXRlLnBhdXNlZCB8fCAhdGhpcy5zdGF0ZS5jYW5DYXRjaCB8fCAhY2F0Y2hhYmxlTm9kZS5jYW5DYXRjaCgpKSByZXR1cm47XG4gICAgY2F0Y2hhYmxlTm9kZS5tYXJrQ2F1Z2h0KCk7XG4gICAgaWYgKGNhdGNoYWJsZU5vZGUucHJvcHMuaXNDb3JyZWN0KSB7XG4gICAgICB0aGlzLmNvcnJlY3QoY2F0Y2hhYmxlTm9kZSwga2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmNvcnJlY3QoY2F0Y2hhYmxlTm9kZSwga2V5KTtcbiAgICB9XG4gIH1cblxuICBjb3JyZWN0KGNhdGNoYWJsZSwga2V5KSB7XG4gICAgdGhpcy5wbGF5TWVkaWEoJ2NvcnJlY3QnKTtcbiAgICB0aGlzLnByb3BzLm9uQ29ycmVjdC5jYWxsKHRoaXMsIGNhdGNoYWJsZSwga2V5KTtcbiAgfVxuXG4gIGluY29ycmVjdChjYXRjaGFibGUsIGtleSkge1xuICAgIHRoaXMucGxheU1lZGlhKCdpbmNvcnJlY3QnKTtcbiAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgY2F0Y2hhYmxlLCBrZXkpO1xuICB9XG5cbiAgY2hlY2tDb2xsaXNpb25zKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG4gICAgdmFyIGJ1Y2tldFJlY3QgPSB0aGlzLmJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgXy5mb3JFYWNoKHRoaXMuY2F0Y2hhYmxlTm9kZXMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgaWYgKHRoaXMuaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgdmFsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICB0aGlzLnNlbGVjdENhdGNoYWJsZSh0aGlzLnJlZnNbYCR7a2V5fS1jYXRjaGFibGVgXSwga2V5KTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5jaGVja0NvbGxpc2lvbnMpO1xuICB9XG5cbiAgaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hSZWN0KSB7XG4gICAgdmFyIHhDZW50ZXIgPSBjYXRjaFJlY3QubGVmdCArIChjYXRjaFJlY3QucmlnaHQgLSBjYXRjaFJlY3QubGVmdCkgLyAyO1xuICAgIHZhciB5T2Zmc2V0ID0gKGNhdGNoUmVjdC5ib3R0b20gLSBjYXRjaFJlY3QudG9wKSAvIDY7XG4gICAgcmV0dXJuIChidWNrZXRSZWN0LnRvcCA8IGNhdGNoUmVjdC5ib3R0b20gLSB5T2Zmc2V0ICYmIGJ1Y2tldFJlY3QudG9wID4gY2F0Y2hSZWN0LnRvcCArIHlPZmZzZXQgJiZcbiAgICB4Q2VudGVyID4gYnVja2V0UmVjdC5sZWZ0ICYmIHhDZW50ZXIgPCBidWNrZXRSZWN0LnJpZ2h0KTtcbiAgfVxuXG4gIGdldEVkZ2VzKGVsKSB7XG4gICAgdmFyIHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodDtcblxuICAgIGxlZnQgPSAwO1xuICAgIHRvcCA9IDA7XG4gICAgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgIGlmIChlbC5jbGFzc05hbWUgJiYgZWwuY2xhc3NOYW1lLmluZGV4T2YoJ3NjcmVlbicpICE9PSAtMSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGVmdCArPSBlbC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICB0b3AgKz0gZWwub2Zmc2V0VG9wIHx8IDA7XG4gICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wLFxuICAgICAgYm90dG9tOiB0b3AgKyBoZWlnaHQsXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHQ6IGxlZnQgKyB3aWR0aFxuICAgIH07XG4gIH1cblxuICBnZXRTdHlsZSgpIHtcbiAgICB2YXIgbGVmdCA9ICh0aGlzLnN0YXRlLm1vdXNlWCAvIHRoaXMuc3RhdGUuem9vbSkgLSAodGhpcy5zdGF0ZS5idWNrZXRXaWR0aCAvIDIpO1xuICAgIGlmICh0aGlzLnByb3BzLmJ1Y2tldEluQm91bmRzKSB7XG4gICAgICBsZWZ0ID0gbGVmdCA8IDEgPyAxIDogbGVmdDtcbiAgICAgIGxlZnQgPSBsZWZ0ID49IHRoaXMuc3RhdGUubGVmdEJvdW5kID8gdGhpcy5zdGF0ZS5sZWZ0Qm91bmQgLSAxIDogbGVmdDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogYCR7bGVmdH1weGBcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyQnVja2V0KCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGhpcy5wcm9wcy5idWNrZXQudHlwZVxuICAgICAgICB7Li4udGhpcy5wcm9wcy5idWNrZXQucHJvcHN9XG4gICAgICAgIHJlZj1cImJ1Y2tldFwiXG4gICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJDYXRjaGFibGVzKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNhdGNoYWJsZXMubWFwKChpdGVtLCBrZXkpID0+XG4gICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgcmVmPXtgJHtrZXl9LWNhdGNoYWJsZWB9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaCcsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPVwiY2F0Y2gtY29tcG9uZW50XCIgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJpdGVtc1wiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNhdGNoYWJsZXMoKX1cbiAgICAgICAgPC91bD5cbiAgICAgICAge3RoaXMucmVuZGVyQnVja2V0KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn1cblxuQ2F0Y2guZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGNhdGNoYWJsZXM6IFtdLFxuICBidWNrZXRJbkJvdW5kczogdHJ1ZSxcbiAgYnVja2V0OiA8c2tvYXNoLkNvbXBvbmVudCAvPixcbiAgb25Db3JyZWN0OiBfLm5vb3AsXG4gIG9uSW5jb3JyZWN0OiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGNoO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgUmV2ZWFsIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgb3BlblJldmVhbDogJycsXG4gICAgICBjdXJyZW50bHlPcGVuOiBbXVxuICAgIH07XG5cbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgfVxuXG4gIGluY29tcGxldGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcGVuUmV2ZWFsOiAnJyxcbiAgICAgIGN1cnJlbnRseU9wZW46IFtdXG4gICAgfSk7XG5cbiAgICBzdXBlci5pbmNvbXBsZXRlKCk7XG4gIH1cblxuICBvcGVuKG1lc3NhZ2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGN1cnJlbnRseU9wZW4gPSB0aGlzLnByb3BzLm9wZW5NdWx0aXBsZSA/XG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRseU9wZW4uY29uY2F0KG1lc3NhZ2UpIDogW21lc3NhZ2VdO1xuXG4gICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgb3BlblJldmVhbDogbWVzc2FnZSxcbiAgICAgIGN1cnJlbnRseU9wZW4sXG4gICAgfSk7XG5cbiAgICBzZWxmLnBsYXlBdWRpbyhtZXNzYWdlKTtcblxuICAgIGlmIChzZWxmLnByb3BzLmNvbXBsZXRlT25PcGVuKSB7XG4gICAgICBzZWxmLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyZWYsIGtleSkgPT4ge1xuICAgICAgICBpZiAocmVmICYmIGtleSA9PT0gbWVzc2FnZSkgcmVmLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5wcm9wcy5hdXRvQ2xvc2UpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5wcm9wcy5vcGVuVGFyZ2V0KSB7XG4gICAgICBzZWxmLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgIHBhdGg6IHNlbGYucHJvcHMub3BlblRhcmdldCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIG9wZW46ICcnICsgbWVzc2FnZSxcbiAgICAgICAgICBjbG9zZTogZmFsc2UsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGYucHJvcHMub25PcGVuLmNhbGwoc2VsZiwgbWVzc2FnZSk7XG4gIH1cblxuICBjbG9zZShvcHRzID0ge30pIHtcbiAgICB2YXIgcHJldk1lc3NhZ2UsIGN1cnJlbnRseU9wZW4sIG9wZW5SZXZlYWwsIG9wZW47XG5cbiAgICBwcmV2TWVzc2FnZSA9IHRoaXMuc3RhdGUub3BlblJldmVhbDtcbiAgICBjdXJyZW50bHlPcGVuID0gdGhpcy5zdGF0ZS5jdXJyZW50bHlPcGVuO1xuICAgIGN1cnJlbnRseU9wZW4uc3BsaWNlKGN1cnJlbnRseU9wZW4uaW5kZXhPZihwcmV2TWVzc2FnZSksIDEpO1xuICAgIG9wZW4gPSBjdXJyZW50bHlPcGVuLmxlbmd0aCA+IDA7XG4gICAgb3BlblJldmVhbCA9IG9wZW4gPyBjdXJyZW50bHlPcGVuW2N1cnJlbnRseU9wZW4ubGVuZ3RoIC0gMV0gOiAnJztcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgb3BlbixcbiAgICAgIG9wZW5SZXZlYWwsXG4gICAgICBjdXJyZW50bHlPcGVuLFxuICAgIH0pO1xuXG4gICAgaWYgKCFvcHRzLnNpbGVudCkgdGhpcy5wbGF5TWVkaWEoJ2Nsb3NlLXNvdW5kJyk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2xvc2UuY2FsbCh0aGlzLCBwcmV2TWVzc2FnZSk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuY2xvc2VSZXNwb25kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnByb3BzLmNsb3NlUmVzcG9uZChwcmV2TWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5vcGVuT25TdGFydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLm9wZW4odGhpcy5wcm9wcy5vcGVuT25TdGFydCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnN0YXJ0ICYmIHR5cGVvZiB0aGlzLnByb3BzLnN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnByb3BzLnN0YXJ0LmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xvc2Uoe3NpbGVudDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHBsYXlBdWRpbyhtZXNzYWdlKSB7XG4gICAgdmFyIG1lc3NhZ2VzO1xuXG4gICAgbWVzc2FnZSArPSAnJztcblxuICAgIHRoaXMucGxheU1lZGlhKCdvcGVuLXNvdW5kJyk7XG5cbiAgICBtZXNzYWdlcyA9IG1lc3NhZ2Uuc3BsaXQoJyAnKTtcbiAgICBtZXNzYWdlcy5tYXAoYXVkaW8gPT4ge1xuICAgICAgdGhpcy5wbGF5TWVkaWEoYXVkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQXNzZXRzKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmFzc2V0cykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYXNzZXRzLm1hcCgoYXNzZXQsIGtleSkgPT4ge1xuICAgICAgICB2YXIgcmVmID0gYXNzZXQucmVmIHx8IGFzc2V0LnByb3BzWydkYXRhLXJlZiddIHx8ICdhc3NldC0nICsga2V5O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxhc3NldC50eXBlXG4gICAgICAgICAgICB7Li4uYXNzZXQucHJvcHN9XG4gICAgICAgICAgICBkYXRhLXJlZj17a2V5fVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXJMaXN0KCkge1xuICAgIHZhciBsaXN0ID0gdGhpcy5wcm9wcy5saXN0O1xuXG4gICAgcmV0dXJuIGxpc3QubWFwKChsaSwga2V5KSA9PiB7XG4gICAgICB2YXIgcmVmID0gbGkucmVmIHx8IGxpLnByb3BzWydkYXRhLXJlZiddIHx8IGtleTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGxpLCBrZXkpfVxuICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgaWYgKHByb3BzLm9wZW5SZXZlYWwgIT0gbnVsbCAmJiBwcm9wcy5vcGVuUmV2ZWFsICE9PSB0aGlzLnByb3BzLm9wZW5SZXZlYWwpIHtcbiAgICAgIHRoaXMub3Blbihwcm9wcy5vcGVuUmV2ZWFsKTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuY2xvc2VSZXZlYWwgIT09IHRoaXMucHJvcHMuY2xvc2VSZXZlYWwpIHtcbiAgICAgIGlmIChwcm9wcy5jbG9zZVJldmVhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9IGVsc2UgaWYgKE51bWJlci5pc0ludGVnZXIocHJvcHMuY2xvc2VSZXZlYWwpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMuY2xvc2VSZXZlYWw7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENsYXNzKGxpLCBrZXkpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICcnO1xuXG4gICAgaWYgKGxpLnByb3BzLmNsYXNzTmFtZSkgY2xhc3NlcyA9IGxpLnByb3BzLmNsYXNzTmFtZTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRseU9wZW4uaW5kZXhPZihrZXkpICE9PSAtMSB8fFxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRseU9wZW4uaW5kZXhPZignJyArIGtleSkgIT09IC0xIHx8XG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudGx5T3Blbi5pbmRleE9mKGxpLnByb3BzWydkYXRhLXJlZiddKSAhPT0gLTEgfHxcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50bHlPcGVuLmluZGV4T2YobGkucmVmKSAhPT0gLTFcbiAgICApIHtcbiAgICAgIGNsYXNzZXMgPSBjbGFzc05hbWVzKGNsYXNzZXMsICdPUEVOJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHZhciBjbGFzc2VzLCBvcGVuID0gJ29wZW4tbm9uZSAnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgb3BlbiA9ICcnO1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50bHlPcGVuLmZvckVhY2gocmVmID0+IHtcbiAgICAgICAgb3BlbiArPSAnb3Blbi0nICsgcmVmO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAncmV2ZWFsJyxcbiAgICAgIG9wZW4sXG4gICAgICBzdXBlci5nZXRDbGFzc05hbWVzKCksXG4gICAgKTtcblxuICAgIHJldHVybiBjbGFzc2VzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICB7dGhpcy5yZW5kZXJBc3NldHMoKX1cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImNsb3NlLXJldmVhbFwiIG9uQ2xpY2s9e3RoaXMuY2xvc2UuYmluZCh0aGlzKX0+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5SZXZlYWwuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGxpc3Q6IFtcbiAgICA8bGk+PC9saT4sXG4gICAgPGxpPjwvbGk+LFxuICAgIDxsaT48L2xpPixcbiAgICA8bGk+PC9saT5cbiAgXSxcbiAgb3Blbk11bHRpcGxlOiBmYWxzZSxcbiAgb25PcGVuOiBfLm5vb3AsXG4gIG9uQ2xvc2U6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgUmV2ZWFsO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9yZXZlYWwvMC4xLmpzXG4gKiovIiwiaW1wb3J0IFNvcnRHYW1lU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vc29ydF9nYW1lX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiBTb3J0R2FtZVNjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICBpZDogJ3NvcnQtZ2FtZS1sZXZlbC1vbmUnLFxuICAgIHRpbWVvdXQ6IDYwMDAwLFxuICAgIHByZXBUaW1lb3V0OiA3NTAsXG4gICAgdm9zOiBbXG4gICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2VcbiAgICAgICAgcmVmPVwibGV2ZWwtdXBcIlxuICAgICAgICBzaWxlbnRPblN0YXJ0XG4gICAgICA+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvbGV2ZWxfdXAubXAzJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2RpZF95b3UyLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgIGNvbXBsZXRlXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX3RyeV9hZ2Fpbi5tcDMnfVxuICAgICAgLz4sXG4gICAgXSxcbiAgICBzZng6IFtcbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIGNvbXBsZXRlVGFyZ2V0PVwic2Z4XCJcbiAgICAgICAgcmVmPVwicHJpbnRcIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvcHJpbnRfaXRlbS5tcDMnfVxuICAgICAgICBzcHJpdGU9e1swLCA1MDBdfVxuICAgICAgLz5cbiAgICBdLFxuICAgIHJldmVhbExpc3Q6IFtcbiAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgIHJlZj1cImxldmVsLXVwXCJcbiAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgID5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUubWluaW9uLnBuZyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxoMz5cbiAgICAgICAgICBMRVZFTCBVUFxuICAgICAgICA8L2gzPlxuICAgICAgICA8aDQ+XG4gICAgICAgICAgRGlkIFlvdSBLbm93P1xuICAgICAgICA8L2g0PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIE1ha2VyQm90IEZhY3RvcnkgaW48YnIvPlxuICAgICAgICAgIEJyb29rbHluLCBOZXcgWW9yayB1c2VzIDNEIHByaW50ZXJzPGJyLz5cbiAgICAgICAgICB0byBwcmludCBldmVuIG1vcmUgM0QgcHJpbnRlcnMhXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICA+XG4gICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICBjbGFzc05hbWU9XCJtaW5pb25cIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvdHJ5LmFnYWluLm1pbmlvbi5wbmcnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ZyYW1lcy90cnkuYWdhaW4uZnJhbWUucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUubmF2LnBuZyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgzPlxuICAgICAgICAgICAgVFJZIEFHQUlOXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICB7J1lvdSBkaWRuXFwndCB3aW4gdGhpcyB0aW1lIOKAlCd9PGJyLz5cbiAgICAgICAgICB7J2J1dCBkb25cXCd0IHdvcnJ5LCB5b3UgaGF2ZSBhbm90aGVyIGNoYW5jZSEnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgXVxuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9zb3J0X2dhbWVfbGV2ZWxfdHdvX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBTb3J0R2FtZVNjcmVlbkNvbXBvbmVudCBmcm9tICcuL3NvcnRfZ2FtZV9zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gU29ydEdhbWVTY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgaWQ6ICdzb3J0LWdhbWUtbGV2ZWwtb25lJyxcbiAgICB0aW1lb3V0OiA2MDAwMCxcbiAgICBwcmVwVGltZW91dDogNTAwLFxuICAgIHZvczogW1xuICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgIHJlZj1cImxldmVsLXVwXCJcbiAgICAgICAgc2lsZW50T25TdGFydFxuICAgICAgPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy9lZmZlY3RzL2xldmVsX3VwLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL3Zvcy9WT19kaWRfeW91My5tcDMnfVxuICAgICAgICAvPlxuICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT4sXG4gICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9XCJ0cnktYWdhaW5cIlxuICAgICAgICBjb21wbGV0ZVxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL3Zvcy9WT190cnlfYWdhaW4ubXAzJ31cbiAgICAgIC8+LFxuICAgIF0sXG4gICAgc2Z4OiBbXG4gICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICBjb21wbGV0ZVRhcmdldD1cInNmeFwiXG4gICAgICAgIHJlZj1cInByaW50XCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy9lZmZlY3RzL3ByaW50X2l0ZW0ubXAzJ31cbiAgICAgICAgc3ByaXRlPXtbMCwgNTAwXX1cbiAgICAgIC8+XG4gICAgXSxcbiAgICByZXZlYWxMaXN0OiBbXG4gICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICByZWY9XCJsZXZlbC11cFwiXG4gICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICA+XG4gICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvc3ByaXRlLm1pbmlvbi5wbmcnfVxuICAgICAgICAvPlxuICAgICAgICA8aDM+XG4gICAgICAgICAgTEVWRUwgVVBcbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGg0PlxuICAgICAgICAgIERpZCBZb3UgS25vdz9cbiAgICAgICAgPC9oND5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAzRCBwcmludGluZyBjYW4gYmUgYmV0dGVyPGJyLz5cbiAgICAgICAgICBmb3IgdGhlIGVudmlyb25tZW50IHRoYW4gc3RhbmRhcmQ8YnIvPlxuICAgICAgICAgIG1hbnVmYWN0dXJpbmcsIGJlY2F1c2UgdGhlcmUgaXM8YnIvPlxuICAgICAgICAgIG11Y2ggbGVzcyB3YXN0ZSFcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgcmVmPVwidHJ5LWFnYWluXCJcbiAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgID5cbiAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1pbmlvblwiXG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy90cnkuYWdhaW4ubWluaW9uLnBuZyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnRnJhbWVzL3RyeS5hZ2Fpbi5mcmFtZS5wbmcnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3Nwcml0ZS5uYXYucG5nJ31cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDM+XG4gICAgICAgICAgICBUUlkgQUdBSU5cbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIHsnWW91IGRpZG5cXCd0IHdpbiB0aGlzIHRpbWUg4oCUJ308YnIvPlxuICAgICAgICAgIHsnYnV0IGRvblxcJ3Qgd29ycnksIHlvdSBoYXZlIGFub3RoZXIgY2hhbmNlISd9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICBdXG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL3NvcnRfZ2FtZV9sZXZlbF90aHJlZV9zY3JlZW4uanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiAoXG4gICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cImNvbmdyYXR1bGF0aW9uc1wiXG4gICAgPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3Nwcml0ZS5taW5pb24ucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL3Zvcy9WT19Db25ncmF0dWxhdGlvbnMubXAzJ31cbiAgICAgIC8+XG4gICAgICA8ZGl2PlxuICAgICAgICBDT05HUkFUVUxBVElPTlMhXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIFlPVeKAmVZFXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIFdPTlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICBUSEVcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgR0FNRVxuICAgICAgPC9kaXY+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL2NvbmdyYXR1bGF0aW9uc19zY3JlZW4uanNcbiAqKi8iLCJpbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMSc7XG5pbXBvcnQgUmV2ZWFsIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3JldmVhbC8wLjEnO1xuaW1wb3J0IE1lZGlhQ29sbGVjdGlvbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9tZWRpYV9jb2xsZWN0aW9uLzAuMSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgdmFyIG5leHRQaG90bztcblxuICBjb25zdCBqb2JzID0gW1xuICAgICdkZXNpZ25lcicsXG4gICAgJ2FyY2hpdGVjdCcsXG4gICAgJ3N1cmdlb24nLFxuICAgICdlbmdpbmVlcicsXG4gICAgJ2RlbnRpc3QnLFxuICAgICdhcnRpc3QnLFxuICBdO1xuXG4gIG5leHRQaG90byA9IGZ1bmN0aW9uICgpIHtcbiAgICBza29hc2gudHJpZ2dlcigndXBkYXRlU3RhdGUnLCB7XG4gICAgICBwYXRoOiAnc2VsZWN0YWJsZScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHNlbGVjdDogam9ic1soam9icy5pbmRleE9mKF8uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLnRhcmdldC5wcm9wcy5kYXRhLXJlZicpKSArIDEpICUgam9icy5sZW5ndGhdXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBrZXk9e2tleX1cbiAgICAgIGlkPVwiaGVscC10aGUtd29ybGRcIlxuICAgID5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUubWluaW9uLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3Nwcml0ZS5yZWFsd29ybGRnYWxsZXJ5LnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fYW5kX21hbnkubXAzJ31cbiAgICAgIC8+XG4gICAgICA8TWVkaWFDb2xsZWN0aW9uXG4gICAgICAgIHBsYXk9e18uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicpfVxuICAgICAgPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgcmVmPXtqb2JzWzBdfVxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX1Byb2R1Y3RfRGVzaWduZXJzLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICByZWY9e2pvYnNbMV19XG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fQXJjaGl0ZWN0cy5tcDMnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgcmVmPXtqb2JzWzJdfVxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX1N1cmdlb25zLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICByZWY9e2pvYnNbM119XG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fRW5naW5lZXJzLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICByZWY9e2pvYnNbNF19XG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fRGVudGlzdHMubXAzJ31cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgIHJlZj17am9ic1s1XX1cbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL3Zvcy9WT19BcnRpc3RzLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICA8L01lZGlhQ29sbGVjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgIOKApmFuZCBtYW55IHdheXMgdG8gaGVscCB0aGUgd29ybGQ8YnIvPlxuICAgICAgICB3aXRoIHRoZSB3b25kZXJmdWwgdGhpbmdzIHlvdSBjcmVhdGUhPGJyLz5cbiAgICAgICAgQ2xpY2sgb24gdGhlIGltYWdlIHRvIGV4cGFuZC5cbiAgICAgIDwvZGl2PlxuICAgICAgPFNlbGVjdGFibGVcbiAgICAgICAgZGF0YVRhcmdldD1cInNlbGVjdGFibGVcIlxuICAgICAgICBzZWxlY3RDbGFzcz1cIkhJR0hMSUdIVEVEXCJcbiAgICAgICAgc2VsZWN0PXtfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS5zZWxlY3QnKX1cbiAgICAgICAgbGlzdD17W1xuICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgZGF0YS1yZWY9e2pvYnNbMF19XG4gICAgICAgICAgLz4sXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICBkYXRhLXJlZj17am9ic1sxXX1cbiAgICAgICAgICAvPixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIGRhdGEtcmVmPXtqb2JzWzJdfVxuICAgICAgICAgIC8+LFxuICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgZGF0YS1yZWY9e2pvYnNbM119XG4gICAgICAgICAgLz4sXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICBkYXRhLXJlZj17am9ic1s0XX1cbiAgICAgICAgICAvPixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIGRhdGEtcmVmPXtqb2JzWzVdfVxuICAgICAgICAgIC8+LFxuICAgICAgICBdfVxuICAgICAgLz5cbiAgICAgIDxSZXZlYWxcbiAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgIG9wZW5SZXZlYWw9e18uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLnRhcmdldC5wcm9wcy5kYXRhLXJlZicpfVxuICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICBkYXRhLXJlZj17am9ic1swXX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIFByb2R1Y3QgZGVzaWduZXJzXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgZGVzaWduIGFuZCBwcmludCB1c2VmdWwgb2JqZWN0cyBmb3Igb3RoZXJzIVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5leHQtcGhvdG9cIiBvbkNsaWNrPXtuZXh0UGhvdG99IC8+XG4gICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIGRhdGEtcmVmPXtqb2JzWzFdfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgQXJjaGl0ZWN0c1xuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIGNyZWF0ZSBwbGFucyBmb3IgaG91c2luZyB0aGF0IHdpbGw8YnIvPlxuICAgICAgICAgICAgICBiZSAzRCBwcmludGVkIVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5leHQtcGhvdG9cIiBvbkNsaWNrPXtuZXh0UGhvdG99IC8+XG4gICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIGRhdGEtcmVmPXtqb2JzWzJdfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgU3VyZ2VvblxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHR1cm4geC1yYXlzIGludG8gM0QgbW9kZWxzPGJyLz5cbiAgICAgICAgICAgICAgYW5kIHJlcGFpciBpbmp1cmVkIGJvZHkgcGFydHMhXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwibmV4dC1waG90b1wiIG9uQ2xpY2s9e25leHRQaG90b30gLz5cbiAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgZGF0YS1yZWY9e2pvYnNbM119XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICBFbmdpbmVlcnNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBtYWtlIDNEIG1vZGVscyBvZiB5b3UgY3JlYXRpb25zLDxici8+XG4gICAgICAgICAgICAgIGFuZCB0aGVuIHByaW50IHRoZSByZWFsIHRoaW5nIVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5leHQtcGhvdG9cIiBvbkNsaWNrPXtuZXh0UGhvdG99IC8+XG4gICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIGRhdGEtcmVmPXtqb2JzWzRdfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgRGVudGlzdHNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBwcmludCByZXBsYWNlbWVudCB0ZWV0aCBmb3IgeW91ciBwYXRpZW50cyFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJuZXh0LXBob3RvXCIgb25DbGljaz17bmV4dFBob3RvfSAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICBkYXRhLXJlZj17am9ic1s1XX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIEFydGlzdHNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBleHByZXNzIHRoZW1zZWx2ZXMgdGhyb3VnaCB0aGUgbWFnaWM8YnIvPlxuICAgICAgICAgICAgICBvZiAzRCBwcmludGluZyFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJuZXh0LXBob3RvXCIgb25DbGljaz17bmV4dFBob3RvfSAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgIF19XG4gICAgICAvPlxuICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9oZWxwX3RoZV93b3JsZF9zY3JlZW4uanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgU2VsZWN0YWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc2VsZWN0RnVuY3Rpb246IHRoaXMuc2VsZWN0LFxuICAgIH07XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgdmFyIHNlbGVjdENsYXNzLCBzZWxlY3RGdW5jdGlvbiwgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcblxuICAgIHNlbGVjdENsYXNzID0gdGhpcy5wcm9wcy5zZWxlY3RDbGFzcyB8fCB0aGlzLnN0YXRlLnNlbGVjdENsYXNzIHx8ICdTRUxFQ1RFRCc7XG4gICAgc2VsZWN0RnVuY3Rpb24gPSBzZWxlY3RDbGFzcyA9PT0gJ0hJR0hMSUdIVEVEJyA/IHRoaXMuaGlnaGxpZ2h0IDogdGhpcy5zZWxlY3Q7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RPblN0YXJ0KSB7XG4gICAgICBjbGFzc2VzW3RoaXMucHJvcHMuc2VsZWN0T25TdGFydF0gPSBzZWxlY3RDbGFzcztcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN0YXJ0ZWQ6IHRydWUsXG4gICAgICBjbGFzc2VzLFxuICAgICAgc2VsZWN0RnVuY3Rpb24sXG4gICAgICBzZWxlY3RDbGFzcyxcbiAgICB9KTtcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgIGlmICh0aGlzLnJlZnMuYmluKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdDogdGhpcy5yZWZzLmJpbi5nZXRBbGwoKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpIHtcbiAgICB2YXIgcmVmLCBkYXRhUmVmLCB0YXJnZXQsIGlkLCBpc0NvcnJlY3QsIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgZGF0YVJlZiA9IGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG5cbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG5cbiAgICAgIGRhdGFSZWYgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuICAgIH1cblxuICAgIHJlZiA9IHNlbGYucmVmc1tkYXRhUmVmXTtcblxuICAgIGlzQ29ycmVjdCA9IChyZWYgJiYgcmVmLnByb3BzICYmIHJlZi5wcm9wcy5jb3JyZWN0KSB8fCAoIXNlbGYucHJvcHMuYW5zd2VycyB8fCAhc2VsZi5wcm9wcy5hbnN3ZXJzLmxlbmd0aCB8fCBzZWxmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkYXRhUmVmKSAhPT0gLTEpO1xuXG4gICAgaWYgKHNlbGYucHJvcHMuYWxsb3dEZXNlbGVjdCAmJiBjbGFzc2VzW2RhdGFSZWZdKSB7XG4gICAgICBkZWxldGUgY2xhc3Nlc1tkYXRhUmVmXTtcbiAgICB9IGVsc2UgaWYgKGlzQ29ycmVjdCkge1xuICAgICAgY2xhc3Nlc1tkYXRhUmVmXSA9IHNlbGYuc3RhdGUuc2VsZWN0Q2xhc3M7XG4gICAgfVxuXG4gICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICBjbGFzc2VzLFxuICAgIH0pO1xuXG4gICAgc2VsZi5wcm9wcy5zZWxlY3RSZXNwb25kLmNhbGwoc2VsZiwgZGF0YVJlZik7XG4gICAgc2VsZi5wcm9wcy5vblNlbGVjdC5jYWxsKHNlbGYsIGRhdGFSZWYpO1xuXG4gICAgaWYgKHNlbGYucHJvcHMuY2hvb3NlT25lKSBzZWxmLmNvbXBsZXRlKCk7XG5cbiAgICBpZiAoc2VsZi5wcm9wcy5kYXRhVGFyZ2V0KSB7XG4gICAgICBzZWxmLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgIHBhdGg6IHNlbGYucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRhcmdldDogcmVmXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzZWxmLnByb3BzLmNvbXBsZXRlTGlzdE9uQ2xpY2spIHtcbiAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyLCBrKSA9PiB7XG4gICAgICAgIGlmIChrID09PSBpZCkgXy5pbnZva2UociwgJ2NvbXBsZXRlJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfLmVhY2goc2VsZi5yZWZzLCAociwgaykgPT4ge1xuICAgICAgaWYgKGsgPT09IGRhdGFSZWYpIF8uaW52b2tlKHIsICdjb21wbGV0ZScpO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0KGUpIHtcbiAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICB9XG5cbiAgaGlnaGxpZ2h0KGUpIHtcbiAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICB0aGlzLnNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKTtcbiAgfVxuXG4gIGdldENsYXNzKGtleSwgbGkpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgIGxpLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1trZXldLFxuICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2xpLnByb3BzWydkYXRhLXJlZiddXSxcbiAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1tsaS5wcm9wc1snZGF0YS1rZXknXV1cbiAgICApO1xuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcygnc2VsZWN0YWJsZScsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gIH1cblxuICByZW5kZXJCaW4oKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmJpbikgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRoaXMucHJvcHMuYmluLnR5cGVcbiAgICAgICAgey4uLnRoaXMucHJvcHMuYmluLnByb3BzfVxuICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyTGlzdCgpIHtcbiAgICB2YXIgbGlzdCA9IHRoaXMucHJvcHMubGlzdCB8fCB0aGlzLnN0YXRlLmxpc3Q7XG4gICAgcmV0dXJuIGxpc3QubWFwKChsaSwga2V5KSA9PiB7XG4gICAgICB2YXIgZGF0YVJlZiA9IGxpLnByb3BzWydkYXRhLXJlZiddIHx8IGtleTtcbiAgICAgIHZhciByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHMuaWQgfHwgZGF0YVJlZjtcbiAgICAgIHZhciBtZXNzYWdlID0gbGkucHJvcHMubWVzc2FnZSB8fCAnJyArIGtleTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGtleSwgbGkpfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgZGF0YS1tZXNzYWdlPXttZXNzYWdlfVxuICAgICAgICAgIGRhdGEtcmVmPXtkYXRhUmVmfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgIDx1bCBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXt0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmJpbmQodGhpcyl9PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgbGlzdDogW1xuICAgIDxsaT48L2xpPixcbiAgICA8bGk+PC9saT4sXG4gICAgPGxpPjwvbGk+LFxuICAgIDxsaT48L2xpPlxuICBdLFxuICBzZWxlY3RDbGFzczogJ1NFTEVDVEVEJyxcbiAgY29tcGxldGVMaXN0T25DbGljazogdHJ1ZSxcbiAgc2VsZWN0UmVzcG9uZDogXy5ub29wLFxuICBvblNlbGVjdDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RhYmxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgcmV0dXJuIChcbiAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBrZXk9e2tleX1cbiAgICAgIGlkPVwiYnVuY2gtb2YtcHJvYmxlbXNcIlxuICAgID5cbiAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2NvbWluZ191cC5tcDMnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUuY2xvc2V1cG1pbmlvbi5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiYmFsbG9vblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvaW1nLnNwZWVjaGJhbGxvb24udXAucG5nJ31cbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRzXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgQ29taW5nIHVwIGFyZSBhXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIGJ1bmNoIG9mIHByb2JsZW1zXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHRoYXQgbmVlZCBhIDNEIHByaW50ZXJcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgdG8gc29sdmUhXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL2J1bmNoX29mX3Byb2JsZW1zX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgTWVkaWFDb2xsZWN0aW9uIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL21lZGlhX2NvbGxlY3Rpb24vMC4xJztcbmltcG9ydCBUYXJnZXQgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvdGFyZ2V0LzAuMic7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvZHJvcHpvbmUvMC40JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvc2xpZGVyLzAuMSc7XG5pbXBvcnQgRHJhZ2dhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2RyYWdnYWJsZS8wLjQnO1xuaW1wb3J0IFJldmVhbCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9yZXZlYWwvMC4xJztcblxuY29uc3Qgb2JqZWN0cyA9IFtcbiAgJ3VtYnJlbGxhJyxcbiAgJ2dsYXNzZXMnLFxuICAndGlyZScsXG4gICdzaG92ZWwnLFxuICAnbGluaycsXG4gICdidWNrZXQnLFxuICAnYm9vdHMnLFxuICAnZ2xvdmVzJyxcbiAgJ3doaXN0bGUnLFxuICAnY3VwJyxcbiAgJ3Bob25lJyxcbiAgJ3BpZWNlJyxcbiAgJ3Rvb3RoJyxcbiAgJ2JhbGwnLFxuXTtcblxuY29uc3QgdGFyZ2V0cyA9IFtcbiAgJ3RpcmUnLFxuICAnbGluaycsXG4gICdjdXAnLFxuICAncGhvbmUnLFxuICAndG9vdGgnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICB2YXIgb25TdGFydCxcbiAgICBzdGFydEdhbWUsXG4gICAgY2xvc2VSZXZlYWwsXG4gICAgb25Db3JyZWN0LFxuICAgIG9uUHJpbnRlZCxcbiAgICByZXNldCxcbiAgICBvblRyYW5zaXRpb25FbmQ7XG5cbiAgb25TdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBfLmVhY2godGhpcy5yZWZzLmJvdHRvbS5yZWZzLnNsaWRlci5yZWZzLCBzbGlkZSA9PiB7XG4gICAgICBfLmVhY2goc2xpZGUucmVmcywgZHJhZ2dhYmxlID0+IHtcbiAgICAgICAgZHJhZ2dhYmxlLm1hcmtJbmNvcnJlY3QoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHN0YXJ0R2FtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBza29hc2gudHJpZ2dlcigndXBkYXRlU3RhdGUnLCB7XG4gICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb3BlbjogJ2RyYWctaXQtaGVyZScsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIGNsb3NlUmV2ZWFsID0gZnVuY3Rpb24gKCkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoXy5nZXQocHJvcHMsICdkYXRhLnNldFRhcmdldCcsIDApID4gNCkge1xuICAgICAgc2tvYXNoLnRyaWdnZXIoJ2dvdG8nLCB7XG4gICAgICAgIGluZGV4OiBwYXJzZUludChwcm9wcy5pbmRleCwgMTApICsgMSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkNvcnJlY3QgPSBmdW5jdGlvbiAoZHJvcHBlZCkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgIHBhdGg6ICdwcmludGVkJyxcbiAgICAgIGRhdGE6IGRyb3BwZWQsXG4gICAgfSk7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVN0YXRlJywge1xuICAgICAgcGF0aDogJ3NmeCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBsYXlpbmc6ICdwcmludCdcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgb25QcmludGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBkcm9wcGVkID0gXy5nZXQocHJvcHMsICdkYXRhLnByaW50ZWQnKTtcblxuICAgIGlmIChkcm9wcGVkLnByb3BzLm1lc3NhZ2UgPT09IF8uZ2V0KHByb3BzLCAnZGF0YS50YXJnZXQub2JqZWN0LnByb3BzLm5hbWUnKSkge1xuICAgICAgZHJvcHBlZC5tYXJrQ29ycmVjdCgpO1xuICAgICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVN0YXRlJywge1xuICAgICAgICBwYXRoOiAndHJhbnNpdGlvbicsXG4gICAgICAgIGRhdGE6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJvcHBlZC5tYXJrSW5jb3JyZWN0KCk7XG4gICAgICByZXNldCgpO1xuICAgICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVN0YXRlJywge1xuICAgICAgICBwYXRoOiAnc2Z4JyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHBsYXlpbmc6ICdpbmNvcnJlY3QnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBza29hc2gudHJpZ2dlcigndXBkYXRlU3RhdGUnLCB7XG4gICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgb3BlbjogJ3RyeS1hZ2FpbicsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgXy5lYWNoKFsncHJpbnRlZCcsICd0cmFuc2l0aW9uJywgJ2xheWVyMScsICdsYXllcjInLCAnbGF5ZXIzJ10sICh2KSA9PiB7XG4gICAgICBza29hc2gudHJpZ2dlcigndXBkYXRlU3RhdGUnLCB7XG4gICAgICAgIHBhdGg6IHYsXG4gICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25UcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghXy5nZXQocHJvcHMsICdkYXRhLnRyYW5zaXRpb24nKSkgcmV0dXJuO1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgIHBhdGg6ICdzZngnLFxuICAgICAgZGF0YToge1xuICAgICAgICBwbGF5aW5nOiAnY29ycmVjdCcsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgZGF0YToge1xuICAgICAgICBvcGVuOiBfLmdldChwcm9wcywgJ2RhdGEucHJpbnRlZC5wcm9wcy5tZXNzYWdlJyksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChfLmdldChwcm9wcywgJ2RhdGEuc2V0VGFyZ2V0JywgMCkgPCA0KSByZXNldCgpO1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgIHBhdGg6ICdzZXRUYXJnZXQnLFxuICAgICAgZGF0YTogXy5nZXQocHJvcHMsICdkYXRhLnNldFRhcmdldCcsIDApICsgMSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxza29hc2guU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJwcmludGVyXCJcbiAgICAgIG9uU3RhcnQ9e29uU3RhcnR9XG4gICAgPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3Nwcml0ZS5nYW1lMi5jYXJvdXNlbGFycm93LnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL2dhbWUtMi1zcHJpdGVzLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL2ltZy5wcmludGVyLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL2ltZy5sZWZ0Ym94LnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1Nwcml0ZXNBbmltYXRpb25zL3Nwcml0ZS5nYW1lMi5icm9rZW5vYmoucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvaW1nLndpbmZyYW1lLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL2ltZy5wb3B1cC5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy9ia2cuMy5qcGcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy9pbWcuc3BhcmtsZS5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxNZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnNmeC5wbGF5aW5nJyl9XG4gICAgICA+XG4gICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgIHJlZj1cInByaW50XCJcbiAgICAgICAgICBzaWxlbnRPblN0YXJ0XG4gICAgICAgID5cbiAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJsYXllcjFcIlxuICAgICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy9lZmZlY3RzL1ByaW50aW5nLm1wMyd9XG4gICAgICAgICAgICBzcHJpdGU9e1swLCAxNzAwXX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgcGxheVRhcmdldD1cImxheWVyMlwiXG4gICAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvUHJpbnRpbmcubXAzJ31cbiAgICAgICAgICAgIHNwcml0ZT17WzAsIDE3MDBdfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICBwbGF5VGFyZ2V0PVwibGF5ZXIzXCJcbiAgICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9QcmludGluZy5tcDMnfVxuICAgICAgICAgICAgb25Db21wbGV0ZT17b25QcmludGVkfVxuICAgICAgICAgICAgc3ByaXRlPXtbMCwgMTcwMF19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgIHJlZj1cImNvcnJlY3RcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9Db3JyZWN0Mi5tcDMnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgcmVmPVwiaW5jb3JyZWN0XCJcbiAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9JbmNvcnJlY3QyLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICA8L01lZGlhQ29sbGVjdGlvbj5cbiAgICAgIDxNZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJyl9XG4gICAgICA+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICByZWY9XCJpbnN0cnVjdGlvbnNcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2RyYWdfaXRlbS5tcDMnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgcmVmPXt0YXJnZXRzWzBdfVxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2xldmVsMV9ncmVhdC5tcDMnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgcmVmPXt0YXJnZXRzWzFdfVxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2xldmVsMl9hbWF6aW5nLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICByZWY9e3RhcmdldHNbMl19XG4gICAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fbGV2ZWwzX2V4Y2VsbGVudC5tcDMnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgcmVmPXt0YXJnZXRzWzNdfVxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2xldmVsNF9vbmVfbW9yZS5tcDMnfVxuICAgICAgICAvPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgcmVmPXt0YXJnZXRzWzRdfVxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvdm9zL1ZPX2xldmVsNV93aXphcmQubXAzJ31cbiAgICAgICAgLz5cbiAgICAgIDwvTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidGFyZ2V0c1wiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIFdoYXQgPHNwYW4+SVRFTTwvc3Bhbj4gY2FuPGJyLz5cbiAgICAgICAgICBzb2x2ZSB0aGlzIHByb2JsZW0/XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8VGFyZ2V0XG4gICAgICAgICAgc2V0VGFyZ2V0PXtfLmdldChwcm9wcywgJ2RhdGEuc2V0VGFyZ2V0JywgMCl9XG4gICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgY29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5zZXRUYXJnZXQnLCAwKSA+IDR9XG4gICAgICAgICAgdGFyZ2V0cz17W1xuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgbmFtZT17dGFyZ2V0c1swXX0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBuYW1lPXt0YXJnZXRzWzFdfSAvPixcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IG5hbWU9e3RhcmdldHNbMl19IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgbmFtZT17dGFyZ2V0c1szXX0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBuYW1lPXt0YXJnZXRzWzRdfSAvPixcbiAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgPERyb3B6b25lXG4gICAgICAgIGRyb3BwZWQ9e18uZ2V0KHByb3BzLCAnZGF0YS5kcmFnZ2FibGUuZHJvcHBlZCcpfVxuICAgICAgICBkcm9wem9uZXM9e1tcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgYW5zd2Vycz17b2JqZWN0c31cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhfLmdldChwcm9wcywgJ2RhdGEucHJpbnRlZC5wcm9wcy5tZXNzYWdlJyksIHtcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXy5nZXQocHJvcHMsICdkYXRhLnRyYW5zaXRpb24nKSxcbiAgICAgICAgICAgICAgbGF5ZXIxOiBfLmdldChwcm9wcywgJ2RhdGEubGF5ZXIxLnBsYXlpbmcnKSxcbiAgICAgICAgICAgICAgbGF5ZXIyOiBfLmdldChwcm9wcywgJ2RhdGEubGF5ZXIyLnBsYXlpbmcnKSxcbiAgICAgICAgICAgICAgbGF5ZXIzOiBfLmdldChwcm9wcywgJ2RhdGEubGF5ZXIzLnBsYXlpbmcnKSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmR9XG4gICAgICAgICAgLz5cbiAgICAgICAgXX1cbiAgICAgICAgb25Db3JyZWN0PXtvbkNvcnJlY3R9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5Db21wb25lbnQgcmVmPVwiYm90dG9tXCIgY2xhc3NOYW1lPVwiYm90dG9tXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4+RFJBRyBBTkQgRFJPUDwvc3Bhbj4gdGhlIGl0ZW0gb250byB0aGUgcHJpbnRlciBhYm92ZVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNsaWRlciByZWY9XCJzbGlkZXJcIj5cbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDxEcmFnZ2FibGVcbiAgICAgICAgICAgICAgcmV0dXJuT25JbmNvcnJlY3RcbiAgICAgICAgICAgICAgc3RheU9uQ29ycmVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgIG1lc3NhZ2U9e29iamVjdHNbMF19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPERyYWdnYWJsZVxuICAgICAgICAgICAgICByZXR1cm5PbkluY29ycmVjdFxuICAgICAgICAgICAgICBzdGF5T25Db3JyZWN0PXtmYWxzZX1cbiAgICAgICAgICAgICAgbWVzc2FnZT17b2JqZWN0c1sxXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RHJhZ2dhYmxlXG4gICAgICAgICAgICAgIHJldHVybk9uSW5jb3JyZWN0XG4gICAgICAgICAgICAgIHN0YXlPbkNvcnJlY3Q9e2ZhbHNlfVxuICAgICAgICAgICAgICBtZXNzYWdlPXtvYmplY3RzWzJdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxEcmFnZ2FibGVcbiAgICAgICAgICAgICAgcmV0dXJuT25JbmNvcnJlY3RcbiAgICAgICAgICAgICAgc3RheU9uQ29ycmVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgIG1lc3NhZ2U9e29iamVjdHNbM119XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDxEcmFnZ2FibGVcbiAgICAgICAgICAgICAgcmV0dXJuT25JbmNvcnJlY3RcbiAgICAgICAgICAgICAgc3RheU9uQ29ycmVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgIG1lc3NhZ2U9e29iamVjdHNbNF19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPERyYWdnYWJsZVxuICAgICAgICAgICAgICByZXR1cm5PbkluY29ycmVjdFxuICAgICAgICAgICAgICBzdGF5T25Db3JyZWN0PXtmYWxzZX1cbiAgICAgICAgICAgICAgbWVzc2FnZT17b2JqZWN0c1s1XX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RHJhZ2dhYmxlXG4gICAgICAgICAgICAgIHJldHVybk9uSW5jb3JyZWN0XG4gICAgICAgICAgICAgIHN0YXlPbkNvcnJlY3Q9e2ZhbHNlfVxuICAgICAgICAgICAgICBtZXNzYWdlPXtvYmplY3RzWzZdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxEcmFnZ2FibGVcbiAgICAgICAgICAgICAgcmV0dXJuT25JbmNvcnJlY3RcbiAgICAgICAgICAgICAgc3RheU9uQ29ycmVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgIG1lc3NhZ2U9e29iamVjdHNbN119XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDxEcmFnZ2FibGVcbiAgICAgICAgICAgICAgcmV0dXJuT25JbmNvcnJlY3RcbiAgICAgICAgICAgICAgc3RheU9uQ29ycmVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgIG1lc3NhZ2U9e29iamVjdHNbOF19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPERyYWdnYWJsZVxuICAgICAgICAgICAgICByZXR1cm5PbkluY29ycmVjdFxuICAgICAgICAgICAgICBzdGF5T25Db3JyZWN0PXtmYWxzZX1cbiAgICAgICAgICAgICAgbWVzc2FnZT17b2JqZWN0c1s5XX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RHJhZ2dhYmxlXG4gICAgICAgICAgICAgIHJldHVybk9uSW5jb3JyZWN0XG4gICAgICAgICAgICAgIHN0YXlPbkNvcnJlY3Q9e2ZhbHNlfVxuICAgICAgICAgICAgICBtZXNzYWdlPXtvYmplY3RzWzEwXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RHJhZ2dhYmxlXG4gICAgICAgICAgICAgIHJldHVybk9uSW5jb3JyZWN0XG4gICAgICAgICAgICAgIHN0YXlPbkNvcnJlY3Q9e2ZhbHNlfVxuICAgICAgICAgICAgICBtZXNzYWdlPXtvYmplY3RzWzExXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgIDxza29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPERyYWdnYWJsZVxuICAgICAgICAgICAgICByZXR1cm5PbkluY29ycmVjdFxuICAgICAgICAgICAgICBzdGF5T25Db3JyZWN0PXtmYWxzZX1cbiAgICAgICAgICAgICAgbWVzc2FnZT17b2JqZWN0c1sxMl19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPERyYWdnYWJsZVxuICAgICAgICAgICAgICByZXR1cm5PbkluY29ycmVjdFxuICAgICAgICAgICAgICBzdGF5T25Db3JyZWN0PXtmYWxzZX1cbiAgICAgICAgICAgICAgbWVzc2FnZT17b2JqZWN0c1sxM119XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgPC9TbGlkZXI+XG4gICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICA8UmV2ZWFsXG4gICAgICAgIG9wZW5UYXJnZXQ9XCJyZXZlYWxcIlxuICAgICAgICBvcGVuT25TdGFydD1cImluc3RydWN0aW9uc1wiXG4gICAgICAgIG9wZW5SZXZlYWw9e18uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicpfVxuICAgICAgICBjbG9zZVJldmVhbD17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5jbG9zZScpfVxuICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICBkYXRhLXJlZj1cImluc3RydWN0aW9uc1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICBJbnN0cnVjdGlvbnNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3Bhbj5EUkFHPC9zcGFuPiB0aGUgaXRlbSBvbnRvIHRoZTxici8+XG4gICAgICAgICAgICAgIDNEIHByaW50ZXIgdGhhdCBpcyB0aGUgc29sdXRpb248YnIvPlxuICAgICAgICAgICAgICBmb3IgZWFjaCBzaXR1YXRpb24uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17c3RhcnRHYW1lfSAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICBkYXRhLXJlZj1cImRyYWctaXQtaGVyZVwiXG4gICAgICAgICAgICBvbkNsaWNrPXtjbG9zZVJldmVhbH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBEcmFnIGl0IGhlcmUuPGJyLz5cbiAgICAgICAgICAgICAgUHJlc3MgYW55d2hlcmUgb24gdGhlIHNjcmVlbjxici8+XG4gICAgICAgICAgICAgIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIHJlZj17dGFyZ2V0c1swXX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIEdSRUFUIEpPQiFcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBMZXTigJlzIHNlZSBpZiB5b3UgY2FuPGJyLz5cbiAgICAgICAgICAgICAgZmlndXJlIG91dCB0aGlzIG5leHQgb25lIVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2Nsb3NlUmV2ZWFsfSAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICByZWY9e3RhcmdldHNbMV19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICBZT1UgSEFWRSBBTUFaSU5HPGJyLz5cbiAgICAgICAgICAgICAgUFJPQkxFTS1TT0xWSU5HPGJyLz5cbiAgICAgICAgICAgICAgU0tJTExTIVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIEJ1dCB0aGlzIG9uZSBtaWdodCBiZSBoYXJkZXLigKZcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtjbG9zZVJldmVhbH0gLz5cbiAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgcmVmPXt0YXJnZXRzWzJdfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgRVhDRUxMRU5UPGJyLz5cbiAgICAgICAgICAgICAgV09SSyFcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBDYW4geW91IHNvbHZlIHRoaXMgbmV4dCBvbmU/XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17Y2xvc2VSZXZlYWx9IC8+XG4gICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIHJlZj17dGFyZ2V0c1szXX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIFlPVeKAmVZFIERPTkU8YnIvPlxuICAgICAgICAgICAgICBJVCBBR0FJTiFcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBKdXN0IG9uZSBtb3JlIHRvIGdvIVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2Nsb3NlUmV2ZWFsfSAvPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICByZWY9e3RhcmdldHNbNF19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICBZT1XigJlSRSBBPGJyLz5cbiAgICAgICAgICAgICAgM0QgUFJJTlRJTkc8YnIvPlxuICAgICAgICAgICAgICBXSVpBUkRcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICBhbmQgaGF2ZSBzb2x2ZWQgYWxsIHRoZSBwcm9ibGVtcyE8YnIvPlxuICAgICAgICAgICAgICBUaGFua3MgZm9yIHBsYXlpbmchXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17Y2xvc2VSZXZlYWx9IC8+XG4gICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgIGRhdGEtcmVmPVwidHJ5LWFnYWluXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIFRSWTxici8+XG4gICAgICAgICAgICAgIEFHQUlOXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtjbG9zZVJldmVhbH0gLz5cbiAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICBdfVxuICAgICAgLz5cbiAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvcHJpbnRlcl9zY3JlZW4uanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVGFyZ2V0IGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuICAgIHRoaXMuc2V0VGFyZ2V0KCk7XG4gIH1cblxuICBzZXRUYXJnZXQoaWR4ID0gMCkge1xuICAgIGlmICh0aGlzLnByb3BzLmxvb3ApIGlkeCA9IGlkeCAlIHRoaXMucHJvcHMudGFyZ2V0cy5sZW5ndGg7XG4gICAgaWYgKGlkeCA+PSB0aGlzLnByb3BzLnRhcmdldHMubGVuZ3RoKSByZXR1cm47XG5cbiAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICBwYXRoOiB0aGlzLnByb3BzLmRhdGFUYXJnZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG9iamVjdDogdGhpcy5wcm9wcy50YXJnZXRzW2lkeF0sXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnByb3BzLm9uU2V0VGFyZ2V0LmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkeCxcbiAgICAgIHRhcmdldDogdGhpcy5wcm9wcy50YXJnZXRzW2lkeF0sXG4gICAgfSk7XG4gIH1cblxuICBuZXh0VGFyZ2V0KCkge1xuICAgIHRoaXMuc2V0VGFyZ2V0KHRoaXMuc3RhdGUuaWR4ICsgMSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICBpZiAoXy5pc0Zpbml0ZShwcm9wcy5zZXRUYXJnZXQpICYmIHByb3BzLnNldFRhcmdldCAhPT0gdGhpcy5wcm9wcy5zZXRUYXJnZXQpIHtcbiAgICAgIHRoaXMuc2V0VGFyZ2V0KHByb3BzLnNldFRhcmdldCk7XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm5leHRUYXJnZXQgJiYgcHJvcHMubmV4dFRhcmdldCAhPT0gdGhpcy5wcm9wcy5uZXh0VGFyZ2V0KSB7XG4gICAgICB0aGlzLm5leHRUYXJnZXQoKTtcbiAgICB9XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKFxuICAgICAgJ3RhcmdldCcsXG4gICAgICBzdXBlci5nZXRDbGFzc05hbWVzKCksXG4gICAgICBfLmdldCh0aGlzLnN0YXRlLCAndGFyZ2V0LnByb3BzLm5hbWUnKVxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCd0YXJnZXRzJyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhcmdldC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgdGFyZ2V0czogWzxza29hc2guQ29tcG9uZW50IHRhcmdldD1cIjFcIiAvPl0sXG4gIGRhdGFUYXJnZXQ6ICd0YXJnZXQnLFxuICBvblVwZGF0ZVN0YXRlOiBfLm5vb3AsXG4gIG9uU2V0VGFyZ2V0OiBfLm5vb3AsXG4gIGxvb3A6IGZhbHNlLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBUYXJnZXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3RhcmdldC8wLjIuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRHJvcHpvbmUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgc3RhcnQoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCBkcm9wem9uZSwgZHJhZ2dhYmxlO1xuXG4gICAgc3VwZXIuc3RhcnQoKTtcblxuICAgIHNlbGYuZHJvcHpvbmVDb3JuZXJzID0gXy5tYXAoc2VsZi5wcm9wcy5kcm9wem9uZXMsICh2YWx1ZSwga2V5KSA9PlxuICAgICAgc2VsZi5nZXRDb3JuZXJzKFJlYWN0RE9NLmZpbmRET01Ob2RlKHNlbGYucmVmc1tgZHJvcHpvbmUtJHtrZXl9YF0pKVxuICAgICk7XG5cbiAgICBpZiAoc2VsZi5sb2FkRGF0YSAmJiB0eXBlb2Ygc2VsZi5sb2FkRGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIF8uZm9ySW4oc2VsZi5sb2FkRGF0YSwgKHJlZjEsIGtleTEpID0+IHtcbiAgICAgICAgaWYgKHJlZjEucmVmICYmIHJlZjEuc3RhdGUpIHtcbiAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjIsIGtleTIpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChzZWxmLnJlZnNba2V5MV0gJiYgcmVmMi5wcm9wcy5tZXNzYWdlID09PSByZWYxLnJlZikge1xuICAgICAgICAgICAgICBkcm9wem9uZSA9IHNlbGYucmVmc1trZXkxXTtcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlID0gcmVmMjtcbiAgICAgICAgICAgICAgZHJvcHpvbmUuc2V0U3RhdGUoe2NvbnRlbnQ6IGRyYWdnYWJsZX0pO1xuICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUocmVmMS5zdGF0ZSk7XG4gICAgICAgICAgICAgIHNlbGYuY29ycmVjdChkcmFnZ2FibGUsIGtleTEucmVwbGFjZSgnZHJvcHpvbmUtJywgJycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICBzZWxmLnJlZnNba2V5Ml0uc2V0U3RhdGUoe2NvbnRlbnQ6IFtdfSk7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjMsIGtleTMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGtleTMuaW5kZXhPZignZHJhZ2dhYmxlLScpID09PSAtMSkgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAoXy5pbmNsdWRlcyhyZWYyLCByZWYzLnByb3BzLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZzW2tleTJdLnN0YXRlLmNvbnRlbnQucHVzaChyZWYzKTtcbiAgICAgICAgICAgICAgICByZWYzLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBsb2FkRHJhZ05Ecm9wRGF0YSgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsIGRyb3B6b25lLCBkcmFnZ2FibGU7XG4gICAgXy5mb3JJbihzZWxmLmxvYWREYXRhLCAocmVmMSwga2V5MSkgPT4ge1xuICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgaWYgKHNlbGYucmVmc1trZXkxXSAmJiByZWYyLnByb3BzLm1lc3NhZ2UgPT09IHJlZjEucmVmKSB7XG4gICAgICAgICAgZHJvcHpvbmUgPSBzZWxmLnJlZnNba2V5MV07XG4gICAgICAgICAgZHJhZ2dhYmxlID0gcmVmMjtcbiAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogZHJhZ2dhYmxlfSk7XG4gICAgICAgICAgZHJhZ2dhYmxlLnNldFN0YXRlKHJlZjEuc3RhdGUpO1xuICAgICAgICAgIHNlbGYuY29ycmVjdChkcmFnZ2FibGUsIGtleTEucmVwbGFjZSgnZHJvcHpvbmUtJywgJycpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkTXVsdGlBc253ZXJEYXRhKCkge1xuICAgIHZhciBzZWxmID0gdGhpcywgZHJvcHpvbmUsIGRyYWdnYWJsZTtcbiAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICBkcm9wem9uZSA9IHNlbGYucmVmc1trZXkxXTtcbiAgICAgIGRyb3B6b25lLnNldFN0YXRlKHtjb250ZW50OiBbXX0pO1xuICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgZHJhZ2dhYmxlID0gcmVmMjtcbiAgICAgICAgaWYgKF8uaW5jbHVkZXMocmVmMSwgZHJhZ2dhYmxlLnByb3BzLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgZHJvcHpvbmUuc3RhdGUuY29udGVudC5wdXNoKGRyYWdnYWJsZSk7XG4gICAgICAgICAgZHJhZ2dhYmxlLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29ybmVycyhlbCkge1xuICAgIHZhciBvZmZzZXQsIGNvcm5lcnMgPSBbXTtcblxuICAgIG9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGNvcm5lcnMucHVzaCh7XG4gICAgICAgIHg6IG9mZnNldC5sZWZ0ICsgb2Zmc2V0LndpZHRoICogKGkgPT09IDEgfHwgaSA9PT0gMiA/IDEgOiAwKSxcbiAgICAgICAgeTogb2Zmc2V0LnRvcCArIG9mZnNldC5oZWlnaHQgKiAoaSA+IDEgPyAxIDogMCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29ybmVycztcbiAgfVxuXG4gIG9uRHJvcChkcm9wcGVkKSB7XG4gICAgdmFyIGRyb3BwZWRET00sIGNvcm5lcnMsIGRyb3B6b25lUmVmO1xuXG4gICAgZHJvcHBlZERPTSA9IGRyb3BwZWQuRE9NTm9kZSB8fCBSZWFjdERPTS5maW5kRE9NTm9kZShkcm9wcGVkKTtcbiAgICBjb3JuZXJzID0gdGhpcy5nZXRDb3JuZXJzKGRyb3BwZWRET00pO1xuXG4gICAgZHJvcHpvbmVSZWYgPSBfLnJlZHVjZSh0aGlzLnByb3BzLmRyb3B6b25lcywgKGEsIHYsIGspID0+IHtcbiAgICAgIGlmIChza29hc2gudXRpbC5kb0ludGVyc2VjdChjb3JuZXJzLCB0aGlzLmRyb3B6b25lQ29ybmVyc1trXSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgZHJvcHpvbmUtJHtrfWBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGE7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgaWYgKGRyb3B6b25lUmVmKSB7XG4gICAgICB0aGlzLmluQm91bmRzKGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vdXRPZkJvdW5kcyhkcm9wcGVkKTtcbiAgICB9XG4gIH1cblxuICBvbkRyYWcoZHJhZ2dpbmcpIHtcbiAgICBfLmVhY2godGhpcy5wcm9wcy5kcm9wem9uZXMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICB2YXIgaW5kZXgsIGRyb3B6b25lUmVmLCBjb250YWlucztcbiAgICAgIGRyb3B6b25lUmVmID0gdGhpcy5yZWZzW2Bkcm9wem9uZS0ke2tleX1gXTtcbiAgICAgIGNvbnRhaW5zID0gZHJvcHpvbmVSZWYuY29udGFpbnMgfHwgW107XG4gICAgICBpbmRleCA9IGNvbnRhaW5zLmluZGV4T2YoZHJhZ2dpbmcpO1xuICAgICAgaWYgKH5pbmRleCkgY29udGFpbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGRyb3B6b25lUmVmLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgfSk7XG5cbiAgICB0aGlzLnByb3BzLm9uRHJhZy5jYWxsKHRoaXMsIGRyYWdnaW5nKTtcbiAgfVxuXG4gIGluQm91bmRzKGRyb3BwZWQsIGRyb3B6b25lUmVmKSB7XG4gICAgaWYgKCFkcm9wem9uZVJlZi5wcm9wcy5hbnN3ZXJzIHx8IGRyb3B6b25lUmVmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkcm9wcGVkLnByb3BzLm1lc3NhZ2UpICE9PSAtMSkge1xuICAgICAgdGhpcy5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmNvcnJlY3QoZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgIH1cbiAgfVxuXG4gIG91dE9mQm91bmRzKGRyb3BwZWQpIHtcbiAgICAvLyByZXNwb25kIHRvIGFuIG91dCBvZiBib3VuZHMgZHJvcFxuICAgIHRoaXMucGxheU1lZGlhKCdvdXQnKTtcbiAgICB0aGlzLmluY29ycmVjdChkcm9wcGVkKTtcbiAgfVxuXG4gIGNvcnJlY3QoZHJvcHBlZCwgZHJvcHpvbmVSZWYpIHtcbiAgICAvLyByZXNwb25kIHRvIGNvcnJlY3QgZHJvcFxuICAgIGRyb3BwZWQubWFya0NvcnJlY3QoKTtcbiAgICB0aGlzLnBsYXlNZWRpYSgnY29ycmVjdCcpO1xuXG4gICAgZHJvcHpvbmVSZWYuY29udGFpbnMgPSAoZHJvcHpvbmVSZWYuY29udGFpbnMgfHwgW10pLmNvbmNhdChkcm9wcGVkKTtcblxuICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICB9XG5cbiAgaW5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKSB7XG4gICAgLy8gcmVzcG9uZCB0byBpbmNvcnJlY3QgZHJvcFxuICAgIGRyb3BwZWQubWFya0luY29ycmVjdCgpO1xuICAgIHRoaXMucGxheU1lZGlhKCdpbmNvcnJlY3QnKTtcbiAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgaWYgKHByb3BzLmRyb3BwZWQgJiYgcHJvcHMuZHJvcHBlZCAhPT0gdGhpcy5wcm9wcy5kcm9wcGVkKSB7XG4gICAgICB0aGlzLm9uRHJvcChwcm9wcy5kcm9wcGVkKTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZHJhZ2dpbmcgJiYgcHJvcHMuZHJhZ2dpbmcgIT09IHRoaXMucHJvcHMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub25EcmFnKHByb3BzLmRyYWdnaW5nKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJEcm9wem9uZXMoKSB7XG4gICAgcmV0dXJuIF8ubWFwKHRoaXMucHJvcHMuZHJvcHpvbmVzLCAoY29tcG9uZW50LCBrZXkpID0+XG4gICAgICA8Y29tcG9uZW50LnR5cGVcbiAgICAgICAgey4uLmNvbXBvbmVudC5wcm9wc31cbiAgICAgICAgcmVmPXtgZHJvcHpvbmUtJHtrZXl9YH1cbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKCdkcm9wem9uZXMnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoJ2Fzc2V0cycpfVxuICAgICAgICB7dGhpcy5yZW5kZXJEcm9wem9uZXMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRHJvcHpvbmUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGRyb3B6b25lczogWzxza29hc2guQ29tcG9uZW50IC8+XSxcbiAgb25Db3JyZWN0OiBfLm5vb3AsXG4gIG9uSW5jb3JyZWN0OiBfLm5vb3AsXG4gIG9uRHJhZzogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wem9uZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJvcHpvbmUvMC40LmpzXG4gKiovIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IEFSRUEgPSAnYXJlYSc7XG5jb25zdCBDT05URU5UID0gJ2NvbnRlbnQnO1xuXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSBfLmRlZmF1bHRzKHtcbiAgICAgIGN1cnJlbnRTbGlkZTogMCxcbiAgICB9LCB0aGlzLnN0YXRlKTtcblxuICAgIHRoaXMucHJldiA9IHRoaXMucHJldi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV4dCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZ2V0Q29udGVudFN0eWxlID0gdGhpcy5nZXRDb250ZW50U3R5bGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgdGhpcy5jaGFuZ2VTbGlkZSgtMSk7XG4gIH1cblxuICBuZXh0KCkge1xuICAgIHRoaXMuY2hhbmdlU2xpZGUoMSk7XG4gIH1cblxuICBjaGFuZ2VTbGlkZShpbmNyZW1lbnQgPSAxKSB7XG4gICAgdmFyIGN1cnJlbnRTbGlkZTtcblxuICAgIGlmICh0aGlzLnByb3BzLmxvb3ApIHtcbiAgICAgIGN1cnJlbnRTbGlkZSA9ICh0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSArIGluY3JlbWVudCArIHRoaXMucHJvcHMuY2hpbGRyZW4ubGVuZ3RoKSAlIHRoaXMucHJvcHMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50U2xpZGUgPSBNYXRoLm1heCh0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSArIGluY3JlbWVudCwgMCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjdXJyZW50U2xpZGVcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRlbnRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWFyZ2luTGVmdDogdGhpcy5zdGF0ZS5jdXJyZW50U2xpZGUgKiAtMTAwICsgJyUnXG4gICAgfTtcbiAgfVxuXG4gIGdldENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3NsaWRlcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gIH1cblxuICByZW5kZXJDb250ZW50TGlzdChsaXN0TmFtZSA9ICdjaGlsZHJlbicpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBbXS5jb25jYXQodGhpcy5wcm9wc1tsaXN0TmFtZV0pO1xuICAgIHJldHVybiBjaGlsZHJlbi5tYXAoKGNvbXBvbmVudCwga2V5KSA9PiB7XG4gICAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuO1xuICAgICAgdmFyIHJlZiwgb3BhY2l0eTtcbiAgICAgIHJlZiA9IGNvbXBvbmVudC5yZWYgfHwgKGNvbXBvbmVudC5wcm9wcyAmJiBjb21wb25lbnQucHJvcHNbJ2RhdGEtcmVmJ10pIHx8IGxpc3ROYW1lICsgJy0nICsga2V5O1xuICAgICAgb3BhY2l0eSA9IGtleSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50U2xpZGUgPyAxIDogMDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxjb21wb25lbnQudHlwZVxuICAgICAgICAgIGdhbWVTdGF0ZT17dGhpcy5wcm9wcy5nYW1lU3RhdGV9XG4gICAgICAgICAgey4uLmNvbXBvbmVudC5wcm9wc31cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgbGVmdDogKGtleSAqIDEwMCkgKyAnJScsXG4gICAgICAgICAgICBvcGFjaXR5XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3VsZFJlbmRlcikgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRoaXMucHJvcHMudHlwZSB7Li4udGhpcy5wcm9wc30gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJldi1zbGlkZVwiIG9uQ2xpY2s9e3RoaXMucHJldn0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e0FSRUF9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Q09OVEVOVH1cbiAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldENvbnRlbnRTdHlsZSgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5leHQtc2xpZGVcIiBvbkNsaWNrPXt0aGlzLm5leHR9IC8+XG4gICAgICA8L3RoaXMucHJvcHMudHlwZT5cbiAgICApO1xuICB9XG59XG5cblNsaWRlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgbG9vcDogdHJ1ZSxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zbGlkZXIvMC4xLmpzXG4gKiovIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVuZFg6IDAsXG4gICAgICBlbmRZOiAwLFxuICAgICAgem9vbTogMSxcbiAgICB9O1xuXG4gICAgdGhpcy5tb3VzZURvd24gPSB0aGlzLm1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW91c2VVcCA9IHRoaXMubW91c2VVcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5tb3ZlRXZlbnQgPSB0aGlzLm1vdmVFdmVudC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gdGhpcy50b3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaEVuZCA9IHRoaXMudG91Y2hFbmQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc2V0Wm9vbSA9IHRoaXMuc2V0Wm9vbS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc2hvdWxkRHJhZygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG91bGREcmFnLmNhbGwodGhpcyk7XG4gIH1cblxuICBtYXJrQ29ycmVjdCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvcnJlY3Q6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBtYXJrSW5jb3JyZWN0KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29ycmVjdDogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yZXR1cm5PbkluY29ycmVjdCkge1xuICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRFdmVudChlLCBjYikge1xuICAgIHZhciByZWN0LCBzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgZ3JhYlgsIGdyYWJZO1xuXG4gICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzLkRPTU5vZGUpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuc2hvdWxkRHJhZygpKSByZXR1cm47XG5cbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkge1xuICAgICAgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgZSA9IGUudGFyZ2V0VG91Y2hlc1swXTtcbiAgICAgIGUub2Zmc2V0WCA9IGUucGFnZVggLSByZWN0LmxlZnQ7XG4gICAgICBlLm9mZnNldFkgPSBlLnBhZ2VZIC0gcmVjdC50b3A7XG4gICAgfVxuXG4gICAgZ3JhYlggPSBlLm9mZnNldFggLyB0aGlzLnN0YXRlLnpvb207XG4gICAgZ3JhYlkgPSBlLm9mZnNldFkgLyB0aGlzLnN0YXRlLnpvb207XG5cbiAgICBzdGFydFggPSBlbmRYID0gKGUucGFnZVggLyB0aGlzLnN0YXRlLnpvb20gLSBncmFiWCk7XG4gICAgc3RhcnRZID0gZW5kWSA9IChlLnBhZ2VZIC8gdGhpcy5zdGF0ZS56b29tIC0gZ3JhYlkpO1xuXG4gICAgaWYgKCF0aGlzLnN0YXRlLnJldHVybikge1xuICAgICAgc3RhcnRYID0gXy5pc0Zpbml0ZSh0aGlzLnN0YXRlLmdyYWJYKSA/XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnRYICsgdGhpcy5zdGF0ZS5ncmFiWCAtIGdyYWJYIDpcbiAgICAgICAgc3RhcnRYO1xuICAgICAgc3RhcnRZID0gXy5pc0Zpbml0ZSh0aGlzLnN0YXRlLmdyYWJZKSA/XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnRZICsgdGhpcy5zdGF0ZS5ncmFiWSAtIGdyYWJZIDpcbiAgICAgICAgc3RhcnRZO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICByZXR1cm46IGZhbHNlLFxuICAgICAgc3RhcnRYLFxuICAgICAgc3RhcnRZLFxuICAgICAgZ3JhYlgsXG4gICAgICBncmFiWSxcbiAgICAgIGVuZFgsXG4gICAgICBlbmRZLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgcGF0aDogdGhpcy5wcm9wcy5kcmFnZ2FibGVUYXJnZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGRyYWdnaW5nOiB0aGlzLFxuICAgICAgICBkcm9wcGVkOiBudWxsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkRyYWcuY2FsbCh0aGlzLCB0aGlzKTtcblxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIGNiLmNhbGwodGhpcyk7XG4gIH1cblxuICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgfVxuXG4gIGF0dGFjaFRvdWNoRXZlbnRzKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCk7XG4gIH1cblxuICBtb3VzZURvd24oZSkge1xuICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaE1vdXNlRXZlbnRzKTtcbiAgfVxuXG4gIHRvdWNoU3RhcnQoZSkge1xuICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaFRvdWNoRXZlbnRzKTtcbiAgfVxuXG4gIG1vdmVFdmVudChlKSB7XG4gICAgZSA9IGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0gPyBlLnRhcmdldFRvdWNoZXNbMF0gOiBlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBlbmRYOiAoZS5wYWdlWCAvIHRoaXMuc3RhdGUuem9vbSAtIHRoaXMuc3RhdGUuZ3JhYlgpLFxuICAgICAgZW5kWTogKGUucGFnZVkgLyB0aGlzLnN0YXRlLnpvb20gLSB0aGlzLnN0YXRlLmdyYWJZKSxcbiAgICB9KTtcbiAgfVxuXG4gIGVuZEV2ZW50KGNiKSB7XG4gICAgdGhpcy5vbkRyb3AoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnJldHVybikge1xuICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSBjYi5jYWxsKHRoaXMpO1xuICB9XG5cbiAgc2V0RW5kKGVuZFgsIGVuZFkpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGVuZFgsXG4gICAgICBlbmRZXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm5Ub1N0YXJ0KCkge1xuICAgIHZhciBlbmRYLCBlbmRZLCBkb1JldHVybjtcblxuICAgIGlmICh0aGlzLnByb3BzLnN0YXlPbkNvcnJlY3QgJiYgdGhpcy5zdGF0ZS5jb3JyZWN0KSB7XG4gICAgICBlbmRYID0gdGhpcy5zdGF0ZS5lbmRYO1xuICAgICAgZW5kWSA9IHRoaXMuc3RhdGUuZW5kWTtcbiAgICAgIGRvUmV0dXJuID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuZFggPSB0aGlzLnN0YXRlLnN0YXJ0WDtcbiAgICAgIGVuZFkgPSB0aGlzLnN0YXRlLnN0YXJ0WTtcbiAgICAgIGRvUmV0dXJuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIHJldHVybjogZG9SZXR1cm4sXG4gICAgICBlbmRYLFxuICAgICAgZW5kWSxcbiAgICB9KTtcbiAgfVxuXG4gIGRldGFjaE1vdXNlRXZlbnRzKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICB9XG5cbiAgZGV0YWNoVG91Y2hFdmVudHMoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgfVxuXG4gIG1vdXNlVXAoKSB7XG4gICAgdGhpcy5lbmRFdmVudCh0aGlzLmRldGFjaE1vdXNlRXZlbnRzKTtcbiAgfVxuXG4gIHRvdWNoRW5kKCkge1xuICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hUb3VjaEV2ZW50cyk7XG4gIH1cblxuICBvbkRyb3AoKSB7XG4gICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgcGF0aDogdGhpcy5wcm9wcy5kcmFnZ2FibGVUYXJnZXQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGRyYWdnaW5nOiBudWxsLFxuICAgICAgICBkcm9wcGVkOiB0aGlzXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkRyb3AuY2FsbCh0aGlzLCB0aGlzKTtcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgIHRoaXMuc2V0Wm9vbSgpO1xuXG4gICAgdGhpcy5ET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG5cbiAgICB0aGlzLkRPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xuICAgIHRoaXMuRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldFpvb20pO1xuICB9XG5cbiAgc2V0Wm9vbSgpIHtcbiAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB6b29tOiBzdGF0ZS5zY2FsZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3R5bGUoKSB7XG4gICAgdmFyIHgsIHksIHRyYW5zZm9ybTtcblxuICAgIHggPSB0aGlzLnN0YXRlLmVuZFggLSB0aGlzLnN0YXRlLnN0YXJ0WDtcbiAgICB5ID0gdGhpcy5zdGF0ZS5lbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFk7XG4gICAgdHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt4fXB4KSB0cmFuc2xhdGVZKCR7eX1weClgO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zZm9ybSxcbiAgICAgIFdlYmtpdFRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgIH07XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKHtcbiAgICAgIERSQUdHSU5HOiB0aGlzLnN0YXRlLmRyYWdnaW5nLFxuICAgICAgUkVUVVJOOiB0aGlzLnN0YXRlLnJldHVybixcbiAgICAgIENPUlJFQ1Q6IHRoaXMuc3RhdGUuY29ycmVjdCxcbiAgICB9LCAnZHJhZ2dhYmxlJywgdGhpcy5zdGF0ZS5jbGFzc2VzLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgIGRhdGEtbWVzc2FnZT17dGhpcy5wcm9wcy5tZXNzYWdlfVxuICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgICBjaGlsZHJlbj17dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5EcmFnZ2FibGUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGRyYWdnYWJsZVRhcmdldDogJ2RyYWdnYWJsZScsXG4gIHNob3VsZERyYWc6ICgpID0+IHRydWUsXG4gIHJldHVybjogZmFsc2UsXG4gIHJldHVybk9uSW5jb3JyZWN0OiBmYWxzZSxcbiAgc3RheU9uQ29ycmVjdDogdHJ1ZSxcbiAgb25Ecm9wOiBfLm5vb3AsXG4gIG9uRHJhZzogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBEcmFnZ2FibGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2RyYWdnYWJsZS8wLjQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiAoXG4gICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cIm5vdy10aGF0LXlvdS1sZWFybmVkXCJcbiAgICA+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvc3ByaXRlLm5hdi5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUubWluaW9uLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fbWFrZV9hLm1wMyd9XG4gICAgICAvPlxuICAgICAgPGRpdj5cbiAgICAgICAgTm93IHRoYXQgeW914oCZdmUgbGVhcm5lZDxici8+XG4gICAgICAgIHNvIG11Y2ggYWJvdXQgPHNwYW4+M0QgUFJJTlRJTkc8L3NwYW4+PGJyLz5cbiAgICAgICAgYW5kIHdoYXQgaXQgY2FuIGRvLCBpdOKAmXMgdGltZSB0byBtYWtlPGJyLz5cbiAgICAgICAgYSBsaXN0IG9mIHdoYXQgWU9VIHdvdWxkIGxpa2UgdG8gcHJpbnQhXG4gICAgICA8L2Rpdj5cbiAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5LzNkLXdvcmxkL2NvbXBvbmVudHMvbm93X3RoYXRfeW91X2xlYXJuZWRfc2NyZWVuLmpzXG4gKiovIiwiaW1wb3J0IE1lZGlhQ29sbGVjdGlvbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9tZWRpYV9jb2xsZWN0aW9uLzAuMSc7XG5pbXBvcnQgUmVwZWF0ZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcmVwZWF0ZXIvMC4yJztcbmltcG9ydCBEcmFnZ2FibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuNCc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvZHJvcHpvbmUvMC40JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICB2YXIgb25EcmFnLCB0ZXN0Q29tcGxldGU7XG5cbiAgb25EcmFnID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29ycmVjdDogZmFsc2UsXG4gICAgICByZXR1cm46IGZhbHNlLFxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgIHBhdGg6ICdzZngnLFxuICAgICAgZGF0YToge1xuICAgICAgICBwbGF5aW5nOiAnZHJhZycsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHRlc3RDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5yZWZzWydkcm9wem9uZS0wJ10uY29udGFpbnMubGVuZ3RoKSB0aGlzLmNvbXBsZXRlKCk7XG4gICAgZWxzZSB0aGlzLmluY29tcGxldGUoKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxza29hc2guU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJsaXN0XCJcbiAgICA+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvc3ByaXRlLm1pbmlvbi5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdJbWFnZUFzc2V0cy9pbWcubm90ZXBhZC5wbmcnfVxuICAgICAgLz5cbiAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTcHJpdGVzQW5pbWF0aW9ucy9zcHJpdGUuZ2FtZTMucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImFycm93c1wiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvaW1nLmdyZWVuYXJyb3dzLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgc3JjPXtFTlZJUk9OTUVOVC5NRURJQSArICdTb3VuZEFzc2V0cy92b3MvVk9fZHJhZ19hbmQubXAzJ31cbiAgICAgIC8+XG4gICAgICA8TWVkaWFDb2xsZWN0aW9uXG4gICAgICAgIHBsYXk9e18uZ2V0KHByb3BzLCAnZGF0YS5zZngucGxheWluZycpfVxuICAgICAgPlxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgcmVmPVwiZHJhZ1wiXG4gICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgY29tcGxldGVUYXJnZXQ9XCJzZnhcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9EcmFnLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICA8L01lZGlhQ29sbGVjdGlvbj5cbiAgICAgIDxSZXBlYXRlclxuICAgICAgICBjbGFzc05hbWU9XCJkcmFnZ2FibGVzXCJcbiAgICAgICAgYW1vdW50PXsxM31cbiAgICAgICAgaXRlbT17PERyYWdnYWJsZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVybk9uSW5jb3JyZWN0XG4gICAgICAgICAgb25EcmFnPXtvbkRyYWd9XG4gICAgICAgIC8+fVxuICAgICAgICBwcm9wcz17W1xuICAgICAgICAgIHttZXNzYWdlOiAnc2hvZSd9LFxuICAgICAgICAgIHttZXNzYWdlOiAnbGVnbyd9LFxuICAgICAgICAgIHttZXNzYWdlOiAnZGljZSd9LFxuICAgICAgICAgIHttZXNzYWdlOiAnYmFsbCd9LFxuICAgICAgICAgIHttZXNzYWdlOiAnY3Jvd24nfSxcbiAgICAgICAgICB7bWVzc2FnZTogJ2J1bm55J30sXG4gICAgICAgICAge21lc3NhZ2U6ICdjaGVzcyd9LFxuICAgICAgICAgIHttZXNzYWdlOiAnaGVsbWV0J30sXG4gICAgICAgICAge21lc3NhZ2U6ICdib3dsaW5nJ30sXG4gICAgICAgICAge21lc3NhZ2U6ICdjdXAnfSxcbiAgICAgICAgICB7bWVzc2FnZTogJ2NvbnRyb2xsZXInfSxcbiAgICAgICAgICB7bWVzc2FnZTogJ2hlYWRwaG9uZXMnfSxcbiAgICAgICAgICB7bWVzc2FnZTogJ2d1aXRhcid9LFxuICAgICAgICBdfVxuICAgICAgLz5cbiAgICAgIDxEcm9wem9uZVxuICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgb25EcmFnPXt0ZXN0Q29tcGxldGV9XG4gICAgICAgIG9uQ29ycmVjdD17dGVzdENvbXBsZXRlfVxuICAgICAgICBkcm9wcGVkPXtfLmdldChwcm9wcywgJ2RhdGEuZHJhZ2dhYmxlLmRyb3BwZWQnKX1cbiAgICAgICAgZHJhZ2dpbmc9e18uZ2V0KHByb3BzLCAnZGF0YS5kcmFnZ2FibGUuZHJhZ2dpbmcnKX1cbiAgICAgICAgZHJvcHpvbmVzPXtbXG4gICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8c3Bhbj5MSVNUIE9GIElURU1TPC9zcGFuPlxuICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgXX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRzXCI+XG4gICAgICAgIDxzcGFuPkRyYWcgYW5kIERyb3A8L3NwYW4+PGJyLz5cbiAgICAgICAgdGhlIGl0ZW1zIHRvIHRoZSBsaXN0IGFib3ZlLjxici8+XG4gICAgICAgIENob29zZSBhcyBtYW55IGFzIHlvdSBsaWtlLlxuICAgICAgPC9kaXY+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS8zZC13b3JsZC9jb21wb25lbnRzL2xpc3Rfc2NyZWVuLmpzXG4gKiovIiwiY2xhc3MgUmVwZWF0ZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgcmVuZGVyQ29udGVudExpc3QoKSB7XG4gICAgdmFyIGEgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuYW1vdW50OyBpKyspIHtcbiAgICAgIGEucHVzaChcbiAgICAgICAgPHRoaXMucHJvcHMuaXRlbS50eXBlXG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHsuLi50aGlzLnByb3BzLml0ZW0ucHJvcHN9XG4gICAgICAgICAgey4uLnRoaXMucHJvcHMucHJvcHNbaV19XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfVxufVxuXG5SZXBlYXRlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgYW1vdW50OiAxLFxuICBpdGVtOiA8ZGl2IC8+LFxuICBwcm9wczogW10sXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcGVhdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9yZXBlYXRlci8wLjIuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICB2YXIgb25UcmFuc2l0aW9uRW5kO1xuXG4gIG9uVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIV8uZ2V0KHByb3BzLCAnZGF0YS5sYXllcjIuY29tcGxldGUnKSkgcmV0dXJuO1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgIHBhdGg6ICdmbGlwJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cImZsaXBcIlxuICAgICAgZW1pdE9uQ29tcGxldGU9e3tcbiAgICAgICAgbmFtZTogJ2ZsaXAnLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL3Zvcy9WT19GbGlwLm1wMyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ1NvdW5kQXNzZXRzL2VmZmVjdHMvUHJpbnRpbmcubXAzJ31cbiAgICAgICAgICBwbGF5VGFyZ2V0PVwibGF5ZXIxXCJcbiAgICAgICAgICBzcHJpdGU9e1swLCAxOTAwXX1cbiAgICAgICAgLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU291bmRBc3NldHMvZWZmZWN0cy9QcmludGluZy5tcDMnfVxuICAgICAgICAgIHBsYXlUYXJnZXQ9XCJsYXllcjJcIlxuICAgICAgICAgIGNvbXBsZXRlVGFyZ2V0PVwibGF5ZXIyXCJcbiAgICAgICAgICBzcHJpdGU9e1sxOTAwLCAxOTAwXX1cbiAgICAgICAgLz5cbiAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cInByaW50ZXJcIlxuICAgICAgICBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ0ltYWdlQXNzZXRzL2ltZy5mbGlwLnByaW50ZXIucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnZWFybmVkLWZsaXAnLCB7XG4gICAgICAgICAgc2hvdzogXy5nZXQocHJvcHMsICdkYXRhLmZsaXAuY29tcGxldGUnKSxcbiAgICAgICAgfSl9XG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnU3ByaXRlc0FuaW1hdGlvbnMvM0QtV29ybGRfRWFybmVkX0ZsaXAuZ2lmJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIHNyYz17d2luZG93Lk1FRElBX1NFUlZFUiArICdGbGlwcy8zRCUyMHdvcmxkLzNEVy0lMjBTdGF0aWMlMjBJbWFnZSUyMEZsaXAvM0RXLkVhcm5lZEZsaXAucG5nJ31cbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGNsYXNzTmFtZT1cIm1pbmlvblwiXG4gICAgICAgIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnSW1hZ2VBc3NldHMvaW1nLmZsaXAubWluaW9uLnBuZyd9XG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuZmxpcC5jb21wbGV0ZScpfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3N0YXRpYy1mbGlwJywge1xuICAgICAgICAgIGxheWVyMTogXy5nZXQocHJvcHMsICdkYXRhLmxheWVyMS5wbGF5aW5nJyksXG4gICAgICAgICAgbGF5ZXIyOiBfLmdldChwcm9wcywgJ2RhdGEubGF5ZXIyLnBsYXlpbmcnKSB8fCBfLmdldChwcm9wcywgJ2RhdGEubGF5ZXIyLmNvbXBsZXRlJyksXG4gICAgICAgICAgbW92ZTogXy5nZXQocHJvcHMsICdkYXRhLmxheWVyMi5jb21wbGV0ZScpLFxuICAgICAgICAgIGhpZGU6IF8uZ2V0KHByb3BzLCAnZGF0YS5mbGlwLmNvbXBsZXRlJyksXG4gICAgICAgIH0pfVxuICAgICAgICBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZH1cbiAgICAgIC8+XG4gICAgICA8cCBjbGFzc05hbWU9XCJub3dcIj5cbiAgICAgICAgTm93IHlvdeKAmXZlIGxlYXJuZWQgYWJvdXQgPHNwYW4+M0QgUFJJTlRJTkc8L3NwYW4+PHNwYW4+4oCmPC9zcGFuPlxuICAgICAgPC9wPlxuICAgICAgPHAgY2xhc3NOYW1lPVwibGV0c1wiPlxuICAgICAgICBMZXTigJlzIHByaW50IHlvdSBvdXQ8YnIvPlxuICAgICAgICBhIG5ldyA8c3Bhbj5GTElQPC9zcGFuPlxuICAgICAgPC9wPlxuICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvM2Qtd29ybGQvY29tcG9uZW50cy9mbGlwX3NjcmVlbi5qc1xuICoqLyIsImNsYXNzIFF1aXRTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgb2theSgpIHtcbiAgICBza29hc2gudHJpZ2dlcigncXVpdCcpO1xuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICBza29hc2gudHJpZ2dlcignbWVudUNsb3NlJywge1xuICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJBc3NldHMoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuYXNzZXRzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5hc3NldHMubWFwKChhc3NldCwga2V5KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgey4uLmFzc2V0LnByb3BzfVxuICAgICAgICAgICAgcmVmPXthc3NldC5yZWYgfHwgYXNzZXQucHJvcHNbJ2RhdGEtcmVmJ10gfHwgKCdhc3NldC0nICsga2V5KX1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgZGF0YS1yZWY9e2tleX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMuaWR9IGNsYXNzTmFtZT17J3NjcmVlbiAnICsgdGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICB7dGhpcy5yZW5kZXJBc3NldHMoKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lXCI+XG4gICAgICAgICAgICA8aDI+QXJlIHlvdSBzdXJlIHlvdTxici8+d2FudCB0byBxdWl0PzwvaDI+XG4gICAgICAgICAgICA8aDM+WW91ciBnYW1lIHByb2dyZXNzIHdpbGwgYmUgc2F2ZWQ8L2gzPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJxdWl0LXllc1wiIG9uQ2xpY2s9e3RoaXMub2theS5iaW5kKHRoaXMpfT48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicXVpdC1ub1wiIG9uQ2xpY2s9e3RoaXMuY2FuY2VsLmJpbmQodGhpcyl9PjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKFxuICA8UXVpdFNjcmVlblxuICAgIGlkPVwicXVpdFwiXG4gIC8+XG4pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9xdWl0X3NjcmVlbi8wLjEuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FDQ0E7QUFEQTs7Ozs7Ozs7QUNBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FEQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7QUFrQkE7QUFDQTtBQURBO0FBR0E7QUFxQkE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBaEJBO0FBa0JBO0FBaEVBO0FBQ0E7QUFtRUE7Ozs7Ozs7Ozs7O0FFL0ZBO0FBQ0E7QUZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUxBO0FBQ0E7QUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUdYQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFGQTtBQURBO0FBV0E7Ozs7QUFuQkE7QUFDQTtBSHFCQTs7Ozs7Ozs7Ozs7Ozs7QUl0QkE7QUpDQTtBQUNBO0FBQUE7QUlFQTtBSkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBWkE7QUFlQTs7Ozs7Ozs7Ozs7Ozs7QUtqQkE7QUxDQTtBQUNBO0FBQUE7QUtFQTtBTENBO0FBQ0E7QUFKQTtBQU1BO0FBTkE7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QU1UQTtBTkNBO0FBQ0E7QUFBQTtBTUVBO0FOQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUxBO0FBV0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUFXQTtBQUNBO0FBQ0E7QU1EQTtBQUdBO0FOSkE7QUFNQTtBQUNBO0FBQ0E7QU1EQTtBQUdBO0FOSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBTURBO0FBREE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFmQTtBQXFCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQVZBO0FBZ0JBO0FBdENBO0FBckRBO0FBK0ZBO0FBQ0E7QUFwR0E7QUFDQTs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3Q0E7QVJDQTtBQUNBO0FBQUE7QVFFQTtBUkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFWQTtBQVlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FRREE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQWZBO0FBREE7QUE3QkE7QUFzREE7QUFDQTtBQTNEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FUQ0E7QUFDQTtBQUFBO0FTRUE7QVRDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBVkE7QUFpQkE7Ozs7Ozs7Ozs7Ozs7O0FVakJBO0FWQ0E7QUFDQTtBQUFBO0FVRUE7QVZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBVkE7QUFZQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUxBO0FBV0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QVVEQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBcEJBO0FBREE7QUFuQ0E7QUFpRUE7QUFDQTtBQXRFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNHQTtBWENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFUQTtBQWNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBUkE7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QVdEQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWxCQTtBQXNCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBWENBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQVJBO0FBQUE7QUFBQTtBQVhBO0FBdkNBO0FBZ0VBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQWRBO0FBcUJBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUNBO0FBTEE7QUFoQkE7QUF2SUE7QUFpS0E7QUFDQTtBQXZLQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBWVNBO0FaQUE7QUFDQTtBQUFBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FZQ0E7QVpDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QVlEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FaQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBWURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QVpDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QVlDQTtBWkZBO0FBSUE7QUFDQTtBWUNBO0FaRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QVlDQTtBQUNBO0FaTEE7QUFPQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FZQ0E7QUFDQTtBQUNBO0FBQ0E7QVpUQTtBQVZBO0FBc0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FZQ0E7QUFDQTtBQUNBO0FBQ0E7QVpDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBaERBO0FBVkE7QUFrRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQXZFQTtBQTZFQTtBQUNBO0FBQ0E7QUFDQTtBWUNBO0FBS0E7QUFDQTtBWkNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBbEJBO0FBOUZBO0FBd0hBO0FBQ0E7QUFDQTtBQUNBO0FZQ0E7QUFDQTtBWkNBO0FBTkE7QUFoS0E7QUEwS0E7QUFDQTtBQW5TQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FhWEE7Ozs7Ozs7Ozs7O0FBQ0E7QWJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQWRBO0FBQ0E7QUFnQkE7QUFDQTtBQURBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FjckJBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBZENBO0FBREE7QUFDQTtBQUdBO0FBUEE7QUFRQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFMQTtBQVFBOzs7O0FBNUhBO0FBQ0E7QUE4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QWV6SUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FmQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQVJBO0FBU0E7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFRQTs7OztBQTNHQTtBQUNBO0FBNkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBZ0IxSEE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FoQkNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBVkE7QUFXQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdkJBO0FBeUJBO0FBQ0E7QUFDQTtBQTNCQTtBQUNBO0FBdUJBO0FBQUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFGQTtBQU1BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBSUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUNBOzs7QUFFQTtBQUNBO0FBR0E7QUFGQTtBQUtBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFMQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFYQTtBQWdCQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7QUFDQTtBQWtCQTs7Ozs7Ozs7Ozs7Ozs7OztBaUI5TEE7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QWpCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQWtCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFRQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBTEE7QUFRQTs7OztBQXZSQTtBQUNBO0FBeVJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QWtCNVJBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBbEJDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBOzs7O0FBakRBO0FBQ0E7QUFtREE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QW1CNURBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBbkJDQTtBQURBO0FBR0E7QUFMQTtBQU1BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTs7OztBQXhDQTtBQUNBO0FBMENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7QW9CcERBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBcEJDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFRQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFLQTs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBcUJqRkE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FyQkNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUhBO0FBTUE7OztBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFIQTtBQURBO0FBT0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQU9BOzs7O0FBM01BO0FBQ0E7QUE4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QXNCM05BO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBdEJDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBUkE7QUFTQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQUZBO0FBVUE7Ozs7QUFsTkE7QUFDQTtBQW9OQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBOzs7Ozs7Ozs7Ozs7QXVCak9BO0F2QkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQVJBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQWRBO0FBb0JBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUNBO0FBTEE7QUFoQkE7QUF2REE7QUFpRkE7QUFDQTtBQXJGQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXdCQ0E7QXhCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBUkE7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQWRBO0FBcUJBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUNBO0FBTEE7QUFoQkE7QUF4REE7QUFrRkE7QUFDQTtBQXRGQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBeUJEQTtBekJDQTtBQUNBO0FBQUE7QXlCRUE7QXpCQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMUJBO0FBK0JBOzs7Ozs7Ozs7Ozs7OztBMEI3QkE7QTFCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QTBCRUE7QTFCQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QTBCREE7QUFHQTtBQUNBO0FBQ0E7QTFCQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBNUJBO0FBa0NBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0EwQkNBO0FBRUE7QUFDQTtBMUJGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQXpCQTtBQStCQTtBQUNBO0FBQ0E7QTBCQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBMUJGQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFWQTtBQVlBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFJQTtBQVhBO0FBYUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBWEE7QUFhQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBSUE7QUFYQTtBQWFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBVkE7QUFZQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBSUE7QUFYQTtBQW5FQTtBQXhGQTtBQTRLQTtBQUNBO0FBdk1BO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBMkJIQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QTNCQ0E7QUFDQTtBQUZBO0FBSEE7QUFPQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUZBO0FBT0E7Ozs7QUE1SkE7QUFDQTtBQThKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUNBO0FBWUE7Ozs7Ozs7Ozs7Ozs7O0E0QjlLQTtBNUJDQTtBQUNBO0FBQUE7QTRCRUE7QTVCQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVZBO0FBbEJBO0FBa0NBOzs7Ozs7Ozs7Ozs7OztBNkJGQTtBN0JDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBNkJDQTtBN0JDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTZCQ0E7QUFDQTtBN0JDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTZCQ0E7QTdCQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0E2QkRBO0FBRkE7QUFNQTtBN0JDQTtBQUNBO0FBQ0E7QTZCRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QTdCQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBNkJEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0E3QkNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQWhCQTtBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBaENBO0FBdUNBO0FBQUE7QUFBQTtBQUNBO0E2QkRBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QTdCSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQTVCQTtBQWtDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBQ0E7QTZCQ0E7QUFDQTtBQUNBO0E3QkpBO0FBTEE7QUFrQkE7QUFDQTtBNkJDQTtBQUVBO0E3QkNBO0E2QkNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBN0JSQTtBQVdBO0FBZEE7QUFnQkE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBaEJBO0FBc0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFoQkE7QUFzQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWhCQTtBQXNCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU5BO0FBbkVBO0FBSkE7QUFxRkE7QUFDQTtBQUNBO0FBQ0E7QTZCQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUtBO0E3QlpBO0FBY0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBTEE7QUFXQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBSUE7QUFYQTtBQWFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFaQTtBQWNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQVhBO0FBYUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBWEE7QUFhQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFJQTtBQWJBO0FBZUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBSUE7QUFSQTtBQW5HQTtBQTNPQTtBQTRWQTtBQUNBO0FBL2VBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQWdCQTs7Ozs7Ozs7Ozs7Ozs7OztBOEIxQkE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QTlCQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUtBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTs7OztBQTNEQTtBQUNBO0FBNkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QStCeEVBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBL0JBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUhBO0FBREE7QUFPQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7O0FBdkxBO0FBQ0E7QUF5TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FnQ25NQTtBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBaENDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBVEE7QUFVQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFMQTtBQVdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FnQ0NBO0FBQUE7QUFBQTtBQUNBO0FoQ0NBO0FBRkE7QUFJQTtBQUpBO0FBREE7QUFRQTtBQVZBO0FBYUE7Ozs7QUFwRkE7QUFDQTtBQXNGQTtBQUNBO0FBREE7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7O0FpQ2hHQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QWpDQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQWtCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7OztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7Ozs7QUFuUEE7QUFDQTtBQXFQQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QWtDbFFBO0FsQ0NBO0FBQ0E7QUFBQTtBa0NFQTtBbENDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQWxCQTtBQTBCQTs7Ozs7Ozs7Ozs7Ozs7QW1DdkJBO0FuQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FtQ0VBO0FuQ0NBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBbUNEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QW5DSkE7QUFIQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQVJBO0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QW1DQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFQQTtBQVlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBeEVBO0FBK0VBO0FBQ0E7QUEzR0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QXBDQ0E7QUFDQTtBQUVBO0FBREE7QUFNQTtBQUNBO0FBQ0E7Ozs7QUFiQTtBQUNBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7Ozs7Ozs7Ozs7Ozs7O0FxQ3BCQTtBckNDQTtBQUNBO0FBQ0E7QUFDQTtBcUNDQTtBckNDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBcUNFQTtBckNDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBTEE7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBWEE7QUFtQkE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QXFDREE7QUFHQTtBckNKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QXFDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QXJDVEE7QUFXQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUE1REE7QUFrRUE7QUFDQTtBQW5GQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FzQ0RBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QXRDQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQUZBO0FBWUE7Ozs7QUEzQ0E7QUFDQTtBQThDQTtBQUNBO0FBREE7OzsiLCJzb3VyY2VSb290IjoiIn0=