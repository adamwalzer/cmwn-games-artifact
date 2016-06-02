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
	
	pl.game('happy-fish-face', function () {
	
	  var self = this;
	
	  pl.game.attachScreen = function (cb) {
	    cb.call(self);
	  };
	
	  var garbage = function garbage() {
	    this.on('ui-open', function () {
	      this.game.addClass('garbage');
	    });
	
	    this.on('ui-close ui-leave', function () {
	      this.game.removeClass('garbage');
	    });
	  };
	
	  this.screen('title', function () {
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	
	    this.entity('.fish', function () {
	      this.on('animationend', function (_event) {
	        if (!this.is(_event.target) || !this.screen.allowAction()) return;
	        this.complete();
	      });
	    });
	  });
	
	  this.screen('you-feel', function () {
	    garbage.call(this);
	
	    this.respond('select', function (_event) {
	      var id, stateMethod;
	
	      id = _event.message;
	      stateMethod = this.properties.selectState || 'select';
	
	      if (id != null) {
	        this.audio.sfx.stop('@ALL');
	        this.audio.sfx.play(id);
	        this[stateMethod](_event.behaviorTarget);
	        this.delay('2s', function () {
	          this.requiredQueue.ready('select');
	        });
	      }
	    });
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.require('select');
	    });
	
	    this.on('ui-open', function () {
	      this.deselect(this.find('.SELECTED'));
	    });
	  });
	
	  this.screen('water-pollution', garbage);
	
	  this.screen('healthy-water', function () {
	    this.on('ui-open', function () {
	      this.game.addClass('garbage');
	    });
	
	    this.on('ui-close ui-leave', function () {
	      this.game.removeClass('garbage');
	    });
	
	    this.on('ui-open', function () {
	      this.deselect(this.find('.SELECTED'));
	    });
	  });
	
	  this.screen('clean-water', garbage);
	
	  this.screen('multi-bubbles', function () {
	    this.SELECTER = {
	      CORRECT: '[pl-correct]'
	    };
	
	    this.respond('select', function (_event) {
	      if (_event.behaviorTarget.hasClass('HIGHLIGHTED')) return;
	      if (~this.items.correct.indexOf(_event.message)) {
	        this.audio.voiceOver.play(_event.message);
	        this.highlight(_event.behaviorTarget);
	        this.score.up(10);
	        this.items.correct.ready(_event.message);
	      } else {
	        this.score.down(10);
	        this.audio.sfx.incorrect.play();
	      }
	    });
	
	    this.on('ui-open', function (_e) {
	      var correct;
	
	      if (!this.is(_e.target)) return;
	
	      if (this.isComplete) {
	        this.unhighlight(this.find('.' + this.STATE.HIGHLIGHTED));
	        this.start();
	      }
	
	      if (!this.items) {
	        correct = pl.Queue.create();
	
	        correct.on('complete', this.bind(function () {
	          this.game.audio.sfx.screenComplete.play();
	          this.complete();
	        }));
	
	        this.items = this.find(this.SELECTER.CORRECT).map(function (_index, _node) {
	          correct.add($(_node).id());
	          return _node;
	        }).toArray();
	
	        this.items.correct = correct;
	      }
	    });
	  });
	
	  this.screen('trash', function () {
	    this.SELECTOR = {
	      CORRECT: '[pl-correct]'
	    };
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      this.on('touchstart', (function () {
	        this.addClass('TOUCH');
	      }).bind(this));
	    });
	
	    this.setup = function () {
	      var correct = pl.Queue.create();
	
	      correct.on('complete', this.bind(function () {
	        this.timer.stop();
	        this.modal.item('goodJob');
	        this.addClass('GOOD-JOB');
	      }));
	
	      this.items = this.$items.map(function (_index, _node) {
	        correct.add($(_node).id());
	        return _node;
	      }).toArray();
	
	      this.unhighlight(this.$items);
	
	      this.items.correct = correct;
	
	      this.removeClass('TRY-AGAIN GOOD-JOB');
	    };
	
	    this.reset = function () {
	      this.setup();
	      this.deselect(this.modal);
	      this.timer.restart();
	    };
	
	    this.respond('select', function (_event) {
	      if (~this.items.correct.indexOf(_event.message)) {
	        this.audio.sfx.correct.play();
	        this.highlight(_event.behaviorTarget);
	        this.items.correct.ready(_event.message);
	      } else {
	        this.audio.sfx.incorrect.play();
	      }
	    });
	
	    this.respond('timerComplete', function () {
	      this.addClass('TRY-AGAIN').modal.item('tryAgain');
	    });
	
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      if (this.modal.state(this.STATE.SELECTED)) {
	        this.reset();
	      }
	
	      if (!this.$net) {
	        this.$net = this.find('.net');
	
	        this.mousemove((function (e) {
	          this.$net.css({ left: e.clientX / this.game.zoom - 50, top: e.clientY / this.game.zoom - 65 });
	        }).bind(this));
	      }
	
	      if (!this.$items) {
	        this.$items = this.find(this.SELECTOR.CORRECT);
	        this.setup();
	      }
	
	      this.modal.reveal.audio.voiceOver.on('ended', (function (_e) {
	        if (this.screen.state(this.STATE.OPEN)) {
	          if (_e.target.id() === 'goodJob') this.audio.voiceOver.neverThrow.play();
	        }
	      }).bind(this.modal.reveal));
	    });
	
	    this.on('ui-leave ui-close', function () {
	      this.modal.reveal.audio.voiceOver.off('ended');
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
	      if (next && this.screen.state(this.screen.STATE.OPEN)) next.play();
	    }).bind(this));
	  });
	
	  this.start = function () {
	    i = 1;
	    if (sounds[0]) sounds[0].play();
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	pl.game.component('bubbles', function () {});

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
	
	  this.validateAnswer = function () {
	    var answers;
	
	    if (this.properties.correct) {
	      answers = this.properties.correct.split(/\s*,\s*/);
	
	      if (~answers.indexOf(String(this.getSelected().id()))) {
	        this.audio.sfx.play('correct');
	        this.complete();
	      } else {
	        this.audio.sfx.play('incorrect');
	      }
	    }
	
	    return false;
	  };
	
	  this.answer = function () {
	    var $li;
	
	    if (this.event) {
	      $li = $(this.event.target).closest('li');
	
	      if (this.select($li)) {
	        this.validateAnswer();
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
	  var _this = this;
	
	  this.value = 0;
	
	  this.entity('board', function () {
	
	    this.template = null;
	    this.images = null;
	
	    this.ready = function () {
	      this.template = this.counter.html();
	      this.images = this.find('img');
	    };
	
	    this.render = function () {
	      var image;
	
	      if (this.images.length) {
	        image = this.images[this.value];
	        this.select(image);
	      }
	
	      this.counter.html(this.template.replace('{{score}}', this.value));
	
	      return this;
	    };
	  });
	
	  this.start = function () {
	    _this.value = 0;
	    _this.board.render();
	  };
	
	  this.ready = function () {
	    this.board.render();
	  };
	
	  this.up = function (_count) {
	    this.value += _count || 1;
	
	    this.board.render();
	
	    if (this.value >= this.properties.max) {
	      this.complete();
	    }
	
	    return this;
	  };
	
	  this.down = function (_count) {
	    this.value -= _count || 1;
	
	    this.board.render();
	
	    if (this.value >= this.properties.max) {
	      this.complete();
	    }
	
	    return this;
	  };
	
	  this.state('incomplete', '-COMPLETE', {
	    willSet: function willSet() {
	      this.isComplete = false;
	
	      if (this.value >= this.properties.max) {
	        this.value = this.properties.max - 1;
	      }
	    }
	  });
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.on('ready', function (_event) {
	    if (this.is(_event.target) && this.audio) {
	      this.audio.rule('.voiceOver', 'shouldPlay', function (_e) {
	        _e.response(!_e.target.config('dontautoplay'));
	      });
	    }
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
	
	  this.stopAudio = function () {
	    if (!this.audio) return;
	    this.audio.voiceOver.stop('@ALL');
	    this.audio.sfx.stop('@ALL');
	  };
	
	  this.complete = function () {
	    if (!this.isComplete) this.game.audio.sfx.screenComplete.play();
	    return this.proto();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (this.is(_event.target)) {
	      if (this.isReady) this.start();
	
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
/* 11 */
/***/ function(module, exports) {

	pl.game.component('screen-quit', function () {
	
	  this.buttonSound = function () {
	    if (this.game.audio.sfx.button) this.game.audio.sfx.button.play();
	  };
	
	  // TODO: Make an automated way to handle this
	  this.on('transitionend', function () {
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
/* 13 */
/***/ function(module, exports) {

	pl.game.component('selectable', function () {
	
	  this.behavior('select', function (_target) {
	    var $target, message;
	
	    if (this.event) {
	      $target = $(this.event.target).closest('li');
	      message = $target.id() || $target.index();
	
	      if (this.shouldSelect($target) !== false) {
	        return {
	          message: message,
	          behaviorTarget: $target
	        };
	      }
	    } else {
	      this.proto(_target);
	    }
	
	    return false;
	  });
	
	  this.shouldSelect = function (_$target) {
	    return this.screen.allowAction() && _$target.is('li');
	  };
	
	  this.deselectAll = function () {
	    var items = this.find('li');
	    this.deselect(items);
	    this.unhighlight(items);
	  };
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	pl.game.component('timer', function () {
	
	  function testTime() {
	    var time;
	
	    time = Date.now();
	
	    if (time >= this.stamp) {
	      this.stamp = time + 1000;
	      this.time += 1;
	
	      this.render();
	
	      if (this.time * 1000 >= this.timeout) {
	        this.timerComplete();
	      }
	    }
	  }
	
	  this.timeout = 0;
	  this.time = 0;
	  this.stamp = 0;
	  this.countDown = false;
	
	  this.behavior('timerComplete', function () {
	    this.stop().complete();
	  });
	
	  this.init = function () {
	    this.timeout = pl.util.toMillisec(this.properties.set);
	    return this;
	  };
	
	  this.ready = function () {
	    this.screen.on('ui-open', this.bind(function () {
	      this.start();
	    }));
	    return this;
	  };
	
	  this.start = function () {
	    this.eachFrame(testTime);
	    return this;
	  };
	
	  this.restart = function () {
	    this.time = 0;
	    this.stamp = 0;
	    this.start();
	    return this;
	  };
	
	  this.stop = function () {
	    this.eachFrame(testTime, false);
	    return this;
	  };
	
	  this.pause = this.stop;
	
	  this.resume = this.start;
	
	  this.render = function () {
	    this.stopWatch.text(this.countDown ? this.timeout / 1000 - this.time : this.time);
	    return this;
	  };
	
	  this.handleProperty({
	    'countdown': function countdown(_node, _name, _value) {
	      if (this.is(_node)) {
	        this.countDown = _value === 'true' ? true : false;
	      }
	    }
	  });
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