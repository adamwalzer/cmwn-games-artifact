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
	  MEDIA: 'https://media-staging.changemyworldnow.com/'
		};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _2 = __webpack_require__(4);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(5);

	var _5 = _interopRequireDefault(_4);

	var _title_screen = __webpack_require__(6);

	var _title_screen2 = _interopRequireDefault(_title_screen);

	var _menu_screen = __webpack_require__(7);

	var _menu_screen2 = _interopRequireDefault(_menu_screen);

	var _friend_screen = __webpack_require__(8);

	var _friend_screen2 = _interopRequireDefault(_friend_screen);

	var _canvas_screen = __webpack_require__(22);

	var _canvas_screen2 = _interopRequireDefault(_canvas_screen);

	var _item_drawer_screen = __webpack_require__(27);

	var _item_drawer_screen2 = _interopRequireDefault(_item_drawer_screen);

	var _inbox_screen = __webpack_require__(28);

	var _inbox_screen2 = _interopRequireDefault(_inbox_screen);

	var _preview_screen = __webpack_require__(33);

	var _preview_screen2 = _interopRequireDefault(_preview_screen);

	var _send_screen = __webpack_require__(35);

	var _send_screen2 = _interopRequireDefault(_send_screen);

	var _sent_screen = __webpack_require__(36);

	var _sent_screen2 = _interopRequireDefault(_sent_screen);

	var _read_screen = __webpack_require__(37);

	var _read_screen2 = _interopRequireDefault(_read_screen);

	var _6 = __webpack_require__(38);

	var _7 = _interopRequireDefault(_6);

	var _save_menu = __webpack_require__(39);

	var _save_menu2 = _interopRequireDefault(_save_menu);

	var _collision_warning = __webpack_require__(40);

	var _collision_warning2 = _interopRequireDefault(_collision_warning);

	var _limit_warning = __webpack_require__(41);

	var _limit_warning2 = _interopRequireDefault(_limit_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DEFAULT_PROFILE_IMAGE = '';

	var SkribbleGame = function (_skoash$Game) {
	  _inherits(SkribbleGame, _skoash$Game);

	  function SkribbleGame() {
	    _classCallCheck(this, SkribbleGame);

	    return _possibleConstructorReturn(this, (SkribbleGame.__proto__ || Object.getPrototypeOf(SkribbleGame)).apply(this, arguments));
	  }

	  _createClass(SkribbleGame, [{
	    key: 'getRules',
	    value: function getRules() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (typeof opts.respond === 'function') {
	        return opts.respond(this.refs['screen-canvas'].getData());
	      }
	      return this.refs['screen-canvas'].getData();
	    }
	  }, {
	    key: 'save',
	    value: function save(skramble) {
	      /* eslint-disable camelcase */
	      var friend_to,
	          rules,
	          self = this;
	      friend_to = self.state.recipient && self.state.recipient.user_id ? self.state.recipient.user_id : null;
	      rules = self.getRules();
	      var skribble = _extends({
	        'version': _config2.default.version
	      }, self.state.skribbleData, {
	        friend_to: friend_to,
	        skramble: skramble,
	        rules: rules
	      });

	      if (!rules.background && !rules.items.length && !rules.messages.length) {
	        return;
	      }

	      if (JSON.stringify(skribble) !== JSON.stringify(this.state.skribble)) {
	        self.emit({
	          name: 'saveSkribble',
	          game: self.config.id,
	          skribble: skribble
	        }).then(function (skribbleData) {
	          self.setState({
	            skribbleData: skribbleData,
	            skribble: skribble
	          });
	        });
	      }
	      /* eslint-enable camelcase */
	    }
	  }, {
	    key: 'send',
	    value: function send() {
	      this.save(true);

	      this.refs['screen-canvas'].reset();
	      this.navigator.goto({
	        index: 'sent',
	        recipient: this.state.recipient
	      });

	      this.setState({
	        recipient: null,
	        skribbleData: null
	      });
	    }
	  }, {
	    key: 'loadSkribble',
	    value: function loadSkribble(opts) {
	      var _this2 = this;

	      this.setState({
	        skribbleData: opts.message
	      }, function () {
	        _this2.refs['screen-canvas'].addItems(opts.message);
	        _this2.navigator.goto({
	          index: 'canvas',
	          draft: true
	        });
	      });
	    }
	  }, {
	    key: 'getMedia',
	    value: function getMedia(path) {
	      var pathArray,
	          self = this;

	      if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') path = path.path;
	      path = path || 'skribble/menu';
	      pathArray = path.split('/');
	      pathArray.shift();

	      return self.emit({
	        name: 'getMedia',
	        path: path
	      }).then(function (d) {
	        var opts, currentOpts;
	        opts = {
	          data: {},
	          callback: function callback() {
	            self.refs['screen-canvas'].setMenu();
	            self.refs['screen-item-drawer'].updateData();
	          }
	        };
	        currentOpts = opts.data;

	        pathArray.forEach(function (key, index) {
	          currentOpts[key] = {
	            items: {}
	          };
	          if (index !== pathArray.length - 1) {
	            currentOpts = currentOpts[key].items;
	          }
	        });

	        currentOpts[pathArray[pathArray.length - 1]] = _.clone(d);
	        currentOpts[pathArray[pathArray.length - 1]].items = {};

	        if (d.items) {
	          d.items.forEach(function (item) {
	            if (item.asset_type === 'folder' && item.name) {
	              self.getMedia(path + '/' + item.name);
	            }
	            currentOpts[pathArray[pathArray.length - 1]].items[item.name] = item;
	          });
	        }
	        self.updateData(opts);
	      });
	    }
	  }, {
	    key: 'showCollisionWarning',
	    value: function showCollisionWarning() {
	      if (!this.state.data.collisionWarning.show) return;
	      this.navigator.openMenu({ id: 'collisionWarning' });
	    }
	  }, {
	    key: 'showLimitWarning',
	    value: function showLimitWarning() {
	      this.navigator.openMenu({ id: 'limitWarning' });
	    }
	  }, {
	    key: 'addRecipient',
	    value: function addRecipient(recipient, cb) {
	      var _this3 = this;

	      var src;

	      if (recipient.src) {
	        recipient.profile_image = recipient.src; // eslint-disable-line camelcase
	      } else if (typeof recipient === 'string') {
	        if (this.state.data && this.state.data.user) {
	          this.state.data.user.some(function (friend) {
	            if (friend.friend_id === recipient) {
	              recipient = friend;
	              return true;
	            }
	            return false;
	          });
	        }
	      }

	      if (typeof recipient === 'string') {
	        this.getData({
	          name: 'getFriend',
	          'friend_id': recipient,
	          callback: function callback() {
	            _this3.addRecipient(recipient, cb);
	          }
	        });
	      } else {
	        src = recipient && recipient._embedded && recipient._embedded.image && recipient._embedded.image.url ? recipient._embedded.image.url : recipient.profile_image || DEFAULT_PROFILE_IMAGE;
	        this.setState({
	          recipient: {
	            'user_id': recipient.user_id || recipient.friend_id,
	            name: recipient.name || recipient.username,
	            src: src,
	            // I need to get the flips earned back from the backend to do this.
	            description: '',
	            // description: friend.flips_earned + ' Flips Earned',
	            'asset_type': 'friend'
	          }
	        }, cb);
	      }
	    }
	  }, {
	    key: 'clickRecipient',
	    value: function clickRecipient() {
	      this.navigator.goto({
	        index: 'friend',
	        goto: this.state.currentScreenIndex
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create() {
	      if (this.state.recipient) {
	        this.navigator.goto({ index: 'canvas' });
	      } else {
	        this.navigator.goto({
	          index: 'friend',
	          goto: 'canvas'
	        });
	      }
	    }
	  }, {
	    key: 'saveButton',
	    value: function saveButton() {
	      this.save();
	      this.navigator.openMenu({ id: 'save' });
	    }
	  }, {
	    key: 'renderRecipient',
	    value: function renderRecipient() {
	      var recipient = this.state.recipient,
	          content = [];

	      if (!recipient) return;

	      if (recipient.name) {
	        content.push(React.createElement(
	          'span',
	          { className: 'name' },
	          recipient.name
	        ));
	      }

	      if (recipient.src) {
	        content.push(React.createElement('img', { className: 'profile-image', src: recipient.src }));
	      }

	      return content;
	    }
	  }]);

	  return SkribbleGame;
	}(skoash.Game);

	var Skribble = React.createElement(SkribbleGame, {
	  config: _config2.default,
	  screens: {
	    0: _5.default,
	    1: _title_screen2.default,
	    menu: _menu_screen2.default,
	    friend: _friend_screen2.default,
	    canvas: _canvas_screen2.default,
	    'item-drawer': _item_drawer_screen2.default,
	    inbox: _inbox_screen2.default,
	    preview: _preview_screen2.default,
	    send: _send_screen2.default,
	    sent: _sent_screen2.default,
	    read: _read_screen2.default
	  },
	  menus: {
	    quit: _7.default,
	    save: _save_menu2.default,
	    collisionWarning: _collision_warning2.default,
	    limitWarning: _limit_warning2.default
	  },
	  loader: React.createElement(_3.default, null),
	  assets: [React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Otter/Waving_Otter2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Otter/Open-wide-Otter2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Otter/joyful-otter_2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Otter/Antipation-Otter3.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Otter/proud-of-you2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Otter/Peeking-through-Otter2.gif' }), React.createElement('div', { className: 'background-1' }), React.createElement('div', { className: 'background-2' }), React.createElement('div', { className: 'background-3' }), React.createElement('div', { className: 'background-4' }), React.createElement('div', { className: 'background-5' }), React.createElement('div', { className: 'background-6' })],
	  onBootstrap: function onBootstrap() {
	    this.getFriends = _.throttle(this.getData.bind(this, { name: 'getFriends' }), 1000);
	    this.getMediaOnReady = _.throttle(this.getMedia.bind(this), 1000);

	    this.updateState({
	      path: ['collisionWarning'],
	      data: {
	        show: true
	      }
	    });
	  },
	  onReady: function onReady() {
	    this.getMediaOnReady();
	    this.getFriends();
	  },
	  renderMenu: function renderMenu() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'game-menu' },
	        React.createElement('button', { className: 'save', onClick: this.saveButton.bind(this) }),
	        React.createElement('button', { className: 'inbox', onClick: this.navigator.goto.bind(this, { index: 'inbox' }) }),
	        React.createElement('button', { className: 'create', onClick: this.create.bind(this) }),
	        React.createElement('button', { className: 'help', onClick: this.navigator.openMenu.bind(this, { id: 'help' }) }),
	        React.createElement('button', { className: 'close', onClick: this.navigator.openMenu.bind(this, { id: 'quit' }) })
	      ),
	      React.createElement(
	        'ul',
	        { className: 'menu recipient' },
	        React.createElement(
	          'li',
	          { onClick: this.clickRecipient.bind(this) },
	          React.createElement(
	            'span',
	            null,
	            this.renderRecipient()
	          )
	        )
	      )
	    );
	  },
	  getGotoOpts: function getGotoOpts(opts) {
	    if (opts.index === 'send') {
	      if (!this.state.recipient || !this.state.recipient.name) {
	        opts.index = 'friend';
	        opts.goto = 'send';
	      }
	    }
	    return opts;
	  },
	  passData: function passData(opts) {
	    if (opts.name === 'add-item') {
	      this.refs['screen-canvas'].addItem(opts.message);
	      this.navigator.goto({ index: 'canvas' });
	    } else if (opts.name === 'add-recipient') {
	      this.addRecipient(opts.message, this.navigator.goto.bind(this, { index: opts.goto || 'canvas' }));
	    } else if (opts.name === 'send') {
	      this.send();
	    } else if (opts.name === 'showCollisionWarning') {
	      this.showCollisionWarning();
	    } else if (opts.name === 'showLimitWarning') {
	      this.showLimitWarning();
	    }
	  },
	  getTriggerEvents: function getTriggerEvents() {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    opts.save = this.save;
	    opts.getMedia = this.getMedia;
	    opts.getRules = this.getRules;
	    opts.loadSkribble = this.loadSkribble;
	    return opts;
	  },
	  getData: function getData(opts) {
	    var _this4 = this;

	    var names = ['getFriends', 'getFriend', 'markAsRead'];

	    if (names.indexOf(opts.name) === -1) {
	      opts.name = 'getData';
	    }

	    return this.eventManager.emit(opts).then(function (data) {
	      _this4.updateData({
	        data: data,
	        callback: opts.callback
	      });
	    });
	  }
	});

		skoash.start(Skribble);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  id: 'skribble',
	  version: 1,
	  skoash: '1.0.5',
	  dimensions: {
	    width: 1600,
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
	      id: "title",
	      hidePrev: true,
	      nextDelay: 1000,
	      nextIndex: "menu"
	    }),
	    React.createElement(skoash.Image, {
	      ref: "title",
	      className: "title animated",
	      src: "media/_Title/SKribble_title.png"
	    }),
	    React.createElement(skoash.Image, {
	      ref: "play",
	      className: "hidden",
	      src: "media/_Buttons/skribble-play-01.png"
	    }),
	    React.createElement(skoash.Image, {
	      ref: "play-hover",
	      className: "hidden",
	      src: "media/_Buttons/skribble-hover.png"
	    })
	  );
		};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (props, ref, key) {
	  return React.createElement(MenuScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: "menu",
	    hidePrev: true,
	    hideNext: true,
	    load: true
	  }));
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuScreen = function (_skoash$Screen) {
	  _inherits(MenuScreen, _skoash$Screen);

	  function MenuScreen() {
	    _classCallCheck(this, MenuScreen);

	    return _possibleConstructorReturn(this, (MenuScreen.__proto__ || Object.getPrototypeOf(MenuScreen)).apply(this, arguments));
	  }

	  _createClass(MenuScreen, [{
	    key: "renderContent",
	    value: function renderContent() {
	      return React.createElement(
	        "div",
	        null,
	        React.createElement(skoash.Image, { className: "hidden", src: "media/_Background/SK_BKG_1.png" }),
	        React.createElement(skoash.Image, { className: "otter", src: "media/_Otter/Waving_Otter2.gif" }),
	        React.createElement(
	          "div",
	          { className: "bubble" },
	          "Hi there!",
	          React.createElement("br", null),
	          "What would you",
	          React.createElement("br", null),
	          "like to do today?"
	        ),
	        React.createElement(
	          "div",
	          { className: "buttons" },
	          React.createElement("button", { className: "make", onClick: this.goto.bind(this, {
	              index: 'friend',
	              goto: 'canvas'
	            }) }),
	          React.createElement("button", { className: "read", onClick: this.goto.bind(this, 'inbox') })
	        )
	      );
	    }
	  }]);

	  return MenuScreen;
		}(skoash.Screen);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (props, ref, key) {
	  return React.createElement(FriendScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'friends',
	    completeOnStart: true,
	    checkComplete: false,
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	var _ = __webpack_require__(9);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DEFAULT_PROFILE_IMAGE = 'https://changemyworldnow.com/ff50fa329edc8a1d64add63c839fe541.png';

	var FriendScreen = function (_skoash$Screen) {
	  _inherits(FriendScreen, _skoash$Screen);

	  function FriendScreen() {
	    _classCallCheck(this, FriendScreen);

	    var _this = _possibleConstructorReturn(this, (FriendScreen.__proto__ || Object.getPrototypeOf(FriendScreen)).call(this));

	    _this.state = {
	      load: true,
	      complete: true,
	      recipient: {},
	      opts: {}
	    };
	    return _this;
	  }

	  _createClass(FriendScreen, [{
	    key: 'selectRespond',
	    value: function selectRespond(message) {
	      skoash.trigger('passData', {
	        name: 'add-recipient',
	        goto: this.state.opts.goto,
	        message: message
	      });
	    }
	  }, {
	    key: 'updateData',
	    value: function updateData(d) {
	      var data = d && d.user ? d.user : this.props.gameState.data.user || [];

	      data = data.map(function (friend) {
	        var src = friend._embedded.image && friend._embedded.image.url ? friend._embedded.image.url : DEFAULT_PROFILE_IMAGE;
	        return {
	          'user_id': friend.friend_id,
	          name: friend.username,
	          src: src,
	          // I need to get the flips earned back from the backend to do this.
	          description: '',
	          // description: friend.flips_earned + ' Flips Earned',
	          'asset_type': 'friend'
	        };
	      });

	      this.setState({
	        data: data
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open(opts) {
	      var recipient,
	          self = this;

	      self.updateData();

	      skoash.trigger('getData', {
	        name: 'getFriends'
	      }).then(function (data) {
	        self.updateData.call(self, data);
	      });

	      recipient = self.props.gameState.recipient;

	      self.setState({
	        load: true,
	        open: true,
	        leave: false,
	        close: false,
	        recipient: recipient,
	        opts: opts
	      }, function () {
	        self.refs.drawer && self.refs.drawer.start();
	      });

	      if (!self.state.started) {
	        self.start();
	      }
	    }
	  }, {
	    key: 'suggestFriends',
	    value: function suggestFriends() {
	      window.open(window.location.origin.replace('games-', '') + '/friends/suggested');
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      skoash.trigger('goto', {
	        index: 'canvas'
	      });
	      skoash.trigger('openMenu', { id: 'save' });
	    }
	  }, {
	    key: 'renderOtter',
	    value: function renderOtter() {
	      var copy, src, imageSrc;

	      src = 'One';
	      imageSrc = 'media/_Otter/Otter_Static_GreetingOne.png';
	      copy = React.createElement(
	        'span',
	        null,
	        'Don\'t have',
	        React.createElement('br', null),
	        ' friends yet?',
	        React.createElement('br', null),
	        React.createElement('br', null),
	        ' Let me suggest',
	        React.createElement('br', null),
	        ' some for you.'
	      );

	      if (this.state.data && this.state.data.length) {
	        src = 'Two';
	        imageSrc = 'media/_Otter/Open-wide-Otter2.gif';
	        copy = React.createElement(
	          'span',
	          null,
	          'Let me find a friend',
	          React.createElement('br', null),
	          ' to send your message to.'
	        );
	      }

	      return React.createElement(
	        'div',
	        { className: 'otter-container ' + src },
	        React.createElement(skoash.Image, { className: 'otter', src: imageSrc }),
	        React.createElement(
	          'div',
	          { className: 'bubble' },
	          copy
	        )
	      );
	    }
	  }, {
	    key: 'renderFriends',
	    value: function renderFriends() {
	      if (this.state.data && this.state.data.length) {
	        return React.createElement(_2.default, {
	          ref: 'drawer',
	          scrollbarImg: './media/_Buttons/sk_btn_slider.png',
	          selectRespond: this.selectRespond.bind(this),
	          cancelRespond: this.back,
	          categories: this.state.opts.categories,
	          data: this.state.data,
	          selectedItem: this.state.recipient,
	          buttons: this.buttons,
	          completeOnStart: true,
	          checkComplete: false,
	          className: 'goto-' + this.state.opts.goto
	        });
	      }

	      return React.createElement(
	        'div',
	        { className: 'goto-' + this.state.opts.goto },
	        React.createElement(
	          'div',
	          { className: 'item-drawer-container' },
	          React.createElement(
	            'div',
	            { className: 'suggest-friends-buttons' },
	            React.createElement('button', { className: 'continue', onClick: this.selectRespond.bind(this, {}) }),
	            React.createElement('button', { className: 'suggest', onClick: this.suggestFriends }),
	            React.createElement('button', { className: 'save-to-drafts', onClick: this.save })
	          )
	        )
	      );
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement('div', { className: 'header' }),
	        this.renderOtter(),
	        this.renderFriends()
	      );
	    }
	  }]);

	  return FriendScreen;
		}(skoash.Screen);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shortid = __webpack_require__(10);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(20);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(21);

	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ItemDrawer = function (_Selectable) {
	  _inherits(ItemDrawer, _Selectable);

	  function ItemDrawer() {
	    _classCallCheck(this, ItemDrawer);

	    return _possibleConstructorReturn(this, (ItemDrawer.__proto__ || Object.getPrototypeOf(ItemDrawer)).apply(this, arguments));
	  }

	  _createClass(ItemDrawer, [{
	    key: 'start',
	    value: function start() {
	      var items,
	          selectedItem,
	          selectClass,
	          selectFunction,
	          classes = {},
	          self = this;

	      selectClass = this.props.selectClass || this.state.selectClass || 'SELECTED';
	      selectFunction = selectClass === 'HIGHLIGHTED' ? this.highlight : this.select;

	      items = self.props.data || [];

	      if (self.state.category && items[self.state.category]) {
	        items = items[self.state.category].items;
	      }

	      selectedItem = JSON.stringify(self.props.selectedItem);

	      _.each(items, function (item, key) {
	        if (self.props.selectedItem && JSON.stringify(item) === selectedItem) {
	          classes[key] = selectClass;
	        }
	      });

	      if (this.props.selectOnStart) {
	        classes[this.props.selectOnStart] = selectClass;
	      }

	      this.setState({
	        started: true,
	        classes: classes,
	        selectClass: selectClass,
	        selectFunction: selectFunction,
	        categoryName: '',
	        category: ''
	      });

	      _.each(self.refs, function (ref) {
	        if (typeof ref.start === 'function') ref.start();
	      });
	    }
	  }, {
	    key: 'selectHelper',
	    value: function selectHelper(e) {
	      var li,
	          message,
	          key,
	          type,
	          categoryName,
	          classes = [];

	      li = e.target.closest('LI');
	      if (!li) return;

	      key = li.getAttribute('data-ref');
	      if (!this.refs[key]) return;

	      type = this.refs[key].props.item.asset_type;
	      if (!type) return;

	      if (type === 'folder') {
	        categoryName = this.refs[key].props.item.name;
	        this.setState({
	          category: key,
	          categoryName: categoryName
	        });
	      } else {
	        message = this.refs[key].props.item;
	        classes[key] = this.props.selectClass;

	        this.setState({
	          message: message,
	          classes: classes
	        });
	      }
	    }
	  }, {
	    key: 'selectButton',
	    value: function selectButton() {
	      if (typeof this.props.selectRespond === 'function' && this.state.message) {
	        this.props.selectRespond(this.state.message);
	      }
	    }
	  }, {
	    key: 'continueButton',
	    value: function continueButton() {
	      if (typeof this.props.selectRespond === 'function') {
	        this.props.selectRespond({});
	      }
	    }
	  }, {
	    key: 'cancelButton',
	    value: function cancelButton() {
	      if (typeof this.props.cancelRespond === 'function') {
	        this.props.cancelRespond.call(this);
	      }
	    }
	  }, {
	    key: 'getCategory',
	    value: function getCategory() {
	      if (this.state.categoryName || this.props.categoryName) {
	        return this.state.categoryName || this.props.categoryName;
	      }

	      if (this.props.categories && this.props.categories.length) {
	        return this.props.categories[this.props.categories.length - 1];
	      }
	      return '';
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)({
	        'ANSWERED': _.values(this.state.classes).indexOf(this.state.selectClass) !== -1
	      }, this.props.className, 'item-drawer-component');
	    }
	  }, {
	    key: 'getULClass',
	    value: function getULClass() {
	      return (0, _classnames2.default)('item-drawer', {
	        COMPLETE: this.state.complete
	      }, this.props.categories ? this.props.categories.join(' ') : '');
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass(key, item) {
	      return (0, _classnames2.default)(this.state.classes[key] || '', {
	        white: item && item.name && item.name.toLowerCase()[item.name.length - 1] === 'w'
	      });
	    }
	  }, {
	    key: 'renderButtons',
	    value: function renderButtons() {
	      return React.createElement(
	        'div',
	        { className: 'buttons' },
	        React.createElement('button', { className: 'select', onClick: this.selectButton.bind(this) }),
	        React.createElement('button', { className: 'continue', onClick: this.continueButton.bind(this) }),
	        React.createElement('button', { className: 'cancel', onClick: this.cancelButton.bind(this) })
	      );
	    }
	  }, {
	    key: 'renderItemContent',
	    value: function renderItemContent(item) {
	      var content = [],
	          src;

	      if (item.src || item.thumb) {
	        src = item.thumb || item.src;
	      } else if (item.items) {
	        if (!_.isArray(item.items)) {
	          item.items = _.values(item.items);
	        }

	        if (item.items[0]) {
	          src = item.items[0].thumb || item.items[0].src;
	        }

	        if (!src) {
	          src = _.find(item.items, function (subitem) {
	            if (subitem.name === '_thumb') return subitem.thumb || subitem.src;
	          });
	        }
	      }

	      if (src) {
	        content.push(React.createElement(skoash.Image, { src: src, key: 0 }));
	      }

	      if (item.name && (item.asset_type === 'folder' || item.asset_type === 'friend')) {
	        content.push(React.createElement(
	          'span',
	          { className: 'name', key: 1 },
	          item.name
	        ));
	      }

	      if (item.description) {
	        content.push(React.createElement(
	          'span',
	          { className: 'description', key: 2 },
	          item.description
	        ));
	      }

	      return content;
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList() {
	      var _this2 = this;

	      var items,
	          self = this;

	      if (!this.props.data) return;

	      items = this.props.data;

	      if (this.state.category && items[this.state.category]) {
	        items = items[this.state.category].items;
	      }

	      if (!_.isArray(items)) {
	        items = _.values(items);
	      }

	      return items.sort(function (a, b) {
	        var aVal = !_.isNaN(window.parseInt(a.order)) ? window.parseInt(a.order) : Infinity;
	        var bVal = !_.isNaN(window.parseInt(b.order)) ? window.parseInt(b.order) : Infinity;
	        if (aVal === bVal) {
	          if (a.name < b.name) return -1;
	          if (a.name > b.name) return 1;
	          return 0;
	        }
	        if (aVal < bVal) return -1;
	        return 1;
	      }).filter(function (item) {
	        return item.name !== '_thumb';
	      }).map(function (item, key) {
	        return React.createElement(
	          skoash.ListItem,
	          {
	            className: _this2.getClass(key, item),
	            ref: key,
	            'data-ref': key,
	            item: item,
	            key: _shortid2.default.generate()
	          },
	          self.renderItemContent(item)
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: this.getClassNames() },
	        React.createElement(
	          'div',
	          { className: 'item-drawer-container' },
	          React.createElement(
	            'h2',
	            null,
	            this.getCategory()
	          ),
	          React.createElement(
	            _5.default,
	            { ref: 'scroll-area', img: this.props.scrollbarImg },
	            React.createElement(
	              'ul',
	              { ref: 'list', className: this.getULClass(), onClick: this.state.selectFunction.bind(this) },
	              this.renderList()
	            )
	          )
	        ),
	        this.renderButtons()
	      );
	    }
	  }]);

	  return ItemDrawer;
	}(_3.default);

	ItemDrawer.defaultProps = _.defaults({
	  scrollbarImg: '',
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var items, quickCheck, itemsChanged;

	    items = nextProps.data || [];
	    if (nextState.category && items[nextState.category]) {
	      items = items[nextState.category].items;
	    }

	    quickCheck = _.reduce(items, function (a, i) {
	      return a + i.name;
	    }, '');

	    itemsChanged = this.quickCheck !== quickCheck;
	    if (itemsChanged) this.quickCheck = quickCheck;

	    return itemsChanged || JSON.stringify(this.state.classes) !== JSON.stringify(nextState.classes);
	  }
	}, _3.default.defaultProps);

		exports.default = ItemDrawer;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(12);
	var encode = __webpack_require__(14);
	var decode = __webpack_require__(16);
	var isValid = __webpack_require__(17);

	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;

	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;

	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(18) || 0;

	// Counter is used when shortid is called multiple times in one second.
	var counter;

	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;

	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {

	    var str = '';

	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }

	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);

	    return str;
	}


	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}

	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}

	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }

	    return alphabet.shuffled();
	}


	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(13);

	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;

	var shuffled;

	function reset() {
	    shuffled = false;
	}

	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }

	    if (_alphabet_ === alphabet) {
	        return;
	    }

	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }

	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });

	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }

	    alphabet = _alphabet_;
	    reset();
	}

	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}

	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}

	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }

	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;

	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}

	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}

	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}

	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

	var seed = 1;

	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}

	function setSeed(_seed_) {
	    seed = _seed_;
	}

	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(15);

	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;

	    var str = '';

	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}

	module.exports = encode;


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}

	module.exports = randomByte;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(12);

	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}

	module.exports = decode;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(12);

	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }

	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}

	module.exports = isShortId;


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;


/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(19);

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
	          classes = {};

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

	      var self = this;

	      var correctAnswers = this.requireForComplete.filter(function (ref) {
	        return self.refs[ref].props.correct;
	      });

	      if (correctAnswers.length > 0) {
	        this.requireForComplete = correctAnswers;
	      }

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

	      target = e.target.closest('LI');

	      if (!target) return;

	      dataRef = target.getAttribute('data-ref');
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

	      if (self.props.chooseOne) {
	        self.requireForComplete = [dataRef];
	      }

	      if (self.props.dataTarget) {
	        self.updateGameState({
	          path: self.props.dataTarget,
	          data: {
	            target: ref
	          }
	        });
	      }

	      if (self.props.completeListOnClick) {
	        self.requireForComplete.map(function (key) {
	          if (key === id && self.refs[id]) {
	            self.refs[id].complete();
	          }
	        });
	      }

	      self.requireForComplete.map(function (key) {
	        if (key === dataRef && self.refs[key]) {
	          self.refs[key].complete();
	        }
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
	      return (0, _classnames2.default)(li.props.className, this.state.classes[key], this.state.classes[li.props['data-ref']]);
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('selectable', _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'checkComplete',
	    value: function checkComplete() {
	      var self = this,
	          complete;

	      if (this.props.checkComplete === false) return;

	      complete = self.requireForComplete.every(function (key) {
	        if (self.refs[key] instanceof Node) {
	          return true;
	        }
	        if (!self.refs[key].state || self.refs[key].state && !self.refs[key].state.complete) {
	          if (typeof self.refs[key].checkComplete === 'function') {
	            self.refs[key].checkComplete();
	          }
	          return false;
	        }
	        return true;
	      });

	      if (complete && !self.state.complete) {
	        self.complete();
	      } else if (self.state.started && !complete && self.state.complete) {
	        self.incomplete();
	      }
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IMAGE = 'image';
	var AREA = 'area';
	var CONTENT = 'content';
	var SCROLLBAR = 'scrollbar';
	var SCROLLER = 'scroller';

	var ScrollArea = function (_skoash$Component) {
	  _inherits(ScrollArea, _skoash$Component);

	  function ScrollArea() {
	    _classCallCheck(this, ScrollArea);

	    var _this = _possibleConstructorReturn(this, (ScrollArea.__proto__ || Object.getPrototypeOf(ScrollArea)).call(this));

	    _this.state = _.defaults({
	      startY: 0,
	      endY: 0,
	      zoom: 1
	    }, _this.state);

	    _this.setZoom = _this.setZoom.bind(_this);

	    _this.mouseDown = _this.mouseDown.bind(_this);
	    _this.mouseUp = _this.mouseUp.bind(_this);

	    _this.moveEvent = _this.moveEvent.bind(_this);

	    _this.touchStart = _this.touchStart.bind(_this);
	    _this.touchEnd = _this.touchEnd.bind(_this);
	    return _this;
	  }

	  _createClass(ScrollArea, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      var _this2 = this;

	      _get(ScrollArea.prototype.__proto__ || Object.getPrototypeOf(ScrollArea.prototype), 'bootstrap', this).call(this);

	      this.setZoom();
	      window.addEventListener('resize', this.setZoom);

	      this[AREA] = ReactDOM.findDOMNode(this.refs[AREA]);
	      this[CONTENT] = ReactDOM.findDOMNode(this.refs[CONTENT]);
	      this[SCROLLBAR] = ReactDOM.findDOMNode(this.refs[SCROLLBAR]);
	      this[SCROLLER] = ReactDOM.findDOMNode(this.refs[SCROLLER]);

	      this[AREA].scrollTop = 0;

	      this[AREA].addEventListener('scroll', function (e) {
	        var areaScrollTop, endY;

	        if (!e.target || _this2.dragging) return;

	        areaScrollTop = e.target.scrollTop;
	        endY = (_this2[SCROLLBAR].offsetHeight - _this2.props.scrollbarHeight) * (areaScrollTop / (_this2[CONTENT].offsetHeight - _this2[AREA].offsetHeight));

	        _this2.setState({
	          startY: 0,
	          endY: endY
	        });
	      });

	      this[SCROLLER].addEventListener('mousedown', this.mouseDown);
	      this[SCROLLER].addEventListener('touchstart', this.touchStart);
	    }
	  }, {
	    key: 'setZoom',
	    value: function setZoom() {
	      var _this3 = this;

	      skoash.trigger('getState').then(function (state) {
	        _this3.setState({
	          zoom: state.scale
	        });
	      });
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
	    key: 'startEvent',
	    value: function startEvent(e, cb) {
	      var startY, endY;

	      if (e.target !== this[SCROLLER]) return;

	      this.dragging = true;

	      e = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e;

	      endY = this.getEndY(e);
	      startY = this.state.startY || endY;

	      this.setState({
	        startY: startY,
	        endY: endY
	      });

	      if (typeof cb === 'function') cb.call(this);
	    }
	  }, {
	    key: 'getEndY',
	    value: function getEndY(e) {
	      return Math.min(Math.max(e.pageY / this.state.zoom, this.state.startY), this.state.startY + this[SCROLLBAR].getBoundingClientRect().height / this.state.zoom - this.props.scrollbarHeight);
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
	    key: 'moveEvent',
	    value: function moveEvent(e) {
	      var endY;

	      e = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e;

	      endY = this.getEndY(e);

	      this[AREA].scrollTop = (endY - this.state.startY) * (this[CONTENT].offsetHeight - this[AREA].offsetHeight) / (this[SCROLLBAR].offsetHeight - this.props.scrollbarHeight);

	      this.setState({
	        endY: endY
	      });
	    }
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp() {
	      this.dragging = false;
	      this.detachMouseEvents();
	    }
	  }, {
	    key: 'touchEnd',
	    value: function touchEnd() {
	      this.dragging = false;
	      this.detachTouchEvents();
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
	    key: 'getScrollerStyle',
	    value: function getScrollerStyle() {
	      return {
	        backgroundImage: 'url(' + this.props.img + ')',
	        top: this.state.endY - this.state.startY
	      };
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)('scroll-area', _get(ScrollArea.prototype.__proto__ || Object.getPrototypeOf(ScrollArea.prototype), 'getClassNames', this).call(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.props.shouldRender) return null;

	      return React.createElement(
	        this.props.type,
	        _extends({}, this.props, { className: this.getClassNames() }),
	        React.createElement(skoash.Image, { ref: IMAGE, className: 'hidden', src: this.props.img }),
	        React.createElement(
	          'div',
	          { ref: AREA, className: AREA },
	          React.createElement(
	            'div',
	            { ref: CONTENT, className: CONTENT },
	            this.renderContentList()
	          )
	        ),
	        React.createElement(
	          'div',
	          {
	            ref: SCROLLBAR,
	            className: SCROLLBAR
	          },
	          React.createElement('div', {
	            ref: SCROLLER,
	            className: SCROLLER,
	            style: this.getScrollerStyle()
	          })
	        )
	      );
	    }
	  }]);

	  return ScrollArea;
	}(skoash.Component);

	ScrollArea.defaultProps = _.defaults({
	  img: '',
	  scrollbarHeight: 100
	}, skoash.Component.defaultProps);

		exports.default = ScrollArea;

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

	exports.default = function (props, ref, key) {
	  return React.createElement(CanvasScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'canvas',
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	var _2 = __webpack_require__(23);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(26);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(20);

	var _7 = _interopRequireDefault(_6);

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import Reveal from 'shared/components/reveal/0.1';

	var CanvasScreen = function (_skoash$Screen) {
	  _inherits(CanvasScreen, _skoash$Screen);

	  function CanvasScreen() {
	    _classCallCheck(this, CanvasScreen);

	    var _this = _possibleConstructorReturn(this, (CanvasScreen.__proto__ || Object.getPrototypeOf(CanvasScreen)).call(this));

	    _this.state = {
	      load: true,
	      menu: {},
	      valid: true
	    };

	    _this.rightMenuList = [React.createElement(
	      'li',
	      { className: 'preview', onClick: _this.preview.bind(_this) },
	      React.createElement('span', null)
	    ), React.createElement(
	      'li',
	      { className: 'send', onClick: _this.send.bind(_this) },
	      React.createElement('span', null)
	    )];

	    _this.setValid = _this.setValid.bind(_this);
	    _this.closeReveal = _this.closeReveal.bind(_this);
	    _this.setHasAssets = _this.setHasAssets.bind(_this);
	    return _this;
	  }

	  _createClass(CanvasScreen, [{
	    key: 'getData',
	    value: function getData() {
	      return this.refs.canvas.getItems();
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.refs.canvas.reset();
	      this.setState({
	        background: false,
	        hasAssets: false
	      });
	    }
	  }, {
	    key: 'addItem',
	    value: function addItem(message) {
	      if (message) {
	        this.setState({
	          hasAssets: true,
	          background: this.state.background || message.asset_type === 'background'
	        });
	        this.refs.canvas.addItem(message, function () {
	          skoash.trigger('save');
	        });
	      }
	    }
	  }, {
	    key: 'addItems',
	    value: function addItems(message) {
	      var hasAssets, background;

	      hasAssets = true;
	      background = !!message.rules.background;

	      this.mapRulesStringToNumbers(message.rules);

	      this.refs.canvas.setItems(message.rules);

	      this.setState({
	        hasAssets: hasAssets,
	        background: background
	      });

	      if (message.friend_to) {
	        skoash.trigger('passData', {
	          name: 'add-recipient',
	          message: message.friend_to
	        });
	      }
	    }
	  }, {
	    key: 'setMenu',
	    value: function setMenu() {
	      var menu,
	          state = this.props.gameState;

	      if (state && state.data && state.data.menu) {
	        menu = state.data.menu;
	        this.setState({
	          menu: menu
	        });
	      }
	    }
	  }, {
	    key: 'mapRulesStringToNumbers',
	    value: function mapRulesStringToNumbers(rules) {
	      if (!rules) return;

	      if (_.isArray(rules.items)) {
	        rules.items.forEach(function (item) {
	          item.state.left = parseFloat(item.state.left);
	          item.state.rotation = parseFloat(item.state.rotation);
	          item.state.scale = parseFloat(item.state.scale);
	          item.state.top = parseFloat(item.state.top);
	        });
	      }

	      if (_.isArray(rules.messages)) {
	        rules.messages.forEach(function (message) {
	          message.state.left = parseFloat(message.state.left);
	          message.state.rotation = parseFloat(message.state.rotation);
	          message.state.scale = parseFloat(message.state.scale);
	          message.state.top = parseFloat(message.state.top);
	        });
	      }

	      return rules;
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      this.setMenu();

	      if (this.refs && this.refs.menu) {
	        this.refs.menu.deactivate();
	      }

	      if (!opts.draft) skoash.trigger('save');

	      // interval = setInterval(() => {
	      //   skoash.trigger('save');
	      // }, 120000);

	      // this.setState({
	      //   interval
	      // });

	      _get(CanvasScreen.prototype.__proto__ || Object.getPrototypeOf(CanvasScreen.prototype), 'open', this).call(this);
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      skoash.trigger('save');
	      // clearInterval(this.state.interval);
	      // this.setState({
	      //   interval: null
	      // });
	      _get(CanvasScreen.prototype.__proto__ || Object.getPrototypeOf(CanvasScreen.prototype), 'close', this).call(this);
	    }
	  }, {
	    key: 'setValid',
	    value: function setValid(valid) {
	      this.setState({
	        valid: valid
	      });
	    }
	  }, {
	    key: 'setHasAssets',
	    value: function setHasAssets(hasAssets) {
	      this.setState({
	        hasAssets: hasAssets
	      });
	    }
	  }, {
	    key: 'send',
	    value: function send() {
	      if (!this.state.valid) return;
	      this.goto('send');
	    }
	  }, {
	    key: 'preview',
	    value: function preview() {
	      if (!this.state.valid) return;
	      this.goto('preview');
	    }
	  }, {
	    key: 'closeReveal',
	    value: function closeReveal() {
	      if (this.refs && this.refs.reveal) {
	        this.refs.reveal.close();
	      }
	    }
	  }, {
	    key: 'getContainerClasses',
	    value: function getContainerClasses() {
	      return (0, _classnames2.default)({
	        'canvas-container': true,
	        BACKGROUND: this.state.background
	      });
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)({
	        'HAS-ASSETS': this.state.hasAssets,
	        'INVALID': !this.state.valid
	      }, skoash.Screen.prototype.getClassNames.call(this));
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Frames/SK_frames_canvas.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: 'media/_Buttons/SK_btn_friend.png' }),
	        React.createElement(_5.default, {
	          ref: 'menu',
	          items: this.state.menu.items,
	          level: 0,
	          lastLevel: 1
	        }),
	        React.createElement(
	          'div',
	          { className: this.getContainerClasses() },
	          React.createElement(_3.default, {
	            ref: 'canvas',
	            setValid: this.setValid,
	            setHasAssets: this.setHasAssets,
	            itemMinDim: 150
	          })
	        ),
	        React.createElement(_7.default, { className: 'menu right-menu', list: this.rightMenuList })
	      );
	      // move this back up below the Selectable when there is an instructional help video
	      /*
	          <Reveal
	            ref="reveal"
	            openOnStart="0"
	            list={[
	              <li>
	                <skoash.Image className="otter" src={'media/_Otter/joyful-otter_2.gif'} />
	                <div className="bubble">
	                  Welcome to your canvas!<br/><br/>
	                  Would you like me<br/>
	                  to show you around?
	                  <div className="buttons">
	                    <button
	                      className="yes"
	                      onClick={skoash.trigger.bind(null, 'openMenu', {id: 'help'})}
	                    />
	                    <button
	                      className="no"
	                      onClick={this.closeReveal}
	                    />
	                  </div>
	                </div>
	              </li>
	            ]}
	          />
	      */
	    }
	  }]);

	  return CanvasScreen;
		}(skoash.Screen);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(24);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Canvas = function (_skoash$Component) {
	  _inherits(Canvas, _skoash$Component);

	  function Canvas() {
	    _classCallCheck(this, Canvas);

	    var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this));

	    _this.state = {
	      background: null,
	      items: [],
	      messages: [],
	      offsetX: 0,
	      offsetY: 0,
	      active: false,
	      valid: true
	    };

	    _this.deleteItem = _this.deleteItem.bind(_this);
	    _this.checkItem = _this.checkItem.bind(_this);
	    _this.deactivateItems = _this.deactivateItems.bind(_this);
	    _this.relayerItems = _this.relayerItems.bind(_this);
	    _this.setValid = _this.setValid.bind(_this);
	    return _this;
	  }

	  _createClass(Canvas, [{
	    key: 'start',
	    value: function start() {
	      var dom = ReactDOM.findDOMNode(this);

	      _get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), 'start', this).call(this);

	      this.setState({
	        width: dom.offsetWidth,
	        height: dom.offsetHeight
	      });
	    }
	  }, {
	    key: 'getItems',
	    value: function getItems() {
	      var items,
	          messages,
	          self = this;

	      items = this.state.items.map(function (item, key) {
	        var state;

	        if (!self.refs['item-' + key]) return item;

	        state = self.refs['item-' + key].state;

	        item.state = {
	          left: _.floor(state.left, 14),
	          top: _.floor(state.top, 14),
	          scale: _.floor(state.scale, 14),
	          rotation: _.floor(state.rotation, 14),
	          layer: state.layer,
	          valid: state.valid,
	          corners: state.corners
	        };

	        item.check = state.check;
	        item.mime_type = state.mime_type; // eslint-disable-line camelcase

	        return item;
	      });

	      messages = this.state.messages.map(function (item, key) {
	        var state;

	        if (!self.refs['message-' + key]) return item;

	        state = self.refs['message-' + key].state;

	        item.state = {
	          left: _.floor(state.left, 14),
	          top: _.floor(state.top, 14),
	          scale: _.floor(state.scale, 14),
	          rotation: _.floor(state.rotation, 14),
	          layer: state.layer,
	          valid: state.valid,
	          corners: state.corners
	        };

	        item.check = state.check;
	        item.mime_type = state.mime_type; // eslint-disable-line camelcase

	        return item;
	      });

	      _.remove(items, function (n) {
	        return !n;
	      });

	      _.remove(messages, function (n) {
	        return !n;
	      });

	      return {
	        background: this.state.background,
	        items: items,
	        messages: messages
	      };
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.setState({
	        background: null,
	        items: [],
	        messages: []
	      });
	    }
	  }, {
	    key: 'setItems',
	    value: function setItems(message) {
	      var _this2 = this;

	      if (message) {
	        /*
	         *
	         * This makes sure the EditableAssets get cleared.
	         *
	         * This prevents the new assets from inheriting
	         * state from the old assets.
	         *
	         */
	        this.setState({
	          background: null,
	          items: [],
	          messages: []
	        }, function () {
	          _this2.addItem(message.background);
	          message.items.forEach(function (asset) {
	            _this2.addItem(asset);
	          });
	          message.messages.forEach(function (asset) {
	            _this2.addItem(asset);
	          });
	        });
	      }
	    }
	  }, {
	    key: 'addItem',
	    value: function addItem(asset, cb) {
	      var _this3 = this;

	      var items, messages, index, count;

	      if (!asset) return;

	      if (asset.asset_type === 'background') {
	        this.setState({
	          background: asset
	        }, function () {
	          skoash.trigger('emit', {
	            name: 'getMedia',
	            'media_id': asset.media_id
	          }).then(function (d) {
	            var background = _this3.state.background;
	            background.check = d.check;
	            background.mime_type = d.mime_type; // eslint-disable-line camelcase
	            _this3.setState({
	              background: background
	            }, cb);
	          });
	        });
	      } else if (asset.asset_type === 'item') {
	        items = this.state.items;

	        count = _.reduce(items, function (c, v) {
	          if (asset.src === v.src) c++;
	          return c;
	        }, 1);

	        if (count > this.props.maxInstances) {
	          skoash.trigger('openMenu', {
	            id: 'limitWarning'
	          });
	          return;
	        }

	        items.push(asset);
	        index = items.indexOf(asset);

	        this.setState({
	          items: items
	        }, function () {
	          skoash.trigger('emit', {
	            name: 'getMedia',
	            'media_id': asset.media_id
	          }).then(function (d) {
	            asset.check = d.check;
	            asset.mime_type = d.mime_type; // eslint-disable-line camelcase
	            items[index] = asset;
	            _this3.setState({
	              items: items
	            }, cb);
	          });
	        });
	      } else if (asset.asset_type === 'message') {
	        messages = this.state.messages;

	        count = _.reduce(items, function (c, v) {
	          if (asset.src === v.src) c++;
	          return c;
	        }, 1);

	        if (count > this.props.maxInstances) return;

	        messages.push(asset);
	        index = messages.indexOf(asset);

	        this.setState({
	          messages: messages
	        }, function () {
	          skoash.trigger('emit', {
	            name: 'getMedia',
	            'media_id': asset.media_id
	          }).then(function (d) {
	            asset.check = d.check;
	            asset.mime_type = d.mime_type; // eslint-disable-line camelcase
	            messages[index] = asset;
	            _this3.setState({
	              messages: messages
	            }, cb);
	          });
	        });
	      }
	    }
	  }, {
	    key: 'deleteItem',
	    value: function deleteItem(key, type) {
	      var items;

	      items = this.state[type + 's'];
	      delete items[key];

	      this.setState(_defineProperty({}, type + 's', items));
	    }
	  }, {
	    key: 'deactivateItems',
	    value: function deactivateItems(exclude, type) {
	      var _this4 = this;

	      if ((typeof exclude === 'undefined' ? 'undefined' : _typeof(exclude)) === 'object' && exclude.target) {
	        if (exclude.target.tagName !== 'LI') return;
	        this.setState({
	          active: false
	        });
	        if (!this.state.valid) {
	          skoash.trigger('passData', {
	            name: 'showCollisionWarning'
	          });
	        }
	      }

	      if (typeof exclude === 'number') {
	        this.setState({
	          active: true
	        });
	      }

	      this.state.items.map(function (item, key) {
	        if ((key !== exclude || type !== 'item') && _this4.refs['item-' + key]) {
	          _this4.refs['item-' + key].deactivate();
	        }
	      });

	      this.state.messages.map(function (item, key) {
	        if ((key !== exclude || type !== 'message') && _this4.refs['message-' + key]) {
	          _this4.refs['message-' + key].deactivate();
	        }
	      });
	    }
	  }, {
	    key: 'relayerItems',
	    value: function relayerItems(type) {
	      var _this5 = this;

	      var layers = [];

	      this.state[type + 's'].map(function (item, key) {
	        var layer;

	        layer = _this5.refs[type + '-' + key].state.layer;

	        if (layers.indexOf(layer) === -1) {
	          layers.push(layer);
	        }
	      });

	      layers.sort(function (a, b) {
	        return a < b;
	      });

	      this.state[type + 's'].map(function (item, key) {
	        var oldLayer, newLayer;

	        oldLayer = _this5.refs[type + '-' + key].state.layer;
	        newLayer = type === 'message' ? 10000 : 1000;
	        newLayer = newLayer - layers.indexOf(oldLayer);

	        _this5.refs[type + '-' + key].relayer(newLayer);
	      });
	    }
	  }, {
	    key: 'checkItem',
	    value: function checkItem(key, type) {
	      var self = this;

	      return !self.refs[type + '-' + key].state.corners.length || self.isInBounds(key, type) && (self.refs[type + '-' + key].state.can_overlap || !self.state[type + 's'].some(function (item, index) {
	        return key !== index && !self.refs[type + '-' + index].state.can_overlap && self.refs[type + '-' + index].state.corners.length && skoash.util.doIntersect(self.refs[type + '-' + key].state.corners, self.refs[type + '-' + index].state.corners);
	      }));
	    }
	  }, {
	    key: 'isInBounds',
	    value: function isInBounds(key, type) {
	      return !this.state.width || !this.state.height || !(
	      // box to left
	      skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: 0, y: -this.state.height }, { x: 0, y: 2 * this.state.height }, { x: -this.state.width, y: 2 * this.state.height }, { x: -this.state.width, y: -this.state.height }]) ||
	      // box above
	      skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: -this.state.width, y: 0 }, { x: 2 * this.state.width, y: 0 }, { x: 2 * this.state.width, y: -this.state.height }, { x: this.state.width, y: -this.state.height }]) ||
	      // box to right
	      skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: this.state.width, y: -this.state.height }, { x: this.state.width, y: 2 * this.state.height }, { x: 2 * this.state.width, y: 2 * this.state.height }, { x: 2 * this.state.width, y: -this.state.height }]) ||
	      // box below
	      skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: -this.state.width, y: this.state.height }, { x: 2 * this.state.width, y: this.state.height }, { x: 2 * this.state.width, y: 2 * this.state.height }, { x: -this.state.width, y: 2 * this.state.height }]));
	    }
	  }, {
	    key: 'setValid',
	    value: function setValid(valid) {
	      this.setState({
	        valid: valid
	      });

	      this.props.setValid.call(this, valid);
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      if (!this.state.background) return;

	      return {
	        backgroundImage: 'url(' + this.state.background.src + ')'
	      };
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems() {
	      var _this6 = this;

	      var self = this;

	      return this.state.items.map(function (item, key) {
	        return React.createElement(_3.default, _extends({}, item, {
	          'data-ref': key,
	          minDim: _this6.props.itemMinDim,
	          deleteItem: self.deleteItem,
	          checkItem: self.checkItem,
	          deactivateItems: self.deactivateItems,
	          relayerItems: self.relayerItems,
	          setValid: self.setValid,
	          ref: 'item-' + key,
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'renderMessages',
	    value: function renderMessages() {
	      var _this7 = this;

	      var self = this;

	      return this.state.messages.map(function (item, key) {
	        return React.createElement(_3.default, _extends({}, item, {
	          'data-ref': key,
	          minDim: _this7.props.messageMinDim,
	          deleteItem: self.deleteItem,
	          checkItem: self.checkItem,
	          deactivateItems: self.deactivateItems,
	          relayerItems: self.relayerItems,
	          setValid: self.setValid,
	          canvasWidth: _this7.state.width,
	          canvasHeight: _this7.state.height,
	          ref: 'message-' + key,
	          key: key
	        }));
	      });
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)({
	        canvas: true,
	        ACTIVE: !this.props.preview && this.state.active
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'ul',
	        {
	          className: this.getClassNames(),
	          style: this.getStyle(),
	          onClick: this.deactivateItems
	        },
	        this.renderItems(),
	        this.renderMessages()
	      );
	    }
	  }]);

	  return Canvas;
	}(skoash.Component);

	Canvas.defaultProps = _.defaults({
	  maxInstances: 5,
	  setValid: _.identity
	}, skoash.Component.defaultProps);

		exports.default = Canvas;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(25);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EditableAsset = function (_Draggable) {
	  _inherits(EditableAsset, _Draggable);

	  function EditableAsset() {
	    _classCallCheck(this, EditableAsset);

	    var _this = _possibleConstructorReturn(this, (EditableAsset.__proto__ || Object.getPrototypeOf(EditableAsset)).call(this));

	    _this.state = {
	      width: 0,
	      height: 0,
	      left: 0,
	      top: 0,
	      scale: .5,
	      minScale: .1,
	      maxScale: 1,
	      rotation: 0,
	      layer: 1000,
	      zoom: 1,
	      active: false,
	      valid: true,
	      corners: [],
	      lastValid: {}
	    };

	    _this.scale = _this.scale.bind(_this);
	    _this.adjustScale = _this.adjustScale.bind(_this);
	    _this.offScale = _this.offScale.bind(_this);

	    _this.rotate = _this.rotate.bind(_this);
	    _this.adjustRotation = _this.adjustRotation.bind(_this);
	    _this.offRotate = _this.offRotate.bind(_this);
	    return _this;
	  }

	  _createClass(EditableAsset, [{
	    key: 'shouldDrag',
	    value: function shouldDrag() {
	      return this.state.active;
	    }
	  }, {
	    key: 'activate',
	    value: function activate() {
	      this.setState({
	        active: true
	      });

	      if (typeof this.props.deactivateItems === 'function') {
	        this.props.deactivateItems(this.props['data-ref'], this.props.asset_type);
	      }
	    }
	  }, {
	    key: 'deactivate',
	    value: function deactivate() {
	      var _this2 = this;

	      if (!this.state.valid) {
	        this.setState({
	          left: this.state.lastValid.left || this.state.left,
	          top: this.state.lastValid.top || this.state.top,
	          scale: this.state.lastValid.scale || this.state.scale,
	          rotation: this.state.lastValid.rotation || this.state.rotation,
	          active: false
	        }, function () {
	          setTimeout(function () {
	            _this2.checkItem();
	          }, 0);
	        });
	      } else {
	        this.setState({
	          active: false
	        });
	      }
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
	        endY: e.pageY - this.state.grabY,
	        left: (e.pageX - this.state.grabX - this.state.startX) / this.state.zoom,
	        top: (e.pageY - this.state.grabY - this.state.startY) / this.state.zoom
	      });
	      this.checkItem();
	    }
	  }, {
	    key: 'delete',
	    value: function _delete() {
	      if (typeof this.props.deleteItem === 'function') {
	        this.props.deleteItem(this.props['data-ref'], this.props.asset_type);
	      }
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      this.refs.el.parentNode.addEventListener('mousemove', this.adjustRotation);
	      this.refs.el.parentNode.addEventListener('mouseup', this.offRotate);

	      this.refs.el.parentNode.addEventListener('touchmove', this.adjustRotation);
	      this.refs.el.parentNode.addEventListener('touchend', this.offRotate);
	    }
	  }, {
	    key: 'offRotate',
	    value: function offRotate() {
	      this.refs.el.parentNode.removeEventListener('mousemove', this.adjustRotation);
	      this.refs.el.parentNode.removeEventListener('mouseup', this.offRotate);

	      this.refs.el.parentNode.removeEventListener('touchmove', this.adjustRotation);
	      this.refs.el.parentNode.removeEventListener('touchend', this.offRotate);
	    }
	  }, {
	    key: 'adjustRotation',
	    value: function adjustRotation(e) {
	      var rotation, deltaX, deltaY;

	      if (e.targetTouches && e.targetTouches[0]) {
	        e.pageX = e.targetTouches[0].pageX;
	        e.pageY = e.targetTouches[0].pageY;
	      }

	      deltaX = e.pageX / this.state.zoom - this.refs.li.offsetParent.offsetLeft - (this.state.left + this.state.width / 2);
	      deltaY = e.pageY / this.state.zoom - this.refs.li.offsetParent.offsetTop - (this.state.top + this.state.height / 2);

	      rotation = Math.atan2(deltaY, deltaX) + Math.PI / 4 % (2 * Math.PI);

	      this.setState({
	        rotation: rotation
	      });

	      this.checkItem();
	    }
	  }, {
	    key: 'layer',
	    value: function layer() {
	      var layer,
	          self = this;

	      layer = this.state.layer - 1;

	      this.setState({
	        layer: layer
	      }, function () {
	        if (typeof self.props.relayerItems === 'function') {
	          self.props.relayerItems(self.props.asset_type);
	        }
	      });
	    }
	  }, {
	    key: 'relayer',
	    value: function relayer(layer) {
	      this.setState({
	        layer: layer
	      });
	    }
	  }, {
	    key: 'scale',
	    value: function scale() {
	      this.refs.el.parentNode.addEventListener('mousemove', this.adjustScale);
	      this.refs.el.parentNode.addEventListener('mouseup', this.offScale);

	      this.refs.el.parentNode.addEventListener('touchmove', this.adjustScale);
	      this.refs.el.parentNode.addEventListener('touchend', this.offScale);
	    }
	  }, {
	    key: 'offScale',
	    value: function offScale() {
	      this.refs.el.parentNode.removeEventListener('mousemove', this.adjustScale);
	      this.refs.el.parentNode.removeEventListener('mouseup', this.offScale);

	      this.refs.el.parentNode.removeEventListener('touchmove', this.adjustScale);
	      this.refs.el.parentNode.removeEventListener('touchend', this.offScale);
	    }
	  }, {
	    key: 'adjustScale',
	    value: function adjustScale(e) {
	      var scale, deltaX, deltaY, delta, base;

	      if (e.targetTouches && e.targetTouches[0]) {
	        e.pageX = e.targetTouches[0].pageX;
	        e.pageY = e.targetTouches[0].pageY;
	      }

	      deltaX = e.pageX / this.state.zoom - this.refs.li.offsetParent.offsetLeft / this.state.zoom - (this.state.left / this.state.zoom + this.state.width / 2);
	      deltaY = e.pageY / this.state.zoom - this.refs.li.offsetParent.offsetTop / this.state.zoom - (this.state.top / this.state.zoom + this.state.height / 2);

	      delta = Math.pow(Math.pow(deltaX, 2) + Math.pow(deltaY, 2), .5);
	      base = Math.pow(Math.pow(this.state.width / 2, 2) + Math.pow(this.state.height / 2, 2), .5);

	      scale = Math.max(Math.min(delta / base, 1), this.state.minScale);

	      this.setState({
	        scale: scale
	      });

	      this.checkItem();
	    }
	  }, {
	    key: 'checkItem',
	    value: function checkItem() {
	      var _this3 = this;

	      this.setCorners(function () {
	        var valid;

	        if (typeof _this3.props.checkItem === 'function') {
	          valid = _this3.props.checkItem(_this3.props['data-ref'], _this3.props.asset_type);

	          if (valid) {
	            _this3.setState({
	              valid: valid,
	              lastValid: new Object(_this3.state)
	            });
	          } else {
	            _this3.setState({
	              valid: valid
	            });
	          }

	          _this3.props.setValid.call(_this3, valid);
	        }
	      });
	    }
	  }, {
	    key: 'setCorners',
	    value: function setCorners(cb) {
	      var center,
	          distance,
	          angle,
	          corners = [];

	      center = {
	        x: this.state.left + this.state.width / 2,
	        y: this.state.top + this.state.height / 2
	      };

	      distance = Math.pow(Math.pow(this.state.width * this.state.scale / 2, 2) + Math.pow(this.state.height * this.state.scale / 2, 2), .5);

	      for (var i = 0; i < 4; i++) {
	        angle = this.state.rotation;
	        angle += i < 2 ? 0 : Math.PI;
	        angle += Math.pow(-1, i) * Math.atan2(this.state.height, this.state.width);

	        corners.push({
	          x: center.x + distance * Math.cos(angle),
	          y: center.y + distance * Math.sin(angle)
	        });
	      }

	      this.setState({
	        corners: corners
	      }, cb);
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	      var _this4 = this;

	      var image,
	          self = this;

	      image = new Image();

	      image.onload = function () {
	        var left, top, width, height, minDim, maxDim, minScale, maxScale, scale;

	        minDim = _this4.props.minDim || 40;
	        maxDim = _this4.props.maxDim || 400;
	        left = _this4.state.left;
	        top = _this4.state.top;
	        width = image.width;
	        height = image.height;

	        minScale = Math.max(minDim / width, minDim / height);
	        maxScale = Math.min(maxDim / width, maxDim / height, _this4.state.maxScale);
	        scale = self.props.state && self.props.state.scale ? self.props.state.scale : Math.max(Math.min(self.state.scale, maxScale), minScale);

	        if ((!_this4.state.height || !_this4.state.width) && !_this4.state.left && !_this4.state.top) {
	          left = (_this4.props.canvasWidth - width) / 2;
	          top = (_this4.props.canvasHeight - height) / 2;
	        }

	        self.setState({
	          left: left,
	          top: top,
	          width: width,
	          height: height,
	          minScale: minScale,
	          scale: scale
	        }, function () {
	          self.activate();
	          self.checkItem();
	        });
	      };

	      image.src = this.props.src;
	    }
	  }, {
	    key: 'getLayer',
	    value: function getLayer() {
	      var layer = 1000;

	      if (this.props.state && this.props.state.layer) {
	        layer = this.props.state.layer;
	      } else {
	        switch (this.props.asset_type) {
	          case 'background':
	            layer = 1;
	            break;
	          case 'message':
	            layer = 10000;
	            break;
	        }
	      }

	      this.setState({
	        layer: layer
	      });
	    }
	  }, {
	    key: 'attachEvents',
	    value: function attachEvents() {
	      this.refs.scale.addEventListener('mousedown', this.scale);
	      this.refs.rotate.addEventListener('mousedown', this.rotate);

	      this.refs.scale.addEventListener('touchstart', this.scale);
	      this.refs.rotate.addEventListener('touchstart', this.rotate);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.bootstrap();
	    }
	  }, {
	    key: 'bootstrap',
	    value: function bootstrap() {
	      var _this5 = this;

	      _get(EditableAsset.prototype.__proto__ || Object.getPrototypeOf(EditableAsset.prototype), 'bootstrap', this).call(this);

	      if (this.props.state) {
	        this.setState(this.props.state);
	      }

	      this.getSize();
	      this.getLayer();

	      this.attachEvents();

	      skoash.trigger('emit', {
	        name: 'getMedia',
	        'media_id': this.props.media_id
	      }).then(function (d) {
	        _this5.setState(d, function () {
	          _this5.checkItem();
	        });
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.attachEvents();
	    }
	  }, {
	    key: 'getButtonStyle',
	    value: function getButtonStyle() {
	      var extraRotation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      var style,
	          transform = '';

	      transform += 'scale(' + 1 / this.state.scale + ') ';
	      transform += 'rotate(' + (-this.state.rotation - extraRotation) + 'rad) ';

	      style = {
	        transform: transform
	      };

	      return style;
	    }
	  }, {
	    key: 'getAssetStyle',
	    value: function getAssetStyle() {
	      var style,
	          transform = '';

	      transform += 'scale(' + this.state.scale + ') ';
	      transform += 'rotate(' + this.state.rotation + 'rad) ';

	      style = {
	        backgroundImage: 'url("' + this.props.src + '")',
	        width: this.state.width,
	        height: this.state.height,
	        left: this.state.left,
	        top: this.state.top,
	        transform: transform,
	        zIndex: this.state.layer
	      };

	      return style;
	    }
	  }, {
	    key: 'getButtonsStyle',
	    value: function getButtonsStyle() {
	      var style,
	          transform = '';

	      transform += 'scale(' + this.state.scale + ') ';
	      transform += 'rotate(' + this.state.rotation + 'rad) ';

	      style = {
	        width: this.state.width,
	        height: this.state.height,
	        left: this.state.left,
	        top: this.state.top,
	        transform: transform
	      };

	      return style;
	    }
	  }, {
	    key: 'getClasses',
	    value: function getClasses() {
	      return (0, _classnames2.default)({
	        DRAGGING: this.state.dragging,
	        RETURN: this.state.return,
	        ACTIVE: this.state.active,
	        INVALID: !this.state.valid
	      }, 'editable-asset', this.props.asset_type);
	    }
	  }, {
	    key: 'renderAsset',
	    value: function renderAsset() {
	      return React.createElement('div', {
	        ref: 'el',
	        className: 'asset',
	        style: this.getAssetStyle()
	      });
	    }
	  }, {
	    key: 'renderButtons',
	    value: function renderButtons() {
	      return React.createElement(
	        'div',
	        {
	          className: 'buttons',
	          style: this.getButtonsStyle()
	        },
	        React.createElement('button', {
	          className: 'delete',
	          style: this.getButtonStyle(),
	          onClick: this.delete.bind(this)
	        }),
	        React.createElement('button', {
	          ref: 'rotate',
	          className: 'rotate',
	          style: this.getButtonStyle()
	        }),
	        React.createElement('button', {
	          className: 'layer',
	          onClick: this.layer.bind(this),
	          style: this.getButtonStyle()
	        }),
	        React.createElement('button', {
	          ref: 'scale',
	          className: 'scale',
	          style: this.getButtonStyle(1.5708)
	        })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'li',
	        {
	          ref: 'li',
	          className: this.getClasses(),
	          onClick: this.activate.bind(this)
	        },
	        this.renderAsset(),
	        this.renderButtons()
	      );
	    }
	  }]);

	  return EditableAsset;
	}(_3.default);

	EditableAsset.defaultProps = _.defaults({
	  canvasWidth: 1280,
	  canvasHeight: 720,
	  setValid: _.identity
	}, _3.default.defaultProps);

		exports.default = EditableAsset;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(19);

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
	        this.props.children
	      );
	    }
	  }]);

	  return Draggable;
	}(skoash.Component);

		exports.default = Draggable;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _2 = __webpack_require__(20);

	var _3 = _interopRequireDefault(_2);

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Menu = function (_Selectable) {
	  _inherits(Menu, _Selectable);

	  function Menu() {
	    _classCallCheck(this, Menu);

	    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

	    _this.state = {
	      active: false,
	      selectClass: 'SELECTED',
	      classes: {}
	    };
	    return _this;
	  }

	  _createClass(Menu, [{
	    key: 'deactivate',
	    value: function deactivate() {
	      this.setState({
	        active: false
	      });

	      _.each(this.refs, function (ref) {
	        _.invoke(ref, 'deactivate');
	      });
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(e) {
	      var li,
	          ul,
	          dom,
	          message,
	          active = false,
	          classes = [];

	      li = e.target.closest('LI');

	      if (!li) return;

	      ul = li.closest('UL');
	      dom = ReactDOM.findDOMNode(this); // eslint-disable-line no-undef

	      if (ul !== dom) return;

	      message = li.getAttribute('data-ref');

	      if (this.state.classes[message] !== this.state.selectClass) {
	        classes[message] = this.state.selectClass;
	        active = !this.props.inactive;
	      }

	      this.setState({
	        classes: classes,
	        active: active
	      });
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems() {
	      var _this2 = this;

	      var self = this;

	      if (_typeof(this.props.items) !== 'object') return;

	      return Object.keys(this.props.items).map(function (key) {
	        var item, onClick, gotoObj, categories, isFinal;

	        categories = _this2.props.categories ? [].concat(_this2.props.categories) : [];
	        categories.push(key);

	        item = _this2.props.items[key];

	        isFinal = _typeof(item.items) !== 'object' || Object.prototype.toString.call(item.items) === '[object Array]' && item.items[0] && !item.items[0].items || typeof self.props.lastLevel === 'number' && self.props.lastLevel === self.props.level;

	        if (isFinal) {
	          gotoObj = {
	            index: 'item-drawer',
	            categories: categories,
	            categoryName: item.name
	          };
	          onClick = skoash.trigger.bind(null, 'goto', gotoObj);
	        }

	        return React.createElement(
	          skoash.ListItem,
	          {
	            className: self.getClass(key),
	            'data-ref': key,
	            ref: key,
	            key: key,
	            onClick: onClick
	          },
	          React.createElement(
	            'span',
	            null,
	            item.name || key
	          ),
	          function () {
	            if (isFinal) return;
	            return React.createElement(Menu, {
	              ref: 'menu-' + key,
	              categories: categories,
	              items: item.items,
	              inactive: true,
	              level: (self.props.level || 0) + 1,
	              lastLevel: self.props.lastLevel
	            });
	          }()
	        );
	      });
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass(key) {
	      var _classNames;

	      return (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, key.replace(' ', '-'), true), _defineProperty(_classNames, this.state.classes[key] || '', true), _classNames));
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)({
	        menu: true,
	        ACTIVE: this.state.active
	      }, this.props.className);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'ul',
	        {
	          className: this.getClassNames(),
	          onClick: this.onClick.bind(this)
	        },
	        this.renderItems()
	      );
	    }
	  }]);

	  return Menu;
	}(_3.default);

		exports.default = Menu;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (props, ref, key) {
	  return React.createElement(ItemDrawerScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'item-drawer',
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	var _2 = __webpack_require__(9);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ItemDrawerScreen = function (_skoash$Screen) {
	  _inherits(ItemDrawerScreen, _skoash$Screen);

	  function ItemDrawerScreen() {
	    _classCallCheck(this, ItemDrawerScreen);

	    var _this = _possibleConstructorReturn(this, (ItemDrawerScreen.__proto__ || Object.getPrototypeOf(ItemDrawerScreen)).call(this));

	    _this.state = {
	      opts: {
	        categories: []
	      }
	    };

	    return _this;
	  }

	  _createClass(ItemDrawerScreen, [{
	    key: 'selectRespond',
	    value: function selectRespond(message) {
	      skoash.trigger('passData', {
	        name: 'add-item',
	        message: message
	      });
	    }
	  }, {
	    key: 'updateData',
	    value: function updateData(d) {
	      var data = d ? d : this.props.gameState.data.menu.items;

	      this.state.opts.categories.forEach(function (key) {
	        if (data[key]) data = data[key];
	        if (data.items) data = data.items;
	      });

	      data = _.values(data);

	      this.setState({
	        data: data
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open(opts) {
	      var self = this;

	      skoash.trigger('getMedia', {
	        path: 'skribble/menu/' + opts.categories.join('/')
	      }).then(function (data) {
	        self.updateData(data);
	      });

	      self.setState({
	        load: true,
	        open: true,
	        leave: false,
	        close: false,
	        opts: opts,
	        data: null
	      }, function () {
	        self.updateData();
	      });

	      setTimeout(function () {
	        if (!self.state.started) {
	          self.start();
	        }
	      }, 250);
	    }
	  }, {
	    key: 'cancelRespond',
	    value: function cancelRespond() {
	      if (this.state.category) {
	        this.setState({
	          category: '',
	          categoryName: ''
	        });
	      } else {
	        skoash.trigger('goto', { index: 'canvas' });
	      }
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(_3.default, {
	          ref: 'drawer',
	          scrollbarImg: './media/_Buttons/sk_btn_slider.png',
	          selectRespond: this.selectRespond.bind(this),
	          cancelRespond: this.cancelRespond,
	          categories: this.state.opts.categories,
	          categoryName: this.state.opts.categoryName,
	          data: this.state.data
	        })
	      );
	    }
	  }]);

	  return ItemDrawerScreen;
		}(skoash.Screen);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (props, ref, key) {
	  return React.createElement(InboxScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'inbox',
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	var _ = __webpack_require__(29);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(31);

	var _4 = _interopRequireDefault(_3);

	var _5 = __webpack_require__(32);

	var _6 = _interopRequireDefault(_5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var inboxEmptyMessage = React.createElement(
	  'span',
	  null,
	  'You haven\'t received any Skribbles!',
	  React.createElement('br', null),
	  'Get started by sending some!'
	);
	var unreadEmptyMessage = React.createElement(
	  'span',
	  null,
	  'You don\'t have any',
	  React.createElement('br', null),
	  'unread Skribbles!'
	);
	var readEmptyMessage = React.createElement(
	  'span',
	  null,
	  'You don\'t have any',
	  React.createElement('br', null),
	  'read Skribbles!'
	);
	var sentEmptyMessage = React.createElement(
	  'span',
	  null,
	  'You haven\'t sent any Skribbles.',
	  React.createElement('br', null),
	  'Let\'s get started!'
	);
	var draftsEmptyMessage = React.createElement(
	  'span',
	  null,
	  'You don\'t have any drafts.',
	  React.createElement('br', null),
	  'Start Skribbling!'
	);

	var InboxScreen = function (_skoash$Screen) {
	  _inherits(InboxScreen, _skoash$Screen);

	  function InboxScreen() {
	    _classCallCheck(this, InboxScreen);

	    var _this = _possibleConstructorReturn(this, (InboxScreen.__proto__ || Object.getPrototypeOf(InboxScreen)).call(this));

	    _this.state = {
	      load: true
	    };

	    _this.selectableList = [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)];

	    _this.revealList = _this.getRevealList();

	    _this.readMessage = _this.readMessage.bind(_this);
	    _this.editMessage = _this.editMessage.bind(_this);
	    return _this;
	  }

	  _createClass(InboxScreen, [{
	    key: 'getRevealList',
	    value: function getRevealList(inbox, outbox, saved) {
	      var read,
	          unread,
	          props = this.props || {};

	      inbox = inbox || [];

	      read = inbox.filter(function (item) {
	        return item.read;
	      });

	      unread = inbox.filter(function (item) {
	        return !item.read;
	      });

	      return [React.createElement(
	        'li',
	        null,
	        React.createElement(_4.default, {
	          'data-ref': 'inbox',
	          data: {
	            items: inbox || []
	          },
	          emptyMessage: inboxEmptyMessage,
	          selectRespond: this.readMessage,
	          gameState: props.gameState
	        })
	      ), React.createElement(
	        'li',
	        null,
	        React.createElement(_4.default, {
	          'data-ref': 'unread',
	          data: {
	            items: unread || []
	          },
	          emptyMessage: unreadEmptyMessage,
	          selectRespond: this.readMessage,
	          gameState: props.gameState
	        })
	      ), React.createElement(
	        'li',
	        null,
	        React.createElement(_4.default, {
	          'data-ref': 'read',
	          data: {
	            items: read || []
	          },
	          emptyMessage: readEmptyMessage,
	          selectRespond: this.readMessage,
	          gameState: props.gameState
	        })
	      ), React.createElement(
	        'li',
	        null,
	        React.createElement(_4.default, {
	          'data-ref': 'outbox',
	          data: {
	            items: outbox || []
	          },
	          emptyMessage: sentEmptyMessage,
	          friendKey: 'friend_to',
	          selectRespond: this.readMessage,
	          gameState: props.gameState
	        })
	      ), React.createElement(
	        'li',
	        null,
	        React.createElement(_6.default, {
	          'data-ref': 'saved',
	          data: {
	            items: saved || []
	          },
	          emptyMessage: draftsEmptyMessage,
	          selectRespond: this.editMessage
	        })
	      )];
	    }
	  }, {
	    key: 'editMessage',
	    value: function editMessage(message) {
	      skoash.trigger('loadSkribble', {
	        message: message
	      });
	    }
	  }, {
	    key: 'readMessage',
	    value: function readMessage(message) {
	      skoash.trigger('goto', {
	        index: 'read',
	        message: message
	      });
	    }
	  }, {
	    key: 'updateData',
	    value: function updateData() {
	      var skribbles, inbox, outbox, saved;

	      skribbles = this.props.gameState.data.skribbles;
	      inbox = skribbles.received;
	      outbox = skribbles.sent;
	      saved = skribbles.draft;

	      this.revealList = this.getRevealList(inbox, outbox, saved);

	      this.setState({
	        inbox: inbox,
	        outbox: outbox,
	        saved: saved
	      });
	    }
	  }, {
	    key: 'updateGameData',
	    value: function updateGameData(data, status) {
	      var _this2 = this;

	      var opts = {
	        path: ['skribbles'],
	        data: _defineProperty({}, status, data.skribble),
	        callback: function callback() {
	          _this2.updateData();
	        }
	      };
	      this.updateGameState(opts);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      var self = this;

	      skoash.trigger('getData', {
	        status: 'received'
	      }).then(function (data) {
	        self.updateGameData(data, 'received');
	      });

	      skoash.trigger('getData', {
	        status: 'sent'
	      }).then(function (data) {
	        self.updateGameData(data, 'sent');
	      });

	      skoash.trigger('getData', {
	        status: 'draft'
	      }).then(function (data) {
	        self.updateGameData(data, 'draft');
	      });

	      self.setState({
	        load: true,
	        open: true,
	        leave: false,
	        close: false
	      });

	      setTimeout(function () {
	        if (!self.state.started) {
	          self.start();
	        }
	      }, 250);
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'center' },
	          React.createElement(
	            'div',
	            { className: 'frame' },
	            React.createElement(_2.default, {
	              ref: 'selectableReveal',
	              selectableList: this.selectableList,
	              revealList: this.revealList,
	              selectOnStart: '0',
	              openOnStart: '0'
	            })
	          )
	        )
	      );
	    }
	  }]);

	  return InboxScreen;
		}(skoash.Screen);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _2 = __webpack_require__(20);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(30);

	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SelectableReveal = function (_skoash$Component) {
	  _inherits(SelectableReveal, _skoash$Component);

	  function SelectableReveal() {
	    _classCallCheck(this, SelectableReveal);

	    return _possibleConstructorReturn(this, (SelectableReveal.__proto__ || Object.getPrototypeOf(SelectableReveal)).call(this));
	  }

	  _createClass(SelectableReveal, [{
	    key: 'start',
	    value: function start() {
	      _get(SelectableReveal.prototype.__proto__ || Object.getPrototypeOf(SelectableReveal.prototype), 'start', this).call(this);
	      this.setState({
	        canSelectOnStart: this.props.canSelectOnStart
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open(message) {
	      this.refs.reveal.open(message);
	    }
	  }, {
	    key: 'selectRespond',
	    value: function selectRespond(message) {
	      if (this.props.answers.length) {
	        if (this.props.answers.indexOf(message) === -1) {
	          if (this.audio.incorrect) this.audio.incorrect.play();
	          if (this.props.revealAll) {
	            if (typeof this.refs.reveal.open === 'function') {
	              this.open(message);
	            }
	          }
	        } else {
	          if (this.audio.correct) this.audio.correct.play();
	          if (typeof this.refs.reveal.open === 'function') {
	            this.open(message);
	          }
	        }
	      } else {
	        if (this.props.allCorrect && this.audio.correct) {
	          this.audio.correct.play();
	        }
	        if (typeof this.refs.reveal.open === 'function') {
	          this.open(message);
	        }
	      }
	    }
	  }, {
	    key: 'closeRespond',
	    value: function closeRespond() {
	      if (typeof this.props.closeRespond === 'function') {
	        this.props.closeRespond();
	      }
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
	    key: 'renderSelectable',
	    value: function renderSelectable() {
	      return React.createElement(_3.default, {
	        ref: 'selectable',
	        list: this.props.selectableList,
	        selectRespond: this.selectRespond.bind(this),
	        selectClass: this.props.selectableSelectClass,
	        completeOnSelect: this.props.selectableCompleteOnSelect,
	        checkComplete: this.props.selectableCheckComplete,
	        randomizeList: this.props.randomizeSelectableList,
	        selectOnStart: this.props.selectOnStart,
	        chooseOne: this.props.chooseOne
	        // answers={this.props.answers}
	        , allowDeselect: this.props.allowDeselect
	      });
	    }
	  }, {
	    key: 'renderReveal',
	    value: function renderReveal() {
	      return React.createElement(_5.default, {
	        ref: 'reveal',
	        list: this.props.revealList,
	        assets: this.props.revealAssets,
	        closeRespond: this.closeRespond.bind(this),
	        completeOnOpen: this.props.revealCompleteOnOpen,
	        checkComplete: this.props.revealCheckComplete,
	        openOnStart: this.props.openOnStart,
	        hide: this.props.hideReveal,
	        openReveal: this.props.openReveal,
	        onOpen: this.props.onOpen,
	        openMultiple: false
	      });
	    }
	  }, {
	    key: 'getClasses',
	    value: function getClasses() {
	      var classes = '';

	      if (this.state.complete) classes += ' COMPLETE';

	      return classes;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'selectable-reveal' + this.getClasses() },
	        this.renderAssets(),
	        this.renderSelectable(),
	        this.renderReveal()
	      );
	    }
	  }]);

	  return SelectableReveal;
	}(skoash.Component);

	SelectableReveal.defaultProps = _.defaults({
	  answers: [],
	  canSelectOnStart: true
	}, skoash.Component.defaultProps);

		exports.default = SelectableReveal;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(19);

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
	        currentlyOpen: currentlyOpen,
	        openReveal: '' + message
	      });

	      self.playAudio(message);

	      if (self.props.completeOnOpen) {
	        self.complete();
	      } else {
	        self.requireForComplete.map(function (key) {
	          if (key === message && self.refs[key]) {
	            self.refs[key].complete();
	          }
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
	            open: '' + message
	          }
	        });
	      }

	      self.props.onOpen.call(self, message);
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var prevMessage = this.state.openReveal;
	      var currentlyOpen = this.state.currentlyOpen;
	      currentlyOpen.splice(currentlyOpen.indexOf(prevMessage), 1);

	      this.setState({
	        open: false,
	        openReveal: '',
	        currentlyOpen: currentlyOpen
	      });

	      if (!opts.silent && this.audio['close-sound']) {
	        this.audio['close-sound'].play();
	      }

	      this.props.onClose.call(this);

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

	      if ('' + parseInt(message, 10) === message) {
	        message = 'asset-' + message;
	      }

	      if (!message) return;

	      if (this.audio['open-sound']) {
	        this.audio['open-sound'].play();
	      }

	      if (typeof message === 'string') {
	        messages = message.split(' ');
	        messages.map(function (audio) {
	          if (_this2.audio[audio]) {
	            _this2.audio[audio].play();
	          } else if (_this2.media[audio] && typeof _this2.media[audio].play === 'function') {
	            _this2.media[audio].play();
	          }
	        });
	      } else {
	        if (this.audio.voiceOver[message]) {
	          this.audio.voiceOver[message].play();
	        }
	      }
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
	        var dataRef = li.props['data-ref'] || key;
	        var ref = li.ref || dataRef;
	        return React.createElement(li.type, _extends({}, li.props, {
	          type: 'li',
	          className: _this3.getClass(li, key),
	          'data-ref': dataRef,
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

	      if (props.closeReveal === true && props.closeReveal !== this.props.closeReveal) {
	        this.close();
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
	          open += 'open-' + ref + ' ';
	        });
	        open += 'OPEN';
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
	  openMultiple: true,
	  onOpen: _.noop,
	  onClose: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Reveal;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(20);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Inbox = function (_Selectable) {
	  _inherits(Inbox, _Selectable);

	  function Inbox() {
	    _classCallCheck(this, Inbox);

	    return _possibleConstructorReturn(this, (Inbox.__proto__ || Object.getPrototypeOf(Inbox)).call(this));
	  }

	  _createClass(Inbox, [{
	    key: 'selectHelper',
	    value: function selectHelper(e) {
	      var li,
	          message,
	          key,
	          classes = [];

	      li = e.target.closest('LI');

	      if (!li) return;

	      key = li.getAttribute('data-ref');

	      if (!this.refs[key]) return;

	      message = this.refs[key].props.item;
	      classes[key] = this.props.selectClass;

	      this.setState({
	        message: message,
	        classes: classes
	      });

	      if (message.status !== 'COMPLETE') return;

	      if (typeof this.props.selectRespond === 'function' && message) {
	        this.props.selectRespond(message);
	      }
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass(key, read) {
	      return (0, _classnames2.default)(this.state.classes[key], {
	        UNREAD: this.props.friendKey === 'created_by' && !read,
	        SENT: this.props.friendKey !== 'created_by'
	      });
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)({
	        'item-drawer': true,
	        COMPLETE: this.state.complete
	      }, this.props.className);
	    }
	  }, {
	    key: 'getStatusText',
	    value: function getStatusText(item) {
	      if (!item.status || item.status === 'COMPLETE') return '';
	      return item.status;
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList() {
	      var _this2 = this;

	      var items, friends;

	      if (!this.props.data || !this.props.data.items) return;

	      items = this.props.data.items;

	      if (!items.length) {
	        return React.createElement(
	          'li',
	          { className: 'empty' },
	          this.props.emptyMessage
	        );
	      }

	      friends = _.get(this.props.gameState, 'data.user', []);

	      return items.map(function (item, key) {
	        var timestamp, image, name;
	        timestamp = moment.utc(item.updated).local();
	        key = 'message-' + key;

	        friends.forEach(function (friend) {
	          if (item[_this2.props.friendKey] === friend.friend_id) {
	            image = friend._embedded.image ? friend._embedded.image.url : '';
	            name = friend.username;
	          }
	        });

	        if (!name) {
	          skoash.trigger('getData', {
	            name: 'getFriend',
	            'friend_id': item[_this2.props.friendKey]
	          });
	        }

	        if (_this2.props.friendKey === 'friend_to') {
	          item.sent = true;
	        }

	        return React.createElement(
	          skoash.ListItem,
	          {
	            className: _this2.getClass(key, item.read),
	            ref: key,
	            'data-ref': key,
	            item: item,
	            key: key
	          },
	          React.createElement(skoash.Image, { src: image }),
	          React.createElement(
	            'span',
	            { className: 'username' + (name.length > 15 ? ' long' : '') },
	            name
	          ),
	          React.createElement(
	            'span',
	            { className: 'timestamp' },
	            React.createElement(
	              'span',
	              { className: 'date' },
	              timestamp.format('MM.DD.YY')
	            ),
	            React.createElement(
	              'span',
	              { className: 'time' },
	              timestamp.format('h:mm a')
	            )
	          ),
	          React.createElement(
	            'span',
	            { className: 'status ' + item.status },
	            _this2.getStatusText(item)
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'ul',
	          { className: this.getClassNames(), onClick: this.state.selectFunction.bind(this) },
	          this.renderList()
	        )
	      );
	    }
	  }]);

	  return Inbox;
	}(_3.default);

	Inbox.defaultProps = _.defaults({
	  friendKey: 'created_by',
	  gameState: {}
	}, _3.default.defaultProps);

		exports.default = Inbox;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ = __webpack_require__(20);

	var _2 = _interopRequireDefault(_);

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SavedMessages = function (_Selectable) {
	  _inherits(SavedMessages, _Selectable);

	  function SavedMessages() {
	    _classCallCheck(this, SavedMessages);

	    return _possibleConstructorReturn(this, (SavedMessages.__proto__ || Object.getPrototypeOf(SavedMessages)).call(this));
	  }

	  _createClass(SavedMessages, [{
	    key: 'selectHelper',
	    value: function selectHelper(e) {
	      var li,
	          message,
	          key,
	          classes = [];

	      li = e.target.closest('LI');

	      if (!li) return;

	      key = li.getAttribute('data-ref');

	      message = this.refs[key].props.item;
	      classes[key] = this.state.selectClass;

	      this.setState({
	        message: message,
	        classes: classes
	      }, this.selectRespond.bind(this));
	    }
	  }, {
	    key: 'selectRespond',
	    value: function selectRespond() {
	      if (typeof this.props.selectRespond === 'function' && this.state.message) {
	        this.props.selectRespond(this.state.message);
	      }
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass(key) {
	      var _classNames;

	      return (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.state.classes[key] || '', true), _defineProperty(_classNames, 'DRAFT', true), _classNames));
	    }
	  }, {
	    key: 'getClassNames',
	    value: function getClassNames() {
	      return (0, _classnames2.default)({
	        'item-drawer': true,
	        SAVED: true,
	        COMPLETE: this.state.complete
	      }, this.props.className);
	    }
	  }, {
	    key: 'renderThumb',
	    value: function renderThumb(item) {
	      var firstImg, background;

	      background = item && item.rules && item.rules.background && item.rules.background.src ? item.rules.background.src : '';

	      firstImg = item && item.rules && item.rules.items && item.rules.items[0] && item.rules.items[0].src ? item.rules.items[0].src : item && item.rules && item.rules.messages && item.rules.messages[0] && item.rules.messages[0].src ? item.rules.messages[0].src : '';

	      return React.createElement(
	        'div',
	        {
	          className: 'thumbnail',
	          style: {
	            backgroundImage: 'url(' + background + ')'
	          }
	        },
	        React.createElement(skoash.Image, { src: firstImg })
	      );
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList() {
	      var items,
	          self = this;

	      if (!self.props.data || !self.props.data.items) return;

	      items = self.props.data.items;

	      if (!items.length) {
	        return React.createElement(
	          'li',
	          { className: 'empty' },
	          this.props.emptyMessage
	        );
	      }

	      return items.map(function (item, key) {
	        var timestamp = moment.utc(item.updated).local();
	        return React.createElement(
	          skoash.ListItem,
	          {
	            className: self.getClass(key),
	            ref: key,
	            'data-ref': key,
	            item: item,
	            key: key
	          },
	          self.renderThumb(item),
	          React.createElement(
	            'span',
	            { className: 'timestamp' },
	            React.createElement(
	              'span',
	              { className: 'date' },
	              timestamp.format('MM.DD.YY')
	            ),
	            React.createElement(
	              'span',
	              { className: 'time' },
	              timestamp.format('h:mm a')
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'ul',
	          { className: this.getClassNames(), onClick: this.state.selectFunction.bind(this) },
	          this.renderList()
	        )
	      );
	    }
	  }]);

	  return SavedMessages;
	}(_2.default);

		exports.default = SavedMessages;

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

	exports.default = function (props, ref, key) {
	  return React.createElement(PreviewScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'preview',
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	var _ = __webpack_require__(23);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(20);

	var _4 = _interopRequireDefault(_3);

	var _5 = __webpack_require__(34);

	var _6 = _interopRequireDefault(_5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNameText = {
	  skribbleBox: 'skribble-box',
	  box: 'box',
	  leftMenu: 'menu left-menu',
	  rightMenu: 'menu right-menu'
	};

	var refs = {
	  box: 'box',
	  canvas: 'canvas'
	};

	var PreviewScreen = function (_skoash$Screen) {
	  _inherits(PreviewScreen, _skoash$Screen);

	  function PreviewScreen() {
	    _classCallCheck(this, PreviewScreen);

	    var _this = _possibleConstructorReturn(this, (PreviewScreen.__proto__ || Object.getPrototypeOf(PreviewScreen)).call(this));

	    _this.state = {
	      load: true,
	      opts: {}
	    };

	    _this.leftMenuList = [React.createElement(
	      'li',
	      { className: 'edit', onClick: _this.goto.bind(_this, 'canvas') },
	      React.createElement('span', null)
	    )];

	    _this.rightMenuList = [React.createElement(
	      'li',
	      { className: 'send', onClick: _this.goto.bind(_this, 'send') },
	      React.createElement('span', null)
	    )];
	    return _this;
	  }

	  _createClass(PreviewScreen, [{
	    key: 'open',
	    value: function open(opts) {
	      var _this2 = this;

	      skoash.trigger('getRules').then(function (rules) {
	        _this2.refs[refs.box].refs[refs.canvas].setItems(rules);
	        _get(PreviewScreen.prototype.__proto__ || Object.getPrototypeOf(PreviewScreen.prototype), 'open', _this2).call(_this2, opts);
	      });
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          skoash.Component,
	          { ref: refs.box, className: classNameText.skribbleBox },
	          React.createElement(_2.default, { ref: refs.canvas, preview: true }),
	          React.createElement(_6.default, {
	            className: 'sparkles',
	            amount: 40
	          }),
	          React.createElement('div', { className: classNameText.box })
	        ),
	        React.createElement(_4.default, { className: classNameText.leftMenu, list: this.leftMenuList }),
	        React.createElement(_4.default, { className: classNameText.rightMenu, list: this.rightMenuList })
	      );
	    }
	  }]);

	  return PreviewScreen;
		}(skoash.Screen);

/***/ },
/* 34 */
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

	var Repeater = function (_skoash$Component) {
	  _inherits(Repeater, _skoash$Component);

	  function Repeater() {
	    _classCallCheck(this, Repeater);

	    return _possibleConstructorReturn(this, (Repeater.__proto__ || Object.getPrototypeOf(Repeater)).apply(this, arguments));
	  }

	  _createClass(Repeater, [{
	    key: 'renderContentList',
	    value: function renderContentList() {
	      var a = [];
	      for (var i = 0; i < this.props.amount; i++) {
	        a.push(React.createElement(this.props.item, _extends({ key: i }, this.props.props[i])));
	      }
	      return a;
	    }
	  }]);

	  return Repeater;
	}(skoash.Component);

	Repeater.defaultProps = _.defaults({
	  amount: 1,
	  item: 'div',
	  props: []
	}, skoash.Component.defaultProps);

		exports.default = Repeater;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (props, ref, key) {
	  return React.createElement(SendScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'send',
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	var _ = __webpack_require__(20);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNameText = {
	  yourMessageTo: 'your-message-to',
	  isReady: 'is-ready',
	  changeFriend: 'change-friend',
	  character: 'character',
	  gift: 'gift',
	  header: 'header',
	  username: 'username'
	};

	var SendScreen = function (_skoash$Screen) {
	  _inherits(SendScreen, _skoash$Screen);

	  function SendScreen() {
	    _classCallCheck(this, SendScreen);

	    var _this = _possibleConstructorReturn(this, (SendScreen.__proto__ || Object.getPrototypeOf(SendScreen)).call(this));

	    _this.state.load = true;
	    _this.state.recipient = {};

	    _this.rightMenuList = [React.createElement(
	      'li',
	      { className: 'edit-right', onClick: _this.goto.bind(_this, 'canvas') },
	      React.createElement('span', null)
	    ), React.createElement(
	      'li',
	      { className: 'send', onClick: _this.send },
	      React.createElement('span', null)
	    )];
	    return _this;
	  }

	  _createClass(SendScreen, [{
	    key: 'open',
	    value: function open() {
	      var recipient = this.props.gameState.recipient || {};

	      this.setState({
	        load: true,
	        open: true,
	        leave: false,
	        close: false,
	        recipient: recipient
	      });

	      this.start();
	    }
	  }, {
	    key: 'send',
	    value: function send() {
	      skoash.trigger('passData', {
	        name: 'send'
	      });
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      var changeFriendClick = this.goto.bind(this, {
	        index: 'friend',
	        goto: 'send'
	      });

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: classNameText.header },
	          React.createElement('span', { className: classNameText.yourMessageTo }),
	          React.createElement(
	            'span',
	            { className: classNameText.username },
	            this.state.recipient.name
	          ),
	          React.createElement('br', null),
	          React.createElement('span', { className: classNameText.isReady }),
	          React.createElement('button', { className: classNameText.changeFriend, onClick: changeFriendClick })
	        ),
	        React.createElement(
	          'div',
	          { className: classNameText.character },
	          React.createElement(skoash.Image, { className: 'otter', src: 'media/_Otter/proud-of-you2.gif' }),
	          React.createElement(
	            'div',
	            { className: 'bubble' },
	            'Are you sure',
	            React.createElement('br', null),
	            'you are ready to',
	            React.createElement('br', null),
	            'send your message?'
	          )
	        ),
	        React.createElement('div', { className: classNameText.gift }),
	        React.createElement(_2.default, { className: 'menu right-menu', list: this.rightMenuList })
	      );
	    }
	  }]);

	  return SendScreen;
		}(skoash.Screen);

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (props, ref, key) {
	  return React.createElement(SentScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'sent',
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNameText = {
	  character: 'character',
	  header: 'header',
	  yourMessageTo: 'your-message-to',
	  username: 'username',
	  isReady: 'is-ready',
	  buttons: 'buttons',
	  createAnother: 'create-another',
	  inbox: 'inbox'
	};

	var text = {
	  yourMessageTo: 'YOUR MESSAGE TO:',
	  hasBeenSent: 'IS BEING SENT!'
	};

	var SentScreen = function (_skoash$Screen) {
	  _inherits(SentScreen, _skoash$Screen);

	  function SentScreen() {
	    _classCallCheck(this, SentScreen);

	    var _this = _possibleConstructorReturn(this, (SentScreen.__proto__ || Object.getPrototypeOf(SentScreen)).call(this));

	    _this.state = {
	      load: true,
	      opts: {
	        recipient: {}
	      }
	    };
	    return _this;
	  }

	  _createClass(SentScreen, [{
	    key: 'renderContent',
	    value: function renderContent() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement('div', { className: classNameText.character }),
	        React.createElement(
	          'div',
	          { className: classNameText.header },
	          React.createElement(
	            'span',
	            { className: classNameText.yourMessageTo },
	            text.yourMessageTo
	          ),
	          React.createElement(
	            'span',
	            { className: classNameText.username },
	            this.state.opts.recipient.name
	          ),
	          React.createElement('br', null),
	          React.createElement(
	            'span',
	            { className: classNameText.isReady },
	            text.hasBeenSent
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: classNameText.buttons },
	          React.createElement('button', { className: classNameText.createAnother, onClick: this.goto.bind(this, 'friend') }),
	          React.createElement('button', { className: classNameText.inbox, onClick: this.goto.bind(this, 'inbox') })
	        )
	      );
	    }
	  }]);

	  return SentScreen;
		}(skoash.Screen);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (props, ref, key) {
	  return React.createElement(ReadScreen, _extends({}, props, {
	    ref: ref,
	    key: key,
	    id: 'read',
	    hideNext: true,
	    hidePrev: true
	  }));
	};

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(20);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNameText = {
	  skribbleBox: 'skribble-box',
	  box: 'box',
	  leftMenu: 'menu left-menu',
	  rightMenu: 'menu right-menu',
	  sender: 'menu recipient sender'
	};

	var refs = {
	  box: 'box'
	};

	var ReadScreen = function (_skoash$Screen) {
	  _inherits(ReadScreen, _skoash$Screen);

	  function ReadScreen() {
	    _classCallCheck(this, ReadScreen);

	    var _this = _possibleConstructorReturn(this, (ReadScreen.__proto__ || Object.getPrototypeOf(ReadScreen)).call(this));

	    _this.state.load = true;
	    _this.state.message = { user: {} };

	    _this.leftMenuList = [React.createElement(
	      'li',
	      { className: 'inbox', onClick: _this.goto.bind(_this, 'inbox') },
	      React.createElement('span', null)
	    )];

	    _this.rightMenuList = [React.createElement(
	      'li',
	      { className: 'reply', onClick: _this.reply.bind(_this) },
	      React.createElement('span', null)
	    )];
	    return _this;
	  }

	  _createClass(ReadScreen, [{
	    key: 'reply',
	    value: function reply() {
	      skoash.trigger('passData', {
	        name: 'add-recipient',
	        message: this.state.message.created_by
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open(opts) {
	      var message, friends, creater;

	      message = opts.message || {};

	      friends = this.props.gameState.data.user || [];
	      friends.forEach(function (friend) {
	        if (message.created_by === friend.friend_id) {
	          creater = friend;
	        }
	      });

	      this.setState({
	        load: true,
	        open: true,
	        leave: false,
	        close: false,
	        message: message,
	        creater: creater
	      });

	      this.start();

	      skoash.trigger('getData', {
	        name: 'markAsRead',
	        'skribble_id': message.skribble_id
	      });
	    }
	  }, {
	    key: 'getSenderClassNames',
	    value: function getSenderClassNames() {
	      return (0, _classnames2.default)(classNameText.sender, {
	        HIDE: !this.state.creater || this.state.message.sent
	      });
	    }
	  }, {
	    key: 'renderSender',
	    value: function renderSender() {
	      var creater,
	          content = [];

	      creater = this.state.creater;

	      if (!creater) return;

	      if (creater.username) {
	        content.push(React.createElement(
	          'span',
	          { className: 'name' },
	          creater.username
	        ));
	      }

	      if (creater._embedded.image) {
	        content.push(React.createElement('img', { className: 'profile-image', src: creater._embedded.image.url }));
	      }

	      return content;
	    }
	  }, {
	    key: 'renderBoxContent',
	    value: function renderBoxContent() {
	      var url = _.get(this.state, 'message.url');

	      if (!url) return null;

	      return [React.createElement(skoash.Image, { src: this.state.message.url }), React.createElement('div', { className: classNameText.box })];
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'ul',
	          { className: this.getSenderClassNames() },
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'span',
	              null,
	              this.renderSender()
	            )
	          )
	        ),
	        React.createElement(
	          skoash.Component,
	          { ref: refs.box, className: classNameText.skribbleBox },
	          this.renderBoxContent()
	        ),
	        React.createElement(_3.default, { className: classNameText.leftMenu, list: this.leftMenuList }),
	        React.createElement(_3.default, { className: classNameText.rightMenu, list: this.rightMenuList })
	      );
	    }
	  }]);

	  return ReadScreen;
		}(skoash.Screen);

/***/ },
/* 38 */
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

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SaveMenu = function (_skoash$Screen) {
	  _inherits(SaveMenu, _skoash$Screen);

	  function SaveMenu() {
	    _classCallCheck(this, SaveMenu);

	    return _possibleConstructorReturn(this, (SaveMenu.__proto__ || Object.getPrototypeOf(SaveMenu)).apply(this, arguments));
	  }

	  _createClass(SaveMenu, [{
	    key: "cancel",
	    value: function cancel() {
	      this.close();
	      skoash.trigger('menuClose', {
	        id: this.props.id
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { id: this.props.id, className: this.getClassNames() },
	        React.createElement(
	          "div",
	          { className: "center" },
	          React.createElement(
	            "div",
	            { className: "frame" },
	            React.createElement("button", { className: "quit-saved", onClick: this.cancel.bind(this) }),
	            React.createElement(
	              "h2",
	              null,
	              "Your progress"
	            ),
	            React.createElement(
	              "h2",
	              null,
	              "has been saved"
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return SaveMenu;
	}(skoash.Screen);

	exports.default = React.createElement(SaveMenu, {
	  id: "save"
		});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(19);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CollisionWarning = function (_skoash$Screen) {
	  _inherits(CollisionWarning, _skoash$Screen);

	  function CollisionWarning() {
	    _classCallCheck(this, CollisionWarning);

	    var _this = _possibleConstructorReturn(this, (CollisionWarning.__proto__ || Object.getPrototypeOf(CollisionWarning)).call(this));

	    _this.cancel = _this.cancel.bind(_this);
	    _this.toggle = _this.toggle.bind(_this);
	    return _this;
	  }

	  _createClass(CollisionWarning, [{
	    key: 'cancel',
	    value: function cancel() {
	      this.close();
	      skoash.trigger('menuClose', {
	        id: this.props.id
	      });
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this.updateGameState({
	        path: ['collisionWarning'],
	        data: {
	          show: !_.get(this.props.gameState, 'data.collisionWarning.show')
	        }
	      });
	    }
	  }, {
	    key: 'getToggleClassNames',
	    value: function getToggleClassNames() {
	      return (0, _classnames2.default)('toggle-collision-warning', {
	        active: !_.get(this.props.gameState, 'data.collisionWarning.show')
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { id: this.props.id, className: this.getClassNames() },
	        React.createElement(
	          'div',
	          { className: 'center' },
	          React.createElement(
	            'div',
	            { className: 'frame' },
	            React.createElement(skoash.Image, { className: 'copy', src: 'media/_CollisionWarning/text-youmustnotoverlapimgs.png' }),
	            React.createElement('button', { className: this.getToggleClassNames(), onClick: this.toggle }),
	            React.createElement('button', { className: 'close-collision-warning', onClick: this.cancel }),
	            React.createElement(skoash.Image, { className: 'otter', src: 'media/_CollisionWarning/Peeking-through-Otter.gif' })
	          )
	        )
	      );
	    }
	  }]);

	  return CollisionWarning;
	}(skoash.Screen);

	exports.default = React.createElement(CollisionWarning, {
	  id: 'collisionWarning'
		});

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = React.createElement(
	  skoash.Screen,
	  {
	    id: "limitWarning",
	    hidePrev: true,
	    hideNext: true
	  },
	  React.createElement(skoash.Image, { className: "hidden", src: ENVIRONMENT.MEDIA + 'f/a479811171cf084bf86af4eac1f6dc28' }),
	  React.createElement(skoash.Image, { className: "hidden", src: ENVIRONMENT.MEDIA + 'f/027b30f0d279ef41cd30eff22323051c' }),
	  React.createElement(skoash.Image, { className: "otter", src: ENVIRONMENT.MEDIA + 'f/e7c3a0ab64b457334e7be868609ee512' }),
	  React.createElement(skoash.Image, { className: "sign", src: ENVIRONMENT.MEDIA + 'f/7434453a4692d4be9e898b6b8787c108' }),
	  React.createElement(
	    "div",
	    null,
	    "WARNING:",
	    React.createElement("br", null),
	    "You have exceeded the number of times",
	    React.createElement("br", null),
	    "you can use this item in your message.",
	    React.createElement("br", null),
	    "Please press ok to continue game."
	  ),
	  React.createElement("button", {
	    onClick: function onClick() {
	      skoash.trigger('menuClose', {
	        id: 'limitWarning'
	      });
	    }
	  })
		);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tyaWJibGUvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDAzN2Y4ZTY0OWE1ZGM1NzRjZWUiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb25maWcuZ2FtZS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9sb2FkZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2lvc19zcGxhc2hfc2NyZWVuLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL21lbnVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvZnJpZW5kX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pdGVtX2RyYXdlci8wLjEuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvZGVjb2RlLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9jbGFzc25hbWVzL2luZGV4LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3Njcm9sbF9hcmVhLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL2NhbnZhc19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2FudmFzLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9lZGl0YWJsZV9hc3NldC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tZW51LzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL2l0ZW1fZHJhd2VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL2luYm94X3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlX3JldmVhbC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmV2ZWFsLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pbmJveC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2F2ZWRfbWVzc2FnZXMvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvcHJldmlld19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmVwZWF0ZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvc2VuZF9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2tyaWJibGUvY29tcG9uZW50cy9zZW50X3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL3JlYWRfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3F1aXRfc2NyZWVuLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL3NhdmVfbWVudS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL2NvbGxpc2lvbl93YXJuaW5nLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvbGltaXRfd2FybmluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwMDM3ZjhlNjQ5YTVkYzU3NGNlZVxuICoqLyIsIndpbmRvdy5FTlZJUk9OTUVOVCA9IHtcbiAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanNcbiAqKi8iLCJ1bmRlZmluZWRcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBcbiAqKi8iLCJpbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnLmdhbWUnO1xuXG5pbXBvcnQgTG9hZGVyIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEnO1xuXG5pbXBvcnQgaU9TU2NyZWVuIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2lvc19zcGxhc2hfc2NyZWVuLzAuMSc7XG5pbXBvcnQgVGl0bGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3RpdGxlX3NjcmVlbic7XG5pbXBvcnQgTWVudVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWVudV9zY3JlZW4nO1xuaW1wb3J0IEZyaWVuZFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZnJpZW5kX3NjcmVlbic7XG5pbXBvcnQgQ2FudmFzU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9jYW52YXNfc2NyZWVuJztcbmltcG9ydCBJdGVtRHJhd2VyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9pdGVtX2RyYXdlcl9zY3JlZW4nO1xuaW1wb3J0IEluYm94U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9pbmJveF9zY3JlZW4nO1xuaW1wb3J0IFByZXZpZXdTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByZXZpZXdfc2NyZWVuJztcbmltcG9ydCBTZW5kU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9zZW5kX3NjcmVlbic7XG5pbXBvcnQgU2VudFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvc2VudF9zY3JlZW4nO1xuaW1wb3J0IFJlYWRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlYWRfc2NyZWVuJztcblxuaW1wb3J0IFF1aXRTY3JlZW4gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4vMC4xJztcbmltcG9ydCBTYXZlTWVudSBmcm9tICcuL2NvbXBvbmVudHMvc2F2ZV9tZW51JztcbmltcG9ydCBDb2xsaXNpb25XYXJuaW5nIGZyb20gJy4vY29tcG9uZW50cy9jb2xsaXNpb25fd2FybmluZyc7XG5pbXBvcnQgTGltaXRXYXJuaW5nIGZyb20gJy4vY29tcG9uZW50cy9saW1pdF93YXJuaW5nJztcblxuY29uc3QgREVGQVVMVF9QUk9GSUxFX0lNQUdFID0gJyc7XG5cbmNsYXNzIFNrcmliYmxlR2FtZSBleHRlbmRzIHNrb2FzaC5HYW1lIHtcbiAgZ2V0UnVsZXMob3B0cyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzLnJlc3BvbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBvcHRzLnJlc3BvbmQodGhpcy5yZWZzWydzY3JlZW4tY2FudmFzJ10uZ2V0RGF0YSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVmc1snc2NyZWVuLWNhbnZhcyddLmdldERhdGEoKTtcbiAgfVxuXG4gIHNhdmUoc2tyYW1ibGUpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICB2YXIgZnJpZW5kX3RvLCBydWxlcywgc2VsZiA9IHRoaXM7XG4gICAgZnJpZW5kX3RvID0gc2VsZi5zdGF0ZS5yZWNpcGllbnQgJiYgc2VsZi5zdGF0ZS5yZWNpcGllbnQudXNlcl9pZCA/IHNlbGYuc3RhdGUucmVjaXBpZW50LnVzZXJfaWQgOiBudWxsO1xuICAgIHJ1bGVzID0gc2VsZi5nZXRSdWxlcygpO1xuICAgIHZhciBza3JpYmJsZSA9IHtcbiAgICAgICd2ZXJzaW9uJzogY29uZmlnLnZlcnNpb24sXG4gICAgICAuLi5zZWxmLnN0YXRlLnNrcmliYmxlRGF0YSxcbiAgICAgIGZyaWVuZF90byxcbiAgICAgIHNrcmFtYmxlLFxuICAgICAgcnVsZXNcbiAgICB9O1xuXG4gICAgaWYgKCFydWxlcy5iYWNrZ3JvdW5kICYmICFydWxlcy5pdGVtcy5sZW5ndGggJiYgIXJ1bGVzLm1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChKU09OLnN0cmluZ2lmeShza3JpYmJsZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuc2tyaWJibGUpKSB7XG4gICAgICBzZWxmLmVtaXQoe1xuICAgICAgICBuYW1lOiAnc2F2ZVNrcmliYmxlJyxcbiAgICAgICAgZ2FtZTogc2VsZi5jb25maWcuaWQsXG4gICAgICAgIHNrcmliYmxlLFxuICAgICAgfSkudGhlbihza3JpYmJsZURhdGEgPT4ge1xuICAgICAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgICAgICBza3JpYmJsZURhdGEsXG4gICAgICAgICAgc2tyaWJibGVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cbiAgfVxuXG4gIHNlbmQoKSB7XG4gICAgdGhpcy5zYXZlKHRydWUpO1xuXG4gICAgdGhpcy5yZWZzWydzY3JlZW4tY2FudmFzJ10ucmVzZXQoKTtcbiAgICB0aGlzLm5hdmlnYXRvci5nb3RvKHtcbiAgICAgIGluZGV4OiAnc2VudCcsXG4gICAgICByZWNpcGllbnQ6IHRoaXMuc3RhdGUucmVjaXBpZW50LFxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICByZWNpcGllbnQ6IG51bGwsXG4gICAgICBza3JpYmJsZURhdGE6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICBsb2FkU2tyaWJibGUob3B0cykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2tyaWJibGVEYXRhOiBvcHRzLm1lc3NhZ2VcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnJlZnNbJ3NjcmVlbi1jYW52YXMnXS5hZGRJdGVtcyhvcHRzLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5uYXZpZ2F0b3IuZ290byh7XG4gICAgICAgIGluZGV4OiAnY2FudmFzJyxcbiAgICAgICAgZHJhZnQ6IHRydWUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE1lZGlhKHBhdGgpIHtcbiAgICB2YXIgcGF0aEFycmF5LCBzZWxmID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcpIHBhdGggPSBwYXRoLnBhdGg7XG4gICAgcGF0aCA9IHBhdGggfHwgJ3NrcmliYmxlL21lbnUnO1xuICAgIHBhdGhBcnJheSA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICBwYXRoQXJyYXkuc2hpZnQoKTtcblxuICAgIHJldHVybiBzZWxmLmVtaXQoe1xuICAgICAgbmFtZTogJ2dldE1lZGlhJyxcbiAgICAgIHBhdGhcbiAgICB9KS50aGVuKGQgPT4ge1xuICAgICAgdmFyIG9wdHMsIGN1cnJlbnRPcHRzO1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgc2VsZi5yZWZzWydzY3JlZW4tY2FudmFzJ10uc2V0TWVudSgpO1xuICAgICAgICAgIHNlbGYucmVmc1snc2NyZWVuLWl0ZW0tZHJhd2VyJ10udXBkYXRlRGF0YSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY3VycmVudE9wdHMgPSBvcHRzLmRhdGE7XG5cbiAgICAgIHBhdGhBcnJheS5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgIGN1cnJlbnRPcHRzW2tleV0gPSB7XG4gICAgICAgICAgaXRlbXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpbmRleCAhPT0gcGF0aEFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjdXJyZW50T3B0cyA9IGN1cnJlbnRPcHRzW2tleV0uaXRlbXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjdXJyZW50T3B0c1twYXRoQXJyYXlbcGF0aEFycmF5Lmxlbmd0aCAtIDFdXSA9IF8uY2xvbmUoZCk7XG4gICAgICBjdXJyZW50T3B0c1twYXRoQXJyYXlbcGF0aEFycmF5Lmxlbmd0aCAtIDFdXS5pdGVtcyA9IHt9O1xuXG4gICAgICBpZiAoZC5pdGVtcykge1xuICAgICAgICBkLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0uYXNzZXRfdHlwZSA9PT0gJ2ZvbGRlcicgJiYgaXRlbS5uYW1lKSB7XG4gICAgICAgICAgICBzZWxmLmdldE1lZGlhKHBhdGggKyAnLycgKyBpdGVtLm5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50T3B0c1twYXRoQXJyYXlbcGF0aEFycmF5Lmxlbmd0aCAtIDFdXS5pdGVtc1tpdGVtLm5hbWVdID0gaXRlbTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZWxmLnVwZGF0ZURhdGEob3B0cyk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93Q29sbGlzaW9uV2FybmluZygpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZGF0YS5jb2xsaXNpb25XYXJuaW5nLnNob3cpIHJldHVybjtcbiAgICB0aGlzLm5hdmlnYXRvci5vcGVuTWVudSh7aWQ6ICdjb2xsaXNpb25XYXJuaW5nJ30pO1xuICB9XG5cbiAgc2hvd0xpbWl0V2FybmluZygpIHtcbiAgICB0aGlzLm5hdmlnYXRvci5vcGVuTWVudSh7aWQ6ICdsaW1pdFdhcm5pbmcnfSk7XG4gIH1cblxuICBhZGRSZWNpcGllbnQocmVjaXBpZW50LCBjYikge1xuICAgIHZhciBzcmM7XG5cbiAgICBpZiAocmVjaXBpZW50LnNyYykge1xuICAgICAgcmVjaXBpZW50LnByb2ZpbGVfaW1hZ2UgPSByZWNpcGllbnQuc3JjOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlY2lwaWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgJiYgdGhpcy5zdGF0ZS5kYXRhLnVzZXIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnVzZXIuc29tZShmcmllbmQgPT4ge1xuICAgICAgICAgIGlmIChmcmllbmQuZnJpZW5kX2lkID09PSByZWNpcGllbnQpIHtcbiAgICAgICAgICAgIHJlY2lwaWVudCA9IGZyaWVuZDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVjaXBpZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5nZXREYXRhKHtcbiAgICAgICAgbmFtZTogJ2dldEZyaWVuZCcsXG4gICAgICAgICdmcmllbmRfaWQnOiByZWNpcGllbnQsXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRSZWNpcGllbnQocmVjaXBpZW50LCBjYik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcmMgPSByZWNpcGllbnQgJiYgcmVjaXBpZW50Ll9lbWJlZGRlZCAmJiByZWNpcGllbnQuX2VtYmVkZGVkLmltYWdlICYmIHJlY2lwaWVudC5fZW1iZWRkZWQuaW1hZ2UudXJsID9cbiAgICAgICAgcmVjaXBpZW50Ll9lbWJlZGRlZC5pbWFnZS51cmwgOlxuICAgICAgICByZWNpcGllbnQucHJvZmlsZV9pbWFnZSB8fCBERUZBVUxUX1BST0ZJTEVfSU1BR0U7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcmVjaXBpZW50OiB7XG4gICAgICAgICAgJ3VzZXJfaWQnOiByZWNpcGllbnQudXNlcl9pZCB8fCByZWNpcGllbnQuZnJpZW5kX2lkLFxuICAgICAgICAgIG5hbWU6IHJlY2lwaWVudC5uYW1lIHx8IHJlY2lwaWVudC51c2VybmFtZSxcbiAgICAgICAgICBzcmMsXG4gICAgICAgICAgLy8gSSBuZWVkIHRvIGdldCB0aGUgZmxpcHMgZWFybmVkIGJhY2sgZnJvbSB0aGUgYmFja2VuZCB0byBkbyB0aGlzLlxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAvLyBkZXNjcmlwdGlvbjogZnJpZW5kLmZsaXBzX2Vhcm5lZCArICcgRmxpcHMgRWFybmVkJyxcbiAgICAgICAgICAnYXNzZXRfdHlwZSc6ICdmcmllbmQnLFxuICAgICAgICB9XG4gICAgICB9LCBjYik7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tSZWNpcGllbnQoKSB7XG4gICAgdGhpcy5uYXZpZ2F0b3IuZ290byh7XG4gICAgICBpbmRleDogJ2ZyaWVuZCcsXG4gICAgICBnb3RvOiB0aGlzLnN0YXRlLmN1cnJlbnRTY3JlZW5JbmRleCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5yZWNpcGllbnQpIHtcbiAgICAgIHRoaXMubmF2aWdhdG9yLmdvdG8oe2luZGV4OiAnY2FudmFzJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdmlnYXRvci5nb3RvKHtcbiAgICAgICAgaW5kZXg6ICdmcmllbmQnLFxuICAgICAgICBnb3RvOiAnY2FudmFzJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVCdXR0b24oKSB7XG4gICAgdGhpcy5zYXZlKCk7XG4gICAgdGhpcy5uYXZpZ2F0b3Iub3Blbk1lbnUoe2lkOiAnc2F2ZSd9KTtcbiAgfVxuXG4gIHJlbmRlclJlY2lwaWVudCgpIHtcbiAgICB2YXIgcmVjaXBpZW50ID0gdGhpcy5zdGF0ZS5yZWNpcGllbnQsIGNvbnRlbnQgPSBbXTtcblxuICAgIGlmICghcmVjaXBpZW50KSByZXR1cm47XG5cbiAgICBpZiAocmVjaXBpZW50Lm5hbWUpIHtcbiAgICAgIGNvbnRlbnQucHVzaCg8c3BhbiBjbGFzc05hbWU9XCJuYW1lXCI+e3JlY2lwaWVudC5uYW1lfTwvc3Bhbj4pO1xuICAgIH1cblxuICAgIGlmIChyZWNpcGllbnQuc3JjKSB7XG4gICAgICBjb250ZW50LnB1c2goPGltZyBjbGFzc05hbWU9XCJwcm9maWxlLWltYWdlXCIgc3JjPXtyZWNpcGllbnQuc3JjfSAvPik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbn1cblxudmFyIFNrcmliYmxlID0gKFxuICA8U2tyaWJibGVHYW1lXG4gICAgY29uZmlnPXtjb25maWd9XG4gICAgc2NyZWVucz17e1xuICAgICAgMDogaU9TU2NyZWVuLFxuICAgICAgMTogVGl0bGVTY3JlZW4sXG4gICAgICBtZW51OiBNZW51U2NyZWVuLFxuICAgICAgZnJpZW5kOiBGcmllbmRTY3JlZW4sXG4gICAgICBjYW52YXM6IENhbnZhc1NjcmVlbixcbiAgICAgICdpdGVtLWRyYXdlcic6IEl0ZW1EcmF3ZXJTY3JlZW4sXG4gICAgICBpbmJveDogSW5ib3hTY3JlZW4sXG4gICAgICBwcmV2aWV3OiBQcmV2aWV3U2NyZWVuLFxuICAgICAgc2VuZDogU2VuZFNjcmVlbixcbiAgICAgIHNlbnQ6IFNlbnRTY3JlZW4sXG4gICAgICByZWFkOiBSZWFkU2NyZWVuLFxuICAgIH19XG4gICAgbWVudXM9e3tcbiAgICAgIHF1aXQ6IFF1aXRTY3JlZW4sXG4gICAgICBzYXZlOiBTYXZlTWVudSxcbiAgICAgIGNvbGxpc2lvbldhcm5pbmc6IENvbGxpc2lvbldhcm5pbmcsXG4gICAgICBsaW1pdFdhcm5pbmc6IExpbWl0V2FybmluZyxcbiAgICB9fVxuICAgIGxvYWRlcj17PExvYWRlciAvPn1cbiAgICBhc3NldHM9e1tcbiAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPVwibWVkaWEvX090dGVyL1dhdmluZ19PdHRlcjIuZ2lmXCIgLz4sXG4gICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz1cIm1lZGlhL19PdHRlci9PcGVuLXdpZGUtT3R0ZXIyLmdpZlwiIC8+LFxuICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fT3R0ZXIvam95ZnVsLW90dGVyXzIuZ2lmXCIgLz4sXG4gICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz1cIm1lZGlhL19PdHRlci9BbnRpcGF0aW9uLU90dGVyMy5naWZcIiAvPixcbiAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPVwibWVkaWEvX090dGVyL3Byb3VkLW9mLXlvdTIuZ2lmXCIgLz4sXG4gICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz1cIm1lZGlhL19PdHRlci9QZWVraW5nLXRocm91Z2gtT3R0ZXIyLmdpZlwiIC8+LFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kLTFcIiAvPixcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZC0yXCIgLz4sXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQtM1wiIC8+LFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kLTRcIiAvPixcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZC01XCIgLz4sXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQtNlwiIC8+LFxuICAgIF19XG4gICAgb25Cb290c3RyYXA9e2Z1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZ2V0RnJpZW5kcyA9IF8udGhyb3R0bGUodGhpcy5nZXREYXRhLmJpbmQodGhpcywge25hbWU6ICdnZXRGcmllbmRzJ30pLCAxMDAwKTtcbiAgICAgIHRoaXMuZ2V0TWVkaWFPblJlYWR5ID0gXy50aHJvdHRsZSh0aGlzLmdldE1lZGlhLmJpbmQodGhpcyksIDEwMDApO1xuXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgICAgcGF0aDogWydjb2xsaXNpb25XYXJuaW5nJ10sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH19XG4gICAgb25SZWFkeT17ZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5nZXRNZWRpYU9uUmVhZHkoKTtcbiAgICAgIHRoaXMuZ2V0RnJpZW5kcygpO1xuICAgIH19XG4gICAgcmVuZGVyTWVudT17ZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdhbWUtbWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzYXZlXCIgb25DbGljaz17dGhpcy5zYXZlQnV0dG9uLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImluYm94XCIgb25DbGljaz17dGhpcy5uYXZpZ2F0b3IuZ290by5iaW5kKHRoaXMsIHtpbmRleDogJ2luYm94J30pfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjcmVhdGVcIiBvbkNsaWNrPXt0aGlzLmNyZWF0ZS5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJoZWxwXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0b3Iub3Blbk1lbnUuYmluZCh0aGlzLCB7aWQ6ICdoZWxwJ30pfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjbG9zZVwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdG9yLm9wZW5NZW51LmJpbmQodGhpcywge2lkOiAncXVpdCd9KX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibWVudSByZWNpcGllbnRcIj5cbiAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLmNsaWNrUmVjaXBpZW50LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJSZWNpcGllbnQoKX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfX1cbiAgICBnZXRHb3RvT3B0cz17ZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgIGlmIChvcHRzLmluZGV4ID09PSAnc2VuZCcpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJlY2lwaWVudCB8fCAhdGhpcy5zdGF0ZS5yZWNpcGllbnQubmFtZSkge1xuICAgICAgICAgIG9wdHMuaW5kZXggPSAnZnJpZW5kJztcbiAgICAgICAgICBvcHRzLmdvdG8gPSAnc2VuZCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvcHRzO1xuICAgIH19XG4gICAgcGFzc0RhdGE9e2Z1bmN0aW9uIChvcHRzKSB7XG4gICAgICBpZiAob3B0cy5uYW1lID09PSAnYWRkLWl0ZW0nKSB7XG4gICAgICAgIHRoaXMucmVmc1snc2NyZWVuLWNhbnZhcyddLmFkZEl0ZW0ob3B0cy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0b3IuZ290byh7IGluZGV4OiAnY2FudmFzJyB9KTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5uYW1lID09PSAnYWRkLXJlY2lwaWVudCcpIHtcbiAgICAgICAgdGhpcy5hZGRSZWNpcGllbnQob3B0cy5tZXNzYWdlLCB0aGlzLm5hdmlnYXRvci5nb3RvLmJpbmQodGhpcywgeyBpbmRleDogb3B0cy5nb3RvIHx8ICdjYW52YXMnIH0pKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5uYW1lID09PSAnc2VuZCcpIHtcbiAgICAgICAgdGhpcy5zZW5kKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMubmFtZSA9PT0gJ3Nob3dDb2xsaXNpb25XYXJuaW5nJykge1xuICAgICAgICB0aGlzLnNob3dDb2xsaXNpb25XYXJuaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMubmFtZSA9PT0gJ3Nob3dMaW1pdFdhcm5pbmcnKSB7XG4gICAgICAgIHRoaXMuc2hvd0xpbWl0V2FybmluZygpO1xuICAgICAgfVxuICAgIH19XG4gICAgZ2V0VHJpZ2dlckV2ZW50cz17ZnVuY3Rpb24gKG9wdHMgPSB7fSkge1xuICAgICAgb3B0cy5zYXZlID0gdGhpcy5zYXZlO1xuICAgICAgb3B0cy5nZXRNZWRpYSA9IHRoaXMuZ2V0TWVkaWE7XG4gICAgICBvcHRzLmdldFJ1bGVzID0gdGhpcy5nZXRSdWxlcztcbiAgICAgIG9wdHMubG9hZFNrcmliYmxlID0gdGhpcy5sb2FkU2tyaWJibGU7XG4gICAgICByZXR1cm4gb3B0cztcbiAgICB9fVxuICAgIGdldERhdGE9e2Z1bmN0aW9uIChvcHRzKSB7XG4gICAgICB2YXIgbmFtZXMgPSBbXG4gICAgICAgICdnZXRGcmllbmRzJyxcbiAgICAgICAgJ2dldEZyaWVuZCcsXG4gICAgICAgICdtYXJrQXNSZWFkJyxcbiAgICAgIF07XG5cbiAgICAgIGlmIChuYW1lcy5pbmRleE9mKG9wdHMubmFtZSkgPT09IC0xKSB7XG4gICAgICAgIG9wdHMubmFtZSA9ICdnZXREYXRhJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyLmVtaXQob3B0cykudGhlbihkYXRhID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKHtcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGNhbGxiYWNrOiBvcHRzLmNhbGxiYWNrLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH19XG4gIC8+XG4pO1xuXG5za29hc2guc3RhcnQoU2tyaWJibGUpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9za3JpYmJsZS9pbmRleC5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XG4gIGlkOiAnc2tyaWJibGUnLFxuICB2ZXJzaW9uOiAxLFxuICBza29hc2g6ICcxLjAuNScsXG4gIGRpbWVuc2lvbnM6IHtcbiAgICB3aWR0aDogMTYwMCxcbiAgICByYXRpbzogMTYgLyA5XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NrcmliYmxlL2NvbmZpZy5nYW1lLmpzXG4gKiovIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImxvYWRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyb3VwXCI+XG4gICAgICAgICAgPGgyPkxvYWRpbmchPC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lciBhbmltYXRlZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9sb2FkZXIvMC4xLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxza29hc2guU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJpb3Mtc3BsYXNoXCJcbiAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgY29tcGxldGVEZWxheT17NjAwMH1cbiAgICAgIG5leHREZWxheT17MzAwMH1cbiAgICAgIGNvbXBsZXRlT25TdGFydFxuICAgICAgaGlkZVByZXZcbiAgICA+XG4gICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz1cIi4uL3NoYXJlZC9pbWFnZXMvaW9zX3N0YXJ0X2JhbGwucG5nXCIgLz5cbiAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPVwiLi4vc2hhcmVkL2ltYWdlcy9pb3Nfc3RhcnRfYmFsbF9hbmltLmdpZlwiIC8+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiAoXG4gICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cInRpdGxlXCJcbiAgICAgIGhpZGVQcmV2XG4gICAgICBuZXh0RGVsYXk9ezEwMDB9XG4gICAgICBuZXh0SW5kZXg9XCJtZW51XCJcbiAgICA+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIHJlZj1cInRpdGxlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwidGl0bGUgYW5pbWF0ZWRcIlxuICAgICAgICBzcmM9XCJtZWRpYS9fVGl0bGUvU0tyaWJibGVfdGl0bGUucG5nXCJcbiAgICAgIC8+XG4gICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIHJlZj1cInBsYXlcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBzcmM9XCJtZWRpYS9fQnV0dG9ucy9za3JpYmJsZS1wbGF5LTAxLnBuZ1wiXG4gICAgICAvPlxuICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICByZWY9XCJwbGF5LWhvdmVyXCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPVwibWVkaWEvX0J1dHRvbnMvc2tyaWJibGUtaG92ZXIucG5nXCJcbiAgICAgIC8+XG4gICAgPC9za29hc2guU2NyZWVuPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qc1xuICoqLyIsImNsYXNzIE1lbnVTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fQmFja2dyb3VuZC9TS19CS0dfMS5wbmdcIiAvPlxuICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cIm90dGVyXCIgc3JjPVwibWVkaWEvX090dGVyL1dhdmluZ19PdHRlcjIuZ2lmXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWJibGVcIj5cbiAgICAgICAgICBIaSB0aGVyZSE8YnIvPlxuICAgICAgICAgIFdoYXQgd291bGQgeW91PGJyLz5cbiAgICAgICAgICBsaWtlIHRvIGRvIHRvZGF5P1xuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJtYWtlXCIgb25DbGljaz17dGhpcy5nb3RvLmJpbmQodGhpcywge1xuICAgICAgICAgICAgaW5kZXg6ICdmcmllbmQnLFxuICAgICAgICAgICAgZ290bzogJ2NhbnZhcycsXG4gICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZWFkXCIgb25DbGljaz17dGhpcy5nb3RvLmJpbmQodGhpcywgJ2luYm94Jyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiAoXG4gICAgPE1lbnVTY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cIm1lbnVcIlxuICAgICAgaGlkZVByZXZcbiAgICAgIGhpZGVOZXh0XG4gICAgICBsb2FkXG4gICAgLz5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2tyaWJibGUvY29tcG9uZW50cy9tZW51X3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBJdGVtRHJhd2VyIGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2l0ZW1fZHJhd2VyLzAuMS5qcyc7XG5cbmNvbnN0IERFRkFVTFRfUFJPRklMRV9JTUFHRSA9ICdodHRwczovL2NoYW5nZW15d29ybGRub3cuY29tL2ZmNTBmYTMyOWVkYzhhMWQ2NGFkZDYzYzgzOWZlNTQxLnBuZyc7XG5cbmNsYXNzIEZyaWVuZFNjcmVlbiBleHRlbmRzIHNrb2FzaC5TY3JlZW4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxvYWQ6IHRydWUsXG4gICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgIHJlY2lwaWVudDoge30sXG4gICAgICBvcHRzOiB7fSxcbiAgICB9O1xuICB9XG5cbiAgc2VsZWN0UmVzcG9uZChtZXNzYWdlKSB7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ3Bhc3NEYXRhJywge1xuICAgICAgbmFtZTogJ2FkZC1yZWNpcGllbnQnLFxuICAgICAgZ290bzogdGhpcy5zdGF0ZS5vcHRzLmdvdG8sXG4gICAgICBtZXNzYWdlXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEYXRhKGQpIHtcbiAgICB2YXIgZGF0YSA9IGQgJiYgZC51c2VyID8gZC51c2VyIDogdGhpcy5wcm9wcy5nYW1lU3RhdGUuZGF0YS51c2VyIHx8IFtdO1xuXG4gICAgZGF0YSA9IGRhdGEubWFwKGZyaWVuZCA9PiB7XG4gICAgICB2YXIgc3JjID0gZnJpZW5kLl9lbWJlZGRlZC5pbWFnZSAmJiBmcmllbmQuX2VtYmVkZGVkLmltYWdlLnVybCA/XG4gICAgICAgIGZyaWVuZC5fZW1iZWRkZWQuaW1hZ2UudXJsIDpcbiAgICAgICAgREVGQVVMVF9QUk9GSUxFX0lNQUdFO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3VzZXJfaWQnOiBmcmllbmQuZnJpZW5kX2lkLFxuICAgICAgICBuYW1lOiBmcmllbmQudXNlcm5hbWUsXG4gICAgICAgIHNyYyxcbiAgICAgICAgLy8gSSBuZWVkIHRvIGdldCB0aGUgZmxpcHMgZWFybmVkIGJhY2sgZnJvbSB0aGUgYmFja2VuZCB0byBkbyB0aGlzLlxuICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgIC8vIGRlc2NyaXB0aW9uOiBmcmllbmQuZmxpcHNfZWFybmVkICsgJyBGbGlwcyBFYXJuZWQnLFxuICAgICAgICAnYXNzZXRfdHlwZSc6ICdmcmllbmQnLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4ob3B0cykge1xuICAgIHZhciByZWNpcGllbnQsIHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZi51cGRhdGVEYXRhKCk7XG5cbiAgICBza29hc2gudHJpZ2dlcignZ2V0RGF0YScsIHtcbiAgICAgIG5hbWU6ICdnZXRGcmllbmRzJ1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBzZWxmLnVwZGF0ZURhdGEuY2FsbChzZWxmLCBkYXRhKTtcbiAgICB9KTtcblxuICAgIHJlY2lwaWVudCA9IHNlbGYucHJvcHMuZ2FtZVN0YXRlLnJlY2lwaWVudDtcblxuICAgIHNlbGYuc2V0U3RhdGUoe1xuICAgICAgbG9hZDogdHJ1ZSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBsZWF2ZTogZmFsc2UsXG4gICAgICBjbG9zZTogZmFsc2UsXG4gICAgICByZWNpcGllbnQsXG4gICAgICBvcHRzLFxuICAgIH0sICgpID0+IHtcbiAgICAgIHNlbGYucmVmcy5kcmF3ZXIgJiYgc2VsZi5yZWZzLmRyYXdlci5zdGFydCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzZWxmLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgIHNlbGYuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICBzdWdnZXN0RnJpZW5kcygpIHtcbiAgICB3aW5kb3cub3Blbih3aW5kb3cubG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoJ2dhbWVzLScsICcnKSArICcvZnJpZW5kcy9zdWdnZXN0ZWQnKTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ2dvdG8nLCB7XG4gICAgICBpbmRleDogJ2NhbnZhcycsXG4gICAgfSk7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ29wZW5NZW51Jywge2lkOiAnc2F2ZSd9KTtcbiAgfVxuXG4gIHJlbmRlck90dGVyKCkge1xuICAgIHZhciBjb3B5LCBzcmMsIGltYWdlU3JjO1xuXG4gICAgc3JjID0gJ09uZSc7XG4gICAgaW1hZ2VTcmMgPSAnbWVkaWEvX090dGVyL090dGVyX1N0YXRpY19HcmVldGluZ09uZS5wbmcnO1xuICAgIGNvcHkgPSAoXG4gICAgICA8c3Bhbj5cbiAgICAgICAgRG9uJ3QgaGF2ZTxici8+IGZyaWVuZHMgeWV0Pzxici8+PGJyLz4gTGV0IG1lIHN1Z2dlc3Q8YnIvPiBzb21lIGZvciB5b3UuXG4gICAgICA8L3NwYW4+XG4gICAgKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgJiYgdGhpcy5zdGF0ZS5kYXRhLmxlbmd0aCkge1xuICAgICAgc3JjID0gJ1R3byc7XG4gICAgICBpbWFnZVNyYyA9ICdtZWRpYS9fT3R0ZXIvT3Blbi13aWRlLU90dGVyMi5naWYnO1xuICAgICAgY29weSA9IChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgTGV0IG1lIGZpbmQgYSBmcmllbmQ8YnIvPiB0byBzZW5kIHlvdXIgbWVzc2FnZSB0by5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydvdHRlci1jb250YWluZXIgJyArIHNyY30+XG4gICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwib3R0ZXJcIiBzcmM9e2ltYWdlU3JjfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1YmJsZVwiPlxuICAgICAgICAgIHtjb3B5fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJGcmllbmRzKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgJiYgdGhpcy5zdGF0ZS5kYXRhLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEl0ZW1EcmF3ZXJcbiAgICAgICAgICByZWY9XCJkcmF3ZXJcIlxuICAgICAgICAgIHNjcm9sbGJhckltZz1cIi4vbWVkaWEvX0J1dHRvbnMvc2tfYnRuX3NsaWRlci5wbmdcIlxuICAgICAgICAgIHNlbGVjdFJlc3BvbmQ9e3RoaXMuc2VsZWN0UmVzcG9uZC5iaW5kKHRoaXMpfVxuICAgICAgICAgIGNhbmNlbFJlc3BvbmQ9e3RoaXMuYmFja31cbiAgICAgICAgICBjYXRlZ29yaWVzPXt0aGlzLnN0YXRlLm9wdHMuY2F0ZWdvcmllc31cbiAgICAgICAgICBkYXRhPXt0aGlzLnN0YXRlLmRhdGF9XG4gICAgICAgICAgc2VsZWN0ZWRJdGVtPXt0aGlzLnN0YXRlLnJlY2lwaWVudH1cbiAgICAgICAgICBidXR0b25zPXt0aGlzLmJ1dHRvbnN9XG4gICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgIGNsYXNzTmFtZT17J2dvdG8tJyArIHRoaXMuc3RhdGUub3B0cy5nb3RvfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydnb3RvLScgKyB0aGlzLnN0YXRlLm9wdHMuZ290b30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1kcmF3ZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWdnZXN0LWZyaWVuZHMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjb250aW51ZVwiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0UmVzcG9uZC5iaW5kKHRoaXMsIHt9KX0gLz5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3VnZ2VzdFwiIG9uQ2xpY2s9e3RoaXMuc3VnZ2VzdEZyaWVuZHN9IC8+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNhdmUtdG8tZHJhZnRzXCIgb25DbGljaz17dGhpcy5zYXZlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiIC8+XG4gICAgICAgIHt0aGlzLnJlbmRlck90dGVyKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckZyaWVuZHMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxGcmllbmRTY3JlZW5cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHJlZj17cmVmfVxuICAgICAga2V5PXtrZXl9XG4gICAgICBpZD1cImZyaWVuZHNcIlxuICAgICAgY29tcGxldGVPblN0YXJ0XG4gICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgIGhpZGVOZXh0XG4gICAgICBoaWRlUHJldlxuICAgIC8+XG4gICk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvZnJpZW5kX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBTZWxlY3RhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xJztcbmltcG9ydCBTY3JvbGxBcmVhIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3Njcm9sbF9hcmVhLzAuMSc7XG5cbmNsYXNzIEl0ZW1EcmF3ZXIgZXh0ZW5kcyBTZWxlY3RhYmxlIHtcbiAgc3RhcnQoKSB7XG4gICAgdmFyIGl0ZW1zLCBzZWxlY3RlZEl0ZW0sIHNlbGVjdENsYXNzLCBzZWxlY3RGdW5jdGlvbiwgY2xhc3NlcyA9IHt9LCBzZWxmID0gdGhpcztcblxuICAgIHNlbGVjdENsYXNzID0gdGhpcy5wcm9wcy5zZWxlY3RDbGFzcyB8fCB0aGlzLnN0YXRlLnNlbGVjdENsYXNzIHx8ICdTRUxFQ1RFRCc7XG4gICAgc2VsZWN0RnVuY3Rpb24gPSBzZWxlY3RDbGFzcyA9PT0gJ0hJR0hMSUdIVEVEJyA/IHRoaXMuaGlnaGxpZ2h0IDogdGhpcy5zZWxlY3Q7XG5cbiAgICBpdGVtcyA9IHNlbGYucHJvcHMuZGF0YSB8fCBbXTtcblxuICAgIGlmIChzZWxmLnN0YXRlLmNhdGVnb3J5ICYmIGl0ZW1zW3NlbGYuc3RhdGUuY2F0ZWdvcnldKSB7XG4gICAgICBpdGVtcyA9IGl0ZW1zW3NlbGYuc3RhdGUuY2F0ZWdvcnldLml0ZW1zO1xuICAgIH1cblxuICAgIHNlbGVjdGVkSXRlbSA9IEpTT04uc3RyaW5naWZ5KHNlbGYucHJvcHMuc2VsZWN0ZWRJdGVtKTtcblxuICAgIF8uZWFjaChpdGVtcywgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKHNlbGYucHJvcHMuc2VsZWN0ZWRJdGVtICYmIEpTT04uc3RyaW5naWZ5KGl0ZW0pID09PSBzZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgY2xhc3Nlc1trZXldID0gc2VsZWN0Q2xhc3M7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RPblN0YXJ0KSB7XG4gICAgICBjbGFzc2VzW3RoaXMucHJvcHMuc2VsZWN0T25TdGFydF0gPSBzZWxlY3RDbGFzcztcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN0YXJ0ZWQ6IHRydWUsXG4gICAgICBjbGFzc2VzLFxuICAgICAgc2VsZWN0Q2xhc3MsXG4gICAgICBzZWxlY3RGdW5jdGlvbixcbiAgICAgIGNhdGVnb3J5TmFtZTogJycsXG4gICAgICBjYXRlZ29yeTogJycsXG4gICAgfSk7XG5cbiAgICBfLmVhY2goc2VsZi5yZWZzLCByZWYgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZWYuc3RhcnQgPT09ICdmdW5jdGlvbicpIHJlZi5zdGFydCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0SGVscGVyKGUpIHtcbiAgICB2YXIgbGksIG1lc3NhZ2UsIGtleSwgdHlwZSwgY2F0ZWdvcnlOYW1lLCBjbGFzc2VzID0gW107XG5cbiAgICBsaSA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG4gICAgaWYgKCFsaSkgcmV0dXJuO1xuXG4gICAga2V5ID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuICAgIGlmICghdGhpcy5yZWZzW2tleV0pIHJldHVybjtcblxuICAgIHR5cGUgPSB0aGlzLnJlZnNba2V5XS5wcm9wcy5pdGVtLmFzc2V0X3R5cGU7XG4gICAgaWYgKCF0eXBlKSByZXR1cm47XG5cbiAgICBpZiAodHlwZSA9PT0gJ2ZvbGRlcicpIHtcbiAgICAgIGNhdGVnb3J5TmFtZSA9IHRoaXMucmVmc1trZXldLnByb3BzLml0ZW0ubmFtZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjYXRlZ29yeToga2V5LFxuICAgICAgICBjYXRlZ29yeU5hbWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlID0gdGhpcy5yZWZzW2tleV0ucHJvcHMuaXRlbTtcbiAgICAgIGNsYXNzZXNba2V5XSA9IHRoaXMucHJvcHMuc2VsZWN0Q2xhc3M7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBjbGFzc2VzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0QnV0dG9uKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5zZWxlY3RSZXNwb25kID09PSAnZnVuY3Rpb24nICYmIHRoaXMuc3RhdGUubWVzc2FnZSkge1xuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RSZXNwb25kKHRoaXMuc3RhdGUubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgY29udGludWVCdXR0b24oKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnNlbGVjdFJlc3BvbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0UmVzcG9uZCh7fSk7XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsQnV0dG9uKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5jYW5jZWxSZXNwb25kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnByb3BzLmNhbmNlbFJlc3BvbmQuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBnZXRDYXRlZ29yeSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jYXRlZ29yeU5hbWUgfHwgdGhpcy5wcm9wcy5jYXRlZ29yeU5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLmNhdGVnb3J5TmFtZSB8fCB0aGlzLnByb3BzLmNhdGVnb3J5TmFtZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5jYXRlZ29yaWVzICYmIHRoaXMucHJvcHMuY2F0ZWdvcmllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNhdGVnb3JpZXNbdGhpcy5wcm9wcy5jYXRlZ29yaWVzLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKHtcbiAgICAgICdBTlNXRVJFRCc6IF8udmFsdWVzKHRoaXMuc3RhdGUuY2xhc3NlcykuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdENsYXNzKSAhPT0gLTFcbiAgICB9LCB0aGlzLnByb3BzLmNsYXNzTmFtZSwgJ2l0ZW0tZHJhd2VyLWNvbXBvbmVudCcpO1xuICB9XG5cbiAgZ2V0VUxDbGFzcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcygnaXRlbS1kcmF3ZXInLCB7XG4gICAgICBDT01QTEVURTogdGhpcy5zdGF0ZS5jb21wbGV0ZSxcbiAgICB9LCB0aGlzLnByb3BzLmNhdGVnb3JpZXMgPyB0aGlzLnByb3BzLmNhdGVnb3JpZXMuam9pbignICcpIDogJycpO1xuICB9XG5cbiAgZ2V0Q2xhc3Moa2V5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXModGhpcy5zdGF0ZS5jbGFzc2VzW2tleV0gfHwgJycsIHtcbiAgICAgIHdoaXRlOiBpdGVtICYmIGl0ZW0ubmFtZSAmJiBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKVtpdGVtLm5hbWUubGVuZ3RoIC0gMV0gPT09ICd3JyxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckJ1dHRvbnMoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNlbGVjdFwiIG9uQ2xpY2s9e3RoaXMuc2VsZWN0QnV0dG9uLmJpbmQodGhpcyl9IC8+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY29udGludWVcIiBvbkNsaWNrPXt0aGlzLmNvbnRpbnVlQnV0dG9uLmJpbmQodGhpcyl9IC8+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY2FuY2VsXCIgb25DbGljaz17dGhpcy5jYW5jZWxCdXR0b24uYmluZCh0aGlzKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJJdGVtQ29udGVudChpdGVtKSB7XG4gICAgdmFyIGNvbnRlbnQgPSBbXSwgc3JjO1xuXG4gICAgaWYgKGl0ZW0uc3JjIHx8IGl0ZW0udGh1bWIpIHtcbiAgICAgIHNyYyA9IGl0ZW0udGh1bWIgfHwgaXRlbS5zcmM7XG4gICAgfSBlbHNlIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICBpZiAoIV8uaXNBcnJheShpdGVtLml0ZW1zKSkge1xuICAgICAgICBpdGVtLml0ZW1zID0gXy52YWx1ZXMoaXRlbS5pdGVtcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtLml0ZW1zWzBdKSB7XG4gICAgICAgIHNyYyA9IGl0ZW0uaXRlbXNbMF0udGh1bWIgfHwgaXRlbS5pdGVtc1swXS5zcmM7XG4gICAgICB9XG5cbiAgICAgIGlmICghc3JjKSB7XG4gICAgICAgIHNyYyA9IF8uZmluZChpdGVtLml0ZW1zLCBzdWJpdGVtID0+IHtcbiAgICAgICAgICBpZiAoc3ViaXRlbS5uYW1lID09PSAnX3RodW1iJykgcmV0dXJuIHN1Yml0ZW0udGh1bWIgfHwgc3ViaXRlbS5zcmM7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIGNvbnRlbnQucHVzaCg8c2tvYXNoLkltYWdlIHNyYz17c3JjfSBrZXk9ezB9IC8+KTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbS5uYW1lICYmIChpdGVtLmFzc2V0X3R5cGUgPT09ICdmb2xkZXInIHx8IGl0ZW0uYXNzZXRfdHlwZSA9PT0gJ2ZyaWVuZCcpKSB7XG4gICAgICBjb250ZW50LnB1c2goPHNwYW4gY2xhc3NOYW1lPVwibmFtZVwiIGtleT17MX0+e2l0ZW0ubmFtZX08L3NwYW4+KTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbS5kZXNjcmlwdGlvbikge1xuICAgICAgY29udGVudC5wdXNoKDxzcGFuIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCIga2V5PXsyfT57aXRlbS5kZXNjcmlwdGlvbn08L3NwYW4+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIHJlbmRlckxpc3QoKSB7XG4gICAgdmFyIGl0ZW1zLCBzZWxmID0gdGhpcztcblxuICAgIGlmICghdGhpcy5wcm9wcy5kYXRhKSByZXR1cm47XG5cbiAgICBpdGVtcyA9IHRoaXMucHJvcHMuZGF0YTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmNhdGVnb3J5ICYmIGl0ZW1zW3RoaXMuc3RhdGUuY2F0ZWdvcnldKSB7XG4gICAgICBpdGVtcyA9IGl0ZW1zW3RoaXMuc3RhdGUuY2F0ZWdvcnldLml0ZW1zO1xuICAgIH1cblxuICAgIGlmICghXy5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgaXRlbXMgPSBfLnZhbHVlcyhpdGVtcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHZhciBhVmFsID0gIV8uaXNOYU4od2luZG93LnBhcnNlSW50KGEub3JkZXIpKSA/IHdpbmRvdy5wYXJzZUludChhLm9yZGVyKSA6IEluZmluaXR5O1xuICAgICAgdmFyIGJWYWwgPSAhXy5pc05hTih3aW5kb3cucGFyc2VJbnQoYi5vcmRlcikpID8gd2luZG93LnBhcnNlSW50KGIub3JkZXIpIDogSW5maW5pdHk7XG4gICAgICBpZiAoYVZhbCA9PT0gYlZhbCkge1xuICAgICAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIGlmIChhVmFsIDwgYlZhbCkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSkuZmlsdGVyKGl0ZW0gPT5cbiAgICAgIGl0ZW0ubmFtZSAhPT0gJ190aHVtYidcbiAgICApLm1hcCgoaXRlbSwga2V5KSA9PlxuICAgICAgPHNrb2FzaC5MaXN0SXRlbVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBpdGVtKX1cbiAgICAgICAgcmVmPXtrZXl9XG4gICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgIGtleT17c2hvcnRpZC5nZW5lcmF0ZSgpfVxuICAgICAgPlxuICAgICAgICB7c2VsZi5yZW5kZXJJdGVtQ29udGVudChpdGVtKX1cbiAgICAgIDwvc2tvYXNoLkxpc3RJdGVtPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1kcmF3ZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPnt0aGlzLmdldENhdGVnb3J5KCl9PC9oMj5cbiAgICAgICAgICA8U2Nyb2xsQXJlYSByZWY9XCJzY3JvbGwtYXJlYVwiIGltZz17dGhpcy5wcm9wcy5zY3JvbGxiYXJJbWd9PlxuICAgICAgICAgICAgPHVsIHJlZj1cImxpc3RcIiBjbGFzc05hbWU9e3RoaXMuZ2V0VUxDbGFzcygpfSBvbkNsaWNrPXt0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvU2Nyb2xsQXJlYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0aGlzLnJlbmRlckJ1dHRvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSXRlbURyYXdlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgc2Nyb2xsYmFySW1nOiAnJyxcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICB2YXIgaXRlbXMsIHF1aWNrQ2hlY2ssIGl0ZW1zQ2hhbmdlZDtcblxuICAgIGl0ZW1zID0gbmV4dFByb3BzLmRhdGEgfHwgW107XG4gICAgaWYgKG5leHRTdGF0ZS5jYXRlZ29yeSAmJiBpdGVtc1tuZXh0U3RhdGUuY2F0ZWdvcnldKSB7XG4gICAgICBpdGVtcyA9IGl0ZW1zW25leHRTdGF0ZS5jYXRlZ29yeV0uaXRlbXM7XG4gICAgfVxuXG4gICAgcXVpY2tDaGVjayA9IF8ucmVkdWNlKGl0ZW1zLCAoYSwgaSkgPT4gYSArIGkubmFtZSwgJycpO1xuXG4gICAgaXRlbXNDaGFuZ2VkID0gdGhpcy5xdWlja0NoZWNrICE9PSBxdWlja0NoZWNrO1xuICAgIGlmIChpdGVtc0NoYW5nZWQpIHRoaXMucXVpY2tDaGVjayA9IHF1aWNrQ2hlY2s7XG5cbiAgICByZXR1cm4gaXRlbXNDaGFuZ2VkIHx8IChKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmNsYXNzZXMpICE9PSBKU09OLnN0cmluZ2lmeShuZXh0U3RhdGUuY2xhc3NlcykpO1xuICB9LFxufSwgU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBJdGVtRHJhd2VyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pdGVtX2RyYXdlci8wLjEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vc2hvcnRpZC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciBlbmNvZGUgPSByZXF1aXJlKCcuL2VuY29kZScpO1xudmFyIGRlY29kZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG52YXIgaXNWYWxpZCA9IHJlcXVpcmUoJy4vaXMtdmFsaWQnKTtcblxuLy8gSWdub3JlIGFsbCBtaWxsaXNlY29uZHMgYmVmb3JlIGEgY2VydGFpbiB0aW1lIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiB0aGUgZGF0ZSBlbnRyb3B5IHdpdGhvdXQgc2FjcmlmaWNpbmcgdW5pcXVlbmVzcy5cbi8vIFRoaXMgbnVtYmVyIHNob3VsZCBiZSB1cGRhdGVkIGV2ZXJ5IHllYXIgb3Igc28gdG8ga2VlcCB0aGUgZ2VuZXJhdGVkIGlkIHNob3J0LlxuLy8gVG8gcmVnZW5lcmF0ZSBgbmV3IERhdGUoKSAtIDBgIGFuZCBidW1wIHRoZSB2ZXJzaW9uLiBBbHdheXMgYnVtcCB0aGUgdmVyc2lvbiFcbnZhciBSRURVQ0VfVElNRSA9IDE0NTk3MDc2MDY1MTg7XG5cbi8vIGRvbid0IGNoYW5nZSB1bmxlc3Mgd2UgY2hhbmdlIHRoZSBhbGdvcyBvciBSRURVQ0VfVElNRVxuLy8gbXVzdCBiZSBhbiBpbnRlZ2VyIGFuZCBsZXNzIHRoYW4gMTZcbnZhciB2ZXJzaW9uID0gNjtcblxuLy8gaWYgeW91IGFyZSB1c2luZyBjbHVzdGVyIG9yIG11bHRpcGxlIHNlcnZlcnMgdXNlIHRoaXMgdG8gbWFrZSBlYWNoIGluc3RhbmNlXG4vLyBoYXMgYSB1bmlxdWUgdmFsdWUgZm9yIHdvcmtlclxuLy8gTm90ZTogSSBkb24ndCBrbm93IGlmIHRoaXMgaXMgYXV0b21hdGljYWxseSBzZXQgd2hlbiB1c2luZyB0aGlyZFxuLy8gcGFydHkgY2x1c3RlciBzb2x1dGlvbnMgc3VjaCBhcyBwbTIuXG52YXIgY2x1c3RlcldvcmtlcklkID0gcmVxdWlyZSgnLi91dGlsL2NsdXN0ZXItd29ya2VyLWlkJykgfHwgMDtcblxuLy8gQ291bnRlciBpcyB1c2VkIHdoZW4gc2hvcnRpZCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gb25lIHNlY29uZC5cbnZhciBjb3VudGVyO1xuXG4vLyBSZW1lbWJlciB0aGUgbGFzdCB0aW1lIHNob3J0aWQgd2FzIGNhbGxlZCBpbiBjYXNlIGNvdW50ZXIgaXMgbmVlZGVkLlxudmFyIHByZXZpb3VzU2Vjb25kcztcblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gUkVEVUNFX1RJTUUpICogMC4wMDEpO1xuXG4gICAgaWYgKHNlY29uZHMgPT09IHByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIHByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgdmVyc2lvbik7XG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgY2x1c3RlcldvcmtlcklkKTtcbiAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgY291bnRlcik7XG4gICAgfVxuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIHNlY29uZHMpO1xuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuXG4vKipcbiAqIFNldCB0aGUgc2VlZC5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBpZiB5b3UgZG9uJ3Qgd2FudCBwZW9wbGUgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgeW91ciBpZCBzY2hlbWEuXG4gKiBleHBvc2VkIGFzIHNob3J0aWQuc2VlZChpbnQpXG4gKiBAcGFyYW0gc2VlZCBJbnRlZ2VyIHZhbHVlIHRvIHNlZWQgdGhlIHJhbmRvbSBhbHBoYWJldC4gIEFMV0FZUyBVU0UgVEhFIFNBTUUgU0VFRCBvciB5b3UgbWlnaHQgZ2V0IG92ZXJsYXBzLlxuICovXG5mdW5jdGlvbiBzZWVkKHNlZWRWYWx1ZSkge1xuICAgIGFscGhhYmV0LnNlZWQoc2VlZFZhbHVlKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjbHVzdGVyIHdvcmtlciBvciBtYWNoaW5lIGlkXG4gKiBleHBvc2VkIGFzIHNob3J0aWQud29ya2VyKGludClcbiAqIEBwYXJhbSB3b3JrZXJJZCB3b3JrZXIgbXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyLiAgTnVtYmVyIGxlc3MgdGhhbiAxNiBpcyByZWNvbW1lbmRlZC5cbiAqIHJldHVybnMgc2hvcnRpZCBtb2R1bGUgc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gKi9cbmZ1bmN0aW9uIHdvcmtlcih3b3JrZXJJZCkge1xuICAgIGNsdXN0ZXJXb3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKlxuICogc2V0cyBuZXcgY2hhcmFjdGVycyB0byB1c2UgaW4gdGhlIGFscGhhYmV0XG4gKiByZXR1cm5zIHRoZSBzaHVmZmxlZCBhbHBoYWJldFxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpIHtcbiAgICBpZiAobmV3Q2hhcmFjdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFscGhhYmV0LmNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFscGhhYmV0LnNodWZmbGVkKCk7XG59XG5cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3Nob3J0aWQvbGliL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9zaG9ydGlkL2xpYi9hbHBoYWJldC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tQnl0ZSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG5cbmZ1bmN0aW9uIGVuY29kZShsb29rdXAsIG51bWJlcikge1xuICAgIHZhciBsb29wQ291bnRlciA9IDA7XG4gICAgdmFyIGRvbmU7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgc3RyID0gc3RyICsgbG9va3VwKCAoIChudW1iZXIgPj4gKDQgKiBsb29wQ291bnRlcikpICYgMHgwZiApIHwgcmFuZG9tQnl0ZSgpICk7XG4gICAgICAgIGRvbmUgPSBudW1iZXIgPCAoTWF0aC5wb3coMTYsIGxvb3BDb3VudGVyICsgMSApICk7XG4gICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3Nob3J0aWQvbGliL2VuY29kZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG5mdW5jdGlvbiByYW5kb21CeXRlKCkge1xuICAgIGlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpICYgMHgzMDtcbiAgICB9XG4gICAgdmFyIGRlc3QgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGRlc3QpO1xuICAgIHJldHVybiBkZXN0WzBdICYgMHgzMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tYnl0ZS1icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuLyoqXG4gKiBEZWNvZGUgdGhlIGlkIHRvIGdldCB0aGUgdmVyc2lvbiBhbmQgd29ya2VyXG4gKiBNYWlubHkgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZy5cbiAqIEBwYXJhbSBpZCAtIHRoZSBzaG9ydGlkLWdlbmVyYXRlZCBpZC5cbiAqL1xuZnVuY3Rpb24gZGVjb2RlKGlkKSB7XG4gICAgdmFyIGNoYXJhY3RlcnMgPSBhbHBoYWJldC5zaHVmZmxlZCgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHZlcnNpb246IGNoYXJhY3RlcnMuaW5kZXhPZihpZC5zdWJzdHIoMCwgMSkpICYgMHgwZixcbiAgICAgICAgd29ya2VyOiBjaGFyYWN0ZXJzLmluZGV4T2YoaWQuc3Vic3RyKDEsIDEpKSAmIDB4MGZcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9zaG9ydGlkL2xpYi9kZWNvZGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBjaGFyYWN0ZXJzID0gYWxwaGFiZXQuY2hhcmFjdGVycygpO1xuICAgIHZhciBsZW4gPSBpZC5sZW5ndGg7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjtpKyspIHtcbiAgICAgICAgaWYgKGNoYXJhY3RlcnMuaW5kZXhPZihpZFtpXSkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaG9ydElkO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAwO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBTZWxlY3RhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzZWxlY3RGdW5jdGlvbjogdGhpcy5zZWxlY3QsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICB2YXIgc2VsZWN0Q2xhc3MsIHNlbGVjdEZ1bmN0aW9uLCBjbGFzc2VzID0ge307XG5cbiAgICBzZWxlY3RDbGFzcyA9IHRoaXMucHJvcHMuc2VsZWN0Q2xhc3MgfHwgdGhpcy5zdGF0ZS5zZWxlY3RDbGFzcyB8fCAnU0VMRUNURUQnO1xuICAgIHNlbGVjdEZ1bmN0aW9uID0gc2VsZWN0Q2xhc3MgPT09ICdISUdITElHSFRFRCcgPyB0aGlzLmhpZ2hsaWdodCA6IHRoaXMuc2VsZWN0O1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0T25TdGFydCkge1xuICAgICAgY2xhc3Nlc1t0aGlzLnByb3BzLnNlbGVjdE9uU3RhcnRdID0gc2VsZWN0Q2xhc3M7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFydGVkOiB0cnVlLFxuICAgICAgY2xhc3NlcyxcbiAgICAgIHNlbGVjdEZ1bmN0aW9uLFxuICAgICAgc2VsZWN0Q2xhc3MsXG4gICAgfSk7XG4gIH1cblxuICBib290c3RyYXAoKSB7XG4gICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgY29ycmVjdEFuc3dlcnMgPSB0aGlzLnJlcXVpcmVGb3JDb21wbGV0ZS5maWx0ZXIoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHNlbGYucmVmc1tyZWZdLnByb3BzLmNvcnJlY3Q7XG4gICAgfSk7XG5cbiAgICBpZiAoY29ycmVjdEFuc3dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZXF1aXJlRm9yQ29tcGxldGUgPSBjb3JyZWN0QW5zd2VycztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWZzLmJpbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxpc3Q6IHRoaXMucmVmcy5iaW4uZ2V0QWxsKClcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKSB7XG4gICAgdmFyIHJlZiwgZGF0YVJlZiwgdGFyZ2V0LCBpZCwgaXNDb3JyZWN0LCBzZWxmID0gdGhpcztcblxuICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG5cbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgZGF0YVJlZiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVmJyk7XG4gICAgcmVmID0gc2VsZi5yZWZzW2RhdGFSZWZdO1xuXG4gICAgaXNDb3JyZWN0ID0gKHJlZiAmJiByZWYucHJvcHMgJiYgcmVmLnByb3BzLmNvcnJlY3QpIHx8ICghc2VsZi5wcm9wcy5hbnN3ZXJzIHx8ICFzZWxmLnByb3BzLmFuc3dlcnMubGVuZ3RoIHx8IHNlbGYucHJvcHMuYW5zd2Vycy5pbmRleE9mKGRhdGFSZWYpICE9PSAtMSk7XG5cbiAgICBpZiAoc2VsZi5wcm9wcy5hbGxvd0Rlc2VsZWN0ICYmIGNsYXNzZXNbZGF0YVJlZl0pIHtcbiAgICAgIGRlbGV0ZSBjbGFzc2VzW2RhdGFSZWZdO1xuICAgIH0gZWxzZSBpZiAoaXNDb3JyZWN0KSB7XG4gICAgICBjbGFzc2VzW2RhdGFSZWZdID0gc2VsZi5zdGF0ZS5zZWxlY3RDbGFzcztcbiAgICB9XG5cbiAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgIGNsYXNzZXMsXG4gICAgfSk7XG5cbiAgICBzZWxmLnByb3BzLnNlbGVjdFJlc3BvbmQuY2FsbChzZWxmLCBkYXRhUmVmKTtcbiAgICBzZWxmLnByb3BzLm9uU2VsZWN0LmNhbGwoc2VsZiwgZGF0YVJlZik7XG5cbiAgICBpZiAoc2VsZi5wcm9wcy5jaG9vc2VPbmUpIHtcbiAgICAgIHNlbGYucmVxdWlyZUZvckNvbXBsZXRlID0gW2RhdGFSZWZdO1xuICAgIH1cblxuICAgIGlmIChzZWxmLnByb3BzLmRhdGFUYXJnZXQpIHtcbiAgICAgIHNlbGYudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgcGF0aDogc2VsZi5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGFyZ2V0OiByZWZcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGYucHJvcHMuY29tcGxldGVMaXN0T25DbGljaykge1xuICAgICAgc2VsZi5yZXF1aXJlRm9yQ29tcGxldGUubWFwKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IGlkICYmIHNlbGYucmVmc1tpZF0pIHtcbiAgICAgICAgICBzZWxmLnJlZnNbaWRdLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGYucmVxdWlyZUZvckNvbXBsZXRlLm1hcChrZXkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gZGF0YVJlZiAmJiBzZWxmLnJlZnNba2V5XSkge1xuICAgICAgICBzZWxmLnJlZnNba2V5XS5jb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0KGUpIHtcbiAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICB9XG5cbiAgaGlnaGxpZ2h0KGUpIHtcbiAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICB0aGlzLnNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKTtcbiAgfVxuXG4gIGdldENsYXNzKGtleSwgbGkpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgIGxpLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1trZXldLFxuICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2xpLnByb3BzWydkYXRhLXJlZiddXVxuICAgICk7XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKCdzZWxlY3RhYmxlJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgfVxuXG4gIGNoZWNrQ29tcGxldGUoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCBjb21wbGV0ZTtcblxuICAgIGlmICh0aGlzLnByb3BzLmNoZWNrQ29tcGxldGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICBjb21wbGV0ZSA9IHNlbGYucmVxdWlyZUZvckNvbXBsZXRlLmV2ZXJ5KGtleSA9PiB7XG4gICAgICBpZiAoc2VsZi5yZWZzW2tleV0gaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFzZWxmLnJlZnNba2V5XS5zdGF0ZSB8fCAoc2VsZi5yZWZzW2tleV0uc3RhdGUgJiYgIXNlbGYucmVmc1trZXldLnN0YXRlLmNvbXBsZXRlKSkge1xuICAgICAgICBpZiAodHlwZW9mIHNlbGYucmVmc1trZXldLmNoZWNrQ29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBzZWxmLnJlZnNba2V5XS5jaGVja0NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoY29tcGxldGUgJiYgIXNlbGYuc3RhdGUuY29tcGxldGUpIHtcbiAgICAgIHNlbGYuY29tcGxldGUoKTtcbiAgICB9IGVsc2UgaWYgKHNlbGYuc3RhdGUuc3RhcnRlZCAmJiAhY29tcGxldGUgJiYgc2VsZi5zdGF0ZS5jb21wbGV0ZSkge1xuICAgICAgc2VsZi5pbmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQmluKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5iaW4pIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0aGlzLnByb3BzLmJpbi50eXBlXG4gICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgcmVmPVwiYmluXCJcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckxpc3QoKSB7XG4gICAgdmFyIGxpc3QgPSB0aGlzLnByb3BzLmxpc3QgfHwgdGhpcy5zdGF0ZS5saXN0O1xuICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgdmFyIGRhdGFSZWYgPSBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICB2YXIgcmVmID0gbGkucmVmIHx8IGxpLnByb3BzLmlkIHx8IGRhdGFSZWY7XG4gICAgICB2YXIgbWVzc2FnZSA9IGxpLnByb3BzLm1lc3NhZ2UgfHwgJycgKyBrZXk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGkudHlwZVxuICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzcyhrZXksIGxpKX1cbiAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlfVxuICAgICAgICAgIGRhdGEtbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICBkYXRhLXJlZj17ZGF0YVJlZn1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICA8dWwgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gb25DbGljaz17dGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdGFibGUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGxpc3Q6IFtcbiAgICA8bGk+PC9saT4sXG4gICAgPGxpPjwvbGk+LFxuICAgIDxsaT48L2xpPixcbiAgICA8bGk+PC9saT5cbiAgXSxcbiAgc2VsZWN0Q2xhc3M6ICdTRUxFQ1RFRCcsXG4gIGNvbXBsZXRlTGlzdE9uQ2xpY2s6IHRydWUsXG4gIHNlbGVjdFJlc3BvbmQ6IF8ubm9vcCxcbiAgb25TZWxlY3Q6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0YWJsZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgSU1BR0UgPSAnaW1hZ2UnO1xuY29uc3QgQVJFQSA9ICdhcmVhJztcbmNvbnN0IENPTlRFTlQgPSAnY29udGVudCc7XG5jb25zdCBTQ1JPTExCQVIgPSAnc2Nyb2xsYmFyJztcbmNvbnN0IFNDUk9MTEVSID0gJ3Njcm9sbGVyJztcblxuY2xhc3MgU2Nyb2xsQXJlYSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IF8uZGVmYXVsdHMoe1xuICAgICAgc3RhcnRZOiAwLFxuICAgICAgZW5kWTogMCxcbiAgICAgIHpvb206IDEsXG4gICAgfSwgdGhpcy5zdGF0ZSk7XG5cbiAgICB0aGlzLnNldFpvb20gPSB0aGlzLnNldFpvb20uYmluZCh0aGlzKTtcblxuICAgIHRoaXMubW91c2VEb3duID0gdGhpcy5tb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlVXAgPSB0aGlzLm1vdXNlVXAuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubW92ZUV2ZW50ID0gdGhpcy5tb3ZlRXZlbnQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMudG91Y2hTdGFydCA9IHRoaXMudG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hFbmQgPSB0aGlzLnRvdWNoRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBib290c3RyYXAoKSB7XG4gICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICB0aGlzLnNldFpvb20oKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXRab29tKTtcblxuICAgIHRoaXNbQVJFQV0gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbQVJFQV0pO1xuICAgIHRoaXNbQ09OVEVOVF0gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbQ09OVEVOVF0pO1xuICAgIHRoaXNbU0NST0xMQkFSXSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1tTQ1JPTExCQVJdKTtcbiAgICB0aGlzW1NDUk9MTEVSXSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1tTQ1JPTExFUl0pO1xuXG4gICAgdGhpc1tBUkVBXS5zY3JvbGxUb3AgPSAwO1xuXG4gICAgdGhpc1tBUkVBXS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBlID0+IHtcbiAgICAgIHZhciBhcmVhU2Nyb2xsVG9wLCBlbmRZO1xuXG4gICAgICBpZiAoIWUudGFyZ2V0IHx8IHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgYXJlYVNjcm9sbFRvcCA9IGUudGFyZ2V0LnNjcm9sbFRvcDtcbiAgICAgIGVuZFkgPSAodGhpc1tTQ1JPTExCQVJdLm9mZnNldEhlaWdodCAtIHRoaXMucHJvcHMuc2Nyb2xsYmFySGVpZ2h0KSAqIChhcmVhU2Nyb2xsVG9wIC8gKHRoaXNbQ09OVEVOVF0ub2Zmc2V0SGVpZ2h0IC0gdGhpc1tBUkVBXS5vZmZzZXRIZWlnaHQpKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0YXJ0WTogMCxcbiAgICAgICAgZW5kWSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpc1tTQ1JPTExFUl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xuICAgIHRoaXNbU0NST0xMRVJdLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnQpO1xuICB9XG5cbiAgc2V0Wm9vbSgpIHtcbiAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB6b29tOiBzdGF0ZS5zY2FsZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbW91c2VEb3duKGUpIHtcbiAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hNb3VzZUV2ZW50cyk7XG4gIH1cblxuICB0b3VjaFN0YXJ0KGUpIHtcbiAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hUb3VjaEV2ZW50cyk7XG4gIH1cblxuICBzdGFydEV2ZW50KGUsIGNiKSB7XG4gICAgdmFyIHN0YXJ0WSwgZW5kWTtcblxuICAgIGlmIChlLnRhcmdldCAhPT0gdGhpc1tTQ1JPTExFUl0pIHJldHVybjtcblxuICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgZSA9IGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0gPyBlLnRhcmdldFRvdWNoZXNbMF0gOiBlO1xuXG4gICAgZW5kWSA9IHRoaXMuZ2V0RW5kWShlKTtcbiAgICBzdGFydFkgPSB0aGlzLnN0YXRlLnN0YXJ0WSB8fCBlbmRZO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFydFksXG4gICAgICBlbmRZLFxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgY2IuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIGdldEVuZFkoZSkge1xuICAgIHJldHVybiBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KFxuICAgICAgICBlLnBhZ2VZIC8gdGhpcy5zdGF0ZS56b29tLFxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WVxuICAgICAgKSxcbiAgICAgIHRoaXMuc3RhdGUuc3RhcnRZICtcbiAgICAgIHRoaXNbU0NST0xMQkFSXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgLyB0aGlzLnN0YXRlLnpvb20gLVxuICAgICAgdGhpcy5wcm9wcy5zY3JvbGxiYXJIZWlnaHRcbiAgICApO1xuICB9XG5cbiAgYXR0YWNoTW91c2VFdmVudHMoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gIH1cblxuICBhdHRhY2hUb3VjaEV2ZW50cygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICB9XG5cbiAgbW92ZUV2ZW50KGUpIHtcbiAgICB2YXIgZW5kWTtcblxuICAgIGUgPSBlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdID8gZS50YXJnZXRUb3VjaGVzWzBdIDogZTtcblxuICAgIGVuZFkgPSB0aGlzLmdldEVuZFkoZSk7XG5cbiAgICB0aGlzW0FSRUFdLnNjcm9sbFRvcCA9IChlbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFkpICpcbiAgICAgICh0aGlzW0NPTlRFTlRdLm9mZnNldEhlaWdodCAtIHRoaXNbQVJFQV0ub2Zmc2V0SGVpZ2h0KSAvXG4gICAgICAodGhpc1tTQ1JPTExCQVJdLm9mZnNldEhlaWdodCAtIHRoaXMucHJvcHMuc2Nyb2xsYmFySGVpZ2h0KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZW5kWSxcbiAgICB9KTtcbiAgfVxuXG4gIG1vdXNlVXAoKSB7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZGV0YWNoTW91c2VFdmVudHMoKTtcbiAgfVxuXG4gIHRvdWNoRW5kKCkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRldGFjaFRvdWNoRXZlbnRzKCk7XG4gIH1cblxuICBkZXRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgfVxuXG4gIGRldGFjaFRvdWNoRXZlbnRzKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCk7XG4gIH1cblxuICBnZXRTY3JvbGxlclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLmltZ30pYCxcbiAgICAgIHRvcDogdGhpcy5zdGF0ZS5lbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFksXG4gICAgfTtcbiAgfVxuXG4gIGdldENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3Njcm9sbC1hcmVhJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvdWxkUmVuZGVyKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8dGhpcy5wcm9wcy50eXBlIHsuLi50aGlzLnByb3BzfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgPHNrb2FzaC5JbWFnZSByZWY9e0lNQUdFfSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e3RoaXMucHJvcHMuaW1nfSAvPlxuICAgICAgICA8ZGl2IHJlZj17QVJFQX0gY2xhc3NOYW1lPXtBUkVBfT5cbiAgICAgICAgICA8ZGl2IHJlZj17Q09OVEVOVH0gY2xhc3NOYW1lPXtDT05URU5UfT5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtTQ1JPTExCQVJ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtTQ1JPTExCQVJ9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e1NDUk9MTEVSfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtTQ1JPTExFUn1cbiAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFNjcm9sbGVyU3R5bGUoKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGhpcy5wcm9wcy50eXBlPlxuICAgICk7XG4gIH1cbn1cblxuU2Nyb2xsQXJlYS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgaW1nOiAnJyxcbiAgc2Nyb2xsYmFySGVpZ2h0OiAxMDAsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3Njcm9sbF9hcmVhLzAuMS5qc1xuICoqLyIsImltcG9ydCBDYW52YXMgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2FudmFzLzAuMSc7XG5pbXBvcnQgTWVudSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9tZW51LzAuMSc7XG5pbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMSc7XG4vLyBpbXBvcnQgUmV2ZWFsIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3JldmVhbC8wLjEnO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgQ2FudmFzU2NyZWVuIGV4dGVuZHMgc2tvYXNoLlNjcmVlbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbG9hZDogdHJ1ZSxcbiAgICAgIG1lbnU6IHt9LFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgfTtcblxuICAgIHRoaXMucmlnaHRNZW51TGlzdCA9IFtcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJwcmV2aWV3XCIgb25DbGljaz17dGhpcy5wcmV2aWV3LmJpbmQodGhpcyl9PlxuICAgICAgICA8c3BhbiAvPlxuICAgICAgPC9saT4sXG4gICAgICA8bGkgY2xhc3NOYW1lPVwic2VuZFwiIG9uQ2xpY2s9e3RoaXMuc2VuZC5iaW5kKHRoaXMpfT5cbiAgICAgICAgPHNwYW4gLz5cbiAgICAgIDwvbGk+XG4gICAgXTtcblxuICAgIHRoaXMuc2V0VmFsaWQgPSB0aGlzLnNldFZhbGlkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbG9zZVJldmVhbCA9IHRoaXMuY2xvc2VSZXZlYWwuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNldEhhc0Fzc2V0cyA9IHRoaXMuc2V0SGFzQXNzZXRzLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLnJlZnMuY2FudmFzLmdldEl0ZW1zKCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnJlZnMuY2FudmFzLnJlc2V0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBiYWNrZ3JvdW5kOiBmYWxzZSxcbiAgICAgIGhhc0Fzc2V0czogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtKG1lc3NhZ2UpIHtcbiAgICBpZiAobWVzc2FnZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhhc0Fzc2V0czogdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZDogdGhpcy5zdGF0ZS5iYWNrZ3JvdW5kIHx8XG4gICAgICAgICAgICAgIG1lc3NhZ2UuYXNzZXRfdHlwZSA9PT0gJ2JhY2tncm91bmQnLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlZnMuY2FudmFzLmFkZEl0ZW0obWVzc2FnZSwgKCkgPT4ge1xuICAgICAgICBza29hc2gudHJpZ2dlcignc2F2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYWRkSXRlbXMobWVzc2FnZSkge1xuICAgIHZhciBoYXNBc3NldHMsIGJhY2tncm91bmQ7XG5cbiAgICBoYXNBc3NldHMgPSB0cnVlO1xuICAgIGJhY2tncm91bmQgPSAhIW1lc3NhZ2UucnVsZXMuYmFja2dyb3VuZDtcblxuICAgIHRoaXMubWFwUnVsZXNTdHJpbmdUb051bWJlcnMobWVzc2FnZS5ydWxlcyk7XG5cbiAgICB0aGlzLnJlZnMuY2FudmFzLnNldEl0ZW1zKG1lc3NhZ2UucnVsZXMpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBoYXNBc3NldHMsXG4gICAgICBiYWNrZ3JvdW5kLFxuICAgIH0pO1xuXG4gICAgaWYgKG1lc3NhZ2UuZnJpZW5kX3RvKSB7XG4gICAgICBza29hc2gudHJpZ2dlcigncGFzc0RhdGEnLCB7XG4gICAgICAgIG5hbWU6ICdhZGQtcmVjaXBpZW50JyxcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZS5mcmllbmRfdG9cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldE1lbnUoKSB7XG4gICAgdmFyIG1lbnUsIHN0YXRlID0gdGhpcy5wcm9wcy5nYW1lU3RhdGU7XG5cbiAgICBpZiAoc3RhdGUgJiYgc3RhdGUuZGF0YSAmJiBzdGF0ZS5kYXRhLm1lbnUpIHtcbiAgICAgIG1lbnUgPSBzdGF0ZS5kYXRhLm1lbnU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWVudSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1hcFJ1bGVzU3RyaW5nVG9OdW1iZXJzKHJ1bGVzKSB7XG4gICAgaWYgKCFydWxlcykgcmV0dXJuO1xuXG4gICAgaWYgKF8uaXNBcnJheShydWxlcy5pdGVtcykpIHtcbiAgICAgIHJ1bGVzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uc3RhdGUubGVmdCA9IHBhcnNlRmxvYXQoaXRlbS5zdGF0ZS5sZWZ0KTtcbiAgICAgICAgaXRlbS5zdGF0ZS5yb3RhdGlvbiA9IHBhcnNlRmxvYXQoaXRlbS5zdGF0ZS5yb3RhdGlvbik7XG4gICAgICAgIGl0ZW0uc3RhdGUuc2NhbGUgPSBwYXJzZUZsb2F0KGl0ZW0uc3RhdGUuc2NhbGUpO1xuICAgICAgICBpdGVtLnN0YXRlLnRvcCA9IHBhcnNlRmxvYXQoaXRlbS5zdGF0ZS50b3ApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKF8uaXNBcnJheShydWxlcy5tZXNzYWdlcykpIHtcbiAgICAgIHJ1bGVzLm1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgIG1lc3NhZ2Uuc3RhdGUubGVmdCA9IHBhcnNlRmxvYXQobWVzc2FnZS5zdGF0ZS5sZWZ0KTtcbiAgICAgICAgbWVzc2FnZS5zdGF0ZS5yb3RhdGlvbiA9IHBhcnNlRmxvYXQobWVzc2FnZS5zdGF0ZS5yb3RhdGlvbik7XG4gICAgICAgIG1lc3NhZ2Uuc3RhdGUuc2NhbGUgPSBwYXJzZUZsb2F0KG1lc3NhZ2Uuc3RhdGUuc2NhbGUpO1xuICAgICAgICBtZXNzYWdlLnN0YXRlLnRvcCA9IHBhcnNlRmxvYXQobWVzc2FnZS5zdGF0ZS50b3ApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGVzO1xuICB9XG5cbiAgb3BlbihvcHRzID0ge30pIHtcbiAgICB0aGlzLnNldE1lbnUoKTtcblxuICAgIGlmICh0aGlzLnJlZnMgJiYgdGhpcy5yZWZzLm1lbnUpIHtcbiAgICAgIHRoaXMucmVmcy5tZW51LmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdHMuZHJhZnQpIHNrb2FzaC50cmlnZ2VyKCdzYXZlJyk7XG5cbiAgICAvLyBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAvLyAgIHNrb2FzaC50cmlnZ2VyKCdzYXZlJyk7XG4gICAgLy8gfSwgMTIwMDAwKTtcblxuICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgaW50ZXJ2YWxcbiAgICAvLyB9KTtcblxuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCdzYXZlJyk7XG4gICAgLy8gY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgIGludGVydmFsOiBudWxsXG4gICAgLy8gfSk7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgfVxuXG4gIHNldFZhbGlkKHZhbGlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB2YWxpZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SGFzQXNzZXRzKGhhc0Fzc2V0cykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaGFzQXNzZXRzXG4gICAgfSk7XG4gIH1cblxuICBzZW5kKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS52YWxpZCkgcmV0dXJuO1xuICAgIHRoaXMuZ290bygnc2VuZCcpO1xuICB9XG5cbiAgcHJldmlldygpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUudmFsaWQpIHJldHVybjtcbiAgICB0aGlzLmdvdG8oJ3ByZXZpZXcnKTtcbiAgfVxuXG4gIGNsb3NlUmV2ZWFsKCkge1xuICAgIGlmICh0aGlzLnJlZnMgJiYgdGhpcy5yZWZzLnJldmVhbCkge1xuICAgICAgdGhpcy5yZWZzLnJldmVhbC5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldENvbnRhaW5lckNsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgJ2NhbnZhcy1jb250YWluZXInOiB0cnVlLFxuICAgICAgQkFDS0dST1VORDogdGhpcy5zdGF0ZS5iYWNrZ3JvdW5kLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyh7XG4gICAgICAnSEFTLUFTU0VUUyc6IHRoaXMuc3RhdGUuaGFzQXNzZXRzLFxuICAgICAgJ0lOVkFMSUQnOiAhdGhpcy5zdGF0ZS52YWxpZCxcbiAgICB9LCBza29hc2guU2NyZWVuLnByb3RvdHlwZS5nZXRDbGFzc05hbWVzLmNhbGwodGhpcykpO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fRnJhbWVzL1NLX2ZyYW1lc19jYW52YXMucG5nXCIgLz5cbiAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fQnV0dG9ucy9TS19idG5fZnJpZW5kLnBuZ1wiIC8+XG4gICAgICAgIDxNZW51XG4gICAgICAgICAgcmVmPXsnbWVudSd9XG4gICAgICAgICAgaXRlbXM9e3RoaXMuc3RhdGUubWVudS5pdGVtc31cbiAgICAgICAgICBsZXZlbD17MH1cbiAgICAgICAgICBsYXN0TGV2ZWw9ezF9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENvbnRhaW5lckNsYXNzZXMoKX0+XG4gICAgICAgICAgPENhbnZhc1xuICAgICAgICAgICAgcmVmPXsnY2FudmFzJ31cbiAgICAgICAgICAgIHNldFZhbGlkPXt0aGlzLnNldFZhbGlkfVxuICAgICAgICAgICAgc2V0SGFzQXNzZXRzPXt0aGlzLnNldEhhc0Fzc2V0c31cbiAgICAgICAgICAgIGl0ZW1NaW5EaW09ezE1MH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlbGVjdGFibGUgY2xhc3NOYW1lPVwibWVudSByaWdodC1tZW51XCIgbGlzdD17dGhpcy5yaWdodE1lbnVMaXN0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgICAvLyBtb3ZlIHRoaXMgYmFjayB1cCBiZWxvdyB0aGUgU2VsZWN0YWJsZSB3aGVuIHRoZXJlIGlzIGFuIGluc3RydWN0aW9uYWwgaGVscCB2aWRlb1xuICAgIC8qXG4gICAgICAgIDxSZXZlYWxcbiAgICAgICAgICByZWY9XCJyZXZlYWxcIlxuICAgICAgICAgIG9wZW5PblN0YXJ0PVwiMFwiXG4gICAgICAgICAgbGlzdD17W1xuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cIm90dGVyXCIgc3JjPXsnbWVkaWEvX090dGVyL2pveWZ1bC1vdHRlcl8yLmdpZid9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnViYmxlXCI+XG4gICAgICAgICAgICAgICAgV2VsY29tZSB0byB5b3VyIGNhbnZhcyE8YnIvPjxici8+XG4gICAgICAgICAgICAgICAgV291bGQgeW91IGxpa2UgbWU8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHNob3cgeW91IGFyb3VuZD9cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwieWVzXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17c2tvYXNoLnRyaWdnZXIuYmluZChudWxsLCAnb3Blbk1lbnUnLCB7aWQ6ICdoZWxwJ30pfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibm9cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsb3NlUmV2ZWFsfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgKi9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gIHJldHVybiAoXG4gICAgPENhbnZhc1NjcmVlblxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBrZXk9e2tleX1cbiAgICAgIGlkPVwiY2FudmFzXCJcbiAgICAgIGhpZGVOZXh0XG4gICAgICBoaWRlUHJldlxuICAgIC8+XG4gICk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvY2FudmFzX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgRWRpdGFibGVBc3NldCBmcm9tICcuLi9lZGl0YWJsZV9hc3NldC8wLjEuanMnO1xuXG5jbGFzcyBDYW52YXMgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYWNrZ3JvdW5kOiBudWxsLFxuICAgICAgaXRlbXM6IFtdLFxuICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgb2Zmc2V0WDogMCxcbiAgICAgIG9mZnNldFk6IDAsXG4gICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IHRoaXMuZGVsZXRlSXRlbS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hlY2tJdGVtID0gdGhpcy5jaGVja0l0ZW0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmRlYWN0aXZhdGVJdGVtcyA9IHRoaXMuZGVhY3RpdmF0ZUl0ZW1zLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZWxheWVySXRlbXMgPSB0aGlzLnJlbGF5ZXJJdGVtcy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2V0VmFsaWQgPSB0aGlzLnNldFZhbGlkLmJpbmQodGhpcyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB2YXIgZG9tID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG5cbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB3aWR0aDogZG9tLm9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkb20ub2Zmc2V0SGVpZ2h0LFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0SXRlbXMoKSB7XG4gICAgdmFyIGl0ZW1zLCBtZXNzYWdlcywgc2VsZiA9IHRoaXM7XG5cbiAgICBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXMubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIHZhciBzdGF0ZTtcblxuICAgICAgaWYgKCFzZWxmLnJlZnNbJ2l0ZW0tJyArIGtleV0pIHJldHVybiBpdGVtO1xuXG4gICAgICBzdGF0ZSA9IHNlbGYucmVmc1snaXRlbS0nICsga2V5XS5zdGF0ZTtcblxuICAgICAgaXRlbS5zdGF0ZSA9IHtcbiAgICAgICAgbGVmdDogXy5mbG9vcihzdGF0ZS5sZWZ0LCAxNCksXG4gICAgICAgIHRvcDogXy5mbG9vcihzdGF0ZS50b3AsIDE0KSxcbiAgICAgICAgc2NhbGU6IF8uZmxvb3Ioc3RhdGUuc2NhbGUsIDE0KSxcbiAgICAgICAgcm90YXRpb246IF8uZmxvb3Ioc3RhdGUucm90YXRpb24sIDE0KSxcbiAgICAgICAgbGF5ZXI6IHN0YXRlLmxheWVyLFxuICAgICAgICB2YWxpZDogc3RhdGUudmFsaWQsXG4gICAgICAgIGNvcm5lcnM6IHN0YXRlLmNvcm5lcnMsXG4gICAgICB9O1xuXG4gICAgICBpdGVtLmNoZWNrID0gc3RhdGUuY2hlY2s7XG4gICAgICBpdGVtLm1pbWVfdHlwZSA9IHN0YXRlLm1pbWVfdHlwZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcblxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG5cbiAgICBtZXNzYWdlcyA9IHRoaXMuc3RhdGUubWVzc2FnZXMubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIHZhciBzdGF0ZTtcblxuICAgICAgaWYgKCFzZWxmLnJlZnNbJ21lc3NhZ2UtJyArIGtleV0pIHJldHVybiBpdGVtO1xuXG4gICAgICBzdGF0ZSA9IHNlbGYucmVmc1snbWVzc2FnZS0nICsga2V5XS5zdGF0ZTtcblxuICAgICAgaXRlbS5zdGF0ZSA9IHtcbiAgICAgICAgbGVmdDogXy5mbG9vcihzdGF0ZS5sZWZ0LCAxNCksXG4gICAgICAgIHRvcDogXy5mbG9vcihzdGF0ZS50b3AsIDE0KSxcbiAgICAgICAgc2NhbGU6IF8uZmxvb3Ioc3RhdGUuc2NhbGUsIDE0KSxcbiAgICAgICAgcm90YXRpb246IF8uZmxvb3Ioc3RhdGUucm90YXRpb24sIDE0KSxcbiAgICAgICAgbGF5ZXI6IHN0YXRlLmxheWVyLFxuICAgICAgICB2YWxpZDogc3RhdGUudmFsaWQsXG4gICAgICAgIGNvcm5lcnM6IHN0YXRlLmNvcm5lcnMsXG4gICAgICB9O1xuXG4gICAgICBpdGVtLmNoZWNrID0gc3RhdGUuY2hlY2s7XG4gICAgICBpdGVtLm1pbWVfdHlwZSA9IHN0YXRlLm1pbWVfdHlwZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcblxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG5cbiAgICBfLnJlbW92ZShpdGVtcywgbiA9PiB7XG4gICAgICByZXR1cm4gIW47XG4gICAgfSk7XG5cbiAgICBfLnJlbW92ZShtZXNzYWdlcywgbiA9PiB7XG4gICAgICByZXR1cm4gIW47XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZDogdGhpcy5zdGF0ZS5iYWNrZ3JvdW5kLFxuICAgICAgaXRlbXMsXG4gICAgICBtZXNzYWdlcyxcbiAgICB9O1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBiYWNrZ3JvdW5kOiBudWxsLFxuICAgICAgaXRlbXM6IFtdLFxuICAgICAgbWVzc2FnZXM6IFtdXG4gICAgfSk7XG4gIH1cblxuICBzZXRJdGVtcyhtZXNzYWdlKSB7XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIC8qXG4gICAgICAgKlxuICAgICAgICogVGhpcyBtYWtlcyBzdXJlIHRoZSBFZGl0YWJsZUFzc2V0cyBnZXQgY2xlYXJlZC5cbiAgICAgICAqXG4gICAgICAgKiBUaGlzIHByZXZlbnRzIHRoZSBuZXcgYXNzZXRzIGZyb20gaW5oZXJpdGluZ1xuICAgICAgICogc3RhdGUgZnJvbSB0aGUgb2xkIGFzc2V0cy5cbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBiYWNrZ3JvdW5kOiBudWxsLFxuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgdGhpcy5hZGRJdGVtKG1lc3NhZ2UuYmFja2dyb3VuZCk7XG4gICAgICAgIG1lc3NhZ2UuaXRlbXMuZm9yRWFjaChhc3NldCA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRJdGVtKGFzc2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2UubWVzc2FnZXMuZm9yRWFjaChhc3NldCA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRJdGVtKGFzc2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhZGRJdGVtKGFzc2V0LCBjYikge1xuICAgIHZhciBpdGVtcywgbWVzc2FnZXMsIGluZGV4LCBjb3VudDtcblxuICAgIGlmICghYXNzZXQpIHJldHVybjtcblxuICAgIGlmIChhc3NldC5hc3NldF90eXBlID09PSAnYmFja2dyb3VuZCcpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBiYWNrZ3JvdW5kOiBhc3NldCxcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ2VtaXQnLCB7XG4gICAgICAgICAgbmFtZTogJ2dldE1lZGlhJyxcbiAgICAgICAgICAnbWVkaWFfaWQnOiBhc3NldC5tZWRpYV9pZFxuICAgICAgICB9KS50aGVuKGQgPT4ge1xuICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gdGhpcy5zdGF0ZS5iYWNrZ3JvdW5kO1xuICAgICAgICAgIGJhY2tncm91bmQuY2hlY2sgPSBkLmNoZWNrO1xuICAgICAgICAgIGJhY2tncm91bmQubWltZV90eXBlID0gZC5taW1lX3R5cGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kXG4gICAgICAgICAgfSwgY2IpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYXNzZXQuYXNzZXRfdHlwZSA9PT0gJ2l0ZW0nKSB7XG4gICAgICBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXM7XG5cbiAgICAgIGNvdW50ID0gXy5yZWR1Y2UoaXRlbXMsIChjLCB2KSA9PiB7XG4gICAgICAgIGlmIChhc3NldC5zcmMgPT09IHYuc3JjKSBjKys7XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfSwgMSk7XG5cbiAgICAgIGlmIChjb3VudCA+IHRoaXMucHJvcHMubWF4SW5zdGFuY2VzKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdvcGVuTWVudScsIHtcbiAgICAgICAgICBpZDogJ2xpbWl0V2FybmluZydcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXRlbXMucHVzaChhc3NldCk7XG4gICAgICBpbmRleCA9IGl0ZW1zLmluZGV4T2YoYXNzZXQpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXRlbXMsXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdlbWl0Jywge1xuICAgICAgICAgIG5hbWU6ICdnZXRNZWRpYScsXG4gICAgICAgICAgJ21lZGlhX2lkJzogYXNzZXQubWVkaWFfaWRcbiAgICAgICAgfSkudGhlbihkID0+IHtcbiAgICAgICAgICBhc3NldC5jaGVjayA9IGQuY2hlY2s7XG4gICAgICAgICAgYXNzZXQubWltZV90eXBlID0gZC5taW1lX3R5cGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgICAgICAgaXRlbXNbaW5kZXhdID0gYXNzZXQ7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIH0sIGNiKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGFzc2V0LmFzc2V0X3R5cGUgPT09ICdtZXNzYWdlJykge1xuICAgICAgbWVzc2FnZXMgPSB0aGlzLnN0YXRlLm1lc3NhZ2VzO1xuXG4gICAgICBjb3VudCA9IF8ucmVkdWNlKGl0ZW1zLCAoYywgdikgPT4ge1xuICAgICAgICBpZiAoYXNzZXQuc3JjID09PSB2LnNyYykgYysrO1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH0sIDEpO1xuXG4gICAgICBpZiAoY291bnQgPiB0aGlzLnByb3BzLm1heEluc3RhbmNlcykgcmV0dXJuO1xuXG4gICAgICBtZXNzYWdlcy5wdXNoKGFzc2V0KTtcbiAgICAgIGluZGV4ID0gbWVzc2FnZXMuaW5kZXhPZihhc3NldCk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtZXNzYWdlcyxcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ2VtaXQnLCB7XG4gICAgICAgICAgbmFtZTogJ2dldE1lZGlhJyxcbiAgICAgICAgICAnbWVkaWFfaWQnOiBhc3NldC5tZWRpYV9pZFxuICAgICAgICB9KS50aGVuKGQgPT4ge1xuICAgICAgICAgIGFzc2V0LmNoZWNrID0gZC5jaGVjaztcbiAgICAgICAgICBhc3NldC5taW1lX3R5cGUgPSBkLm1pbWVfdHlwZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgICAgICAgICBtZXNzYWdlc1tpbmRleF0gPSBhc3NldDtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1lc3NhZ2VzXG4gICAgICAgICAgfSwgY2IpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oa2V5LCB0eXBlKSB7XG4gICAgdmFyIGl0ZW1zO1xuXG4gICAgaXRlbXMgPSB0aGlzLnN0YXRlW3R5cGUgKyAncyddO1xuICAgIGRlbGV0ZSBpdGVtc1trZXldO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBbdHlwZSArICdzJ106IGl0ZW1zLFxuICAgIH0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZUl0ZW1zKGV4Y2x1ZGUsIHR5cGUpIHtcbiAgICBpZiAodHlwZW9mIGV4Y2x1ZGUgPT09ICdvYmplY3QnICYmIGV4Y2x1ZGUudGFyZ2V0KSB7XG4gICAgICBpZiAoZXhjbHVkZS50YXJnZXQudGFnTmFtZSAhPT0gJ0xJJykgcmV0dXJuO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS52YWxpZCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcigncGFzc0RhdGEnLCB7XG4gICAgICAgICAgbmFtZTogJ3Nob3dDb2xsaXNpb25XYXJuaW5nJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGV4Y2x1ZGUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5pdGVtcy5tYXAoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKChrZXkgIT09IGV4Y2x1ZGUgfHwgdHlwZSAhPT0gJ2l0ZW0nKSAmJiB0aGlzLnJlZnNbJ2l0ZW0tJyArIGtleV0pIHtcbiAgICAgICAgdGhpcy5yZWZzWydpdGVtLScgKyBrZXldLmRlYWN0aXZhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGUubWVzc2FnZXMubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIGlmICgoa2V5ICE9PSBleGNsdWRlIHx8IHR5cGUgIT09ICdtZXNzYWdlJykgJiYgdGhpcy5yZWZzWydtZXNzYWdlLScgKyBrZXldKSB7XG4gICAgICAgIHRoaXMucmVmc1snbWVzc2FnZS0nICsga2V5XS5kZWFjdGl2YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZWxheWVySXRlbXModHlwZSkge1xuICAgIHZhciBsYXllcnMgPSBbXTtcblxuICAgIHRoaXMuc3RhdGVbdHlwZSArICdzJ10ubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIHZhciBsYXllcjtcblxuICAgICAgbGF5ZXIgPSB0aGlzLnJlZnNbdHlwZSArICctJyArIGtleV0uc3RhdGUubGF5ZXI7XG5cbiAgICAgIGlmIChsYXllcnMuaW5kZXhPZihsYXllcikgPT09IC0xKSB7XG4gICAgICAgIGxheWVycy5wdXNoKGxheWVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxheWVycy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYSA8IGI7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YXRlW3R5cGUgKyAncyddLm1hcCgoaXRlbSwga2V5KSA9PiB7XG4gICAgICB2YXIgb2xkTGF5ZXIsIG5ld0xheWVyO1xuXG4gICAgICBvbGRMYXllciA9IHRoaXMucmVmc1t0eXBlICsgJy0nICsga2V5XS5zdGF0ZS5sYXllcjtcbiAgICAgIG5ld0xheWVyID0gKHR5cGUgPT09ICdtZXNzYWdlJykgPyAxMDAwMCA6IDEwMDA7XG4gICAgICBuZXdMYXllciA9IG5ld0xheWVyIC0gbGF5ZXJzLmluZGV4T2Yob2xkTGF5ZXIpO1xuXG4gICAgICB0aGlzLnJlZnNbdHlwZSArICctJyArIGtleV0ucmVsYXllcihuZXdMYXllcik7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja0l0ZW0oa2V5LCB0eXBlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICFzZWxmLnJlZnNbdHlwZSArICctJyArIGtleV0uc3RhdGUuY29ybmVycy5sZW5ndGggfHxcbiAgICAgIChcbiAgICAgICAgc2VsZi5pc0luQm91bmRzKGtleSwgdHlwZSkgJiYgKFxuICAgICAgICAgIHNlbGYucmVmc1t0eXBlICsgJy0nICsga2V5XS5zdGF0ZS5jYW5fb3ZlcmxhcCB8fFxuICAgICAgICAgICFzZWxmLnN0YXRlW3R5cGUgKyAncyddLnNvbWUoKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgICAgICAga2V5ICE9PSBpbmRleCAmJlxuICAgICAgICAgICAgIXNlbGYucmVmc1t0eXBlICsgJy0nICsgaW5kZXhdLnN0YXRlLmNhbl9vdmVybGFwICYmXG4gICAgICAgICAgICBzZWxmLnJlZnNbdHlwZSArICctJyArIGluZGV4XS5zdGF0ZS5jb3JuZXJzLmxlbmd0aCAmJlxuICAgICAgICAgICAgc2tvYXNoLnV0aWwuZG9JbnRlcnNlY3QoXG4gICAgICAgICAgICAgIHNlbGYucmVmc1t0eXBlICsgJy0nICsga2V5XS5zdGF0ZS5jb3JuZXJzLFxuICAgICAgICAgICAgICBzZWxmLnJlZnNbdHlwZSArICctJyArIGluZGV4XS5zdGF0ZS5jb3JuZXJzXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGlzSW5Cb3VuZHMoa2V5LCB0eXBlKSB7XG4gICAgcmV0dXJuICF0aGlzLnN0YXRlLndpZHRoIHx8XG4gICAgICAhdGhpcy5zdGF0ZS5oZWlnaHQgfHxcbiAgICAgICEoXG4gICAgICAvLyBib3ggdG8gbGVmdFxuICAgICAgc2tvYXNoLnV0aWwuZG9JbnRlcnNlY3QoXG4gICAgICAgIHRoaXMucmVmc1t0eXBlICsgJy0nICsga2V5XS5zdGF0ZS5jb3JuZXJzLFxuICAgICAgICBbXG4gICAgICAgICAge3g6IDAsIHk6IC10aGlzLnN0YXRlLmhlaWdodH0sXG4gICAgICAgICAge3g6IDAsIHk6IDIgKiB0aGlzLnN0YXRlLmhlaWdodH0sXG4gICAgICAgICAge3g6IC10aGlzLnN0YXRlLndpZHRoLCB5OiAyICogdGhpcy5zdGF0ZS5oZWlnaHR9LFxuICAgICAgICAgIHt4OiAtdGhpcy5zdGF0ZS53aWR0aCwgeTogLXRoaXMuc3RhdGUuaGVpZ2h0fVxuICAgICAgICBdXG4gICAgICApIHx8XG4gICAgICAvLyBib3ggYWJvdmVcbiAgICAgIHNrb2FzaC51dGlsLmRvSW50ZXJzZWN0KFxuICAgICAgICB0aGlzLnJlZnNbdHlwZSArICctJyArIGtleV0uc3RhdGUuY29ybmVycyxcbiAgICAgICAgW1xuICAgICAgICAgIHt4OiAtdGhpcy5zdGF0ZS53aWR0aCwgeTogMH0sXG4gICAgICAgICAge3g6IDIgKiB0aGlzLnN0YXRlLndpZHRoLCB5OiAwfSxcbiAgICAgICAgICB7eDogMiAqIHRoaXMuc3RhdGUud2lkdGgsIHk6IC10aGlzLnN0YXRlLmhlaWdodH0sXG4gICAgICAgICAge3g6IHRoaXMuc3RhdGUud2lkdGgsIHk6IC10aGlzLnN0YXRlLmhlaWdodH1cbiAgICAgICAgXVxuICAgICAgKSB8fFxuICAgICAgLy8gYm94IHRvIHJpZ2h0XG4gICAgICBza29hc2gudXRpbC5kb0ludGVyc2VjdChcbiAgICAgICAgdGhpcy5yZWZzW3R5cGUgKyAnLScgKyBrZXldLnN0YXRlLmNvcm5lcnMsXG4gICAgICAgIFtcbiAgICAgICAgICB7eDogdGhpcy5zdGF0ZS53aWR0aCwgeTogLXRoaXMuc3RhdGUuaGVpZ2h0fSxcbiAgICAgICAgICB7eDogdGhpcy5zdGF0ZS53aWR0aCwgeTogMiAqIHRoaXMuc3RhdGUuaGVpZ2h0fSxcbiAgICAgICAgICB7eDogMiAqIHRoaXMuc3RhdGUud2lkdGgsIHk6IDIgKiB0aGlzLnN0YXRlLmhlaWdodH0sXG4gICAgICAgICAge3g6IDIgKiB0aGlzLnN0YXRlLndpZHRoLCB5OiAtdGhpcy5zdGF0ZS5oZWlnaHR9XG4gICAgICAgIF1cbiAgICAgICkgfHxcbiAgICAgIC8vIGJveCBiZWxvd1xuICAgICAgc2tvYXNoLnV0aWwuZG9JbnRlcnNlY3QoXG4gICAgICAgIHRoaXMucmVmc1t0eXBlICsgJy0nICsga2V5XS5zdGF0ZS5jb3JuZXJzLFxuICAgICAgICBbXG4gICAgICAgICAge3g6IC10aGlzLnN0YXRlLndpZHRoLCB5OiB0aGlzLnN0YXRlLmhlaWdodH0sXG4gICAgICAgICAge3g6IDIgKiB0aGlzLnN0YXRlLndpZHRoLCB5OiB0aGlzLnN0YXRlLmhlaWdodH0sXG4gICAgICAgICAge3g6IDIgKiB0aGlzLnN0YXRlLndpZHRoLCB5OiAyICogdGhpcy5zdGF0ZS5oZWlnaHR9LFxuICAgICAgICAgIHt4OiAtdGhpcy5zdGF0ZS53aWR0aCwgeTogMiAqIHRoaXMuc3RhdGUuaGVpZ2h0fVxuICAgICAgICBdXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHNldFZhbGlkKHZhbGlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB2YWxpZFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5zZXRWYWxpZC5jYWxsKHRoaXMsIHZhbGlkKTtcbiAgfVxuXG4gIGdldFN0eWxlKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5iYWNrZ3JvdW5kKSByZXR1cm47XG5cbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5zdGF0ZS5iYWNrZ3JvdW5kLnNyY30pYCxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFZGl0YWJsZUFzc2V0XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgZGF0YS1yZWY9e2tleX1cbiAgICAgICAgICBtaW5EaW09e3RoaXMucHJvcHMuaXRlbU1pbkRpbX1cbiAgICAgICAgICBkZWxldGVJdGVtPXtzZWxmLmRlbGV0ZUl0ZW19XG4gICAgICAgICAgY2hlY2tJdGVtPXtzZWxmLmNoZWNrSXRlbX1cbiAgICAgICAgICBkZWFjdGl2YXRlSXRlbXM9e3NlbGYuZGVhY3RpdmF0ZUl0ZW1zfVxuICAgICAgICAgIHJlbGF5ZXJJdGVtcz17c2VsZi5yZWxheWVySXRlbXN9XG4gICAgICAgICAgc2V0VmFsaWQ9e3NlbGYuc2V0VmFsaWR9XG4gICAgICAgICAgcmVmPXsnaXRlbS0nICsga2V5fVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlck1lc3NhZ2VzKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLnN0YXRlLm1lc3NhZ2VzLm1hcCgoaXRlbSwga2V5KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RWRpdGFibGVBc3NldFxuICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgICAgbWluRGltPXt0aGlzLnByb3BzLm1lc3NhZ2VNaW5EaW19XG4gICAgICAgICAgZGVsZXRlSXRlbT17c2VsZi5kZWxldGVJdGVtfVxuICAgICAgICAgIGNoZWNrSXRlbT17c2VsZi5jaGVja0l0ZW19XG4gICAgICAgICAgZGVhY3RpdmF0ZUl0ZW1zPXtzZWxmLmRlYWN0aXZhdGVJdGVtc31cbiAgICAgICAgICByZWxheWVySXRlbXM9e3NlbGYucmVsYXllckl0ZW1zfVxuICAgICAgICAgIHNldFZhbGlkPXtzZWxmLnNldFZhbGlkfVxuICAgICAgICAgIGNhbnZhc1dpZHRoPXt0aGlzLnN0YXRlLndpZHRofVxuICAgICAgICAgIGNhbnZhc0hlaWdodD17dGhpcy5zdGF0ZS5oZWlnaHR9XG4gICAgICAgICAgcmVmPXsnbWVzc2FnZS0nICsga2V5fVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgY2FudmFzOiB0cnVlLFxuICAgICAgQUNUSVZFOiAhdGhpcy5wcm9wcy5wcmV2aWV3ICYmIHRoaXMuc3RhdGUuYWN0aXZlLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWxcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX1cbiAgICAgICAgb25DbGljaz17dGhpcy5kZWFjdGl2YXRlSXRlbXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlck1lc3NhZ2VzKCl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuQ2FudmFzLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICBtYXhJbnN0YW5jZXM6IDUsXG4gIHNldFZhbGlkOiBfLmlkZW50aXR5LFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYW52YXM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhbnZhcy8wLjEuanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IERyYWdnYWJsZSBmcm9tICcuLi9kcmFnZ2FibGUvMC4xLmpzJztcblxuY2xhc3MgRWRpdGFibGVBc3NldCBleHRlbmRzIERyYWdnYWJsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgICAgc2NhbGU6IC41LFxuICAgICAgbWluU2NhbGU6IC4xLFxuICAgICAgbWF4U2NhbGU6IDEsXG4gICAgICByb3RhdGlvbjogMCxcbiAgICAgIGxheWVyOiAxMDAwLFxuICAgICAgem9vbTogMSxcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIGNvcm5lcnM6IFtdLFxuICAgICAgbGFzdFZhbGlkOiB7fSxcbiAgICB9O1xuXG4gICAgdGhpcy5zY2FsZSA9IHRoaXMuc2NhbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFkanVzdFNjYWxlID0gdGhpcy5hZGp1c3RTY2FsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub2ZmU2NhbGUgPSB0aGlzLm9mZlNjYWxlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnJvdGF0ZSA9IHRoaXMucm90YXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hZGp1c3RSb3RhdGlvbiA9IHRoaXMuYWRqdXN0Um90YXRpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLm9mZlJvdGF0ZSA9IHRoaXMub2ZmUm90YXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBzaG91bGREcmFnKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmRlYWN0aXZhdGVJdGVtcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcm9wcy5kZWFjdGl2YXRlSXRlbXModGhpcy5wcm9wc1snZGF0YS1yZWYnXSwgdGhpcy5wcm9wcy5hc3NldF90eXBlKTtcbiAgICB9XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS52YWxpZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxlZnQ6IHRoaXMuc3RhdGUubGFzdFZhbGlkLmxlZnQgfHwgdGhpcy5zdGF0ZS5sZWZ0LFxuICAgICAgICB0b3A6IHRoaXMuc3RhdGUubGFzdFZhbGlkLnRvcCB8fCB0aGlzLnN0YXRlLnRvcCxcbiAgICAgICAgc2NhbGU6IHRoaXMuc3RhdGUubGFzdFZhbGlkLnNjYWxlIHx8IHRoaXMuc3RhdGUuc2NhbGUsXG4gICAgICAgIHJvdGF0aW9uOiB0aGlzLnN0YXRlLmxhc3RWYWxpZC5yb3RhdGlvbiB8fCB0aGlzLnN0YXRlLnJvdGF0aW9uLFxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVFdmVudChlKSB7XG4gICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgIGUucGFnZVggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICBlLnBhZ2VZID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZW5kWDogZS5wYWdlWCAtIHRoaXMuc3RhdGUuZ3JhYlgsXG4gICAgICBlbmRZOiBlLnBhZ2VZIC0gdGhpcy5zdGF0ZS5ncmFiWSxcbiAgICAgIGxlZnQ6ICgoZS5wYWdlWCAtIHRoaXMuc3RhdGUuZ3JhYlggLSB0aGlzLnN0YXRlLnN0YXJ0WCkgLyB0aGlzLnN0YXRlLnpvb20pLFxuICAgICAgdG9wOiAoKGUucGFnZVkgLSB0aGlzLnN0YXRlLmdyYWJZIC0gdGhpcy5zdGF0ZS5zdGFydFkpIC8gdGhpcy5zdGF0ZS56b29tKSxcbiAgICB9KTtcbiAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICB9XG5cbiAgZGVsZXRlKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5kZWxldGVJdGVtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnByb3BzLmRlbGV0ZUl0ZW0odGhpcy5wcm9wc1snZGF0YS1yZWYnXSwgdGhpcy5wcm9wcy5hc3NldF90eXBlKTtcbiAgICB9XG4gIH1cblxuICByb3RhdGUoKSB7XG4gICAgdGhpcy5yZWZzLmVsLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5hZGp1c3RSb3RhdGlvbik7XG4gICAgdGhpcy5yZWZzLmVsLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub2ZmUm90YXRlKTtcblxuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuYWRqdXN0Um90YXRpb24pO1xuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vZmZSb3RhdGUpO1xuICB9XG5cbiAgb2ZmUm90YXRlKCkge1xuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYWRqdXN0Um90YXRpb24pO1xuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9mZlJvdGF0ZSk7XG5cbiAgICB0aGlzLnJlZnMuZWwucGFyZW50Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmFkanVzdFJvdGF0aW9uKTtcbiAgICB0aGlzLnJlZnMuZWwucGFyZW50Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub2ZmUm90YXRlKTtcbiAgfVxuXG4gIGFkanVzdFJvdGF0aW9uKGUpIHtcbiAgICB2YXIgcm90YXRpb24sIGRlbHRhWCwgZGVsdGFZO1xuXG4gICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgIGUucGFnZVggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICBlLnBhZ2VZID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgIH1cblxuICAgIGRlbHRhWCA9IChlLnBhZ2VYIC8gdGhpcy5zdGF0ZS56b29tKSAtICh0aGlzLnJlZnMubGkub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQpIC0gKHRoaXMuc3RhdGUubGVmdCArIHRoaXMuc3RhdGUud2lkdGggLyAyKTtcbiAgICBkZWx0YVkgPSAoZS5wYWdlWSAvIHRoaXMuc3RhdGUuem9vbSkgLSAodGhpcy5yZWZzLmxpLm9mZnNldFBhcmVudC5vZmZzZXRUb3ApIC0gKHRoaXMuc3RhdGUudG9wICsgdGhpcy5zdGF0ZS5oZWlnaHQgLyAyKTtcblxuICAgIHJvdGF0aW9uID0gTWF0aC5hdGFuMihkZWx0YVksIGRlbHRhWCkgKyAoTWF0aC5QSSAvIDQpICUgKDIgKiBNYXRoLlBJKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcm90YXRpb24sXG4gICAgfSk7XG5cbiAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICB9XG5cbiAgbGF5ZXIoKSB7XG4gICAgdmFyIGxheWVyLCBzZWxmID0gdGhpcztcblxuICAgIGxheWVyID0gdGhpcy5zdGF0ZS5sYXllciAtIDE7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxheWVyLFxuICAgIH0sICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc2VsZi5wcm9wcy5yZWxheWVySXRlbXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc2VsZi5wcm9wcy5yZWxheWVySXRlbXMoc2VsZi5wcm9wcy5hc3NldF90eXBlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbGF5ZXIobGF5ZXIpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxheWVyLFxuICAgIH0pO1xuICB9XG5cbiAgc2NhbGUoKSB7XG4gICAgdGhpcy5yZWZzLmVsLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5hZGp1c3RTY2FsZSk7XG4gICAgdGhpcy5yZWZzLmVsLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub2ZmU2NhbGUpO1xuXG4gICAgdGhpcy5yZWZzLmVsLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5hZGp1c3RTY2FsZSk7XG4gICAgdGhpcy5yZWZzLmVsLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9mZlNjYWxlKTtcbiAgfVxuXG4gIG9mZlNjYWxlKCkge1xuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYWRqdXN0U2NhbGUpO1xuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9mZlNjYWxlKTtcblxuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuYWRqdXN0U2NhbGUpO1xuICAgIHRoaXMucmVmcy5lbC5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vZmZTY2FsZSk7XG4gIH1cblxuICBhZGp1c3RTY2FsZShlKSB7XG4gICAgdmFyIHNjYWxlLCBkZWx0YVgsIGRlbHRhWSwgZGVsdGEsIGJhc2U7XG5cbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkge1xuICAgICAgZS5wYWdlWCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgIGUucGFnZVkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgfVxuXG4gICAgZGVsdGFYID0gKGUucGFnZVggLyB0aGlzLnN0YXRlLnpvb20pIC0gKHRoaXMucmVmcy5saS5vZmZzZXRQYXJlbnQub2Zmc2V0TGVmdCAvIHRoaXMuc3RhdGUuem9vbSkgLSAodGhpcy5zdGF0ZS5sZWZ0IC8gdGhpcy5zdGF0ZS56b29tICsgdGhpcy5zdGF0ZS53aWR0aCAvIDIpO1xuICAgIGRlbHRhWSA9IChlLnBhZ2VZIC8gdGhpcy5zdGF0ZS56b29tKSAtICh0aGlzLnJlZnMubGkub2Zmc2V0UGFyZW50Lm9mZnNldFRvcCAvIHRoaXMuc3RhdGUuem9vbSkgLSAodGhpcy5zdGF0ZS50b3AgLyB0aGlzLnN0YXRlLnpvb20gKyB0aGlzLnN0YXRlLmhlaWdodCAvIDIpO1xuXG4gICAgZGVsdGEgPSBNYXRoLnBvdyhNYXRoLnBvdyhkZWx0YVgsIDIpICsgTWF0aC5wb3coZGVsdGFZLCAyKSwgLjUpO1xuICAgIGJhc2UgPSBNYXRoLnBvdyhNYXRoLnBvdyh0aGlzLnN0YXRlLndpZHRoIC8gMiwgMikgKyBNYXRoLnBvdyh0aGlzLnN0YXRlLmhlaWdodCAvIDIsIDIpLCAuNSk7XG5cbiAgICBzY2FsZSA9IE1hdGgubWF4KE1hdGgubWluKGRlbHRhIC8gYmFzZSwgMSksIHRoaXMuc3RhdGUubWluU2NhbGUpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzY2FsZSxcbiAgICB9KTtcblxuICAgIHRoaXMuY2hlY2tJdGVtKCk7XG4gIH1cblxuICBjaGVja0l0ZW0oKSB7XG4gICAgdGhpcy5zZXRDb3JuZXJzKCgpID0+IHtcbiAgICAgIHZhciB2YWxpZDtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNoZWNrSXRlbSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWxpZCA9IHRoaXMucHJvcHMuY2hlY2tJdGVtKHRoaXMucHJvcHNbJ2RhdGEtcmVmJ10sIHRoaXMucHJvcHMuYXNzZXRfdHlwZSk7XG5cbiAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB2YWxpZCxcbiAgICAgICAgICAgIGxhc3RWYWxpZDogbmV3IE9iamVjdCh0aGlzLnN0YXRlKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHZhbGlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9wcy5zZXRWYWxpZC5jYWxsKHRoaXMsIHZhbGlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldENvcm5lcnMoY2IpIHtcbiAgICB2YXIgY2VudGVyLCBkaXN0YW5jZSwgYW5nbGUsIGNvcm5lcnMgPSBbXTtcblxuICAgIGNlbnRlciA9IHtcbiAgICAgIHg6IHRoaXMuc3RhdGUubGVmdCArIHRoaXMuc3RhdGUud2lkdGggLyAyLFxuICAgICAgeTogdGhpcy5zdGF0ZS50b3AgKyB0aGlzLnN0YXRlLmhlaWdodCAvIDIsXG4gICAgfTtcblxuICAgIGRpc3RhbmNlID0gTWF0aC5wb3coTWF0aC5wb3codGhpcy5zdGF0ZS53aWR0aCAqIHRoaXMuc3RhdGUuc2NhbGUgLyAyLCAyKSArIE1hdGgucG93KHRoaXMuc3RhdGUuaGVpZ2h0ICogdGhpcy5zdGF0ZS5zY2FsZSAvIDIsIDIpLCAuNSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgYW5nbGUgPSB0aGlzLnN0YXRlLnJvdGF0aW9uO1xuICAgICAgYW5nbGUgKz0gKGkgPCAyID8gMCA6IE1hdGguUEkpO1xuICAgICAgYW5nbGUgKz0gTWF0aC5wb3coLTEsIGkpICogTWF0aC5hdGFuMih0aGlzLnN0YXRlLmhlaWdodCwgdGhpcy5zdGF0ZS53aWR0aCk7XG5cbiAgICAgIGNvcm5lcnMucHVzaCh7XG4gICAgICAgIHg6IGNlbnRlci54ICsgZGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgIHk6IGNlbnRlci55ICsgZGlzdGFuY2UgKiBNYXRoLnNpbihhbmdsZSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvcm5lcnMsXG4gICAgfSwgY2IpO1xuICB9XG5cbiAgZ2V0U2l6ZSgpIHtcbiAgICB2YXIgaW1hZ2UsIHNlbGYgPSB0aGlzO1xuXG4gICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHZhciBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIG1pbkRpbSwgbWF4RGltLCBtaW5TY2FsZSwgbWF4U2NhbGUsIHNjYWxlO1xuXG4gICAgICBtaW5EaW0gPSB0aGlzLnByb3BzLm1pbkRpbSB8fCA0MDtcbiAgICAgIG1heERpbSA9IHRoaXMucHJvcHMubWF4RGltIHx8IDQwMDtcbiAgICAgIGxlZnQgPSB0aGlzLnN0YXRlLmxlZnQ7XG4gICAgICB0b3AgPSB0aGlzLnN0YXRlLnRvcDtcbiAgICAgIHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG5cbiAgICAgIG1pblNjYWxlID0gTWF0aC5tYXgobWluRGltIC8gd2lkdGgsIG1pbkRpbSAvIGhlaWdodCk7XG4gICAgICBtYXhTY2FsZSA9IE1hdGgubWluKG1heERpbSAvIHdpZHRoLCBtYXhEaW0gLyBoZWlnaHQsIHRoaXMuc3RhdGUubWF4U2NhbGUpO1xuICAgICAgc2NhbGUgPSBzZWxmLnByb3BzLnN0YXRlICYmIHNlbGYucHJvcHMuc3RhdGUuc2NhbGUgP1xuICAgICAgICBzZWxmLnByb3BzLnN0YXRlLnNjYWxlIDpcbiAgICAgICAgTWF0aC5tYXgoTWF0aC5taW4oc2VsZi5zdGF0ZS5zY2FsZSwgbWF4U2NhbGUpLCBtaW5TY2FsZSk7XG5cbiAgICAgIGlmICgoIXRoaXMuc3RhdGUuaGVpZ2h0IHx8ICF0aGlzLnN0YXRlLndpZHRoKSAmJlxuICAgICAgICAoIXRoaXMuc3RhdGUubGVmdCAmJiAhdGhpcy5zdGF0ZS50b3ApKSB7XG4gICAgICAgIGxlZnQgPSAodGhpcy5wcm9wcy5jYW52YXNXaWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgICAgIHRvcCA9ICh0aGlzLnByb3BzLmNhbnZhc0hlaWdodCAtIGhlaWdodCkgLyAyO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgICAgbGVmdCxcbiAgICAgICAgdG9wLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBtaW5TY2FsZSxcbiAgICAgICAgc2NhbGUsXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHNlbGYuYWN0aXZhdGUoKTtcbiAgICAgICAgc2VsZi5jaGVja0l0ZW0oKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbWFnZS5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgfVxuXG4gIGdldExheWVyKCkge1xuICAgIHZhciBsYXllciA9IDEwMDA7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zdGF0ZSAmJiB0aGlzLnByb3BzLnN0YXRlLmxheWVyKSB7XG4gICAgICBsYXllciA9IHRoaXMucHJvcHMuc3RhdGUubGF5ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hc3NldF90eXBlKSB7XG4gICAgICBjYXNlICdiYWNrZ3JvdW5kJzpcbiAgICAgICAgbGF5ZXIgPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICBsYXllciA9IDEwMDAwO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxheWVyLFxuICAgIH0pO1xuICB9XG5cbiAgYXR0YWNoRXZlbnRzKCkge1xuICAgIHRoaXMucmVmcy5zY2FsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnNjYWxlKTtcbiAgICB0aGlzLnJlZnMucm90YXRlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMucm90YXRlKTtcblxuICAgIHRoaXMucmVmcy5zY2FsZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5zY2FsZSk7XG4gICAgdGhpcy5yZWZzLnJvdGF0ZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5yb3RhdGUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5ib290c3RyYXAoKTtcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnN0YXRlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHRoaXMucHJvcHMuc3RhdGUpO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0U2l6ZSgpO1xuICAgIHRoaXMuZ2V0TGF5ZXIoKTtcblxuICAgIHRoaXMuYXR0YWNoRXZlbnRzKCk7XG5cbiAgICBza29hc2gudHJpZ2dlcignZW1pdCcsIHtcbiAgICAgIG5hbWU6ICdnZXRNZWRpYScsXG4gICAgICAnbWVkaWFfaWQnOiB0aGlzLnByb3BzLm1lZGlhX2lkXG4gICAgfSkudGhlbihkID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoZCwgKCkgPT4ge1xuICAgICAgICB0aGlzLmNoZWNrSXRlbSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5hdHRhY2hFdmVudHMoKTtcbiAgfVxuXG4gIGdldEJ1dHRvblN0eWxlKGV4dHJhUm90YXRpb24gPSAwKSB7XG4gICAgdmFyIHN0eWxlLCB0cmFuc2Zvcm0gPSAnJztcblxuICAgIHRyYW5zZm9ybSArPSBgc2NhbGUoJHsoMSAvIHRoaXMuc3RhdGUuc2NhbGUpfSkgYDtcbiAgICB0cmFuc2Zvcm0gKz0gYHJvdGF0ZSgkeygtdGhpcy5zdGF0ZS5yb3RhdGlvbiAtIGV4dHJhUm90YXRpb24pfXJhZCkgYDtcblxuICAgIHN0eWxlID0ge1xuICAgICAgdHJhbnNmb3JtLFxuICAgIH07XG5cbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cblxuICBnZXRBc3NldFN0eWxlKCkge1xuICAgIHZhciBzdHlsZSwgdHJhbnNmb3JtID0gJyc7XG5cbiAgICB0cmFuc2Zvcm0gKz0gYHNjYWxlKCR7dGhpcy5zdGF0ZS5zY2FsZX0pIGA7XG4gICAgdHJhbnNmb3JtICs9IGByb3RhdGUoJHt0aGlzLnN0YXRlLnJvdGF0aW9ufXJhZCkgYDtcblxuICAgIHN0eWxlID0ge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKFwiJHt0aGlzLnByb3BzLnNyY31cIilgLFxuICAgICAgd2lkdGg6IHRoaXMuc3RhdGUud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuc3RhdGUuaGVpZ2h0LFxuICAgICAgbGVmdDogdGhpcy5zdGF0ZS5sZWZ0LFxuICAgICAgdG9wOiB0aGlzLnN0YXRlLnRvcCxcbiAgICAgIHRyYW5zZm9ybSxcbiAgICAgIHpJbmRleDogdGhpcy5zdGF0ZS5sYXllcixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG5cbiAgZ2V0QnV0dG9uc1N0eWxlKCkge1xuICAgIHZhciBzdHlsZSwgdHJhbnNmb3JtID0gJyc7XG5cbiAgICB0cmFuc2Zvcm0gKz0gYHNjYWxlKCR7dGhpcy5zdGF0ZS5zY2FsZX0pIGA7XG4gICAgdHJhbnNmb3JtICs9IGByb3RhdGUoJHt0aGlzLnN0YXRlLnJvdGF0aW9ufXJhZCkgYDtcblxuICAgIHN0eWxlID0ge1xuICAgICAgd2lkdGg6IHRoaXMuc3RhdGUud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuc3RhdGUuaGVpZ2h0LFxuICAgICAgbGVmdDogdGhpcy5zdGF0ZS5sZWZ0LFxuICAgICAgdG9wOiB0aGlzLnN0YXRlLnRvcCxcbiAgICAgIHRyYW5zZm9ybSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG5cbiAgZ2V0Q2xhc3NlcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyh7XG4gICAgICBEUkFHR0lORzogdGhpcy5zdGF0ZS5kcmFnZ2luZyxcbiAgICAgIFJFVFVSTjogdGhpcy5zdGF0ZS5yZXR1cm4sXG4gICAgICBBQ1RJVkU6IHRoaXMuc3RhdGUuYWN0aXZlLFxuICAgICAgSU5WQUxJRDogIXRoaXMuc3RhdGUudmFsaWQsXG4gICAgfSwgJ2VkaXRhYmxlLWFzc2V0JywgdGhpcy5wcm9wcy5hc3NldF90eXBlKTtcbiAgfVxuXG4gIHJlbmRlckFzc2V0KCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj1cImVsXCJcbiAgICAgICAgY2xhc3NOYW1lPVwiYXNzZXRcIlxuICAgICAgICBzdHlsZT17dGhpcy5nZXRBc3NldFN0eWxlKCl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJCdXR0b25zKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImJ1dHRvbnNcIlxuICAgICAgICBzdHlsZT17dGhpcy5nZXRCdXR0b25zU3R5bGUoKX1cbiAgICAgID5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgc3R5bGU9e3RoaXMuZ2V0QnV0dG9uU3R5bGUoKX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmRlbGV0ZS5iaW5kKHRoaXMpfVxuICAgICAgICAvPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPVwicm90YXRlXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJyb3RhdGVcIlxuICAgICAgICAgIHN0eWxlPXt0aGlzLmdldEJ1dHRvblN0eWxlKCl9XG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJsYXllclwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5sYXllci5iaW5kKHRoaXMpfVxuICAgICAgICAgIHN0eWxlPXt0aGlzLmdldEJ1dHRvblN0eWxlKCl9XG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9XCJzY2FsZVwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwic2NhbGVcIlxuICAgICAgICAgIHN0eWxlPXt0aGlzLmdldEJ1dHRvblN0eWxlKDEuNTcwOCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgcmVmPVwibGlcIlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmFjdGl2YXRlLmJpbmQodGhpcyl9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlckFzc2V0KCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckJ1dHRvbnMoKX1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5FZGl0YWJsZUFzc2V0LmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICBjYW52YXNXaWR0aDogMTI4MCxcbiAgY2FudmFzSGVpZ2h0OiA3MjAsXG4gIHNldFZhbGlkOiBfLmlkZW50aXR5LFxufSwgRHJhZ2dhYmxlLmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRhYmxlQXNzZXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2VkaXRhYmxlX2Fzc2V0LzAuMS5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGFydFg6IDAsXG4gICAgICBzdGFydFk6IDAsXG4gICAgICBlbmRYOiAwLFxuICAgICAgZW5kWTogMCxcbiAgICAgIHpvb206IDEsXG4gICAgfTtcblxuICAgIHRoaXMubW91c2VEb3duID0gdGhpcy5tb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlVXAgPSB0aGlzLm1vdXNlVXAuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubW92ZUV2ZW50ID0gdGhpcy5tb3ZlRXZlbnQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMudG91Y2hTdGFydCA9IHRoaXMudG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hFbmQgPSB0aGlzLnRvdWNoRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBzaG91bGREcmFnKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaW5jb21wbGV0ZSgpIHtcbiAgICB0aGlzLm1hcmtJbmNvcnJlY3QoKTtcbiAgICB0aGlzLnJldHVyblRvU3RhcnQoKTtcblxuICAgIHN1cGVyLmluY29tcGxldGUoKTtcbiAgfVxuXG4gIG1hcmtDb3JyZWN0KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29ycmVjdDogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIG1hcmtJbmNvcnJlY3QoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb3JyZWN0OiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0RXZlbnQoZSwgY2IpIHtcbiAgICB2YXIgcGFnZVgsIHBhZ2VZLCByZWN0LCBzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgZ3JhYlgsIGdyYWJZO1xuXG4gICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzLnJlZnMuZWwpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuc2hvdWxkRHJhZygpKSByZXR1cm47XG5cbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkge1xuICAgICAgcGFnZVggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICBwYWdlWSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcbiAgICAgIHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGUgPSBlLnRhcmdldFRvdWNoZXNbMF07XG4gICAgICBlLm9mZnNldFggPSBwYWdlWCAtIHJlY3QubGVmdDtcbiAgICAgIGUub2Zmc2V0WSA9IHBhZ2VZIC0gcmVjdC50b3A7XG4gICAgfVxuXG4gICAgZ3JhYlggPSBlLm9mZnNldFg7XG4gICAgZ3JhYlkgPSBlLm9mZnNldFk7XG5cbiAgICBzdGFydFggPSBlbmRYID0gZS5wYWdlWCAtIGdyYWJYO1xuICAgIHN0YXJ0WSA9IGVuZFkgPSBlLnBhZ2VZIC0gZ3JhYlk7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUuZmlyc3RYKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZmlyc3RYOiBzdGFydFgsXG4gICAgICAgIGZpcnN0WTogc3RhcnRZLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnByb3BzLnJldHVybikge1xuICAgICAgc3RhcnRYID0gXy5pc0Zpbml0ZSh0aGlzLnN0YXRlLmdyYWJYKSA/XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnRYICsgdGhpcy5zdGF0ZS5ncmFiWCAtIGdyYWJYIDpcbiAgICAgICAgc3RhcnRYO1xuICAgICAgc3RhcnRZID0gXy5pc0Zpbml0ZSh0aGlzLnN0YXRlLmdyYWJZKSA/XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnRZICsgdGhpcy5zdGF0ZS5ncmFiWSAtIGdyYWJZIDpcbiAgICAgICAgc3RhcnRZO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICByZXR1cm46IGZhbHNlLFxuICAgICAgc3RhcnRYLFxuICAgICAgc3RhcnRZLFxuICAgICAgZ3JhYlgsXG4gICAgICBncmFiWSxcbiAgICAgIGVuZFgsXG4gICAgICBlbmRZLFxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmRyYWdSZXNwb25kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnByb3BzLmRyYWdSZXNwb25kKHRoaXMucHJvcHMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgfVxuXG4gIGF0dGFjaFRvdWNoRXZlbnRzKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCk7XG4gIH1cblxuICBtb3VzZURvd24oZSkge1xuICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaE1vdXNlRXZlbnRzKTtcbiAgfVxuXG4gIHRvdWNoU3RhcnQoZSkge1xuICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaFRvdWNoRXZlbnRzKTtcbiAgfVxuXG4gIG1vdmVFdmVudChlKSB7XG4gICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgIGUucGFnZVggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICBlLnBhZ2VZID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZW5kWDogZS5wYWdlWCAtIHRoaXMuc3RhdGUuZ3JhYlgsXG4gICAgICBlbmRZOiBlLnBhZ2VZIC0gdGhpcy5zdGF0ZS5ncmFiWSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVyblRvU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuZmlyc3RYKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICByZXR1cm46IHRydWUsXG4gICAgICAgIGVuZFg6IHRoaXMuc3RhdGUuZmlyc3RYLFxuICAgICAgICBlbmRZOiB0aGlzLnN0YXRlLmZpcnN0WSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVuZEV2ZW50KGNiKSB7XG4gICAgdGhpcy5kcm9wUmVzcG9uZCgpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMucmV0dXJuKSB7XG4gICAgICB0aGlzLnJldHVyblRvU3RhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgcmV0dXJuOiB0aGlzLnN0YXRlLnJldHVybixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZGV0YWNoTW91c2VFdmVudHMoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gIH1cblxuICBkZXRhY2hUb3VjaEV2ZW50cygpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICB9XG5cbiAgbW91c2VVcCgpIHtcbiAgICB0aGlzLmVuZEV2ZW50KHRoaXMuZGV0YWNoTW91c2VFdmVudHMpO1xuICB9XG5cbiAgdG91Y2hFbmQoKSB7XG4gICAgdGhpcy5lbmRFdmVudCh0aGlzLmRldGFjaFRvdWNoRXZlbnRzKTtcbiAgfVxuXG4gIGRyb3BSZXNwb25kKCkge1xuICAgIHZhciBjb3JuZXJzO1xuXG4gICAgY29ybmVycyA9IHRoaXMuc2V0Q29ybmVycygpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmRyb3BSZXNwb25kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnByb3BzLmRyb3BSZXNwb25kKHRoaXMucHJvcHMubWVzc2FnZSwgY29ybmVycyk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q29ybmVycygpIHtcbiAgICB2YXIgdG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0LCBlbCwgY29ybmVycyA9IFtdO1xuXG4gICAgbGVmdCA9IDA7XG4gICAgdG9wID0gMDtcbiAgICBlbCA9IHRoaXMucmVmcy5lbDtcbiAgICB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgIGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcblxuICAgIHdoaWxlIChlbCkge1xuICAgICAgaWYgKGVsLmNsYXNzTmFtZS5pbmRleE9mKCdzY3JlZW4nKSAhPT0gLTEpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxlZnQgKz0gZWwub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgdG9wICs9IGVsLm9mZnNldFRvcCB8fCAwO1xuICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgbGVmdCArPSAoKHRoaXMuc3RhdGUuZW5kWCAtIHRoaXMuc3RhdGUuc3RhcnRYKSAvIHRoaXMuc3RhdGUuem9vbSk7XG4gICAgdG9wICs9ICgodGhpcy5zdGF0ZS5lbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFkpIC8gdGhpcy5zdGF0ZS56b29tKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBjb3JuZXJzLnB1c2goe1xuICAgICAgICB4OiBsZWZ0ICsgd2lkdGggKiAoaSA9PT0gMSB8fCBpID09PSAyID8gMSA6IDApLFxuICAgICAgICB5OiB0b3AgKyBoZWlnaHQgKiAoaSA+IDEgPyAxIDogMCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvcm5lcnMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29ybmVycztcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuYm9vdHN0cmFwKCk7XG4gIH1cblxuICBib290c3RyYXAoKSB7XG4gICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICB0aGlzLnNldFpvb20oKTtcblxuICAgIHRoaXMucmVmcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgdGhpcy5yZWZzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnQpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0Wm9vbS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNldFpvb20oKSB7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ2dldFN0YXRlJykudGhlbihzdGF0ZSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgem9vbTogc3RhdGUuc2NhbGUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0eWxlKCkge1xuICAgIHZhciB4LCB5O1xuXG4gICAgeCA9ICgodGhpcy5zdGF0ZS5lbmRYIC0gdGhpcy5zdGF0ZS5zdGFydFgpIC8gdGhpcy5zdGF0ZS56b29tKTtcbiAgICB5ID0gKCh0aGlzLnN0YXRlLmVuZFkgLSB0aGlzLnN0YXRlLnN0YXJ0WSkgLyB0aGlzLnN0YXRlLnpvb20pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KSB0cmFuc2xhdGVZKCR7eX1weClgLFxuICAgICAgV2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3h9cHgpIHRyYW5zbGF0ZVkoJHt5fXB4KWAsXG4gICAgfTtcbiAgfVxuXG4gIGdldENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICBbdGhpcy5wcm9wcy5tZXNzYWdlXTogdGhpcy5wcm9wcy5tZXNzYWdlLFxuICAgICAgRFJBR0dJTkc6IHRoaXMuc3RhdGUuZHJhZ2dpbmcsXG4gICAgICBSRVRVUk46IHRoaXMuc3RhdGUucmV0dXJuLFxuICAgICAgQ09SUkVDVDogdGhpcy5zdGF0ZS5jb3JyZWN0LFxuICAgIH0sIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgcmVmPVwiZWxcIlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhZ2dhYmxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC4xLmpzXG4gKiovIiwiaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnLi4vc2VsZWN0YWJsZS8wLjEuanMnO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgTWVudSBleHRlbmRzIFNlbGVjdGFibGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBzZWxlY3RDbGFzczogJ1NFTEVDVEVEJyxcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgIH07XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIF8uZWFjaCh0aGlzLnJlZnMsIHJlZiA9PiB7XG4gICAgICBfLmludm9rZShyZWYsICdkZWFjdGl2YXRlJyk7XG4gICAgfSk7XG4gIH1cblxuICBvbkNsaWNrKGUpIHtcbiAgICB2YXIgbGksIHVsLCBkb20sIG1lc3NhZ2UsIGFjdGl2ZSA9IGZhbHNlLCBjbGFzc2VzID0gW107XG5cbiAgICBsaSA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG5cbiAgICBpZiAoIWxpKSByZXR1cm47XG5cbiAgICB1bCA9IGxpLmNsb3Nlc3QoJ1VMJyk7XG4gICAgZG9tID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICAgIGlmICh1bCAhPT0gZG9tKSByZXR1cm47XG5cbiAgICBtZXNzYWdlID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuY2xhc3Nlc1ttZXNzYWdlXSAhPT0gdGhpcy5zdGF0ZS5zZWxlY3RDbGFzcykge1xuICAgICAgY2xhc3Nlc1ttZXNzYWdlXSA9IHRoaXMuc3RhdGUuc2VsZWN0Q2xhc3M7XG4gICAgICBhY3RpdmUgPSAhdGhpcy5wcm9wcy5pbmFjdGl2ZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNsYXNzZXMsXG4gICAgICBhY3RpdmUsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJJdGVtcygpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaXRlbXMgIT09ICdvYmplY3QnKSByZXR1cm47XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5wcm9wcy5pdGVtcykubWFwKChrZXkpID0+IHtcbiAgICAgIHZhciBpdGVtLCBvbkNsaWNrLCBnb3RvT2JqLCBjYXRlZ29yaWVzLCBpc0ZpbmFsO1xuXG4gICAgICBjYXRlZ29yaWVzID0gdGhpcy5wcm9wcy5jYXRlZ29yaWVzID8gW10uY29uY2F0KHRoaXMucHJvcHMuY2F0ZWdvcmllcykgOiBbXTtcbiAgICAgIGNhdGVnb3JpZXMucHVzaChrZXkpO1xuXG4gICAgICBpdGVtID0gdGhpcy5wcm9wcy5pdGVtc1trZXldO1xuXG4gICAgICBpc0ZpbmFsID0gKFxuICAgICAgICAgIHR5cGVvZiBpdGVtLml0ZW1zICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICAgIChcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtLml0ZW1zKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuICAgICAgICAgICAgaXRlbS5pdGVtc1swXSAmJiAhaXRlbS5pdGVtc1swXS5pdGVtc1xuICAgICAgICAgIClcbiAgICAgICAgKSB8fCAoXG4gICAgICAgICAgdHlwZW9mIHNlbGYucHJvcHMubGFzdExldmVsID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgIHNlbGYucHJvcHMubGFzdExldmVsID09PSBzZWxmLnByb3BzLmxldmVsXG4gICAgICAgICk7XG5cbiAgICAgIGlmIChpc0ZpbmFsKSB7XG4gICAgICAgIGdvdG9PYmogPSB7XG4gICAgICAgICAgaW5kZXg6ICdpdGVtLWRyYXdlcicsXG4gICAgICAgICAgY2F0ZWdvcmllcyxcbiAgICAgICAgICBjYXRlZ29yeU5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgfTtcbiAgICAgICAgb25DbGljayA9IHNrb2FzaC50cmlnZ2VyLmJpbmQobnVsbCwgJ2dvdG8nLCBnb3RvT2JqKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5MaXN0SXRlbVxuICAgICAgICAgIGNsYXNzTmFtZT17c2VsZi5nZXRDbGFzcyhrZXkpfVxuICAgICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgICAgcmVmPXtrZXl9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuPntpdGVtLm5hbWUgfHwga2V5fTwvc3Bhbj5cbiAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0ZpbmFsKSByZXR1cm47XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICAgIHJlZj17J21lbnUtJyArIGtleX1cbiAgICAgICAgICAgICAgICBjYXRlZ29yaWVzPXtjYXRlZ29yaWVzfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtpdGVtLml0ZW1zfVxuICAgICAgICAgICAgICAgIGluYWN0aXZlPXt0cnVlfVxuICAgICAgICAgICAgICAgIGxldmVsPXsoc2VsZi5wcm9wcy5sZXZlbCB8fCAwKSArIDF9XG4gICAgICAgICAgICAgICAgbGFzdExldmVsPXtzZWxmLnByb3BzLmxhc3RMZXZlbH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSkoKX1cbiAgICAgICAgPC9za29hc2guTGlzdEl0ZW0+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xhc3Moa2V5KSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgW2tleS5yZXBsYWNlKCcgJywgJy0nKV06IHRydWUsXG4gICAgICBbdGhpcy5zdGF0ZS5jbGFzc2VzW2tleV0gfHwgJyddOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyh7XG4gICAgICBtZW51OiB0cnVlLFxuICAgICAgQUNUSVZFOiB0aGlzLnN0YXRlLmFjdGl2ZSxcbiAgICB9LCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bFxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZW51O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tZW51LzAuMS5qc1xuICoqLyIsImltcG9ydCBJdGVtRHJhd2VyIGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2l0ZW1fZHJhd2VyLzAuMS5qcyc7XG5cbmNsYXNzIEl0ZW1EcmF3ZXJTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBvcHRzOiB7XG4gICAgICAgIGNhdGVnb3JpZXM6IFtdLFxuICAgICAgfSxcbiAgICB9O1xuXG4gIH1cblxuICBzZWxlY3RSZXNwb25kKG1lc3NhZ2UpIHtcbiAgICBza29hc2gudHJpZ2dlcigncGFzc0RhdGEnLCB7XG4gICAgICBuYW1lOiAnYWRkLWl0ZW0nLFxuICAgICAgbWVzc2FnZVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRGF0YShkKSB7XG4gICAgdmFyIGRhdGEgPSBkID8gZCA6IHRoaXMucHJvcHMuZ2FtZVN0YXRlLmRhdGEubWVudS5pdGVtcztcblxuICAgIHRoaXMuc3RhdGUub3B0cy5jYXRlZ29yaWVzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChkYXRhW2tleV0pIGRhdGEgPSBkYXRhW2tleV07XG4gICAgICBpZiAoZGF0YS5pdGVtcykgZGF0YSA9IGRhdGEuaXRlbXM7XG4gICAgfSk7XG5cbiAgICBkYXRhID0gXy52YWx1ZXMoZGF0YSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH1cblxuICBvcGVuKG9wdHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBza29hc2gudHJpZ2dlcignZ2V0TWVkaWEnLCB7XG4gICAgICBwYXRoOiAnc2tyaWJibGUvbWVudS8nICsgb3B0cy5jYXRlZ29yaWVzLmpvaW4oJy8nKVxuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBzZWxmLnVwZGF0ZURhdGEoZGF0YSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgIGxvYWQ6IHRydWUsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgbGVhdmU6IGZhbHNlLFxuICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgb3B0cyxcbiAgICAgIGRhdGE6IG51bGxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBzZWxmLnVwZGF0ZURhdGEoKTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCFzZWxmLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgICAgc2VsZi5zdGFydCgpO1xuICAgICAgfVxuICAgIH0sIDI1MCk7XG4gIH1cblxuICBjYW5jZWxSZXNwb25kKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2F0ZWdvcnk6ICcnLFxuICAgICAgICBjYXRlZ29yeU5hbWU6ICcnLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNrb2FzaC50cmlnZ2VyKCdnb3RvJywge2luZGV4OiAnY2FudmFzJ30pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxJdGVtRHJhd2VyXG4gICAgICAgICAgcmVmPVwiZHJhd2VyXCJcbiAgICAgICAgICBzY3JvbGxiYXJJbWc9XCIuL21lZGlhL19CdXR0b25zL3NrX2J0bl9zbGlkZXIucG5nXCJcbiAgICAgICAgICBzZWxlY3RSZXNwb25kPXt0aGlzLnNlbGVjdFJlc3BvbmQuYmluZCh0aGlzKX1cbiAgICAgICAgICBjYW5jZWxSZXNwb25kPXt0aGlzLmNhbmNlbFJlc3BvbmR9XG4gICAgICAgICAgY2F0ZWdvcmllcz17dGhpcy5zdGF0ZS5vcHRzLmNhdGVnb3JpZXN9XG4gICAgICAgICAgY2F0ZWdvcnlOYW1lPXt0aGlzLnN0YXRlLm9wdHMuY2F0ZWdvcnlOYW1lfVxuICAgICAgICAgIGRhdGE9e3RoaXMuc3RhdGUuZGF0YX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxJdGVtRHJhd2VyU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJpdGVtLWRyYXdlclwiXG4gICAgICBoaWRlTmV4dFxuICAgICAgaGlkZVByZXZcbiAgICAvPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL2l0ZW1fZHJhd2VyX3NjcmVlbi5qc1xuICoqLyIsImltcG9ydCBTZWxlY3RhYmxlUmV2ZWFsIGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGVfcmV2ZWFsLzAuMS5qcyc7XG5pbXBvcnQgSW5ib3ggZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvaW5ib3gvMC4xLmpzJztcbmltcG9ydCBTYXZlZE1lc3NhZ2VzIGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NhdmVkX21lc3NhZ2VzLzAuMS5qcyc7XG5cbmNvbnN0IGluYm94RW1wdHlNZXNzYWdlID0gKFxuICA8c3Bhbj5cbiAgICBZb3UgaGF2ZW4ndCByZWNlaXZlZCBhbnkgU2tyaWJibGVzITxici8+XG4gICAgR2V0IHN0YXJ0ZWQgYnkgc2VuZGluZyBzb21lIVxuICA8L3NwYW4+XG4gICk7XG5jb25zdCB1bnJlYWRFbXB0eU1lc3NhZ2UgPSAoXG4gIDxzcGFuPlxuICAgIFlvdSBkb24ndCBoYXZlIGFueTxici8+XG4gICAgdW5yZWFkIFNrcmliYmxlcyFcbiAgPC9zcGFuPlxuICApO1xuY29uc3QgcmVhZEVtcHR5TWVzc2FnZSA9IChcbiAgPHNwYW4+XG4gICAgWW91IGRvbid0IGhhdmUgYW55PGJyLz5cbiAgICByZWFkIFNrcmliYmxlcyFcbiAgPC9zcGFuPlxuICApO1xuY29uc3Qgc2VudEVtcHR5TWVzc2FnZSA9IChcbiAgPHNwYW4+XG4gICAgWW91IGhhdmVuJ3Qgc2VudCBhbnkgU2tyaWJibGVzLjxici8+XG4gICAgTGV0J3MgZ2V0IHN0YXJ0ZWQhXG4gIDwvc3Bhbj5cbiAgKTtcbmNvbnN0IGRyYWZ0c0VtcHR5TWVzc2FnZSA9IChcbiAgPHNwYW4+XG4gICAgWW91IGRvbid0IGhhdmUgYW55IGRyYWZ0cy48YnIvPlxuICAgIFN0YXJ0IFNrcmliYmxpbmchXG4gIDwvc3Bhbj5cbiAgKTtcblxuXG5jbGFzcyBJbmJveFNjcmVlbiBleHRlbmRzIHNrb2FzaC5TY3JlZW4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxvYWQ6IHRydWUsXG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0YWJsZUxpc3QgPSBbXG4gICAgICA8bGkgLz4sXG4gICAgICA8bGkgLz4sXG4gICAgICA8bGkgLz4sXG4gICAgICA8bGkgLz4sXG4gICAgICA8bGkgLz4sXG4gICAgXTtcblxuICAgIHRoaXMucmV2ZWFsTGlzdCA9IHRoaXMuZ2V0UmV2ZWFsTGlzdCgpO1xuXG4gICAgdGhpcy5yZWFkTWVzc2FnZSA9IHRoaXMucmVhZE1lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmVkaXRNZXNzYWdlID0gdGhpcy5lZGl0TWVzc2FnZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgZ2V0UmV2ZWFsTGlzdChpbmJveCwgb3V0Ym94LCBzYXZlZCkge1xuICAgIHZhciByZWFkLCB1bnJlYWQsIHByb3BzID0gdGhpcy5wcm9wcyB8fCB7fTtcblxuICAgIGluYm94ID0gaW5ib3ggfHwgW107XG5cbiAgICByZWFkID0gaW5ib3guZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0ucmVhZDtcbiAgICB9KTtcblxuICAgIHVucmVhZCA9IGluYm94LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuICFpdGVtLnJlYWQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgPGxpPlxuICAgICAgICA8SW5ib3hcbiAgICAgICAgICBkYXRhLXJlZj1cImluYm94XCJcbiAgICAgICAgICBkYXRhPXt7XG4gICAgICAgICAgICBpdGVtczogaW5ib3ggfHwgW10sXG4gICAgICAgICAgfX1cbiAgICAgICAgICBlbXB0eU1lc3NhZ2U9e2luYm94RW1wdHlNZXNzYWdlfVxuICAgICAgICAgIHNlbGVjdFJlc3BvbmQ9e3RoaXMucmVhZE1lc3NhZ2V9XG4gICAgICAgICAgZ2FtZVN0YXRlPXtwcm9wcy5nYW1lU3RhdGV9XG4gICAgICAgIC8+XG4gICAgICA8L2xpPixcbiAgICAgIDxsaT5cbiAgICAgICAgPEluYm94XG4gICAgICAgICAgZGF0YS1yZWY9XCJ1bnJlYWRcIlxuICAgICAgICAgIGRhdGE9e3tcbiAgICAgICAgICAgIGl0ZW1zOiB1bnJlYWQgfHwgW10sXG4gICAgICAgICAgfX1cbiAgICAgICAgICBlbXB0eU1lc3NhZ2U9e3VucmVhZEVtcHR5TWVzc2FnZX1cbiAgICAgICAgICBzZWxlY3RSZXNwb25kPXt0aGlzLnJlYWRNZXNzYWdlfVxuICAgICAgICAgIGdhbWVTdGF0ZT17cHJvcHMuZ2FtZVN0YXRlfVxuICAgICAgICAvPlxuICAgICAgPC9saT4sXG4gICAgICA8bGk+XG4gICAgICAgIDxJbmJveFxuICAgICAgICAgIGRhdGEtcmVmPVwicmVhZFwiXG4gICAgICAgICAgZGF0YT17e1xuICAgICAgICAgICAgaXRlbXM6IHJlYWQgfHwgW10sXG4gICAgICAgICAgfX1cbiAgICAgICAgICBlbXB0eU1lc3NhZ2U9e3JlYWRFbXB0eU1lc3NhZ2V9XG4gICAgICAgICAgc2VsZWN0UmVzcG9uZD17dGhpcy5yZWFkTWVzc2FnZX1cbiAgICAgICAgICBnYW1lU3RhdGU9e3Byb3BzLmdhbWVTdGF0ZX1cbiAgICAgICAgLz5cbiAgICAgIDwvbGk+LFxuICAgICAgPGxpPlxuICAgICAgICA8SW5ib3hcbiAgICAgICAgICBkYXRhLXJlZj1cIm91dGJveFwiXG4gICAgICAgICAgZGF0YT17e1xuICAgICAgICAgICAgaXRlbXM6IG91dGJveCB8fCBbXSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIGVtcHR5TWVzc2FnZT17c2VudEVtcHR5TWVzc2FnZX1cbiAgICAgICAgICBmcmllbmRLZXk9XCJmcmllbmRfdG9cIlxuICAgICAgICAgIHNlbGVjdFJlc3BvbmQ9e3RoaXMucmVhZE1lc3NhZ2V9XG4gICAgICAgICAgZ2FtZVN0YXRlPXtwcm9wcy5nYW1lU3RhdGV9XG4gICAgICAgIC8+XG4gICAgICA8L2xpPixcbiAgICAgIDxsaT5cbiAgICAgICAgPFNhdmVkTWVzc2FnZXNcbiAgICAgICAgICBkYXRhLXJlZj1cInNhdmVkXCJcbiAgICAgICAgICBkYXRhPXt7XG4gICAgICAgICAgICBpdGVtczogc2F2ZWQgfHwgW10sXG4gICAgICAgICAgfX1cbiAgICAgICAgICBlbXB0eU1lc3NhZ2U9e2RyYWZ0c0VtcHR5TWVzc2FnZX1cbiAgICAgICAgICBzZWxlY3RSZXNwb25kPXt0aGlzLmVkaXRNZXNzYWdlfVxuICAgICAgICAvPlxuICAgICAgPC9saT4sXG4gICAgXTtcbiAgfVxuXG4gIGVkaXRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBza29hc2gudHJpZ2dlcignbG9hZFNrcmliYmxlJywge1xuICAgICAgbWVzc2FnZSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBza29hc2gudHJpZ2dlcignZ290bycsIHtcbiAgICAgIGluZGV4OiAncmVhZCcsXG4gICAgICBtZXNzYWdlLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRGF0YSgpIHtcbiAgICB2YXIgc2tyaWJibGVzLCBpbmJveCwgb3V0Ym94LCBzYXZlZDtcblxuICAgIHNrcmliYmxlcyA9IHRoaXMucHJvcHMuZ2FtZVN0YXRlLmRhdGEuc2tyaWJibGVzO1xuICAgIGluYm94ID0gc2tyaWJibGVzLnJlY2VpdmVkO1xuICAgIG91dGJveCA9IHNrcmliYmxlcy5zZW50O1xuICAgIHNhdmVkID0gc2tyaWJibGVzLmRyYWZ0O1xuXG4gICAgdGhpcy5yZXZlYWxMaXN0ID0gdGhpcy5nZXRSZXZlYWxMaXN0KGluYm94LCBvdXRib3gsIHNhdmVkKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW5ib3gsXG4gICAgICBvdXRib3gsXG4gICAgICBzYXZlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUdhbWVEYXRhKGRhdGEsIHN0YXR1cykge1xuICAgIHZhciBvcHRzID0ge1xuICAgICAgcGF0aDogWydza3JpYmJsZXMnXSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgW3N0YXR1c106IGRhdGEuc2tyaWJibGVcbiAgICAgIH0sXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKG9wdHMpO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBza29hc2gudHJpZ2dlcignZ2V0RGF0YScsIHtcbiAgICAgIHN0YXR1czogJ3JlY2VpdmVkJyxcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgc2VsZi51cGRhdGVHYW1lRGF0YShkYXRhLCAncmVjZWl2ZWQnKTtcbiAgICB9KTtcblxuICAgIHNrb2FzaC50cmlnZ2VyKCdnZXREYXRhJywge1xuICAgICAgc3RhdHVzOiAnc2VudCcsXG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIHNlbGYudXBkYXRlR2FtZURhdGEoZGF0YSwgJ3NlbnQnKTtcbiAgICB9KTtcblxuICAgIHNrb2FzaC50cmlnZ2VyKCdnZXREYXRhJywge1xuICAgICAgc3RhdHVzOiAnZHJhZnQnLFxuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBzZWxmLnVwZGF0ZUdhbWVEYXRhKGRhdGEsICdkcmFmdCcpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICBsb2FkOiB0cnVlLFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIGxlYXZlOiBmYWxzZSxcbiAgICAgIGNsb3NlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCFzZWxmLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgICAgc2VsZi5zdGFydCgpO1xuICAgICAgfVxuICAgIH0sIDI1MCk7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgIDxTZWxlY3RhYmxlUmV2ZWFsXG4gICAgICAgICAgICAgIHJlZj17J3NlbGVjdGFibGVSZXZlYWwnfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlTGlzdD17dGhpcy5zZWxlY3RhYmxlTGlzdH1cbiAgICAgICAgICAgICAgcmV2ZWFsTGlzdD17dGhpcy5yZXZlYWxMaXN0fVxuICAgICAgICAgICAgICBzZWxlY3RPblN0YXJ0PXsnMCd9XG4gICAgICAgICAgICAgIG9wZW5PblN0YXJ0PXsnMCd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxJbmJveFNjcmVlblxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBrZXk9e2tleX1cbiAgICAgIGlkPVwiaW5ib3hcIlxuICAgICAgaGlkZU5leHRcbiAgICAgIGhpZGVQcmV2XG4gICAgLz5cbiAgKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2tyaWJibGUvY29tcG9uZW50cy9pbmJveF9zY3JlZW4uanNcbiAqKi8iLCJpbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyc7XG5pbXBvcnQgUmV2ZWFsIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3JldmVhbC8wLjEuanMnO1xuXG5jbGFzcyBTZWxlY3RhYmxlUmV2ZWFsIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2FuU2VsZWN0T25TdGFydDogdGhpcy5wcm9wcy5jYW5TZWxlY3RPblN0YXJ0XG4gICAgfSk7XG4gIH1cblxuICBvcGVuKG1lc3NhZ2UpIHtcbiAgICB0aGlzLnJlZnMucmV2ZWFsLm9wZW4obWVzc2FnZSk7XG4gIH1cblxuICBzZWxlY3RSZXNwb25kKG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5hbnN3ZXJzLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuYW5zd2Vycy5pbmRleE9mKG1lc3NhZ2UpID09PSAtMSkge1xuICAgICAgICBpZiAodGhpcy5hdWRpby5pbmNvcnJlY3QpIHRoaXMuYXVkaW8uaW5jb3JyZWN0LnBsYXkoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmV2ZWFsQWxsKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJlZnMucmV2ZWFsLm9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbihtZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvLmNvcnJlY3QpIHRoaXMuYXVkaW8uY29ycmVjdC5wbGF5KCk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZWZzLnJldmVhbC5vcGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5vcGVuKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmFsbENvcnJlY3QgJiYgdGhpcy5hdWRpby5jb3JyZWN0KSB7XG4gICAgICAgIHRoaXMuYXVkaW8uY29ycmVjdC5wbGF5KCk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMucmVmcy5yZXZlYWwub3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9wZW4obWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvc2VSZXNwb25kKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZVJlc3BvbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMucHJvcHMuY2xvc2VSZXNwb25kKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQXNzZXRzKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmFzc2V0cykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYXNzZXRzLm1hcCgoYXNzZXQsIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgIHsuLi5hc3NldC5wcm9wc31cbiAgICAgICAgICAgIHJlZj17YXNzZXQucmVmIHx8IGFzc2V0LnByb3BzWydkYXRhLXJlZiddIHx8ICgnYXNzZXQtJyArIGtleSl9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVuZGVyU2VsZWN0YWJsZSgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFNlbGVjdGFibGVcbiAgICAgICAgcmVmPVwic2VsZWN0YWJsZVwiXG4gICAgICAgIGxpc3Q9e3RoaXMucHJvcHMuc2VsZWN0YWJsZUxpc3R9XG4gICAgICAgIHNlbGVjdFJlc3BvbmQ9e3RoaXMuc2VsZWN0UmVzcG9uZC5iaW5kKHRoaXMpfVxuICAgICAgICBzZWxlY3RDbGFzcz17dGhpcy5wcm9wcy5zZWxlY3RhYmxlU2VsZWN0Q2xhc3N9XG4gICAgICAgIGNvbXBsZXRlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2VsZWN0YWJsZUNvbXBsZXRlT25TZWxlY3R9XG4gICAgICAgIGNoZWNrQ29tcGxldGU9e3RoaXMucHJvcHMuc2VsZWN0YWJsZUNoZWNrQ29tcGxldGV9XG4gICAgICAgIHJhbmRvbWl6ZUxpc3Q9e3RoaXMucHJvcHMucmFuZG9taXplU2VsZWN0YWJsZUxpc3R9XG4gICAgICAgIHNlbGVjdE9uU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0T25TdGFydH1cbiAgICAgICAgY2hvb3NlT25lPXt0aGlzLnByb3BzLmNob29zZU9uZX1cbiAgICAgICAgLy8gYW5zd2Vycz17dGhpcy5wcm9wcy5hbnN3ZXJzfVxuICAgICAgICBhbGxvd0Rlc2VsZWN0PXt0aGlzLnByb3BzLmFsbG93RGVzZWxlY3R9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJSZXZlYWwoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSZXZlYWxcbiAgICAgICAgcmVmPVwicmV2ZWFsXCJcbiAgICAgICAgbGlzdD17dGhpcy5wcm9wcy5yZXZlYWxMaXN0fVxuICAgICAgICBhc3NldHM9e3RoaXMucHJvcHMucmV2ZWFsQXNzZXRzfVxuICAgICAgICBjbG9zZVJlc3BvbmQ9e3RoaXMuY2xvc2VSZXNwb25kLmJpbmQodGhpcyl9XG4gICAgICAgIGNvbXBsZXRlT25PcGVuPXt0aGlzLnByb3BzLnJldmVhbENvbXBsZXRlT25PcGVufVxuICAgICAgICBjaGVja0NvbXBsZXRlPXt0aGlzLnByb3BzLnJldmVhbENoZWNrQ29tcGxldGV9XG4gICAgICAgIG9wZW5PblN0YXJ0PXt0aGlzLnByb3BzLm9wZW5PblN0YXJ0fVxuICAgICAgICBoaWRlPXt0aGlzLnByb3BzLmhpZGVSZXZlYWx9XG4gICAgICAgIG9wZW5SZXZlYWw9e3RoaXMucHJvcHMub3BlblJldmVhbH1cbiAgICAgICAgb25PcGVuPXt0aGlzLnByb3BzLm9uT3Blbn1cbiAgICAgICAgb3Blbk11bHRpcGxlPXtmYWxzZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldENsYXNzZXMoKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLmNvbXBsZXRlKSBjbGFzc2VzICs9ICcgQ09NUExFVEUnO1xuXG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2VsZWN0YWJsZS1yZXZlYWwnICsgdGhpcy5nZXRDbGFzc2VzKCl9PlxuICAgICAgICB7dGhpcy5yZW5kZXJBc3NldHMoKX1cbiAgICAgICAge3RoaXMucmVuZGVyU2VsZWN0YWJsZSgpfVxuICAgICAgICB7dGhpcy5yZW5kZXJSZXZlYWwoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0YWJsZVJldmVhbC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgYW5zd2VyczogW10sXG4gIGNhblNlbGVjdE9uU3RhcnQ6IHRydWVcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0YWJsZVJldmVhbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZV9yZXZlYWwvMC4xLmpzXG4gKiovIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFJldmVhbCBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG9wZW5SZXZlYWw6ICcnLFxuICAgICAgY3VycmVudGx5T3BlbjogW11cbiAgICB9O1xuXG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxuICBpbmNvbXBsZXRlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgb3BlblJldmVhbDogJycsXG4gICAgICBjdXJyZW50bHlPcGVuOiBbXVxuICAgIH0pO1xuXG4gICAgc3VwZXIuaW5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb3BlbihtZXNzYWdlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjdXJyZW50bHlPcGVuID0gdGhpcy5wcm9wcy5vcGVuTXVsdGlwbGUgP1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50bHlPcGVuLmNvbmNhdChtZXNzYWdlKSA6IFttZXNzYWdlXTtcblxuICAgIHNlbGYuc2V0U3RhdGUoe1xuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIGN1cnJlbnRseU9wZW4sXG4gICAgICBvcGVuUmV2ZWFsOiAnJyArIG1lc3NhZ2UsXG4gICAgfSk7XG5cbiAgICBzZWxmLnBsYXlBdWRpbyhtZXNzYWdlKTtcblxuICAgIGlmIChzZWxmLnByb3BzLmNvbXBsZXRlT25PcGVuKSB7XG4gICAgICBzZWxmLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYucmVxdWlyZUZvckNvbXBsZXRlLm1hcChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBtZXNzYWdlICYmIHNlbGYucmVmc1trZXldKSB7XG4gICAgICAgICAgc2VsZi5yZWZzW2tleV0uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGYucHJvcHMuYXV0b0Nsb3NlKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGYucHJvcHMub3BlblRhcmdldCkge1xuICAgICAgc2VsZi51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICBwYXRoOiBzZWxmLnByb3BzLm9wZW5UYXJnZXQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBvcGVuOiAnJyArIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZi5wcm9wcy5vbk9wZW4uY2FsbChzZWxmLCBtZXNzYWdlKTtcbiAgfVxuXG4gIGNsb3NlKG9wdHMgPSB7fSkge1xuICAgIHZhciBwcmV2TWVzc2FnZSA9IHRoaXMuc3RhdGUub3BlblJldmVhbDtcbiAgICB2YXIgY3VycmVudGx5T3BlbiA9IHRoaXMuc3RhdGUuY3VycmVudGx5T3BlbjtcbiAgICBjdXJyZW50bHlPcGVuLnNwbGljZShjdXJyZW50bHlPcGVuLmluZGV4T2YocHJldk1lc3NhZ2UpLCAxKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBvcGVuUmV2ZWFsOiAnJyxcbiAgICAgIGN1cnJlbnRseU9wZW4sXG4gICAgfSk7XG5cbiAgICBpZiAoIW9wdHMuc2lsZW50ICYmIHRoaXMuYXVkaW9bJ2Nsb3NlLXNvdW5kJ10pIHtcbiAgICAgIHRoaXMuYXVkaW9bJ2Nsb3NlLXNvdW5kJ10ucGxheSgpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25DbG9zZS5jYWxsKHRoaXMpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlUmVzcG9uZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcm9wcy5jbG9zZVJlc3BvbmQocHJldk1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgaWYgKHRoaXMucHJvcHMub3Blbk9uU3RhcnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5vcGVuKHRoaXMucHJvcHMub3Blbk9uU3RhcnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zdGFydCAmJiB0eXBlb2YgdGhpcy5wcm9wcy5zdGFydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcm9wcy5zdGFydC5jYWxsKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlKHtzaWxlbnQ6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBwbGF5QXVkaW8obWVzc2FnZSkge1xuICAgIHZhciBtZXNzYWdlcztcblxuICAgIGlmICgnJyArIHBhcnNlSW50KG1lc3NhZ2UsIDEwKSA9PT0gbWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9ICdhc3NldC0nICsgbWVzc2FnZTtcbiAgICB9XG5cbiAgICBpZiAoIW1lc3NhZ2UpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmF1ZGlvWydvcGVuLXNvdW5kJ10pIHtcbiAgICAgIHRoaXMuYXVkaW9bJ29wZW4tc291bmQnXS5wbGF5KCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlLnNwbGl0KCcgJyk7XG4gICAgICBtZXNzYWdlcy5tYXAoYXVkaW8gPT4ge1xuICAgICAgICBpZiAodGhpcy5hdWRpb1thdWRpb10pIHtcbiAgICAgICAgICB0aGlzLmF1ZGlvW2F1ZGlvXS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tZWRpYVthdWRpb10gJiYgdHlwZW9mIHRoaXMubWVkaWFbYXVkaW9dLnBsYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLm1lZGlhW2F1ZGlvXS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5hdWRpby52b2ljZU92ZXJbbWVzc2FnZV0pIHtcbiAgICAgICAgdGhpcy5hdWRpby52b2ljZU92ZXJbbWVzc2FnZV0ucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlckFzc2V0cygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5hc3NldHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmFzc2V0cy5tYXAoKGFzc2V0LCBrZXkpID0+IHtcbiAgICAgICAgdmFyIHJlZiA9IGFzc2V0LnJlZiB8fCBhc3NldC5wcm9wc1snZGF0YS1yZWYnXSB8fCAnYXNzZXQtJyArIGtleTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8YXNzZXQudHlwZVxuICAgICAgICAgICAgey4uLmFzc2V0LnByb3BzfVxuICAgICAgICAgICAgZGF0YS1yZWY9e2tleX1cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVuZGVyTGlzdCgpIHtcbiAgICB2YXIgbGlzdCA9IHRoaXMucHJvcHMubGlzdDtcblxuICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgdmFyIGRhdGFSZWYgPSBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICB2YXIgcmVmID0gbGkucmVmIHx8IGRhdGFSZWY7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGkudHlwZVxuICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzcyhsaSwga2V5KX1cbiAgICAgICAgICBkYXRhLXJlZj17ZGF0YVJlZn1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMub3BlblJldmVhbCAhPSBudWxsICYmIHByb3BzLm9wZW5SZXZlYWwgIT09IHRoaXMucHJvcHMub3BlblJldmVhbCkge1xuICAgICAgdGhpcy5vcGVuKHByb3BzLm9wZW5SZXZlYWwpO1xuICAgIH1cblxuICAgIGlmIChwcm9wcy5jbG9zZVJldmVhbCA9PT0gdHJ1ZSAmJiBwcm9wcy5jbG9zZVJldmVhbCAhPT0gdGhpcy5wcm9wcy5jbG9zZVJldmVhbCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldENsYXNzKGxpLCBrZXkpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICcnO1xuXG4gICAgaWYgKGxpLnByb3BzLmNsYXNzTmFtZSkgY2xhc3NlcyA9IGxpLnByb3BzLmNsYXNzTmFtZTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRseU9wZW4uaW5kZXhPZihrZXkpICE9PSAtMSB8fFxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRseU9wZW4uaW5kZXhPZignJyArIGtleSkgIT09IC0xIHx8XG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudGx5T3Blbi5pbmRleE9mKGxpLnByb3BzWydkYXRhLXJlZiddKSAhPT0gLTEgfHxcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50bHlPcGVuLmluZGV4T2YobGkucmVmKSAhPT0gLTFcbiAgICApIHtcbiAgICAgIGNsYXNzZXMgPSBjbGFzc05hbWVzKGNsYXNzZXMsICdPUEVOJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICBnZXRDbGFzc05hbWVzKCkge1xuICAgIHZhciBjbGFzc2VzLCBvcGVuID0gJ29wZW4tbm9uZSAnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgb3BlbiA9ICcnO1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50bHlPcGVuLmZvckVhY2gocmVmID0+IHtcbiAgICAgICAgb3BlbiArPSAnb3Blbi0nICsgcmVmICsgJyAnO1xuICAgICAgfSk7XG4gICAgICBvcGVuICs9ICdPUEVOJztcbiAgICB9XG5cbiAgICBjbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICdyZXZlYWwnLFxuICAgICAgb3BlbixcbiAgICAgIHN1cGVyLmdldENsYXNzTmFtZXMoKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgIHt0aGlzLnJlbmRlckFzc2V0cygpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY2xvc2UtcmV2ZWFsXCIgb25DbGljaz17dGhpcy5jbG9zZS5iaW5kKHRoaXMpfT48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJldmVhbC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgbGlzdDogW1xuICAgIDxsaT48L2xpPixcbiAgICA8bGk+PC9saT4sXG4gICAgPGxpPjwvbGk+LFxuICAgIDxsaT48L2xpPlxuICBdLFxuICBvcGVuTXVsdGlwbGU6IHRydWUsXG4gIG9uT3BlbjogXy5ub29wLFxuICBvbkNsb3NlOiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFJldmVhbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmV2ZWFsLzAuMS5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgU2VsZWN0YWJsZSBmcm9tICcuLi9zZWxlY3RhYmxlLzAuMSc7XG5cbmNsYXNzIEluYm94IGV4dGVuZHMgU2VsZWN0YWJsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzZWxlY3RIZWxwZXIoZSkge1xuICAgIHZhciBsaSwgbWVzc2FnZSwga2V5LCBjbGFzc2VzID0gW107XG5cbiAgICBsaSA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG5cbiAgICBpZiAoIWxpKSByZXR1cm47XG5cbiAgICBrZXkgPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVmJyk7XG5cbiAgICBpZiAoIXRoaXMucmVmc1trZXldKSByZXR1cm47XG5cbiAgICBtZXNzYWdlID0gdGhpcy5yZWZzW2tleV0ucHJvcHMuaXRlbTtcbiAgICBjbGFzc2VzW2tleV0gPSB0aGlzLnByb3BzLnNlbGVjdENsYXNzO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtZXNzYWdlLFxuICAgICAgY2xhc3NlcyxcbiAgICB9KTtcblxuICAgIGlmIChtZXNzYWdlLnN0YXR1cyAhPT0gJ0NPTVBMRVRFJykgcmV0dXJuO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnNlbGVjdFJlc3BvbmQgPT09ICdmdW5jdGlvbicgJiYgbWVzc2FnZSkge1xuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RSZXNwb25kKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldENsYXNzKGtleSwgcmVhZCkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKFxuICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2tleV0sIHtcbiAgICAgICAgVU5SRUFEOiB0aGlzLnByb3BzLmZyaWVuZEtleSA9PT0gJ2NyZWF0ZWRfYnknICYmICFyZWFkLFxuICAgICAgICBTRU5UOiB0aGlzLnByb3BzLmZyaWVuZEtleSAhPT0gJ2NyZWF0ZWRfYnknXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgJ2l0ZW0tZHJhd2VyJzogdHJ1ZSxcbiAgICAgIENPTVBMRVRFOiB0aGlzLnN0YXRlLmNvbXBsZXRlLFxuICAgIH0sIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcbiAgfVxuXG4gIGdldFN0YXR1c1RleHQoaXRlbSkge1xuICAgIGlmICghaXRlbS5zdGF0dXMgfHwgaXRlbS5zdGF0dXMgPT09ICdDT01QTEVURScpIHJldHVybiAnJztcbiAgICByZXR1cm4gaXRlbS5zdGF0dXM7XG4gIH1cblxuICByZW5kZXJMaXN0KCkge1xuICAgIHZhciBpdGVtcywgZnJpZW5kcztcblxuICAgIGlmICghdGhpcy5wcm9wcy5kYXRhIHx8ICF0aGlzLnByb3BzLmRhdGEuaXRlbXMpIHJldHVybjtcblxuICAgIGl0ZW1zID0gdGhpcy5wcm9wcy5kYXRhLml0ZW1zO1xuXG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJlbXB0eVwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmVtcHR5TWVzc2FnZX1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnJpZW5kcyA9IF8uZ2V0KHRoaXMucHJvcHMuZ2FtZVN0YXRlLCAnZGF0YS51c2VyJywgW10pO1xuXG4gICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwga2V5KSA9PiB7XG4gICAgICB2YXIgdGltZXN0YW1wLCBpbWFnZSwgbmFtZTtcbiAgICAgIHRpbWVzdGFtcCA9IG1vbWVudC51dGMoaXRlbS51cGRhdGVkKS5sb2NhbCgpO1xuICAgICAga2V5ID0gJ21lc3NhZ2UtJyArIGtleTtcblxuICAgICAgZnJpZW5kcy5mb3JFYWNoKGZyaWVuZCA9PiB7XG4gICAgICAgIGlmIChpdGVtW3RoaXMucHJvcHMuZnJpZW5kS2V5XSA9PT0gZnJpZW5kLmZyaWVuZF9pZCkge1xuICAgICAgICAgIGltYWdlID0gZnJpZW5kLl9lbWJlZGRlZC5pbWFnZSA/IGZyaWVuZC5fZW1iZWRkZWQuaW1hZ2UudXJsIDogJyc7XG4gICAgICAgICAgbmFtZSA9IGZyaWVuZC51c2VybmFtZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignZ2V0RGF0YScsIHtcbiAgICAgICAgICBuYW1lOiAnZ2V0RnJpZW5kJyxcbiAgICAgICAgICAnZnJpZW5kX2lkJzogaXRlbVt0aGlzLnByb3BzLmZyaWVuZEtleV0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wcm9wcy5mcmllbmRLZXkgPT09ICdmcmllbmRfdG8nKSB7XG4gICAgICAgIGl0ZW0uc2VudCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guTGlzdEl0ZW1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBpdGVtLnJlYWQpfVxuICAgICAgICAgIHJlZj17a2V5fVxuICAgICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgPlxuICAgICAgICAgIDxza29hc2guSW1hZ2Ugc3JjPXtpbWFnZX0gLz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyd1c2VybmFtZScgKyAobmFtZS5sZW5ndGggPiAxNSA/ICcgbG9uZycgOiAnJyl9PlxuICAgICAgICAgICAge25hbWV9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVzdGFtcFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnt0aW1lc3RhbXAuZm9ybWF0KCdNTS5ERC5ZWScpfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVcIj57dGltZXN0YW1wLmZvcm1hdCgnaDptbSBhJyl9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydzdGF0dXMgJyArIGl0ZW0uc3RhdHVzfT5cbiAgICAgICAgICAgIHt0aGlzLmdldFN0YXR1c1RleHQoaXRlbSl9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3Nrb2FzaC5MaXN0SXRlbT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXt0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmJpbmQodGhpcyl9PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSW5ib3guZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gIGZyaWVuZEtleTogJ2NyZWF0ZWRfYnknLFxuICBnYW1lU3RhdGU6IHt9LFxufSwgU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBJbmJveDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW5ib3gvMC4xLmpzXG4gKiovIiwiaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnLi4vc2VsZWN0YWJsZS8wLjEnO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgU2F2ZWRNZXNzYWdlcyBleHRlbmRzIFNlbGVjdGFibGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2VsZWN0SGVscGVyKGUpIHtcbiAgICB2YXIgbGksIG1lc3NhZ2UsIGtleSwgY2xhc3NlcyA9IFtdO1xuXG4gICAgbGkgPSBlLnRhcmdldC5jbG9zZXN0KCdMSScpO1xuXG4gICAgaWYgKCFsaSkgcmV0dXJuO1xuXG4gICAga2V5ID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuXG4gICAgbWVzc2FnZSA9IHRoaXMucmVmc1trZXldLnByb3BzLml0ZW07XG4gICAgY2xhc3Nlc1trZXldID0gdGhpcy5zdGF0ZS5zZWxlY3RDbGFzcztcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIGNsYXNzZXMsXG4gICAgfSwgdGhpcy5zZWxlY3RSZXNwb25kLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2VsZWN0UmVzcG9uZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuc2VsZWN0UmVzcG9uZCA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLnN0YXRlLm1lc3NhZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0UmVzcG9uZCh0aGlzLnN0YXRlLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldENsYXNzKGtleSkge1xuICAgIHJldHVybiBjbGFzc05hbWVzKHtcbiAgICAgIFt0aGlzLnN0YXRlLmNsYXNzZXNba2V5XSB8fCAnJ106IHRydWUsXG4gICAgICBEUkFGVDogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgJ2l0ZW0tZHJhd2VyJzogdHJ1ZSxcbiAgICAgIFNBVkVEOiB0cnVlLFxuICAgICAgQ09NUExFVEU6IHRoaXMuc3RhdGUuY29tcGxldGUsXG4gICAgfSwgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xuICB9XG5cbiAgcmVuZGVyVGh1bWIoaXRlbSkge1xuICAgIHZhciBmaXJzdEltZywgYmFja2dyb3VuZDtcblxuICAgIGJhY2tncm91bmQgPSBpdGVtICYmIGl0ZW0ucnVsZXMgJiYgaXRlbS5ydWxlcy5iYWNrZ3JvdW5kICYmXG4gICAgICBpdGVtLnJ1bGVzLmJhY2tncm91bmQuc3JjID8gaXRlbS5ydWxlcy5iYWNrZ3JvdW5kLnNyYyA6XG4gICAgICAnJztcblxuICAgIGZpcnN0SW1nID0gaXRlbSAmJiBpdGVtLnJ1bGVzICYmIGl0ZW0ucnVsZXMuaXRlbXMgJiZcbiAgICAgIGl0ZW0ucnVsZXMuaXRlbXNbMF0gJiYgaXRlbS5ydWxlcy5pdGVtc1swXS5zcmMgP1xuICAgICAgaXRlbS5ydWxlcy5pdGVtc1swXS5zcmMgOiAoXG4gICAgICAgIGl0ZW0gJiYgaXRlbS5ydWxlcyAmJiBpdGVtLnJ1bGVzLm1lc3NhZ2VzICYmXG4gICAgICAgIGl0ZW0ucnVsZXMubWVzc2FnZXNbMF0gJiYgaXRlbS5ydWxlcy5tZXNzYWdlc1swXS5zcmMgP1xuICAgICAgICBpdGVtLnJ1bGVzLm1lc3NhZ2VzWzBdLnNyYyA6ICcnXG4gICAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwidGh1bWJuYWlsXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtiYWNrZ3JvdW5kfSlgXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxza29hc2guSW1hZ2Ugc3JjPXtmaXJzdEltZ30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJMaXN0KCkge1xuICAgIHZhciBpdGVtcywgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAoIXNlbGYucHJvcHMuZGF0YSB8fCAhc2VsZi5wcm9wcy5kYXRhLml0ZW1zKSByZXR1cm47XG5cbiAgICBpdGVtcyA9IHNlbGYucHJvcHMuZGF0YS5pdGVtcztcblxuICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZW1wdHlcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5lbXB0eU1lc3NhZ2V9XG4gICAgICAgIDwvbGk+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgdmFyIHRpbWVzdGFtcCA9IG1vbWVudC51dGMoaXRlbS51cGRhdGVkKS5sb2NhbCgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5MaXN0SXRlbVxuICAgICAgICAgIGNsYXNzTmFtZT17c2VsZi5nZXRDbGFzcyhrZXkpfVxuICAgICAgICAgIHJlZj17a2V5fVxuICAgICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgPlxuICAgICAgICAgIHtzZWxmLnJlbmRlclRodW1iKGl0ZW0pfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVzdGFtcFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPnt0aW1lc3RhbXAuZm9ybWF0KCdNTS5ERC5ZWScpfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVcIj57dGltZXN0YW1wLmZvcm1hdCgnaDptbSBhJyl9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9za29hc2guTGlzdEl0ZW0+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8dWwgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gb25DbGljaz17dGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNhdmVkTWVzc2FnZXM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NhdmVkX21lc3NhZ2VzLzAuMS5qc1xuICoqLyIsImltcG9ydCBDYW52YXMgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2FudmFzLzAuMSc7XG5pbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyc7XG5pbXBvcnQgUmVwZWF0ZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcmVwZWF0ZXIvMC4xLmpzJztcblxuY29uc3QgY2xhc3NOYW1lVGV4dCA9IHtcbiAgc2tyaWJibGVCb3g6ICdza3JpYmJsZS1ib3gnLFxuICBib3g6ICdib3gnLFxuICBsZWZ0TWVudTogJ21lbnUgbGVmdC1tZW51JyxcbiAgcmlnaHRNZW51OiAnbWVudSByaWdodC1tZW51Jyxcbn07XG5cbmNvbnN0IHJlZnMgPSB7XG4gIGJveDogJ2JveCcsXG4gIGNhbnZhczogJ2NhbnZhcydcbn07XG5cbmNsYXNzIFByZXZpZXdTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBsb2FkOiB0cnVlLFxuICAgICAgb3B0czoge30sXG4gICAgfTtcblxuICAgIHRoaXMubGVmdE1lbnVMaXN0ID0gW1xuICAgICAgPGxpIGNsYXNzTmFtZT1cImVkaXRcIiBvbkNsaWNrPXt0aGlzLmdvdG8uYmluZCh0aGlzLCAnY2FudmFzJyl9PlxuICAgICAgICA8c3BhbiAvPlxuICAgICAgPC9saT4sXG4gICAgXTtcblxuICAgIHRoaXMucmlnaHRNZW51TGlzdCA9IFtcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJzZW5kXCIgb25DbGljaz17dGhpcy5nb3RvLmJpbmQodGhpcywgJ3NlbmQnKX0+XG4gICAgICAgIDxzcGFuIC8+XG4gICAgICA8L2xpPlxuICAgIF07XG4gIH1cblxuICBvcGVuKG9wdHMpIHtcbiAgICBza29hc2gudHJpZ2dlcignZ2V0UnVsZXMnKS50aGVuKHJ1bGVzID0+IHtcbiAgICAgIHRoaXMucmVmc1tyZWZzLmJveF0ucmVmc1tyZWZzLmNhbnZhc10uc2V0SXRlbXMocnVsZXMpO1xuICAgICAgc3VwZXIub3BlbihvcHRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxza29hc2guQ29tcG9uZW50IHJlZj17cmVmcy5ib3h9IGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5za3JpYmJsZUJveH0+XG4gICAgICAgICAgPENhbnZhcyByZWY9e3JlZnMuY2FudmFzfSBwcmV2aWV3IC8+XG4gICAgICAgICAgPFJlcGVhdGVyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJzcGFya2xlc1wiXG4gICAgICAgICAgICBhbW91bnQ9ezQwfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQuYm94fSAvPlxuICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDxTZWxlY3RhYmxlIGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5sZWZ0TWVudX0gbGlzdD17dGhpcy5sZWZ0TWVudUxpc3R9IC8+XG4gICAgICAgIDxTZWxlY3RhYmxlIGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5yaWdodE1lbnV9IGxpc3Q9e3RoaXMucmlnaHRNZW51TGlzdH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxQcmV2aWV3U2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJwcmV2aWV3XCJcbiAgICAgIGhpZGVOZXh0XG4gICAgICBoaWRlUHJldlxuICAgIC8+XG4gICk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvcHJldmlld19zY3JlZW4uanNcbiAqKi8iLCJjbGFzcyBSZXBlYXRlciBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICByZW5kZXJDb250ZW50TGlzdCgpIHtcbiAgICB2YXIgYSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5hbW91bnQ7IGkrKykge1xuICAgICAgYS5wdXNoKDx0aGlzLnByb3BzLml0ZW0ga2V5PXtpfSB7Li4udGhpcy5wcm9wcy5wcm9wc1tpXX0gLz4pO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfVxufVxuXG5SZXBlYXRlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgYW1vdW50OiAxLFxuICBpdGVtOiAnZGl2JyxcbiAgcHJvcHM6IFtdLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBSZXBlYXRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmVwZWF0ZXIvMC4xLmpzXG4gKiovIiwiaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEuanMnO1xuXG5jb25zdCBjbGFzc05hbWVUZXh0ID0ge1xuICB5b3VyTWVzc2FnZVRvOiAneW91ci1tZXNzYWdlLXRvJyxcbiAgaXNSZWFkeTogJ2lzLXJlYWR5JyxcbiAgY2hhbmdlRnJpZW5kOiAnY2hhbmdlLWZyaWVuZCcsXG4gIGNoYXJhY3RlcjogJ2NoYXJhY3RlcicsXG4gIGdpZnQ6ICdnaWZ0JyxcbiAgaGVhZGVyOiAnaGVhZGVyJyxcbiAgdXNlcm5hbWU6ICd1c2VybmFtZScsXG59O1xuXG5jbGFzcyBTZW5kU2NyZWVuIGV4dGVuZHMgc2tvYXNoLlNjcmVlbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlLmxvYWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhdGUucmVjaXBpZW50ID0ge307XG5cbiAgICB0aGlzLnJpZ2h0TWVudUxpc3QgPSBbXG4gICAgICA8bGkgY2xhc3NOYW1lPVwiZWRpdC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuZ290by5iaW5kKHRoaXMsICdjYW52YXMnKX0+XG4gICAgICAgIDxzcGFuIC8+XG4gICAgICA8L2xpPixcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJzZW5kXCIgb25DbGljaz17dGhpcy5zZW5kfT5cbiAgICAgICAgPHNwYW4gLz5cbiAgICAgIDwvbGk+XG4gICAgXTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdmFyIHJlY2lwaWVudCA9IHRoaXMucHJvcHMuZ2FtZVN0YXRlLnJlY2lwaWVudCB8fCB7fTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbG9hZDogdHJ1ZSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBsZWF2ZTogZmFsc2UsXG4gICAgICBjbG9zZTogZmFsc2UsXG4gICAgICByZWNpcGllbnRcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIHNlbmQoKSB7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ3Bhc3NEYXRhJywge1xuICAgICAgbmFtZTogJ3NlbmQnLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICB2YXIgY2hhbmdlRnJpZW5kQ2xpY2sgPSB0aGlzLmdvdG8uYmluZCh0aGlzLCB7XG4gICAgICBpbmRleDogJ2ZyaWVuZCcsXG4gICAgICBnb3RvOiAnc2VuZCcsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQuaGVhZGVyfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQueW91ck1lc3NhZ2VUb30gLz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQudXNlcm5hbWV9Pnt0aGlzLnN0YXRlLnJlY2lwaWVudC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICA8YnIvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5pc1JlYWR5fSAvPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtjbGFzc05hbWVUZXh0LmNoYW5nZUZyaWVuZH0gb25DbGljaz17Y2hhbmdlRnJpZW5kQ2xpY2t9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5jaGFyYWN0ZXJ9PlxuICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwib3R0ZXJcIiBzcmM9XCJtZWRpYS9fT3R0ZXIvcHJvdWQtb2YteW91Mi5naWZcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnViYmxlXCI+XG4gICAgICAgICAgICBBcmUgeW91IHN1cmU8YnIvPlxuICAgICAgICAgICAgeW91IGFyZSByZWFkeSB0bzxici8+XG4gICAgICAgICAgICBzZW5kIHlvdXIgbWVzc2FnZT9cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVUZXh0LmdpZnR9IC8+XG4gICAgICAgIDxTZWxlY3RhYmxlIGNsYXNzTmFtZT1cIm1lbnUgcmlnaHQtbWVudVwiIGxpc3Q9e3RoaXMucmlnaHRNZW51TGlzdH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxTZW5kU2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJzZW5kXCJcbiAgICAgIGhpZGVOZXh0XG4gICAgICBoaWRlUHJldlxuICAgIC8+XG4gICk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvc2VuZF9zY3JlZW4uanNcbiAqKi8iLCJjb25zdCBjbGFzc05hbWVUZXh0ID0ge1xuICBjaGFyYWN0ZXI6ICdjaGFyYWN0ZXInLFxuICBoZWFkZXI6ICdoZWFkZXInLFxuICB5b3VyTWVzc2FnZVRvOiAneW91ci1tZXNzYWdlLXRvJyxcbiAgdXNlcm5hbWU6ICd1c2VybmFtZScsXG4gIGlzUmVhZHk6ICdpcy1yZWFkeScsXG4gIGJ1dHRvbnM6ICdidXR0b25zJyxcbiAgY3JlYXRlQW5vdGhlcjogJ2NyZWF0ZS1hbm90aGVyJyxcbiAgaW5ib3g6ICdpbmJveCcsXG59O1xuXG5jb25zdCB0ZXh0ID0ge1xuICB5b3VyTWVzc2FnZVRvOiAnWU9VUiBNRVNTQUdFIFRPOicsXG4gIGhhc0JlZW5TZW50OiAnSVMgQkVJTkcgU0VOVCEnLFxufTtcblxuY2xhc3MgU2VudFNjcmVlbiBleHRlbmRzIHNrb2FzaC5TY3JlZW4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxvYWQ6IHRydWUsXG4gICAgICBvcHRzOiB7XG4gICAgICAgIHJlY2lwaWVudDoge31cbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVUZXh0LmNoYXJhY3Rlcn0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQuaGVhZGVyfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQueW91ck1lc3NhZ2VUb30+e3RleHQueW91ck1lc3NhZ2VUb308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVUZXh0LnVzZXJuYW1lfT57dGhpcy5zdGF0ZS5vcHRzLnJlY2lwaWVudC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICA8YnIvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5pc1JlYWR5fT57dGV4dC5oYXNCZWVuU2VudH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5idXR0b25zfT5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17Y2xhc3NOYW1lVGV4dC5jcmVhdGVBbm90aGVyfSBvbkNsaWNrPXt0aGlzLmdvdG8uYmluZCh0aGlzLCAnZnJpZW5kJyl9IC8+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQuaW5ib3h9IG9uQ2xpY2s9e3RoaXMuZ290by5iaW5kKHRoaXMsICdpbmJveCcpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICByZXR1cm4gKFxuICAgIDxTZW50U2NyZWVuXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGtleT17a2V5fVxuICAgICAgaWQ9XCJzZW50XCJcbiAgICAgIGhpZGVOZXh0XG4gICAgICBoaWRlUHJldlxuICAgIC8+XG4gICk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvc2VudF9zY3JlZW4uanNcbiAqKi8iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEuanMnO1xuXG5jb25zdCBjbGFzc05hbWVUZXh0ID0ge1xuICBza3JpYmJsZUJveDogJ3NrcmliYmxlLWJveCcsXG4gIGJveDogJ2JveCcsXG4gIGxlZnRNZW51OiAnbWVudSBsZWZ0LW1lbnUnLFxuICByaWdodE1lbnU6ICdtZW51IHJpZ2h0LW1lbnUnLFxuICBzZW5kZXI6ICdtZW51IHJlY2lwaWVudCBzZW5kZXInLFxufTtcblxuY29uc3QgcmVmcyA9IHtcbiAgYm94OiAnYm94Jyxcbn07XG5cbmNsYXNzIFJlYWRTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUubG9hZCA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZS5tZXNzYWdlID0ge3VzZXI6IHt9fTtcblxuICAgIHRoaXMubGVmdE1lbnVMaXN0ID0gW1xuICAgICAgPGxpIGNsYXNzTmFtZT1cImluYm94XCIgb25DbGljaz17dGhpcy5nb3RvLmJpbmQodGhpcywgJ2luYm94Jyl9PlxuICAgICAgICA8c3BhbiAvPlxuICAgICAgPC9saT5cbiAgICBdO1xuXG4gICAgdGhpcy5yaWdodE1lbnVMaXN0ID0gW1xuICAgICAgPGxpIGNsYXNzTmFtZT1cInJlcGx5XCIgb25DbGljaz17dGhpcy5yZXBseS5iaW5kKHRoaXMpfT5cbiAgICAgICAgPHNwYW4gLz5cbiAgICAgIDwvbGk+XG4gICAgXTtcbiAgfVxuXG4gIHJlcGx5KCkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCdwYXNzRGF0YScsIHtcbiAgICAgIG5hbWU6ICdhZGQtcmVjaXBpZW50JyxcbiAgICAgIG1lc3NhZ2U6IHRoaXMuc3RhdGUubWVzc2FnZS5jcmVhdGVkX2J5LFxuICAgIH0pO1xuICB9XG5cbiAgb3BlbihvcHRzKSB7XG4gICAgdmFyIG1lc3NhZ2UsIGZyaWVuZHMsIGNyZWF0ZXI7XG5cbiAgICBtZXNzYWdlID0gb3B0cy5tZXNzYWdlIHx8IHt9O1xuXG4gICAgZnJpZW5kcyA9IHRoaXMucHJvcHMuZ2FtZVN0YXRlLmRhdGEudXNlciB8fCBbXTtcbiAgICBmcmllbmRzLmZvckVhY2goZnJpZW5kID0+IHtcbiAgICAgIGlmIChtZXNzYWdlLmNyZWF0ZWRfYnkgPT09IGZyaWVuZC5mcmllbmRfaWQpIHtcbiAgICAgICAgY3JlYXRlciA9IGZyaWVuZDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbG9hZDogdHJ1ZSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBsZWF2ZTogZmFsc2UsXG4gICAgICBjbG9zZTogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgICAgY3JlYXRlclxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGFydCgpO1xuXG4gICAgc2tvYXNoLnRyaWdnZXIoJ2dldERhdGEnLCB7XG4gICAgICBuYW1lOiAnbWFya0FzUmVhZCcsXG4gICAgICAnc2tyaWJibGVfaWQnOiBtZXNzYWdlLnNrcmliYmxlX2lkLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U2VuZGVyQ2xhc3NOYW1lcygpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgIGNsYXNzTmFtZVRleHQuc2VuZGVyLCB7XG4gICAgICAgIEhJREU6ICF0aGlzLnN0YXRlLmNyZWF0ZXIgfHwgdGhpcy5zdGF0ZS5tZXNzYWdlLnNlbnRcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyU2VuZGVyKCkge1xuICAgIHZhciBjcmVhdGVyLCBjb250ZW50ID0gW107XG5cbiAgICBjcmVhdGVyID0gdGhpcy5zdGF0ZS5jcmVhdGVyO1xuXG4gICAgaWYgKCFjcmVhdGVyKSByZXR1cm47XG5cbiAgICBpZiAoY3JlYXRlci51c2VybmFtZSkge1xuICAgICAgY29udGVudC5wdXNoKDxzcGFuIGNsYXNzTmFtZT1cIm5hbWVcIj57Y3JlYXRlci51c2VybmFtZX08L3NwYW4+KTtcbiAgICB9XG5cbiAgICBpZiAoY3JlYXRlci5fZW1iZWRkZWQuaW1hZ2UpIHtcbiAgICAgIGNvbnRlbnQucHVzaCg8aW1nIGNsYXNzTmFtZT1cInByb2ZpbGUtaW1hZ2VcIiBzcmM9e2NyZWF0ZXIuX2VtYmVkZGVkLmltYWdlLnVybH0gLz4pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgcmVuZGVyQm94Q29udGVudCgpIHtcbiAgICB2YXIgdXJsID0gXy5nZXQodGhpcy5zdGF0ZSwgJ21lc3NhZ2UudXJsJyk7XG5cbiAgICBpZiAoIXVybCkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gW1xuICAgICAgPHNrb2FzaC5JbWFnZSBzcmM9e3RoaXMuc3RhdGUubWVzc2FnZS51cmx9IC8+LFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQuYm94fSAvPixcbiAgICBdO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT17dGhpcy5nZXRTZW5kZXJDbGFzc05hbWVzKCl9PlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTZW5kZXIoKX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCByZWY9e3JlZnMuYm94fSBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQuc2tyaWJibGVCb3h9PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckJveENvbnRlbnQoKX1cbiAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8U2VsZWN0YWJsZSBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQubGVmdE1lbnV9IGxpc3Q9e3RoaXMubGVmdE1lbnVMaXN0fSAvPlxuICAgICAgICA8U2VsZWN0YWJsZSBjbGFzc05hbWU9e2NsYXNzTmFtZVRleHQucmlnaHRNZW51fSBsaXN0PXt0aGlzLnJpZ2h0TWVudUxpc3R9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgcmV0dXJuIChcbiAgICA8UmVhZFNjcmVlblxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBrZXk9e2tleX1cbiAgICAgIGlkPVwicmVhZFwiXG4gICAgICBoaWRlTmV4dFxuICAgICAgaGlkZVByZXZcbiAgICAvPlxuICApO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL3JlYWRfc2NyZWVuLmpzXG4gKiovIiwiY2xhc3MgUXVpdFNjcmVlbiBleHRlbmRzIHNrb2FzaC5TY3JlZW4ge1xuICBva2F5KCkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCdxdWl0Jyk7XG4gIH1cblxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHNrb2FzaC50cmlnZ2VyKCdtZW51Q2xvc2UnLCB7XG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckFzc2V0cygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5hc3NldHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmFzc2V0cy5tYXAoKGFzc2V0LCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICB7Li4uYXNzZXQucHJvcHN9XG4gICAgICAgICAgICByZWY9e2Fzc2V0LnJlZiB8fCBhc3NldC5wcm9wc1snZGF0YS1yZWYnXSB8fCAoJ2Fzc2V0LScgKyBrZXkpfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBkYXRhLXJlZj17a2V5fVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXsnc2NyZWVuICcgKyB0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgIHt0aGlzLnJlbmRlckFzc2V0cygpfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgIDxoMj5BcmUgeW91IHN1cmUgeW91PGJyLz53YW50IHRvIHF1aXQ/PC9oMj5cbiAgICAgICAgICAgIDxoMz5Zb3VyIGdhbWUgcHJvZ3Jlc3Mgd2lsbCBiZSBzYXZlZDwvaDM+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInF1aXQteWVzXCIgb25DbGljaz17dGhpcy5va2F5LmJpbmQodGhpcyl9PjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJxdWl0LW5vXCIgb25DbGljaz17dGhpcy5jYW5jZWwuYmluZCh0aGlzKX0+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoXG4gIDxRdWl0U2NyZWVuXG4gICAgaWQ9XCJxdWl0XCJcbiAgLz5cbik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3F1aXRfc2NyZWVuLzAuMS5qc1xuICoqLyIsImNsYXNzIFNhdmVNZW51IGV4dGVuZHMgc2tvYXNoLlNjcmVlbiB7XG4gIGNhbmNlbCgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgc2tvYXNoLnRyaWdnZXIoJ21lbnVDbG9zZScsIHtcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInF1aXQtc2F2ZWRcIiBvbkNsaWNrPXt0aGlzLmNhbmNlbC5iaW5kKHRoaXMpfT48L2J1dHRvbj5cbiAgICAgICAgICAgIDxoMj5Zb3VyIHByb2dyZXNzPC9oMj5cbiAgICAgICAgICAgIDxoMj5oYXMgYmVlbiBzYXZlZDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoXG4gIDxTYXZlTWVudVxuICAgIGlkPVwic2F2ZVwiXG4gIC8+XG4pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL3NhdmVfbWVudS5qc1xuICoqLyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBDb2xsaXNpb25XYXJuaW5nIGV4dGVuZHMgc2tvYXNoLlNjcmVlbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNhbmNlbCA9IHRoaXMuY2FuY2VsLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b2dnbGUgPSB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICBza29hc2gudHJpZ2dlcignbWVudUNsb3NlJywge1xuICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgcGF0aDogWydjb2xsaXNpb25XYXJuaW5nJ10sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHNob3c6ICFfLmdldCh0aGlzLnByb3BzLmdhbWVTdGF0ZSwgJ2RhdGEuY29sbGlzaW9uV2FybmluZy5zaG93JylcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvZ2dsZUNsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3RvZ2dsZS1jb2xsaXNpb24td2FybmluZycsIHtcbiAgICAgIGFjdGl2ZTogIV8uZ2V0KHRoaXMucHJvcHMuZ2FtZVN0YXRlLCAnZGF0YS5jb2xsaXNpb25XYXJuaW5nLnNob3cnKVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lXCI+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImNvcHlcIiBzcmM9XCJtZWRpYS9fQ29sbGlzaW9uV2FybmluZy90ZXh0LXlvdW11c3Rub3RvdmVybGFwaW1ncy5wbmdcIiAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3RoaXMuZ2V0VG9nZ2xlQ2xhc3NOYW1lcygpfSBvbkNsaWNrPXt0aGlzLnRvZ2dsZX0+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImNsb3NlLWNvbGxpc2lvbi13YXJuaW5nXCIgb25DbGljaz17dGhpcy5jYW5jZWx9PjwvYnV0dG9uPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJvdHRlclwiIHNyYz1cIm1lZGlhL19Db2xsaXNpb25XYXJuaW5nL1BlZWtpbmctdGhyb3VnaC1PdHRlci5naWZcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKFxuICA8Q29sbGlzaW9uV2FybmluZ1xuICAgIGlkPVwiY29sbGlzaW9uV2FybmluZ1wiXG4gIC8+XG4pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbGlicmFyeS9za3JpYmJsZS9jb21wb25lbnRzL2NvbGxpc2lvbl93YXJuaW5nLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgKFxuICA8c2tvYXNoLlNjcmVlblxuICAgIGlkPVwibGltaXRXYXJuaW5nXCJcbiAgICBoaWRlUHJldlxuICAgIGhpZGVOZXh0XG4gID5cbiAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnZi9hNDc5ODExMTcxY2YwODRiZjg2YWY0ZWFjMWY2ZGMyOCd9IC8+XG4gICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ2YvMDI3YjMwZjBkMjc5ZWY0MWNkMzBlZmYyMjMyMzA1MWMnfSAvPlxuICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwib3R0ZXJcIiBzcmM9e0VOVklST05NRU5ULk1FRElBICsgJ2YvZTdjM2EwYWI2NGI0NTczMzRlN2JlODY4NjA5ZWU1MTInfSAvPlxuICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwic2lnblwiIHNyYz17RU5WSVJPTk1FTlQuTUVESUEgKyAnZi83NDM0NDUzYTQ2OTJkNGJlOWU4OThiNmI4Nzg3YzEwOCd9IC8+XG4gICAgPGRpdj5cbiAgICAgIFdBUk5JTkc6PGJyLz5cbiAgICAgIFlvdSBoYXZlIGV4Y2VlZGVkIHRoZSBudW1iZXIgb2YgdGltZXM8YnIvPlxuICAgICAgeW91IGNhbiB1c2UgdGhpcyBpdGVtIGluIHlvdXIgbWVzc2FnZS48YnIvPlxuICAgICAgUGxlYXNlIHByZXNzIG9rIHRvIGNvbnRpbnVlIGdhbWUuXG4gICAgPC9kaXY+XG4gICAgPGJ1dHRvblxuICAgICAgb25DbGljaz17ZnVuY3Rpb24gKCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignbWVudUNsb3NlJywge1xuICAgICAgICAgIGlkOiAnbGltaXRXYXJuaW5nJyxcbiAgICAgICAgfSk7XG4gICAgICB9fVxuICAgIC8+XG4gIDwvc2tvYXNoLlNjcmVlbj5cbik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWJyYXJ5L3NrcmliYmxlL2NvbXBvbmVudHMvbGltaXRfd2FybmluZy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUNDQTtBQURBOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBRENBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FDR0E7QURDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFEQTtBQVdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBMU1BO0FBQ0E7QUE0TUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBREE7QUFSQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQXRIQTtBQUNBO0FBeUhBOzs7Ozs7Ozs7OztBRS9WQTtBQUNBO0FGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFDQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBR1ZBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUZBO0FBREE7QUFXQTs7OztBQW5CQTtBQUNBO0FIcUJBOzs7Ozs7Ozs7Ozs7OztBSXRCQTtBSkNBO0FBQ0E7QUFBQTtBSUVBO0FKQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFaQTtBQWVBOzs7Ozs7Ozs7Ozs7OztBS2pCQTtBTENBO0FBQ0E7QUFBQTtBS0VBO0FMQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBbkJBO0FBMEJBOzs7Ozs7Ozs7Ozs7Ozs7O0FNTEE7QU5DQTtBTUdBO0FOQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUE7QUFDQTs7Ozs7OztBQXBDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBTEE7QUFSQTtBQWlCQTs7OztBQXBCQTs7Ozs7Ozs7Ozs7Ozs7OztBT2lLQTtBUENBO0FPR0E7QVBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVdBO0FBQ0E7QUEvS0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFIQTtBQVNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFEQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFPQTs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFEQTtBQVVBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7Ozs7QUExSkE7Ozs7Ozs7Ozs7Ozs7O0FRSkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FSQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTs7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQVBBO0FBREE7QUFXQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBRkE7QUFRQTtBQVRBO0FBWUE7Ozs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJBO0FBQ0E7QUFrQkE7Ozs7OztBU25QQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FuQkNBO0FBQ0E7QUFGQTtBQUhBO0FBT0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFLQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUZBO0FBT0E7Ozs7QUEvTEE7QUFDQTtBQWlNQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUNBO0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBb0JqTkE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FwQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqQkE7QUFrQkE7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7OztBQUVBO0FBQ0E7QUFTQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFKQTtBQVBBO0FBbUJBOzs7O0FBcExBO0FBQ0E7QUFzTEE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QXFCeUNBO0FyQkNBO0FxQkdBO0FyQkNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUNBO0FBelBBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUFIQTtBQUNBO0FBR0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQXBCQTtBQXFCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVFBO0FBakJBO0FBb0JBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7O0FBbk9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBc0JQQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBdEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakJBO0FBa0JBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBWUE7OztBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBU0E7QUFDQTtBQVNBO0FBQ0E7QUFTQTtBQUNBO0FBVUE7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQWFBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVpBO0FBZUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQU5BO0FBU0E7Ozs7QUFqYkE7QUFDQTtBQW1iQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7QXVCN2JBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBdkJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFCQTtBQTJCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQW5CQTtBQTBCQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFOQTtBQVNBOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTs7Ozs7Ozs7Ozs7Ozs7OztBd0JyY0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QXhCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQWtCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFRQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFNQTs7OztBQXJSQTtBQUNBO0FBdVJBOzs7Ozs7Ozs7Ozs7Ozs7O0F5QjFSQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBekJDQTtBQUNBO0FBQ0E7QUFIQTtBQUhBO0FBUUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFwQkE7QUF1QkE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBSkE7QUFPQTs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QTBCN0NBO0ExQkNBO0EwQkdBO0ExQkNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUNBO0FBdkdBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBQ0E7QUFKQTtBQVNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBREE7QUFZQTs7OztBQXRGQTs7Ozs7Ozs7Ozs7Ozs7OztBMkJpT0E7QTNCQ0E7QTJCR0E7QTNCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVNBO0FBQ0E7QUEvT0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQU1BOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFsQkE7QUFtQkE7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBMkJDQTtBQUNBO0EzQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBUEE7QUFEQTtBQVdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBUEE7QUFEQTtBQVdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBUEE7QUFEQTtBQVdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQURBO0FBWUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBTkE7QUFEQTtBQVdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFEQTtBQURBO0FBY0E7Ozs7QUE1TEE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBNEJwQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QTVCQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBQUE7QUFjQTs7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQWNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BOzs7O0FBcEhBO0FBQ0E7QUFzSEE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QTZCL0hBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBN0JDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBUkE7QUFTQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBSkE7QUFGQTtBQVVBOzs7O0FBN05BO0FBQ0E7QUErTkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTs7Ozs7Ozs7Ozs7Ozs7QThCOU9BO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTs7O0FBQ0E7QTlCQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBZkE7QUFvQkE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFNQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7Ozs7Ozs7Ozs7OztBK0J4SUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7OztBQUNBO0EvQkNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFPQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFOQTtBQVNBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFSQTtBQWNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBTUE7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QWdDMURBO0FoQ0NBO0FnQ0dBO0FoQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUNBO0FBM0VBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQWZBO0FBbUJBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBTkE7QUFRQTtBQUNBO0FBVkE7QUFhQTs7OztBQTVDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBaUNoQkE7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBakNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBUEE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7O0FrQytEQTtBbENDQTtBa0NHQTtBbENDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFDQTtBQTNGQTtBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUNBO0FBREE7QUFWQTtBQWNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBRkE7QUFRQTtBQUNBO0FBakJBO0FBb0JBOzs7O0FBaEVBOzs7Ozs7Ozs7Ozs7Ozs7O0FtQ21DQTtBbkNDQTtBbUNHQTtBbkNDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFDQTs7Ozs7OztBQTNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBSEE7QUFTQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQVJBO0FBY0E7Ozs7QUE1QkE7Ozs7Ozs7Ozs7Ozs7Ozs7QW9DaUhBO0FwQ0NBO0FvQ0dBO0FwQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUNBO0FBN0lBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFEQTtBQUNBO0FBR0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBYkE7QUFpQkE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUVBO0FBREE7QUFJQTs7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQURBO0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFaQTtBQWVBOzs7O0FBOUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FxQ2hCQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FyQ0NBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFGQTtBQVlBOzs7O0FBM0NBO0FBQ0E7QUE4Q0E7QUFDQTtBQURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBc0MvQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBdENDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFEQTtBQURBO0FBVUE7Ozs7QUFwQkE7QUFDQTtBQXVCQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7O0F1Q3hCQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QXZDQ0E7QUFKQTtBQUtBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFEQTtBQVdBOzs7O0FBM0NBO0FBQ0E7QUE4Q0E7QUFDQTtBQURBOzs7Ozs7Ozs7OztBd0NoREE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBeENDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFmQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==