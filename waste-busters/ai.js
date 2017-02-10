/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}

/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}

/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}


/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "20d3e569184cc1c24de8"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}

/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},

/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}

/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}

/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	window.ENVIRONMENT = {
	    MEDIA: 'https://media-staging.changemyworldnow.com/f/'
		};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	(function (gameName) {
	    // remove window.MEDIA once no games reference it
	    var MEDIA = window.MEDIA = {
	        BASE: ENVIRONMENT.MEDIA
	    };

	    MEDIA.GAME = MEDIA.BASE + 'Games/' + gameName + '/';
	    MEDIA.EFFECT = MEDIA.GAME + 'SoundAssets/effects/';
	    MEDIA.VO = MEDIA.GAME + 'SoundAssets/vos/';
	    MEDIA.IMAGE = MEDIA.GAME + 'ImageAssets/';
	    MEDIA.SPRITE = MEDIA.GAME + 'SpritesAnimations/';

	    MEDIA.MOCK = {};
	    MEDIA.MOCK.GAME = MEDIA.BASE + 'Games/mockGame/';
	    MEDIA.MOCK.EFFECT = MEDIA.MOCK.GAME + 'SoundAssets/effects/';
	    MEDIA.MOCK.VO = MEDIA.MOCK.GAME + 'SoundAssets/vos/';
	    MEDIA.MOCK.IMAGE = MEDIA.MOCK.GAME + 'ImageAssets/';
	    MEDIA.MOCK.SPRITE = MEDIA.MOCK.GAME + 'SpritesAnimations/';

	    window.CMWN.MEDIA = MEDIA;
	})(window.CMWN.gameFolder);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _ = __webpack_require__(5);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(6);

	var _4 = _interopRequireDefault(_3);

	var _title_screen = __webpack_require__(7);

	var _title_screen2 = _interopRequireDefault(_title_screen);

	var _eat_and_drink_screen = __webpack_require__(8);

	var _eat_and_drink_screen2 = _interopRequireDefault(_eat_and_drink_screen);

	var _learn_and_create_screen = __webpack_require__(9);

	var _learn_and_create_screen2 = _interopRequireDefault(_learn_and_create_screen);

	var _what_happens_screen = __webpack_require__(10);

	var _what_happens_screen2 = _interopRequireDefault(_what_happens_screen);

	var _better_ways_screen = __webpack_require__(11);

	var _better_ways_screen2 = _interopRequireDefault(_better_ways_screen);

	var _click_cards_screen = __webpack_require__(13);

	var _click_cards_screen2 = _interopRequireDefault(_click_cards_screen);

	var _cards_screen = __webpack_require__(14);

	var _cards_screen2 = _interopRequireDefault(_cards_screen);

	var _time_to_collect_screen = __webpack_require__(15);

	var _time_to_collect_screen2 = _interopRequireDefault(_time_to_collect_screen);

	var _lets_play_screen = __webpack_require__(16);

	var _lets_play_screen2 = _interopRequireDefault(_lets_play_screen);

	var _remember_screen = __webpack_require__(17);

	var _remember_screen2 = _interopRequireDefault(_remember_screen);

	var _level_one_screen = __webpack_require__(18);

	var _level_one_screen2 = _interopRequireDefault(_level_one_screen);

	var _level_two_screen = __webpack_require__(20);

	var _level_two_screen2 = _interopRequireDefault(_level_two_screen);

	var _level_three_screen = __webpack_require__(21);

	var _level_three_screen2 = _interopRequireDefault(_level_three_screen);

	var _level_four_screen = __webpack_require__(22);

	var _level_four_screen2 = _interopRequireDefault(_level_four_screen);

	var _level_five_screen = __webpack_require__(23);

	var _level_five_screen2 = _interopRequireDefault(_level_five_screen);

	var _neighborhood_waste_screen = __webpack_require__(24);

	var _neighborhood_waste_screen2 = _interopRequireDefault(_neighborhood_waste_screen);

	var _types_of_waste_screen = __webpack_require__(25);

	var _types_of_waste_screen2 = _interopRequireDefault(_types_of_waste_screen);

	var _waste_sort_center_screen = __webpack_require__(26);

	var _waste_sort_center_screen2 = _interopRequireDefault(_waste_sort_center_screen);

	var _sorting_level_one_screen = __webpack_require__(27);

	var _sorting_level_one_screen2 = _interopRequireDefault(_sorting_level_one_screen);

	var _sorting_level_two_screen = __webpack_require__(42);

	var _sorting_level_two_screen2 = _interopRequireDefault(_sorting_level_two_screen);

	var _sorting_level_three_screen = __webpack_require__(43);

	var _sorting_level_three_screen2 = _interopRequireDefault(_sorting_level_three_screen);

	var _take_action_screen = __webpack_require__(44);

	var _take_action_screen2 = _interopRequireDefault(_take_action_screen);

	var _flip_screen = __webpack_require__(45);

	var _flip_screen2 = _interopRequireDefault(_flip_screen);

	var _5 = __webpack_require__(46);

	var _6 = _interopRequireDefault(_5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _eat_and_drink_screen2.default, _learn_and_create_screen2.default, _what_happens_screen2.default, _better_ways_screen2.default, _click_cards_screen2.default, _cards_screen2.default, _time_to_collect_screen2.default, _lets_play_screen2.default, _remember_screen2.default, _level_one_screen2.default, _level_two_screen2.default, _level_three_screen2.default, _level_four_screen2.default, _level_five_screen2.default,
	    // BonusRoundScreen,
	    _neighborhood_waste_screen2.default, _types_of_waste_screen2.default, _waste_sort_center_screen2.default, _sorting_level_one_screen2.default, _sorting_level_two_screen2.default, _sorting_level_three_screen2.default, _take_action_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _6.default
	    },
	    assets: [React.createElement(skoash.Font, { name: 'Source Sans Pro' }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'game1.timelevelscore.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'game1.metericons.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'frames.intro-01.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'nav.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'BKG.1.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.IMAGE + 'BKG.1.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.IMAGE + 'BKG.2.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.IMAGE + 'BKG.3.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'OpeningSequence.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'CardSection.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'BonusRoundBKG.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKGWasteSortingGame.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'NextLevel.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'FlipScreen.mp3'
	    }), React.createElement(skoash.Audio, {
	        type: 'sfx',
	        ref: 'button',
	        src: MEDIA.EFFECT + 'AllClick.mp3'
	    }), React.createElement(skoash.Audio, {
	        type: 'sfx',
	        ref: 'screen-complete',
	        src: MEDIA.EFFECT + 'NextAppear.mp3'
	    }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background everyday' }), React.createElement('div', { className: 'background cards' }), React.createElement('div', { className: 'background bkg-1' }), React.createElement('div', { className: 'background bkg-2' }), React.createElement('div', { className: 'background bkg-3' })],
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'ios-splash':
	                return;
	            case 'title':
	            case 'eat-and-drink':
	            case 'learn-and-create':
	            case 'what-happens':
	            case 'better-ways':
	                return 0;
	            case 'click-cards':
	            case 'cards':
	            case 'time-to-collect':
	            case 'lets-play':
	            case 'remember':
	                return 1;
	            case 'phaser-level-1':
	            case 'phaser-level-2':
	            case 'phaser-level-3':
	            case 'phaser-level-4':
	            case 'phaser-level-5':
	                return 2;
	            case 'bonus-round':
	                return 3;
	            case 'neighborhood-waste':
	            case 'types-of-waste':
	                return 1;
	            case 'sorting-level-1':
	            case 'sorting-level-2':
	            case 'sorting-level-3':
	                return 4;
	            case 'take-action':
	                return 5;
	            case 'flip':
	                return 6;
	        }
	    },
	    renderMenu: function renderMenu() {
	        var _this = this;

	        return React.createElement(
	            'div',
	            { className: 'menu' },
	            React.createElement('button', { ref: 'pause', className: 'pause', onClick: function onClick() {
	                    if (_this.state.paused) {
	                        _this.resume();
	                    } else {
	                        _this.pause();
	                    }
	                } }),
	            React.createElement('button', { className: 'close', onClick: this.navigator.openMenu.bind(this, { id: 'quit' }) })
	        );
	    }
	}));
	// import BonusRoundScreen from './components/bonus_round_screen';


		if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "waste-busters",
		"version": 1,
		"skoash": "1.1.3",
		"head_injection": "<link href='https://fonts.googleapis.com/css?family=McLaren' rel='stylesheet'>",
		"dimensions": {
			"width": 960,
			"height": 540
		}
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loader = function (_skoash$Component) {
	    _inherits(Loader, _skoash$Component);

	    function Loader() {
	        _classCallCheck(this, Loader);

	        return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).apply(this, arguments));
	    }

	    _createClass(Loader, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { id: "loader", className: "center" },
	                React.createElement(
	                    "div",
	                    { className: "group" },
	                    React.createElement(
	                        "h2",
	                        null,
	                        "Loading!"
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "spinner animated" },
	                        React.createElement(
	                            "div",
	                            { className: "spinner animated" },
	                            React.createElement("div", { className: "spinner animated" })
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Loader;
	}(skoash.Component);

		exports.default = Loader;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "ios-splash",
	            checkComplete: false,
	            completeDelay: 6000,
	            nextDelay: 3000,
	            completeOnStart: true,
	            hidePrev: true
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: "../shared/images/ios_start_ball.png" }),
	        React.createElement(skoash.Image, { className: "hidden", src: "../shared/images/ios_start_ball_anim.gif" })
	    );
		};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "title"
	        }),
	        React.createElement(skoash.Image, {
	            src: CMWN.MEDIA.IMAGE + 'PLTlogo.png',
	            className: "logo"
	        }),
	        React.createElement(skoash.Image, {
	            src: CMWN.MEDIA.IMAGE + 'title.png',
	            className: "title"
	        })
	    );
		};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "eat-and-drink"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'EveryDay.mp3'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-1" },
	            React.createElement(skoash.Component, { className: "intro-image-1" }),
	            React.createElement(
	                "p",
	                null,
	                "Every day, we",
	                React.createElement("br", null),
	                "eat and drink..."
	            )
	        )
	    );
		};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "learn-and-create"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'AndEvery.mp3'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-1" },
	            React.createElement(skoash.Component, { className: "intro-image-2" }),
	            React.createElement(
	                "p",
	                null,
	                "And everyday, we",
	                React.createElement("br", null),
	                "use things to help",
	                React.createElement("br", null),
	                "us learn and create..."
	            )
	        )
	    );
		};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "what-happens"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'ButWhat.mp3'
	        }),
	        React.createElement(skoash.Component, { className: "intro-image-1" }),
	        React.createElement(skoash.Component, { className: "intro-image-2" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-2" },
	            React.createElement(
	                "p",
	                null,
	                "But what happens to the items",
	                React.createElement("br", null),
	                "we don't need anymore?"
	            ),
	            React.createElement(
	                "h3",
	                null,
	                "Where do they all go?"
	            )
	        )
	    );
		};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "better-ways"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + 'AreThere.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.EFFECT + 'YesShout.mp3',
	                playTarget: "yes"
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-1" },
	            React.createElement(skoash.Component, { className: "intro-image-3" }),
	            React.createElement(
	                "p",
	                null,
	                "Are there better ways",
	                React.createElement("br", null),
	                "YOU can keep waste",
	                React.createElement("br", null),
	                "out of a landfill?"
	            )
	        ),
	        React.createElement(skoash.Image, {
	            className: (0, _classnames2.default)('yes animated', {
	                bounce: _.get(props, 'data.yes.playing')
	            }),
	            src: CMWN.MEDIA.IMAGE + 'yes.png'
	        })
	    );
	};

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "click-cards"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'ClickTheCards.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "frame",
	            src: CMWN.MEDIA.IMAGE + 'frame.square.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "recycle",
	            src: CMWN.MEDIA.IMAGE + 'recycle.transparency.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "trash",
	            src: CMWN.MEDIA.IMAGE + 'cards.trash.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.4.png'
	        }),
	        React.createElement("div", { className: "turtle" }),
	        React.createElement(
	            "p",
	            null,
	            "Click the cards",
	            React.createElement("br", null),
	            "to find out how",
	            React.createElement("br", null),
	            "YOU can be a",
	            React.createElement("br", null),
	            "Waste Buster!"
	        )
	    );
		};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "cards"
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.1.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.2.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.3.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.4.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'card.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'cards.trash.png'
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.selectable.target.props.message')
	            },
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "reduce",
	                src: CMWN.MEDIA.VO + 'ReduceStrong.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "reuse",
	                src: CMWN.MEDIA.VO + 'ReuseStrong.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "recycle",
	                src: CMWN.MEDIA.VO + 'RecycleStrong.mp3'
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: "selectable",
	            selectClass: "HIGHLIGHTED",
	            list: [React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "reduce" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement("div", null)
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "reuse" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement("div", null)
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "recycle" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement("div", null)
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            )]
	        })
	    );
		};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "time-to-collect"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'ItsTimeToCollect.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.intro.trees.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame square" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "h3",
	                    null,
	                    "It's Time To Collect!"
	                ),
	                React.createElement(
	                    "p",
	                    null,
	                    "Navigate the neighborhood",
	                    React.createElement("br", null),
	                    "and collect all of the waste bags.",
	                    React.createElement("br", null),
	                    "Look for Waste Trucks",
	                    React.createElement("br", null),
	                    "to dump your basket."
	                ),
	                React.createElement("div", { className: "truck" }),
	                React.createElement("div", { className: "trash" })
	            )
	        ),
	        React.createElement("div", { className: "tree-1" }),
	        React.createElement("div", { className: "tree-2" }),
	        React.createElement("div", { className: "turtle" })
	    );
		};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "lets-play"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Lets_Play.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.intro.trees.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame square" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "h3",
	                    null,
	                    "Let's Play a Game!"
	                ),
	                React.createElement(
	                    "p",
	                    null,
	                    "Watch Out!",
	                    React.createElement("br", null),
	                    "If you miss a waste bag it affects",
	                    React.createElement("br", null),
	                    "the health of the environment!",
	                    React.createElement("br", null),
	                    React.createElement("br", null),
	                    "Here is a hint! Be sure to unload",
	                    React.createElement("br", null),
	                    "your basket to access",
	                    React.createElement("br", null),
	                    "hidden waste bags!",
	                    React.createElement("br", null),
	                    "Let's clean up!"
	                )
	            )
	        ),
	        React.createElement("div", { className: "tree-1" }),
	        React.createElement("div", { className: "tree-2" }),
	        React.createElement("div", { className: "truck" })
	    );
		};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "remember"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Remember.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.intro.trees.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame square" },
	            React.createElement(skoash.Image, {
	                className: "banner",
	                src: CMWN.MEDIA.IMAGE + 'banner.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: "remember",
	                src: CMWN.MEDIA.IMAGE + 'remember.1.png'
	            }),
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "p",
	                    null,
	                    "Always check with",
	                    React.createElement("br", null),
	                    "an adult before picking",
	                    React.createElement("br", null),
	                    "litter up outside!"
	                )
	            )
	        ),
	        React.createElement("div", { className: "tree-1" }),
	        React.createElement("div", { className: "tree-2" }),
	        React.createElement("div", { className: "newspaper" })
	    );
		};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 1,
	        introVO: 'Responsibly',
	        fact1VO: 'spills',
	        fact2VO: 'Utensils',
	        fact3VO: 'Separate',
	        introContent: React.createElement(
	            'p',
	            null,
	            'On this level, be sure to',
	            React.createElement('br', null),
	            'collect all the ',
	            React.createElement('span', { className: 'truck' }),
	            ' to',
	            React.createElement('br', null),
	            'reveal tips on how',
	            React.createElement('br', null),
	            'to responsibly',
	            React.createElement('br', null),
	            'deal with waste!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You can now use the tips you\'ve',
	            React.createElement('br', null),
	            'learned to help reduce',
	            React.createElement('br', null),
	            'the amount of waste',
	            React.createElement('br', null),
	            'created in the world!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Use Less Paper'
	            ),
	            'Tip: Tear off one paper',
	            React.createElement('br', null),
	            'towel sheet at a time',
	            React.createElement('br', null),
	            'to wipe up spills.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Use Metal Utensils'
	            ),
	            'Tip: Reusable metal spoons,',
	            React.createElement('br', null),
	            'knives and forks are',
	            React.createElement('br', null),
	            'the way to go!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Sort Recyclables from Waste'
	            ),
	            'Tip: Create or buy special bins',
	            React.createElement('br', null),
	            'to separate the metal,',
	            React.createElement('br', null),
	            'glass, paper and plastic',
	            React.createElement('br', null),
	            'from your waste.'
	        )
	    });
	};

	var _phaser_game_screen_component = __webpack_require__(19);

	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    var startScreen;
	    var onScreenStart;
	    var onScreenStop;
	    var getGameSrc;
	    var onOpenReveal;
	    var onCloseReveal;
	    var onRespond;
	    var onTimerComplete;

	    startScreen = function startScreen() {
	        var screenStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var callback = arguments[1];

	        this.updateGameState({
	            path: 'game',
	            data: {
	                screenStart: screenStart
	            },
	            callback: callback
	        });
	    };

	    onScreenStart = function onScreenStart() {
	        var gameData = _.get(props, 'gameState.data.game');

	        startScreen.call(this);

	        if (_.get(gameData, 'levels.' + opts.level + '.complete', false)) {
	            _.assign(gameData, {
	                levels: _defineProperty({}, opts.level, {
	                    complete: false
	                })
	            });
	        }

	        this.updateGameState({
	            path: ['game'],
	            data: _.defaults(gameData, {
	                hits: 0,
	                bagCount: 0,
	                score: 0,
	                lives: 1
	            })
	        });
	    };

	    onScreenStop = function onScreenStop() {
	        var _this = this;

	        startScreen.call(this, false, function () {
	            _this.updateGameState({
	                path: ['game'],
	                data: {
	                    bagCount: 0,
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                }
	            });

	            startScreen.call(_this);
	        });
	    };

	    getGameSrc = function getGameSrc() {
	        if (!_.get(props, 'data.game.screenStart')) return;
	        return '../waste-busters-phaser/index.html?v=' + opts.level;
	    };

	    onOpenReveal = function onOpenReveal() {
	        var _this2 = this;

	        setTimeout(function () {
	            _this2.updateGameState({
	                path: 'd-pad',
	                data: {
	                    pause: true
	                }
	            });
	        }, 1000);
	    };

	    onCloseReveal = function onCloseReveal(prevMessage) {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                close: false,
	                open: null
	            }
	        });

	        this.updateGameState({
	            path: 'd-pad',
	            data: {
	                pause: false
	            }
	        });

	        this.updateGameState({
	            path: ['game'],
	            data: {
	                levels: _defineProperty({}, opts.level, {
	                    start: true
	                })
	            }
	        });

	        if (prevMessage === 'complete') {
	            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	        }
	    };

	    onRespond = function onRespond(options) {
	        var _this3 = this;

	        var trucks = _.get(props, 'gameState.data.game.levels.' + opts.level + '.trucks');
	        var complete = _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete');

	        if (_.get(options, 'updateGameState.data.game.lives') === 0) {
	            startScreen.call(this, false);

	            this.updateGameState({
	                path: ['game'],
	                data: {
	                    bagCount: 0,
	                    lives: 1,
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                }
	            });

	            setTimeout(function () {
	                startScreen.call(_this3);
	            }, 0);
	        }

	        if (_.get(options, 'updateGameState.data.game.levels.' + opts.level + '.start') && _.get(props, 'data.reveal.open', false)) {
	            this.updateGameState({
	                path: 'd-pad',
	                data: {
	                    pause: true
	                }
	            });
	        }

	        if (complete && _.get(props, 'data.reveal.wasOpened') !== 'complete') {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'complete',
	                    wasOpened: 'complete'
	                }
	            });
	        }

	        if (!complete && trucks && _.get(props, 'data.reveal.wasOpened') !== 'fact-' + trucks) {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'fact-' + trucks,
	                    wasOpened: 'fact-' + trucks
	                }
	            });
	        }
	    };

	    onTimerComplete = function onTimerComplete() {
	        var _this4 = this;

	        if (_.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false)) return;

	        startScreen.call(this, false, function () {
	            _this4.updateGameState({
	                path: ['game'],
	                data: {
	                    bagCount: 0,
	                    lives: _.get(props, 'gameState.data.game.lives', 1) - 1 || 1,
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                }
	            });

	            startScreen.call(_this4);
	        });
	    };

	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'phaser-level-' + opts.level,
	            onStart: onScreenStart,
	            onStop: onScreenStop
	        }),
	        React.createElement(skoash.GameEmbedder, {
	            src: getGameSrc(),
	            controller: _.get(props, 'data.d-pad'),
	            complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false),
	            data: _.get(props, 'gameState.data.game', {}),
	            onRespond: onRespond
	        }),
	        React.createElement(skoash.Timer, {
	            countDown: true,
	            timeout: 120000,
	            onComplete: onTimerComplete,
	            pause: _.get(props, 'gameState.data.game.levels.' + opts.level + '.start', false) && _.get(props, 'data.reveal.open', false),
	            resume: !_.get(props, 'data.reveal.open', false),
	            stop: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false),
	            complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false),
	            checkComplete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.start', false),
	            restart: _.get(props, 'gameState.data.game.levels.' + opts.level + '.start', false)
	        }),
	        React.createElement(
	            skoash.Component,
	            {
	                className: 'bottom',
	                complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false)
	            },
	            React.createElement(
	                skoash.Component,
	                {
	                    className: 'left'
	                },
	                React.createElement(skoash.Score, {
	                    className: 'life',
	                    correct: 4 - _.get(props, 'gameState.data.game.hits', 0) || 0,
	                    setScore: true
	                }),
	                React.createElement(skoash.Score, {
	                    className: 'bags',
	                    correct: _.get(props, 'gameState.data.game.bagCount', 0),
	                    setScore: true
	                })
	            ),
	            React.createElement(
	                skoash.Component,
	                {
	                    className: 'middle'
	                },
	                React.createElement(skoash.Score, {
	                    className: 'level-score',
	                    correct: _.get(props, 'gameState.data.game.score', 0),
	                    setScore: true
	                }),
	                React.createElement(skoash.Component, {
	                    className: (0, _classnames2.default)('level', 'level-' + opts.level)
	                })
	            ),
	            React.createElement(
	                skoash.Component,
	                {
	                    className: 'right'
	                },
	                React.createElement(skoash.Score, {
	                    className: 'lives',
	                    correct: _.get(props, 'gameState.data.game.lives', 1),
	                    setScore: true
	                }),
	                React.createElement(skoash.Score, {
	                    className: 'trucks',
	                    correct: _.get(props, 'gameState.data.game.levels.' + opts.level + '.trucks'),
	                    setScore: true
	                }),
	                React.createElement(skoash.DPad, null)
	            )
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: 'intro',
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            onOpen: onOpenReveal,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'intro',
	                    className: 'intro frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.introContent
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-1',
	                    className: 'fact-1 frame square',
	                    type: 'li'
	                },
	                React.createElement('div', { className: 'banner' }),
	                React.createElement('div', { className: 'title' }),
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact1Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-2',
	                    className: 'fact-2 frame square',
	                    type: 'li'
	                },
	                React.createElement('div', { className: 'banner' }),
	                React.createElement('div', { className: 'title' }),
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact2Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-3',
	                    className: 'fact-3 frame square',
	                    type: 'li'
	                },
	                React.createElement('div', { className: 'banner' }),
	                React.createElement('div', { className: 'title' }),
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact3Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'complete',
	                    className: 'complete frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.completeContent
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'replay',
	                    className: 'replay frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    React.createElement(
	                        'p',
	                        null,
	                        'You have not won this level,',
	                        React.createElement('br', null),
	                        'but don\'t worry\u2014',
	                        React.createElement('br', null),
	                        'you have another chance!'
	                    )
	                )
	            )]
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open')
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'intro',
	                src: '' + CMWN.MEDIA.VO + opts.introVO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'complete',
	                src: CMWN.MEDIA.VO + 'Level_' + opts.level + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-1',
	                src: '' + CMWN.MEDIA.VO + opts.fact1VO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-2',
	                src: '' + CMWN.MEDIA.VO + opts.fact2VO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-3',
	                src: '' + CMWN.MEDIA.VO + opts.fact3VO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'replay',
	                src: CMWN.MEDIA.VO + 'Another_Chance.mp3',
	                complete: true
	            })
	        )
	    );
	};

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 2,
	        introVO: 'landfill',
	        fact1VO: 'Portions',
	        fact2VO: 'Reusable_Bags',
	        fact3VO: 'Rules',
	        introContent: React.createElement(
	            'p',
	            null,
	            'In this level,',
	            React.createElement('br', null),
	            'you\'ll discover ways',
	            React.createElement('br', null),
	            'to keep waste',
	            React.createElement('br', null),
	            'out of the landfill!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'Excellent Work!',
	            React.createElement('br', null),
	            'Reusing certain items is one of',
	            React.createElement('br', null),
	            'the best ways to reduce',
	            React.createElement('br', null),
	            'waste\u2014and it saves',
	            React.createElement('br', null),
	            'you money too!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Choose Smaller Food Portions'
	            ),
	            'Tip: Sometimes our eyes can',
	            React.createElement('br', null),
	            'be bigger than our stomachs!',
	            React.createElement('br', null),
	            'Only take as much food',
	            React.createElement('br', null),
	            'as you can eat.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Carry Reusable Bags'
	            ),
	            'Tip: Keep a canvas bag with',
	            React.createElement('br', null),
	            'you wherever you go,',
	            React.createElement('br', null),
	            'so if you shop you can',
	            React.createElement('br', null),
	            'avoid using plastic!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Discover Recycling Rules'
	            ),
	            'Tip: Each city has their own',
	            React.createElement('br', null),
	            'recycling rules. Discover the',
	            React.createElement('br', null),
	            'rules for where you live!'
	        )
	    });
	};

	var _phaser_game_screen_component = __webpack_require__(19);

	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 3,
	        introVO: 'find_out_how',
	        fact1VO: 'Less_Packaging',
	        // this VO needs to be replaced
	        fact2VO: 'Reusable_Bags',
	        fact3VO: 'Friends',
	        introContent: React.createElement(
	            'p',
	            null,
	            'Learning ways to reduce,',
	            React.createElement('br', null),
	            'reuse and recycle is the',
	            React.createElement('br', null),
	            'goal\u2014collect all',
	            React.createElement('br', null),
	            'the ',
	            React.createElement('span', { className: 'truck' }),
	            ' to',
	            React.createElement('br', null),
	            'find out how!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You\'re a Recycling Wizard!',
	            React.createElement('br', null),
	            'Being mindful of how you',
	            React.createElement('br', null),
	            'handle waste helps',
	            React.createElement('br', null),
	            'keep the environment',
	            React.createElement('br', null),
	            'in great shape.'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Buy Items with Less Packaging'
	            ),
	            'Tip: Some products have more',
	            React.createElement('br', null),
	            'eco-friendly packaging than',
	            React.createElement('br', null),
	            'others. Be smart!'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Buy Clothing at a Thrift Shop'
	            ),
	            'Tip: Save gently used clothing',
	            React.createElement('br', null),
	            'from the landfill by buying',
	            React.createElement('br', null),
	            'at thrift stores!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Encourage Friends and',
	                React.createElement('br', null),
	                'Family to Recycle'
	            ),
	            'Tip: Give those closest to you',
	            React.createElement('br', null),
	            'friendly reminders to',
	            React.createElement('br', null),
	            'properly recycle their waste.'
	        )
	    });
	};

	var _phaser_game_screen_component = __webpack_require__(19);

	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 4,
	        introVO: 'And_The_World',
	        fact1VO: 'BothSides',
	        fact2VO: 'Container',
	        fact3VO: 'Electronics',
	        introContent: React.createElement(
	            'p',
	            null,
	            'By collecting the ',
	            React.createElement('span', { className: 'truck' }),
	            React.createElement('br', null),
	            'and disposing of waste',
	            React.createElement('br', null),
	            'properly, you can help',
	            React.createElement('br', null),
	            'both your community',
	            React.createElement('br', null),
	            'and the world!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You\'re a Recycling Wizard!',
	            React.createElement('br', null),
	            'Being mindful of how you',
	            React.createElement('br', null),
	            'handle waste helps',
	            React.createElement('br', null),
	            'keep the environment',
	            React.createElement('br', null),
	            'in great shape.'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Use Both Sides of a',
	                React.createElement('br', null),
	                'Piece of Paper'
	            ),
	            'Tip: Whether doing your homework',
	            React.createElement('br', null),
	            'or making a shopping list,',
	            React.createElement('br', null),
	            'writing on both sides of',
	            React.createElement('br', null),
	            'notepaper is the',
	            React.createElement('br', null),
	            'right thing to do!'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Put Your Lunch in',
	                React.createElement('br', null),
	                'a Reusable Container'
	            ),
	            'Tip: Instead of carrying your',
	            React.createElement('br', null),
	            'lunch in a paper or',
	            React.createElement('br', null),
	            'plastic bag, why not use',
	            React.createElement('br', null),
	            'a reusable container?'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Recycle Your Electronics'
	            ),
	            'Tip: Electronic waste contains',
	            React.createElement('br', null),
	            'hazardous materials and',
	            React.createElement('br', null),
	            'toxins and should always be',
	            React.createElement('br', null),
	            'recycled appropriately.'
	        )
	    });
	};

	var _phaser_game_screen_component = __webpack_require__(19);

	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 5,
	        introVO: 'AlmostThere',
	        fact1VO: 'Bulk',
	        fact2VO: 'Bottled_Water',
	        fact3VO: 'Boxes',
	        introContent: React.createElement(
	            'p',
	            null,
	            'You\'re almost there! Keep',
	            React.createElement('br', null),
	            'picking up waste and learning',
	            React.createElement('br', null),
	            'tips as you head',
	            React.createElement('br', null),
	            'to the finish line!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You\'ve won the game!',
	            React.createElement('br', null),
	            'Now take what you\'ve learned,',
	            React.createElement('br', null),
	            'go out into the world,',
	            React.createElement('br', null),
	            'and do your part!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Buy In Bulk'
	            ),
	            'Tip: Individually-wrapped items',
	            React.createElement('br', null),
	            'use more packaging than',
	            React.createElement('br', null),
	            'a whole bunch of them',
	            React.createElement('br', null),
	            'sold in one package.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Carry Water in a',
	                React.createElement('br', null),
	                'Reusable Water Bottle'
	            ),
	            'Tip: Bottled water uses containers',
	            React.createElement('br', null),
	            'designed to be used only once.',
	            React.createElement('br', null),
	            'But special reusable water',
	            React.createElement('br', null),
	            'bottles can be filled with',
	            React.createElement('br', null),
	            'water from your tap!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Prepare Your Cardboard',
	                React.createElement('br', null),
	                'for Recycling'
	            ),
	            'Tip: Break boxes down to save',
	            React.createElement('br', null),
	            'space, and be sure',
	            React.createElement('br', null),
	            'to remove any food waste.'
	        )
	    });
	};

	var _phaser_game_screen_component = __webpack_require__(19);

	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "neighborhood-waste"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'identifywaste.mp3'
	        }),
	        React.createElement("div", { className: "tree-3" }),
	        React.createElement("div", { className: "tree-4" }),
	        React.createElement(skoash.Image, {
	            className: "turtle",
	            src: CMWN.MEDIA.IMAGE + 'main.turtle.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.4.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'frame.round.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame round" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                "Now that the",
	                React.createElement("br", null),
	                "neighborhood waste",
	                React.createElement("br", null),
	                "has been picked up, let's",
	                React.createElement("br", null),
	                "identify the different",
	                React.createElement("br", null),
	                "types of waste!"
	            )
	        )
	    );
		};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "types-of-waste"
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.1.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.2.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.3.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'card.png'
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.selectable.target.props.message')
	            },
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "compost",
	                src: CMWN.MEDIA.VO + 'compost.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "recycle",
	                src: CMWN.MEDIA.VO + 'Recycles.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "landfill",
	                src: CMWN.MEDIA.VO + 'Landfill_Desc.mp3'
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: "selectable",
	            selectClass: "HIGHLIGHTED",
	            list: [React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "compost" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement(
	                        "div",
	                        null,
	                        "Discarded organic matter",
	                        React.createElement("br", null),
	                        "such as plant scraps and",
	                        React.createElement("br", null),
	                        "egg shells can all be turned",
	                        React.createElement("br", null),
	                        "into mineral-rich soil."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "recycle" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement(
	                        "div",
	                        null,
	                        "Metal, glass, and certain",
	                        React.createElement("br", null),
	                        "types of paper and plastic",
	                        React.createElement("br", null),
	                        "can be recycled."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "landfill" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement(
	                        "div",
	                        null,
	                        "Alas, not all waste can be",
	                        React.createElement("br", null),
	                        "recycled or composted.",
	                        React.createElement("br", null),
	                        "Soiled tissues, plastic",
	                        React.createElement("br", null),
	                        "diapers, and more are just",
	                        React.createElement("br", null),
	                        "some of the times that",
	                        React.createElement("br", null),
	                        "might end up in the landfill!"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            )]
	        })
	    );
		};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "waste-sort-center"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Help_Me.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "title",
	            src: CMWN.MEDIA.IMAGE + 'sort.title.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "turtle",
	            src: CMWN.MEDIA.IMAGE + 'main.turtle.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'frame.round.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame round" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                "Now that we've learned the",
	                React.createElement("br", null),
	                "best ways to separate waste,",
	                React.createElement("br", null),
	                "let's test your knowledge",
	                React.createElement("br", null),
	                "by helping me at the",
	                React.createElement("br", null),
	                "Waste Sorting Center."
	            )
	        )
	    );
		};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _sorting_game_component2.default)(props, ref, key, {
	        level: 1,
	        points: 100,
	        timer: 120000,
	        instructionsVO: 'Launch_The_Object',
	        completeVO: 'Waste_Sorting_Wizard',
	        completeSFX: 'LevelComplete',
	        instructions: React.createElement(
	            'p',
	            null,
	            'Launch the object into the correct bin before',
	            React.createElement('br', null),
	            'the timer runs out to get to the next level.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Should the waste be recycled,',
	            React.createElement('br', null),
	            'composted, or taken to the landfill?',
	            React.createElement('br', null),
	            'This is your chance to prove what',
	            React.createElement('br', null),
	            'you know and gain points!'
	        ),
	        complete: React.createElement(
	            'p',
	            null,
	            'Now try your hand at',
	            React.createElement('br', null),
	            'the next level of sorting!'
	        )
	    });
	};

	var _sorting_game_component = __webpack_require__(28);

	var _sorting_game_component2 = _interopRequireDefault(_sorting_game_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'sorting-level-' + opts.level,
	            className: 'reveal-open-' + _.get(props, 'data.reveal.open', '')
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: null
	                        }
	                    });
	                }
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                {
	                    ref: 'instructions',
	                    silentOnStart: true
	                },
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'Waste_Sorting_Center.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    src: '' + CMWN.MEDIA.VO + opts.instructionsVO + '.mp3'
	                })
	            ),
	            React.createElement(skoash.Audio, {
	                ref: 'complete',
	                type: 'voiceOver',
	                src: '' + CMWN.MEDIA.VO + opts.completeVO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'retry',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'Keep_Sorting.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.game.play', _.get(props, 'data.reveal.open', null))
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'correct',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'Correct.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'incorrect',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'WrongBinForItem.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'warning',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'TenSecondsWarning.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'fire',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'SlingshotRelease_sortButton.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'complete',
	                type: 'sfx',
	                src: '' + CMWN.MEDIA.EFFECT + opts.completeSFX + '.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            null,
	            images
	        ),
	        React.createElement(skoash.SpriteAnimation, {
	            className: 'slingshot',
	            src: CMWN.MEDIA.SPRITE + 'slingshot.png',
	            animate: _.get(props, 'data.game.firing', false),
	            animateOnStart: false,
	            frames: 6,
	            complete: true
	        }),
	        React.createElement(_3.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 7,
	            targetIndex: 4,
	            selected: _.get(props, 'data.game.fired'),
	            onSelect: function onSelect(target) {
	                var correct = _.get(props, 'data.game.correct', 0);
	                var incorrect = _.get(props, 'data.game.incorrect', 0);
	                var classes = this.state.classes;
	                var play;

	                classes[target.props['data-key']] = 'SELECTED';

	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });

	                if (target.props.name === _.get(props, 'data.game.fired.props.message')) {
	                    correct++;
	                    play = 'correct';
	                } else {
	                    incorrect++;
	                    play = 'incorrect';
	                }

	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        correct: correct,
	                        incorrect: incorrect,
	                        play: play
	                    }
	                });
	            },
	            bin: React.createElement(_7.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                remain: true,
	                bin: [React.createElement(skoash.Component, { className: 'recycle', name: 'recycle' }), React.createElement(skoash.Component, { className: 'landfill', name: 'landfill' }), React.createElement(skoash.Component, { className: 'compost', name: 'compost' }), React.createElement(skoash.Component, { className: 'recycle', name: 'recycle' }), React.createElement(skoash.Component, { className: 'landfill', name: 'landfill' }), React.createElement(skoash.Component, { className: 'compost', name: 'compost' }), React.createElement(skoash.Component, { className: 'recycle', name: 'recycle' }), React.createElement(skoash.Component, { className: 'landfill', name: 'landfill' }), React.createElement(skoash.Component, { className: 'compost', name: 'compost' })]
	            })
	        }),
	        React.createElement(_5.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            dataDelay: 1000,
	            showNum: 0,
	            bin: React.createElement(_7.default, {
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'flowers', message: 'compost' }), React.createElement(skoash.Component, { className: 'paper', message: 'recycle' }), React.createElement(skoash.Component, { className: 'newspaper', message: 'recycle' }), React.createElement(skoash.Component, { className: 'napkin', message: 'landfill' }), React.createElement(skoash.Component, { className: 'lettuce', message: 'compost' }), React.createElement(skoash.Component, { className: 'juice', message: 'recycle' }), React.createElement(skoash.Component, { className: 'eggshell', message: 'compost' }), React.createElement(skoash.Component, { className: 'diaper', message: 'landfill' }), React.createElement(skoash.Component, { className: 'mug', message: 'landfill' }), React.createElement(skoash.Component, { className: 'coffee', message: 'compost' }), React.createElement(skoash.Component, { className: 'box', message: 'recycle' }), React.createElement(skoash.Component, { className: 'can', message: 'recycle' }), React.createElement(skoash.Component, { className: 'bottle', message: 'recycle' }), React.createElement(skoash.Component, { className: 'banana', message: 'compost' }), React.createElement(skoash.Component, { className: 'apple', message: 'compost' })]
	            })
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'stats' },
	            React.createElement(
	                'span',
	                { className: 'level' },
	                opts.level
	            ),
	            React.createElement(skoash.Timer, {
	                ref: 'timer',
	                countDown: true,
	                timeout: opts.timer,
	                stop: _.get(props, 'data.game.complete', false),
	                complete: _.get(props, 'data.game.complete', false),
	                checkComplete: _.get(props, 'data.game.start', false),
	                restart: _.get(props, 'data.game.start', false),
	                onComplete: function onComplete() {
	                    if (_.get(props, 'data.game.complete')) return;
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'retry'
	                        }
	                    });

	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            correct: 0,
	                            incorrect: 0
	                        }
	                    });
	                }
	            }),
	            React.createElement(skoash.Score, {
	                ref: 'score',
	                max: opts.points,
	                increment: 10,
	                correct: _.get(props, 'data.game.correct', 0),
	                incorrect: _.get(props, 'data.game.incorrect', 0),
	                onComplete: function onComplete() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'complete'
	                        }
	                    });
	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            complete: true
	                        }
	                    });
	                }
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: 'instructions',
	            openTarget: 'reveal',
	            closeTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            onOpen: function onOpen() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: true,
	                        start: false
	                    }
	                });
	            },
	            onClose: function onClose() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: false,
	                        start: true
	                    }
	                });
	            },
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'instructions',
	                    className: 'instructions frame round'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.instructions
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'complete',
	                    className: 'complete frame round'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.complete
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'retry',
	                    className: 'retry frame round'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Keep Sorting!',
	                        React.createElement('br', null),
	                        'If you don\'t succeed,',
	                        React.createElement('br', null),
	                        'try again!'
	                    )
	                )
	            )]
	        })
	    );
	};

	var _2 = __webpack_require__(29);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(40);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(41);

	var _7 = _interopRequireDefault(_6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var images = [];

	for (var i = 1; i < 9; i++) {
	    images.push(React.createElement(skoash.Image, {
	        key: i,
	        className: 'hidden',
	        src: CMWN.MEDIA.SPRITE + 'game2.' + i + '.png'
	    }));
	}

	images.push(React.createElement(skoash.Image, {
	    key: 9,
	    className: 'hidden',
	    src: CMWN.MEDIA.SPRITE + 'slingshot.png'
		}));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid = __webpack_require__(30);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _2 = __webpack_require__(39);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Carousel = function (_Selectable) {
	    _inherits(Carousel, _Selectable);

	    function Carousel() {
	        _classCallCheck(this, Carousel);

	        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this));

	        _this.next = _this.next.bind(_this);
	        return _this;
	    }

	    _createClass(Carousel, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

	            if (nextProps.selected && nextProps.selected !== this.props.selected) {
	                this.select();
	            }
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'start', this).call(this);
	            this.next();
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var _this2 = this;

	            var classes = this.state.classes;
	            var list = this.state.list;
	            var item = this.refs.bin.get(1)[0];
	            list = list.concat(React.createElement(item.type, _extends({}, item.props, {
	                'data-key': _shortid2.default.generate()
	            })));
	            list.shift();
	            classes[0] = '';
	            this.enabled = true;

	            this.setState({
	                classes: classes,
	                list: list
	            }, function () {
	                setTimeout(function () {
	                    classes[0] = 'LEAVE';
	                    _this2.setState({
	                        classes: classes
	                    });
	                }, _this2.props.pause);
	            });
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var list;
	            // skoash.Component is not the super here, but this is what we want
	            skoash.Component.prototype.bootstrap.call(this);

	            list = this.refs.bin ? this.refs.bin.get(this.props.showNum + 1) : this.props.list;

	            _.each(list, function (item) {
	                return React.createElement(item.type, _extends({}, item.props, {
	                    'data-key': _shortid2.default.generate()
	                }));
	            });

	            this.setState({
	                list: list
	            });
	        }
	    }, {
	        key: 'selectHelper',
	        value: function selectHelper() {
	            if (!this.enabled) return;

	            if (this.props.dataTarget) {
	                this.updateGameState({
	                    path: this.props.dataTarget,
	                    data: {
	                        target: this.state.list[this.props.targetIndex]
	                    }
	                });
	            }

	            this.enabled = false;

	            this.props.onSelect.call(this, this.state.list[this.props.targetIndex]);
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('carousel', _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'getClassNames', this).call(this));
	        }

	        /*
	         * shortid is intentionally not used for key here because we want to make sure
	         * that the element is transitioned and not replaced.
	         */

	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            var _this3 = this;

	            var list = this.state.list || this.props.list;
	            return list.map(function (li, key) {
	                var ref;
	                var onTransitionEnd;
	                ref = li.ref || li.props['data-ref'] || key;
	                onTransitionEnd = key === 0 ? _this3.next : null;
	                return React.createElement(li.type, _extends({}, li.props, {
	                    className: _this3.getClass(key, li),
	                    'data-ref': ref,
	                    'data-message': li.props.message,
	                    onTransitionEnd: onTransitionEnd,
	                    ref: ref,
	                    key: key,
	                    'data-key': (0, _shortid2.default)(key)
	                }));
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var onClick = this.props.clickable ? this.state.selectFunction.bind(this) : null;
	            return React.createElement(
	                'div',
	                null,
	                this.renderBin(),
	                React.createElement(
	                    'div',
	                    { className: this.getClassNames(), onClick: onClick },
	                    this.renderList()
	                )
	            );
	        }
	    }]);

	    return Carousel;
	}(_3.default);

	Carousel.defaultProps = _.defaults({
	    showNum: 3,
	    targetIndex: 1,
	    pause: 500,
	    clickable: false,
	    onSelect: _.noop
	}, _3.default.defaultProps);

		exports.default = Carousel;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(31);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(32);
	var encode = __webpack_require__(34);
	var decode = __webpack_require__(36);
	var isValid = __webpack_require__(37);

	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;

	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;

	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(38) || 0;

	// Counter is used when shortid is called multiple times in one second.
	var counter;

	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;

	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {

	    var str = '';

	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }

	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);

	    return str;
	}


	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}

	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}

	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }

	    return alphabet.shuffled();
	}


	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(33);

	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;

	var shuffled;

	function reset() {
	    shuffled = false;
	}

	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }

	    if (_alphabet_ === alphabet) {
	        return;
	    }

	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }

	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });

	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }

	    alphabet = _alphabet_;
	    reset();
	}

	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}

	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}

	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }

	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;

	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}

	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}

	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}

	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

	var seed = 1;

	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}

	function setSeed(_seed_) {
	    seed = _seed_;
	}

	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(35);

	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;

	    var str = '';

	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}

	module.exports = encode;


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}

	module.exports = randomByte;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(32);

	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}

	module.exports = decode;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(32);

	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }

	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}

	module.exports = isShortId;


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// As of skoash 1.1.0 this component can be found at skoash.Selectable
	/* eslint-disable no-console */
	console.warn('As of skoash 1.1.0 this component can be found at skoash.Selectable');
	/* eslint-enable no-console */

	var Selectable = function (_skoash$Component) {
	    _inherits(Selectable, _skoash$Component);

	    function Selectable() {
	        _classCallCheck(this, Selectable);

	        var _this = _possibleConstructorReturn(this, (Selectable.__proto__ || Object.getPrototypeOf(Selectable)).call(this));

	        _this.state = {
	            classes: {},
	            selectFunction: _this.select
	        };
	        return _this;
	    }

	    _createClass(Selectable, [{
	        key: 'start',
	        value: function start() {
	            var selectClass;
	            var selectFunction;
	            var classes = this.state.classes;

	            _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'start', this).call(this);

	            selectClass = this.props.selectClass || this.state.selectClass || 'SELECTED';
	            selectFunction = selectClass === 'HIGHLIGHTED' ? this.highlight : this.select;

	            if (this.props.selectOnStart) {
	                classes[this.props.selectOnStart] = selectClass;
	            }

	            this.setState({
	                started: true,
	                classes: classes,
	                selectFunction: selectFunction,
	                selectClass: selectClass
	            });
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'bootstrap', this).call(this);

	            if (this.refs.bin) {
	                this.setState({
	                    list: this.refs.bin.getAll()
	                });
	            }
	        }
	    }, {
	        key: 'selectHelper',
	        value: function selectHelper(e, classes) {
	            var ref;
	            var dataRef;
	            var target;
	            var id;
	            var isCorrect;
	            var self = this;

	            if (typeof e === 'string') {
	                dataRef = e;
	            } else {
	                target = e.target.closest('LI');

	                if (!target) return;

	                dataRef = target.getAttribute('data-ref');
	            }

	            ref = self.refs[dataRef];

	            isCorrect = ref && ref.props && ref.props.correct || !self.props.answers || !self.props.answers.length || self.props.answers.indexOf(dataRef) !== -1;

	            if (self.props.allowDeselect && classes[dataRef]) {
	                delete classes[dataRef];
	            } else if (isCorrect) {
	                classes[dataRef] = self.state.selectClass;
	            }

	            self.setState({
	                classes: classes
	            });

	            self.props.selectRespond.call(self, dataRef);
	            self.props.onSelect.call(self, dataRef);

	            if (self.props.chooseOne) self.complete();

	            if (self.props.dataTarget) {
	                self.updateGameState({
	                    path: self.props.dataTarget,
	                    data: {
	                        target: ref
	                    }
	                });
	            }

	            if (self.props.completeListOnClick) {
	                _.each(self.refs, function (r, k) {
	                    if (k === id) _.invoke(r, 'complete');
	                });
	            }

	            _.each(self.refs, function (r, k) {
	                if (k === dataRef) _.invoke(r, 'complete');
	            });
	        }
	    }, {
	        key: 'select',
	        value: function select(e) {
	            var classes = [];
	            this.selectHelper(e, classes);
	        }
	    }, {
	        key: 'highlight',
	        value: function highlight(e) {
	            var classes = this.state.classes;
	            this.selectHelper(e, classes);
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(key, li) {
	            return (0, _classnames2.default)(li.props.className, this.state.classes[key], this.state.classes[li.props['data-ref']], this.state.classes[li.props['data-key']]);
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('selectable', _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Selectable.prototype.__proto__ || Object.getPrototypeOf(Selectable.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.select && props.select !== this.props.select) {
	                this.state.selectFunction.call(this, props.select);
	            }
	        }
	    }, {
	        key: 'renderBin',
	        value: function renderBin() {
	            if (!this.props.bin) return null;

	            return React.createElement(this.props.bin.type, _extends({}, this.props.bin.props, {
	                ref: 'bin'
	            }));
	        }
	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            var _this2 = this;

	            var list = this.props.list || this.state.list;
	            return list.map(function (li, key) {
	                var dataRef = li.props['data-ref'] || key;
	                var ref = li.ref || li.props.id || dataRef;
	                var message = li.props.message || '' + key;
	                return React.createElement(li.type, _extends({}, li.props, {
	                    type: 'li',
	                    className: _this2.getClass(key, li),
	                    message: message,
	                    'data-message': message,
	                    'data-ref': dataRef,
	                    ref: ref,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                this.renderBin(),
	                React.createElement(
	                    'ul',
	                    { className: this.getClassNames(), onClick: this.state.selectFunction.bind(this) },
	                    this.renderList()
	                )
	            );
	        }
	    }]);

	    return Selectable;
	}(skoash.Component);

	Selectable.defaultProps = _.defaults({
	    list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
	    selectClass: 'SELECTED',
	    completeListOnClick: true,
	    selectRespond: _.noop,
	    onSelect: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Selectable;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Cannon = function (_skoash$Component) {
	    _inherits(Cannon, _skoash$Component);

	    function Cannon() {
	        _classCallCheck(this, Cannon);

	        var _this = _possibleConstructorReturn(this, (Cannon.__proto__ || Object.getPrototypeOf(Cannon)).call(this));

	        _this.state = {
	            classes: {}
	        };

	        _this.fire = _this.fire.bind(_this);
	        _this.reload = _this.reload.bind(_this);
	        return _this;
	    }

	    _createClass(Cannon, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var list;

	            _get(Cannon.prototype.__proto__ || Object.getPrototypeOf(Cannon.prototype), 'bootstrap', this).call(this);

	            list = this.refs.bin ? this.refs.bin.get(this.props.showNum + 1) : this.props.list;

	            this.setState({
	                list: list
	            });
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(Cannon.prototype.__proto__ || Object.getPrototypeOf(Cannon.prototype), 'start', this).call(this);
	            this.next();
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var classes;
	            var list;
	            classes = this.state.classes;
	            list = this.state.list;
	            if (this.props.reverseReload) {
	                list = this.refs.bin.get(1).concat(list);
	                list.pop();
	            } else {
	                list = list.concat(this.refs.bin.get(1));
	                list.shift();
	            }
	            classes[this.state.list.length - 1] = 'LOADED';
	            this.enabled = true;

	            this.setState({
	                classes: classes,
	                list: list
	            });
	        }
	    }, {
	        key: 'fire',
	        value: function fire() {
	            var _this2 = this;

	            var list = this.state.list || this.props.list || {};

	            this.setState({
	                fire: true,
	                reload: false
	            }, function () {
	                setTimeout(function () {
	                    _this2.reload();
	                    _this2.next();
	                }, _this2.props.reloadTime);
	            });

	            this.updateGameState({
	                path: this.props.dataTarget,
	                data: {
	                    firing: true
	                }
	            });

	            setTimeout(function () {
	                _this2.updateGameState({
	                    path: _this2.props.dataTarget,
	                    data: {
	                        play: 'fire',
	                        fired: list[_this2.state.list.length - 1],
	                        firing: false
	                    }
	                });
	            }, this.props.dataDelay);

	            this.props.onFire.call(this);
	        }
	    }, {
	        key: 'reload',
	        value: function reload() {
	            this.setState({
	                fire: false,
	                reload: true
	            });

	            this.updateGameState({
	                path: this.props.dataTarget,
	                data: {
	                    play: null,
	                    fired: null
	                }
	            });

	            this.props.onReload.call(this);
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('cannon', {
	                FIRE: this.state.fire,
	                RELOAD: this.state.reload
	            }, _get(Cannon.prototype.__proto__ || Object.getPrototypeOf(Cannon.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(key, li) {
	            return (0, _classnames2.default)('ammo', li.props.className, this.state.classes[key]);
	        }
	    }, {
	        key: 'renderBin',
	        value: function renderBin() {
	            if (!this.props.bin) return null;

	            return React.createElement(this.props.bin.type, _extends({}, this.props.bin.props, {
	                ref: 'bin'
	            }));
	        }
	    }, {
	        key: 'renderAmmo',
	        value: function renderAmmo() {
	            var _this3 = this;

	            var list = this.state.list || this.props.list;
	            return list.map(function (li, key) {
	                var ref;
	                ref = li.ref || li.props['data-ref'] || key;
	                return React.createElement(li.type, _extends({}, li.props, {
	                    ref: ref,
	                    'data-ref': ref,
	                    key: key,
	                    className: _this3.getClass(key, li)
	                }));
	            });
	        }
	    }, {
	        key: 'renderLaunchButton',
	        value: function renderLaunchButton() {
	            if (!this.props.launchButton) return;

	            return React.createElement('div', { className: 'launch-button', onClick: this.fire });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                this.renderBin(),
	                React.createElement('div', { className: 'ammo-container' }),
	                this.renderAmmo(),
	                this.renderLaunchButton()
	            );
	        }
	    }]);

	    return Cannon;
	}(skoash.Component);

	Cannon.defaultProps = _.defaults({
	    showNum: 3,
	    reverseReload: false,
	    list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
	    dataTarget: 'game',
	    dataDelay: 0,
	    onReload: _.noop,
	    onFire: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Cannon;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Randomizer = function (_skoash$Component) {
	    _inherits(Randomizer, _skoash$Component);

	    function Randomizer() {
	        _classCallCheck(this, Randomizer);

	        return _possibleConstructorReturn(this, (Randomizer.__proto__ || Object.getPrototypeOf(Randomizer)).apply(this, arguments));
	    }

	    _createClass(Randomizer, [{
	        key: 'getAll',
	        value: function getAll() {
	            return _.shuffle(this.props.bin);
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	            var items;
	            var bin = [];

	            if (this.props.remain && this.state.bin) {
	                bin = this.state.bin;
	            }

	            while (bin.length < amount) {
	                bin = bin.concat(_.shuffle(this.props.bin));
	            }

	            items = bin.splice(0, amount);

	            if (this.props.remain) {
	                this.setState({ bin: bin });
	            }

	            return items;
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('randomizer', _get(Randomizer.prototype.__proto__ || Object.getPrototypeOf(Randomizer.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'renderBin',
	        value: function renderBin() {
	            return _.map(this.props.bin, function (li, key) {
	                var ref = li.ref || li.props && li.props['data-ref'] || key;
	                return React.createElement(li.type, _extends({}, li.props, {
	                    'data-ref': ref,
	                    ref: ref,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'ul',
	                { className: this.getClassNames() },
	                this.renderBin()
	            );
	        }
	    }]);

	    return Randomizer;
	}(skoash.Component);

	Randomizer.defaultProps = _.defaults({
	    bin: [],
	    remain: false,
	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    }
	}, skoash.Component.defaultProps);

		exports.default = Randomizer;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _sorting_game_component2.default)(props, ref, key, {
	        level: 2,
	        points: 100,
	        timer: 120000,
	        instructionsVO: 'Get_Ready_Go',
	        completeVO: 'Waste_Sorting_Wizard',
	        completeSFX: 'LevelComplete',
	        instructions: React.createElement(
	            'p',
	            null,
	            'Sorting is just about to',
	            React.createElement('br', null),
	            'get a little tougher!',
	            React.createElement('br', null),
	            'Get Ready! Go!'
	        ),
	        complete: React.createElement(
	            'p',
	            null,
	            'Wow, you\'re doing',
	            React.createElement('br', null),
	            'amazing sorting work!',
	            React.createElement('br', null),
	            'Keep going and become',
	            React.createElement('br', null),
	            'a Sorting Champion!'
	        )
	    });
	};

	var _sorting_game_component = __webpack_require__(28);

	var _sorting_game_component2 = _interopRequireDefault(_sorting_game_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _sorting_game_component2.default)(props, ref, key, {
	        level: 3,
	        points: 100,
	        timer: 120000,
	        instructionsVO: 'Waste_Sorting_Action',
	        completeVO: 'Waste_Sorting_Wizard',
	        completeSFX: 'GameWon',
	        instructions: React.createElement(
	            'p',
	            null,
	            'The clock is set!',
	            React.createElement('br', null),
	            'Get ready for some',
	            React.createElement('br', null),
	            'challenging waste',
	            React.createElement('br', null),
	            'sorting action!'
	        ),
	        complete: React.createElement(
	            'p',
	            null,
	            'You are now a',
	            React.createElement(
	                'h3',
	                null,
	                'WASTE SORTING CHAMPION'
	            ),
	            'Thank you for learning',
	            React.createElement('br', null),
	            'about the right way',
	            React.createElement('br', null),
	            'to dispose of waste.'
	        )
	    });
	};

	var _sorting_game_component = __webpack_require__(28);

	var _sorting_game_component2 = _interopRequireDefault(_sorting_game_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "take-action"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Home_and_School.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'banner.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game2.4.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'frame.round.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame round" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                "Now that you've learned",
	                React.createElement("br", null),
	                "how to dispose of waste",
	                React.createElement("br", null),
	                "responsibly, take action in",
	                React.createElement("br", null),
	                "your home and school!"
	            )
	        )
	    );
		};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'flip'
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.VO + 'filp.mp3',
	            playTarget: 'vo'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'frame.square.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'flip.trees.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'frame square' },
	            React.createElement(
	                skoash.Component,
	                { className: 'content' },
	                React.createElement(skoash.Image, {
	                    className: (0, _classnames2.default)('flip', {
	                        show: _.get(props, 'data.vo.playing')
	                    }),
	                    src: flipEarned
	                }),
	                React.createElement(skoash.Image, {
	                    className: (0, _classnames2.default)('flip', {
	                        show: !_.get(props, 'data.vo.playing')
	                    }),
	                    src: flipStatic
	                }),
	                React.createElement(skoash.Image, {
	                    className: 'title',
	                    src: CMWN.MEDIA.IMAGE + 'flip.text.png'
	                }),
	                React.createElement(
	                    'p',
	                    null,
	                    'Thanks for taking',
	                    React.createElement('br', null),
	                    'the time to learn',
	                    React.createElement('br', null),
	                    'about how you',
	                    React.createElement('br', null),
	                    'can help the',
	                    React.createElement('br', null),
	                    'environment!'
	                )
	            )
	        )
	    );
	};

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var flipEarned = CMWN.MEDIA.BASE + 'Flips/Wastepro%20Flip/WP%20-%20Animated%20Earned%20Flip/WP.AnimatedEarnedFlip.gif';

		var flipStatic = CMWN.MEDIA.BASE + 'Flips/Wastepro%20Flip/WP%20-%20Static%20Image%20Flip/WP.StaticAnimatedFlip.gif';

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QuitScreen = function (_skoash$Screen) {
	    _inherits(QuitScreen, _skoash$Screen);

	    function QuitScreen() {
	        _classCallCheck(this, QuitScreen);

	        return _possibleConstructorReturn(this, (QuitScreen.__proto__ || Object.getPrototypeOf(QuitScreen)).apply(this, arguments));
	    }

	    _createClass(QuitScreen, [{
	        key: 'okay',
	        value: function okay() {
	            skoash.trigger('quit');
	        }
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            this.close();
	            skoash.trigger('menuClose', {
	                id: this.props.id
	            });
	        }
	    }, {
	        key: 'renderAssets',
	        value: function renderAssets() {
	            if (this.props.assets) {
	                return this.props.assets.map(function (asset, key) {
	                    return React.createElement(skoash.Audio, _extends({}, asset.props, {
	                        ref: asset.ref || asset.props['data-ref'] || 'asset-' + key,
	                        key: key,
	                        'data-ref': key
	                    }));
	                });
	            }

	            return null;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { id: this.props.id, className: 'screen ' + this.getClassNames() },
	                this.renderAssets(),
	                React.createElement(
	                    'div',
	                    { className: 'center' },
	                    React.createElement(
	                        'div',
	                        { className: 'frame' },
	                        React.createElement(
	                            'h2',
	                            null,
	                            'Are you sure you',
	                            React.createElement('br', null),
	                            'want to quit?'
	                        ),
	                        React.createElement(
	                            'h3',
	                            null,
	                            'Your game progress will be saved'
	                        ),
	                        React.createElement('button', { className: 'quit-yes', onClick: this.okay.bind(this) }),
	                        React.createElement('button', { className: 'quit-no', onClick: this.cancel.bind(this) })
	                    )
	                )
	            );
	        }
	    }]);

	    return QuitScreen;
	}(skoash.Screen);

	exports.default = React.createElement(QuitScreen, {
	    id: 'quit'
		});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzdGUtYnVzdGVycy9haS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMGQzZTU2OTE4NGNjMWMyNGRlOCIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvZGV2LXZhcmlhYmxlcy5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9qcy9tYWtlX21lZGlhX2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi93YXN0ZS1idXN0ZXJzL2NvbmZpZy5qc29uIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy90aXRsZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2VhdF9hbmRfZHJpbmtfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZWFybl9hbmRfY3JlYXRlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvd2hhdF9oYXBwZW5zX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvYmV0dGVyX3dheXNfc2NyZWVuLmpzIiwid2VicGFjazovLy8uLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2NsaWNrX2NhcmRzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvY2FyZHNfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy90aW1lX3RvX2NvbGxlY3Rfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZXRzX3BsYXlfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9yZW1lbWJlcl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX29uZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3BoYXNlcl9nYW1lX3NjcmVlbl9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9uZWlnaGJvcmhvb2Rfd2FzdGVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy90eXBlc19vZl93YXN0ZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3dhc3RlX3NvcnRfY2VudGVyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvc29ydGluZ19sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9zb3J0aW5nX2dhbWVfY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2FscGhhYmV0LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvaXMtdmFsaWQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhbm5vbi8wLjIuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3NvcnRpbmdfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvc29ydGluZ19sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3Rha2VfYWN0aW9uX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvZmxpcF9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4vMC4xLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KGNhbGxiYWNrKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHR0cnkge1xuIFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSAxMDAwMDtcbiBcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdH0gY2F0Y2goZXJyKSB7XG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGVycik7XG4gXHRcdH1cbiBcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRpZihyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdGNhbGxiYWNrKCk7XG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdH0gY2F0Y2goZSkge1xuIFx0XHRcdFx0XHRjYWxsYmFjayhlKTtcbiBcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgdXBkYXRlKTtcbiBcdFx0XHR9XG4gXHRcdH07XG4gXHR9XG5cblxuIFx0Ly8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYmVmNDViMC9zcmMvc2hhcmVkL3V0aWxzL2NhbkRlZmluZVByb3BlcnR5LmpzXG4gXHR2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcbiBcdHRyeSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgXCJ4XCIsIHtcbiBcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge31cbiBcdFx0fSk7XG4gXHRcdGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcbiBcdH0gY2F0Y2goeCkge1xuIFx0XHQvLyBJRSB3aWxsIGZhaWwgb24gZGVmaW5lUHJvcGVydHlcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIyMGQzZTU2OTE4NGNjMWMyNGRlOFwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxuIFx0XHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9IGVsc2UgaG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpKSB7XG4gXHRcdFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xuIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIChmdW5jdGlvbihuYW1lKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9KG5hbWUpKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRmbltuYW1lXSA9IF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gZW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCwgZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG51bGwsIGZuKTtcbiBcdFx0XHRcdH0gZmluYWxseSB7XG4gXHRcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0fVxuXG4gXHRcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImVcIiwge1xuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdHZhbHVlOiBlbnN1cmVcbiBcdFx0XHR9KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRmbi5lID0gZW5zdXJlO1xuIFx0XHR9XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjaztcbiBcdFx0XHRcdGVsc2VcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2s7XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJudW1iZXJcIilcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2VcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90Q2FsbGJhY2s7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAoK2lkKSArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHksIGNhbGxiYWNrKSB7XG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHRpZih0eXBlb2YgYXBwbHkgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBmYWxzZTtcbiBcdFx0XHRjYWxsYmFjayA9IGFwcGx5O1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG4gXHRcdFx0fTtcbiBcdFx0fVxuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0aG90RG93bmxvYWRNYW5pZmVzdChmdW5jdGlvbihlcnIsIHVwZGF0ZSkge1xuIFx0XHRcdGlmKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIG51bGwpO1xuIFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdH1cblxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdXBkYXRlLmMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcFt1cGRhdGUuY1tpXV0gPSB0cnVlO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgY2FsbGJhY2sgPSBob3RDYWxsYmFjaztcbiBcdFx0aG90Q2FsbGJhY2sgPSBudWxsO1xuIFx0XHRpZighY2FsbGJhY2spIHJldHVybjtcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUsIGNhbGxiYWNrKTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucywgY2FsbGJhY2spIHtcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpIHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0aWYodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdGNhbGxiYWNrID0gb3B0aW9ucztcbiBcdFx0XHRvcHRpb25zID0ge307XG4gXHRcdH0gZWxzZSBpZihvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiKSB7XG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xuIFx0XHRcdH07XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGUpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW21vZHVsZV07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxuIFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyBtb2R1bGVJZCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZihtb2R1bGVJZCA9PT0gMCkge1xuIFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIG1vZHVsZUlkICsgXCIgaW4gXCIgKyBwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiBbb3V0ZGF0ZWRNb2R1bGVzLCBvdXRkYXRlZERlcGVuZGVuY2llc107XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdHZhciByZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmKCFyZXN1bHQpIHtcbiBcdFx0XHRcdFx0aWYob3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzdWx0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0WzBdKTtcbiBcdFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gcmVzdWx0WzFdKSB7XG4gXHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRbMV0sIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdFsxXVttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHR2YXIgaWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0dmFyIGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdHZhciBjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XG4gXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGNiKG91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSBpZighZXJyb3IpXG4gXHRcdFx0XHRcdGVycm9yID0gZXJyO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlLFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiBob3RDdXJyZW50UGFyZW50cyxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIwZDNlNTY5MTg0Y2MxYzI0ZGU4Iiwid2luZG93LkVOVklST05NRU5UID0ge1xuICAgIE1FRElBOiAnaHR0cHM6Ly9tZWRpYS1zdGFnaW5nLmNoYW5nZW15d29ybGRub3cuY29tL2YvJ1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9qcy9kZXYtdmFyaWFibGVzLmpzIiwidW5kZWZpbmVkXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICIsIihmdW5jdGlvbiAoZ2FtZU5hbWUpIHtcbiAgICAvLyByZW1vdmUgd2luZG93Lk1FRElBIG9uY2Ugbm8gZ2FtZXMgcmVmZXJlbmNlIGl0XG4gICAgdmFyIE1FRElBID0gd2luZG93Lk1FRElBID0ge1xuICAgICAgICBCQVNFOiBFTlZJUk9OTUVOVC5NRURJQVxuICAgIH07XG5cbiAgICBNRURJQS5HQU1FID0gTUVESUEuQkFTRSArICdHYW1lcy8nICsgZ2FtZU5hbWUgKyAnLyc7XG4gICAgTUVESUEuRUZGRUNUID0gTUVESUEuR0FNRSArICdTb3VuZEFzc2V0cy9lZmZlY3RzLyc7XG4gICAgTUVESUEuVk8gPSBNRURJQS5HQU1FICsgJ1NvdW5kQXNzZXRzL3Zvcy8nO1xuICAgIE1FRElBLklNQUdFID0gTUVESUEuR0FNRSArICdJbWFnZUFzc2V0cy8nO1xuICAgIE1FRElBLlNQUklURSA9IE1FRElBLkdBTUUgKyAnU3ByaXRlc0FuaW1hdGlvbnMvJztcblxuICAgIE1FRElBLk1PQ0sgPSB7fTtcbiAgICBNRURJQS5NT0NLLkdBTUUgPSBNRURJQS5CQVNFICsgJ0dhbWVzL21vY2tHYW1lLyc7XG4gICAgTUVESUEuTU9DSy5FRkZFQ1QgPSBNRURJQS5NT0NLLkdBTUUgKyAnU291bmRBc3NldHMvZWZmZWN0cy8nO1xuICAgIE1FRElBLk1PQ0suVk8gPSBNRURJQS5NT0NLLkdBTUUgKyAnU291bmRBc3NldHMvdm9zLyc7XG4gICAgTUVESUEuTU9DSy5JTUFHRSA9IE1FRElBLk1PQ0suR0FNRSArICdJbWFnZUFzc2V0cy8nO1xuICAgIE1FRElBLk1PQ0suU1BSSVRFID0gTUVESUEuTU9DSy5HQU1FICsgJ1Nwcml0ZXNBbmltYXRpb25zLyc7XG5cbiAgICB3aW5kb3cuQ01XTi5NRURJQSA9IE1FRElBO1xufSh3aW5kb3cuQ01XTi5nYW1lRm9sZGVyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvanMvbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMSc7XG5cbmltcG9ydCBpT1NTY3JlZW4gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xJztcbmltcG9ydCBUaXRsZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdGl0bGVfc2NyZWVuJztcbmltcG9ydCBFYXRBbmREcmlua1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZWF0X2FuZF9kcmlua19zY3JlZW4nO1xuaW1wb3J0IExlYXJuQW5kQ3JlYXRlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZWFybl9hbmRfY3JlYXRlX3NjcmVlbic7XG5pbXBvcnQgV2hhdEhhcHBlbnNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3doYXRfaGFwcGVuc19zY3JlZW4nO1xuaW1wb3J0IEJldHRlcldheXNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2JldHRlcl93YXlzX3NjcmVlbic7XG5pbXBvcnQgQ2xpY2tDYXJkc1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvY2xpY2tfY2FyZHNfc2NyZWVuJztcbmltcG9ydCBDYXJkc1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvY2FyZHNfc2NyZWVuJztcbmltcG9ydCBUaW1lVG9Db2xsZWN0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90aW1lX3RvX2NvbGxlY3Rfc2NyZWVuJztcbmltcG9ydCBMZXRzUGxheVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGV0c19wbGF5X3NjcmVlbic7XG5pbXBvcnQgUmVtZW1iZXJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlbWVtYmVyX3NjcmVlbic7XG5pbXBvcnQgTGV2ZWxPbmVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IExldmVsVHdvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBMZXZlbFRocmVlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IExldmVsRm91clNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IExldmVsRml2ZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGV2ZWxfZml2ZV9zY3JlZW4nO1xuLy8gaW1wb3J0IEJvbnVzUm91bmRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2JvbnVzX3JvdW5kX3NjcmVlbic7XG5pbXBvcnQgTmVpZ2hib3Job29kV2FzdGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL25laWdoYm9yaG9vZF93YXN0ZV9zY3JlZW4nO1xuaW1wb3J0IFR5cGVzT2ZXYXN0ZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdHlwZXNfb2Zfd2FzdGVfc2NyZWVuJztcbmltcG9ydCBXYXN0ZVNvcnRDZW50ZXJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3dhc3RlX3NvcnRfY2VudGVyX3NjcmVlbic7XG5pbXBvcnQgU29ydGluZ0xldmVsT25lU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9zb3J0aW5nX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IFNvcnRpbmdMZXZlbFR3b1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvc29ydGluZ19sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBTb3J0aW5nTGV2ZWxUaHJlZVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvc29ydGluZ19sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IFRha2VBY3Rpb25TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3Rha2VfYWN0aW9uX3NjcmVlbic7XG5pbXBvcnQgRmxpcFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmxpcF9zY3JlZW4nO1xuXG5pbXBvcnQgUXVpdFNjcmVlbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9xdWl0X3NjcmVlbi8wLjEnO1xuXG5za29hc2guc3RhcnQoXG4gICAgPHNrb2FzaC5HYW1lXG4gICAgICAgIGNvbmZpZz17Y29uZmlnfVxuICAgICAgICBsb2FkZXI9ezxMb2FkZXIgLz59XG4gICAgICAgIHNjcmVlbnM9e1tcbiAgICAgICAgICAgIGlPU1NjcmVlbixcbiAgICAgICAgICAgIFRpdGxlU2NyZWVuLFxuICAgICAgICAgICAgRWF0QW5kRHJpbmtTY3JlZW4sXG4gICAgICAgICAgICBMZWFybkFuZENyZWF0ZVNjcmVlbixcbiAgICAgICAgICAgIFdoYXRIYXBwZW5zU2NyZWVuLFxuICAgICAgICAgICAgQmV0dGVyV2F5c1NjcmVlbixcbiAgICAgICAgICAgIENsaWNrQ2FyZHNTY3JlZW4sXG4gICAgICAgICAgICBDYXJkc1NjcmVlbixcbiAgICAgICAgICAgIFRpbWVUb0NvbGxlY3RTY3JlZW4sXG4gICAgICAgICAgICBMZXRzUGxheVNjcmVlbixcbiAgICAgICAgICAgIFJlbWVtYmVyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxPbmVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFR3b1NjcmVlbixcbiAgICAgICAgICAgIExldmVsVGhyZWVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbEZvdXJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbEZpdmVTY3JlZW4sXG4gICAgICAgICAgICAvLyBCb251c1JvdW5kU2NyZWVuLFxuICAgICAgICAgICAgTmVpZ2hib3Job29kV2FzdGVTY3JlZW4sXG4gICAgICAgICAgICBUeXBlc09mV2FzdGVTY3JlZW4sXG4gICAgICAgICAgICBXYXN0ZVNvcnRDZW50ZXJTY3JlZW4sXG4gICAgICAgICAgICBTb3J0aW5nTGV2ZWxPbmVTY3JlZW4sXG4gICAgICAgICAgICBTb3J0aW5nTGV2ZWxUd29TY3JlZW4sXG4gICAgICAgICAgICBTb3J0aW5nTGV2ZWxUaHJlZVNjcmVlbixcbiAgICAgICAgICAgIFRha2VBY3Rpb25TY3JlZW4sXG4gICAgICAgICAgICBGbGlwU2NyZWVuLFxuICAgICAgICBdfVxuICAgICAgICBtZW51cz17e1xuICAgICAgICAgICAgcXVpdDogUXVpdFNjcmVlbixcbiAgICAgICAgfX1cbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgICAgICA8c2tvYXNoLkZvbnQgbmFtZT1cIlNvdXJjZSBTYW5zIFByb1wiIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuU1BSSVRFICsgJ2dhbWUxLnRpbWVsZXZlbHNjb3JlLnBuZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuU1BSSVRFICsgJ2dhbWUxLm1ldGVyaWNvbnMucG5nJ31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5TUFJJVEUgKyAnZnJhbWVzLmludHJvLTAxLnBuZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuU1BSSVRFICsgJ25hdi5wbmcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBzcmM9e01FRElBLlNQUklURSArICdCS0cuMS5qcGcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBzcmM9e01FRElBLklNQUdFICsgJ0JLRy4xLmpwZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuSU1BR0UgKyAnQktHLjIuanBnJ31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5JTUFHRSArICdCS0cuMy5qcGcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnT3BlbmluZ1NlcXVlbmNlLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0NhcmRTZWN0aW9uLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0JLRy5tcDMnfVxuICAgICAgICAgICAgICAgIGxvb3BcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJiYWNrZ3JvdW5kXCJcbiAgICAgICAgICAgICAgICBzcmM9e01FRElBLkVGRkVDVCArICdCb251c1JvdW5kQktHLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0JLR1dhc3RlU29ydGluZ0dhbWUubXAzJ31cbiAgICAgICAgICAgICAgICBsb29wXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnTmV4dExldmVsLm1wMyd9XG4gICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cImJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgIHNyYz17TUVESUEuRUZGRUNUICsgJ0ZsaXBTY3JlZW4ubXAzJ31cbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgIHJlZj1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnQWxsQ2xpY2subXAzJ31cbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgIHJlZj1cInNjcmVlbi1jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgc3JjPXtNRURJQS5FRkZFQ1QgKyAnTmV4dEFwcGVhci5tcDMnfVxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdGl0bGVcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBldmVyeWRheVwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGNhcmRzXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnLTFcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2ctMlwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZy0zXCIgLz4sXG4gICAgICAgIF19XG4gICAgICAgIGdldEJhY2tncm91bmRJbmRleD17KGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2lvcy1zcGxhc2gnOiByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2VhdC1hbmQtZHJpbmsnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlYXJuLWFuZC1jcmVhdGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3doYXQtaGFwcGVucyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYmV0dGVyLXdheXMnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICBjYXNlICdjbGljay1jYXJkcyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnY2FyZHMnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3RpbWUtdG8tY29sbGVjdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbGV0cy1wbGF5JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1lbWJlcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BoYXNlci1sZXZlbC0xJzpcbiAgICAgICAgICAgICAgICBjYXNlICdwaGFzZXItbGV2ZWwtMic6XG4gICAgICAgICAgICAgICAgY2FzZSAncGhhc2VyLWxldmVsLTMnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3BoYXNlci1sZXZlbC00JzpcbiAgICAgICAgICAgICAgICBjYXNlICdwaGFzZXItbGV2ZWwtNSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvbnVzLXJvdW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmVpZ2hib3Job29kLXdhc3RlJzpcbiAgICAgICAgICAgICAgICBjYXNlICd0eXBlcy1vZi13YXN0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NvcnRpbmctbGV2ZWwtMSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc29ydGluZy1sZXZlbC0yJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzb3J0aW5nLWxldmVsLTMnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgICAgICAgICBjYXNlICd0YWtlLWFjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZsaXAnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgcmVuZGVyTWVudT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiByZWY9XCJwYXVzZVwiIGNsYXNzTmFtZT1cInBhdXNlXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImNsb3NlXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0b3Iub3Blbk1lbnUuYmluZCh0aGlzLCB7aWQ6ICdxdWl0J30pfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAvPlxuKTtcblxuaWYgKG1vZHVsZS5ob3QpIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiaWRcIjogXCJ3YXN0ZS1idXN0ZXJzXCIsXG5cdFwidmVyc2lvblwiOiAxLFxuXHRcInNrb2FzaFwiOiBcIjEuMS4zXCIsXG5cdFwiaGVhZF9pbmplY3Rpb25cIjogXCI8bGluayBocmVmPSdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9TWNMYXJlbicgcmVsPSdzdHlsZXNoZWV0Jz5cIixcblx0XCJkaW1lbnNpb25zXCI6IHtcblx0XHRcIndpZHRoXCI6IDk2MCxcblx0XHRcImhlaWdodFwiOiA1NDBcblx0fVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3dhc3RlLWJ1c3RlcnMvY29uZmlnLmpzb25cbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cImxvYWRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPkxvYWRpbmchPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiaW9zLXNwbGFzaFwiXG4gICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgIGNvbXBsZXRlRGVsYXk9ezYwMDB9XG4gICAgICAgICAgICBuZXh0RGVsYXk9ezMwMDB9XG4gICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICAgIGhpZGVQcmV2XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPVwiLi4vc2hhcmVkL2ltYWdlcy9pb3Nfc3RhcnRfYmFsbC5wbmdcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCIuLi9zaGFyZWQvaW1hZ2VzL2lvc19zdGFydF9iYWxsX2FuaW0uZ2lmXCIgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInRpdGxlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdQTFRsb2dvLnBuZyd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibG9nb1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICd0aXRsZS5wbmcnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpdGxlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiZWF0LWFuZC1kcmlua1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnRXZlcnlEYXkubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZS0xXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiaW50cm8taW1hZ2UtMVwiIC8+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIEV2ZXJ5IGRheSwgd2U8YnIvPlxuICAgICAgICAgICAgICAgICAgICBlYXQgYW5kIGRyaW5rLi4uXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9lYXRfYW5kX2RyaW5rX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwibGVhcm4tYW5kLWNyZWF0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnQW5kRXZlcnkubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZS0xXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiaW50cm8taW1hZ2UtMlwiIC8+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIEFuZCBldmVyeWRheSwgd2U8YnIvPlxuICAgICAgICAgICAgICAgICAgICB1c2UgdGhpbmdzIHRvIGhlbHA8YnIvPlxuICAgICAgICAgICAgICAgICAgICB1cyBsZWFybiBhbmQgY3JlYXRlLi4uXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZWFybl9hbmRfY3JlYXRlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwid2hhdC1oYXBwZW5zXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdCdXRXaGF0Lm1wMyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiaW50cm8taW1hZ2UtMVwiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJpbnRyby1pbWFnZS0yXCIgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImZyYW1lLTJcIj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgQnV0IHdoYXQgaGFwcGVucyB0byB0aGUgaXRlbXM8YnIvPlxuICAgICAgICAgICAgICAgICAgICB3ZSBkb24ndCBuZWVkIGFueW1vcmU/XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgV2hlcmUgZG8gdGhleSBhbGwgZ28/XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvd2hhdF9oYXBwZW5zX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cImJldHRlci13YXlzXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdBcmVUaGVyZS5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLkVGRkVDVCArICdZZXNTaG91dC5tcDMnfVxuICAgICAgICAgICAgICAgICAgICBwbGF5VGFyZ2V0PVwieWVzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImZyYW1lLTFcIj5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJpbnRyby1pbWFnZS0zXCIgLz5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgQXJlIHRoZXJlIGJldHRlciB3YXlzPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgWU9VIGNhbiBrZWVwIHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgb3V0IG9mIGEgbGFuZGZpbGw/XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygneWVzIGFuaW1hdGVkJywge1xuICAgICAgICAgICAgICAgICAgICBib3VuY2U6IF8uZ2V0KHByb3BzLCAnZGF0YS55ZXMucGxheWluZycpXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ3llcy5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvYmV0dGVyX3dheXNfc2NyZWVuLmpzIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L2NsYXNzbmFtZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiY2xpY2stY2FyZHNcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0NsaWNrVGhlQ2FyZHMubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZnJhbWVcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdmcmFtZS5zcXVhcmUucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVjeWNsZVwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ3JlY3ljbGUudHJhbnNwYXJlbmN5LnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyYXNoXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnY2FyZHMudHJhc2gucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2dhbWUxLjQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInR1cnRsZVwiIC8+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBDbGljayB0aGUgY2FyZHM8YnIvPlxuICAgICAgICAgICAgICAgIHRvIGZpbmQgb3V0IGhvdzxici8+XG4gICAgICAgICAgICAgICAgWU9VIGNhbiBiZSBhPGJyLz5cbiAgICAgICAgICAgICAgICBXYXN0ZSBCdXN0ZXIhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2NsaWNrX2NhcmRzX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiY2FyZHNcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjEucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjIucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjMucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2NhcmRzLjQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnY2FyZC5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdjYXJkcy50cmFzaC5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnNlbGVjdGFibGUudGFyZ2V0LnByb3BzLm1lc3NhZ2UnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICByZWY9XCJyZWR1Y2VcIlxuICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ1JlZHVjZVN0cm9uZy5tcDMnfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgIHJlZj1cInJldXNlXCJcbiAgICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdSZXVzZVN0cm9uZy5tcDMnfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgIHJlZj1cInJlY3ljbGVcIlxuICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ1JlY3ljbGVTdHJvbmcubXAzJ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhQ29sbGVjdGlvbj5cbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIGRhdGFUYXJnZXQ9XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RDbGFzcz1cIkhJR0hMSUdIVEVEXCJcbiAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHR5cGU9XCJsaVwiIGNvcnJlY3Q9e3RydWV9IG1lc3NhZ2U9XCJyZWR1Y2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBiXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUgYVwiPjxkaXYvPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCB0eXBlPVwibGlcIiBjb3JyZWN0PXt0cnVlfSBtZXNzYWdlPVwicmV1c2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBiXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUgYVwiPjxkaXYvPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCB0eXBlPVwibGlcIiBjb3JyZWN0PXt0cnVlfSBtZXNzYWdlPVwicmVjeWNsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGJcIj48ZGl2Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBhXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2NhcmRzX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwidGltZS10by1jb2xsZWN0XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdJdHNUaW1lVG9Db2xsZWN0Lm1wMyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlNQUklURSArICdnYW1lMS5pbnRyby50cmVlcy5wbmcnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWUgc3F1YXJlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIEl0J3MgVGltZSBUbyBDb2xsZWN0IVxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5hdmlnYXRlIHRoZSBuZWlnaGJvcmhvb2Q8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGNvbGxlY3QgYWxsIG9mIHRoZSB3YXN0ZSBiYWdzLjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBMb29rIGZvciBXYXN0ZSBUcnVja3M8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgdG8gZHVtcCB5b3VyIGJhc2tldC5cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydWNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFzaFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJlZS0xXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJlZS0yXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHVydGxlXCIgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvdGltZV90b19jb2xsZWN0X3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwibGV0cy1wbGF5XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdMZXRzX1BsYXkubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2dhbWUxLmludHJvLnRyZWVzLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZSBzcXVhcmVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICAgICAgTGV0J3MgUGxheSBhIEdhbWUhXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgV2F0Y2ggT3V0ITxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBJZiB5b3UgbWlzcyBhIHdhc3RlIGJhZyBpdCBhZmZlY3RzPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBoZWFsdGggb2YgdGhlIGVudmlyb25tZW50ITxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgSGVyZSBpcyBhIGhpbnQhIEJlIHN1cmUgdG8gdW5sb2FkPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHlvdXIgYmFza2V0IHRvIGFjY2Vzczxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW4gd2FzdGUgYmFncyE8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgTGV0J3MgY2xlYW4gdXAhXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmVlLTFcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmVlLTJcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVja1wiIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldHNfcGxheV9zY3JlZW4uanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInJlbWVtYmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdSZW1lbWJlci5tcDMnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5TUFJJVEUgKyAnZ2FtZTEuaW50cm8udHJlZXMucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lIHNxdWFyZVwiPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFubmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2Jhbm5lci5wbmcnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZW1lbWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdyZW1lbWJlci4xLnBuZyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICBBbHdheXMgY2hlY2sgd2l0aDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBhbiBhZHVsdCBiZWZvcmUgcGlja2luZzxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXR0ZXIgdXAgb3V0c2lkZSFcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZWUtMVwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZWUtMlwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld3NwYXBlclwiIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3JlbWVtYmVyX3NjcmVlbi5qcyIsImltcG9ydCBQaGFzZXJHYW1lU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vcGhhc2VyX2dhbWVfc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gUGhhc2VyR2FtZVNjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIGludHJvVk86ICdSZXNwb25zaWJseScsXG4gICAgICAgIGZhY3QxVk86ICdzcGlsbHMnLFxuICAgICAgICBmYWN0MlZPOiAnVXRlbnNpbHMnLFxuICAgICAgICBmYWN0M1ZPOiAnU2VwYXJhdGUnLFxuICAgICAgICBpbnRyb0NvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIE9uIHRoaXMgbGV2ZWwsIGJlIHN1cmUgdG88YnIvPlxuICAgICAgICAgICAgICAgIGNvbGxlY3QgYWxsIHRoZSA8c3BhbiBjbGFzc05hbWU9XCJ0cnVja1wiIC8+IHRvPGJyLz5cbiAgICAgICAgICAgICAgICByZXZlYWwgdGlwcyBvbiBob3c8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHJlc3BvbnNpYmx5PGJyLz5cbiAgICAgICAgICAgICAgICBkZWFsIHdpdGggd2FzdGUhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGNvbXBsZXRlQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91IGNhbiBub3cgdXNlIHRoZSB0aXBzIHlvdSd2ZTxici8+XG4gICAgICAgICAgICAgICAgbGVhcm5lZCB0byBoZWxwIHJlZHVjZTxici8+XG4gICAgICAgICAgICAgICAgdGhlIGFtb3VudCBvZiB3YXN0ZTxici8+XG4gICAgICAgICAgICAgICAgY3JlYXRlZCBpbiB0aGUgd29ybGQhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QxQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIFVzZSBMZXNzIFBhcGVyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogVGVhciBvZmYgb25lIHBhcGVyPGJyLz5cbiAgICAgICAgICAgICAgICB0b3dlbCBzaGVldCBhdCBhIHRpbWU8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHdpcGUgdXAgc3BpbGxzLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0MkNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBVc2UgTWV0YWwgVXRlbnNpbHNcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBSZXVzYWJsZSBtZXRhbCBzcG9vbnMsPGJyLz5cbiAgICAgICAgICAgICAgICBrbml2ZXMgYW5kIGZvcmtzIGFyZTxici8+XG4gICAgICAgICAgICAgICAgdGhlIHdheSB0byBnbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDNDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgU29ydCBSZWN5Y2xhYmxlcyBmcm9tIFdhc3RlXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogQ3JlYXRlIG9yIGJ1eSBzcGVjaWFsIGJpbnM8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHNlcGFyYXRlIHRoZSBtZXRhbCw8YnIvPlxuICAgICAgICAgICAgICAgIGdsYXNzLCBwYXBlciBhbmQgcGxhc3RpYzxici8+XG4gICAgICAgICAgICAgICAgZnJvbSB5b3VyIHdhc3RlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgdmFyIHN0YXJ0U2NyZWVuO1xuICAgIHZhciBvblNjcmVlblN0YXJ0O1xuICAgIHZhciBvblNjcmVlblN0b3A7XG4gICAgdmFyIGdldEdhbWVTcmM7XG4gICAgdmFyIG9uT3BlblJldmVhbDtcbiAgICB2YXIgb25DbG9zZVJldmVhbDtcbiAgICB2YXIgb25SZXNwb25kO1xuICAgIHZhciBvblRpbWVyQ29tcGxldGU7XG5cbiAgICBzdGFydFNjcmVlbiA9IGZ1bmN0aW9uIChzY3JlZW5TdGFydCA9IHRydWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzY3JlZW5TdGFydCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG9uU2NyZWVuU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBnYW1lRGF0YSA9IF8uZ2V0KHByb3BzLCAnZ2FtZVN0YXRlLmRhdGEuZ2FtZScpO1xuXG4gICAgICAgIHN0YXJ0U2NyZWVuLmNhbGwodGhpcyk7XG5cbiAgICAgICAgaWYgKF8uZ2V0KGdhbWVEYXRhLCBgbGV2ZWxzLiR7b3B0cy5sZXZlbH0uY29tcGxldGVgLCBmYWxzZSkpIHtcbiAgICAgICAgICAgIF8uYXNzaWduKGdhbWVEYXRhLCB7XG4gICAgICAgICAgICAgICAgbGV2ZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIFtvcHRzLmxldmVsXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiBbJ2dhbWUnXSxcbiAgICAgICAgICAgIGRhdGE6IF8uZGVmYXVsdHMoZ2FtZURhdGEsIHtcbiAgICAgICAgICAgICAgICBoaXRzOiAwLFxuICAgICAgICAgICAgICAgIGJhZ0NvdW50OiAwLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgICAgICAgIGxpdmVzOiAxLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBvblNjcmVlblN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0U2NyZWVuLmNhbGwodGhpcywgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBbJ2dhbWUnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhZ0NvdW50OiAwLFxuICAgICAgICAgICAgICAgICAgICBsZXZlbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRzLmxldmVsXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc3RhcnRTY3JlZW4uY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGdldEdhbWVTcmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghXy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc2NyZWVuU3RhcnQnKSkgcmV0dXJuO1xuICAgICAgICByZXR1cm4gYC4uL3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2luZGV4Lmh0bWw/dj0ke29wdHMubGV2ZWx9YDtcbiAgICB9O1xuXG4gICAgb25PcGVuUmV2ZWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnZC1wYWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF1c2U6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH07XG5cbiAgICBvbkNsb3NlUmV2ZWFsID0gZnVuY3Rpb24gKHByZXZNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNsb3NlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiAnZC1wYWQnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHBhdXNlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogWydnYW1lJ10sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGV2ZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIFtvcHRzLmxldmVsXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocHJldk1lc3NhZ2UgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHNrb2FzaC5TY3JlZW4ucHJvdG90eXBlLmdvdG8ocGFyc2VJbnQoa2V5LCAxMCkgKyAxKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBvblJlc3BvbmQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgdHJ1Y2tzID0gXy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LnRydWNrc2ApO1xuICAgICAgICB2YXIgY29tcGxldGUgPSBfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLmdhbWUubGV2ZWxzLiR7b3B0cy5sZXZlbH0uY29tcGxldGVgKTtcblxuICAgICAgICBpZiAoXy5nZXQob3B0aW9ucywgJ3VwZGF0ZUdhbWVTdGF0ZS5kYXRhLmdhbWUubGl2ZXMnKSA9PT0gMCkge1xuICAgICAgICAgICAgc3RhcnRTY3JlZW4uY2FsbCh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBbJ2dhbWUnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhZ0NvdW50OiAwLFxuICAgICAgICAgICAgICAgICAgICBsaXZlczogMSxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbb3B0cy5sZXZlbF06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLmdldChvcHRpb25zLCBgdXBkYXRlR2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5zdGFydGApICYmXG4gICAgICAgICAgICBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnZC1wYWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF1c2U6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcGxldGUgJiYgXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC53YXNPcGVuZWQnKSAhPT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbjogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgd2FzT3BlbmVkOiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb21wbGV0ZSAmJiB0cnVja3MgJiYgXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC53YXNPcGVuZWQnKSAhPT0gJ2ZhY3QtJyArIHRydWNrcykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbjogJ2ZhY3QtJyArIHRydWNrcyxcbiAgICAgICAgICAgICAgICAgICAgd2FzT3BlbmVkOiAnZmFjdC0nICsgdHJ1Y2tzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG9uVGltZXJDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCBgZ2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5jb21wbGV0ZWAsIGZhbHNlKSkgcmV0dXJuO1xuXG4gICAgICAgIHN0YXJ0U2NyZWVuLmNhbGwodGhpcywgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBbJ2dhbWUnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhZ0NvdW50OiAwLFxuICAgICAgICAgICAgICAgICAgICBsaXZlczogXy5nZXQocHJvcHMsICdnYW1lU3RhdGUuZGF0YS5nYW1lLmxpdmVzJywgMSkgLSAxIHx8IDEsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgW29wdHMubGV2ZWxdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzdGFydFNjcmVlbi5jYWxsKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD17YHBoYXNlci1sZXZlbC0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgIG9uU3RhcnQ9e29uU2NyZWVuU3RhcnR9XG4gICAgICAgICAgICBvblN0b3A9e29uU2NyZWVuU3RvcH1cbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5HYW1lRW1iZWRkZXJcbiAgICAgICAgICAgICAgICBzcmM9e2dldEdhbWVTcmMoKX1cbiAgICAgICAgICAgICAgICBjb250cm9sbGVyPXtfLmdldChwcm9wcywgJ2RhdGEuZC1wYWQnKX1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17Xy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LmNvbXBsZXRlYCwgZmFsc2UpfVxuICAgICAgICAgICAgICAgIGRhdGE9e18uZ2V0KHByb3BzLCAnZ2FtZVN0YXRlLmRhdGEuZ2FtZScsIHt9KX1cbiAgICAgICAgICAgICAgICBvblJlc3BvbmQ9e29uUmVzcG9uZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLlRpbWVyXG4gICAgICAgICAgICAgICAgY291bnREb3duXG4gICAgICAgICAgICAgICAgdGltZW91dD17MTIwMDAwfVxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e29uVGltZXJDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICBwYXVzZT17XG4gICAgICAgICAgICAgICAgICAgIF8uZ2V0KHByb3BzLCBgZ2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5zdGFydGAsIGZhbHNlKSAmJlxuICAgICAgICAgICAgICAgICAgICBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdW1lPXshXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgZmFsc2UpfVxuICAgICAgICAgICAgICAgIHN0b3A9e18uZ2V0KHByb3BzLCBgZ2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5jb21wbGV0ZWAsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17Xy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LmNvbXBsZXRlYCwgZmFsc2UpfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e18uZ2V0KHByb3BzLCBgZ2FtZVN0YXRlLmRhdGEuZ2FtZS5sZXZlbHMuJHtvcHRzLmxldmVsfS5zdGFydGAsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICByZXN0YXJ0PXtfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLmdhbWUubGV2ZWxzLiR7b3B0cy5sZXZlbH0uc3RhcnRgLCBmYWxzZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJib3R0b21cIlxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLmdhbWUubGV2ZWxzLiR7b3B0cy5sZXZlbH0uY29tcGxldGVgLCBmYWxzZSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaWZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9ezQgLSBfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5kYXRhLmdhbWUuaGl0cycsIDApIHx8IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFnc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5kYXRhLmdhbWUuYmFnQ291bnQnLCAwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtaWRkbGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGV2ZWwtc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17Xy5nZXQocHJvcHMsICdnYW1lU3RhdGUuZGF0YS5nYW1lLnNjb3JlJywgMCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnbGV2ZWwnLCBgbGV2ZWwtJHtvcHRzLmxldmVsfWApfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaXZlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5kYXRhLmdhbWUubGl2ZXMnLCAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0cnVja3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17Xy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS5nYW1lLmxldmVscy4ke29wdHMubGV2ZWx9LnRydWNrc2ApfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guRFBhZCAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDxza29hc2guUmV2ZWFsXG4gICAgICAgICAgICAgICAgb3Blbk9uU3RhcnQ9XCJpbnRyb1wiXG4gICAgICAgICAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgb3BlblJldmVhbD17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgZmFsc2UpfVxuICAgICAgICAgICAgICAgIGNsb3NlUmV2ZWFsPXtfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLmNsb3NlJywgZmFsc2UpfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2VSZXZlYWx9XG4gICAgICAgICAgICAgICAgb25PcGVuPXtvbk9wZW5SZXZlYWx9XG4gICAgICAgICAgICAgICAgbGlzdD17W1xuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiaW50cm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW50cm8gZnJhbWUgc3F1YXJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRzLmludHJvQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiZmFjdC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZhY3QtMSBmcmFtZSBzcXVhcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0cy5mYWN0MUNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImZhY3QtMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmYWN0LTIgZnJhbWUgc3F1YXJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuZmFjdDJDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJmYWN0LTNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmFjdC0zIGZyYW1lIHNxdWFyZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRzLmZhY3QzQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29tcGxldGUgZnJhbWUgc3F1YXJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRzLmNvbXBsZXRlQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmVwbGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlcGxheSBmcmFtZSBzcXVhcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBoYXZlIG5vdCB3b24gdGhpcyBsZXZlbCw8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXQgZG9uJ3Qgd29ycnnigJQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5b3UgaGF2ZSBhbm90aGVyIGNoYW5jZSFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJyl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiaW50cm9cIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLmludHJvVk99Lm1wM2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5WT31MZXZlbF8ke29wdHMubGV2ZWx9Lm1wM2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJmYWN0LTFcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLmZhY3QxVk99Lm1wM2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJmYWN0LTJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLmZhY3QyVk99Lm1wM2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJmYWN0LTNcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLmZhY3QzVk99Lm1wM2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXBsYXlcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99QW5vdGhlcl9DaGFuY2UubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9waGFzZXJfZ2FtZV9zY3JlZW5fY29tcG9uZW50LmpzIiwiaW1wb3J0IFBoYXNlckdhbWVTY3JlZW5Db21wb25lbnQgZnJvbSAnLi9waGFzZXJfZ2FtZV9zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBQaGFzZXJHYW1lU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgaW50cm9WTzogJ2xhbmRmaWxsJyxcbiAgICAgICAgZmFjdDFWTzogJ1BvcnRpb25zJyxcbiAgICAgICAgZmFjdDJWTzogJ1JldXNhYmxlX0JhZ3MnLFxuICAgICAgICBmYWN0M1ZPOiAnUnVsZXMnLFxuICAgICAgICBpbnRyb0NvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEluIHRoaXMgbGV2ZWwsPGJyLz5cbiAgICAgICAgICAgICAgICB5b3UnbGwgZGlzY292ZXIgd2F5czxici8+XG4gICAgICAgICAgICAgICAgdG8ga2VlcCB3YXN0ZTxici8+XG4gICAgICAgICAgICAgICAgb3V0IG9mIHRoZSBsYW5kZmlsbCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgY29tcGxldGVDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBFeGNlbGxlbnQgV29yayE8YnIvPlxuICAgICAgICAgICAgICAgIFJldXNpbmcgY2VydGFpbiBpdGVtcyBpcyBvbmUgb2Y8YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBiZXN0IHdheXMgdG8gcmVkdWNlPGJyLz5cbiAgICAgICAgICAgICAgICB3YXN0ZeKAlGFuZCBpdCBzYXZlczxici8+XG4gICAgICAgICAgICAgICAgeW91IG1vbmV5IHRvbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgZmFjdDFDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgQ2hvb3NlIFNtYWxsZXIgRm9vZCBQb3J0aW9uc1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IFNvbWV0aW1lcyBvdXIgZXllcyBjYW48YnIvPlxuICAgICAgICAgICAgICAgIGJlIGJpZ2dlciB0aGFuIG91ciBzdG9tYWNocyE8YnIvPlxuICAgICAgICAgICAgICAgIE9ubHkgdGFrZSBhcyBtdWNoIGZvb2Q8YnIvPlxuICAgICAgICAgICAgICAgIGFzIHlvdSBjYW4gZWF0LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0MkNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBDYXJyeSBSZXVzYWJsZSBCYWdzXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogS2VlcCBhIGNhbnZhcyBiYWcgd2l0aDxici8+XG4gICAgICAgICAgICAgICAgeW91IHdoZXJldmVyIHlvdSBnbyw8YnIvPlxuICAgICAgICAgICAgICAgIHNvIGlmIHlvdSBzaG9wIHlvdSBjYW48YnIvPlxuICAgICAgICAgICAgICAgIGF2b2lkIHVzaW5nIHBsYXN0aWMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QzQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIERpc2NvdmVyIFJlY3ljbGluZyBSdWxlc1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IEVhY2ggY2l0eSBoYXMgdGhlaXIgb3duPGJyLz5cbiAgICAgICAgICAgICAgICByZWN5Y2xpbmcgcnVsZXMuIERpc2NvdmVyIHRoZTxici8+XG4gICAgICAgICAgICAgICAgcnVsZXMgZm9yIHdoZXJlIHlvdSBsaXZlIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX3R3b19zY3JlZW4uanMiLCJpbXBvcnQgUGhhc2VyR2FtZVNjcmVlbkNvbXBvbmVudCBmcm9tICcuL3BoYXNlcl9nYW1lX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFBoYXNlckdhbWVTY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBpbnRyb1ZPOiAnZmluZF9vdXRfaG93JyxcbiAgICAgICAgZmFjdDFWTzogJ0xlc3NfUGFja2FnaW5nJyxcbiAgICAgICAgLy8gdGhpcyBWTyBuZWVkcyB0byBiZSByZXBsYWNlZFxuICAgICAgICBmYWN0MlZPOiAnUmV1c2FibGVfQmFncycsXG4gICAgICAgIGZhY3QzVk86ICdGcmllbmRzJyxcbiAgICAgICAgaW50cm9Db250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBMZWFybmluZyB3YXlzIHRvIHJlZHVjZSw8YnIvPlxuICAgICAgICAgICAgICAgIHJldXNlIGFuZCByZWN5Y2xlIGlzIHRoZTxici8+XG4gICAgICAgICAgICAgICAgZ29hbOKAlGNvbGxlY3QgYWxsPGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgPHNwYW4gY2xhc3NOYW1lPVwidHJ1Y2tcIiAvPiB0bzxici8+XG4gICAgICAgICAgICAgICAgZmluZCBvdXQgaG93IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBjb21wbGV0ZUNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSdyZSBhIFJlY3ljbGluZyBXaXphcmQhPGJyLz5cbiAgICAgICAgICAgICAgICBCZWluZyBtaW5kZnVsIG9mIGhvdyB5b3U8YnIvPlxuICAgICAgICAgICAgICAgIGhhbmRsZSB3YXN0ZSBoZWxwczxici8+XG4gICAgICAgICAgICAgICAga2VlcCB0aGUgZW52aXJvbm1lbnQ8YnIvPlxuICAgICAgICAgICAgICAgIGluIGdyZWF0IHNoYXBlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0MUNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBCdXkgSXRlbXMgd2l0aCBMZXNzIFBhY2thZ2luZ1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IFNvbWUgcHJvZHVjdHMgaGF2ZSBtb3JlPGJyLz5cbiAgICAgICAgICAgICAgICBlY28tZnJpZW5kbHkgcGFja2FnaW5nIHRoYW48YnIvPlxuICAgICAgICAgICAgICAgIG90aGVycy4gQmUgc21hcnQhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QyQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIEJ1eSBDbG90aGluZyBhdCBhIFRocmlmdCBTaG9wXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogU2F2ZSBnZW50bHkgdXNlZCBjbG90aGluZzxici8+XG4gICAgICAgICAgICAgICAgZnJvbSB0aGUgbGFuZGZpbGwgYnkgYnV5aW5nPGJyLz5cbiAgICAgICAgICAgICAgICBhdCB0aHJpZnQgc3RvcmVzIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0M0NvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBFbmNvdXJhZ2UgRnJpZW5kcyBhbmQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICBGYW1pbHkgdG8gUmVjeWNsZVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBUaXA6IEdpdmUgdGhvc2UgY2xvc2VzdCB0byB5b3U8YnIvPlxuICAgICAgICAgICAgICAgIGZyaWVuZGx5IHJlbWluZGVycyB0bzxici8+XG4gICAgICAgICAgICAgICAgcHJvcGVybHkgcmVjeWNsZSB0aGVpciB3YXN0ZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJpbXBvcnQgUGhhc2VyR2FtZVNjcmVlbkNvbXBvbmVudCBmcm9tICcuL3BoYXNlcl9nYW1lX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFBoYXNlckdhbWVTY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBpbnRyb1ZPOiAnQW5kX1RoZV9Xb3JsZCcsXG4gICAgICAgIGZhY3QxVk86ICdCb3RoU2lkZXMnLFxuICAgICAgICBmYWN0MlZPOiAnQ29udGFpbmVyJyxcbiAgICAgICAgZmFjdDNWTzogJ0VsZWN0cm9uaWNzJyxcbiAgICAgICAgaW50cm9Db250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBCeSBjb2xsZWN0aW5nIHRoZSA8c3BhbiBjbGFzc05hbWU9XCJ0cnVja1wiIC8+PGJyLz5cbiAgICAgICAgICAgICAgICBhbmQgZGlzcG9zaW5nIG9mIHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBwcm9wZXJseSwgeW91IGNhbiBoZWxwPGJyLz5cbiAgICAgICAgICAgICAgICBib3RoIHlvdXIgY29tbXVuaXR5PGJyLz5cbiAgICAgICAgICAgICAgICBhbmQgdGhlIHdvcmxkIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBjb21wbGV0ZUNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSdyZSBhIFJlY3ljbGluZyBXaXphcmQhPGJyLz5cbiAgICAgICAgICAgICAgICBCZWluZyBtaW5kZnVsIG9mIGhvdyB5b3U8YnIvPlxuICAgICAgICAgICAgICAgIGhhbmRsZSB3YXN0ZSBoZWxwczxici8+XG4gICAgICAgICAgICAgICAga2VlcCB0aGUgZW52aXJvbm1lbnQ8YnIvPlxuICAgICAgICAgICAgICAgIGluIGdyZWF0IHNoYXBlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0MUNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBVc2UgQm90aCBTaWRlcyBvZiBhPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgUGllY2Ugb2YgUGFwZXJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBXaGV0aGVyIGRvaW5nIHlvdXIgaG9tZXdvcms8YnIvPlxuICAgICAgICAgICAgICAgIG9yIG1ha2luZyBhIHNob3BwaW5nIGxpc3QsPGJyLz5cbiAgICAgICAgICAgICAgICB3cml0aW5nIG9uIGJvdGggc2lkZXMgb2Y8YnIvPlxuICAgICAgICAgICAgICAgIG5vdGVwYXBlciBpcyB0aGU8YnIvPlxuICAgICAgICAgICAgICAgIHJpZ2h0IHRoaW5nIHRvIGRvIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0MkNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBQdXQgWW91ciBMdW5jaCBpbjxici8+XG4gICAgICAgICAgICAgICAgICAgIGEgUmV1c2FibGUgQ29udGFpbmVyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogSW5zdGVhZCBvZiBjYXJyeWluZyB5b3VyPGJyLz5cbiAgICAgICAgICAgICAgICBsdW5jaCBpbiBhIHBhcGVyIG9yPGJyLz5cbiAgICAgICAgICAgICAgICBwbGFzdGljIGJhZywgd2h5IG5vdCB1c2U8YnIvPlxuICAgICAgICAgICAgICAgIGEgcmV1c2FibGUgY29udGFpbmVyP1xuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBmYWN0M0NvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBSZWN5Y2xlIFlvdXIgRWxlY3Ryb25pY3NcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBFbGVjdHJvbmljIHdhc3RlIGNvbnRhaW5zPGJyLz5cbiAgICAgICAgICAgICAgICBoYXphcmRvdXMgbWF0ZXJpYWxzIGFuZDxici8+XG4gICAgICAgICAgICAgICAgdG94aW5zIGFuZCBzaG91bGQgYWx3YXlzIGJlPGJyLz5cbiAgICAgICAgICAgICAgICByZWN5Y2xlZCBhcHByb3ByaWF0ZWx5LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IFBoYXNlckdhbWVTY3JlZW5Db21wb25lbnQgZnJvbSAnLi9waGFzZXJfZ2FtZV9zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBQaGFzZXJHYW1lU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgaW50cm9WTzogJ0FsbW9zdFRoZXJlJyxcbiAgICAgICAgZmFjdDFWTzogJ0J1bGsnLFxuICAgICAgICBmYWN0MlZPOiAnQm90dGxlZF9XYXRlcicsXG4gICAgICAgIGZhY3QzVk86ICdCb3hlcycsXG4gICAgICAgIGludHJvQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91J3JlIGFsbW9zdCB0aGVyZSEgS2VlcDxici8+XG4gICAgICAgICAgICAgICAgcGlja2luZyB1cCB3YXN0ZSBhbmQgbGVhcm5pbmc8YnIvPlxuICAgICAgICAgICAgICAgIHRpcHMgYXMgeW91IGhlYWQ8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHRoZSBmaW5pc2ggbGluZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgY29tcGxldGVDb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBZb3UndmUgd29uIHRoZSBnYW1lITxici8+XG4gICAgICAgICAgICAgICAgTm93IHRha2Ugd2hhdCB5b3UndmUgbGVhcm5lZCw8YnIvPlxuICAgICAgICAgICAgICAgIGdvIG91dCBpbnRvIHRoZSB3b3JsZCw8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCBkbyB5b3VyIHBhcnQhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QxQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIEJ1eSBJbiBCdWxrXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogSW5kaXZpZHVhbGx5LXdyYXBwZWQgaXRlbXM8YnIvPlxuICAgICAgICAgICAgICAgIHVzZSBtb3JlIHBhY2thZ2luZyB0aGFuPGJyLz5cbiAgICAgICAgICAgICAgICBhIHdob2xlIGJ1bmNoIG9mIHRoZW08YnIvPlxuICAgICAgICAgICAgICAgIHNvbGQgaW4gb25lIHBhY2thZ2UuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QyQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIENhcnJ5IFdhdGVyIGluIGE8YnIvPlxuICAgICAgICAgICAgICAgICAgICBSZXVzYWJsZSBXYXRlciBCb3R0bGVcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgVGlwOiBCb3R0bGVkIHdhdGVyIHVzZXMgY29udGFpbmVyczxici8+XG4gICAgICAgICAgICAgICAgZGVzaWduZWQgdG8gYmUgdXNlZCBvbmx5IG9uY2UuPGJyLz5cbiAgICAgICAgICAgICAgICBCdXQgc3BlY2lhbCByZXVzYWJsZSB3YXRlcjxici8+XG4gICAgICAgICAgICAgICAgYm90dGxlcyBjYW4gYmUgZmlsbGVkIHdpdGg8YnIvPlxuICAgICAgICAgICAgICAgIHdhdGVyIGZyb20geW91ciB0YXAhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIGZhY3QzQ29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIFByZXBhcmUgWW91ciBDYXJkYm9hcmQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICBmb3IgUmVjeWNsaW5nXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIFRpcDogQnJlYWsgYm94ZXMgZG93biB0byBzYXZlPGJyLz5cbiAgICAgICAgICAgICAgICBzcGFjZSwgYW5kIGJlIHN1cmU8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHJlbW92ZSBhbnkgZm9vZCB3YXN0ZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwibmVpZ2hib3Job29kLXdhc3RlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5WTyArICdpZGVudGlmeXdhc3RlLm1wMyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmVlLTNcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmVlLTRcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInR1cnRsZVwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ21haW4udHVydGxlLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlNQUklURSArICdjYXJkcy40LnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2ZyYW1lLnJvdW5kLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZSByb3VuZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICBOb3cgdGhhdCB0aGU8YnIvPlxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcmhvb2Qgd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgICAgICBoYXMgYmVlbiBwaWNrZWQgdXAsIGxldCdzPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpZnkgdGhlIGRpZmZlcmVudDxici8+XG4gICAgICAgICAgICAgICAgICAgIHR5cGVzIG9mIHdhc3RlIVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL25laWdoYm9yaG9vZF93YXN0ZV9zY3JlZW4uanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInR5cGVzLW9mLXdhc3RlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlNQUklURSArICdjYXJkcy4xLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlNQUklURSArICdjYXJkcy4yLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlNQUklURSArICdjYXJkcy4zLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2NhcmQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgIHBsYXk9e18uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLnRhcmdldC5wcm9wcy5tZXNzYWdlJyl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgcmVmPVwiY29tcG9zdFwiXG4gICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnY29tcG9zdC5tcDMnfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgIHJlZj1cInJlY3ljbGVcIlxuICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ1JlY3ljbGVzLm1wMyd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgcmVmPVwibGFuZGZpbGxcIlxuICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0xhbmRmaWxsX0Rlc2MubXAzJ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhQ29sbGVjdGlvbj5cbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIGRhdGFUYXJnZXQ9XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RDbGFzcz1cIkhJR0hMSUdIVEVEXCJcbiAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHR5cGU9XCJsaVwiIGNvcnJlY3Q9e3RydWV9IG1lc3NhZ2U9XCJjb21wb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUgYlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpc2NhcmRlZCBvcmdhbmljIG1hdHRlcjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2ggYXMgcGxhbnQgc2NyYXBzIGFuZDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVnZyBzaGVsbHMgY2FuIGFsbCBiZSB0dXJuZWQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRvIG1pbmVyYWwtcmljaCBzb2lsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUgYVwiPjxkaXYvPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCB0eXBlPVwibGlcIiBjb3JyZWN0PXt0cnVlfSBtZXNzYWdlPVwicmVjeWNsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXRhbCwgZ2xhc3MsIGFuZCBjZXJ0YWluPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZXMgb2YgcGFwZXIgYW5kIHBsYXN0aWM8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW4gYmUgcmVjeWNsZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBhXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHR5cGU9XCJsaVwiIGNvcnJlY3Q9e3RydWV9IG1lc3NhZ2U9XCJsYW5kZmlsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlIGJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGFzLCBub3QgYWxsIHdhc3RlIGNhbiBiZTxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3ljbGVkIG9yIGNvbXBvc3RlZC48YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb2lsZWQgdGlzc3VlcywgcGxhc3RpYzxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYXBlcnMsIGFuZCBtb3JlIGFyZSBqdXN0PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29tZSBvZiB0aGUgdGltZXMgdGhhdDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pZ2h0IGVuZCB1cCBpbiB0aGUgbGFuZGZpbGwhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZSBhXCI+PGRpdi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3R5cGVzX29mX3dhc3RlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwid2FzdGUtc29ydC1jZW50ZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0hlbHBfTWUubXAzJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGl0bGVcIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdzb3J0LnRpdGxlLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInR1cnRsZVwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ21haW4udHVydGxlLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2ZyYW1lLnJvdW5kLnBuZyd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZSByb3VuZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICBOb3cgdGhhdCB3ZSd2ZSBsZWFybmVkIHRoZTxici8+XG4gICAgICAgICAgICAgICAgICAgIGJlc3Qgd2F5cyB0byBzZXBhcmF0ZSB3YXN0ZSw8YnIvPlxuICAgICAgICAgICAgICAgICAgICBsZXQncyB0ZXN0IHlvdXIga25vd2xlZGdlPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgYnkgaGVscGluZyBtZSBhdCB0aGU8YnIvPlxuICAgICAgICAgICAgICAgICAgICBXYXN0ZSBTb3J0aW5nIENlbnRlci5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy93YXN0ZV9zb3J0X2NlbnRlcl9zY3JlZW4uanMiLCJpbXBvcnQgU29ydGluZ0dhbWVDb21wb25lbnQgZnJvbSAnLi9zb3J0aW5nX2dhbWVfY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBTb3J0aW5nR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHBvaW50czogMTAwLFxuICAgICAgICB0aW1lcjogMTIwMDAwLFxuICAgICAgICBpbnN0cnVjdGlvbnNWTzogJ0xhdW5jaF9UaGVfT2JqZWN0JyxcbiAgICAgICAgY29tcGxldGVWTzogJ1dhc3RlX1NvcnRpbmdfV2l6YXJkJyxcbiAgICAgICAgY29tcGxldGVTRlg6ICdMZXZlbENvbXBsZXRlJyxcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBMYXVuY2ggdGhlIG9iamVjdCBpbnRvIHRoZSBjb3JyZWN0IGJpbiBiZWZvcmU8YnIvPlxuICAgICAgICAgICAgICAgIHRoZSB0aW1lciBydW5zIG91dCB0byBnZXQgdG8gdGhlIG5leHQgbGV2ZWwuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFNob3VsZCB0aGUgd2FzdGUgYmUgcmVjeWNsZWQsPGJyLz5cbiAgICAgICAgICAgICAgICBjb21wb3N0ZWQsIG9yIHRha2VuIHRvIHRoZSBsYW5kZmlsbD88YnIvPlxuICAgICAgICAgICAgICAgIFRoaXMgaXMgeW91ciBjaGFuY2UgdG8gcHJvdmUgd2hhdDxici8+XG4gICAgICAgICAgICAgICAgeW91IGtub3cgYW5kIGdhaW4gcG9pbnRzIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICBjb21wbGV0ZTogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTm93IHRyeSB5b3VyIGhhbmQgYXQ8YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBuZXh0IGxldmVsIG9mIHNvcnRpbmchXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzL2NvbXBvbmVudHMvc29ydGluZ19sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IENhcm91c2VsIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMSc7XG5pbXBvcnQgQ2Fubm9uIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Nhbm5vbi8wLjInO1xuaW1wb3J0IFJhbmRvbWl6ZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEnO1xuXG52YXIgaW1hZ2VzID0gW107XG5cbmZvciAobGV0IGkgPSAxOyBpIDwgOTsgaSsrKSB7XG4gICAgaW1hZ2VzLnB1c2goXG4gICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWdhbWUyLiR7aX0ucG5nYH1cbiAgICAgICAgLz5cbiAgICApO1xufVxuXG5pbWFnZXMucHVzaChcbiAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgIGtleT17OX1cbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1zbGluZ3Nob3QucG5nYH1cbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD17YHNvcnRpbmctbGV2ZWwtJHtvcHRzLmxldmVsfWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9eydyZXZlYWwtb3Blbi0nICsgXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgJycpfVxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgIHBsYXk9e18uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIG51bGwpfVxuICAgICAgICAgICAgICAgIG9uUGxheT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImluc3RydWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIHNpbGVudE9uU3RhcnRcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlZPfVdhc3RlX1NvcnRpbmdfQ2VudGVyLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlZPfSR7b3B0cy5pbnN0cnVjdGlvbnNWT30ubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlZPfSR7b3B0cy5jb21wbGV0ZVZPfS5tcDNgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXRyeVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuVk8gKyAnS2VlcF9Tb3J0aW5nLm1wMyd9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhQ29sbGVjdGlvbj5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUucGxheScsIF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIG51bGwpKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImNvcnJlY3RcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db3JyZWN0Lm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImluY29ycmVjdFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVdyb25nQmluRm9ySXRlbS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJ3YXJuaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9VGVuU2Vjb25kc1dhcm5pbmcubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiZmlyZVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVNsaW5nc2hvdFJlbGVhc2Vfc29ydEJ1dHRvbi5tcDNgfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfSR7b3B0cy5jb21wbGV0ZVNGWH0ubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAge2ltYWdlc31cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDxza29hc2guU3ByaXRlQW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2xpbmdzaG90XCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNsaW5nc2hvdC5wbmdgfVxuICAgICAgICAgICAgICAgIGFuaW1hdGU9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmZpcmluZycsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICBhbmltYXRlT25TdGFydD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgZnJhbWVzPXs2fVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENhcm91c2VsXG4gICAgICAgICAgICAgICAgcmVmPVwiY2Fyb3VzZWxcIlxuICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBzaG93TnVtPXs3fVxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4PXs0fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5maXJlZCcpfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3JyZWN0ID0gXy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29ycmVjdCcsIDApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5jb3JyZWN0ID0gXy5nZXQocHJvcHMsICdkYXRhLmdhbWUuaW5jb3JyZWN0JywgMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheTtcblxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzW3RhcmdldC5wcm9wc1snZGF0YS1rZXknXV0gPSAnU0VMRUNURUQnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzW3RhcmdldC5wcm9wc1snZGF0YS1rZXknXV0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnByb3BzLm5hbWUgPT09IF8uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmZpcmVkLnByb3BzLm1lc3NhZ2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheSA9ICdjb3JyZWN0JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY29ycmVjdCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheSA9ICdpbmNvcnJlY3QnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBiaW49e1xuICAgICAgICAgICAgICAgICAgICA8UmFuZG9taXplclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmFuZG9taXplclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInJlY3ljbGVcIiBuYW1lPVwicmVjeWNsZVwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwibGFuZGZpbGxcIiBuYW1lPVwibGFuZGZpbGxcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJjb21wb3N0XCIgbmFtZT1cImNvbXBvc3RcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJyZWN5Y2xlXCIgbmFtZT1cInJlY3ljbGVcIi8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImxhbmRmaWxsXCIgbmFtZT1cImxhbmRmaWxsXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiY29tcG9zdFwiIG5hbWU9XCJjb21wb3N0XCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwicmVjeWNsZVwiIG5hbWU9XCJyZWN5Y2xlXCIvPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJsYW5kZmlsbFwiIG5hbWU9XCJsYW5kZmlsbFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNvbXBvc3RcIiBuYW1lPVwiY29tcG9zdFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENhbm5vblxuICAgICAgICAgICAgICAgIHJlZj1cImNhbm5vblwiXG4gICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIHJldmVyc2VSZWxvYWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgbGF1bmNoQnV0dG9uPXt0cnVlfVxuICAgICAgICAgICAgICAgIHJlbG9hZFRpbWU9ezIwMDB9XG4gICAgICAgICAgICAgICAgZGF0YURlbGF5PXsxMDAwfVxuICAgICAgICAgICAgICAgIHNob3dOdW09ezB9XG4gICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgIDxSYW5kb21pemVyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGJpbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZmxvd2Vyc1wiIG1lc3NhZ2U9XCJjb21wb3N0XCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJwYXBlclwiIG1lc3NhZ2U9XCJyZWN5Y2xlXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJuZXdzcGFwZXJcIiBtZXNzYWdlPVwicmVjeWNsZVwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwibmFwa2luXCIgbWVzc2FnZT1cImxhbmRmaWxsXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJsZXR0dWNlXCIgbWVzc2FnZT1cImNvbXBvc3RcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImp1aWNlXCIgbWVzc2FnZT1cInJlY3ljbGVcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImVnZ3NoZWxsXCIgbWVzc2FnZT1cImNvbXBvc3RcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImRpYXBlclwiIG1lc3NhZ2U9XCJsYW5kZmlsbFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwibXVnXCIgbWVzc2FnZT1cImxhbmRmaWxsXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJjb2ZmZWVcIiBtZXNzYWdlPVwiY29tcG9zdFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiYm94XCIgbWVzc2FnZT1cInJlY3ljbGVcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNhblwiIG1lc3NhZ2U9XCJyZWN5Y2xlXCIgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJib3R0bGVcIiBtZXNzYWdlPVwicmVjeWNsZVwiIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiYmFuYW5hXCIgbWVzc2FnZT1cImNvbXBvc3RcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImFwcGxlXCIgbWVzc2FnZT1cImNvbXBvc3RcIiAvPixcbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInN0YXRzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGV2ZWxcIj5cbiAgICAgICAgICAgICAgICAgICAge29wdHMubGV2ZWx9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxza29hc2guVGltZXJcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidGltZXJcIlxuICAgICAgICAgICAgICAgICAgICBjb3VudERvd249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ9e29wdHMudGltZXJ9XG4gICAgICAgICAgICAgICAgICAgIHN0b3A9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29tcGxldGUnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLnN0YXJ0JywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICByZXN0YXJ0PXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zdGFydCcsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJykpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICdyZXRyeSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29ycmVjdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwic2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9e29wdHMucG9pbnRzfVxuICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ9ezEwfVxuICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb3JyZWN0JywgMCl9XG4gICAgICAgICAgICAgICAgICAgIGluY29ycmVjdD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuaW5jb3JyZWN0JywgMCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICdjb21wbGV0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8c2tvYXNoLlJldmVhbFxuICAgICAgICAgICAgICAgIG9wZW5PblN0YXJ0PVwiaW5zdHJ1Y3Rpb25zXCJcbiAgICAgICAgICAgICAgICBvcGVuVGFyZ2V0PVwicmV2ZWFsXCJcbiAgICAgICAgICAgICAgICBjbG9zZVRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgb3BlblJldmVhbD17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgbnVsbCl9XG4gICAgICAgICAgICAgICAgb25PcGVuPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbG9zZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImluc3RydWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbnN0cnVjdGlvbnMgZnJhbWUgcm91bmRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0cy5pbnN0cnVjdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbXBsZXRlIGZyYW1lIHJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuY29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJldHJ5IGZyYW1lIHJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtlZXAgU29ydGluZyE8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiB5b3UgZG9uJ3Qgc3VjY2VlZCw8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkgYWdhaW4hXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuXG5pbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMSc7XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2VsZWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWQgJiYgbmV4dFByb3BzLnNlbGVjdGVkICE9PSB0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLnJlZnMuYmluLmdldCgxKVswXTtcbiAgICAgICAgbGlzdCA9IGxpc3QuY29uY2F0KFxuICAgICAgICAgICAgPGl0ZW0udHlwZVxuICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgIHsuLi57XG4gICAgICAgICAgICAgICAgICAgICdkYXRhLWtleSc6IHNob3J0aWQuZ2VuZXJhdGUoKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGNsYXNzZXNbMF0gPSAnJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBsaXN0LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzWzBdID0gJ0xFQVZFJztcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMucHJvcHMucGF1c2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHZhciBsaXN0O1xuICAgICAgICAvLyBza29hc2guQ29tcG9uZW50IGlzIG5vdCB0aGUgc3VwZXIgaGVyZSwgYnV0IHRoaXMgaXMgd2hhdCB3ZSB3YW50XG4gICAgICAgIHNrb2FzaC5Db21wb25lbnQucHJvdG90eXBlLmJvb3RzdHJhcC5jYWxsKHRoaXMpO1xuXG4gICAgICAgIGxpc3QgPSB0aGlzLnJlZnMuYmluID8gdGhpcy5yZWZzLmJpbi5nZXQodGhpcy5wcm9wcy5zaG93TnVtICsgMSkgOiB0aGlzLnByb3BzLmxpc3Q7XG5cbiAgICAgICAgXy5lYWNoKGxpc3QsIGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICB7Li4ue1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEta2V5Jzogc2hvcnRpZC5nZW5lcmF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGlzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2Fyb3VzZWwnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc2hvcnRpZCBpcyBpbnRlbnRpb25hbGx5IG5vdCB1c2VkIGZvciBrZXkgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG8gbWFrZSBzdXJlXG4gICAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICAgKi9cbiAgICByZW5kZXJMaXN0KCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgIHZhciBvblRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgICByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHNbJ2RhdGEtcmVmJ10gfHwga2V5O1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kID0ga2V5ID09PSAwID8gdGhpcy5uZXh0IDogbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17bGkucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmR9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1rZXk9e3Nob3J0aWQoa2V5KX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgb25DbGljayA9IHRoaXMucHJvcHMuY2xpY2thYmxlID8gdGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYXJvdXNlbC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBzaG93TnVtOiAzLFxuICAgIHRhcmdldEluZGV4OiAxLFxuICAgIHBhdXNlOiA1MDAsXG4gICAgY2xpY2thYmxlOiBmYWxzZSxcbiAgICBvblNlbGVjdDogXy5ub29wLFxufSwgU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMS5qcyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgZW5jb2RlID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbnZhciBkZWNvZGUgPSByZXF1aXJlKCcuL2RlY29kZScpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNDU5NzA3NjA2NTE4O1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDY7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIFJFRFVDRV9USU1FKSAqIDAuMDAxKTtcblxuICAgIGlmIChzZWNvbmRzID09PSBwcmV2aW91c1NlY29uZHMpIHtcbiAgICAgICAgY291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBwcmV2aW91c1NlY29uZHMgPSBzZWNvbmRzO1xuICAgIH1cblxuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIHZlcnNpb24pO1xuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIGNsdXN0ZXJXb3JrZXJJZCk7XG4gICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIGNvdW50ZXIpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBzZWNvbmRzKTtcblxuICAgIHJldHVybiBzdHI7XG59XG5cblxuLyoqXG4gKiBTZXQgdGhlIHNlZWQuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQgaWYgeW91IGRvbid0IHdhbnQgcGVvcGxlIHRvIHRyeSB0byBmaWd1cmUgb3V0IHlvdXIgaWQgc2NoZW1hLlxuICogZXhwb3NlZCBhcyBzaG9ydGlkLnNlZWQoaW50KVxuICogQHBhcmFtIHNlZWQgSW50ZWdlciB2YWx1ZSB0byBzZWVkIHRoZSByYW5kb20gYWxwaGFiZXQuICBBTFdBWVMgVVNFIFRIRSBTQU1FIFNFRUQgb3IgeW91IG1pZ2h0IGdldCBvdmVybGFwcy5cbiAqL1xuZnVuY3Rpb24gc2VlZChzZWVkVmFsdWUpIHtcbiAgICBhbHBoYWJldC5zZWVkKHNlZWRWYWx1ZSk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY2x1c3RlciB3b3JrZXIgb3IgbWFjaGluZSBpZFxuICogZXhwb3NlZCBhcyBzaG9ydGlkLndvcmtlcihpbnQpXG4gKiBAcGFyYW0gd29ya2VySWQgd29ya2VyIG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlci4gIE51bWJlciBsZXNzIHRoYW4gMTYgaXMgcmVjb21tZW5kZWQuXG4gKiByZXR1cm5zIHNob3J0aWQgbW9kdWxlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICovXG5mdW5jdGlvbiB3b3JrZXIod29ya2VySWQpIHtcbiAgICBjbHVzdGVyV29ya2VySWQgPSB3b3JrZXJJZDtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICpcbiAqIHNldHMgbmV3IGNoYXJhY3RlcnMgdG8gdXNlIGluIHRoZSBhbHBoYWJldFxuICogcmV0dXJucyB0aGUgc2h1ZmZsZWQgYWxwaGFiZXRcbiAqL1xuZnVuY3Rpb24gY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKSB7XG4gICAgaWYgKG5ld0NoYXJhY3RlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhbHBoYWJldC5jaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhbHBoYWJldC5zaHVmZmxlZCgpO1xufVxuXG5cbi8vIEV4cG9ydCBhbGwgb3RoZXIgZnVuY3Rpb25zIGFzIHByb3BlcnRpZXMgb2YgdGhlIGdlbmVyYXRlIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnNlZWQgPSBzZWVkO1xubW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xubW9kdWxlLmV4cG9ydHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG5tb2R1bGUuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkID0gaXNWYWxpZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvYWxwaGFiZXQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gRm91bmQgdGhpcyBzZWVkLWJhc2VkIHJhbmRvbSBnZW5lcmF0b3Igc29tZXdoZXJlXG4vLyBCYXNlZCBvbiBUaGUgQ2VudHJhbCBSYW5kb21pemVyIDEuMyAoQykgMTk5NyBieSBQYXVsIEhvdWxlIChob3VsZUBtc2MuY29ybmVsbC5lZHUpXG5cbnZhciBzZWVkID0gMTtcblxuLyoqXG4gKiByZXR1cm4gYSByYW5kb20gbnVtYmVyIGJhc2VkIG9uIGEgc2VlZFxuICogQHBhcmFtIHNlZWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldE5leHRWYWx1ZSgpIHtcbiAgICBzZWVkID0gKHNlZWQgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwO1xuICAgIHJldHVybiBzZWVkLygyMzMyODAuMCk7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoX3NlZWRfKSB7XG4gICAgc2VlZCA9IF9zZWVkXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmV4dFZhbHVlOiBnZXROZXh0VmFsdWUsXG4gICAgc2VlZDogc2V0U2VlZFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUJ5dGUgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tYnl0ZScpO1xuXG5mdW5jdGlvbiBlbmNvZGUobG9va3VwLCBudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGxvb2t1cCggKCAobnVtYmVyID4+ICg0ICogbG9vcENvdW50ZXIpKSAmIDB4MGYgKSB8IHJhbmRvbUJ5dGUoKSApO1xuICAgICAgICBkb25lID0gbnVtYmVyIDwgKE1hdGgucG93KDE2LCBsb29wQ291bnRlciArIDEgKSApO1xuICAgICAgICBsb29wQ291bnRlcisrO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG5mdW5jdGlvbiByYW5kb21CeXRlKCkge1xuICAgIGlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpICYgMHgzMDtcbiAgICB9XG4gICAgdmFyIGRlc3QgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGRlc3QpO1xuICAgIHJldHVybiBkZXN0WzBdICYgMHgzMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG4vKipcbiAqIERlY29kZSB0aGUgaWQgdG8gZ2V0IHRoZSB2ZXJzaW9uIGFuZCB3b3JrZXJcbiAqIE1haW5seSBmb3IgZGVidWdnaW5nIGFuZCB0ZXN0aW5nLlxuICogQHBhcmFtIGlkIC0gdGhlIHNob3J0aWQtZ2VuZXJhdGVkIGlkLlxuICovXG5mdW5jdGlvbiBkZWNvZGUoaWQpIHtcbiAgICB2YXIgY2hhcmFjdGVycyA9IGFscGhhYmV0LnNodWZmbGVkKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmVyc2lvbjogY2hhcmFjdGVycy5pbmRleE9mKGlkLnN1YnN0cigwLCAxKSkgJiAweDBmLFxuICAgICAgICB3b3JrZXI6IGNoYXJhY3RlcnMuaW5kZXhPZihpZC5zdWJzdHIoMSwgMSkpICYgMHgwZlxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuZnVuY3Rpb24gaXNTaG9ydElkKGlkKSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8IGlkLmxlbmd0aCA8IDYgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcmFjdGVycyA9IGFscGhhYmV0LmNoYXJhY3RlcnMoKTtcbiAgICB2YXIgbGVuID0gaWQubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47aSsrKSB7XG4gICAgICAgIGlmIChjaGFyYWN0ZXJzLmluZGV4T2YoaWRbaV0pID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hvcnRJZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvaXMtdmFsaWQuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEFzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlNlbGVjdGFibGVcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmNvbnNvbGUud2FybignQXMgb2Ygc2tvYXNoIDEuMS4wIHRoaXMgY29tcG9uZW50IGNhbiBiZSBmb3VuZCBhdCBza29hc2guU2VsZWN0YWJsZScpO1xuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBTZWxlY3RhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgICAgICAgc2VsZWN0RnVuY3Rpb246IHRoaXMuc2VsZWN0LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgc2VsZWN0Q2xhc3M7XG4gICAgICAgIHZhciBzZWxlY3RGdW5jdGlvbjtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG5cbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICBzZWxlY3RDbGFzcyA9IHRoaXMucHJvcHMuc2VsZWN0Q2xhc3MgfHwgdGhpcy5zdGF0ZS5zZWxlY3RDbGFzcyB8fCAnU0VMRUNURUQnO1xuICAgICAgICBzZWxlY3RGdW5jdGlvbiA9IHNlbGVjdENsYXNzID09PSAnSElHSExJR0hURUQnID8gdGhpcy5oaWdobGlnaHQgOiB0aGlzLnNlbGVjdDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RPblN0YXJ0KSB7XG4gICAgICAgICAgICBjbGFzc2VzW3RoaXMucHJvcHMuc2VsZWN0T25TdGFydF0gPSBzZWxlY3RDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBzZWxlY3RGdW5jdGlvbixcbiAgICAgICAgICAgIHNlbGVjdENsYXNzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlZnMuYmluKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBsaXN0OiB0aGlzLnJlZnMuYmluLmdldEFsbCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHZhciBkYXRhUmVmO1xuICAgICAgICB2YXIgdGFyZ2V0O1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIHZhciBpc0NvcnJlY3Q7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhUmVmID0gZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG5cbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgIGRhdGFSZWYgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmID0gc2VsZi5yZWZzW2RhdGFSZWZdO1xuXG4gICAgICAgIGlzQ29ycmVjdCA9IChyZWYgJiYgcmVmLnByb3BzICYmIHJlZi5wcm9wcy5jb3JyZWN0KSB8fFxuICAgICAgICAgICAgKCFzZWxmLnByb3BzLmFuc3dlcnMgfHwgIXNlbGYucHJvcHMuYW5zd2Vycy5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBzZWxmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkYXRhUmVmKSAhPT0gLTEpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmFsbG93RGVzZWxlY3QgJiYgY2xhc3Nlc1tkYXRhUmVmXSkge1xuICAgICAgICAgICAgZGVsZXRlIGNsYXNzZXNbZGF0YVJlZl07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb3JyZWN0KSB7XG4gICAgICAgICAgICBjbGFzc2VzW2RhdGFSZWZdID0gc2VsZi5zdGF0ZS5zZWxlY3RDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5wcm9wcy5zZWxlY3RSZXNwb25kLmNhbGwoc2VsZiwgZGF0YVJlZik7XG4gICAgICAgIHNlbGYucHJvcHMub25TZWxlY3QuY2FsbChzZWxmLCBkYXRhUmVmKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5jaG9vc2VPbmUpIHNlbGYuY29tcGxldGUoKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5kYXRhVGFyZ2V0KSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogc2VsZi5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiByZWZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmNvbXBsZXRlTGlzdE9uQ2xpY2spIHtcbiAgICAgICAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyLCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IGlkKSBfLmludm9rZShyLCAnY29tcGxldGUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5lYWNoKHNlbGYucmVmcywgKHIsIGspID0+IHtcbiAgICAgICAgICAgIGlmIChrID09PSBkYXRhUmVmKSBfLmludm9rZShyLCAnY29tcGxldGUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcyk7XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0KGUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG4gICAgICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICAgIH1cblxuICAgIGdldENsYXNzKGtleSwgbGkpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoXG4gICAgICAgICAgICBsaS5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNba2V5XSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1tsaS5wcm9wc1snZGF0YS1yZWYnXV0sXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNbbGkucHJvcHNbJ2RhdGEta2V5J11dXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3NlbGVjdGFibGUnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLnNlbGVjdCAmJiBwcm9wcy5zZWxlY3QgIT09IHRoaXMucHJvcHMuc2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmNhbGwodGhpcywgcHJvcHMuc2VsZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJpbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmJpbikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmJpbi50eXBlXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuYmluLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj1cImJpblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3QoKSB7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5wcm9wcy5saXN0IHx8IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgcmV0dXJuIGxpc3QubWFwKChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgZGF0YVJlZiA9IGxpLnByb3BzWydkYXRhLXJlZiddIHx8IGtleTtcbiAgICAgICAgICAgIHZhciByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHMuaWQgfHwgZGF0YVJlZjtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbGkucHJvcHMubWVzc2FnZSB8fCAnJyArIGtleTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e2RhdGFSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gb25DbGljaz17dGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNlbGVjdGFibGUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgbGlzdDogW1xuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT5cbiAgICBdLFxuICAgIHNlbGVjdENsYXNzOiAnU0VMRUNURUQnLFxuICAgIGNvbXBsZXRlTGlzdE9uQ2xpY2s6IHRydWUsXG4gICAgc2VsZWN0UmVzcG9uZDogXy5ub29wLFxuICAgIG9uU2VsZWN0OiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBDYW5ub24gZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2xhc3Nlczoge31cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZpcmUgPSB0aGlzLmZpcmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZWxvYWQgPSB0aGlzLnJlbG9hZC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgdmFyIGxpc3Q7XG5cbiAgICAgICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICAgICAgbGlzdCA9IHRoaXMucmVmcy5iaW4gPyB0aGlzLnJlZnMuYmluLmdldCh0aGlzLnByb3BzLnNob3dOdW0gKyAxKSA6IHRoaXMucHJvcHMubGlzdDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxpc3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzO1xuICAgICAgICB2YXIgbGlzdDtcbiAgICAgICAgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICAgICAgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmV2ZXJzZVJlbG9hZCkge1xuICAgICAgICAgICAgbGlzdCA9IHRoaXMucmVmcy5iaW4uZ2V0KDEpLmNvbmNhdChsaXN0KTtcbiAgICAgICAgICAgIGxpc3QucG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0ID0gbGlzdC5jb25jYXQodGhpcy5yZWZzLmJpbi5nZXQoMSkpO1xuICAgICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzZXNbdGhpcy5zdGF0ZS5saXN0Lmxlbmd0aCAtIDFdID0gJ0xPQURFRCc7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgbGlzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaXJlKCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3QgfHwge307XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBmaXJlOiB0cnVlLFxuICAgICAgICAgICAgcmVsb2FkOiBmYWxzZVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5yZWxvYWRUaW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGZpcmluZzogdHJ1ZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcGxheTogJ2ZpcmUnLFxuICAgICAgICAgICAgICAgICAgICBmaXJlZDogbGlzdFt0aGlzLnN0YXRlLmxpc3QubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIGZpcmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMucHJvcHMuZGF0YURlbGF5KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uRmlyZS5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBmaXJlOiBmYWxzZSxcbiAgICAgICAgICAgIHJlbG9hZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLnByb3BzLmRhdGFUYXJnZXQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcGxheTogbnVsbCxcbiAgICAgICAgICAgICAgICBmaXJlZDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uUmVsb2FkLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2Nhbm5vbicsIHtcbiAgICAgICAgICAgIEZJUkU6IHRoaXMuc3RhdGUuZmlyZSxcbiAgICAgICAgICAgIFJFTE9BRDogdGhpcy5zdGF0ZS5yZWxvYWRcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzcyhrZXksIGxpKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ2FtbW8nLFxuICAgICAgICAgICAgbGkucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2tleV1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5iaW4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJBbW1vKCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgIHJlZiA9IGxpLnJlZiB8fCBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckxhdW5jaEJ1dHRvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmxhdW5jaEJ1dHRvbikgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhdW5jaC1idXR0b25cIiBvbkNsaWNrPXt0aGlzLmZpcmV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtbW8tY29udGFpbmVyXCIgLz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBbW1vKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGF1bmNoQnV0dG9uKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNhbm5vbi5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBzaG93TnVtOiAzLFxuICAgIHJldmVyc2VSZWxvYWQ6IGZhbHNlLFxuICAgIGxpc3Q6IFtcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+XG4gICAgXSxcbiAgICBkYXRhVGFyZ2V0OiAnZ2FtZScsXG4gICAgZGF0YURlbGF5OiAwLFxuICAgIG9uUmVsb2FkOiBfLm5vb3AsXG4gICAgb25GaXJlOiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbm5vbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhbm5vbi8wLjIuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgUmFuZG9taXplciBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGdldEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIF8uc2h1ZmZsZSh0aGlzLnByb3BzLmJpbik7XG4gICAgfVxuXG4gICAgZ2V0KGFtb3VudCA9IDEpIHtcbiAgICAgICAgdmFyIGl0ZW1zO1xuICAgICAgICB2YXIgYmluID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVtYWluICYmIHRoaXMuc3RhdGUuYmluKSB7XG4gICAgICAgICAgICBiaW4gPSB0aGlzLnN0YXRlLmJpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChiaW4ubGVuZ3RoIDwgYW1vdW50KSB7XG4gICAgICAgICAgICBiaW4gPSBiaW4uY29uY2F0KF8uc2h1ZmZsZSh0aGlzLnByb3BzLmJpbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMgPSBiaW4uc3BsaWNlKDAsIGFtb3VudCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVtYWluKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtiaW59KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygncmFuZG9taXplcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQmluKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5wcm9wcy5iaW4sIChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVmID0gbGkucmVmIHx8IChsaS5wcm9wcyAmJiBsaS5wcm9wc1snZGF0YS1yZWYnXSkgfHwga2V5O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGkucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJhbmRvbWl6ZXIuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgYmluOiBbXSxcbiAgICByZW1haW46IGZhbHNlLFxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogKCkgPT4gZmFsc2UsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFJhbmRvbWl6ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMS5qcyIsImltcG9ydCBTb3J0aW5nR2FtZUNvbXBvbmVudCBmcm9tICcuL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFNvcnRpbmdHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgcG9pbnRzOiAxMDAsXG4gICAgICAgIHRpbWVyOiAxMjAwMDAsXG4gICAgICAgIGluc3RydWN0aW9uc1ZPOiAnR2V0X1JlYWR5X0dvJyxcbiAgICAgICAgY29tcGxldGVWTzogJ1dhc3RlX1NvcnRpbmdfV2l6YXJkJyxcbiAgICAgICAgY29tcGxldGVTRlg6ICdMZXZlbENvbXBsZXRlJyxcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTb3J0aW5nIGlzIGp1c3QgYWJvdXQgdG88YnIvPlxuICAgICAgICAgICAgICAgIGdldCBhIGxpdHRsZSB0b3VnaGVyITxici8+XG4gICAgICAgICAgICAgICAgR2V0IFJlYWR5ISBHbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgY29tcGxldGU6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFdvdywgeW91J3JlIGRvaW5nPGJyLz5cbiAgICAgICAgICAgICAgICBhbWF6aW5nIHNvcnRpbmcgd29yayE8YnIvPlxuICAgICAgICAgICAgICAgIEtlZXAgZ29pbmcgYW5kIGJlY29tZTxici8+XG4gICAgICAgICAgICAgICAgYSBTb3J0aW5nIENoYW1waW9uIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy9jb21wb25lbnRzL3NvcnRpbmdfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBTb3J0aW5nR2FtZUNvbXBvbmVudCBmcm9tICcuL3NvcnRpbmdfZ2FtZV9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIFNvcnRpbmdHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgcG9pbnRzOiAxMDAsXG4gICAgICAgIHRpbWVyOiAxMjAwMDAsXG4gICAgICAgIGluc3RydWN0aW9uc1ZPOiAnV2FzdGVfU29ydGluZ19BY3Rpb24nLFxuICAgICAgICBjb21wbGV0ZVZPOiAnV2FzdGVfU29ydGluZ19XaXphcmQnLFxuICAgICAgICBjb21wbGV0ZVNGWDogJ0dhbWVXb24nLFxuICAgICAgICBpbnN0cnVjdGlvbnM6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoZSBjbG9jayBpcyBzZXQhPGJyLz5cbiAgICAgICAgICAgICAgICBHZXQgcmVhZHkgZm9yIHNvbWU8YnIvPlxuICAgICAgICAgICAgICAgIGNoYWxsZW5naW5nIHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBzb3J0aW5nIGFjdGlvbiFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgY29tcGxldGU6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSBhcmUgbm93IGFcbiAgICAgICAgICAgICAgICA8aDM+V0FTVEUgU09SVElORyBDSEFNUElPTjwvaDM+XG4gICAgICAgICAgICAgICAgVGhhbmsgeW91IGZvciBsZWFybmluZzxici8+XG4gICAgICAgICAgICAgICAgYWJvdXQgdGhlIHJpZ2h0IHdheTxici8+XG4gICAgICAgICAgICAgICAgdG8gZGlzcG9zZSBvZiB3YXN0ZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9zb3J0aW5nX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwidGFrZS1hY3Rpb25cIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ0hvbWVfYW5kX1NjaG9vbC5tcDMnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdiYW5uZXIucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2dhbWUyLjQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuSU1BR0UgKyAnZnJhbWUucm91bmQucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lIHJvdW5kXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIE5vdyB0aGF0IHlvdSd2ZSBsZWFybmVkPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgaG93IHRvIGRpc3Bvc2Ugb2Ygd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaWJseSwgdGFrZSBhY3Rpb24gaW48YnIvPlxuICAgICAgICAgICAgICAgICAgICB5b3VyIGhvbWUgYW5kIHNjaG9vbCFcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy90YWtlX2FjdGlvbl9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgZmxpcEVhcm5lZCA9IENNV04uTUVESUEuQkFTRSArXG4gICAgJ0ZsaXBzL1dhc3RlcHJvJTIwRmxpcC9XUCUyMC0lMjBBbmltYXRlZCUyMEVhcm5lZCUyMEZsaXAvV1AuQW5pbWF0ZWRFYXJuZWRGbGlwLmdpZic7XG5cbmNvbnN0IGZsaXBTdGF0aWMgPSBDTVdOLk1FRElBLkJBU0UgK1xuICAgICdGbGlwcy9XYXN0ZXBybyUyMEZsaXAvV1AlMjAtJTIwU3RhdGljJTIwSW1hZ2UlMjBGbGlwL1dQLlN0YXRpY0FuaW1hdGVkRmxpcC5naWYnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cImZsaXBcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLlZPICsgJ2ZpbHAubXAzJ31cbiAgICAgICAgICAgICAgICBwbGF5VGFyZ2V0PVwidm9cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17Q01XTi5NRURJQS5JTUFHRSArICdmcmFtZS5zcXVhcmUucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e0NNV04uTUVESUEuU1BSSVRFICsgJ2ZsaXAudHJlZXMucG5nJ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZSBzcXVhcmVcIj5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnZmxpcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBfLmdldChwcm9wcywgJ2RhdGEudm8ucGxheWluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17ZmxpcEVhcm5lZH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdmbGlwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICFfLmdldChwcm9wcywgJ2RhdGEudm8ucGxheWluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17ZmxpcFN0YXRpY31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtDTVdOLk1FRElBLklNQUdFICsgJ2ZsaXAudGV4dC5wbmcnfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoYW5rcyBmb3IgdGFraW5nPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZSB0aW1lIHRvIGxlYXJuPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3V0IGhvdyB5b3U8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuIGhlbHAgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVudmlyb25tZW50IVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMvY29tcG9uZW50cy9mbGlwX3NjcmVlbi5qcyIsImNsYXNzIFF1aXRTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgICBva2F5KCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcigncXVpdCcpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICBza29hc2gudHJpZ2dlcignbWVudUNsb3NlJywge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckFzc2V0cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXNzZXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hc3NldHMubWFwKChhc3NldCwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmFzc2V0LnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXthc3NldC5yZWYgfHwgYXNzZXQucHJvcHNbJ2RhdGEtcmVmJ10gfHwgKCdhc3NldC0nICsga2V5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9eydzY3JlZW4gJyArIHRoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBc3NldHMoKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+QXJlIHlvdSBzdXJlIHlvdTxici8+d2FudCB0byBxdWl0PzwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+WW91ciBnYW1lIHByb2dyZXNzIHdpbGwgYmUgc2F2ZWQ8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJxdWl0LXllc1wiIG9uQ2xpY2s9e3RoaXMub2theS5iaW5kKHRoaXMpfT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicXVpdC1ub1wiIG9uQ2xpY2s9e3RoaXMuY2FuY2VsLmJpbmQodGhpcyl9PjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKFxuICAgIDxRdWl0U2NyZWVuXG4gICAgICAgIGlkPVwicXVpdFwiXG4gICAgLz5cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9xdWl0X3NjcmVlbi8wLjEuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9qQkE7QUNDQTtBQURBOzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBRENBO0FBREE7QUFDQTtBQUdBO0FDQ0E7QURDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBRW5CQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FGRUE7QUFDQTtBQUNBO0FBaUJBO0FBakJBO0FBMkJBO0FBQ0E7QUFEQTtBQUdBO0FBR0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQVlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQ0E7QUFrQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQXZLQTtBQWJBO0FBQ0E7QUFDQTtBQXNMQTs7Ozs7O0FHNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUZBO0FBREE7QUFXQTs7OztBQWRBO0FBQ0E7QUpnQkE7Ozs7Ozs7Ozs7Ozs7O0FLakJBO0FMQ0E7QUFDQTtBQUFBO0FLRUE7QUxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQVpBO0FBZUE7Ozs7Ozs7Ozs7Ozs7O0FNakJBO0FOQ0E7QUFDQTtBQUFBO0FNRUE7QU5DQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBVkE7QUFnQkE7Ozs7Ozs7Ozs7Ozs7O0FPbEJBO0FQQ0E7QUFDQTtBQUFBO0FPRUE7QVBDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFGQTtBQVZBO0FBbUJBOzs7Ozs7Ozs7Ozs7OztBUXJCQTtBUkNBO0FBQ0E7QUFBQTtBUUVBO0FSQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUZBO0FBVkE7QUFvQkE7Ozs7Ozs7Ozs7Ozs7O0FTdEJBO0FUQ0E7QUFDQTtBQUFBO0FTRUE7QVRDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMQTtBQVpBO0FBdUJBOzs7Ozs7Ozs7Ozs7OztBVXZCQTtBVkNBO0FBQ0E7QUFBQTtBVUVBO0FWQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTEE7QUFXQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUZBO0FBUUE7QUFDQTtBQUNBO0FVREE7QUFHQTtBVkpBO0FBekJBO0FBaUNBO0FBQ0E7QUF0Q0E7QUFDQTs7Ozs7Ozs7O0FXREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QVpDQTtBQUNBO0FBQUE7QVlFQTtBWkNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUEzQkE7QUFtQ0E7Ozs7Ozs7Ozs7Ozs7O0FhckNBO0FiQ0E7QUFDQTtBQUFBO0FhRUE7QWJDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBYURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QWJIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBYkE7QUFtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFaQTtBQWpEQTtBQXFFQTs7Ozs7Ozs7Ozs7Ozs7QWN2RUE7QWRDQTtBQUNBO0FBQUE7QWNFQTtBZENBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU1BO0FBQ0E7QUFYQTtBQURBO0FBZUE7QUFDQTtBQUNBO0FBL0JBO0FBa0NBOzs7Ozs7Ozs7Ozs7OztBZXBDQTtBZkNBO0FBQ0E7QUFBQTtBZUVBO0FmQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFPQTtBQVBBO0FBQUE7QUFKQTtBQURBO0FBaUJBO0FBQ0E7QUFDQTtBQWpDQTtBQW9DQTs7Ozs7Ozs7Ozs7Ozs7QWdCdENBO0FoQkNBO0FBQ0E7QUFBQTtBZ0JFQTtBaEJDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQURBO0FBVEE7QUFpQkE7QUFDQTtBQUNBO0FBakNBO0FBb0NBOzs7Ozs7Ozs7Ozs7QWlCcENBO0FqQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQUFBO0FBNUNBO0FBdURBO0FBQ0E7QUEzREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QWtCQ0E7QWxCQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FrQkNBO0FBQ0E7QWxCQ0E7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFGQTtBQVNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQURBO0FBSEE7QUFGQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FrQkNBO0FsQkNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQURBO0FBRkE7QUFGQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFKQTtBQUZBO0FBQ0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QWtCRUE7QWxCQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBa0JDQTtBbEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QWtCQ0E7QWxCRUE7QUFEQTtBQUpBO0FBRkE7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FrQkVBO0FsQkNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QWtCQ0E7QWxCQ0E7QWtCQ0E7QWxCTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FrQklBO0FBQ0E7QWxCQ0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FrQkNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBUkE7QUFjQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QWxCREE7QUFSQTtBQVlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QWtCQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBbEJDQTtBQUhBO0FBS0E7QUFiQTtBQTlCQTtBQThDQTtBQUNBO0FBQ0E7QUFDQTtBa0JDQTtBQUNBO0FsQkNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBTEE7QUFTQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVBBO0FBV0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFQQTtBQVdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBUEE7QUFXQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBTEE7QUFTQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFEQTtBQUxBO0FBM0RBO0FBMEVBO0FBQUE7QUFBQTtBQUNBO0FrQkRBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QWxCSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBNUJBO0FBckpBO0FBMExBO0FBQ0E7QUEzWEE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QW1CQ0E7QW5CQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFBQTtBQVVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUE5Q0E7QUF3REE7QUFDQTtBQTVEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QW9CQ0E7QXBCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFEQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUE5Q0E7QUF5REE7QUFDQTtBQTdEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXFCQ0E7QXJCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFEQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBT0E7QUFQQTtBQVFBO0FBUkE7QUFBQTtBQVlBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBREE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQU9BO0FBUEE7QUFBQTtBQVdBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQUFBO0FBbERBO0FBNkRBO0FBQ0E7QUFqRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzQkNBO0F0QkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQURBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFPQTtBQVBBO0FBUUE7QUFSQTtBQUFBO0FBWUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFEQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUEvQ0E7QUEwREE7QUFDQTtBQTlEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBdUJEQTtBdkJDQTtBQUNBO0FBQUE7QXVCRUE7QXZCQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFEQTtBQXhCQTtBQW1DQTs7Ozs7Ozs7Ozs7Ozs7QXdCckNBO0F4QkNBO0FBQ0E7QUFBQTtBd0JFQTtBeEJDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0F3QkRBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QXhCSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWJBO0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFEQTtBQVFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFUQTtBQVdBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFEQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFSQTtBQVVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFEQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFYQTtBQXpCQTtBQXpDQTtBQW1GQTs7Ozs7Ozs7Ozs7Ozs7QXlCckZBO0F6QkNBO0FBQ0E7QUFBQTtBeUJFQTtBekJDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBREE7QUF0QkE7QUFpQ0E7Ozs7Ozs7Ozs7OztBMEJqQ0E7QTFCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQU1BO0FBTkE7QUFBQTtBQVVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBbkJBO0FBeUJBO0FBQ0E7QUE3QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QTJCdUJBO0EzQkFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QTJCRUE7QTNCQ0E7QUFDQTtBQUNBO0EyQkxBO0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0EzQkNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQVRBO0FBV0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQVJBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQTdCQTtBQW9DQTtBQUFBO0FBQUE7QUFDQTtBMkJEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0EzQkNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUEzQkE7QUFrQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0EyQkNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBM0JDQTtBMkJDQTtBQUNBO0EzQkNBO0FBQ0E7QUFDQTtBQUNBO0EyQkNBO0EzQkNBO0FBREE7QUFHQTtBQUNBO0EyQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTNCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUF6Q0E7QUE0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQVZBO0FBaUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0EyQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBM0JDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBeEJBO0FBMEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTJCQ0E7QUFDQTtBQUNBO0EzQkNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQW5CQTtBQTlCQTtBQW9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0EyQkNBO0FBQ0E7QTNCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSkE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUpBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQURBO0FBSkE7QUF4Q0E7QUF6T0E7QUFpU0E7QUFDQTtBQTVUQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0E0QmpCQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QTVCSEE7QUFJQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQU9BOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7Ozs7OztBNkJqSkE7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDR0E7QUFDQTs7Ozs7Ozs7Ozs7QUFOQTtBQUNBO0FBQ0E7QXRDQ0E7QUFDQTtBQUdBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQU9BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFNQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUZBO0FBT0E7Ozs7QUE3S0E7QUFDQTtBQStLQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUNBO0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBdUNwTUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0F2Q0NBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFSQTtBQVNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFGQTtBQUtBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BOzs7O0FBaktBO0FBQ0E7QUFtS0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQVpBO0FBQ0E7QUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0F3Q3JMQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QXhDQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTs7OztBQWxEQTtBQUNBO0FBb0RBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBQ0E7QUFLQTs7Ozs7Ozs7Ozs7O0F5QzNEQTtBekNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQU1BO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFmQTtBQXVCQTtBQUNBO0FBM0JBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBMENDQTtBMUNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFoQkE7QUF5QkE7QUFDQTtBQTdCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBMkNEQTtBM0NDQTtBQUNBO0FBQUE7QTJDRUE7QTNDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBREE7QUF0QkE7QUFnQ0E7Ozs7Ozs7Ozs7Ozs7O0E0QzFCQTtBNUNDQTtBQUNBO0FBQUE7QTRDRUE7QTVDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QTRDREE7QUFHQTtBNUNKQTtBQU1BO0FBQ0E7QUFDQTtBNENEQTtBQUdBO0E1Q0pBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQWpCQTtBQURBO0FBbkJBO0FBZ0RBO0FBQ0E7QUEzREE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QTZDTEE7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBN0NDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBRkE7QUFZQTs7OztBQTNDQTtBQUNBO0FBOENBO0FBQ0E7QUFEQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==