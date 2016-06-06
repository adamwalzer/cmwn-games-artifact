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
	 * Defines the game scope and imports used component behaviors.
	 */
	
	__webpack_require__(2);
	
	// INCLUDE USED COMPONENT BEHAVIORS HERE
	
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
	
	// Sea Turtle game scope.
	// This selects the element `#sea-turtle`.
	//
	pl.game('sea-turtle', function () {
	
	  /**
	   * Make the title screen auto display when its ready.
	   * @override
	   */
	  this.screen('title', function () {
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	  });
	
	  this.screen('video', function () {
	
	    this.on('ui-open', function () {
	      this.video.start();
	    });
	
	    this.on('ui-close', function () {
	      this.video.pause();
	    });
	  });
	
	  this.screen('globe', function () {
	
	    var onClose;
	
	    /**
	     * The reveal component holds the correct/incorrect splash
	     * images. So its responsible for handling the multiple
	     * choice "answer" behavior by displaying the
	     * "correct" or "incorrect" image.
	     */
	    this.respond('answer', function (_event) {
	      var message, playing;
	
	      message = this.reveal[_event.message];
	      playing = this.reveal.audio.playing();
	
	      if (message && !this.reveal.isComplete) {
	        this.reveal.select(message);
	        this.delay('2s', function () {
	          this.reveal.deselect(message);
	        });
	
	        if (playing) playing.stop();
	
	        this.delay('2.5s', function () {
	          if (this.reveal.wellDone.state(this.STATE.SELECTED)) return;
	          this.reveal.item('instruction');
	          this.characters.enable();
	        });
	      }
	    });
	
	    this.STATE.COMPLETE = 'COMPLETE';
	
	    /**
	     * When the screen has initialized, start watching the
	     * background images we collected.
	     */
	    this.on('initialize', function (_event) {
	      if (!this.is(_event.targetScope)) return;
	      this.area = this.find('.area');
	    });
	
	    /**
	     * When the character is droped, reveal the question.
	     */
	    this.respond('drop', function (_event) {
	      var $character, sfx;
	
	      $character = _event.behaviorTarget.parent();
	      sfx = pl.util.resolvePath(this, 'dropzone.audio.sfx.drop');
	
	      this.area.find('div:eq(' + $character.index() + ')').addClass('show active');
	      this.reveal.item($character.index() + 1);
	
	      this.characters.disable();
	      this.deselect(this.reveal.find('img.response'));
	
	      if (sfx) sfx.play();
	    });
	
	    this.respond('missed', function (_event) {
	      _event.behaviorTarget.parent().removeClass('ACTIVE');
	    });
	
	    this.respond('answer', function (_event) {
	      var sfx;
	
	      sfx = pl.util.resolvePath(this, 'audio.sfx.' + _event.message);
	
	      if (sfx) sfx.play();
	
	      if (_event.targetScope.state(this.STATE.COMPLETE)) {
	        this.area.find('div.active').removeClass('active');
	      }
	    });
	
	    this.respond('complete', function (_event) {
	      if (this.reveal.is(_event.targetScope)) {
	        this.reveal.item('wellDone');
	        this.audio.sfx.complete.play();
	      }
	    });
	
	    this.on('ui-close ui-leave', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.area.find('.active').removeClass('show active');
	      if (this.characters.$active) this.characters.$active.removeClass('ACTIVE');
	      this.characters.enable();
	    });
	
	    this.start = function () {
	      // take advantage of the screen's start()
	      this.proto();
	      this.reveal.item(0);
	    };
	
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      if (this.isComplete) {
	        this.deselect(this.dropzone.find('.SELECTED'));
	        this.enable(this.characters.find('.DISABLED'));
	        this.dropzone.find('.show').removeClass('show');
	        this.reveal.item(0);
	      }
	    });
	  });
	
	  this.screen('trash', function () {
	    this.on('ui-close', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      if (this.isComplete) {
	        this.delay('.5s', function () {
	          this.unhighlight(this.find('.' + this.STATE.HIGHLIGHTED));
	        });
	      }
	    });
	  });
	
	  this.screen('jellyfish', function () {
	    this.respond('deselectTarget', function (_event) {
	      if (!this.isComplete && (!this.state(this.STATE.VOICE_OVER) || this.game.demoMode)) {
	        this.screen.requiredQueue.ready(this.reveal.audio.voiceOver[_event.message]);
	      }
	    });
	  });
	
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
	
	  bgVolume: {
	    drop: 0.2,
	    max: 1
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

	pl.game.component('characters', function () {
	  /**
	   * Responds to the "mousedown" event on the capture phase
	   * to prevent propagation of the event.
	   *
	   * This will prevent the draggables inside to not be
	   * draggable when the draggable or the container (this)
	   * has the DISABLED UIState.
	   */
	  function preventDrag(_event) {
	    var $target, isDisabled;
	
	    $target = $(_event.target);
	    isDisabled = [this.state(this.STATE.DISABLED), $target.state(this.STATE.DISABLED)];
	
	    if (~isDisabled.indexOf(true)) {
	      _event.stopPropagation();
	    }
	  }
	
	  this.$active = null;
	
	  this.on('drag-start', function (_event) {
	    (this.$active = _event.state.$draggable.closest('li')).addClass('ACTIVE');
	  });
	
	  this.on('initialize', function () {
	    var eventName = typeof this.$els[0].ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown';
	    // Add a vanilajs event listener attached to the capture event propagation phase.
	    this.listen(eventName, true, preventDrag.bind(this));
	  });
	
	  this.respond('answer', function (_event) {
	    if (_event.message === 'correct') {
	      this.disable(this.$active.removeClass('ACTIVE'));
	    }
	  });
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	pl.game.component('dropzone', function () {
	
	  /**
	   * Handler for a dropzone behavior.
	   * @insatnce
	   */
	  function reportState(_state) {
	    return {
	      state: _state,
	      behaviorTarget: _state.$draggable
	    };
	  }
	
	  this.entity('.area', function () {
	
	    this.cache = null;
	
	    /**
	     * This is the area entities' ability to respond to the "grab" behavior
	     * of a draggable's scope somewhere on `this.screen`.
	     * -------------------
	     * Caches the position and size of the area.
	     */
	    this.respond('grab', function () {
	      this.cache = {
	        position: this.absolutePosition().dec(this.game.absolutePosition()),
	        size: this.size().scale(this.game.transformScale().x)
	      };
	    });
	
	    /**
	     * This is the area entities' ability to respond to the "release" behavior
	     * of a draggable's scope somewhere on `this.screen`.
	     * -------------------
	     * Tests if the location of the drop falls in bounds of the area.
	     * Also validates if our dropzone takes the draggable as defined
	     * by the `pl-take` attribute on the component node.
	     */
	    this.respond('release', function (_event) {
	      if (_event.state.progress.point && this.isPointInBounds(_event.state.progress.point)) {
	        if (this.takes(_event.state.$draggable.id())) {
	          _event.state.$draggable.removeClass('PLUCKED');
	          _event.state.$helper.addClass('DROPED');
	
	          this.drop(_event.state.$draggable);
	
	          return;
	        }
	        this.reject(_event.state);
	      }
	
	      this.missed(_event.state);
	
	      _event.state.$helper.addClass('RETURN');
	    });
	  });
	
	  this.init = function () {
	    this.takes().forEach(this.bind(function (_id) {
	      this.require(_id);
	    }));
	  };
	
	  this.takes = function (_id) {
	    var takes;
	
	    // if no pl-take attribute is defined then
	    // the dropzone will take any draggable.
	    if (!this.properties.take) return _id != null ? true : [];
	
	    takes = this.properties.take.split(/\s+/);
	    return _id != null ? !! ~takes.indexOf(_id) : takes;
	  };
	
	  // expected arguments are _point and _y
	  this.isPointInBounds = function () {
	    var point, scale;
	
	    point = pl.Point.create(arguments);
	    if ((scale = this.game.transformScale().x) !== 1) point = point.scale(1 / scale);
	
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
	
	  this.behavior('drop', function (_$draggable) {
	    if (_$draggable.id()) this.requiredQueue.ready(_$draggable.id());
	
	    return {
	      behaviorTarget: _$draggable
	    };
	  });
	
	  /**
	   * Performed when a draggable is in bounds of the area and
	   * is rejected; or out of bounds of the dropzone area.
	   */
	  this.behavior('missed', reportState);
	
	  /**
	   * Performed when a draggable is droped in bounds of the area but
	   * the component does not "take" it.
	   */
	  this.behavior('reject', reportState);
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	pl.game.component('frame', function () {
	
	  this.start = function () {
	    var voSound;
	
	    if (this.audio) {
	      voSound = this.audio.voiceOver[0];
	
	      this.audio.background.play();
	      if (voSound && !voSound.config('dontautoplay')) voSound.play();
	    }
	
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
/* 7 */
/***/ function(module, exports) {

	pl.game.component('multiple-choice', function () {
	
	  function validateAnswer(_$selected) {
	    var index;
	
	    if (this.properties.correct) {
	      index = _$selected.index();
	
	      if (this.correct.has(index)) {
	        this.correct.ready(index);
	        return true;
	      }
	    } else if (_$selected) {
	      if (_$selected.is('[pl-correct]') && this.correct.has(_$selected[0])) {
	        this.correct.ready(_$selected[0]);
	        return true;
	      }
	    }
	
	    return false;
	  }
	
	  this.correct = null;
	
	  this.handleProperty({
	    correct: function correct(_node) {
	      var answers;
	
	      if (!this.correct) {
	        this.correct = pl.Queue.create();
	        this.correct.on('complete', this.bind(function () {
	          this.complete();
	        }));
	      }
	
	      if (this.is(_node)) {
	        answers = this.properties.correct.split(/\s*,\s*/);
	        answers.forEach(this.bind(function (_index) {
	          this.correct.add(Number(_index));
	        }));
	      } else {
	        this.correct.add(_node);
	      }
	    }
	  });
	
	  this.start = function () {
	    var self = this;
	    this.find('[pl-correct]').each(function (i, _node) {
	      self.correct.add(_node);
	    });
	  };
	
	  this.behavior('answer', function (_$target) {
	    var isCorrect;
	
	    if (this.select(_$target)) {
	      isCorrect = validateAnswer.call(this, _$target);
	    }
	
	    return {
	      message: isCorrect ? 'correct' : 'incorrect',
	      behaviorTarget: _$target
	    };
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('reveal', function () {
	
	  this.items = null;
	
	  this.on('ready', function () {
	    this.items = this.findOwn('li');
	  });
	
	  this.start = function () {};
	
	  this.item = function (_id) {
	    var vo, index;
	
	    if (this.shouldRevealItem(_id) === false) return false;
	
	    if (typeof _id === 'number') {
	      this.select(this.items[_id]);
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
	
	    return this;
	  };
	
	  this.shouldRevealItem = function (_id) {
	    return !!this.items[_id] || !!this[_id];
	  };
	
	  this.behavior('deselectTarget', function (_$target) {
	    if (!this.state(this.STATE.VOICE_OVER) || this.game.demoMode) {
	      this.deselect(_$target);
	    }
	
	    return {
	      message: _$target.index()
	    };
	  });
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.on('ready', function (_e) {
	    var self = this;
	
	    if (!this.is(_e.target)) return;
	
	    if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
	      this.requiredQueue.on('complete', function () {
	        var sfx;
	
	        sfx = pl.util.resolvePath(self, 'game.audio.sfx.screenComplete');
	
	        if (sfx) sfx.play();
	      });
	    }
	  });
	
	  this.next = function () {
	    var nextScreen, buttonSound;
	
	    if (this.hasClass('last') && this.hasClass('COMPLETE')) this.game.quit.okay();
	
	    nextScreen = this.proto();
	    buttonSound = pl.util.resolvePath(this, 'game.audio.sfx.button');
	
	    if (nextScreen) {
	      this.screen.leave();
	      nextScreen.open();
	      if (buttonSound) buttonSound.play();
	    }
	
	    return nextScreen;
	  };
	
	  this.prev = function () {
	    var prevScreen, buttonSound;
	
	    prevScreen = this.proto();
	    buttonSound = this.game.audio.sfx.button;
	
	    if (prevScreen) {
	      this.screen.close();
	      prevScreen.open();
	      if (buttonSound) buttonSound.play();
	    }
	
	    return prevScreen;
	  };
	
	  this.start = function () {
	    this.startAudio();
	
	    this.startEntities();
	
	    return this;
	  };
	
	  this.startEntities = function () {
	    if (this.hasOwnProperty('entities') && this.entities) {
	      this.entities.forEach(function (_node) {
	        if (typeof _node.start === 'function') _node.start();
	      });
	    }
	
	    return false;
	  };
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    if (this.isReady) {
	      this.start();
	    }
	
	    if (!this.isComplete) {
	      if (!this.requiredQueue || this.isMemberSafe('requiredQueue') && !this.requiredQueue.length) {
	        this.complete();
	      }
	    }
	
	    if (this.screen.isLast()) {
	      this.addClass('last');
	    }
	  });
	
	  this.on('ui-close', function (_event) {
	    if (this.isReady && this === _event.targetScope) {
	      this.stop();
	    }
	  });
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
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
	    this.screen.audio.sfx.play();
	    this.game.exit();
	  };
	
	  this.cancel = function () {
	    this.screen.audio.sfx.play();
	    this.leave();
	  };
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	pl.game.component('selectable-all', function () {
	
	  var Column;
	
	  function populateViewport() {
	    var width, i, columns;
	
	    // width of the first item
	    width = this.$bin.outerWidth(true);
	    columns = Math.floor(this.$viewport.width() / width);
	
	    for (i = 0; i < columns; i += 1) {
	      this.columns.push(Column.create().init(this.$bin, this.$viewport));
	    }
	  }
	
	  Column = pl.Basic.extend(function () {
	
	    this.$el = null;
	    this.$collection = null;
	    this.$viewport = null;
	    this.shouldRecycle = true;
	
	    this.init = function (_$collection, _$viewport) {
	      this.$collection = _$collection;
	      this.$viewport = _$viewport;
	      this.$el = $(pl.util.random(_$collection)).clone();
	
	      this.$viewport.append(this.$el);
	
	      return this;
	    };
	
	    this.recycle = function () {
	      var $clone;
	
	      if (!this.shouldRecycle) return;
	
	      $clone = $(pl.util.random(this.$collection)).clone();
	
	      this.$el.replaceWith($clone);
	      this.$el = $clone;
	
	      setTimeout(this.bind(function () {
	        this.launch();
	      }), 0);
	
	      return $clone;
	    };
	
	    this.launch = function () {
	      this.$el.on('transitionend', this.bind(function (_event) {
	        if (!this.$el.is(_event.target)) return;
	
	        if (!this.recycle()) {
	          this.$el.off();
	        }
	      }));
	
	      this.$el.addClass('LAUNCHED');
	    };
	
	    this.bind = function (_fun) {
	      var self = this;
	      return function () {
	        return _fun.apply(self, arguments);
	      };
	    };
	  });
	
	  this.$viewport = null;
	  this.$bin = null;
	  this.columns = null;
	  this.count = 0;
	
	  this.init = function () {
	    this.$viewport = this.find('.viewport');
	    this.$bin = this.find('.bin li');
	    this.columns = [];
	
	    populateViewport.call(this);
	
	    $(window).on('resize', this.restart.bind(this));
	
	    return this;
	  };
	
	  this.start = function () {
	    this.columns.forEach(function (_item) {
	      _item.launch();
	    });
	
	    this.screen.requiredQueue.ready();
	  };
	
	  this.restart = function () {
	    this.columns.forEach(function (_item) {
	      _item.recycle();
	    });
	  };
	
	  this.stop = function () {
	    this.columns.forEach(function (_item) {
	      _item.shouldRecycle = false;
	      _item.$el.removeClass('LAUNCHED').css('transition', 'none');
	    });
	  };
	
	  this.behavior('pick', function (_$target) {
	    var message = this.count;
	
	    if (_$target.attr('pl-correct') == null || !this.game.demoMode && this.screen.state(this.STATE.VOICE_OVER)) return;
	
	    this.screen.requiredQueue.ready(this.count);
	    this.screen.reveal.item(this.count);
	
	    this.audio.sfx.play();
	
	    this.count = (this.count + 1) % 6;
	
	    this.highlight(_$target);
	
	    return {
	      message: message,
	      behaviorTarget: _$target
	    };
	  });
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	pl.game.component('selectable-remove', function () {
	
	  this.behavior('select', function (_target) {
	    var $target;
	    $target = $(this.event.target).closest('li');
	
	    if (this.event && !_target && !$target.hasClass(this.STATE.HIGHLIGHTED)) {
	
	      if (this.shouldSelect($target) !== false) {
	        $target.is('li') && this.audio.sfx.correct.play();
	        return {
	          message: $target.attr('class'),
	          behaviorTarget: $target
	        };
	      } else {
	        this.audio.sfx.incorrect.play();
	      }
	    }
	
	    return false;
	  });
	
	  this.respond('select', function (_event) {
	    var index, stateMethod;
	
	    index = _event.message;
	    stateMethod = this.properties.selectState || 'select';
	
	    if (index) {
	      this[stateMethod](_event.behaviorTarget);
	      this.items.correct.ready(index);
	    }
	  });
	
	  this.shouldSelect = function (_target) {
	    var $target = $(_target);
	    if (!$target.is('[pl-incorrect]')) {
	      return !this.screen.state(this.STATE.VOICE_OVER);
	    }
	
	    return false;
	  };
	
	  this.start = function () {
	    var correct = pl.Queue.create();
	
	    correct.on('complete', this.bind(function () {
	      this.complete();
	    }));
	
	    this.items = this.find('.items li:not([pl-incorrect])').map(function (_index, _node) {
	      correct.add(_node.className);
	      return _node;
	    }).toArray();
	
	    this.items.correct = correct;
	  };
	
	  this.ready = function () {
	    var $net = $('.selectable-remove-component .net');
	
	    this.mousemove(this.bind(function (e) {
	      $net.css({ left: e.clientX / this.game.zoom - 72, top: e.clientY / this.game.zoom - 50 });
	    }));
	  };
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	pl.game.component('title', function () {
	
	  this.start = function () {
	    this.proto();
	    this.showTitle();
	  };
	
	  this.showTitle = function () {
	    this.image.addClass('animated ' + this.image.attr('pl-animation'));
	    this.complete();
	  };
	});

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports) {

	(function test(_env) {
		if (window.parent === window) {
			window.location.href = 'https://www.changemyworldnow.com/';
		} else {
			document.domain = 'changemyworldnow.com';
		}
	})();

/***/ },
/* 16 */
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