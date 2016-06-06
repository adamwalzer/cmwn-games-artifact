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
	
	// SCREENS
	
	// COMPONENTS
	
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
	
	pl.game('tag-it', function () {
	
	  var audioClasses, audioScreens, k;
	
	  this.changeWallpaper = function (wallpaper) {
	    this.removeClass('PRECIOUS RECYCLE STEPS SCISSORS SPREAD').addClass(wallpaper);
	  };
	
	  audioClasses = function () {
	    var classes = '';
	
	    this.on('audio-play', function (_event) {
	      var id = _event.target.$el[0].id;
	      id = id ? id.toUpperCase() : false;
	      classes += id + ' ';
	      this.addClass(id);
	    });
	
	    this.on('ui-close', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.removeClass(classes);
	      classes = '';
	    });
	  };
	
	  audioScreens = ['step-1', 'step-2', 'what-need'];
	
	  for (k in audioScreens) {
	    this.screen(audioScreens[k], audioClasses);
	  }
	
	  this.screen('what-faucet', function () {
	    audioClasses.call(this);
	
	    this.respond('select', function (_event) {
	      this.playSound(this.audio.sfx);
	      this.select(_event.behaviorTarget);
	    });
	  });
	
	  this.screen('tips', function () {
	    var classes = '';
	
	    this.on('audio-play', function (_event) {
	      var id = _event.target.$el[0].id;
	      if (id === 'answer') return;
	      id = id ? id.toUpperCase() : false;
	      classes += id + ' ';
	      this.addClass(id);
	      if (id) this.playSound(this.audio.sfx.answer);
	    });
	
	    this.on('ui-close', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.removeClass(classes);
	      classes = '';
	    });
	  });
	
	  this.screen('flip', function () {
	    audioClasses.call(this);
	
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
	      var vo;
	
	      vo = this.audio.voiceOver.sure;
	      if (vo) vo.play();
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
	
	    sounds = this.find('> audio').toArray();
	
	    this.audio.on('ended', (function () {
	      var next = sounds[i++];
	      if (next && this.screen.state(this.screen.STATE.OPEN)) this.screen.playSound($(next).data('context'));
	    }).bind(this));
	  });
	
	  this.start = function () {
	    i = 1;
	    if (sounds[0] && this.screen.state(this.screen.STATE.OPEN)) this.screen.playSound($(sounds[0]).data('context'));
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
	    if (voSound) this.screen.playSound(voSound);
	
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
	
	  this.on('ready', function () {
	    if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
	      this.requiredQueue.on('complete', this.bind(function () {
	        var sfx;
	
	        sfx = pl.util.resolvePath(this, 'audio.sfx.screenComplete') || pl.util.resolvePath(this, 'screen.audio.sfx.screenComplete') || pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	
	        if (sfx) this.playSound(sfx);
	      }));
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
	
	  this.close = function () {
	    if (!this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode) {
	      this.deselect(this);
	    }
	  };
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
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	  this.currentVO = null;
	
	  this.allowAction = function () {
	    return this.screen.state(this.screen.STATE.OPEN) && !this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode;
	  };
	
	  this.playSound = function (_sound) {
	    var delay;
	
	    delay = $(_sound.media).attr('pl-start');
	
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
	
	    if (typeof this.properties.wallpaper !== 'undefined') {
	      this.game.changeWallpaper(this.properties.wallpaper);
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
/* 11 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
	  this.buttonSound = function () {
	    if (this.audio.sfx.button) this.audio.sfx.button.play();
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
/* 12 */
/***/ function(module, exports) {

	pl.game.component('screen-title', function () {
	
	  this.playSound = function (_sound) {
	    var delay;
	
	    delay = $(_sound).attr('pl-delay');
	
	    if ($(_sound).hasClass('voice-over')) {
	      this.currentVO = _sound;
	    }
	
	    if (delay) {
	      return this.delay(delay, _sound.play.bind(_sound));
	    } else {
	      return _sound.play();
	    }
	  };
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	
	    if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
	      this.requiredQueue.on('complete', this.bind(function () {
	        var sfx;
	
	        sfx = pl.util.resolvePath(this, 'screen.audio.sfx.screenComplete') || pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	
	        if (sfx) this.playSound(sfx);
	      }));
	    }
	  });
	
	  /**
	   * Start the title screen logo animation when the screen opens.
	   */
	  this.on('ui-open', function () {
	    var so;
	
	    if (typeof this.properties.wallpaper !== 'undefined') {
	      this.game.changeWallpaper(this.properties.wallpaper);
	    }
	
	    so = pl.util.resolvePath(this, 'audio.background[0]?');
	
	    if (so) so.play();
	
	    return this;
	  });
	
	  this.on('ui-close', function (_event) {
	    if (!this.is(_event.target)) return;
	    this.on('transitionend', function (_e) {
	      if (!this.is(_e.target)) return;
	    });
	  });
	
	  this.next = function () {
	    var nextScreen, buttonSound;
	
	    nextScreen = this.proto();
	    buttonSound = pl.util.resolvePath(this, 'audio.sfx.button') || pl.util.resolvePath(this, 'game.audio.sfx.button');
	
	    if (nextScreen) {
	      this.leave();
	      nextScreen.open();
	      if (buttonSound) buttonSound.play();
	    }
	
	    return nextScreen;
	  };
	});

/***/ },
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ function(module, exports) {

	pl.game.component('slides', function () {
	
	  this.slides = null;
	
	  this.ready = function () {
	    this.slides = this.find('> div').scope();
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
	
	    if (~index) nextSlide = this.slides[index + 1];
	
	    if (nextSlide) {
	      this.leave();
	      nextSlide.open();
	
	      if (buttonSound) buttonSound.play();
	
	      return nextSlide;
	    } else {
	      return this.screen.next();
	    }
	  };
	
	  /*
	   * @this {frame-component-scope} called by the next button in a frame component.
	   */
	  this.prev = function () {
	    var index, prevSlide, buttonSound;
	
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	    index = this.slides.indexOf(this);
	
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