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
	
	__webpack_require__(18);
	
	pl.game('fire', function () {
	
	  var self = this;
	
	  pl.game.attachScreen = function (cb) {
	    cb.call(self);
	  };
	
	  // the following is the mouse smoke js
	  (function () {
	    var canvas = document.createElement('canvas');
	    var w = canvas.width = 960,
	        h = canvas.height = 540;
	    var c = canvas.getContext('2d');
	
	    var img = new Image();
	    img.src = 'http://oi41.tinypic.com/4i2aso.jpg';
	
	    var position = { x: w / 2, y: h / 2 };
	
	    document.body.appendChild(canvas);
	
	    var particles = [];
	    var random = function random(min, max) {
	      return Math.random() * (max - min) * min;
	    };
	
	    document.body.onmousemove = function (e) {
	      position.x = e.clientX / self.zoom;
	      position.y = e.clientY / self.zoom;
	    };
	    function Particle(x, y) {
	      this.x = x;
	      this.y = y;
	      this.velY = -2;
	      this.velX = (random(1, 10) - 5) / 10;
	      this.size = random(3, 5) / 10;
	      this.alpha = 1;
	      this.update = function () {
	        this.y += this.velY;
	        this.x += this.velX;
	        this.velY *= 0.99;
	        if (this.alpha < 0) this.alpha = 0;
	        c.globalAlpha = this.alpha;
	        c.save();
	        c.translate(this.x, this.y);
	        c.scale(this.size, this.size);
	        c.drawImage(img, -img.width / 2, -img.height / 2);
	        c.restore();
	        this.alpha *= 0.96;
	        this.size += 0.02;
	      };
	    }
	
	    var draw = function draw() {
	      var p = new Particle(position.x, position.y);
	      particles.push(p);
	
	      while (particles.length > 500) particles.shift();
	
	      c.globalAlpha = 1;
	      c.fillStyle = '#000';
	      c.fillRect(0, 0, w, h);
	
	      for (var i = 0; i < particles.length; i++) {
	        particles[i].update();
	      }
	    };
	
	    setInterval(draw, 1000 / 60);
	  })();
	  // end of the mouse smoke js
	
	  var soundClasses = function soundClasses() {
	    var classes = '';
	
	    this.on('audio-play', function (_event) {
	      var id = _event.target.$el[0].id;
	      if (id) {
	        id = id.toUpperCase();
	        this.addClass(id);
	        classes += ' ' + id;
	      }
	    });
	
	    this.on('ui-close', function () {
	      this.removeClass(classes);
	      classes = '';
	    });
	  };
	
	  this.screen('title', function () {
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	
	    this.on('ui-open', this.complete);
	
	    this.startAudio = function () {
	      this.title.audio.background.play();
	      this.title.audio.voiceOver.play();
	    };
	  });
	
	  this.screen('info-chemical', soundClasses);
	  this.screen('info-fuel-oxygen', soundClasses);
	  this.screen('break-triangle', soundClasses);
	
	  this.screen('flip', function () {
	    this.next = function () {
	      this.game.quit.okay();
	    };
	
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
	
	  this.screen('quit', function () {
	    var ctx;
	
	    this.on('ready', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      ctx = new (window.AudioContext || window.webkitAudioContext)();
	      this.audio.voiceOver.sure.setContext(ctx);
	      this.audio.sfx.button.setContext(ctx);
	    });
	
	    this.on('ui-open', function () {
	      var vo, sfx;
	
	      vo = this.audio.voiceOver.sure;
	      sfx = this.audio.sfx.button;
	      if (vo) vo.play();
	      if (sfx) sfx.play();
	    });
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
	  var i, sounds;
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    sounds = this.find('audio').map(function () {
	      return $(this).data('context');
	    }).toArray();
	
	    this.audio.on('ended', (function () {
	      var next = sounds[i++];
	      if (next && this.screen.state(this.screen.STATE.OPEN)) this.screen.playSound(next);
	    }).bind(this));
	  });
	
	  this.start = function () {
	    i = 1;
	    if (sounds[0] && this.screen.state(this.screen.STATE.OPEN)) this.screen.playSound(sounds[0]);
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	pl.game.component('background', function () {
	  var characters;
	  /**
	   * Nodes, including the node of this screen, with a
	   * attribute of pl-bg will get a background-image style
	   * and the resource preloaded and collected for watching.
	   */
	  this.handleProperty({
	    bg: function bg(_node, _name, _value) {
	      var img = new Image();
	      characters = characters || [];
	
	      img.src = _value;
	      characters.push(img);
	      $(_node).css('background-image', 'url(' + _value + ')');
	    }
	  });
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	pl.game.component('dropzone', function () {
	
	  this.entity('.area', function () {
	
	    this.cache = null;
	
	    this.respond('grab', function () {
	      this.audio.sfx.drag.play();
	      this.cache = {
	        position: this.absolutePosition().dec(this.game.absolutePosition()),
	        size: this.size().scale(this.game.transformScale().x)
	      };
	    });
	
	    this.respond('release', function (_event) {
	      var point, scale;
	
	      if ((scale = this.game.transformScale().x) !== 1) {
	        point = [_event.state.start.point[0] + scale * _event.state.progress.distance[0], _event.state.start.point[1] + scale * _event.state.progress.distance[1]];
	      } else {
	        point = _event.state.progress.point;
	      }
	
	      if (point && this.isPointInBounds(point)) {
	        if (this.takes(_event.state.$draggable.id())) {
	          _event.state.$draggable.removeClass('PLUCKED').addClass('COMPLETE').attr('pl-draggable', null);
	          _event.state.$helper.addClass('DROPED');
	
	          this.drop(_event.state.$draggable);
	          this.audio.sfx.correct.play();
	
	          return;
	        } else {
	          this.audio.sfx.incorrect.play();
	        }
	      }
	
	      _event.state.$helper.addClass('RETURN').css('transform', 'translateX(0px) translateY(0px)');
	    });
	  });
	
	  this.init = function () {
	    this.takes().forEach(this.bind(function (_id) {
	      this.require(_id);
	    }));
	  };
	
	  this.takes = function (_id) {
	    var takes = this.properties.take.split(/\s+/);
	    return arguments.length ? !! ~takes.indexOf(_id) : takes;
	  };
	
	  // arguments would be _point and _y
	  this.isPointInBounds = function () {
	    var point;
	
	    point = pl.Point.create(arguments);
	
	    if (point.x >= this.cache.position.x && point.x <= this.cache.position.x + this.cache.size.width) {
	      if (point.y >= this.cache.position.y && point.y <= this.cache.position.y + this.cache.size.height) {
	        return true;
	      }
	    }
	
	    return false;
	  };
	
	  // this.isBoxInBounds = function (_point, _size) {
	  //   // comming soon!
	  // };
	
	  this.behavior('drop', function (_$thing) {
	    this.requiredQueue.ready(_$thing.id());
	
	    return {
	      message: _$thing.id(),
	      behaviorTarget: _$thing
	    };
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	pl.game.component('frame', function () {
	
	  this.on('ready', function (_event) {
	    if (this.is(_event.target) && this.audio) {
	      this.audio.rule('.voiceOver', 'shouldPlay', function (_e) {
	        _e.response(!_e.target.config('dontautoplay'));
	      });
	    }
	  });
	
	  this.start = function () {
	    this.log('start');
	    return this.screen.start.call(this);
	  };
	
	  this.stop = function () {
	    return this.screen.stop.call(this);
	  };
	
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
/* 8 */
/***/ function(module, exports) {

	pl.game.component('modal', function () {
	
	  this.item = function (_id) {
	    this.select(this);
	    this.reveal.item(_id);
	  };
	
	  this.close = function () {
	    if (this.screen.shouldProceed()) {
	      this.deselect(this);
	    }
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	pl.game.component('multiple-choice', function () {
	
	  function validateAnswer(_scope) {
	    var answers;
	
	    if (_scope.properties.correct) {
	      answers = _scope.properties.correct.split(/\s*,\s*/);
	
	      if (~answers.indexOf(String(_scope.getSelected().index()))) {
	        if (_scope.audio.sfx.correct) _scope.audio.sfx.correct.play();
	        _scope.complete();
	      } else {
	        if (_scope.audio.sfx.incorrect) _scope.audio.sfx.incorrect.play();
	      }
	    }
	
	    return false;
	  }
	
	  this.behavior('answer', function () {
	    var $li;
	    if (this.event) {
	      $li = $(this.event.target).closest('li');
	
	      if (!this.isComplete && this.select($li)) {
	        validateAnswer(this);
	      }
	
	      return {
	        behaviorTarget: $li,
	        message: $li.id()
	      };
	    }
	
	    return false;
	  });
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	pl.game.component('reveal', function () {
	
	  this.item = function (_id) {
	    var vo, index;
	
	    if (typeof _id === 'number') {
	      this.select(this.find('li').eq(_id));
	      this.audio.voiceOver[_id].play();
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
/* 11 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.on('ready', function (_event) {
	    if (this.is(_event.target) && this.audio) {
	      this.audio.rule('.voiceOver', 'shouldPlay', function (_e) {
	        _e.response(!_e.target.config('dontautoplay'));
	      });
	    }
	
	    if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
	      this.requiredQueue.on('complete', this.bind(function () {
	        var sfx;
	
	        sfx = pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	
	        if (sfx) sfx.play();
	      }));
	    }
	  });
	
	  this.shouldProceed = function () {
	    return !this.state(this.STATE.PLAYING) && !this.state(this.STATE.VOICE_OVER) || this.game.demoMode;
	  };
	
	  this.playSound = function (_sound) {
	    var delay;
	
	    delay = $(_sound.media).attr('pl-start');
	
	    if (delay) {
	      return this.delay(delay, _sound.play.bind(_sound));
	    } else {
	      return _sound.play();
	    }
	  };
	
	  this.next = function () {
	    var current, nextScreen, buttonSound;
	
	    if (this.hasClass('last') && this.hasClass('COMPLETE')) this.game.quit.okay();
	
	    if (this !== this.screen) {
	      this.log('Not called on a screen');
	      return;
	    }
	
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	
	    // delegate to a child "slides" component.
	    if (this.slides && this.slides.isComponent) {
	      current = this.slides.current();
	      nextScreen = current.next();
	
	      if (nextScreen == null) {
	        current = this;
	        nextScreen = this.proto();
	      }
	    } else {
	      current = this;
	      nextScreen = this.proto();
	    }
	
	    if (nextScreen) {
	      current.leave();
	      nextScreen.open();
	      if (buttonSound) buttonSound.play();
	    }
	
	    return nextScreen;
	  };
	
	  this.prev = function () {
	    var current, prevScreen, buttonSound;
	
	    if (this !== this.screen) {
	      this.log('Not called on a screen');
	      return;
	    }
	
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	
	    // delegate to a child "slides" component.
	    if (this.slides && this.slides.isComponent) {
	      current = this.slides.current();
	      prevScreen = current.prev();
	
	      if (prevScreen == null) {
	        current = this;
	        prevScreen = this.proto();
	      }
	    } else {
	      current = this;
	      prevScreen = this.proto();
	    }
	
	    if (prevScreen) {
	      current.close();
	      prevScreen.open();
	      if (buttonSound) buttonSound.play();
	    }
	
	    return prevScreen;
	  };
	
	  this.start = function () {
	    var entities = this.hasOwnProperty('entities') && this.entities;
	
	    this.startAudio();
	    if (this.audio) this.audio.sfx.play('start');
	
	    if (entities) {
	      entities.forEach(function (_entity) {
	        if (_entity.isMemberSafe('start')) _entity.start();
	      });
	    }
	
	    return this;
	  };
	
	  this.stop = function () {
	    var entities = this.hasOwnProperty('entities') && this.entities;
	
	    this.stopAudio();
	    this.kill('delay');
	
	    if (entities) {
	      entities.forEach(function (_entity) {
	        if (_entity.isMemberSafe('start')) _entity.stop();
	      });
	    }
	
	    return this;
	  };
	
	  this.complete = function () {
	    this.game.audio.sfx.screenComplete.play();
	    return this.proto();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (this.isReady && this.is(_event.target)) this.start();
	
	    if (this.properties.gameClass) {
	      this.game.addClass(this.properties.gameClass);
	    }
	
	    if (this.properties.sfx) {
	      var sfx = this.properties.sfx.split(' ');
	      for (var i = 0, n = sfx.length; i < n; i++) {
	        if (this.audio.sfx[sfx[i]]) this.playSound(this.audio.sfx[sfx[i]]);
	      }
	    }
	  });
	
	  this.on('ui-leave ui-close', function (_event) {
	    if (this.properties.gameClass) {
	      this.game.removeClass(this.properties.gameClass);
	    }
	
	    if (this.isReady && this.is(_event.target)) this.stop();
	  });
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
	  var characters;
	  /**
	   * Nodes, including the node of this screen, with a
	   * attribute of pl-bg will get a background-image style
	   * and the resource preloaded and collected for watching.
	   */
	  this.handleProperty({
	    bg: function bg(_node, _name, _value) {
	      var img = new Image();
	      characters = characters || [];
	
	      img.src = _value;
	      characters.push(img);
	      $(_node).css('background-image', 'url(' + _value + ')');
	    }
	  });
	
	  // TODO: Make an automated way to handle this
	  this.on('transitionend', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (this.state(this.STATE.LEAVE)) {
	      this.addClass('LEAVE-END');
	    }
	  });
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	    this.game.addClass('QUIT-SCREEN');
	    this.removeClass('LEAVE-END');
	    this.game.pause(true);
	  });
	
	  this.on('ui-leave', function () {
	    var vo = this.audio.voiceOver.sure;
	    if (vo) vo.stop();
	    this.game.removeClass('QUIT-SCREEN');
	    this.game.resume();
	  });
	
	  this.init = function () {
	    this.addClass('LEAVE LEAVE-END');
	  };
	
	  this.okay = function () {
	    var sfx = this.audio.sfx.button;
	    if (sfx) sfx.play();
	    this.game.exit();
	  };
	
	  this.cancel = function () {
	    var sfx = this.audio.sfx.button;
	    if (sfx) sfx.play();
	    this.leave();
	  };
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	pl.game.component('selectable', function () {
	
	  this.behavior('select', function (_target) {
	    var $target;
	
	    if (this.event) {
	      $target = $(this.event.target).closest('li');
	
	      if (this.shouldSelect($target) !== false) {
	        return {
	          message: $target.id(),
	          behaviorTarget: $target
	        };
	      }
	    } else {
	      this.proto(_target);
	    }
	
	    return false;
	  });
	
	  this.shouldSelect = function () {
	    return true;
	  };
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	pl.game.component('slides', function () {
	
	  this.slides = null;
	
	  this.ready = function () {
	    this.slides = this.find('> *').scope();
	  };
	
	  this.start = function () {
	    var current, i, n;
	
	    current = this.current();
	
	    if (current) {
	      current.start();
	    } else if (this.slides.length) {
	      this.slides[0].open();
	      for (i = 1, n = this.slides.length; i < n; i++) {
	        this.slides[i] && this.slides[i].close();
	      }
	    }
	  };
	
	  this.current = function () {
	    return this.find('> .OPEN').scope();
	  };
	
	  /*
	   * @this {frame-component-scope} called by the next button in a frame component.
	   */
	  this.next = function () {
	    var index, nextSlide, buttonSound;
	
	    if (!this.completed()) return false;
	
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	    index = this.slides.indexOf(this);
	    if (~index) return this.slides[index + 1];
	
	    if (~index) nextSlide = this.slides[index + 1];
	
	    if (nextSlide) {
	      this.leave();
	      nextSlide.open();
	
	      if (buttonSound) buttonSound.play();
	
	      return nextSlide;
	    } else {
	      return this.proto();
	    }
	  };
	
	  /*
	   * @this {frame-component-scope} called by the next button in a frame component.
	   */
	  this.prev = function () {
	    var index, prevSlide, buttonSound;
	
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	    index = this.slides.indexOf(this);
	    if (~index) return this.slides[index - 1];
	
	    if (~index) prevSlide = this.slides[index - 1];
	
	    if (prevSlide) {
	      this.close();
	      prevSlide.open();
	
	      if (buttonSound) buttonSound.play();
	
	      return prevSlide;
	    } else {
	      return this.proto();
	    }
	  };
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * the following is the mouse smoke js
	 */
	pl.game.component('smoke', function () {
	  var w, h, c, position, particles, img, shouldDraw;
	
	  function Particle(x, y) {
	    this.x = x;
	    this.y = y;
	    this.velY = -2;
	    this.velX = (random(1, 10) - 5) / 10;
	    this.size = random(3, 5) / 10;
	    this.alpha = 1;
	    this.update = function () {
	      this.y += this.velY;
	      this.x += this.velX;
	      this.velY *= 0.99;
	      if (this.alpha < 0) this.alpha = 0;
	      c.globalAlpha = this.alpha;
	      c.save();
	      c.translate(this.x, this.y);
	      c.scale(this.size, this.size);
	      c.drawImage(img, -img.width / 2, -img.height / 2);
	      c.restore();
	      this.alpha *= 0.96;
	      this.size += 0.02;
	    };
	  }
	
	  function random(min, max) {
	    return Math.random() * (max - min) * min;
	  }
	
	  function draw() {
	    var p = new Particle(position.x, position.y);
	    particles.push(p);
	
	    while (particles.length > 500) particles.shift();
	
	    c.globalAlpha = 1;
	    c.fillStyle = '#000';
	    c.fillRect(0, 0, w, h);
	
	    for (var i = 0; i < particles.length; i++) {
	      particles[i].update();
	    }
	
	    if (shouldDraw) requestAnimationFrame(draw);
	  }
	
	  function handleCursor(e) {
	    position.x = e.clientX / this.zoom;
	    position.y = e.clientY / this.zoom;
	  }
	
	  this.canvas = null;
	  this.particle = null;
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    w = this.canvas[0].width = this.game.width(), h = this.canvas[0].height = this.game.height();
	    c = this.canvas.exec('getContext', ['2d'])[0];
	    img = this.particle[0];
	    position = { x: w / 2, y: h / 2 };
	
	    this.start();
	  });
	
	  this.start = function () {
	    particles = [];shouldDraw = true;
	    requestAnimationFrame(draw);
	    this.game.on(pl.EVENT.ACTION_MOVE, handleCursor);
	  };
	
	  this.stop = function () {
	    shouldDraw = false;
	    this.game.off(pl.EVENT.ACTION_MOVE, handleCursor);
	  };
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	pl.game.component('title', function () {
	  this.start = function () {
	    this.proto();
	  };
	  this.stop = function () {
	    this.proto();
	  };
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	(function test(_env) {
		if (window.parent === window) {
			window.location.href = 'https://www.changemyworldnow.com/';
		} else {
			document.domain = 'changemyworldnow.com';
		}
	})();

/***/ },
/* 18 */
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