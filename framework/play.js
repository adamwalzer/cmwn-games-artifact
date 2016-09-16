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

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	/**
	 * Boot file for the Play library.
	 *
	 * @module
	 *
	 * @author Micah Rolon <micah@ginasink.com>
	 *
	 * @requires jQExtentions
	 * @requires play
	 */
	
	__webpack_require__(4);
	
	var _play = __webpack_require__(58);
	
	var _play2 = _interopRequireDefault(_play);
	
	/**
	 * Begin running the library
	 */
	function run() {
	  _play2['default'].game.run();
	}
	
	// export namespace to global object.
	window.play = window.pl = _play2['default'];
	
	// Invoke 'run' when DOM has finished loading.
	document.addEventListener('DOMContentLoaded', run, false);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _Array$forEach = __webpack_require__(5)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	/**
	 * Extentions to jQuery used by the library.
	 *
	 * @module
	 * @author Micah Rolon <micah@ginasink.com>
	 *
	 * @requires types/Dimensions
	 * @requires Matrix
	 */
	
	var _typesDimensions = __webpack_require__(36);
	
	var _libMatrix = __webpack_require__(57);
	
	var _libMatrix2 = _interopRequireDefault(_libMatrix);
	
	/**
	 * jQuery's prototype
	 * @external jQuery
	 * @see {@link http://api.jquery.com/}
	 */
	
	(function () {
	  var original;
	
	  original = {
	    position: this.position
	  };
	
	  /**
	   * Resolves the scope for each of the set of matched nodes.
	   * @function external:jQuery#scope
	   * @returns {Scope|array} Scope - for 1 result. array - for multiple.
	   */
	  this.scope = function () {
	    var result;
	
	    result = [];
	
	    this.each(function () {
	      var $node, scope;
	
	      $node = $(this);
	      scope = $node.data('pl-scope');
	
	      if (!scope) {
	        scope = $node.closest('.pl-scope').data('pl-scope');
	      }
	
	      if (scope) result.push(scope);
	    });
	
	    return result.length > 1 ? result : result[0];
	  };
	
	  /**
	   * Resolves the id on the first node in the collection. The id can be sourced from a node's 'id', 'pl-id' or 'pl-component' arguments.
	   * @function external:jQuery#id
	   * @arg {string} [_set] Name to set as the node's id.
	   * @returns {string} The resolved id.
	   */
	  this.id = function (_set) {
	    if (_set !== undefined) {
	      // Remove attribute.
	      if (~['', null].indexOf(_set)) {
	        this.attr('id', null);
	      }
	
	      // If document already has the id defined then set as a unique library id.
	      if ($('#' + _set).length) {
	        this.attr('pl-id', _set);
	      } else {
	        this.attr('id', _set);
	      }
	
	      return this;
	    }
	
	    return this.attr('id') || this.attr('pl-id') || this.attr('pl-component');
	  };
	
	  /**
	   * Provides the 'relative' CSS selector for the first node in the collection.
	   * @function external:jQuery#address
	   * @returns {string}
	   *
	   * @example
	   * // HTML: <div id="sweater" class="wide"></div>
	   * $('#sweater').address() // div#sweater.wide
	   */
	  this.address = function () {
	    var tag, id, classes;
	
	    tag = this[0].nodeName.toLowerCase();
	    id = this.attr('id');
	    classes = this.attr('class') ? '.' + this.attr('class').split(' ').join('.') : '';
	
	    return tag + (id ? '#' + id : '') + classes;
	  };
	
	  /**
	   * Provides a node's UPPER CASE class names. Given '_test' it will check if the node has the class.
	   * @function external:jQuery#state
	   * @arg {string} [_test] The UPPER CASE class name to test on the first node in the collection.
	   * @returns {string|array|boolean} string - for one result. array - for multiple. boolean - for tests.
	   */
	  this.state = function (_test) {
	    var classes;
	
	    if (_test) return this.hasClass(_test.toUpperCase());
	
	    classes = (this.attr('class') || '').match(/[0-9A-Z]+(?:-[0-9A-Z]+)?/g);
	
	    return classes && (classes.length === 1 ? classes[0] : classes);
	  };
	
	  this.size = function () {
	    var size;
	
	    if (!arguments.length) {
	      size = _typesDimensions.Size.create().set(this.width(), this.height());
	    } else {
	      size = _typesDimensions.Size.create(arguments);
	      this.css(size);
	    }
	
	    return size;
	  };
	
	  this.position = function () {
	    var pos;
	
	    if (!arguments.length) {
	      pos = original.position.call(this);
	      pos = _typesDimensions.Point.create().set(pos.left, pos.top);
	    } else {
	      pos = _typesDimensions.Point.create(arguments);
	
	      this.css({
	        position: 'relative',
	        left: pos.x,
	        top: pos.y
	      });
	    }
	
	    return pos;
	  };
	
	  /**
	   * Provides the jQuery offset for the first node in the collection.
	   * Given a point, all nodes in the collection will get {position: absolute;} to the corrdinates.
	   * @function external:jQuery#absolutePosition
	   * @returns {Point}
	   */
	  this.absolutePosition = function () {
	    var offset;
	
	    if (!arguments.length) {
	      offset = this.offset();
	
	      return _typesDimensions.Point.create().set(offset.left, offset.top);
	    } else {
	      offset = _typesDimensions.Point.create(arguments);
	
	      this.css({
	        position: 'absolute',
	        top: offset.y,
	        left: offset.x
	      });
	
	      return offset;
	    }
	  };
	
	  /**
	   * Sets a CSS matrix transform on all nodes in the collection. (overloaded)
	   * @function external:jQuery#transform
	   * @arg {number} [_scaleX] - scale x
	   * @arg {number} [_shearY] - shear y
	   * @arg {number} [_shearX] - shear x
	   * @arg {number} [_scaleY] - scale y
	   * @arg {number} [_translateX] - translate x
	   * @arg {number} [_translateY] - translate y
	   * @returns {Matrix}
	   */
	
	  /**
	   * Provides the CSS matrix transform for the first node in the collection.
	   * @function external:jQuery#transform
	   * @returns {Matrix}
	   */
	  this.transform = function () {
	    var t, matrix, is3d;
	
	    matrix = new _libMatrix2['default']();
	
	    if (!arguments.length) {
	      t = this.css('transform');
	      is3d = !! ~t.indexOf('matrix3d');
	
	      if (t !== 'none') {
	        t = ((t.match(/\(([,\d\.\s\-]+)\)/) || [])[1] || '').split(/\s*,\s*/);
	        if (is3d) {
	          t = (function (_matrix) {
	            var i, result;
	
	            result = [];
	
	            for (i = 0; i < _matrix.length; i += 4) {
	              result = result.concat(_matrix.slice(i, i + 2));
	            }
	            return result;
	          })(t);
	        }
	
	        t = t.map(parseFloat);
	
	        matrix.setTransform.apply(matrix, t);
	
	        return matrix;
	      }
	
	      return t;
	    }
	
	    matrix.setTransform.apply(matrix, arguments);
	
	    this.css('transform', matrix.toCSS());
	
	    return matrix;
	  };
	
	  /**
	   * Getter/Setter for the CSS transform translation. (overloaded)
	   * @function external:jQuery#transformPosition
	   * @arg {Point} _point - A point object {x,y}
	   * @returns {Point}
	   */
	
	  /**
	   * Getter/Setter for the CSS transform translation.
	   * @function external:jQuery#transformPosition
	   * @arg {number} _x - x coordinate
	   * @arg {number} _y - y coordinate
	   * @returns {Point}
	   */
	  this.transformPosition = function () {
	    var matrix, point;
	
	    matrix = this.transform();
	    point = _typesDimensions.Point.create().set(0, 0);
	
	    if (!arguments.length) {
	      if (matrix !== 'none') point.set(matrix.e, matrix.f);
	    } else {
	      if (matrix === 'none') matrix = new _libMatrix2['default']();
	
	      point.set.apply(point, arguments);
	      matrix.translate(point.x, point.y);
	      this.css('transform', matrix.toCSS());
	    }
	
	    return point;
	  };
	
	  /**
	   * Getter for the CSS transform scale. (overloaded)
	   * @function external:jQuery#transformPosition
	   * @returns {Point}
	   */
	
	  /**
	   * Setter for the CSS transform scale. (overloaded)
	   * @function external:jQuery#transformPosition
	   * @arg {Point} _point - A point object {x,y}
	   * @returns {Point}
	   */
	
	  /**
	   * Setter for the CSS transform scale.
	   * @function external:jQuery#transformPosition
	   * @arg {number} _x - x coordinate
	   * @arg {number} _y - y coordinate
	   * @returns {Point}
	   */
	  this.transformScale = function () {
	    var matrix, scale;
	
	    matrix = this.transform();
	    scale = _typesDimensions.Point.create().set(1, 1);
	
	    if (!arguments.length) {
	      if (matrix !== 'none') scale.set(matrix.a, matrix.d);
	    } else {
	      if (matrix === 'none') matrix = new _libMatrix2['default']();
	
	      scale.set.apply(scale, arguments);
	      matrix.scale(scale.x, scale.y);
	      this.css('transform', matrix.toCSS());
	    }
	
	    return scale;
	  };
	
	  /**
	   * Accessor method for `pl` attributes.
	   */
	  this.pl = function (_name, _value) {
	    var args, result;
	
	    if (!_name) {
	      result = {};
	      this.each(function () {
	        _Array$forEach(this.attributes, function (_attr) {
	          if (_attr.name.indexOf('pl-') === 0) {
	            result[_attr.name.slice(3)] = _attr.value;
	          }
	        });
	      });
	      return result;
	    }
	
	    args = ['pl-' + _name];
	    if (typeof _value !== 'undefined') args.push(_value);
	
	    if (_value === null) {
	      this.removeAttr('pl-' + _name);
	      return this;
	    }
	
	    return this.attr.apply(this, args);
	  };
	
	  /**
	   * Invoke a method of each item in the set of matched elements.
	   */
	  this.exec = function (_method, _args) {
	    return this.map(function () {
	      if (typeof this[_method] === 'function') return this[_method].apply(this, _args);
	    }).toArray();
	  };
	}).call($.fn);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	module.exports = __webpack_require__(10).Array.forEach;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(8)
	  , $forEach = __webpack_require__(23)(0)
	  , STRICT   = __webpack_require__(35)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , hide      = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(21)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(11)
	  , IObject  = __webpack_require__(24)
	  , toObject = __webpack_require__(26)
	  , toLength = __webpack_require__(28)
	  , asc      = __webpack_require__(30);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(25);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(27);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(29)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(16)
	  , isArray  = __webpack_require__(31)
	  , SPECIES  = __webpack_require__(32)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(25);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(33)('wks')
	  , uid        = __webpack_require__(34)
	  , Symbol     = __webpack_require__(9).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(19);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var _Object$defineProperties = __webpack_require__(37)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 *
	 * @module
	 * @version 1.1
	 * @author Micah Rolon <functionmicah@gmail.com>
	 * @requires module:types/BasicArray~BasicArray
	 *
	 * @desc *Created: 11/12/14*
	 *
	 * This file contains objects for containing values about a plane. i.e. x or width.
	 * Adds the convenience of keeping these values paired to passed around your application.
	 * It also includes methods which you perform on the values and returns a new object
	 * so the original values are maintained.
	 *
	 * #### Usage
	 *
	 * New instances can be created by calling the create method.
	 * ```
	 * cursorLocation = Point.create();
	 * ```
	 *
	 * Then call `set()` to apply your values.
	 * ```
	 * cursorLocation.set(event.clientX, event.clientY);
	 * ```
	 *
	 * Then you can use the calculation methods to perform transformations.
	 * ```
	 * relativeCursor = cursorLocation.scale(zoom);
	 * ```
	 *
	 * #### Developer Notes
	 *
	 * When adding new methods make sure you are returning a new instance.
	 * Dimensional objects are meant to be immutable.
	 *
	 * Follow this pattern:
	 * ```
	 * this.method = function () {
	 *     // set with your calculated values.
	 *     return this.create().set( ... )
	 * }
	 * ```
	 *
	 * #### Change Log
	 * *v1.1 - 12/13/15*
	 * - Defined setter/getter properties for unique planes keys. You can now do `point.width = 10`.
	 */
	
	/*jslint browser: true, eqeq: true, nomen: true, sloppy: true, white: true */
	
	var _typesBasicArray = __webpack_require__(49);
	
	var _typesBasicArray2 = _interopRequireDefault(_typesBasicArray);
	
	var Dimension, Size, Point;
	
	/**
	 * The native Array
	 * @external Array
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array}
	 */
	
	/**
	 * Array prototype extension
	 * Creates an instance of `_Thing` and passes the array to its set function as its arguments.
	 * @function external:Array#to
	 * @arg {Point|Size|string} _Thing - A Dimension object or one the strings 'point'/'size'
	 * @example
	 * somePoint = [10, 10].to(Point);
	 * somePoint = [10, 10].to('point');
	 */
	Array.prototype.to = function (_Thing) {
	  var map;
	
	  map = {
	    point: Point,
	    size: Size
	  };
	
	  if (typeof _Thing === 'string') {
	    return map[_Thing.toLowerCase()].create().set(this);
	  } else if (typeof _Thing === 'object' && ~[Point.set, Size.set].indexOf(_Thing.set)) {
	    if (!_Thing.isPrototypeOf(this)) {
	      return _Thing.set.apply(_Thing.create(), this);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * <span class="important">NOTE:</span> This is NOT a constructor. use `Dimension.create()` to get a new instance.
	 * @class
	 * @classdesc Base class for dimensional objects consisting of 2 planes.<br>
	 * <span class="important">NOTE:</span> This is an immutable class. Methods return a new object with the original as its prototype.
	 * @extends module:types/BasicArray~BasicArray
	 */
	Dimension = _typesBasicArray2['default'].extend(function () {
	  var originalMap;
	
	  originalMap = this.map;
	
	  this[0] = this[1] = 0;
	  this.planeMap = null, this.length = 2;
	
	  /**
	   * Provides a new instance.
	   * @arg {array} _argumentsArray - Create a new instace with an arguments array.
	   * @returns {Dimension}
	   */
	  this.create = function (_argumentsArray) {
	    var instance;
	
	    instance = this.proto();
	
	    if (_argumentsArray) instance.set.apply(instance, _argumentsArray);
	
	    return instance;
	  };
	
	  /**
	   * Incerement each plane by a value or specify each plane.
	   * @arg {number} _val - plane a of (a,b)
	   * @arg {number} [_plane2] - plane b of (a,b)
	   * @returns {Dimension}
	   */
	  this.inc = function (_val, _plane2) {
	    var a, b;
	
	    if (_val.length === 2) {
	      a = _val[0];
	      b = _val[1];
	    } else if (_plane2 != null) {
	      a = _val;
	      b = _plane2;
	    } else {
	      a = b = _val;
	    }
	
	    return this.create().set(this[0] + a, this[1] + b);
	  };
	
	  /**
	   * Decerement each plane by a value or specify each plane.
	   * @arg {number} _val - plane a of (a,b)
	   * @arg {number} [_plane2] - plane b of (a,b)
	   * @returns {Dimension}
	   */
	  this.dec = function (_val, _plane2) {
	    var a, b;
	
	    if (_val.length === 2) {
	      a = _val[0];
	      b = _val[1];
	    } else if (_plane2 != null) {
	      a = _val;
	      b = _plane2;
	    } else {
	      a = b = _val;
	    }
	
	    return this.create().set(this[0] - a, this[1] - b);
	  };
	
	  /**
	   * Multiply each plane by a value or specify each plane.
	   * @arg {number} _scale - plane a of (a,b)
	   * @arg {number} [_plane2] - plane b of (a,b)
	   * @returns {Dimension}
	   */
	  this.scale = function (_scale, _plane2) {
	    return this.create().set(this[0] * _scale, this[1] * (_plane2 != null ? _plane2 : _scale));
	  };
	
	  /**
	   * Perfom a Math function on each plane
	   * @arg {string} _fun - a string of the function name in the JS Math object,
	   * followed by the whatever arguments the function takes after its first
	   * since the first argument is the plane value.
	   * @returns {Dimension}
	   */
	  this.math = function (_fun) {
	    var args = [].slice.call(arguments, 1);
	
	    return this.create().set(Math[_fun].apply(Math, [this[0]].concat(args)), Math[_fun].apply(Math, [this[1]].concat(args)));
	  };
	
	  /**
	   * Takes each plane value and passes it to parseInt().
	   * @returns {Dimension}
	   */
	  this.parseInt = function () {
	    return this.create().set(parseInt(this[0]), parseInt(this[1]));
	  };
	
	  /**
	   * Takes each plane value and passes it to parseFloat().
	   * @returns {Dimension}
	   */
	  this.parseFloat = function () {
	    return this.create().set(parseFloat(this[0]), parseFloat(this[1]));
	  };
	
	  /**
	   * Resolves the name of the plane at the given index.
	   * @arg {number} _index - The index of the plane.
	   * @returns {string}
	   */
	  this.planeOf = function (_index) {
	    if (isNaN(parseInt(_index))) return null;
	    return this.planeMap[_index];
	  };
	
	  /**
	   * Make a new array by iterating over each plane.<br>
	   * See [`Array.prototype.map()`]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map}
	   * @arg {function} _handler - handler for each index.
	   * @override
	   * @returns {Dimension}
	   */
	  this.map = function (_handler) {
	    return originalMap.call(this, _handler).to(Object.getPrototypeOf(this));
	  };
	
	  /**
	   * Multiplies the planes.
	   * @returns {number}
	   */
	  this.product = function () {
	    return this[0] * this[1];
	  };
	
	  /**
	   * Divides the planes.
	   * @returns {number}
	   */
	  this.ratio = function () {
	    return this[0] / this[1];
	  };
	
	  this.quotient = function () {
	    return Math.floor(this[0] / this[1]);
	  };
	
	  this.remainder = function () {
	    return this[0] % this[1];
	  };
	});
	
	/**
	 * <span class="important">NOTE:</span> This is NOT a constructor. use `Size.create()` to get a new instance.
	 * @class
	 * @extends module:types/Dimensions~Dimension
	 * @classdesc 2 Dimensional object containing width and height.<br>
	 * <span class="important">NOTE:</span> This is an immutable class. Methods return a new object with the original as its prototype.
	 * @prop {number} width - The width.
	 * @prop {number} height - The height.
	 */
	Size = Dimension.extend(function () {
	  /**
	   * Maps the names of the indexes.<br>
	   * See [Dimension#planeOf]{@link module:types/Dimensions~Dimension#planeOf} for resolving plane name.
	   * @protected
	   * @default ['width', 'height']
	   */
	  this.planeMap = ['width', 'height'];
	
	  _Object$defineProperties(this, {
	    width: {
	      get: function get() {
	        return this[0];
	      },
	
	      set: function set(_val) {
	        this[0] = Number(_val);
	      }
	    },
	
	    height: {
	      get: function get() {
	        return this[1];
	      },
	
	      set: function set(_val) {
	        this[1] = Number(_val);
	      }
	    }
	  });
	
	  /**
	   * Define the size with an object. (overloaded)
	   * @function module:types/Dimensions~Size#set
	   * @arg {object} _size - A size object {width, height}.
	   * @returns {Size}
	   */
	
	  /**
	   * Define the size with an array. (overloaded)
	   * @function module:types/Dimensions~Size#set
	   * @arg {array} _size - A size array [width, height].
	   * @returns {Size}
	   */
	
	  /**
	   * Define the size.
	   * @arg {number} _width - The width.
	   * @arg {number} _height - The height.
	   * @returns {Size}
	   */
	  this.set = function (_width, _height) {
	    if (arguments.length === 1) {
	      if (_width.width !== undefined && _width.height !== undefined) {
	        this[0] = Number(_width.width);
	        this[1] = Number(_width.height);
	      } else if (_width.length === 2) {
	        this[0] = Number(_width[0]);
	        this[1] = Number(_width[1]);
	      }
	    } else {
	      this[0] = Number(_width);
	      this[1] = Number(_height);
	    }
	
	    return this;
	  };
	
	  /**
	   * Calculates the hypotenuse.
	   * @see {@link https://en.wikipedia.org/wiki/Hypotenuse}
	   * @returns {number}
	   */
	  this.hypotenuse = function () {
	    return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
	  };
	
	  /**
	   * Sets width and height properties on the given object. If the object is an HTML node then it will be set on the nodes style object.
	   * @arg {object|HTMLElement} - The object or DOM node.
	   * @returns {this}
	   */
	  this.applyTo = function (_object) {
	    if (_object.nodeType === document.ELEMENT_NODE) {
	      if (!(_object.width !== undefined || _object.height !== undefined)) {
	        _object.style.width = this.width;
	        _object.style.height = this.height;
	
	        return this;
	      }
	    }
	
	    _object.width = this.width;
	    _object.height = this.height;
	
	    return this;
	  };
	});
	
	/**
	 * <span class="important">NOTE:</span> This is NOT a constructor. use `Point.create()` to get a new instance.
	 * @class
	 * @extends module:types/Dimensions~Dimension
	 * @classdesc Object containing coordinates on a 2-dimensional cartesian plane.<br>
	 * <span class="important">NOTE:</span> This is an immutable class. Methods return a new object with the original as its prototype.
	 * @prop {number} x - The x coordinate.
	 * @prop {number} y - The y coordinate.
	 */
	Point = Dimension.extend(function () {
	  /**
	   * Maps the names of the indexes.<br>
	   * See [Dimension#planeOf]{@link module:types/Dimensions~Dimension#planeOf} for resolving plane name.
	   * @protected
	   * @default ['x', 'y']
	   */
	  this.planeMap = ['x', 'y'];
	
	  _Object$defineProperties(this, {
	    x: {
	      get: function get() {
	        return this[0];
	      },
	
	      set: function set(_val) {
	        this[0] = Number(_val);
	      }
	    },
	
	    y: {
	      get: function get() {
	        return this[1];
	      },
	
	      set: function set(_val) {
	        this[1] = Number(_val);
	      }
	    }
	  });
	
	  /**
	   * Define the point with an object. (overloaded)
	   * @function module:types/Dimensions~Point#set
	   * @arg {object} _point - A point object {x, y}.
	   * @returns {Point}
	   */
	
	  /**
	   * Define the point with an array. (overloaded)
	   * @function module:types/Dimensions~Point#set
	   * @arg {array} _point - A point array [x, y].
	   * @returns {Point}
	   */
	
	  /**
	   * Define the point.
	   * @arg {number} _x - The x.
	   * @arg {number} _y - The y.
	   * @returns {Point}
	   */
	  this.set = function (_x, _y) {
	    if (arguments.length === 1) {
	      if (_x.x !== undefined && _x.y !== undefined) {
	        this[0] = Number(_x.x);
	        this[1] = Number(_x.y);
	      } else if (_x.length === 2) {
	        this[0] = Number(_x[0]);
	        this[1] = Number(_x[1]);
	      }
	    } else {
	      this[0] = Number(_x);
	      this[1] = Number(_y);
	    }
	
	    return this;
	  };
	
	  /**
	   * Calculates the distance between the insatnce and a point object.
	   * @arg {Point} _point - A point object {x,y}.
	   * @returns {Size}
	   */
	  this.distance = function (_point) {
	    if (_point.x !== undefined && _point.y !== undefined) {
	      return Size.create().set(_point.x - this.x, _point.y - this.y);
	    }
	
	    return null;
	  };
	
	  /**
	   * Sets x and y properties on the given object. If the object is an HTML node then the left and top properties will be set on the nodes style object.
	   * @arg {object|HTMLElement} - The object or DOM node.
	   * @returns {this}
	   */
	  this.applyTo = function (_object) {
	    if (_object.nodeType === document.ELEMENT_NODE) {
	      _object.style.left = this.x;
	      _object.style.top = this.y;
	    } else {
	      _object.x = this.x;
	      _object.y = this.y;
	    }
	
	    return this;
	  };
	
	  /**
	   * Rotate the point based on an origin point and an angle in degrees.
	   * @arg {Point} _origin - A point object {x,y}.
	   * @arg {number} _angle - The angle of rotation in degrees.
	   * @returns {this}
	   */
	  this.rotate = function (_origin, _angle) {
	    var x, y, rad;
	
	    rad = _angle * (Math.PI / 180);
	
	    x = this.x - _origin.x;
	    y = this.y - _origin.y;
	
	    return this.create().set(Math.sin(rad) * x - Math.cos(rad) * y + _origin.x, Math.cos(rad) * x + Math.sin(rad) * y + _origin.y);
	  };
	});
	
	exports['default'] = { Dimension: Dimension, Size: Size, Point: Point };
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperties(T, D){
	  return $Object.defineProperties(T, D);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperties: __webpack_require__(40)});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(14)
	  , anObject = __webpack_require__(15)
	  , getKeys  = __webpack_require__(41);
	
	module.exports = __webpack_require__(18) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(42)
	  , enumBugKeys = __webpack_require__(48);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(43)
	  , toIObject    = __webpack_require__(44)
	  , arrayIndexOf = __webpack_require__(45)(false)
	  , IE_PROTO     = __webpack_require__(47)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(24)
	  , defined = __webpack_require__(27);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(44)
	  , toLength  = __webpack_require__(28)
	  , toIndex   = __webpack_require__(46);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(33)('keys')
	  , uid    = __webpack_require__(34);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Base object type for 'array like' objects.
	 * @module
	 * @requires module:util
	 * @requires module:types/Basic
	 */
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesBasic = __webpack_require__(51);
	
	var _typesBasic2 = _interopRequireDefault(_typesBasic);
	
	/**
	 * <span class="important">NOTE:</span> This is NOT a constructor. use `BasicArray.create()` to get a new instance.
	 * @classdesc A base object type for 'array like' object.
	 * @class
	 * @extends external:Array
	 * @extends module:types/Basic~Basic
	 * @mixes module:types/Basic~Basic
	 */
	var BasicArray = (function () {
	  /**
	   * Objects with this as an own property will be identified as the root object.
	   * @memberof module:types/BasicArray~BasicArray
	   * @readonly
	   * @default
	   */
	  this.baseType = 'TYPE_BASIC_ARRAY';
	
	  _util2['default'].mixin(this, _typesBasic2['default']);
	
	  return this;
	}).call([]);
	
	exports['default'] = BasicArray;
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports) {

	exports.__esModule = true;
	/**
	 * Utility functions.
	 * @namespace
	 * @author Micah Rolon <micah@ginasink.com>
	 * @memberof module:play~pl
	 */
	var util = new function () {
	
	  /**
	   * Accepts one or more objects to combine their own properties to single object.
	   * @arg {object} _target - The object that will recieve all members.
	   * @arg {object} _sources... - The object(s) to join with the '_target'.
	   * @returns {object} _target
	   */
	  this.mixin = function () {
	    var member, i, target, objs;
	
	    //@TODO MPR 4/28/16: This feels like its trying to invent named arguments...
	    //even if objs remains like this, target doesnt need to
	    target = arguments[0];
	    objs = [].slice.call(arguments, 1);
	
	    for (i = 0; i < objs.length; i += 1) {
	      for (member in objs[i]) {
	        if (!objs[i].hasOwnProperty(member)) continue;
	        target[member] = objs[i][member];
	      }
	    }
	
	    return target;
	  };
	
	  /**
	   * Matches the name of the key which references the given pointer inside an object. Like indexOf() for objects.
	   * @arg {object} _obj - Object to search in.
	   * @arg {*} _member - The reference which is expected to be in the object as a property.
	   * @returns {string} The name of the key in the object matching '_member'.
	   */
	  this.keyOf = function (_obj, _member) {
	    var member;
	
	    for (member in _obj) {
	      if (!_obj.hasOwnProperty(member)) continue;
	      if (_obj[member] === _member) return member;
	    }
	
	    return null;
	  };
	
	  /**
	   * Matches the object, deep in the prototype chain, which is the owner of the property referencing the given pointer.
	   * @arg {object} _obj - The object to search.
	   * @arg {*} _member - The reference which is expected to be a property in the prototype chain.
	   * @return {object} An object containing the name of the property and the owning object. {name, object}
	   */
	  this.getOwner = function (_obj, _member) {
	    var prototype, name;
	
	    prototype = Object.getPrototypeOf(_obj);
	
	    // keep searching until we go as deep as we can go.
	    while (prototype) {
	      // search for the key in the prototype
	      name = util.keyOf(prototype, _member);
	
	      // If we found the key in the prototype then we found
	      // our match and we can break out of the loop.
	      if (name) break;
	
	      // Otherwise go deeper (thats what she said ;p)
	      prototype = Object.getPrototypeOf(prototype);
	    }
	
	    return {
	      name: name,
	      object: prototype
	    };
	  };
	
	  /**
	   * Given a range; provides a random number in that range.
	   * @function play~pl.util.random
	   * @arg {number} _rangeA - A number for the low end of the range.
	   * @arg {number} _rangeB - The top end of the range.
	   * @returns {number|*} The resulting number in range or the member found at random.
	   */
	
	  /**
	   * Given an iterable; provides a random item.
	   * @arg {array} _collection - The iterable.
	   * @returns {number|*} The member found at random.
	   */
	  this.random = function (_collection_rangeA, _rangeB) {
	    var index, val;
	
	    index = Math.floor(Math.random() * _collection_rangeA.length);
	
	    if (arguments.length === 2) {
	      val = Math.round(Math.random() * _rangeB);
	
	      return val < _collection_rangeA ? _collection_rangeA : val;
	    }
	
	    if (index === _collection_rangeA.length) index = _collection_rangeA.length - 1;
	
	    return _collection_rangeA && _collection_rangeA[index];
	  };
	
	  /**
	   * Take string and makes it dot notation friendly.
	   * @arg {string} _id - The string to transform.
	   * @arg {boolean} _camelCase - Transform with camel case.
	   * @returns {string}
	   */
	  this.transformId = function (_id, _camelCase) {
	    if (_id && _camelCase) {
	      return _id.replace(/[-\s]+([\w\d]?)/g, function (_match) {
	        return RegExp.$1.toUpperCase();
	      });
	    }
	
	    return _id && _id.replace(/[-\s]+/g, '_');
	  };
	
	  /**
	   * Test all arguments for != null
	   * @return {boolean}
	   */
	  this.isSet = function () {
	    return [].every.call(arguments, function (_arg) {
	      return _arg != null;
	    });
	  };
	
	  /**
	   * Parses a formated string and calculates it in milliseconds.
	   * @arg {string} _source - The formated string for calculation in the pattern '1d 1h 1m 1s'.
	   * @return {number}
	   */
	  this.toMillisec = function (_source) {
	    var tokens, time, units;
	
	    if (typeof _source === 'number') return _source;
	    if (!_source) return;
	
	    tokens = _source.split(/\s+/);
	    time = 0;
	    units = {
	      d: 24 * 60 * 60 * 1000,
	      h: 60 * 60 * 1000,
	      m: 60 * 1000,
	      s: 1000
	    };
	
	    tokens.forEach(function (_token) {
	      var unit, value;
	
	      unit = (_token.match(/[dhms]/) || [])[0];
	
	      if (unit) {
	        value = Number(_token.slice(0, -1));
	        time += value * units[unit];
	      } else {
	        time += Number(_token);
	      }
	    });
	
	    return time;
	  };
	
	  /**
	   * Needs no introduction
	   * @arg {iterable} _collection - iterable.
	   * @return {array}
	   */
	  this.toArray = function (_collection) {
	    return Array.prototype.map.call(_collection, function (i) {
	      return i;
	    });
	  };
	
	  /**
	   * Resolves the value in the object at the given path.
	   * @arg {object} _obj - The object to query.
	   * @arg {string} _path - The path to the desired reference.
	   * @returns {*} The resulting reference value.
	   * @example
	   * var user = {
	   *   name: 'John',
	   *   family: {
	   *     guardians: {David}, // property could be an array of multiple guardians.
	   *     siblings: [{Jane}, {Thomas}] // collection of user objects.
	   *   }
	   * };
	   *
	   * pl.util.resolvePath(user, 'family.sliblings[2].name');
	   * // Matches the `guardians` propery if `guardians[0]` is undefined when `?` is used.
	   * pl.util.resolvePath(user, 'family.guardians[0]?.name');
	   */
	  this.resolvePath = function (_obj, _path) {
	    var path, obj, i, name, index, testArray;
	
	    path = _path.split('.');
	    obj = _obj;
	    i = 0;
	
	    while (obj) {
	      testArray = /\?$/.test(path[i]);
	      index = (path[i].match(/\[(\d+)\]/) || [])[1] || -1;
	      name = ~index ? path[i].slice(0, path[i].indexOf('[')) : path[i];
	      obj = obj[name];
	
	      if (~index && obj) {
	        obj = testArray ? obj[index] || obj : obj[index];
	      }
	
	      i += 1;
	
	      if (path.length === i) break;
	    }
	
	    return obj;
	  };
	
	  this.assignRef = function (_obj, _name, _ref) {
	    var name;
	
	    name = util.transformId(_name, true);
	
	    if (_obj[name] === _ref) return _ref;
	
	    if (_obj[name]) {
	      if (!_obj[name].__refCollction__) {
	        _obj[name] = [_obj[name]];
	
	        Object.defineProperty(_obj[name], '__refCollction__', {
	          value: true,
	          enumerable: false,
	          writeable: false,
	          configureable: false
	        });
	      }
	      _obj[name].push(_ref);
	    } else {
	      _obj[name] = _ref;
	    }
	
	    return _obj[name];
	  };
	
	  /**
	   * N0 OPeration.
	   */
	  this.noop = function () {};
	
	  /**
	   * Get the file name out of a simple file path.
	   * @arg {string} _path - The file path.
	   * @returns {string} The extracted name.
	   */
	  this.resolveFileName = function (_path) {
	    return _path.slice(_path.lastIndexOf('/') + 1);
	  };
	
	  /**
	   * Produces a string following the specied pattern. Which is a mix of x, y, z and - characters.
	   * - x; produces a letter a-f.
	   * - y; produces a digit 0-9.
	   * - z; produces a 4 character hex value derived from the now time stamp.
	   * @arg {string} _pattern - The xyz pattern.
	   * @returns {string} The generated ID.
	   */
	  this.createId = function (_pattern) {
	    return (_pattern || 'xy-z').replace(/[xyz]/g, function (_token) {
	      if (_token === 'x') return (Math.floor(Math.random() * 5) + 10).toString(16);
	      if (_token === 'y') return Math.floor(Math.random() * 10).toString(16);
	      return Math.floor(Math.random() * Date.now()).toString(16).slice(0, 4);
	    });
	  };
	}();
	
	exports['default'] = util;
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var _Object$create = __webpack_require__(52)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Base object type for 'classes' implementing methods for extention and super callbacks.
	 * @module
	 * @requires module:play~pl.util
	 */
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	/**
	 * <span class="important">NOTE:</span> This is NOT a constructor. use `Basic.create()` to get a new instance.
	 * @classdesc The base type for all objects which will act as prototypes.
	 * @class
	 */
	var Basic = {
	  /**
	   * Objects with this as an own property will be identified as the root object.
	   * @readonly
	   * @default
	   */
	  baseType: 'TYPE_BASIC',
	
	  /**
	   * Creates a new object with the current object as its prototype.
	   * @instance
	   * @returns {Basic} The new instance.
	   */
	  create: function create() {
	    return _Object$create(this);
	  },
	
	  /**
	   * Creates a new object using a constructor function or object with the current object as its prototype.
	   * @instance
	   * @arg {Function|Object} _implementation - The implementation of the new type as either a constructor function or object to mixin.
	   * @returns {Basic} The new instance.
	   *
	   * @todo define constructor property
	   */
	  extend: function extend(_implementation) {
	    var instance;
	
	    if (!_implementation) return null;
	
	    switch (typeof _implementation) {
	      case 'function':
	        _implementation.prototype = this;
	        instance = new _implementation();
	        break;
	
	      case 'object':
	        instance = this.create();
	        instance.mixin(_implementation);
	        break;
	
	      default:
	        console.error('TypeError: Invalid type given for object extention.', typeof _implementation);
	    }
	
	    return instance;
	  },
	
	  /**
	   * Accepts one or more objects to combine their own properties to the instance.
	   * @instance
	   * @arg {object} _sources... - The object(s) to join with the instance.
	   * @returns this
	   */
	  mixin: function mixin() {
	    return _util2['default'].mixin.apply(null, [this].concat([].slice.call(arguments, 0)));
	  },
	
	  /**
	   * Matches the name of the key which references the given pointer inside the instance. Like indexOf() for objects.
	   * @instance
	   * @arg {*} _member - The reference which is expected to be in the object as a property.
	   * @returns {string} The name of the key in the object matching '_member'.
	   */
	  keyOf: function keyOf(_member) {
	    return _util2['default'].keyOf(this, _member);
	  },
	
	  /**
	   * Performs a super callback of the function which called it. Allowing you to still invoke a method which was overridden.
	   * @instance
	   * @arg {*} _args... - Whatever amount of arguments the caller takes.
	   * @returns {*} Whatever the caller returns.
	   */
	  proto: function proto() {
	    var method, name, owner, prototype;
	
	    // Get the function which invoked proto() in the call stack.
	    // If the caller is a behavior then we retrieve the method.
	    method = this.proto.caller.method || this.proto.caller;
	
	    // Check to see if 'this' owns the method.
	    // NOTE: We may want to move this logic into getOwner().
	    if (name = this.keyOf(method)) {
	      prototype = Object.getPrototypeOf(this);
	    } else {
	      // Otherwise find the object which owns the caller function.
	      owner = _util2['default'].getOwner(this, method);
	      name = owner.name;
	      prototype = Object.getPrototypeOf(owner.object);
	    }
	
	    method = prototype[name];
	
	    if (!method) {
	      console.error('ReferenceError: Unable to locate prototype method.', this.proto.caller);
	      return null;
	    }
	
	    return method.apply(this, arguments);
	  },
	
	  /**
	   * Performs a super callback of the function which called it. Unlike `proto()` which looks for the overidden method, sup looks for the base class' implementation.
	   * @instance
	   * @arg {*} _args... - Whatever amount of arguments the caller takes.
	   * @returns {*} Whatever the caller returns.
	   */
	  sup: function sup() {
	    var method, name, owner, prototype;
	
	    // Get the function which invoked sup() in the call stack.
	    method = this.sup.caller;
	    owner = _util2['default'].getOwner(this, this.baseType);
	    prototype = owner.object;
	    name = this.keyOf(method);
	
	    // Check to see if 'this' owns the method.
	    // NOTE: We may want to move this logic into getOwner().
	    //
	    if (!name) {
	      owner = _util2['default'].getOwner(this, method);
	      name = owner.name;
	    }
	
	    method = prototype[name];
	
	    if (!method) {
	      console.error('ReferenceError: Unable to locate prototype method.', this.sup.caller);
	      return null;
	    }
	
	    return method.apply(this, arguments);
	  },
	
	  /**
	   * Provides the object type.
	   * @instance
	   */
	  toString: function toString() {
	    var type;
	
	    if (this.baseType) {
	      type = this.baseType.replace('TYPE_', '');
	      type = type.slice(0, 1) + type.slice(1).toLowerCase();
	    } else {
	      type = this.constructor.name || 'Object';
	    }
	
	    return '[object ' + type + ']';
	  }
	
	};
	
	exports['default'] = Basic;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	var $Object = __webpack_require__(10).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(55)});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(15)
	  , dPs         = __webpack_require__(40)
	  , enumBugKeys = __webpack_require__(48)
	  , IE_PROTO    = __webpack_require__(47)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(20)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(56).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9).document && document.documentElement;

/***/ },
/* 57 */
/***/ function(module, exports) {

	exports.__esModule = true;
	/**
	 *
	 * Copy of the deleted repository epistemex/transformation-matrix-js.
	 * All rights are reserved to Epistemex.
	 *
	 * 2D transformation matrix object initialized with identity matrix.
	 *
	 * The matrix can synchronize a canvas context by supplying the context
	 * as an argument, or later apply current absolute transform to an
	 * existing context.
	 *
	 * All values are handled as floating point values.
	 *
	 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
	 * @prop {number} a - scale x
	 * @prop {number} b - shear y
	 * @prop {number} c - shear x
	 * @prop {number} d - scale y
	 * @prop {number} e - translate x
	 * @prop {number} f - translate y
	 * @prop {CanvasRenderingContext2D|null} [context=null] - set or get current canvas context
	 * @constructor
	 */
	function Matrix(context) {
	
	    var me = this;
	    me._t = me.transform;
	
	    me.a = me.d = 1;
	    me.b = me.c = me.e = me.f = 0;
	
	    me.context = context;
	
	    // reset canvas transformations (if any) to enable 100% sync.
	    if (context) context.setTransform(1, 0, 0, 1, 0, 0);
	}
	
	Matrix.prototype = {
	
	    /**
	     * Concatenates transforms of this matrix onto the given child matrix and
	     * returns a new matrix. This instance is used on left side.
	     *
	     * @param {Matrix} cm - child matrix to apply concatenation to
	     * @returns {Matrix}
	     */
	    concat: function concat(cm) {
	        return this.clone()._t(cm.a, cm.b, cm.c, cm.d, cm.e, cm.f);
	    },
	
	    /**
	     * Flips the horizontal values.
	     */
	    flipX: function flipX() {
	        return this._t(-1, 0, 0, 1, 0, 0);
	    },
	
	    /**
	     * Flips the vertical values.
	     */
	    flipY: function flipY() {
	        return this._t(1, 0, 0, -1, 0, 0);
	    },
	
	    /**
	     * Reflects incoming (velocity) vector on the normal which will be the
	     * current transformed x axis. Call when a trigger condition is met.
	     *
	     * NOTE: BETA, simple implementation
	     *
	     * @param {number} x - vector end point for x (start = 0)
	     * @param {number} y - vector end point for y (start = 0)
	     * @returns {{x: number, y: number}}
	     */
	    reflectVector: function reflectVector(x, y) {
	
	        var v = this.applyToPoint(0, 1),
	            d = 2 * (v.x * x + v.y * y);
	
	        x -= d * v.x;
	        y -= d * v.y;
	
	        return { x: x, y: y };
	    },
	
	    /**
	     * Short-hand to reset current matrix to an identity matrix.
	     */
	    reset: function reset() {
	        return this.setTransform(1, 0, 0, 1, 0, 0);
	    },
	
	    /**
	     * Rotates current matrix accumulative by angle.
	     * @param {number} angle - angle in radians
	     */
	    rotate: function rotate(angle) {
	        var cos = Math.cos(angle),
	            sin = Math.sin(angle);
	        return this._t(cos, sin, -sin, cos, 0, 0);
	    },
	
	    /**
	     * Converts a vector given as x and y to angle, and
	     * rotates (accumulative).
	     * @param x
	     * @param y
	     * @returns {*}
	     */
	    rotateFromVector: function rotateFromVector(x, y) {
	        return this.rotate(Math.atan2(y, x));
	    },
	
	    /**
	     * Helper method to make a rotation based on an angle in degrees.
	     * @param {number} angle - angle in degrees
	     */
	    rotateDeg: function rotateDeg(angle) {
	        return this.rotate(angle * Math.PI / 180);
	    },
	
	    /**
	     * Scales current matrix uniformly and accumulative.
	     * @param {number} f - scale factor for both x and y (1 does nothing)
	     */
	    scaleU: function scaleU(f) {
	        return this._t(f, 0, 0, f, 0, 0);
	    },
	
	    /**
	     * Scales current matrix accumulative.
	     * @param {number} sx - scale factor x (1 does nothing)
	     * @param {number} sy - scale factor y (1 does nothing)
	     */
	    scale: function scale(sx, sy) {
	        return this._t(sx, 0, 0, sy, 0, 0);
	    },
	
	    /**
	     * Scales current matrix on x axis accumulative.
	     * @param {number} sx - scale factor x (1 does nothing)
	     */
	    scaleX: function scaleX(sx) {
	        return this._t(sx, 0, 0, 1, 0, 0);
	    },
	
	    /**
	     * Scales current matrix on y axis accumulative.
	     * @param {number} sy - scale factor y (1 does nothing)
	     */
	    scaleY: function scaleY(sy) {
	        return this._t(1, 0, 0, sy, 0, 0);
	    },
	
	    /**
	     * Apply shear to the current matrix accumulative.
	     * @param {number} sx - amount of shear for x
	     * @param {number} sy - amount of shear for y
	     */
	    shear: function shear(sx, sy) {
	        return this._t(1, sy, sx, 1, 0, 0);
	    },
	
	    /**
	     * Apply shear for x to the current matrix accumulative.
	     * @param {number} sx - amount of shear for x
	     */
	    shearX: function shearX(sx) {
	        return this._t(1, 0, sx, 1, 0, 0);
	    },
	
	    /**
	     * Apply shear for y to the current matrix accumulative.
	     * @param {number} sy - amount of shear for y
	     */
	    shearY: function shearY(sy) {
	        return this._t(1, sy, 0, 1, 0, 0);
	    },
	
	    /**
	     * Apply skew to the current matrix accumulative.
	     * @param {number} ax - angle of skew for x
	     * @param {number} ay - angle of skew for y
	     */
	    skew: function skew(ax, ay) {
	        return this.shear(Math.tan(ax), Math.tan(ay));
	    },
	
	    /**
	     * Apply skew for x to the current matrix accumulative.
	     * @param {number} ax - angle of skew for x
	     */
	    skewX: function skewX(ax) {
	        return this.shearX(Math.tan(ax));
	    },
	
	    /**
	     * Apply skew for y to the current matrix accumulative.
	     * @param {number} ay - angle of skew for y
	     */
	    skewY: function skewY(ay) {
	        return this.shearY(Math.tan(ay));
	    },
	
	    /**
	     * Set current matrix to new absolute matrix.
	     * @param {number} a - scale x
	     * @param {number} b - shear y
	     * @param {number} c - shear x
	     * @param {number} d - scale y
	     * @param {number} e - translate x
	     * @param {number} f - translate y
	     */
	    setTransform: function setTransform(a, b, c, d, e, f) {
	        var me = this;
	        me.a = a;
	        me.b = b;
	        me.c = c;
	        me.d = d;
	        me.e = e;
	        me.f = f;
	        return me._x();
	    },
	
	    /**
	     * Translate current matrix accumulative.
	     * @param {number} tx - translation for x
	     * @param {number} ty - translation for y
	     */
	    translate: function translate(tx, ty) {
	        return this._t(1, 0, 0, 1, tx, ty);
	    },
	
	    /**
	     * Translate current matrix on x axis accumulative.
	     * @param {number} tx - translation for x
	     */
	    translateX: function translateX(tx) {
	        return this._t(1, 0, 0, 1, tx, 0);
	    },
	
	    /**
	     * Translate current matrix on y axis accumulative.
	     * @param {number} ty - translation for y
	     */
	    translateY: function translateY(ty) {
	        return this._t(1, 0, 0, 1, 0, ty);
	    },
	
	    /**
	     * Multiplies current matrix with new matrix values.
	     * @param {number} a2 - scale x
	     * @param {number} b2 - shear y
	     * @param {number} c2 - shear x
	     * @param {number} d2 - scale y
	     * @param {number} e2 - translate x
	     * @param {number} f2 - translate y
	     */
	    transform: function transform(a2, b2, c2, d2, e2, f2) {
	
	        var me = this,
	            a1 = me.a,
	            b1 = me.b,
	            c1 = me.c,
	            d1 = me.d,
	            e1 = me.e,
	            f1 = me.f;
	
	        /* matrix order (canvas compatible):
	         * ace
	         * bdf
	         * 001
	         */
	        me.a = a1 * a2 + c1 * b2;
	        me.b = b1 * a2 + d1 * b2;
	        me.c = a1 * c2 + c1 * d2;
	        me.d = b1 * c2 + d1 * d2;
	        me.e = a1 * e2 + c1 * f2 + e1;
	        me.f = b1 * e2 + d1 * f2 + f1;
	
	        return me._x();
	    },
	
	    /**
	     * Divide this matrix on input matrix which must be invertible.
	     * @param {Matrix} m - matrix to divide on (divisor)
	     * @returns {Matrix}
	     */
	    divide: function divide(m) {
	
	        if (!m.isInvertible()) throw "Input matrix is not invertible";
	
	        var im = m.inverse();
	
	        return this._t(im.a, im.b, im.c, im.d, im.e, im.f);
	    },
	
	    /**
	     * Divide current matrix on scalar value != 0.
	     * @param {number} d - divisor (can not be 0)
	     * @returns {Matrix}
	     */
	    divideScalar: function divideScalar(d) {
	
	        var me = this;
	        me.a /= d;
	        me.b /= d;
	        me.c /= d;
	        me.d /= d;
	        me.e /= d;
	        me.f /= d;
	
	        return me._x();
	    },
	
	    /**
	     * Get an inverse matrix of current matrix. The method returns a new
	     * matrix with values you need to use to get to an identity matrix.
	     * Context from parent matrix is not applied to the returned matrix.
	     * @returns {Matrix}
	     */
	    inverse: function inverse() {
	
	        if (this.isIdentity()) {
	            return new Matrix();
	        } else if (!this.isInvertible()) {
	            throw "Matrix is not invertible.";
	        } else {
	            var me = this,
	                a = me.a,
	                b = me.b,
	                c = me.c,
	                d = me.d,
	                e = me.e,
	                f = me.f,
	                m = new Matrix(),
	                dt = a * d - b * c; // determinant(), skip DRY here...
	
	            m.a = d / dt;
	            m.b = -b / dt;
	            m.c = -c / dt;
	            m.d = a / dt;
	            m.e = (c * f - d * e) / dt;
	            m.f = -(a * f - b * e) / dt;
	
	            return m;
	        }
	    },
	
	    /**
	     * Interpolate this matrix with another and produce a new matrix.
	     * t is a value in the range [0.0, 1.0] where 0 is this instance and
	     * 1 is equal to the second matrix. The t value is not constrained.
	     *
	     * Context from parent matrix is not applied to the returned matrix.
	     *
	     * Note: this interpolation is naive. For animation use the
	     * intrpolateAnim() method instead.
	     *
	     * @param {Matrix} m2 - the matrix to interpolate with.
	     * @param {number} t - interpolation [0.0, 1.0]
	     * @param {CanvasRenderingContext2D} [context] - optional context to affect
	     * @returns {Matrix} - new instance with the interpolated result
	     */
	    interpolate: function interpolate(m2, t, context) {
	
	        var me = this,
	            m = context ? new Matrix(context) : new Matrix();
	
	        m.a = me.a + (m2.a - me.a) * t;
	        m.b = me.b + (m2.b - me.b) * t;
	        m.c = me.c + (m2.c - me.c) * t;
	        m.d = me.d + (m2.d - me.d) * t;
	        m.e = me.e + (m2.e - me.e) * t;
	        m.f = me.f + (m2.f - me.f) * t;
	
	        return m._x();
	    },
	
	    /**
	     * Interpolate this matrix with another and produce a new matrix.
	     * t is a value in the range [0.0, 1.0] where 0 is this instance and
	     * 1 is equal to the second matrix. The t value is not constrained.
	     *
	     * Context from parent matrix is not applied to the returned matrix.
	     *
	     * Note: this interpolation method uses decomposition which makes
	     * it suitable for animations (in particular where rotation takes
	     * places).
	     *
	     * @param {Matrix} m2 - the matrix to interpolate with.
	     * @param {number} t - interpolation [0.0, 1.0]
	     * @param {CanvasRenderingContext2D} [context] - optional context to affect
	     * @returns {Matrix} - new instance with the interpolated result
	     */
	    interpolateAnim: function interpolateAnim(m2, t, context) {
	
	        var me = this,
	            m = context ? new Matrix(context) : new Matrix(),
	            d1 = me.decompose(),
	            d2 = m2.decompose(),
	            rotation = d1.rotation + (d2.rotation - d1.rotation) * t,
	            translateX = d1.translate.x + (d2.translate.x - d1.translate.x) * t,
	            translateY = d1.translate.y + (d2.translate.y - d1.translate.y) * t,
	            scaleX = d1.scale.x + (d2.scale.x - d1.scale.x) * t,
	            scaleY = d1.scale.y + (d2.scale.y - d1.scale.y) * t;
	
	        m.translate(translateX, translateY);
	        m.rotate(rotation);
	        m.scale(scaleX, scaleY);
	
	        return m._x();
	    },
	
	    /**
	     * Decompose the current matrix into simple transforms using either
	     * QR (default) or LU decomposition. Code adapted from
	     * http://www.maths-informatique-jeux.com/blog/frederic/?post/2013/12/01/Decomposition-of-2D-transform-matrices
	     *
	     * The result must be applied in the following order to reproduce the current matrix:
	     *
	     *     QR: translate -> rotate -> scale -> skewX
	     *     LU: translate -> skewY  -> scale -> skewX
	     *
	     * @param {boolean} [useLU=false] - set to true to use LU rather than QR algorithm
	     * @returns {*} - an object containing current decomposed values (rotate, skew, scale, translate)
	     */
	    decompose: function decompose(useLU) {
	
	        var me = this,
	            a = me.a,
	            b = me.b,
	            c = me.c,
	            d = me.d,
	            acos = Math.acos,
	            atan = Math.atan,
	            sqrt = Math.sqrt,
	            pi = Math.PI,
	            translate = { x: me.e, y: me.f },
	            rotation = 0,
	            scale = { x: 1, y: 1 },
	            skew = { x: 0, y: 0 },
	            determ = a * d - b * c; // determinant(), skip DRY here...
	
	        if (useLU) {
	            if (a) {
	                skew = { x: atan(c / a), y: atan(b / a) };
	                scale = { x: a, y: determ / a };
	            } else if (b) {
	                rotation = pi * 0.5;
	                scale = { x: b, y: determ / b };
	                skew.x = atan(d / b);
	            } else {
	                // a = b = 0
	                scale = { x: c, y: d };
	                skew.x = pi * 0.25;
	            }
	        } else {
	            // Apply the QR-like decomposition.
	            if (a || b) {
	                var r = sqrt(a * a + b * b);
	                rotation = b > 0 ? acos(a / r) : -acos(a / r);
	                scale = { x: r, y: determ / r };
	                skew.x = atan((a * c + b * d) / (r * r));
	            } else if (c || d) {
	                var s = sqrt(c * c + d * d);
	                rotation = pi * 0.5 - (d > 0 ? acos(-c / s) : -acos(c / s));
	                scale = { x: determ / s, y: s };
	                skew.y = atan((a * c + b * d) / (s * s));
	            } else {
	                // a = b = c = d = 0
	                scale = { x: 0, y: 0 }; // = invalid matrix
	            }
	        }
	
	        return {
	            scale: scale,
	            translate: translate,
	            rotation: rotation,
	            skew: skew
	        };
	    },
	
	    /**
	     * Returns the determinant of the current matrix.
	     * @returns {number}
	     */
	    determinant: function determinant() {
	        return this.a * this.d - this.b * this.c;
	    },
	
	    /**
	     * Apply current matrix to x and y point.
	     * Returns a point object.
	     *
	     * @param {number} x - value for x
	     * @param {number} y - value for y
	     * @returns {{x: number, y: number}} A new transformed point object
	     */
	    applyToPoint: function applyToPoint(x, y) {
	
	        var me = this;
	
	        return {
	            x: x * me.a + y * me.c + me.e,
	            y: x * me.b + y * me.d + me.f
	        };
	    },
	
	    /**
	     * Apply current matrix to array with point objects or point pairs.
	     * Returns a new array with points in the same format as the input array.
	     *
	     * A point object is an object literal:
	     *
	     * {x: x, y: y}
	     *
	     * so an array would contain either:
	     *
	     * [{x: x1, y: y1}, {x: x2, y: y2}, ... {x: xn, y: yn}]
	     *
	     * or
	     * [x1, y1, x2, y2, ... xn, yn]
	     *
	     * @param {Array} points - array with point objects or pairs
	     * @returns {Array} A new array with transformed points
	     */
	    applyToArray: function applyToArray(points) {
	
	        var i = 0,
	            p,
	            l,
	            mxPoints = [];
	
	        if (typeof points[0] === 'number') {
	
	            l = points.length;
	
	            while (i < l) {
	                p = this.applyToPoint(points[i++], points[i++]);
	                mxPoints.push(p.x, p.y);
	            }
	        } else {
	            for (; p = points[i]; i++) {
	                mxPoints.push(this.applyToPoint(p.x, p.y));
	            }
	        }
	
	        return mxPoints;
	    },
	
	    /**
	     * Apply current matrix to a typed array with point pairs. Although
	     * the input array may be an ordinary array, this method is intended
	     * for more performant use where typed arrays are used. The returned
	     * array is regardless always returned as a Float32Array.
	     *
	     * @param {*} points - (typed) array with point pairs
	     * @param {boolean} [use64=false] - use Float64Array instead of Float32Array
	     * @returns {*} A new typed array with transformed points
	     */
	    applyToTypedArray: function applyToTypedArray(points, use64) {
	
	        var i = 0,
	            p,
	            l = points.length,
	            mxPoints = use64 ? new Float64Array(l) : new Float32Array(l);
	
	        while (i < l) {
	            p = this.applyToPoint(points[i], points[i + 1]);
	            mxPoints[i++] = p.x;
	            mxPoints[i++] = p.y;
	        }
	
	        return mxPoints;
	    },
	
	    /**
	     * Apply to any canvas 2D context object. This does not affect the
	     * context that optionally was referenced in constructor unless it is
	     * the same context.
	     * @param {CanvasRenderingContext2D} context
	     */
	    applyToContext: function applyToContext(context) {
	        var me = this;
	        context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);
	        return me;
	    },
	
	    /**
	     * Returns true if matrix is an identity matrix (no transforms applied).
	     * @returns {boolean} True if identity (not transformed)
	     */
	    isIdentity: function isIdentity() {
	        var me = this;
	        return me._q(me.a, 1) && me._q(me.b, 0) && me._q(me.c, 0) && me._q(me.d, 1) && me._q(me.e, 0) && me._q(me.f, 0);
	    },
	
	    /**
	     * Returns true if matrix is invertible
	     * @returns {boolean}
	     */
	    isInvertible: function isInvertible() {
	        return !this._q(this.determinant(), 0);
	    },
	
	    /**
	     * Test if matrix is valid.
	     */
	    isValid: function isValid() {
	        return !this._q(this.a * this.d, 0);
	    },
	
	    /**
	     * Clones current instance and returning a new matrix.
	     * @param {boolean} [noContext=false] don't clone context reference if true
	     * @returns {Matrix}
	     */
	    clone: function clone(noContext) {
	        var me = this,
	            m = new Matrix();
	        m.a = me.a;
	        m.b = me.b;
	        m.c = me.c;
	        m.d = me.d;
	        m.e = me.e;
	        m.f = me.f;
	        if (!noContext) m.context = me.context;
	
	        return m;
	    },
	
	    /**
	     * Compares current matrix with another matrix. Returns true if equal
	     * (within epsilon tolerance).
	     * @param {Matrix} m - matrix to compare this matrix with
	     * @returns {boolean}
	     */
	    isEqual: function isEqual(m) {
	
	        var me = this,
	            q = me._q;
	
	        return q(me.a, m.a) && q(me.b, m.b) && q(me.c, m.c) && q(me.d, m.d) && q(me.e, m.e) && q(me.f, m.f);
	    },
	
	    /**
	     * Returns an array with current matrix values.
	     * @returns {Array}
	     */
	    toArray: function toArray() {
	        var me = this;
	        return [me.a, me.b, me.c, me.d, me.e, me.f];
	    },
	
	    /**
	     * Generates a matrix() string that can be used with CSS transform.
	     * @returns {string}
	     */
	    toCSS: function toCSS() {
	        return "matrix(" + this.toArray() + ")";
	    },
	
	    /**
	     * Generates a matrix3d() string that can be used with CSS transform.
	     * @returns {string}
	     */
	    toCSS3D: function toCSS3D() {
	        var me = this;
	        return "matrix3d(" + me.a + ", " + me.b + ", 0, 0, " + me.c + ", " + me.d + ", 0, 0, 0, 0, 1, 0, " + me.e + ", " + me.f + ", 0, 1)";
	    },
	
	    /**
	     * Returns a JSON compatible string of current matrix.
	     * @returns {string}
	     */
	    toJSON: function toJSON() {
	        return JSON.stringify(this.toArray());
	    },
	
	    /**
	     * Returns a string with current matrix as comma-separated list.
	     * @returns {string}
	     */
	    toString: function toString() {
	        return "" + this.toArray();
	    },
	
	    /**
	     * Compares floating point values with some tolerance (epsilon)
	     * @param {number} f1 - float 1
	     * @param {number} f2 - float 2
	     * @returns {boolean}
	     * @private
	     */
	    _q: function _q(f1, f2) {
	        return Math.abs(f1 - f2) < 1e-14;
	    },
	
	    /**
	     * Apply current absolute matrix to context if defined, to sync it.
	     * @private
	     */
	    _x: function _x() {
	        var me = this;
	        if (me.context) me.context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);
	        return me;
	    }
	};
	
	exports["default"] = Matrix;
	module.exports = exports["default"];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Defines the global root level namespace for the library.
	 *
	 * @module
	 * @author Micah Rolon <micah@ginasink.com>
	 *
	 * @requires game
	 * @requires module:play~pl.util
	 * @requires types/Basic
	 * @requires types/Dimensions
	 */
	
	var _playGame = __webpack_require__(59);
	
	var _playGame2 = _interopRequireDefault(_playGame);
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesBasic = __webpack_require__(51);
	
	var _typesBasic2 = _interopRequireDefault(_typesBasic);
	
	var _typesQueue = __webpack_require__(72);
	
	var _typesQueue2 = _interopRequireDefault(_typesQueue);
	
	var _typesDimensions = __webpack_require__(36);
	
	var pl;
	/**
	 * Resolves the event type for user interactions.
	 */
	function resolveEventType() {
	  var resolution;
	
	  if (_playGame2['default'].feature('touch')) {
	    resolution = {
	      ACTION: 'touchend',
	      ACTION_DOWN: 'touchstart',
	      ACTION_UP: 'touchend',
	      ACTION_MOVE: 'touchmove',
	      ACTION_OUT: 'touchcancel'
	    };
	  } else {
	    resolution = {
	      ACTION: 'click',
	      ACTION_DOWN: 'mousedown',
	      ACTION_UP: 'mouseup',
	      ACTION_MOVE: 'mousemove',
	      ACTION_OUT: 'mouseout'
	    };
	  }
	
	  return resolution;
	}
	
	/**
	 * Globaly accesable, root level namespace for the library.
	 * @namespace
	 * @prop {object} EVENT - Namespace for noralized event name constants.
	 * @prop {Basic} Basic - Base object type.
	 * @prop {Point} Point - Object type which holds values on a 2D cartesian plane.
	 * @prop {Size} Size - Object type which holds 2-dimentional values for size.
	 * @prop {function} game - Registers a game view implementation. Also a namespace for other methods.
	 * @prop {object} util - Namespace for utility functions.
	 */
	pl = {
	  Basic: _typesBasic2['default'], Point: _typesDimensions.Point, Size: _typesDimensions.Size, Queue: _typesQueue2['default'],
	  game: _playGame2['default'],
	  util: _util2['default'],
	
	  /**
	   * @namespace
	   * @prop {string} ACTION - The device normalized `click` event name.
	   * @prop {string} ACTION_DOWN - The device normalized `mousedown` event name.
	   * @prop {string} ACTION_UP - The device normalized `mouseup` event name.
	   * @prop {string} ACTION_MOVE - The device normalized `mousemove` event name.
	   * @prop {string} ACTION_OUT - The device normalized `mouseout` event name.
	   */
	  EVENT: resolveEventType()
	};
	
	exports['default'] = pl;
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Defines the 'game' method for registration and initialization of game scopes. This method also acts as a namespace for game level functions (See: [pl.game]{@link module:play~pl.game}).
	 *
	 * @module game
	 * @author Micah Rolon <micah@ginasink.com>
	 *
	 * @requires play.game.component
	 * @requires play.game.manager
	 * @requires util
	 * @requires types/Events
	 * @requires types/GlobalScope
	 * @requires types/Entity
	 * @requires types/Screen
	 * @requires types/Game
	 */
	
	var _playGameComponent = __webpack_require__(60);
	
	var _playGameComponent2 = _interopRequireDefault(_playGameComponent);
	
	var _playGameManager = __webpack_require__(62);
	
	var _playGameManager2 = _interopRequireDefault(_playGameManager);
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesEvents = __webpack_require__(61);
	
	var _typesEvents2 = _interopRequireDefault(_typesEvents);
	
	var _typesGlobalScope = __webpack_require__(65);
	
	var _typesGlobalScope2 = _interopRequireDefault(_typesGlobalScope);
	
	var _typesEntity = __webpack_require__(112);
	
	var _typesEntity2 = _interopRequireDefault(_typesEntity);
	
	var _typesScreen = __webpack_require__(113);
	
	var _typesScreen2 = _interopRequireDefault(_typesScreen);
	
	var _typesGame = __webpack_require__(114);
	
	var _typesGame2 = _interopRequireDefault(_typesGame);
	
	var _platform = __webpack_require__(115);
	
	var _platform2 = _interopRequireDefault(_platform);
	
	var GAMES, CONFIG, READY_QUEUE;
	
	/**
	 * Define a game scope for registration and/or initialization.
	 * This method also acts as a namespace for game level functions (See: [pl.game]{@link module:play~pl.game}).
	 *
	 * @arg {string} _name - The name of the game matched with a DOM nodes 'id' attribute.
	 * @arg {function|object} _implementation - The constructor or object which implements the scope behavior.
	 */
	function game(_name, _implementation) {
	  if (game.isDOMReady) {
	    initialize(_name, _implementation);
	  } else {
	    register(_name, _implementation);
	  }
	}
	
	function ready(_eventName) {
	  if (READY_QUEUE.length) return false;
	  game.trigger(_eventName || 'ready');
	}
	
	/**
	 * Registers an implementation of a game scope for initialization.
	 * @protected
	 * @arg {string} _name - The name of the game matched with a DOM nodes 'id' attribute.
	 * @arg {function|object} _implementation - The constructor or object which implements the scope behavior.
	 */
	function register(_name, _implementation) {
	  if (! ~GAMES.indexOf(_name)) {
	    GAMES.push({
	      id: _name,
	      implementation: _implementation
	    });
	  }
	}
	
	/**
	 * Initializes an implementation of a game scope. (overloaded)
	 * @function initialize
	 * @protected
	 * @arg {string} _name - The name of the game matched with a DOM nodes 'id' attribute.
	 * @arg {function|object} _implementation - The constructor or object which implements the scope behavior.
	 */
	
	/**
	 * Initializes an implementation of a game scope.
	 * @protected
	 * @arg {array} _collection - The collection of game scope records for initialization.
	 * @arg {function|object} _implementation - The constructor or object which implements the scope behavior.
	 */
	function initialize(nameCollection, implementation) {
	  switch (typeof nameCollection) {
	    case 'string':
	      _typesGlobalScope2['default'][nameCollection] = _typesGame2['default']
	      //MPR, ll-trace 8: Now, this is where things start to get interesting
	      //This "Game" object comes from types/Game, which itself is an alias for
	      // types/GlobalScope, which is an alias for types/Scope, which is a singleton
	      // instance of the jqProxy type. This type inverts a number of jQuery methods
	      // (notably 'extend') to operate on the invoked 'this' object, rather than
	      // taking that object as the first parameter. As such, this will add all of the
	      // properties from the current game's "implementation" function onto the global
	      // "Game" scope object. Note that these are different from the pl.game object
	      // which is being constructed by this module. That function is used to pass
	      // the implementation function in from the games themselves.
	      .extend(implementation)
	      //MPR, ll-trace 10: because this is an instance of types/scope, we get the initialize
	      //method from there.
	      .initialize('#' + nameCollection);
	      break;
	
	    case 'object':
	      //MPR, ll-trace 7: This case is soley for convienience. It simply reinvokes itself
	      //to match the string case.
	      nameCollection.forEach(function (_item) {
	        initialize(_item.id, _item.implementation);
	      });
	      break;
	  }
	}
	
	function initializeSingleScreen(node, componentType) {}
	//Game.initialize(node, componentType);
	
	/** @protected */
	GAMES = [];
	/** @protected */
	CONFIG = {};
	/** @protected */
	READY_QUEUE = [];
	
	/**
	 * Interface for game level configuration.
	 * @namespace game
	 * @memberof module:play~pl
	 * @mixes Events
	 */
	(function () {
	
	  var audioContext;
	
	  this.component = _playGameComponent2['default'];
	  this.manager = _playGameManager2['default'];
	
	  _util2['default'].mixin(game, _typesEvents2['default']);
	
	  this.on('platform-event', function (_event) {
	    console.log('play.game -', _event.name, _event.gameData); //eslint-disable-line no-console
	  });
	
	  /**
	   * Starts the dominos falling
	   * @function run
	   * @memberof module:play~pl.game
	   */
	  this.run = function () {
	    game.isDOMReady = true;
	    game.trigger('dom-ready');
	
	    game.component.loadAll(function () {
	      // console.log('** All component sources loaded.');
	      //MPR, ll-trace 6: does this really fire once for each component?
	      //yep.
	      //Note that this games array generally contains a dict containing a single registered game object
	      //Not sure why one would ever need more than one, but there we are.
	      initialize(GAMES);
	
	      GAMES = null;
	    });
	
	    _platform2['default'].emit(_platform2['default'].EVENT_INIT);
	  };
	
	  this.report = function (_name) {
	    _platform2['default'].emit(_name);
	
	    return this.report;
	  };
	
	  this.report.exit = function (_gameScope) {
	    _platform2['default'].saveGameState(_gameScope.progress());
	    _platform2['default'].emit(_platform2['default'].EVENT_EXIT);
	
	    return this;
	  };
	
	  this.report.flip = function (_gameScope) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _platform2['default'].emit(_platform2['default'].EVENT_FLIPPED, data);
	    _platform2['default'].saveGameState(_gameScope.progress());
	
	    return this;
	  };
	
	  /**
	   * Getter/Setter for game level configuration.
	   * @function module:play~pl.game.config
	   * @arg {string} _key - The key to retrieve
	   * @returns {this}
	   */
	
	  /**
	   * Getter/Setter for game level configuration.
	   * @function config
	   * @memberof module:play~pl.game
	   * @arg {object} _mixin - Object to set properties on configuration.
	   * @returns {this}
	   */
	  this.config = function (keyMixin) {
	    switch (typeof keyMixin) {
	      case 'string':
	        return _util2['default'].resolvePath(CONFIG, keyMixin);
	      case 'object':
	        if (keyMixin) _util2['default'].mixin(CONFIG, keyMixin);
	    }
	
	    return this;
	  };
	
	  /**
	   * @function provideEntityType
	   * @deprecated
	   * @memberof module:play~pl.game
	   */
	  this.provideEntityType = function () {
	    return _typesEntity2['default'];
	  };
	
	  /**
	   * @function provideScreenType
	   * @deprecated
	   * @memberof module:play~pl.game
	   */
	  this.provideScreenType = function () {
	    return _typesScreen2['default'];
	  };
	
	  /**
	   * Augments the global scope.
	   * @function scope
	   * @arg {function|object} _mixin - Object or constructor to define members.
	   * @returns {this}
	   *
	   * @memberof module:play~pl.game
	   */
	  this.scope = function (_mixin) {
	    if (typeof _mixin === 'function') {
	      _mixin.call(_typesGlobalScope2['default']);
	    } else if (_mixin) {
	      _typesGlobalScope2['default'].mixin(_mixin);
	    }
	
	    return this;
	  };
	
	  /**
	   * @function queue
	   * @deprecated
	   * @memberof module:play~pl.game
	   */
	  this.queue = function (_item) {
	    if (! ~READY_QUEUE.indexOf(_item)) READY_QUEUE.push(_item);
	
	    return this;
	  };
	
	  this.queue.complete = function (_item, _eventName) {
	    var index;
	
	    index = READY_QUEUE.indexOf(_item);
	    READY_QUEUE.splice(index, 1);
	
	    ready(_eventName);
	
	    return this;
	  };
	
	  /**
	   * Accessor for the detected features supported by the browser.
	   *
	   * *Supported Feature Detectors*
	   * - touch
	   *
	   * @function feature;
	   * @arg {string} _name - The feature which to test for (i.e. `"touch"`)
	   * @returns {boolean} The support status for the specified feature.
	   */
	  this.feature = (function () {
	    var detect = {
	      touch: function touch() {
	        return window.hasOwnProperty('ontouchend');
	      }
	    };
	
	    return function (_name) {
	      var tester = detect[_name];
	      if (!tester && console) console.warn('No feature detection for "' + _name + '".'); //eslint-disable-line no-console
	      return tester && tester();
	    };
	  })();
	
	  this.getAudioContext = function () {
	    if (!audioContext) {
	      audioContext = new (window.AudioContext || window.webkitAudioContext)();
	      window.onfocus = function () {
	        audioContext.resume();
	      };
	      window.onblur = function () {
	        audioContext.suspend();
	      };
	    }
	    return audioContext;
	  };
	
	  this.enableAudioContext = function () {
	    var ctx, silence;
	
	    ctx = this.getAudioContext();
	    silence = ctx.createBufferSource();
	
	    silence.buffer = ctx.createBuffer(2, 1, 44100);
	    silence.connect(ctx.destination);
	    silence.start();
	    silence.disconnect();
	
	    return silence;
	  };
	
	  this.initialize = initialize;
	  this.initializeScreen = initializeSingleScreen;
	}).call(game);
	
	exports['default'] = game;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Defines the `component()` method for component behavior registration. This method is also a namesapce for methods to manage and load component behavior scripts.
	 *
	 * @module
	 * @author Micah Rolon <micah@ginasink.com>
	 *
	 * @requires play~pl.util
	 * @requires types/Events
	 */
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesEvents = __webpack_require__(61);
	
	var _typesEvents2 = _interopRequireDefault(_typesEvents);
	
	/**
	 * Collection of component behavior records
	 * @const
	 */
	var COMPONENTS;
	
	/**
	 * Registers a component behavior.
	 * @arg {string} _name - The name for the component.
	 * @arg {function|object} _implementation - Constructor function or object with the behavior's implementation.
	 * @returns {@link module:play~pl.game}
	 */
	function component(_name, _implementation) {
	  if (!component.get(_name)) {
	    COMPONENTS.push({
	      name: _name,
	      implementation: _implementation,
	      config: {}
	    });
	  }
	
	  return this;
	}
	
	COMPONENTS = [];
	
	/**
	 * Methods to manage and load component behavior scripts.
	 * @namespace component
	 * @memberof module:play~pl.game
	 * @mixes Events
	 */
	(function () {
	
	  _util2['default'].mixin(this, _typesEvents2['default']);
	
	  /**
	   * Given a name; provides the component record. `{name, implementation}`
	   * @memberof module:play~pl.game.component
	   * @arg {string} _name - The name of the component.
	   * @returns {object} The record.
	   */
	  this.get = function (_name) {
	    var i, record;
	
	    for (i = 0; record = COMPONENTS[i]; i += 1) {
	      if (record.name === _name) return record;
	    }
	
	    return null;
	  };
	
	  /**
	   * Loads the script for the component. The HTML and CSS will be loaded when the component scope initalizes.<br>
	   * The path of the script file is resolved `{pl.game.config.componentDirectory}/{_name}/behavior.js`.
	   * @memberof module:play~pl.game.component
	   * @arg {string} _name - The name of the component.
	   * @arg {function} _callback - Callback for load success.
	   * @todo Implement Promises.
	   * @returns `this`
	   */
	  this.load = function (_name, _callback) {
	    var path;
	
	    //MPR, ll-trace 27: Back here. This is our recursive loop - Load all pulls the top level
	    // game components (including screens), which then in turn load their own. We _should_ now
	    // have loaded all of component templates and behaviors. Everything after this point
	    // should be unrelated to directly loading - hopefully events and audio attachment
	    if (component.get(_name)) {
	      if (_callback) _callback.call(component, _name);
	      return null;
	    }
	    //MPR, ll-trace 4: Here we load the behavior component from the game, not from the library
	    //It seems likely that the games will invoke the default library behavior either themselves,
	    //or it will somehow be done automatically for them.
	    path = pl.game.config('componentDirectory') + _name + '/behavior.js';
	
	    $.getScript(path, function () {
	      if (_callback) _callback.call(component, _name);
	      //MPR, ll-trace 5: Fires the loaded event. Does not appear to be listened to anywhere explicitly
	      //however there are a few dynamic bindings that may fire. These are:
	      //source/types/Game.js:427:      this.on(pl.EVENT.ACTION, function beginAudio(_event) {
	      //source/types/Scope.js:80:    this.on(pl.EVENT.ACTION, function (_event) {
	      //Checking those now.
	      //These do not seem to ever respond on 'loaded'
	      component.trigger('loaded', [_name]);
	    });
	
	    return this;
	  };
	
	  /**
	   * Loads all the component scripts for HTML elements with `pl-component` attributes.
	   * @memberof module:play~pl.game.component
	   * @arg {function} _callback - Callback for load success.
	   * @todo Implement Promises.
	   * @returns `this`
	   */
	  this.loadAll = function (_callback) {
	    var $components, queue;
	
	    $components = $('[pl-component]');
	    queue = [];
	
	    //MPR, ll-trace 1: here we are collecting all of the
	    //types of component. This will load the component
	    //type into memory, but not the page components
	    //themselves
	    $components.each(function (_index) {
	      var name;
	
	      name = $(this).attr('pl-component');
	
	      if (~queue.indexOf(name)) return;
	
	      queue.push(name);
	    });
	
	    queue.slice(0).forEach(function (_name) {
	      //MPR, ll-trace 2: next, get each of the scripts for the component types
	      //by name.
	      component.load(_name, function () {
	        var index;
	
	        index = queue.indexOf(_name);
	        queue.splice(index, 1);
	
	        //MPR, ll-trace 3: I wonder if this approach to firing this callback will encounter
	        //async problems under certain network conditions. On a timeout, it simply
	        //will never fire. @TODO this should become a promise.all.,
	        if (!queue.length && _callback) _callback.apply(component, arguments);
	      });
	    });
	
	    return this;
	  };
	
	  // Maybe?
	  // this.config = function () {};
	}).call(component);
	
	exports['default'] = component;
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	*  Events
	*  @desc Contains methods for managing and dispatching events from objects.
	*  @proto Basic
	*/
	
	var _typesBasic = __webpack_require__(51);
	
	var _typesBasic2 = _interopRequireDefault(_typesBasic);
	
	var Events = _typesBasic2['default'].extend(function () {
	  var i, method, methods;
	  /**
	  *  @desc Creates a function with a proxy to the jQuery method.
	  *  @param _name (String) The name of the method being proxied.
	  *  @return (jQuery|*) Either a jQuery object or whatever the original method returns.
	  *  @private
	  */
	  function createProxyFunction(_name) {
	    return function () {
	      var $jq = $();
	      // We must wrap our object in jQuery. If 'typeof this' is a function then we need
	      // to add it in this manner, otherwise jQuery treats it like a ready callback.
	      $jq.push(this);
	
	      return $.fn[_name].apply($jq, arguments);
	    };
	  }
	
	  methods = ['on', 'off', 'trigger'];
	
	  this.baseType = 'TYPE_EVENTS';
	
	  for (i = 0; method = methods[i]; i += 1) {
	    this[method] = createProxyFunction(method);
	  }
	});
	
	exports['default'] = Events;
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	
	var _playGameManagerDraggable = __webpack_require__(63);
	
	var _playGameManagerDraggable2 = _interopRequireDefault(_playGameManagerDraggable);
	
	exports.draggable = _playGameManagerDraggable2['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesCollection = __webpack_require__(64);
	
	var _typesCollection2 = _interopRequireDefault(_typesCollection);
	
	var _typesDimensions = __webpack_require__(36);
	
	var COLLECTION_DRAGABLES = _typesCollection2['default'].create(); //eslint-ignore-line
	
	var draggableStyleSheet;
	
	function boot() {
	  createHelperStyleSheet();
	  attachEvents();
	}
	
	function attachEvents() {
	  var state, E;
	
	  E = pl.EVENT;
	
	  // Disable scrolling on touchDevices (particularly for iOS elastic scroll).
	  if (E.ACTION_MOVE === 'touchmove') attachEvents.disableTouchScroll();
	
	  $(document).on(E.ACTION_DOWN, function (_event) {
	    var $draggable, scope, cursor, mode, game, point, transform, helperID, dragStartEvent;
	
	    $draggable = $(_event.target).closest('[pl-draggable]');
	
	    if ($draggable.length) {
	      scope = $draggable.scope();
	      cursor = resolveEventPoint(_event, 1 / scope.game.zoom);
	      mode = $draggable.pl('draggable');
	      game = {
	        position: scope.game.absolutePosition(),
	        scale: scope.game.transformScale().x
	      };
	      point = $draggable.absolutePosition().dec(game.position);
	      transform = $draggable.transform();
	      helperID = createID();
	      state = {
	        mode: mode,
	        $draggable: $draggable,
	        scope: scope,
	        $helper: null,
	
	        start: {
	          cursor: cursor,
	          point: point,
	          transform: transform
	        },
	
	        progress: {
	          distance: null,
	          point: null,
	          transform: null
	        }
	      };
	
	      // FireFox has a different scaling implementation than other browsers (transform:scale(); vs. zoom:;)
	      // so we need to account for the game transform scale.
	      //
	      if (game.scale !== 1) point = point.scale(1 / game.scale);
	
	      draggableStyleSheet.html(provideSource(helperID, createDraggableRule($draggable)));
	
	      switch (mode) {
	        case 'clone':
	          state.$helper = $draggable.clone();
	          state.$helper.id(helperID).pl('draggable', null) // helpers are not to be captured as draggable
	          .addClass('draggable-helper').appendTo(document.body).absolutePosition(point);
	          break;
	
	        case 'pluck':
	          $draggable.addClass('PLUCKED');
	
	          state.$helper = $draggable.clone();
	          state.$helper.id(helperID).pl('draggable', null) // helpers are not to be captured as draggable
	          .addClass('draggable-helper').appendTo(document.body).absolutePosition(point);
	          break;
	
	        default:
	          state.$helper = $draggable;
	          break;
	      }
	
	      state.$helper.removeClass('DRAG-ENDED').addClass('DRAG-START');
	
	      dragStartEvent = $.Event('drag-start', {
	        state: state,
	        targetScope: scope
	      });
	
	      scope.trigger(dragStartEvent);
	    }
	  }).on(E.ACTION_MOVE, function (_event) {
	    var cursor, $draggable, distance, point, transform, dragMoveEvent;
	
	    if (state) {
	      cursor = resolveEventPoint(_event, 1 / state.scope.game.zoom);
	      distance = state.start.cursor.distance(cursor);
	      point = _typesDimensions.Point.create();
	      transform = null;
	
	      if (state.start.transform !== 'none') {
	        transform = state.start.transform.clone();
	        transform.translate(distance.width, distance.height);
	        point.set(transform.applyToPoint(0, 0));
	      } else {
	        point = distance.to('point');
	      }
	
	      if (state.$helper.hasClass('DRAG-START')) {
	        state.$helper.removeClass('DRAG-START').addClass('DRAGGING');
	      }
	
	      dragMoveEvent = $.Event('drag-move', {
	        state: state,
	        targetScope: state.scope
	      });
	
	      state.progress.distance = distance;
	      state.progress.point = state.start.point.inc(point);
	      state.progress.transform = transform;
	
	      state.scope.translate(state.$helper, point);
	      state.scope.trigger(dragMoveEvent);
	    }
	  }).on([E.ACTION_UP, E.ACTION_OUT].join(' '), function (_event) {
	    var $draggable, dragEndEvent;
	
	    if (state) {
	      // Do not end dragging if we dont mouse out of the document.
	      if (_event.type === 'mouseout' && ! ~[null, document.documentElement].indexOf(_event.toElement)) {
	        return;
	      }
	
	      $draggable = state.$draggable;
	
	      if (state.$helper.hasClass('draggable-helper')) {
	        state.$helper.on('transitionend', function () {
	          $draggable.removeClass('PLUCKED');
	          $(this).remove();
	        });
	      }
	
	      state.$helper.removeClass('DRAG-START DRAGGING').addClass('DRAG-ENDED');
	
	      dragEndEvent = $.Event('drag-end', {
	        state: state,
	        targetScope: state.scope
	      });
	
	      state.scope.trigger(dragEndEvent);
	
	      state = null;
	    }
	  });
	}
	
	attachEvents.disableTouchScroll = function () {
	  document.addEventListener('touchmove', function (_event) {
	    _event.preventDefault();
	  }, false);
	};
	
	function resolveEventPoint(_event, _scale) {
	  var scale = _scale || 1;
	
	  if (_event.originalEvent && _event.originalEvent.changedTouches) {
	    /**
	     * For now, interactions should use the last touch if multiple fingers are captured.
	     * @todo Maybe invoke action for each touch.
	     */
	    _event.touch = _event.originalEvent.changedTouches[_event.originalEvent.changedTouches.length - 1];
	  }
	
	  return _typesDimensions.Point.create().set(new function () {
	    if (_event.touch) {
	      this.x = _event.touch.clientX * scale;
	      this.y = _event.touch.clientY * scale;
	    } else {
	      this.x = _event.clientX * scale;
	      this.y = _event.clientY * scale;
	    }
	  }());
	}
	
	function createHelperStyleSheet() {
	  draggableStyleSheet = $('<style id="draggable-helper-css" type="text/css"></style>').appendTo(document.body);
	}
	
	function createDraggableRule(_$draggable) {
	  var i, style, blacklist, rule, prop;
	
	  style = window.getComputedStyle(_$draggable[0]);
	  rule = {};
	  blacklist = ['zIndex', 'opacity', 'cursor', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction'];
	
	  for (i = 0; i < style.length; i += 1) {
	    prop = _util2['default'].transformId(style[i], true);
	    if (~blacklist.indexOf(prop)) continue;
	    if (prop.indexOf('Webkit') === 0) prop = prop.slice(0, 1).toLowerCase() + prop.slice(1);
	    if (style[prop]) rule[prop] = style[prop];
	  }
	
	  return rule;
	}
	
	function provideSource(_id, _rule) {
	  var source, prop, value;
	
	  source = '#' + _id + '.draggable-helper {';
	
	  for (prop in _rule) {
	    if (!_rule.hasOwnProperty(prop)) continue;
	    value = _rule[prop];
	    source += prop.replace(/([A-Z]+)/g, '-$1').toLowerCase() + ': ' + value + ';';
	  }
	
	  source += '}';
	
	  return source;
	}
	
	function createID() {
	  return 'xy-xyxy-y'.replace(/x|y/g, function (_token) {
	    if (_token === 'x') return (Math.floor(Math.random() * 5) + 10).toString(16);
	    return Math.floor(Math.random() * Date.now()).toString(16).slice(2);
	  });
	}
	
	var draggableManager = {};
	
	$(boot);
	
	exports['default'] = draggableManager;
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Collections are iterables which hold a consistent interface throughout its indexes.
	 *
	 * @module
	 * @requires module:types/BasicArray
	 */
	
	var _typesBasicArray = __webpack_require__(49);
	
	var _typesBasicArray2 = _interopRequireDefault(_typesBasicArray);
	
	/**
	 * <span class="important">NOTE:</span> This is NOT a constructor. use `Collection.create()` to get a new instance.
	 * @classdesc Iterable holding record objects of the same interface.
	 * @class
	 * @extends module:types/BasicArray~BasicArray
	 */
	var Collection = _typesBasicArray2['default'].extend(function () {
	  /**
	   * Gets the record object which has `_member` as a member.
	   * @instance
	   * @protected
	   * @memberof module:types/Collection~Collection
	   * @arg {*} _member - object reference to search for.
	   * @arg {string} _key - the target key to test the `_member` against.
	   * @arg {boolean} _shouldCollect - <span style="color: blue; font-weight: bold;">`true`</span>: collect all matching elements.<br>
	   * <span style="color: blue; font-weight: bold;">`false`</span>: return first result.
	   */
	  function getRecord(_member, _key, _shouldCollect) {
	    var i, record, member, result;
	
	    result = [];
	
	    for (i = 0; record = this[i]; i += 1) {
	      if (_key !== undefined) {
	        if (record[_key] === _member) {
	          if (_shouldCollect) {
	            result.push(record);
	          } else {
	            return record;
	          }
	        }
	      } else if (record instanceof Array) {
	        if (~record.indexOf(_member)) {
	          if (_shouldCollect) {
	            result.push(record);
	          } else {
	            return record;
	          }
	        }
	      } else {
	        for (member in record) {
	          if (!record.hasOwnProperty(member)) continue;
	          if (record[member] === _member) {
	            if (_shouldCollect) {
	              result.push(record);
	            } else {
	              return record;
	            }
	          }
	        }
	      }
	    }
	
	    return result.length ? result : null;
	  }
	
	  /**
	   * Objects with this as an own property will be identified as the root object.
	   * @memberof module:types/Collection~Collection
	   * @readonly
	   * @default
	   */
	  this.baseType = 'TYPE_COLLECTION';
	
	  this.add = function (_record) {
	    if (~this.indexOf(_record)) return false;
	    this.push(_record);
	
	    return this;
	  };
	
	  this.remove = function (_record) {
	    var index;
	
	    index = this.indexOf(_record);
	    if (~index) this.splice(index, 1);
	
	    return this;
	  };
	
	  this.has = function (_record) {
	    return !! ~this.indexOf(_record);
	  };
	
	  this.get = function (_member, _key) {
	    return getRecord.call(this, _member, _key);
	  };
	
	  this.filter = function (_member, _key) {
	    return getRecord.call(this, _member, _key, true);
	  };
	});
	
	exports['default'] = Collection;
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	exports.__esModule = true;
	/**
	*  GlobalScope
	*/
	
	var _typesScope = __webpack_require__(66);
	
	var GlobalScope = _typesScope.Scope.extend(function () {
	
	  this.baseType = 'TYPE_GLOBAL_SCOPE';
	});
	
	exports['default'] = GlobalScope;
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Scopes are packages which contain a reference to a DOM element wrapped in a jQuery object.
	 * This enables properties and methods to be in context of the DOM node and its descendants.
	 *
	 * @module
	 * @requires types/jQProxy
	 * @requires types/Basic
	 * @requires types/Queue
	 * @requires play.game
	 * @requires util
	 * @requires evalAction
	 *
	 * @exports createEntity
	 */
	
	var _typesJQProxy = __webpack_require__(67);
	
	var _typesJQProxy2 = _interopRequireDefault(_typesJQProxy);
	
	var _typesBasic = __webpack_require__(51);
	
	var _typesBasic2 = _interopRequireDefault(_typesBasic);
	
	var _typesQueue = __webpack_require__(72);
	
	var _typesQueue2 = _interopRequireDefault(_typesQueue);
	
	var _typesDimensions = __webpack_require__(36);
	
	var _playGame = __webpack_require__(59);
	
	var _playGame2 = _interopRequireDefault(_playGame);
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _evalAction = __webpack_require__(73);
	
	var _evalAction2 = _interopRequireDefault(_evalAction);
	
	var _typesAudioManager = __webpack_require__(74);
	
	/**
	 * Creates a new Enitiy instance with a context node and implementation.
	 * The instance is prototyped from the parent scope.
	 *
	 * @memberof module:types/Scope~Scope#createEntity
	 * @protected
	 * @arg {jQuery} _$node - jQuery object with a single node in the collection.
	 * @arg {function|object} _implementation - Constructor function or object with the entity behavior.
	 * @returns {module:types/Scope~Scope}
	 */
	function createEntity(_$node, _implementation) {
	  var component, prototype, componentRecord, instance;
	
	  //MPR, ll-trace 43: So, it would appear that sometimes, entities are components. Entities
	  // also appear to always be scopes as well. From the types/entities description, it would
	  // seem that the purpose of entities is to have a scope with visual elements and the
	  // ability to respond to "behaviors". Responding to behaviors here is referred to as a
	  // "responisbility". If an entity is a component and the passed in implementation function
	  // does not match the components implementation, use the components. Otherwise use the
	  // passed in one, and add all of the component's implementation properties to the current
	  // scope.
	  // @TODO All of this scope extension from arbitrary implementation functions is extremelty
	  // unsafe, particularly if the extend function is producing new objects. In the one case,
	  // we are probably overriding properties blindly, and on the other we are creating many
	  // disparate scope objects for a single DOM scope..
	  component = _$node.attr('pl-component');
	  prototype = this;
	
	  if (component) {
	    componentRecord = _playGame2['default'].component.get(component);
	
	    if (componentRecord) {
	      // If a scope is being defined as an extention of a component before the component scope
	      // has been allocated, we construct the component first then pass it as the proto.
	      // But we need to make sure we are not allocating the component it self.
	      if (componentRecord.implementation !== _implementation) {
	        prototype = this.extend(componentRecord.implementation);
	      }
	    } else {
	      throw new Error('No implementation record for the ' + component + 'component.');
	    }
	  }
	
	  instance = typeof _implementation === 'function' ? prototype.extend(_implementation) : prototype.create();
	
	  //MPR, ll-trace 44: This seems like an important step, as this will then trigger a cascading initialization
	  // inside of the component or entity that is being touched.
	  return instance.initialize(_$node, component);
	}
	
	/**
	 * <span class="important">NOTE:</span> This is NOT a constructor. Use `Scope.create()` to get a new instance.
	 * @classdesc A package which contains a reference to a DOM node wrapped in a jQuery object. For more information on scopes read [this]{@link module:types/Scope}.
	 * @class
	 * @extends module:types/jQProxy~jQProxy
	 */
	var Scope = _typesJQProxy2['default'].extend(function () {
	
	  /**
	   * Collection of records pairing a node with its action.
	   * @memberof module:types/Scope~Scope
	   * @static
	   * @protected
	   * @todo Convert to types/Collection
	   */
	  var Actionables;
	
	  function attachActionHandler() {
	    this.on(pl.EVENT.ACTION, function (_event) {
	      //MPR, ll-trace 5.5: Checking what events this responds to.
	      //Seems like just click events for the most part? I guess
	      //the purpose of this is to allow arbitrary events in the
	      //html templates as pl-action attributes
	      var target, record;
	
	      target = $(_event.target).closest('[pl-action]')[0];
	
	      if (_event.originalEvent && _event.originalEvent.changedTouches) {
	        /**
	         * For now, interactions should use the last touch if multiple fingers are captured.
	         * @todo Maybe invoke action for each touch.
	         */
	        _event.touch = _event.originalEvent.changedTouches[_event.originalEvent.changedTouches.length - 1];
	      }
	
	      _event.cursor = _typesDimensions.Point.create().set(new function () {
	        if (_event.touch) {
	          this.x = _event.touch.clientX;
	          this.y = _event.touch.clientY;
	        } else {
	          this.x = _event.clientX;
	          this.y = _event.clientY;
	        }
	      }());
	
	      if (target) {
	        record = this.actionables.item(target);
	
	        if (record) {
	          _event.targetScope = this;
	          this.event = _event;
	          _evalAction2['default'](record.action, this);
	          this.event = null;
	        }
	      }
	    });
	  }
	
	  //  function getRecordBy(_key, _member, _collection) {
	  //    var i, record;
	  //
	  //   if (_collection) {
	  //     for (i = 0; record = _collection[i]; i += 1) {
	  //       if (record[_key] === _member) return record;
	  //     }
	  //   }
	  //
	  //   return null;
	  // }
	
	  // function removeRecord(_record, _collection) {
	  //   var index;
	  //
	  //   index = _collection.indexOf(_record);
	  //   if (~index) _collection.splice(index, 1);
	  // }
	
	  function captureDropables(_scope) {
	    var collection;
	
	    collection = [];
	    //MPR, ll-trace 19: find all "pl-pluck" elements that are a child of anything?
	    //ahh that are a child of the provided scope
	    _scope.find('> [pl-pluck]').each(function () {
	      var name;
	
	      name = $(this).attr('pl-pluck');
	
	      collection.push(this);
	      collection[name] = this;
	    });
	
	    return collection;
	  }
	
	  function pluckAndDrop(_dropables, _template) {
	    $(_template).find('[pl-drop]').each(function () {
	      var $node, name, dropable;
	
	      $node = $(this);
	      name = $node.attr('pl-drop');
	      dropable = _dropables[name];
	
	      if (dropable) {
	        $node.replaceWith(dropable.children);
	      }
	    });
	  }
	
	  // Protected
	  function loadComponentAssets(_name, _callback) {
	    var scope, path, totalRequests, transcludeMode, dropables;
	
	    function ready() {
	      ready.status += 1;
	
	      //MPR, ll-trace 18: More request counting. @TODO break into promises for failure cases
	      if (ready.status === totalRequests) {
	        if (_callback) {
	          _callback.call(scope, _name);
	        }
	      }
	    }
	
	    totalRequests = 0;
	    scope = this;
	    //MPR, ll-trace 23: Nope, this is just loading the template from the game
	    path = _playGame2['default'].config('componentDirectory') + _name + '/';
	    //MPR, ll-trace 20: dump all of the "pl-pluck" attribute children of this scope into this dropables dict
	    dropables = captureDropables(this);
	    //MPR, ll-trace 21: evidently the inclusion of pluck elements indicates a lack of a transclude property
	    //lets keep a watch out for that, and @TODO on renaming pluck to something with meaning
	    // TRANSCLUDE_PLUCK is a string, also, so unless there are no droppables and no pl-transclude prop
	    // transcludeMode will be a string that gets switched on below
	    transcludeMode = dropables.length ? this.TRANSCLUDE_PLUCK : this.properties.transclude;
	    ready.status = 0;
	
	    //MPR, ll-trace 22: why to we want to do this if we have a transclude mode OR we have no
	    //children?
	    if (!this.children().length || transcludeMode) {
	      totalRequests += 1;
	      //MPR, ll-trace 24: Create a virtual div and then load into it, to allow us to
	      //manipulate the elements post-parse. Clever.
	      $('<div>').load(path + 'template.html', function () {
	        var memory;
	
	        memory = [];
	
	        switch (transcludeMode) {
	          //MPR, ll-trace 25: Just shove them in
	          case scope.TRANSCLUDE_APPEND:
	            scope.append(this.children);
	            break;
	
	          //MPR: On top. Why doesnt this require a container like the next one?
	          case scope.TRANSCLUDE_PREPEND:
	            scope.prepend(this.children);
	            break;
	
	          //MPR: Got it. The Pluck is essentially allowing a second level of templating
	          // within a component. Its like allowing separate Header, Body, and Footer elements
	          // to be popped out of a loading template and replaced. Something to note is that
	          // any child elements without a pl-pluck attribute matching a template section
	          // will be lost. This may not be a bad thing.
	          case scope.TRANSCLUDE_PLUCK:
	            pluckAndDrop(dropables, this);
	            scope.empty().append(this.children);
	            break;
	
	          //MPR: Replace em. Not sure why we would ever want to do this, though
	          case scope.TRANSCLUDE_REPLACE:
	            scope.empty().append(this.children);
	            break;
	
	          default:
	            //MPR: The else case here is extranneous. @TODO this default can also be refactored such that the other
	            // TRANSCLUDE_PLUCK can be removed.
	            if (transcludeMode) {
	              pluckAndDrop(new function () {
	                this[transcludeMode] = scope.node();
	              }(), this);
	              scope.empty().append(this.children);
	            } else {
	              scope.empty().append(this.children);
	            }
	
	        }
	
	        //MPR, ll-trace 26: Load every item in this scope labeled pl-component and then fire ready
	        // To up the ready count. We may have a problem lazy loading here if we defer firing ready
	        // until all screen components are loaded.
	        scope.findOwn('[pl-component]').each(function () {
	          var name;
	
	          name = $(this).attr('pl-component');
	
	          if (~memory.indexOf(name)) return;
	
	          memory.push(name);
	
	          totalRequests += 1;
	
	          //MPR, ll-trace 28: Recur!
	          _playGame2['default'].component.load(name, function () {
	            //@TODO: MPR, 4/27/16: give this local ready a different name, this is confusing
	            ready();
	          });
	        });
	        ready();
	      });
	    }
	
	    if (!$('style[pl-for-component="' + _name + '"]').length && _playGame2['default'].config('shouldLoadComponentStyles') !== false) {
	      totalRequests += 1;
	      $('<style type="text/css" pl-for-component="' + _name + '">').load(path + 'style.css', ready).appendTo(document.body);
	    }
	
	    if (!totalRequests) _callback && _callback.call(this, _name);
	
	    return this;
	  }
	
	  function captureProperties() {
	    var i, attr, name, collection;
	
	    //MPR, ll-trace 13: Create an array with an extra "has" wrapper method for indexOf
	    collection = (function () {
	
	      this.has = function (_name) {
	        return !! ~this.indexOf(_name);
	      };
	
	      return this;
	    }).call([]);
	
	    //MPR, ll-trace 15: attach all of the pl- prefixed properties on the game to... the game scope?
	    // Unclear use of this. Assuming that this method is bound?
	    for (i = 0; attr = this.$els[0].attributes[i]; i += 1) {
	      // I explicitly want it to be at the beginning.
	      if (attr.name.indexOf('pl-') === 0) {
	        name = attr.name.slice(3);
	        //MPR, ll-trace 14: transformId has the same functionality as _.toCamelCase, @TODO replace it.
	        collection[_util2['default'].transformId(name, true)] = attr.value;
	
	        collection.push(name);
	      }
	    }
	
	    //MPR, ll-trace 15.5: this is where they actually get attached
	    if (collection.length) this.properties = collection;
	
	    return this;
	  }
	
	  function initializeEntities() {
	    //MPR, ll-trace 41: It is not clear to me what "entities" are, or how the entities property will ultimately
	    // be set. A simple grep indicates it is set frequently in this file. Let us see where.
	    // They are set in the "ready" event for the scope, and appear to be the general set of immediate child scopes
	    // to the current scope. It is not clear why one would set them using the scope.entity method rather than
	    // using a pl-scope attribute.
	    if (!this.hasOwnProperty('entities')) return this;
	
	    this.entities.forEach(this.bind(function (_record, _index) {
	      var $nodes, query, index;
	
	      $nodes = this.findOwn(_record.selector);
	      query = ['#' + _record.selector, '[pl-id=' + _record.selector + ']', '[pl-component=' + _record.selector + ']', '[pl-' + _record.selector + ']'];
	      index = 0;
	
	      while (!$nodes.length) {
	        if (index === query.length) {
	          throw new Error('Unable to locate entity with selector', _record.selector);
	        }
	        $nodes = this.findOwn(query[index]);
	        index += 1;
	      }
	
	      $nodes.each(this.bind(function (_index, _node) {
	        var $node, instance, id;
	
	        $node = $(_node);
	
	        //MPR, ll-trace 42: So, for each child of the given scope, get all of _that_ scope's children
	        // matching a provided selector and see if they prototypically inherit from the given scope
	        // if not, create a new instance of entity, binding the create entity to the given scope, and passing
	        // the child scope the entity belongs to, and the provided entity implementation, and queue it to load
	        // its assets if it is not already ready. Otherwise, the entity has already been initialized somehow,
	        // so just store its reference.
	        if (!Scope.isPrototypeOf(_record)) {
	          instance = createEntity.call(this, $node, _record.implementation);
	          if (!instance.isReady) this.assetQueue.add(instance);
	        } else {
	          instance = _record;
	        }
	
	        id = _util2['default'].transformId(instance.id(), true);
	        //MPR, ll-trace 45: More scope property danger. Once we have created an instance, we
	        // then add a reference to that entity scope by name with no namespace on the parent scope
	        // I have to assume that these are never used, and this is being done for debugging
	        // convienience, because to get one back out one would need to first obtain its transformed
	        // name from within child scopes somehow, and then dynamically reference it.
	        if (id) _util2['default'].assignRef(this, id, instance);
	      }));
	    }));
	
	    return this;
	  }
	
	  function handleProperties() {
	    var scope, property, handler;
	
	    scope = this;
	
	    //MPR, ll-trace 47: So, if we have any additional pl-properties set on our scope object
	    // check if we have a "propertyHandler" set for it, and call it.
	    // This seems sensible enough, except that these aren't "handlers", but fine
	    // The issue is that then, below, we go over each handler and check to see if there are
	    // any matching properties inside of our scope, and then we fire each handler again for
	    // each one. This seems extremely likely to fire each handler a whole bunch of times.
	    // Lastly, at this stage we haven't seen where these get set yet.
	    if (this.hasOwnProperty('properties')) {
	      this.properties.forEach(function (_name) {
	        handler = scope.propertyHandlers[_name];
	        if (handler) handler.call(scope, scope.$els[0], _name, scope.properties[_name]);
	      });
	    }
	
	    if (this.propertyHandlers) {
	      for (property in this.propertyHandlers) {
	        // Only exclide members on the base type.
	        if (_typesBasic2['default'].hasOwnProperty(property)) continue;
	
	        handler = this.propertyHandlers[property];
	
	        this.findOwn('[pl-' + property + ']').each(function () {
	          var attr;
	
	          if (scope === $(this).scope()) {
	            attr = this.attributes.getNamedItem('pl-' + property);
	
	            //MPR: because of the default 'component' handler, this may be picking up the slack
	            // on initializing some child component entities. Something to watch for while
	            // attempting to lazt load.
	            if (handler) handler.call(scope, this, property, attr.value);
	          }
	        });
	      }
	    }
	
	    return this;
	  }
	
	  function invokeLocal(_name) {
	    var args, owner;
	
	    args = [].slice.call(arguments, 1);
	
	    if (this.isMemberSafe(_name)) {
	      return this[_name].apply(this, arguments);
	    }
	  }
	
	  function init() {
	    //MPR, ll-trace 29: Will fire once all pl-components are loaded. Watch out here for getting
	    // stuck after lazy loads, or for anything that might get missed were this to only run once
	    var willInitEvent, initEvent;
	
	    initEvent = $.Event('initialize', { targetScope: this });
	    willInitEvent = $.Event('will-initialize', { targetScope: this });
	
	    //MPR, ll-trace 31: Why aught we only invoke this if the method is local to this scope?
	    // That seems arbitrary to me.
	    invokeLocal.call(this, 'willInit');
	    //MPR: Moreso, if we are checking if our game has attached any such method to the scope,
	    // why bother firing the event. A quick grep indicates nothing is listening to willInit
	    // @TODO really should be one or the other. The event seems much more sensible.
	    this.trigger(willInitEvent);
	
	    //MPR: why hello there.
	    this.attachEvents();
	
	    //MPR, ll-trace 46: Finds all of the "entities" of the current scope and creates and initializes
	    // them, attaching them as properties to the current scope, based on the selector that was used
	    // to find their DOM nodes
	    initializeEntities.call(this);
	    //MPR, ll-trace 50: Goes through and calls the "handlers" for all of the entities of the given scope
	    // including those for all present children's properties for which there are matching named handlers
	    // on the scope's propertyHandler property dictionary
	    handleProperties.call(this);
	
	    //MPR, ll-trace 51: sets a loading event one each image in the current scope
	    this.watchAssets();
	    this.captureAudioAssets();
	    this.captureReferences();
	
	    this.__init();
	    invokeLocal.call(this, 'init');
	
	    this.trigger(initEvent);
	
	    if (!this.isReady) this.assetQueue.ready();
	
	    return this;
	  }
	
	  function ready() {
	    //MPR, ll-trace 35: this will fire once all assets are loaded, from inside the attachEvents method in this file
	    var readyEvent, entities;
	
	    readyEvent = $.Event('ready', { targetScope: this });
	    entities = this.findOwn('.pl-scope').scope();
	
	    if (entities) {
	      this.entities = [].concat(entities);
	    }
	
	    /**
	     * Sort audio into DOM order.
	     * @todo Consider including this into `AudioManager`. Micah: 2/23/2016.
	     */
	    // @TODO MPR 4/27/16: Look into why Micah wanted this in dom order. I am concerned
	    // that they are simply being invoked in order.
	    if (this.hasOwnProperty('audio')) {
	      (this.game || this).media.addShadow(this.audio);
	      this.audio.collections().forEach((function (_collection) {
	        var map = {
	          voiceOver: 'voice-over',
	          background: 'background',
	          sfx: 'sfx'
	        };
	
	        if (!_collection.length) return;
	
	        //MPR, ll-trace 37: This is almost certainly the reason that there are problems
	        // attaching audio during a lazy load. Because this only fires on ready, we miss
	        // attaching the events in the right order. Either this strategy needs to be re-
	        // thought, or this needs to be fully rebuilt and tracked each time a screen
	        // is loaded. Adam's idea to create a "screen" audio context instead of just
	        // a global one is a good idea and may also mitigate this issue.
	        // MPR: Note - the trace should continue here tomorrow. Once this ready is complete
	        // the attachEvents method should finish from whatever event fired it in trace
	        // step 34, and then control will return to this.init after that event is registered.
	        this.findOwn('audio.' + map[_collection.type]).each(function (_index, _node) {
	          var id, audio, collection, index;
	
	          id = $(_node).id();
	          audio = (_collection.find('#' + id) || [])[0];
	          index = _collection.indexOf(audio);
	
	          if (index !== _index) {
	            _collection[index] = _collection[_index];
	            _collection[_index] = audio;
	          }
	        });
	      }).bind(this));
	    }
	
	    this.isReady = true;
	    this.addClass('READY');
	
	    this.__ready();
	    //@TODO MPR: We really need to clean up this dual scope method / event invocation pattern
	    invokeLocal.call(this, 'ready');
	
	    //MPR, ll-trace 36: The ready event is consumed in many places. In the framework, it is consumed in
	    // components/carousel/behavior.js:82:      this.on('ready', this.beginShow);
	    // source/types/Scope.js:646:    this.on('ready', function (_event) {
	    // source/types/Scope.js:877:        $node.on('ready', this.bind(function (_event) {
	    // and is additionally triggered in
	    // source/play.game.js:45:  game.trigger(_eventName || 'ready');
	    // source/types/AudioManager.js:423:    readyEvent = $$.Event('ready', {targetScope: this});
	    // lastly, it is disabled later in this file at
	    // source/types/Scope.js:651:      if (!this.assetQueue.length && this.isReady) this.off('ready');
	    this.trigger(readyEvent);
	  }
	
	  Actionables = (function () {
	
	    _util2['default'].mixin(this, _typesBasic2['default']);
	
	    this.add = function (_node, _action) {
	      if (!this.has(_node)) {
	        this.push({
	          node: _node,
	          action: _action
	        });
	      }
	
	      return this;
	    };
	
	    this.remove = function (_node) {
	      var item, index;
	
	      item = this.item(_node);
	      index = this.indexOf(item);
	      if (~index) this.splice(index, 1);
	
	      return this;
	    };
	
	    this.item = function (_node) {
	      var i, item;
	
	      for (i = 0; item = this[i]; i += 1) {
	        if (item.node === _node) return item;
	      }
	    };
	
	    this.has = function (_node) {
	      return !!this.item(_node);
	    };
	
	    return this;
	  }).call([]);
	
	  this.TRANSCLUDE_REPLACE = 'replace';
	  this.TRANSCLUDE_PREPEND = 'prepend';
	  this.TRANSCLUDE_APPEND = 'append';
	  this.TRANSCLUDE_PLUCK = 'pluck';
	
	  this.baseType = 'TYPE_SCOPE';
	  this.actionables = null;
	  this.isReady = null;
	  this.isComponent = false;
	  this.entities = null;
	  this.audio = null;
	  this.properties = null;
	  this.propertyHandlers = null;
	  this.assetQueue = null;
	  this.event = null;
	  this.currentMedia = {};
	
	  this.initialize = function (_node_selector, _componentName) {
	    var doInitialize = (function (_node_selector, _componentName) {
	      var scope;
	
	      scope = this;
	
	      this.isReady = false;
	      this.isComponent = !!_componentName;
	      this.event = null;
	      this.assetQueue = _typesQueue2['default'].create();
	      //MPR, ll-trace 11: this will be a reference to the game wrapper,
	      this.$els = _node_selector.jquery ? _node_selector : $(_node_selector);
	
	      if (!this.$els.length) {
	        throw new ReferenceError('Unable to locate the element with selector ' + this.$els.selector + '.');
	      }
	
	      this.addClass('pl-scope ' + (_componentName ? _componentName + '-component' : ''));
	      //MPR, ll-trace 12: probably shouldnt be storing all this data in the DOM but here we are
	      this.data('pl-scope', this);
	      this.data('pl-isComponent', !!_componentName);
	
	      //MPR, ll-trace 16: after this point, all of the pl- attributes on the game will be located in
	      //the 'properties' property of the scope, which will be the Game global scope when this is called
	      //from "run"
	      captureProperties.call(this);
	
	      if (_componentName) {
	        //MPR, ll-trace 17: This is probably where we load up the library components
	        loadComponentAssets.call(this, _componentName, function () {
	          init.call(this);
	        });
	      } else {
	        init.call(this);
	      }
	
	      return this;
	    }).bind(this, _node_selector, _componentName);
	
	    if (_componentName === 'screen-basic') {
	      window.magic = window.magic || {};
	      window.magic[_node_selector.id()] = doInitialize;
	      window.magic._screenOrder = window.magic._screenOrder || [];
	      window.magic._screenOrder.push(doInitialize);
	      //if(window.magic._screenOrder.length < 2) {
	      //  return doInitialize();
	      // }
	    } else {}
	      //  return doInitialize();
	
	      //return this;
	    return doInitialize();
	  };
	
	  // only for use in base types
	  this.__init = function () {
	    return this;
	  };
	  this.__ready = function () {
	    return this;
	  };
	
	  this.willInit = function () {
	    return this;
	  };
	  this.init = function () {
	    return this;
	  };
	  this.ready = function () {
	    return this;
	  };
	
	  this.watchAssets = function (_nodes) {
	    var createHandler, watch;
	
	    createHandler = this.bind(function (_node) {
	      return (function () {
	        var loadedEvent = $.Event('loaded', { targetScope: this });
	
	        this.assetQueue.ready(_node.src);
	        this.trigger(loadedEvent, [_node]);
	
	        _node.onload = null;
	      }).bind(this);
	    });
	
	    watch = this.bind(function (_index, _node) {
	      var node = typeof _index === 'number' ? _node : _index;
	
	      if (node.nodeName !== 'IMG' || node.complete) return;
	      if (this.assetQueue.add(node.src)) {
	        node.onload = createHandler(node);
	        node.onerror = function () {
	          console.error('Image failed to load', node.src);
	        };
	      }
	    });
	
	    if (_nodes) {
	      _nodes.forEach(watch);
	      return this;
	    }
	
	    //MPR: So evidently were watching each child but ignoring them if they arenet images
	    // then getting all of our children who are images and running over them again? I have
	    // to see if everything still works without this first line.
	    // oh we totally can.
	    this.each(watch);
	    this.findOwn('img').each(watch);
	
	    return this;
	  };
	
	  this.attachEvents = function () {
	
	    //MPR, ll-trace 32: Another area to be careful. I will make a note of which function this
	    // proto intends to invoke when using fn.caller so that we can do so correctly once it is
	    // removed.
	    // The correct method is the highest level parent:
	    // source/types/jQProxy.js:98:  this.attachEvents = function () {
	    this.proto();
	
	    //MPR, ll-trace 34: This is triggered in types/queue (currently on line 19) and is also listened several times in
	    // types/entity
	    this.assetQueue.on('complete', this.bind(function () {
	      this.assetQueue.off();
	      //MPR: that was a wild ride from start to finish.
	      // @TODO Clean up this event structure.
	      ready.call(this);
	    }));
	
	    //MPR, ll-trace 38: This is triggered by the ready call in the above assetQueue.on('complete')
	    this.on('ready', function (_event) {
	      //MPR: only fire assetQueue ready if this ready event was issued for both the current and asset scopes?
	      if (this.has(_event.targetScope) && this.assetQueue.has(_event.targetScope)) {
	        this.assetQueue.ready(_event.targetScope);
	      }
	
	      //MPR, ll-trace 40: Given that this event will only be triggered when all assets have loaded
	      // it is unclear to me what the purpose of this is. This event is fired very frequently however,
	      // and upon inspection this.isReady is generally false. It must be that many events trigger ready
	      // but only the trace leading here in code produces the final result. Additionally, this result
	      // seems totally independent of the above assetQueue contitional, which additionally does not
	      // seem to affect assetQueue.length
	      if (!this.assetQueue.length && this.isReady) this.off('ready');
	    });
	
	    return this;
	  };
	
	  this.captureReferences = function () {
	    this.findOwn('[id], [pl-id]').each(this.bind(function (_index, _node) {
	      var $node, id;
	
	      if (_node.nodeName === 'AUDIO') return;
	
	      $node = $(_node);
	      id = $node.attr('id') || $node.attr('pl-id');
	
	      if (!this[id]) {
	        _util2['default'].assignRef(this, id, $node.data('pl-scope') || $node);
	      }
	    }));
	  };
	
	  this.captureAudioAssets = function () {
	    var deQ, $audio;
	
	    if (!($audio = this.findOwn('audio')).length) return false;
	
	    deQ = (function (_item) {
	      [this, this.screen].forEach(function (_scope) {
	        if (_scope.requiredQueue && _scope.isMemberSafe('requiredQueue') && _scope.requiredQueue.has(_item)) {
	          _scope.requiredQueue.ready(_item);
	        }
	      });
	    }).bind(this);
	
	    this.audio = _typesAudioManager.AudioManager.create(this.id());
	
	    $audio.each((function (_index, _node) {
	      this.assetQueue.add(_node.src);
	      this.audio.watch(_node).then((function (_audio) {
	        var loadedEvent = $.Event('loaded', { target: _node, targetScope: this });
	
	        if ($(_node).is('[pl-required]')) this.screen.require(_audio);
	
	        if (this.assetQueue.has(_node.src)) this.assetQueue.ready(_node.src);
	
	        this.trigger(loadedEvent);
	      }).bind(this));
	    }).bind(this));
	
	    // proxy events
	    this.audio.on('play pause ended stopped', this.bind(function (_event) {
	      var map = {
	        background: 'BACKGROUND',
	        voiceOver: 'VOICE-OVER',
	        sfx: 'SFX'
	      };
	
	      switch (_event.type) {
	        case 'play':
	          [this, this.screen].forEach(function (_scope, _index, _set) {
	            if (_index === 1 && _scope === _set[0]) return;
	            if (_scope.$els) {
	              _scope.addClass('PLAYING ' + map[_event.target.type]);
	              _scope.currentMedia[map[_event.target.type]] = _event.target;
	            }
	          });
	
	          $(_event.targetNode).addClass('PLAYING');
	          break;
	
	        case 'pause':
	        case 'stopped':
	        case 'ended':
	          [this, this.screen].forEach(function (_scope, _index, _set) {
	            var state;
	
	            if (_index === 1 && _scope === _set[0]) return;
	
	            if (_scope.$els) {
	              _scope.removeClass(map[_event.target.type]);
	              state = _scope.attr('class');
	              if (!/BACKGROUND|VOICE-OVER|SFX/.test(state)) _scope.removeClass('PLAYING');
	              if (_scope.currentMedia[map[_event.target.type]] === _event.target) _scope.currentMedia[map[_event.target.type]] = null;
	            }
	          });
	
	          $(_event.targetNode).removeClass('PLAYING');
	          if (_event.type === 'ended') deQ(_event.target);
	          break;
	      }
	
	      var audioEvent = $.Event('audio-' + _event.type, {
	        target: _event.target,
	        targetSource: _event.targetSource,
	        targetNode: _event.targetNode,
	        targetScope: this
	      });
	
	      this.trigger(audioEvent);
	    }));
	
	    return this;
	  };
	
	  //MPR, ll-trace 48: What the fuck
	  this.handleProperty = function (_implementation) {
	    if (this.propertyHandlers) {
	      if (this.hasOwnProperty('propertyHandlers')) {
	        switch (typeof _implementation) {
	          case 'function':
	            _implementation.call(this.propertyHandlers);
	            break;
	
	          case 'object':
	            this.propertyHandlers.mixin(_implementation);
	            break;
	        }
	      } else {
	        this.propertyHandlers = this.propertyHandlers.extend(_implementation);
	      }
	    } else {
	      this.propertyHandlers = _typesBasic2['default'].extend(_implementation);
	    }
	
	    return this;
	  };
	
	  //MPR: only called from components. Seems to be used to attach "entities" to scopes.
	  // The entity itself is a jquery selector with a "implementation" function, similar to
	  // the way games and components are initialized. It is unclear why entities are distinct
	  // from these other types.
	  this.entity = function (_selector, _implementation) {
	    var Entity, prototype, id;
	
	    Entity = _playGame2['default'].provideEntityType();
	
	    if (!this.hasOwnProperty('entities')) this.entities = [];
	
	    if (this.hasOwnProperty('$els')) {
	      throw new Error('Wait this hasn\'t been tested.');
	      prototype = Entity.isPrototypeOf(this) ? this : Entity;
	      instance = prototype.extend(_implementation).initialize(this.find(_selector));
	      id = _util2['default'].transformId(instance.id());
	
	      // this.entities.push(instance);
	      if (id) this[id] = instance;
	    } else {
	      this.entities.push({
	        selector: _selector,
	        implementation: _implementation
	      });
	    }
	
	    return this;
	  };
	
	  this.has = function (_child) {
	    var child;
	
	    child = Scope.isPrototypeOf(_child) ? _child.$els : _child;
	
	    return !!this.$els.has(child).length;
	  };
	
	  this.toString = function () {
	    var type;
	
	    type = this.baseType.replace('TYPE_', '');
	    type = type.slice(0, 1) + type.slice(1).toLowerCase();
	
	    return ['[', this.id() || this.address(), ' ', type, ']'].join('');
	  };
	
	  this.log = function () {
	    var args;
	
	    args = _util2['default'].toArray(arguments);
	
	    console.log.apply(console, [this.id() || this.address(), '-'].concat(args));
	    return this;
	  };
	
	  //MPR, ll-trace 49: So each scope will attach either an object containing a demi-constructor
	  // or a flat object that accomplishes the same thing. All of this appears to be done to avoid
	  // needing to have a separate function to invoke the handlers from the one that sets them. In
	  // theory this could be used to avoid overriding methods, but this doesnt do that. It will
	  // simply overwrite any that happen to be there in a variety of ways.
	  // By default, the global scope will respond to the 4 properties defined here: component, action, required, and require
	  // component appears to try to recreate the component entity, which should also have happened in initializeEntities.
	  this.handleProperty(function () {
	
	    this.component = function (_node, _name, _value, _property) {
	      var $node, record, scope, id;
	
	      $node = $(_node);
	
	      if (!$node.data('pl-isComponent')) {
	        record = _playGame2['default'].component.get(_value);
	
	        if (record) {
	          scope = createEntity.call(this, $node, record.implementation);
	          id = _util2['default'].transformId(scope.id() || _value, true);
	          _util2['default'].assignRef(this, id, scope);
	
	          if (!scope.isReady) this.assetQueue.add(scope);
	        } else {
	          throw new Error('Ahh!');
	        }
	      }
	    };
	
	    this.action = function (_node, _name, _value) {
	      if (!this.hasOwnProperty('actionables')) {
	        this.actionables = Actionables.create();
	        attachActionHandler.call(this);
	      }
	
	      this.actionables.add(_node, _value);
	    };
	
	    this.required = function (_node, _name, _value) {
	      if (this.is(_node)) {
	        this.screen.require(this);
	      }
	    };
	
	    this.require = function (_node, _name, _value) {
	      var query, $node;
	
	      // if the node with the attribute is the node for this scope
	      if (this.is(_node)) {
	        query = '#_value, [pl-id=_value], [pl-component=_value]'.replace(/_value/g, _value);
	        $node = this.find(query);
	
	        $node.on('ready', this.bind(function (_event) {
	          if ($node.is(_event.target)) {
	            this.require(_event.targetScope);
	          }
	        }));
	      }
	    };
	  });
	});
	
	exports['default'] = { Scope: Scope, createEntity: createEntity };
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var _Object$keys = __webpack_require__(68)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	*  jQProxy
	*  @desc Contains all the jQuery methods targeted towards a property which references a jQuery object.
	*  @proto Basic
	*
	*  NOTE: Custom events may trigger on scopes
	*  that also targets the same elments. Testing needed.
	*/
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesBasic = __webpack_require__(51);
	
	var _typesBasic2 = _interopRequireDefault(_typesBasic);
	
	var jQProxy = _typesBasic2['default'].extend(function () {
	  var method, exclude;
	
	  /**
	  *  @desc Creates a function with a proxy to the jQuery method.
	  *  @param _name (String) The name of the method being proxied.
	  *  @return (jQuery|*) Either a jQuery object or whatever the original method returns.
	  *  @private
	  */
	  function createProxyFunction(_name) {
	    return function () {
	      var response;
	
	      // This makes sure your not calling any jQuery methods before initialization.
	      if (!this.hasOwnProperty('$els')) {
	        if (_name === 'on') {
	          registerHandler.call(this, arguments);
	        } else {
	          throw new ReferenceError('Unable to invoke ' + _name + ' because the scope is not initialized.');
	        }
	        return;
	      }
	
	      response = $.fn[_name].apply(this.$els, resolveEventHandler(this, _name, arguments));
	
	      if (response === this.$els || response && response.jquery && response.is(this.$els)) {
	        return this;
	      }
	
	      return response;
	    };
	  }
	
	  function resolveEventHandler(_scope, _method, _args) {
	    var i, arg, args;
	
	    args = [];
	
	    if (~['on', 'load'].indexOf(_method)) {
	      for (i = 0; arg = _args[i]; i += 1) {
	        if (typeof arg === 'function') {
	          args.push((function (_handler) {
	            return function () {
	              return _handler.apply(_scope, arguments);
	            };
	          })(arg));
	        } else {
	          args.push(arg);
	        }
	      }
	
	      return args;
	    }
	
	    return _args;
	  }
	
	  function registerHandler(_definition) {
	    if (!this.hasOwnProperty('eventRegistry')) {
	      if (this.eventRegistry && this.isMemberSafe('eventRegistry')) {
	        this.eventRegistry = this.eventRegistry.slice(0);
	      } else {
	        this.eventRegistry = [];
	      }
	    }
	
	    this.eventRegistry.push(_definition);
	
	    return true;
	  }
	
	  // We don't want jQuery methods overridding our base type's methods.
	  exclude = ['constructor'].concat(_Object$keys(_typesBasic2['default']));
	
	  this.baseType = 'TYPE_JQPROXY';
	  this.$els = null;
	  this.eventRegistry = null;
	
	  for (method in $.fn) {
	    if (!$.fn.hasOwnProperty(method) || ~exclude.indexOf(method)) continue;
	    this[method] = createProxyFunction(method);
	  }
	
	  this.node = function () {
	    return this.$els[0];
	  };
	
	  this.attachEvents = function () {
	    //MPR, ll-trace 33: This is the function that should be extended by scope's attachEvents
	    var self;
	
	    self = this;
	
	    if (this.eventRegistry && this.isMemberSafe('eventRegistry')) {
	      this.eventRegistry.forEach(function (_definition) {
	        self.on.apply(self, _definition);
	      });
	    }
	  };
	
	  this.listen = function (_name, _isCapure_handler, _handler) {
	    var _isCapture, node, handler;
	
	    _isCapture = false;
	
	    // resolve arguments
	    typeof _isCapure_handler === 'boolean' ? _isCapture = _isCapure_handler : _handler = _isCapure_handler;
	
	    _handler.cb = _handler.bind(this);
	
	    if (this.$els) {
	      node = this.$els[0];
	      if (node) return node.addEventListener(_name, _handler.cb, _isCapture);
	    } else {
	      return registerHandler([_name, _handler.cb, _isCapture]);
	    }
	
	    return false;
	  };
	
	  this.ignore = function (_name, _handler) {
	    var node = this.$els && this.$els[0];
	
	    if (node) return node.removeEventListener(_name, _handler.cb || _handler);
	
	    return false;
	  };
	
	  // Wraps you function 'this' to the scope.
	  //
	  // MPR: Oh for the love of god and all that is holy. @TODO change this functions name.
	  this.bind = function (_handler) {
	    var args;
	
	    args = [].map.call(arguments, function (m) {
	      return m;
	    }).slice(1);
	
	    //MPR: At the very least remove the extra bind in here. Or remove this function entirely and use
	    //fn.bind properly.
	    return _handler.bind.apply(_handler, [this].concat(args));
	  };
	
	  //MPR: The purpose of this function appears to be to get all items based on a selector
	  // and then filter them to only nodes that share a scope. I do not know how this functions
	  // with the filter bound to whatever "this" happens to be.
	  // Oh. Its not fn.bind. Its scope.bind. That name needs to change.
	  this.findOwn = function (_selector) {
	    return this.find(_selector).filter(this.bind(function (_index, _node) {
	      var $node;
	
	      $node = $(_node);
	
	      if ($node.hasClass('pl-scope')) {
	        return $node.parent().scope() === this;
	      }
	
	      return $node.scope() === this;
	    }));
	  };
	
	  this.isMemberSafe = function (_name) {
	    var owner, elOwner, prototype;
	
	    if (this.hasOwnProperty(_name)) {
	      return true;
	    } else {
	      prototype = Object.getPrototypeOf(this);
	      owner = _util2['default'].getOwner(this, this[_name]);
	
	      if (owner.object.hasOwnProperty('$els') || prototype.hasOwnProperty('$els')) return false;
	
	      //MPR, ll-trace 30: so this method is basically checking if a property exists on an element
	      // or in a prototype chain. If it is in the chain or on the element return false, otherwise
	      // return true if it is unique to the current level
	      // As a side note, the existence of this method is evidence of why prototypes are not
	      // used in this fashion
	      if (prototype.$els) {
	        elOwner = _util2['default'].getOwner(prototype, prototype.$els);
	
	        if (owner.object.isPrototypeOf(elOwner.object)) {
	          return false;
	        }
	      }
	
	      return true;
	    }
	  };
	
	  this.is = function (_obj) {
	    if (!_obj) return false;
	    if (_obj.$els) return this.$els.is(_obj.$els);
	
	    return this.$els.is(_obj);
	  };
	});
	
	exports['default'] = jQProxy;
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	module.exports = __webpack_require__(10).Object.keys;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(26)
	  , $keys    = __webpack_require__(41);
	
	__webpack_require__(71)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(10)
	  , fails   = __webpack_require__(19);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	*  Queue
	*  @desc Contains...
	*  @proto Array, Events, Basic
	*/
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesCollection = __webpack_require__(64);
	
	var _typesCollection2 = _interopRequireDefault(_typesCollection);
	
	var _typesEvents = __webpack_require__(61);
	
	var _typesEvents2 = _interopRequireDefault(_typesEvents);
	
	var Queue = _typesCollection2['default'].extend(function () {
	
	  this.baseType = 'TYPE_QUEUE';
	
	  this.ready = function (_record) {
	    if (_record != null) this.remove(_record);
	
	    if (!this.length) {
	      //MPR, ll-trace 39: This may be a problematic loop. Complete fires ready, ready fires complete.
	      //Probably the only reason this works is because the only purpose of this function is to remove
	      //the last record and continue the cycle of audio events firing. Even with it working, it seems
	      //unlikely that this is a stable or predictable configuration.
	      this.trigger('complete');
	    }
	
	    return this;
	  };
	
	  _util2['default'].mixin(this, _typesEvents2['default']);
	
	  return this;
	});
	
	exports['default'] = Queue;
	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports) {

	exports.__esModule = true;
	/**
	 * @module evalAction
	 */
	
	/**
	 * Performs `eval()` on the value of an `action` attribute on an HTML element.
	 * @arg {string} _source - JavaScript source code.
	 * @arg {Scope} _scope - The context in which to run the source.
	 * @returns {*} The result of the evaluated source.
	 */
	function evalAction(_source, _scope) {
	  var error;
	
	  function target(_selector) {
	    if (_scope.event) {
	      return _selector ? $(_scope.event.target).closest(_selector) : $(_scope.event.target);
	    }
	  }
	
	  // expose members of the object as if they were local variables.
	  // NOTE: methods still retain their "this" binding to the object! :D
	  return eval('with (_scope) { try {' + _source + ';} catch (error) { console.error(\'Error:\', error.message, \'evaluating action\', _source, \'in\', _scope.id() || _scope.address()); } }');
	}
	
	exports['default'] = evalAction;
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var _Promise = __webpack_require__(75)['default'];
	
	var _Object$keys = __webpack_require__(68)['default'];
	
	var _Object$create = __webpack_require__(52)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	
	/**
	 * Contains classes for managing different media types.
	 * Providing an API for referencing and control.
	 * @module
	 * @author Micah Rolon <micah@ginasink.com>
	 */
	
	var _typesType = __webpack_require__(108);
	
	var _typesType2 = _interopRequireDefault(_typesType);
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesCollection = __webpack_require__(64);
	
	var _typesCollection2 = _interopRequireDefault(_typesCollection);
	
	// Object type definitions are using  `$` as the augmentation method for Types.
	'use strict';var EventTargetInterface,
	    InspectorInterface,
	    PlayableInterface,
	    LegislatorInterface,
	    StateInterface,
	    $$ = window.jQuery;
	
	/**
	 * <span class="note important">NOTE: This constructor is used to construct its protoype which we instatiate with `MediaManager.create()`.</span>
	 * Manages any playing media (Audio, Video).
	 * @arg {function} $ - Passed by `type()`, gives you a pritier interface for defining the instance members.
	 * @classdesc Manages any playing media (Audio, Video).
	 * <style>
	 * .note {
	 *   border: solid 1px;
	 *   border-radius: 4px;
	 *   padding: 1px 4px;
	 *   color: #aaa;
	 *   background-color: #eee;
	 * }
	 *
	 * .note.important {
	 *   color: #b55;
	 *   background-color: #fee;
	 * }
	 * </style>
	 *
	 * @class
	 */
	function MediaManager($, sup) {
	  /**
	   * Duck typed multiple inheritance.
	   */
	  _util2['default'].mixin(this, EventTargetInterface, InspectorInterface, LegislatorInterface, StateInterface);
	  $('video', function alloc(_id) {
	    sup(this, 'alloc', arguments);
	    this.video = _typesCollection2['default'].create();
	    this.initialize(_id, 'media manager');
	  });
	}
	
	/**
	 * The Scopes entry for its audio management interface. This gives access to collections of Audio objects grouped into three types.
	 *
	 * <span class="note important">NOTE: This constructor is used to construct its protoype which we instatiate with `AudioManager.create()`.</span>
	 * @arg {function} $ - Passed by `type()`, gives you a pritier interface for defining the instance members.
	 * @classdesc The Scopes entry for its audio management interface. This gives access to collections of Audio objects grouped into three types.
	 * - Background
	 * - Voice Over
	 * - SFX (Sound Effects)
	 * These collections are filled by the HTML Audio elements which have classes corresponding to these types.
	 * @class
	 * @prop {type} member - Text.
	 * @extends EventTargetInterface
	 * @extends PlayableInterface
	 * @extends InspectorInterface
	 */
	function AudioManager($) {
	  var AUDIO_TYPES, BUFFER_CACHE;
	
	  /**
	   * A record object for passing the MediaElement which got loaded as an `AudioBuffer`.
	   * @arg {HTMLAudioElement} _node - The loaded audio element.
	   * @arg {ArrayBuffer} _buffer - The array buffer loaded from XHR2.
	   */
	  function AudioBufferRecord(_node, _buffer) {
	    this.node = _node;
	    this.type = getAudioType(_node);
	    this.buffer = _buffer;
	  }
	  /**
	   * Provides the classification an audio element falls into.
	   * - Background (`background`)
	   * - Voice Over (`voiceOver`)
	   * - Sound Effects (`sfx`)
	   * @protected
	   * @arg {HTMLAudioElement} _audio - The audio element.
	   * @returns {string} - The type.
	   */
	  function getAudioType(_audio) {
	    return _util2['default'].transformId((_audio.className.match(AUDIO_TYPES) || [])[0], true);
	  }
	  /**
	   * Given an HTMLAudioElement, load its source as an `ArrayBuffer` with XHR2.
	   * @protected
	   * @arg {HTMLAudioElement} _audio - The audio element.
	   * @returns {Promise}
	   */
	  function loadArrayBuffer(_audio) {
	    var xhr, manager, fileName;
	
	    xhr = new (XMLHttpRequest || _util2['default'].noop)();
	    manager = this;
	    fileName = _util2['default'].resolveFileName(_audio.src);
	
	    if (!xhr.open) _Promise.reject('This platfom does not support the XMLHttpRequest API.');
	
	    return new _Promise(function (resolve, reject) {
	      var cache = BUFFER_CACHE[fileName];
	
	      // Decodes ArrayBuffer into an AudioBuffer.
	      function onLoad() {
	        var ctx, promise;
	
	        if (xhr.status >= 200 && xhr.status < 300) {
	          if (ctx = pl.game.getAudioContext()) {
	            promise = new _Promise(function (resolveDecoding, rejectDecoding) {
	              try {
	                ctx.decodeAudioData(xhr.response, function (_buffer) {
	                  var audio = manager.collect(new AudioBufferRecord(_audio, _buffer));
	
	                  resolveDecoding(audio);
	                  // Cache the AudioBuffer to resolve duplicates.
	                  BUFFER_CACHE[fileName] = _buffer;
	                }, function () {
	                  rejectDecoding("Failed to decode ArrayBuffer for " + fileName + '.');
	                });
	              } catch (e) {
	                rejectDecoding(e);
	              }
	            });
	
	            promise.then(resolve)['catch'](reject);
	
	            return promise;
	          }
	        } else {
	          reject(xhr.statusText);
	        }
	
	        xhr.removeEventListener('load', onLoad);
	        xhr = null;
	      }
	
	      function onError() {
	        reject(xhr.statusText);
	        xhr.removeEventListener('error', onError);
	        xhr = null;
	      }
	
	      if (cache && cache !== 'loading') return resolve(manager.collect(new AudioBufferRecord(_audio, cache)));
	
	      BUFFER_CACHE[fileName] = 'loading';
	
	      xhr.responseType = 'arraybuffer';
	
	      xhr.addEventListener('load', onLoad, false);
	      xhr.addEventListener('error', onError, false);
	      xhr.open('GET', _audio.src, true);
	      xhr.send();
	    });
	  }
	  /**
	   * The CSS class names reconized as audio types.
	   */
	  AUDIO_TYPES = /background|voice-over|sfx/i;
	  BUFFER_CACHE = {};
	  /**
	   * Duck typed multiple inheritance.
	   */
	  _util2['default'].mixin(this, EventTargetInterface, PlayableInterface, InspectorInterface, LegislatorInterface, StateInterface);
	
	  // A little ugg but define instance members.
	  $(
	  // Declare properties.
	  'background, voiceOver, sfx, scope',
	
	  /**
	   * Define instance properties.
	   */
	  function alloc(_id) {
	    this.initialize(_id, 'audio manager');
	
	    ['background', 'voiceOver', 'sfx'].forEach((function (_type) {
	      var collection = this[_type] = AudioCollection.create(_type);
	      this.addShadow(collection);
	    }).bind(this));
	  },
	
	  /**
	   * Given an audio element begin loading the asset.
	   * @arg {HTMLAudioElement} _audio - The HTML Audio element which to preload and add to the game audio context.
	   * @returns {Promise}
	   * @todo Support loading from node source or a string argument. - Micah:2/19/16
	   */
	  function load(_audio) {
	    var manager, type;
	
	    manager = this;
	    type = getAudioType(_audio);
	
	    if (!type) return _Promise.reject('Audio is missing a type. Please classify as \'background\', \'voiceOver\' or \'sfx\'.');
	    // if (~['sfx', 'voiceOver'].indexOf(type))
	    return loadArrayBuffer.call(this, _audio);
	
	    // return new Promise(function (resolve, reject) {
	    //  _audio.onloadeddata = function () { resolve(manager.collect(this)); };
	    //  _audio.onerror = reject;
	    //  _audio.load();
	    // });
	  },
	
	  /**
	   * Begins loading an AudioElement waits for it to load.
	   * @arg {HTMLAudioElement} _audio - The HTML Audio element which to preload and add to the game audio context.
	   * @returns {Promise}
	   */
	  function watch(_audio) {
	    var promise;
	
	    if (_audio.nodeName !== 'AUDIO') return _Promise.reject('Invalid type for audio node. ' + typeof _audio + ' [' + _audio.protoype.constructor.name + ' ' + _audio.nodeName + '].');
	
	    function reject(_error) {
	      var scope = $$(_audio).scope();
	      console.warn(scope.id(), '-', _error);
	    }
	
	    (promise = this.load(_audio))['catch'](reject.bind(this));
	
	    return promise;
	  },
	
	  /**
	   * Adds a audio to the collection. You may also pass an itterable of items to add.
	   * @arg {Audio|HTMLAudioElement|AudioBufferRecord|Array} _audio - The HTML Audio element or `AudioBufferRecord` for addition to the collection.
	   * @returns {Promise}
	   */
	  function collect(_audio) {
	    var type;
	
	    if (!_audio) return false;
	
	    if (_audio.length) {
	      return _audio.map(collect.bind(this));
	    }
	
	    type = _audio.type || getAudioType(_audio);
	
	    if (type && this[type]) return this[type].add(_audio);
	
	    return false;
	  },
	  /**
	   * Provides a collection of `AudioCollection` objects.
	   * @returns {array}
	   */
	  function collections() {
	    var result, types;
	
	    result = [];
	    types = _Object$keys(this);
	
	    types.forEach((function (_type) {
	      if (this[_type] instanceof AudioCollection) result.push(this[_type]);
	    }).bind(this));
	
	    return result;
	  },
	  /**
	   * Proveds a string representation of the object type.
	   */
	  function toString() {
	    return '[object ' + (this.constructor.name || 'Object') + ']';
	  });
	}
	
	/**
	 * An itterable with a collection of Audio objects. This interface also exposes methods for working with it members.
	 *
	 * <span class="note important">NOTE: This constructor is used to construct its protoype which we instatiate with `AudioCollection.create()`.</span>
	 * @arg {function} $ - Passed by `type()`, gives you a pritier interface for defining the instance members.
	 * @classdesc An itterable with a collection of Audio objects. This interface also exposes methods for working with it members.
	 * @extends Collection
	 */
	function AudioCollection($, sup) {
	  /**
	   * Duck typed multiple inheritance.
	   */
	  _util2['default'].mixin(this, EventTargetInterface, PlayableInterface, InspectorInterface, StateInterface);
	
	  $('type', function alloc(_type) {
	    if (_type) this.type = _type;
	    this.initialize(_type, 'collection');
	  },
	  /**
	   * Adds an Audio object to the collection.
	   * @arg {HTMLAudioElement|Audio} _audio - Object to add.
	   * @override
	   * @returns {Audio}
	   */
	  function add(_audio) {
	    var audio;
	
	    if (!_audio) return false;
	
	    audio = _audio instanceof Audio ? _audio : Audio.create(_audio, this.type);
	
	    sup(this, 'add')(audio);
	    this.addShadow(audio);
	    if (audio.id()) _util2['default'].assignRef(this, audio.id(), audio);
	
	    return audio;
	  },
	  /**
	   * Get the owning manager interface for an Audio object.
	   * @returns {AudioManager}
	   */
	  function manager() {
	    return this.$el.closest('#man').data('context');
	  },
	  /**
	   * Proveds a string representation of the object type.
	   */
	  function toString() {
	    return '[object ' + (this.constructor.name || 'Object') + ']';
	  });
	}
	/**
	 * Extend AudioCollection with Collection.
	 */
	AudioCollection.prototype = _Object$create(_typesCollection2['default'], {
	  constructor: {
	    value: AudioCollection,
	    enumerable: false,
	    writeable: false,
	    configureable: false
	  }
	});
	/**
	 * <span class="note important">NOTE: This constructor is used to construct its protoype which we instatiate with `MediaCollection.create()`.</span>
	 * Returned as the result of some collection process.
	 * @arg {function} $ - Passed by `type()`, gives you a pritier interface for defining the instance members.
	 * @classdesc Returned as the result of some collection process.
	 *
	 * @class
	 * @extends AudioCollection
	 * @extends EventTargetInterface
	 * @extends InspectorInterface
	 * @extends LegislatorInterface
	 * @extends StateInterface
	 */
	function MediaCollection($, sup) {
	  $(
	  /**
	   * @override
	   */
	  function add(_media) {
	    this.addShadow(_media);
	    if (_media.id()) _util2['default'].assignRef(this, _media.id(), _media);
	    return _typesCollection2['default'].add.call(this, _media);
	  },
	  /**
	   * @override
	   */
	  function addShadow(_media) {
	    var $clone;
	
	    $clone = _media.$el.clone();
	    $clone.data(_media.$el.data());
	
	    this.$el.append($clone);
	    return this;
	  });
	}
	
	/**
	 * <span class="note important">NOTE: This constructor is used to construct its protoype which we instatiate with `AudioCollection.create()`.</span>
	 * An interface for controlling a MediaElement or AudioBuffer.
	 * @arg {function} $ - Passed by `type()`, gives you a pritier interface for defining the instance members.
	 * @classdesc An itterable with a collection of Audio objects. This interface also exposes methods for working with it members.
	 */
	function Audio($) {
	
	  function accessConfig(_augment, _val) {
	    if (_val) {
	      return this[_augment] = _val;
	    } else if (typeof _augment === 'string') {
	      return this[_augment];
	    } else {
	      _util2['default'].mixin(this, _augment);
	    }
	
	    return _augment;
	  }
	
	  /**
	   * Duck typed multiple inheritance.
	   */
	  _util2['default'].mixin(this, EventTargetInterface, PlayableInterface, StateInterface);
	
	  $('type, media, activeSource, buffer, config, fileName, gain, delay, delayID',
	
	  /**
	   * Allocates instance props.
	   * @arg {HTMLAudioElement|AudioBufferRecord} _audio - The object being wrapped.
	   * @arg {string} _type - The collection type.
	   */
	  function alloc(_audio, _type) {
	    var $audio, config, ctx, readyEvent, id;
	
	    $audio = $$(_audio.node || _audio);
	    config = $audio.pl();
	    ctx = pl.game.getAudioContext();
	    readyEvent = $$.Event('ready', { targetScope: this });
	
	    if (!(id = $audio.id())) $audio.id(id = _util2['default'].createId());
	
	    this.type = _type || null;
	    this.fileName = _util2['default'].resolveFileName($audio.attr('src'));
	    this.media = $audio[0];
	    this.gain = ctx.createGain();
	
	    this.gain.connect(ctx.destination);
	
	    $audio.data('context', this);
	
	    if (_audio.buffer) this.buffer = _audio.buffer;
	
	    Object.defineProperty(this, 'config', {
	      value: accessConfig.bind(config),
	      writeable: false
	    });
	
	    this.initialize(id, 'audio ' + this.type);
	
	    $$(this.media).trigger(readyEvent);
	  },
	  /**
	   * Provides an `AudioNode` for a particular audio source.
	   * @returns
	   *  - `MediaElementSouceNode` for audio elements.
	   *  - `AudioBufferSourceNode` for an ArrayBuffer.
	   */
	  function getSource() {
	    var ctx, src;
	
	    ctx = this.audioContext || pl.game.getAudioContext();
	
	    if (ctx) {
	      if (this.buffer) {
	        src = ctx.createBufferSource();
	        src.buffer = this.buffer;
	        src.loop = this.media.loop;
	
	        return src;
	      } else {
	        try {
	          return this.activeSource || ctx.createMediaElementSource(this.media);
	        } catch (e) {
	          console.warn(e.message, this);
	        }
	      }
	    }
	
	    return null;
	  },
	  /**
	   * Get the owning collection interface for an Audio object.
	   * @returns {AudioCollection}
	   */
	  function collection() {
	    return this.$el.closest('.collection').data('context');
	  },
	  /**
	   * Get the owning manager interface for an Audio object.
	   * @returns {AudioManager}
	   */
	  function manager() {
	    return this.$el.closest('#man').data('context');
	  },
	  /**
	   * Proveds a string representation of the object type.
	   */
	  function toString() {
	    return '[audio#' + this.id() + ' ' + this.fileName + ']';
	  }, function setContext(ctx) {
	    this.gain = ctx.createGain();
	    this.gain.disconnect();
	    this.gain.connect(ctx.destination);
	    this.audioContext = ctx;
	  });
	}
	
	/**
	 * A virtual DOM to handle navigation and propagation of events through the API interfaces.
	 * For example an Audio object that triggers an event it should bubble up to its collection and on through to the manager.
	 * That way you can listen for an event at any level of the interface.
	 */
	EventTargetInterface = {
	  /**
	   * The shadow node.
	   */
	  $el: null,
	  /**
	   * Define a node for the shadow DOM.
	   * @arg {string} _id - Idendifier for the node.
	   * @arg {string} _class - Classification of the node.
	   */
	  initialize: function initialize(_id, _class) {
	    Object.defineProperty(this, '$el', {
	      value: $$('<div ' + (_id ? 'id="' + _id + '"' : '') + ' ' + (_class ? 'class="' + _class + '"' : '') + '>'),
	      writeable: false,
	      configureable: false,
	      enumerable: false
	    });
	
	    this.$el.data('context', this);
	  },
	  /**
	   * Get/set the id of the interface.
	   * @arg {string} _id - A valid CSS ID.
	   */
	  id: function id(_id) {
	    return this.$el.id(_id);
	  },
	  /**
	   * Add an interface to the shadow DOM.
	   * @arg {Audio|AudioCollection} _obj - The object to add.
	   * @returns this
	   */
	  addShadow: function addShadow(_obj) {
	    this.$el.append(_obj.$el);
	    return this;
	  },
	  /**
	   * Provides the parent level interface.
	   * @returns {AudioManager|AudioCollection}
	   */
	  parent: function parent() {
	    return this.$el.parent().data('context');
	  },
	  /**
	   * Find an interface in the API tree.
	   * @arg {string} _selector - A CSS selector to match a node in the shadow DOM API tree.
	   */
	  find: function find(_selector) {
	    var collection = MediaCollection.create();
	
	    this.$el.find(_selector).each(function () {
	      collection.add($$(this).data('context'));
	    });
	
	    return collection;
	  },
	  /**
	   *
	   */
	  filter: function filter(_selector) {
	    var collection;
	
	    if (!_selector) return this;
	
	    collection = MediaCollection.create();
	
	    this.$el.children().each(function () {
	      var $node = $$(this);
	      if ($node.is(_selector)) collection.add($node.data('context'));
	    });
	
	    return collection;
	  },
	  /**
	   * Attach events to a shadow node.
	   */
	  on: function on() {
	    this.$el.on.apply(this.$el, arguments);
	    return this;
	  },
	  /**
	   * Remove events from a shadow node.
	   */
	  off: function off() {
	    this.$el.off.apply(this.$el, arguments);
	    return this;
	  },
	  /**
	   * Dispatch a event from a shadow node.
	   */
	  trigger: function trigger() {
	    this.$el.trigger.apply(this.$el, arguments);
	    return this;
	  }
	};
	/**
	 * Interface for inspecting an API level (i.e. manager or collection).
	 */
	InspectorInterface = {
	  playing: function playing(_filterSelector) {
	    var playing = this.find('.PLAYING').filter(_filterSelector);
	    return !!playing.length && playing;
	  },
	  /**
	   * Query a collection for ownership of an audio object.
	   * @arg {string|Audio|HTMLAudioElement} The validating reference.
	   * @returns {boolean}
	   */
	  has: function has(_query) {
	    if (this.background) {
	      return ['background', 'voiceOver', 'sfx'].some((function (_name) {
	        return this[_name].has(_query);
	      }).bind(this));
	    }
	
	    if (this[_query]) return true;
	
	    return this.some(function (_audio) {
	      return _audio === _query || _audio.media === _query || _audio.fileName === _query || _audio.id() === _query;
	    });
	  }
	};
	
	LegislatorInterface = {
	  rule: function rule(_selector, _event, _handler) {
	    var handler, args;
	
	    handler = [typeof _event, typeof _handler].indexOf('function');
	    args = _util2['default'].toArray(arguments).slice(1);
	
	    if (typeof _event === 'function') _event = 'play pause stopped ended';
	
	    this.on(_event, (function (_e) {
	      if (_e.target.$el.is(_selector)) args[handler].apply(this, arguments);
	    }).bind(this));
	  }
	};
	
	StateInterface = {
	  state: function state() {
	    return this.$el.state.apply(this.$el, arguments);
	  },
	
	  addState: function addState(_state) {
	    return this.$el.addClass(_state.toUpperCase());
	  },
	
	  removeState: function removeState(_state) {
	    return this.$el.removeClass(_state.toUpperCase());
	  }
	};
	
	/**
	 * Interface for methods involving audio control for any API level.
	 */
	PlayableInterface = {
	  proxyEvent: function proxyEvent(_event) {
	    var theEvent = $$.Event(_event.type, { target: this, targetSource: _event.target, targetNode: this.media });
	
	    // proxy event to shadow DOM only when it has an active source.
	    if (this.activeSource) {
	      if (_event.type === 'ended') {
	        this.removeState('PLAYING');
	        this.activeSource = null;
	      }
	
	      this.trigger(theEvent);
	    }
	
	    _event.target.removeEventListener(_event.type, this.handler.bind(this), false);
	  },
	  handler: function handler(_event) {
	    if (_event.type === 'ended' && _event.activeSource) {
	      _event.activeSource.disconnect();
	    }
	    this.proxyEvent.call(this, _event);
	  },
	  simEnd: function simEnd() {
	    if (this.activeSource) {
	      console.warn('Native `ended` failed to fire, simulating...');
	      this.handler({ target: this.activeSource, type: 'ended' });
	    }
	  },
	  playSource: function playSource() {
	    var time;
	    if (this.buffer) {
	      this.activeSource.start(0);
	      this.startTime = new Date();
	
	      if (!this.activeSource.loop) {
	        time = Math.ceil(this.buffer.duration * 1000) + 250;
	        this.timeout = setTimeout(this.simEnd.bind(this), time);
	      }
	    } else {
	      this.media.play();
	    }
	
	    this.delayID = null;
	  },
	  /**
	   * Play an audio object.
	   */
	  play: function play(_selector) {
	    var ctx, src, dest, delay, shouldPlay;
	
	    function response(_val) {
	      shouldPlay = _val;
	    }
	
	    ctx = this.audioContext || pl.game.getAudioContext();
	    shouldPlay = true;
	
	    /*
	     * I'm commenting out this line because having it there
	     * prevents new audio from starting while the game is out of focus
	     * which makes certain screens impossible to complete.
	     * Giving the game the ability to pause will remove the need for
	     * this line of code, anyway.
	     */
	    // if (ctx.state === 'suspended') return false;
	
	    if (this.background) return this.background.play();
	    if (this.length != null) {
	      if (_selector) {
	        if (this[_selector]) return this[_selector].play();
	
	        return this.find(_selector).play();
	      }
	      return this[0] && this[0].play();
	    }
	
	    if (!(src = this.getSource())) return false;
	
	    src.connect(this.gain);
	    src.addEventListener('ended', this.handler.bind(this), false);
	
	    this.trigger($$.Event('shouldPlay', { target: this, targetSource: src, targetNode: this.media, response: response }));
	
	    if (shouldPlay) {
	      this.addState('PLAYING');
	      this.activeSource = src;
	
	      if (delay = this.config('delay')) {
	        this.delayID = setTimeout(this.playSource.bind(this), _util2['default'].toMillisec(delay));
	      } else {
	        this.playSource.call(this);
	      }
	
	      this.handler({ target: src, type: 'play' });
	    }
	
	    return this;
	  },
	  /**
	   * Pause an audio object.
	   */
	  pause: function pause() {
	    if (this.buffer) {
	      this.pauseTime = new Date();
	      clearTimeout(this.timeout);
	      this.timeout = null;
	    }
	
	    return this;
	  },
	  /**
	   * Resume an audio object.
	   */
	  resume: function resume() {
	    var time;
	    if (this.buffer) {
	      if (!this.activeSource.loop) {
	        time = Math.ceil(this.buffer.duration * 1000 - (this.pauseTime - this.startTime)) + 250;
	        this.timeout = setTimeout(this.simEnd.bind(this), time);
	      }
	    }
	
	    return this;
	  },
	  /**
	   * Stop an audio object.
	   */
	  stop: function stop(_filterSelector) {
	    var stopEvent = $$.Event('stopped', { target: this, targetSource: this.activeSource, targetNode: this.media });
	
	    if (this.background) return this.background.stop(_filterSelector);
	    if (this.length != null) {
	      if (_filterSelector === '@ALL') {
	        this.forEach(function (_audio) {
	          _audio.stop();
	        });
	      } else {
	        return this[0] && this[0].stop();
	      }
	    }
	
	    if (!this.activeSource) return false;
	
	    if (this.buffer) {
	      if (!this.delayID) this.activeSource.stop();
	    } else {
	      this.media.pause();
	      this.media.currentTime = 0;
	    }
	
	    if (this.delayID) {
	      clearTimeout(this.delayID);
	      this.delayID = null;
	    }
	
	    this.activeSource = null;
	
	    this.removeState('PLAYING');
	    this.trigger(stopEvent);
	
	    return this;
	  },
	  /**
	   * @todo MGR, 2/9/2016: Pipe audio sources into gain nodes for each level of the API.
	   */
	  volume: function volume(_level, _filterSelector) {
	    if (this.background) return this.background.volume(_level);
	    if (this.length != null) {
	      if (_filterSelector === '@ALL') {
	        this.forEach(function (_audio) {
	          _audio.volume(_level);
	        });
	      } else {
	        return this[0] && this[0].volume(_level);
	      }
	    }
	
	    this.gain.gain.value = _level;
	  },
	  startTime: 0,
	  pauseTime: 0
	};
	
	exports['default'] = _typesType2['default'](MediaManager, AudioManager, AudioCollection, Audio);
	
	AudioCollection.extend(MediaCollection);
	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(87);
	__webpack_require__(91);
	module.exports = __webpack_require__(10).Promise;

/***/ },
/* 77 */
/***/ function(module, exports) {



/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(79)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(80)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , defined   = __webpack_require__(27);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(81)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(82)
	  , hide           = __webpack_require__(13)
	  , has            = __webpack_require__(43)
	  , Iterators      = __webpack_require__(83)
	  , $iterCreate    = __webpack_require__(84)
	  , setToStringTag = __webpack_require__(85)
	  , getPrototypeOf = __webpack_require__(86)
	  , ITERATOR       = __webpack_require__(32)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(55)
	  , descriptor     = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(85)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(13)(IteratorPrototype, __webpack_require__(32)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).f
	  , has = __webpack_require__(43)
	  , TAG = __webpack_require__(32)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(43)
	  , toObject    = __webpack_require__(26)
	  , IE_PROTO    = __webpack_require__(47)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	var global        = __webpack_require__(9)
	  , hide          = __webpack_require__(13)
	  , Iterators     = __webpack_require__(83)
	  , TO_STRING_TAG = __webpack_require__(32)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(89)
	  , step             = __webpack_require__(90)
	  , Iterators        = __webpack_require__(83)
	  , toIObject        = __webpack_require__(44);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(80)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(81)
	  , global             = __webpack_require__(9)
	  , ctx                = __webpack_require__(11)
	  , classof            = __webpack_require__(92)
	  , $export            = __webpack_require__(8)
	  , isObject           = __webpack_require__(16)
	  , anObject           = __webpack_require__(15)
	  , aFunction          = __webpack_require__(12)
	  , anInstance         = __webpack_require__(93)
	  , forOf              = __webpack_require__(94)
	  , setProto           = __webpack_require__(98).set
	  , speciesConstructor = __webpack_require__(101)
	  , task               = __webpack_require__(102).set
	  , microtask          = __webpack_require__(104)
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(32)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(105)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(85)($Promise, PROMISE);
	__webpack_require__(106)(PROMISE);
	Wrapper = __webpack_require__(10)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(107)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(25)
	  , TAG = __webpack_require__(32)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(11)
	  , call        = __webpack_require__(95)
	  , isArrayIter = __webpack_require__(96)
	  , anObject    = __webpack_require__(15)
	  , toLength    = __webpack_require__(28)
	  , getIterFn   = __webpack_require__(97);
	module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(15);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(83)
	  , ITERATOR   = __webpack_require__(32)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(92)
	  , ITERATOR  = __webpack_require__(32)('iterator')
	  , Iterators = __webpack_require__(83);
	module.exports = __webpack_require__(10).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(16)
	  , anObject = __webpack_require__(15);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(11)(Function.call, __webpack_require__(99).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(100)
	  , createDesc     = __webpack_require__(22)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(21)
	  , has            = __webpack_require__(43)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(18) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(15)
	  , aFunction = __webpack_require__(12)
	  , SPECIES   = __webpack_require__(32)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(11)
	  , invoke             = __webpack_require__(103)
	  , html               = __webpack_require__(56)
	  , cel                = __webpack_require__(20)
	  , global             = __webpack_require__(9)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(25)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , macrotask = __webpack_require__(102).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(25)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, fn;
	  if(isNode && (parent = process.domain))parent.exit();
	  while(head){
	    fn = head.fn;
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = true
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = !toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function(fn){
	  var task = {fn: fn, next: undefined};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(13);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(9)
	  , core        = __webpack_require__(10)
	  , dP          = __webpack_require__(14)
	  , DESCRIPTORS = __webpack_require__(18)
	  , SPECIES     = __webpack_require__(32)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(32)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Defines an Object type using a named constructor function.
	 * @module
	 */
	
	/**
	 * Constructs an object with methods bound to a context.
	 * @arg {object} _from - Object with methods to bind.
	 * @arg {object} _to - Context which methtods should be bound to.
	 */
	
	var _Object$defineProperty = __webpack_require__(109)['default'];
	
	var _Object$keys = __webpack_require__(68)['default'];
	
	var _Object$create = __webpack_require__(52)['default'];
	
	exports.__esModule = true;
	exports['default'] = type;
	function Bindings(_from, _to) {
	  var method;
	
	  // pull all methods from the prototype chain.
	  for (method in _from) {
	    if (typeof _from[method] !== 'function') continue;
	    this[method] = _from[method].bind(_to);
	  }
	}
	
	/**
	 * Takes an itterable object and convert it into an Array.
	 * @arg {object} _itterable
	 * @returns {array}
	 */
	function toArray(_itterable) {
	  return [].map.call(_itterable, function (m) {
	    return m;
	  });
	}
	
	/**
	 * Converts a constructor function into an object "type". Which addapts the constructor with and interface for creating instsances and extension.
	 * @arg {function} _constructor... - any number of constructor functions.
	 * @returns The constructor or an object containing all the defined types.
	 */
	
	function type() {
	  var defs, module;
	
	  /**
	   * Constructs an interface which is accesed through the constructors arguments.
	   * These arguments are parsed from the function string and collected into an array.
	   * @arg {function} _constructor
	   * @returns {array} The collection of API functions requested by the constructor.
	   */
	  function createApi(_constructor) {
	    var args, api;
	
	    // Matches the names of the arguments defined in the source of the function.
	    // [^\(\)\.\s,]+ captures one or more of any character which is NOT a parenthetical, period, white-space character, or comma.
	    // It then takes that rule and looks for multiple intances w/o spaces or commas around it, which would be encased in parenthensies.
	    // NOTE: since this regex is not matching globally, it will not match any argument clusters past the function definition.
	    args = (Function.prototype.toString.call(_constructor).match(/\(((?:\s*[^\(\)\.\s,]+\s*,?)+)\)/) || ['', ''])[1].split(/\s*,\s*/);
	    api = {
	      /**
	       * Invokes the specified method closest in the prototype chain. Allowing you to still invoke a method which was overridden.
	       *
	       * @arg {object} _obj - The context which to find the parent function.
	       * @arg {string} _name - The method name.
	       * @arg {array} _args - A collection of arguments to invoke the method with
	       * @returns {*} Whatever the caller returns.
	       *
	       * @example
	       * Car.extend(function Ford (proto) {
	       *     this.drive = function () {
	       *         proto(this, 'drive', arguments);
	       *         // do some opps.
	       *     };
	       * });
	       */
	      proto: function proto(_obj, _name, _args) {
	        var proto, method;
	
	        proto = Object.getPrototypeOf(this || _obj);
	        method = proto[_name];
	
	        if (typeof _obj[_name] !== 'function') {
	          throw new TypeError('Member ' + _name + ' is not a function.');
	        }
	
	        if (method) {
	          // Does _obj's prototype have the method and it's not the same reference as _obj.
	          if (proto.hasOwnProperty(_name) && _obj[_name] !== proto[_name]) {
	            return _args ? method.apply(_obj, _args) : method.bind(_obj);
	          }
	
	          // Otherwise, walk the prototype chain to find the prototype that has the parent method.
	          while (proto) {
	            if (proto.hasOwnProperty(_name) && _obj[_name] !== proto[_name]) {
	              return _args ? method.apply(_obj, _args) : method.bind(_obj);
	            }
	
	            proto = Object.getPrototypeOf(proto);
	          }
	        } else {
	          return new Bindings(proto, _obj);
	        }
	      },
	      /**
	       * Invokes the specified method which lives on the object type's prototype.
	       * If your instance overrides the object types method, or your many prototype
	       * levels away from the base prototype, this lets you track back to the original.
	       *
	       * @arg {object} _obj - The context which to find the parent function.
	       * @arg {string} _name - The method name.
	       * @arg {array} _args - A collection of arguments to invoke the method with
	       * @returns {*} Whatever the caller returns.
	       */
	      base: function base(_obj, _name, _args) {
	        var proto, method;
	
	        proto = _constructor.prototype;
	        method = proto[_name];
	
	        if (typeof method !== 'function') {
	          throw new TypeError('Member ' + _name + ' is not a function.');
	        }
	
	        if (method) {
	          return _args ? method.apply(_obj, _args) : method.bind(_obj);
	        } else {
	          return new Bindings(proto, _obj);
	        }
	      },
	      /**
	       * Invokes the specified method on the object type's super type or parent type (i.e. Ford extending Car).
	       * @arg {object} _obj - The context which to find the parent function.
	       * @arg {string} _name - The method name.
	       * @arg {array} _args - A collection of arguments to invoke the method with
	       * @returns {*} Whatever the caller returns.
	       */
	      sup: function sup(_obj, _name, _args) {
	        return api.proto.apply(_constructor.prototype, arguments);
	      },
	      /**
	       * Defines a properpty which is configured `{configureable: false, writeable: false}`.
	       * @arg {object} _obj - The context which to define members.
	       * @arg {string} _name - The member name.
	       * @arg {*} _value - The value.
	       * @returns api
	       */
	      constant: function constant(_obj, _name, _value) {
	        _Object$defineProperty(_obj, _name, {
	          value: _value,
	          configureable: false,
	          writeable: false
	        });
	
	        return api;
	      },
	      /**
	       * Defines members on the constructor.
	       * @function static
	       * @overload
	       * @arg {string} _name - The member name.
	       * @arg {*} _value - The value.
	       * @returns api
	       */
	
	      /**
	       * Defines members on the constructor.
	       * @arg {object} _def - An object with members to mixin.
	       * @returns api
	       */
	      'static': function _static(_name_def, _value) {
	        var member, _name, _def;
	
	        _value ? _name = _name_def : _def = _name_def;
	
	        if (_def) {
	          for (member in _def) {
	            if (!_def.hasOwnProperty(member)) continue;
	            _constructor[member] = _def[member];
	          }
	        }
	
	        if (_name) {
	          _constructor[_name] = _value;
	        }
	
	        return api;
	      },
	      /**
	       * A pretty way of define the interface of your object type.
	       *
	       * You may pass any number of arguments as functions or strings.
	       *
	       * **Example**
	       * ```javascript
	       * function Car ($) {$(
	       *     // Defines a member assigned to `null`.
	       *     'name',
	       *     // Defines members with values as a string and number. Keep in mind these are put on the prototype.
	       *     'engineType = "standard", speed = 0',
	       *
	       *     // Define instance members.
	       *     function alloc (_name) {
	       *         this.name = _name;
	       *     },
	       *
	       *     function drive () {
	       *         this.speed += 1;
	       *     }
	       * )}
	       * ```
	       *
	       * One benefit to this interface is that all your methods are named so you have easy access for recursive programs.
	       * @arg {string|function} _def - A string of property definitions or a named function.
	       * @todo Support property assignment in alloc. Micah: 2/24/2016
	       */
	      $: function $() {
	        var args = toArray(arguments);
	
	        args.forEach(function (_member) {
	          var memberType, props, key;
	
	          memberType = typeof _member;
	
	          switch (memberType) {
	            case 'string':
	              props = _member.split(/\s*,\s*/);
	
	              if (props) {
	                props.forEach(function (_def) {
	                  var prop, val;
	
	                  prop = _def.split(/\s*[:=]\s*/);
	                  try {
	                    val = JSON.parse(prop[1]);
	                  } catch (e) {}
	                  _constructor.prototype[prop[0]] = typeof prop[1] !== 'undefined' ? val || prop[1] : null;
	                });
	              }
	              break;
	
	            case 'object':
	              for (key in _member) {
	                if (!_member.hasOwnProperty(key)) continue;
	                _constructor.prototype[key] = _member[key];
	              }
	              break;
	
	            case 'function':
	              if (!_member.name) throw TypeError('Member must be a named function.');
	              _constructor.prototype[_member.name] = _member;
	              break;
	          }
	        });
	
	        return api;
	      }
	    };
	
	    return args.map(function (_call) {
	      return api[_call] || module[_call];
	    });
	  }
	
	  defs = toArray(arguments);
	  module = !this ? {} : this;
	
	  defs.forEach(function (_constructor) {
	    var api;
	
	    if (typeof _constructor === 'object') {
	      var Super,
	          keys = _Object$keys(_constructor);
	
	      if (keys.length === 1 && module[keys[0]]) {
	        Super = module[keys[0]];
	        return Super.extend.call(module, _constructor[keys[0]]);
	      }
	    }
	
	    api = createApi(_constructor);
	
	    /**
	     * Creates a new instance of the constructor prototype.
	     * This also invokes the `alloc()` on the instance so you can define instance props.
	     * @arg {*} ... - Any number of arguments for `alloc()`.
	     * @returns instance
	     */
	    _constructor.create = function () {
	      var instance = _Object$create(_constructor.prototype);
	      if (typeof instance.alloc === 'function') instance.alloc.apply(instance, arguments);
	      return instance;
	    };
	
	    /**
	     * Extends the provided constructor prototype.
	     * @arg {function} _definition - Constructor for the object type.
	     * @returns _constructor
	     */
	    _constructor.extend = function (_definition) {
	      _definition.prototype = _Object$create(_constructor.prototype, {
	        constructor: {
	          value: _definition,
	          enumerable: false,
	          writeable: false,
	          configureable: false
	        }
	      });
	
	      return type.call(this === _constructor ? null : this, _definition);
	    };
	
	    _constructor.apply(_constructor.prototype, api);
	
	    module[_constructor.name] = _constructor;
	  });
	
	  return defs.length > 1 ? module : defs[0];
	}
	
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(111);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Base class for a scope acting as an "entity" with "states", "behaviors" and the ability to respond (responsibilities) to behaviors.
	 *
	 * @module
	 */
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _typesGlobalScope = __webpack_require__(65);
	
	var _typesGlobalScope2 = _interopRequireDefault(_typesGlobalScope);
	
	var _typesCollection = __webpack_require__(64);
	
	var _typesCollection2 = _interopRequireDefault(_typesCollection);
	
	var _typesDimensions = __webpack_require__(36);
	
	var _typesQueue = __webpack_require__(72);
	
	var _typesQueue2 = _interopRequireDefault(_typesQueue);
	
	function invokeResponsibilities(_scope, _event) {
	  if (_scope && _scope.responsibilities && _scope.isMemberSafe('responsibilities')) {
	    _scope.responsibilities.forEach(function (_record) {
	      if (_record.name === _event.name) {
	
	        // console.log(_scope.id(), 'respond', _record.name, 'from', _event.targetScope.id());
	        _record.ability.call(_scope, _event);
	      }
	    });
	  }
	}
	
	/**
	 * <span class="note important">NOTE: This is NOT a constructor. Use `Entity.create()` to get a new instance.</span>
	 * @classdesc Base class for a scope acting as an "entity" with "states", "behaviors" and the ability to respond (responsibilities) to behaviors. For more information on these terms read [this]{@link module:types/Entity}.
	 * <style>
	 * .tag {
	 *   padding: 1px 4px;
	 *   border-radius: 4px;
	 *
	 *   color: #fff;
	 *   background-color: #aaa;
	 * }
	 *
	 * .tag.behavior {
	 *   background-color: #0ba;
	 * }
	 *
	 * .tag.state {
	 *   background-color: #ba0;
	 * }
	 *
	 * .note {
	 *   border: solid 1px;
	 *   border-radius: 4px;
	 *   padding: 1px 4px;
	 *   color: #aaa;
	 *   background-color: #eee;
	 * }
	 *
	 * .note.important {
	 *   color: #b55;
	 *   background-color: #fee;
	 * }
	 * </style>
	 *
	 * @class
	 * @prop {module:types/Collection~Collection} responsibilities - A collection of ResponsibilityRecords for the scope.
	 * @prop {boolean} isComplete - Marks a scope as "complete" via the [`complete()`]{@link module:types/Entity~Entity#complete} behavior.
	 * @extends GlobalScope
	 */
	var Entity = _typesGlobalScope2['default'].extend(function () {
	  function resolveTarget(_target) {
	
	    switch (typeof _target) {
	      case 'string':
	        return this.findOwn(_target);
	      case 'object':
	        if (_target.jquery) return _target;
	        if (Entity.isPrototypeOf(_target)) return _target;
	        if (_target.nodeType === document.ELEMENT_NODE) return $(_target);
	    }
	
	    return this;
	  }
	
	  function ResponsibilityRecord(_name, _ability) {
	    this.name = _name;
	    this.ability = _ability;
	  }
	
	  function dragGreeter(_event) {
	    switch (_event.type) {
	      case 'drag-start':
	        this.grab(_event.state);
	        break;
	
	      case 'drag-move':
	        this.dragging(_event.state);
	        break;
	
	      case 'drag-end':
	        this.release(_event.state);
	        break;
	    }
	  }
	
	  function attachDragEvents() {
	    if (this.draggables && this.isMemberSafe('draggables') && this.draggables.length) {
	      this.on('drag-start drag-move drag-end', dragGreeter);
	    }
	  }
	
	  this.baseType = 'TYPE_ENTITY';
	  this.STATE = {
	    PLAYING: 'PLAYING',
	    BACKGROUND: 'BACKGROUND',
	    VOICE_OVER: 'VOICE-OVER',
	    SFX: 'SFX'
	  };
	
	  this.timeoutID = null;
	  this.intervalID = null;
	  this.responsibilities = null;
	  this.isComplete = false;
	  this.shouldInheritAbilities = true;
	  this.frameHandlers = null;
	  this.frameRate = 60; // 60fps
	  this.draggables = null;
	  this.requiredQueue = null;
	  this.bgImageCollection = null;
	
	  this.handleProperty({
	    size: function size(_node, _name, _value) {
	      var size;
	
	      if (this.is(_node)) {
	        size = _value.split(/\s*[x,]\s*/);
	        this.css({
	          width: size[0],
	          height: size[1] || size[0]
	        });
	      }
	    },
	
	    position: function position(_node, _name, _value) {
	      var size;
	
	      if (this.is(_node)) {
	        size = _value.split(/\s*[x,]\s*/);
	        this.css({
	          top: size[1] || size[0],
	          left: size[0]
	        });
	      }
	    },
	
	    draggable: function draggable(_node, _name, _value) {
	      if (!this.hasOwnProperty('draggables')) {
	        this.draggables = $();
	      }
	
	      this.draggables.push(_node);
	    },
	
	    bg: function bg(_node, _name, _value) {
	      var img = new Image();
	
	      if (!this.hasOwnProperty('bgImageCollection')) this.bgImageCollection = [];
	
	      if (this.isMemberSafe('bgImageCollection')) {
	        img.src = _value;
	        this.bgImageCollection.push(img);
	        $(_node).css('background-image', 'url(' + _value + ')');
	      }
	    }
	  });
	
	  this.__init = function (_event) {
	    if (this.bgImageCollection && this.isMemberSafe('bgImageCollection')) {
	      this.watchAssets(this.bgImageCollection);
	    }
	    attachDragEvents.call(this);
	
	    return this.proto();
	  };
	
	  this.size = function () {
	    var size;
	
	    if (arguments.length) {
	      size = _typesDimensions.Size.create(arguments);
	      this.css(size);
	      return size;
	    }
	
	    return _typesDimensions.Size.create().set(this.width(), this.height());
	  };
	
	  this.propagateBehavior = function (_event) {
	    var ids;
	
	    ids = [];
	
	    this.findOwn('.pl-scope').each(function (_index, _node) {
	      var $node = $(_node);
	      ids.push($node.id() || $node.address());
	    });
	
	    if (this.hasOwnProperty('entities') && this.entities.length) {
	      // console.log(this.id(), 'propagate', _event.name, 'to', this.entities.length, 'nodes', ids);
	
	      this.entities.forEach(function (_scope) {
	        invokeResponsibilities(_scope, _event);
	        _scope.propagateBehavior(_event);
	      });
	    }
	
	    return this;
	  };
	
	  this.require = function (_entity) {
	    if (!this.hasOwnProperty('requiredQueue')) {
	      this.requiredQueue = _typesQueue2['default'].create();
	      this.requiredQueue.on('complete', this.bind(function () {
	        this.log('entity complete');
	        this.complete();
	      }));
	
	      this.respond('complete', function (_event) {
	        if (!this.has(_event.target)) return;
	        if (_event.targetScope === this) return;
	
	        this.requiredQueue.ready(_event.behaviorTarget);
	      });
	    }
	
	    this.requiredQueue.add(_entity);
	    this.gate();
	
	    return this;
	  };
	
	  this.behavior = function (_name, _behavior) {
	    _behavior.method = this[_name] = function () {
	      var behaviorEvent, result;
	
	      behaviorEvent = {
	        name: _name,
	        message: '',
	        targetScope: this,
	        behaviorTarget: this
	      };
	
	      result = _behavior.apply(this, arguments);
	
	      if (typeof result === 'object') {
	        behaviorEvent = _util2['default'].mixin(behaviorEvent, result);
	      }
	
	      if (result !== false) {
	        this.trigger($.Event('behavior', behaviorEvent));
	      }
	
	      return this;
	    };
	
	    return this;
	  };
	
	  this.respond = function () {
	    var name, ability, parentScope, abilities, protoAbilities;
	
	    if (!this.hasOwnProperty('responsibilities')) {
	      abilities = _typesCollection2['default'].create();
	      protoAbilities = this.provideAblilityPototype();
	
	      if (this.shouldInheritAbilities && protoAbilities && protoAbilities.responsibilities) {
	        abilities.push.apply(abilities, protoAbilities.responsibilities);
	      }
	
	      this.responsibilities = abilities;
	    }
	
	    if (arguments.length === 1) {
	      switch (typeof arguments[0]) {
	        case 'string':
	          name = arguments[0];break;
	
	        case 'function':
	        case 'object':
	          ability = arguments[0];break;
	      }
	    } else {
	      name = arguments[0];
	      ability = arguments[1];
	    }
	
	    switch (typeof ability) {
	      case 'object':
	        for (name in ability) {
	          if (!ability.hasOwnProperty(name)) continue;
	
	          this.respond(name, ability[name]);
	        }
	        break;
	
	      case 'function':
	        this.responsibilities.add(new ResponsibilityRecord(name, ability));
	        break;
	    }
	
	    return this;
	  };
	
	  this.delay = function (_time, _cb) {
	    var time = _util2['default'].toMillisec(_time);
	
	    _util2['default'].assignRef(this, 'timeoutID', setTimeout(_cb.bind(this), time));
	
	    return this;
	  };
	
	  this.repeat = function (_time, _cb) {
	    var time = _util2['default'].toMillisec(_time);
	
	    _util2['default'].assignRef(this, 'intervalID', setInterval(_cb.bind(this), time));
	
	    return this;
	  };
	
	  this.kill = function (_timer) {
	    var id = _timer === 'repeat' ? this.intervalID : this.timeoutID;
	
	    if (typeof id === 'number') {
	      (_timer === 'repeat' ? clearInterval : clearTimeout)(id);
	      this[_timer === 'repeat' ? 'intervalID' : 'timeoutID'] = null;
	    } else if (id) {
	      id.forEach(function (_id) {
	        (_timer === 'repeat' ? clearInterval : clearTimeout)(_id);
	      });
	
	      _timer === 'repeat' ? this.intervalID = null : this.timeoutID = null;
	    }
	
	    return this;
	  };
	
	  this.eachFrame = function (_handler, _on) {
	    var binder, frame, lastTime, rate, frames;
	
	    rate = this.frameRate || 1000;
	    frames = 0;
	    lastTime = 0;
	
	    if (!this.hasOwnProperty('frameHandlers') || this.frameHandlers.length === 0) {
	      frame = function (_time) {
	        var i, handler;
	
	        if (rate) {
	          if (_time - lastTime >= 1000 / rate) {
	            for (i = 0; handler = this.frameHandlers[i]; i += 1) {
	              handler.call(this, _time, Math.round(1000 / (_time - lastTime)), rate);
	            }
	
	            if (frames === rate) frames = 0;
	
	            frames += 1;
	            lastTime = _time;
	          }
	        }
	
	        if (this.frameHandlers.length) {
	          window.requestAnimationFrame(binder);
	        }
	      };
	
	      binder = this.bind(frame);
	
	      // allows methods passed as _handler's to
	      // be able to trace back for proto() callbacks.
	      frame.method = this.eachFrame;
	
	      this.frameHandlers = _typesCollection2['default'].create();
	      window.requestAnimationFrame(binder);
	    }
	
	    if (_on !== false) {
	      this.frameHandlers.add(_handler);
	    } else {
	      this.frameHandlers.remove(_handler);
	    }
	
	    return this;
	  };
	
	  this.state = function (_flag, _definition, _imp) {
	    var flag, tester, setter, getter, STATE, def, opperations, names;
	
	    if (!_definition) {
	      return this.proto(_flag);
	    }
	
	    def = _definition.split(/\s+/);
	    names = _flag.split(/\s+/);
	    opperations = [];
	
	    def.forEach(this.bind(function (_opp) {
	      var method, flag;
	
	      method = _opp.slice(0, 1) === '+' ? 'addClass' : 'removeClass';
	
	      opperations.push({
	        method: method,
	        flag: _opp.slice(1)
	      });
	
	      if (method === 'addClass') {
	        flag = _opp.slice(1);
	        STATE = _util2['default'].transformId(flag);
	        this.STATE[STATE] = flag;
	      }
	    }));
	
	    setter = names[0];
	    tester = names[1];
	
	    this[setter] = function (_target) {
	      var target, uiStateEvent, oppsPerformed;
	
	      target = resolveTarget.call(this, _target);
	      uiStateEvent = $.Event('ui-' + setter, {
	        target: target.jquery ? target[0] : target,
	        targetScope: this
	      });
	      oppsPerformed = 0;
	
	      if (_imp && _imp.shouldSet && _imp.shouldSet.apply(this, arguments) === false) {
	        return !!(_imp && _imp.notSet) && _imp.notSet.apply(this, arguments);
	      }
	
	      if (_imp && _imp.willSet) _imp.willSet.apply(this, arguments);
	
	      opperations.forEach(function (_record) {
	        // If we are adding or removing a class, test if the target already has/removed it.
	        // If so, then bump "oppsPerformed".
	        oppsPerformed += Number(target.hasClass(_record.flag) === ! ~_record.method.indexOf('add'));
	        target[_record.method](_record.flag);
	      });
	
	      if (_imp && _imp.didSet) _imp.didSet.apply(this, arguments);
	
	      if (oppsPerformed) {
	        this.trigger(uiStateEvent);
	        return target;
	      }
	
	      return false;
	    };
	
	    if (tester) {
	      getter = 'get' + tester.slice(0, 1).toUpperCase() + tester.slice(1);
	
	      this[tester] = function (_target) {
	        var target;
	
	        target = resolveTarget.call(this, _target);
	
	        return target.hasClass(this.STATE[STATE]);
	      };
	
	      this[getter] = function () {
	        return this.findOwn('.' + this.STATE[STATE]);
	      };
	    }
	
	    return this;
	  };
	
	  this.provideBehaviorEventScope = function () {
	    return this;
	  };
	
	  this.provideAblilityPototype = function () {
	    var owner;
	
	    owner = _util2['default'].getOwner(this, this.baseType);
	
	    return !!owner && owner.object;
	  };
	
	  this.completed = function () {
	    return this.game.demoMode || this.hasOwnProperty('isComplete') && this.isComplete || !this.requiredQueue || this.hasOwnProperty('requiredQueue') && this.requiredQueue.length === 0;
	  };
	
	  /**
	   * <span class="tag behavior">Behavior</span>
	   * Marks a scope "complete" by seting `isComplete` to `true` and add the `COMPLETE` state flag.
	   * @function module:types/Entity~Entity#complete
	   * @returns {object} A messages object with `behaviorTarget` set to the scope performing the behavior.
	   */
	  this.behavior('complete', function () {
	    if (this.hasOwnProperty('isComplete') && this.isComplete) return false;
	
	    this.isComplete = true;
	    this.addClass('COMPLETE');
	
	    return {
	      behaviorTarget: this
	    };
	  });
	
	  /**
	   * <span class="tag behavior">Behavior</span>
	   * Reports a drggable has been grabbed for dragging.
	   * @function module:types/Entity~Entity#grab
	   * @arg {object} _state - An object containing the state of a draggable.
	   * @returns {object} A messages object with `behaviorTarget` set to the scope performing the behavior.
	   *
	   * @see module:play~pl.game.manager.draggable for more info on draggable state.
	   */
	  this.behavior('grab', function (_state) {
	    return {
	      state: _state,
	      behaviorTarget: _state.$draggable
	    };
	  });
	
	  /**
	   * <span class="tag behavior">Behavior</span>
	   * Reports a draggable as being dragged.
	   * @function module:types/Entity~Entity#dragging
	   * @arg {object} _state - An object containing the state of a draggable.
	   * @returns {object} A messages object with `behaviorTarget` set to the scope performing the behavior.
	   *
	   * @see module:play~pl.game.manager.draggable for more info on draggable state.
	   */
	  this.behavior('dragging', function (_state) {
	    return {
	      state: _state,
	      behaviorTarget: _state.$draggable
	    };
	  });
	
	  /**
	   * <span class="tag behavior">Behavior</span>
	   * Reports a drggable as released or droped.
	   * @function module:types/Entity~Entity#release
	   * @arg {object} _state - An object containing the state of a draggable.
	   * @returns {object} A messages object with `behaviorTarget` set to the scope performing the behavior.
	   *
	   * @see module:play~pl.game.manager.draggable for more info on draggable state.
	   */
	  this.behavior('release', function (_state) {
	    return {
	      state: _state,
	      behaviorTarget: _state.$draggable
	    };
	  });
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds `OPEN` and removes the `LEAVE` CSS class names from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#open
	   * @fires Entity#ui-open
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `OPEN` class name.
	   * @function module:types/Entity~Entity#opened
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Open'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `OPEN` class name.
	   * @function module:types/Entity~Entity#getOpened
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('open opened', '+OPEN -LEAVE');
	
	  /**
	   * <span class="tag state">State</span>
	   * Removes the `OPEN` CSS class name from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#close
	   * @fires Entity#ui-close
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	  this.state('close', '-OPEN');
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds the `LEAVE` CSS class name to the scope or the given `_target`.
	   * @function module:types/Entity~Entity#leave
	   * @fires Entity#ui-leave
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `LEAVE` class name.
	   * @function module:types/Entity~Entity#left
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Leave'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `LEAVE` class name.
	   * @function module:types/Entity~Entity#getLeft
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('leave left', '+LEAVE', {
	    willSet: function willSet(_target) {
	      this.close(_target);
	    }
	  });
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds `ENABLED` and removes the `DISABLED` CSS class names from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#enable
	   * @fires Entity#ui-enable
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `ENABLED` class name.
	   * @function module:types/Entity~Entity#enabled
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Enabled'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `ENABLED` class name.
	   * @function module:types/Entity~Entity#getEnabled
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('enable enabled', '+ENABLED -DISABLED');
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds `DISABLED` and removes the `ENABLED` CSS class names from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#disable
	   * @fires Entity#ui-disable
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `DISABLED` class name.
	   * @function module:types/Entity~Entity#disabled
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Disabled'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `DISABLED` class name.
	   * @function module:types/Entity~Entity#getDisabled
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('disable disabled', '+DISABLED -ENABLED');
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds the `SELECTED` CSS class name to the scope or the given `_target`.
	   * @function module:types/Entity~Entity#select
	   * @fires Entity#ui-select
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `SELECTED` class name.
	   * @function module:types/Entity~Entity#selected
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Selected'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `SELECTED` class name.
	   * @function module:types/Entity~Entity#getDisabled
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('select selected', '+SELECTED', {
	    willSet: function willSet(_target) {
	      var target, $parent;
	
	      target = resolveTarget.call(this, _target);
	      $parent = target.parent();
	
	      $parent.find('> .SELECTED').each(this.bind(function (_index, _node) {
	        this.deselect(_node);
	      }));
	      $parent.find('> .HIGHLIGHTED').each(this.bind(function (_index, _node) {
	        this.unhighlight(_node);
	      }));
	    }
	  });
	
	  /**
	   * <span class="tag state">State</span>
	   * Removes the `SELECTED` CSS class name from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#deselect
	   * @fires Entity#ui-deselect
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	  this.state('deselect', '-SELECTED');
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds the `HIGHLIGHTED` CSS class name to the scope or the given `_target`.
	   * @function module:types/Entity~Entity#highlight
	   * @fires Entity#ui-highlight
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `HIGHLIGHTED` class name.
	   * @function module:types/Entity~Entity#highlighted
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Highlighted'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `HIGHLIGHTED` class name.
	   * @function module:types/Entity~Entity#getHighlighted
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('highlight highlighted', '+HIGHLIGHTED');
	
	  /**
	   * <span class="tag state">State</span>
	   * Removes the `HIGHLIGHTED` CSS class name from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#unhighlight
	   * @fires Entity#ui-unhighlight
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	  this.state('unhighlight', '-HIGHLIGHTED');
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds the `DRAGGABLE` CSS class name to the scope or the given `_target`.
	   * @function module:types/Entity~Entity#draggable
	   * @fires Entity#ui-draggable
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `DRAGGABLE` class name.
	   * @function module:types/Entity~Entity#dragEnabled
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Draggable'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `DRAGGABLE` class name.
	   * @function module:types/Entity~Entity#getDragEnabled
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('draggable dragEnabled', '+DRAGGABLE', {
	    didSet: function didSet(_target) {
	      this.translate(resolveTarget.call(this, _target));
	    }
	  });
	
	  /**
	   * <span class="tag state">State</span>
	   * Removes the `DRAGGABLE` CSS class name from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#undraggable
	   * @fires Entity#ui-undraggable
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	  this.state('undraggable', '-DRAGGABLE');
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds the `TRANSLATED` CSS class name to the scope or the given `_target`. The target also gets a 2d transform at the given `_point`.
	   * @function module:types/Entity~Entity#translate
	   * @fires Entity#ui-translate
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @arg {module:types/Dimensions~Point} _point - Point object with coordinates {x,y}.
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Adds the `TRANSLATED` CSS class name to the scope. The scope also gets a 2d transform at the given `_point`.
	   * @function module:types/Entity~Entity#translate
	   * @fires Entity#ui-translate
	   * @arg {module:types/Dimensions~Point} _point - Point object with coordinates {x,y}.
	   * @returns `this`
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Tests if the scope or given `_target` has the `TRANSLATED` class name.
	   * @function module:types/Entity~Entity#translated
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns {Boolean} Translate'ness.
	   */
	
	  /**
	   * <span class="tag state">State</span>
	   * Provides the elements with the `TRANSLATED` class name.
	   * @function module:types/Entity~Entity#getTranslated
	   * @returns {jQuery} jQuery collection of matched nodes.
	   * @todo Return scope if available.
	   */
	  this.state('translate translated', '+TRANSLATED', {
	    willSet: function willSet(_target_point, _point) {
	      var point, target;
	
	      target = resolveTarget.call(this, _target_point);
	      point = ! ~[_target_point.x, _target_point.y].indexOf(undefined) ? _target_point : _point;
	
	      if (point) {
	        target.css('transform', 'translateX(' + point.x + 'px) translateY(' + point.y + 'px)');
	      }
	    }
	  });
	
	  /**
	   * <span class="tag state">State</span>
	   * Removes the `TRANSLATED` CSS class name and CSS transform from the scope or the given `_target`.
	   * @function module:types/Entity~Entity#untranslate
	   * @fires Entity#ui-untranslate
	   * @arg {string|Scope|jQuery|HTMLElement} _target - A CSS selector, DOM node reference or context object (i.e. Scope/jQuery).
	   * @returns `this`
	   */
	  this.state('untranslate', '-TRANSLATED', {
	    willSet: function willSet() {
	      this.css('transform', 'none');
	    }
	  });
	
	  this.state('gate gated', '+GATED');
	});
	
	exports['default'] = { Entity: Entity, invokeResponsibilities: invokeResponsibilities };
	module.exports = exports['default'];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	exports.__esModule = true;
	/**
	*  Screen
	*  @desc Contains...
	*  @proto Entity
	*/
	
	var _typesEntity = __webpack_require__(112);
	
	var Screen = _typesEntity.Entity.extend(function () {
	
	  function attachBehaviorEvent() {
	    this.on('behavior', function (_event) {
	      // console.log('SCREEN GOT', _event.targetScope.id(), _event.name);
	
	      if (this !== _event.targetScope) {
	        _typesEntity.invokeResponsibilities(this, _event);
	      }
	
	      this.propagateBehavior(_event);
	    });
	  }
	
	  this.baseType = 'TYPE_SCREEN';
	  this.game = null;
	  this.screen = null;
	
	  this.__init = function () {
	    this.proto();
	
	    if (this.is(pl.game.config('screenSelector'))) {
	      attachBehaviorEvent.call(this);
	    }
	  };
	
	  this.start = function () {
	    this.startAudio();
	    return this;
	  };
	
	  this.stop = function () {
	    this.stopAudio();
	    return this;
	  };
	
	  this.pause = function () {
	    this.pauseMedia();
	    if (this.hasOwnProperty('entities') && this.entities) {
	      this.entities.forEach(function (entity) {
	        if (typeof entity.pause === 'function') entity.pause();
	      });
	    }
	    return this;
	  };
	
	  this.resume = function () {
	    this.resumeMedia();
	    if (this.hasOwnProperty('entities') && this.entities) {
	      this.entities.forEach(function (entity) {
	        if (typeof entity.resume === 'function') entity.resume();
	      });
	    }
	    return this;
	  };
	
	  this.startAudio = function () {
	    if (!this.audio) return;
	    this.audio.background.play();
	    this.audio.voiceOver.play();
	  };
	
	  this.stopAudio = function () {
	    if (!this.audio) return;
	    this.audio.voiceOver.stop('@ALL');
	  };
	
	  this.pauseMedia = function () {
	    if (!this.currentMedia) return;
	    for (var media in this.currentMedia) {
	      if (this.currentMedia.hasOwnProperty(media)) {
	        if (this.currentMedia[media]) this.currentMedia[media].pause();
	      }
	    }
	  };
	
	  this.resumeMedia = function () {
	    if (!this.currentMedia) return;
	    for (var media in this.currentMedia) {
	      if (this.currentMedia.hasOwnProperty(media)) {
	        if (this.currentMedia[media]) this.currentMedia[media].resume();
	      }
	    }
	  };
	
	  this.index = function () {
	    if (this === this.screen) return this.game.screens.indexOf(this);
	    return this.$els.index();
	  };
	
	  this.next = function () {
	    var nextScreen = this.game.screens[this.screen.index() + 1];
	    var loadingScreen = this.game.screens[this.screen.index() + 2];
	
	    if (!nextScreen.$els.hasClass('preloading') && !nextScreen.$els.hasClass('preloaded')) {
	      nextScreen.$els.addClass('preloading');
	      $('#' + nextScreen.$els.context.id).load('screens/' + nextScreen.$els.context.id + '.html', function () {
	        nextScreen.$els.addClass('preloaded');
	        nextScreen.$els.removeClass('preloading');
	        //pl.game.component.loadAll(function () {
	        //  pl.game.initialize([{id: 'animal-id', implementation: _.noop}]);
	        //}, true);
	        //pl.game.initializeScreen(nextScreen.$els, 'screen-basic');
	        window.magic[nextScreen.id()]();
	      });
	    }
	
	    if (!this.completed() || !nextScreen.$els.hasClass('preloaded')) return false;
	
	    $('#' + loadingScreen.$els.context.id).load('screens/' + loadingScreen.$els.context.id + '.html', function () {
	      loadingScreen.$els.addClass('preloaded');
	      //pl.game.component.loadAll(function () {
	      //  pl.game.initialize([{id: 'animal-id', implementation: _.noop}]);
	      //}, true);
	      //pl.game.initializeScreen(loadingScreen.$els, 'screen-basic');
	      window.magic[loadingScreen.id()]();
	    });
	
	    return nextScreen;
	  };
	
	  this.prev = function () {
	    return this.game.screens[this.screen.index() - 1];
	  };
	
	  this.quit = function () {
	    this.game.quit.open();
	  };
	
	  this.nextSib = function () {
	    return $.fn.next.apply(this.$els, arguments);
	  };
	
	  this.prevSib = function () {
	    return $.fn.prev.apply(this.$els, arguments);
	  };
	
	  this.isLast = function () {
	    return this.game.screens.indexOf(this.screen) === this.game.screens.length - 1;
	  };
	});
	
	exports['default'] = Screen;
	module.exports = exports['default'];

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var _Object$defineProperties = __webpack_require__(37)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * Node scope for the top level game node.
	 */
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _playGame = __webpack_require__(59);
	
	var _playGame2 = _interopRequireDefault(_playGame);
	
	var _typesGlobalScope = __webpack_require__(65);
	
	var _typesGlobalScope2 = _interopRequireDefault(_typesGlobalScope);
	
	var _typesScreen = __webpack_require__(113);
	
	var _typesScreen2 = _interopRequireDefault(_typesScreen);
	
	var _typesCollection = __webpack_require__(64);
	
	var _typesCollection2 = _interopRequireDefault(_typesCollection);
	
	var _typesScope = __webpack_require__(66);
	
	var _typesDimensions = __webpack_require__(36);
	
	var _typesAudioManager = __webpack_require__(74);
	
	var Game = _typesGlobalScope2['default'].extend(function () {
	
	  var Viewport, screenPrototype, platformEventHandler;
	
	  /**
	   * Detects the device and adds the appropriate state classes.
	   */
	  function detechDevice() {
	    var deviceClasses = "";
	
	    if (iOS()) deviceClasses += "iOS ";
	    if (mobileOrTablet()) deviceClasses += "MOBILE ";
	
	    this.addClass(deviceClasses);
	  }
	
	  function iOS() {
	    var iDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'];
	
	    if (!!navigator.platform) {
	      while (iDevices.length) {
	        if (navigator.platform === iDevices.pop()) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  }
	
	  function mobileOrTablet() {
	    var check = false;
	    (function (a) {
	      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	    })(navigator.userAgent || navigator.vendor || window.opera);
	    return check;
	  }
	
	  /**
	   * Scales the game view to fill the browser window.
	   */
	  function scaleGame() {
	    var vpSize, gameDimensions, width, height, zoom;
	
	    vpSize = this.viewport.size();
	    gameDimensions = _playGame2['default'].config('dimensions');
	    width = gameDimensions.width || this.width();
	    height = Math.round(gameDimensions.width / gameDimensions.ratio);
	    zoom = this.viewport.width / width;
	
	    if (Math.round(height * zoom) > this.viewport.height) {
	      zoom = (this.viewport.height / height).toPrecision(4);
	    }
	
	    _util2['default'].mixin(this.node().style, {
	      width: width + 'px',
	      zoom: zoom
	    });
	
	    if (!this.css('zoom')) {
	      this.css({
	        transform: 'scale(' + zoom + ')',
	        transformOrigin: (zoom < 1 ? '0px' : '50%') + ' 0px 0px',
	        height: this.viewport.height / zoom
	      });
	    }
	
	    this.zoom = zoom;
	  }
	
	  function demoMode(_set) {
	    this.demoMode = _set != null ? _set : !this.demoMode;
	    this[this.demoMode ? 'addClass' : 'removeClass']('DEMO');
	
	    console.info(this.id(), 'is now ' + (this.demoMode ? 'in' : 'out of') + ' Demo Mode.');
	  }
	
	  function collectVideos() {
	    this.find('video').each((function (_index, _node) {
	      this.media.video.add(_node);
	
	      _node.onplay = (function () {
	        var playing = this.media.playing('.background, .voiceOver');
	        if (playing) playing.stop('@ALL');
	        this.log('video play', playing);
	      }).bind(this);
	    }).bind(this));
	  }
	
	  screenPrototype = _typesScreen2['default'];
	  platformEventHandler = new function () {
	
	    this.invoke = function (_event, _ctx) {
	      if (typeof this[_event.name] === 'function') {
	        this[_event.name].call(_ctx, _event);
	      }
	    };
	
	    this['toggle-demo-mode'] = function (_set) {
	      demoMode.call(this);
	    };
	  }();
	
	  this.baseType = 'TYPE_GAME';
	  this.screens = null;
	  this.zoom = 1;
	  this.keyCommands = null;
	  this.demoMode = false;
	  this.media = null;
	  this.viewport = new function () {
	    var vp, $html, RESIZE_HANDLERS;
	
	    vp = this;
	    $html = $('html');
	    RESIZE_HANDLERS = [];
	
	    $(window).on('resize', function (_event) {
	      if (!$html.hasClass(vp.orientation)) {
	        $html.removeClass('squareish landscape protrait').addClass(vp.orientation);
	      }
	
	      RESIZE_HANDLERS.forEach(function (_handler) {
	        _handler(_event);
	      });
	    });
	
	    this.LANDSCAPE = 'landscape';
	    this.PROTRAIT = 'protrait';
	    this.SQUAREISH = 'squareish';
	
	    this.size = function () {
	      return _typesDimensions.Size.create().set(window.innerWidth, window.innerHeight);
	    };
	
	    _Object$defineProperties(this, {
	      width: {
	        get: function get() {
	          return window.innerWidth;
	        },
	
	        configurable: false
	      },
	
	      height: {
	        get: function get() {
	          return window.innerHeight;
	        },
	
	        configurable: false
	      },
	
	      orientation: {
	        get: function get() {
	          var ratio = this.size().ratio();
	
	          switch (true) {
	            case ratio > 0.9 && ratio < 1.1:
	              return 'squareish';
	            case ratio > 1.1:
	              return 'landscape';
	            case ratio < 0.9:
	              return 'protrait';
	          }
	        }
	      }
	    });
	
	    this.onResize = function (_handler) {
	      RESIZE_HANDLERS.push(_handler);
	    };
	
	    this.offResize = function (_handler) {
	      var index = RESIZE_HANDLERS.indexOf(_handler);
	
	      if (~index) RESIZE_HANDLERS.splice(index, 1);
	    };
	
	    $html.addClass(this.orientation);
	  }();;
	
	  this.willInit = function () {
	    this.addClass('pl-game');
	
	    detechDevice.call(this);
	    scaleGame.call(this);
	    this.watchAudio();
	    this.captureScreens();
	
	    this.viewport.onResize(this.bind(scaleGame));
	
	    pl.game.on('platform-event', this.bind(function (_event) {
	      platformEventHandler.invoke(_event, this);
	    }));
	
	    window.addEventListener('load', window.focus);
	    window.addEventListener('focus', (function () {
	      this.resume();
	    }).bind(this));
	    window.addEventListener('blur', (function () {
	      this.pause();
	    }).bind(this));
	
	    return this;
	  };
	
	  /**
	   * Watch for specific keys or combination of keys. NOTE: meta key commands DO NOT support chords (i.e. meta+K,B).
	   * ### Key Names
	   * - *meta*: Command (aka Apple ⌘ or win)
	   * - *alt*: Alt (aka Option ⌥)
	   * - *shift*: Shift ⇪
	   * - *ctrl*: Control ^
	   * - *enter*: Enter or Return
	   * - *esc*: Escape
	   * - *left*: Left arrow
	   * - *up*: Up arrow
	   * - *right*: Right arrow
	   * - *down*: Down arrow
	   *
	   * ### Example
	   * ```javascript
	   * // Overriding print.
	   * this.game.onKeys('cmd+P', printHandler);
	   *
	   * // Holding Control and pressing "K" then "B"
	   * this.game.onKeys('ctrl+K,B', handler);
	   * ```
	   * @arg {string} _commands - The key or sequence of keys.
	   * @arg {function} _handler - Your event handler for when you key pattern is matched.
	   * @returns `this`
	   */
	  this.onKeys = function (_commands, _handler) {
	    var sequence, chords, modifiers, map;
	
	    if (!this.keyCommands) {
	      this.keyCommands = {};
	
	      map = {
	        13: 'enter',
	        16: 'shift',
	        17: 'ctrl',
	        18: 'alt',
	        27: 'esc',
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down',
	        91: 'meta',
	        enter: 13,
	        shift: 16,
	        ctrl: 17,
	        alt: 18,
	        esc: 27,
	        left: 37,
	        up: 38,
	        right: 39,
	        down: 40,
	        meta: 91
	      };
	
	      modifiers = [16, 17, 18, 91];
	      sequence = [];
	      chords = [];
	
	      this.on('keydown', function (_event) {
	        var modifier, key, eventMods, currentMods, command, handler;
	
	        modifier = !! ~modifiers.indexOf(_event.keyCode) && map[_event.keyCode];
	        key = modifier ? modifier : map[_event.keyCode] || String.fromCharCode(_event.keyCode);
	        eventMods = [_event.shiftKey, _event.ctrlKey, _event.altKey, _event.metaKey];
	        currentMods = [];
	
	        // Collect the modifiers the event says are still down.
	        eventMods.forEach(function (_modifierDown, _index) {
	          // use the modifier name
	          if (_modifierDown) currentMods.push(map[modifiers[_index]]);
	        });
	
	        // Don't add keys we already have during rapid-fire events
	        if (~chords.indexOf(key) || ~sequence.indexOf(key)) return;
	
	        // Construct the command
	        command = chords.length ? (chords.push(key), chords.join(',')) : (sequence.push(key), sequence.join('+'));
	
	        handler = this.keyCommands[command];
	
	        if (handler) {
	          handler.call(this, _event, command);
	          // Keep current modifiers.
	          sequence = currentMods.map(function (_key, _index) {
	            var key = sequence[_index];
	            return currentMods[currentMods.indexOf(key)];
	          });
	          chords = [];
	
	          // Override original key command (i.e. meta+Q).
	          _event.preventDefault();
	        }
	      });
	
	      this.on('keyup', function (_event) {
	        var key, index, modifier, eventMods, currentMods;
	
	        key = modifier ? modifier : map[_event.keyCode] || String.fromCharCode(_event.keyCode);
	        index = sequence.indexOf(key);
	        modifier = !! ~modifiers.indexOf(_event.keyCode) && map[_event.keyCode];
	        // Follows the same index order as "modifiers" [16, 17, 18, 91]
	        eventMods = [_event.shiftKey, _event.ctrlKey, _event.altKey, _event.metaKey];
	        currentMods = [];
	
	        // Collect the modifiers the event says are still down.
	        eventMods.forEach(function (_modifierDown, _index) {
	          // use the modifier name
	          if (_modifierDown) currentMods.push(map[modifiers[_index]]);
	        });
	
	        // If the key released is a modifier...
	        if (key === modifier) {
	          // ...keep current modifiers...
	          sequence = currentMods.map(function (_key, _index) {
	            var key = sequence[_index];
	            return currentMods[currentMods.indexOf(key)];
	          });
	          // ...clear registered chords.
	          chords = [];
	        } else {
	          // If we had pressed more than one key...
	          if (sequence.length > 1) {
	            // Check if the first is a modifier then switch to chord capturing
	            if (~modifiers.indexOf(map[sequence[0]])) {
	              chords.push(sequence.join('+'));
	            }
	          }
	
	          if (~index) sequence.splice(index, 1);
	          if (!sequence.length) chords = [];
	        }
	      });
	    }
	
	    this.keyCommands[_commands] = _handler;
	
	    return this;
	  };
	
	  this.screen = function (_id, _implementation) {
	    var prototype, selector, screenSelector, instance;
	
	    if (arguments.length === 1 && typeof _id === 'function') {
	      screenPrototype = _typesScreen2['default'].extend(_id);
	      return this;
	    }
	
	    if (!this.hasOwnProperty('screens')) this.screens = _typesCollection2['default'].create();
	
	    if (this.hasOwnProperty('$els')) {
	      screenSelector = pl.game.config('screenSelector');
	      prototype = screenPrototype.isPrototypeOf(this) ? this : screenPrototype;
	      selector = typeof _id === 'number' ? screenSelector + ':nth-child(' + (_id + 1) + ')' : '#' + _id;
	      instance = prototype.extend(_implementation).initialize(this.find(selector));
	
	      instance.screen = instance;
	      if (!instance.game) {
	        instance.game = instance.closest('.pl-game').scope();
	      }
	    } else {
	      this.screens.push({
	        index: typeof _id === 'number' ? _id : null,
	        name: typeof _id === 'string' ? _id : null,
	        implementation: _implementation
	      });
	    }
	
	    return this;
	  };
	
	  this.captureScreens = function () {
	    var screenSelector, prototype, collection, nextScreen;
	
	    screenSelector = pl.game.config('screenSelector');
	    prototype = screenPrototype.isPrototypeOf(this) ? this : screenPrototype;
	    collection = [];
	
	    this.findOwn(screenSelector).each(this.bind(function (_index, _node) {
	      var $node, screen, record, key, id, index, component;
	
	      $node = $(_node);
	      id = $node.id();
	      key = id ? 'name' : (id = _index, 'index');
	      record = this.screens && this.screens.get(id, key);
	      component = $node.attr('pl-component');
	      screen = _typesScope.createEntity.call(prototype, $node, record && record.implementation);
	      screen.screen = screen;
	      screen.game = this;
	
	      if ($node.attr('pl-skip') == null) {
	        collection.push(screen);
	        if (_index === 1) {
	          nextScreen = screen;
	        }
	      }
	
	      if (key === 'name' || component) {
	        _util2['default'].assignRef(this, _util2['default'].transformId(key === 'name' && id || component, true), screen);
	      }
	    }));
	
	    if (collection.length) {
	      this.screens = collection;
	      //MPR, 4/26/16: Hmm. This doesnt _feel_ like the right time to be loading a screen, but it is the
	      // first time they will be available
	
	      //nextScreen.$els.addClass('preloading');
	      //$('#' + nextScreen.$els.context.id).load(`screens/${nextScreen.$els.context.id}.html`, function () {
	      //  nextScreen.$els.addClass('preloaded');
	      //  nextScreen.$els.removeClass('preloading');
	      //game.initializeScreen(nextScreen.$els, 'screen-basic');
	      //  window.magic[nextScreen.id()]();
	      //});
	    }
	
	    return this;
	  };
	
	  this.watchAudio = function () {
	    this.media = _typesAudioManager.MediaManager.create(this.id());
	
	    /**
	     * Prevent duplicate playback of voiceOvers and backgrounds.
	     */
	    this.media.rule('.background, .voiceOver', 'shouldPlay', function (_event) {
	      var playing = this.playing() || [];
	      // shouldPlay = false if _event.target is already playing.
	      _event.response(!playing || !playing.length || ! ~playing.indexOf(_event.target) && !playing.has(_event.target.fileName));
	    });
	
	    /**
	     * 
	     */
	    this.media.rule('.voiceOver', function (_event) {
	      var audio, playing;
	
	      audio = _event.target;
	      playing = audio && this.playing('.audio:not(#' + audio.id() + ')');
	
	      switch (_event.type) {
	        case 'play':
	          if (playing) {
	            playing.filter('.voiceOver').stop('@ALL');
	            playing.filter('.background').volume(_playGame2['default'].config('bgVolume.drop') || 0.2);
	          }
	          break;
	
	        case 'pause':
	        case 'stopped':
	        case 'ended':
	          if (playing) playing.filter('.background').volume(_playGame2['default'].config('bgVolume.max') || 1);
	          break;
	      }
	    });
	
	    this.media.rule('.background', 'play', function (_event) {
	      var playing = this.playing('.background:not(#' + _event.target.id() + ')');
	      if (playing) playing.stop('@ALL');
	    });
	
	    if (~pl.EVENT.ACTION.indexOf('touch')) {
	      this.on(pl.EVENT.ACTION, function beginAudio(_event) {
	        //MPR, ll-trace 5.5: Checking what events this responds to
	        //Evidently none? Is this how we are starting audio on devices
	        //that require user input? Hmm.
	        var ctx, screen;
	
	        ctx = _playGame2['default'].getAudioContext();
	        screen = this.currentScreen();
	
	        if (screen && ctx && ctx.state === 'suspended') {
	          _playGame2['default'].enableAudioContext();
	          this.log('awesome!');
	          screen.startAudio();
	          this.off(pl.EVENT.ACTION, beginAudio);
	        }
	      });
	    }
	
	    collectVideos.call(this);
	  };
	
	  this.progress = function () {
	    return {
	      currentScreen: this.currentScreen().index()
	    };
	  };
	
	  this.currentScreen = function () {
	    return this.findOwn(pl.game.config('screenSelector') + '.OPEN').not('#quit').scope();
	  };
	
	  this.flip = function () {
	    console.log('THATS A FLIP!');
	    _playGame2['default'].report.flip(this);
	  };
	
	  this.pause = function (quitScreen) {
	    if (!quitScreen) this.addClass('PAUSED');
	    this.screens.forEach(function (screen) {
	      if (screen.state(screen.STATE.OPEN)) {
	        screen.pause();
	      }
	    });
	    _playGame2['default'].getAudioContext().suspend();
	  };
	
	  this.resume = function () {
	    this.removeClass('PAUSED');
	    this.screens.forEach(function (screen) {
	      if (screen.state(screen.STATE.OPEN)) screen.resume();
	    });
	    if (!this.hasClass('QUIT-SCREEN')) _playGame2['default'].getAudioContext().resume();
	  };
	
	  this.exit = function () {
	    console.log('GOODBYE!');
	    _playGame2['default'].report.exit(this);
	  };
	
	  /**
	   * Demo mode key command
	   */
	  this.onKeys('ctrl+D,M', function () {
	    demoMode.call(this);
	  });
	
	  /**
	   * Keyboard screen navigation
	   */
	  this.onKeys('left', function () {
	    var current;
	
	    current = this.currentScreen();
	
	    if (current) current.prev();
	  });
	
	  this.onKeys('right', function () {
	    var current;
	
	    current = this.currentScreen();
	
	    if (current) current.next();
	  });
	});
	
	exports['default'] = Game;
	module.exports = exports['default'];

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	exports.__esModule = true;
	/**
	 * API for communicaion between a game and the platform.
	 *
	 * @module
	 */
	
	var _util = __webpack_require__(50);
	
	var _util2 = _interopRequireDefault(_util);
	
	var platform = new function () {
	
	  function createEvent(_name, _props) {
	    var eventObject;
	
	    eventObject = _util2['default'].mixin(new Event('game-event', { bubbles: true, cancelable: false }), {
	      name: _name,
	      respond: function respond(_data) {
	        var platformEvent;
	
	        platformEvent = $.Event('platform-event', {
	          name: _name,
	          gameData: _data
	        });
	
	        pl.game.trigger(platformEvent);
	      }
	    }, _props);
	
	    return eventObject;
	  }
	
	  this.EVENT_INIT = 'init';
	  this.EVENT_SAVE = 'save';
	  this.EVENT_EXIT = 'exit';
	  this.EVENT_FLIPPED = 'flipped';
	
	  this.emit = function (_name, data) {
	    if (window.frameElement) window.frameElement.dispatchEvent(createEvent(_name, data));
	  };
	
	  this.saveGameState = function (_data) {
	    if (window.frameElement) window.frameElement.dispatchEvent(createEvent(this.EVENT_SAVE, { gameData: _data }));
	  };
	
	  window.addEventListener('platform-event', function (_event) {
	    var platformEvent;
	
	    platformEvent = $.Event('platform-event', {
	      name: _event.name
	    });
	
	    pl.game.trigger(platformEvent);
	  });
	}();
	
	exports['default'] = platform;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=play.js.map