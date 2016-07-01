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
	 * Defines the game scope and imports used component behaviors.
	 */
	
	__webpack_require__(2);
	
	// SCREENS
	
	var _screensInfoQuestion = __webpack_require__(3);
	
	var _screensInfoQuestion2 = _interopRequireDefault(_screensInfoQuestion);
	
	var _screensFlushIt = __webpack_require__(4);
	
	var _screensFlushIt2 = _interopRequireDefault(_screensFlushIt);
	
	// INCLUDE USED COMPONENT BEHAVIORS HERE
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	__webpack_require__(9);
	
	__webpack_require__(10);
	
	__webpack_require__(11);
	
	__webpack_require__(12);
	
	__webpack_require__(13);
	
	/**
	 * Define the game behavior.
	 * Here we define all the screen behaviors.
	 */
	pl.game('twirl-n-swirl', function () {
	  /**
	   * Interface for changing the game background image.
	   */
	  this.setWallpaper = function (_paper) {
	    // I would have defined a state method for this but for some reason
	    // I didnt make Game objects inherit from Entities.
	    if (_paper) this.removeClass('DEFAULT TITLE PLANT').addClass(_paper.toUpperCase());
	  };
	
	  // Define Screen Behaviors
	  this.screen('info-question', _screensInfoQuestion2['default']);
	  this.screen('flush-it', _screensFlushIt2['default']);
	  /**
	   * Adds Flip screen behavior to send game completion to GA.
	   */
	  this.screen('flip', function () {
	    /**
	     * @override
	     */
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
	
	    this.next = function () {
	      this.game.quit.okay();
	    };
	  });
	
	  /**
	   * When the game exits submit a GA (Google Analytics) event.
	   * @override
	   */
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
	  screenSelector: 'section',
	  componentDirectory: 'components/',
	
	  dimensions: {
	    width: 960,
	    ratio: 16 / 9
	  },
	
	  bgVolume: {
	    drop: 0.2,
	    max: 1
	  },
	
	  shouldLoadComponentStyles: false
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = infoQuestion;
	
	function infoQuestion() {
	  /**
	   * Plays the flush sound with a delay.
	   * I may want move this to the screen component.
	   * @todo Create a mechanism to attach sounds to actions.
	   */
	  this.next = function () {
	    var nextScreen, so;
	
	    if (!this.completed()) return;
	
	    nextScreen = this.sup();
	    so = pl.util.resolvePath(this, 'game.audio.sfx.flush');
	
	    if (so) so.play();
	
	    this.delay('2s', function () {
	      this.leave();
	      nextScreen.open();
	    });
	
	    return nextScreen;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = flushIt;
	/**
	 * Twirl n Swirl - Toilet Flush Game
	 */
	
	function flushIt() {
	  /**
	   * Adds an ability for the screen to respond to items dropped in the
	   * toilet bowl. Its responsibility is to show the reveal via the
	   * dropped item's ID and disable draggable bins.
	   */
	  this.respond('drop', function (_event) {
	    var id = _event.behaviorTarget.id();
	
	    this.toilet.addClass('FLUSH').reveal.item(id).find('.FLUSH').removeClass('FLUSH');
	    $('.draggables [pl-id=' + id + ']').addClass('TOILET');
	    this.disable('.draggables');
	  });
	  /**
	   * Show the instructional modal when the screen starts.
	   */
	  this.start = function () {
	    this.modalReveal.item(0);
	  };
	  /**
	   * The flush button action.
	   * Here we animate the dropped item flushing and display the modal
	   * by the item's ID.
	   */
	  this.flush = function () {
	    var current = this.reveal.currentItem();
	
	    this.game.audio.sfx.flush.play();
	
	    if (!current) return;
	
	    this.toilet.removeClass('FLUSH');
	    current.addClass('FLUSH');
	
	    this.game.audio.sfx.flush.off('ended').on('ended', (function () {
	      if (this.screen.state(this.screen.STATE.OPEN)) this.modalReveal.item(current.id());
	    }).bind(this));
	  };
	
	  this.on('ui-close', function () {
	    this.game.audio.sfx.flush.off('ended');
	  });
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	    this.find('.TOILET').removeClass('TOILET');
	    this.deselect(this.toilet.reveal.find('.SELECTED'));
	
	    if (this.isComplete) this.find('.DISABLED').removeClass('DISABLED');
	  });
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

	pl.game.component('dropzone', function () {
	
	  function deQ(_id) {
	    if (this.requiredQueue && this.isMemberSafe('requiredQueue') && this.requiredQueue.has(_id)) {
	      return this.requiredQueue.ready(_id);
	    }
	  }
	
	  this.entity('.area', function () {
	
	    this.cache = null;
	
	    this.respond('grab', function () {
	      var sfx = this.audio.sfx.drag;
	
	      if (sfx) sfx.play();
	
	      this.cache = {
	        position: this.absolutePosition().dec(this.game.absolutePosition()),
	        size: this.size()
	      };
	    });
	
	    this.respond('release', function (_event) {
	      var point, scale, sfx;
	
	      sfx = {
	        correct: this.audio.sfx.correct,
	        incorrect: this.audio.sfx.incorrect,
	        drop: this.audio.sfx.drop
	      };
	
	      if ((scale = this.game.transformScale().x) !== 1) {
	        point = [_event.state.start.point[0] + scale * _event.state.progress.distance[0], _event.state.start.point[1] + scale * _event.state.progress.distance[1]];
	      } else {
	        point = _event.state.progress.point;
	      }
	
	      if (point && this.isPointInBounds(point)) {
	        if (this.takes(_event.state.$draggable.id())) {
	          _event.state.$draggable.removeClass('PLUCKED');
	          _event.state.$helper.addClass('DROPED');
	
	          this.drop(_event.state.$draggable);
	
	          if (sfx.correct) sfx.correct.play();
	
	          return;
	        } else if (sfx.incorrect) {
	          sfx.incorrect.play();
	        }
	
	        if (sfx.drop) sfx.drop.play();
	      }
	
	      _event.state.$helper.addClass('RETURN');
	    });
	  });
	
	  this.on('initialize', function () {
	    this.takes().forEach(this.bind(function (_id) {
	      this.require(_id);
	    }));
	  });
	
	  this.takes = function (_id) {
	    var takes = this.properties.take;
	    // if no pl-take attribute is defined then
	    // the dropzone will take any draggable.
	    if (!takes) return _id != null ? true : [];
	
	    return arguments.length ? !! ~takes.indexOf(_id) : takes;
	  };
	
	  // expected arguments are _point and _y
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
	    var sfx = pl.util.resolvePath(this, 'audio.sfx.drop');
	
	    if (sfx) sfx.play();
	
	    deQ.call(this, _$thing.id());
	
	    return {
	      behaviorTarget: _$thing
	    };
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Adds behavior to the reveal modal.
	 * @todo Create a modal component which handles its layering.
	 */
	pl.game.component('modal', function () {
	
	  /**
	   * Expose reveal component method
	   */
	  this.item = function (_id) {
	    this.removeClass('LAYER').open();
	    this.reveal.item(_id);
	  };
	  /**
	   * Close the modal and play the standard button sound.
	   * @override
	   */
	  this.close = function () {
	    var so = pl.util.resolvePath(this, 'game.audio.sfx.button');
	
	    if (this.screen.state(this.STATE.VOICE_OVER) && !this.screen.completed()) return;
	    if (so) so.play();
	
	    this.screen.enable('.draggables');
	    this.disable($('.draggables [pl-id=' + this.find('li.SELECTED').id() + ']'));
	
	    return this.sup();
	  };
	  /**
	   * Watches for completion of state change tranisions and puts the view in a LAYER state.
	   * We want to re-layer the view after it finishes transitioning out.
	   * @see ~/source/css/flush-it.scss:134
	   */
	  this.on('transitionend', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (!this.state(this.STATE.OPEN)) {
	      this.addClass('LAYER').removeClass('PROGRESS');
	    } else {
	      this.addClass('PROGRESS');
	    }
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('reveal', function () {
	
	  this.items = null;
	  this.currentAudio = null;
	
	  this.on('ready', function () {
	    this.items = this.findOwn('li');
	  });
	
	  this.item = function (_id) {
	    var vo, index;
	
	    if (this.shouldRevealItem(_id) === false) return false;
	
	    if (typeof _id === 'number') {
	      this.select(this.items[_id]);
	      this.audio.voiceOver[_id].play();
	      this.currentAudio = this.audio.voiceOver[_id];
	    } else if (typeof _id === 'string') {
	      if (this[_id]) {
	        this.select(this[_id]);
	
	        if (this.audio && this.audio.voiceOver) {
	          index = this[_id].index();
	          vo = this.audio.voiceOver[_id] || this.audio.voiceOver[index];
	        }
	      } else {
	        this.select(_id);
	
	        index = this.findOwn(_id).index();
	        vo = pl.util.resolvePath(this, 'audio.voiceOver[' + index + ']');
	      }
	
	      if (vo) (this.currentAudio = vo).play();
	    }
	
	    return this;
	  };
	
	  this.shouldRevealItem = function () {
	    return true;
	  };
	
	  this.currentItem = function () {
	    return this.findOwn('li.SELECTED');
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  function playButtonSFX(_direction) {
	    var so = _direction === 'next' ? pl.util.resolvePath(this, 'this.audio.sfx.nextScreen') : pl.util.resolvePath(this, 'this.game.audio.sfx.nextScreen');
	    if (so) so.play();
	  }
	
	  this.playSound = function (_sound) {
	
	    if (_sound.type === 'voiceOver') {
	      this.currentVO = _sound;
	    }
	
	    return _sound.play();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (this.is(_event.target) && this.isReady) {
	      this.game.setWallpaper(this.properties.wallpaper);
	      this.start();
	      if (this.completed() && !this.isComplete && !this.game.demoMode) this.complete();
	    }
	  });
	
	  this.on('ui-leave', function (_event) {
	    if (this.is(_event.target)) this.stop();
	  });
	
	  this.on('ui-close', function (_event) {
	    if (this.is(_event.target)) this.stop();
	  });
	
	  this.next = function () {
	    var nextScreen, isLastScreen;
	
	    nextScreen = this.proto();
	    isLastScreen = this.game.screens.length - 1 === this.index();
	
	    if (nextScreen) {
	      this.screen.leave();
	      nextScreen.open();
	      playButtonSFX.call(this, 'next');
	    } else if (isLastScreen && this.completed()) {
	      this.game.quit.okay();
	    }
	
	    return nextScreen;
	  };
	
	  this.prev = function () {
	    var prevScreen;
	
	    prevScreen = this.proto();
	
	    if (prevScreen) {
	      this.screen.close();
	      prevScreen.open();
	      playButtonSFX.call(this, 'prev');
	    }
	
	    return prevScreen;
	  };
	
	  this.start = function () {
	    var bgSound, voSound, fxSound;
	
	    bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
	    voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');
	    fxSound = pl.util.resolvePath(this, 'audio.sfx.start');
	
	    if (bgSound) bgSound.play();
	    if (fxSound) fxSound.play();
	    if (voSound) this.playSound(voSound);
	
	    if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();
	
	    return this;
	  };
	
	  this.stop = function () {
	    if (this.currentVO) {
	      this.currentVO.stop();
	    }
	
	    return this;
	  };
	
	  this.complete = function () {
	    this.game.audio.sfx.screenComplete.play();
	    return this.proto();
	  };
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
	  function playButtonSFX(_direction) {
	    var so;
	
	    if (_direction === 'next') {
	      so = pl.util.resolvePath(this, 'audio.sfx.nextScreen');
	    }
	
	    if (!so) {
	      so = pl.util.resolvePath(this, 'game.audio.sfx.button');
	    }
	    if (so) so.play();
	  }
	
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
	    this.game.removeClass('QUIT-SCREEN');
	    this.game.resume();
	  });
	
	  this.okay = function () {
	    playButtonSFX.call(this);
	    this.game.exit();
	  };
	
	  this.cancel = function () {
	    playButtonSFX.call(this);
	    this.leave();
	  };
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	pl.game.component('screen-title', function () {
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	  });
	
	  /**
	   * Start the title screen logo animation when the screen opens.
	   */
	  this.on('ui-open', function () {
	    var delay = this.properties.delay;
	
	    if (delay) {
	      this.delay(this.properties.delay, this.animateSplashImage);
	    } else {
	      this.animateSplashImage();
	    }
	
	    this.start();
	    this.game.setWallpaper(this.properties.wallpaper);
	
	    return this;
	  });
	
	  this.on('ui-close', function (_event) {
	    if (!this.is(_event.target)) return;
	    this.on('transitionend', function (_e) {
	      if (!this.is(_e.target)) return;
	      this.logo.removeClass(this.properties.animOut).off('animationend');
	      this.off('transitionend');
	    });
	  });
	
	  this.start = function () {
	    var bgSound, voSound, fxSound;
	
	    bgSound = pl.util.resolvePath(this, 'audio.background[0]?');
	    voSound = pl.util.resolvePath(this, 'audio.voiceOver[0]?');
	    fxSound = pl.util.resolvePath(this, 'audio.sfx.start');
	
	    if (bgSound) bgSound.play();
	    if (fxSound) fxSound.play();
	    if (voSound) voSound.play();
	
	    if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();
	
	    return this;
	  };
	
	  this.next = function () {
	    var nextScreen, so, animate;
	
	    function leave() {
	      this.screen.leave();
	      nextScreen.open();
	    }
	
	    nextScreen = this.proto();
	    so = pl.util.resolvePath(this, 'audio.sfx.nextScreen');
	    animate = this.properties.animOut || '';
	
	    if (!so) {
	      so = pl.util.resolvePath(this, 'game.audio.sfx.button');
	    }
	
	    if (nextScreen) {
	      if (animate) {
	        this.logo.on('animationend', leave.bind(this)).addClass(animate);
	      } else {
	        leave.call(this);
	      }
	
	      if (so) so.play();
	    }
	
	    return nextScreen;
	  };
	
	  this.animateSplashImage = function () {
	    this.logo.addClass('animated ' + (this.properties.anim || ''));
	    this.complete();
	    return this;
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