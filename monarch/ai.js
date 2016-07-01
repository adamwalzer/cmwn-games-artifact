/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Index script
	 * @module
	 */
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	__webpack_require__(9);
	
	__webpack_require__(10);
	
	__webpack_require__(11);
	
	__webpack_require__(12);
	
	__webpack_require__(13);
	
	__webpack_require__(14);
	
	__webpack_require__(15);
	
	__webpack_require__(16);
	
	__webpack_require__(17);
	
	pl.game('monarch', function () {
	
	  this.screen('title', function () {
	    this.on('ui-open', function () {
	      this.repeat('4s', function () {
	        this.audio.sfx.play();
	      });
	      this.audio.sfx.on('play', (function () {
	        this.pupa.addClass('SHAKE');
	      }).bind(this));
	      this.audio.sfx.on('ended', (function () {
	        this.pupa.removeClass('SHAKE');
	      }).bind(this));
	    });
	
	    this.pause = function () {
	      this.kill('repeat');
	      this.__proto__.pause();
	    };
	
	    this.resume = function () {
	      this.repeat('4s', function () {
	        this.audio.sfx.play();
	      });
	      this.__proto__.resume();
	    };
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	
	    this.on('ui-close', function () {
	      this.kill('repeat');
	    });
	  });
	
	  this.screen('fly-across', function () {
	    var count = 0;
	
	    this.on('ui-open', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.length = this.modal.reveal.find('li').length;
	    });
	
	    this.respond('landed', function (_event) {
	      if (_event.message === 'red') {
	        this.audio.sfx.correct.play();
	        this.modal.item(count++);
	        if (count >= this.length) count = 0;
	      } else {
	        this.audio.sfx.incorrect.play();
	      }
	    });
	
	    this.respond('close', function (_event) {
	      if (!this.modal.is(_event.target)) return;
	      this.screen.runner.restart();
	    });
	  });
	
	  this.screen('floating-weed', function () {
	    var count = 0;
	
	    this.on('ui-open', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.length = this.modal.reveal.find('li').length;
	    });
	
	    this.respond('select', function (_event) {
	      if (!_event.behaviorTarget.is('li')) return;
	      this.audio.sfx.correct.play();
	      this.modal.item(count++);
	      if (count >= this.length) count = 0;
	    });
	  });
	
	  this.screen('four-generations', function () {
	    this.on('ui-open', function () {
	      this.deselect(this.selectableReveal.reveal.find('li'));
	    });
	
	    this.on('audio-ended', function (_event) {
	      if (this.audio.voiceOver.lifespan === _event.target) {
	        this.selectableReveal.reveal.item(4);
	      }
	    });
	  });
	
	  this.screen('flip', function () {
	    this.next = function () {
	      this.game.quit.okay();
	    };
	
	    this.on('animationend', function (_event) {
	      if (!this.flipContainer.is(_event.target)) return;
	      this.find('.pupa').addClass('SHAKE');
	      this.screen.audio.sfx.shake.play();
	    });
	
	    this.complete = function () {
	      var eventCategory;
	      var theEvent = new Event('game-event', { bubbles: true, cancelable: false });
	      theEvent.name = 'flip';
	      theEvent.gameData = { id: this.game.id() };
	      if (window.frameElement) window.frameElement.dispatchEvent(theEvent);
	      eventCategory = ['game', this.game.id(), this.id() + '(' + (this.index() + 1) + ')'].join(' ');
	      ga('send', 'event', eventCategory, 'complete');
	      return this.proto();
	    };
	  });
	
	  this.exit = function () {
	    var screen, eventCategory;
	
	    screen = this.findOwn(pl.game.config('screenSelector') + '.OPEN:not(#quit)').scope();
	    eventCategory = ['game', this.id(), screen.id() + '(' + (screen.index() + 1) + ')'].join(' ');
	
	    ga('send', 'event', eventCategory, 'quit');
	
	    return this.proto();
	  };
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	pl.game.config({
	  screenSelector: '.screen',
	  componentDirectory: 'components/',
	  dimensions: {
	    width: 960,
	    ratio: 16 / 9
	  },
	  shouldLoadComponentStyles: false
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	pl.game.component('screen-ios-splash', function () {
	
		this.on('ready', function (_e) {
			if (!this.is(_e.target)) return;
	
			if (this.game && this.game.title.state(this.STATE.READY)) {
				this.splash();
			}
		});
	
		this.splash = function () {
			this.close(this.game.loader);
	
			if (this.game.hasClass('iOS')) {
				this.open();
				this.ball.delay(0, this.ball.open);
			} else {
				this.game.title.open();
			}
		};
	
		this.next = function () {
			var nextScreen = this.proto();
	
			if (nextScreen) {
				this.screen.leave();
				nextScreen.open();
				this.game.audio.sfx.button.play();
			}
	
			return nextScreen;
		};
	
		this.complete = function () {
			this.game.audio.sfx.play('screenComplete');
			return this.proto();
		};
	
		this.startGame = function () {
			if (!this.hasClass('FINISHED')) return;
			this.game.addClass('STARTED');
			this.delay('2.5s', function () {
				this.next();
			});
		};
	
		this.on('animationend', function (_e) {
			if (!this.ball.is(_e.target)) return;
			this.addClass('FINISHED');
		});
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	pl.game.component('audio-sequence', function () {
	
	  var sounds = null;
	
	  this.on('ready', function (_event) {
	    var screen = this.screen;
	
	    if (!this.is(_event.target)) return;
	
	    sounds = this.find('> audio');
	    sounds.each(function (i, audio) {
	      audio.onended = function () {
	        if (sounds[i + 1] && screen.state(screen.STATE.OPEN)) screen.playSound(sounds[i + 1]);
	      };
	    });
	    if (typeof this.properties.loop !== 'undefined') {
	      sounds[sounds.length - 1].onended = this.start.bind(this);
	    }
	  });
	
	  this.start = function () {
	    if (sounds[0] && this.screen.state(this.screen.STATE.OPEN)) this.screen.playSound(sounds[0]);
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	pl.game.component('frame', function () {
	
	  this.start = function () {
	    var bgSound, voSound;
	
	    bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
	    voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');
	
	    if (bgSound) bgSound.play();
	    if (voSound && !voSound.hasAttribute('pl-dontautoplay')) voSound.play();
	
	    if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();
	
	    return this;
	  };
	
	  this.handleProperty({
	    title: function title(_node, _name, _value) {
	      if (this.is(_node)) {
	        this.find('.frame').addClass('title');
	        this.game.defineRule('.experiment:nth-of-type(' + (this.screen.index() + 1) + ') .frame-component .frame.title::before', {
	          backgroundImage: 'url(' + _value + ')'
	        });
	      }
	    }
	  });
	
	  this.on('ui-open', function (_event) {
	    if (this.isReady) {
	      this.start();
	    }
	
	    if (this === _event.targetScope) {
	      if (!(this.hasOwnProperty('isComplete') && this.isComplete) && !(this.hasOwnProperty('requiredQueue') && this.requiredQueue && this.requiredQueue.length)) {
	        this.complete();
	      }
	    }
	  });
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	pl.game.component('modal', function () {
	
	  this.item = function (_id) {
	    this.select(this);
	    this.reveal.item(_id);
	  };
	
	  this.behavior('close', function () {
	    if (!this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode) {
	      if (this.game.audio.sfx.button) this.game.audio.sfx.button.play();
	      this.deselect();
	    }
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	pl.game.component('multiple-choice', function () {
	
	  function validateAnswer(_scope) {
	    var answers;
	
	    if (_scope.properties.correct) {
	      answers = _scope.properties.correct.split(/\s*,\s*/);
	
	      if (~answers.indexOf(String(_scope.getSelected().index()))) {
	        _scope.complete();
	      }
	    }
	
	    return false;
	  }
	
	  this.answer = function () {
	    var $li;
	
	    if (this.event) {
	      $li = $(this.event.target).closest('li');
	
	      if (!this.isComplete && this.select($li)) {
	        validateAnswer(this);
	      }
	    }
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('reveal', function () {
	
	  this.item = function (_id) {
	    var vo, index;
	
	    if (typeof _id === 'number') {
	      this.select(this.find('li').eq(_id));
	      vo = this.audio.voiceOver && this.audio.voiceOver[_id];
	      if (vo) vo.play();
	    } else if (typeof _id === 'string') {
	      if (this[_id]) {
	        this.select(this[_id]);
	
	        if (this.audio) {
	          index = this[_id].index();
	          vo = this.audio.voiceOver[_id] || this.audio.voiceOver[index];
	
	          if (vo) vo.play();
	        }
	      }
	    }
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	pl.game.component('runner', function () {
	  var canvas, Flower, gameLoop, FLOWER, scale, boundPulse;
	
	  FLOWER = {
	    ORANGE: '[pl-id=orange]',
	    RED: '[pl-id=red]',
	    YELLOW: '[pl-id=yellow]'
	  };
	
	  gameLoop = {
	
	    lastRecycledFlower: null,
	
	    // main game loop
	    frame: function frame(_scope) {
	      // tranision flowers one px on each frame
	      _scope.flowers.forEach((function (_flower) {
	        var x, width;
	        _flower.position.x -= 1;
	
	        x = _flower.position.x + _flower.margin;
	        width = _flower.size.width;
	
	        if (x + width < 0) this.recycle(_scope, _flower);
	      }).bind(this));
	    },
	
	    recycle: function recycle(_scope, _flower) {
	      _flower.image = pl.util.random(_scope.bin);
	      _flower.margin = pl.util.random(2, 10) * 10;
	      _flower.position.x = _scope.width() + _flower.margin;
	
	      if (this.lastRecycledFlower) {
	        _flower.position.x = this.lastRecycledFlower.margin + this.lastRecycledFlower.position.x + this.lastRecycledFlower.size.width;
	      }
	
	      this.lastRecycledFlower = _flower;
	    },
	
	    pulsePoint: 0,
	
	    pulse: function pulse(_scope, _flower) {
	      // pulse flower
	      gameLoop.pulsePoint++;
	      _flower.position.x += gameLoop.pulsePoint % 40 > 20 ? 1 : -1;
	      _flower.position.y += gameLoop.pulsePoint % 40 > 20 ? 1 : -1;
	      _flower.size.width += gameLoop.pulsePoint % 40 > 20 ? -2 : 2;
	      _flower.size.height += gameLoop.pulsePoint % 40 > 20 ? -2 : 2;
	    }
	
	  };
	
	  Flower = pl.Basic.extend(function () {
	
	    this.position = null;
	    this.size = null;
	    this.margin = 0;
	    this.image = null;
	
	    this.init = function (_image) {
	      this.image = _image;
	
	      this.position = pl.Point.create();
	      this.size = [_image.naturalWidth, _image.naturalHeight].to('size');
	      this.margin = pl.util.random(2, 10) * 10;
	
	      ['Width', 'Height'].some(function (_plane) {
	        if (_image[_plane.toLowerCase()] !== _image['natural' + _plane]) {
	          scale = _image[_plane.toLowerCase()] / _image['natural' + _plane];
	          return false;
	        }
	      });
	
	      if (scale) this.size = this.size.scale(scale).math('floor');
	
	      return this;
	    };
	
	    this.render = function () {
	      return {
	        drawImage: [this.image, this.position.x + this.margin, this.position.y + 25, this.size.width, this.size.height]
	      };
	    };
	
	    this.is = function (_type) {
	      return $(this.image).is(_type);
	    };
	
	    this.id = function () {
	      return $(this.image).id();
	    };
	  });
	
	  canvas = {
	
	    ctx: null,
	    node: null,
	    content: null,
	    scale: 1,
	
	    init: function init(_canvas, _size, _scale) {
	      var size;
	
	      size = _scale ? _size.scale(_scale) : _size;
	
	      this.node = _canvas;
	      this.ctx = _canvas.getContext('2d');
	      this.scale = _scale || 1;
	
	      if (! ~size.indexOf(void 0)) {
	        _canvas.width = size.width;
	        _canvas.height = size.height;
	      }
	
	      this.ctx.scale(_scale, _scale);
	
	      return this;
	    },
	
	    resize: function resize(_size, _scale) {
	      var size;
	
	      size = _scale ? _size.scale(_scale) : _size;
	
	      this.node.width = size.width;
	      this.node.height = size.height;
	      this.scale = _scale || 1;
	
	      this.ctx.scale(_scale, _scale);
	    },
	
	    clear: function clear() {
	      this.ctx.clearRect(0, 0, this.node.width / this.scale, this.node.height / this.scale);
	    },
	
	    draw: function draw(_obj) {
	      var commands, cmd;
	
	      commands = _obj.render();
	
	      for (cmd in commands) {
	        if (typeof this.ctx[cmd] !== 'function') continue;
	        this.ctx[cmd].apply(this.ctx, commands[cmd]);
	      }
	    }
	  };
	
	  this.bin = null;
	  this.flowers = null;
	  this.player = null;
	  this.conveyor = null;
	  this.isConveyorRunning = false;
	
	  // Handle when the component scope is ready.
	  this.on('ready', function (_event) {
	    var canvasSize, width;
	
	    // Do not handle child scopes becomming ready.
	    if (!this.is(_event.target)) return;
	
	    width = this.width();
	
	    this.bin = this.findOwn('.bin img.flower').toArray();
	    this.flowers = (function (_scope) {
	      var shouldAppend, image, flower, x;
	
	      shouldAppend = true;
	      x = 0;
	
	      while (shouldAppend) {
	        image = pl.util.random(_scope.bin);
	        flower = Flower.create().init(image);
	
	        flower.position.x = x;
	        x += flower.size.width + flower.margin;
	
	        this.push(flower);
	
	        shouldAppend = flower.position.x < width;
	
	        _scope.log(flower.position.x, width);
	      }
	
	      return this;
	    }).call([], this);
	
	    canvasSize = pl.Size.create().set(width, 125);
	
	    canvas.init(this.conveyor[0], canvasSize, this.game.zoom);
	
	    this.game.viewport.onResize(this.game.bind(function () {
	      canvas.resize(canvasSize, this.zoom);
	    }));
	  });
	
	  this.on('transitionend', function (_event) {
	    if (!this.player.is(_event.target)) return;
	
	    if (this.player.state('GRAVITY')) {
	      this.isConveyorRunning = !this.testFlower();
	
	      if (this.isConveyorRunning) this.player.removeClass('GRAVITY');
	    } else if (this.player.state('JUMPING')) {
	      this.player.removeClass('JUMPING').addClass('GRAVITY').attr('style', null);
	    }
	  });
	
	  this.start = function () {
	    this.log('started');
	    this.isConveyorRunning = true;
	    this.eachFrame(this.onEachFrame);
	  };
	
	  this.restart = function () {
	    this.isConveyorRunning = true;
	    this.player.removeClass('GRAVITY');
	  };
	
	  this.stop = function () {
	    this.eachFrame(this.onEachFrame, false);
	  };
	
	  this.onEachFrame = function () {
	    if (!this.isConveyorRunning) return;
	
	    canvas.clear();
	
	    gameLoop.frame(this);
	
	    this.flowers.forEach(function (_flower) {
	      canvas.draw(_flower);
	    });
	  };
	
	  this.pulse = function (_flower) {
	    if (gameLoop.pulsePoint >= 80) {
	      gameLoop.pulsePoint = 0;
	      this.eachFrame(boundPulse, false);
	    }
	
	    canvas.clear();
	
	    gameLoop.pulse(this, _flower);
	
	    this.flowers.forEach(function (_f) {
	      canvas.draw(_f);
	    });
	  };
	
	  this.testFlower = function () {
	    var target, flower, player;
	
	    player = {
	      pos: this.player.absolutePosition(),
	      size: pl.Size.create().set(this.player.width(), this.player.height())
	    };
	
	    target = pl.Point.create().set(player.pos.x + player.size.width / 2, 40).inc(20, 0);
	
	    // canvas.ctx.fillStyle = '#000';
	
	    this.flowers.some(this.bind(function (_flower) {
	      var hitArea, padding, inBoundsX, inBoundsY;
	
	      padding = 25;
	      hitArea = {
	        x1: _flower.position.x + _flower.margin + padding,
	        y1: _flower.position.y + padding,
	        x2: _flower.position.x + _flower.margin + _flower.size.width - padding * 1,
	        y2: _flower.position.y + _flower.size.height - padding * 1
	      };
	
	      // canvas.ctx.fillRect(hitArea.x1, hitArea.y1, hitArea.x2 - hitArea.x1, hitArea.y2 - hitArea.y1);
	
	      inBoundsX = target.x > hitArea.x1 && target.x < hitArea.x2;
	      inBoundsY = target.y > hitArea.y1 && target.y < hitArea.y2;
	
	      if (inBoundsX && inBoundsY && _flower.is(FLOWER.RED)) {
	        flower = _flower;
	        return true;
	      }
	    }));
	
	    this.landed(flower);
	
	    // canvas.ctx.fillStyle = '#00f';
	    // canvas.ctx.fillRect(target.x, target.y, 10,10);
	
	    return flower;
	  };
	
	  this.behavior('jump', function () {
	    var position;
	
	    if (!this.isConveyorRunning) return;
	
	    position = this.player.transformPosition();
	
	    this.player.removeClass('GRAVITY').addClass('JUMPING').transformPosition(position.dec(0, 60));
	
	    this.log('behavior:jump');
	
	    return {
	      behaviorTarget: this.player
	    };
	  });
	
	  this.behavior('landed', function (_flower) {
	    var id;
	
	    if (_flower) {
	      id = _flower.id();
	      boundPulse = this.pulse.bind(this, _flower);
	      this.eachFrame(boundPulse);
	    }
	
	    return {
	      message: id,
	      behaviorTarget: this.player
	    };
	  });
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	pl.game.component('score', function () {
	
	  this.value = 0;
	
	  this.entity('.board', function () {
	
	    this.template = null;
	
	    this.ready = function () {
	      this.template = this.html();
	    };
	
	    this.render = function () {
	      this.html(this.template.replace('{{score}}', this.value));
	      return this;
	    };
	  });
	
	  this.init = function () {
	    this.screen.require(this);
	  };
	
	  this.ready = function () {
	    this.board.render();
	  };
	
	  this.up = function (_count) {
	    this.value += _count || 1;
	
	    this.board.render();
	
	    if (this.value === parseInt(this.properties.max, 10)) {
	      this.complete();
	    }
	
	    return this;
	  };
	
	  this.down = function (_count) {
	    this.value -= _count || 1;
	
	    this.board.render();
	
	    if (this.value === parseInt(this.properties.max, 10)) {
	      this.complete();
	    }
	
	    return this;
	  };
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	  this.currentVO = null;
	
	  this.allowAction = function () {
	    return this.screen.state(this.screen.STATE.OPEN) && !this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode;
	  };
	
	  this.playSound = function (_sound) {
	    var delay;
	
	    delay = $(_sound).attr('pl-delay');
	
	    if (_sound.type === 'voiceOver') {
	      this.currentVO = _sound;
	    }
	
	    if (delay) {
	      return this.delay(delay, _sound.play.bind(_sound));
	    } else {
	      return _sound.play();
	    }
	  };
	
	  this.next = function () {
	    var nextScreen, buttonSound;
	
	    nextScreen = this.proto();
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	
	    if (nextScreen) {
	      this.leave();
	      nextScreen.open();
	      if (buttonSound) buttonSound.play();
	    }
	
	    return nextScreen;
	  };
	
	  this.prev = function () {
	    var prevScreen, buttonSound;
	
	    prevScreen = this.proto();
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	
	    if (prevScreen) {
	      this.screen.close();
	      prevScreen.open();
	      if (buttonSound) buttonSound.play();
	    }
	
	    return prevScreen;
	  };
	
	  this.start = function () {
	    var bgSound, voSound, fxSound;
	
	    bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
	    voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');
	    fxSound = pl.util.resolvePath(this, 'audio.sfx.start');
	
	    if (bgSound) {
	      this.game.bgSound = bgSound;
	      bgSound.play();
	    }
	    if (fxSound) fxSound.play();
	    if (voSound) this.playSound(voSound);
	
	    if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();
	
	    return this;
	  };
	
	  this.stop = function () {
	    if (this.timeoutID) {
	      clearTimeout(this.timeoutID);
	    }
	
	    if (this.intervalID) {
	      this.kill('repeat');
	    }
	
	    if (this.currentVO) {
	      this.currentVO.stop();
	    }
	  };
	
	  this.on('ui-open', function (_event) {
	    if (this.isReady && this === _event.targetScope) {
	      this.start();
	    }
	
	    if (this.properties.gameClass) {
	      this.game.addClass(this.properties.gameClass);
	    }
	
	    if (!this.requiredQueue || this.hasOwnProperty('requiredQueue') && !this.requiredQueue.length) {
	      this.complete();
	    }
	  });
	
	  this.on('ui-leave', function (_event) {
	    if (this.properties.gameClass) {
	      this.game.removeClass(this.properties.gameClass);
	    }
	
	    if (this.isReady && this === _event.targetScope) {
	      this.stop();
	    }
	  });
	
	  this.on('ui-close', function (_event) {
	    if (this.properties.gameClass) {
	      this.game.removeClass(this.properties.gameClass);
	    }
	
	    if (this.isReady && this === _event.targetScope) {
	      this.stop();
	    }
	  });
	
	  this.on('ready', function () {
	    if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
	      this.requiredQueue.on('complete', this.bind(function () {
	        var sfx;
	
	        sfx = pl.util.resolvePath(this, 'screen.audio.sfx.screenComplete') || pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	
	        if (sfx) this.playSound(sfx);
	      }));
	    }
	  });
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
	  this.buttonSound = function () {
	    if (this.audio.sfx.button) this.audio.sfx.button.play();
	  };
	
	  // TODO: Make an automated way to handle this
	  this.on('transitionend', function (_event) {
	    if (!this.is(_event.taget)) return;
	    if (this.state(this.STATE.LEAVE)) {
	      this.addClass('LEAVE-END');
	    }
	  });
	
	  this.on('ready', function (_e) {
	    var ctx;
	
	    if (!this.is(_e.target)) return;
	
	    ctx = new (window.AudioContext || window.webkitAudioContext)();
	    if (this.audio.voiceOver.sure) this.audio.voiceOver.sure.setContext(ctx);
	    if (this.audio.sfx.button) this.audio.sfx.button.setContext(ctx);
	  });
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.taget)) return;
	    if (this.audio.voiceOver.sure) this.audio.voiceOver.sure.play();
	    this.buttonSound();
	    this.game.addClass('QUIT-SCREEN');
	    this.removeClass('LEAVE-END');
	    this.game.pause(true);
	  });
	
	  this.on('ui-leave', function () {
	    this.game.removeClass('QUIT-SCREEN');
	    this.game.resume();
	  });
	
	  this.init = function () {
	    this.addClass('LEAVE LEAVE-END');
	  };
	
	  this.okay = function () {
	    this.buttonSound();
	    this.game.exit();
	  };
	
	  this.cancel = function () {
	    this.buttonSound();
	    this.leave();
	  };
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	pl.game.component('selectable-reveal', function () {
	
	  this.respond('select', function (_event) {
	    var index, stateMethod;
	
	    index = _event.message;
	    stateMethod = this.properties.selectState || 'select';
	
	    if (~index) {
	      this[stateMethod](_event.behaviorTarget);
	      if (this.audio.sfx.button) this.audio.sfx.button.play();
	      this.reveal.item(index);
	    }
	  });
	
	  this.start = function () {};
	
	  this.entity('selectable', function () {
	
	    this.shouldSelect = function (_$target) {
	      if (_$target.prev().hasClass(this.STATE.HIGHLIGHTED) || _$target.index() === 0) {
	        return !this.screen.state(this.STATE.VOICE_OVER);
	      }
	
	      return false;
	    };
	  });
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	pl.game.component('selectable', function () {
	
	  this.behavior('select', function (_target) {
	    var $target, id;
	
	    if (this.event) {
	      $target = $(this.event.target).closest('li');
	      id = $target.id() || $target.index();
	
	      if (this.shouldSelect($target) !== false) {
	        return {
	          message: id,
	          behaviorTarget: $target
	        };
	      }
	    } else {
	      this.proto(_target);
	    }
	
	    return false;
	  });
	
	  this.shouldSelect = function (_$target) {
	    console.log(this.properties);
	    if (this.properties.eachSelectable || _$target.prev().hasClass(this.STATE.HIGHLIGHTED) || _$target.index() === 0) {
	      return !this.screen.state(this.STATE.VOICE_OVER);
	    }
	
	    return false;
	  };
	
	  this.deselectAll = function () {
	    var items = this.find('li');
	    this.deselect(items);
	    this.unhighlight(items);
	  };
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	pl.game.component('video', function () {
	  var bg;
	
	  this.start = function () {
	    var self = this;
	    this.video.on('ended', function () {
	      self.complete();
	    });
	    this.stopBackground();
	    this.video[0].play();
	  };
	
	  this.stopBackground = function () {
	    if (!this.properties.playBackground && (bg = this.game.media.playing('.background'))) {
	      bg.stop('@ALL');
	    }
	  };
	
	  this.pause = function () {
	    this.video[0].pause();
	  };
	
	  this.resume = function () {
	    if (this.isComplete) return;
	    this.stopBackground();
	    this.video[0].play();
	  };
	
	  this.screen.on('ui-close', this.pause.bind(this));
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	(function test(_env) {
		if (window.parent === window) {
			window.location.href = 'https://www.changemyworldnow.com/';
		} else {
			document.domain = 'changemyworldnow.com';
		}
	})();

/***/ },
/* 17 */
/***/ function(module, exports) {

	(function (i, s, o, g, r, a, m) {
	  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
	    (i[r].q = i[r].q || []).push(arguments);
	  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
	
	ga('create', 'UA-26000499-1', 'auto');
	ga('send', 'pageview');

/***/ }
/******/ ]);
//# sourceMappingURL=ai.js.map