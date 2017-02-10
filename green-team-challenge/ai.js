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
/******/ 	var hotCurrentHash = "1bc2c8dcc3d8f1e8ab0b"; // eslint-disable-line no-unused-vars
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

	    var GAME = 'games/';
	    var EFFECT = 'sound-assets/effects/';
	    var VO = 'sound-assets/vos/';
	    var IMAGE = 'image-assets/';
	    var SPRITE = 'sprites-animations/';
	    var FRAME = 'frames/';
	    var FONT = 'fonts/';
	    var SHARED = 'shared/';
	    var MOCK_GAME = 'mock-game/';

	    MEDIA.FONT = MEDIA.BASE + FONT;
	    MEDIA.SHARED = MEDIA.BASE + GAME + SHARED;

	    MEDIA.GAME = MEDIA.BASE + GAME + gameName + '/';
	    MEDIA.EFFECT = MEDIA.GAME + EFFECT;
	    MEDIA.VO = MEDIA.GAME + VO;
	    MEDIA.IMAGE = MEDIA.GAME + IMAGE;
	    MEDIA.SPRITE = MEDIA.GAME + SPRITE;
	    MEDIA.FRAME = MEDIA.GAME + FRAME;
	    MEDIA.FONT = MEDIA.GAME + FONT;

	    MEDIA.MOCK = {};
	    MEDIA.MOCK.GAME = MEDIA.BASE + GAME + MOCK_GAME;
	    MEDIA.MOCK.EFFECT = MEDIA.MOCK.GAME + EFFECT;
	    MEDIA.MOCK.VO = MEDIA.MOCK.GAME + VO;
	    MEDIA.MOCK.IMAGE = MEDIA.MOCK.GAME + IMAGE;
	    MEDIA.MOCK.SPRITE = MEDIA.MOCK.GAME + SPRITE;
	    MEDIA.MOCK.FRAME = MEDIA.MOCK.GAME + FRAME;
	    MEDIA.MOCK.FONT = MEDIA.MOCK.GAME + FONT;

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

	var _hi_there_screen = __webpack_require__(11);

	var _hi_there_screen2 = _interopRequireDefault(_hi_there_screen);

	var _key_is_sorting_screen = __webpack_require__(14);

	var _key_is_sorting_screen2 = _interopRequireDefault(_key_is_sorting_screen);

	var _lights_screen = __webpack_require__(16);

	var _lights_screen2 = _interopRequireDefault(_lights_screen);

	var _five_ways_screen = __webpack_require__(18);

	var _five_ways_screen2 = _interopRequireDefault(_five_ways_screen);

	var _level_screen_component = __webpack_require__(20);

	var _level_screen_component2 = _interopRequireDefault(_level_screen_component);

	var _recycling_champion_one_info_screen = __webpack_require__(21);

	var _recycling_champion_one_info_screen2 = _interopRequireDefault(_recycling_champion_one_info_screen);

	var _recycling_champion_level_one_screen = __webpack_require__(22);

	var _recycling_champion_level_one_screen2 = _interopRequireDefault(_recycling_champion_level_one_screen);

	var _recycling_champion_two_info_screen = __webpack_require__(34);

	var _recycling_champion_two_info_screen2 = _interopRequireDefault(_recycling_champion_two_info_screen);

	var _recycling_champion_level_two_screen = __webpack_require__(35);

	var _recycling_champion_level_two_screen2 = _interopRequireDefault(_recycling_champion_level_two_screen);

	var _recycling_champion_three_info_screen = __webpack_require__(36);

	var _recycling_champion_three_info_screen2 = _interopRequireDefault(_recycling_champion_three_info_screen);

	var _recycling_champion_level_three_screen = __webpack_require__(37);

	var _recycling_champion_level_three_screen2 = _interopRequireDefault(_recycling_champion_level_three_screen);

	var _recycling_champion_four_info_screen = __webpack_require__(38);

	var _recycling_champion_four_info_screen2 = _interopRequireDefault(_recycling_champion_four_info_screen);

	var _recycling_champion_level_four_screen = __webpack_require__(39);

	var _recycling_champion_level_four_screen2 = _interopRequireDefault(_recycling_champion_level_four_screen);

	var _recycling_champion_five_info_screen = __webpack_require__(40);

	var _recycling_champion_five_info_screen2 = _interopRequireDefault(_recycling_champion_five_info_screen);

	var _recycling_champion_level_five_screen = __webpack_require__(41);

	var _recycling_champion_level_five_screen2 = _interopRequireDefault(_recycling_champion_level_five_screen);

	var _level_complete_screen_component = __webpack_require__(42);

	var _level_complete_screen_component2 = _interopRequireDefault(_level_complete_screen_component);

	var _priceless_pourer_one_info_screen = __webpack_require__(43);

	var _priceless_pourer_one_info_screen2 = _interopRequireDefault(_priceless_pourer_one_info_screen);

	var _priceless_pourer_level_one_screen = __webpack_require__(44);

	var _priceless_pourer_level_one_screen2 = _interopRequireDefault(_priceless_pourer_level_one_screen);

	var _priceless_pourer_two_info_screen = __webpack_require__(46);

	var _priceless_pourer_two_info_screen2 = _interopRequireDefault(_priceless_pourer_two_info_screen);

	var _priceless_pourer_level_two_screen = __webpack_require__(47);

	var _priceless_pourer_level_two_screen2 = _interopRequireDefault(_priceless_pourer_level_two_screen);

	var _priceless_pourer_three_info_screen = __webpack_require__(48);

	var _priceless_pourer_three_info_screen2 = _interopRequireDefault(_priceless_pourer_three_info_screen);

	var _priceless_pourer_level_three_screen = __webpack_require__(49);

	var _priceless_pourer_level_three_screen2 = _interopRequireDefault(_priceless_pourer_level_three_screen);

	var _priceless_pourer_four_info_screen = __webpack_require__(50);

	var _priceless_pourer_four_info_screen2 = _interopRequireDefault(_priceless_pourer_four_info_screen);

	var _priceless_pourer_level_four_screen = __webpack_require__(51);

	var _priceless_pourer_level_four_screen2 = _interopRequireDefault(_priceless_pourer_level_four_screen);

	var _priceless_pourer_five_info_screen = __webpack_require__(52);

	var _priceless_pourer_five_info_screen2 = _interopRequireDefault(_priceless_pourer_five_info_screen);

	var _priceless_pourer_level_five_screen = __webpack_require__(53);

	var _priceless_pourer_level_five_screen2 = _interopRequireDefault(_priceless_pourer_level_five_screen);

	var _fantastic_food_sharer_one_info_screen = __webpack_require__(54);

	var _fantastic_food_sharer_one_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_one_info_screen);

	var _fantastic_food_sharer_level_one_screen = __webpack_require__(55);

	var _fantastic_food_sharer_level_one_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_one_screen);

	var _fantastic_food_sharer_two_info_screen = __webpack_require__(57);

	var _fantastic_food_sharer_two_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_two_info_screen);

	var _fantastic_food_sharer_level_two_screen = __webpack_require__(58);

	var _fantastic_food_sharer_level_two_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_two_screen);

	var _fantastic_food_sharer_three_info_screen = __webpack_require__(59);

	var _fantastic_food_sharer_three_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_three_info_screen);

	var _fantastic_food_sharer_level_three_screen = __webpack_require__(60);

	var _fantastic_food_sharer_level_three_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_three_screen);

	var _fantastic_food_sharer_four_info_screen = __webpack_require__(61);

	var _fantastic_food_sharer_four_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_four_info_screen);

	var _fantastic_food_sharer_level_four_screen = __webpack_require__(62);

	var _fantastic_food_sharer_level_four_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_four_screen);

	var _fantastic_food_sharer_five_info_screen = __webpack_require__(63);

	var _fantastic_food_sharer_five_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_five_info_screen);

	var _fantastic_food_sharer_level_five_screen = __webpack_require__(64);

	var _fantastic_food_sharer_level_five_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_five_screen);

	var _dynamic_diverter_one_info_screen = __webpack_require__(65);

	var _dynamic_diverter_one_info_screen2 = _interopRequireDefault(_dynamic_diverter_one_info_screen);

	var _dynamic_diverter_level_one_screen = __webpack_require__(66);

	var _dynamic_diverter_level_one_screen2 = _interopRequireDefault(_dynamic_diverter_level_one_screen);

	var _dynamic_diverter_two_info_screen = __webpack_require__(82);

	var _dynamic_diverter_two_info_screen2 = _interopRequireDefault(_dynamic_diverter_two_info_screen);

	var _dynamic_diverter_level_two_screen = __webpack_require__(83);

	var _dynamic_diverter_level_two_screen2 = _interopRequireDefault(_dynamic_diverter_level_two_screen);

	var _dynamic_diverter_three_info_screen = __webpack_require__(84);

	var _dynamic_diverter_three_info_screen2 = _interopRequireDefault(_dynamic_diverter_three_info_screen);

	var _dynamic_diverter_level_three_screen = __webpack_require__(85);

	var _dynamic_diverter_level_three_screen2 = _interopRequireDefault(_dynamic_diverter_level_three_screen);

	var _dynamic_diverter_four_info_screen = __webpack_require__(86);

	var _dynamic_diverter_four_info_screen2 = _interopRequireDefault(_dynamic_diverter_four_info_screen);

	var _dynamic_diverter_level_four_screen = __webpack_require__(87);

	var _dynamic_diverter_level_four_screen2 = _interopRequireDefault(_dynamic_diverter_level_four_screen);

	var _dynamic_diverter_five_info_screen = __webpack_require__(88);

	var _dynamic_diverter_five_info_screen2 = _interopRequireDefault(_dynamic_diverter_five_info_screen);

	var _dynamic_diverter_level_five_screen = __webpack_require__(89);

	var _dynamic_diverter_level_five_screen2 = _interopRequireDefault(_dynamic_diverter_level_five_screen);

	var _want_to_stack_screen = __webpack_require__(90);

	var _want_to_stack_screen2 = _interopRequireDefault(_want_to_stack_screen);

	var _video_screen = __webpack_require__(91);

	var _video_screen2 = _interopRequireDefault(_video_screen);

	var _master_sorter_one_info_screen = __webpack_require__(92);

	var _master_sorter_one_info_screen2 = _interopRequireDefault(_master_sorter_one_info_screen);

	var _master_sorter_level_one_screen = __webpack_require__(93);

	var _master_sorter_level_one_screen2 = _interopRequireDefault(_master_sorter_level_one_screen);

	var _master_sorter_two_info_screen = __webpack_require__(95);

	var _master_sorter_two_info_screen2 = _interopRequireDefault(_master_sorter_two_info_screen);

	var _master_sorter_level_two_screen = __webpack_require__(96);

	var _master_sorter_level_two_screen2 = _interopRequireDefault(_master_sorter_level_two_screen);

	var _master_sorter_three_info_screen = __webpack_require__(97);

	var _master_sorter_three_info_screen2 = _interopRequireDefault(_master_sorter_three_info_screen);

	var _master_sorter_level_three_screen = __webpack_require__(98);

	var _master_sorter_level_three_screen2 = _interopRequireDefault(_master_sorter_level_three_screen);

	var _master_sorter_four_info_screen = __webpack_require__(99);

	var _master_sorter_four_info_screen2 = _interopRequireDefault(_master_sorter_four_info_screen);

	var _master_sorter_level_four_screen = __webpack_require__(100);

	var _master_sorter_level_four_screen2 = _interopRequireDefault(_master_sorter_level_four_screen);

	var _master_sorter_five_info_screen = __webpack_require__(101);

	var _master_sorter_five_info_screen2 = _interopRequireDefault(_master_sorter_five_info_screen);

	var _master_sorter_level_five_screen = __webpack_require__(102);

	var _master_sorter_level_five_screen2 = _interopRequireDefault(_master_sorter_level_five_screen);

	var _now_a_member_screen = __webpack_require__(103);

	var _now_a_member_screen2 = _interopRequireDefault(_now_a_member_screen);

	var _quit_screen = __webpack_require__(104);

	var _quit_screen2 = _interopRequireDefault(_quit_screen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _hi_there_screen2.default, _key_is_sorting_screen2.default, _lights_screen2.default, _five_ways_screen2.default, (0, _level_screen_component2.default)(1.0), _recycling_champion_one_info_screen2.default, _recycling_champion_level_one_screen2.default, (0, _level_screen_component2.default)(1.1), _recycling_champion_two_info_screen2.default, _recycling_champion_level_two_screen2.default, (0, _level_screen_component2.default)(1.2), _recycling_champion_three_info_screen2.default, _recycling_champion_level_three_screen2.default, (0, _level_screen_component2.default)(1.3), _recycling_champion_four_info_screen2.default, _recycling_champion_level_four_screen2.default, (0, _level_screen_component2.default)(1.4), _recycling_champion_five_info_screen2.default, _recycling_champion_level_five_screen2.default, (0, _level_screen_component2.default)(1.5), (0, _level_complete_screen_component2.default)(1), (0, _level_screen_component2.default)(2.0), _priceless_pourer_one_info_screen2.default, _priceless_pourer_level_one_screen2.default, (0, _level_screen_component2.default)(2.1), _priceless_pourer_two_info_screen2.default, _priceless_pourer_level_two_screen2.default, (0, _level_screen_component2.default)(2.2), _priceless_pourer_three_info_screen2.default, _priceless_pourer_level_three_screen2.default, (0, _level_screen_component2.default)(2.3), _priceless_pourer_four_info_screen2.default, _priceless_pourer_level_four_screen2.default, (0, _level_screen_component2.default)(2.4), _priceless_pourer_five_info_screen2.default, _priceless_pourer_level_five_screen2.default, (0, _level_screen_component2.default)(2.5), (0, _level_complete_screen_component2.default)(2), (0, _level_screen_component2.default)(3.0), _fantastic_food_sharer_one_info_screen2.default, _fantastic_food_sharer_level_one_screen2.default, (0, _level_screen_component2.default)(3.1), _fantastic_food_sharer_two_info_screen2.default, _fantastic_food_sharer_level_two_screen2.default, (0, _level_screen_component2.default)(3.2), _fantastic_food_sharer_three_info_screen2.default, _fantastic_food_sharer_level_three_screen2.default, (0, _level_screen_component2.default)(3.3), _fantastic_food_sharer_four_info_screen2.default, _fantastic_food_sharer_level_four_screen2.default, (0, _level_screen_component2.default)(3.4), _fantastic_food_sharer_five_info_screen2.default, _fantastic_food_sharer_level_five_screen2.default, (0, _level_screen_component2.default)(3.5), (0, _level_complete_screen_component2.default)(3), (0, _level_screen_component2.default)(4.0), _dynamic_diverter_one_info_screen2.default, _dynamic_diverter_level_one_screen2.default, (0, _level_screen_component2.default)(4.1), _dynamic_diverter_two_info_screen2.default, _dynamic_diverter_level_two_screen2.default, (0, _level_screen_component2.default)(4.2), _dynamic_diverter_three_info_screen2.default, _dynamic_diverter_level_three_screen2.default, (0, _level_screen_component2.default)(4.3), _dynamic_diverter_four_info_screen2.default, _dynamic_diverter_level_four_screen2.default, (0, _level_screen_component2.default)(4.4), _dynamic_diverter_five_info_screen2.default, _dynamic_diverter_level_five_screen2.default, (0, _level_screen_component2.default)(4.5), (0, _level_complete_screen_component2.default)(4), _want_to_stack_screen2.default, _video_screen2.default, (0, _level_screen_component2.default)(5.0), _master_sorter_one_info_screen2.default, _master_sorter_level_one_screen2.default, (0, _level_screen_component2.default)(5.1), _master_sorter_two_info_screen2.default, _master_sorter_level_two_screen2.default, (0, _level_screen_component2.default)(5.2), _master_sorter_three_info_screen2.default, _master_sorter_level_three_screen2.default, (0, _level_screen_component2.default)(5.3), _master_sorter_four_info_screen2.default, _master_sorter_level_four_screen2.default, (0, _level_screen_component2.default)(5.4), _master_sorter_five_info_screen2.default, _master_sorter_level_five_screen2.default, (0, _level_screen_component2.default)(5.5), (0, _level_complete_screen_component2.default)(5), _now_a_member_screen2.default, (0, _level_complete_screen_component2.default)(6)],
	    menus: {
	        quit: _quit_screen2.default
	    },
	    assets: [React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_recycle.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_liquids.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_landfill.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_foodshare.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_compost.json' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_recycle.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_liquids.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_landfill.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_foodshare.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_compost.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'purple.ribbon.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'luggage.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.star.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.01.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.02.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'transition.frame.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.mainnav.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'titlescrnbg.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.01.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.02.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.03.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.04.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.transition.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.recycle.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.landfill.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.compost.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'quit.background.jpg' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'button', src: CMWN.MEDIA.EFFECT + 'ButtonClick.mp3' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'screen-complete', src: MEDIA.EFFECT + 'NextAppear.mp3' }), React.createElement(skoash.Audio, { ref: 'BKGtitle', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKGtitle.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG1', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG2', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG2.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG3', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG3.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG4', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG4.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG5', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG5.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG6', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG6.mp3', loop: true }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background bkg1' }), React.createElement('div', { className: 'background bkg2' }), React.createElement('div', { className: 'background bkg3' }), React.createElement('div', { className: 'background bkg4' }), React.createElement('div', { className: 'background trash' }), React.createElement('div', { className: 'background transition' }), React.createElement('div', { className: 'background quit' })]
	}));

		if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "green-team-challenge",
		"version": 1,
		"skoash": "1.1.3",
		"head_injection": "",
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
	        React.createElement(skoash.Image, { className: "hidden", src: CMWN.MEDIA.SHARED + "ios-start-ball.png" }),
	        React.createElement(skoash.Image, { className: "hidden", src: CMWN.MEDIA.SHARED + "ios-start-ball-anim.gif" })
	    );
		};

/***/ },
/* 7 */
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
	            id: 'title',
	            backgroundAudio: 'BKGtitle'
	        }),
	        React.createElement('h3', { content: 'Green Team Challenge' }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'gradient-texture.jpg'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'trash',
	            src: CMWN.MEDIA.IMAGE + 'titletrashcan.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'character',
	            src: CMWN.MEDIA.IMAGE + 'greenteamcharac.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'tray',
	            src: CMWN.MEDIA.IMAGE + 'titletray.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            {
	                className: FIREWORKS,
	                ref: FIREWORKS,
	                onStart: onStart,
	                onStop: onStop
	            },
	            React.createElement(skoash.Image, {
	                ref: 'image',
	                src: CMWN.MEDIA.IMAGE + 'titlescrnbg.jpg'
	            })
	        )
	    );
	};

	__webpack_require__(8);

	var FIREWORKS = 'fireworks';

	var onStart = function onStart() {
	    this.effect = window.CMWN.makeEffect('fireworks', ReactDOM.findDOMNode(this), {
	        backgroundImage: ReactDOM.findDOMNode(this.refs.image)
	    });
	};

	var onStop = function onStop() {
	    _.invoke(this.effect, 'destroy');
	    delete this.effect;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _effects = __webpack_require__(9);

	var _effects2 = _interopRequireDefault(_effects);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var makeEffect = function makeEffect(effectName, node) {
	    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    return _.invoke(_effects2.default, effectName, node, opts);
	};

	if (!window.CMWN) window.CMWN = {};
	if (!window.CMWN.makeEffect) window.CMWN.makeEffect = makeEffect;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fireworks = __webpack_require__(10);

	var _fireworks2 = _interopRequireDefault(_fireworks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    fireworks: _fireworks2.default
		};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (node, opts) {
	    return new Fireworks(node, opts);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// code taken from http://codepen.io/haidang/pen/eBoqyw

	var Fireworks = function () {
	    function Fireworks(node, opts) {
	        _classCallCheck(this, Fireworks);

	        var canvas = document.createElement('CANVAS');
	        canvas.width = node.offsetWidth;
	        canvas.height = node.offsetHeight;
	        var ctx = canvas.getContext('2d');
	        var pat = '#000';

	        if (opts.backgroundImage) {
	            var tempCanvas = document.createElement('canvas');
	            var tCtx = tempCanvas.getContext('2d');

	            tempCanvas.width = canvas.width;
	            tempCanvas.height = canvas.height;

	            tCtx.drawImage(opts.backgroundImage, 0, 0, opts.backgroundImage.naturalWidth, opts.backgroundImage.naturalHeight, 0, 0, tempCanvas.width, tempCanvas.height);

	            pat = ctx.createPattern(tempCanvas, 'repeat');
	        } else if (opts.backgroundColor) {
	            pat = opts.backgroundColor;
	        }

	        // resize
	        window.addEventListener('resize', function () {
	            canvas.width = node.offsetWidth;
	            canvas.height = node.offsetHeight;
	            ctx.rect(0, 0, canvas.width, canvas.height);
	            ctx.fillStyle = pat;
	            ctx.fill();
	        });

	        node.appendChild(canvas);

	        // init
	        ctx.rect(0, 0, canvas.width, canvas.height);
	        ctx.fillStyle = pat;
	        ctx.fill();
	        // objects
	        var listFire = [];
	        var listFirework = [];
	        var fireNumber = 10;
	        var center = { x: canvas.width / 2, y: canvas.height / 2 };
	        var range = 100;
	        for (var i = 0; i < fireNumber; i++) {
	            var fire = {
	                x: Math.random() * range / 2 - range / 4 + center.x,
	                y: Math.random() * range * 2 + canvas.height,
	                size: Math.random() + 4.5,
	                fill: '#fd1',
	                vx: Math.random() - 0.5,
	                vy: -(Math.random() + 4),
	                ax: Math.random() * 0.02 - 0.01,
	                far: Math.random() * range + (center.y - range)
	            };
	            fire.base = {
	                x: fire.x,
	                y: fire.y,
	                vx: fire.vx
	            };

	            listFire.push(fire);
	        }

	        this.loop = this.loop.bind(this, opts, pat, canvas, ctx, listFire, listFirework, fireNumber, range);

	        this.loop();

	        this.node = node;
	        this.canvas = canvas;
	    }

	    _createClass(Fireworks, [{
	        key: 'loop',
	        value: function loop(opts, pat, canvas, ctx, listFire, listFirework, fireNumber, range) {
	            if (this.destroyed) return;
	            requestAnimationFrame(this.loop);
	            this.update(opts, listFire, listFirework, fireNumber, range);
	            this.draw(opts, pat, canvas, ctx, listFire, listFirework);
	        }
	    }, {
	        key: 'randColor',
	        value: function randColor() {
	            var r = Math.floor(Math.random() * 256);
	            var g = Math.floor(Math.random() * 256);
	            var b = Math.floor(Math.random() * 256);
	            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	        }
	    }, {
	        key: 'update',
	        value: function update(opts, listFire, listFirework, fireNumber, range) {
	            for (var i = 0; i < listFire.length; i++) {
	                var fire = listFire[i];

	                if (fire.y <= fire.far) {
	                    // case add firework
	                    var color = this.randColor();
	                    for (var j = 0; j < fireNumber * 5; j++) {
	                        var firework = {
	                            x: fire.x,
	                            y: fire.y,
	                            size: Math.random() + 4.5,
	                            fill: color,
	                            vx: Math.random() * 15 - 7.5,
	                            vy: Math.random() * -15 + 4.5,
	                            ay: 0.05,
	                            alpha: 1,
	                            life: Math.round(Math.random() * range / 2) + range / 2
	                        };
	                        firework.base = {
	                            life: firework.life,
	                            size: firework.size
	                        };
	                        listFirework.push(firework);
	                    }
	                    // reset
	                    fire.y = fire.base.y;
	                    fire.x = fire.base.x;
	                    fire.vx = fire.base.vx;
	                    fire.ax = Math.random() * 0.02 - 0.01;
	                }

	                fire.x += fire.vx;
	                fire.y += fire.vy;
	                fire.vx += fire.ax;
	            }

	            for (var _i = listFirework.length - 1; _i >= 0; _i--) {
	                var _firework = listFirework[_i];
	                if (_firework) {
	                    _firework.x += _firework.vx;
	                    _firework.y += _firework.vy;
	                    _firework.vy += _firework.ay;
	                    _firework.alpha = _firework.life / _firework.base.life;
	                    _firework.size = _firework.alpha * _firework.base.size;
	                    _firework.alpha = _firework.alpha > 0.6 ? 1 : _firework.alpha;

	                    _firework.life--;
	                    if (_firework.life <= 0) {
	                        listFirework.splice(_i, 1);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'draw',
	        value: function draw(opts, pat, canvas, ctx, listFire, listFirework) {
	            // clear
	            ctx.globalCompositeOperation = 'source-over';
	            ctx.globalAlpha = 0.18;
	            ctx.rect(0, 0, canvas.width, canvas.height);
	            ctx.fillStyle = pat;
	            ctx.fill();

	            // re-draw
	            ctx.globalCompositeOperation = 'screen';
	            ctx.globalAlpha = 1;
	            for (var i = 0; i < listFire.length; i++) {
	                var fire = listFire[i];
	                ctx.beginPath();
	                ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
	                ctx.closePath();
	                ctx.fillStyle = fire.fill;
	                ctx.fill();
	            }

	            for (var _i2 = 0; _i2 < listFirework.length; _i2++) {
	                var firework = listFirework[_i2];
	                ctx.globalAlpha = firework.alpha;
	                ctx.beginPath();
	                ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
	                ctx.closePath();
	                ctx.fillStyle = firework.fill;
	                ctx.fill();
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.destroyed = true;
	            this.node.removeChild(this.canvas);
	        }
	    }]);

	    return Fireworks;
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'hi-there',
	        content: React.createElement(
	            'p',
	            null,
	            'Hi there!',
	            React.createElement('br', null),
	            'I\'m here to',
	            React.createElement('br', null),
	            'teach you about',
	            React.createElement('br', null),
	            'sorting waste at',
	            React.createElement('br', null),
	            'your school!'
	        ),
	        vo: 'HiThere',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG6'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

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
	            id: opts.id,
	            backgroundAudio: opts.backgroundAudio,
	            className: (0, _classnames2.default)('info', opts.className)
	        }),
	        renderVO(opts),
	        renderSFX(opts),
	        renderImage(opts),
	        React.createElement(skoash.Image, { className: "hidden", src: FRAME }),
	        React.createElement(
	            "div",
	            { className: "frame" },
	            opts.content
	        ),
	        React.createElement(skoash.Compoent, {
	            checkComplete: false,
	            complete: true,
	            children: [].concat(opts.extras || [])
	        })
	    );
	};

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CHARACTER = CMWN.MEDIA.IMAGE + "greenteamcharac.png";
	var FRAME = CMWN.MEDIA.FRAME + "frame.01.png";

	var renderVO = function renderVO(opts) {
	    if (!opts.vo) return null;

	    return React.createElement(skoash.Audio, {
	        type: "voiceOver",
	        src: "" + CMWN.MEDIA.VO + opts.vo + ".mp3"
	    });
	};

	var renderSFX = function renderSFX(opts) {
	    if (!opts.sfx) return null;

	    return React.createElement(skoash.Audio, {
	        type: "sfx",
	        ref: "start",
	        src: "" + CMWN.MEDIA.EFFECT + opts.sfx + ".mp3"
	    });
	};

	var renderImage = function renderImage(opts) {
	    if (opts.renderImage === false) return null;

	    return React.createElement(skoash.Image, { className: "character", src: opts.image || CHARACTER });
		};

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'key-is-sorting',
	        className: 'right',
	        content: React.createElement(
	            'p',
	            null,
	            'The key is SORTING!',
	            React.createElement('br', null),
	            'There are 5 WAYS',
	            React.createElement('br', null),
	            'you can sort',
	            React.createElement('br', null),
	            'the food waste',
	            React.createElement('br', null),
	            'at your school...'
	        ),
	        vo: 'TheKey',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG6',
	        extras: arrayOfAudio
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	var _items_recycle = __webpack_require__(15);

	var _items_recycle2 = _interopRequireDefault(_items_recycle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var audioRefs = _.uniq(_.map(_items_recycle2.default, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var arrayOfAudio = _.map(audioRefs, function (v, k) {
	    return React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: v,
	        key: k,
	        src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	        complete: true
	    });
		});

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'recycle';
	var names = ['aluminum-foil', 'Aluminum-food-can-1', 'Aluminum-food-can-2', 'Aluminum-food-can-3', 'aluminum-food-can-5', 'aluminum-pan', 'bagel-package', 'cardboard-box', 'empty-aluminum-can-1', 'empty-aluminum-can-2', 'empty-aluminum-can-3', 'empty-aluminum-can-4', 'box-of-cookies-3', 'empty-chocolate-milk-carton-2', 'empty-chocolate-milk-carton-4', 'empty-chocolate-milk-carton-5', 'empty-chocolate-milk-carton-6', 'empty-chocolate-milk-carton', 'empty-cookie-box-1', 'empty-cookie-box-2', 'empty-milk-carton-12', 'empty-milk-carton-13', 'empty-milk-carton-14', 'empty-plastic-bottle-1', 'empty-plastic-bottle-2', 'empty-plastic-bottle-3', 'empty-yogurt-container-2', 'empty-yogurt-container-3', 'empty-yogurt-container-5', 'empty-yogurt-container-6', 'empty-yogurt-container-7', 'empty-yogurt-container-8', 'empty-yogurt-container-9', 'empty-yogurt-container-10', 'orange-soda-can', 'paper-folder', 'paper-packaging-1', 'paper-packaging-8', 'paper-packaging', 'plastic-cup-1', 'plastic-cup-2', 'plastic-cup-3', 'plastic-cup-4', 'plastic-cup-5', 'plastic-cup-6', 'plastic-cup-7', 'plastic-lids-1', 'plastic-packaging-2', 'plastic-packaging-4', 'plastic-packaging-5', 'plastic-packaging-6', 'plastic-packaging-7', 'wrapping-paper'];

	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
		});

/***/ },
/* 16 */
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
	            id: 'lights',
	            backgroundAudio: 'BKG6'
	        }),
	        React.createElement(skoash.Repeater, {
	            amount: imageSrcs.length,
	            item: React.createElement(skoash.Image, { className: 'hidden' }),
	            props: imageSrcs
	        }),
	        React.createElement(skoash.Component, {
	            className: 'lights',
	            children: binComponents
	        }),
	        React.createElement(skoash.Component, {
	            className: 'bins',
	            children: binComponents
	        }),
	        skoash.mixins.SelectableReveal(props, {
	            selectables: binComponents,
	            reveals: revealList,
	            media: mediaCollectionList,
	            SelectableProps: {
	                selectClass: 'HIGHLIGHTED'
	            }
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.selectable.target') && 'click'
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                {
	                    ref: 'click'
	                },
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'ClickRecButton.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'InfoFrameMove1.mp3'
	                })
	            )
	        ),
	        React.createElement(skoash.Compoent, {
	            checkComplete: false,
	            complete: true,
	            children: [].concat(arrayOfAudio || [])
	        })
	    );
	};

	var _items_landfill = __webpack_require__(17);

	var _items_landfill2 = _interopRequireDefault(_items_landfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var binNames = ['recycle', 'landfill', 'liquids', 'compost', 'food-share'];

	var revealContent = {
	    recycle: React.createElement(
	        'p',
	        null,
	        'RECYCLING items are those',
	        React.createElement('br', null),
	        'that can be reprocessed and',
	        React.createElement('br', null),
	        'made into new products.',
	        React.createElement('br', null),
	        'Paper, metal, and plastic are',
	        React.createElement('br', null),
	        'common recyclable materials.'
	    ),
	    landfill: React.createElement(
	        'p',
	        null,
	        'LANDFILL items are things that',
	        React.createElement('br', null),
	        'just can\'t be reused in any way.',
	        React.createElement('br', null),
	        'Put your thinking cap on!',
	        React.createElement('br', null),
	        'Look for ways to make',
	        React.createElement('br', null),
	        'different choices that',
	        React.createElement('br', null),
	        'reduce landfill waste.'
	    ),
	    liquids: React.createElement(
	        'p',
	        null,
	        'LIQUIDS must be separated',
	        React.createElement('br', null),
	        'from their containers!',
	        React.createElement('br', null),
	        'This allows for the containers',
	        React.createElement('br', null),
	        'to be properly processed.',
	        React.createElement('br', null),
	        'Get pouring!'
	    ),
	    compost: React.createElement(
	        'p',
	        null,
	        'COMPOSTING is',
	        React.createElement('br', null),
	        'fertilizer in the making!',
	        React.createElement('br', null),
	        'It\'s made from food scraps',
	        React.createElement('br', null),
	        'and organic materials',
	        React.createElement('br', null),
	        'that decay and become',
	        React.createElement('br', null),
	        'food for plants!'
	    ),
	    'food-share': React.createElement(
	        'p',
	        null,
	        'FOOD SHARING is',
	        React.createElement('br', null),
	        'a great way to keep',
	        React.createElement('br', null),
	        'from wasting food!',
	        React.createElement('br', null),
	        'Leave items that others',
	        React.createElement('br', null),
	        'can make into a snack!'
	    )
	};

	var revealVOs = {
	    recycle: 'RecyclingMaterials',
	    landfill: 'ThinkingCap',
	    liquids: 'GetPouring',
	    compost: 'CompostingExplain',
	    'food-share': 'FoodSharingExplain'
	};

	var binComponents = _.map(binNames, function (bin) {
	    return React.createElement(skoash.Component, { className: bin, message: bin });
	});

	var revealList = _.map(revealContent, function (content, ref) {
	    return React.createElement(
	        skoash.Component,
	        { ref: ref },
	        content
	    );
	});

	var mediaCollectionList = _.map(revealVOs, function (content, ref) {
	    return React.createElement(skoash.Audio, { type: 'voiceOver', ref: ref, src: CMWN.MEDIA.VO + content + '.mp3' });
	});

	var imageSrcs = [CMWN.MEDIA.IMAGE + 'lights.png', CMWN.MEDIA.SPRITE + 'sprite.bins.png', CMWN.MEDIA.SPRITE + 'sprite.btn.png'];

	var audioRefs = _.uniq(_.map(_items_landfill2.default, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var arrayOfAudio = _.map(audioRefs, function (v, k) {
	    return React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: v,
	        key: k,
	        src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	        complete: true
	    });
		});

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'landfill';
	var names = ['applesauce-pouch-1', 'applesauce-pouch-2', 'applesauce-pouch-3', 'applesauce-pouch-4', 'bag-of-wrappers', 'bubble-wrap', 'burrito-wrapper-1', 'burrito-wrapper-2', 'burrito-wrapper-3', 'burrito-wrapper-4', 'cereal-lid-wrapper-1', 'cereal-lid-wrapper-2', 'cereal-lid-wrapper-3', 'cereal-lid-wrapper-4', 'cereal-lid-wrapper-5', 'empty-chip-bag', 'empty-chip-bag', 'empty-cracker-wrapper-1', 'empty-cracker-wrapper-2', 'empty-cracker-wrapper-3', 'empty-cracker-wrapper-4', 'Empty-fruit-juice-plastic-1', 'Empty-fruit-juice-plastic-2', 'Empty-fruit-juice-plastic-3', 'Empty-fruit-juice-plastic-4', 'empty-lemonade-box-5', 'empty-lemonade-box', 'empty-potato-chip-bag-2', 'empty-potato-chip-bag-3', 'empty-potato-chip-bag', 'energy-bar-wrapper-2', 'energy-bar-wrapper', 'fruit-drink-empty-pouch', 'fruit-snack-wrapper-2', 'fruit-snack-wrapper-3', 'gift-ribbons', 'graham-cookie-wrapper-1', 'graham-cookie-wrapper', 'paper-juice-box-1', 'paper-juice-box-2', 'paper-juice-box-3', 'plastic fork', 'plastic-baggie-2', 'plastic-baggie', 'plastic-knife', 'plastic-spoon', 'plastic-straws', 'red-gift-bow', 'styrofoam-container-1', 'styrofoam-container-2', 'styrofoam-container-3', 'styrofoam-container-5', 'styrofoam-soup-cup'];

	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
		});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'five-ways',
	        className: 'right',
	        content: React.createElement(
	            'p',
	            null,
	            'With 5 ways',
	            React.createElement('br', null),
	            'to sort let\'s test',
	            React.createElement('br', null),
	            'your knowledge!'
	        ),
	        vo: '5Ways',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG6',
	        extras: arrayOfAudio
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	var _items_compost = __webpack_require__(19);

	var _items_compost2 = _interopRequireDefault(_items_compost);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var audioRefs = _.uniq(_.map(_items_compost2.default, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var arrayOfAudio = _.map(audioRefs, function (v, k) {
	    return React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        ref: v,
	        key: k,
	        src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	        complete: true
	    });
		});

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'compost';
	var names = ['apple-core', 'banana-peel', 'carrot-sticks', 'celery-stick', 'chicken-leg', 'coffee-cup-2', 'coffee-cup', 'coffee-grounds', 'dirty-paper-food-container', 'empty-raisin-box-1', 'empty-raisin-box-2', 'empty-raisin-box-3', 'empty-raisin-box-4', 'food-soiled-paper plate', 'ham-sandwich', 'orange-slice', 'pencil-shavings-1', 'pencil-shavings-2', 'pencil-shavings-3', 'pencil-shavings', 'pizza-crust', 'teabag', 'unused-paper-tray-1', 'unused-paper-tray-2', 'unused-paper-tray-3', 'unused-paper-tray-4', 'used-napkins', 'used-paper-food-container', 'used-paper-sandwich-wrapper-1', 'used-paper-sandwich-wrapper-2', 'used-paper-sandwich-wrapper-4', 'used-takeout-containers', 'used-white-napkin', 'white-paper-towel-sheet'];

	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
		});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (levelNumber) {
	    var levelInt = _.floor(levelNumber);
	    var levelKey = levelKeys[levelInt - 1];
	    var levelName = levelNames[levelInt - 1];

	    return function (props, ref, key) {
	        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	        var levelData = _.get(props, 'gameState.data.' + levelKey + '.levels', {});
	        var repeaterProps = _.map(_.get(props, 'data.earned'), function (level, index) {
	            return { className: level.playing && _.get(levelData, index + '.complete') ? 'earned' : '' };
	        });
	        var allEarned = repeaterProps.length === 5 && _.every(repeaterProps, function (v) {
	            return v.className;
	        });

	        return React.createElement(
	            skoash.Screen,
	            _extends({}, props, {
	                ref: ref,
	                key: key,
	                id: 'pre-level-' + levelNumber,
	                backgroundAudio: 'BKG' + levelInt,
	                className: (0, _classnames2.default)(opts.className, {
	                    ALL_EARNED: allEarned,
	                    APPEAR: _.get(props, 'data.appear.playing')
	                })
	            }),
	            React.createElement(skoash.MediaSequence, {
	                children: [React.createElement(skoash.Audio, {
	                    playTarget: 'appear',
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'LevelAppear.mp3'
	                }), React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'LevelComplete.mp3'
	                })].concat(_.map(levelData, function (data, level) {
	                    return React.createElement(skoash.Audio, {
	                        playTarget: ['earned', level],
	                        type: 'sfx',
	                        src: CMWN.MEDIA.EFFECT + 'GetStar.mp3',
	                        volume: data.complete ? 1 : 0
	                    });
	                }))
	            }),
	            React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'purple.ribbon.png' }),
	            React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'luggage.png' }),
	            React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'flips.png' }),
	            React.createElement(skoash.Repeater, {
	                className: 'stars',
	                amount: 5,
	                props: repeaterProps
	            }),
	            React.createElement(
	                'div',
	                { className: 'frame' },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Level ',
	                    levelInt
	                ),
	                levelName
	            )
	        );
	    };
	};

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var levelKeys = ['recyclingChampion', 'pricelessPourer', 'fantasticFoodSharer', 'dynamicDiverter', 'masterSorter'];

	var levelNames = [React.createElement(
	    'p',
	    null,
	    'Recycling',
	    React.createElement('br', null),
	    'Champion'
	), React.createElement(
	    'p',
	    null,
	    'Priceless',
	    React.createElement('br', null),
	    'Pourer'
	), React.createElement(
	    'p',
	    null,
	    'Fantastic',
	    React.createElement('br', null),
	    'Food Sharer'
	), React.createElement(
	    'p',
	    null,
	    'Dynamic',
	    React.createElement('br', null),
	    'Diverter'
	), React.createElement(
	    'p',
	    null,
	    'Master',
	    React.createElement('br', null),
	    'Sorter'
		)];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'recycling-champion-one-info',
	        className: 'small',
	        content: React.createElement(
	            'p',
	            null,
	            'Let\'s start with simple sorting',
	            React.createElement('br', null),
	            'of Recyclables, Compostables',
	            React.createElement('br', null),
	            'and Landfill items.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Push the correct button to land',
	            React.createElement('br', null),
	            'items in the bin they belong to.'
	        ),
	        vo: 'LetsStart',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG1'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 1,
	        scoreToWin: 665
	    }, _default_recycling_champion_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    if (Math.abs(props.gameState.currentScreenIndex - parseInt(key, 10)) > 2) {
	        return React.createElement(skoash.Screen, _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: opts.gameName + '-' + opts.level,
	            backgroundAudio: 'BKG' + opts.gameNumber
	        }));
	    } else {
	        var screenProps = void 0;
	        var timerProps = void 0;
	        var revealProps = void 0;
	        var selectableProps = void 0;
	        var dropperProps = void 0;
	        var catcherProps = void 0;
	        var lifeProps = void 0;
	        var extraComponents = void 0;

	        var LEVEL_PATH = 'gameState.data.' + _.camelCase(opts.gameName) + '.levels.' + opts.level;

	        var catchablesArray = opts.getCatchablesArray();

	        var binComponents = _.map(opts.binNames, function (name) {
	            return React.createElement(skoash.Component, { className: name, message: name });
	        });

	        var scale = _.get(props, 'gameState.scale', 1);
	        var start = _.get(props, LEVEL_PATH + '.start', false);
	        var gameComplete = _.get(props, LEVEL_PATH + '.complete', false);
	        var drop = _.get(props, 'data.manual-dropper.drop', false);
	        var dropClass = _.get(props, 'data.manual-dropper.dropClass');
	        var pickUp = _.get(props, 'data.manual-dropper.pickUp', false);
	        var onPickUp = _.get(props, 'data.manual-dropper.onPickUp');
	        var selectItem = _.get(props, 'data.manual-dropper.selectItem');
	        var catchableRefs = _.get(props, 'data.manual-dropper.refs', []);
	        var itemRef = _.get(props, 'data.item.ref');
	        var removeItemClassName = _.get(props, 'data.item.removeClassName');
	        var itemTop = _.get(props, 'data.item.top', 0) / scale;
	        var itemLeft = _.get(props, 'data.item.left', 0) / scale || 'auto';
	        var caught = _.get(props, 'data.catcher.caught', '');
	        var revealOpen = _.get(props, 'data.reveal.open', false);
	        var revealClose = _.get(props, 'data.reveal.close', false);
	        var play = _.get(props, 'data.play', null);

	        var audioArray = opts.getAudioArray();

	        if (itemRef) catchableRefs = [itemRef];

	        opts.next = _.get(props, 'data.manual-dropper.next', false);
	        opts.itemRef = itemRef;
	        opts.itemName = _.get(props, 'data.item.name', '');
	        opts.itemNew = _.get(props, 'data.item.new', false);
	        opts.itemClassName = _.get(props, 'data.item.className');
	        opts.itemAmount = _.get(props, 'data.item.amount', 0);
	        opts.pour = _.get(props, 'data.item.pour', false);
	        opts.score = _.get(props, LEVEL_PATH + '.score', 0);
	        opts.highScore = _.get(props, LEVEL_PATH + '.highScore', 0);
	        opts.left = _.get(props, 'data.manual-dropper.left', 0);
	        opts.hits = _.get(props, LEVEL_PATH + '.hits', 0);
	        opts.truckClassName = _.get(props, 'data.truckClassName', '');
	        opts.selectableMessage = _.get(props, 'data.selectable.message', '');
	        opts.moveClaw = _.get(props, 'data.moveClaw', false);
	        opts.playAudio = play ? play : drop && !opts.truckClassName ? 'drop' : pickUp ? 'pickUp' : opts.next ? 'next' : opts.pour ? 'pour' : opts.next ? 'correct' : revealOpen === 'resort' ? 'resort' : opts.itemNew ? _.upperFirst(_.camelCase(opts.itemName)) : dropClass === 'TRAY-STACKING' && _.includes(opts.itemName, 'tray') ? 'tray' : opts.itemName ? 'select' : null;

	        screenProps = opts.getScreenProps(opts);
	        timerProps = opts.getTimerProps(opts);
	        revealProps = opts.getRevealProps(opts);
	        selectableProps = opts.getSelectableProps(opts);
	        dropperProps = opts.getDropperProps(opts);
	        catcherProps = opts.getCatcherProps(opts);
	        lifeProps = opts.getLifeProps(opts);
	        extraComponents = opts.getExtraComponents(opts);

	        return React.createElement(
	            skoash.Screen,
	            _extends({}, props, {
	                ref: ref,
	                key: key,
	                id: opts.gameName + '-' + opts.level,
	                complete: gameComplete,
	                checkComplete: !gameComplete,
	                backgroundAudio: 'BKG' + opts.gameNumber
	            }, screenProps),
	            React.createElement(
	                skoash.Component,
	                {
	                    className: 'top-left'
	                },
	                React.createElement(
	                    skoash.Score,
	                    {
	                        className: 'level-score',
	                        correct: opts.score,
	                        setScore: true
	                    },
	                    PTS
	                ),
	                React.createElement(skoash.Timer, _extends({
	                    countDown: true,
	                    format: 'mm:ss',
	                    timeout: opts.timeout,
	                    complete: gameComplete,
	                    pause: revealOpen,
	                    resume: !revealOpen,
	                    restart: start
	                }, timerProps))
	            ),
	            React.createElement(
	                skoash.Component,
	                {
	                    className: (0, _classnames2.default)('item-name', {
	                        ACTIVE: opts.itemName
	                    }),
	                    style: {
	                        top: itemTop,
	                        left: itemLeft
	                    },
	                    checkComplete: false,
	                    complete: true
	                },
	                React.createElement(
	                    'span',
	                    null,
	                    opts.itemName
	                )
	            ),
	            React.createElement(skoash.Score, _extends({
	                className: 'life',
	                max: 0,
	                incorrect: opts.maxHits,
	                correct: opts.hits,
	                setScore: true
	            }, lifeProps)),
	            React.createElement(_5.default, _extends({
	                checkComplete: false,
	                complete: true,
	                amount: opts.dropperAmount,
	                drop: drop,
	                pickUp: pickUp,
	                onPickUp: onPickUp,
	                next: opts.next,
	                bin: React.createElement(skoash.Randomizer, {
	                    bin: catchablesArray,
	                    remain: true
	                }),
	                style: {
	                    transform: 'translateX(' + opts.left + 'px)'
	                },
	                caught: caught,
	                dropClass: dropClass,
	                itemRef: itemRef,
	                itemClassName: opts.itemClassName,
	                removeItemClassName: removeItemClassName,
	                selectItem: selectItem
	            }, dropperProps)),
	            React.createElement(
	                skoash.Component,
	                {
	                    className: (0, _classnames2.default)('bins', {
	                        DISABLED: !opts.itemName
	                    })
	                },
	                React.createElement(_3.default, _extends({
	                    completeOnStart: true,
	                    checkComplete: false,
	                    start: start,
	                    bucket: binComponents,
	                    catchableRefs: catchableRefs,
	                    pause: caught || !start,
	                    resume: drop || itemRef,
	                    collideFraction: opts.collideFraction
	                }, catcherProps)),
	                React.createElement(skoash.Selectable, _extends({}, selectableProps, {
	                    list: binComponents
	                }))
	            ),
	            extraComponents,
	            React.createElement(skoash.Reveal, _extends({
	                openTarget: 'reveal',
	                openReveal: revealOpen,
	                closeReveal: revealClose,
	                checkComplete: false,
	                complete: true
	            }, revealProps, {
	                list: [React.createElement(skoash.Component, {
	                    ref: 'resort',
	                    type: 'li'
	                }), React.createElement(skoash.Component, {
	                    ref: 'retry',
	                    type: 'li'
	                }), React.createElement(skoash.Component, {
	                    ref: 'complete',
	                    type: 'li'
	                })]
	            })),
	            React.createElement(skoash.MediaCollection, {
	                play: opts.playAudio,
	                children: audioArray,
	                checkComplete: false,
	                complete: true,
	                onPlay: function onPlay() {
	                    this.updateScreenData({
	                        key: 'play',
	                        data: null
	                    });
	                }
	            })
	        );
	    }
	};

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(24);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(27);

	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var PTS = 'pts';

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _2 = __webpack_require__(25);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catcher = function (_Catch) {
	    _inherits(Catcher, _Catch);

	    function Catcher() {
	        _classCallCheck(this, Catcher);

	        return _possibleConstructorReturn(this, (Catcher.__proto__ || Object.getPrototypeOf(Catcher)).apply(this, arguments));
	    }

	    _createClass(Catcher, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            skoash.Component.prototype.bootstrap.call(this);
	            window.addEventListener('resize', this.onResize);
	            this.onResize();
	        }
	    }, {
	        key: 'onReady',
	        value: function onReady() {
	            this.bucketNodes = _.reduce(this.refs, function (a, v, k) {
	                if (k.indexOf('buckets-')) return a;
	                a[k] = ReactDOM.findDOMNode(v);
	                return a;
	            }, {});
	        }
	    }, {
	        key: 'onResize',
	        value: function onResize() {
	            var _this2 = this;

	            skoash.trigger('getState').then(function (state) {
	                var zoom = state.scale;
	                _this2.setState({
	                    zoom: zoom
	                });
	            });
	        }
	    }, {
	        key: 'checkCollisions',
	        value: function checkCollisions() {
	            var _this3 = this;

	            if (!this.state.started || this.state.paused || !this.state.canCatch) return;
	            _.each(this.bucketNodes, function (bucketNode, bucketRefKey) {
	                var bucketRect = bucketNode.getBoundingClientRect();
	                _.each(_this3.props.catchableRefs, function (catchableRef) {
	                    if (!catchableRef.canCatch()) return;
	                    if (_this3.isColliding(bucketRect, catchableRef.DOMNode.getBoundingClientRect())) {
	                        _this3.selectCatchable(_this3.refs[bucketRefKey], catchableRef);
	                    }
	                });
	            });

	            window.requestAnimationFrame(this.checkCollisions);
	        }
	    }, {
	        key: 'isColliding',
	        value: function isColliding(bucketRect, catchRect) {
	            var xCenter = catchRect.left + (catchRect.right - catchRect.left) / 2;
	            var yOffset = (bucketRect.bottom - bucketRect.top) * this.props.collideFraction;
	            return bucketRect.top - yOffset < catchRect.bottom && bucketRect.top + yOffset > catchRect.top && xCenter > bucketRect.left && xCenter < bucketRect.right;
	        }
	    }, {
	        key: 'selectCatchable',
	        value: function selectCatchable(bucketRef, catchableRef) {
	            var catchableRefKey;
	            if (!this.state.started || this.state.paused || !this.state.canCatch || !catchableRef.canCatch()) return;
	            catchableRefKey = catchableRef.props['data-ref'];
	            this.updateScreenData({
	                keys: [this.props.caughtTarget, 'caught'],
	                data: catchableRefKey
	            });
	            if (catchableRef.props.message === bucketRef.props.message) {
	                this.correct(bucketRef, catchableRefKey);
	            } else {
	                this.incorrect(bucketRef, catchableRefKey);
	            }
	        }
	    }, {
	        key: 'correct',
	        value: function correct(bucketRef, catchableRefKey) {
	            this.playMedia('correct');
	            this.props.onCorrect.call(this, bucketRef, catchableRefKey);
	        }
	    }, {
	        key: 'incorrect',
	        value: function incorrect(bucketRef, catchableRefKey) {
	            this.playMedia('incorrect');
	            this.props.onIncorrect.call(this, bucketRef, catchableRefKey);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Catcher.prototype.__proto__ || Object.getPrototypeOf(Catcher.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.pause && props.pause !== this.props.pause) {
	                this.pause();
	            }

	            if (props.resume && props.resume !== this.props.resume) {
	                this.resume();
	            }
	        }
	    }, {
	        key: 'renderBucket',
	        value: function renderBucket() {
	            var _this4 = this;

	            return _.map([].concat(this.props.bucket), function (bucket, key) {
	                return React.createElement(bucket.type, _extends({}, bucket.props, {
	                    ref: 'buckets-' + key,
	                    style: _this4.getStyle(),
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                this.renderContentList('assets'),
	                this.renderBucket()
	            );
	        }
	    }]);

	    return Catcher;
	}(_3.default);

	Catcher.defaultProps = _.defaults({
	    caughtTarget: 'catcher',
	    collideFraction: 1 / 6
	}, _3.default.defaultProps);

		exports.default = Catcher;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(26);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catch = function (_skoash$Component) {
	    _inherits(Catch, _skoash$Component);

	    function Catch(props) {
	        _classCallCheck(this, Catch);

	        var _this = _possibleConstructorReturn(this, (Catch.__proto__ || Object.getPrototypeOf(Catch)).call(this, props));

	        _this.state = {
	            canCatch: true
	        };

	        _this.onMouseMove = _this.onMouseMove.bind(_this);
	        _this.onResize = _this.onResize.bind(_this);
	        _this.checkCollisions = _this.checkCollisions.bind(_this);
	        return _this;
	    }

	    _createClass(Catch, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Catch.prototype.__proto__ || Object.getPrototypeOf(Catch.prototype), 'bootstrap', this).call(this);
	            this.onResize();
	            this.attachMouseEvents();
	            window.addEventListener('resize', this.onResize);

	            this.bucketNode = ReactDOM.findDOMNode(this.refs.bucket);
	            this.catchableNodes = _.map(this.props.catchables, function (val, key) {
	                return ReactDOM.findDOMNode(this.refs[key + '-catchable']);
	            }.bind(this));
	            _.forEach(this.catchableNodes, function (node, key) {
	                var catchableRef = this.refs[key + '-catchable'];
	                node.addEventListener('animationiteration', catchableRef.reset, false);
	            }.bind(this));
	        }
	    }, {
	        key: 'attachMouseEvents',
	        value: function attachMouseEvents() {
	            var catchRef = this.refs['catch-component'];
	            if (catchRef) {
	                catchRef.addEventListener('mousemove', this.onMouseMove);
	                catchRef.addEventListener('touchstart', this.onMouseMove);
	                catchRef.addEventListener('touchmove', this.onMouseMove);
	            }
	        }
	    }, {
	        key: 'onMouseMove',
	        value: function onMouseMove(e) {
	            this.setState({
	                mouseX: e.pageX
	            });
	        }
	    }, {
	        key: 'onResize',
	        value: function onResize() {
	            var _this2 = this;

	            skoash.trigger('getState').then(function (state) {
	                var zoom = state.scale;
	                var edges = _this2.getEdges(_this2.bucketNode);
	                var bucketWidth = edges.right - edges.left;
	                var leftBound = _this2.bucketNode.offsetParent ? _this2.bucketNode.offsetParent.offsetWidth - bucketWidth : 0;

	                _this2.setState({
	                    bucketTop: edges.top,
	                    bucketBottom: edges.bottom,
	                    bucketWidth: bucketWidth,
	                    leftBound: leftBound,
	                    zoom: zoom
	                });
	            });
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(Catch.prototype.__proto__ || Object.getPrototypeOf(Catch.prototype), 'start', this).call(this, this.checkCollisions);
	            this.bootstrap();
	        }
	    }, {
	        key: 'restart',
	        value: function restart() {
	            this.checkCollisions();
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.setState({
	                started: false
	            });
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            if (this.state.started) {
	                this.setState({
	                    paused: true
	                });
	            }
	        }
	    }, {
	        key: 'resume',
	        value: function resume() {
	            var _this3 = this;

	            if (this.state.paused) {
	                this.setState({
	                    paused: false
	                }, function () {
	                    _this3.checkCollisions();
	                });
	            }
	        }
	    }, {
	        key: 'selectCatchable',
	        value: function selectCatchable(catchableNode, key) {
	            if (!this.state.started || this.state.paused || !this.state.canCatch || !catchableNode.canCatch()) return;
	            catchableNode.markCaught();
	            if (catchableNode.props.isCorrect) {
	                this.correct(catchableNode, key);
	            } else {
	                this.incorrect(catchableNode, key);
	            }
	        }
	    }, {
	        key: 'correct',
	        value: function correct(catchable, key) {
	            this.playMedia('correct');
	            this.props.onCorrect.call(this, catchable, key);
	        }
	    }, {
	        key: 'incorrect',
	        value: function incorrect(catchable, key) {
	            this.playMedia('incorrect');
	            this.props.onIncorrect.call(this, catchable, key);
	        }
	    }, {
	        key: 'checkCollisions',
	        value: function checkCollisions() {
	            var bucketRect = this.bucketNode.getBoundingClientRect();
	            if (!this.state.started || this.state.paused) return;
	            _.forEach(this.catchableNodes, function (val, key) {
	                if (this.isColliding(bucketRect, val.getBoundingClientRect())) {
	                    this.selectCatchable(this.refs[key + '-catchable'], key);
	                }
	            }.bind(this));
	            window.requestAnimationFrame(this.checkCollisions);
	        }
	    }, {
	        key: 'isColliding',
	        value: function isColliding(bucketRect, catchRect) {
	            var xCenter = catchRect.left + (catchRect.right - catchRect.left) / 2;
	            var yOffset = (catchRect.bottom - catchRect.top) / 6;
	            return bucketRect.top < catchRect.bottom - yOffset && bucketRect.top > catchRect.top + yOffset && xCenter > bucketRect.left && xCenter < bucketRect.right;
	        }
	    }, {
	        key: 'getEdges',
	        value: function getEdges(el) {
	            var top;
	            var left;
	            var width;
	            var height;

	            left = 0;
	            top = 0;
	            width = el.offsetWidth;
	            height = el.offsetHeight;

	            while (el) {
	                if (el.className && el.className.indexOf('screen') !== -1) {
	                    break;
	                }

	                left += el.offsetLeft || 0;
	                top += el.offsetTop || 0;
	                el = el.offsetParent;
	            }

	            return {
	                top: top,
	                bottom: top + height,
	                left: left,
	                right: left + width
	            };
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle() {
	            var left = this.state.mouseX / this.state.zoom - this.state.bucketWidth / 2;
	            if (this.props.bucketInBounds) {
	                left = left < 1 ? 1 : left;
	                left = left >= this.state.leftBound ? this.state.leftBound - 1 : left;
	            }

	            return {
	                left: left + 'px'
	            };
	        }
	    }, {
	        key: 'renderBucket',
	        value: function renderBucket() {
	            return React.createElement(this.props.bucket.type, _extends({}, this.props.bucket.props, {
	                ref: 'bucket',
	                style: this.getStyle()
	            }));
	        }
	    }, {
	        key: 'renderCatchables',
	        value: function renderCatchables() {
	            return this.props.catchables.map(function (item, key) {
	                return React.createElement(_3.default, _extends({}, item.props, {
	                    key: key,
	                    ref: key + '-catchable'
	                }));
	            });
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('catch', _get(Catch.prototype.__proto__ || Object.getPrototypeOf(Catch.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { ref: 'catch-component', className: this.getClassNames() },
	                React.createElement(
	                    'ul',
	                    { className: 'items' },
	                    this.renderCatchables()
	                ),
	                this.renderBucket()
	            );
	        }
	    }]);

	    return Catch;
	}(skoash.Component);

	Catch.defaultProps = _.defaults({
	    catchables: [],
	    bucketInBounds: true,
	    bucket: React.createElement(skoash.Component, null),
	    onCorrect: _.noop,
	    onIncorrect: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Catch;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catchable = function (_skoash$Component) {
	    _inherits(Catchable, _skoash$Component);

	    function Catchable(props) {
	        _classCallCheck(this, Catchable);

	        var _this = _possibleConstructorReturn(this, (Catchable.__proto__ || Object.getPrototypeOf(Catchable)).call(this, props));

	        _this.state = {
	            canCatch: true
	        };
	        _this.reset = _this.reset.bind(_this);
	        return _this;
	    }

	    _createClass(Catchable, [{
	        key: 'setState',
	        value: function setState(opts, cb) {
	            _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'setState', this).call(this, opts, cb);
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'bootstrap', this).call(this);
	            this.DOMNode = ReactDOM.findDOMNode(this);
	        }
	    }, {
	        key: 'markCaught',
	        value: function markCaught() {
	            if (!this.state.ready) return;
	            this.setState({ canCatch: false });
	            this.props.onCaught.call(this);
	        }
	    }, {
	        key: 'canCatch',
	        value: function canCatch() {
	            return !this.props.disabled && this.state.canCatch;
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('catchable', {
	                CAUGHT: !this.state.canCatch
	            }, _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            if (this.state.ready && !this.props.disabled && this.props.reCatchable) {
	                this.setState({ canCatch: true });
	            }
	        }
	    }]);

	    return Catchable;
	}(skoash.Component);

	Catchable.defaultProps = _.defaults({
	    disabled: false,
	    isCorrect: true,
	    reCatchable: true,
	    onCaught: _.noop,
	    type: 'li'
	}, skoash.Component.defaultProps);

		exports.default = Catchable;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ITEM = 'items-';
	var DROPPED = 'DROPPED';

	var Dropper = function (_skoash$Component) {
	    _inherits(Dropper, _skoash$Component);

	    function Dropper(props) {
	        _classCallCheck(this, Dropper);

	        var _this = _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).call(this, props));

	        _this.state = _.defaults({
	            items: {}
	        }, _this.state);
	        return _this;
	    }

	    _createClass(Dropper, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'bootstrap', this).call(this);
	            this.DOMNode = ReactDOM.findDOMNode(this);
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            var _this2 = this;

	            _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'start', this).call(this);

	            this.itemCount = 0;
	            this.firstItemIndex = 0;

	            this.setState({
	                items: {}
	            }, function () {
	                _this2.next(_this2.props.amount, false);
	            });
	        }
	    }, {
	        key: 'getFirstItem',
	        value: function getFirstItem() {
	            return this.refs[ITEM + this.firstItemIndex];
	        }
	    }, {
	        key: 'drop',
	        value: function drop(props) {
	            var itemRef = this.getFirstItem();
	            props = props || this.props;
	            itemRef.addClassName(props.dropClass || DROPPED);

	            this.updateScreenData({
	                key: [props.refsTarget, 'drop'],
	                data: false
	            });

	            props.onDrop.call(this, itemRef);
	        }
	    }, {
	        key: 'pickUp',
	        value: function pickUp(props) {
	            var itemRef = this.getFirstItem();
	            props = props || this.props;
	            itemRef.removeClassName(props.dropClass || DROPPED);
	            itemRef.reset();

	            this.updateScreenData({
	                key: [props.refsTarget, 'pickUp'],
	                data: false
	            });

	            props.onPickUp.call(this, itemRef);
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var _this3 = this;

	            var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	            var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	            var items = this.state.items;

	            _.each(this.refs.bin.get(amount), function (v) {
	                items[_this3.itemCount++] = React.createElement(v.type, _extends({}, v.props, {
	                    onReady: function onReady() {
	                        this.start();
	                    }
	                }));
	            });

	            if (shift) delete items[this.firstItemIndex++];

	            this.setState({
	                items: items
	            }, function () {
	                var refs = _.filter(_this3.refs, function (v, k) {
	                    return !k.indexOf(ITEM);
	                });
	                _this3.invokeChildrenFunction('markCatchable');

	                _this3.updateScreenData({
	                    key: _this3.props.refsTarget,
	                    data: {
	                        refs: refs,
	                        next: false
	                    }
	                });

	                _this3.props.onNext.call(_this3);
	            });
	        }
	    }, {
	        key: 'caught',
	        value: function caught(catchableRefKey) {
	            _.invoke(this.refs[catchableRefKey], 'markCaught');
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.next === true && props.next !== this.props.next) {
	                this.next();
	            }

	            if (props.drop === true && props.drop !== this.props.drop) {
	                this.drop(props);
	            }

	            if (props.pickUp === true && props.pickUp !== this.props.pickUp) {
	                this.pickUp(props);
	            }

	            if (props.caught && props.caught !== this.props.caught) {
	                this.caught(props.caught);
	            }
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('manual-dropper', _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'getClassNames', this).call(this));
	        }

	        /*
	         * shortid is intentionally not used for key here because we want to make sure
	         * that the element is transitioned and not replaced.
	         */

	    }, {
	        key: 'renderItems',
	        value: function renderItems() {
	            return _.map(this.state.items, function (item, key) {
	                var ref = ITEM + key;
	                if (!item) return null;
	                return React.createElement(item.type, _extends({}, item.props, {
	                    'data-ref': ref,
	                    'data-message': item.props.message,
	                    ref: ref,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'renderBin',
	        value: function renderBin() {
	            return React.createElement(this.props.bin.type, _extends({}, this.props.bin.props, {
	                ref: 'bin'
	            }));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                _extends({}, this.props, {
	                    onTransitionEnd: this.props.onTransitionEnd.bind(this),
	                    className: this.getClassNames()
	                }),
	                this.renderBin(),
	                React.createElement(
	                    'div',
	                    null,
	                    this.renderContentList()
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'items' },
	                    this.renderItems()
	                )
	            );
	        }
	    }]);

	    return Dropper;
	}(skoash.Component);

	Dropper.defaultProps = _.defaults({
	    dropClass: DROPPED,
	    amount: 1,
	    bin: React.createElement(skoash.Randomizer, {
	        bin: [React.createElement(_3.default, null)]
	    }),
	    refsTarget: 'manual-dropper',
	    onDrop: _.noop,
	    onPickUp: _.noop,
	    onNext: _.noop,
	    next: false,
	    drop: false,
	    onTransitionEnd: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Dropper;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catchable = function (_skoash$Component) {
	    _inherits(Catchable, _skoash$Component);

	    function Catchable(props) {
	        _classCallCheck(this, Catchable);

	        var _this = _possibleConstructorReturn(this, (Catchable.__proto__ || Object.getPrototypeOf(Catchable)).call(this, props));

	        _this.state = {
	            catchable: false
	        };
	        _this.reset = _this.reset.bind(_this);
	        return _this;
	    }

	    _createClass(Catchable, [{
	        key: 'setState',
	        value: function setState(opts, cb) {
	            _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'setState', this).call(this, opts, cb);
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'bootstrap', this).call(this);
	        }
	    }, {
	        key: 'markCaught',
	        value: function markCaught() {
	            if (!this.state.ready) return;
	            this.catchable = false;
	            this.setState({ catchable: false });
	            this.props.onCaught.call(this);
	        }
	    }, {
	        key: 'markCatchable',
	        value: function markCatchable() {
	            this.DOMNode = this.DOMNode || ReactDOM.findDOMNode(this);
	            if (this.state.catchable && this.catchable) return;
	            this.catchable = true;
	            this.setState({
	                catchable: true
	            });
	        }
	    }, {
	        key: 'canCatch',
	        value: function canCatch() {
	            return !this.props.disabled && this.catchable;
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('catchable', {
	                CAUGHT: !this.state.catchable
	            }, _get(Catchable.prototype.__proto__ || Object.getPrototypeOf(Catchable.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            if (this.state.ready && !this.props.disabled && this.props.reCatchable) {
	                this.catchable = true;
	                this.setState({ catchable: true });
	            }
	        }
	    }]);

	    return Catchable;
	}(skoash.Component);

	Catchable.defaultProps = _.defaults({
	    disabled: false,
	    isCorrect: true,
	    reCatchable: true,
	    onCaught: _.noop,
	    type: 'li'
	}, skoash.Component.defaultProps);

		exports.default = Catchable;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var binNames = ['recycle', 'landfill', 'compost'];

	var itemsToSort = _.filter(_items_to_sort2.default, function (item) {
	    return _.includes(binNames, item.bin);
	});

	exports.default = _.defaults({
	    gameName: 'recycling-champion',
	    gameNumber: 1,
	    binNames: binNames,
	    itemsToSort: itemsToSort,
	    extraComponents: [React.createElement(skoash.Image, { className: 'hidden', scr: CMWN.MEDIA.IMAGE + 'pipe01.png' })]
		}, _default_game_opts2.default);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var binNames = ['recycle', 'landfill', 'compost'];

	var itemsToSort = _.filter(_items_to_sort2.default, function (item) {
	    return _.includes(binNames, item.bin);
	});

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
	        'static': true
	    });
	};

	var catchablesArray = _.map(itemsToSort, function (v) {
	    return {
	        type: _3.default,
	        props: {
	            className: v.name,
	            message: v.bin,
	            reCatchable: true,
	            becomes: v.becomes,
	            children: getChildren(v)
	        }
	    };
	});

	var audioRefs = _.uniq(_.map(itemsToSort, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var audioArray = _.map(audioRefs, function (v, k) {
	    return {
	        type: skoash.Audio,
	        ref: v,
	        key: k,
	        props: {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	            onPlay: function onPlay() {
	                this.updateScreenData({
	                    keys: ['item', 'new'],
	                    data: false
	                });
	            }
	        }
	    };
	});

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'drop', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ReleaseItem1.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'CorrectSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

	exports.default = {
	    gameName: 'recycling-champion',
	    gameNumber: 1,
	    level: 1,
	    timeout: 120000,
	    scoreToWin: 600,
	    maxHits: 5,
	    dropperAmount: 3,
	    pointsPerItem: 95,
	    pointsPerMiss: 250,
	    collideFraction: 0,
	    getScreenProps: function getScreenProps(opts) {
	        return {
	            onStart: function onStart() {
	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        start: true,
	                        score: 0,
	                        hits: 0
	                    }
	                });
	            },
	            onStop: function onStop() {
	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'start'],
	                    data: false
	                });
	            }
	        };
	    },
	    getTimerProps: function getTimerProps(opts) {
	        return {
	            onComplete: function onComplete() {
	                if (opts.score >= opts.scoreToWin) {
	                    this.updateGameData({
	                        keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                        data: {
	                            complete: true,
	                            highScore: Math.max(opts.score, opts.highScore)
	                        }
	                    });
	                    this.updateScreenData({
	                        keys: ['reveal', 'open'],
	                        data: 'complete'
	                    });
	                } else {
	                    this.updateScreenData({
	                        keys: ['reveal', 'open'],
	                        data: 'retry'
	                    });
	                }
	            },
	            onIncrement: function onIncrement() {
	                var secondsLeft = (this.props.timeout - this.state.time) / 1000;
	                if (secondsLeft === 10) {
	                    this.updateScreenData({
	                        key: 'play',
	                        data: 'timer'
	                    });
	                }
	            }
	        };
	    },
	    getRevealProps: function getRevealProps(opts) {
	        return {
	            onOpen: function onOpen() {
	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'start'],
	                    data: false
	                });
	            },
	            onClose: function onClose(prevMessage) {
	                var data = {
	                    start: true
	                };

	                if (!prevMessage || prevMessage === 'resort') return;

	                if (prevMessage === 'retry') {
	                    data.score = 0;
	                    data.hits = 0;
	                    data.start = true;
	                }

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: data
	                });
	            }
	        };
	    },
	    getSelectableProps: function getSelectableProps(opts) {
	        return {
	            onSelect: function onSelect(binRefKey) {
	                var left = ReactDOM.findDOMNode(this.refs[binRefKey]).offsetLeft - 785;
	                if (opts.left === left) {
	                    this.updateScreenData({
	                        keys: ['manual-dropper', 'drop'],
	                        data: true
	                    });
	                } else {
	                    this.updateScreenData({
	                        keys: ['manual-dropper', 'left'],
	                        data: left
	                    });
	                }
	            }
	        };
	    },
	    getDropperProps: function getDropperProps(opts) {
	        return {
	            onTransitionEnd: function onTransitionEnd(e) {
	                if (this.DOMNode !== e.target || opts.left === 0) return;
	                this.updateScreenData({
	                    keys: ['manual-dropper', 'drop'],
	                    data: true
	                });
	            },
	            onNext: function onNext() {
	                this.updateScreenData({
	                    data: {
	                        item: {
	                            name: _.startCase(_.replace(this.getFirstItem().props.className, /\d+/g, '')),
	                            new: true
	                        },
	                        'manual-dropper': {
	                            left: 0
	                        }
	                    }
	                });
	            },
	            onPickUp: function onPickUp() {
	                this.updateScreenData({
	                    key: ['manual-dropper', 'dropClass'],
	                    data: ''
	                });
	            }
	        };
	    },
	    getCatcherProps: function getCatcherProps(opts) {
	        return {
	            onCorrect: function onCorrect() {
	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
	                    data: opts.score + opts.pointsPerItem
	                });
	                this.updateScreenData({
	                    keys: ['manual-dropper', 'next'],
	                    data: true
	                });
	            },
	            onIncorrect: function onIncorrect() {
	                var _this = this;

	                var hits = opts.hits + 1;

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        start: false,
	                        score: opts.score - opts.pointsPerMiss,
	                        hits: hits
	                    }
	                });

	                if (hits === opts.maxHits) {
	                    setTimeout(function () {
	                        _this.updateScreenData({
	                            keys: ['manual-dropper', 'pickUp'],
	                            data: true
	                        });
	                    }, 1000);
	                    return;
	                }

	                this.updateScreenData({
	                    keys: ['reveal', 'open'],
	                    data: 'resort',
	                    callback: function callback() {
	                        setTimeout(function () {
	                            _this.updateScreenData({
	                                data: {
	                                    reveal: {
	                                        open: null,
	                                        close: true
	                                    },
	                                    'manual-dropper': {
	                                        pickUp: true
	                                    },
	                                    catcher: {
	                                        caught: false
	                                    }
	                                }
	                            });
	                        }, 1000);
	                    }
	                });
	            }
	        };
	    },
	    getLifeProps: function getLifeProps(opts) {
	        return {
	            onComplete: function onComplete() {
	                if (opts.score >= opts.scoreToWin) {
	                    this.updateGameData({
	                        keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                        data: {
	                            complete: true,
	                            highScore: Math.max(opts.score, opts.highScore)
	                        }
	                    });
	                    this.updateScreenData({
	                        keys: ['reveal', 'open'],
	                        data: 'complete'
	                    });
	                } else {
	                    this.updateScreenData({
	                        keys: ['reveal', 'open'],
	                        data: 'retry'
	                    });
	                }
	            }
	        };
	    },
	    getExtraComponents: function getExtraComponents() {
	        return null;
	    },
	    getAudioArray: function getAudioArray() {
	        return audioArray;
	    },
	    getCatchablesArray: function getCatchablesArray() {
	        return catchablesArray;
	    },

	    binNames: binNames,
	    itemsToSort: itemsToSort
		};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _items_compost = __webpack_require__(19);

	var _items_compost2 = _interopRequireDefault(_items_compost);

	var _items_food_share = __webpack_require__(32);

	var _items_food_share2 = _interopRequireDefault(_items_food_share);

	var _items_landfill = __webpack_require__(17);

	var _items_landfill2 = _interopRequireDefault(_items_landfill);

	var _items_liquids = __webpack_require__(33);

	var _items_liquids2 = _interopRequireDefault(_items_liquids);

	var _items_recycle = __webpack_require__(15);

	var _items_recycle2 = _interopRequireDefault(_items_recycle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = [].concat(_items_compost2.default).concat(_items_food_share2.default).concat(_items_landfill2.default).concat(_items_liquids2.default).concat(_items_recycle2.default);

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'food-share';
	var names = ['bag-of-potato-chips-2', 'bag-of-potato-chips-3', 'box-of-cheddar-crackers', 'box-of-cookies', 'dinner-roll', 'fresh-fruit-cup', 'fresh-unopened-sandwich', 'fresh-vegetable-cup', 'ketchup-packet', 'lollipop-1', 'lollipop-2', 'lollipop-3', 'lollipop-4', 'lollipop-5', 'mayo-packet', 'mustard-packet', 'Sealed-apple-sauce', 'sealed-bag-of-carrots', 'sealed-chocolate-milk', 'sealed-fruit-drink-1', 'sealed-fruit-drink-2', 'sealed-fruit-drink-3', 'sealed-milk-1', 'sealed-milk-2', 'sealed-milk-3', 'sealed-orange-juice', 'single-serve-cereal-2', 'single-serve-cereal-3', 'single-serve-cereal', 'single-serve-cookies', 'uneaten-pretzel', 'unopened-box-of-raisins', 'unopened-cookies-package', 'unopened-crackers-1', 'unopened-crackers-2', 'unopened-crackers-3', 'unopened-energy-bar', 'unopened-graham-cookies-1', 'unopened-graham-cookies-2', 'unopened-graham-cookies-3', 'unopened-granola-bar', 'Unopened-grape-juice-1', 'unopened-grape-juice-2', 'unopened-grape-juice-3', 'unopened-pack-of-grapes', 'unopened-peanut-butter-cups', 'whole-apple', 'whole-banana', 'whole-orange', 'yogurt-cup-1', 'yogurt-cup-2'];

	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
		});

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'liquids';
	var names = ['full-plastic-water-bottle-1', 'full-plastic-water-bottle-2', 'full-plastic-water-bottle-3', 'full-plastic-water-bottle-4', 'half-full-chocolate-milk-carton', 'half-full-chocolate-milk', 'half-full-energy-drink-bottle', 'half-full-lemonade-box-1', 'half-full-lemonade-box-4', 'half-full-milk-carton-1', 'half-full-milk-carton-2', 'half-full-milk-carton-3', 'half-full-milk-carton-4', 'half-full-milk-carton-5', 'half-full-milk-carton-6', 'half-full-milk-carton-7', 'half-full-milk-carton-8', 'half-full-orange-juice-2'];

	var becomes = [{
	    name: 'empty-plastic-water-bottle-1',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-water-bottle-2',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-water-bottle-3',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-water-bottle-4',
	    bin: 'recycle'
	}, {
	    name: 'empty-chocolate-milk-carton',
	    bin: 'recycle'
	}, {
	    name: 'empty-chocolate-milk',
	    bin: 'recycle'
	}, {
	    name: 'empty-energy-drink-bottle',
	    bin: 'recycle'
	}, {
	    name: 'empty-lemonade-box-1',
	    bin: 'landfill'
	}, {
	    name: 'empty-lemonade-box-4',
	    bin: 'landfill'
	}, {
	    name: 'empty-milk-carton-1',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton-2',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton-3',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton-4',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton-5',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton-6',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton-7',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton-8',
	    bin: 'recycle'
	}, {
	    name: 'empty-orange-juice-2',
	    bin: 'recycle'
	}];

	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame,
	        becomes: becomes[frame]
	    };
		});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'recycling-champion-two-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Your Sorting Skills',
	            React.createElement('br', null),
	            'are needed for',
	            React.createElement('br', null),
	            'this next round.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Get Ready-Set-Go!'
	        ),
	        vo: 'ReadySetGo',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG1'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 2,
	        scoreToWin: 760
	    }, _default_recycling_champion_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'recycling-champion-three-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Now that you have',
	            React.createElement('br', null),
	            'the hang of this let\'s',
	            React.createElement('br', null),
	            'add some speed.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Good luck',
	            React.createElement('br', null),
	            'Speed Sorting!'
	        ),
	        vo: 'SpeedSorting',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG1'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 3,
	        scoreToWin: 855
	    }, _default_recycling_champion_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'recycling-champion-four-info',
	        content: React.createElement(
	            'p',
	            null,
	            'That was some',
	            React.createElement('br', null),
	            'Speed Sorting!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Let\'s kick it',
	            React.createElement('br', null),
	            'into high drive!'
	        ),
	        vo: 'HighDrive',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG1'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 4,
	        scoreToWin: 950
	    }, _default_recycling_champion_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'recycling-champion-five-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Master this level',
	            React.createElement('br', null),
	            'and win the',
	            React.createElement('br', null),
	            'Recycle Champion Flip!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Accuracy is important...'
	        ),
	        vo: 'ChampionFlip',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG1'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 5,
	        scoreToWin: 1045
	    }, _default_recycling_champion_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (levelNumber) {
	    var levelNumberWord = numberWords[levelNumber - 1];

	    return function (props, ref, key) {
	        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	        return React.createElement(
	            skoash.Screen,
	            _extends({}, props, {
	                ref: ref,
	                key: key,
	                id: 'post-level-' + levelNumber,
	                className: (0, _classnames2.default)(opts.className, {
	                    APPEAR: _.get(props, 'data.appear.playing')
	                }),
	                backgroundAudio: 'BKG' + levelNumber,
	                emitOnComplete: {
	                    name: 'flip',
	                    game: flipKeys[levelNumber - 1]
	                }
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.FRAME + 'transition.frame.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.levels.png'
	            }),
	            React.createElement(
	                skoash.MediaSequence,
	                null,
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'LevelAward.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'FlipHover.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    playTarget: 'appear',
	                    src: CMWN.MEDIA.EFFECT + 'FlipDropBounce.mp3'
	                })
	            ),
	            React.createElement(
	                'div',
	                { className: 'frame' },
	                getLevelHeader(levelNumberWord),
	                listLevels(levelNumber)
	            )
	        );
	    };
	};

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var flipKeys = ['recycling-champion', 'priceless-pourer', 'fantastic-food-sharer', 'dynamic-diverter', 'master-sorter', 'green-team-challenge'];

	var levelNames = ['Recycling Champion', 'Priceless Pourer', 'Fantastic Food Sharer', 'Dynamic Diverter', 'Master Sorter'];

	var numberWords = ['One', 'Two', 'Three', 'Four', 'Five'];

	var getLevelHeader = function getLevelHeader(levelNumberWord) {
	    if (levelNumberWord) return React.createElement(
	        'h3',
	        null,
	        'Level ',
	        levelNumberWord,
	        ' Complete!'
	    );
	    return React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	            'h3',
	            null,
	            'CONGRATULATIONS!'
	        ),
	        React.createElement(
	            'h4',
	            null,
	            'You are a member of Green Team!'
	        )
	    );
	};

	var listLevels = function listLevels(levelNumber) {
	    return _.map(levelNames, function (name, number) {
	        return React.createElement(
	            'div',
	            { className: levelNumber > number ? 'complete' : '' },
	            React.createElement(
	                'p',
	                null,
	                'Level ',
	                number + 1
	            ),
	            React.createElement(
	                'p',
	                null,
	                name
	            )
	        );
	    });
		};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-one-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Hey Recycle Champion!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Next up\u2014it\'s Liquids!',
	            React.createElement('br', null),
	            'Pour the liquids and',
	            React.createElement('br', null),
	            'then sort the containers.'
	        ),
	        vo: 'HeyRecycleChampion',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG2'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 1,
	        timeout: 120000,
	        scoreToWin: 100
	    }, _default_priceless_pourer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var binNames = ['liquids', 'recycle', 'landfill', 'compost'];

	var itemsToSort = _.filter(_items_to_sort2.default, function (item) {
	    return _.includes(binNames, item.bin);
	});

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
	        'static': true
	    });
	};

	var catchablesArray = _.map(itemsToSort, function (v) {
	    return {
	        type: _3.default,
	        props: {
	            className: v.name,
	            message: v.bin,
	            reCatchable: true,
	            becomes: v.becomes,
	            children: getChildren(v)
	        }
	    };
	});

	var audioRefs = _.uniq(_.map(itemsToSort, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var audioArray = _.map(audioRefs, function (v, k) {
	    return {
	        type: skoash.Audio,
	        ref: v,
	        key: k,
	        props: {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	            onPlay: function onPlay() {
	                this.updateScreenData({
	                    keys: ['item', 'new'],
	                    data: false
	                });
	            }
	        }
	    };
	});

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'drop', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ClickRecButton.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

	exports.default = _.defaults({
	    gameName: 'priceless-pourer',
	    gameNumber: 2,
	    dropperAmount: 4,
	    binNames: binNames,
	    getSelectableProps: function getSelectableProps(opts) {
	        return {
	            onSelect: function onSelect(binRefKey) {
	                this.updateScreenData({
	                    key: 'manual-dropper',
	                    data: {
	                        drop: true,
	                        dropClass: _.toUpper(opts.binNames[binRefKey])
	                    }
	                });
	            }
	        };
	    },
	    getDropperProps: function getDropperProps(opts) {
	        var props = _default_game_opts2.default.getDropperProps.call(this, opts);

	        props.onTransitionEnd = function (e) {
	            var _this = this;

	            var itemRef = this.refs['items-' + this.firstItemIndex];
	            var DOMNode = void 0;
	            var _onAnimationEnd = void 0;

	            if (e.propertyName !== 'left') return;
	            if (this.props.dropClass !== 'LIQUIDS') return;
	            if (itemRef.props.message !== 'liquids') {
	                var hits = opts.hits + 1;

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        start: false,
	                        score: opts.score - opts.pointsPerMiss,
	                        hits: hits
	                    }
	                });

	                if (hits === opts.maxHits) {
	                    setTimeout(function () {
	                        _this.updateScreenData({
	                            keys: ['manual-dropper', 'pickUp'],
	                            data: true
	                        });
	                    }, 1000);
	                    return;
	                }

	                this.updateScreenData({
	                    keys: ['reveal', 'open'],
	                    data: 'resort',
	                    callback: function callback() {
	                        setTimeout(function () {
	                            _this.updateScreenData({
	                                data: {
	                                    reveal: {
	                                        open: null,
	                                        close: true
	                                    },
	                                    'manual-dropper': {
	                                        pickUp: true
	                                    },
	                                    catcher: {
	                                        caught: false
	                                    }
	                                }
	                            });
	                        }, 1000);
	                    }
	                });

	                return;
	            }

	            DOMNode = ReactDOM.findDOMNode(itemRef);

	            if (DOMNode !== e.target) return;

	            _onAnimationEnd = function onAnimationEnd() {
	                _this.pickUp(_.defaults({
	                    onPickUp: function onPickUp() {
	                        var items = this.state.items;
	                        var index = this.firstItemIndex;
	                        var item = items[index];
	                        item.props.className = item.props.becomes.name;
	                        item.props.message = item.props.becomes.bin;
	                        item.props['data-message'] = item.props.becomes.bin;
	                        items[index] = item;
	                        this.setState({ items: items });
	                        this.updateScreenData({
	                            data: {
	                                item: {
	                                    name: _.startCase(_.replace(item.props.becomes.name, /\d+/g, '')),
	                                    pour: false
	                                },
	                                'manual-dropper': {
	                                    dropClass: ''
	                                }
	                            }
	                        });
	                        DOMNode.removeEventListener('animationend', _onAnimationEnd);
	                    }
	                }, _this.props));
	            };

	            if (!itemRef.state.className || itemRef.state.className.indexOf('POUR') === -1) {
	                DOMNode.addEventListener('animationend', _onAnimationEnd);
	                itemRef.addClassName('POUR');
	                this.updateScreenData({
	                    key: ['item', 'pour'],
	                    data: true
	                });
	            }
	        };

	        return props;
	    },
	    getCatcherProps: function getCatcherProps(opts) {
	        var props = _default_game_opts2.default.getCatcherProps.call(this, opts);

	        props.onCorrect = function (bucketRef) {
	            this.updateGameData({
	                keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
	                data: opts.score + opts.pointsPerItem
	            });

	            if (bucketRef.props.message !== 'liquids') {
	                this.updateScreenData({
	                    keys: ['manual-dropper', 'next'],
	                    data: true
	                });
	                return;
	            }
	        };

	        return props;
	    },
	    getExtraComponents: function getExtraComponents(opts) {
	        var color = 'milk';

	        switch (true) {
	            case _.includes(opts.itemName, 'Chocolate'):
	                color = 'chocolate';
	                break;
	            case _.includes(opts.itemName, 'Orange'):
	                color = 'orange';
	                break;
	            case _.includes(opts.itemName, 'Fruit'):
	                color = 'fruit';
	                break;
	        }

	        return React.createElement(
	            skoash.Component,
	            null,
	            React.createElement(skoash.Sprite, {
	                className: 'belt',
	                src: CMWN.MEDIA.SPRITE + 'level.1.conveyor.belt',
	                animate: opts.next,
	                loop: false,
	                duration: 250,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'chocolate' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.chocolate.milk',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'fruit' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.fruit.juice',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'milk' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.milk',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'orange' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.orange.juice',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            })
	        );
	    },

	    itemsToSort: itemsToSort,
	    getAudioArray: function getAudioArray() {
	        return audioArray;
	    },
	    getCatchablesArray: function getCatchablesArray() {
	        return catchablesArray;
	    }
		}, _default_game_opts2.default);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-two-info',
	        content: React.createElement(
	            'p',
	            null,
	            'It\'s time to dual!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Dual sorting is',
	            React.createElement('br', null),
	            'important for accuracy.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Show what you know!'
	        ),
	        vo: 'ItsTimeToDual',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG2'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 2,
	        scoreToWin: 150
	    }, _default_priceless_pourer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-three-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Success is twice as nice',
	            React.createElement('br', null),
	            'when dual sorting!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Let\'s kick it up a notch.'
	        ),
	        vo: 'KickItupANotch',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG2'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 3,
	        scoreToWin: 200
	    }, _default_priceless_pourer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-four-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Hey Super Sorter!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Things are about',
	            React.createElement('br', null),
	            'to get crazy.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'I hope you\'re ready!'
	        ),
	        vo: 'HeySuperSorter',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG2'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 4,
	        scoreToWin: 250
	    }, _default_priceless_pourer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-five-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Let\'s take this',
	            React.createElement('br', null),
	            'to the next level!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'You are about to',
	            React.createElement('br', null),
	            'become a',
	            React.createElement('br', null),
	            'Priceless Pourer!'
	        ),
	        vo: 'TakeItTotheNextLevel',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG2'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 5,
	        scoreToWin: 300
	    }, _default_priceless_pourer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-one-info',
	        className: 'small',
	        content: React.createElement(
	            'p',
	            null,
	            'Sharing snacks is just a',
	            React.createElement('br', null),
	            'kind thing to do for others.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Identify those items that',
	            React.createElement('br', null),
	            'are ready to eat-not waste',
	            React.createElement('br', null),
	            'as Food Share items.'
	        ),
	        vo: 'SharningSnacks',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG3'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 1,
	        timeout: 120000,
	        scoreToWin: 100
	    }, _default_fantastic_food_sharer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PICKUP = 'PICKUP';
	var DROPPED = 'DROPPED';
	var TILT = 'TILT';
	var ITEMS = 'items-';

	var BELT_SRC = CMWN.MEDIA.SPRITE + 'level.3.conveyor.belt';
	var CLAW_SRC = CMWN.MEDIA.SPRITE + 'level3robotarm';
	var FUNNEL_SRC = CMWN.MEDIA.SPRITE + 'front.back.funnel';

	var binNames = ['food-share', 'recycle', 'landfill', 'compost', 'liquids'];

	var onTruckTransitionEnd = function onTruckTransitionEnd(opts, e) {
	    skoash.trigger('updateScreenData', {
	        data: {
	            'manual-dropper': {
	                drop: _.includes(e.target.className, TILT),
	                dropClass: _.toUpper(_.snakeCase(opts.selectableMessage))
	            },
	            'selectable': {
	                message: ''
	            }
	        }
	    });
	};

	var onItemPickUpTransitionEnd = function onItemPickUpTransitionEnd(itemRef) {
	    if (_.includes(itemRef.state.className, PICKUP)) {
	        itemRef.removeAllClassNames();
	        skoash.trigger('updateScreenData', {
	            key: 'truckClassName',
	            data: ''
	        });
	    }
	};

	var itemsToSort = _.filter(_items_to_sort2.default, function (item) {
	    return _.includes(binNames, item.bin);
	});

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
	        'static': true
	    });
	};

	var catchablesArray = _.map(itemsToSort, function (v) {
	    return {
	        type: _3.default,
	        props: {
	            className: v.name,
	            message: v.bin,
	            reCatchable: true,
	            becomes: v.becomes,
	            children: getChildren(v)
	        }
	    };
	});

	var audioRefs = _.uniq(_.map(itemsToSort, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var audioArray = _.map(audioRefs, function (v, k) {
	    return {
	        type: skoash.Audio,
	        ref: v,
	        key: k,
	        props: {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	            onPlay: function onPlay() {
	                this.updateScreenData({
	                    keys: ['item', 'new'],
	                    data: false
	                });
	            }
	        }
	    };
	});

	audioArray = audioArray.concat([React.createElement(
	    skoash.MediaSequence,
	    { ref: 'drop', silentOnStart: true },
	    React.createElement(skoash.Audio, { delay: 4600, type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFunnel.mp3' }),
	    React.createElement(skoash.Audio, { type: 'sfx', src: CMWN.MEDIA.EFFECT + 'TruckDump.mp3' })
	), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

	exports.default = _.defaults({
	    gameName: 'fantastic-food-sharer',
	    gameNumber: 3,
	    binNames: binNames,
	    getSelectableProps: function getSelectableProps() {
	        return {
	            onSelect: function onSelect(dataRef) {
	                this.updateScreenData({
	                    data: {
	                        'manual-dropper': {
	                            drop: true
	                        },
	                        selectable: {
	                            message: this.props.list[dataRef].props.message
	                        },
	                        moveClaw: true
	                    }
	                });
	            }
	        };
	    },
	    getDropperProps: function getDropperProps(opts) {
	        return {
	            onTransitionEnd: function onTransitionEnd(e) {
	                var _this = this;

	                if (e.propertyName === 'top' && _.includes(e.target.className, DROPPED)) {
	                    var _ret = function () {
	                        var itemRef = _this.refs[ITEMS + _this.firstItemIndex];
	                        var DOMNode = void 0;
	                        var _onAnimationEnd = void 0;

	                        _this.updateScreenData({
	                            key: 'truckClassName',
	                            data: TILT
	                        });

	                        if (opts.selectableMessage !== 'liquids') return {
	                                v: void 0
	                            };

	                        if (itemRef.props.message !== 'liquids') {
	                            var hits = opts.hits + 1;

	                            _this.updateGameData({
	                                keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                                data: {
	                                    start: false,
	                                    score: opts.score - opts.pointsPerMiss,
	                                    hits: hits
	                                }
	                            });

	                            if (hits === opts.maxHits) {
	                                setTimeout(function () {
	                                    _this.updateScreenData({
	                                        keys: ['manual-dropper', 'pickUp'],
	                                        data: true
	                                    });
	                                }, 1000);
	                                return {
	                                    v: void 0
	                                };
	                            }

	                            _this.updateScreenData({
	                                keys: ['reveal', 'open'],
	                                data: 'resort',
	                                callback: function callback() {
	                                    setTimeout(function () {
	                                        _this.updateScreenData({
	                                            data: {
	                                                reveal: {
	                                                    open: null,
	                                                    close: true
	                                                },
	                                                'manual-dropper': {
	                                                    pickUp: true
	                                                },
	                                                catcher: {
	                                                    caught: false
	                                                }
	                                            }
	                                        });
	                                    }, 1000);
	                                }
	                            });

	                            return {
	                                v: void 0
	                            };
	                        }

	                        DOMNode = ReactDOM.findDOMNode(itemRef);

	                        if (DOMNode !== e.target) return {
	                                v: void 0
	                            };

	                        _onAnimationEnd = function onAnimationEnd() {
	                            _this.pickUp(_.defaults({
	                                onPickUp: function onPickUp() {
	                                    var _this2 = this;

	                                    var items = this.state.items;
	                                    var index = this.firstItemIndex;
	                                    var item = items[index];
	                                    item.props.className = item.props.becomes.name;
	                                    item.props.message = item.props.becomes.bin;
	                                    item.props['data-message'] = item.props.becomes.bin;
	                                    items[index] = item;
	                                    this.setState({ items: items }, function () {
	                                        _this2.getFirstItem().removeAllClassNames();
	                                        _this2.updateScreenData({
	                                            keys: [_this2.props.refsTarget, 'refs'],
	                                            data: _.filter(_this2.refs, function (v, k) {
	                                                return !k.indexOf(ITEMS);
	                                            })
	                                        });
	                                    });
	                                    this.updateScreenData({
	                                        data: {
	                                            item: {
	                                                name: _.startCase(_.replace(item.props.becomes.name, /\d+/g, '')),
	                                                pour: false
	                                            },
	                                            'manual-dropper': {
	                                                dropClass: ''
	                                            },
	                                            truckClassName: ''
	                                        }
	                                    });
	                                    DOMNode.removeEventListener('animationend', _onAnimationEnd);
	                                }
	                            }, _this.props));
	                        };

	                        if (!itemRef.state.className || itemRef.state.className.indexOf('POUR') === -1) {
	                            DOMNode.addEventListener('animationend', _onAnimationEnd);
	                            itemRef.addClassName('POUR');
	                            _this.updateScreenData({
	                                key: ['item', 'pour'],
	                                data: true
	                            });
	                        }
	                    }();

	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                }
	            },
	            onPickUp: function onPickUp(itemRef) {
	                itemRef.removeAllClassNames(function () {
	                    if (!itemRef.DOMNode) itemRef.DOMNode = ReactDOM.findDOMNode(itemRef);
	                    itemRef.DOMNode.addEventListener('transitionend', onItemPickUpTransitionEnd.bind(null, itemRef));
	                    itemRef.addClassName(PICKUP);
	                });
	            },
	            onNext: function onNext() {
	                this.updateScreenData({
	                    data: {
	                        item: {
	                            name: _.startCase(_.replace(this.getFirstItem().props.className, /\d+/g, '')),
	                            new: true
	                        },
	                        selectable: {
	                            message: ''
	                        },
	                        truckClassName: ''
	                    }
	                });
	            }
	        };
	    },
	    getCatcherProps: function getCatcherProps(opts) {
	        var props = _default_game_opts2.default.getCatcherProps.call(this, opts);

	        props.onCorrect = function (bucketRef) {
	            this.updateGameData({
	                keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
	                data: opts.score + opts.pointsPerItem
	            });

	            if (bucketRef.props.message !== 'liquids') {
	                this.updateScreenData({
	                    keys: ['manual-dropper', 'next'],
	                    data: true
	                });
	                return;
	            }
	        };

	        return props;
	    },
	    getExtraComponents: function getExtraComponents(opts) {
	        var color = 'milk';

	        switch (true) {
	            case _.includes(opts.itemName, 'Chocolate'):
	                color = 'chocolate';
	                break;
	            case _.includes(opts.itemName, 'Orange'):
	                color = 'orange';
	                break;
	            case _.includes(opts.itemName, 'Fruit'):
	                color = 'fruit';
	                break;
	        }

	        return React.createElement(
	            skoash.Component,
	            {
	                className: 'extras'
	            },
	            React.createElement(skoash.Sprite, {
	                className: 'claw',
	                src: CLAW_SRC,
	                frame: 0,
	                loop: false,
	                animate: opts.moveClaw,
	                duration: [200, 200, 200, 500, 100, 3000, 200, 200, 200, 200, 200, 200],
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                    this.updateScreenData({
	                        key: 'moveClaw',
	                        data: false
	                    });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: 'belt',
	                src: BELT_SRC,
	                frame: 0,
	                loop: false,
	                duration: 500,
	                animate: opts.next,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'chocolate' }),
	                src: CMWN.MEDIA.SPRITE + 'level.3.chocolate.milk',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'fruit' }),
	                src: CMWN.MEDIA.SPRITE + 'level.3.fruit.juice',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'milk' }),
	                src: CMWN.MEDIA.SPRITE + 'level.3.milk',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'orange' }),
	                src: CMWN.MEDIA.SPRITE + 'level.3.orange.juice',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(
	                skoash.Component,
	                { className: 'funnel' },
	                React.createElement(skoash.Sprite, {
	                    className: 'back',
	                    src: FUNNEL_SRC,
	                    frame: 0,
	                    'static': true
	                }),
	                React.createElement(skoash.Sprite, {
	                    className: 'front',
	                    src: FUNNEL_SRC,
	                    frame: 1,
	                    'static': true
	                })
	            ),
	            React.createElement(skoash.Component, {
	                className: (0, _classnames2.default)('truck', opts.truckClassName, opts.selectableMessage),
	                onTransitionEnd: onTruckTransitionEnd.bind(null, opts)
	            }),
	            React.createElement('div', { className: 'truck-stand' })
	        );
	    },

	    itemsToSort: itemsToSort,
	    getAudioArray: function getAudioArray() {
	        return audioArray;
	    },
	    getCatchablesArray: function getCatchablesArray() {
	        return catchablesArray;
	    }
		}, _default_game_opts2.default);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-two-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Share Some More!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Your sorting skills are',
	            React.createElement('br', null),
	            'actions of kindness.',
	            React.createElement('br', null),
	            'Share the love!'
	        ),
	        vo: 'ShareTheLove',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG3'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 2,
	        scoreToWin: 150
	    }, _default_fantastic_food_sharer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-three-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Speed Share!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Get ready for a',
	            React.createElement('br', null),
	            'rush of kindness!'
	        ),
	        vo: 'Speedshare',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG3'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 3,
	        scoreToWin: 200
	    }, _default_fantastic_food_sharer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-four-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Hey Super Sharer!',
	            React.createElement('br', null),
	            'Kindness just',
	            React.createElement('br', null),
	            'skyrocketed in',
	            React.createElement('br', null),
	            'the lunchroom!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Let\'s do this!'
	        ),
	        vo: 'HeySuperSharerSkyrocketed',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG3'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 4,
	        scoreToWin: 250
	    }, _default_fantastic_food_sharer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-five-info',
	        content: React.createElement(
	            'p',
	            null,
	            'The title of',
	            React.createElement('br', null),
	            'Fantastic Food-Sharer',
	            React.createElement('br', null),
	            'is on the horizon!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Let\'s make this happen.'
	        ),
	        vo: 'OnTheHorizon',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG3'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 5,
	        scoreToWin: 300
	    }, _default_fantastic_food_sharer_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'dynamic-diverter-one-info',
	        className: 'exhaust',
	        content: React.createElement(
	            skoash.Component,
	            null,
	            React.createElement(
	                'p',
	                null,
	                'Just because it\'s in the bin-',
	                React.createElement('br', null),
	                'doesn\'t mean it should be.',
	                React.createElement('br', null),
	                React.createElement('br', null),
	                'Drag items to the vent',
	                React.createElement('br', null),
	                'that should not be in',
	                React.createElement('br', null),
	                'the bin to be resorted.'
	            ),
	            React.createElement(skoash.Sprite, {
	                src: CMWN.MEDIA.SPRITE + '_compost',
	                frame: 0
	            })
	        ),
	        vo: 'DragToBin',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG4',
	        image: CMWN.MEDIA.IMAGE + 'exhaust.png'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 1,
	        scoreToWin: 100
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    if (Math.abs(props.gameState.currentScreenIndex - parseInt(key, 10)) > 2) {
	        return React.createElement(skoash.Screen, _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: opts.gameName + '-' + opts.level,
	            backgroundAudio: 'BKG' + opts.gameNumber
	        }));
	    } else {
	        var _ret = function () {
	            var screenProps = void 0;
	            var timerProps = void 0;
	            var dropperProps = void 0;
	            var revealProps = void 0;
	            var lifeProps = void 0;
	            var draggableProps = void 0;
	            var dropzoneProps = void 0;

	            var binComponents = void 0;

	            var LEVEL_PATH = 'gameState.data.' + _.camelCase(opts.gameName) + '.levels.' + opts.level;

	            var start = _.get(props, LEVEL_PATH + '.start', false);
	            var gameComplete = _.get(props, LEVEL_PATH + '.complete', false);
	            var dropped = _.get(props, 'data.draggable.dropped');
	            var dragging = _.get(props, 'data.draggable.dragging');
	            var itemName = _.startCase(_.replace(_.get(dragging, 'props.className', ''), /\d+/g, ''));
	            var binName = _.get(props, 'data.manual-dropper.binName', '');
	            var revealOpen = _.get(props, 'data.reveal.open', false);
	            var revealClose = _.get(props, 'data.reveal.close', false);
	            var carouselNext = _.get(props, 'data.manual-dropper.next', false);
	            var play = _.get(props, 'data.play', null);

	            var answers = _.filter(opts.binNames, function (name) {
	                return name !== binName;
	            });

	            var audioArray = opts.getAudioArray();

	            opts.score = _.get(props, LEVEL_PATH + '.score', 0);
	            opts.highScore = _.get(props, LEVEL_PATH + '.highScore', 0);
	            opts.hits = _.get(props, LEVEL_PATH + '.hits', 0);
	            opts.selectableMessage = _.get(props, 'data.selectable.message', '');
	            opts.playAudio = play ? play : revealOpen === 'resort' ? 'resort' : _.upperFirst(_.camelCase(itemName));

	            screenProps = opts.getScreenProps(opts);
	            timerProps = opts.getTimerProps(opts);
	            dropperProps = opts.getDropperProps(opts);
	            revealProps = opts.getRevealProps(opts);
	            lifeProps = opts.getLifeProps(opts);
	            draggableProps = opts.getDraggableProps(opts);
	            dropzoneProps = opts.getDropzoneProps(opts);

	            binComponents = _.map(opts.binItems, function (bin) {
	                return {
	                    type: _5.default,
	                    props: {
	                        className: bin.name,
	                        message: bin.name,
	                        showNum: 20,
	                        nextOnStart: false,
	                        bin: {
	                            type: skoash.Randomizer,
	                            props: {
	                                remain: true,
	                                bin: _.map(bin.objects, function (v) {
	                                    return {
	                                        type: _9.default,
	                                        props: _.defaults({
	                                            className: v.name,
	                                            message: v.bin,
	                                            becomes: v.becomes,
	                                            children: getChildren(v)
	                                        }, draggableProps)
	                                    };
	                                })
	                            }
	                        }
	                    }
	                };
	            });

	            return {
	                v: React.createElement(
	                    skoash.Screen,
	                    _extends({}, props, {
	                        ref: ref,
	                        key: key,
	                        id: opts.gameName + '-' + opts.level,
	                        complete: gameComplete,
	                        checkComplete: !gameComplete,
	                        backgroundAudio: 'BKG' + opts.gameNumber
	                    }, screenProps),
	                    React.createElement(
	                        skoash.Component,
	                        {
	                            className: 'top-left'
	                        },
	                        React.createElement(
	                            skoash.Score,
	                            {
	                                className: 'level-score',
	                                correct: opts.score,
	                                setScore: true
	                            },
	                            PTS
	                        ),
	                        React.createElement(skoash.Timer, _extends({
	                            countDown: true,
	                            format: 'mm:ss',
	                            timeout: opts.timeout,
	                            complete: gameComplete,
	                            pause: revealOpen,
	                            resume: !revealOpen,
	                            restart: start
	                        }, timerProps))
	                    ),
	                    React.createElement(
	                        skoash.Component,
	                        {
	                            className: 'item-name'
	                        },
	                        React.createElement(
	                            'span',
	                            null,
	                            itemName
	                        )
	                    ),
	                    React.createElement(
	                        skoash.Component,
	                        {
	                            className: 'bin-name'
	                        },
	                        React.createElement(
	                            'span',
	                            null,
	                            binName
	                        )
	                    ),
	                    React.createElement(skoash.Score, _extends({
	                        className: 'life',
	                        max: 0,
	                        incorrect: opts.maxHits,
	                        correct: opts.hits,
	                        setScore: true
	                    }, lifeProps)),
	                    React.createElement(_7.default, _extends({
	                        dropped: dropped,
	                        dragging: dragging
	                    }, dropzoneProps, {
	                        incorrectOnOutOfBounds: false,
	                        dropzones: [React.createElement(skoash.Component, { answers: answers })]
	                    })),
	                    React.createElement(_3.default, _extends({
	                        className: 'bins',
	                        amount: opts.dropperAmount,
	                        next: carouselNext,
	                        bin: React.createElement(skoash.Randomizer, {
	                            remain: true,
	                            bin: binComponents
	                        })
	                    }, dropperProps)),
	                    React.createElement(skoash.Reveal, _extends({
	                        openTarget: 'reveal',
	                        openReveal: revealOpen,
	                        closeReveal: revealClose
	                    }, revealProps, {
	                        list: [React.createElement(skoash.Component, {
	                            ref: 'resort',
	                            type: 'li'
	                        }), React.createElement(skoash.Component, {
	                            ref: 'retry',
	                            type: 'li'
	                        }), React.createElement(skoash.Component, {
	                            ref: 'complete',
	                            type: 'li'
	                        })]
	                    })),
	                    React.createElement(skoash.MediaCollection, {
	                        play: opts.playAudio,
	                        children: audioArray,
	                        checkComplete: false,
	                        complete: true
	                    })
	                )
	            };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	};

	var _2 = __webpack_require__(27);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(68);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(79);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(80);

	var _9 = _interopRequireDefault(_8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PTS = 'pts';

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
	        'static': true
	    });
		};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid = __webpack_require__(69);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _2 = __webpack_require__(78);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Carousel = function (_Selectable) {
	    _inherits(Carousel, _Selectable);

	    function Carousel(props) {
	        _classCallCheck(this, Carousel);

	        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

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

	            if (nextProps.next && nextProps.next !== this.props.next) {
	                this.next();
	            }
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'start', this).call(this);
	            if (this.props.nextOnStart) this.next();
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
	            this.enabled = this.props.enabled;

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
	    enabled: true,
	    nextOnStart: true,
	    pause: 500,
	    clickable: false,
	    onSelect: _.noop
	}, _3.default.defaultProps);

		exports.default = Carousel;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(70);


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(71);
	var encode = __webpack_require__(73);
	var decode = __webpack_require__(75);
	var isValid = __webpack_require__(76);

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
	var clusterWorkerId = __webpack_require__(77) || 0;

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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(72);

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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(74);

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
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(71);

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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(71);

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
/* 77 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropzone = function (_skoash$Component) {
	    _inherits(Dropzone, _skoash$Component);

	    function Dropzone() {
	        _classCallCheck(this, Dropzone);

	        return _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).apply(this, arguments));
	    }

	    _createClass(Dropzone, [{
	        key: 'start',
	        value: function start() {
	            var self = this;
	            var dropzone;
	            var draggable;

	            _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'start', this).call(this);

	            self.dropzoneCorners = _.map(self.props.dropzones, function (value, key) {
	                return self.getCorners(ReactDOM.findDOMNode(self.refs['dropzone-' + key]));
	            });

	            if (self.loadData && _typeof(self.loadData) === 'object') {
	                _.forIn(self.loadData, function (ref1, key1) {
	                    if (ref1.ref && ref1.state) {
	                        _.forIn(self.refs, function (ref2, key2) {
	                            if (key2.indexOf('draggable-') === -1) return;
	                            if (self.refs[key1] && ref2.props.message === ref1.ref) {
	                                dropzone = self.refs[key1];
	                                draggable = ref2;
	                                dropzone.setState({ content: draggable });
	                                draggable.setState(ref1.state);
	                                self.correct(draggable, key1.replace('dropzone-', ''));
	                            }
	                        });
	                    } else {
	                        _.forIn(self.loadData, function (ref2, key2) {
	                            self.refs[key2].setState({ content: [] });
	                            _.forIn(self.refs, function (ref3, key3) {
	                                if (key3.indexOf('draggable-') === -1) return;
	                                if (_.includes(ref2, ref3.props.message)) {
	                                    self.refs[key2].state.content.push(ref3);
	                                    ref3.markCorrect();
	                                }
	                            });
	                        });
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'loadDragNDropData',
	        value: function loadDragNDropData() {
	            var self = this;
	            var dropzone;
	            var draggable;
	            _.forIn(self.loadData, function (ref1, key1) {
	                _.forIn(self.refs, function (ref2, key2) {
	                    if (key2.indexOf('draggable-') === -1) return;
	                    if (self.refs[key1] && ref2.props.message === ref1.ref) {
	                        dropzone = self.refs[key1];
	                        draggable = ref2;
	                        dropzone.setState({ content: draggable });
	                        draggable.setState(ref1.state);
	                        self.correct(draggable, key1.replace('dropzone-', ''));
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'loadMultiAsnwerData',
	        value: function loadMultiAsnwerData() {
	            var self = this;
	            var dropzone;
	            var draggable;
	            _.forIn(self.loadData, function (ref1, key1) {
	                dropzone = self.refs[key1];
	                dropzone.setState({ content: [] });
	                _.forIn(self.refs, function (ref2, key2) {
	                    if (key2.indexOf('draggable-') === -1) return;
	                    draggable = ref2;
	                    if (_.includes(ref1, draggable.props.message)) {
	                        dropzone.state.content.push(draggable);
	                        draggable.markCorrect();
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'getCorners',
	        value: function getCorners(el) {
	            var offset;
	            var corners = [];

	            offset = el.getBoundingClientRect();

	            for (var i = 0; i < 4; i++) {
	                corners.push({
	                    x: offset.left + offset.width * (i === 1 || i === 2 ? 1 : 0),
	                    y: offset.top + offset.height * (i > 1 ? 1 : 0)
	                });
	            }

	            return corners;
	        }
	    }, {
	        key: 'onDrop',
	        value: function onDrop(dropped) {
	            var _this2 = this;

	            var droppedDOM;
	            var corners;
	            var dropzoneRef;

	            droppedDOM = dropped.DOMNode || ReactDOM.findDOMNode(dropped);
	            corners = this.getCorners(droppedDOM);

	            dropzoneRef = _.reduce(this.props.dropzones, function (a, v, k) {
	                if (skoash.util.doIntersect(corners, _this2.dropzoneCorners[k])) {
	                    return _this2.refs['dropzone-' + k];
	                }
	                return a;
	            }, false);

	            if (dropzoneRef) {
	                this.inBounds(dropped, dropzoneRef);
	            } else {
	                this.outOfBounds(dropped);
	            }

	            this.props.onDrop.call(this, dropped);
	        }
	    }, {
	        key: 'onDrag',
	        value: function onDrag(dragging) {
	            var _this3 = this;

	            _.each(this.props.dropzones, function (value, key) {
	                var index;
	                var dropzoneRef;
	                var contains;
	                dropzoneRef = _this3.refs['dropzone-' + key];
	                contains = dropzoneRef.contains || [];
	                index = contains.indexOf(dragging);
	                if (~index) contains.splice(index, 1);
	                dropzoneRef.contains = contains;
	            });

	            this.props.onDrag.call(this, dragging);
	        }
	    }, {
	        key: 'inBounds',
	        value: function inBounds(dropped, dropzoneRef) {
	            if (!dropzoneRef.props.answers || dropzoneRef.props.answers.indexOf(dropped.props.message) !== -1) {
	                this.correct(dropped, dropzoneRef);
	            } else {
	                this.incorrect(dropped, dropzoneRef);
	            }
	        }
	    }, {
	        key: 'outOfBounds',
	        value: function outOfBounds(dropped) {
	            // respond to an out of bounds drop
	            this.playMedia('out');
	            if (this.props.incorrectOnOutOfBounds) this.incorrect(dropped);
	        }
	    }, {
	        key: 'correct',
	        value: function correct(dropped, dropzoneRef) {
	            // respond to correct drop
	            dropped.markCorrect();
	            this.playMedia('correct');

	            dropzoneRef.contains = (dropzoneRef.contains || []).concat(dropped);

	            this.props.onCorrect.call(this, dropped, dropzoneRef);
	        }
	    }, {
	        key: 'incorrect',
	        value: function incorrect(dropped, dropzoneRef) {
	            // respond to incorrect drop
	            dropped.markIncorrect();
	            this.playMedia('incorrect');
	            this.props.onIncorrect.call(this, dropped, dropzoneRef);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.dropped && props.dropped !== this.props.dropped) {
	                this.onDrop(props.dropped);
	            }

	            if (props.dragging && props.dragging !== this.props.dragging) {
	                this.onDrag(props.dragging);
	            }
	        }
	    }, {
	        key: 'renderDropzones',
	        value: function renderDropzones() {
	            return _.map(this.props.dropzones, function (component, key) {
	                return React.createElement(component.type, _extends({}, component.props, {
	                    ref: 'dropzone-' + key,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('dropzones', _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                _extends({}, this.props, { className: this.getClassNames() }),
	                this.renderContentList('assets'),
	                this.renderDropzones()
	            );
	        }
	    }]);

	    return Dropzone;
	}(skoash.Component);

	Dropzone.defaultProps = _.defaults({
	    dropzones: [React.createElement(skoash.Component, null)],
	    onCorrect: _.noop,
	    onIncorrect: _.noop,
	    onDrag: _.noop,
	    onDrop: _.noop,
	    incorrectOnOutOfBounds: true
	}, skoash.Component.defaultProps);

		exports.default = Dropzone;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Draggable = function (_skoash$Component) {
	    _inherits(Draggable, _skoash$Component);

	    function Draggable() {
	        _classCallCheck(this, Draggable);

	        var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

	        _this.state = {
	            endX: 0,
	            endY: 0,
	            zoom: 1
	        };

	        _this.mouseDown = _this.mouseDown.bind(_this);
	        _this.mouseUp = _this.mouseUp.bind(_this);

	        _this.moveEvent = _this.moveEvent.bind(_this);

	        _this.touchStart = _this.touchStart.bind(_this);
	        _this.touchEnd = _this.touchEnd.bind(_this);

	        _this.setZoom = _this.setZoom.bind(_this);
	        return _this;
	    }

	    _createClass(Draggable, [{
	        key: 'shouldDrag',
	        value: function shouldDrag() {
	            return this.props.shouldDrag.call(this);
	        }
	    }, {
	        key: 'markCorrect',
	        value: function markCorrect() {
	            this.setState({
	                correct: true
	            });
	        }
	    }, {
	        key: 'markIncorrect',
	        value: function markIncorrect() {
	            this.setState({
	                correct: false
	            });

	            if (this.props.returnOnIncorrect) {
	                this.returnToStart();
	            }
	        }
	    }, {
	        key: 'startEvent',
	        value: function startEvent(e, cb) {
	            var rect;
	            var startX;
	            var startY;
	            var endX;
	            var endY;
	            var grabX;
	            var grabY;

	            if (e.target !== this.DOMNode) return;
	            if (!this.shouldDrag()) return;

	            if (e.targetTouches && e.targetTouches[0]) {
	                rect = e.target.getBoundingClientRect();
	                e = e.targetTouches[0];
	                e.offsetX = e.pageX - rect.left;
	                e.offsetY = e.pageY - rect.top;
	            }

	            grabX = e.offsetX / this.state.zoom;
	            grabY = e.offsetY / this.state.zoom;

	            startX = endX = e.pageX / this.state.zoom - grabX;
	            startY = endY = e.pageY / this.state.zoom - grabY;

	            if (!this.state.return) {
	                startX = _.isFinite(this.state.grabX) ? this.state.startX + this.state.grabX - grabX : startX;
	                startY = _.isFinite(this.state.grabY) ? this.state.startY + this.state.grabY - grabY : startY;
	            }

	            this.setState({
	                dragging: true,
	                return: false,
	                startX: startX,
	                startY: startY,
	                grabX: grabX,
	                grabY: grabY,
	                endX: endX,
	                endY: endY
	            });

	            this.updateGameState({
	                path: this.props.draggableTarget,
	                data: {
	                    dragging: this,
	                    dropped: null
	                }
	            });

	            this.props.onDrag.call(this, this);

	            if (typeof cb === 'function') cb.call(this);
	        }
	    }, {
	        key: 'attachMouseEvents',
	        value: function attachMouseEvents() {
	            window.addEventListener('mousemove', this.moveEvent);
	            window.addEventListener('mouseup', this.mouseUp);
	        }
	    }, {
	        key: 'attachTouchEvents',
	        value: function attachTouchEvents() {
	            window.addEventListener('touchmove', this.moveEvent);
	            window.addEventListener('touchend', this.touchEnd);
	        }
	    }, {
	        key: 'mouseDown',
	        value: function mouseDown(e) {
	            this.startEvent(e, this.attachMouseEvents);
	        }
	    }, {
	        key: 'touchStart',
	        value: function touchStart(e) {
	            this.startEvent(e, this.attachTouchEvents);
	        }
	    }, {
	        key: 'moveEvent',
	        value: function moveEvent(e) {
	            e = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e;

	            this.setState({
	                endX: e.pageX / this.state.zoom - this.state.grabX,
	                endY: e.pageY / this.state.zoom - this.state.grabY
	            });
	        }
	    }, {
	        key: 'endEvent',
	        value: function endEvent(cb) {
	            this.onDrop();

	            if (this.props.return) {
	                this.returnToStart();
	            } else {
	                this.setState({
	                    dragging: false
	                });
	            }

	            if (typeof cb === 'function') cb.call(this);
	        }
	    }, {
	        key: 'setEnd',
	        value: function setEnd(endX, endY) {
	            this.setState({
	                endX: endX,
	                endY: endY
	            });
	        }
	    }, {
	        key: 'returnToStart',
	        value: function returnToStart() {
	            var endX;
	            var endY;
	            var doReturn;

	            if (this.props.stayOnCorrect && this.state.correct) {
	                endX = this.state.endX;
	                endY = this.state.endY;
	                doReturn = false;
	            } else {
	                endX = this.state.startX;
	                endY = this.state.startY;
	                doReturn = true;
	            }

	            this.setState({
	                dragging: false,
	                return: doReturn,
	                endX: endX,
	                endY: endY
	            });
	        }
	    }, {
	        key: 'detachMouseEvents',
	        value: function detachMouseEvents() {
	            window.removeEventListener('mousemove', this.moveEvent);
	            window.removeEventListener('mouseup', this.mouseUp);
	        }
	    }, {
	        key: 'detachTouchEvents',
	        value: function detachTouchEvents() {
	            window.removeEventListener('touchmove', this.moveEvent);
	            window.removeEventListener('touchend', this.touchEnd);
	        }
	    }, {
	        key: 'mouseUp',
	        value: function mouseUp() {
	            this.endEvent(this.detachMouseEvents);
	        }
	    }, {
	        key: 'touchEnd',
	        value: function touchEnd() {
	            this.endEvent(this.detachTouchEvents);
	        }
	    }, {
	        key: 'onDrop',
	        value: function onDrop() {
	            this.updateGameState({
	                path: this.props.draggableTarget,
	                data: {
	                    dragging: null,
	                    dropped: this
	                }
	            });

	            this.props.onDrop.call(this, this);
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'bootstrap', this).call(this);

	            this.setZoom();

	            this.DOMNode = ReactDOM.findDOMNode(this);

	            this.DOMNode.addEventListener('mousedown', this.mouseDown);
	            this.DOMNode.addEventListener('touchstart', this.touchStart);

	            window.addEventListener('resize', this.setZoom);
	        }
	    }, {
	        key: 'setZoom',
	        value: function setZoom() {
	            var _this2 = this;

	            skoash.trigger('getState').then(function (state) {
	                _this2.setState({
	                    zoom: state.scale
	                });
	            });
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle() {
	            var x = this.state.endX - this.state.startX || 0;
	            var y = this.state.endY - this.state.startY || 0;
	            var scale = this.state.scale || 1;
	            var rotate = this.state.rotate || 0;
	            var transform = 'translateX(' + x + 'px) translateY(' + y + 'px) scale(' + scale + ') rotate(' + rotate + 'deg)';

	            return _.defaults({
	                transform: transform,
	                WebkitTransform: transform
	            }, this.state.style, this.props.style);
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)({
	                DRAGGING: this.state.dragging,
	                RETURN: this.state.return,
	                CORRECT: this.state.correct
	            }, 'draggable', this.state.classes, _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                className: this.getClassNames(),
	                'data-message': this.props.message,
	                style: this.getStyle(),
	                children: this.props.children
	            });
	        }
	    }]);

	    return Draggable;
	}(skoash.Component);

	Draggable.defaultProps = _.defaults({
	    draggableTarget: 'draggable',
	    shouldDrag: function shouldDrag() {
	        return true;
	    },
	    return: false,
	    returnOnIncorrect: false,
	    stayOnCorrect: true,
	    onDrop: _.noop,
	    onDrag: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Draggable;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_compost = __webpack_require__(19);

	var _items_compost2 = _interopRequireDefault(_items_compost);

	var _items_landfill = __webpack_require__(17);

	var _items_landfill2 = _interopRequireDefault(_items_landfill);

	var _items_recycle = __webpack_require__(15);

	var _items_recycle2 = _interopRequireDefault(_items_recycle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var shuffledItemsCompost = _.shuffle(_items_compost2.default);
	var shuffledItemsLandfill = _.shuffle(_items_landfill2.default);
	var shuffledItemsRecycle = _.shuffle(_items_recycle2.default);

	var itemsToSort = [].concat(_items_compost2.default).concat(_items_landfill2.default).concat(_items_recycle2.default);

	var audioRefs = _.uniq(_.map(itemsToSort, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var audioArray = _.map(audioRefs, function (v, k) {
	    return {
	        type: skoash.Audio,
	        ref: v,
	        key: k,
	        props: {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	            onPlay: function onPlay() {
	                this.updateScreenData({
	                    keys: ['item', 'new'],
	                    data: false
	                });
	            }
	        }
	    };
	});

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

	exports.default = _.defaults({
	    gameName: 'dynamic-diverter',
	    gameNumber: 4,
	    pointsPerBin: 400,
	    scoreToWin: 1200,
	    dropperAmount: 2,
	    getDropperProps: function getDropperProps() {
	        return {
	            onNext: function onNext() {
	                this.updateScreenData({
	                    keys: ['manual-dropper', 'binName'],
	                    data: this.state.items[this.firstItemIndex].props.message
	                });
	            }
	        };
	    },
	    getDraggableProps: function getDraggableProps() {
	        return {
	            onReady: function onReady() {
	                this.setState({
	                    style: {
	                        top: _.random(30, 70) + '%',
	                        left: _.random(30, 70) + '%'
	                    },
	                    scale: _.random(1, 1.5),
	                    rotate: _.random(-30, 30)
	                });
	            }
	        };
	    },
	    getDropzoneProps: function getDropzoneProps(opts) {
	        return {
	            onCorrect: function onCorrect(draggable) {
	                var score = opts.score + opts.pointsPerItem;

	                draggable.markCorrect();

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        score: score
	                    }
	                });

	                if (score % opts.pointsPerBin === 0) {
	                    this.updateScreenData({
	                        keys: ['manual-dropper', 'next'],
	                        data: true
	                    });
	                }
	            },
	            onIncorrect: function onIncorrect(draggable, dropzoneArray) {
	                var _this = this;

	                if (!dropzoneArray) return;

	                draggable.setState({
	                    endX: draggable.state.endX + 200,
	                    endY: draggable.state.endY + 200
	                });

	                this.updateScreenData({
	                    keys: ['reveal', 'open'],
	                    data: 'resort',
	                    callback: function callback() {
	                        setTimeout(function () {
	                            _this.updateScreenData({
	                                data: {
	                                    reveal: {
	                                        open: null,
	                                        close: true
	                                    }
	                                }
	                            });
	                        }, 1000);
	                    }
	                });

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        hits: opts.hits + 1,
	                        score: opts.score - opts.pointsPerMiss
	                    }
	                });
	            },
	            assets: [React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'CorrectSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'incorrect', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'WrongSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'drag', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'Drag.mp3' }), React.createElement(skoash.Audio, { ref: 'drop', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'Vacuum.mp3' })],
	            onDrag: function onDrag() {
	                this.playMedia('drag');
	            },
	            onDrop: function onDrop() {
	                this.playMedia('drop');
	            }
	        };
	    },
	    getAudioArray: function getAudioArray() {
	        return audioArray;
	    },

	    binItems: [{
	        name: 'recycle',
	        objects: [].concat(shuffledItemsCompost.splice(0, 2)).concat(shuffledItemsLandfill.splice(0, 2)).concat(shuffledItemsRecycle.splice(0, 6))
	    }, {
	        name: 'landfill',
	        objects: [].concat(shuffledItemsCompost.splice(0, 2)).concat(shuffledItemsLandfill.splice(0, 6)).concat(shuffledItemsRecycle.splice(0, 2))
	    }, {
	        name: 'compost',
	        objects: [].concat(shuffledItemsCompost.splice(0, 6)).concat(shuffledItemsLandfill.splice(0, 2)).concat(shuffledItemsRecycle.splice(0, 2))
	    }]
		}, _default_game_opts2.default);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'dynamic-diverter-two-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Send misplaced items',
	            React.createElement('br', null),
	            'back to be sorted!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Help others by identifying',
	            React.createElement('br', null),
	            'items in the wrong bin.'
	        ),
	        vo: 'MisplacedItems',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG4'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 2,
	        scoreToWin: 150
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'dynamic-diverter-three-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Way to Sort!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'This next level takes',
	            React.createElement('br', null),
	            'Super Sorting Skills!'
	        ),
	        vo: 'WayToSort',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG4'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 3,
	        scoreToWin: 200
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'dynamic-diverter-four-info',
	        content: React.createElement(
	            'p',
	            null,
	            'It\'s getting messy in here!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'These bins are full',
	            React.createElement('br', null),
	            'of things that shouldn\'t',
	            React.createElement('br', null),
	            'have landed here.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Let\'s get sorting!'
	        ),
	        vo: 'GettingMessy',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG4'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 4,
	        scoreToWin: 250
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'dynamic-diverter-five-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Waste Diversion is the',
	            React.createElement('br', null),
	            'name of the game.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'The title of',
	            React.createElement('br', null),
	            'Dynamic Diverter is',
	            React.createElement('br', null),
	            'just around the corner.'
	        ),
	        vo: 'WasteDiversion',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG4'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 5,
	        scoreToWin: 300
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'want-to-stack',
	        className: 'right',
	        content: React.createElement(
	            'p',
	            null,
	            'Why would you',
	            React.createElement('br', null),
	            'want to stack',
	            React.createElement('br', null),
	            'your tray?'
	        ),
	        vo: 'WhyStack'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 91 */
/***/ function(module, exports) {

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
	            id: 'video',
	            backgroundAudio: 'BKG5'
	        }),
	        React.createElement(skoash.Video, { src: SRC })
	    );
	};

		var SRC = 'https://res.cloudinary.com/changemyworldnow/video/upload/' + 'v1486507873/bad_stacking_compressed_n3grpw.mp4';

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-one-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Proper tray stacking',
	            React.createElement('br', null),
	            'is a game of space.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'How much space',
	            React.createElement('br', null),
	            'can you save?'
	        ),
	        vo: 'GameOfSpace',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG5'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 1,
	        timeout: 120000,
	        scoreToWin: 100
	    }, _default_master_sorter_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint max-lines: ["error", {"max": 600}] */
	var onSelect = function onSelect(key) {
	    var ref = this.refs[key];
	    var rect = ReactDOM.findDOMNode(ref).getBoundingClientRect();
	    this.updateScreenData({
	        key: 'item',
	        data: {
	            name: _.startCase(_.replace(ref.props.className, /\d+/g, '')),
	            new: true,
	            ref: ref,
	            top: rect.top,
	            left: rect.left
	        }
	    });
	};

	var resort = function resort() {
	    var _this = this;

	    this.updateScreenData({
	        keys: ['reveal', 'open'],
	        data: 'resort',
	        callback: function callback() {
	            setTimeout(function () {
	                _this.updateScreenData({
	                    data: {
	                        reveal: {
	                            open: null,
	                            close: true
	                        },
	                        'manual-dropper': {
	                            pickUp: true
	                        },
	                        catcher: {
	                            caught: false
	                        }
	                    }
	                });
	            }, 1000);
	        }
	    });
	};

	var binNames = ['liquids', 'food-share', 'recycle', 'landfill', 'compost', 'tray-stacking', 'home'];

	var itemsToSort = _.filter(_items_to_sort2.default, function (item) {
	    return _.includes(binNames, item.bin);
	});

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
	        'static': true
	    });
	};

	var mapItems = function mapItems(itemNames) {
	    var items = _.filter(_items_to_sort2.default, function (item) {
	        return _.includes(itemNames, item.name);
	    });

	    return _.map(items, function (item) {
	        return React.createElement(_3.default, {
	            className: item.name,
	            message: item.bin,
	            reCatchable: true,
	            becomes: item.becomes,
	            children: getChildren(item)
	        });
	    });
	};

	var traysArray = [{
	    name: 'tray',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['full-plastic-water-bottle-1', 'half-full-chocolate-milk-carton', 'half-full-energy-drink-bottle', 'half-full-lemonade-box-1', 'half-full-orange-juice-2'])
	    })]
	}, {
	    name: 'tray',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['plastic-cup-1', 'apple-core', 'empty-cracker-wrapper-2', 'full-plastic-water-bottle-2', 'whole-banana'])
	    })]
	}, {
	    name: 'tray-pink',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['empty-yogurt-container-10'])
	    })]
	}, {
	    name: 'tray-blue',
	    bin: 'tray-stacking',
	    children: [React.createElement(skoash.Selectable, {
	        onSelect: onSelect,
	        list: mapItems(['empty-yogurt-container-10'])
	    })]
	}];

	var catchablesArray = _.map(traysArray, function (v) {
	    return {
	        type: _3.default,
	        props: {
	            className: v.name,
	            message: v.bin,
	            reCatchable: true,
	            becomes: v.becomes,
	            children: getChildren(v)
	        }
	    };
	});

	var audioRefs = _.uniq(_.map(itemsToSort, function (v) {
	    return _.upperFirst(_.camelCase(_.replace(v.name, /\d+/g, '')));
	}));

	var audioArray = _.map(audioRefs, function (v, k) {
	    return {
	        type: skoash.Audio,
	        ref: v,
	        key: k,
	        props: {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.GAME + 'sound-assets/_vositems/' + v + '.mp3',
	            onPlay: function onPlay() {
	                this.updateScreenData({
	                    keys: ['item', 'new'],
	                    data: false
	                });
	            }
	        }
	    };
	});

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'next', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LunchboxSlide.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'tray', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'TrayStackerRack.mp3' }), React.createElement(skoash.Audio, { ref: 'select', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

	exports.default = _.defaults({
	    gameName: 'master-sorter',
	    gameNumber: 5,
	    dropperAmount: 2,
	    binNames: binNames,
	    collideFraction: .4,
	    getSelectableProps: function getSelectableProps(opts) {
	        return {
	            onSelect: function onSelect(binRefKey) {
	                var dropClass = _.toUpper(opts.binNames[binRefKey]);
	                if (opts.itemRef) {
	                    this.updateScreenData({
	                        keys: ['item', 'className'],
	                        data: dropClass
	                    });
	                    return;
	                }

	                this.updateScreenData({
	                    key: 'manual-dropper',
	                    data: {
	                        drop: true,
	                        dropClass: dropClass
	                    }
	                });
	            }
	        };
	    },
	    getDropperProps: function getDropperProps(opts) {
	        return {
	            onTransitionEnd: function onTransitionEnd(e) {
	                var _this2 = this;

	                var tray = this.getFirstItem();
	                var itemIndex = _.indexOf(tray.refs['children-0'].state.classes, 'SELECTED');
	                var itemRef = !opts.itemRef ? tray : tray.refs['children-0'].refs[itemIndex];
	                var DOMNode = void 0;
	                var _onAnimationEnd = void 0;

	                if (e.propertyName !== 'top' || !_.includes(opts.itemClassName, 'LIQUIDS') && !_.includes(this.props.dropClass, 'LIQUIDS')) {
	                    return;
	                }

	                if (!opts.itemRef) {
	                    this.pickUp();
	                    this.updateScreenData({
	                        key: 'manual-dropper',
	                        data: {
	                            drop: false,
	                            dropClass: ''
	                        }
	                    });
	                }

	                if (itemRef.props.message !== 'liquids') {
	                    var hits = opts.hits + 1;

	                    this.updateGameData({
	                        keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                        data: {
	                            start: false,
	                            score: opts.score - opts.pointsPerMiss,
	                            hits: hits
	                        }
	                    });

	                    this.updateScreenData({
	                        key: 'item',
	                        data: {
	                            removeClassName: true,
	                            className: null
	                        }
	                    });

	                    if (hits === opts.maxHits) {
	                        setTimeout(function () {
	                            _this2.updateScreenData({
	                                data: {
	                                    'manual-dropper': {
	                                        next: true
	                                    },
	                                    item: {
	                                        name: null,
	                                        ref: null,
	                                        className: null
	                                    }
	                                }
	                            });
	                        }, 1000);
	                        return;
	                    }

	                    resort.call(this);

	                    return;
	                }

	                DOMNode = ReactDOM.findDOMNode(itemRef);

	                if (DOMNode !== e.target) return;

	                _onAnimationEnd = function onAnimationEnd() {
	                    var items = _this2.state.items;
	                    var index = _this2.firstItemIndex;
	                    var item = items[index];
	                    var selectable = item.props.children[0];
	                    var selectedItem = selectable.props.list[itemIndex];
	                    selectedItem.props.className = selectedItem.props.becomes.name;
	                    selectedItem.props.message = selectedItem.props.becomes.bin;
	                    selectedItem.props['data-message'] = selectedItem.props.becomes.bin;
	                    items[index] = item;
	                    _this2.setState({ items: items });

	                    _this2.updateGameData({
	                        keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
	                        data: opts.score + opts.pointsPerItem
	                    });

	                    _this2.updateScreenData({
	                        key: 'item',
	                        data: {
	                            removeClassName: true,
	                            className: null,
	                            amount: opts.itemAmount - 1
	                        },
	                        callback: function callback() {
	                            tray.refs['children-0'].setState({ classes: {} });
	                            _this2.updateScreenData({
	                                key: 'item',
	                                data: {
	                                    name: null,
	                                    ref: null,
	                                    className: null,
	                                    pour: false
	                                }
	                            });
	                        }
	                    });

	                    DOMNode.removeEventListener('animationend', _onAnimationEnd);
	                };

	                if (!_.includes(opts.itemClassName, 'POUR')) {
	                    DOMNode.addEventListener('animationend', _onAnimationEnd);
	                    itemRef.addClassName('POUR');
	                    this.updateScreenData({
	                        key: ['item', 'pour'],
	                        data: true
	                    });
	                }
	            },
	            onComponentWillReceiveProps: function onComponentWillReceiveProps(nextProps) {
	                if (nextProps.itemRef != null) {
	                    if (nextProps.itemClassName != null && nextProps.itemClassName !== this.props.itemClassName) {
	                        var selectable = this.refs['items-' + this.firstItemIndex].refs['children-0'];
	                        var itemIndex = _.indexOf(selectable.state.classes, selectable.props.selectClass);
	                        var item = selectable.refs[itemIndex];
	                        if (!item) return;
	                        item.addClassName(nextProps.itemClassName);
	                    }

	                    if (nextProps.removeItemClassName && nextProps.removeItemClassName !== this.props.itemClassName) {
	                        var _selectable = this.refs['items-' + this.firstItemIndex].refs['children-0'];
	                        var _itemIndex = _.indexOf(_selectable.state.classes, _selectable.props.selectClass);
	                        var _item = _selectable.refs[_itemIndex];
	                        if (!_item) return;
	                        _item.removeAllClassNames();
	                        this.updateScreenData({
	                            key: 'item',
	                            data: {
	                                className: null,
	                                removeClassName: false
	                            }
	                        });
	                    }
	                }

	                if (nextProps.selectItem && nextProps.selectItem !== this.props.selectItem) {
	                    var tray = this.getFirstItem();

	                    if (tray.props.message === 'home') {
	                        tray.addClassName('HOME');
	                    } else {
	                        var rect = ReactDOM.findDOMNode(tray).getBoundingClientRect();
	                        var name = _.startCase(_.replace(tray.props.className, /\d+/g, ''));
	                        var left = rect.left + (rect.right - rect.left) * .8 / 2;
	                        var top = rect.top + (rect.bottom - rect.top) * .8 / 2;

	                        this.updateScreenData({
	                            key: 'item',
	                            data: {
	                                name: name,
	                                top: top,
	                                left: left
	                            }
	                        });
	                    }
	                }
	            },
	            onNext: function onNext() {
	                this.updateScreenData({
	                    data: {
	                        item: {
	                            amount: _.reduce(this.getFirstItem().refs['children-0'].refs, function (a, ref) {
	                                return a + (ref.props.message === 'liquids' ? 2 : 1);
	                            }, 0)
	                        },
	                        'manual-dropper': {
	                            selectItem: false
	                        }
	                    }
	                });
	            }
	        };
	    },
	    getCatcherProps: function getCatcherProps(opts) {
	        return {
	            onCorrect: function onCorrect(bucketRef) {
	                var _this3 = this;

	                var amount = opts.itemAmount - 1;

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
	                    data: opts.score + opts.pointsPerItem
	                });

	                if (opts.itemRef) {
	                    this.updateScreenData({
	                        key: 'item',
	                        data: {
	                            className: 'CAUGHT',
	                            amount: amount
	                        },
	                        callback: function callback() {
	                            _this3.updateScreenData({
	                                key: 'item',
	                                data: {
	                                    name: null,
	                                    ref: null,
	                                    className: null
	                                },
	                                callback: function callback() {
	                                    if (!amount) {
	                                        _this3.updateScreenData({
	                                            key: 'manual-dropper',
	                                            data: {
	                                                selectItem: true,
	                                                dropClass: null
	                                            }
	                                        });
	                                    }
	                                }
	                            });
	                        }
	                    });

	                    return;
	                }

	                if (_.get(bucketRef, 'props.message') !== 'liquids') {
	                    this.updateScreenData({
	                        data: {
	                            'manual-dropper': {
	                                next: true
	                            },
	                            item: {
	                                name: null,
	                                ref: null,
	                                className: null
	                            }
	                        }
	                    });
	                    return;
	                }
	            },
	            onIncorrect: function onIncorrect() {
	                var _this4 = this;

	                var hits = opts.hits + 1;

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        start: false,
	                        score: opts.score - opts.pointsPerMiss,
	                        hits: hits
	                    }
	                });

	                this.updateScreenData({
	                    key: 'item',
	                    data: {
	                        removeClassName: true,
	                        className: null
	                    }
	                });

	                if (hits === opts.maxHits) {
	                    setTimeout(function () {
	                        _this4.updateScreenData({
	                            data: {
	                                'manual-dropper': {
	                                    next: true
	                                },
	                                item: {
	                                    name: null,
	                                    ref: null,
	                                    className: null
	                                }
	                            }
	                        });
	                    }, 1000);
	                    return;
	                }

	                resort.call(this);
	            }
	        };
	    },
	    getExtraComponents: function getExtraComponents(opts) {
	        var color = 'milk';

	        switch (true) {
	            case _.includes(opts.itemName, 'Chocolate'):
	                color = 'chocolate';
	                break;
	            case _.includes(opts.itemName, 'Orange'):
	                color = 'orange';
	                break;
	            case _.includes(opts.itemName, 'Fruit'):
	                color = 'fruit';
	                break;
	        }

	        return React.createElement(
	            skoash.Component,
	            null,
	            React.createElement(
	                'div',
	                { className: 'tray-stacking-title' },
	                React.createElement(
	                    'span',
	                    null,
	                    'Tray Stacking'
	                )
	            ),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'chocolate' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.chocolate.milk',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'fruit' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.fruit.juice',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'milk' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.milk',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            }),
	            React.createElement(skoash.Sprite, {
	                className: (0, _classnames2.default)('pour', { show: opts.pour && color === 'orange' }),
	                src: CMWN.MEDIA.SPRITE + 'level.2.orange.juice',
	                animate: opts.pour,
	                loop: false,
	                duration: 600,
	                frame: 0,
	                onComplete: function onComplete() {
	                    this.setState({ frame: this.props.frame });
	                }
	            })
	        );
	    },
	    getAudioArray: function getAudioArray() {
	        return audioArray;
	    },
	    getCatchablesArray: function getCatchablesArray() {
	        return catchablesArray;
	    }
		}, _default_game_opts2.default);

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-two-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Not all lunches are',
	            React.createElement('br', null),
	            'created equally.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Some lunches come from',
	            React.createElement('br', null),
	            'home and there is',
	            React.createElement('br', null),
	            'no tray stacking needed!'
	        ),
	        vo: 'LunchesCreatedEqually',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG5'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 2,
	        scoreToWin: 150
	    }, _default_master_sorter_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-three-info',
	        content: React.createElement(
	            'p',
	            null,
	            'Items from home',
	            React.createElement('br', null),
	            'can be tricky!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'They are unique and you',
	            React.createElement('br', null),
	            'are on your own to sort!',
	            React.createElement('br', null),
	            'Ask for help if you',
	            React.createElement('br', null),
	            'are unsure of items.'
	        ),
	        vo: 'ItemsFromHome',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG5'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 3,
	        scoreToWin: 200
	    }, _default_master_sorter_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-four-info',
	        content: React.createElement(
	            'p',
	            null,
	            'This is a tough',
	            React.createElement('br', null),
	            'challenge but I see',
	            React.createElement('br', null),
	            'your new Flip',
	            React.createElement('br', null),
	            'on the horizon!',
	            React.createElement('br', null),
	            'Let\'s Go!'
	        ),
	        vo: 'ToughChallenge',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG5'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 4,
	        scoreToWin: 250
	    }, _default_master_sorter_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'priceless-pourer-five-info',
	        content: React.createElement(
	            'p',
	            null,
	            'You are about to Win',
	            React.createElement('br', null),
	            'the highest honor for the',
	            React.createElement('br', null),
	            'Green Team Challenge!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Win this level to become',
	            React.createElement('br', null),
	            'a Master Sorter!'
	        ),
	        vo: 'HighestHonor',
	        sfx: 'InfoFrameMove1',
	        backgroundAudio: 'BKG5'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dropper_game_component2.default)(props, ref, key, _.defaults({
	        level: 5,
	        scoreToWin: 300
	    }, _default_master_sorter_opts2.default));
	};

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _info_screen_component2.default)(props, ref, key, {
	        id: 'now-a-member',
	        content: React.createElement(
	            'p',
	            null,
	            'You are now a member',
	            React.createElement('br', null),
	            'of the Green Team!',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'It\'s time to share',
	            React.createElement('br', null),
	            'it with your',
	            React.createElement('br', null),
	            'family and community!'
	        ),
	        vo: 'MemberOfGreenTeam'
	    });
	};

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 104 */
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
	                {
	                    id: this.props.id,
	                    className: 'screen ' + this.getClassNames()
	                },
	                this.renderAssets(),
	                React.createElement(
	                    skoash.Component,
	                    { className: 'container' },
	                    React.createElement(
	                        'h2',
	                        null,
	                        'Are you sure',
	                        React.createElement('br', null),
	                        'you want to quit?'
	                    ),
	                    React.createElement('button', {
	                        className: 'quit-yes',
	                        onClick: this.okay.bind(this)
	                    }),
	                    React.createElement('button', {
	                        className: 'quit-no',
	                        onClick: this.cancel.bind(this)
	                    })
	                )
	            );
	        }
	    }]);

	    return QuitScreen;
	}(skoash.Screen);

	exports.default = React.createElement(QuitScreen, {
	    id: 'quit',
	    assets: []
		});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWJjMmM4ZGNjM2Q4ZjFlOGFiMGIiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbmZpZy5qc29uIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2xvYWRlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdGl0bGVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2luZGV4LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2VmZmVjdHMvZmlyZXdvcmtzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaW5mb19zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19yZWN5Y2xlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2xhbmRmaWxsLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZml2ZV93YXlzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2NvbXBvc3QuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9sZXZlbF9zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHJvcHBlcl9nYW1lX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2dhbWVfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX3RvX3NvcnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19mb29kX3NoYXJlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfbGlxdWlkcy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGV2ZWxfY29tcGxldGVfc2NyZWVuX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX29uZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2FscGhhYmV0LmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvaXMtdmFsaWQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Ryb3B6b25lLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC40LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvd2FudF90b19zdGFja19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy92aWRlb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL25vd19hX21lbWJlcl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9xdWl0X3NjcmVlbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZihwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChjYWxsYmFjaykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdGlmKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gMTAwMDA7XG4gXHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHR9IGNhdGNoKGVycikge1xuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnIpO1xuIFx0XHR9XG4gXHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0aWYocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0aWYocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIikpO1xuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRjYWxsYmFjaygpO1xuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHR9IGNhdGNoKGUpIHtcbiBcdFx0XHRcdFx0Y2FsbGJhY2soZSk7XG4gXHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIHVwZGF0ZSk7XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0fVxuXG5cbiBcdC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2JlZjQ1YjAvc3JjL3NoYXJlZC91dGlscy9jYW5EZWZpbmVQcm9wZXJ0eS5qc1xuIFx0dmFyIGNhbkRlZmluZVByb3BlcnR5ID0gZmFsc2U7XG4gXHR0cnkge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIFwieFwiLCB7XG4gXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHt9XG4gXHRcdH0pO1xuIFx0XHRjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XG4gXHR9IGNhdGNoKHgpIHtcbiBcdFx0Ly8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMWJjMmM4ZGNjM2Q4ZjFlOGFiMGJcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA8IDApXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcbiBcdFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fSBlbHNlIGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVxdWVzdCArIFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArIG1vZHVsZUlkKTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSkge1xuIFx0XHRcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCAoZnVuY3Rpb24obmFtZSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fShuYW1lKSkpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Zm5bbmFtZV0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKVxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQsIGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChudWxsLCBmbik7XG4gXHRcdFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdH1cblxuIFx0XHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgXCJlXCIsIHtcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHR2YWx1ZTogZW5zdXJlXG4gXHRcdFx0fSk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Zm4uZSA9IGVuc3VyZTtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2s7XG4gXHRcdFx0XHRlbHNlXG4gXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwibnVtYmVyXCIpXG4gXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGlibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdENhbGxiYWNrO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5LCBjYWxsYmFjaykge1xuIFx0XHRpZihob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0aWYodHlwZW9mIGFwcGx5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gZmFsc2U7XG4gXHRcdFx0Y2FsbGJhY2sgPSBhcHBseTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xuIFx0XHRcdH07XG4gXHRcdH1cbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdGhvdERvd25sb2FkTWFuaWZlc3QoZnVuY3Rpb24oZXJyLCB1cGRhdGUpIHtcbiBcdFx0XHRpZihlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuIFx0XHRcdGlmKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCBudWxsKTtcbiBcdFx0XHRcdHJldHVybjtcbiBcdFx0XHR9XG5cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHVwZGF0ZS5jLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXBbdXBkYXRlLmNbaV1dID0gdHJ1ZTtcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENhbGxiYWNrID0gY2FsbGJhY2s7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSAwO1xuIFx0XHRcdHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGNhbGxiYWNrID0gaG90Q2FsbGJhY2s7XG4gXHRcdGhvdENhbGxiYWNrID0gbnVsbDtcbiBcdFx0aWYoIWNhbGxiYWNrKSByZXR1cm47XG4gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHRob3RBcHBseShob3RBcHBseU9uVXBkYXRlLCBjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdGlmKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRjYWxsYmFjayA9IG9wdGlvbnM7XG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xuIFx0XHR9IGVsc2UgaWYob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcbiBcdFx0XHR9O1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdG9wdGlvbnMgPSB7fTtcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFttb2R1bGVdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZighbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZClcbiBcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICsgbW9kdWxlSWQpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYobW9kdWxlSWQgPT09IDApIHtcbiBcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyBtb2R1bGVJZCArIFwiIGluIFwiICsgcGFyZW50SWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSA+PSAwKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4gW291dGRhdGVkTW9kdWxlcywgb3V0ZGF0ZWREZXBlbmRlbmNpZXNdO1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxuIFx0XHRcdFx0XHRhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHR2YXIgcmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZighcmVzdWx0KSB7XG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZihyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKHJlc3VsdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdFswXSk7XG4gXHRcdFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIHJlc3VsdFsxXSkge1xuIFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0WzFdLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHRbMV1bbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZighbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZighY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0dmFyIGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdHZhciBpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0aWYoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHR2YXIgY2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRjYihvdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoKGVycikge1xuIFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2UgaWYoIWVycm9yKVxuIFx0XHRcdFx0XHRlcnJvciA9IGVycjtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZihlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogaG90Q3VycmVudFBhcmVudHMsXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKSgwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYmMyYzhkY2MzZDhmMWU4YWIwYiIsIndpbmRvdy5FTlZJUk9OTUVOVCA9IHtcbiAgICBNRURJQTogJ2h0dHBzOi8vbWVkaWEtc3RhZ2luZy5jaGFuZ2VteXdvcmxkbm93LmNvbS9mLydcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvanMvZGV2LXZhcmlhYmxlcy5qcyIsInVuZGVmaW5lZFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAiLCIoZnVuY3Rpb24gKGdhbWVOYW1lKSB7XG4gICAgLy8gcmVtb3ZlIHdpbmRvdy5NRURJQSBvbmNlIG5vIGdhbWVzIHJlZmVyZW5jZSBpdFxuICAgIHZhciBNRURJQSA9IHdpbmRvdy5NRURJQSA9IHtcbiAgICAgICAgQkFTRTogRU5WSVJPTk1FTlQuTUVESUFcbiAgICB9O1xuXG4gICAgY29uc3QgR0FNRSA9ICdnYW1lcy8nO1xuICAgIGNvbnN0IEVGRkVDVCA9ICdzb3VuZC1hc3NldHMvZWZmZWN0cy8nO1xuICAgIGNvbnN0IFZPID0gJ3NvdW5kLWFzc2V0cy92b3MvJztcbiAgICBjb25zdCBJTUFHRSA9ICdpbWFnZS1hc3NldHMvJztcbiAgICBjb25zdCBTUFJJVEUgPSAnc3ByaXRlcy1hbmltYXRpb25zLyc7XG4gICAgY29uc3QgRlJBTUUgPSAnZnJhbWVzLyc7XG4gICAgY29uc3QgRk9OVCA9ICdmb250cy8nO1xuICAgIGNvbnN0IFNIQVJFRCA9ICdzaGFyZWQvJztcbiAgICBjb25zdCBNT0NLX0dBTUUgPSAnbW9jay1nYW1lLyc7XG5cbiAgICBNRURJQS5GT05UID0gTUVESUEuQkFTRSArIEZPTlQ7XG4gICAgTUVESUEuU0hBUkVEID0gTUVESUEuQkFTRSArIEdBTUUgKyBTSEFSRUQ7XG5cbiAgICBNRURJQS5HQU1FID0gTUVESUEuQkFTRSArIEdBTUUgKyBnYW1lTmFtZSArICcvJztcbiAgICBNRURJQS5FRkZFQ1QgPSBNRURJQS5HQU1FICsgRUZGRUNUO1xuICAgIE1FRElBLlZPID0gTUVESUEuR0FNRSArIFZPO1xuICAgIE1FRElBLklNQUdFID0gTUVESUEuR0FNRSArIElNQUdFO1xuICAgIE1FRElBLlNQUklURSA9IE1FRElBLkdBTUUgKyBTUFJJVEU7XG4gICAgTUVESUEuRlJBTUUgPSBNRURJQS5HQU1FICsgRlJBTUU7XG4gICAgTUVESUEuRk9OVCA9IE1FRElBLkdBTUUgKyBGT05UO1xuXG4gICAgTUVESUEuTU9DSyA9IHt9O1xuICAgIE1FRElBLk1PQ0suR0FNRSA9IE1FRElBLkJBU0UgKyBHQU1FICsgTU9DS19HQU1FO1xuICAgIE1FRElBLk1PQ0suRUZGRUNUID0gTUVESUEuTU9DSy5HQU1FICsgRUZGRUNUO1xuICAgIE1FRElBLk1PQ0suVk8gPSBNRURJQS5NT0NLLkdBTUUgKyBWTztcbiAgICBNRURJQS5NT0NLLklNQUdFID0gTUVESUEuTU9DSy5HQU1FICsgSU1BR0U7XG4gICAgTUVESUEuTU9DSy5TUFJJVEUgPSBNRURJQS5NT0NLLkdBTUUgKyBTUFJJVEU7XG4gICAgTUVESUEuTU9DSy5GUkFNRSA9IE1FRElBLk1PQ0suR0FNRSArIEZSQU1FO1xuICAgIE1FRElBLk1PQ0suRk9OVCA9IE1FRElBLk1PQ0suR0FNRSArIEZPTlQ7XG5cbiAgICB3aW5kb3cuQ01XTi5NRURJQSA9IE1FRElBO1xufSh3aW5kb3cuQ01XTi5nYW1lRm9sZGVyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvanMvbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMSc7XG5cbmltcG9ydCBpT1NTY3JlZW4gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xJztcblxuaW1wb3J0IFRpdGxlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90aXRsZV9zY3JlZW4nO1xuaW1wb3J0IEhpVGhlcmVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2hpX3RoZXJlX3NjcmVlbic7XG5pbXBvcnQgS2V5SXNTb3J0aW5nU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4nO1xuaW1wb3J0IExpZ2h0c1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbic7XG5pbXBvcnQgRml2ZVdheXNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZpdmVfd2F5c19zY3JlZW4nO1xuaW1wb3J0IExldmVsU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXZlbF9zY3JlZW5fY29tcG9uZW50JztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjFTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjNJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb240SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uNFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb241U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IExldmVsQ29tcGxldGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldmVsX2NvbXBsZXRlX3NjcmVlbl9jb21wb25lbnQnO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX29uZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIySW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyM0luZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI0SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9mb3VyX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI1SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI1U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vbmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3R3b19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3RocmVlX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZm91cl9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IFdhbnRUb1N0YWNrU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy93YW50X3RvX3N0YWNrX3NjcmVlbic7XG5pbXBvcnQgVmlkZW9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IE5vd0FNZW1iZXJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL25vd19hX21lbWJlcl9zY3JlZW4nO1xuaW1wb3J0IFF1aXRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3F1aXRfc2NyZWVuJztcblxuc2tvYXNoLnN0YXJ0KFxuICAgIDxza29hc2guR2FtZVxuICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgbG9hZGVyPXs8TG9hZGVyIC8+fVxuICAgICAgICBzY3JlZW5zPXtbXG4gICAgICAgICAgICBpT1NTY3JlZW4sXG4gICAgICAgICAgICBUaXRsZVNjcmVlbixcbiAgICAgICAgICAgIEhpVGhlcmVTY3JlZW4sXG4gICAgICAgICAgICBLZXlJc1NvcnRpbmdTY3JlZW4sXG4gICAgICAgICAgICBMaWdodHNTY3JlZW4sXG4gICAgICAgICAgICBGaXZlV2F5c1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMCksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24xU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS4xKSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjIpLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24zSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMyksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb240U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS40KSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbigxKSxcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMCksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjEpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi4yKSxcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMyksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjQpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oMiksXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjApLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjEpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjJJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjIpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjMpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjQpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjVJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbigzKSxcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMCksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjEpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC4yKSxcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMyksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjQpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oNCksXG4gICAgICAgICAgICBXYW50VG9TdGFja1NjcmVlbixcbiAgICAgICAgICAgIFZpZGVvU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4wKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyMVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuMSksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIySW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjIpLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyM0luZm9TY3JlZW4sXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIzU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4zKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyNFNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuNCksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXI1SW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbig1KSxcbiAgICAgICAgICAgIE5vd0FNZW1iZXJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDYpLFxuICAgICAgICBdfVxuICAgICAgICBtZW51cz17e1xuICAgICAgICAgICAgcXVpdDogUXVpdFNjcmVlbixcbiAgICAgICAgfX1cbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fcmVjeWNsZS5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGlxdWlkcy5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGFuZGZpbGwuanNvbmB9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5KU09OIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2Zvb2RzaGFyZS5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fY29tcG9zdC5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X3JlY3ljbGUucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xpcXVpZHMucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xhbmRmaWxsLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9mb29kc2hhcmUucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2NvbXBvc3QucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1wdXJwbGUucmliYm9uLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9bHVnZ2FnZS5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1zcHJpdGUuc3Rhci5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLkZSQU1FfWZyYW1lLjAxLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuRlJBTUV9ZnJhbWUuMDIucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5GUkFNRX10cmFuc2l0aW9uLmZyYW1lLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5tYWlubmF2LnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9dGl0bGVzY3JuYmcuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjAxLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC4wMi5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQuMDMuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjA0LmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFuc2l0aW9uLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFzaC5yZWN5Y2xlLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFzaC5sYW5kZmlsbC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQudHJhc2guY29tcG9zdC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXF1aXQuYmFja2dyb3VuZC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gdHlwZT1cInNmeFwiIHJlZj1cImJ1dHRvblwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QnV0dG9uQ2xpY2subXAzYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJzZnhcIiByZWY9XCJzY3JlZW4tY29tcGxldGVcIiBzcmM9e2Ake01FRElBLkVGRkVDVH1OZXh0QXBwZWFyLm1wM2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0d0aXRsZVwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0d0aXRsZS5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0cxXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzEubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHMlwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0cyLm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzNcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHMy5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0c0XCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzQubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHNVwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0c1Lm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzZcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHNi5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIHRpdGxlXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnMVwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZzJcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2czXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnNFwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIHRyYXNoXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdHJhbnNpdGlvblwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIHF1aXRcIiAvPixcbiAgICAgICAgXX1cbiAgICAvPlxuKTtcblxuaWYgKG1vZHVsZS5ob3QpIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImlkXCI6IFwiZ3JlZW4tdGVhbS1jaGFsbGVuZ2VcIixcblx0XCJ2ZXJzaW9uXCI6IDEsXG5cdFwic2tvYXNoXCI6IFwiMS4xLjNcIixcblx0XCJoZWFkX2luamVjdGlvblwiOiBcIlwiLFxuXHRcImRpbWVuc2lvbnNcIjoge1xuXHRcdFwid2lkdGhcIjogOTYwLFxuXHRcdFwiaGVpZ2h0XCI6IDU0MFxuXHR9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29uZmlnLmpzb25cbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cImxvYWRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPkxvYWRpbmchPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiaW9zLXNwbGFzaFwiXG4gICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgIGNvbXBsZXRlRGVsYXk9ezYwMDB9XG4gICAgICAgICAgICBuZXh0RGVsYXk9ezMwMDB9XG4gICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICAgIGhpZGVQcmV2XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNIQVJFRH1pb3Mtc3RhcnQtYmFsbC5wbmdgfSAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU0hBUkVEfWlvcy1zdGFydC1iYWxsLWFuaW0uZ2lmYH0gLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJpbXBvcnQgJ3NoYXJlZC9lZmZlY3RzL2luZGV4JztcblxuY29uc3QgRklSRVdPUktTID0gJ2ZpcmV3b3Jrcyc7XG5cbmxldCBvblN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWZmZWN0ID0gd2luZG93LkNNV04ubWFrZUVmZmVjdCgnZmlyZXdvcmtzJywgUmVhY3RET00uZmluZERPTU5vZGUodGhpcyksIHtcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaW1hZ2UpLFxuICAgIH0pO1xufTtcblxubGV0IG9uU3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBfLmludm9rZSh0aGlzLmVmZmVjdCwgJ2Rlc3Ryb3knKTtcbiAgICBkZWxldGUgdGhpcy5lZmZlY3Q7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInRpdGxlXCJcbiAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz1cIkJLR3RpdGxlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGgzIGNvbnRlbnQ9XCJHcmVlbiBUZWFtIENoYWxsZW5nZVwiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9Z3JhZGllbnQtdGV4dHVyZS5qcGdgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0cmFzaFwiXG4gICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXRpdGxldHJhc2hjYW4ucG5nYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2hhcmFjdGVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9Z3JlZW50ZWFtY2hhcmFjLnBuZ2B9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyYXlcIlxuICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXRyYXkucG5nYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17RklSRVdPUktTfVxuICAgICAgICAgICAgICAgIHJlZj17RklSRVdPUktTfVxuICAgICAgICAgICAgICAgIG9uU3RhcnQ9e29uU3RhcnR9XG4gICAgICAgICAgICAgICAgb25TdG9wPXtvblN0b3B9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICByZWY9XCJpbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXNjcm5iZy5qcGdgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy90aXRsZV9zY3JlZW4uanMiLCJpbXBvcnQgZWZmZWN0cyBmcm9tICcuL2VmZmVjdHMnO1xuXG5sZXQgbWFrZUVmZmVjdCA9IGZ1bmN0aW9uIChlZmZlY3ROYW1lLCBub2RlLCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gXy5pbnZva2UoZWZmZWN0cywgZWZmZWN0TmFtZSwgbm9kZSwgb3B0cyk7XG59O1xuXG5pZiAoIXdpbmRvdy5DTVdOKSB3aW5kb3cuQ01XTiA9IHt9O1xuaWYgKCF3aW5kb3cuQ01XTi5tYWtlRWZmZWN0KSB3aW5kb3cuQ01XTi5tYWtlRWZmZWN0ID0gbWFrZUVmZmVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2luZGV4LmpzIiwiaW1wb3J0IGZpcmV3b3JrcyBmcm9tICcuL2ZpcmV3b3Jrcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBmaXJld29ya3Ncbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9lZmZlY3RzLmpzIiwiLy8gY29kZSB0YWtlbiBmcm9tIGh0dHA6Ly9jb2RlcGVuLmlvL2hhaWRhbmcvcGVuL2VCb3F5d1xuXG5jbGFzcyBGaXJld29ya3Mge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIG9wdHMpIHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0NBTlZBUycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gbm9kZS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgbGV0IHBhdCA9ICcjMDAwJztcblxuICAgICAgICBpZiAob3B0cy5iYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBsZXQgdEN0eCA9IHRlbXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAgICAgdGVtcENhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICAgICAgICAgICAgdEN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgb3B0cy5iYWNrZ3JvdW5kSW1hZ2UsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIG9wdHMuYmFja2dyb3VuZEltYWdlLm5hdHVyYWxXaWR0aCxcbiAgICAgICAgICAgICAgICBvcHRzLmJhY2tncm91bmRJbWFnZS5uYXR1cmFsSGVpZ2h0LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoLFxuICAgICAgICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBwYXQgPSBjdHguY3JlYXRlUGF0dGVybih0ZW1wQ2FudmFzLCAncmVwZWF0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0cy5iYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgICAgICAgIHBhdCA9IG9wdHMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzaXplXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IG5vZGUub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgY3R4LnJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXQ7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgICAgICAgLy8gaW5pdFxuICAgICAgICBjdHgucmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0O1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAvLyBvYmplY3RzXG4gICAgICAgIGxldCBsaXN0RmlyZSA9IFtdO1xuICAgICAgICBsZXQgbGlzdEZpcmV3b3JrID0gW107XG4gICAgICAgIGxldCBmaXJlTnVtYmVyID0gMTA7XG4gICAgICAgIGxldCBjZW50ZXIgPSB7IHg6IGNhbnZhcy53aWR0aCAvIDIsIHk6IGNhbnZhcy5oZWlnaHQgLyAyIH07XG4gICAgICAgIGxldCByYW5nZSA9IDEwMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJlTnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaXJlID0ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGgucmFuZG9tKCkgKiByYW5nZSAvIDIgLSByYW5nZSAvIDQgKyBjZW50ZXIueCxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnJhbmRvbSgpICogcmFuZ2UgKiAyICsgY2FudmFzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzaXplOiBNYXRoLnJhbmRvbSgpICsgNC41LFxuICAgICAgICAgICAgICAgIGZpbGw6ICcjZmQxJyxcbiAgICAgICAgICAgICAgICB2eDogTWF0aC5yYW5kb20oKSAtIDAuNSxcbiAgICAgICAgICAgICAgICB2eTogLShNYXRoLnJhbmRvbSgpICsgNCksXG4gICAgICAgICAgICAgICAgYXg6IE1hdGgucmFuZG9tKCkgKiAwLjAyIC0gMC4wMSxcbiAgICAgICAgICAgICAgICBmYXI6IE1hdGgucmFuZG9tKCkgKiByYW5nZSArIChjZW50ZXIueSAtIHJhbmdlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpcmUuYmFzZSA9IHtcbiAgICAgICAgICAgICAgICB4OiBmaXJlLngsXG4gICAgICAgICAgICAgICAgeTogZmlyZS55LFxuICAgICAgICAgICAgICAgIHZ4OiBmaXJlLnZ4XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsaXN0RmlyZS5wdXNoKGZpcmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb29wID0gdGhpcy5sb29wLmJpbmQodGhpcywgb3B0cywgcGF0LCBjYW52YXMsIGN0eCwgbGlzdEZpcmUsIGxpc3RGaXJld29yaywgZmlyZU51bWJlciwgcmFuZ2UpO1xuXG4gICAgICAgIHRoaXMubG9vcCgpO1xuXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIH1cblxuICAgIGxvb3Aob3B0cywgcGF0LCBjYW52YXMsIGN0eCwgbGlzdEZpcmUsIGxpc3RGaXJld29yaywgZmlyZU51bWJlciwgcmFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICAgICAgICB0aGlzLnVwZGF0ZShvcHRzLCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrLCBmaXJlTnVtYmVyLCByYW5nZSk7XG4gICAgICAgIHRoaXMuZHJhdyhvcHRzLCBwYXQsIGNhbnZhcywgY3R4LCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrKTtcbiAgICB9XG5cbiAgICByYW5kQ29sb3IoKSB7XG4gICAgICAgIGxldCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbiAgICAgICAgbGV0IGcgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgICAgICBsZXQgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG4gICAgICAgIHJldHVybiBgcmdiKCR7cn0sICR7Z30sICR7Yn0pYDtcbiAgICB9XG5cbiAgICB1cGRhdGUob3B0cywgbGlzdEZpcmUsIGxpc3RGaXJld29yaywgZmlyZU51bWJlciwgcmFuZ2UpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0RmlyZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmUgPSBsaXN0RmlyZVtpXTtcblxuICAgICAgICAgICAgaWYgKGZpcmUueSA8PSBmaXJlLmZhcikge1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgYWRkIGZpcmV3b3JrXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5yYW5kQ29sb3IoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZpcmVOdW1iZXIgKiA1OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcmV3b3JrID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZmlyZS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZmlyZS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogTWF0aC5yYW5kb20oKSArIDQuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgdng6IE1hdGgucmFuZG9tKCkgKiAxNSAtIDcuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5OiBNYXRoLnJhbmRvbSgpICogLTE1ICsgNC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXk6IDAuMDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHBoYTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZmU6IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHJhbmdlIC8gMikgKyByYW5nZSAvIDJcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZmlyZXdvcmsuYmFzZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZmU6IGZpcmV3b3JrLmxpZmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBmaXJld29yay5zaXplXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxpc3RGaXJld29yay5wdXNoKGZpcmV3b3JrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICBmaXJlLnkgPSBmaXJlLmJhc2UueTtcbiAgICAgICAgICAgICAgICBmaXJlLnggPSBmaXJlLmJhc2UueDtcbiAgICAgICAgICAgICAgICBmaXJlLnZ4ID0gZmlyZS5iYXNlLnZ4O1xuICAgICAgICAgICAgICAgIGZpcmUuYXggPSBNYXRoLnJhbmRvbSgpICogMC4wMiAtIDAuMDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcmUueCArPSBmaXJlLnZ4O1xuICAgICAgICAgICAgZmlyZS55ICs9IGZpcmUudnk7XG4gICAgICAgICAgICBmaXJlLnZ4ICs9IGZpcmUuYXg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gbGlzdEZpcmV3b3JrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgZmlyZXdvcmsgPSBsaXN0RmlyZXdvcmtbaV07XG4gICAgICAgICAgICBpZiAoZmlyZXdvcmspIHtcbiAgICAgICAgICAgICAgICBmaXJld29yay54ICs9IGZpcmV3b3JrLnZ4O1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLnkgKz0gZmlyZXdvcmsudnk7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsudnkgKz0gZmlyZXdvcmsuYXk7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsuYWxwaGEgPSBmaXJld29yay5saWZlIC8gZmlyZXdvcmsuYmFzZS5saWZlO1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLnNpemUgPSBmaXJld29yay5hbHBoYSAqIGZpcmV3b3JrLmJhc2Uuc2l6ZTtcbiAgICAgICAgICAgICAgICBmaXJld29yay5hbHBoYSA9IGZpcmV3b3JrLmFscGhhID4gMC42ID8gMSA6IGZpcmV3b3JrLmFscGhhO1xuXG4gICAgICAgICAgICAgICAgZmlyZXdvcmsubGlmZS0tO1xuICAgICAgICAgICAgICAgIGlmIChmaXJld29yay5saWZlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdEZpcmV3b3JrLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KG9wdHMsIHBhdCwgY2FudmFzLCBjdHgsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmspIHtcbiAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMTg7XG4gICAgICAgIGN0eC5yZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXQ7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgLy8gcmUtZHJhd1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NjcmVlbic7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdEZpcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaXJlID0gbGlzdEZpcmVbaV07XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKGZpcmUueCwgZmlyZS55LCBmaXJlLnNpemUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaXJlLmZpbGw7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0RmlyZXdvcmsubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaXJld29yayA9IGxpc3RGaXJld29ya1tpXTtcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IGZpcmV3b3JrLmFscGhhO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhmaXJld29yay54LCBmaXJld29yay55LCBmaXJld29yay5zaXplLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZmlyZXdvcmsuZmlsbDtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobm9kZSwgb3B0cykge1xuICAgIHJldHVybiBuZXcgRmlyZXdvcmtzKG5vZGUsIG9wdHMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2VmZmVjdHMvZmlyZXdvcmtzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnaGktdGhlcmUnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIaSB0aGVyZSE8YnIvPlxuICAgICAgICAgICAgICAgIEknbSBoZXJlIHRvPGJyLz5cbiAgICAgICAgICAgICAgICB0ZWFjaCB5b3UgYWJvdXQ8YnIvPlxuICAgICAgICAgICAgICAgIHNvcnRpbmcgd2FzdGUgYXQ8YnIvPlxuICAgICAgICAgICAgICAgIHlvdXIgc2Nob29sIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hpVGhlcmUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzYnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9oaV90aGVyZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgQ0hBUkFDVEVSID0gYCR7Q01XTi5NRURJQS5JTUFHRX1ncmVlbnRlYW1jaGFyYWMucG5nYDtcbmNvbnN0IEZSQU1FID0gYCR7Q01XTi5NRURJQS5GUkFNRX1mcmFtZS4wMS5wbmdgO1xuXG5sZXQgcmVuZGVyVk8gPSBmdW5jdGlvbiAob3B0cykge1xuICAgIGlmICghb3B0cy52bykgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5WT30ke29wdHMudm99Lm1wM2B9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCByZW5kZXJTRlggPSBmdW5jdGlvbiAob3B0cykge1xuICAgIGlmICghb3B0cy5zZngpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICByZWY9XCJzdGFydFwiXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfSR7b3B0cy5zZnh9Lm1wM2B9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCByZW5kZXJJbWFnZSA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgaWYgKG9wdHMucmVuZGVySW1hZ2UgPT09IGZhbHNlKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiY2hhcmFjdGVyXCIgc3JjPXtvcHRzLmltYWdlIHx8IENIQVJBQ1RFUn0gLz5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD17b3B0cy5pZH1cbiAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17b3B0cy5iYWNrZ3JvdW5kQXVkaW99XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2luZm8nLCBvcHRzLmNsYXNzTmFtZSl9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtyZW5kZXJWTyhvcHRzKX1cbiAgICAgICAgICAgIHtyZW5kZXJTRlgob3B0cyl9XG4gICAgICAgICAgICB7cmVuZGVySW1hZ2Uob3B0cyl9XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17RlJBTUV9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lXCI+XG4gICAgICAgICAgICAgICAge29wdHMuY29udGVudH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb2VudFxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtbXS5jb25jYXQob3B0cy5leHRyYXMgfHwgW10pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2luZm9fc2NyZWVuX2NvbXBvbmVudC5qcyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmltcG9ydCBpdGVtc1JlY3ljbGUgZnJvbSAnLi9pdGVtc19yZWN5Y2xlJztcblxudmFyIGF1ZGlvUmVmcyA9IF8udW5pcShfLm1hcChpdGVtc1JlY3ljbGUsIHYgPT5cbiAgICBfLnVwcGVyRmlyc3QoXy5jYW1lbENhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSkpXG4pO1xuXG52YXIgYXJyYXlPZkF1ZGlvID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT5cbiAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9e3Z9XG4gICAgICAgIGtleT17a31cbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYH1cbiAgICAgICAgY29tcGxldGVcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2tleS1pcy1zb3J0aW5nJyxcbiAgICAgICAgY2xhc3NOYW1lOiAncmlnaHQnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUaGUga2V5IGlzIFNPUlRJTkchPGJyLz5cbiAgICAgICAgICAgICAgICBUaGVyZSBhcmUgNSBXQVlTPGJyLz5cbiAgICAgICAgICAgICAgICB5b3UgY2FuIHNvcnQ8YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBmb29kIHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBhdCB5b3VyIHNjaG9vbC4uLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1RoZUtleScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNicsXG4gICAgICAgIGV4dHJhczogYXJyYXlPZkF1ZGlvLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4uanMiLCJsZXQgYmluID0gJ3JlY3ljbGUnO1xubGV0IG5hbWVzID0gW1xuICAgICdhbHVtaW51bS1mb2lsJyxcbiAgICAnQWx1bWludW0tZm9vZC1jYW4tMScsXG4gICAgJ0FsdW1pbnVtLWZvb2QtY2FuLTInLFxuICAgICdBbHVtaW51bS1mb29kLWNhbi0zJyxcbiAgICAnYWx1bWludW0tZm9vZC1jYW4tNScsXG4gICAgJ2FsdW1pbnVtLXBhbicsXG4gICAgJ2JhZ2VsLXBhY2thZ2UnLFxuICAgICdjYXJkYm9hcmQtYm94JyxcbiAgICAnZW1wdHktYWx1bWludW0tY2FuLTEnLFxuICAgICdlbXB0eS1hbHVtaW51bS1jYW4tMicsXG4gICAgJ2VtcHR5LWFsdW1pbnVtLWNhbi0zJyxcbiAgICAnZW1wdHktYWx1bWludW0tY2FuLTQnLFxuICAgICdib3gtb2YtY29va2llcy0zJyxcbiAgICAnZW1wdHktY2hvY29sYXRlLW1pbGstY2FydG9uLTInLFxuICAgICdlbXB0eS1jaG9jb2xhdGUtbWlsay1jYXJ0b24tNCcsXG4gICAgJ2VtcHR5LWNob2NvbGF0ZS1taWxrLWNhcnRvbi01JyxcbiAgICAnZW1wdHktY2hvY29sYXRlLW1pbGstY2FydG9uLTYnLFxuICAgICdlbXB0eS1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICdlbXB0eS1jb29raWUtYm94LTEnLFxuICAgICdlbXB0eS1jb29raWUtYm94LTInLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi0xMicsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTEzJyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tMTQnLFxuICAgICdlbXB0eS1wbGFzdGljLWJvdHRsZS0xJyxcbiAgICAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMicsXG4gICAgJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTMnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTInLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTMnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTUnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTYnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTcnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTgnLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTknLFxuICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTEwJyxcbiAgICAnb3JhbmdlLXNvZGEtY2FuJyxcbiAgICAncGFwZXItZm9sZGVyJyxcbiAgICAncGFwZXItcGFja2FnaW5nLTEnLFxuICAgICdwYXBlci1wYWNrYWdpbmctOCcsXG4gICAgJ3BhcGVyLXBhY2thZ2luZycsXG4gICAgJ3BsYXN0aWMtY3VwLTEnLFxuICAgICdwbGFzdGljLWN1cC0yJyxcbiAgICAncGxhc3RpYy1jdXAtMycsXG4gICAgJ3BsYXN0aWMtY3VwLTQnLFxuICAgICdwbGFzdGljLWN1cC01JyxcbiAgICAncGxhc3RpYy1jdXAtNicsXG4gICAgJ3BsYXN0aWMtY3VwLTcnLFxuICAgICdwbGFzdGljLWxpZHMtMScsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTInLFxuICAgICdwbGFzdGljLXBhY2thZ2luZy00JyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctNScsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTYnLFxuICAgICdwbGFzdGljLXBhY2thZ2luZy03JyxcbiAgICAnd3JhcHBpbmctcGFwZXInLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfcmVjeWNsZS5qcyIsImltcG9ydCBpdGVtTGFuZGZpbGwgZnJvbSAnLi9pdGVtc19sYW5kZmlsbCc7XG5cbmxldCBiaW5OYW1lcyA9IFtcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnbGlxdWlkcycsXG4gICAgJ2NvbXBvc3QnLFxuICAgICdmb29kLXNoYXJlJyxcbl07XG5cbmxldCByZXZlYWxDb250ZW50ID0ge1xuICAgIHJlY3ljbGU6IChcbiAgICAgICAgPHA+XG4gICAgICAgICAgICBSRUNZQ0xJTkcgaXRlbXMgYXJlIHRob3NlPGJyLz5cbiAgICAgICAgICAgIHRoYXQgY2FuIGJlIHJlcHJvY2Vzc2VkIGFuZDxici8+XG4gICAgICAgICAgICBtYWRlIGludG8gbmV3IHByb2R1Y3RzLjxici8+XG4gICAgICAgICAgICBQYXBlciwgbWV0YWwsIGFuZCBwbGFzdGljIGFyZTxici8+XG4gICAgICAgICAgICBjb21tb24gcmVjeWNsYWJsZSBtYXRlcmlhbHMuXG4gICAgICAgIDwvcD5cbiAgICApLFxuICAgIGxhbmRmaWxsOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgTEFOREZJTEwgaXRlbXMgYXJlIHRoaW5ncyB0aGF0PGJyLz5cbiAgICAgICAgICAgIGp1c3QgY2FuJ3QgYmUgcmV1c2VkIGluIGFueSB3YXkuPGJyLz5cbiAgICAgICAgICAgIFB1dCB5b3VyIHRoaW5raW5nIGNhcCBvbiE8YnIvPlxuICAgICAgICAgICAgTG9vayBmb3Igd2F5cyB0byBtYWtlPGJyLz5cbiAgICAgICAgICAgIGRpZmZlcmVudCBjaG9pY2VzIHRoYXQ8YnIvPlxuICAgICAgICAgICAgcmVkdWNlIGxhbmRmaWxsIHdhc3RlLlxuICAgICAgICA8L3A+XG4gICAgKSxcbiAgICBsaXF1aWRzOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgTElRVUlEUyBtdXN0IGJlIHNlcGFyYXRlZDxici8+XG4gICAgICAgICAgICBmcm9tIHRoZWlyIGNvbnRhaW5lcnMhPGJyLz5cbiAgICAgICAgICAgIFRoaXMgYWxsb3dzIGZvciB0aGUgY29udGFpbmVyczxici8+XG4gICAgICAgICAgICB0byBiZSBwcm9wZXJseSBwcm9jZXNzZWQuPGJyLz5cbiAgICAgICAgICAgIEdldCBwb3VyaW5nIVxuICAgICAgICA8L3A+XG4gICAgKSxcbiAgICBjb21wb3N0OiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgQ09NUE9TVElORyBpczxici8+XG4gICAgICAgICAgICBmZXJ0aWxpemVyIGluIHRoZSBtYWtpbmchPGJyLz5cbiAgICAgICAgICAgIEl0J3MgbWFkZSBmcm9tIGZvb2Qgc2NyYXBzPGJyLz5cbiAgICAgICAgICAgIGFuZCBvcmdhbmljIG1hdGVyaWFsczxici8+XG4gICAgICAgICAgICB0aGF0IGRlY2F5IGFuZCBiZWNvbWU8YnIvPlxuICAgICAgICAgICAgZm9vZCBmb3IgcGxhbnRzIVxuICAgICAgICA8L3A+XG4gICAgKSxcbiAgICAnZm9vZC1zaGFyZSc6IChcbiAgICAgICAgPHA+XG4gICAgICAgICAgICBGT09EIFNIQVJJTkcgaXM8YnIvPlxuICAgICAgICAgICAgYSBncmVhdCB3YXkgdG8ga2VlcDxici8+XG4gICAgICAgICAgICBmcm9tIHdhc3RpbmcgZm9vZCE8YnIvPlxuICAgICAgICAgICAgTGVhdmUgaXRlbXMgdGhhdCBvdGhlcnM8YnIvPlxuICAgICAgICAgICAgY2FuIG1ha2UgaW50byBhIHNuYWNrIVxuICAgICAgICA8L3A+XG4gICAgKSxcbn07XG5cbmxldCByZXZlYWxWT3MgPSB7XG4gICAgcmVjeWNsZTogJ1JlY3ljbGluZ01hdGVyaWFscycsXG4gICAgbGFuZGZpbGw6ICdUaGlua2luZ0NhcCcsXG4gICAgbGlxdWlkczogJ0dldFBvdXJpbmcnLFxuICAgIGNvbXBvc3Q6ICdDb21wb3N0aW5nRXhwbGFpbicsXG4gICAgJ2Zvb2Qtc2hhcmUnOiAnRm9vZFNoYXJpbmdFeHBsYWluJyxcbn07XG5cbmxldCBiaW5Db21wb25lbnRzID0gXy5tYXAoYmluTmFtZXMsIGJpbiA9PlxuICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT17YmlufSBtZXNzYWdlPXtiaW59IC8+XG4pO1xuXG5sZXQgcmV2ZWFsTGlzdCA9IF8ubWFwKHJldmVhbENvbnRlbnQsIChjb250ZW50LCByZWYpID0+XG4gICAgPHNrb2FzaC5Db21wb25lbnQgcmVmPXtyZWZ9PlxuICAgICAgICB7Y29udGVudH1cbiAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4pO1xuXG5sZXQgbWVkaWFDb2xsZWN0aW9uTGlzdCA9IF8ubWFwKHJldmVhbFZPcywgKGNvbnRlbnQsIHJlZikgPT5cbiAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJ2b2ljZU92ZXJcIiByZWY9e3JlZn0gc3JjPXtgJHtDTVdOLk1FRElBLlZPICsgY29udGVudH0ubXAzYH0gLz5cbik7XG5cbmxldCBpbWFnZVNyY3MgPSBbXG4gICAgYCR7Q01XTi5NRURJQS5JTUFHRX1saWdodHMucG5nYCxcbiAgICBgJHtDTVdOLk1FRElBLlNQUklURX1zcHJpdGUuYmlucy5wbmdgLFxuICAgIGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5idG4ucG5nYCxcbl07XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbUxhbmRmaWxsLCB2ID0+XG4gICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpKVxuKTtcblxubGV0IGFycmF5T2ZBdWRpbyA9IF8ubWFwKGF1ZGlvUmVmcywgKHYsIGspID0+XG4gICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgcmVmPXt2fVxuICAgICAgICBrZXk9e2t9XG4gICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5HQU1FICsgJ3NvdW5kLWFzc2V0cy9fdm9zaXRlbXMvJyArIHZ9Lm1wM2B9XG4gICAgICAgIGNvbXBsZXRlXG4gICAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwibGlnaHRzXCJcbiAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz1cIkJLRzZcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLlJlcGVhdGVyXG4gICAgICAgICAgICAgICAgYW1vdW50PXtpbWFnZVNyY3MubGVuZ3RofVxuICAgICAgICAgICAgICAgIGl0ZW09ezxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgLz59XG4gICAgICAgICAgICAgICAgcHJvcHM9e2ltYWdlU3Jjc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpZ2h0c1wiXG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiaW5zXCJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7c2tvYXNoLm1peGlucy5TZWxlY3RhYmxlUmV2ZWFsKHByb3BzLCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0YWJsZXM6IGJpbkNvbXBvbmVudHMsXG4gICAgICAgICAgICAgICAgcmV2ZWFsczogcmV2ZWFsTGlzdCxcbiAgICAgICAgICAgICAgICBtZWRpYTogbWVkaWFDb2xsZWN0aW9uTGlzdCxcbiAgICAgICAgICAgICAgICBTZWxlY3RhYmxlUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6ICdISUdITElHSFRFRCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgIHBsYXk9e18uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLnRhcmdldCcpICYmICdjbGljayd9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImNsaWNrXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1DbGlja1JlY0J1dHRvbi5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SW5mb0ZyYW1lTW92ZTEubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFDb2xsZWN0aW9uPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb2VudFxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtbXS5jb25jYXQoYXJyYXlPZkF1ZGlvIHx8IFtdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9saWdodHNfc2NyZWVuLmpzIiwibGV0IGJpbiA9ICdsYW5kZmlsbCc7XG5sZXQgbmFtZXMgPSBbXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtMScsXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtMicsXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtMycsXG4gICAgJ2FwcGxlc2F1Y2UtcG91Y2gtNCcsXG4gICAgJ2JhZy1vZi13cmFwcGVycycsXG4gICAgJ2J1YmJsZS13cmFwJyxcbiAgICAnYnVycml0by13cmFwcGVyLTEnLFxuICAgICdidXJyaXRvLXdyYXBwZXItMicsXG4gICAgJ2J1cnJpdG8td3JhcHBlci0zJyxcbiAgICAnYnVycml0by13cmFwcGVyLTQnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItMScsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci0yJyxcbiAgICAnY2VyZWFsLWxpZC13cmFwcGVyLTMnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItNCcsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci01JyxcbiAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICdlbXB0eS1jaGlwLWJhZycsXG4gICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlci0xJyxcbiAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyLTInLFxuICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXItMycsXG4gICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlci00JyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0xJyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0yJyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy0zJyxcbiAgICAnRW1wdHktZnJ1aXQtanVpY2UtcGxhc3RpYy00JyxcbiAgICAnZW1wdHktbGVtb25hZGUtYm94LTUnLFxuICAgICdlbXB0eS1sZW1vbmFkZS1ib3gnLFxuICAgICdlbXB0eS1wb3RhdG8tY2hpcC1iYWctMicsXG4gICAgJ2VtcHR5LXBvdGF0by1jaGlwLWJhZy0zJyxcbiAgICAnZW1wdHktcG90YXRvLWNoaXAtYmFnJyxcbiAgICAnZW5lcmd5LWJhci13cmFwcGVyLTInLFxuICAgICdlbmVyZ3ktYmFyLXdyYXBwZXInLFxuICAgICdmcnVpdC1kcmluay1lbXB0eS1wb3VjaCcsXG4gICAgJ2ZydWl0LXNuYWNrLXdyYXBwZXItMicsXG4gICAgJ2ZydWl0LXNuYWNrLXdyYXBwZXItMycsXG4gICAgJ2dpZnQtcmliYm9ucycsXG4gICAgJ2dyYWhhbS1jb29raWUtd3JhcHBlci0xJyxcbiAgICAnZ3JhaGFtLWNvb2tpZS13cmFwcGVyJyxcbiAgICAncGFwZXItanVpY2UtYm94LTEnLFxuICAgICdwYXBlci1qdWljZS1ib3gtMicsXG4gICAgJ3BhcGVyLWp1aWNlLWJveC0zJyxcbiAgICAncGxhc3RpYyBmb3JrJyxcbiAgICAncGxhc3RpYy1iYWdnaWUtMicsXG4gICAgJ3BsYXN0aWMtYmFnZ2llJyxcbiAgICAncGxhc3RpYy1rbmlmZScsXG4gICAgJ3BsYXN0aWMtc3Bvb24nLFxuICAgICdwbGFzdGljLXN0cmF3cycsXG4gICAgJ3JlZC1naWZ0LWJvdycsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItMScsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItMicsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItMycsXG4gICAgJ3N0eXJvZm9hbS1jb250YWluZXItNScsXG4gICAgJ3N0eXJvZm9hbS1zb3VwLWN1cCcsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19sYW5kZmlsbC5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuXG52YXIgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zQ29tcG9zdCwgdiA9PlxuICAgIF8udXBwZXJGaXJzdChfLmNhbWVsQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKSlcbik7XG5cbnZhciBhcnJheU9mQXVkaW8gPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PlxuICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgIHJlZj17dn1cbiAgICAgICAga2V5PXtrfVxuICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgfVxuICAgICAgICBjb21wbGV0ZVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZml2ZS13YXlzJyxcbiAgICAgICAgY2xhc3NOYW1lOiAncmlnaHQnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXaXRoIDUgd2F5czxici8+XG4gICAgICAgICAgICAgICAgdG8gc29ydCBsZXQncyB0ZXN0PGJyLz5cbiAgICAgICAgICAgICAgICB5b3VyIGtub3dsZWRnZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICc1V2F5cycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNicsXG4gICAgICAgIGV4dHJhczogYXJyYXlPZkF1ZGlvLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9maXZlX3dheXNfc2NyZWVuLmpzIiwibGV0IGJpbiA9ICdjb21wb3N0JztcbmxldCBuYW1lcyA9IFtcbiAgICAnYXBwbGUtY29yZScsXG4gICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAnY2Fycm90LXN0aWNrcycsXG4gICAgJ2NlbGVyeS1zdGljaycsXG4gICAgJ2NoaWNrZW4tbGVnJyxcbiAgICAnY29mZmVlLWN1cC0yJyxcbiAgICAnY29mZmVlLWN1cCcsXG4gICAgJ2NvZmZlZS1ncm91bmRzJyxcbiAgICAnZGlydHktcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTEnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTMnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTQnLFxuICAgICdmb29kLXNvaWxlZC1wYXBlciBwbGF0ZScsXG4gICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgJ29yYW5nZS1zbGljZScsXG4gICAgJ3BlbmNpbC1zaGF2aW5ncy0xJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzLTInLFxuICAgICdwZW5jaWwtc2hhdmluZ3MtMycsXG4gICAgJ3BlbmNpbC1zaGF2aW5ncycsXG4gICAgJ3BpenphLWNydXN0JyxcbiAgICAndGVhYmFnJyxcbiAgICAndW51c2VkLXBhcGVyLXRyYXktMScsXG4gICAgJ3VudXNlZC1wYXBlci10cmF5LTInLFxuICAgICd1bnVzZWQtcGFwZXItdHJheS0zJyxcbiAgICAndW51c2VkLXBhcGVyLXRyYXktNCcsXG4gICAgJ3VzZWQtbmFwa2lucycsXG4gICAgJ3VzZWQtcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICd1c2VkLXBhcGVyLXNhbmR3aWNoLXdyYXBwZXItMScsXG4gICAgJ3VzZWQtcGFwZXItc2FuZHdpY2gtd3JhcHBlci0yJyxcbiAgICAndXNlZC1wYXBlci1zYW5kd2ljaC13cmFwcGVyLTQnLFxuICAgICd1c2VkLXRha2VvdXQtY29udGFpbmVycycsXG4gICAgJ3VzZWQtd2hpdGUtbmFwa2luJyxcbiAgICAnd2hpdGUtcGFwZXItdG93ZWwtc2hlZXQnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfY29tcG9zdC5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5sZXQgbGV2ZWxLZXlzID0gW1xuICAgICdyZWN5Y2xpbmdDaGFtcGlvbicsXG4gICAgJ3ByaWNlbGVzc1BvdXJlcicsXG4gICAgJ2ZhbnRhc3RpY0Zvb2RTaGFyZXInLFxuICAgICdkeW5hbWljRGl2ZXJ0ZXInLFxuICAgICdtYXN0ZXJTb3J0ZXInLFxuXTtcblxubGV0IGxldmVsTmFtZXMgPSBbXG4gICAgPHA+UmVjeWNsaW5nPGJyLz5DaGFtcGlvbjwvcD4sXG4gICAgPHA+UHJpY2VsZXNzPGJyLz5Qb3VyZXI8L3A+LFxuICAgIDxwPkZhbnRhc3RpYzxici8+Rm9vZCBTaGFyZXI8L3A+LFxuICAgIDxwPkR5bmFtaWM8YnIvPkRpdmVydGVyPC9wPixcbiAgICA8cD5NYXN0ZXI8YnIvPlNvcnRlcjwvcD4sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobGV2ZWxOdW1iZXIpIHtcbiAgICBsZXQgbGV2ZWxJbnQgPSBfLmZsb29yKGxldmVsTnVtYmVyKTtcbiAgICBsZXQgbGV2ZWxLZXkgPSBsZXZlbEtleXNbbGV2ZWxJbnQgLSAxXTtcbiAgICBsZXQgbGV2ZWxOYW1lID0gbGV2ZWxOYW1lc1tsZXZlbEludCAtIDFdO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgICAgICBsZXQgbGV2ZWxEYXRhID0gXy5nZXQocHJvcHMsIGBnYW1lU3RhdGUuZGF0YS4ke2xldmVsS2V5fS5sZXZlbHNgLCB7fSk7XG4gICAgICAgIGxldCByZXBlYXRlclByb3BzID0gXy5tYXAoXy5nZXQocHJvcHMsICdkYXRhLmVhcm5lZCcpLCAobGV2ZWwsIGluZGV4KSA9PlxuICAgICAgICAgICAgKHtjbGFzc05hbWU6IGxldmVsLnBsYXlpbmcgJiYgXy5nZXQobGV2ZWxEYXRhLCBgJHtpbmRleH0uY29tcGxldGVgKSA/ICdlYXJuZWQnIDogJyd9KVxuICAgICAgICApO1xuICAgICAgICBsZXQgYWxsRWFybmVkID0gcmVwZWF0ZXJQcm9wcy5sZW5ndGggPT09IDUgJiYgXy5ldmVyeShyZXBlYXRlclByb3BzLCB2ID0+IHYuY2xhc3NOYW1lKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2BwcmUtbGV2ZWwtJHtsZXZlbE51bWJlcn1gfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7bGV2ZWxJbnR9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0cy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgQUxMX0VBUk5FRDogYWxsRWFybmVkLFxuICAgICAgICAgICAgICAgICAgICBBUFBFQVI6IF8uZ2V0KHByb3BzLCAnZGF0YS5hcHBlYXIucGxheWluZycpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJhcHBlYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxBcHBlYXIubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxDb21wbGV0ZS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF0uY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICAgICAgXy5tYXAobGV2ZWxEYXRhLCAoZGF0YSwgbGV2ZWwpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5VGFyZ2V0PXtbJ2Vhcm5lZCcsIGxldmVsXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9R2V0U3Rhci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU9e2RhdGEuY29tcGxldGUgPyAxIDogMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9cHVycGxlLnJpYmJvbi5wbmdgfSAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWx1Z2dhZ2UucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9ZmxpcHMucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlJlcGVhdGVyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YXJzXCJcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXs1fVxuICAgICAgICAgICAgICAgICAgICBwcm9wcz17cmVwZWF0ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPkxldmVsIHtsZXZlbEludH08L2gzPlxuICAgICAgICAgICAgICAgICAgICB7bGV2ZWxOYW1lfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xldmVsX3NjcmVlbl9jb21wb25lbnQuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdyZWN5Y2xpbmctY2hhbXBpb24tb25lLWluZm8nLFxuICAgICAgICBjbGFzc05hbWU6ICdzbWFsbCcsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIExldCdzIHN0YXJ0IHdpdGggc2ltcGxlIHNvcnRpbmc8YnIvPlxuICAgICAgICAgICAgICAgIG9mIFJlY3ljbGFibGVzLCBDb21wb3N0YWJsZXM8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCBMYW5kZmlsbCBpdGVtcy48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgUHVzaCB0aGUgY29ycmVjdCBidXR0b24gdG8gbGFuZDxici8+XG4gICAgICAgICAgICAgICAgaXRlbXMgaW4gdGhlIGJpbiB0aGV5IGJlbG9uZyB0by5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdMZXRzU3RhcnQnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBzY29yZVRvV2luOiA2NjUsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQnO1xuaW1wb3J0IE1hbnVhbERyb3BwZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xJztcblxuY29uc3QgUFRTID0gJ3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIGlmIChNYXRoLmFicyhwcm9wcy5nYW1lU3RhdGUuY3VycmVudFNjcmVlbkluZGV4IC0gcGFyc2VJbnQoa2V5LCAxMCkpID4gMikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake29wdHMuZ2FtZU5hbWV9LSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7b3B0cy5nYW1lTnVtYmVyfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzY3JlZW5Qcm9wcztcbiAgICAgICAgbGV0IHRpbWVyUHJvcHM7XG4gICAgICAgIGxldCByZXZlYWxQcm9wcztcbiAgICAgICAgbGV0IHNlbGVjdGFibGVQcm9wcztcbiAgICAgICAgbGV0IGRyb3BwZXJQcm9wcztcbiAgICAgICAgbGV0IGNhdGNoZXJQcm9wcztcbiAgICAgICAgbGV0IGxpZmVQcm9wcztcbiAgICAgICAgbGV0IGV4dHJhQ29tcG9uZW50cztcblxuICAgICAgICBjb25zdCBMRVZFTF9QQVRIID0gYGdhbWVTdGF0ZS5kYXRhLiR7Xy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSl9LmxldmVscy4ke29wdHMubGV2ZWx9YDtcblxuICAgICAgICBsZXQgY2F0Y2hhYmxlc0FycmF5ID0gb3B0cy5nZXRDYXRjaGFibGVzQXJyYXkoKTtcblxuICAgICAgICBsZXQgYmluQ29tcG9uZW50cyA9IF8ubWFwKG9wdHMuYmluTmFtZXMsIG5hbWUgPT5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT17bmFtZX0gbWVzc2FnZT17bmFtZX0gLz5cbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgc2NhbGUgPSBfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5zY2FsZScsIDEpO1xuICAgICAgICBsZXQgc3RhcnQgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc3RhcnRgLCBmYWxzZSk7XG4gICAgICAgIGxldCBnYW1lQ29tcGxldGUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uY29tcGxldGVgLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLmRyb3AnLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wQ2xhc3MgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuZHJvcENsYXNzJyk7XG4gICAgICAgIGxldCBwaWNrVXAgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIucGlja1VwJywgZmFsc2UpO1xuICAgICAgICBsZXQgb25QaWNrVXAgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIub25QaWNrVXAnKTtcbiAgICAgICAgbGV0IHNlbGVjdEl0ZW0gPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuc2VsZWN0SXRlbScpO1xuICAgICAgICBsZXQgY2F0Y2hhYmxlUmVmcyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5yZWZzJywgW10pO1xuICAgICAgICBsZXQgaXRlbVJlZiA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnJlZicpO1xuICAgICAgICBsZXQgcmVtb3ZlSXRlbUNsYXNzTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnJlbW92ZUNsYXNzTmFtZScpO1xuICAgICAgICBsZXQgaXRlbVRvcCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnRvcCcsIDApIC8gc2NhbGU7XG4gICAgICAgIGxldCBpdGVtTGVmdCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLmxlZnQnLCAwKSAvIHNjYWxlIHx8ICdhdXRvJztcbiAgICAgICAgbGV0IGNhdWdodCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5jYXRjaGVyLmNhdWdodCcsICcnKTtcbiAgICAgICAgbGV0IHJldmVhbE9wZW4gPSBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSk7XG4gICAgICAgIGxldCByZXZlYWxDbG9zZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSk7XG4gICAgICAgIGxldCBwbGF5ID0gXy5nZXQocHJvcHMsICdkYXRhLnBsYXknLCBudWxsKTtcblxuICAgICAgICBsZXQgYXVkaW9BcnJheSA9IG9wdHMuZ2V0QXVkaW9BcnJheSgpO1xuXG4gICAgICAgIGlmIChpdGVtUmVmKSBjYXRjaGFibGVSZWZzID0gW2l0ZW1SZWZdO1xuXG4gICAgICAgIG9wdHMubmV4dCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5uZXh0JywgZmFsc2UpO1xuICAgICAgICBvcHRzLml0ZW1SZWYgPSBpdGVtUmVmO1xuICAgICAgICBvcHRzLml0ZW1OYW1lID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ubmFtZScsICcnKTtcbiAgICAgICAgb3B0cy5pdGVtTmV3ID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ubmV3JywgZmFsc2UpO1xuICAgICAgICBvcHRzLml0ZW1DbGFzc05hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5jbGFzc05hbWUnKTtcbiAgICAgICAgb3B0cy5pdGVtQW1vdW50ID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0uYW1vdW50JywgMCk7XG4gICAgICAgIG9wdHMucG91ciA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnBvdXInLCBmYWxzZSk7XG4gICAgICAgIG9wdHMuc2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaWdoU2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uaGlnaFNjb3JlYCwgMCk7XG4gICAgICAgIG9wdHMubGVmdCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5sZWZ0JywgMCk7XG4gICAgICAgIG9wdHMuaGl0cyA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaXRzYCwgMCk7XG4gICAgICAgIG9wdHMudHJ1Y2tDbGFzc05hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEudHJ1Y2tDbGFzc05hbWUnLCAnJyk7XG4gICAgICAgIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UgPSBfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS5tZXNzYWdlJywgJycpO1xuICAgICAgICBvcHRzLm1vdmVDbGF3ID0gXy5nZXQocHJvcHMsICdkYXRhLm1vdmVDbGF3JywgZmFsc2UpO1xuICAgICAgICBvcHRzLnBsYXlBdWRpbyA9IChcbiAgICAgICAgICAgIHBsYXkgPyBwbGF5IDpcbiAgICAgICAgICAgIGRyb3AgJiYgIW9wdHMudHJ1Y2tDbGFzc05hbWUgPyAnZHJvcCcgOlxuICAgICAgICAgICAgcGlja1VwID8gJ3BpY2tVcCcgOlxuICAgICAgICAgICAgb3B0cy5uZXh0ID8gJ25leHQnIDpcbiAgICAgICAgICAgIG9wdHMucG91ciA/ICdwb3VyJyA6XG4gICAgICAgICAgICBvcHRzLm5leHQgPyAnY29ycmVjdCcgOlxuICAgICAgICAgICAgcmV2ZWFsT3BlbiA9PT0gJ3Jlc29ydCcgPyAncmVzb3J0JyA6XG4gICAgICAgICAgICBvcHRzLml0ZW1OZXcgPyBfLnVwcGVyRmlyc3QoXy5jYW1lbENhc2Uob3B0cy5pdGVtTmFtZSkpIDpcbiAgICAgICAgICAgIGRyb3BDbGFzcyA9PT0gJ1RSQVktU1RBQ0tJTkcnICYmIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ3RyYXknKSA/ICd0cmF5JyA6XG4gICAgICAgICAgICBvcHRzLml0ZW1OYW1lID8gJ3NlbGVjdCcgOiBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgc2NyZWVuUHJvcHMgPSBvcHRzLmdldFNjcmVlblByb3BzKG9wdHMpO1xuICAgICAgICB0aW1lclByb3BzID0gb3B0cy5nZXRUaW1lclByb3BzKG9wdHMpO1xuICAgICAgICByZXZlYWxQcm9wcyA9IG9wdHMuZ2V0UmV2ZWFsUHJvcHMob3B0cyk7XG4gICAgICAgIHNlbGVjdGFibGVQcm9wcyA9IG9wdHMuZ2V0U2VsZWN0YWJsZVByb3BzKG9wdHMpO1xuICAgICAgICBkcm9wcGVyUHJvcHMgPSBvcHRzLmdldERyb3BwZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgY2F0Y2hlclByb3BzID0gb3B0cy5nZXRDYXRjaGVyUHJvcHMob3B0cyk7XG4gICAgICAgIGxpZmVQcm9wcyA9IG9wdHMuZ2V0TGlmZVByb3BzKG9wdHMpO1xuICAgICAgICBleHRyYUNvbXBvbmVudHMgPSBvcHRzLmdldEV4dHJhQ29tcG9uZW50cyhvcHRzKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake29wdHMuZ2FtZU5hbWV9LSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17IWdhbWVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke29wdHMuZ2FtZU51bWJlcn1gfVxuICAgICAgICAgICAgICAgIHsuLi5zY3JlZW5Qcm9wc31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsZXZlbC1zY29yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtvcHRzLnNjb3JlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtQVFN9XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLlNjb3JlPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlRpbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudERvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD1cIm1tOnNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ9e29wdHMudGltZW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXVzZT17cmV2ZWFsT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZT17IXJldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0YXJ0PXtzdGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aW1lclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2l0ZW0tbmFtZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFDVElWRTogb3B0cy5pdGVtTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGl0ZW1Ub3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBpdGVtTGVmdCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0cy5pdGVtTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpZmVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9ezB9XG4gICAgICAgICAgICAgICAgICAgIGluY29ycmVjdD17b3B0cy5tYXhIaXRzfVxuICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtvcHRzLmhpdHN9XG4gICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGlmZVByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPE1hbnVhbERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ9e29wdHMuZHJvcHBlckFtb3VudH1cbiAgICAgICAgICAgICAgICAgICAgZHJvcD17ZHJvcH1cbiAgICAgICAgICAgICAgICAgICAgcGlja1VwPXtwaWNrVXB9XG4gICAgICAgICAgICAgICAgICAgIG9uUGlja1VwPXtvblBpY2tVcH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dD17b3B0cy5uZXh0fVxuICAgICAgICAgICAgICAgICAgICBiaW49e1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5SYW5kb21pemVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluPXtjYXRjaGFibGVzQXJyYXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7b3B0cy5sZWZ0fXB4KWBcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2F1Z2h0PXtjYXVnaHR9XG4gICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzcz17ZHJvcENsYXNzfVxuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmPXtpdGVtUmVmfVxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3NOYW1lPXtvcHRzLml0ZW1DbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW1DbGFzc05hbWU9e3JlbW92ZUl0ZW1DbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEl0ZW09e3NlbGVjdEl0ZW19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5kcm9wcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2JpbnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBESVNBQkxFRDogIW9wdHMuaXRlbU5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2F0Y2hlclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0PXtzdGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Y2tldD17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoYWJsZVJlZnM9e2NhdGNoYWJsZVJlZnN9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXVzZT17Y2F1Z2h0IHx8ICFzdGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZT17ZHJvcCB8fCBpdGVtUmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZUZyYWN0aW9uPXtvcHRzLmNvbGxpZGVGcmFjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5jYXRjaGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdGFibGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q9e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIHtleHRyYUNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5SZXZlYWxcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgICAgIG9wZW5SZXZlYWw9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUmV2ZWFsPXtyZXZlYWxDbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ucmV2ZWFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmVzb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBwbGF5PXtvcHRzLnBsYXlBdWRpb31cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW49e2F1ZGlvQXJyYXl9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25QbGF5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3BsYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHJvcHBlcl9nYW1lX2NvbXBvbmVudC5qcyIsImltcG9ydCBDYXRjaCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEnO1xuXG5jbGFzcyBDYXRjaGVyIGV4dGVuZHMgQ2F0Y2gge1xuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgc2tvYXNoLkNvbXBvbmVudC5wcm90b3R5cGUuYm9vdHN0cmFwLmNhbGwodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuYnVja2V0Tm9kZXMgPSBfLnJlZHVjZSh0aGlzLnJlZnMsIChhLCB2LCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoay5pbmRleE9mKCdidWNrZXRzLScpKSByZXR1cm4gYTtcbiAgICAgICAgICAgIGFba10gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh2KTtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgICAgICAgdmFyIHpvb20gPSBzdGF0ZS5zY2FsZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NvbGxpc2lvbnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkIHx8ICF0aGlzLnN0YXRlLmNhbkNhdGNoKSByZXR1cm47XG4gICAgICAgIF8uZWFjaCh0aGlzLmJ1Y2tldE5vZGVzLCAoYnVja2V0Tm9kZSwgYnVja2V0UmVmS2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgYnVja2V0UmVjdCA9IGJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5wcm9wcy5jYXRjaGFibGVSZWZzLCBjYXRjaGFibGVSZWYgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2F0Y2hhYmxlUmVmLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGluZyhidWNrZXRSZWN0LCBjYXRjaGFibGVSZWYuRE9NTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDYXRjaGFibGUodGhpcy5yZWZzW2J1Y2tldFJlZktleV0sIGNhdGNoYWJsZVJlZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5jaGVja0NvbGxpc2lvbnMpO1xuICAgIH1cblxuICAgIGlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIGNhdGNoUmVjdCkge1xuICAgICAgICB2YXIgeENlbnRlciA9IGNhdGNoUmVjdC5sZWZ0ICsgKGNhdGNoUmVjdC5yaWdodCAtIGNhdGNoUmVjdC5sZWZ0KSAvIDI7XG4gICAgICAgIHZhciB5T2Zmc2V0ID0gKGJ1Y2tldFJlY3QuYm90dG9tIC0gYnVja2V0UmVjdC50b3ApICogdGhpcy5wcm9wcy5jb2xsaWRlRnJhY3Rpb247XG4gICAgICAgIHJldHVybiAoYnVja2V0UmVjdC50b3AgLSB5T2Zmc2V0IDwgY2F0Y2hSZWN0LmJvdHRvbSAmJiBidWNrZXRSZWN0LnRvcCArIHlPZmZzZXQgPiBjYXRjaFJlY3QudG9wICYmXG4gICAgICAgICAgICB4Q2VudGVyID4gYnVja2V0UmVjdC5sZWZ0ICYmIHhDZW50ZXIgPCBidWNrZXRSZWN0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICBzZWxlY3RDYXRjaGFibGUoYnVja2V0UmVmLCBjYXRjaGFibGVSZWYpIHtcbiAgICAgICAgdmFyIGNhdGNoYWJsZVJlZktleTtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQgfHxcbiAgICAgICAgICAgICF0aGlzLnN0YXRlLmNhbkNhdGNoIHx8ICFjYXRjaGFibGVSZWYuY2FuQ2F0Y2goKSkgcmV0dXJuO1xuICAgICAgICBjYXRjaGFibGVSZWZLZXkgPSBjYXRjaGFibGVSZWYucHJvcHNbJ2RhdGEtcmVmJ107XG4gICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICBrZXlzOiBbdGhpcy5wcm9wcy5jYXVnaHRUYXJnZXQsICdjYXVnaHQnXSxcbiAgICAgICAgICAgIGRhdGE6IGNhdGNoYWJsZVJlZktleSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYXRjaGFibGVSZWYucHJvcHMubWVzc2FnZSA9PT0gYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdjb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMucGF1c2UgJiYgcHJvcHMucGF1c2UgIT09IHRoaXMucHJvcHMucGF1c2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5yZXN1bWUgJiYgcHJvcHMucmVzdW1lICE9PSB0aGlzLnByb3BzLnJlc3VtZSkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJ1Y2tldCgpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKFtdLmNvbmNhdCh0aGlzLnByb3BzLmJ1Y2tldCksIChidWNrZXQsIGtleSkgPT5cbiAgICAgICAgICAgIDxidWNrZXQudHlwZVxuICAgICAgICAgICAgICAgIHsuLi5idWNrZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXsnYnVja2V0cy0nICsga2V5fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoJ2Fzc2V0cycpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJ1Y2tldCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYXRjaGVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGNhdWdodFRhcmdldDogJ2NhdGNoZXInLFxuICAgIGNvbGxpZGVGcmFjdGlvbjogMSAvIDYsXG59LCBDYXRjaC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xJztcblxuY2xhc3MgQ2F0Y2ggZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNhbkNhdGNoOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25SZXNpemUgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zID0gdGhpcy5jaGVja0NvbGxpc2lvbnMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoTW91c2VFdmVudHMoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpO1xuXG4gICAgICAgIHRoaXMuYnVja2V0Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5idWNrZXQpO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZU5vZGVzID0gXy5tYXAodGhpcy5wcm9wcy5jYXRjaGFibGVzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbYCR7a2V5fS1jYXRjaGFibGVgXSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNhdGNoYWJsZU5vZGVzLCBmdW5jdGlvbiAobm9kZSwga2V5KSB7XG4gICAgICAgICAgICB2YXIgY2F0Y2hhYmxlUmVmID0gdGhpcy5yZWZzW2Ake2tleX0tY2F0Y2hhYmxlYF07XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbml0ZXJhdGlvbicsIGNhdGNoYWJsZVJlZi5yZXNldCwgZmFsc2UpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGF0dGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB2YXIgY2F0Y2hSZWYgPSB0aGlzLnJlZnNbJ2NhdGNoLWNvbXBvbmVudCddO1xuICAgICAgICBpZiAoY2F0Y2hSZWYpIHtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgY2F0Y2hSZWYuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgY2F0Y2hSZWYuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbW91c2VYOiBlLnBhZ2VYXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHZhciB6b29tID0gc3RhdGUuc2NhbGU7XG4gICAgICAgICAgICB2YXIgZWRnZXMgPSB0aGlzLmdldEVkZ2VzKHRoaXMuYnVja2V0Tm9kZSk7XG4gICAgICAgICAgICB2YXIgYnVja2V0V2lkdGggPSBlZGdlcy5yaWdodCAtIGVkZ2VzLmxlZnQ7XG4gICAgICAgICAgICB2YXIgbGVmdEJvdW5kID0gdGhpcy5idWNrZXROb2RlLm9mZnNldFBhcmVudCA/XG4gICAgICAgICAgICAgICAgdGhpcy5idWNrZXROb2RlLm9mZnNldFBhcmVudC5vZmZzZXRXaWR0aCAtIGJ1Y2tldFdpZHRoIDogMDtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVja2V0VG9wOiBlZGdlcy50b3AsXG4gICAgICAgICAgICAgICAgYnVja2V0Qm90dG9tOiBlZGdlcy5ib3R0b20sXG4gICAgICAgICAgICAgICAgYnVja2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgbGVmdEJvdW5kLFxuICAgICAgICAgICAgICAgIHpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGhpcy5jaGVja0NvbGxpc2lvbnMpO1xuICAgICAgICB0aGlzLmJvb3RzdHJhcCgpO1xuICAgIH1cblxuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zKCk7XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdGFydGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF1c2VkOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXVzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0Q2F0Y2hhYmxlKGNhdGNoYWJsZU5vZGUsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCB0aGlzLnN0YXRlLnBhdXNlZCB8fCAhdGhpcy5zdGF0ZS5jYW5DYXRjaCB8fFxuICAgICAgICAgICAgIWNhdGNoYWJsZU5vZGUuY2FuQ2F0Y2goKSkgcmV0dXJuO1xuICAgICAgICBjYXRjaGFibGVOb2RlLm1hcmtDYXVnaHQoKTtcbiAgICAgICAgaWYgKGNhdGNoYWJsZU5vZGUucHJvcHMuaXNDb3JyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3QoY2F0Y2hhYmxlTm9kZSwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGNhdGNoYWJsZU5vZGUsIGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3JyZWN0KGNhdGNoYWJsZSwga2V5KSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdjb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgY2F0Y2hhYmxlLCBrZXkpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChjYXRjaGFibGUsIGtleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBjYXRjaGFibGUsIGtleSk7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb25zKCkge1xuICAgICAgICB2YXIgYnVja2V0UmVjdCA9IHRoaXMuYnVja2V0Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQpIHJldHVybjtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuY2F0Y2hhYmxlTm9kZXMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgdmFsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2F0Y2hhYmxlKHRoaXMucmVmc1tgJHtrZXl9LWNhdGNoYWJsZWBdLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuY2hlY2tDb2xsaXNpb25zKTtcbiAgICB9XG5cbiAgICBpc0NvbGxpZGluZyhidWNrZXRSZWN0LCBjYXRjaFJlY3QpIHtcbiAgICAgICAgdmFyIHhDZW50ZXIgPSBjYXRjaFJlY3QubGVmdCArIChjYXRjaFJlY3QucmlnaHQgLSBjYXRjaFJlY3QubGVmdCkgLyAyO1xuICAgICAgICB2YXIgeU9mZnNldCA9IChjYXRjaFJlY3QuYm90dG9tIC0gY2F0Y2hSZWN0LnRvcCkgLyA2O1xuICAgICAgICByZXR1cm4gKGJ1Y2tldFJlY3QudG9wIDwgY2F0Y2hSZWN0LmJvdHRvbSAtIHlPZmZzZXQgJiYgYnVja2V0UmVjdC50b3AgPiBjYXRjaFJlY3QudG9wICsgeU9mZnNldCAmJlxuICAgICAgICAgICAgeENlbnRlciA+IGJ1Y2tldFJlY3QubGVmdCAmJiB4Q2VudGVyIDwgYnVja2V0UmVjdC5yaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0RWRnZXMoZWwpIHtcbiAgICAgICAgdmFyIHRvcDtcbiAgICAgICAgdmFyIGxlZnQ7XG4gICAgICAgIHZhciB3aWR0aDtcbiAgICAgICAgdmFyIGhlaWdodDtcblxuICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgdG9wID0gMDtcbiAgICAgICAgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHdoaWxlIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLmNsYXNzTmFtZSAmJiBlbC5jbGFzc05hbWUuaW5kZXhPZignc2NyZWVuJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxlZnQgKz0gZWwub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgdG9wICs9IGVsLm9mZnNldFRvcCB8fCAwO1xuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgYm90dG9tOiB0b3AgKyBoZWlnaHQsXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQ6IGxlZnQgKyB3aWR0aFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFN0eWxlKCkge1xuICAgICAgICB2YXIgbGVmdCA9ICh0aGlzLnN0YXRlLm1vdXNlWCAvIHRoaXMuc3RhdGUuem9vbSkgLSAodGhpcy5zdGF0ZS5idWNrZXRXaWR0aCAvIDIpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5idWNrZXRJbkJvdW5kcykge1xuICAgICAgICAgICAgbGVmdCA9IGxlZnQgPCAxID8gMSA6IGxlZnQ7XG4gICAgICAgICAgICBsZWZ0ID0gbGVmdCA+PSB0aGlzLnN0YXRlLmxlZnRCb3VuZCA/IHRoaXMuc3RhdGUubGVmdEJvdW5kIC0gMSA6IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogYCR7bGVmdH1weGBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJCdWNrZXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5idWNrZXQudHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJ1Y2tldC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJidWNrZXRcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNhdGNoYWJsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNhdGNoYWJsZXMubWFwKChpdGVtLCBrZXkpID0+XG4gICAgICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgcmVmPXtgJHtrZXl9LWNhdGNoYWJsZWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaCcsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9XCJjYXRjaC1jb21wb25lbnRcIiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2F0Y2hhYmxlcygpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQnVja2V0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbn1cblxuQ2F0Y2guZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgY2F0Y2hhYmxlczogW10sXG4gICAgYnVja2V0SW5Cb3VuZHM6IHRydWUsXG4gICAgYnVja2V0OiA8c2tvYXNoLkNvbXBvbmVudCAvPixcbiAgICBvbkNvcnJlY3Q6IF8ubm9vcCxcbiAgICBvbkluY29ycmVjdDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBDYXRjaGFibGUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjYW5DYXRjaDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKG9wdHMsIGNiKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F1Z2h0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DYXVnaHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBjYW5DYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuc3RhdGUuY2FuQ2F0Y2g7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2NhdGNoYWJsZScsIHtcbiAgICAgICAgICAgIENBVUdIVDogIXRoaXMuc3RhdGUuY2FuQ2F0Y2hcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVhZHkgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5yZUNhdGNoYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQ2F0Y2hhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBpc0NvcnJlY3Q6IHRydWUsXG4gICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgb25DYXVnaHQ6IF8ubm9vcCxcbiAgICB0eXBlOiAnbGknLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5cbmNvbnN0IElURU0gPSAnaXRlbXMtJztcbmNvbnN0IERST1BQRUQgPSAnRFJPUFBFRCc7XG5cbmNsYXNzIERyb3BwZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLml0ZW1Db3VudCA9IDA7XG4gICAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5leHQodGhpcy5wcm9wcy5hbW91bnQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzW0lURU0gKyB0aGlzLmZpcnN0SXRlbUluZGV4XTtcbiAgICB9XG5cbiAgICBkcm9wKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgIGtleTogW3Byb3BzLnJlZnNUYXJnZXQsICdkcm9wJ10sXG4gICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcHMub25Ecm9wLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgcGlja1VwKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLnJlbW92ZUNsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG4gICAgICAgIGl0ZW1SZWYucmVzZXQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAga2V5OiBbcHJvcHMucmVmc1RhcmdldCwgJ3BpY2tVcCddLFxuICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BzLm9uUGlja1VwLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgbmV4dChhbW91bnQgPSAxLCBzaGlmdCA9IHRydWUpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcblxuICAgICAgICBfLmVhY2godGhpcy5yZWZzLmJpbi5nZXQoYW1vdW50KSwgdiA9PiB7XG4gICAgICAgICAgICBpdGVtc1t0aGlzLml0ZW1Db3VudCsrXSA9IChcbiAgICAgICAgICAgICAgICA8di50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi52LnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBvblJlYWR5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzaGlmdCkgZGVsZXRlIGl0ZW1zW3RoaXMuZmlyc3RJdGVtSW5kZXgrK107XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVmcyA9IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoSVRFTSkpO1xuICAgICAgICAgICAgdGhpcy5pbnZva2VDaGlsZHJlbkZ1bmN0aW9uKCdtYXJrQ2F0Y2hhYmxlJyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLnByb3BzLnJlZnNUYXJnZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICByZWZzLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk5leHQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2F1Z2h0KGNhdGNoYWJsZVJlZktleSkge1xuICAgICAgICBfLmludm9rZSh0aGlzLnJlZnNbY2F0Y2hhYmxlUmVmS2V5XSwgJ21hcmtDYXVnaHQnKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5uZXh0ID09PSB0cnVlICYmIHByb3BzLm5leHQgIT09IHRoaXMucHJvcHMubmV4dCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZHJvcCA9PT0gdHJ1ZSAmJiBwcm9wcy5kcm9wICE9PSB0aGlzLnByb3BzLmRyb3ApIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcChwcm9wcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMucGlja1VwID09PSB0cnVlICYmIHByb3BzLnBpY2tVcCAhPT0gdGhpcy5wcm9wcy5waWNrVXApIHtcbiAgICAgICAgICAgIHRoaXMucGlja1VwKHByb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5jYXVnaHQgJiYgcHJvcHMuY2F1Z2h0ICE9PSB0aGlzLnByb3BzLmNhdWdodCkge1xuICAgICAgICAgICAgdGhpcy5jYXVnaHQocHJvcHMuY2F1Z2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdtYW51YWwtZHJvcHBlcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBzaG9ydGlkIGlzIGludGVudGlvbmFsbHkgbm90IHVzZWQgZm9yIGtleSBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICAgKiB0aGF0IHRoZSBlbGVtZW50IGlzIHRyYW5zaXRpb25lZCBhbmQgbm90IHJlcGxhY2VkLlxuICAgICAqL1xuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5zdGF0ZS5pdGVtcywgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZiA9IElURU0gKyBrZXk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e2l0ZW0ucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXt0aGlzLnByb3BzLm9uVHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Ecm9wcGVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyb3BDbGFzczogRFJPUFBFRCxcbiAgICBhbW91bnQ6IDEsXG4gICAgYmluOiAoXG4gICAgICAgIDxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgYmluPXtbXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZSAvPixcbiAgICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgKSxcbiAgICByZWZzVGFyZ2V0OiAnbWFudWFsLWRyb3BwZXInLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIG9uUGlja1VwOiBfLm5vb3AsXG4gICAgb25OZXh0OiBfLm5vb3AsXG4gICAgbmV4dDogZmFsc2UsXG4gICAgZHJvcDogZmFsc2UsXG4gICAgb25UcmFuc2l0aW9uRW5kOiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BwZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgQ2F0Y2hhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2F0Y2hhYmxlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKG9wdHMsIGNiKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgIH1cblxuICAgIG1hcmtDYXVnaHQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yZWFkeSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjYXRjaGFibGU6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DYXVnaHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F0Y2hhYmxlKCkge1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSB0aGlzLkRPTU5vZGUgfHwgUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNhdGNoYWJsZSAmJiB0aGlzLmNhdGNoYWJsZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5DYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuY2F0Y2hhYmxlO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaGFibGUnLCB7XG4gICAgICAgICAgICBDQVVHSFQ6ICF0aGlzLnN0YXRlLmNhdGNoYWJsZVxuICAgICAgICB9LCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZWFkeSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLnByb3BzLnJlQ2F0Y2hhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjYXRjaGFibGU6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQ2F0Y2hhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBpc0NvcnJlY3Q6IHRydWUsXG4gICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgb25DYXVnaHQ6IF8ubm9vcCxcbiAgICB0eXBlOiAnbGknLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yLmpzIiwiaW1wb3J0IGRlZmF1bHRHYW1lT3B0cyBmcm9tICcuL2RlZmF1bHRfZ2FtZV9vcHRzJztcbmltcG9ydCBJdGVtc1RvU29ydCBmcm9tICcuL2l0ZW1zX3RvX3NvcnQnO1xuXG5jb25zdCBiaW5OYW1lcyA9IFtcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBnYW1lTmFtZTogJ3JlY3ljbGluZy1jaGFtcGlvbicsXG4gICAgZ2FtZU51bWJlcjogMSxcbiAgICBiaW5OYW1lcyxcbiAgICBpdGVtc1RvU29ydCxcbiAgICBleHRyYUNvbXBvbmVudHM6IFtcbiAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzY3I9e2Ake0NNV04uTUVESUEuSU1BR0V9cGlwZTAxLnBuZ2B9IC8+LFxuICAgIF0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzLmpzIiwiaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yJztcblxuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmxldCBiaW5OYW1lcyA9IFtcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwiZHJvcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlbGVhc2VJdGVtMS5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db3JyZWN0U2VsZWN0Lm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBpY2tVcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GbGlwLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwidGltZXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1TZWNvbmRUaW1lci5tcDNgfSAvPixcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2FtZU5hbWU6ICdyZWN5Y2xpbmctY2hhbXBpb24nLFxuICAgIGdhbWVOdW1iZXI6IDEsXG4gICAgbGV2ZWw6IDEsXG4gICAgdGltZW91dDogMTIwMDAwLFxuICAgIHNjb3JlVG9XaW46IDYwMCxcbiAgICBtYXhIaXRzOiA1LFxuICAgIGRyb3BwZXJBbW91bnQ6IDMsXG4gICAgcG9pbnRzUGVySXRlbTogOTUsXG4gICAgcG9pbnRzUGVyTWlzczogMjUwLFxuICAgIGNvbGxpZGVGcmFjdGlvbjogMCxcbiAgICBnZXRTY3JlZW5Qcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0czogMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc3RhcnQnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0VGltZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuc2NvcmUgPj0gb3B0cy5zY29yZVRvV2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaFNjb3JlOiBNYXRoLm1heChvcHRzLnNjb3JlLCBvcHRzLmhpZ2hTY29yZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXRyeScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY3JlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBzZWNvbmRzTGVmdCA9ICh0aGlzLnByb3BzLnRpbWVvdXQgLSB0aGlzLnN0YXRlLnRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kc0xlZnQgPT09IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdwbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICd0aW1lcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRSZXZlYWxQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbk9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIChwcmV2TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2TWVzc2FnZSB8fCBwcmV2TWVzc2FnZSA9PT0gJ3Jlc29ydCcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGlmIChwcmV2TWVzc2FnZSA9PT0gJ3JldHJ5Jykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnNjb3JlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5oaXRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFNlbGVjdGFibGVQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24gKGJpblJlZktleSkge1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzW2JpblJlZktleV0pLm9mZnNldExlZnQgLSA3ODU7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMubGVmdCA9PT0gbGVmdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdkcm9wJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdsZWZ0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RHJvcHBlclByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ET01Ob2RlICE9PSBlLnRhcmdldCB8fCBvcHRzLmxlZnQgPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Ryb3AnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbk5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKHRoaXMuZ2V0Rmlyc3RJdGVtKCkucHJvcHMuY2xhc3NOYW1lLCAvXFxkKy9nLCAnJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uUGlja1VwOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Ryb3BDbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAnJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDYXRjaGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db3JyZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzY29yZSddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAncGlja1VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0TGlmZVByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5zY29yZSA+PSBvcHRzLnNjb3JlVG9XaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoU2NvcmU6IE1hdGgubWF4KG9wdHMuc2NvcmUsIG9wdHMuaGlnaFNjb3JlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3JldHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEV4dHJhQ29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGNhdGNoYWJsZXNBcnJheTtcbiAgICB9LFxuICAgIGJpbk5hbWVzLFxuICAgIGl0ZW1zVG9Tb3J0LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9nYW1lX29wdHMuanMiLCJpbXBvcnQgaXRlbXNDb21wb3N0IGZyb20gJy4vaXRlbXNfY29tcG9zdCc7XG5pbXBvcnQgaXRlbXNGb29kU2hhcmUgZnJvbSAnLi9pdGVtc19mb29kX3NoYXJlJztcbmltcG9ydCBpdGVtc0xhbmRmaWxsIGZyb20gJy4vaXRlbXNfbGFuZGZpbGwnO1xuaW1wb3J0IGl0ZW1zTGlxdWlkcyBmcm9tICcuL2l0ZW1zX2xpcXVpZHMnO1xuaW1wb3J0IGl0ZW1zUmVjeWNsZSBmcm9tICcuL2l0ZW1zX3JlY3ljbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBbXVxuICAgIC5jb25jYXQoaXRlbXNDb21wb3N0KVxuICAgIC5jb25jYXQoaXRlbXNGb29kU2hhcmUpXG4gICAgLmNvbmNhdChpdGVtc0xhbmRmaWxsKVxuICAgIC5jb25jYXQoaXRlbXNMaXF1aWRzKVxuICAgIC5jb25jYXQoaXRlbXNSZWN5Y2xlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfdG9fc29ydC5qcyIsImxldCBiaW4gPSAnZm9vZC1zaGFyZSc7XG5sZXQgbmFtZXMgPSBbXG4gICAgJ2JhZy1vZi1wb3RhdG8tY2hpcHMtMicsXG4gICAgJ2JhZy1vZi1wb3RhdG8tY2hpcHMtMycsXG4gICAgJ2JveC1vZi1jaGVkZGFyLWNyYWNrZXJzJyxcbiAgICAnYm94LW9mLWNvb2tpZXMnLFxuICAgICdkaW5uZXItcm9sbCcsXG4gICAgJ2ZyZXNoLWZydWl0LWN1cCcsXG4gICAgJ2ZyZXNoLXVub3BlbmVkLXNhbmR3aWNoJyxcbiAgICAnZnJlc2gtdmVnZXRhYmxlLWN1cCcsXG4gICAgJ2tldGNodXAtcGFja2V0JyxcbiAgICAnbG9sbGlwb3AtMScsXG4gICAgJ2xvbGxpcG9wLTInLFxuICAgICdsb2xsaXBvcC0zJyxcbiAgICAnbG9sbGlwb3AtNCcsXG4gICAgJ2xvbGxpcG9wLTUnLFxuICAgICdtYXlvLXBhY2tldCcsXG4gICAgJ211c3RhcmQtcGFja2V0JyxcbiAgICAnU2VhbGVkLWFwcGxlLXNhdWNlJyxcbiAgICAnc2VhbGVkLWJhZy1vZi1jYXJyb3RzJyxcbiAgICAnc2VhbGVkLWNob2NvbGF0ZS1taWxrJyxcbiAgICAnc2VhbGVkLWZydWl0LWRyaW5rLTEnLFxuICAgICdzZWFsZWQtZnJ1aXQtZHJpbmstMicsXG4gICAgJ3NlYWxlZC1mcnVpdC1kcmluay0zJyxcbiAgICAnc2VhbGVkLW1pbGstMScsXG4gICAgJ3NlYWxlZC1taWxrLTInLFxuICAgICdzZWFsZWQtbWlsay0zJyxcbiAgICAnc2VhbGVkLW9yYW5nZS1qdWljZScsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jZXJlYWwtMicsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jZXJlYWwtMycsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jZXJlYWwnLFxuICAgICdzaW5nbGUtc2VydmUtY29va2llcycsXG4gICAgJ3VuZWF0ZW4tcHJldHplbCcsXG4gICAgJ3Vub3BlbmVkLWJveC1vZi1yYWlzaW5zJyxcbiAgICAndW5vcGVuZWQtY29va2llcy1wYWNrYWdlJyxcbiAgICAndW5vcGVuZWQtY3JhY2tlcnMtMScsXG4gICAgJ3Vub3BlbmVkLWNyYWNrZXJzLTInLFxuICAgICd1bm9wZW5lZC1jcmFja2Vycy0zJyxcbiAgICAndW5vcGVuZWQtZW5lcmd5LWJhcicsXG4gICAgJ3Vub3BlbmVkLWdyYWhhbS1jb29raWVzLTEnLFxuICAgICd1bm9wZW5lZC1ncmFoYW0tY29va2llcy0yJyxcbiAgICAndW5vcGVuZWQtZ3JhaGFtLWNvb2tpZXMtMycsXG4gICAgJ3Vub3BlbmVkLWdyYW5vbGEtYmFyJyxcbiAgICAnVW5vcGVuZWQtZ3JhcGUtanVpY2UtMScsXG4gICAgJ3Vub3BlbmVkLWdyYXBlLWp1aWNlLTInLFxuICAgICd1bm9wZW5lZC1ncmFwZS1qdWljZS0zJyxcbiAgICAndW5vcGVuZWQtcGFjay1vZi1ncmFwZXMnLFxuICAgICd1bm9wZW5lZC1wZWFudXQtYnV0dGVyLWN1cHMnLFxuICAgICd3aG9sZS1hcHBsZScsXG4gICAgJ3dob2xlLWJhbmFuYScsXG4gICAgJ3dob2xlLW9yYW5nZScsXG4gICAgJ3lvZ3VydC1jdXAtMScsXG4gICAgJ3lvZ3VydC1jdXAtMicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19mb29kX3NoYXJlLmpzIiwibGV0IGJpbiA9ICdsaXF1aWRzJztcbmxldCBuYW1lcyA9IFtcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0xJyxcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0yJyxcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0zJyxcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS00JyxcbiAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgJ2hhbGYtZnVsbC1jaG9jb2xhdGUtbWlsaycsXG4gICAgJ2hhbGYtZnVsbC1lbmVyZ3ktZHJpbmstYm90dGxlJyxcbiAgICAnaGFsZi1mdWxsLWxlbW9uYWRlLWJveC0xJyxcbiAgICAnaGFsZi1mdWxsLWxlbW9uYWRlLWJveC00JyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTEnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tMicsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi0zJyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTQnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tNScsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi02JyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTcnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tOCcsXG4gICAgJ2hhbGYtZnVsbC1vcmFuZ2UtanVpY2UtMicsXG5dO1xuXG5sZXQgYmVjb21lcyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLXdhdGVyLWJvdHRsZS0xJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLXdhdGVyLWJvdHRsZS0yJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLXdhdGVyLWJvdHRsZS0zJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1wbGFzdGljLXdhdGVyLWJvdHRsZS00JyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LWNob2NvbGF0ZS1taWxrJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1lbmVyZ3ktZHJpbmstYm90dGxlJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1sZW1vbmFkZS1ib3gtMScsXG4gICAgICAgIGJpbjogJ2xhbmRmaWxsJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LWxlbW9uYWRlLWJveC00JyxcbiAgICAgICAgYmluOiAnbGFuZGZpbGwnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tMScsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tMicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tMycsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNCcsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNScsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tNycsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24tOCcsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktb3JhbmdlLWp1aWNlLTInLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbiAgICBiZWNvbWVzOiBiZWNvbWVzW2ZyYW1lXSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfbGlxdWlkcy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdXIgU29ydGluZyBTa2lsbHM8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSBuZWVkZWQgZm9yPGJyLz5cbiAgICAgICAgICAgICAgICB0aGlzIG5leHQgcm91bmQuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEdldCBSZWFkeS1TZXQtR28hXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnUmVhZHlTZXRHbycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMSdcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX3R3b19pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDc2MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTm93IHRoYXQgeW91IGhhdmU8YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBoYW5nIG9mIHRoaXMgbGV0J3M8YnIvPlxuICAgICAgICAgICAgICAgIGFkZCBzb21lIHNwZWVkLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBHb29kIGx1Y2s8YnIvPlxuICAgICAgICAgICAgICAgIFNwZWVkIFNvcnRpbmchXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnU3BlZWRTb3J0aW5nJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBzY29yZVRvV2luOiA4NTUsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUaGF0IHdhcyBzb21lPGJyLz5cbiAgICAgICAgICAgICAgICBTcGVlZCBTb3J0aW5nITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBraWNrIGl0PGJyLz5cbiAgICAgICAgICAgICAgICBpbnRvIGhpZ2ggZHJpdmUhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGlnaERyaXZlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDk1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdyZWN5Y2xpbmctY2hhbXBpb24tZml2ZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTWFzdGVyIHRoaXMgbGV2ZWw8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCB3aW4gdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBSZWN5Y2xlIENoYW1waW9uIEZsaXAhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEFjY3VyYWN5IGlzIGltcG9ydGFudC4uLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0NoYW1waW9uRmxpcCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMSdcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBzY29yZVRvV2luOiAxMDQ1LFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5sZXQgZmxpcEtleXMgPSBbXG4gICAgJ3JlY3ljbGluZy1jaGFtcGlvbicsXG4gICAgJ3ByaWNlbGVzcy1wb3VyZXInLFxuICAgICdmYW50YXN0aWMtZm9vZC1zaGFyZXInLFxuICAgICdkeW5hbWljLWRpdmVydGVyJyxcbiAgICAnbWFzdGVyLXNvcnRlcicsXG4gICAgJ2dyZWVuLXRlYW0tY2hhbGxlbmdlJyxcbl07XG5cbmxldCBsZXZlbE5hbWVzID0gW1xuICAgICdSZWN5Y2xpbmcgQ2hhbXBpb24nLFxuICAgICdQcmljZWxlc3MgUG91cmVyJyxcbiAgICAnRmFudGFzdGljIEZvb2QgU2hhcmVyJyxcbiAgICAnRHluYW1pYyBEaXZlcnRlcicsXG4gICAgJ01hc3RlciBTb3J0ZXInLFxuXTtcblxubGV0IG51bWJlcldvcmRzID0gW1xuICAgICdPbmUnLFxuICAgICdUd28nLFxuICAgICdUaHJlZScsXG4gICAgJ0ZvdXInLFxuICAgICdGaXZlJyxcbl07XG5cbmxldCBnZXRMZXZlbEhlYWRlciA9IGxldmVsTnVtYmVyV29yZCA9PiB7XG4gICAgaWYgKGxldmVsTnVtYmVyV29yZCkgcmV0dXJuIDxoMz5MZXZlbCB7bGV2ZWxOdW1iZXJXb3JkfSBDb21wbGV0ZSE8L2gzPjtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgPGgzPkNPTkdSQVRVTEFUSU9OUyE8L2gzPlxuICAgICAgICAgICAgPGg0PllvdSBhcmUgYSBtZW1iZXIgb2YgR3JlZW4gVGVhbSE8L2g0PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxubGV0IGxpc3RMZXZlbHMgPSBsZXZlbE51bWJlciA9PlxuICAgIF8ubWFwKGxldmVsTmFtZXMsIChuYW1lLCBudW1iZXIpID0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtsZXZlbE51bWJlciA+IG51bWJlciA/ICdjb21wbGV0ZScgOiAnJ30+XG4gICAgICAgICAgICA8cD5MZXZlbCB7bnVtYmVyICsgMX08L3A+XG4gICAgICAgICAgICA8cD57bmFtZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChsZXZlbE51bWJlcikge1xuICAgIGxldCBsZXZlbE51bWJlcldvcmQgPSBudW1iZXJXb3Jkc1tsZXZlbE51bWJlciAtIDFdO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Bwb3N0LWxldmVsLSR7bGV2ZWxOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0cy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgQVBQRUFSOiBfLmdldChwcm9wcywgJ2RhdGEuYXBwZWFyLnBsYXlpbmcnKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke2xldmVsTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgZW1pdE9uQ29tcGxldGU9e3tcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2ZsaXAnLFxuICAgICAgICAgICAgICAgICAgICBnYW1lOiBmbGlwS2V5c1tsZXZlbE51bWJlciAtIDFdXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5GUkFNRX10cmFuc2l0aW9uLmZyYW1lLnBuZ2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9c3ByaXRlLmxldmVscy5wbmdgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxBd2FyZC5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9RmxpcEhvdmVyLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheVRhcmdldD1cImFwcGVhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUZsaXBEcm9wQm91bmNlLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHtnZXRMZXZlbEhlYWRlcihsZXZlbE51bWJlcldvcmQpfVxuICAgICAgICAgICAgICAgICAgICB7bGlzdExldmVscyhsZXZlbE51bWJlcil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGV2ZWxfY29tcGxldGVfc2NyZWVuX2NvbXBvbmVudC5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItb25lLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXkgUmVjeWNsZSBDaGFtcGlvbiE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgTmV4dCB1cOKAlGl0J3MgTGlxdWlkcyE8YnIvPlxuICAgICAgICAgICAgICAgIFBvdXIgdGhlIGxpcXVpZHMgYW5kPGJyLz5cbiAgICAgICAgICAgICAgICB0aGVuIHNvcnQgdGhlIGNvbnRhaW5lcnMuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGV5UmVjeWNsZUNoYW1waW9uJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cyJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgdGltZW91dDogMTIwMDAwLFxuICAgICAgICBzY29yZVRvV2luOiAxMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5cbmltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcblxuY29uc3QgYmluTmFtZXMgPSBbXG4gICAgJ2xpcXVpZHMnLFxuICAgICdyZWN5Y2xlJyxcbiAgICAnbGFuZGZpbGwnLFxuICAgICdjb21wb3N0Jyxcbl07XG5cbmxldCBpdGVtc1RvU29ydCA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoYmluTmFtZXMsIGl0ZW0uYmluKSk7XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IGNhdGNoYWJsZXNBcnJheSA9IF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+ICh7XG4gICAgdHlwZTogQ2F0Y2hhYmxlLFxuICAgIHByb3BzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogdi5uYW1lLFxuICAgICAgICBtZXNzYWdlOiB2LmJpbixcbiAgICAgICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgICAgIGJlY29tZXM6IHYuYmVjb21lcyxcbiAgICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKHYpLFxuICAgIH0sXG59KSk7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT5cbiAgICBfLnVwcGVyRmlyc3QoXy5jYW1lbENhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSkpXG4pO1xuXG5sZXQgYXVkaW9BcnJheSA9IF8ubWFwKGF1ZGlvUmVmcywgKHYsIGspID0+ICh7XG4gICAgdHlwZTogc2tvYXNoLkF1ZGlvLFxuICAgIHJlZjogdixcbiAgICBrZXk6IGssXG4gICAgcHJvcHM6IHtcbiAgICAgICAgdHlwZTogJ3ZvaWNlT3ZlcicsXG4gICAgICAgIHNyYzogYCR7Q01XTi5NRURJQS5HQU1FICsgJ3NvdW5kLWFzc2V0cy9fdm9zaXRlbXMvJyArIHZ9Lm1wM2AsXG4gICAgICAgIG9uUGxheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICBrZXlzOiBbJ2l0ZW0nLCAnbmV3J10sXG4gICAgICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59KSk7XG5cbmF1ZGlvQXJyYXkgPSBhdWRpb0FycmF5LmNvbmNhdChbXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJkcm9wXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9Q2xpY2tSZWNCdXR0b24ubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJjb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9Q29udmV5b3JCZWx0Lm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBpY2tVcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GbGlwLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicG91clwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUxpcXVpZFBvdXIubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0aW1lclwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVNlY29uZFRpbWVyLm1wM2B9IC8+LFxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGdhbWVOYW1lOiAncHJpY2VsZXNzLXBvdXJlcicsXG4gICAgZ2FtZU51bWJlcjogMixcbiAgICBkcm9wcGVyQW1vdW50OiA0LFxuICAgIGJpbk5hbWVzLFxuICAgIGdldFNlbGVjdGFibGVQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24gKGJpblJlZktleSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogXy50b1VwcGVyKG9wdHMuYmluTmFtZXNbYmluUmVmS2V5XSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3BwZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIGxldCBwcm9wcyA9IGRlZmF1bHRHYW1lT3B0cy5nZXREcm9wcGVyUHJvcHMuY2FsbCh0aGlzLCBvcHRzKTtcblxuICAgICAgICBwcm9wcy5vblRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgbGV0IGl0ZW1SZWYgPSB0aGlzLnJlZnNbJ2l0ZW1zLScgKyB0aGlzLmZpcnN0SXRlbUluZGV4XTtcbiAgICAgICAgICAgIGxldCBET01Ob2RlO1xuICAgICAgICAgICAgbGV0IG9uQW5pbWF0aW9uRW5kO1xuXG4gICAgICAgICAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgIT09ICdsZWZ0JykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZHJvcENsYXNzICE9PSAnTElRVUlEUycpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChpdGVtUmVmLnByb3BzLm1lc3NhZ2UgIT09ICdsaXF1aWRzJykge1xuICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IG9wdHMuc2NvcmUgLSBvcHRzLnBvaW50c1Blck1pc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ3BpY2tVcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXNvcnQnLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbVJlZik7XG5cbiAgICAgICAgICAgIGlmIChET01Ob2RlICE9PSBlLnRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBvbkFuaW1hdGlvbkVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tVcChfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgb25QaWNrVXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpcnN0SXRlbUluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnByb3BzLmNsYXNzTmFtZSA9IGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5tZXNzYWdlID0gaXRlbS5wcm9wcy5iZWNvbWVzLmJpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHNbJ2RhdGEtbWVzc2FnZSddID0gaXRlbS5wcm9wcy5iZWNvbWVzLmJpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zW2luZGV4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpdGVtc30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKF8ucmVwbGFjZShpdGVtLnByb3BzLmJlY29tZXMubmFtZSwgL1xcZCsvZywgJycpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvdXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW1SZWYuc3RhdGUuY2xhc3NOYW1lIHx8IGl0ZW1SZWYuc3RhdGUuY2xhc3NOYW1lLmluZGV4T2YoJ1BPVVInKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZSgnUE9VUicpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogWydpdGVtJywgJ3BvdXInXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRDYXRjaGVyUHJvcHMob3B0cykge1xuICAgICAgICB2YXIgcHJvcHMgPSBkZWZhdWx0R2FtZU9wdHMuZ2V0Q2F0Y2hlclByb3BzLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgcHJvcHMub25Db3JyZWN0ID0gZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UgIT09ICdsaXF1aWRzJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJlbHRcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjEuY29udmV5b3IuYmVsdGB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMubmV4dH1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXsyNTB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2Nob2NvbGF0ZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLmNob2NvbGF0ZS5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnZnJ1aXQnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5mcnVpdC5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ21pbGsnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnb3JhbmdlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIub3JhbmdlLmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGl0ZW1zVG9Tb3J0LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gY2F0Y2hhYmxlc0FycmF5O1xuICAgIH0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdHdvLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJdCdzIHRpbWUgdG8gZHVhbCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgRHVhbCBzb3J0aW5nIGlzPGJyLz5cbiAgICAgICAgICAgICAgICBpbXBvcnRhbnQgZm9yIGFjY3VyYWN5Ljxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBTaG93IHdoYXQgeW91IGtub3chXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSXRzVGltZVRvRHVhbCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDE1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLXRocmVlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTdWNjZXNzIGlzIHR3aWNlIGFzIG5pY2U8YnIvPlxuICAgICAgICAgICAgICAgIHdoZW4gZHVhbCBzb3J0aW5nITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBraWNrIGl0IHVwIGEgbm90Y2guXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnS2lja0l0dXBBTm90Y2gnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzInLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDIwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZm91ci1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGV5IFN1cGVyIFNvcnRlciE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhpbmdzIGFyZSBhYm91dDxici8+XG4gICAgICAgICAgICAgICAgdG8gZ2V0IGNyYXp5Ljxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBJIGhvcGUgeW91J3JlIHJlYWR5IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hleVN1cGVyU29ydGVyJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cyJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDI1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBMZXQncyB0YWtlIHRoaXM8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHRoZSBuZXh0IGxldmVsITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBZb3UgYXJlIGFib3V0IHRvPGJyLz5cbiAgICAgICAgICAgICAgICBiZWNvbWUgYTxici8+XG4gICAgICAgICAgICAgICAgUHJpY2VsZXNzIFBvdXJlciFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdUYWtlSXRUb3RoZU5leHRMZXZlbCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBzY29yZVRvV2luOiAzMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItb25lLWluZm8nLFxuICAgICAgICBjbGFzc05hbWU6ICdzbWFsbCcsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFNoYXJpbmcgc25hY2tzIGlzIGp1c3QgYTxici8+XG4gICAgICAgICAgICAgICAga2luZCB0aGluZyB0byBkbyBmb3Igb3RoZXJzLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBJZGVudGlmeSB0aG9zZSBpdGVtcyB0aGF0PGJyLz5cbiAgICAgICAgICAgICAgICBhcmUgcmVhZHkgdG8gZWF0LW5vdCB3YXN0ZTxici8+XG4gICAgICAgICAgICAgICAgYXMgRm9vZCBTaGFyZSBpdGVtcy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTaGFybmluZ1NuYWNrcycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMycsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICB0aW1lb3V0OiAxMjAwMDAsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjInO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmNvbnN0IFBJQ0tVUCA9ICdQSUNLVVAnO1xuY29uc3QgRFJPUFBFRCA9ICdEUk9QUEVEJztcbmNvbnN0IFRJTFQgPSAnVElMVCc7XG5jb25zdCBJVEVNUyA9ICdpdGVtcy0nO1xuXG5jb25zdCBCRUxUX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2xldmVsLjMuY29udmV5b3IuYmVsdCc7XG5jb25zdCBDTEFXX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2xldmVsM3JvYm90YXJtJztcbmNvbnN0IEZVTk5FTF9TUkMgPSBDTVdOLk1FRElBLlNQUklURSArICdmcm9udC5iYWNrLmZ1bm5lbCc7XG5cbmNvbnN0IGJpbk5hbWVzID0gW1xuICAgICdmb29kLXNoYXJlJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG4gICAgJ2xpcXVpZHMnLFxuXTtcblxuY29uc3Qgb25UcnVja1RyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAob3B0cywgZSkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTY3JlZW5EYXRhJywge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgZHJvcDogXy5pbmNsdWRlcyhlLnRhcmdldC5jbGFzc05hbWUsIFRJTFQpLFxuICAgICAgICAgICAgICAgIGRyb3BDbGFzczogXy50b1VwcGVyKF8uc25ha2VDYXNlKG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UpKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnc2VsZWN0YWJsZSc6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5jb25zdCBvbkl0ZW1QaWNrVXBUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGl0ZW1SZWYpIHtcbiAgICBpZiAoXy5pbmNsdWRlcyhpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSwgUElDS1VQKSkge1xuICAgICAgICBpdGVtUmVmLnJlbW92ZUFsbENsYXNzTmFtZXMoKTtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVNjcmVlbkRhdGEnLCB7XG4gICAgICAgICAgICBrZXk6ICd0cnVja0NsYXNzTmFtZScsXG4gICAgICAgICAgICBkYXRhOiAnJyxcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxubGV0IGl0ZW1zVG9Tb3J0ID0gXy5maWx0ZXIoSXRlbXNUb1NvcnQsIGl0ZW0gPT4gXy5pbmNsdWRlcyhiaW5OYW1lcywgaXRlbS5iaW4pKTtcblxubGV0IGdldENoaWxkcmVuID0gdiA9PiB7XG4gICAgaWYgKHYuY2hpbGRyZW4pIHJldHVybiB2LmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9XyR7Xy5yZXBsYWNlKHYuYmluLCAnLScsICcnKX1gfVxuICAgICAgICAgICAgZnJhbWU9e3YuZnJhbWUgfHwgMX1cbiAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgY2F0Y2hhYmxlc0FycmF5ID0gXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT4gKHtcbiAgICB0eXBlOiBDYXRjaGFibGUsXG4gICAgcHJvcHM6IHtcbiAgICAgICAgY2xhc3NOYW1lOiB2Lm5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IHYuYmluLFxuICAgICAgICByZUNhdGNoYWJsZTogdHJ1ZSxcbiAgICAgICAgYmVjb21lczogdi5iZWNvbWVzLFxuICAgICAgICBjaGlsZHJlbjogZ2V0Q2hpbGRyZW4odiksXG4gICAgfSxcbn0pKTtcblxubGV0IGF1ZGlvUmVmcyA9IF8udW5pcShfLm1hcChpdGVtc1RvU29ydCwgdiA9PlxuICAgIF8udXBwZXJGaXJzdChfLmNhbWVsQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwiZHJvcFwiIHNpbGVudE9uU3RhcnQ+XG4gICAgICAgIDxza29hc2guQXVkaW8gZGVsYXk9ezQ2MDB9IHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GdW5uZWwubXAzYH0gLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1UcnVja0R1bXAubXAzYH0gLz5cbiAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db252ZXlvckJlbHQubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXNvcnRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZXNvcnRXYXJuaW5nLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicGlja1VwXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZsaXAubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwb3VyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGlxdWlkUG91ci5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdmYW50YXN0aWMtZm9vZC1zaGFyZXInLFxuICAgIGdhbWVOdW1iZXI6IDMsXG4gICAgYmluTmFtZXMsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChkYXRhUmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMucHJvcHMubGlzdFtkYXRhUmVmXS5wcm9wcy5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNsYXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnByb3BlcnR5TmFtZSA9PT0gJ3RvcCcgJiYgXy5pbmNsdWRlcyhlLnRhcmdldC5jbGFzc05hbWUsIERST1BQRUQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtUmVmID0gdGhpcy5yZWZzW0lURU1TICsgdGhpcy5maXJzdEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBET01Ob2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RydWNrQ2xhc3NOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFRJTFQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNlbGVjdGFibGVNZXNzYWdlICE9PSAnbGlxdWlkcycpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ3BpY2tVcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbVJlZik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgb25BbmltYXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tVcChfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnN0YXRlLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpcnN0SXRlbUluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5jbGFzc05hbWUgPSBpdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5tZXNzYWdlID0gaXRlbS5wcm9wcy5iZWNvbWVzLmJpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpdGVtc30sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rmlyc3RJdGVtKCkucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbdGhpcy5wcm9wcy5yZWZzVGFyZ2V0LCAncmVmcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoSVRFTVMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5yZXBsYWNlKGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lLCAvXFxkKy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVja0NsYXNzTmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSB8fCBpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZS5pbmRleE9mKCdQT1VSJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogWydpdGVtJywgJ3BvdXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25QaWNrVXA6IGZ1bmN0aW9uIChpdGVtUmVmKSB7XG4gICAgICAgICAgICAgICAgaXRlbVJlZi5yZW1vdmVBbGxDbGFzc05hbWVzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLkRPTU5vZGUpIGl0ZW1SZWYuRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLkRPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbVBpY2tVcFRyYW5zaXRpb25FbmQuYmluZChudWxsLCBpdGVtUmVmKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShQSUNLVVApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWNrQ2xhc3NOYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDYXRjaGVyUHJvcHMob3B0cykge1xuICAgICAgICB2YXIgcHJvcHMgPSBkZWZhdWx0R2FtZU9wdHMuZ2V0Q2F0Y2hlclByb3BzLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgcHJvcHMub25Db3JyZWN0ID0gZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UgIT09ICdsaXF1aWRzJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXh0cmFzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGF3XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtDTEFXX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLm1vdmVDbGF3fVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgMjAwLCAyMDAsIDIwMCwgNTAwLCAxMDAsIDMwMDAsIDIwMCwgMjAwLCAyMDAsIDIwMCwgMjAwLCAyMDBcbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnbW92ZUNsYXcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZWx0XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtCRUxUX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NTAwfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLm5leHR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnY2hvY29sYXRlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjMuY2hvY29sYXRlLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdmcnVpdCd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLmZydWl0Lmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnbWlsayd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdvcmFuZ2UnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMy5vcmFuZ2UuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImZ1bm5lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e0ZVTk5FTF9TUkN9XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZnJvbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtGVU5ORUxfU1JDfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd0cnVjaycsIG9wdHMudHJ1Y2tDbGFzc05hbWUsIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UpfVxuICAgICAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ9e29uVHJ1Y2tUcmFuc2l0aW9uRW5kLmJpbmQobnVsbCwgb3B0cyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydWNrLXN0YW5kXCIgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGl0ZW1zVG9Tb3J0LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gY2F0Y2hhYmxlc0FycmF5O1xuICAgIH0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFNoYXJlIFNvbWUgTW9yZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgWW91ciBzb3J0aW5nIHNraWxscyBhcmU8YnIvPlxuICAgICAgICAgICAgICAgIGFjdGlvbnMgb2Yga2luZG5lc3MuPGJyLz5cbiAgICAgICAgICAgICAgICBTaGFyZSB0aGUgbG92ZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTaGFyZVRoZUxvdmUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzMnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU3BlZWQgU2hhcmUhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEdldCByZWFkeSBmb3IgYTxici8+XG4gICAgICAgICAgICAgICAgcnVzaCBvZiBraW5kbmVzcyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTcGVlZHNoYXJlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhleSBTdXBlciBTaGFyZXIhPGJyLz5cbiAgICAgICAgICAgICAgICBLaW5kbmVzcyBqdXN0PGJyLz5cbiAgICAgICAgICAgICAgICBza3lyb2NrZXRlZCBpbjxici8+XG4gICAgICAgICAgICAgICAgdGhlIGx1bmNocm9vbSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgTGV0J3MgZG8gdGhpcyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIZXlTdXBlclNoYXJlclNreXJvY2tldGVkJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiAyNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUaGUgdGl0bGUgb2Y8YnIvPlxuICAgICAgICAgICAgICAgIEZhbnRhc3RpYyBGb29kLVNoYXJlcjxici8+XG4gICAgICAgICAgICAgICAgaXMgb24gdGhlIGhvcml6b24hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIG1ha2UgdGhpcyBoYXBwZW4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnT25UaGVIb3Jpem9uJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBzY29yZVRvV2luOiAzMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1vbmUtaW5mbycsXG4gICAgICAgIGNsYXNzTmFtZTogJ2V4aGF1c3QnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgSnVzdCBiZWNhdXNlIGl0J3MgaW4gdGhlIGJpbi08YnIvPlxuICAgICAgICAgICAgICAgICAgICBkb2Vzbid0IG1lYW4gaXQgc2hvdWxkIGJlLjxici8+XG4gICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgIERyYWcgaXRlbXMgdG8gdGhlIHZlbnQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICB0aGF0IHNob3VsZCBub3QgYmUgaW48YnIvPlxuICAgICAgICAgICAgICAgICAgICB0aGUgYmluIHRvIGJlIHJlc29ydGVkLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9jb21wb3N0YH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdEcmFnVG9CaW4nLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgICAgICBpbWFnZTogYCR7Q01XTi5NRURJQS5JTUFHRX1leGhhdXN0LnBuZ2AsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBzY29yZVRvV2luOiAxMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IE1hbnVhbERyb3BwZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEnO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Ryb3B6b25lLzAuNCc7XG5pbXBvcnQgRHJhZ2dhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2RyYWdnYWJsZS8wLjQnO1xuXG5jb25zdCBQVFMgPSAncHRzJztcblxubGV0IGdldENoaWxkcmVuID0gdiA9PiB7XG4gICAgaWYgKHYuY2hpbGRyZW4pIHJldHVybiB2LmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9XyR7Xy5yZXBsYWNlKHYuYmluLCAnLScsICcnKX1gfVxuICAgICAgICAgICAgZnJhbWU9e3YuZnJhbWUgfHwgMX1cbiAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICBpZiAoTWF0aC5hYnMocHJvcHMuZ2FtZVN0YXRlLmN1cnJlbnRTY3JlZW5JbmRleCAtIHBhcnNlSW50KGtleSwgMTApKSA+IDIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke29wdHMuZ2FtZU51bWJlcn1gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2NyZWVuUHJvcHM7XG4gICAgICAgIGxldCB0aW1lclByb3BzO1xuICAgICAgICBsZXQgZHJvcHBlclByb3BzO1xuICAgICAgICBsZXQgcmV2ZWFsUHJvcHM7XG4gICAgICAgIGxldCBsaWZlUHJvcHM7XG4gICAgICAgIGxldCBkcmFnZ2FibGVQcm9wcztcbiAgICAgICAgbGV0IGRyb3B6b25lUHJvcHM7XG5cbiAgICAgICAgbGV0IGJpbkNvbXBvbmVudHM7XG5cbiAgICAgICAgY29uc3QgTEVWRUxfUEFUSCA9IGBnYW1lU3RhdGUuZGF0YS4ke18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpfS5sZXZlbHMuJHtvcHRzLmxldmVsfWA7XG5cbiAgICAgICAgbGV0IHN0YXJ0ID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LnN0YXJ0YCwgZmFsc2UpO1xuICAgICAgICBsZXQgZ2FtZUNvbXBsZXRlID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmNvbXBsZXRlYCwgZmFsc2UpO1xuICAgICAgICBsZXQgZHJvcHBlZCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5kcmFnZ2FibGUuZHJvcHBlZCcpO1xuICAgICAgICBsZXQgZHJhZ2dpbmcgPSBfLmdldChwcm9wcywgJ2RhdGEuZHJhZ2dhYmxlLmRyYWdnaW5nJyk7XG4gICAgICAgIGxldCBpdGVtTmFtZSA9IF8uc3RhcnRDYXNlKFxuICAgICAgICAgICAgXy5yZXBsYWNlKF8uZ2V0KGRyYWdnaW5nLCAncHJvcHMuY2xhc3NOYW1lJywgJycpLCAvXFxkKy9nLCAnJylcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGJpbk5hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuYmluTmFtZScsICcnKTtcbiAgICAgICAgbGV0IHJldmVhbE9wZW4gPSBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSk7XG4gICAgICAgIGxldCByZXZlYWxDbG9zZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSk7XG4gICAgICAgIGxldCBjYXJvdXNlbE5leHQgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIubmV4dCcsIGZhbHNlKTtcbiAgICAgICAgbGV0IHBsYXkgPSBfLmdldChwcm9wcywgJ2RhdGEucGxheScsIG51bGwpO1xuXG4gICAgICAgIGxldCBhbnN3ZXJzID0gXy5maWx0ZXIob3B0cy5iaW5OYW1lcywgbmFtZSA9PiBuYW1lICE9PSBiaW5OYW1lKTtcblxuICAgICAgICBsZXQgYXVkaW9BcnJheSA9IG9wdHMuZ2V0QXVkaW9BcnJheSgpO1xuXG4gICAgICAgIG9wdHMuc2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaWdoU2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uaGlnaFNjb3JlYCwgMCk7XG4gICAgICAgIG9wdHMuaGl0cyA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaXRzYCwgMCk7XG4gICAgICAgIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UgPSBfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS5tZXNzYWdlJywgJycpO1xuICAgICAgICBvcHRzLnBsYXlBdWRpbyA9IChcbiAgICAgICAgICAgIHBsYXkgPyBwbGF5IDpcbiAgICAgICAgICAgIHJldmVhbE9wZW4gPT09ICdyZXNvcnQnID8gJ3Jlc29ydCcgOlxuICAgICAgICAgICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKGl0ZW1OYW1lKSkgOiBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgc2NyZWVuUHJvcHMgPSBvcHRzLmdldFNjcmVlblByb3BzKG9wdHMpO1xuICAgICAgICB0aW1lclByb3BzID0gb3B0cy5nZXRUaW1lclByb3BzKG9wdHMpO1xuICAgICAgICBkcm9wcGVyUHJvcHMgPSBvcHRzLmdldERyb3BwZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgcmV2ZWFsUHJvcHMgPSBvcHRzLmdldFJldmVhbFByb3BzKG9wdHMpO1xuICAgICAgICBsaWZlUHJvcHMgPSBvcHRzLmdldExpZmVQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJhZ2dhYmxlUHJvcHMgPSBvcHRzLmdldERyYWdnYWJsZVByb3BzKG9wdHMpO1xuICAgICAgICBkcm9wem9uZVByb3BzID0gb3B0cy5nZXREcm9wem9uZVByb3BzKG9wdHMpO1xuXG4gICAgICAgIGJpbkNvbXBvbmVudHMgPSBfLm1hcChvcHRzLmJpbkl0ZW1zLCBiaW4gPT4gKHtcbiAgICAgICAgICAgIHR5cGU6IENhcm91c2VsLFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGJpbi5uYW1lLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGJpbi5uYW1lLFxuICAgICAgICAgICAgICAgIHNob3dOdW06IDIwLFxuICAgICAgICAgICAgICAgIG5leHRPblN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBiaW46IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogc2tvYXNoLlJhbmRvbWl6ZXIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW46IF8ubWFwKGJpbi5vYmplY3RzLCB2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRHJhZ2dhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB2Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHYuYmluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBkcmFnZ2FibGVQcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9eyFnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtvcHRzLmdhbWVOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICB7Li4uc2NyZWVuUHJvcHN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wLWxlZnRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGV2ZWwtc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5zY29yZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7UFRTfVxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5TY29yZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5UaW1lclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9XCJtbTpzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtvcHRzLnRpbWVvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWU9eyFyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4udGltZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaXRlbS1uYW1lXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW1OYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbi1uYW1lXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Jpbk5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaWZlXCJcbiAgICAgICAgICAgICAgICAgICAgbWF4PXswfVxuICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3Q9e29wdHMubWF4SGl0c31cbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5oaXRzfVxuICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmxpZmVQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxEcm9wem9uZVxuICAgICAgICAgICAgICAgICAgICBkcm9wcGVkPXtkcm9wcGVkfVxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2luZz17ZHJhZ2dpbmd9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5kcm9wem9uZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3RPbk91dE9mQm91bmRzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmVzPXtbPHNrb2FzaC5Db21wb25lbnQgYW5zd2Vycz17YW5zd2Vyc30gLz5dfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPE1hbnVhbERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmluc1wiXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudD17b3B0cy5kcm9wcGVyQW1vdW50fVxuICAgICAgICAgICAgICAgICAgICBuZXh0PXtjYXJvdXNlbE5leHR9XG4gICAgICAgICAgICAgICAgICAgIGJpbj17PHNrb2FzaC5SYW5kb21pemVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbj17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgICAgICAgICAgLz59XG4gICAgICAgICAgICAgICAgICAgIHsuLi5kcm9wcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlJldmVhbFxuICAgICAgICAgICAgICAgICAgICBvcGVuVGFyZ2V0PVwicmV2ZWFsXCJcbiAgICAgICAgICAgICAgICAgICAgb3BlblJldmVhbD17cmV2ZWFsT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgY2xvc2VSZXZlYWw9e3JldmVhbENsb3NlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ucmV2ZWFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmVzb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBwbGF5PXtvcHRzLnBsYXlBdWRpb31cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW49e2F1ZGlvQXJyYXl9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudC5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHNob3J0aWQgZnJvbSAnc2hvcnRpZCc7XG5cbmltcG9ydCBTZWxlY3RhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xJztcblxuY2xhc3MgQ2Fyb3VzZWwgZXh0ZW5kcyBTZWxlY3RhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWQgJiYgbmV4dFByb3BzLnNlbGVjdGVkICE9PSB0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5uZXh0ICYmIG5leHRQcm9wcy5uZXh0ICE9PSB0aGlzLnByb3BzLm5leHQpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm5leHRPblN0YXJ0KSB0aGlzLm5leHQoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnN0YXRlLmxpc3Q7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5yZWZzLmJpbi5nZXQoMSlbMF07XG4gICAgICAgIGxpc3QgPSBsaXN0LmNvbmNhdChcbiAgICAgICAgICAgIDxpdGVtLnR5cGVcbiAgICAgICAgICAgICAgICB7Li4uaXRlbS5wcm9wc31cbiAgICAgICAgICAgICAgICB7Li4ue1xuICAgICAgICAgICAgICAgICAgICAnZGF0YS1rZXknOiBzaG9ydGlkLmdlbmVyYXRlKClcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBjbGFzc2VzWzBdID0gJyc7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMucHJvcHMuZW5hYmxlZDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBsaXN0LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzWzBdID0gJ0xFQVZFJztcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMucHJvcHMucGF1c2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHZhciBsaXN0O1xuICAgICAgICAvLyBza29hc2guQ29tcG9uZW50IGlzIG5vdCB0aGUgc3VwZXIgaGVyZSwgYnV0IHRoaXMgaXMgd2hhdCB3ZSB3YW50XG4gICAgICAgIHNrb2FzaC5Db21wb25lbnQucHJvdG90eXBlLmJvb3RzdHJhcC5jYWxsKHRoaXMpO1xuXG4gICAgICAgIGxpc3QgPSB0aGlzLnJlZnMuYmluID8gdGhpcy5yZWZzLmJpbi5nZXQodGhpcy5wcm9wcy5zaG93TnVtICsgMSkgOiB0aGlzLnByb3BzLmxpc3Q7XG5cbiAgICAgICAgXy5lYWNoKGxpc3QsIGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICB7Li4ue1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEta2V5Jzogc2hvcnRpZC5nZW5lcmF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGlzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2Fyb3VzZWwnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc2hvcnRpZCBpcyBpbnRlbnRpb25hbGx5IG5vdCB1c2VkIGZvciBrZXkgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG8gbWFrZSBzdXJlXG4gICAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICAgKi9cbiAgICByZW5kZXJMaXN0KCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgIHZhciBvblRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgICByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHNbJ2RhdGEtcmVmJ10gfHwga2V5O1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kID0ga2V5ID09PSAwID8gdGhpcy5uZXh0IDogbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17bGkucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmR9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1rZXk9e3Nob3J0aWQoa2V5KX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgb25DbGljayA9IHRoaXMucHJvcHMuY2xpY2thYmxlID8gdGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYXJvdXNlbC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBzaG93TnVtOiAzLFxuICAgIHRhcmdldEluZGV4OiAxLFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgbmV4dE9uU3RhcnQ6IHRydWUsXG4gICAgcGF1c2U6IDUwMCxcbiAgICBjbGlja2FibGU6IGZhbHNlLFxuICAgIG9uU2VsZWN0OiBfLm5vb3AsXG59LCBTZWxlY3RhYmxlLmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvMC4xLmpzIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciBlbmNvZGUgPSByZXF1aXJlKCcuL2VuY29kZScpO1xudmFyIGRlY29kZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG52YXIgaXNWYWxpZCA9IHJlcXVpcmUoJy4vaXMtdmFsaWQnKTtcblxuLy8gSWdub3JlIGFsbCBtaWxsaXNlY29uZHMgYmVmb3JlIGEgY2VydGFpbiB0aW1lIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiB0aGUgZGF0ZSBlbnRyb3B5IHdpdGhvdXQgc2FjcmlmaWNpbmcgdW5pcXVlbmVzcy5cbi8vIFRoaXMgbnVtYmVyIHNob3VsZCBiZSB1cGRhdGVkIGV2ZXJ5IHllYXIgb3Igc28gdG8ga2VlcCB0aGUgZ2VuZXJhdGVkIGlkIHNob3J0LlxuLy8gVG8gcmVnZW5lcmF0ZSBgbmV3IERhdGUoKSAtIDBgIGFuZCBidW1wIHRoZSB2ZXJzaW9uLiBBbHdheXMgYnVtcCB0aGUgdmVyc2lvbiFcbnZhciBSRURVQ0VfVElNRSA9IDE0NTk3MDc2MDY1MTg7XG5cbi8vIGRvbid0IGNoYW5nZSB1bmxlc3Mgd2UgY2hhbmdlIHRoZSBhbGdvcyBvciBSRURVQ0VfVElNRVxuLy8gbXVzdCBiZSBhbiBpbnRlZ2VyIGFuZCBsZXNzIHRoYW4gMTZcbnZhciB2ZXJzaW9uID0gNjtcblxuLy8gaWYgeW91IGFyZSB1c2luZyBjbHVzdGVyIG9yIG11bHRpcGxlIHNlcnZlcnMgdXNlIHRoaXMgdG8gbWFrZSBlYWNoIGluc3RhbmNlXG4vLyBoYXMgYSB1bmlxdWUgdmFsdWUgZm9yIHdvcmtlclxuLy8gTm90ZTogSSBkb24ndCBrbm93IGlmIHRoaXMgaXMgYXV0b21hdGljYWxseSBzZXQgd2hlbiB1c2luZyB0aGlyZFxuLy8gcGFydHkgY2x1c3RlciBzb2x1dGlvbnMgc3VjaCBhcyBwbTIuXG52YXIgY2x1c3RlcldvcmtlcklkID0gcmVxdWlyZSgnLi91dGlsL2NsdXN0ZXItd29ya2VyLWlkJykgfHwgMDtcblxuLy8gQ291bnRlciBpcyB1c2VkIHdoZW4gc2hvcnRpZCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gb25lIHNlY29uZC5cbnZhciBjb3VudGVyO1xuXG4vLyBSZW1lbWJlciB0aGUgbGFzdCB0aW1lIHNob3J0aWQgd2FzIGNhbGxlZCBpbiBjYXNlIGNvdW50ZXIgaXMgbmVlZGVkLlxudmFyIHByZXZpb3VzU2Vjb25kcztcblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gUkVEVUNFX1RJTUUpICogMC4wMDEpO1xuXG4gICAgaWYgKHNlY29uZHMgPT09IHByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIHByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgdmVyc2lvbik7XG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgY2x1c3RlcldvcmtlcklkKTtcbiAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgY291bnRlcik7XG4gICAgfVxuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIHNlY29uZHMpO1xuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuXG4vKipcbiAqIFNldCB0aGUgc2VlZC5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBpZiB5b3UgZG9uJ3Qgd2FudCBwZW9wbGUgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgeW91ciBpZCBzY2hlbWEuXG4gKiBleHBvc2VkIGFzIHNob3J0aWQuc2VlZChpbnQpXG4gKiBAcGFyYW0gc2VlZCBJbnRlZ2VyIHZhbHVlIHRvIHNlZWQgdGhlIHJhbmRvbSBhbHBoYWJldC4gIEFMV0FZUyBVU0UgVEhFIFNBTUUgU0VFRCBvciB5b3UgbWlnaHQgZ2V0IG92ZXJsYXBzLlxuICovXG5mdW5jdGlvbiBzZWVkKHNlZWRWYWx1ZSkge1xuICAgIGFscGhhYmV0LnNlZWQoc2VlZFZhbHVlKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjbHVzdGVyIHdvcmtlciBvciBtYWNoaW5lIGlkXG4gKiBleHBvc2VkIGFzIHNob3J0aWQud29ya2VyKGludClcbiAqIEBwYXJhbSB3b3JrZXJJZCB3b3JrZXIgbXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyLiAgTnVtYmVyIGxlc3MgdGhhbiAxNiBpcyByZWNvbW1lbmRlZC5cbiAqIHJldHVybnMgc2hvcnRpZCBtb2R1bGUgc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gKi9cbmZ1bmN0aW9uIHdvcmtlcih3b3JrZXJJZCkge1xuICAgIGNsdXN0ZXJXb3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKlxuICogc2V0cyBuZXcgY2hhcmFjdGVycyB0byB1c2UgaW4gdGhlIGFscGhhYmV0XG4gKiByZXR1cm5zIHRoZSBzaHVmZmxlZCBhbHBoYWJldFxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpIHtcbiAgICBpZiAobmV3Q2hhcmFjdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFscGhhYmV0LmNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFscGhhYmV0LnNodWZmbGVkKCk7XG59XG5cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tRnJvbVNlZWQgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkJyk7XG5cbnZhciBPUklHSU5BTCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl8tJztcbnZhciBhbHBoYWJldDtcbnZhciBwcmV2aW91c1NlZWQ7XG5cbnZhciBzaHVmZmxlZDtcblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgc2h1ZmZsZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgaWYgKCFfYWxwaGFiZXRfKSB7XG4gICAgICAgIGlmIChhbHBoYWJldCAhPT0gT1JJR0lOQUwpIHtcbiAgICAgICAgICAgIGFscGhhYmV0ID0gT1JJR0lOQUw7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0XyA9PT0gYWxwaGFiZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfLmxlbmd0aCAhPT0gT1JJR0lOQUwubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFlvdSBzdWJtaXR0ZWQgJyArIF9hbHBoYWJldF8ubGVuZ3RoICsgJyBjaGFyYWN0ZXJzOiAnICsgX2FscGhhYmV0Xyk7XG4gICAgfVxuXG4gICAgdmFyIHVuaXF1ZSA9IF9hbHBoYWJldF8uc3BsaXQoJycpLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmQsIGFycil7XG4gICAgICAgcmV0dXJuIGluZCAhPT0gYXJyLmxhc3RJbmRleE9mKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgaWYgKHVuaXF1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gVGhlc2UgY2hhcmFjdGVycyB3ZXJlIG5vdCB1bmlxdWU6ICcgKyB1bmlxdWUuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgYWxwaGFiZXQgPSBfYWxwaGFiZXRfO1xuICAgIHJlc2V0KCk7XG59XG5cbmZ1bmN0aW9uIGNoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xyk7XG4gICAgcmV0dXJuIGFscGhhYmV0O1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKHNlZWQpIHtcbiAgICByYW5kb21Gcm9tU2VlZC5zZWVkKHNlZWQpO1xuICAgIGlmIChwcmV2aW91c1NlZWQgIT09IHNlZWQpIHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcHJldmlvdXNTZWVkID0gc2VlZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNodWZmbGUoKSB7XG4gICAgaWYgKCFhbHBoYWJldCkge1xuICAgICAgICBzZXRDaGFyYWN0ZXJzKE9SSUdJTkFMKTtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XG4gICAgdmFyIHRhcmdldEFycmF5ID0gW107XG4gICAgdmFyIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICB2YXIgY2hhcmFjdGVySW5kZXg7XG5cbiAgICB3aGlsZSAoc291cmNlQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgICAgIGNoYXJhY3RlckluZGV4ID0gTWF0aC5mbG9vcihyICogc291cmNlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgdGFyZ2V0QXJyYXkucHVzaChzb3VyY2VBcnJheS5zcGxpY2UoY2hhcmFjdGVySW5kZXgsIDEpWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldEFycmF5LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTaHVmZmxlZCgpIHtcbiAgICBpZiAoc2h1ZmZsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNodWZmbGVkO1xuICAgIH1cbiAgICBzaHVmZmxlZCA9IHNodWZmbGUoKTtcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG59XG5cbi8qKlxuICogbG9va3VwIHNodWZmbGVkIGxldHRlclxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBsb29rdXAoaW5kZXgpIHtcbiAgICB2YXIgYWxwaGFiZXRTaHVmZmxlZCA9IGdldFNodWZmbGVkKCk7XG4gICAgcmV0dXJuIGFscGhhYmV0U2h1ZmZsZWRbaW5kZXhdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuICAgIHNlZWQ6IHNldFNlZWQsXG4gICAgbG9va3VwOiBsb29rdXAsXG4gICAgc2h1ZmZsZWQ6IGdldFNodWZmbGVkXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9hbHBoYWJldC5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGb3VuZCB0aGlzIHNlZWQtYmFzZWQgcmFuZG9tIGdlbmVyYXRvciBzb21ld2hlcmVcbi8vIEJhc2VkIG9uIFRoZSBDZW50cmFsIFJhbmRvbWl6ZXIgMS4zIChDKSAxOTk3IGJ5IFBhdWwgSG91bGUgKGhvdWxlQG1zYy5jb3JuZWxsLmVkdSlcblxudmFyIHNlZWQgPSAxO1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBudW1iZXIgYmFzZWQgb24gYSBzZWVkXG4gKiBAcGFyYW0gc2VlZFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TmV4dFZhbHVlKCkge1xuICAgIHNlZWQgPSAoc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XG4gICAgcmV0dXJuIHNlZWQvKDIzMzI4MC4wKTtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChfc2VlZF8pIHtcbiAgICBzZWVkID0gX3NlZWRfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuZXh0VmFsdWU6IGdldE5leHRWYWx1ZSxcbiAgICBzZWVkOiBzZXRTZWVkXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tQnl0ZSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG5cbmZ1bmN0aW9uIGVuY29kZShsb29rdXAsIG51bWJlcikge1xuICAgIHZhciBsb29wQ291bnRlciA9IDA7XG4gICAgdmFyIGRvbmU7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgc3RyID0gc3RyICsgbG9va3VwKCAoIChudW1iZXIgPj4gKDQgKiBsb29wQ291bnRlcikpICYgMHgwZiApIHwgcmFuZG9tQnl0ZSgpICk7XG4gICAgICAgIGRvbmUgPSBudW1iZXIgPCAoTWF0aC5wb3coMTYsIGxvb3BDb3VudGVyICsgMSApICk7XG4gICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyeXB0byA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmICh3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0byk7IC8vIElFIDExIHVzZXMgd2luZG93Lm1zQ3J5cHRvXG5cbmZ1bmN0aW9uIHJhbmRvbUJ5dGUoKSB7XG4gICAgaWYgKCFjcnlwdG8gfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikgJiAweDMwO1xuICAgIH1cbiAgICB2YXIgZGVzdCA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoZGVzdCk7XG4gICAgcmV0dXJuIGRlc3RbMF0gJiAweDMwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbUJ5dGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tYnl0ZS1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbi8qKlxuICogRGVjb2RlIHRoZSBpZCB0byBnZXQgdGhlIHZlcnNpb24gYW5kIHdvcmtlclxuICogTWFpbmx5IGZvciBkZWJ1Z2dpbmcgYW5kIHRlc3RpbmcuXG4gKiBAcGFyYW0gaWQgLSB0aGUgc2hvcnRpZC1nZW5lcmF0ZWQgaWQuXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShpZCkge1xuICAgIHZhciBjaGFyYWN0ZXJzID0gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB2ZXJzaW9uOiBjaGFyYWN0ZXJzLmluZGV4T2YoaWQuc3Vic3RyKDAsIDEpKSAmIDB4MGYsXG4gICAgICAgIHdvcmtlcjogY2hhcmFjdGVycy5pbmRleE9mKGlkLnN1YnN0cigxLCAxKSkgJiAweDBmXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBjaGFyYWN0ZXJzID0gYWxwaGFiZXQuY2hhcmFjdGVycygpO1xuICAgIHZhciBsZW4gPSBpZC5sZW5ndGg7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjtpKyspIHtcbiAgICAgICAgaWYgKGNoYXJhY3RlcnMuaW5kZXhPZihpZFtpXSkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaG9ydElkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9pcy12YWxpZC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQXMgb2Ygc2tvYXNoIDEuMS4wIHRoaXMgY29tcG9uZW50IGNhbiBiZSBmb3VuZCBhdCBza29hc2guU2VsZWN0YWJsZVxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuY29uc29sZS53YXJuKCdBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5TZWxlY3RhYmxlJyk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFNlbGVjdGFibGUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2xhc3Nlczoge30sXG4gICAgICAgICAgICBzZWxlY3RGdW5jdGlvbjogdGhpcy5zZWxlY3QsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBzZWxlY3RDbGFzcztcbiAgICAgICAgdmFyIHNlbGVjdEZ1bmN0aW9uO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcblxuICAgICAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgICAgIHNlbGVjdENsYXNzID0gdGhpcy5wcm9wcy5zZWxlY3RDbGFzcyB8fCB0aGlzLnN0YXRlLnNlbGVjdENsYXNzIHx8ICdTRUxFQ1RFRCc7XG4gICAgICAgIHNlbGVjdEZ1bmN0aW9uID0gc2VsZWN0Q2xhc3MgPT09ICdISUdITElHSFRFRCcgPyB0aGlzLmhpZ2hsaWdodCA6IHRoaXMuc2VsZWN0O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdE9uU3RhcnQpIHtcbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy5wcm9wcy5zZWxlY3RPblN0YXJ0XSA9IHNlbGVjdENsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdGFydGVkOiB0cnVlLFxuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgIHNlbGVjdEZ1bmN0aW9uLFxuICAgICAgICAgICAgc2VsZWN0Q2xhc3MsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVmcy5iaW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGxpc3Q6IHRoaXMucmVmcy5iaW4uZ2V0QWxsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpIHtcbiAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgdmFyIGRhdGFSZWY7XG4gICAgICAgIHZhciB0YXJnZXQ7XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgdmFyIGlzQ29ycmVjdDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGFSZWYgPSBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnTEknKTtcblxuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcblxuICAgICAgICAgICAgZGF0YVJlZiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVmJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZWYgPSBzZWxmLnJlZnNbZGF0YVJlZl07XG5cbiAgICAgICAgaXNDb3JyZWN0ID0gKHJlZiAmJiByZWYucHJvcHMgJiYgcmVmLnByb3BzLmNvcnJlY3QpIHx8XG4gICAgICAgICAgICAoIXNlbGYucHJvcHMuYW5zd2VycyB8fCAhc2VsZi5wcm9wcy5hbnN3ZXJzLmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgIHNlbGYucHJvcHMuYW5zd2Vycy5pbmRleE9mKGRhdGFSZWYpICE9PSAtMSk7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuYWxsb3dEZXNlbGVjdCAmJiBjbGFzc2VzW2RhdGFSZWZdKSB7XG4gICAgICAgICAgICBkZWxldGUgY2xhc3Nlc1tkYXRhUmVmXTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvcnJlY3QpIHtcbiAgICAgICAgICAgIGNsYXNzZXNbZGF0YVJlZl0gPSBzZWxmLnN0YXRlLnNlbGVjdENsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnByb3BzLnNlbGVjdFJlc3BvbmQuY2FsbChzZWxmLCBkYXRhUmVmKTtcbiAgICAgICAgc2VsZi5wcm9wcy5vblNlbGVjdC5jYWxsKHNlbGYsIGRhdGFSZWYpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmNob29zZU9uZSkgc2VsZi5jb21wbGV0ZSgpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmRhdGFUYXJnZXQpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBzZWxmLnByb3BzLmRhdGFUYXJnZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHJlZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuY29tcGxldGVMaXN0T25DbGljaykge1xuICAgICAgICAgICAgXy5lYWNoKHNlbGYucmVmcywgKHIsIGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gaWQpIF8uaW52b2tlKHIsICdjb21wbGV0ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfLmVhY2goc2VsZi5yZWZzLCAociwgaykgPT4ge1xuICAgICAgICAgICAgaWYgKGsgPT09IGRhdGFSZWYpIF8uaW52b2tlKHIsICdjb21wbGV0ZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3QoZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKTtcbiAgICB9XG5cbiAgICBoaWdobGlnaHQoZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICAgICAgdGhpcy5zZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcyk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3Moa2V5LCBsaSkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgICAgICAgIGxpLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1trZXldLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2xpLnByb3BzWydkYXRhLXJlZiddXSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1tsaS5wcm9wc1snZGF0YS1rZXknXV1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnc2VsZWN0YWJsZScsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMuc2VsZWN0ICYmIHByb3BzLnNlbGVjdCAhPT0gdGhpcy5wcm9wcy5zZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0RnVuY3Rpb24uY2FsbCh0aGlzLCBwcm9wcy5zZWxlY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQmluKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYmluKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuYmluLnR5cGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5iaW4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPVwiYmluXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGlzdCgpIHtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnByb3BzLmxpc3QgfHwgdGhpcy5zdGF0ZS5saXN0O1xuICAgICAgICByZXR1cm4gbGlzdC5tYXAoKGxpLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciBkYXRhUmVmID0gbGkucHJvcHNbJ2RhdGEtcmVmJ10gfHwga2V5O1xuICAgICAgICAgICAgdmFyIHJlZiA9IGxpLnJlZiB8fCBsaS5wcm9wcy5pZCB8fCBkYXRhUmVmO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBsaS5wcm9wcy5tZXNzYWdlIHx8ICcnICsga2V5O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGkucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzcyhrZXksIGxpKX1cbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1tZXNzYWdlPXttZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17ZGF0YVJlZn1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXt0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMaXN0KCl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBsaXN0OiBbXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPlxuICAgIF0sXG4gICAgc2VsZWN0Q2xhc3M6ICdTRUxFQ1RFRCcsXG4gICAgY29tcGxldGVMaXN0T25DbGljazogdHJ1ZSxcbiAgICBzZWxlY3RSZXNwb25kOiBfLm5vb3AsXG4gICAgb25TZWxlY3Q6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0YWJsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyb3B6b25lIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRyb3B6b25lO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlO1xuXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgc2VsZi5kcm9wem9uZUNvcm5lcnMgPSBfLm1hcChzZWxmLnByb3BzLmRyb3B6b25lcywgKHZhbHVlLCBrZXkpID0+XG4gICAgICAgICAgICBzZWxmLmdldENvcm5lcnMoUmVhY3RET00uZmluZERPTU5vZGUoc2VsZi5yZWZzW2Bkcm9wem9uZS0ke2tleX1gXSkpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNlbGYubG9hZERhdGEgJiYgdHlwZW9mIHNlbGYubG9hZERhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZjEucmVmICYmIHJlZjEuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5Mi5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZWZzW2tleTFdICYmIHJlZjIucHJvcHMubWVzc2FnZSA9PT0gcmVmMS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSA9IHNlbGYucmVmc1trZXkxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLnNldFN0YXRlKHtjb250ZW50OiBkcmFnZ2FibGV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUocmVmMS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3JyZWN0KGRyYWdnYWJsZSwga2V5MS5yZXBsYWNlKCdkcm9wem9uZS0nLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZnNba2V5Ml0uc2V0U3RhdGUoe2NvbnRlbnQ6IFtdfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjMsIGtleTMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5My5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaW5jbHVkZXMocmVmMiwgcmVmMy5wcm9wcy5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZnNba2V5Ml0uc3RhdGUuY29udGVudC5wdXNoKHJlZjMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWYzLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZERyYWdORHJvcERhdGEoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRyb3B6b25lO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlO1xuICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjIsIGtleTIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Mi5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmVmc1trZXkxXSAmJiByZWYyLnByb3BzLm1lc3NhZ2UgPT09IHJlZjEucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lID0gc2VsZi5yZWZzW2tleTFdO1xuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogZHJhZ2dhYmxlfSk7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZS5zZXRTdGF0ZShyZWYxLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3JyZWN0KGRyYWdnYWJsZSwga2V5MS5yZXBsYWNlKCdkcm9wem9uZS0nLCAnJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkTXVsdGlBc253ZXJEYXRhKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkcm9wem9uZTtcbiAgICAgICAgdmFyIGRyYWdnYWJsZTtcbiAgICAgICAgXy5mb3JJbihzZWxmLmxvYWREYXRhLCAocmVmMSwga2V5MSkgPT4ge1xuICAgICAgICAgICAgZHJvcHpvbmUgPSBzZWxmLnJlZnNba2V5MV07XG4gICAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogW119KTtcbiAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5yZWZzLCAocmVmMiwga2V5MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgIGlmIChfLmluY2x1ZGVzKHJlZjEsIGRyYWdnYWJsZS5wcm9wcy5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZS5zdGF0ZS5jb250ZW50LnB1c2goZHJhZ2dhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENvcm5lcnMoZWwpIHtcbiAgICAgICAgdmFyIG9mZnNldDtcbiAgICAgICAgdmFyIGNvcm5lcnMgPSBbXTtcblxuICAgICAgICBvZmZzZXQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgY29ybmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBvZmZzZXQubGVmdCArIG9mZnNldC53aWR0aCAqIChpID09PSAxIHx8IGkgPT09IDIgPyAxIDogMCksXG4gICAgICAgICAgICAgICAgeTogb2Zmc2V0LnRvcCArIG9mZnNldC5oZWlnaHQgKiAoaSA+IDEgPyAxIDogMCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JuZXJzO1xuICAgIH1cblxuICAgIG9uRHJvcChkcm9wcGVkKSB7XG4gICAgICAgIHZhciBkcm9wcGVkRE9NO1xuICAgICAgICB2YXIgY29ybmVycztcbiAgICAgICAgdmFyIGRyb3B6b25lUmVmO1xuXG4gICAgICAgIGRyb3BwZWRET00gPSBkcm9wcGVkLkRPTU5vZGUgfHwgUmVhY3RET00uZmluZERPTU5vZGUoZHJvcHBlZCk7XG4gICAgICAgIGNvcm5lcnMgPSB0aGlzLmdldENvcm5lcnMoZHJvcHBlZERPTSk7XG5cbiAgICAgICAgZHJvcHpvbmVSZWYgPSBfLnJlZHVjZSh0aGlzLnByb3BzLmRyb3B6b25lcywgKGEsIHYsIGspID0+IHtcbiAgICAgICAgICAgIGlmIChza29hc2gudXRpbC5kb0ludGVyc2VjdChjb3JuZXJzLCB0aGlzLmRyb3B6b25lQ29ybmVyc1trXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2Bkcm9wem9uZS0ke2t9YF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChkcm9wem9uZVJlZikge1xuICAgICAgICAgICAgdGhpcy5pbkJvdW5kcyhkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm91dE9mQm91bmRzKGRyb3BwZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyb3AuY2FsbCh0aGlzLCBkcm9wcGVkKTtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dpbmcpIHtcbiAgICAgICAgXy5lYWNoKHRoaXMucHJvcHMuZHJvcHpvbmVzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgICAgdmFyIGRyb3B6b25lUmVmO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5zO1xuICAgICAgICAgICAgZHJvcHpvbmVSZWYgPSB0aGlzLnJlZnNbYGRyb3B6b25lLSR7a2V5fWBdO1xuICAgICAgICAgICAgY29udGFpbnMgPSBkcm9wem9uZVJlZi5jb250YWlucyB8fCBbXTtcbiAgICAgICAgICAgIGluZGV4ID0gY29udGFpbnMuaW5kZXhPZihkcmFnZ2luZyk7XG4gICAgICAgICAgICBpZiAofmluZGV4KSBjb250YWlucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZHJvcHpvbmVSZWYuY29udGFpbnMgPSBjb250YWlucztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyYWcuY2FsbCh0aGlzLCBkcmFnZ2luZyk7XG4gICAgfVxuXG4gICAgaW5Cb3VuZHMoZHJvcHBlZCwgZHJvcHpvbmVSZWYpIHtcbiAgICAgICAgaWYgKCFkcm9wem9uZVJlZi5wcm9wcy5hbnN3ZXJzIHx8IGRyb3B6b25lUmVmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkcm9wcGVkLnByb3BzLm1lc3NhZ2UpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG91dE9mQm91bmRzKGRyb3BwZWQpIHtcbiAgICAgICAgLy8gcmVzcG9uZCB0byBhbiBvdXQgb2YgYm91bmRzIGRyb3BcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ291dCcpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmNvcnJlY3RPbk91dE9mQm91bmRzKSB0aGlzLmluY29ycmVjdChkcm9wcGVkKTtcbiAgICB9XG5cbiAgICBjb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKSB7XG4gICAgICAgIC8vIHJlc3BvbmQgdG8gY29ycmVjdCBkcm9wXG4gICAgICAgIGRyb3BwZWQubWFya0NvcnJlY3QoKTtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2NvcnJlY3QnKTtcblxuICAgICAgICBkcm9wem9uZVJlZi5jb250YWlucyA9IChkcm9wem9uZVJlZi5jb250YWlucyB8fCBbXSkuY29uY2F0KGRyb3BwZWQpO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChkcm9wcGVkLCBkcm9wem9uZVJlZikge1xuICAgICAgICAvLyByZXNwb25kIHRvIGluY29ycmVjdCBkcm9wXG4gICAgICAgIGRyb3BwZWQubWFya0luY29ycmVjdCgpO1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMuZHJvcHBlZCAmJiBwcm9wcy5kcm9wcGVkICE9PSB0aGlzLnByb3BzLmRyb3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Ecm9wKHByb3BzLmRyb3BwZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmRyYWdnaW5nICYmIHByb3BzLmRyYWdnaW5nICE9PSB0aGlzLnByb3BzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZyhwcm9wcy5kcmFnZ2luZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEcm9wem9uZXMoKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnByb3BzLmRyb3B6b25lcywgKGNvbXBvbmVudCwga2V5KSA9PlxuICAgICAgICAgICAgPGNvbXBvbmVudC50eXBlXG4gICAgICAgICAgICAgICAgey4uLmNvbXBvbmVudC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e2Bkcm9wem9uZS0ke2tleX1gfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnZHJvcHpvbmVzJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50TGlzdCgnYXNzZXRzJyl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRHJvcHpvbmVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRyb3B6b25lLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyb3B6b25lczogWzxza29hc2guQ29tcG9uZW50IC8+XSxcbiAgICBvbkNvcnJlY3Q6IF8ubm9vcCxcbiAgICBvbkluY29ycmVjdDogXy5ub29wLFxuICAgIG9uRHJhZzogXy5ub29wLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIGluY29ycmVjdE9uT3V0T2ZCb3VuZHM6IHRydWUsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJvcHpvbmUvMC40LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBlbmRYOiAwLFxuICAgICAgICAgICAgZW5kWTogMCxcbiAgICAgICAgICAgIHpvb206IDEsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSB0aGlzLm1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm1vdXNlVXAgPSB0aGlzLm1vdXNlVXAuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLm1vdmVFdmVudCA9IHRoaXMubW92ZUV2ZW50LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0ID0gdGhpcy50b3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudG91Y2hFbmQgPSB0aGlzLnRvdWNoRW5kLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5zZXRab29tID0gdGhpcy5zZXRab29tLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdWxkRHJhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvdWxkRHJhZy5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIG1hcmtDb3JyZWN0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvcnJlY3Q6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1hcmtJbmNvcnJlY3QoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29ycmVjdDogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJldHVybk9uSW5jb3JyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJldHVyblRvU3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0RXZlbnQoZSwgY2IpIHtcbiAgICAgICAgdmFyIHJlY3Q7XG4gICAgICAgIHZhciBzdGFydFg7XG4gICAgICAgIHZhciBzdGFydFk7XG4gICAgICAgIHZhciBlbmRYO1xuICAgICAgICB2YXIgZW5kWTtcbiAgICAgICAgdmFyIGdyYWJYO1xuICAgICAgICB2YXIgZ3JhYlk7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzLkRPTU5vZGUpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZERyYWcoKSkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdKSB7XG4gICAgICAgICAgICByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBlID0gZS50YXJnZXRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgZS5vZmZzZXRYID0gZS5wYWdlWCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgIGUub2Zmc2V0WSA9IGUucGFnZVkgLSByZWN0LnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyYWJYID0gZS5vZmZzZXRYIC8gdGhpcy5zdGF0ZS56b29tO1xuICAgICAgICBncmFiWSA9IGUub2Zmc2V0WSAvIHRoaXMuc3RhdGUuem9vbTtcblxuICAgICAgICBzdGFydFggPSBlbmRYID0gKGUucGFnZVggLyB0aGlzLnN0YXRlLnpvb20gLSBncmFiWCk7XG4gICAgICAgIHN0YXJ0WSA9IGVuZFkgPSAoZS5wYWdlWSAvIHRoaXMuc3RhdGUuem9vbSAtIGdyYWJZKTtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmV0dXJuKSB7XG4gICAgICAgICAgICBzdGFydFggPSBfLmlzRmluaXRlKHRoaXMuc3RhdGUuZ3JhYlgpID9cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WCArIHRoaXMuc3RhdGUuZ3JhYlggLSBncmFiWCA6XG4gICAgICAgICAgICAgICAgc3RhcnRYO1xuICAgICAgICAgICAgc3RhcnRZID0gXy5pc0Zpbml0ZSh0aGlzLnN0YXRlLmdyYWJZKSA/XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydFkgKyB0aGlzLnN0YXRlLmdyYWJZIC0gZ3JhYlkgOlxuICAgICAgICAgICAgICAgIHN0YXJ0WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICAgICAgICByZXR1cm46IGZhbHNlLFxuICAgICAgICAgICAgc3RhcnRYLFxuICAgICAgICAgICAgc3RhcnRZLFxuICAgICAgICAgICAgZ3JhYlgsXG4gICAgICAgICAgICBncmFiWSxcbiAgICAgICAgICAgIGVuZFgsXG4gICAgICAgICAgICBlbmRZLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLnByb3BzLmRyYWdnYWJsZVRhcmdldCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogdGhpcyxcbiAgICAgICAgICAgICAgICBkcm9wcGVkOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uRHJhZy5jYWxsKHRoaXMsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIGNiLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgYXR0YWNoTW91c2VFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUb3VjaEV2ZW50cygpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCk7XG4gICAgfVxuXG4gICAgbW91c2VEb3duKGUpIHtcbiAgICAgICAgdGhpcy5zdGFydEV2ZW50KGUsIHRoaXMuYXR0YWNoTW91c2VFdmVudHMpO1xuICAgIH1cblxuICAgIHRvdWNoU3RhcnQoZSkge1xuICAgICAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hUb3VjaEV2ZW50cyk7XG4gICAgfVxuXG4gICAgbW92ZUV2ZW50KGUpIHtcbiAgICAgICAgZSA9IGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0gPyBlLnRhcmdldFRvdWNoZXNbMF0gOiBlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZW5kWDogKGUucGFnZVggLyB0aGlzLnN0YXRlLnpvb20gLSB0aGlzLnN0YXRlLmdyYWJYKSxcbiAgICAgICAgICAgIGVuZFk6IChlLnBhZ2VZIC8gdGhpcy5zdGF0ZS56b29tIC0gdGhpcy5zdGF0ZS5ncmFiWSksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuZEV2ZW50KGNiKSB7XG4gICAgICAgIHRoaXMub25Ecm9wKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmV0dXJuKSB7XG4gICAgICAgICAgICB0aGlzLnJldHVyblRvU3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgY2IuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRFbmQoZW5kWCwgZW5kWSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVuZFgsXG4gICAgICAgICAgICBlbmRZXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVyblRvU3RhcnQoKSB7XG4gICAgICAgIHZhciBlbmRYO1xuICAgICAgICB2YXIgZW5kWTtcbiAgICAgICAgdmFyIGRvUmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0YXlPbkNvcnJlY3QgJiYgdGhpcy5zdGF0ZS5jb3JyZWN0KSB7XG4gICAgICAgICAgICBlbmRYID0gdGhpcy5zdGF0ZS5lbmRYO1xuICAgICAgICAgICAgZW5kWSA9IHRoaXMuc3RhdGUuZW5kWTtcbiAgICAgICAgICAgIGRvUmV0dXJuID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmRYID0gdGhpcy5zdGF0ZS5zdGFydFg7XG4gICAgICAgICAgICBlbmRZID0gdGhpcy5zdGF0ZS5zdGFydFk7XG4gICAgICAgICAgICBkb1JldHVybiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHJldHVybjogZG9SZXR1cm4sXG4gICAgICAgICAgICBlbmRYLFxuICAgICAgICAgICAgZW5kWSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGV0YWNoTW91c2VFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgICB9XG5cbiAgICBkZXRhY2hUb3VjaEV2ZW50cygpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCk7XG4gICAgfVxuXG4gICAgbW91c2VVcCgpIHtcbiAgICAgICAgdGhpcy5lbmRFdmVudCh0aGlzLmRldGFjaE1vdXNlRXZlbnRzKTtcbiAgICB9XG5cbiAgICB0b3VjaEVuZCgpIHtcbiAgICAgICAgdGhpcy5lbmRFdmVudCh0aGlzLmRldGFjaFRvdWNoRXZlbnRzKTtcbiAgICB9XG5cbiAgICBvbkRyb3AoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZHJhZ2dhYmxlVGFyZ2V0LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGRyYWdnaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgIGRyb3BwZWQ6IHRoaXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25Ecm9wLmNhbGwodGhpcywgdGhpcyk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgICAgICB0aGlzLnNldFpvb20oKTtcblxuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgICAgICB0aGlzLkRPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xuICAgICAgICB0aGlzLkRPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0Wm9vbSk7XG4gICAgfVxuXG4gICAgc2V0Wm9vbSgpIHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ2dldFN0YXRlJykudGhlbihzdGF0ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB6b29tOiBzdGF0ZS5zY2FsZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpIHtcbiAgICAgICAgbGV0IHggPSB0aGlzLnN0YXRlLmVuZFggLSB0aGlzLnN0YXRlLnN0YXJ0WCB8fCAwO1xuICAgICAgICBsZXQgeSA9IHRoaXMuc3RhdGUuZW5kWSAtIHRoaXMuc3RhdGUuc3RhcnRZIHx8IDA7XG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuc3RhdGUuc2NhbGUgfHwgMTtcbiAgICAgICAgbGV0IHJvdGF0ZSA9IHRoaXMuc3RhdGUucm90YXRlIHx8IDA7XG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3h9cHgpIHRyYW5zbGF0ZVkoJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuXG4gICAgICAgIHJldHVybiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybSxcbiAgICAgICAgICAgIFdlYmtpdFRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICB9LCB0aGlzLnN0YXRlLnN0eWxlLCB0aGlzLnByb3BzLnN0eWxlKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcyh7XG4gICAgICAgICAgICBEUkFHR0lORzogdGhpcy5zdGF0ZS5kcmFnZ2luZyxcbiAgICAgICAgICAgIFJFVFVSTjogdGhpcy5zdGF0ZS5yZXR1cm4sXG4gICAgICAgICAgICBDT1JSRUNUOiB0aGlzLnN0YXRlLmNvcnJlY3QsXG4gICAgICAgIH0sICdkcmFnZ2FibGUnLCB0aGlzLnN0YXRlLmNsYXNzZXMsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgICAgICAgICAgZGF0YS1tZXNzYWdlPXt0aGlzLnByb3BzLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX1cbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5EcmFnZ2FibGUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgZHJhZ2dhYmxlVGFyZ2V0OiAnZHJhZ2dhYmxlJyxcbiAgICBzaG91bGREcmFnOiAoKSA9PiB0cnVlLFxuICAgIHJldHVybjogZmFsc2UsXG4gICAgcmV0dXJuT25JbmNvcnJlY3Q6IGZhbHNlLFxuICAgIHN0YXlPbkNvcnJlY3Q6IHRydWUsXG4gICAgb25Ecm9wOiBfLm5vb3AsXG4gICAgb25EcmFnOiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IERyYWdnYWJsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2RyYWdnYWJsZS8wLjQuanMiLCJpbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuXG5pbXBvcnQgaXRlbXNDb21wb3N0IGZyb20gJy4vaXRlbXNfY29tcG9zdCc7XG5pbXBvcnQgaXRlbXNMYW5kZmlsbCBmcm9tICcuL2l0ZW1zX2xhbmRmaWxsJztcbmltcG9ydCBpdGVtc1JlY3ljbGUgZnJvbSAnLi9pdGVtc19yZWN5Y2xlJztcblxubGV0IHNodWZmbGVkSXRlbXNDb21wb3N0ID0gXy5zaHVmZmxlKGl0ZW1zQ29tcG9zdCk7XG5sZXQgc2h1ZmZsZWRJdGVtc0xhbmRmaWxsID0gXy5zaHVmZmxlKGl0ZW1zTGFuZGZpbGwpO1xubGV0IHNodWZmbGVkSXRlbXNSZWN5Y2xlID0gXy5zaHVmZmxlKGl0ZW1zUmVjeWNsZSk7XG5cbmxldCBpdGVtc1RvU29ydCA9IFtdLmNvbmNhdChpdGVtc0NvbXBvc3QpLmNvbmNhdChpdGVtc0xhbmRmaWxsKS5jb25jYXQoaXRlbXNSZWN5Y2xlKTtcblxubGV0IGF1ZGlvUmVmcyA9IF8udW5pcShfLm1hcChpdGVtc1RvU29ydCwgdiA9PlxuICAgIF8udXBwZXJGaXJzdChfLmNhbWVsQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0aW1lclwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVNlY29uZFRpbWVyLm1wM2B9IC8+LFxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGdhbWVOYW1lOiAnZHluYW1pYy1kaXZlcnRlcicsXG4gICAgZ2FtZU51bWJlcjogNCxcbiAgICBwb2ludHNQZXJCaW46IDQwMCxcbiAgICBzY29yZVRvV2luOiAxMjAwLFxuICAgIGRyb3BwZXJBbW91bnQ6IDIsXG4gICAgZ2V0RHJvcHBlclByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdiaW5OYW1lJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUuaXRlbXNbdGhpcy5maXJzdEl0ZW1JbmRleF0ucHJvcHMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcmFnZ2FibGVQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogXy5yYW5kb20oMzAsIDcwKSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IF8ucmFuZG9tKDMwLCA3MCkgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiBfLnJhbmRvbSgxLCAxLjUpLFxuICAgICAgICAgICAgICAgICAgICByb3RhdGU6IF8ucmFuZG9tKC0zMCwgMzApLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3B6b25lUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db3JyZWN0OiBmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbTtcblxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZS5tYXJrQ29ycmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKHNjb3JlICUgb3B0cy5wb2ludHNQZXJCaW4pID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ25leHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY29ycmVjdDogZnVuY3Rpb24gKGRyYWdnYWJsZSwgZHJvcHpvbmVBcnJheSkge1xuICAgICAgICAgICAgICAgIGlmICghZHJvcHpvbmVBcnJheSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZW5kWDogZHJhZ2dhYmxlLnN0YXRlLmVuZFggKyAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGVuZFk6IGRyYWdnYWJsZS5zdGF0ZS5lbmRZICsgMjAwLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmVhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRzOiBvcHRzLmhpdHMgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IG9wdHMuc2NvcmUgLSBvcHRzLnBvaW50c1Blck1pc3MsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3NldHM6IFtcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db3JyZWN0U2VsZWN0Lm1wM2B9IC8+LFxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiaW5jb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9V3JvbmdTZWxlY3QubXAzYH0gLz4sXG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJkcmFnXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9RHJhZy5tcDNgfSAvPixcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyb3BcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1WYWN1dW0ubXAzYH0gLz4sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb25EcmFnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2RyYWcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlNZWRpYSgnZHJvcCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgYmluSXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3JlY3ljbGUnLFxuICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNDb21wb3N0LnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNMYW5kZmlsbC5zcGxpY2UoMCwgMikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zUmVjeWNsZS5zcGxpY2UoMCwgNikpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnbGFuZGZpbGwnLFxuICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNDb21wb3N0LnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNMYW5kZmlsbC5zcGxpY2UoMCwgNikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zUmVjeWNsZS5zcGxpY2UoMCwgMikpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY29tcG9zdCcsXG4gICAgICAgICAgICBvYmplY3RzOiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0NvbXBvc3Quc3BsaWNlKDAsIDYpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0xhbmRmaWxsLnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNSZWN5Y2xlLnNwbGljZSgwLCAyKSksXG4gICAgICAgIH0sXG4gICAgXVxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdkeW5hbWljLWRpdmVydGVyLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU2VuZCBtaXNwbGFjZWQgaXRlbXM8YnIvPlxuICAgICAgICAgICAgICAgIGJhY2sgdG8gYmUgc29ydGVkITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBIZWxwIG90aGVycyBieSBpZGVudGlmeWluZzxici8+XG4gICAgICAgICAgICAgICAgaXRlbXMgaW4gdGhlIHdyb25nIGJpbi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdNaXNwbGFjZWRJdGVtcycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNCcsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBzY29yZVRvV2luOiAxNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2F5IHRvIFNvcnQhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFRoaXMgbmV4dCBsZXZlbCB0YWtlczxici8+XG4gICAgICAgICAgICAgICAgU3VwZXIgU29ydGluZyBTa2lsbHMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnV2F5VG9Tb3J0JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJdCdzIGdldHRpbmcgbWVzc3kgaW4gaGVyZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhlc2UgYmlucyBhcmUgZnVsbDxici8+XG4gICAgICAgICAgICAgICAgb2YgdGhpbmdzIHRoYXQgc2hvdWxkbid0PGJyLz5cbiAgICAgICAgICAgICAgICBoYXZlIGxhbmRlZCBoZXJlLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBnZXQgc29ydGluZyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdHZXR0aW5nTWVzc3knLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDI1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXYXN0ZSBEaXZlcnNpb24gaXMgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBuYW1lIG9mIHRoZSBnYW1lLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGUgdGl0bGUgb2Y8YnIvPlxuICAgICAgICAgICAgICAgIER5bmFtaWMgRGl2ZXJ0ZXIgaXM8YnIvPlxuICAgICAgICAgICAgICAgIGp1c3QgYXJvdW5kIHRoZSBjb3JuZXIuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnV2FzdGVEaXZlcnNpb24nLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnd2FudC10by1zdGFjaycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3JpZ2h0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2h5IHdvdWxkIHlvdTxici8+XG4gICAgICAgICAgICAgICAgd2FudCB0byBzdGFjazxici8+XG4gICAgICAgICAgICAgICAgeW91ciB0cmF5P1xuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1doeVN0YWNrJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvd2FudF90b19zdGFja19zY3JlZW4uanMiLCJjb25zdCBTUkMgPSAnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vY2hhbmdlbXl3b3JsZG5vdy92aWRlby91cGxvYWQvJyArXG4gICAgJ3YxNDg2NTA3ODczL2JhZF9zdGFja2luZ19jb21wcmVzc2VkX24zZ3Jwdy5tcDQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInZpZGVvXCJcbiAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz1cIkJLRzVcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLlZpZGVvIHNyYz17U1JDfSAvPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1vbmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFByb3BlciB0cmF5IHN0YWNraW5nPGJyLz5cbiAgICAgICAgICAgICAgICBpcyBhIGdhbWUgb2Ygc3BhY2UuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEhvdyBtdWNoIHNwYWNlPGJyLz5cbiAgICAgICAgICAgICAgICBjYW4geW91IHNhdmU/XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnR2FtZU9mU3BhY2UnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX29uZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICB0aW1lb3V0OiAxMjAwMDAsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX29uZV9zY3JlZW4uanMiLCIvKiBlc2xpbnQgbWF4LWxpbmVzOiBbXCJlcnJvclwiLCB7XCJtYXhcIjogNjAwfV0gKi9cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yJztcbmltcG9ydCBJdGVtc1RvU29ydCBmcm9tICcuL2l0ZW1zX3RvX3NvcnQnO1xuXG5sZXQgb25TZWxlY3QgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgbGV0IHJlZiA9IHRoaXMucmVmc1trZXldO1xuICAgIGxldCByZWN0ID0gUmVhY3RET00uZmluZERPTU5vZGUocmVmKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKHJlZi5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICBuZXc6IHRydWUsXG4gICAgICAgICAgICByZWYsXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5sZXQgcmVzb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5sZXQgYmluTmFtZXMgPSBbXG4gICAgJ2xpcXVpZHMnLFxuICAgICdmb29kLXNoYXJlJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG4gICAgJ3RyYXktc3RhY2tpbmcnLFxuICAgICdob21lJyxcbl07XG5cbmxldCBpdGVtc1RvU29ydCA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoYmluTmFtZXMsIGl0ZW0uYmluKSk7XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IG1hcEl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1OYW1lcykge1xuICAgIGxldCBpdGVtcyA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoaXRlbU5hbWVzLCBpdGVtLm5hbWUpKTtcblxuICAgIHJldHVybiBfLm1hcChpdGVtcywgaXRlbSA9PlxuICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICBjbGFzc05hbWU9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgIG1lc3NhZ2U9e2l0ZW0uYmlufVxuICAgICAgICAgICAgcmVDYXRjaGFibGU9e3RydWV9XG4gICAgICAgICAgICBiZWNvbWVzPXtpdGVtLmJlY29tZXN9XG4gICAgICAgICAgICBjaGlsZHJlbj17Z2V0Q2hpbGRyZW4oaXRlbSl9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCB0cmF5c0FycmF5ID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBiaW46ICd0cmF5LXN0YWNraW5nJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgICBsaXN0PXttYXBJdGVtcyhbXG4gICAgICAgICAgICAgICAgICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlLTEnLFxuICAgICAgICAgICAgICAgICAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgICAgICAgICAgICAgICdoYWxmLWZ1bGwtZW5lcmd5LWRyaW5rLWJvdHRsZScsXG4gICAgICAgICAgICAgICAgICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94LTEnLFxuICAgICAgICAgICAgICAgICAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZS0yJyxcbiAgICAgICAgICAgICAgICBdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBiaW46ICd0cmF5LXN0YWNraW5nJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgICBsaXN0PXttYXBJdGVtcyhbXG4gICAgICAgICAgICAgICAgICAgICdwbGFzdGljLWN1cC0xJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FwcGxlLWNvcmUnLFxuICAgICAgICAgICAgICAgICAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyLTInLFxuICAgICAgICAgICAgICAgICAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0yJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dob2xlLWJhbmFuYScsXG4gICAgICAgICAgICAgICAgXSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5LXBpbmsnLFxuICAgICAgICBiaW46ICd0cmF5LXN0YWNraW5nJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgICBsaXN0PXttYXBJdGVtcyhbXG4gICAgICAgICAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyLTEwJyxcbiAgICAgICAgICAgICAgICBdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXktYmx1ZScsXG4gICAgICAgIGJpbjogJ3RyYXktc3RhY2tpbmcnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgPHNrb2FzaC5TZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgICAgICAgIGxpc3Q9e21hcEl0ZW1zKFtcbiAgICAgICAgICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXItMTAnLFxuICAgICAgICAgICAgICAgIF0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgXVxuICAgIH0sXG5dO1xuXG5sZXQgY2F0Y2hhYmxlc0FycmF5ID0gXy5tYXAodHJheXNBcnJheSwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy51cHBlckZpcnN0KF8uY2FtZWxDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwibmV4dFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUx1bmNoYm94U2xpZGUubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJjb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9Q29udmV5b3JCZWx0Lm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBpY2tVcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GbGlwLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicG91clwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUxpcXVpZFBvdXIubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0cmF5XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9VHJheVN0YWNrZXJSYWNrLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwic2VsZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbVNlbGVjdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdtYXN0ZXItc29ydGVyJyxcbiAgICBnYW1lTnVtYmVyOiA1LFxuICAgIGRyb3BwZXJBbW91bnQ6IDIsXG4gICAgYmluTmFtZXMsXG4gICAgY29sbGlkZUZyYWN0aW9uOiAuNCxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChiaW5SZWZLZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHJvcENsYXNzID0gXy50b1VwcGVyKG9wdHMuYmluTmFtZXNbYmluUmVmS2V5XSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuaXRlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ2NsYXNzTmFtZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZHJvcENsYXNzLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3BwZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyYXkgPSB0aGlzLmdldEZpcnN0SXRlbSgpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2YodHJheS5yZWZzWydjaGlsZHJlbi0wJ10uc3RhdGUuY2xhc3NlcywgJ1NFTEVDVEVEJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1SZWYgPSAhb3B0cy5pdGVtUmVmID8gdHJheSA6IHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnJlZnNbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICBsZXQgRE9NTm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgIT09ICd0b3AnIHx8XG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmluY2x1ZGVzKG9wdHMuaXRlbUNsYXNzTmFtZSwgJ0xJUVVJRFMnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIV8uaW5jbHVkZXModGhpcy5wcm9wcy5kcm9wQ2xhc3MsICdMSVFVSURTJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLml0ZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpdHMgPT09IG9wdHMubWF4SGl0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNvcnQuY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBvbkFuaW1hdGlvbkVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maXJzdEl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RhYmxlID0gaXRlbS5wcm9wcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGFibGUucHJvcHMubGlzdFtpdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW0ucHJvcHMuY2xhc3NOYW1lID0gc2VsZWN0ZWRJdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtLnByb3BzLm1lc3NhZ2UgPSBzZWxlY3RlZEl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBzZWxlY3RlZEl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2luZGV4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuc2NvcmUgKyBvcHRzLnBvaW50c1Blckl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogb3B0cy5pdGVtQW1vdW50IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnNldFN0YXRlKHtjbGFzc2VzOiB7fX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghXy5pbmNsdWRlcyhvcHRzLml0ZW1DbGFzc05hbWUsICdQT1VSJykpIHtcbiAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFsnaXRlbScsICdwb3VyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5pdGVtUmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLml0ZW1DbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RhYmxlID0gdGhpcy5yZWZzWydpdGVtcy0nICsgdGhpcy5maXJzdEl0ZW1JbmRleF0ucmVmc1snY2hpbGRyZW4tMCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JbmRleCA9IF8uaW5kZXhPZihzZWxlY3RhYmxlLnN0YXRlLmNsYXNzZXMsIHNlbGVjdGFibGUucHJvcHMuc2VsZWN0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxlY3RhYmxlLnJlZnNbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzc05hbWUobmV4dFByb3BzLml0ZW1DbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5yZW1vdmVJdGVtQ2xhc3NOYW1lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMucmVtb3ZlSXRlbUNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5pdGVtQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0YWJsZSA9IHRoaXMucmVmc1snaXRlbXMtJyArIHRoaXMuZmlyc3RJdGVtSW5kZXhdLnJlZnNbJ2NoaWxkcmVuLTAnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2Yoc2VsZWN0YWJsZS5zdGF0ZS5jbGFzc2VzLCBzZWxlY3RhYmxlLnByb3BzLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZWN0YWJsZS5yZWZzW2l0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0SXRlbSAmJlxuICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMuc2VsZWN0SXRlbSAhPT0gdGhpcy5wcm9wcy5zZWxlY3RJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmF5ID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJheS5wcm9wcy5tZXNzYWdlID09PSAnaG9tZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYXkuYWRkQ2xhc3NOYW1lKCdIT01FJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRyYXkpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodHJheS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IHJlY3QubGVmdCArIChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSAqIC44IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b3AgPSByZWN0LnRvcCArIChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSAqIC44IC8gMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogXy5yZWR1Y2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5yZWZzWydjaGlsZHJlbi0wJ10ucmVmcywgKGEsIHJlZikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSArIChyZWYucHJvcHMubWVzc2FnZSA9PT0gJ2xpcXVpZHMnID8gMiA6IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0SXRlbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hlclByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ29ycmVjdDogZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgICAgIGxldCBhbW91bnQgPSBvcHRzLml0ZW1BbW91bnQgLSAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzY29yZSddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuaXRlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ0FVR0hUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnbWFudWFsLWRyb3BwZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RJdGVtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5nZXQoYnVja2V0UmVmLCAncHJvcHMubWVzc2FnZScpICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29ydC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEV4dHJhQ29tcG9uZW50cyhvcHRzKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdtaWxrJztcblxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnQ2hvY29sYXRlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnY2hvY29sYXRlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnT3JhbmdlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnRnJ1aXQnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdmcnVpdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmF5LXN0YWNraW5nLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgVHJheSBTdGFja2luZ1xuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2Nob2NvbGF0ZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLmNob2NvbGF0ZS5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnZnJ1aXQnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5mcnVpdC5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ21pbGsnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnb3JhbmdlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIub3JhbmdlLmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gY2F0Y2hhYmxlc0FycmF5O1xuICAgIH0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdHdvLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBOb3QgYWxsIGx1bmNoZXMgYXJlPGJyLz5cbiAgICAgICAgICAgICAgICBjcmVhdGVkIGVxdWFsbHkuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFNvbWUgbHVuY2hlcyBjb21lIGZyb208YnIvPlxuICAgICAgICAgICAgICAgIGhvbWUgYW5kIHRoZXJlIGlzPGJyLz5cbiAgICAgICAgICAgICAgICBubyB0cmF5IHN0YWNraW5nIG5lZWRlZCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdMdW5jaGVzQ3JlYXRlZEVxdWFsbHknLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3R3b19pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBzY29yZVRvV2luOiAxNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSXRlbXMgZnJvbSBob21lPGJyLz5cbiAgICAgICAgICAgICAgICBjYW4gYmUgdHJpY2t5ITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGV5IGFyZSB1bmlxdWUgYW5kIHlvdTxici8+XG4gICAgICAgICAgICAgICAgYXJlIG9uIHlvdXIgb3duIHRvIHNvcnQhPGJyLz5cbiAgICAgICAgICAgICAgICBBc2sgZm9yIGhlbHAgaWYgeW91PGJyLz5cbiAgICAgICAgICAgICAgICBhcmUgdW5zdXJlIG9mIGl0ZW1zLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0l0ZW1zRnJvbUhvbWUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDIwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZm91ci1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgVGhpcyBpcyBhIHRvdWdoPGJyLz5cbiAgICAgICAgICAgICAgICBjaGFsbGVuZ2UgYnV0IEkgc2VlPGJyLz5cbiAgICAgICAgICAgICAgICB5b3VyIG5ldyBGbGlwPGJyLz5cbiAgICAgICAgICAgICAgICBvbiB0aGUgaG9yaXpvbiE8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIEdvIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1RvdWdoQ2hhbGxlbmdlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c1JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDI1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBZb3UgYXJlIGFib3V0IHRvIFdpbjxici8+XG4gICAgICAgICAgICAgICAgdGhlIGhpZ2hlc3QgaG9ub3IgZm9yIHRoZTxici8+XG4gICAgICAgICAgICAgICAgR3JlZW4gVGVhbSBDaGFsbGVuZ2UhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFdpbiB0aGlzIGxldmVsIHRvIGJlY29tZTxici8+XG4gICAgICAgICAgICAgICAgYSBNYXN0ZXIgU29ydGVyIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hpZ2hlc3RIb25vcicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBzY29yZVRvV2luOiAzMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ25vdy1hLW1lbWJlcicsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSBhcmUgbm93IGEgbWVtYmVyPGJyLz5cbiAgICAgICAgICAgICAgICBvZiB0aGUgR3JlZW4gVGVhbSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgSXQncyB0aW1lIHRvIHNoYXJlPGJyLz5cbiAgICAgICAgICAgICAgICBpdCB3aXRoIHlvdXI8YnIvPlxuICAgICAgICAgICAgICAgIGZhbWlseSBhbmQgY29tbXVuaXR5IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ01lbWJlck9mR3JlZW5UZWFtJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbm93X2FfbWVtYmVyX3NjcmVlbi5qcyIsImNsYXNzIFF1aXRTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgICBva2F5KCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcigncXVpdCcpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICBza29hc2gudHJpZ2dlcignbWVudUNsb3NlJywge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckFzc2V0cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXNzZXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hc3NldHMubWFwKChhc3NldCwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmFzc2V0LnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXthc3NldC5yZWYgfHwgYXNzZXQucHJvcHNbJ2RhdGEtcmVmJ10gfHwgKCdhc3NldC0nICsga2V5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgc2NyZWVuICR7dGhpcy5nZXRDbGFzc05hbWVzKCl9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBc3NldHMoKX1cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5BcmUgeW91IHN1cmU8YnIvPnlvdSB3YW50IHRvIHF1aXQ/PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJxdWl0LXllc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5va2F5LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInF1aXQtbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2FuY2VsLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKFxuICAgIDxRdWl0U2NyZWVuXG4gICAgICAgIGlkPVwicXVpdFwiXG4gICAgICAgIGFzc2V0cz17W1xuICAgICAgICBdfVxuICAgIC8+XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9xdWl0X3NjcmVlbi5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL2pCQTtBQ0NBO0FBREE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FEQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0NBO0FEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBRXBDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FGRUE7QUFDQTtBQUNBO0FBaUdBO0FBQ0E7QUFEQTtBQUdBO0FBdkdBO0FBQ0E7QUF1SkE7Ozs7OztBRzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFGQTtBQURBO0FBV0E7Ozs7QUFkQTtBQUNBO0FKZ0JBOzs7Ozs7Ozs7Ozs7OztBS2pCQTtBTENBO0FBQ0E7QUFBQTtBS0VBO0FMQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFaQTtBQWVBOzs7Ozs7Ozs7Ozs7OztBTUZBO0FOQ0E7QUFDQTtBQUFBO0FNRUE7QU5DQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFOQTtBQXhCQTtBQXFDQTtBQUNBO0FBdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QU9aQTtBQUNBOzs7OztBQUNBO0FQQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FRTkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7O0FDMkxBO0FUQ0E7QUFDQTtBQUNBOzs7QUFoTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FTQ0E7QVRDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FVeExBO0FWQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FXbUNBO0FYQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBV0VBO0FYQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFmQTtBQXNCQTtBQUNBO0FBN0RBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7QVlsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0JBO0FiQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQWZBO0FBaUJBO0FBQ0E7QUFyQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTs7Ozs7Ozs7Ozs7QWNSQTtBQUNBO0FBQ0E7QWR1REE7QUFBQTtBQUNBO0FBQ0E7QWNDQTtBZEhBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FlNkNBO0FmQ0E7QUFDQTtBQUFBO0FlRUE7QWZDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QWVDQTtBZkNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFKQTtBQVFBO0FBQUE7QUFBQTtBQUNBO0FlREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FmRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQVBBO0FBSEE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQTVDQTtBQW1EQTtBQUNBO0FBNUpBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBeENBO0FBQ0E7QUFpREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQURBOzs7Ozs7Ozs7OztBZ0I1RkE7QUFDQTtBQUNBO0FoQnVEQTtBQUFBO0FBQ0E7QUFDQTtBZ0JDQTtBaEJIQTtBQUFBOzs7Ozs7Ozs7Ozs7QWlCdkNBO0FqQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkNBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7Ozs7Ozs7Ozs7O0FrQlJBO0FBQ0E7QUFDQTtBbEJvQ0E7QUFBQTtBQUNBO0FBQ0E7QWtCQ0E7QWxCSEE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QW1CcEJBO0FBQ0E7QUFDQTtBbkJDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBbUJDQTtBbkJDQTtBQUNBO0FBQ0E7QUFGQTtBQU5BO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUZBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFaQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQXpDQTtBQStDQTtBQUNBO0FBQ0E7QUFoRkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7OztBb0JiQTtBcEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQXJCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXFCRUE7QXJCQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QXNCS0E7QXRCQUE7QUFDQTtBQUFBO0FBQ0E7QXNCR0E7QXRCQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBc0JDQTtBdEJDQTtBQUNBO0FzQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QXRCQ0E7QUFDQTtBc0JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QXRCQ0E7QUFDQTtBQUNBO0FzQkNBO0F0QkNBO0FzQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QXRCQ0E7QUFDQTtBc0JDQTtBdEJDQTtBc0JDQTtBQUNBO0FBQ0E7QUFDQTtBdEJZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QXNCRUE7QXRCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVZBO0FBcUJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBV0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVhBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF0QkE7QUF5QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVdBO0FBRUE7QUFGQTtBQWhCQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFoQkE7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVZBO0FBM0hBO0FBeUlBO0FBQ0E7QUFDQTtBQTFPQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QXVCTEE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0F2QkNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVFBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBd0JoSEE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QXhCQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUhBO0FBTUE7OztBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFIQTtBQURBO0FBT0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQU9BOzs7O0FBaE5BO0FBQ0E7QUFtTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7Ozs7O0F5QmhPQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBekJBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUF0Q0E7QUFDQTtBQXdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBMEJuREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QTFCQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFIQTtBQU1BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QTBCQUE7QUFDQTtBQUNBO0ExQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVRBO0FBY0E7Ozs7QUFyS0E7QUFDQTtBQXVLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhCQTtBQUNBO0FBa0JBOzs7Ozs7Ozs7Ozs7Ozs7O0EyQmxNQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBM0JBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQWhEQTtBQUNBO0FBa0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTs7Ozs7Ozs7Ozs7O0E0QjdEQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFLQTtBNUJBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBNEJDQTtBNUJDQTtBQUxBOzs7Ozs7Ozs7Ozs7QTZCWEE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBS0E7QTdCQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFoQkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQTdCQTtBQStCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUF4QkE7QUEwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFMQTtBQURBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUExQkE7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBUkE7QUFEQTtBQWNBO0FBQ0E7QUFwQkE7QUFzQkE7QUF2REE7QUF5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQXBCQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QTZCQ0E7QTdCek9BOzs7Ozs7Ozs7Ozs7QThCL0RBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0EvQnFEQTtBQUFBO0FBQ0E7QUFDQTtBK0JDQTtBL0JIQTtBQUFBOzs7Ozs7Ozs7OztBZ0N2REE7QUFDQTtBQUNBO0FoQ29CQTtBQUVBO0FBQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBS0E7QWhDQ0E7QWdDRkE7QUFLQTtBaENDQTtBZ0NGQTtBQUtBO0FoQ0NBO0FnQ0ZBO0FBQ0E7QUFLQTtBaENBQTtBQUNBO0FBQ0E7QWdDQ0E7QWhDQ0E7QUFKQTtBQUFBOzs7Ozs7Ozs7Ozs7QWlDL0ZBO0FqQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrQ0VBO0FsQ0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbUNBQTtBbkNDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvQ0VBO0FwQ0NBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcUNBQTtBckNDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBc0NFQTtBdENDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXVDQUE7QXZDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXdDRUE7QXhDQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QXlDMkNBO0FBQ0E7QUFDQTtBQUNBO0F6Q0FBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QXlDQ0E7QXpDQ0E7QUFEQTtBQUdBO0F5Q0NBO0FBQ0E7QXpDQ0E7QXlDRkE7QUFUQTtBQWNBO0FBQ0E7QUFDQTtBekNGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFUQTtBQWVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QXlDRkE7QUFyQ0E7QUEyQ0E7QUFDQTtBQUNBO0FBL0ZBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBekNRQTtBQUNBO0FBT0E7QUFDQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFEQTtBQURBOzs7Ozs7Ozs7Ozs7QTBDbkNBO0ExQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0EyQ0VBO0EzQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E0Q0ZBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQU1BO0E1Q0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0E0Q0NBO0E1Q0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBQ0E7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFEQTtBQVdBO0FBQ0E7QUF0QkE7QUF3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQTdDQTtBQTBEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1TkE7Ozs7Ozs7Ozs7OztBNkNsRUE7QTdDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBQ0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QThDRUE7QTlDQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0ErQ0FBO0EvQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWdERUE7QWhEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FpREFBO0FqRENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUNBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrREVBO0FsRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBbURBQTtBbkRDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvREVBO0FwRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBcURBQTtBckRDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQXJCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXNERUE7QXREQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFWQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBdURGQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QXZEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFMQTtBQURBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QXVEQ0E7QXZEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFQQTtBQURBO0FBV0E7QUFiQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFSQTtBQURBO0FBY0E7QUFDQTtBQXBCQTtBQUNBO0FBc0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBSkE7QUFNQTtBQUNBO0FBREE7QUFHQTtBQVZBO0FBREE7QUFjQTtBQUNBO0FBL0JBO0FBaUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBM0dBO0FBQ0E7QUFEQTtBQTRHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBdURDQTtBQUNBO0FBQ0E7QXZEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFSQTtBQURBO0FBWUE7QUF2SUE7QUF5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFmQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVBBO0FBY0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQTdGQTtBQWdHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzU0E7Ozs7Ozs7Ozs7OztBd0R2R0E7QXhEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXlERUE7QXpEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0EwREFBO0ExRENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTJERUE7QTNEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E0REFBO0E1RENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBQ0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QTZERUE7QTdEQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E4REFBO0E5RENBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0ErREVBO0EvRENBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBZ0VBQTtBaEVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBRkE7QUFUQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBd0JBO0FBQ0E7QUE1QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FpRUVBO0FqRUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QWtFaUJBO0FsRUFBO0FBQ0E7QUFBQTtBQUNBO0FrRUdBO0FsRUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBa0VDQTtBQUNBO0FsRUdBO0FrRUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBbEVBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QWtFQ0E7QUFDQTtBbEVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QWtFQ0E7QWxFQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FrRUNBO0FsRUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUZBO0FBQUE7QUFGQTtBQUZBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUF3QkE7QUFBQTtBQUNBO0FBQUE7QWtFRUE7QWxFQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVZBO0FBcUJBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSEE7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQWRBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQTFGQTtBQURBO0FBekVBO0FBQ0E7QUFEQTtBQTRLQTtBQUNBO0FBQ0E7QUE1TUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QW1FakJBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FuRUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFIQTtBQUlBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFPQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTs7Ozs7O0FvRXZKQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHQTtBQUNBOzs7Ozs7Ozs7OztBQU5BO0FBQ0E7QUFDQTtBN0VDQTtBQUNBO0FBR0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBT0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRkE7QUFLQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFPQTs7OztBQTdLQTtBQUNBO0FBK0tBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBQ0E7QUFZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QThFcE1BO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBOUVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUhBO0FBREE7QUFPQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7O0FBcE1BO0FBQ0E7QUFzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7QStFbE5BO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBL0VDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakJBO0FBa0JBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7OztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7Ozs7QUEzUEE7QUFDQTtBQTZQQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTs7Ozs7Ozs7Ozs7O0FnRjFRQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FoRkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBTkE7QUFRQTtBQVZBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQURBO0FBUUE7QUFDQTtBQWRBO0FBQ0E7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEVBO0FBa0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQVFBO0FBQ0E7QUFGQTtBQVFBO0FBQ0E7QUFGQTtBQXBIQTs7Ozs7Ozs7Ozs7O0FpRm5DQTtBakZDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBa0ZFQTtBbEZDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QW1GQUE7QW5GQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBbEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBb0ZFQTtBcEZDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXFGQUE7QXJGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFBQTtBQVVBO0FBQ0E7QUFDQTtBQWZBO0FBaUJBO0FBQ0E7QUFyQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzRkVBO0F0RkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBdUZBQTtBdkZDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0F3RkVBO0F4RkNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBeUZBQTtBekZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFNQTtBQVZBO0FBWUE7QUFDQTtBQWhCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBMEZFQTtBMUZDQTtBQUNBO0FBQUE7QTBGRUE7QTFGQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQVBBO0FBVUE7QUFDQTtBQWhCQTs7Ozs7Ozs7Ozs7O0EyRkVBO0EzRkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E0RkVBO0E1RkNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0E2RkRBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBTkE7QUFPQTtBN0ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBRkE7QUFVQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBNkZDQTtBN0ZGQTtBQUpBO0FBaUJBO0FBQ0E7QUFDQTtBQUVBO0E2RkNBO0E3RkZBO0FBSkE7QUFpQkE7QUFDQTtBQUNBO0FBRUE7QTZGQ0E7QTdGRkE7QUFKQTtBQWFBO0FBQ0E7QUFDQTtBQUVBO0E2RkNBO0E3RkZBO0FBSkE7QUFDQTtBQWFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBRkE7QUFBQTtBQUNBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBUkE7QUFKQTtBQUFBO0FBQ0E7QUFlQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQWxCQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSkE7QUFEQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFGQTtBQVNBO0FBbEJBO0FBQ0E7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUtBO0FBQ0E7QUFEQTtBQU5BO0FBREE7QUFZQTtBQTdMQTtBQStMQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFqQkE7QUFtQkE7QUExQkE7QUFDQTtBQTRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSkE7QUFEQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSkE7QUFEQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpHQTtBQW1HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUF2Q0E7QUFvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1WUE7Ozs7Ozs7Ozs7OztBOEZ4TEE7QTlGQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBK0ZFQTtBL0ZDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWdHQUE7QWhHQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBTUE7QUFOQTtBQUFBO0FBVUE7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQXJCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWlHRUE7QWpHQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FrR0FBO0FsR0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QW1HRUE7QW5HQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvR0FBO0FwR0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QXFHRUE7QXJHQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FzR0FBO0F0R0NBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFaQTtBQWNBO0FBQ0E7QUFsQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBdUdEQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0F2R0NBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUFMQTtBQWtCQTs7OztBQWpEQTtBQUNBO0FBb0RBO0FBQ0E7QUFDQTtBQUZBOzs7Iiwic291cmNlUm9vdCI6IiJ9