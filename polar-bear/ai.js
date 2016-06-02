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
	
	pl.game('polar-bear', function () {
	
	  var resetMultipleChoice = function resetMultipleChoice() {
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      if (this.isComplete) this.deselect(this.find('.' + this.STATE.SELECTED));
	    });
	  };
	
	  this.screen('title', function () {
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
	
	  this.screen('what-color', function () {
	    this.on('ui-open', function (_e) {
	      if (!this.slides.mc.is(_e.target)) return;
	
	      if (this.isComplete) this.deselect(this.find('.' + this.STATE.SELECTED));
	    });
	  });
	
	  this.screen('bears', function () {
	
	    this.start = function () {
	      this.proto();
	      this.carousel.start();
	    };
	
	    this.stop = function () {
	      this.carousel.stop();
	    };
	
	    this.on('ui-select', function (_event) {
	      if (_event.targetScope === this.reveal) {
	        this.reveal.delay('1s', function () {
	          var $selected;
	
	          $selected = this.getSelected();
	
	          this.close();
	          $selected.addClass('animated slideOutUp').on('animationend', function () {
	            $selected.removeClass('slideOutUp');
	            $selected.off();
	          });
	        });
	      }
	    });
	
	    this.on('ui-open', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.isComplete) this.score.reset();
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
	
	      this.reveal.item(_event.behaviorTarget.id());
	    });
	
	    this.respond('next', function () {
	      this.cannon.ball.reload();
	    });
	
	    this.playSFX = function (_name) {
	      var sfx;
	
	      sfx = pl.util.resolvePath(this, 'audio.sfx.' + _name);
	
	      if (sfx) sfx.play();
	
	      return this;
	    };
	  });
	
	  this.screen('experiment-hands', resetMultipleChoice);
	  this.screen('experiment-why-warmer', resetMultipleChoice);
	  this.screen('experiment-how-warmer', resetMultipleChoice);
	
	  this.screen('experiment-discover', function () {
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      this.unhighlight(this.find('.' + this.STATE.HIGHLIGHTED));
	    });
	
	    this.respond('select', function (_event) {
	      var id = _event.message;
	
	      if (id) {
	        this.highlight(_event.behaviorTarget);
	        this.audio.voiceOver[id].play();
	      }
	    });
	
	    // this.entity('selectable', function () {
	    //   this.behavior('select', function (_target) {
	    //     var $target;
	
	    //     if (this.event) {
	    //       $target = $(this.event.target).closest('li');
	
	    //       if (this.shouldSelect($target) !== false) {
	    //         return {
	    //           message: $target.id(),
	    //           behaviorTarget: $target
	    //         };
	    //       }
	    //     } else {
	    //       this.proto(_target);
	    //     }
	
	    //     return false;
	    //   });
	    // });
	  });
	
	  this.screen('flip', function () {
	
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

	pl.game.component('cannon', function () {
	
	  this.entity('ball', function () {
	
	    this.reloadRequest = false;
	    this.isLaunchComplete = false;
	
	    this.willInit = function () {
	      if (this.cannon.properties.ball) {
	        this.attr('src', this.cannon.properties.ball);
	        // I shouldn't have to do this
	        this.on('load', function () {
	          this.assetQueue.ready(this.node().src);
	          this.off('load');
	        });
	      }
	    };
	
	    this.on('transitionend', function () {
	      this.log('transitionend');
	
	      this.isLaunchComplete = true;
	
	      if (this.launched()) {
	        this.playSFX('hit');
	
	        if (this.reloadRequest) {
	          this.reload();
	        }
	      }
	    });
	
	    this.state('launch launched', '+LAUNCHED -RELOAD', {
	      didSet: function didSet() {
	        this.playSFX('fire');
	        this.isLaunchComplete = false;
	      }
	    });
	
	    this.state('reload', '+RELOAD -LAUNCHED', {
	      shouldSet: function shouldSet() {
	        if (!this.isLaunchComplete) {
	          this.reloadRequest = true;
	          return false;
	        }
	      },
	
	      didSet: function didSet() {
	        this.reloadRequest = false;
	      }
	    });
	  });
	
	  this.behavior('fire', function () {
	    this.ball.launch();
	    return {
	      message: this.cannon.properties.fire
	    };
	  });
	
	  this.reload = function () {
	    this.ball.reload();
	  };
	
	  this.playSFX = function (_name) {
	    var sfx;
	
	    sfx = pl.util.resolvePath(this, 'audio.sfx.' + _name);
	
	    if (sfx) sfx.play();
	
	    return this;
	  };
	});

/***/ },
/* 5 */
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
	  this.hitTarget = null;
	
	  this.ready = function () {
	    this.$images = this.find('img');
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
	      if (_event.target.nodeName === 'IMG' && $(_event.target).state(this.STATE.LEAVE)) {
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
/* 6 */
/***/ function(module, exports) {

	pl.game.component('frame', function () {
	
	  this.ready = function () {
	    if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
	      this.requiredQueue.on('complete', this.bind(function () {
	        var sfx;
	
	        sfx = pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	
	        if (sfx) sfx.play();
	      }));
	    }
	  };
	
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
	
	  this.on('ui-close', function (_event) {
	    if (this.isReady && this.is(_event.target)) {
	      this.stop();
	    }
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	pl.game.component('map', function () {
	
	  var SELECTOR;
	
	  SELECTOR = {
	    CORRECT: '[pl-correct]',
	    INCORRECT: '[pl-incorrect]'
	  };
	
	  this.buffer = null;
	  this.bctx = null;
	  this.countries = null;
	
	  // images
	  this.grayMap = null;
	  this.iceland = null;
	  this.russia = null;
	  this.northPole = null;
	  this.greenland = null;
	  this.denmark = null;
	  this.norway = null;
	  this.canada = null;
	  this.usa = null;
	  this.sweden = null;
	  this.finland = null;
	
	  this.init = function () {
	    this.buffer = document.createElement('canvas');
	    this.bctx = this.buffer.getContext('2d');
	  };
	
	  this.ready = function () {
	    var correct, $countries;
	
	    correct = pl.Queue.create();
	
	    correct.on('complete', this.bind(function () {
	      var sfx = pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	      if (sfx) sfx.play();
	      this.complete();
	    }));
	
	    this.buffer.width = 500;
	    this.buffer.height = 500;
	
	    $countries = this.find('.country');
	
	    $countries.not(SELECTOR.CORRECT).on('animationend', function () {
	      $(this).removeClass('flash').addClass('fadeIn');
	    });
	
	    this.countries = $countries.map(function (_index, _node) {
	      var $node, id;
	
	      $node = $(_node);
	      id = pl.util.transformId($node.id(), true);
	
	      if ($node.is(SELECTOR.CORRECT)) correct.add(id);
	
	      return id;
	    }).toArray();
	
	    this.countries.correct = correct;
	  };
	
	  this.isImageTarget = function (_image, _point) {
	    var pixel;
	
	    this.bctx.clearRect(0, 0, this.buffer.width, this.buffer.height);
	    this.bctx.drawImage(_image[0], 0, 0, _image.width(), _image.height());
	    pixel = this.bctx.getImageData(_point.x, _point.y, 1, 1);
	
	    this.bctx.fillStyle = 'white';
	    this.bctx.fillRect(_point.x, _point.y, 5, 5);
	
	    // opaque pixel
	    return pixel.data[3] > 0;
	  };
	
	  this.test = function (_cursor) {
	    var offset, cursor, gameScale;
	
	    if (!this.screen.allowAction()) return false;
	
	    offset = this.grayMap.absolutePosition();
	    gameScale = this.game.transformScale().x;
	
	    // FireFox uses transfom scale which
	    // does NOT produce scaled DOM values like `zoom`.
	    if (gameScale !== 1) {
	      cursor = _cursor.dec(offset).scale(1 / this.game.zoom).math('floor');
	    } else {
	      cursor = _cursor.scale(1 / this.game.zoom).math('floor').dec(offset);
	    }
	
	    this.countries.every(this.bind(function (_country) {
	      if (this.isImageTarget(this[_country], cursor)) {
	        this.answer(_country);
	        return false;
	      }
	
	      return true;
	    }));
	  };
	
	  this.answer = function (_country) {
	    var $country;
	
	    $country = this[_country];
	
	    if ($country.is(SELECTOR.CORRECT)) {
	
	      this.playSFX('correct');
	      this.playVO(_country);
	
	      $country.addClass('animated fadeIn');
	
	      if (!this.state('COMPLETE')) this.countries.correct.ready(_country);
	    } else {
	      this.playSFX('incorrect');
	      $country.addClass('animated flash');
	    }
	  };
	
	  this.playSFX = function (_answer) {
	    var sfx;
	
	    sfx = pl.util.resolvePath(this, 'audio.sfx.' + _answer);
	
	    if (sfx) sfx.play();
	
	    return sfx;
	  };
	
	  this.playVO = function (_name) {
	    var vo;
	
	    vo = pl.util.resolvePath(this, 'audio.voiceOver.' + _name);
	
	    if (vo) vo.play();
	
	    return vo;
	  };
	
	  this.on('ui-open', function (_e) {
	    if (!this.is(_e.target)) return;
	
	    if (this.isComplete) {
	      this.find('.fadeIn').removeClass('fadeIn');
	    }
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('multiple-choice', function () {
	
	  function validateAnswer(_scope) {
	    var $selected, answers, $correct;
	
	    $selected = _scope.getSelected();
	
	    if (_scope.properties.correct) {
	      answers = _scope.properties.correct.split(/\s*,\s*/);
	
	      if (~answers.indexOf(String($selected.index()))) {
	        if (_scope.isComplete) _scope.playSFX('correct');
	        _scope.complete();
	      } else {
	        _scope.playSFX('incorrect');
	      }
	    } else {
	      $correct = _scope.find('[pl-correct]');
	
	      if (~$.inArray($selected[0], $correct)) {
	        if (_scope.isComplete) _scope.playSFX('correct');
	        _scope.complete();
	      } else {
	        _scope.playSFX('incorrect');
	      }
	    }
	
	    return false;
	  }
	
	  this.playSFX = function (_answer) {
	    var sfx;
	
	    sfx = pl.util.resolvePath(this, 'audio.sfx.' + _answer);
	
	    if (sfx) sfx.play();
	
	    return sfx;
	  };
	
	  this.playVO = function (_name) {
	    var vo;
	
	    vo = pl.util.resolvePath(this, 'audio.voiceOver.' + _name);
	
	    if (vo) vo.play();
	
	    return vo;
	  };
	
	  this.answer = function () {
	    var $li;
	
	    if (this.screen.state(this.screen.STATE.VOICE_OVER) && !this.game.demoMode) return;
	
	    if (this.event) {
	      $li = $(this.event.target).closest('li');
	      this.playVO($li.id());
	
	      if (this.select($li)) {
	        validateAnswer(this);
	      }
	    }
	  };
	
	  this.start = function () {};
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	pl.game.component('reveal', function () {
	
	  this.on('transitionend', function () {
	    if (!this.opened()) {
	      this.addClass('ANIM-DONE');
	    }
	  });
	
	  this.item = function (_id) {
	    var vo, index;
	
	    this.removeClass('ANIM-DONE');
	    this.open();
	
	    if (typeof _id === 'number') {
	      this.select('li:nth-child(' + _id + ')');
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
/* 10 */
/***/ function(module, exports) {

	pl.game.component('score', function () {
	
	  this.value = 0;
	
	  this.entity('board', function () {
	
	    this.template = null;
	
	    this.ready = function () {
	      this.template = this.counter.html();
	    };
	
	    this.render = function () {
	      this.counter.html(this.template.replace('{{score}}', this.value));
	      return this;
	    };
	  });
	
	  this.reset = function () {
	    this.value = 0;
	    this.ready();
	  };
	
	  this.ready = function () {
	    this.attr('value', this.value);
	    this.board.render();
	  };
	
	  this.up = function (_count) {
	    this.value += _count || 1;
	
	    this.attr('value', this.value);
	    this.board.render();
	
	    if (this.value >= this.properties.max) {
	      this.complete();
	    }
	
	    return this;
	  };
	
	  this.down = function (_count) {
	    this.value -= _count || 1;
	
	    this.attr('value', this.value);
	    this.board.render();
	
	    if (this.value >= this.properties.max) {
	      this.complete();
	    }
	
	    return this;
	  };
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.allowAction = function () {
	    return !this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode;
	  };
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    if (this.isMemberSafe('requiredQueue') && this.requiredQueue) {
	      this.requiredQueue.on('complete', this.bind(function () {
	        var sfx;
	
	        sfx = pl.util.resolvePath(this, 'game.audio.sfx.screenComplete');
	
	        if (sfx) sfx.play();
	      }));
	    }
	
	    if (this.state(this.STATE.OPEN)) this.start();
	  });
	
	  this.next = function () {
	    var current, nextScreen, buttonSound;
	
	    if (!this.state(this.STATE.OPEN)) return;
	
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
	
	    if (!this.state(this.STATE.OPEN)) return;
	
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
	    this.startAudio();
	
	    if (this.hasOwnProperty('entities') && this.entities[0]) this.entities[0].start();
	
	    return this;
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
	    if (this.isReady && this.is(_event.target)) {
	      this.stop();
	    }
	  });
	});

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	pl.game.component('selectable-reveal', function () {
	
	  this.respond('select', function (_event) {
	    var index, stateMethod;
	
	    index = _event.message;
	    stateMethod = this.properties.selectState || 'select';
	
	    if (~index) {
	      this[stateMethod](_event.behaviorTarget);
	      this.reveal.item(index);
	      this.features.correct.ready(index);
	    }
	  });
	
	  this.entity('selectable', function () {
	
	    this.shouldSelect = function (_$target) {
	      if (_$target.prev().hasClass(this.STATE.HIGHLIGHTED) || _$target.index() === 0 || _$target.is('[pl-always-selectable]')) {
	        return !this.screen.state(this.STATE.VOICE_OVER) && !_$target.state(this.STATE.HIGHLIGHTED);
	      }
	
	      return false;
	    };
	  });
	
	  this.ready = function () {
	    var correct;
	
	    correct = pl.Queue.create();
	
	    correct.on('complete', this.bind(function () {
	      this.complete();
	    }));
	
	    this.features = this.find('.items li').map(function (_index) {
	      correct.add(_index);
	      return _index;
	    }).toArray();
	
	    this.features.correct = correct;
	  };
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
	    if (!this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode) {
	      return true;
	    }
	
	    return false;
	  };
	});

/***/ },
/* 15 */
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
/* 16 */
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