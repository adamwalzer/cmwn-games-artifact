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
	
	pl.game('drought-out', function () {
	
	  var self = this;
	
	  pl.game.attachScreen = function (cb) {
	    cb.call(self);
	  };
	
	  var selectScreen = function selectScreen() {
	    this.respond('select', function (_event) {
	      var vo;
	
	      if (!_event.behaviorTarget.is('li')) return;
	
	      if (_event.behaviorTarget.attr('pl-correct') == null) {
	        vo = this.audio.sfx.incorrect;
	      } else {
	        this.highlight(_event.behaviorTarget);
	        vo = this.selectable.audio.voiceOver[_event.message];
	      }
	
	      if (vo) vo.play();
	    });
	
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      this.unhighlight(this.find('.' + this.STATE.HIGHLIGHTED));
	    });
	  };
	
	  this.screen('title', function () {
	    this.on('ready', function (_event) {
	      if (!this.is(_event.target)) return;
	
	      this.require('cacti');
	
	      if (this.game.iosSplash.state(this.STATE.READY)) this.game.iosSplash.splash();
	    });
	
	    this.on('animationend', function (_e) {
	      if ($(_e.target).id() !== 'cacti') return;
	
	      if (!this.isComplete) this.requiredQueue.ready('cacti');
	    });
	  });
	
	  this.screen('think', selectScreen);
	
	  this.screen('balloons', function () {
	    this.respond('select', function (_event) {
	      var vo, sfx;
	
	      if (_event.behaviorTarget.attr('pl-incorrect') != null) {
	        vo = this.audio.sfx.incorrect;
	      } else {
	        this.highlight(_event.behaviorTarget);
	        vo = this.audio.voiceOver[_event.message];
	      }
	
	      switch (_event.message) {
	        case 'bathing':
	        case 'drinking':
	        case 'canoeing':
	        case 'factories':
	        case 'lawns':
	        case 'flowers':
	        case 'animalFeed':
	          sfx = this.audio.sfx.yellow;
	          break;
	        case 'washingDishes':
	        case 'swimming':
	        case 'brushingTeeth':
	        case 'electricity':
	          sfx = this.audio.sfx.green;
	          break;
	        case 'cooking':
	        case 'rafting':
	        case 'waterSlides':
	        case 'growingFood':
	          sfx = this.audio.sfx.red;
	          break;
	      }
	
	      if (vo) vo.play();
	      if (sfx) sfx.play();
	    });
	
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      this.unhighlight(this.find('.' + this.STATE.HIGHLIGHTED));
	    });
	
	    this.startAudio = function () {};
	  });
	
	  this.screen('what-can-we-do', selectScreen);
	
	  this.screen('shower', function () {
	    this.respond('select', function (_event) {
	      var vo;
	
	      if (_event.behaviorTarget.attr('pl-correct') == null) {
	        vo = this.audio.sfx.incorrect;
	      } else {
	        this.highlight(_event.behaviorTarget);
	        vo = this.audio.voiceOver[_event.message];
	      }
	
	      if (vo) vo.play();
	    });
	
	    this.on('ui-open', function (_e) {
	      if (!this.is(_e.target)) return;
	
	      this.unhighlight(this.find('.' + this.STATE.HIGHLIGHTED));
	    });
	  });
	
	  this.screen('conserve', function () {
	    var item = 0;
	
	    this.openDoor = function () {
	      if (this.shouldProceed()) {
	        this.select();
	        this.reveal.item(item);
	        this.audio.sfx.open.play();
	      }
	    };
	
	    this.on('ui-open', function (_e) {
	      var self = this;
	
	      if (!this.is(_e.target)) return;
	
	      this.length = this.reveal.find('li').length;
	
	      this.reveal.audio.voiceOver.on('ended', function () {
	        self.audio.sfx.close.play();
	        self.deselect();
	        item = (item + 1) % self.length;
	      });
	
	      if (this.isComplete) item = 0;
	    });
	
	    this.on('ui-close ui-leave', function (_e) {
	      if (!this.is(_e.target)) return;
	      this.reveal.audio.voiceOver.off('ended');
	    });
	  });
	
	  this.screen('flip', function () {
	    this.next = function () {
	      this.game.quit.okay();
	    };
	
	    this.on('ui-open', function () {
	      if (this.audio && this.audio.sfx) {
	        this.delay('9.5s', this.audio.sfx.play.bind(this.audio.sfx));
	      }
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
	  var sounds;
	
	  this.on('ready', function (_event) {
	    var self = this;
	
	    if (!this.is(_event.target)) return;
	
	    sounds = this.audio.find('.audio');
	
	    this.audio.on('ended', function () {
	      var next = sounds[self.i++];
	      if (next) next.play();
	    });
	  });
	
	  this.start = function () {
	    this.i = 1;
	    if (sounds.length) sounds[0].play();
	  };
	});

/***/ },
/* 5 */
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
	
	  this.start = function () {};
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	pl.game.component('screen-basic', function () {
	
	  this.shouldProceed = function () {
	    return !this.state(this.STATE.VOICE_OVER) || this.game.demoMode;
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
	    var fxSound = this.audio && this.audio.sfx.start;
	
	    this.startAudio();
	
	    if (fxSound) fxSound.play();
	    if (this.hasOwnProperty('entities')) {
	      this.entities.forEach(function (_entity) {
	        if (_entity && typeof _entity.start === 'function') _entity.start();
	      });
	    }
	
	    return this;
	  };
	
	  this.stop = function () {
	    if (this.timeoutID) {
	      clearTimeout(this.timeoutID);
	    }
	    return this.proto();
	  };
	
	  this.on('ui-open', function (_event) {
	    if (!this.is(_event.target)) return;
	
	    if (this.isReady) {
	      this.start();
	    }
	
	    if (this.properties.gameClass) {
	      this.game.addClass(this.properties.gameClass);
	    }
	
	    if (!this.requiredQueue || this.hasOwnProperty('requiredQueue') && !this.requiredQueue.length) {
	      this.complete();
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
	
	  this.complete = function () {
	    var audio;
	
	    audio = this.audio && this.audio.has('screenComplete') ? this.audio : this.game.audio;
	
	    audio.sfx.play('screenComplete');
	    return this.proto();
	  };
	
	  this.on('ready', function () {
	    if (this.state(this.STATE.OPEN)) this.start();
	  });
	});

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	pl.game.component('selectable-canvas-move', function () {
	  var canvas,
	      Item,
	      gameLoop,
	      self = this;
	
	  gameLoop = {
	    // main game loop
	    frame: function frame(_scope) {
	      // transition items one px on each frame
	      _scope.items.forEach(function (_item) {
	        var y, height;
	        _item.position.y -= _item.speed;
	
	        y = _item.position.y + _item.margin;
	        height = _item.size.height;
	
	        if (y + height < 0) _item.position.y = _scope.height() * 1.1;
	      });
	    }
	  };
	
	  Item = pl.Basic.extend(function () {
	    this.position = null;
	    this.size = null;
	    this.margin = 0;
	    this.image = null;
	    this.$image = null;
	    this.left = 0;
	    this.selected = false;
	
	    this.init = function (_image) {
	      this.$image = $(_image);
	      this.image = _image;
	
	      this.position = pl.Point.create();
	      this.backgroundSize = [200, 200].to('size');
	      this.size = [360, 460].to('size');
	
	      return this;
	    };
	
	    this.render = function () {
	      return {
	        drawImage: [this.image, this.left, this.image.getAttribute('top') * this.image.naturalHeight / 15, this.size.width, this.size.height, this.position.x, this.position.y, this.backgroundSize.width, this.backgroundSize.height]
	      };
	    };
	
	    this.hover = function () {
	      if (!this.selected) this.left = this.image.naturalWidth / 3;
	    };
	
	    this.unhover = function () {
	      if (!this.selected) this.left = 0;
	    };
	
	    this.select = function () {
	      this.selected = true;
	      this.left = this.image.naturalWidth * 2 / 3;
	    };
	
	    this.deselect = function () {
	      this.selected = false;
	      this.left = 0;
	    };
	
	    this.is = function (_type) {
	      return $(this.image).is(_type);
	    };
	
	    this.id = function () {
	      return this.$image.id();
	    };
	  });
	
	  canvas = {
	
	    ctx: null,
	    node: null,
	    content: null,
	    scale: 1,
	
	    init: function init(_canvas, _size, _scale) {
	      var size;
	
	      size = _scale ? _size.scale(_scale) : _size;
	
	      this.node = _canvas;
	      this.ctx = _canvas.getContext('2d');
	      this.scale = _scale || 1;
	
	      if (! ~size.indexOf(void 0)) {
	        _canvas.width = size.width;
	        _canvas.height = size.height;
	      }
	
	      this.ctx.scale(_scale, _scale);
	
	      this.node.onmousemove = function (_e) {
	        var offset, cursor, scale;
	
	        scale = self.game.transformScale().x;
	        offset = self.$els.absolutePosition().scale(1 / scale);
	        cursor = pl.Point.create().set(_e.x, _e.y).scale(scale / self.game.zoom).dec(offset).math('floor');
	
	        self.reverseItems.every(function (_item) {
	          if (self.isImageTarget(_item, cursor)) {
	            _item.hover();
	            return false;
	          }
	
	          _item.unhover();
	          return true;
	        });
	      };
	    },
	
	    resize: function resize(_size, _scale) {
	      var size;
	
	      size = _scale ? _size.scale(_scale) : _size;
	
	      this.node.width = size.width;
	      this.node.height = size.height;
	      this.scale = _scale || 1;
	
	      this.ctx.scale(_scale, _scale);
	    },
	
	    clear: function clear() {
	      this.ctx.clearRect(0, 0, this.node.width / this.scale, this.node.height / this.scale);
	    },
	
	    draw: function draw(_obj) {
	      var commands, cmd;
	
	      commands = _obj.render();
	
	      for (cmd in commands) {
	        if (typeof this.ctx[cmd] !== 'function') continue;
	        this.ctx[cmd].apply(this.ctx, commands[cmd]);
	      }
	    }
	  };
	
	  this.items = null;
	  this.player = null;
	  this.canvas = null;
	  this.buffer = null;
	  this.bctx = null;
	  this.isRunning = false;
	
	  this.init = function () {
	    this.buffer = document.createElement('canvas');
	    this.bctx = this.buffer.getContext('2d');
	  };
	
	  // Handle when the component scope is ready.
	  this.on('ready', function (_event) {
	    var canvasSize, width, height;
	
	    // Do not handle child scopes becoming ready.
	    if (!this.is(_event.target)) return;
	
	    this.buffer.width = width = this.width();
	    this.buffer.height = height = this.height();
	
	    this.items = this.bin.find('img').map(function (_i, _node) {
	      var item = Item.create().init(_node);
	
	      item.position.x = 40 + 120 * _i % (width - 280);
	      item.position.y = height + 250 * _i % (2 * height);
	      item.speed = (_i * 5 % 3 + 2) / 2;
	
	      return item;
	    }).toArray();
	
	    this.reverseItems = this.items.slice().reverse();
	
	    canvasSize = pl.Size.create().set(width, height);
	
	    canvas.init(this.canvas[0], canvasSize, this.game.zoom);
	
	    this.game.viewport.onResize(this.game.bind(function () {
	      canvas.resize(canvasSize, this.zoom);
	    }));
	  });
	
	  this.start = function () {
	    this.isRunning = true;
	    this.eachFrame(this.onEachFrame);
	
	    this.items.forEach(function (_item) {
	      _item.deselect();
	    });
	  };
	
	  this.stop = function () {
	    this.eachFrame(this.onEachFrame, false);
	  };
	
	  this.onEachFrame = function () {
	    if (!this.isRunning) return;
	
	    canvas.clear();
	
	    gameLoop.frame(this);
	
	    this.items.forEach(function (_item) {
	      canvas.draw(_item);
	    });
	  };
	
	  this.isImageTarget = function (_item, _point) {
	    var pixel;
	
	    this.bctx.clearRect(0, 0, this.buffer.width, this.buffer.height);
	    this.bctx.drawImage(_item.image, 0, _item.image.getAttribute('top') * _item.image.naturalHeight / 15, _item.size.width, _item.size.height, _item.position.x, _item.position.y, _item.backgroundSize.width, _item.backgroundSize.height);
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
	    cursor = this.event.cursor.scale(scale / this.game.zoom).dec(offset).math('floor');
	
	    this.reverseItems.every(function (_item) {
	      if (self.isImageTarget(_item, cursor)) {
	        _item.select();
	        returnValue = {
	          message: _item.$image.id(),
	          behaviorTarget: _item.$image
	        };
	        return false;
	      }
	
	      return true;
	    });
	
	    return returnValue;
	  });
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	pl.game.component('selectable-reveal', function () {
	
	  this.respond('select', function (_event) {
	    var index, stateMethod;
	
	    index = _event.message;
	    stateMethod = this.properties.selectState || 'select';
	
	    if (Number.isInteger(index) && ~index) {
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
/* 10 */
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
	    if (this.allowSelectAll || _$target.prev().hasClass(this.STATE.HIGHLIGHTED) || _$target.index() === 0) {
	      return !this.screen.state(this.STATE.VOICE_OVER);
	    }
	
	    return false;
	  };
	
	  this.start = function () {
	    this.allowSelectAll = typeof this.attr('pl-allow-select-all') !== 'undefined';
	  };
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	pl.game.component('title', function () {});

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