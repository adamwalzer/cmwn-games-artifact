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
	
	pl.game('meerkat-mania', function () {
	
	  var videoScreen = function videoScreen() {
	    this.on('ui-open', function () {
	      setTimeout((function () {
	        this.video.start();
	      }).bind(this), 250);
	    });
	
	    this.on('ui-close', function () {
	      this.video.pause();
	      if (this.game.bgSound) this.game.bgSound.play();
	    });
	  };
	
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
	
	  this.screen('roles', function () {
	
	    this.respond('select', function (_event) {
	      var index = _event.message;
	
	      if (Number.isInteger(index) && ~index) {
	        this.highlight(_event.behaviorTarget);
	        this.selectableCanvas.activate(_event.behaviorTarget);
	        this.reveal.item(index);
	        // if(this.audio.sfx.correct) this.audio.sfx.correct.play();
	      }
	    });
	
	    this.respond('closeAll', function (didClose) {
	      if (didClose) this.selectableCanvas.deactivateAll();
	    });
	
	    this.start = function () {
	      this.selectableCanvas.deactivateAll();
	      this.selectableCanvas.unhighlightAll();
	      this.reveal.item(6);
	    };
	  });
	
	  this.screen('video', videoScreen);
	  this.screen('video-2', videoScreen);
	
	  this.screen('feel', function () {
	
	    this.on('ui-open', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      this.selectable.audio.voiceOver.on('ended', (function () {
	        this.complete();
	      }).bind(this.selectable));
	    });
	
	    this.on('ui-close ui-leave', function () {
	      this.selectable.audio.voiceOver.off('ended');
	    });
	
	    this.respond('select', function (_event) {
	      var index, stateMethod;
	
	      index = _event.message;
	      stateMethod = this.properties.selectState || 'select';
	
	      if (~index) {
	        this[stateMethod](_event.behaviorTarget);
	        this.audio.sfx.play('correct');
	        this.selectable.audio.voiceOver.play(index);
	      }
	    });
	  });
	
	  /**
	   * Adds Flip screen behavior to send game completion to GA.
	   */
	  this.screen('flip', function () {
	    this.next = function () {
	      this.game.quit.okay();
	    };
	
	    this.on('ui-open', function () {
	      this.delay('4.5s', function () {
	        if (this.audio.sfx.flip && this.state(this.STATE.OPEN)) this.audio.sfx.flip.play();
	      });
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

	pl.game.component('reveal', function () {
	
	  this.item = function (_id) {
	    var vo, index;
	
	    this.close(this.find('li.OPEN'));
	
	    if (typeof _id === 'number') {
	      this.open(this.find('li').eq(_id));
	      this.screen.currentVO = this.audio.voiceOver[_id];
	      this.audio.voiceOver[_id].play();
	    } else if (typeof _id === 'string') {
	      if (this[_id]) {
	        this.open(this[_id]);
	
	        if (this.audio) {
	          index = this[_id].index();
	          vo = this.audio.voiceOver[_id] || this.audio.voiceOver[index];
	
	          if (vo) {
	            this.screen.currentVO = vo;
	            vo.play();
	          }
	        }
	      }
	    }
	  };
	
	  this.behavior('closeAll', function () {
	    if (!this.screen.state(this.STATE.VOICE_OVER) || this.game.demoMode) {
	      if (this.game.audio.sfx.close) this.game.audio.sfx.close.play();
	      this.find('li.OPEN').removeClass('OPEN');
	      return true;
	    }
	    return false;
	  });
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.playSound = function (_sound) {
	    var delay, $sound;
	
	    if (!_sound) return;
	
	    $sound = $(_sound);
	    delay = $sound.attr('pl-delay');
	    if (_sound.type === 'voiceOver') {
	      this.currentVO = _sound;
	    } else if (_sound.type === 'sfx') {
	      this.currentSFX = _sound;
	    }
	
	    if (delay) {
	      return this.delay(delay, _sound.play.bind(_sound));
	    } else {
	      return _sound.play();
	    }
	  };
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (this.audio) {
	      this.audio.rule('.voiceOver', 'shouldPlay', function (_e) {
	        _e.response(!_e.target.config('dontautoplay'));
	      });
	    }
	
	    if (this.state(this.STATE.OPEN)) this.start();
	  });
	
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
	
	    if (this.audio) {
	      this.startAudio();
	      this.playSound(this.audio.sfx.start);
	    }
	
	    if (entities) {
	      entities.forEach(function (_entity) {
	        if (_entity.hasOwnProperty('start')) _entity.start();
	      });
	    }
	
	    return this;
	  };
	
	  this.startAudio = function () {
	    if (!this.audio) return;
	    this.audio.background.play();
	    this.playSound(this.audio.voiceOver);
	  };
	
	  this.stop = function () {
	    var entities = this.hasOwnProperty('entities') && this.entities;
	
	    this.stopAudio();
	    this.kill('delay');
	
	    if (entities) {
	      entities.forEach(function (_entity) {
	        if (_entity.hasOwnProperty('start')) _entity.stop();
	      });
	    }
	
	    return this;
	  };
	
	  this.stopAudio = function () {
	    if (!this.audio) return;
	    if (this.currentVO) this.currentVO.stop();
	    if (this.currentSFX) this.currentSFX.stop();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (this.isReady && this === _event.targetScope) {
	      this.off('transitionend');
	      this.on('transitionend', (function () {
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
	});

/***/ },
/* 6 */
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
	
	  this.on('ready', function (_e) {
	    var ctx;
	
	    if (!this.is(_e.target)) return;
	
	    ctx = new (window.AudioContext || window.webkitAudioContext)();
	    if (this.audio.voiceOver.sure) this.audio.voiceOver.sure.setContext(ctx);
	    if (this.audio.sfx.button) this.audio.sfx.button.setContext(ctx);
	  });
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (this.audio.voiceOver.sure) this.audio.voiceOver.sure.play();
	    this.buttonSound();
	    this.game.addClass('QUIT-SCREEN');
	    this.removeClass('LEAVE-END');
	    this.game.pause(true);
	  });
	
	  this.on('ui-leave', function () {
	    if (this.audio.voiceOver.sure) this.audio.voiceOver.sure.stop();
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
/* 7 */
/***/ function(module, exports) {

	pl.game.component('selectable-canvas', function () {
	
	  var SELECTOR;
	
	  SELECTOR = {
	    CORRECT: '[pl-correct]',
	    INCORRECT: '[pl-incorrect]'
	  };
	
	  this.buffer = null;
	  this.bctx = null;
	  this.items = null;
	
	  this.state('activate active', '+ACTIVE');
	
	  this.state('deactivate', '-ACTIVE');
	
	  this.init = function () {
	    this.buffer = document.createElement('canvas');
	    this.bctx = this.buffer.getContext('2d');
	  };
	
	  this.ready = function () {
	    var correct, $items;
	
	    correct = pl.Queue.create();
	
	    correct.on('complete', this.bind(function () {
	      this.complete();
	    }));
	
	    this.buffer.width = this.$els.width();
	    this.buffer.height = this.$els.height();
	
	    $items = this.find('li img');
	
	    this.items = $items.map(function (_index, _node) {
	      var $node;
	
	      $node = $(_node);
	
	      if ($node.is(SELECTOR.CORRECT)) correct.add(_index);
	
	      return $node;
	    }).toArray();
	
	    this.items.correct = correct;
	  };
	
	  this.isImageTarget = function (_$image, _point, _offset, _scale) {
	    var offset, pixel;
	
	    offset = _$image.offset();
	
	    this.bctx.clearRect(0, 0, this.buffer.width, this.buffer.height);
	    this.bctx.drawImage(_$image[0], offset.left / _scale - _offset[0], offset.top / _scale - _offset[1], _$image.width(), _$image.height());
	    pixel = this.bctx.getImageData(_point.x, _point.y, 1, 1);
	
	    this.bctx.fillStyle = 'white';
	    this.bctx.fillRect(_point.x, _point.y, 5, 5);
	
	    // opaque pixel
	    return pixel.data[3] > 0;
	  };
	
	  this.behavior('select', function () {
	    var offset,
	        cursor,
	        scale,
	        returnValue = false;
	
	    scale = this.game.transformScale().x;
	    offset = this.$els.absolutePosition().scale(1 / scale);
	    cursor = this.event.cursor.scale(1 / this.game.zoom).dec(offset).math('floor');
	
	    this.items.every(this.bind(function (_$item) {
	      if (this.isImageTarget(_$item, cursor, offset, scale)) {
	        returnValue = {
	          message: _$item.parent().index(),
	          behaviorTarget: _$item.parent()
	        };
	        return false;
	      }
	
	      return true;
	    }));
	
	    return returnValue;
	  });
	
	  this.deactivateAll = function () {
	    this.deactivate(this.getActive());
	  };
	
	  this.unhighlightAll = function () {
	    this.unhighlight(this.getHighlighted());
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('selectable', function () {
	
	  this.behavior('select', function (_target) {
	    var $target;
	
	    if (this.event) {
	      $target = $(this.event.target).closest('li');
	
	      if (this.shouldSelect($target) !== false) {
	        return {
	          message: $target.index(),
	          behaviorTarget: $target
	        };
	      }
	    } else {
	      this.proto(_target);
	    }
	
	    return false;
	  });
	
	  this.shouldSelect = function () {
	    return !this.screen.state(this.screen.STATE.VOICE_OVER);
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	pl.game.component('title', function () {
	
	  this.ready = function () {
	    this.open();
	    this.audio.background.play();
	    this.delay(1500, function () {
	      // this.image.addClass('animated '+this.image.attr('pl-animation'));
	      this.complete();
	    });
	  };
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	pl.game.component('video', function () {
	  var bg;
	
	  this.start = function () {
	    this.video.on('ended', (function () {
	      this.complete();
	    }).bind(this));
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
/* 11 */
/***/ function(module, exports) {

	(function test(_env) {
		if (window.parent === window) {
			window.location.href = 'https://www.changemyworldnow.com/';
		} else {
			document.domain = 'changemyworldnow.com';
		}
	})();

/***/ },
/* 12 */
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