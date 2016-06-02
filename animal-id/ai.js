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
	
	pl.game('animal-id', function () {
	
	  var showNext = function showNext() {
	    this.STATE.BACK = 'RETURN';
	
	    this.state('return', '+RETURN');
	
	    this.on('ui-open', function (_event) {
	      if (!this.is(_event.target)) return;
	      if (this.state(this.STATE.COMPLETE)) this['return'](this);
	    });
	  };
	
	  this.screen('title', function () {
	
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	
	    this.on('ui-open', function (_event) {
	      if (this.is(_event.target)) this.title.startAudio();
	
	      if (this.state(this.STATE.OPEN)) this.start();
	    });
	
	    this.startAudio = function () {
	      this.title.audio.background.play();
	    };
	
	    this.stopAudio = function () {
	      this.title.audio.background.stop();
	    };
	
	    this.entity('title', function () {
	      this.on('animationend', function (_event) {
	        if (!this.image.is(_event.target)) return;
	        this.complete();
	      });
	    });
	  });
	
	  this.screen('id-carnivore', showNext);
	  this.screen('id-marsupial', showNext);
	  this.screen('id-rodent', showNext);
	  this.screen('id-arachnid', showNext);
	  this.screen('id-mammal', showNext);
	  this.screen('id-mollusk', showNext);
	  this.screen('id-reptile', showNext);
	  this.screen('id-herbivore', showNext);
	
	  this.screen('match-game', function () {
	    this.on('ui-close', function (_event) {
	      if (!this.is(_event.target)) return;
	      this.reveal.closeAll();
	      this.delay('.5s', this.matchGame.randomize.bind(this.matchGame));
	    });
	  });
	
	  this.screen('dnd-lion', showNext);
	  this.screen('dnd-sloth', showNext);
	  this.screen('dnd-wolf', showNext);
	  this.screen('dnd-elephant', showNext);
	  this.screen('dnd-dragon', showNext);
	  this.screen('dnd-pig', showNext);
	  this.screen('dnd-gorilla', showNext);
	  this.screen('dnd-mule', showNext);
	
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

	pl.game.component('class-switcher', function () {
	
	  this.start = function () {
	    var target, add, remove;
	
	    target = this.properties.target || 'body';
	    add = this.properties.add || '';
	    remove = this.properties.remove || '';
	
	    $(target).addClass(add).removeClass(remove);
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	pl.game.component('drop-responder', function () {
	
	  this.respond('drop', function (_event) {
	    this.screen.reveal.item(_event.behaviorTarget.id());
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
	          _event.state.$draggable.removeClass('PLUCKED');
	          _event.state.$helper.addClass('DROPED');
	
	          this.drop(_event.state.$draggable);
	          this.audio.sfx.correct.play();
	
	          return;
	        } else {
	          this.audio.sfx.incorrect.play();
	        }
	      }
	
	      _event.state.$helper.addClass('RETURN');
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
	
	  // arguments should be _point and _y
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
	      behaviorTarget: _$thing
	    };
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	pl.game.component('flip-card', function () {
	
	  // this.flip = function (_card) {
	  //   // console.log(_card);
	  // };
	
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	pl.game.component('frame', function () {
	
	  this.start = function () {
	    var voSound = this.audio.voiceOver[0];
	
	    this.audio.background.play();
	    if (voSound && !voSound.config('dontautoplay')) voSound.play();
	
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
/* 9 */
/***/ function(module, exports) {

	pl.game.component('match-game', function () {
	
	  this.behavior('select', function (_target) {
	    var $target;
	
	    if (this.event && !_target) {
	      $target = $(this.event.target).closest('li');
	      if (!$target.length) return false;
	
	      if (this.shouldSelect($target) !== false) {
	        $target.is('li') && this.audio.sfx.correct.play();
	        if (this.showSelect($target)) {
	          return {
	            message: $target.id(),
	            behaviorTarget: $target
	          };
	        }
	      } else {
	        if (this.audio.sfx.incorrect) this.audio.sfx.incorrect.play();
	      }
	    } else {
	      this.proto(_target);
	    }
	
	    return false;
	  });
	
	  this.shouldSelect = function (_$target) {
	    return !_$target.hasClass(this.STATE.HIGHLIGHTED) && !_$target.parent().hasClass('show-all');
	  };
	
	  this.start = function () {
	    var $items,
	        self = this;
	
	    $items = this.find('.items').addClass('show-all');
	    this.disable();
	
	    setTimeout((function () {
	      $items.removeClass('show-all');
	      this.enable();
	    }).bind(this), 5000);
	
	    this.$currentCard = null;
	
	    this.find('li').each(function () {
	      self.unhighlight($(this));
	    });
	  };
	
	  this.showSelect = function (_$target) {
	    var stateMethod, undoStateMethod;
	
	    stateMethod = this.properties.selectState || 'select';
	    if (stateMethod === 'select') undoStateMethod = 'deselect';
	    if (stateMethod === 'highlight') undoStateMethod = 'unhighlight';
	
	    if (_$target) {
	      this[stateMethod](_$target);
	
	      if (!this.$currentCard) {
	        this.$currentCard = _$target;
	        this.disable().on('transitionend', (function () {
	          this.enable().off('transitionend');
	        }).bind(this));
	      } else if (this.$currentCard.id() === _$target.id()) {
	        this.$currentCard = null;
	        this.enable();
	        return true;
	      } else {
	        this.disable();
	        setTimeout((function () {
	          this[undoStateMethod](_$target);
	          this[undoStateMethod](this.$currentCard);
	          this.$currentCard = null;
	          this.enable();
	        }).bind(this), 1000);
	      }
	    }
	
	    return false;
	  };
	
	  this.populateList = function (_$bin) {
	    var $items, $bin, random;
	
	    $items = this.find('.items');
	    $bin = _$bin;
	
	    while ($bin.length) {
	      random = Math.floor(_$bin.length * Math.random());
	      $bin.eq(random).remove().appendTo($items);
	      $bin = this.find('.bin li');
	    }
	  };
	
	  this.randomize = function () {
	    var $bin;
	
	    $bin = this.find('.bin');
	    this.find('.items li').remove().appendTo($bin);
	    this.populateList($bin.find('li'));
	  };
	
	  this.ready = function () {
	    var correct, $bin;
	
	    correct = pl.Queue.create();
	
	    correct.on('complete', this.bind(function () {
	      this.screen.complete();
	    }));
	
	    this.items = this.find('.items li[pl-correct]').map(function (_index, _node) {
	      correct.add(_node.getAttribute('pl-id'));
	      return _node;
	    }).toArray();
	
	    this.items.correct = correct;
	
	    $bin = this.find('.bin li');
	
	    if ($bin.length) this.populateList($bin);
	  };
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	pl.game.component('reveal', function () {
	
	  this.screen.STATE.COMPLETE = 'COMPLETE';
	  this.nextOnClose = true;
	
	  function playSound(_sound) {
	    var delay;
	
	    delay = $(_sound).attr('pl-delay');
	
	    if (delay) {
	      return this.delay(delay, _sound.play.bind(_sound));
	    } else {
	      return _sound.play();
	    }
	  }
	
	  this.respond('select', function (_event) {
	    var vo, index;
	
	    index = _event.message;
	    this.closeAll();
	
	    if (typeof index !== 'undefined') {
	      if (typeof index === 'number') {
	        this.open(this.find('li').eq(index));
	        this.audio.voiceOver[index].play();
	      } else if (typeof index === 'string') {
	        if (this[index]) {
	          this.open(this[index]);
	
	          if (this.audio) {
	            if (this.audio.voiceOver.length) index = this[index].index();
	            vo = this.audio.voiceOver ? this.audio.voiceOver[index] : null;
	
	            if (vo) playSound.call(this, vo);
	          }
	        }
	      }
	    }
	  });
	
	  this.handleProperty({
	    nextOnClose: function nextOnClose(_node, _name, _value) {
	      if (this.is(_node)) {
	        this.nextOnClose = _value === false ? false : true;
	      }
	    }
	  });
	
	  this.item = function (_id) {
	    var vo;
	
	    this.closeAll();
	
	    if (typeof _id !== 'undefined') {
	      if (typeof _id === 'number') {
	        this.open('li:nth-child(' + _id + ')');
	        this.audio.voiceOver[_id].play();
	      } else if (typeof _id === 'string') {
	        if (this[_id]) {
	          this.open(this[_id]);
	
	          if (this.audio) {
	            if (this.audio.voiceOver.length) _id = this[_id].index();
	            vo = this.audio.voiceOver ? this.audio.voiceOver[_id] : null;
	
	            if (vo) playSound.call(this, vo);
	          }
	        }
	      }
	    }
	  };
	
	  this.closeAll = function () {
	    if (!this.screen.state(this.screen.STATE.VOICE_OVER) || this.screen.state(this.screen.STATE.COMPLETE) || this.game.demoMode) {
	      this.close(this.find('li.OPEN'));
	    }
	  };
	
	  this.handleCloseClick = function () {
	    if (!this.screen.state(this.screen.STATE.VOICE_OVER) || this.game.demoMode) {
	      this.closeAll();
	      if (this.nextOnClose) this.screen.next();
	    }
	  };
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.SELECTOR = {
	    CORRECT: '[pl-correct]',
	    INCORRECT: '[pl-incorrect]'
	  };
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (this.isReady) this.start();
	    if (this.screen.isLast()) this.addClass('last');
	  });
	
	  this.on('ui-leave', function (_event) {
	    if (this.isReady && this.is(_event.target)) this.stop();
	  });
	
	  this.next = function () {
	    var nextScreen;
	
	    // @todo make isLast a method for slides. (this.isLast() for any sequence of views)
	    // @todo Perhaps make the slides component the primary machine for screen
	    // navigation since they are esentially the same.
	    //
	    if (this.screen.isLast() && this.completed()) this.game.quit.okay();
	
	    nextScreen = this.proto();
	
	    if (nextScreen) {
	      this.screen.leave();
	      nextScreen.open();
	      this.game.audio.sfx.button.play();
	    }
	
	    return nextScreen;
	  };
	
	  this.prev = function () {
	    var prevScreen;
	
	    prevScreen = this.proto();
	
	    if (prevScreen) {
	      this.screen.close();
	      prevScreen.open();
	      this.game.audio.sfx.button.play();
	    }
	
	    return prevScreen;
	  };
	
	  // @todo Possibly make this a behavior so decendants can respond to the screen starting - Micah: 3/8/16
	  this.start = function () {
	    var entities = this.hasOwnProperty('entities') && this.entities;
	
	    this.startAudio();
	
	    // start all screen entities.
	    if (entities) {
	      entities.forEach(function (_entity) {
	        var type = typeof _entity.start;
	
	        if (_entity.hasOwnProperty('start') && type === 'function') {
	          _entity.start();
	        }
	      });
	    }
	
	    return this;
	  };
	
	  this.complete = function () {
	    if (this.is(this.screen)) {
	      this.game.audio.sfx.play('screenComplete');
	    }
	    return this.proto();
	  };
	
	  this.on('ui-close', function (_event) {
	    if (!this.is(_event.target)) return;
	    this.stop();
	  });
	
	  this.on('ready', function (_event) {
	    if (!this.is(_event.target)) return;
	    if (this.state(this.STATE.OPEN)) this.start();
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
/* 13 */
/***/ function(module, exports) {

	pl.game.component('selectable', function () {
	
	  this.behavior('select', function (_target) {
	    var $target;
	
	    if (this.screen.state(this.screen.STATE.VOICE_OVER) && !this.game.demoMode) return false;
	
	    if (this.event && !_target) {
	      $target = $(this.event.target).closest('li');
	
	      if (this.shouldSelect($target) !== false) {
	        $target.is('li') && this.audio.sfx.correct.play();
	        if (this.showSelect($target)) {
	          return {
	            message: $target.id(),
	            behaviorTarget: $target
	          };
	        }
	      } else {
	        if (this.audio.sfx.incorrect) this.audio.sfx.incorrect.play();
	      }
	    } else {
	      this.proto(_target);
	    }
	
	    return false;
	  });
	
	  this.shouldSelect = function (_$target) {
	    return _$target.is(this.screen.SELECTOR.CORRECT);
	  };
	
	  this.showSelect = function (_$target) {
	    var stateMethod;
	
	    stateMethod = this.properties.selectState || 'select';
	
	    if (_$target) {
	      this[stateMethod](_$target);
	    }
	
	    return true;
	  };
	
	  this.populateList = function (_$bin) {
	    var $items, $bin, random;
	
	    $items = this.find('.items');
	    $bin = _$bin;
	
	    while ($bin.length) {
	      random = Math.floor(_$bin.length * Math.random());
	      $bin.eq(random).remove().appendTo($items);
	      $bin = this.find('.bin li');
	    }
	  };
	
	  this.ready = function () {
	    var $bin = this.find('.bin li');
	    if ($bin.length) this.populateList($bin);
	  };
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	pl.game.component('sparkles', function () {});

/***/ },
/* 15 */
/***/ function(module, exports) {

	pl.game.component('title', function () {
	
	  this.ready = function () {
	    // this.open();
	    // this.audio.background.play();
	    // this.delay('1.5s', function () {
	    //   this.image.addClass('animated '+this.image.attr('pl-animation'));
	    // });
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