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
	
	pl.game('litterbug', function () {
	
	  this.screen('title', function () {
	
	    this.on('ui-open', function (_event) {
	      if (this === _event.targetScope) {
	        this.title.start();
	      }
	    });
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	
	    this.startAudio = function () {
	      this.title.audio.background.play();
	      this.title.audio.voiceOver.play();
	    };
	
	    this.stopAudio = function () {
	      this.title.audio.voiceOver.stop('@ALL');
	    };
	  });
	
	  this.screen('clean-up', function () {
	
	    this.state('incomplete', '-COMPLETE', {
	      didSet: function didSet(_target) {
	        _target.isComplete = false;
	      }
	    });
	
	    this.on('ui-open', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.game.removeClass('sun');
	      this.incomplete(this);
	      this.incomplete(this.slides.trash);
	      this.slides.trash.ready();
	    });
	  });
	
	  this.screen('video', function () {
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	      setTimeout((function () {
	        this.start();
	      }).bind(this), 250);
	    });
	
	    this.on('ui-close', function () {
	      this.video.pause();
	      if (this.game.bgSound) this.game.bgSound.play();
	    });
	  });
	
	  this.screen('flip', function () {
	    this.next = function () {
	      var buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	      if (buttonSound) buttonSound.play();
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

	pl.game.component('frame', function () {
	
	  this.start = function () {
	    var voSound = this.audio.voiceOver[0];
	
	    this.audio.background.play();
	
	    if (voSound && !voSound.config('dontautoplay')) voSound.play();
	    if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();
	
	    return this;
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
/* 5 */
/***/ function(module, exports) {

	pl.game.component('no', function () {
	
	  this.next = function () {
	    var buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.no');
	    if (this.screen.next() && buttonSound) buttonSound.play();
	  };
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
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
	    this.startAudio();
	
	    if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();
	
	    return this;
	  };
	
	  this.startAudio = function () {
	    if (!this.audio) return;
	    if (this.audio.background) {
	      this.game.bgSound = this.audio.background;
	      this.audio.background.play();
	    }
	    this.audio.voiceOver.play();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (this.isReady && this.is(_event.target)) {
	      this.on('transitionend', (function (_e) {
	        if (!this.is(_e.target)) return;
	        this.start();
	        this.off('transitionend');
	      }).bind(this));
	    }
	
	    if (this.properties.gameClass) {
	      this.game.addClass(this.properties.gameClass);
	    }
	
	    if (!this.requiredQueue || this.hasOwnProperty('requiredQueue') && !this.requiredQueue.length) {
	      this.complete();
	    }
	  });
	
	  this.on('ui-leave ui-close', function (_event) {
	    if (this.properties.gameClass) {
	      this.game.removeClass(this.properties.gameClass);
	    }
	
	    if (this.isReady && this.is(_event.target)) {
	      this.stop();
	    }
	  });
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (this.state(this.STATE.OPEN)) this.start();
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
	  // TODO: Make an automated way to handle this
	  this.on('transitionend', function () {
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
	    this.game.removeClass('QUIT-SCREEN');
	    this.game.resume();
	  });
	
	  this.init = function () {
	    this.addClass('LEAVE LEAVE-END');
	  };
	
	  this.okay = function () {
	    this.game.exit();
	  };
	
	  this.cancel = function () {
	    this.leave();
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('selectable-remove', function () {
	
	  this.behavior('select', function (_target) {
	    var $target, stateMethod;
	
	    if (this.event && !_target) {
	      $target = $(this.event.target).closest('li');
	
	      if (this.shouldSelect($target) !== false) {
	
	        if ($target.is('li')) {
	          this.audio.sfx.correct.play();
	          stateMethod = this.properties.selectState || 'select';
	          this[stateMethod]($target);
	          this.items.correct.ready($target.index());
	        }
	
	        return {
	          message: $target.index(),
	          behaviorTarget: $target
	        };
	      } else {
	        if (this.audio.sfx.incorrect) this.audio.sfx.incorrect.play();
	      }
	    } else {
	      this.proto(_target);
	    }
	
	    return false;
	  });
	
	  this.shouldSelect = function (_target) {
	    var $target = $(_target);
	    if (!$target.hasClass(this.STATE.HIGHLIGHTED) && !$target.is('[pl-incorrect]')) {
	      return this.screen.allowAction();
	    }
	
	    return false;
	  };
	
	  this.ready = function () {
	    var correct;
	
	    correct = pl.Queue.create();
	
	    correct.on('complete', this.bind(function () {
	      this.complete();
	      this.game.addClass('sun');
	    }));
	
	    this.$items = this.find('.items li:not([pl-incorrect])');
	    this.unhighlight(this.$items);
	
	    this.items = this.$items.map(function (_index, _node) {
	      correct.add(_index);
	      return _node;
	    }).toArray();
	
	    this.items.correct = correct;
	  };
	});

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	pl.game.component('title', function () {
	
	  this.ready = function () {
	    this.open();
	    if (this.audio.background[0]) {
	      this.audio.background[0].play();
	    } else if (this.audio.background) {
	      this.audio.background.play();
	    }
	    this.delay(1500, function () {
	      this.image.addClass('animated ' + (this.image.attr('pl-animation') || ''));
	      this.complete();
	    });
	  };
	});

/***/ },
/* 11 */
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
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	(function test(_env) {
		if (window.parent === window) {
			window.location.href = 'https://www.changemyworldnow.com/';
		} else {
			document.domain = 'changemyworldnow.com';
		}
	})();

/***/ },
/* 13 */
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