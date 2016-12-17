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
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	window.ENVIRONMENT = {
	    MEDIA: 'https://media-staging.changemyworldnow.com/f/'
		};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	(function (gameName) {
	    window.MEDIA = {
	        BASE: ENVIRONMENT.MEDIA
	    };
	    window.MEDIA.GAME = window.MEDIA.BASE + 'Games/' + gameName + '/';
	    window.MEDIA.EFFECT = window.MEDIA.GAME + 'SoundAssets/effects/';
	    window.MEDIA.VO = window.MEDIA.GAME + 'SoundAssets/vos/';
	    window.MEDIA.IMAGE = window.MEDIA.GAME + 'ImageAssets/';
	    window.MEDIA.SPRITE = window.MEDIA.GAME + 'SpritesAnimations/';
	})(window.gameFolder);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(4);

	var _2 = _interopRequireDefault(_);

	var _preload = __webpack_require__(5);

	var _preload2 = _interopRequireDefault(_preload);

	var _create = __webpack_require__(7);

	var _create2 = _interopRequireDefault(_create);

	var _update = __webpack_require__(10);

	var _update2 = _interopRequireDefault(_update);

	var _helpers = __webpack_require__(13);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _opts = __webpack_require__(20);

	var _opts2 = _interopRequireDefault(_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var opts = _opts2.default[location.search.split('v=')[1] - 1 || 0];

	ENVIRONMENT.MEDIA += 'Games/WasteBusters/';

	window.game = new _2.default({
	    width: 960,
	    height: 540,
	    preload: _preload2.default,
	    create: _create2.default,
	    update: _update2.default,
	    helpers: _helpers2.default,
	    opts: opts
		});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	    function Game() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Game);

	        opts.preload = (opts.preload || _.noop).bind(this);
	        opts.create = (opts.create || _.noop).bind(this);
	        opts.update = (opts.update || _.noop).bind(this);

	        opts = _.defaults(opts, {
	            width: 960,
	            height: 540,
	            renderer: Phaser.CANVAS,
	            parent: '',
	            helpers: {},
	            state: { preload: opts.preload, create: opts.create, update: opts.update }
	        });

	        this.helpers = opts.helpers;
	        this.opts = opts.opts;

	        this.game = new Phaser.Game(opts.width, opts.height, opts.renderer, opts.parent, opts.state);

	        this.attachEvents();
	    }

	    _createClass(Game, [{
	        key: 'attachEvents',
	        value: function attachEvents() {
	            var _this = this;

	            window.addEventListener('skoash-event', function (e) {
	                switch (e.name) {
	                    case 'controller-update':
	                        _this.controller = e.data.controller;
	                        break;
	                    case 'data-update':
	                        _this.data = _.defaults(e.data.data, _this.data);
	                        break;
	                    case 'pause':
	                        _this.game.paused = true;
	                        break;
	                    case 'resume':
	                        _this.game.paused = false;
	                        break;
	                }
	            }, false);

	            document.domain = 'changemyworldnow.com';
	        }
	    }, {
	        key: 'emitEvent',
	        value: function emitEvent(opts) {
	            var e = new Event('game-event');
	            _.each(opts, function (v, k) {
	                e[k] = v;
	            });
	            if (window.frameElement) window.frameElement.dispatchEvent(e);
	        }
	    }]);

	    return Game;
	}();

		exports.default = Game;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    _2.default.call(this, 'image', [['sky', MEDIA.IMAGE + 'game.1.bkg.sky.jpg'], ['clouds', MEDIA.IMAGE + 'game.1.bkg.clouds.png'], ['ground', MEDIA.SPRITE + 'game1.ground.png'], ['platforms', MEDIA.SPRITE + 'game1.platform.png'],
	    // 930 x 140 pixels
	    ['items', MEDIA.SPRITE + 'game1.5.png'],
	    // 1246 x 100 pixels
	    ['logs', MEDIA.SPRITE + 'game1.logs.png'],
	    // 2100 x 360 pixels
	    ['trees', MEDIA.SPRITE + 'game1.trees.png']]);

	    _2.default.call(this, 'spritesheet', [
	    // 6180 x 646 pixels
	    ['turtle', MEDIA.SPRITE + 'turtle.walk.0.png', 515, 645], ['turtle3', MEDIA.SPRITE + 'turtle.walk.3.png', 515, 645], ['turtle5', MEDIA.SPRITE + 'turtle.walk.5.png', 515, 645],
	    // 1830 x 276 pixels
	    ['heart', MEDIA.SPRITE + 'game1.hearts.png', 305, 276],
	    // 1726 x 310 pixels
	    ['recycle', MEDIA.SPRITE + 'recycle-01.png', 345, 310],
	    // 1380 x 310 pixels
	    ['rainbowRecycle', MEDIA.SPRITE + 'rainbow.recycle-01.png', 345, 310],
	    // 5750 x 286 pixels
	    ['truck', MEDIA.SPRITE + 'truck.png', 575, 286],
	    // 1320 x 226 pixels
	    ['door', MEDIA.SPRITE + 'door.open.png', 220, 226],
	    // 3600 x 326 pixels
	    ['jet', MEDIA.SPRITE + 'jet.pack.png', 600, 326],
	    // 7860 x 410 pixels
	    ['snake0', MEDIA.SPRITE + 'mother.slither-01.png', 655, 410],
	    // 3326 x 250 pixels
	    ['snake0up', MEDIA.SPRITE + 'Mom.leaving.hole.png', 475, 250],
	    // 3326 x 250 pixels
	    ['snake0down', MEDIA.SPRITE + 'Mom.going.to.hole.png', 475, 250],
	    // 7860 x 410 pixels
	    ['snake1', MEDIA.SPRITE + 'sister.slither-01.png', 655, 410],
	    // 3326 x 250 pixels
	    ['snake1up', MEDIA.SPRITE + 'sister.leave.hole.png', 475, 250],
	    // 3326 x 250 pixels
	    ['snake1down', MEDIA.SPRITE + 'sister.down.hole.png', 475, 250],
	    // 7860 x 410 pixels
	    ['snake2', MEDIA.SPRITE + 'brother.slither-01.png', 655, 410],
	    // 3326 x 250 pixels
	    ['snake2up', MEDIA.SPRITE + 'brother.leave.hole.png', 475, 250],
	    // 3326 x 250 pixels
	    ['snake2down', MEDIA.SPRITE + 'brother.down.hole.png', 475, 250]]);

	    _2.default.call(this, 'audio', []);
	};

	var _ = __webpack_require__(6);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image';
	    var optsArray = arguments[1];

	    _.each(optsArray, function (opts) {
	        var _game$load;

	        opts = _.defaults(opts, ['sky', 'media/sky.png', 32, 48]);
	        (_game$load = _this.game.load)[fn].apply(_game$load, _toConsumableArray(opts));
	    });
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    this.controller = {};

	    _3.default.call(this, {
	        width: 4000,
	        height: 740,
	        top: -200
	    });

	    this.cursors = this.game.input.keyboard.createCursorKeys();

	    this.helpers.makeBackground.call(this);
	    this.helpers.makeGround.call(this);
	    this.helpers.makeDoor.call(this);
	    this.helpers.makePlatforms.call(this);
	    this.helpers.makeLogs.call(this);
	    this.helpers.makeItems.call(this);

	    _5.default.call(this, {
	        left: 32,
	        top: this.game.world.height - 450,
	        image: this.opts.playerImage,
	        bounceY: this.opts.bounceY,
	        gravityY: this.opts.gravityY,
	        body: this.opts.playerBody,
	        rightFrames: this.opts.rightFrames,
	        leftFrames: this.opts.leftFrames,
	        scale: this.opts.playerScale
	    });

	    this.data = _.defaults({
	        levels: _defineProperty({}, this.opts.level, {
	            start: true,
	            trucks: 0
	        })
	    }, this.data);

	    this.helpers.emitData.call(this);
	};

	var _2 = __webpack_require__(8);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(9);

	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
		//import randomizeLocations from 'shared/phaser/methods/randomize_locations/0.1';

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    opts = _.defaults(opts, {
	        physics: Phaser.Physics.ARCADE,
	        disableVisibilityChange: true,
	        left: 0,
	        top: 0,
	        width: 2000,
	        height: 600
	    });

	    this.game.physics.startSystem(opts.physics);
	    this.game.stage.disableVisibilityChange = opts.disableVisibilityChange;
	    this.game.world.setBounds(opts.left, opts.top, opts.width, opts.height);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _player$scale,
	        _this = this;

	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    opts = _.defaults(opts, {
	        left: 32,
	        top: 500,
	        image: 'dude',
	        bounceX: 0,
	        bounceY: 0.2,
	        gravityX: 0,
	        gravityY: 300,
	        collideWorldBounds: true,
	        checkCollisionUp: true,
	        checkCollisionDown: true,
	        checkCollisionRight: true,
	        checkCollisionLeft: true,
	        leftFrames: [0, 1, 2, 3],
	        leftFrameRate: 10,
	        leftLoop: true,
	        rightFrames: [5, 6, 7, 8],
	        rightFrameRate: 10,
	        rightLoop: true,
	        scale: [1, 1]
	    });

	    // The player and its settings
	    this.player = this.game.add.sprite(opts.left, opts.top, opts.image);

	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(this.player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    (_player$scale = this.player.scale).setTo.apply(_player$scale, _toConsumableArray(opts.scale));
	    this.player.body.bounce.x = opts.bounceX;
	    this.player.body.bounce.y = opts.bounceY;
	    this.player.body.gravity.x = opts.gravityX;
	    this.player.body.gravity.y = opts.gravityY;
	    this.player.body.collideWorldBounds = opts.collideWorldBounds;
	    this.player.body.checkCollision.up = opts.checkCollisionUp;
	    this.player.body.checkCollision.down = opts.checkCollisionDown;
	    this.player.body.checkCollision.right = opts.checkCollisionRight;
	    this.player.body.checkCollision.left = opts.checkCollisionLeft;

	    if (opts.body) {
	        // defer here to prevent this.player.scale from overriding body size
	        // we might want to find a better way to do this
	        setTimeout(function () {
	            _this.player.body.width = opts.body[0] * opts.scale[0];
	            _this.player.body.height = opts.body[1] * opts.scale[1];
	            _this.player.body.offset.x = opts.body[2];
	            _this.player.body.offset.y = opts.body[3];
	        }, 0);
	    }

	    //  Our two animations, walking left and right.
	    this.player.animations.add('left', opts.leftFrames, opts.leftFrameRate, opts.leftLoop);
	    this.player.animations.add('right', opts.rightFrames, opts.rightFrameRate, opts.rightLoop);
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    if (!this.shouldUpdate) {
	        setTimeout(function () {
	            return _this.shouldUpdate = true;
	        }, 100);
	        return;
	    }

	    this.player.canJump = true;

	    _2.default.call(this, 'collide', [[this.player, this.ground, this.helpers.onBump], [this.player, this.water, this.helpers.hitWater], [this.player, this.platforms, this.helpers.onBump], [this.player, this.bushes, this.helpers.onBump], [this.player, this.obstacles, this.helpers.hitObstacle], [this.player, this.logs, this.helpers.onBump], [this.bushes, this.ground, this.helpers.stay], [this.bushes, this.platforms, this.helpers.stay], [this.trees, this.ground, this.helpers.stay], [this.trees, this.platforms, this.helpers.stay], [this.snakes, this.ground, this.helpers.stay], [this.snakes, this.platforms, this.helpers.stay], [this.snakes, this.water, this.helpers.turnAround], [this.holes, this.ground, this.helpers.stay], [this.bags, this.ground, this.helpers.stay], [this.bags, this.platforms, this.helpers.stay], [this.obstacles, this.ground, this.helpers.stay], [this.obstacles, this.platforms, this.helpers.stay], [this.doors, this.ground, this.helpers.stay]]);

	    _2.default.call(this, 'overlap', [[this.player, this.bags, this.helpers.collectBags], [this.player, this.hearts, this.helpers.collectHeart], [this.player, this.recycles, this.helpers.collectRecycling], [this.player, this.rainbowRecycles, this.helpers.collectRainbowRecycling], [this.player, this.trucks, this.helpers.loadTruck], [this.player, this.doors, this.helpers.exit], [this.player, this.logs, this.helpers.inLog], [this.player, this.lightening, this.helpers.collectLightening], [this.player, this.snakes, this.helpers.hitEnemy], [this.snakes, this.holes, this.helpers.activateSnake]]);

	    if (!this.data.levels[this.opts.level].complete) {
	        if (this.player.boost) {
	            _4.default.call(this, {
	                upSpeed: this.opts.boostUpSpeed,
	                downSpeed: this.opts.boostDownSpeed,
	                leftSpeed: this.opts.boostLeftSpeed,
	                rightSpeed: this.opts.boostRightSpeed,
	                stopFrame: this.opts.boostPlayerStopFrame
	            });
	        } else {
	            _4.default.call(this, {
	                upSpeed: this.opts.upSpeed,
	                downSpeed: this.opts.downSpeed,
	                leftSpeed: this.opts.leftSpeed,
	                rightSpeed: this.opts.rightSpeed,
	                stopFrame: this.opts.playerStopFrame
	            });
	        }
	    } else if (this.data.levels[this.opts.level].doorOpen) {
	        this.player.body.velocity.x = 150;
	        this.player.body.collideWorldBounds = false;
	        this.player.animations.play('right');
	        this.game.physics.arcade.enable(this.player);
	    }

	    this.game.camera.x = Math.min(Math.max(this.player.body.center.x - 400, 0), this.game.world.width - 800);

	    // this.clouds.children[0].position.x = -.25 * this.game.camera.x;
	    this.clouds.children[0].position.x = -.25 * this.player.body.center.x;
	    this.clouds.children[1].position.x = 2975.5 - .25 * this.player.body.center.x;
	};

	var _ = __webpack_require__(11);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(12);

	var _4 = _interopRequireDefault(_3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'collide';
	    var optsArray = arguments[1];

	    _.each(optsArray, function (opts) {
	        var _game$physics$arcade;

	        opts = _.defaults(opts, [_this.player, _this.platforms, _.noop, null, _this]);
	        (_game$physics$arcade = _this.game.physics.arcade)[fn].apply(_game$physics$arcade, _toConsumableArray(opts));
	    });
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (opts) {
	    opts = _.defaults(opts, {
	        upSpeed: -350,
	        downSpeed: 500,
	        leftSpeed: -150,
	        rightSpeed: 150,
	        stopFrame: 4
	    });

	    //  Reset the players velocity (movement)
	    if (this.isHit) return;
	    this.player.body.velocity.x = 0;

	    if (this.cursors.left.isDown || this.controller.left) {
	        //  Move to the left
	        this.player.body.velocity.x = opts.leftSpeed;
	        this.player.animations.play('left');
	    } else if (this.cursors.right.isDown || this.controller.right) {
	        //  Move to the right
	        this.player.body.velocity.x = opts.rightSpeed;
	        this.player.animations.play('right');
	    } else {
	        //  Stand still
	        this.player.animations.stop();
	        this.player.frame = opts.stopFrame;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (this.player.canJump && (this.cursors.up.isDown || this.controller.up) && this.player.body.touching.down) {
	        this.player.body.velocity.y = opts.upSpeed;
	    }

	    //  Allow the player to fall fast if they are not touching the ground.
	    if ((this.cursors.down.isDown || this.controller.down) && !this.player.body.touching.down) {
	        this.player.body.velocity.y = opts.downSpeed;
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ = __webpack_require__(14);

	var _2 = _interopRequireDefault(_);

	var _make_background = __webpack_require__(15);

	var _make_background2 = _interopRequireDefault(_make_background);

	var _make_ground = __webpack_require__(16);

	var _make_ground2 = _interopRequireDefault(_make_ground);

	var _make_platforms = __webpack_require__(17);

	var _make_platforms2 = _interopRequireDefault(_make_platforms);

	var _make_logs = __webpack_require__(18);

	var _make_logs2 = _interopRequireDefault(_make_logs);

	var _make_items = __webpack_require__(19);

	var _make_items2 = _interopRequireDefault(_make_items);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    emitData: function emitData() {
	        //  emit event with data to skoash game
	        this.emitEvent({
	            updateGameState: {
	                path: ['game'],
	                data: this.data
	            }
	        });
	    },
	    onBump: function onBump() {},
	    activateSnake: function activateSnake(snake, hole) {
	        var climb;

	        if (!snake.active && !snake.climbing) {
	            snake.left = hole.left - 100;
	            snake.loadTexture(snake.originalImage + 'up', 0);
	            climb = snake.animations.add('hole', [0, 1, 2, 3, 4, 5, 6], 10, false);
	            climb.onComplete.add(function () {
	                snake.loadTexture(snake.originalImage, 5);
	                snake.scale.setTo(.3, .3);
	                snake.left = snake.left - 25;
	                snake.top = snake.top - 25;
	                snake.animations.add('left', [5, 4, 3, 2, 1, 0], 10, true);
	                snake.animations.add('right', [6, 7, 8, 9, 10, 11], 10, true);
	                snake.animations.play('left');
	                snake.body.velocity.x = -100;
	                setTimeout(function () {
	                    snake.climbing = false;
	                }, 5000);
	            });
	            snake.scale.setTo(.4, .4);
	            snake.animations.play('hole');
	            snake.active = true;
	            snake.climbing = true;
	        } else if (snake.active && !snake.climbing && snake.body.velocity.x > 0 && snake.left < hole.left) {
	            snake.left = hole.left - 100;
	            snake.body.velocity.x = 0;
	            snake.loadTexture(snake.originalImage + 'down', 0);
	            snake.left = snake.left + 25;
	            snake.top = snake.top + 25;
	            climb = snake.animations.add('hole', [0, 1, 2, 3, 4, 5, 6], 10, false);
	            climb.onComplete.add(function () {
	                snake.loadTexture(null, 0);
	                setTimeout(function () {
	                    snake.climbing = false;
	                }, 5000);
	            });
	            snake.scale.setTo(.4, .4);
	            snake.animations.play('hole');
	            snake.active = false;
	            snake.climbing = true;
	        }
	    },
	    turnAround: function turnAround(enemy) {
	        if (enemy.isTurning) return;
	        enemy.isTurning = true;
	        enemy.body.velocity.x = -1 * enemy.body.velocity.x;
	        enemy.animations.play(enemy.body.velocity.x < 0 ? 'left' : 'right');
	        setTimeout(function () {
	            enemy.isTurning = false;
	        }, 500);
	    },
	    hitEnemy: function hitEnemy(p, e) {
	        if (!e.active) return;
	        this.helpers.hitSomething.call(this, p);
	    },
	    hitObstacle: function hitObstacle(p) {
	        this.helpers.hitSomething.call(this, p);
	    },
	    hitWater: function hitWater(p) {
	        this.helpers.hitSomething.call(this, p, 1, 1);
	    },
	    hitSomething: function hitSomething(p) {
	        var _this = this;

	        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

	        if (this.isHit) return;
	        this.isHit = true;
	        p.body.velocity.y = -1 * this.opts.hitVelocity;

	        p.body.velocity.x = (p.body.velocity.x === Math.abs(p.body.velocity.x) ? d : -1 * d) * this.opts.hitVelocity;

	        setTimeout(function () {
	            _this.isHit = false;
	        }, 1000);

	        this.data.hits += i;
	        this.helpers.emitData.call(this);
	        setTimeout(function () {
	            if (_this.data.hits >= _this.opts.hitsPerLife) {
	                _this.data.hits -= _this.opts.hitsPerLife;
	                _this.data.lives--;
	                _this.helpers.emitData.call(_this);
	            }
	        }, 250);
	    },
	    inLog: function inLog() {
	        this.player.canJump = false;
	    },
	    collectRecycling: function collectRecycling(player, recyclying) {
	        // Removes the recyclying from the screen
	        recyclying.kill();
	        //  update the lives
	        this.data.score += this.opts.recyclingScore;
	        this.helpers.emitData.call(this);
	    },
	    collectRainbowRecycling: function collectRainbowRecycling(player, recyclying) {
	        // Removes the recyclying from the screen
	        recyclying.kill();
	        //  update the lives
	        this.data.score += this.opts.rainbowRecyclyingScore;
	        this.helpers.emitData.call(this);
	    },
	    collectHeart: function collectHeart(player, heart) {
	        if (this.data.lives === this.opts.maxLives) return;
	        // Removes the heart from the screen
	        heart.kill();
	        //  update the lives
	        this.data.lives++;
	        this.helpers.emitData.call(this);
	    },
	    collectBags: function collectBags(player, bag) {
	        if (this.data.bagCount === this.opts.maxBags) return;
	        // Removes the bag from the screen
	        bag.kill();
	        //  update the bagCount
	        this.data.bagCount++;
	        this.helpers.updatePlayer.call(this);
	        this.helpers.emitData.call(this);
	    },
	    collectLightening: function collectLightening(player, lightening) {
	        var _this2 = this;

	        player.boost = player.boost + 1 || 1;
	        lightening.kill();
	        this.helpers.updatePlayer.call(this);
	        setTimeout(function () {
	            player.boost--;
	            _this2.helpers.updatePlayer.call(_this2);
	        }, this.opts.boostTime);
	    },
	    updatePlayer: function updatePlayer() {
	        if (this.player.boost) {
	            this.player.loadTexture('jet', 0);
	            this.player.animations.add('left', this.opts.boostLeftFrames, this.opts.boostLeftFrameRate, this.opts.boostLeftLoop);
	            this.player.animations.add('right', this.opts.boostRightFrames, this.opts.boostRightFrameRate, this.opts.boostRightLoop);
	        } else {
	            if (this.data.bagCount === this.opts.maxBags) {
	                this.player.loadTexture('turtle5', 0);
	            } else if (this.data.bagCount >= this.opts.maxBags / 2) {
	                this.player.loadTexture('turtle3', 0);
	            } else {
	                this.player.loadTexture('turtle', 0);
	            }
	            this.player.animations.add('left', this.opts.leftFrames, this.opts.leftFrameRate, this.opts.leftLoop);
	            this.player.animations.add('right', this.opts.rightFrames, this.opts.rightFrameRate, this.opts.rightLoop);
	        }
	    },
	    stay: function stay(a) {
	        a.body.gravity.y = 0;
	        a.body.velocity.y = 0;
	    },
	    loadTruck: function loadTruck(player, truck) {
	        if (truck.driving || this.data.bagCount !== this.opts.maxBags) return;
	        truck.driving = true;
	        truck.animations.play('drive');
	        this.data.bagCount = 0;
	        this.data.levels[this.opts.level].trucks++;
	        this.helpers.updatePlayer.call(this);
	        if (this.data.levels[this.opts.level].trucks === this.opts.maxTrucks) {
	            this.doors.children[0].animations.play('open');
	            this.data.levels[this.opts.level].doorOpen = true;
	        }
	        this.helpers.emitData.call(this);
	    },

	    makeBackground: _make_background2.default,
	    makeGround: _make_ground2.default,
	    makePlatforms: _make_platforms2.default,
	    makeLogs: _make_logs2.default,
	    makeItems: _make_items2.default,
	    makeDoor: function makeDoor() {
	        _2.default.call(this, {
	            group: 'doors'
	        }, [{
	            image: 'door',
	            gravityY: 100,
	            body: [200, 200, 25, 25],
	            scale: [.5, .5],
	            collideWorldBounds: false,
	            left: this.game.world.width - 90,
	            top: 0
	        }]);

	        this.doors.children[0].animations.add('open', [5, 4, 3, 2, 1, 0], 10, false);
	        this.doors.children[0].animations.add('close', [0, 1, 2, 3, 4, 5], 10, false);
	        this.doors.children[0].animations.play('close');
	    },
	    exit: function exit() {
	        var _this3 = this;

	        if (this.data.levels[this.opts.level].trucks !== this.opts.maxTrucks) return;
	        if (this.data.levels[this.opts.level].complete) return;
	        this.data.levels[this.opts.level].complete = true;
	        this.player.body.collideWorldBounds = false;
	        this.helpers.emitData.call(this);
	        setTimeout(function () {
	            _this3.doors.children[0].animations.play('close');
	            _this3.data.levels[_this3.opts.level].doorOpen = false;
	            _this3.helpers.emitData.call(_this3);
	            _this3.player.body.velocity.x = 0;
	        }, 1500);
	    }
		};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var groupOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var optsArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    groupOpts.defaultOpts = _.defaults(groupOpts.defaultOpts, {
	        scale: [1, 1],
	        left: 0,
	        top: 0,
	        image: 'ground',
	        immovable: true,
	        bounceX: 1,
	        bounceY: 1,
	        gravityX: 0,
	        gravityY: 0,
	        collideWorldBounds: true,
	        checkCollisionUp: true,
	        checkCollisionDown: true,
	        checkCollisionRight: true,
	        checkCollisionLeft: true,
	        angle: 0,
	        anchor: [0, 0]
	    });

	    groupOpts = _.defaults(groupOpts, {
	        enableBody: true,
	        group: 'platforms'
	    });

	    if (!this[groupOpts.group]) {
	        // create the group we will be adding the items to
	        this[groupOpts.group] = this.game.add.group();
	        // enable physics for any object that is created in this group
	        this[groupOpts.group].enableBody = groupOpts.enableBody;
	    }

	    _.each(optsArray, function (options) {
	        var _item$scale, _item$anchor;

	        var opts = _.defaults({}, options, groupOpts.defaultOpts);

	        var item = _this[groupOpts.group].create(opts.left, opts.top, opts.image);

	        item.originalImage = opts.image;
	        (_item$scale = item.scale).setTo.apply(_item$scale, _toConsumableArray(opts.scale));
	        if (opts.crop) {
	            item.crop(new (Function.prototype.bind.apply(Phaser.Rectangle, [null].concat(_toConsumableArray(opts.crop))))());
	            if (groupOpts.enableBody) {
	                item.body.width = opts.crop[2];
	                item.body.height = opts.crop[3];
	            }
	        }
	        item.angle = opts.angle;
	        (_item$anchor = item.anchor).setTo.apply(_item$anchor, _toConsumableArray(opts.anchor));

	        if (groupOpts.enableBody) {
	            item.body.immovable = opts.immovable;
	            item.body.collideWorldBounds = opts.collideWorldBounds;
	            item.body.bounce.x = opts.bounceX;
	            item.body.bounce.y = opts.bounceY;
	            item.body.gravity.x = opts.gravityX;
	            item.body.gravity.y = opts.gravityY;
	            item.body.checkCollision.up = opts.checkCollisionUp;
	            item.body.checkCollision.down = opts.checkCollisionDown;
	            item.body.checkCollision.right = opts.checkCollisionRight;
	            item.body.checkCollision.left = opts.checkCollisionLeft;

	            if (opts.body) {
	                // defer here to prevent item.scale from overriding body size
	                // we might want to find a better way to do this
	                setTimeout(function () {
	                    item.body.width = opts.body[0] * opts.scale[0];
	                    item.body.height = opts.body[1] * opts.scale[1];
	                    item.body.offset.x = opts.body[2] * opts.scale[0];
	                    item.body.offset.y = opts.body[3] * opts.scale[1];
	                }, 0);
	            }
	        }
	    });
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    _2.default.call(this, {
	        group: 'sky', enableBody: false, defaultOpts: {
	            collideWorldBounds: false,
	            top: 0,
	            image: 'sky',
	            scale: [.5, .5]
	        }
	    }, [{ left: 0 }, { left: 2975.5 }]);

	    _2.default.call(this, {
	        group: 'clouds', enableBody: false, defaultOpts: {
	            collideWorldBounds: false,
	            top: 0,
	            image: 'clouds',
	            scale: [.5, .5]
	        }
	    }, [{ left: 0 }, { left: 2975.5 }]);
	};

	var _ = __webpack_require__(14);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var left = 0;
	    var groundOpts = [];
	    var waterOpts = [];
	    var random = 2;

	    var crops = [[20, 0, 380, 210], [545, 0, 200, 210], [865, 0, 380, 210], [1405, 0, 200, 210]];

	    var bodies = [[380, 140, 0, 60], [200, 140, 0, 60], [380, 140, 0, 60], [200, 140, 0, 60]];

	    while (left < this.game.world.width) {
	        random = _.random(random > 1 || left > this.game.world.width - 600 ? crops.length / 2 - 1 : crops.length - 1);
	        var crop = crops[random];
	        var body = bodies[random];

	        if (random < 2) {
	            groundOpts.push({
	                left: left,
	                crop: crop,
	                body: body
	            });
	        } else {
	            waterOpts.push({
	                left: left,
	                crop: crop,
	                body: body
	            });
	        }

	        left += crop[2] - 3;
	    }

	    var defaultOpts = {
	        top: 330,
	        collideWorldBounds: false,
	        image: 'ground'
	    };

	    _3.default.call(this, {
	        group: 'ground', defaultOpts: defaultOpts
	    }, groundOpts);

	    _3.default.call(this, {
	        group: 'water', defaultOpts: defaultOpts
	    }, waterOpts);
	};

	var _2 = __webpack_require__(14);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var crops = [[200, 0, 240, 96], [790, 0, 350, 96], [1290, 0, 645, 96]];

	    var bodies = [[200, 28, 0, 80], [310, 28, 0, 80], [605, 28, 0, 80]];

	    var platformParams = this.opts.setPlatforms || [];

	    var locations = this.opts.locations || [];

	    var platformOpts = [];

	    function addPlatform(location, i) {
	        platformOpts.push({
	            left: location[0],
	            top: location[1],
	            crop: crops[i],
	            body: bodies[i]
	        });
	    }

	    _.each(platformParams, function (params) {
	        addPlatform.apply(undefined, _toConsumableArray(params));
	    });

	    _.each(locations, function (location) {
	        addPlatform(location, _.random(crops.length - 1));
	    });

	    _3.default.call(this, {
	        group: 'platforms',
	        defaultOpts: {
	            top: 300,
	            collideWorldBounds: false,
	            image: 'platforms',
	            scale: [.5, .5],
	            checkCollisionDown: false,
	            checkCollisionRight: false,
	            checkCollisionLeft: false
	        }
	    }, platformOpts);
	};

	var _2 = __webpack_require__(14);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var crops = [[100, 0, 220, 100], [460, 0, 350, 100], [830, 0, 415, 100]];

	    var bodies = [[220, 100, 0, 0], [350, 100, 0, 0], [415, 100, 0, 0]];

	    var offsets = {
	        platforms: 0,
	        ground: 40
	    };

	    _.each(offsets, function (offset, location) {
	        _.each(_this[location].children, function (platform) {
	            var index;
	            if (platform.left < 400 || platform.left > _this.game.world.width - 400) return;
	            if (Math.random() < _this.opts[location + 'LogChance']) {
	                platform.hasLog = true;
	                index = Math.floor(Math.random() * (platform.width > 300 ? 3 : platform.width > 150 ? 2 : 1));
	                _3.default.call(_this, {
	                    group: 'logs',
	                    defaultOpts: {
	                        image: 'logs',
	                        scale: [.5, .5],
	                        collideWorldBounds: false,
	                        checkCollisionRight: false,
	                        checkCollisionLeft: false
	                    }
	                }, [{
	                    top: platform.top + offset - 35,
	                    left: platform.left,
	                    crop: crops[Math.floor(index)],
	                    body: bodies[index]
	                }]);
	            }
	        });
	    });
	};

	var _2 = __webpack_require__(14);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var crops = [[0, 0, 155, 140], [155, 0, 155, 140], [310, 0, 155, 140], [465, 0, 155, 140], [620, 0, 155, 140], [775, 0, 155, 140], [930, 0, 155, 140], [0, 0, 300, 360], [300, 0, 300, 360], [600, 0, 300, 360], [900, 0, 300, 360], [1200, 0, 300, 360], [1500, 0, 300, 360], [1800, 0, 300, 360]];

	    var generalDefaultProps = {
	        image: 'items',
	        gravityY: 12,
	        body: [115, 100, 20, 50],
	        scale: [.5, .5],
	        collideWorldBounds: false
	    };

	    var treeDefaultProps = {
	        image: 'trees',
	        gravityY: 12,
	        body: [300, 325, 0, 0],
	        scale: [.5, .5],
	        collideWorldBounds: false
	    };

	    var defaultProps = {
	        squareBush: _.defaults({
	            crop: crops[0]
	        }, generalDefaultProps),
	        roundBush: _.defaults({
	            crop: crops[1]
	        }, generalDefaultProps),
	        hole: _.defaults({
	            crop: crops[2],
	            body: [115, 20, 20, 50],
	            gravityY: 10000
	        }, generalDefaultProps),
	        bag: _.defaults({
	            crop: crops[3]
	        }, generalDefaultProps),
	        rock: _.defaults({
	            crop: crops[4]
	        }, generalDefaultProps),
	        stump: _.defaults({
	            crop: crops[5],
	            body: [115, 120, 20, 50]
	        }, generalDefaultProps),
	        lightening: _.defaults({
	            crop: crops[6],
	            gravityY: 0
	        }, generalDefaultProps),
	        heart: {
	            image: 'heart',
	            scale: [.15, .15]
	        },
	        recycle: {
	            image: 'recycle',
	            scale: [.15, .15]
	        },
	        raibowRecycle: {
	            image: 'rainbowRecycle',
	            scale: [.15, .15]
	        },
	        truck: {
	            image: 'truck',
	            scale: [.5, .5],
	            collideWorldBounds: false
	        },
	        tree1: _.defaults({
	            crop: crops[7],
	            body: null
	        }, treeDefaultProps),
	        tree2: _.defaults({
	            crop: crops[8]
	        }, treeDefaultProps),
	        tree3: _.defaults({
	            crop: crops[9]
	        }, treeDefaultProps),
	        tree4: _.defaults({
	            crop: crops[10],
	            body: null
	        }, treeDefaultProps),
	        tree5: _.defaults({
	            crop: crops[11]
	        }, treeDefaultProps),
	        tree6: _.defaults({
	            crop: crops[12]
	        }, treeDefaultProps),
	        tree7: _.defaults({
	            crop: crops[13]
	        }, treeDefaultProps),
	        snake: {
	            scale: [.25, .25],
	            gravityY: 12,
	            collideWorldBounds: false
	        }
	    };

	    var groups = {
	        squareBush: 'bushes',
	        roundBush: 'bushes',
	        snake: 'snakes',
	        hole: 'holes',
	        bag: 'bags',
	        rock: 'obstacles',
	        stump: 'obstacles',
	        heart: 'hearts',
	        recycle: 'recycles',
	        raibowRecycle: 'rainbowRecycles',
	        lightening: 'lightening',
	        truck: 'trucks',
	        tree1: 'trees',
	        tree2: 'trees',
	        tree3: 'trees',
	        tree4: 'trees',
	        tree5: 'trees',
	        tree6: 'trees',
	        tree7: 'trees'
	    };

	    var truckNumber = 1;
	    var truckTotal = this.opts.maxTrucks;

	    var getObjects = function getObjects() {
	        var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var amounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        return objects.concat(_.shuffle([].concat(_.times(amounts.squareBush || 0, function () {
	            return 'squareBush';
	        })).concat(_.times(amounts.roundBush || 0, function () {
	            return 'roundBush';
	        })).concat(_.times(amounts.snake || 0, function () {
	            return 'snake';
	        })).concat(_.times(amounts.hole || 0, function () {
	            return 'hole';
	        })).concat(_.times(amounts.bag || 0, function () {
	            return 'bag';
	        })).concat(_.times(amounts.blank || 0, function () {
	            return 'blank';
	        })).concat(_.times(amounts.rock || 0, function () {
	            return 'rock';
	        })).concat(_.times(amounts.stump || 0, function () {
	            return 'stump';
	        })).concat(_.times(amounts.heart || 0, function () {
	            return 'heart';
	        })).concat(_.times(amounts.recycle || 0, function () {
	            return 'recycle';
	        })).concat(_.times(amounts.raibowRecycle || 0, function () {
	            return 'raibowRecycle';
	        })).concat(_.times(amounts.lightening || 0, function () {
	            return 'lightening';
	        })).concat(_.times(amounts.tree1 || 0, function () {
	            return 'tree1';
	        })).concat(_.times(amounts.tree2 || 0, function () {
	            return 'tree2';
	        })).concat(_.times(amounts.tree3 || 0, function () {
	            return 'tree3';
	        })).concat(_.times(amounts.tree4 || 0, function () {
	            return 'tree4';
	        })).concat(_.times(amounts.tree5 || 0, function () {
	            return 'tree5';
	        })).concat(_.times(amounts.tree6 || 0, function () {
	            return 'tree6';
	        })).concat(_.times(amounts.tree7 || 0, function () {
	            return 'tree7';
	        }))));
	    };

	    var objects = getObjects([], this.opts.platformItemAmounts);

	    var locations = {
	        tree1: [],
	        tree2: [],
	        tree3: [],
	        tree4: [],
	        tree5: [],
	        tree6: [],
	        tree7: [],
	        squareBush: [],
	        roundBush: [],
	        snake: [],
	        hole: [],
	        bag: [],
	        rock: [],
	        stump: [],
	        heart: [],
	        recycle: [],
	        raibowRecycle: [],
	        lightening: [],
	        truck: [],
	        blank: []
	    };

	    var placeObject = function placeObject(platform, up, over) {
	        var object = objects.shift();
	        switch (object) {
	            case 'tree1':
	                up += 110;
	                break;
	            case 'tree2':
	            case 'tree3':
	            case 'tree5':
	            case 'tree7':
	                up += 90;
	                break;
	            case 'tree4':
	                up += 105;
	                break;
	            case 'tree6':
	                up += 95;
	                break;
	        }
	        if (platform.hasLog && !(object === 'bag' || object === 'blank')) {
	            objects.unshift(object);
	            object = 'blank';
	        }
	        if (locations[object]) {
	            locations[object].push({
	                top: platform.top - up,
	                left: platform.left + over
	            });
	        }
	    };

	    _.every(this.platforms.children, function (platform) {
	        placeObject(platform, 50, 30);
	        if (platform.width > 120) placeObject(platform, 50, 80);
	        if (platform.width > 200) placeObject(platform, 50, 170);
	        return objects.length;
	    });

	    objects = getObjects(objects, this.opts.groundItemAmounts);
	    objects.unshift('blank');
	    objects.unshift('blank');

	    _.every(this.ground.children, function (platform) {
	        if (truckNumber <= truckTotal && platform.left > _this.game.world.width * truckNumber / (truckTotal + 1.5)) {
	            locations.truck.push({
	                top: platform.top - 50,
	                left: platform.left
	            });
	            truckNumber++;
	            return true;
	        }
	        if (platform.left > _this.game.world.width - 200) return false;
	        placeObject(platform, 20, 30);
	        return objects.length;
	    });

	    // this makes sure that all the bags are placed
	    while (~objects.indexOf('bag')) {
	        locations.bag.push(locations.blank.shift());
	        objects[objects.indexOf('bag')] = 'blank';
	    }

	    _.each(locations, function (locationArray, key) {
	        var holeLocations;
	        var snakeLocations;
	        if (key === 'blank') return;
	        if (key === 'snake') {
	            holeLocations = _.map(locationArray, function (opts) {
	                return {
	                    top: opts.top,
	                    left: opts.left + 80
	                };
	            });
	            _3.default.call(_this, {
	                group: groups.hole, defaultOpts: defaultProps.hole
	            }, holeLocations);
	            snakeLocations = _.map(locationArray, function (opts) {
	                return {
	                    top: opts.top - 10,
	                    left: opts.left + 70,
	                    image: 'snake' + _.random(2)
	                };
	            });
	            _3.default.call(_this, {
	                group: groups.snake, defaultOpts: defaultProps.snake
	            }, snakeLocations);
	            return;
	        }
	        _3.default.call(_this, {
	            group: groups[key], defaultOpts: defaultProps[key]
	        }, locationArray);
	    });

	    _.each(this.hearts.children, function (heart) {
	        heart.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
	        heart.animations.play('spin');
	    });

	    _.each(this.recycles.children, function (recycle) {
	        recycle.animations.add('spin', [0, 1, 2, 3, 4], 10, true);
	        recycle.animations.play('spin');
	    });

	    _.each(this.rainbowRecycles.children, function (recycle) {
	        recycle.animations.add('spin', [0, 1, 2, 3], 10, true);
	        recycle.animations.play('spin');
	    });

	    _.each(this.trucks.children, function (truck) {
	        var drive = truck.animations.add('drive', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
	        drive.onComplete.add(function () {
	            truck.body.velocity.x = 200;
	        });
	    });

	    _.each(this.trees.children, function (tree) {
	        tree.sendToBack();
	    });

	    _.each(this.snakes.children, function (snake) {
	        snake.loadTexture(null, 0);
	    });
	};

	var _2 = __webpack_require__(14);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _opts = __webpack_require__(21);

	var _opts2 = _interopRequireDefault(_opts);

	var _opts3 = __webpack_require__(23);

	var _opts4 = _interopRequireDefault(_opts3);

	var _opts5 = __webpack_require__(24);

	var _opts6 = _interopRequireDefault(_opts5);

	var _opts7 = __webpack_require__(25);

	var _opts8 = _interopRequireDefault(_opts7);

	var _opts9 = __webpack_require__(26);

	var _opts10 = _interopRequireDefault(_opts9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = [_opts2.default, _opts4.default, _opts6.default, _opts8.default, _opts10.default];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(22);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 1,
	    platformsLogChance: 1 / 10,
	    groundLogChance: 0,
	    setPlatforms: [[[130, 80], 0], [[350, 160], 1], [[950, 160], 2], [[1050, 240], 0], [[2650, 80], 2], [[3600, 240], 0]],
	    locations: [[100, 240], [600, 240], [650, 80], [1350, 80], [1400, 240], [1700, 160], [1900, 80], [2050, 240], [2300, 160], [2550, 240], [2800, 160], [3000, 240], [3300, 160]],
	    platformItemAmounts: {
	        squareBush: 1,
	        roundBush: 1,
	        snake: 0,
	        bag: 15,
	        blank: 10,
	        rock: 1,
	        stump: 1,
	        heart: 1,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 0,
	        tree1: 1,
	        tree2: 1,
	        tree3: 1
	    },
	    groundItemAmounts: {
	        squareBush: 1,
	        roundBush: 1,
	        hole: 2,
	        bag: 0,
	        blank: 5,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }
		}, _default_opts2.default);

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    level: 1,
	    hitVelocity: 200,
	    recyclingScore: 100,
	    rainbowRecyclyingScore: 300,
	    hitsPerLife: 4,
	    maxLives: 3,
	    maxBags: 5,
	    maxTrucks: 3,
	    bounceY: .2,
	    gravityY: 400,
	    playerImage: 'turtle',
	    playerBody: [315, 396, 100, 150],
	    leftFrames: [5, 4, 3, 2, 1, 0],
	    leftFrameRate: 10,
	    leftLoop: true,
	    rightFrames: [6, 7, 8, 9, 10, 11],
	    rightFrameRate: 10,
	    rightLoop: true,
	    boostLeftFrames: [2, 1, 0],
	    boostLeftFrameRate: 10,
	    boostLeftLoop: true,
	    boostRightFrames: [3, 4, 5],
	    boostRightFrameRate: 10,
	    boostRightLoop: true,
	    playerScale: [.15, .15],
	    upSpeed: -350,
	    downSpeed: 500,
	    leftSpeed: -150,
	    rightSpeed: 150,
	    boostUpSpeed: -350,
	    boostDownSpeed: 500,
	    boostLeftSpeed: -300,
	    boostRightSpeed: 300,
	    playerStopFrame: 6,
	    boostPlayerStopFrame: 6,
	    boostTime: 3000,
	    platformsLogChance: 0,
	    groundLogChance: 0,
	    setPlatforms: [],
	    locations: [],
	    platformItemAmounts: {},
	    groundItemAmounts: {}
		};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(22);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 2,
	    platformsLogChance: 1 / 20,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[-30, 240], 0], [[3600, 240], 1], [[3200, 240], 1]],
	    locations: [[100, 160], [300, 240], [400, 80], [700, 160], [900, 240], [1000, 80], [1200, 160], [1300, 240], [1600, 240], [1650, 80], [1800, 160], [2000, 240], [2100, 80], [2400, 160], [2700, 240], [2800, 80], [3000, 160]],
	    platformItemAmounts: {
	        squareBush: 2,
	        roundBush: 2,
	        snake: 0,
	        bag: 15,
	        blank: 10,
	        rock: 2,
	        stump: 2,
	        heart: 2,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 1,
	        tree1: 1,
	        tree6: 1,
	        tree7: 1
	    },
	    groundItemAmounts: {
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 5,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }
		}, _default_opts2.default);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(22);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 3,
	    platformsLogChance: 1 / 20,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[-30, 160], 2], [[0, 240], 0], [[700, 240], 2], [[1100, 160], 1], [[1900, 240], 1], [[2200, 240], 2], [[3400, 160], 2]],
	    locations: [[300, 240], [400, 80], [650, 160], [900, 80], [1300, 240], [1350, 80], [1550, 160], [2000, 80], [2700, 80], [2700, 240], [3100, 240]],
	    platformItemAmounts: {
	        squareBush: 2,
	        roundBush: 2,
	        snake: 0,
	        bag: 15,
	        blank: 10,
	        rock: 2,
	        stump: 2,
	        heart: 2,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 1,
	        tree2: 1,
	        tree4: 1,
	        tree5: 1
	    },
	    groundItemAmounts: {
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 5,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0,
	        tree1: 1
	    }
		}, _default_opts2.default);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(22);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 4,
	    platformsLogChance: 0,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[0, 160], 1], [[1100, 160], 1], [[1650, 160], 2], [[2100, 80], 0], [[2500, 240], 1], [[2800, 160], 2], [[3400, 160], 1]],
	    locations: [[200, 80], [200, 240], [500, 160], [800, 240], [900, 80], [1250, 240], [1400, 80], [1950, 240], [2200, 160], [3100, 80], [3100, 240]],
	    platformItemAmounts: {
	        squareBush: 1,
	        roundBush: 1,
	        snake: 0,
	        bag: 15,
	        blank: 5,
	        rock: 2,
	        stump: 2,
	        heart: 2,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 1,
	        tree1: 1,
	        tree2: 1,
	        tree3: 1,
	        tree6: 1,
	        tree7: 1
	    },
	    groundItemAmounts: {
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 5,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }
		}, _default_opts2.default);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(22);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 5,
	    platformsLogChance: 1 / 10,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[0, 160], 1], [[400, 160], 2], [[700, 240], 2], [[950, 160], 2], [[1550, 160], 2], [[1800, 240], 2], [[3400, 80], 0], [[3400, 240], 0], [[3600, 160], 1]],
	    locations: [[200, 80], [200, 240], [850, 80], [1250, 240], [1300, 80], [1900, 80], [2200, 160], [2500, 240], [2800, 160], [3050, 240], [3100, 80]],
	    platformItemAmounts: {
	        squareBush: 2,
	        roundBush: 2,
	        snake: 0,
	        bag: 15,
	        blank: 5,
	        rock: 3,
	        stump: 3,
	        heart: 2,
	        recycle: 2,
	        raibowRecycle: 2,
	        lightening: 1,
	        tree1: 1,
	        tree2: 1,
	        tree3: 1,
	        tree6: 1,
	        tree7: 1
	    },
	    groundItemAmounts: {
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 5,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }
		}, _default_opts2.default);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzdGUtYnVzdGVycy1waGFzZXIvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDJmOTI0ZDc2MWU3NTViMmYxYmQiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2luZGV4LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvY29tcG9uZW50cy9nYW1lLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9wcmVsb2FkLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9sb2FkX2Fzc2V0cy8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvY3JlYXRlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9zZXRfZ2FtZV9zdGFnZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9wbGF5ZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX3Jlc3BvbnNlcy8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL21vdmVfcGxheWVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9oZWxwZXJzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9hZGRfaXRlbXMvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL21ha2VfYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX3BsYXRmb3Jtcy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX2xvZ3MuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9pdGVtcy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL29wdHMxLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL2RlZmF1bHRfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzMi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzMy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzNS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDJmOTI0ZDc2MWU3NTViMmYxYmQiLCJ3aW5kb3cuRU5WSVJPTk1FTlQgPSB7XG4gICAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vZi8nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ1bmRlZmluZWRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gIiwiKGZ1bmN0aW9uIChnYW1lTmFtZSkge1xuICAgIHdpbmRvdy5NRURJQSA9IHtcbiAgICAgICAgQkFTRTogRU5WSVJPTk1FTlQuTUVESUFcbiAgICB9O1xuICAgIHdpbmRvdy5NRURJQS5HQU1FID0gd2luZG93Lk1FRElBLkJBU0UgKyAnR2FtZXMvJyArIGdhbWVOYW1lICsgJy8nO1xuICAgIHdpbmRvdy5NRURJQS5FRkZFQ1QgPSB3aW5kb3cuTUVESUEuR0FNRSArICdTb3VuZEFzc2V0cy9lZmZlY3RzLyc7XG4gICAgd2luZG93Lk1FRElBLlZPID0gd2luZG93Lk1FRElBLkdBTUUgKyAnU291bmRBc3NldHMvdm9zLyc7XG4gICAgd2luZG93Lk1FRElBLklNQUdFID0gd2luZG93Lk1FRElBLkdBTUUgKyAnSW1hZ2VBc3NldHMvJztcbiAgICB3aW5kb3cuTUVESUEuU1BSSVRFID0gd2luZG93Lk1FRElBLkdBTUUgKyAnU3ByaXRlc0FuaW1hdGlvbnMvJztcbn0od2luZG93LmdhbWVGb2xkZXIpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9qcy9tYWtlX21lZGlhX2dsb2JhbHMuanMiLCJpbXBvcnQgR2FtZSBmcm9tICdzaGFyZWQvcGhhc2VyL2NvbXBvbmVudHMvZ2FtZS8wLjEnO1xuaW1wb3J0IHByZWxvYWQgZnJvbSAnLi9qcy9wcmVsb2FkJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9qcy9jcmVhdGUnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL2pzL3VwZGF0ZSc7XG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2pzL2hlbHBlcnMnO1xuXG5pbXBvcnQgb3B0c0FycmF5IGZyb20gJy4vanMvb3B0cyc7XG5cbnZhciBvcHRzID0gb3B0c0FycmF5W2xvY2F0aW9uLnNlYXJjaC5zcGxpdCgndj0nKVsxXSAtIDEgfHwgMF07XG5cbkVOVklST05NRU5ULk1FRElBICs9ICdHYW1lcy9XYXN0ZUJ1c3RlcnMvJztcblxud2luZG93LmdhbWUgPSBuZXcgR2FtZSh7XG4gICAgd2lkdGg6IDk2MCxcbiAgICBoZWlnaHQ6IDU0MCxcbiAgICBwcmVsb2FkLFxuICAgIGNyZWF0ZSxcbiAgICB1cGRhdGUsXG4gICAgaGVscGVycyxcbiAgICBvcHRzLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9pbmRleC5qcyIsImNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgICAgICBvcHRzLnByZWxvYWQgPSAob3B0cy5wcmVsb2FkIHx8IF8ubm9vcCkuYmluZCh0aGlzKTtcbiAgICAgICAgb3B0cy5jcmVhdGUgPSAob3B0cy5jcmVhdGUgfHwgXy5ub29wKS5iaW5kKHRoaXMpO1xuICAgICAgICBvcHRzLnVwZGF0ZSA9IChvcHRzLnVwZGF0ZSB8fCBfLm5vb3ApLmJpbmQodGhpcyk7XG5cbiAgICAgICAgb3B0cyA9IF8uZGVmYXVsdHMob3B0cywge1xuICAgICAgICAgICAgd2lkdGg6IDk2MCxcbiAgICAgICAgICAgIGhlaWdodDogNTQwLFxuICAgICAgICAgICAgcmVuZGVyZXI6IFBoYXNlci5DQU5WQVMsXG4gICAgICAgICAgICBwYXJlbnQ6ICcnLFxuICAgICAgICAgICAgaGVscGVyczoge30sXG4gICAgICAgICAgICBzdGF0ZTogeyBwcmVsb2FkOiBvcHRzLnByZWxvYWQsIGNyZWF0ZTogb3B0cy5jcmVhdGUsIHVwZGF0ZTogb3B0cy51cGRhdGUgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oZWxwZXJzID0gb3B0cy5oZWxwZXJzO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzLm9wdHM7XG5cbiAgICAgICAgdGhpcy5nYW1lID0gbmV3IFBoYXNlci5HYW1lKG9wdHMud2lkdGgsIG9wdHMuaGVpZ2h0LCBvcHRzLnJlbmRlcmVyLCBvcHRzLnBhcmVudCwgb3B0cy5zdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudHMoKTtcbiAgICB9XG5cbiAgICBhdHRhY2hFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdza29hc2gtZXZlbnQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250cm9sbGVyLXVwZGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlciA9IGUuZGF0YS5jb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRhLXVwZGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IF8uZGVmYXVsdHMoZS5kYXRhLmRhdGEsIHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Jlc3VtZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBkb2N1bWVudC5kb21haW4gPSAnY2hhbmdlbXl3b3JsZG5vdy5jb20nO1xuICAgIH1cblxuICAgIGVtaXRFdmVudChvcHRzKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEV2ZW50KCdnYW1lLWV2ZW50Jyk7XG4gICAgICAgIF8uZWFjaChvcHRzLCAodiwgaykgPT4ge1xuICAgICAgICAgICAgZVtrXSA9IHY7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAod2luZG93LmZyYW1lRWxlbWVudCkgd2luZG93LmZyYW1lRWxlbWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9waGFzZXIvY29tcG9uZW50cy9nYW1lLzAuMS5qcyIsImltcG9ydCBsb2FkQXNzZXRzIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9sb2FkX2Fzc2V0cy8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgbG9hZEFzc2V0cy5jYWxsKHRoaXMsICdpbWFnZScsIFtcbiAgICBbJ3NreScsIE1FRElBLklNQUdFICsgJ2dhbWUuMS5ia2cuc2t5LmpwZyddLFxuICAgIFsnY2xvdWRzJywgTUVESUEuSU1BR0UgKyAnZ2FtZS4xLmJrZy5jbG91ZHMucG5nJ10sXG4gICAgWydncm91bmQnLCBNRURJQS5TUFJJVEUgKyAnZ2FtZTEuZ3JvdW5kLnBuZyddLFxuICAgIFsncGxhdGZvcm1zJywgTUVESUEuU1BSSVRFICsgJ2dhbWUxLnBsYXRmb3JtLnBuZyddLFxuICAgIC8vIDkzMCB4IDE0MCBwaXhlbHNcbiAgICBbJ2l0ZW1zJywgTUVESUEuU1BSSVRFICsgJ2dhbWUxLjUucG5nJ10sXG4gICAgLy8gMTI0NiB4IDEwMCBwaXhlbHNcbiAgICBbJ2xvZ3MnLCBNRURJQS5TUFJJVEUgKyAnZ2FtZTEubG9ncy5wbmcnXSxcbiAgICAvLyAyMTAwIHggMzYwIHBpeGVsc1xuICAgIFsndHJlZXMnLCBNRURJQS5TUFJJVEUgKyAnZ2FtZTEudHJlZXMucG5nJ10sXG4gICAgXSk7XG5cbiAgICBsb2FkQXNzZXRzLmNhbGwodGhpcywgJ3Nwcml0ZXNoZWV0JywgW1xuICAgIC8vIDYxODAgeCA2NDYgcGl4ZWxzXG4gICAgWyd0dXJ0bGUnLCBNRURJQS5TUFJJVEUgKyAndHVydGxlLndhbGsuMC5wbmcnLCA1MTUsIDY0NV0sXG4gICAgWyd0dXJ0bGUzJywgTUVESUEuU1BSSVRFICsgJ3R1cnRsZS53YWxrLjMucG5nJywgNTE1LCA2NDVdLFxuICAgIFsndHVydGxlNScsIE1FRElBLlNQUklURSArICd0dXJ0bGUud2Fsay41LnBuZycsIDUxNSwgNjQ1XSxcbiAgICAvLyAxODMwIHggMjc2IHBpeGVsc1xuICAgIFsnaGVhcnQnLCBNRURJQS5TUFJJVEUgKyAnZ2FtZTEuaGVhcnRzLnBuZycsIDMwNSwgMjc2XSxcbiAgICAvLyAxNzI2IHggMzEwIHBpeGVsc1xuICAgIFsncmVjeWNsZScsIE1FRElBLlNQUklURSArICdyZWN5Y2xlLTAxLnBuZycsIDM0NSwgMzEwXSxcbiAgICAvLyAxMzgwIHggMzEwIHBpeGVsc1xuICAgIFsncmFpbmJvd1JlY3ljbGUnLCBNRURJQS5TUFJJVEUgKyAncmFpbmJvdy5yZWN5Y2xlLTAxLnBuZycsIDM0NSwgMzEwXSxcbiAgICAvLyA1NzUwIHggMjg2IHBpeGVsc1xuICAgIFsndHJ1Y2snLCBNRURJQS5TUFJJVEUgKyAndHJ1Y2sucG5nJywgNTc1LCAyODZdLFxuICAgIC8vIDEzMjAgeCAyMjYgcGl4ZWxzXG4gICAgWydkb29yJywgTUVESUEuU1BSSVRFICsgJ2Rvb3Iub3Blbi5wbmcnLCAyMjAsIDIyNl0sXG4gICAgLy8gMzYwMCB4IDMyNiBwaXhlbHNcbiAgICBbJ2pldCcsIE1FRElBLlNQUklURSArICdqZXQucGFjay5wbmcnLCA2MDAsIDMyNl0sXG4gICAgLy8gNzg2MCB4IDQxMCBwaXhlbHNcbiAgICBbJ3NuYWtlMCcsIE1FRElBLlNQUklURSArICdtb3RoZXIuc2xpdGhlci0wMS5wbmcnLCA2NTUsIDQxMF0sXG4gICAgLy8gMzMyNiB4IDI1MCBwaXhlbHNcbiAgICBbJ3NuYWtlMHVwJywgTUVESUEuU1BSSVRFICsgJ01vbS5sZWF2aW5nLmhvbGUucG5nJywgNDc1LCAyNTBdLFxuICAgIC8vIDMzMjYgeCAyNTAgcGl4ZWxzXG4gICAgWydzbmFrZTBkb3duJywgTUVESUEuU1BSSVRFICsgJ01vbS5nb2luZy50by5ob2xlLnBuZycsIDQ3NSwgMjUwXSxcbiAgICAvLyA3ODYwIHggNDEwIHBpeGVsc1xuICAgIFsnc25ha2UxJywgTUVESUEuU1BSSVRFICsgJ3Npc3Rlci5zbGl0aGVyLTAxLnBuZycsIDY1NSwgNDEwXSxcbiAgICAvLyAzMzI2IHggMjUwIHBpeGVsc1xuICAgIFsnc25ha2UxdXAnLCBNRURJQS5TUFJJVEUgKyAnc2lzdGVyLmxlYXZlLmhvbGUucG5nJywgNDc1LCAyNTBdLFxuICAgIC8vIDMzMjYgeCAyNTAgcGl4ZWxzXG4gICAgWydzbmFrZTFkb3duJywgTUVESUEuU1BSSVRFICsgJ3Npc3Rlci5kb3duLmhvbGUucG5nJywgNDc1LCAyNTBdLFxuICAgIC8vIDc4NjAgeCA0MTAgcGl4ZWxzXG4gICAgWydzbmFrZTInLCBNRURJQS5TUFJJVEUgKyAnYnJvdGhlci5zbGl0aGVyLTAxLnBuZycsIDY1NSwgNDEwXSxcbiAgICAvLyAzMzI2IHggMjUwIHBpeGVsc1xuICAgIFsnc25ha2UydXAnLCBNRURJQS5TUFJJVEUgKyAnYnJvdGhlci5sZWF2ZS5ob2xlLnBuZycsIDQ3NSwgMjUwXSxcbiAgICAvLyAzMzI2IHggMjUwIHBpeGVsc1xuICAgIFsnc25ha2UyZG93bicsIE1FRElBLlNQUklURSArICdicm90aGVyLmRvd24uaG9sZS5wbmcnLCA0NzUsIDI1MF0sXG4gICAgXSk7XG5cbiAgICBsb2FkQXNzZXRzLmNhbGwodGhpcywgJ2F1ZGlvJywgW1xuICAgIF0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvcHJlbG9hZC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmbiA9ICdpbWFnZScsIG9wdHNBcnJheSkge1xuICAgIF8uZWFjaChvcHRzQXJyYXksIG9wdHMgPT4ge1xuICAgICAgICBvcHRzID0gXy5kZWZhdWx0cyhvcHRzLCBbXG4gICAgICAgICAgICAnc2t5JyxcbiAgICAgICAgICAgICdtZWRpYS9za3kucG5nJyxcbiAgICAgICAgICAgIDMyLFxuICAgICAgICAgICAgNDgsXG4gICAgICAgIF0pO1xuICAgICAgICB0aGlzLmdhbWUubG9hZFtmbl0oLi4ub3B0cyk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvbG9hZF9hc3NldHMvMC4xLmpzIiwiaW1wb3J0IHNldEdhbWVTdGFnZSBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvc2V0X2dhbWVfc3RhZ2UvMC4xJztcbi8vaW1wb3J0IHJhbmRvbWl6ZUxvY2F0aW9ucyBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvcmFuZG9taXplX2xvY2F0aW9ucy8wLjEnO1xuaW1wb3J0IGFkZFBsYXllciBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX3BsYXllci8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0ge307XG5cbiAgICBzZXRHYW1lU3RhZ2UuY2FsbCh0aGlzLCB7XG4gICAgICAgIHdpZHRoOiA0MDAwLFxuICAgICAgICBoZWlnaHQ6IDc0MCxcbiAgICAgICAgdG9wOiAtMjAwLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblxuICAgIHRoaXMuaGVscGVycy5tYWtlQmFja2dyb3VuZC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuaGVscGVycy5tYWtlR3JvdW5kLmNhbGwodGhpcyk7XG4gICAgdGhpcy5oZWxwZXJzLm1ha2VEb29yLmNhbGwodGhpcyk7XG4gICAgdGhpcy5oZWxwZXJzLm1ha2VQbGF0Zm9ybXMuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmhlbHBlcnMubWFrZUxvZ3MuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmhlbHBlcnMubWFrZUl0ZW1zLmNhbGwodGhpcyk7XG5cbiAgICBhZGRQbGF5ZXIuY2FsbCh0aGlzLCB7XG4gICAgICAgIGxlZnQ6IDMyLFxuICAgICAgICB0b3A6IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSA0NTAsXG4gICAgICAgIGltYWdlOiB0aGlzLm9wdHMucGxheWVySW1hZ2UsXG4gICAgICAgIGJvdW5jZVk6IHRoaXMub3B0cy5ib3VuY2VZLFxuICAgICAgICBncmF2aXR5WTogdGhpcy5vcHRzLmdyYXZpdHlZLFxuICAgICAgICBib2R5OiB0aGlzLm9wdHMucGxheWVyQm9keSxcbiAgICAgICAgcmlnaHRGcmFtZXM6IHRoaXMub3B0cy5yaWdodEZyYW1lcyxcbiAgICAgICAgbGVmdEZyYW1lczogdGhpcy5vcHRzLmxlZnRGcmFtZXMsXG4gICAgICAgIHNjYWxlOiB0aGlzLm9wdHMucGxheWVyU2NhbGUsXG4gICAgfSk7XG5cbiAgICB0aGlzLmRhdGEgPSBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWxzOiB7XG4gICAgICAgICAgICBbdGhpcy5vcHRzLmxldmVsXToge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydWNrczogMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHRoaXMuZGF0YSk7XG5cbiAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL2NyZWF0ZS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgICBvcHRzID0gXy5kZWZhdWx0cyhvcHRzLCB7XG4gICAgICAgIHBoeXNpY3M6IFBoYXNlci5QaHlzaWNzLkFSQ0FERSxcbiAgICAgICAgZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2U6IHRydWUsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgd2lkdGg6IDIwMDAsXG4gICAgICAgIGhlaWdodDogNjAwLFxuICAgIH0pO1xuXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0ob3B0cy5waHlzaWNzKTtcbiAgICB0aGlzLmdhbWUuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSBvcHRzLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlO1xuICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMob3B0cy5sZWZ0LCBvcHRzLnRvcCwgb3B0cy53aWR0aCwgb3B0cy5oZWlnaHQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL3NldF9nYW1lX3N0YWdlLzAuMS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgICBvcHRzID0gXy5kZWZhdWx0cyhvcHRzLCB7XG4gICAgICAgIGxlZnQ6IDMyLFxuICAgICAgICB0b3A6IDUwMCxcbiAgICAgICAgaW1hZ2U6ICdkdWRlJyxcbiAgICAgICAgYm91bmNlWDogMCxcbiAgICAgICAgYm91bmNlWTogMC4yLFxuICAgICAgICBncmF2aXR5WDogMCxcbiAgICAgICAgZ3Jhdml0eVk6IDMwMCxcbiAgICAgICAgY29sbGlkZVdvcmxkQm91bmRzOiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvblVwOiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvbkRvd246IHRydWUsXG4gICAgICAgIGNoZWNrQ29sbGlzaW9uUmlnaHQ6IHRydWUsXG4gICAgICAgIGNoZWNrQ29sbGlzaW9uTGVmdDogdHJ1ZSxcbiAgICAgICAgbGVmdEZyYW1lczogWzAsIDEsIDIsIDNdLFxuICAgICAgICBsZWZ0RnJhbWVSYXRlOiAxMCxcbiAgICAgICAgbGVmdExvb3A6IHRydWUsXG4gICAgICAgIHJpZ2h0RnJhbWVzOiBbNSwgNiwgNywgOF0sXG4gICAgICAgIHJpZ2h0RnJhbWVSYXRlOiAxMCxcbiAgICAgICAgcmlnaHRMb29wOiB0cnVlLFxuICAgICAgICBzY2FsZTogWzEsIDFdLFxuICAgIH0pO1xuXG4gICAgLy8gVGhlIHBsYXllciBhbmQgaXRzIHNldHRpbmdzXG4gICAgdGhpcy5wbGF5ZXIgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZShvcHRzLmxlZnQsIG9wdHMudG9wLCBvcHRzLmltYWdlKTtcblxuICAgIC8vICBXZSBuZWVkIHRvIGVuYWJsZSBwaHlzaWNzIG9uIHRoZSBwbGF5ZXJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlKHRoaXMucGxheWVyKTtcblxuICAgIC8vICBQbGF5ZXIgcGh5c2ljcyBwcm9wZXJ0aWVzLiBHaXZlIHRoZSBsaXR0bGUgZ3V5IGEgc2xpZ2h0IGJvdW5jZS5cbiAgICB0aGlzLnBsYXllci5zY2FsZS5zZXRUbyguLi5vcHRzLnNjYWxlKTtcbiAgICB0aGlzLnBsYXllci5ib2R5LmJvdW5jZS54ID0gb3B0cy5ib3VuY2VYO1xuICAgIHRoaXMucGxheWVyLmJvZHkuYm91bmNlLnkgPSBvcHRzLmJvdW5jZVk7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5ncmF2aXR5LnggPSBvcHRzLmdyYXZpdHlYO1xuICAgIHRoaXMucGxheWVyLmJvZHkuZ3Jhdml0eS55ID0gb3B0cy5ncmF2aXR5WTtcbiAgICB0aGlzLnBsYXllci5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IG9wdHMuY29sbGlkZVdvcmxkQm91bmRzO1xuICAgIHRoaXMucGxheWVyLmJvZHkuY2hlY2tDb2xsaXNpb24udXAgPSBvcHRzLmNoZWNrQ29sbGlzaW9uVXA7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5jaGVja0NvbGxpc2lvbi5kb3duID0gb3B0cy5jaGVja0NvbGxpc2lvbkRvd247XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCA9IG9wdHMuY2hlY2tDb2xsaXNpb25SaWdodDtcbiAgICB0aGlzLnBsYXllci5ib2R5LmNoZWNrQ29sbGlzaW9uLmxlZnQgPSBvcHRzLmNoZWNrQ29sbGlzaW9uTGVmdDtcblxuICAgIGlmIChvcHRzLmJvZHkpIHtcbiAgICAgICAgLy8gZGVmZXIgaGVyZSB0byBwcmV2ZW50IHRoaXMucGxheWVyLnNjYWxlIGZyb20gb3ZlcnJpZGluZyBib2R5IHNpemVcbiAgICAgICAgLy8gd2UgbWlnaHQgd2FudCB0byBmaW5kIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS53aWR0aCA9IG9wdHMuYm9keVswXSAqIG9wdHMuc2NhbGVbMF07XG4gICAgICAgICAgICB0aGlzLnBsYXllci5ib2R5LmhlaWdodCA9IG9wdHMuYm9keVsxXSAqIG9wdHMuc2NhbGVbMV07XG4gICAgICAgICAgICB0aGlzLnBsYXllci5ib2R5Lm9mZnNldC54ID0gb3B0cy5ib2R5WzJdO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS5vZmZzZXQueSA9IG9wdHMuYm9keVszXTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgLy8gIE91ciB0d28gYW5pbWF0aW9ucywgd2Fsa2luZyBsZWZ0IGFuZCByaWdodC5cbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbGVmdCcsIG9wdHMubGVmdEZyYW1lcywgb3B0cy5sZWZ0RnJhbWVSYXRlLCBvcHRzLmxlZnRMb29wKTtcbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgncmlnaHQnLCBvcHRzLnJpZ2h0RnJhbWVzLCBvcHRzLnJpZ2h0RnJhbWVSYXRlLCBvcHRzLnJpZ2h0TG9vcCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX3BsYXllci8wLjEuanMiLCJpbXBvcnQgYWRkUmVzcG9uc2VzIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9hZGRfcmVzcG9uc2VzLzAuMSc7XG5pbXBvcnQgbW92ZVBsYXllciBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvbW92ZV9wbGF5ZXIvMC4xJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuXG4gICAgaWYgKCF0aGlzLnNob3VsZFVwZGF0ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2hvdWxkVXBkYXRlID0gdHJ1ZSwgMTAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucGxheWVyLmNhbkp1bXAgPSB0cnVlO1xuXG4gICAgYWRkUmVzcG9uc2VzLmNhbGwodGhpcywgJ2NvbGxpZGUnLCBbXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLmdyb3VuZCwgdGhpcy5oZWxwZXJzLm9uQnVtcF0sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLndhdGVyLCB0aGlzLmhlbHBlcnMuaGl0V2F0ZXJdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMsIHRoaXMuaGVscGVycy5vbkJ1bXBdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5idXNoZXMsIHRoaXMuaGVscGVycy5vbkJ1bXBdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5vYnN0YWNsZXMsIHRoaXMuaGVscGVycy5oaXRPYnN0YWNsZV0sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLmxvZ3MsIHRoaXMuaGVscGVycy5vbkJ1bXBdLFxuICAgIFt0aGlzLmJ1c2hlcywgdGhpcy5ncm91bmQsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy5idXNoZXMsIHRoaXMucGxhdGZvcm1zLCB0aGlzLmhlbHBlcnMuc3RheV0sXG4gICAgW3RoaXMudHJlZXMsIHRoaXMuZ3JvdW5kLCB0aGlzLmhlbHBlcnMuc3RheV0sXG4gICAgW3RoaXMudHJlZXMsIHRoaXMucGxhdGZvcm1zLCB0aGlzLmhlbHBlcnMuc3RheV0sXG4gICAgW3RoaXMuc25ha2VzLCB0aGlzLmdyb3VuZCwgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIFt0aGlzLnNuYWtlcywgdGhpcy5wbGF0Zm9ybXMsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy5zbmFrZXMsIHRoaXMud2F0ZXIsIHRoaXMuaGVscGVycy50dXJuQXJvdW5kXSxcbiAgICBbdGhpcy5ob2xlcywgdGhpcy5ncm91bmQsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy5iYWdzLCB0aGlzLmdyb3VuZCwgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIFt0aGlzLmJhZ3MsIHRoaXMucGxhdGZvcm1zLCB0aGlzLmhlbHBlcnMuc3RheV0sXG4gICAgW3RoaXMub2JzdGFjbGVzLCB0aGlzLmdyb3VuZCwgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIFt0aGlzLm9ic3RhY2xlcywgdGhpcy5wbGF0Zm9ybXMsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy5kb29ycywgdGhpcy5ncm91bmQsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBdKTtcblxuICAgIGFkZFJlc3BvbnNlcy5jYWxsKHRoaXMsICdvdmVybGFwJywgW1xuICAgIFt0aGlzLnBsYXllciwgdGhpcy5iYWdzLCB0aGlzLmhlbHBlcnMuY29sbGVjdEJhZ3NdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5oZWFydHMsIHRoaXMuaGVscGVycy5jb2xsZWN0SGVhcnRdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5yZWN5Y2xlcywgdGhpcy5oZWxwZXJzLmNvbGxlY3RSZWN5Y2xpbmddLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5yYWluYm93UmVjeWNsZXMsIHRoaXMuaGVscGVycy5jb2xsZWN0UmFpbmJvd1JlY3ljbGluZ10sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLnRydWNrcywgdGhpcy5oZWxwZXJzLmxvYWRUcnVja10sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLmRvb3JzLCB0aGlzLmhlbHBlcnMuZXhpdF0sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLmxvZ3MsIHRoaXMuaGVscGVycy5pbkxvZ10sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLmxpZ2h0ZW5pbmcsIHRoaXMuaGVscGVycy5jb2xsZWN0TGlnaHRlbmluZ10sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLnNuYWtlcywgdGhpcy5oZWxwZXJzLmhpdEVuZW15XSxcbiAgICBbdGhpcy5zbmFrZXMsIHRoaXMuaG9sZXMsIHRoaXMuaGVscGVycy5hY3RpdmF0ZVNuYWtlXSxcbiAgICBdKTtcblxuICAgIGlmICghdGhpcy5kYXRhLmxldmVsc1t0aGlzLm9wdHMubGV2ZWxdLmNvbXBsZXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXllci5ib29zdCkge1xuICAgICAgICAgICAgbW92ZVBsYXllci5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB1cFNwZWVkOiB0aGlzLm9wdHMuYm9vc3RVcFNwZWVkLFxuICAgICAgICAgICAgICAgIGRvd25TcGVlZDogdGhpcy5vcHRzLmJvb3N0RG93blNwZWVkLFxuICAgICAgICAgICAgICAgIGxlZnRTcGVlZDogdGhpcy5vcHRzLmJvb3N0TGVmdFNwZWVkLFxuICAgICAgICAgICAgICAgIHJpZ2h0U3BlZWQ6IHRoaXMub3B0cy5ib29zdFJpZ2h0U3BlZWQsXG4gICAgICAgICAgICAgICAgc3RvcEZyYW1lOiB0aGlzLm9wdHMuYm9vc3RQbGF5ZXJTdG9wRnJhbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdmVQbGF5ZXIuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdXBTcGVlZDogdGhpcy5vcHRzLnVwU3BlZWQsXG4gICAgICAgICAgICAgICAgZG93blNwZWVkOiB0aGlzLm9wdHMuZG93blNwZWVkLFxuICAgICAgICAgICAgICAgIGxlZnRTcGVlZDogdGhpcy5vcHRzLmxlZnRTcGVlZCxcbiAgICAgICAgICAgICAgICByaWdodFNwZWVkOiB0aGlzLm9wdHMucmlnaHRTcGVlZCxcbiAgICAgICAgICAgICAgICBzdG9wRnJhbWU6IHRoaXMub3B0cy5wbGF5ZXJTdG9wRnJhbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmxldmVsc1t0aGlzLm9wdHMubGV2ZWxdLmRvb3JPcGVuKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDE1MDtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlKHRoaXMucGxheWVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmdhbWUuY2FtZXJhLnggPVxuICAgICAgICBNYXRoLm1pbihNYXRoLm1heCh0aGlzLnBsYXllci5ib2R5LmNlbnRlci54IC0gNDAwLCAwKSwgdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gODAwKTtcblxuICAgIC8vIHRoaXMuY2xvdWRzLmNoaWxkcmVuWzBdLnBvc2l0aW9uLnggPSAtLjI1ICogdGhpcy5nYW1lLmNhbWVyYS54O1xuICAgIHRoaXMuY2xvdWRzLmNoaWxkcmVuWzBdLnBvc2l0aW9uLnggPSAtLjI1ICogdGhpcy5wbGF5ZXIuYm9keS5jZW50ZXIueDtcbiAgICB0aGlzLmNsb3Vkcy5jaGlsZHJlblsxXS5wb3NpdGlvbi54ID0gMjk3NS41IC0gLjI1ICogdGhpcy5wbGF5ZXIuYm9keS5jZW50ZXIueDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL3VwZGF0ZS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmbiA9ICdjb2xsaWRlJywgb3B0c0FycmF5KSB7XG4gICAgXy5lYWNoKG9wdHNBcnJheSwgb3B0cyA9PiB7XG4gICAgICAgIG9wdHMgPSBfLmRlZmF1bHRzKG9wdHMsIFtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLFxuICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybXMsXG4gICAgICAgICAgICBfLm5vb3AsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgXSk7XG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZVtmbl0oLi4ub3B0cyk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX3Jlc3BvbnNlcy8wLjEuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0cykge1xuICAgIG9wdHMgPSBfLmRlZmF1bHRzKG9wdHMsIHtcbiAgICAgICAgdXBTcGVlZDogLTM1MCxcbiAgICAgICAgZG93blNwZWVkOiA1MDAsXG4gICAgICAgIGxlZnRTcGVlZDogLTE1MCxcbiAgICAgICAgcmlnaHRTcGVlZDogMTUwLFxuICAgICAgICBzdG9wRnJhbWU6IDQsXG4gICAgfSk7XG5cbiAgICAvLyAgUmVzZXQgdGhlIHBsYXllcnMgdmVsb2NpdHkgKG1vdmVtZW50KVxuICAgIGlmICh0aGlzLmlzSGl0KSByZXR1cm47XG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMDtcblxuICAgIGlmICh0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd24gfHwgdGhpcy5jb250cm9sbGVyLmxlZnQpIHtcbiAgICAgICAgLy8gIE1vdmUgdG8gdGhlIGxlZnRcbiAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gb3B0cy5sZWZ0U3BlZWQ7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbGVmdCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xsZXIucmlnaHQpIHtcbiAgICAgICAgLy8gIE1vdmUgdG8gdGhlIHJpZ2h0XG4gICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IG9wdHMucmlnaHRTcGVlZDtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICBTdGFuZCBzdGlsbFxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuZnJhbWUgPSBvcHRzLnN0b3BGcmFtZTtcbiAgICB9XG5cbiAgICAvLyAgQWxsb3cgdGhlIHBsYXllciB0byBqdW1wIGlmIHRoZXkgYXJlIHRvdWNoaW5nIHRoZSBncm91bmQuXG4gICAgaWYgKHRoaXMucGxheWVyLmNhbkp1bXAgJiZcbiAgICAgICAgKHRoaXMuY3Vyc29ycy51cC5pc0Rvd24gfHwgdGhpcy5jb250cm9sbGVyLnVwKSAmJlxuICAgICAgICB0aGlzLnBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gb3B0cy51cFNwZWVkO1xuICAgIH1cblxuICAgIC8vICBBbGxvdyB0aGUgcGxheWVyIHRvIGZhbGwgZmFzdCBpZiB0aGV5IGFyZSBub3QgdG91Y2hpbmcgdGhlIGdyb3VuZC5cbiAgICBpZiAoKHRoaXMuY3Vyc29ycy5kb3duLmlzRG93biB8fCB0aGlzLmNvbnRyb2xsZXIuZG93bikgJiYgIXRoaXMucGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xuICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSBvcHRzLmRvd25TcGVlZDtcbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9tb3ZlX3BsYXllci8wLjEuanMiLCJpbXBvcnQgYWRkSXRlbXMgZnJvbSAnc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9pdGVtcy8wLjEnO1xuXG5pbXBvcnQgbWFrZUJhY2tncm91bmQgZnJvbSAnLi9tYWtlX2JhY2tncm91bmQnO1xuaW1wb3J0IG1ha2VHcm91bmQgZnJvbSAnLi9tYWtlX2dyb3VuZCc7XG5pbXBvcnQgbWFrZVBsYXRmb3JtcyBmcm9tICcuL21ha2VfcGxhdGZvcm1zJztcbmltcG9ydCBtYWtlTG9ncyBmcm9tICcuL21ha2VfbG9ncyc7XG5pbXBvcnQgbWFrZUl0ZW1zIGZyb20gJy4vbWFrZV9pdGVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbWl0RGF0YSgpIHtcbiAgICAgICAgLy8gIGVtaXQgZXZlbnQgd2l0aCBkYXRhIHRvIHNrb2FzaCBnYW1lXG4gICAgICAgIHRoaXMuZW1pdEV2ZW50KHtcbiAgICAgICAgICAgIHVwZGF0ZUdhbWVTdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IFsnZ2FtZSddLFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uQnVtcCgpIHtcbiAgICB9LFxuICAgIGFjdGl2YXRlU25ha2Uoc25ha2UsIGhvbGUpIHtcbiAgICAgICAgdmFyIGNsaW1iO1xuXG4gICAgICAgIGlmICghc25ha2UuYWN0aXZlICYmICFzbmFrZS5jbGltYmluZykge1xuICAgICAgICAgICAgc25ha2UubGVmdCA9IGhvbGUubGVmdCAtIDEwMDtcbiAgICAgICAgICAgIHNuYWtlLmxvYWRUZXh0dXJlKHNuYWtlLm9yaWdpbmFsSW1hZ2UgKyAndXAnLCAwKTtcbiAgICAgICAgICAgIGNsaW1iID0gc25ha2UuYW5pbWF0aW9ucy5hZGQoJ2hvbGUnLCBbMCwgMSwgMiwgMywgNCwgNSwgNl0sIDEwLCBmYWxzZSk7XG4gICAgICAgICAgICBjbGltYi5vbkNvbXBsZXRlLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc25ha2UubG9hZFRleHR1cmUoc25ha2Uub3JpZ2luYWxJbWFnZSwgNSk7XG4gICAgICAgICAgICAgICAgc25ha2Uuc2NhbGUuc2V0VG8oLjMsIC4zKTtcbiAgICAgICAgICAgICAgICBzbmFrZS5sZWZ0ID0gc25ha2UubGVmdCAtIDI1O1xuICAgICAgICAgICAgICAgIHNuYWtlLnRvcCA9IHNuYWtlLnRvcCAtIDI1O1xuICAgICAgICAgICAgICAgIHNuYWtlLmFuaW1hdGlvbnMuYWRkKCdsZWZ0JywgWzUsIDQsIDMsIDIsIDEsIDBdLCAxMCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgc25ha2UuYW5pbWF0aW9ucy5hZGQoJ3JpZ2h0JywgWzYsIDcsIDgsIDksIDEwLCAxMV0sIDEwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzbmFrZS5hbmltYXRpb25zLnBsYXkoJ2xlZnQnKTtcbiAgICAgICAgICAgICAgICBzbmFrZS5ib2R5LnZlbG9jaXR5LnggPSAtMTAwO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzbmFrZS5jbGltYmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzbmFrZS5zY2FsZS5zZXRUbyguNCwgLjQpO1xuICAgICAgICAgICAgc25ha2UuYW5pbWF0aW9ucy5wbGF5KCdob2xlJyk7XG4gICAgICAgICAgICBzbmFrZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc25ha2UuY2xpbWJpbmcgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHNuYWtlLmFjdGl2ZSAmJiAhc25ha2UuY2xpbWJpbmcgJiYgc25ha2UuYm9keS52ZWxvY2l0eS54ID4gMCAmJiBzbmFrZS5sZWZ0IDwgaG9sZS5sZWZ0KSB7XG4gICAgICAgICAgICBzbmFrZS5sZWZ0ID0gaG9sZS5sZWZ0IC0gMTAwO1xuICAgICAgICAgICAgc25ha2UuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICAgICAgICAgIHNuYWtlLmxvYWRUZXh0dXJlKHNuYWtlLm9yaWdpbmFsSW1hZ2UgKyAnZG93bicsIDApO1xuICAgICAgICAgICAgc25ha2UubGVmdCA9IHNuYWtlLmxlZnQgKyAyNTtcbiAgICAgICAgICAgIHNuYWtlLnRvcCA9IHNuYWtlLnRvcCArIDI1O1xuICAgICAgICAgICAgY2xpbWIgPSBzbmFrZS5hbmltYXRpb25zLmFkZCgnaG9sZScsIFswLCAxLCAyLCAzLCA0LCA1LCA2XSwgMTAsIGZhbHNlKTtcbiAgICAgICAgICAgIGNsaW1iLm9uQ29tcGxldGUuYWRkKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzbmFrZS5sb2FkVGV4dHVyZShudWxsLCAwKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc25ha2UuY2xpbWJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc25ha2Uuc2NhbGUuc2V0VG8oLjQsIC40KTtcbiAgICAgICAgICAgIHNuYWtlLmFuaW1hdGlvbnMucGxheSgnaG9sZScpO1xuICAgICAgICAgICAgc25ha2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzbmFrZS5jbGltYmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHR1cm5Bcm91bmQoZW5lbXkpIHtcbiAgICAgICAgaWYgKGVuZW15LmlzVHVybmluZykgcmV0dXJuO1xuICAgICAgICBlbmVteS5pc1R1cm5pbmcgPSB0cnVlO1xuICAgICAgICBlbmVteS5ib2R5LnZlbG9jaXR5LnggPSAtMSAqIGVuZW15LmJvZHkudmVsb2NpdHkueDtcbiAgICAgICAgZW5lbXkuYW5pbWF0aW9ucy5wbGF5KGVuZW15LmJvZHkudmVsb2NpdHkueCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbmVteS5pc1R1cm5pbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9LFxuICAgIGhpdEVuZW15KHAsIGUpIHtcbiAgICAgICAgaWYgKCFlLmFjdGl2ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhlbHBlcnMuaGl0U29tZXRoaW5nLmNhbGwodGhpcywgcCk7XG4gICAgfSxcbiAgICBoaXRPYnN0YWNsZShwKSB7XG4gICAgICAgIHRoaXMuaGVscGVycy5oaXRTb21ldGhpbmcuY2FsbCh0aGlzLCBwKTtcbiAgICB9LFxuICAgIGhpdFdhdGVyKHApIHtcbiAgICAgICAgdGhpcy5oZWxwZXJzLmhpdFNvbWV0aGluZy5jYWxsKHRoaXMsIHAsIDEsIDEpO1xuICAgIH0sXG4gICAgaGl0U29tZXRoaW5nKHAsIGkgPSAxLCBkID0gLTEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaXQpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0hpdCA9IHRydWU7XG4gICAgICAgIHAuYm9keS52ZWxvY2l0eS55ID0gLTEgKiB0aGlzLm9wdHMuaGl0VmVsb2NpdHk7XG5cbiAgICAgICAgcC5ib2R5LnZlbG9jaXR5LnggPSAocC5ib2R5LnZlbG9jaXR5LnggPT09IE1hdGguYWJzKHAuYm9keS52ZWxvY2l0eS54KSA/XG4gICAgICAgICAgICBkIDogLTEgKiBkKSAqIHRoaXMub3B0cy5oaXRWZWxvY2l0eTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNIaXQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgdGhpcy5kYXRhLmhpdHMgKz0gaTtcbiAgICAgICAgdGhpcy5oZWxwZXJzLmVtaXREYXRhLmNhbGwodGhpcyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5oaXRzID49IHRoaXMub3B0cy5oaXRzUGVyTGlmZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5oaXRzIC09IHRoaXMub3B0cy5oaXRzUGVyTGlmZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEubGl2ZXMtLTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUwKTtcbiAgICB9LFxuICAgIGluTG9nKCkge1xuICAgICAgICB0aGlzLnBsYXllci5jYW5KdW1wID0gZmFsc2U7XG4gICAgfSxcbiAgICBjb2xsZWN0UmVjeWNsaW5nKHBsYXllciwgcmVjeWNseWluZykge1xuICAgICAgICAvLyBSZW1vdmVzIHRoZSByZWN5Y2x5aW5nIGZyb20gdGhlIHNjcmVlblxuICAgICAgICByZWN5Y2x5aW5nLmtpbGwoKTtcbiAgICAgICAgLy8gIHVwZGF0ZSB0aGUgbGl2ZXNcbiAgICAgICAgdGhpcy5kYXRhLnNjb3JlICs9IHRoaXMub3B0cy5yZWN5Y2xpbmdTY29yZTtcbiAgICAgICAgdGhpcy5oZWxwZXJzLmVtaXREYXRhLmNhbGwodGhpcyk7XG4gICAgfSxcbiAgICBjb2xsZWN0UmFpbmJvd1JlY3ljbGluZyhwbGF5ZXIsIHJlY3ljbHlpbmcpIHtcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgcmVjeWNseWluZyBmcm9tIHRoZSBzY3JlZW5cbiAgICAgICAgcmVjeWNseWluZy5raWxsKCk7XG4gICAgICAgIC8vICB1cGRhdGUgdGhlIGxpdmVzXG4gICAgICAgIHRoaXMuZGF0YS5zY29yZSArPSB0aGlzLm9wdHMucmFpbmJvd1JlY3ljbHlpbmdTY29yZTtcbiAgICAgICAgdGhpcy5oZWxwZXJzLmVtaXREYXRhLmNhbGwodGhpcyk7XG4gICAgfSxcbiAgICBjb2xsZWN0SGVhcnQocGxheWVyLCBoZWFydCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxpdmVzID09PSB0aGlzLm9wdHMubWF4TGl2ZXMpIHJldHVybjtcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgaGVhcnQgZnJvbSB0aGUgc2NyZWVuXG4gICAgICAgIGhlYXJ0LmtpbGwoKTtcbiAgICAgICAgLy8gIHVwZGF0ZSB0aGUgbGl2ZXNcbiAgICAgICAgdGhpcy5kYXRhLmxpdmVzKys7XG4gICAgICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgY29sbGVjdEJhZ3MocGxheWVyLCBiYWcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5iYWdDb3VudCA9PT0gdGhpcy5vcHRzLm1heEJhZ3MpIHJldHVybjtcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgYmFnIGZyb20gdGhlIHNjcmVlblxuICAgICAgICBiYWcua2lsbCgpO1xuICAgICAgICAvLyAgdXBkYXRlIHRoZSBiYWdDb3VudFxuICAgICAgICB0aGlzLmRhdGEuYmFnQ291bnQrKztcbiAgICAgICAgdGhpcy5oZWxwZXJzLnVwZGF0ZVBsYXllci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbiAgICB9LFxuICAgIGNvbGxlY3RMaWdodGVuaW5nKHBsYXllciwgbGlnaHRlbmluZykge1xuICAgICAgICBwbGF5ZXIuYm9vc3QgPSAocGxheWVyLmJvb3N0ICsgMSkgfHwgMTtcbiAgICAgICAgbGlnaHRlbmluZy5raWxsKCk7XG4gICAgICAgIHRoaXMuaGVscGVycy51cGRhdGVQbGF5ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXIuYm9vc3QtLTtcbiAgICAgICAgICAgIHRoaXMuaGVscGVycy51cGRhdGVQbGF5ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfSwgdGhpcy5vcHRzLmJvb3N0VGltZSk7XG4gICAgfSxcbiAgICB1cGRhdGVQbGF5ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXllci5ib29zdCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIubG9hZFRleHR1cmUoJ2pldCcsIDApO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ2xlZnQnLCB0aGlzLm9wdHMuYm9vc3RMZWZ0RnJhbWVzLFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5ib29zdExlZnRGcmFtZVJhdGUsIHRoaXMub3B0cy5ib29zdExlZnRMb29wKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdyaWdodCcsIHRoaXMub3B0cy5ib29zdFJpZ2h0RnJhbWVzLFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5ib29zdFJpZ2h0RnJhbWVSYXRlLCB0aGlzLm9wdHMuYm9vc3RSaWdodExvb3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5iYWdDb3VudCA9PT0gdGhpcy5vcHRzLm1heEJhZ3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5sb2FkVGV4dHVyZSgndHVydGxlNScsIDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuYmFnQ291bnQgPj0gdGhpcy5vcHRzLm1heEJhZ3MgLyAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubG9hZFRleHR1cmUoJ3R1cnRsZTMnLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubG9hZFRleHR1cmUoJ3R1cnRsZScsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ2xlZnQnLCB0aGlzLm9wdHMubGVmdEZyYW1lcyxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMubGVmdEZyYW1lUmF0ZSwgdGhpcy5vcHRzLmxlZnRMb29wKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMuYWRkKCdyaWdodCcsIHRoaXMub3B0cy5yaWdodEZyYW1lcyxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMucmlnaHRGcmFtZVJhdGUsIHRoaXMub3B0cy5yaWdodExvb3ApO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzdGF5KGEpIHtcbiAgICAgICAgYS5ib2R5LmdyYXZpdHkueSA9IDA7XG4gICAgICAgIGEuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICB9LFxuICAgIGxvYWRUcnVjayhwbGF5ZXIsIHRydWNrKSB7XG4gICAgICAgIGlmICh0cnVjay5kcml2aW5nIHx8IHRoaXMuZGF0YS5iYWdDb3VudCAhPT0gdGhpcy5vcHRzLm1heEJhZ3MpIHJldHVybjtcbiAgICAgICAgdHJ1Y2suZHJpdmluZyA9IHRydWU7XG4gICAgICAgIHRydWNrLmFuaW1hdGlvbnMucGxheSgnZHJpdmUnKTtcbiAgICAgICAgdGhpcy5kYXRhLmJhZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5kYXRhLmxldmVsc1t0aGlzLm9wdHMubGV2ZWxdLnRydWNrcysrO1xuICAgICAgICB0aGlzLmhlbHBlcnMudXBkYXRlUGxheWVyLmNhbGwodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubGV2ZWxzW3RoaXMub3B0cy5sZXZlbF0udHJ1Y2tzID09PSB0aGlzLm9wdHMubWF4VHJ1Y2tzKSB7XG4gICAgICAgICAgICB0aGlzLmRvb3JzLmNoaWxkcmVuWzBdLmFuaW1hdGlvbnMucGxheSgnb3BlbicpO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmxldmVsc1t0aGlzLm9wdHMubGV2ZWxdLmRvb3JPcGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbiAgICB9LFxuICAgIG1ha2VCYWNrZ3JvdW5kLFxuICAgIG1ha2VHcm91bmQsXG4gICAgbWFrZVBsYXRmb3JtcyxcbiAgICBtYWtlTG9ncyxcbiAgICBtYWtlSXRlbXMsXG4gICAgbWFrZURvb3IoKSB7XG4gICAgICAgIGFkZEl0ZW1zLmNhbGwodGhpcywge1xuICAgICAgICAgICAgZ3JvdXA6ICdkb29ycydcbiAgICAgICAgfSwgW3tcbiAgICAgICAgICAgIGltYWdlOiAnZG9vcicsXG4gICAgICAgICAgICBncmF2aXR5WTogMTAwLFxuICAgICAgICAgICAgYm9keTogWzIwMCwgMjAwLCAyNSwgMjVdLFxuICAgICAgICAgICAgc2NhbGU6IFsuNSwgLjVdLFxuICAgICAgICAgICAgY29sbGlkZVdvcmxkQm91bmRzOiBmYWxzZSxcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDkwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICB9XSk7XG5cbiAgICAgICAgdGhpcy5kb29ycy5jaGlsZHJlblswXS5hbmltYXRpb25zLmFkZCgnb3BlbicsIFs1LCA0LCAzLCAyLCAxLCAwXSwgMTAsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5kb29ycy5jaGlsZHJlblswXS5hbmltYXRpb25zLmFkZCgnY2xvc2UnLCBbMCwgMSwgMiwgMywgNCwgNV0sIDEwLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZG9vcnMuY2hpbGRyZW5bMF0uYW5pbWF0aW9ucy5wbGF5KCdjbG9zZScpO1xuICAgIH0sXG4gICAgZXhpdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZXZlbHNbdGhpcy5vcHRzLmxldmVsXS50cnVja3MgIT09IHRoaXMub3B0cy5tYXhUcnVja3MpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZXZlbHNbdGhpcy5vcHRzLmxldmVsXS5jb21wbGV0ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmRhdGEubGV2ZWxzW3RoaXMub3B0cy5sZXZlbF0uY29tcGxldGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnBsYXllci5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvb3JzLmNoaWxkcmVuWzBdLmFuaW1hdGlvbnMucGxheSgnY2xvc2UnKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5sZXZlbHNbdGhpcy5vcHRzLmxldmVsXS5kb29yT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oZWxwZXJzLmVtaXREYXRhLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvaGVscGVycy5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChncm91cE9wdHMgPSB7fSwgb3B0c0FycmF5ID0gW10pIHtcbiAgICBncm91cE9wdHMuZGVmYXVsdE9wdHMgPSBfLmRlZmF1bHRzKGdyb3VwT3B0cy5kZWZhdWx0T3B0cywge1xuICAgICAgICBzY2FsZTogWzEsIDFdLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGltYWdlOiAnZ3JvdW5kJyxcbiAgICAgICAgaW1tb3ZhYmxlOiB0cnVlLFxuICAgICAgICBib3VuY2VYOiAxLFxuICAgICAgICBib3VuY2VZOiAxLFxuICAgICAgICBncmF2aXR5WDogMCxcbiAgICAgICAgZ3Jhdml0eVk6IDAsXG4gICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogdHJ1ZSxcbiAgICAgICAgY2hlY2tDb2xsaXNpb25VcDogdHJ1ZSxcbiAgICAgICAgY2hlY2tDb2xsaXNpb25Eb3duOiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvblJpZ2h0OiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvbkxlZnQ6IHRydWUsXG4gICAgICAgIGFuZ2xlOiAwLFxuICAgICAgICBhbmNob3I6IFswLCAwXSxcbiAgICB9KTtcblxuICAgIGdyb3VwT3B0cyA9IF8uZGVmYXVsdHMoZ3JvdXBPcHRzLCB7XG4gICAgICAgIGVuYWJsZUJvZHk6IHRydWUsXG4gICAgICAgIGdyb3VwOiAncGxhdGZvcm1zJ1xuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzW2dyb3VwT3B0cy5ncm91cF0pIHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBncm91cCB3ZSB3aWxsIGJlIGFkZGluZyB0aGUgaXRlbXMgdG9cbiAgICAgICAgdGhpc1tncm91cE9wdHMuZ3JvdXBdID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICAvLyBlbmFibGUgcGh5c2ljcyBmb3IgYW55IG9iamVjdCB0aGF0IGlzIGNyZWF0ZWQgaW4gdGhpcyBncm91cFxuICAgICAgICB0aGlzW2dyb3VwT3B0cy5ncm91cF0uZW5hYmxlQm9keSA9IGdyb3VwT3B0cy5lbmFibGVCb2R5O1xuICAgIH1cblxuICAgIF8uZWFjaChvcHRzQXJyYXksIG9wdGlvbnMgPT4ge1xuICAgICAgICB2YXIgb3B0cyA9IF8uZGVmYXVsdHMoe30sIG9wdGlvbnMsIGdyb3VwT3B0cy5kZWZhdWx0T3B0cyk7XG5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2dyb3VwT3B0cy5ncm91cF0uY3JlYXRlKG9wdHMubGVmdCwgb3B0cy50b3AsIG9wdHMuaW1hZ2UpO1xuXG4gICAgICAgIGl0ZW0ub3JpZ2luYWxJbWFnZSA9IG9wdHMuaW1hZ2U7XG4gICAgICAgIGl0ZW0uc2NhbGUuc2V0VG8oLi4ub3B0cy5zY2FsZSk7XG4gICAgICAgIGlmIChvcHRzLmNyb3ApIHtcbiAgICAgICAgICAgIGl0ZW0uY3JvcChuZXcgUGhhc2VyLlJlY3RhbmdsZSguLi5vcHRzLmNyb3ApKTtcbiAgICAgICAgICAgIGlmIChncm91cE9wdHMuZW5hYmxlQm9keSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uYm9keS53aWR0aCA9IG9wdHMuY3JvcFsyXTtcbiAgICAgICAgICAgICAgICBpdGVtLmJvZHkuaGVpZ2h0ID0gb3B0cy5jcm9wWzNdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGl0ZW0uYW5nbGUgPSBvcHRzLmFuZ2xlO1xuICAgICAgICBpdGVtLmFuY2hvci5zZXRUbyguLi5vcHRzLmFuY2hvcik7XG5cbiAgICAgICAgaWYgKGdyb3VwT3B0cy5lbmFibGVCb2R5KSB7XG4gICAgICAgICAgICBpdGVtLmJvZHkuaW1tb3ZhYmxlID0gb3B0cy5pbW1vdmFibGU7XG4gICAgICAgICAgICBpdGVtLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gb3B0cy5jb2xsaWRlV29ybGRCb3VuZHM7XG4gICAgICAgICAgICBpdGVtLmJvZHkuYm91bmNlLnggPSBvcHRzLmJvdW5jZVg7XG4gICAgICAgICAgICBpdGVtLmJvZHkuYm91bmNlLnkgPSBvcHRzLmJvdW5jZVk7XG4gICAgICAgICAgICBpdGVtLmJvZHkuZ3Jhdml0eS54ID0gb3B0cy5ncmF2aXR5WDtcbiAgICAgICAgICAgIGl0ZW0uYm9keS5ncmF2aXR5LnkgPSBvcHRzLmdyYXZpdHlZO1xuICAgICAgICAgICAgaXRlbS5ib2R5LmNoZWNrQ29sbGlzaW9uLnVwID0gb3B0cy5jaGVja0NvbGxpc2lvblVwO1xuICAgICAgICAgICAgaXRlbS5ib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24gPSBvcHRzLmNoZWNrQ29sbGlzaW9uRG93bjtcbiAgICAgICAgICAgIGl0ZW0uYm9keS5jaGVja0NvbGxpc2lvbi5yaWdodCA9IG9wdHMuY2hlY2tDb2xsaXNpb25SaWdodDtcbiAgICAgICAgICAgIGl0ZW0uYm9keS5jaGVja0NvbGxpc2lvbi5sZWZ0ID0gb3B0cy5jaGVja0NvbGxpc2lvbkxlZnQ7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAvLyBkZWZlciBoZXJlIHRvIHByZXZlbnQgaXRlbS5zY2FsZSBmcm9tIG92ZXJyaWRpbmcgYm9keSBzaXplXG4gICAgICAgICAgICAgICAgLy8gd2UgbWlnaHQgd2FudCB0byBmaW5kIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYm9keS53aWR0aCA9IG9wdHMuYm9keVswXSAqIG9wdHMuc2NhbGVbMF07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYm9keS5oZWlnaHQgPSBvcHRzLmJvZHlbMV0gKiBvcHRzLnNjYWxlWzFdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJvZHkub2Zmc2V0LnggPSBvcHRzLmJvZHlbMl0gKiBvcHRzLnNjYWxlWzBdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJvZHkub2Zmc2V0LnkgPSBvcHRzLmJvZHlbM10gKiBvcHRzLnNjYWxlWzFdO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX2l0ZW1zLzAuMS5qcyIsImltcG9ydCBhZGRJdGVtcyBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX2l0ZW1zLzAuMSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgZ3JvdXA6ICdza3knLCBlbmFibGVCb2R5OiBmYWxzZSwgZGVmYXVsdE9wdHM6IHtcbiAgICAgICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogZmFsc2UsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBpbWFnZTogJ3NreScsXG4gICAgICAgICAgICBzY2FsZTogWy41LCAuNV0sXG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIHsgbGVmdDogMCB9LFxuICAgICAgICB7IGxlZnQ6IDI5NzUuNSB9XG4gICAgXSk7XG5cbiAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgZ3JvdXA6ICdjbG91ZHMnLCBlbmFibGVCb2R5OiBmYWxzZSwgZGVmYXVsdE9wdHM6IHtcbiAgICAgICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogZmFsc2UsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBpbWFnZTogJ2Nsb3VkcycsXG4gICAgICAgICAgICBzY2FsZTogWy41LCAuNV0sXG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIHsgbGVmdDogMCB9LFxuICAgICAgICB7IGxlZnQ6IDI5NzUuNSB9XG4gICAgXSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX2JhY2tncm91bmQuanMiLCJpbXBvcnQgYWRkSXRlbXMgZnJvbSAnc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9pdGVtcy8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxlZnQgPSAwO1xuICAgIHZhciBncm91bmRPcHRzID0gW107XG4gICAgdmFyIHdhdGVyT3B0cyA9IFtdO1xuICAgIHZhciByYW5kb20gPSAyO1xuXG4gICAgbGV0IGNyb3BzID0gW1xuICAgICAgICBbMjAsIDAsIDM4MCwgMjEwXSxcbiAgICAgICAgWzU0NSwgMCwgMjAwLCAyMTBdLFxuICAgICAgICBbODY1LCAwLCAzODAsIDIxMF0sXG4gICAgICAgIFsxNDA1LCAwLCAyMDAsIDIxMF0sXG4gICAgXTtcblxuICAgIGxldCBib2RpZXMgPSBbXG4gICAgICAgIFszODAsIDE0MCwgMCwgNjBdLFxuICAgICAgICBbMjAwLCAxNDAsIDAsIDYwXSxcbiAgICAgICAgWzM4MCwgMTQwLCAwLCA2MF0sXG4gICAgICAgIFsyMDAsIDE0MCwgMCwgNjBdLFxuICAgIF07XG5cbiAgICB3aGlsZSAobGVmdCA8IHRoaXMuZ2FtZS53b3JsZC53aWR0aCkge1xuICAgICAgICByYW5kb20gPSBfLnJhbmRvbShyYW5kb20gPiAxIHx8IGxlZnQgPiB0aGlzLmdhbWUud29ybGQud2lkdGggLSA2MDAgP1xuICAgICAgICAgICAgY3JvcHMubGVuZ3RoIC8gMiAtIDEgOiBjcm9wcy5sZW5ndGggLSAxKTtcbiAgICAgICAgbGV0IGNyb3AgPSBjcm9wc1tyYW5kb21dO1xuICAgICAgICBsZXQgYm9keSA9IGJvZGllc1tyYW5kb21dO1xuXG4gICAgICAgIGlmIChyYW5kb20gPCAyKSB7XG4gICAgICAgICAgICBncm91bmRPcHRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAgICAgY3JvcCxcbiAgICAgICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXRlck9wdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICBjcm9wLFxuICAgICAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxlZnQgKz0gY3JvcFsyXSAtIDM7XG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgICB0b3A6IDMzMCxcbiAgICAgICAgY29sbGlkZVdvcmxkQm91bmRzOiBmYWxzZSxcbiAgICAgICAgaW1hZ2U6ICdncm91bmQnLFxuICAgIH07XG5cbiAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgZ3JvdXA6ICdncm91bmQnLCBkZWZhdWx0T3B0c1xuICAgIH0sIGdyb3VuZE9wdHMpO1xuXG4gICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgIGdyb3VwOiAnd2F0ZXInLCBkZWZhdWx0T3B0c1xuICAgIH0sIHdhdGVyT3B0cyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX2dyb3VuZC5qcyIsImltcG9ydCBhZGRJdGVtcyBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX2l0ZW1zLzAuMSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjcm9wcyA9IFtcbiAgICAgICAgWzIwMCwgMCwgMjQwLCA5Nl0sXG4gICAgICAgIFs3OTAsIDAsIDM1MCwgOTZdLFxuICAgICAgICBbMTI5MCwgMCwgNjQ1LCA5Nl0sXG4gICAgXTtcblxuICAgIGNvbnN0IGJvZGllcyA9IFtcbiAgICAgICAgWzIwMCwgMjgsIDAsIDgwXSxcbiAgICAgICAgWzMxMCwgMjgsIDAsIDgwXSxcbiAgICAgICAgWzYwNSwgMjgsIDAsIDgwXSxcbiAgICBdO1xuXG4gICAgY29uc3QgcGxhdGZvcm1QYXJhbXMgPSB0aGlzLm9wdHMuc2V0UGxhdGZvcm1zIHx8IFtdO1xuXG4gICAgY29uc3QgbG9jYXRpb25zID0gdGhpcy5vcHRzLmxvY2F0aW9ucyB8fCBbXTtcblxuICAgIHZhciBwbGF0Zm9ybU9wdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGFkZFBsYXRmb3JtKGxvY2F0aW9uLCBpKSB7XG4gICAgICAgIHBsYXRmb3JtT3B0cy5wdXNoKHtcbiAgICAgICAgICAgIGxlZnQ6IGxvY2F0aW9uWzBdLFxuICAgICAgICAgICAgdG9wOiBsb2NhdGlvblsxXSxcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzW2ldLFxuICAgICAgICAgICAgYm9keTogYm9kaWVzW2ldLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfLmVhY2gocGxhdGZvcm1QYXJhbXMsIHBhcmFtcyA9PiB7XG4gICAgICAgIGFkZFBsYXRmb3JtKC4uLnBhcmFtcyk7XG4gICAgfSk7XG5cbiAgICBfLmVhY2gobG9jYXRpb25zLCBsb2NhdGlvbiA9PiB7XG4gICAgICAgIGFkZFBsYXRmb3JtKGxvY2F0aW9uLCBfLnJhbmRvbShjcm9wcy5sZW5ndGggLSAxKSk7XG4gICAgfSk7XG5cbiAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgZ3JvdXA6ICdwbGF0Zm9ybXMnLFxuICAgICAgICBkZWZhdWx0T3B0czoge1xuICAgICAgICAgICAgdG9wOiAzMDAsXG4gICAgICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgaW1hZ2U6ICdwbGF0Zm9ybXMnLFxuICAgICAgICAgICAgc2NhbGU6IFsuNSwgLjVdLFxuICAgICAgICAgICAgY2hlY2tDb2xsaXNpb25Eb3duOiBmYWxzZSxcbiAgICAgICAgICAgIGNoZWNrQ29sbGlzaW9uUmlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgY2hlY2tDb2xsaXNpb25MZWZ0OiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH0sIHBsYXRmb3JtT3B0cyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX3BsYXRmb3Jtcy5qcyIsImltcG9ydCBhZGRJdGVtcyBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX2l0ZW1zLzAuMSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjcm9wcyA9IFtcbiAgICAgICAgWzEwMCwgMCwgMjIwLCAxMDBdLFxuICAgICAgICBbNDYwLCAwLCAzNTAsIDEwMF0sXG4gICAgICAgIFs4MzAsIDAsIDQxNSwgMTAwXSxcbiAgICBdO1xuXG4gICAgY29uc3QgYm9kaWVzID0gW1xuICAgICAgICBbMjIwLCAxMDAsIDAsIDBdLFxuICAgICAgICBbMzUwLCAxMDAsIDAsIDBdLFxuICAgICAgICBbNDE1LCAxMDAsIDAsIDBdLFxuICAgIF07XG5cbiAgICBjb25zdCBvZmZzZXRzID0ge1xuICAgICAgICBwbGF0Zm9ybXM6IDAsXG4gICAgICAgIGdyb3VuZDogNDBcbiAgICB9O1xuXG4gICAgXy5lYWNoKG9mZnNldHMsIChvZmZzZXQsIGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIF8uZWFjaCh0aGlzW2xvY2F0aW9uXS5jaGlsZHJlbiwgcGxhdGZvcm0gPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgICAgaWYgKHBsYXRmb3JtLmxlZnQgPCA0MDAgfHwgcGxhdGZvcm0ubGVmdCA+IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDQwMCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCB0aGlzLm9wdHNbbG9jYXRpb24gKyAnTG9nQ2hhbmNlJ10pIHtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybS5oYXNMb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgKHBsYXRmb3JtLndpZHRoID4gMzAwID8gMyA6IHBsYXRmb3JtLndpZHRoID4gMTUwID8gMiA6IDEpKTtcbiAgICAgICAgICAgICAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6ICdsb2dzJyxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE9wdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiAnbG9ncycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogWy41LCAuNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb2xsaXNpb25SaWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0NvbGxpc2lvbkxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgW3tcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBwbGF0Zm9ybS50b3AgKyBvZmZzZXQgLSAzNSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcGxhdGZvcm0ubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgY3JvcDogY3JvcHNbTWF0aC5mbG9vcihpbmRleCldLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBib2RpZXNbaW5kZXhdLFxuICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX2xvZ3MuanMiLCJpbXBvcnQgYWRkSXRlbXMgZnJvbSAnc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9pdGVtcy8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY3JvcHMgPSBbXG4gICAgICAgIFswLCAwLCAxNTUsIDE0MF0sXG4gICAgICAgIFsxNTUsIDAsIDE1NSwgMTQwXSxcbiAgICAgICAgWzMxMCwgMCwgMTU1LCAxNDBdLFxuICAgICAgICBbNDY1LCAwLCAxNTUsIDE0MF0sXG4gICAgICAgIFs2MjAsIDAsIDE1NSwgMTQwXSxcbiAgICAgICAgWzc3NSwgMCwgMTU1LCAxNDBdLFxuICAgICAgICBbOTMwLCAwLCAxNTUsIDE0MF0sXG4gICAgICAgIFswLCAwLCAzMDAsIDM2MF0sXG4gICAgICAgIFszMDAsIDAsIDMwMCwgMzYwXSxcbiAgICAgICAgWzYwMCwgMCwgMzAwLCAzNjBdLFxuICAgICAgICBbOTAwLCAwLCAzMDAsIDM2MF0sXG4gICAgICAgIFsxMjAwLCAwLCAzMDAsIDM2MF0sXG4gICAgICAgIFsxNTAwLCAwLCAzMDAsIDM2MF0sXG4gICAgICAgIFsxODAwLCAwLCAzMDAsIDM2MF0sXG4gICAgXTtcblxuICAgIGNvbnN0IGdlbmVyYWxEZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGltYWdlOiAnaXRlbXMnLFxuICAgICAgICBncmF2aXR5WTogMTIsXG4gICAgICAgIGJvZHk6IFsxMTUsIDEwMCwgMjAsIDUwXSxcbiAgICAgICAgc2NhbGU6IFsuNSwgLjVdLFxuICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgIH07XG5cbiAgICBjb25zdCB0cmVlRGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbWFnZTogJ3RyZWVzJyxcbiAgICAgICAgZ3Jhdml0eVk6IDEyLFxuICAgICAgICBib2R5OiBbMzAwLCAzMjUsIDAsIDBdLFxuICAgICAgICBzY2FsZTogWy41LCAuNV0sXG4gICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogZmFsc2UsXG4gICAgfTtcblxuICAgIGNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgc3F1YXJlQnVzaDogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1swXSxcbiAgICAgICAgfSwgZ2VuZXJhbERlZmF1bHRQcm9wcyksXG4gICAgICAgIHJvdW5kQnVzaDogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1sxXSxcbiAgICAgICAgfSwgZ2VuZXJhbERlZmF1bHRQcm9wcyksXG4gICAgICAgIGhvbGU6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbMl0sXG4gICAgICAgICAgICBib2R5OiBbMTE1LCAyMCwgMjAsIDUwXSxcbiAgICAgICAgICAgIGdyYXZpdHlZOiAxMDAwMCxcbiAgICAgICAgfSwgZ2VuZXJhbERlZmF1bHRQcm9wcyksXG4gICAgICAgIGJhZzogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1szXSxcbiAgICAgICAgfSwgZ2VuZXJhbERlZmF1bHRQcm9wcyksXG4gICAgICAgIHJvY2s6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbNF0sXG4gICAgICAgIH0sIGdlbmVyYWxEZWZhdWx0UHJvcHMpLFxuICAgICAgICBzdHVtcDogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1s1XSxcbiAgICAgICAgICAgIGJvZHk6IFsxMTUsIDEyMCwgMjAsIDUwXSxcbiAgICAgICAgfSwgZ2VuZXJhbERlZmF1bHRQcm9wcyksXG4gICAgICAgIGxpZ2h0ZW5pbmc6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbNl0sXG4gICAgICAgICAgICBncmF2aXR5WTogMCxcbiAgICAgICAgfSwgZ2VuZXJhbERlZmF1bHRQcm9wcyksXG4gICAgICAgIGhlYXJ0OiB7XG4gICAgICAgICAgICBpbWFnZTogJ2hlYXJ0JyxcbiAgICAgICAgICAgIHNjYWxlOiBbLjE1LCAuMTVdLFxuICAgICAgICB9LFxuICAgICAgICByZWN5Y2xlOiB7XG4gICAgICAgICAgICBpbWFnZTogJ3JlY3ljbGUnLFxuICAgICAgICAgICAgc2NhbGU6IFsuMTUsIC4xNV0sXG4gICAgICAgIH0sXG4gICAgICAgIHJhaWJvd1JlY3ljbGU6IHtcbiAgICAgICAgICAgIGltYWdlOiAncmFpbmJvd1JlY3ljbGUnLFxuICAgICAgICAgICAgc2NhbGU6IFsuMTUsIC4xNV0sXG4gICAgICAgIH0sXG4gICAgICAgIHRydWNrOiB7XG4gICAgICAgICAgICBpbWFnZTogJ3RydWNrJyxcbiAgICAgICAgICAgIHNjYWxlOiBbLjUsIC41XSxcbiAgICAgICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHRyZWUxOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzddLFxuICAgICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgfSwgdHJlZURlZmF1bHRQcm9wcyksXG4gICAgICAgIHRyZWUyOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzhdXG4gICAgICAgIH0sIHRyZWVEZWZhdWx0UHJvcHMpLFxuICAgICAgICB0cmVlMzogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1s5XVxuICAgICAgICB9LCB0cmVlRGVmYXVsdFByb3BzKSxcbiAgICAgICAgdHJlZTQ6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbMTBdLFxuICAgICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgfSwgdHJlZURlZmF1bHRQcm9wcyksXG4gICAgICAgIHRyZWU1OiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzExXVxuICAgICAgICB9LCB0cmVlRGVmYXVsdFByb3BzKSxcbiAgICAgICAgdHJlZTY6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbMTJdXG4gICAgICAgIH0sIHRyZWVEZWZhdWx0UHJvcHMpLFxuICAgICAgICB0cmVlNzogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1sxM11cbiAgICAgICAgfSwgdHJlZURlZmF1bHRQcm9wcyksXG4gICAgICAgIHNuYWtlOiB7XG4gICAgICAgICAgICBzY2FsZTogWy4yNSwgLjI1XSxcbiAgICAgICAgICAgIGdyYXZpdHlZOiAxMixcbiAgICAgICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ3JvdXBzID0ge1xuICAgICAgICBzcXVhcmVCdXNoOiAnYnVzaGVzJyxcbiAgICAgICAgcm91bmRCdXNoOiAnYnVzaGVzJyxcbiAgICAgICAgc25ha2U6ICdzbmFrZXMnLFxuICAgICAgICBob2xlOiAnaG9sZXMnLFxuICAgICAgICBiYWc6ICdiYWdzJyxcbiAgICAgICAgcm9jazogJ29ic3RhY2xlcycsXG4gICAgICAgIHN0dW1wOiAnb2JzdGFjbGVzJyxcbiAgICAgICAgaGVhcnQ6ICdoZWFydHMnLFxuICAgICAgICByZWN5Y2xlOiAncmVjeWNsZXMnLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAncmFpbmJvd1JlY3ljbGVzJyxcbiAgICAgICAgbGlnaHRlbmluZzogJ2xpZ2h0ZW5pbmcnLFxuICAgICAgICB0cnVjazogJ3RydWNrcycsXG4gICAgICAgIHRyZWUxOiAndHJlZXMnLFxuICAgICAgICB0cmVlMjogJ3RyZWVzJyxcbiAgICAgICAgdHJlZTM6ICd0cmVlcycsXG4gICAgICAgIHRyZWU0OiAndHJlZXMnLFxuICAgICAgICB0cmVlNTogJ3RyZWVzJyxcbiAgICAgICAgdHJlZTY6ICd0cmVlcycsXG4gICAgICAgIHRyZWU3OiAndHJlZXMnLFxuICAgIH07XG5cbiAgICB2YXIgdHJ1Y2tOdW1iZXIgPSAxO1xuICAgIHZhciB0cnVja1RvdGFsID0gdGhpcy5vcHRzLm1heFRydWNrcztcblxuICAgIHZhciBnZXRPYmplY3RzID0gZnVuY3Rpb24gKG9iamVjdHMgPSBbXSwgYW1vdW50cyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBvYmplY3RzLmNvbmNhdChfLnNodWZmbGUoW11cbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLnNxdWFyZUJ1c2ggfHwgMCwgKCkgPT4gJ3NxdWFyZUJ1c2gnKSlcbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLnJvdW5kQnVzaCB8fCAwLCAoKSA9PiAncm91bmRCdXNoJykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy5zbmFrZSB8fCAwLCAoKSA9PiAnc25ha2UnKSlcbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLmhvbGUgfHwgMCwgKCkgPT4gJ2hvbGUnKSlcbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLmJhZyB8fCAwLCAoKSA9PiAnYmFnJykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy5ibGFuayB8fCAwLCAoKSA9PiAnYmxhbmsnKSlcbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLnJvY2sgfHwgMCwgKCkgPT4gJ3JvY2snKSlcbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLnN0dW1wIHx8IDAsICgpID0+ICdzdHVtcCcpKVxuICAgICAgICAgICAgLmNvbmNhdChfLnRpbWVzKGFtb3VudHMuaGVhcnQgfHwgMCwgKCkgPT4gJ2hlYXJ0JykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy5yZWN5Y2xlIHx8IDAsICgpID0+ICdyZWN5Y2xlJykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy5yYWlib3dSZWN5Y2xlIHx8IDAsICgpID0+ICdyYWlib3dSZWN5Y2xlJykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy5saWdodGVuaW5nIHx8IDAsICgpID0+ICdsaWdodGVuaW5nJykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy50cmVlMSB8fCAwLCAoKSA9PiAndHJlZTEnKSlcbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLnRyZWUyIHx8IDAsICgpID0+ICd0cmVlMicpKVxuICAgICAgICAgICAgLmNvbmNhdChfLnRpbWVzKGFtb3VudHMudHJlZTMgfHwgMCwgKCkgPT4gJ3RyZWUzJykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy50cmVlNCB8fCAwLCAoKSA9PiAndHJlZTQnKSlcbiAgICAgICAgICAgIC5jb25jYXQoXy50aW1lcyhhbW91bnRzLnRyZWU1IHx8IDAsICgpID0+ICd0cmVlNScpKVxuICAgICAgICAgICAgLmNvbmNhdChfLnRpbWVzKGFtb3VudHMudHJlZTYgfHwgMCwgKCkgPT4gJ3RyZWU2JykpXG4gICAgICAgICAgICAuY29uY2F0KF8udGltZXMoYW1vdW50cy50cmVlNyB8fCAwLCAoKSA9PiAndHJlZTcnKSlcbiAgICAgICAgKSk7XG4gICAgfTtcblxuICAgIHZhciBvYmplY3RzID0gZ2V0T2JqZWN0cyhbXSwgdGhpcy5vcHRzLnBsYXRmb3JtSXRlbUFtb3VudHMpO1xuXG4gICAgdmFyIGxvY2F0aW9ucyA9IHtcbiAgICAgICAgdHJlZTE6IFtdLFxuICAgICAgICB0cmVlMjogW10sXG4gICAgICAgIHRyZWUzOiBbXSxcbiAgICAgICAgdHJlZTQ6IFtdLFxuICAgICAgICB0cmVlNTogW10sXG4gICAgICAgIHRyZWU2OiBbXSxcbiAgICAgICAgdHJlZTc6IFtdLFxuICAgICAgICBzcXVhcmVCdXNoOiBbXSxcbiAgICAgICAgcm91bmRCdXNoOiBbXSxcbiAgICAgICAgc25ha2U6IFtdLFxuICAgICAgICBob2xlOiBbXSxcbiAgICAgICAgYmFnOiBbXSxcbiAgICAgICAgcm9jazogW10sXG4gICAgICAgIHN0dW1wOiBbXSxcbiAgICAgICAgaGVhcnQ6IFtdLFxuICAgICAgICByZWN5Y2xlOiBbXSxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogW10sXG4gICAgICAgIGxpZ2h0ZW5pbmc6IFtdLFxuICAgICAgICB0cnVjazogW10sXG4gICAgICAgIGJsYW5rOiBbXSxcbiAgICB9O1xuXG4gICAgdmFyIHBsYWNlT2JqZWN0ID0gZnVuY3Rpb24gKHBsYXRmb3JtLCB1cCwgb3Zlcikge1xuICAgICAgICB2YXIgb2JqZWN0ID0gb2JqZWN0cy5zaGlmdCgpO1xuICAgICAgICBzd2l0Y2ggKG9iamVjdCkge1xuICAgICAgICAgICAgY2FzZSAndHJlZTEnOlxuICAgICAgICAgICAgICAgIHVwICs9IDExMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RyZWUyJzpcbiAgICAgICAgICAgIGNhc2UgJ3RyZWUzJzpcbiAgICAgICAgICAgIGNhc2UgJ3RyZWU1JzpcbiAgICAgICAgICAgIGNhc2UgJ3RyZWU3JzpcbiAgICAgICAgICAgICAgICB1cCArPSA5MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RyZWU0JzpcbiAgICAgICAgICAgICAgICB1cCArPSAxMDU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0cmVlNic6XG4gICAgICAgICAgICAgICAgdXAgKz0gOTU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXRmb3JtLmhhc0xvZyAmJiAhKG9iamVjdCA9PT0gJ2JhZycgfHwgb2JqZWN0ID09PSAnYmxhbmsnKSkge1xuICAgICAgICAgICAgb2JqZWN0cy51bnNoaWZ0KG9iamVjdCk7XG4gICAgICAgICAgICBvYmplY3QgPSAnYmxhbmsnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhdGlvbnNbb2JqZWN0XSkge1xuICAgICAgICAgICAgbG9jYXRpb25zW29iamVjdF0ucHVzaCh7XG4gICAgICAgICAgICAgICAgdG9wOiBwbGF0Zm9ybS50b3AgLSB1cCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBwbGF0Zm9ybS5sZWZ0ICsgb3ZlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIF8uZXZlcnkodGhpcy5wbGF0Zm9ybXMuY2hpbGRyZW4sIHBsYXRmb3JtID0+IHtcbiAgICAgICAgcGxhY2VPYmplY3QocGxhdGZvcm0sIDUwLCAzMCk7XG4gICAgICAgIGlmIChwbGF0Zm9ybS53aWR0aCA+IDEyMCkgcGxhY2VPYmplY3QocGxhdGZvcm0sIDUwLCA4MCk7XG4gICAgICAgIGlmIChwbGF0Zm9ybS53aWR0aCA+IDIwMCkgcGxhY2VPYmplY3QocGxhdGZvcm0sIDUwLCAxNzApO1xuICAgICAgICByZXR1cm4gb2JqZWN0cy5sZW5ndGg7XG4gICAgfSk7XG5cbiAgICBvYmplY3RzID0gZ2V0T2JqZWN0cyhvYmplY3RzLCB0aGlzLm9wdHMuZ3JvdW5kSXRlbUFtb3VudHMpO1xuICAgIG9iamVjdHMudW5zaGlmdCgnYmxhbmsnKTtcbiAgICBvYmplY3RzLnVuc2hpZnQoJ2JsYW5rJyk7XG5cbiAgICBfLmV2ZXJ5KHRoaXMuZ3JvdW5kLmNoaWxkcmVuLCBwbGF0Zm9ybSA9PiB7XG4gICAgICAgIGlmICh0cnVja051bWJlciA8PSB0cnVja1RvdGFsICYmXG4gICAgICAgICAgICBwbGF0Zm9ybS5sZWZ0ID4gdGhpcy5nYW1lLndvcmxkLndpZHRoICogdHJ1Y2tOdW1iZXIgLyAodHJ1Y2tUb3RhbCArIDEuNSkpIHtcbiAgICAgICAgICAgIGxvY2F0aW9ucy50cnVjay5wdXNoKHtcbiAgICAgICAgICAgICAgICB0b3A6IHBsYXRmb3JtLnRvcCAtIDUwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IHBsYXRmb3JtLmxlZnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRydWNrTnVtYmVyKys7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhdGZvcm0ubGVmdCA+IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDIwMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBwbGFjZU9iamVjdChwbGF0Zm9ybSwgMjAsIDMwKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdHMubGVuZ3RoO1xuICAgIH0pO1xuXG4gICAgLy8gdGhpcyBtYWtlcyBzdXJlIHRoYXQgYWxsIHRoZSBiYWdzIGFyZSBwbGFjZWRcbiAgICB3aGlsZSAofm9iamVjdHMuaW5kZXhPZignYmFnJykpIHtcbiAgICAgICAgbG9jYXRpb25zLmJhZy5wdXNoKGxvY2F0aW9ucy5ibGFuay5zaGlmdCgpKTtcbiAgICAgICAgb2JqZWN0c1tvYmplY3RzLmluZGV4T2YoJ2JhZycpXSA9ICdibGFuayc7XG4gICAgfVxuXG4gICAgXy5lYWNoKGxvY2F0aW9ucywgKGxvY2F0aW9uQXJyYXksIGtleSkgPT4ge1xuICAgICAgICB2YXIgaG9sZUxvY2F0aW9ucztcbiAgICAgICAgdmFyIHNuYWtlTG9jYXRpb25zO1xuICAgICAgICBpZiAoa2V5ID09PSAnYmxhbmsnKSByZXR1cm47XG4gICAgICAgIGlmIChrZXkgPT09ICdzbmFrZScpIHtcbiAgICAgICAgICAgIGhvbGVMb2NhdGlvbnMgPSBfLm1hcChsb2NhdGlvbkFycmF5LCBvcHRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IG9wdHMudG9wLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBvcHRzLmxlZnQgKyA4MCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBzLmhvbGUsIGRlZmF1bHRPcHRzOiBkZWZhdWx0UHJvcHMuaG9sZVxuICAgICAgICAgICAgfSwgaG9sZUxvY2F0aW9ucyk7XG4gICAgICAgICAgICBzbmFrZUxvY2F0aW9ucyA9IF8ubWFwKGxvY2F0aW9uQXJyYXksIG9wdHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogb3B0cy50b3AgLSAxMCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogb3B0cy5sZWZ0ICsgNzAsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAnc25ha2UnICsgXy5yYW5kb20oMilcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBzLnNuYWtlLCBkZWZhdWx0T3B0czogZGVmYXVsdFByb3BzLnNuYWtlXG4gICAgICAgICAgICB9LCBzbmFrZUxvY2F0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICBncm91cDogZ3JvdXBzW2tleV0sIGRlZmF1bHRPcHRzOiBkZWZhdWx0UHJvcHNba2V5XVxuICAgICAgICB9LCBsb2NhdGlvbkFycmF5KTtcbiAgICB9KTtcblxuICAgIF8uZWFjaCh0aGlzLmhlYXJ0cy5jaGlsZHJlbiwgaGVhcnQgPT4ge1xuICAgICAgICBoZWFydC5hbmltYXRpb25zLmFkZCgnc3BpbicsIFswLCAxLCAyLCAzLCA0LCA1XSwgMTAsIHRydWUpO1xuICAgICAgICBoZWFydC5hbmltYXRpb25zLnBsYXkoJ3NwaW4nKTtcbiAgICB9KTtcblxuICAgIF8uZWFjaCh0aGlzLnJlY3ljbGVzLmNoaWxkcmVuLCByZWN5Y2xlID0+IHtcbiAgICAgICAgcmVjeWNsZS5hbmltYXRpb25zLmFkZCgnc3BpbicsIFswLCAxLCAyLCAzLCA0XSwgMTAsIHRydWUpO1xuICAgICAgICByZWN5Y2xlLmFuaW1hdGlvbnMucGxheSgnc3BpbicpO1xuICAgIH0pO1xuXG4gICAgXy5lYWNoKHRoaXMucmFpbmJvd1JlY3ljbGVzLmNoaWxkcmVuLCByZWN5Y2xlID0+IHtcbiAgICAgICAgcmVjeWNsZS5hbmltYXRpb25zLmFkZCgnc3BpbicsIFswLCAxLCAyLCAzXSwgMTAsIHRydWUpO1xuICAgICAgICByZWN5Y2xlLmFuaW1hdGlvbnMucGxheSgnc3BpbicpO1xuICAgIH0pO1xuXG4gICAgXy5lYWNoKHRoaXMudHJ1Y2tzLmNoaWxkcmVuLCB0cnVjayA9PiB7XG4gICAgICAgIHZhciBkcml2ZSA9IHRydWNrLmFuaW1hdGlvbnMuYWRkKCdkcml2ZScsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSwgMTAsIGZhbHNlKTtcbiAgICAgICAgZHJpdmUub25Db21wbGV0ZS5hZGQoKCkgPT4ge1xuICAgICAgICAgICAgdHJ1Y2suYm9keS52ZWxvY2l0eS54ID0gMjAwO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIF8uZWFjaCh0aGlzLnRyZWVzLmNoaWxkcmVuLCB0cmVlID0+IHtcbiAgICAgICAgdHJlZS5zZW5kVG9CYWNrKCk7XG4gICAgfSk7XG5cbiAgICBfLmVhY2godGhpcy5zbmFrZXMuY2hpbGRyZW4sIHNuYWtlID0+IHtcbiAgICAgICAgc25ha2UubG9hZFRleHR1cmUobnVsbCwgMCk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX2l0ZW1zLmpzIiwiaW1wb3J0IG9wdHMxIGZyb20gJy4vb3B0czEnO1xuaW1wb3J0IG9wdHMyIGZyb20gJy4vb3B0czInO1xuaW1wb3J0IG9wdHMzIGZyb20gJy4vb3B0czMnO1xuaW1wb3J0IG9wdHM0IGZyb20gJy4vb3B0czQnO1xuaW1wb3J0IG9wdHM1IGZyb20gJy4vb3B0czUnO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gICAgb3B0czEsXG4gICAgb3B0czIsXG4gICAgb3B0czMsXG4gICAgb3B0czQsXG4gICAgb3B0czUsXG5dO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0cy5qcyIsImltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGxldmVsOiAxLFxuICAgIHBsYXRmb3Jtc0xvZ0NoYW5jZTogMSAvIDEwLFxuICAgIGdyb3VuZExvZ0NoYW5jZTogMCxcbiAgICBzZXRQbGF0Zm9ybXM6IFtcbiAgICAgICAgW1sxMzAsIDgwXSwgMF0sXG4gICAgICAgIFtbMzUwLCAxNjBdLCAxXSxcbiAgICAgICAgW1s5NTAsIDE2MF0sIDJdLFxuICAgICAgICBbWzEwNTAsIDI0MF0sIDBdLFxuICAgICAgICBbWzI2NTAsIDgwXSwgMl0sXG4gICAgICAgIFtbMzYwMCwgMjQwXSwgMF0sXG4gICAgXSxcbiAgICBsb2NhdGlvbnM6IFtcbiAgICAgICAgWzEwMCwgMjQwXSxcbiAgICAgICAgWzYwMCwgMjQwXSxcbiAgICAgICAgWzY1MCwgODBdLFxuICAgICAgICBbMTM1MCwgODBdLFxuICAgICAgICBbMTQwMCwgMjQwXSxcbiAgICAgICAgWzE3MDAsIDE2MF0sXG4gICAgICAgIFsxOTAwLCA4MF0sXG4gICAgICAgIFsyMDUwLCAyNDBdLFxuICAgICAgICBbMjMwMCwgMTYwXSxcbiAgICAgICAgWzI1NTAsIDI0MF0sXG4gICAgICAgIFsyODAwLCAxNjBdLFxuICAgICAgICBbMzAwMCwgMjQwXSxcbiAgICAgICAgWzMzMDAsIDE2MF0sXG4gICAgXSxcbiAgICBwbGF0Zm9ybUl0ZW1BbW91bnRzOiB7XG4gICAgICAgIHNxdWFyZUJ1c2g6IDEsXG4gICAgICAgIHJvdW5kQnVzaDogMSxcbiAgICAgICAgc25ha2U6IDAsXG4gICAgICAgIGJhZzogMTUsXG4gICAgICAgIGJsYW5rOiAxMCxcbiAgICAgICAgcm9jazogMSxcbiAgICAgICAgc3R1bXA6IDEsXG4gICAgICAgIGhlYXJ0OiAxLFxuICAgICAgICByZWN5Y2xlOiAxLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAxLFxuICAgICAgICBsaWdodGVuaW5nOiAwLFxuICAgICAgICB0cmVlMTogMSxcbiAgICAgICAgdHJlZTI6IDEsXG4gICAgICAgIHRyZWUzOiAxLFxuICAgIH0sXG4gICAgZ3JvdW5kSXRlbUFtb3VudHM6IHtcbiAgICAgICAgc3F1YXJlQnVzaDogMSxcbiAgICAgICAgcm91bmRCdXNoOiAxLFxuICAgICAgICBob2xlOiAyLFxuICAgICAgICBiYWc6IDAsXG4gICAgICAgIGJsYW5rOiA1LFxuICAgICAgICByb2NrOiAxLFxuICAgICAgICBzdHVtcDogMSxcbiAgICAgICAgaGVhcnQ6IDAsXG4gICAgICAgIHJlY3ljbGU6IDAsXG4gICAgICAgIHJhaWJvd1JlY3ljbGU6IDAsXG4gICAgfVxufSwgZGVmYXVsdE9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0czEuanMiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbGV2ZWw6IDEsXG4gICAgaGl0VmVsb2NpdHk6IDIwMCxcbiAgICByZWN5Y2xpbmdTY29yZTogMTAwLFxuICAgIHJhaW5ib3dSZWN5Y2x5aW5nU2NvcmU6IDMwMCxcbiAgICBoaXRzUGVyTGlmZTogNCxcbiAgICBtYXhMaXZlczogMyxcbiAgICBtYXhCYWdzOiA1LFxuICAgIG1heFRydWNrczogMyxcbiAgICBib3VuY2VZOiAuMixcbiAgICBncmF2aXR5WTogNDAwLFxuICAgIHBsYXllckltYWdlOiAndHVydGxlJyxcbiAgICBwbGF5ZXJCb2R5OiBbMzE1LCAzOTYsIDEwMCwgMTUwXSxcbiAgICBsZWZ0RnJhbWVzOiBbNSwgNCwgMywgMiwgMSwgMF0sXG4gICAgbGVmdEZyYW1lUmF0ZTogMTAsXG4gICAgbGVmdExvb3A6IHRydWUsXG4gICAgcmlnaHRGcmFtZXM6IFs2LCA3LCA4LCA5LCAxMCwgMTFdLFxuICAgIHJpZ2h0RnJhbWVSYXRlOiAxMCxcbiAgICByaWdodExvb3A6IHRydWUsXG4gICAgYm9vc3RMZWZ0RnJhbWVzOiBbMiwgMSwgMF0sXG4gICAgYm9vc3RMZWZ0RnJhbWVSYXRlOiAxMCxcbiAgICBib29zdExlZnRMb29wOiB0cnVlLFxuICAgIGJvb3N0UmlnaHRGcmFtZXM6IFszLCA0LCA1XSxcbiAgICBib29zdFJpZ2h0RnJhbWVSYXRlOiAxMCxcbiAgICBib29zdFJpZ2h0TG9vcDogdHJ1ZSxcbiAgICBwbGF5ZXJTY2FsZTogWy4xNSwgLjE1XSxcbiAgICB1cFNwZWVkOiAtMzUwLFxuICAgIGRvd25TcGVlZDogNTAwLFxuICAgIGxlZnRTcGVlZDogLTE1MCxcbiAgICByaWdodFNwZWVkOiAxNTAsXG4gICAgYm9vc3RVcFNwZWVkOiAtMzUwLFxuICAgIGJvb3N0RG93blNwZWVkOiA1MDAsXG4gICAgYm9vc3RMZWZ0U3BlZWQ6IC0zMDAsXG4gICAgYm9vc3RSaWdodFNwZWVkOiAzMDAsXG4gICAgcGxheWVyU3RvcEZyYW1lOiA2LFxuICAgIGJvb3N0UGxheWVyU3RvcEZyYW1lOiA2LFxuICAgIGJvb3N0VGltZTogMzAwMCxcbiAgICBwbGF0Zm9ybXNMb2dDaGFuY2U6IDAsXG4gICAgZ3JvdW5kTG9nQ2hhbmNlOiAwLFxuICAgIHNldFBsYXRmb3JtczogW10sXG4gICAgbG9jYXRpb25zOiBbXSxcbiAgICBwbGF0Zm9ybUl0ZW1BbW91bnRzOiB7fSxcbiAgICBncm91bmRJdGVtQW1vdW50czoge31cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9kZWZhdWx0X29wdHMuanMiLCJpbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBsZXZlbDogMixcbiAgICBwbGF0Zm9ybXNMb2dDaGFuY2U6IDEgLyAyMCxcbiAgICBncm91bmRMb2dDaGFuY2U6IDEgLyAyMCxcbiAgICBzZXRQbGF0Zm9ybXM6IFtcbiAgICAgICAgW1stMzAsIDI0MF0sIDBdLFxuICAgICAgICBbWzM2MDAsIDI0MF0sIDFdLFxuICAgICAgICBbWzMyMDAsIDI0MF0sIDFdLFxuICAgIF0sXG4gICAgbG9jYXRpb25zOiBbXG4gICAgICAgIFsxMDAsIDE2MF0sXG4gICAgICAgIFszMDAsIDI0MF0sXG4gICAgICAgIFs0MDAsIDgwXSxcbiAgICAgICAgWzcwMCwgMTYwXSxcbiAgICAgICAgWzkwMCwgMjQwXSxcbiAgICAgICAgWzEwMDAsIDgwXSxcbiAgICAgICAgWzEyMDAsIDE2MF0sXG4gICAgICAgIFsxMzAwLCAyNDBdLFxuICAgICAgICBbMTYwMCwgMjQwXSxcbiAgICAgICAgWzE2NTAsIDgwXSxcbiAgICAgICAgWzE4MDAsIDE2MF0sXG4gICAgICAgIFsyMDAwLCAyNDBdLFxuICAgICAgICBbMjEwMCwgODBdLFxuICAgICAgICBbMjQwMCwgMTYwXSxcbiAgICAgICAgWzI3MDAsIDI0MF0sXG4gICAgICAgIFsyODAwLCA4MF0sXG4gICAgICAgIFszMDAwLCAxNjBdLFxuICAgIF0sXG4gICAgcGxhdGZvcm1JdGVtQW1vdW50czoge1xuICAgICAgICBzcXVhcmVCdXNoOiAyLFxuICAgICAgICByb3VuZEJ1c2g6IDIsXG4gICAgICAgIHNuYWtlOiAwLFxuICAgICAgICBiYWc6IDE1LFxuICAgICAgICBibGFuazogMTAsXG4gICAgICAgIHJvY2s6IDIsXG4gICAgICAgIHN0dW1wOiAyLFxuICAgICAgICBoZWFydDogMixcbiAgICAgICAgcmVjeWNsZTogMSxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMSxcbiAgICAgICAgbGlnaHRlbmluZzogMSxcbiAgICAgICAgdHJlZTE6IDEsXG4gICAgICAgIHRyZWU2OiAxLFxuICAgICAgICB0cmVlNzogMSxcbiAgICB9LFxuICAgIGdyb3VuZEl0ZW1BbW91bnRzOiB7XG4gICAgICAgIHNxdWFyZUJ1c2g6IDEsXG4gICAgICAgIHJvdW5kQnVzaDogMSxcbiAgICAgICAgc25ha2U6IDIsXG4gICAgICAgIGJhZzogMCxcbiAgICAgICAgYmxhbms6IDUsXG4gICAgICAgIHJvY2s6IDEsXG4gICAgICAgIHN0dW1wOiAxLFxuICAgICAgICBoZWFydDogMCxcbiAgICAgICAgcmVjeWNsZTogMCxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMCxcbiAgICB9XG59LCBkZWZhdWx0T3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzMi5qcyIsImltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGxldmVsOiAzLFxuICAgIHBsYXRmb3Jtc0xvZ0NoYW5jZTogMSAvIDIwLFxuICAgIGdyb3VuZExvZ0NoYW5jZTogMSAvIDIwLFxuICAgIHNldFBsYXRmb3JtczogW1xuICAgICAgICBbWy0zMCwgMTYwXSwgMl0sXG4gICAgICAgIFtbMCwgMjQwXSwgMF0sXG4gICAgICAgIFtbNzAwLCAyNDBdLCAyXSxcbiAgICAgICAgW1sxMTAwLCAxNjBdLCAxXSxcbiAgICAgICAgW1sxOTAwLCAyNDBdLCAxXSxcbiAgICAgICAgW1syMjAwLCAyNDBdLCAyXSxcbiAgICAgICAgW1szNDAwLCAxNjBdLCAyXSxcbiAgICBdLFxuICAgIGxvY2F0aW9uczogW1xuICAgICAgICBbMzAwLCAyNDBdLFxuICAgICAgICBbNDAwLCA4MF0sXG4gICAgICAgIFs2NTAsIDE2MF0sXG4gICAgICAgIFs5MDAsIDgwXSxcbiAgICAgICAgWzEzMDAsIDI0MF0sXG4gICAgICAgIFsxMzUwLCA4MF0sXG4gICAgICAgIFsxNTUwLCAxNjBdLFxuICAgICAgICBbMjAwMCwgODBdLFxuICAgICAgICBbMjcwMCwgODBdLFxuICAgICAgICBbMjcwMCwgMjQwXSxcbiAgICAgICAgWzMxMDAsIDI0MF0sXG4gICAgXSxcbiAgICBwbGF0Zm9ybUl0ZW1BbW91bnRzOiB7XG4gICAgICAgIHNxdWFyZUJ1c2g6IDIsXG4gICAgICAgIHJvdW5kQnVzaDogMixcbiAgICAgICAgc25ha2U6IDAsXG4gICAgICAgIGJhZzogMTUsXG4gICAgICAgIGJsYW5rOiAxMCxcbiAgICAgICAgcm9jazogMixcbiAgICAgICAgc3R1bXA6IDIsXG4gICAgICAgIGhlYXJ0OiAyLFxuICAgICAgICByZWN5Y2xlOiAxLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAxLFxuICAgICAgICBsaWdodGVuaW5nOiAxLFxuICAgICAgICB0cmVlMjogMSxcbiAgICAgICAgdHJlZTQ6IDEsXG4gICAgICAgIHRyZWU1OiAxLFxuICAgIH0sXG4gICAgZ3JvdW5kSXRlbUFtb3VudHM6IHtcbiAgICAgICAgc3F1YXJlQnVzaDogMSxcbiAgICAgICAgcm91bmRCdXNoOiAxLFxuICAgICAgICBzbmFrZTogMixcbiAgICAgICAgYmFnOiAwLFxuICAgICAgICBibGFuazogNSxcbiAgICAgICAgcm9jazogMSxcbiAgICAgICAgc3R1bXA6IDEsXG4gICAgICAgIGhlYXJ0OiAwLFxuICAgICAgICByZWN5Y2xlOiAwLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAwLFxuICAgICAgICB0cmVlMTogMSxcbiAgICB9XG59LCBkZWZhdWx0T3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzMy5qcyIsImltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGxldmVsOiA0LFxuICAgIHBsYXRmb3Jtc0xvZ0NoYW5jZTogMCxcbiAgICBncm91bmRMb2dDaGFuY2U6IDEgLyAyMCxcbiAgICBzZXRQbGF0Zm9ybXM6IFtcbiAgICAgICAgW1swLCAxNjBdLCAxXSxcbiAgICAgICAgW1sxMTAwLCAxNjBdLCAxXSxcbiAgICAgICAgW1sxNjUwLCAxNjBdLCAyXSxcbiAgICAgICAgW1syMTAwLCA4MF0sIDBdLFxuICAgICAgICBbWzI1MDAsIDI0MF0sIDFdLFxuICAgICAgICBbWzI4MDAsIDE2MF0sIDJdLFxuICAgICAgICBbWzM0MDAsIDE2MF0sIDFdLFxuICAgIF0sXG4gICAgbG9jYXRpb25zOiBbXG4gICAgICAgIFsyMDAsIDgwXSxcbiAgICAgICAgWzIwMCwgMjQwXSxcbiAgICAgICAgWzUwMCwgMTYwXSxcbiAgICAgICAgWzgwMCwgMjQwXSxcbiAgICAgICAgWzkwMCwgODBdLFxuICAgICAgICBbMTI1MCwgMjQwXSxcbiAgICAgICAgWzE0MDAsIDgwXSxcbiAgICAgICAgWzE5NTAsIDI0MF0sXG4gICAgICAgIFsyMjAwLCAxNjBdLFxuICAgICAgICBbMzEwMCwgODBdLFxuICAgICAgICBbMzEwMCwgMjQwXSxcbiAgICBdLFxuICAgIHBsYXRmb3JtSXRlbUFtb3VudHM6IHtcbiAgICAgICAgc3F1YXJlQnVzaDogMSxcbiAgICAgICAgcm91bmRCdXNoOiAxLFxuICAgICAgICBzbmFrZTogMCxcbiAgICAgICAgYmFnOiAxNSxcbiAgICAgICAgYmxhbms6IDUsXG4gICAgICAgIHJvY2s6IDIsXG4gICAgICAgIHN0dW1wOiAyLFxuICAgICAgICBoZWFydDogMixcbiAgICAgICAgcmVjeWNsZTogMSxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMSxcbiAgICAgICAgbGlnaHRlbmluZzogMSxcbiAgICAgICAgdHJlZTE6IDEsXG4gICAgICAgIHRyZWUyOiAxLFxuICAgICAgICB0cmVlMzogMSxcbiAgICAgICAgdHJlZTY6IDEsXG4gICAgICAgIHRyZWU3OiAxLFxuICAgIH0sXG4gICAgZ3JvdW5kSXRlbUFtb3VudHM6IHtcbiAgICAgICAgc3F1YXJlQnVzaDogMSxcbiAgICAgICAgcm91bmRCdXNoOiAxLFxuICAgICAgICBzbmFrZTogMixcbiAgICAgICAgYmFnOiAwLFxuICAgICAgICBibGFuazogNSxcbiAgICAgICAgcm9jazogMSxcbiAgICAgICAgc3R1bXA6IDEsXG4gICAgICAgIGhlYXJ0OiAwLFxuICAgICAgICByZWN5Y2xlOiAwLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAwLFxuICAgIH1cbn0sIGRlZmF1bHRPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL29wdHM0LmpzIiwiaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgbGV2ZWw6IDUsXG4gICAgcGxhdGZvcm1zTG9nQ2hhbmNlOiAxIC8gMTAsXG4gICAgZ3JvdW5kTG9nQ2hhbmNlOiAxIC8gMjAsXG4gICAgc2V0UGxhdGZvcm1zOiBbXG4gICAgICAgIFtbMCwgMTYwXSwgMV0sXG4gICAgICAgIFtbNDAwLCAxNjBdLCAyXSxcbiAgICAgICAgW1s3MDAsIDI0MF0sIDJdLFxuICAgICAgICBbWzk1MCwgMTYwXSwgMl0sXG4gICAgICAgIFtbMTU1MCwgMTYwXSwgMl0sXG4gICAgICAgIFtbMTgwMCwgMjQwXSwgMl0sXG4gICAgICAgIFtbMzQwMCwgODBdLCAwXSxcbiAgICAgICAgW1szNDAwLCAyNDBdLCAwXSxcbiAgICAgICAgW1szNjAwLCAxNjBdLCAxXSxcbiAgICBdLFxuICAgIGxvY2F0aW9uczogW1xuICAgICAgICBbMjAwLCA4MF0sXG4gICAgICAgIFsyMDAsIDI0MF0sXG4gICAgICAgIFs4NTAsIDgwXSxcbiAgICAgICAgWzEyNTAsIDI0MF0sXG4gICAgICAgIFsxMzAwLCA4MF0sXG4gICAgICAgIFsxOTAwLCA4MF0sXG4gICAgICAgIFsyMjAwLCAxNjBdLFxuICAgICAgICBbMjUwMCwgMjQwXSxcbiAgICAgICAgWzI4MDAsIDE2MF0sXG4gICAgICAgIFszMDUwLCAyNDBdLFxuICAgICAgICBbMzEwMCwgODBdLFxuICAgIF0sXG4gICAgcGxhdGZvcm1JdGVtQW1vdW50czoge1xuICAgICAgICBzcXVhcmVCdXNoOiAyLFxuICAgICAgICByb3VuZEJ1c2g6IDIsXG4gICAgICAgIHNuYWtlOiAwLFxuICAgICAgICBiYWc6IDE1LFxuICAgICAgICBibGFuazogNSxcbiAgICAgICAgcm9jazogMyxcbiAgICAgICAgc3R1bXA6IDMsXG4gICAgICAgIGhlYXJ0OiAyLFxuICAgICAgICByZWN5Y2xlOiAyLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAyLFxuICAgICAgICBsaWdodGVuaW5nOiAxLFxuICAgICAgICB0cmVlMTogMSxcbiAgICAgICAgdHJlZTI6IDEsXG4gICAgICAgIHRyZWUzOiAxLFxuICAgICAgICB0cmVlNjogMSxcbiAgICAgICAgdHJlZTc6IDEsXG4gICAgfSxcbiAgICBncm91bmRJdGVtQW1vdW50czoge1xuICAgICAgICBzcXVhcmVCdXNoOiAxLFxuICAgICAgICByb3VuZEJ1c2g6IDEsXG4gICAgICAgIHNuYWtlOiAyLFxuICAgICAgICBiYWc6IDAsXG4gICAgICAgIGJsYW5rOiA1LFxuICAgICAgICByb2NrOiAxLFxuICAgICAgICBzdHVtcDogMSxcbiAgICAgICAgaGVhcnQ6IDAsXG4gICAgICAgIHJlY3ljbGU6IDAsXG4gICAgICAgIHJhaWJvd1JlY3ljbGU6IDAsXG4gICAgfVxufSwgZGVmYXVsdE9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0czUuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQ0NBO0FBREE7Ozs7Ozs7O0FDQUE7QUFDQTtBRENBO0FBREE7QUFHQTtBQ0NBO0FEQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUVSQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBRVBBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUFBO0FBQ0E7QUhEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUluREE7QUFDQTtBSktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUlDQTtBQUNBO0FKR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBSUVBO0FBQ0E7QUF4REE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FMQUE7QUFBQTtBQUNBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBTVBBO0FBQ0E7QUFDQTtBQUNBO0FOQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBN0NBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7OztBQUZBOzs7Ozs7Ozs7Ozs7QU9EQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FQQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QVFaQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FSQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbkJBO0FBQ0E7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QVNyREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBVEFBO0FTQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FUQ0E7QUFDQTtBQXFCQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9FQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QVVGQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QVZBQTtBQUFBO0FBQ0E7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FXWkE7QUFDQTtBQUNBO0FYQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FZckNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QVpDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbk5BOzs7Ozs7Ozs7Ozs7QWFSQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QWJBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJBO0FBQ0E7QUFrQkE7QWFDQTtBYkNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FjeEVBO0FBQ0E7QUFDQTtBZENBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQUNBO0FBV0E7QWNDQTtBZENBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVdBO0FBQ0E7QUEzQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FlQ0E7QUFDQTtBQUNBO0FmQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FlQ0E7QWZDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FlQ0E7QWZDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQTNEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWdCQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBaEJLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUZBO0FBWUE7QUFDQTtBQW5EQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBaUJDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBS0E7QUFDQTtBakJLQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0NBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBa0JDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBZ0JBO0FsQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBa0JEQTtBbEJHQTtBQUNBO0FrQkRBO0FsQkdBO0FBQ0E7QWtCQ0E7QWxCQ0E7QUFIQTtBQUtBO0FBQ0E7QWtCREE7QWxCR0E7QUFDQTtBa0JEQTtBbEJHQTtBQUNBO0FrQkNBO0FsQkZBO0FBSUE7QUFDQTtBa0JDQTtBbEJGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FrQkNBO0FsQkZBO0FBSUE7QUFDQTtBa0JEQTtBbEJHQTtBQUNBO0FrQkRBO0FsQkdBO0FBQ0E7QWtCQ0E7QWxCRkE7QUFJQTtBQUNBO0FrQkRBO0FsQkdBO0FBQ0E7QWtCREE7QWxCR0E7QUFDQTtBa0JEQTtBbEJHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBbEVBO0FBQ0E7QUF3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW5CQTtBQUNBO0FBcUJBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwQkE7QUFDQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuVEE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FtQkRBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7Ozs7O0FBQ0E7QXBCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQTNDQTs7Ozs7Ozs7Ozs7QXFCRkE7QUFDQTtBQUNBO0FyQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBMUNBOzs7Ozs7Ozs7Ozs7QXNCQUE7QUFDQTs7Ozs7QUFDQTtBdEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQTVDQTs7Ozs7Ozs7Ozs7O0F1QkZBO0FBQ0E7Ozs7O0FBQ0E7QXZCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBMUNBOzs7Ozs7Ozs7Ozs7QXdCRkE7QUFDQTs7Ozs7QUFDQTtBeEJDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhCQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUE1Q0E7Ozs7Ozs7Ozs7OztBeUJGQTtBQUNBOzs7OztBQUNBO0F6QkNBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQTlDQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==