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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Index script
	 * @module
	 */
	
	__webpack_require__(2);
	
	// SCREENS
	
	var _screensIdentify = __webpack_require__(3);
	
	var _screensIdentify2 = _interopRequireDefault(_screensIdentify);
	
	var _screensCarousel = __webpack_require__(4);
	
	var _screensCarousel2 = _interopRequireDefault(_screensCarousel);
	
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
	
	__webpack_require__(19);
	
	__webpack_require__(20);
	
	pl.game('printmaster', function () {
	
	  var typing = function typing(_duration) {
	    var duration = _duration || '.5s';
	    return function () {
	      this.on('ui-open', function () {
	        this.game.audio.sfx.typing.play();
	        this.delay(duration, function () {
	          this.game.audio.sfx.typing.stop();
	        });
	      });
	      this.on('ui-close ui-leave', function () {
	        this.game.audio.sfx.typing.stop();
	      });
	    };
	  };
	
	  this.screen('title', function () {
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	
	    this.on('ui-open', function (_event) {
	      if (this.is(_event.target)) {
	        this.title.start();
	        this.delay('1.75s', function () {
	          this.complete();
	        });
	      }
	    });
	
	    this.startAudio = function () {
	      this.title.audio.background.play();
	      this.title.audio.voiceOver.play();
	    };
	
	    this.stopAudio = function () {
	      this.title.audio.voiceOver.stop('@ALL');
	    };
	  });
	
	  this.screen('info-discover', typing('5s'));
	
	  this.screen('info-arch', typing('.5s'));
	
	  this.screen('info-loops', typing('.5s'));
	
	  this.screen('info-whorl', typing('.5s'));
	
	  this.screen('info-double-loop', typing('.5s'));
	
	  this.screen('info-id', typing('4.25s'));
	
	  this.screen('identify', _screensIdentify2['default']);
	
	  this.screen('carousel', _screensCarousel2['default']);
	
	  this.screen('info-lets-dust', function () {
	    typing('1s').call(this);
	
	    this.on('audio-play', function (_event) {
	      if (this.audioSequence.audio.voiceOver.count === _event.target) {
	        this.addClass('COUNT');
	      } else if (this.audioSequence.audio.voiceOver.engage === _event.target) {
	        this.addClass('ENGAGE');
	        this.game.audio.sfx.typing.play();
	        this.delay('.75s', function () {
	          this.game.audio.sfx.typing.stop();
	        });
	      } else {
	        this.removeClass('COUNT ENGAGE');
	      }
	    });
	  });
	
	  this.screen('info-need', function () {
	    this.on('audio-play', function (_event) {
	      var id = _event.target.id();
	      if (id) this.addClass(id.toUpperCase());
	    });
	
	    this.on('ui-close', function () {
	      this.removeClass('LOTION TAPE POWDER BRUSH PAPER GLASS');
	    });
	  });
	
	  this.screen('flip', function () {
	    this.next = function () {
	      this.game.quit.okay();
	    };
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.require('shake');
	    });
	
	    this.on('animationend', function (_event) {
	      if (!this.flip.is(_event.target) || !this.allowAction()) return;
	      this.requiredQueue.ready('shake');
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
	
	    pl.game.report.flip(this, {
	      name: 'flip',
	      gameData: { id: this.id() }
	    });
	
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

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = identify;
	/**
	 * Printmaster - Identify Screen
	 */
	
	function identify() {
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    this.start();
	
	    if (this.state(this.STATE.COMPLETE)) {
	      this.selectable.removeClass('COMPLETE').isComplete = false;
	      this.setItem();
	    }
	  });
	
	  this.start = function () {
	    var correct;
	
	    correct = pl.Queue.create();
	
	    correct.on('complete', this.bind(function () {
	      this.delay('1.5s', function () {
	        this.audio.sfx.confirmed.play();
	        this.selectable.complete();
	      });
	    }));
	
	    this.items = this.find('.header img').map(function (_index, _node) {
	      correct.add($(_node).id());
	      return _node;
	    }).toArray();
	
	    this.items.correct = correct;
	
	    this.headers = this.find('.header img');
	    this.answers = this.find('.items li');
	  };
	
	  this.setItem = function (_idx) {
	    if (this.item && this.items[this.item]) this.items[this.item].ready();
	    this.idx = _idx || 0;
	    this.item = $(this.items[this.idx]).id();
	
	    if (this.item) {
	      this.select(this.headers.filter('[pl-id=' + this.item + ']'));
	      if (this.selectable) this.selectable.deselectAll();
	
	      for (var i = 0; i < 5; i++) {
	        this.delay(i * 150, function () {
	          this.answers.each(function (_index, _node) {
	            _node.style.order = Math.round(20 * Math.random());
	          });
	        });
	      }
	    }
	  };
	
	  this.respond('select', function (_event) {
	    if (_event.message === this.item) {
	      this.audio.sfx.correct.play();
	      this.audio.sfx.granted.play();
	      this.select(_event.behaviorTarget);
	      this.items.correct.ready(this.item);
	      this.delay('1s', this.setItem.bind(this, ++this.idx));
	    } else {
	      this.audio.sfx.incorrect.play();
	      this.audio.sfx.denied.play();
	      this.highlight(_event.behaviorTarget);
	    }
	  });
	}
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = carousel;
	/**
	 * Printmaster - Carousel Screen
	 */
	
	function carousel() {
	  this.setTarget = function (_idx) {
	    this.idx = _idx || 0;
	    this.$target = $(this.$targets[this.idx]);
	    this.target = this.$target.id();
	    this.amount = this.$target.attr('pl-amount');
	
	    if (this.target) {
	      this.select(this.$target);
	
	      if (this.score) {
	        this.score.removeClass('loops whorl arch doubleloops').addClass(this.target);
	        this.score.attr('pl-max', this.amount);
	        this.score.properties.max = this.amount;
	        this.score.reset();
	      }
	    } else {
	      this.deselect(this.$targets);
	    }
	  };
	
	  this.respond('complete', function (_event) {
	    if (_event.message === 'score') {
	      this.modal.item(this.idx);
	      this.setTarget(++this.idx);
	    }
	  });
	
	  this.start = function () {
	    this.proto();
	    this.carousel.start();
	  };
	
	  this.stop = function () {
	    this.carousel.stop();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    this.$targets = this.find('.target img');
	
	    this.carousel.start();
	    this.modal.item(8);
	    this.setTarget();
	
	    this.game.audio.sfx.typing.play();
	    this.delay('3.5s', function () {
	      this.game.audio.sfx.typing.stop();
	    });
	  });
	
	  this.state('incomplete', '-COMPLETE', {
	    willSet: function willSet() {
	      this.isComplete = false;
	    }
	  });
	
	  this.respond('hit', function (_event) {
	    if (_event.message === _event.behaviorTarget.id()) {
	      this.score.up();
	      this.playSFX('correct');
	    } else {
	      this.playSFX('incorrect');
	    }
	  });
	
	  this.respond('next', function () {
	    this.cannon.reload();
	  });
	
	  this.complete = function () {
	    var r = this.proto();
	    return r;
	  };
	
	  this.playSFX = function (_name) {
	    var sfx;
	
	    sfx = pl.util.resolvePath(this, 'audio.sfx.' + _name);
	
	    if (sfx) sfx.play();
	
	    return this;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 5 */
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
/* 6 */
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
	      if (next && this.screen.state(this.screen.STATE.OPEN)) next.play();
	    }).bind(this));
	  });
	
	  this.start = function () {
	    i = 1;
	    if (sounds[0] && this.screen.state(this.screen.STATE.OPEN)) sounds[0].play();
	  };
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	pl.game.component('cannon', function () {
	
	  this.isLaunchComplete = true;
	
	  this.state('launch launched', '+LAUNCHED -RELOAD', {
	    willSet: function willSet() {
	      this.playSFX('fire');
	      this.isLaunchComplete = false;
	      this.delay('1s', function () {
	        this.isLaunchComplete = true;
	      });
	    }
	  });
	
	  this.state('reload', '+RELOAD -LAUNCHED', {
	    shouldSet: function shouldSet() {
	      if (!this.isLaunchComplete) {
	        return false;
	      }
	    }
	  });
	
	  this.behavior('fire', function () {
	    var message;
	    if (this.isLaunchComplete) {
	      this.launch(this.ball);
	      message = pl.util.resolvePath(this, this.properties.messagePath || 'cannon.properties.fire');
	      return {
	        message: message
	      };
	    }
	
	    return false;
	  });
	
	  this.load = function () {
	    this.reload(this.ball);
	  };
	
	  this.playSFX = function (_name) {
	    var sfx;
	
	    sfx = pl.util.resolvePath(this, 'audio.sfx.' + _name);
	
	    if (sfx) sfx.play();
	
	    return this;
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('carousel', function () {
	
	  this.TYPE = (function () {
	
	    this.SLIDE = 'slide';
	    this.CROSS_FADE = 'cross-fade';
	
	    return this;
	  }).call(['slide', 'cross-fade']);
	
	  this.type = null;
	  this.$images = null;
	  this.nodes = null;
	  this.shouldRandomize = false;
	  this.isPlaying = false;
	
	  this.ready = function () {
	    this.$images = this.find('li');
	    this.shouldRandomize = this.properties.has('randomize');
	
	    if (this.TYPE.every(this.bind(function (_type) {
	      return !this.hasClass(_type);
	    }))) {
	      this.addClass(this.TYPE.CROSS_FADE);
	    }
	
	    if (this.$images.length) {
	      this.nodes = this.$images.map(this.bind(function (_index, _node) {
	        var siblings;
	
	        siblings = [_node.previousSibling, _node.nextSibling];
	
	        siblings.forEach(function (_n) {
	          if (_n.nodeType === document.TEXT_NODE) {
	            $(_n).remove();
	          }
	        });
	
	        return _node;
	      })).toArray();
	    }
	
	    this.TYPE.forEach(this.bind(function (_item) {
	      if (this.hasClass(_item)) this.type = _item;
	    }));
	
	    this.on('transitionend', function (_event) {
	      if (_event.target.nodeName === 'LI' && $(_event.target).state(this.STATE.LEAVE)) {
	        this.recycle();
	      }
	    });
	  };
	
	  this.provideBehaviorTarget = function () {
	    return this.properties.targetNext ? this.current().next() : this.current();
	  };
	
	  this.respond('fire', function (_event) {
	    this.hit(_event.message);
	  });
	
	  this.behavior('hit', function (_message) {
	    return {
	      message: _message,
	      behaviorTarget: this.provideBehaviorTarget()
	    };
	  });
	
	  this.behavior('next', function () {
	    var current;
	
	    current = this.$images.first();
	
	    this.leave(current);
	    this.open(current.next());
	  });
	
	  this.start = function () {
	    var delay;
	
	    delay = pl.util.toMillisec(this.properties.delay) || 1000;
	
	    if (this.isReady && !this.isPlaying) {
	      this.isPlaying = true;
	      this.open(this.$images.first());
	      this.repeat(delay, this.next);
	    } else {
	      this.on('ready', this.beginShow);
	    }
	  };
	
	  this.stop = function () {
	    this.kill('repeat');
	    this.isPlaying = false;
	  };
	
	  this.current = function () {
	    return this.$images.filter('.OPEN');
	  };
	
	  this.recycle = function () {
	    var $current, reload;
	
	    $current = this.$images.first();
	    reload = this.reloadWithNode(this.$images[0]);
	
	    $current.removeClass(this.STATE.LEAVE);
	    $current.remove();
	
	    [].shift.call(this.$images);
	
	    this.$images.push(reload);
	    this.append(reload);
	
	    return this;
	  };
	
	  this.reloadWithNode = function (_item) {
	    var $clone, state;
	
	    if (this.shouldRandomize) {
	      $clone = $(pl.util.random(this.nodes)).clone();
	      state = $clone.state();
	
	      if (state) $clone.removeClass(state.join ? state.join(' ') : state);
	
	      return $clone[0];
	    }
	
	    return _item;
	  };
	});

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	pl.game.component('modal', function () {
	
	  this.item = function (_id) {
	    this.select(this);
	    this.reveal.item(_id);
	  };
	
	  this.close = function () {
	    if (!this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode) {
	      this.deselect(this);
	    }
	  };
	});

/***/ },
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	pl.game.component('score', function () {
	
	  this.value = 0;
	
	  this.entity('.board', function () {
	
	    this.template = null;
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      this.items = this.find('div');
	    });
	
	    this.render = function () {
	      this.highlight(this.items[this.value - 1]);
	      return this;
	    };
	  });
	
	  this.init = function () {
	    this.screen.require(this);
	  };
	
	  this.ready = function () {
	    this.board.render();
	  };
	
	  this.reset = function () {
	    this.value = 0;
	    this.unhighlight(this.board.items);
	  };
	
	  this.up = function (_count) {
	    this.value += _count || 1;
	
	    this.board.render();
	
	    if (this.value === parseInt(this.properties.max, 10)) {
	      this.delay(this.properties.completeDelay || '0s', this.complete);
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
	
	  this.behavior('complete', function () {
	    return {
	      message: 'score'
	    };
	  });
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    if (this.audio) {
	      this.audio.rule('.voiceOver', 'shouldPlay', function (_e) {
	        _e.response(!_e.target.config('dontautoplay'));
	      });
	    }
	
	    if (this.state(this.STATE.OPEN)) this.start();
	  });
	
	  this.allowAction = function () {
	    return this.screen.state(this.screen.STATE.OPEN) && !this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode;
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
	    if (this.is(this.screen)) {
	      var screenComplete = pl.util.resolvePath(this, 'audio.sfx.screenComplete') || pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	      if (screenComplete) screenComplete.play();
	    }
	
	    return this.proto();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (this.is(_event.target)) {
	      if (this.isReady) this.start();
	      if (this.completed() && !this.isComplete) this.complete();
	
	      if (this.properties.gameClass) {
	        this.game.addClass(this.properties.gameClass);
	      }
	    }
	  });
	
	  this.on('ui-leave ui-close', function (_event) {
	    if (this.is(_event.target)) {
	      this.stop();
	
	      if (this.properties.gameClass) {
	        this.game.removeClass(this.properties.gameClass);
	      }
	    }
	  });
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
	  this.buttonSound = function () {
	    if (this.game.audio.sfx.button) this.game.audio.sfx.button.play();
	  };
	
	  // TODO: Make an automated way to handle this
	  this.on('transitionend', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (this.state(this.STATE.LEAVE)) {
	      this.addClass('LEAVE-END');
	    }
	  });
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
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
/* 16 */
/***/ function(module, exports) {

	pl.game.component('selectable-reveal', function () {
	
	  this.respond('select', function (_event) {
	    var index, stateMethod;
	
	    index = _event.message;
	    stateMethod = this.properties.select_state || 'select';
	
	    if (~index) {
	      this[stateMethod](_event.behaviorTarget);
	      this.reveal.item(index);
	    }
	  });
	
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
/* 17 */
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
	
	  this.deselectAll = function () {
	    var items = this.find('li');
	    this.deselect(items);
	    this.unhighlight(items);
	  };
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	pl.game.component('title', function () {});

/***/ },
/* 19 */
/***/ function(module, exports) {

	(function test(_env) {
		if (window.parent === window) {
			window.location.href = 'https://www.changemyworldnow.com/';
		} else {
			document.domain = 'changemyworldnow.com';
		}
	})();

/***/ },
/* 20 */
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