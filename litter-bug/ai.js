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
/******/ 	var hotCurrentHash = "cb6a5afc38ea2ccc586e"; // eslint-disable-line no-unused-vars
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

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _config = __webpack_require__(5);

	var _config2 = _interopRequireDefault(_config);

	var _ = __webpack_require__(6);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(7);

	var _4 = _interopRequireDefault(_3);

	var _title_screen = __webpack_require__(8);

	var _title_screen2 = _interopRequireDefault(_title_screen);

	var _lets_clean_up_screen = __webpack_require__(9);

	var _lets_clean_up_screen2 = _interopRequireDefault(_lets_clean_up_screen);

	var _catch_game_level_one_screen = __webpack_require__(10);

	var _catch_game_level_one_screen2 = _interopRequireDefault(_catch_game_level_one_screen);

	var _catch_game_level_two_screen = __webpack_require__(19);

	var _catch_game_level_two_screen2 = _interopRequireDefault(_catch_game_level_two_screen);

	var _catch_game_level_three_screen = __webpack_require__(20);

	var _catch_game_level_three_screen2 = _interopRequireDefault(_catch_game_level_three_screen);

	var _clean_up_game_lvl1_screen = __webpack_require__(21);

	var _clean_up_game_lvl1_screen2 = _interopRequireDefault(_clean_up_game_lvl1_screen);

	var _clean_up_game_lvl2_screen = __webpack_require__(37);

	var _clean_up_game_lvl2_screen2 = _interopRequireDefault(_clean_up_game_lvl2_screen);

	var _clean_up_game_lvl3_screen = __webpack_require__(38);

	var _clean_up_game_lvl3_screen2 = _interopRequireDefault(_clean_up_game_lvl3_screen);

	var _room_screen = __webpack_require__(39);

	var _room_screen2 = _interopRequireDefault(_room_screen);

	var _school_screen = __webpack_require__(40);

	var _school_screen2 = _interopRequireDefault(_school_screen);

	var _ground_screen = __webpack_require__(41);

	var _ground_screen2 = _interopRequireDefault(_ground_screen);

	var _sing_about_it_screen = __webpack_require__(42);

	var _sing_about_it_screen2 = _interopRequireDefault(_sing_about_it_screen);

	var _video_screen = __webpack_require__(43);

	var _video_screen2 = _interopRequireDefault(_video_screen);

	var _good_for_you_screen = __webpack_require__(44);

	var _good_for_you_screen2 = _interopRequireDefault(_good_for_you_screen);

	var _take_pledge_screen = __webpack_require__(45);

	var _take_pledge_screen2 = _interopRequireDefault(_take_pledge_screen);

	var _commit_screen = __webpack_require__(46);

	var _commit_screen2 = _interopRequireDefault(_commit_screen);

	var _flip_screen = __webpack_require__(47);

	var _flip_screen2 = _interopRequireDefault(_flip_screen);

	var _5 = __webpack_require__(48);

	var _6 = _interopRequireDefault(_5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LitterBug = React.createElement(skoash.Game, {
	    config: _config2.default,
	    screens: [_4.default, _title_screen2.default, _lets_clean_up_screen2.default, _catch_game_level_one_screen2.default, _catch_game_level_two_screen2.default, _catch_game_level_three_screen2.default, _room_screen2.default, _school_screen2.default, _ground_screen2.default, _sing_about_it_screen2.default, _video_screen2.default, _good_for_you_screen2.default, _clean_up_game_lvl1_screen2.default, _clean_up_game_lvl2_screen2.default, _clean_up_game_lvl3_screen2.default, _take_pledge_screen2.default, _commit_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _6.default
	    },
	    loader: React.createElement(_2.default, null),
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'clean-up-game-lvl-1':
	            case 'clean-up-game-lvl-2':
	            case 'clean-up-game-lvl-3':
	                return 1;
	            default:
	                return 0;
	        }
	    },
	    assets: [React.createElement(skoash.Audio, { ref: 'bkg-1', type: 'background', src: 'media/_BKG/S_BKG_1.mp3', loop: true }), React.createElement(skoash.Audio, {
	        ref: 'bkg-2',
	        type: 'background',
	        src: 'media/_assets/_sounds/_effects/GameThemeMusic%202.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: 'media/_Buttons/S_BU_1.mp3' }), React.createElement(skoash.Image, { ref: 'img-bkg-1', className: 'hidden', src: 'media/_BKG/BKG_1.png' }), React.createElement(skoash.Image, { ref: 'img-bkg-2', className: 'hidden', src: 'media/_BKG/BKG_2.png' }), React.createElement(skoash.Image, { ref: 'img-bkg-3', className: 'hidden', src: 'media/_BKG/BKG_3.png' }), React.createElement(skoash.Image, { ref: 'img-bkg-4', className: 'hidden', src: 'media/_assets/_images/BKG.4.jpg' }), React.createElement(skoash.Image, { ref: 'img-bkg-5', className: 'hidden', src: 'media/_BKG/BKG_5.png' }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: 'media/_assets/_images/BKG.3.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: 'media/_assets/_images/BKG.5.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: 'media/_assets/_sprites/sprites.game2.1-01.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: 'media/_assets/_sprites/sprites.game2.2-01.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: 'media/_assets/_sprites/sprites.game2.3-01-min.jpg'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: 'media/_assets/_sprites/sprites.game2.4-01.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: 'media/_assets/_sprites/sprites.mr.eco-01.png'
	    }), React.createElement('div', { className: 'background default' }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background catch-game' }), React.createElement('div', { className: 'background lets-clean-up' }), React.createElement('div', { className: 'background clean-up-game' }), React.createElement('div', { className: 'background select' }), React.createElement('div', { className: 'background sun' }), React.createElement('div', { className: 'background commit' })],
	    passData: function passData(opts) {
	        this.setState(opts);
	    },
	    getClassNames: function getClassNames() {
	        return (0, _classnames2.default)({ 'SUN': this.state.sun });
	    }
	});

	skoash.start(LitterBug);

		if (true) module.hot.accept();

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"id": "litter-bug",
		"version": 2,
		"skoash": "1.1.3",
		"dimensions": {
			"width": 960,
			"height": 540
		}
	};

/***/ },
/* 6 */
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
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    return React.createElement(skoash.Screen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: "title",
	        hidePrev: true,
	        completeDelay: 5000
	    }));
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
	            id: "lets-clean-up"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: "media-sequence" },
	            React.createElement(skoash.Audio, {
	                ref: "vo-1",
	                type: "voiceOver",
	                src: "media/_assets/_sounds/_vos/LitterIsTrash.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                ref: "vo-2",
	                type: "voiceOver",
	                src: "media/_assets/_sounds/_vos/PaperCansBottles.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                ref: "vo-3",
	                type: "voiceOver",
	                src: "media/_assets/_sounds/_vos/LetsCleanUp.mp3"
	            })
	        ),
	        React.createElement(
	            "div",
	            { className: "copy animated" },
	            "Litter is trash",
	            React.createElement("br", null),
	            "Paper, cans, and bottles on the ground",
	            React.createElement("br", null),
	            "make a mess and can hurt wildlife",
	            React.createElement("br", null),
	            "and the environment."
	        ),
	        React.createElement(skoash.Image, {
	            ref: "image",
	            className: "banner animated",
	            src: "media/_assets/_images/lets.clean.up.png"
	        })
	    );
		};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _catch_game_screen_component2.default)(props, ref, key, {
	        id: 'catch-game-level-one',
	        level: 1,
	        rows: 3,
	        timeout: 120000,
	        prepTimeout: 1000,
	        openOnStart: 'instructions',
	        bin: [{
	            className: 'mushroom',
	            message: ''
	        }, {
	            className: 'banana',
	            message: 'trash'
	        }, {
	            className: 'paper',
	            message: 'trash'
	        }, {
	            className: 'dog',
	            message: ''
	        }, {
	            className: 'battery',
	            message: 'trash'
	        }, {
	            className: 'duck',
	            message: ''
	        }, {
	            className: 'squirrel',
	            message: ''
	        }, {
	            className: 'tire',
	            message: 'trash'
	        }, {
	            className: 'blue-flower',
	            message: ''
	        }, {
	            className: 'yellow-flower',
	            message: ''
	        }, {
	            className: 'red-flower',
	            message: ''
	        }, {
	            className: 'purple-flower',
	            message: ''
	        }, {
	            className: 'glass',
	            message: 'trash'
	        }, {
	            className: 'plastic',
	            message: 'trash'
	        }],
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'instructions',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/PickUpLitter.mp3',
	                completeTarget: 'instructions'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_effects/LevelUp.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Congratulations.mp3'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'try-again',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_effects/TryAgain.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_vos/TryAgain.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_vos/YouDidntWin.mp3'
	            })
	        )],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'sfx',
	            ref: 'miss',
	            src: 'media/_assets/_sounds/_effects/LosePoints.mp3',
	            complete: true
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'instructions',
	                className: 'instructions',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'instructions' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    className: (0, _classnames2.default)({
	                        instructionsComplete: _.get(props, 'data.instructions.complete')
	                    }),
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                className: 'level-up',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'congratulations' }),
	                React.createElement('div', { className: 'level-up' })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                className: 'try-again',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'try-again' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _catch_game_screen_component = __webpack_require__(11);

	var _catch_game_screen_component2 = _interopRequireDefault(_catch_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    var onOpenReveal;
	    var onCloseReveal;
	    var onScoreComplete;
	    var onTimerComplete;
	    var onAddClassName;
	    var onTransitionEnd;
	    var onPlaySFX;
	    var onCorrectCatch;
	    var onIncorrectCatch;
	    var onMove;
	    var bin;

	    onOpenReveal = function onOpenReveal() {
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: true,
	                start: false
	            }
	        });
	    };

	    onCloseReveal = function onCloseReveal(prevMessage) {
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: false,
	                start: true
	            }
	        });
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                close: false
	            }
	        });
	        this.updateGameState({
	            path: 'openReveal',
	            data: null
	        });
	        this.updateGameState({
	            path: 'score',
	            data: {
	                correct: 0,
	                incorrect: 0
	            }
	        });

	        if (prevMessage === 'level-up') {
	            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	        }
	    };

	    onScoreComplete = function onScoreComplete() {
	        this.updateGameState({
	            path: 'openReveal',
	            data: 'level-up'
	        });
	        this.updateGameState({
	            path: 'game',
	            data: {
	                complete: true
	            }
	        });
	    };

	    onTimerComplete = function onTimerComplete() {
	        if (_.get(props, 'data.openReveal') === 'level-up') return;
	        this.updateGameState({
	            path: 'openReveal',
	            data: 'try-again'
	        });
	    };

	    onAddClassName = function onAddClassName(className) {
	        if (className === 'go') return;
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'print'
	            }
	        });
	    };

	    onTransitionEnd = function onTransitionEnd(item) {
	        if (_.get(props, 'data.openReveal') || props.gameState.paused || item.props.message !== 'trash' || !item.state.canCatch) return;
	        this.updateGameState({
	            path: 'score',
	            data: {
	                litter: _.get(props, 'data.score.litter', 0) + 1
	            }
	        });
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'miss'
	            }
	        });
	    };

	    onPlaySFX = function onPlaySFX() {
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: null
	            }
	        });
	    };

	    onCorrectCatch = function onCorrectCatch(bucketRef) {
	        bucketRef.addClassName('correct');
	        setTimeout(function () {
	            bucketRef.removeClassName('correct');
	        }, 1000);
	        this.updateGameState({
	            path: 'score',
	            data: {
	                correct: _.get(props, 'data.score.correct', 0) + 1
	            }
	        });
	    };

	    onIncorrectCatch = function onIncorrectCatch(bucketRef) {
	        bucketRef.addClassName('incorrect');
	        setTimeout(function () {
	            bucketRef.removeClassName('incorrect');
	        }, 1000);
	        this.updateGameState({
	            path: 'score',
	            data: {
	                incorrect: _.get(props, 'data.score.incorrect', 0) + 1
	            }
	        });
	    };

	    onMove = function onMove(e) {
	        var rect;
	        var styles;

	        if (e.target !== this.refs.catcher) return;

	        if (e.targetTouches && e.targetTouches[0]) {
	            rect = e.target.getBoundingClientRect();
	            e = e.targetTouches[0];
	            e.offsetY = e.pageY - rect.top;
	        }

	        styles = this.state.styles;

	        styles[0] = {
	            top: Math.min(e.offsetY, 360)
	        };

	        this.setState({
	            styles: styles
	        });
	    };

	    bin = [];
	    for (var i = 0; i < opts.bin.length; i++) {
	        for (var j = 0; j < opts.rows; j++) {
	            bin.push(React.createElement(_11.default, {
	                className: opts.bin[i].className,
	                message: opts.bin[i].message,
	                style: {
	                    top: 400 * (j + .4) / opts.rows
	                }
	            }));
	        }
	    }

	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: opts.id
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.reveal.open'),
	            children: opts.vos
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.sfx.playing'),
	            children: opts.sfx,
	            onPlay: onPlaySFX
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'bottom' },
	            React.createElement(
	                'div',
	                { className: 'level' },
	                opts.level
	            ),
	            React.createElement(
	                skoash.Score,
	                {
	                    className: 'mr-eco-score',
	                    max: 100,
	                    increment: 10,
	                    correct: _.get(props, 'data.score.correct', 0),
	                    incorrect: _.get(props, 'data.score.incorrect', 0),
	                    onComplete: onScoreComplete
	                },
	                React.createElement('div', null)
	            ),
	            React.createElement(
	                skoash.Score,
	                {
	                    className: 'litter-bug-score',
	                    max: 100,
	                    increment: 10,
	                    correct: _.get(props, 'data.score.litter', 0),
	                    complete: _.get(props, 'data.game.complete', false),
	                    onComplete: onTimerComplete
	                },
	                React.createElement('div', null)
	            ),
	            React.createElement(skoash.Timer, {
	                countDown: true,
	                timeout: opts.timeout,
	                stop: _.get(props, 'data.game.complete', false),
	                complete: _.get(props, 'data.game.complete', false),
	                checkComplete: _.get(props, 'data.game.start', false),
	                restart: _.get(props, 'data.game.start', false),
	                onComplete: onTimerComplete
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'main' },
	            React.createElement(_7.default, {
	                leftBound: 70,
	                rightBound: 820,
	                on: _.get(props, 'data.game.start', false),
	                start: _.get(props, 'data.game.start', false),
	                stop: _.get(props, 'data.game.complete', false),
	                prepClasses: ['ready', 'go'],
	                prepTimeout: opts.prepTimeout,
	                onAddClassName: onAddClassName,
	                onTransitionEnd: onTransitionEnd,
	                bin: React.createElement(_5.default, {
	                    completeOnStart: true,
	                    checkComplete: false,
	                    bin: bin,
	                    remain: true
	                })
	            }),
	            React.createElement(_9.default, {
	                completeOnStart: true,
	                checkComplete: false,
	                start: _.get(props, 'data.game.start', false),
	                canCatch: _.get(props, 'data.game.start', false),
	                moveBuckets: true,
	                onMove: onMove,
	                bucket: [React.createElement(skoash.Component, { className: 'mr-eco', message: 'trash' })],
	                catchableRefs: _.get(props, 'data.dropper.refs', []),
	                onCorrect: onCorrectCatch,
	                onIncorrect: onIncorrectCatch,
	                assets: [React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    ref: 'correct',
	                    src: 'media/_assets/_sounds/_effects/WinPoints.mp3'
	                }), React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    ref: 'incorrect',
	                    src: 'media/_assets/_sounds/_effects/LosePoints.mp3'
	                })]
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: opts.openOnStart,
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.openReveal', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            onOpen: onOpenReveal,
	            list: opts.revealList
	        })
	    );
	};

	var _2 = __webpack_require__(12);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(13);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(14);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(17);

	var _9 = _interopRequireDefault(_8);

	var _10 = __webpack_require__(16);

	var _11 = _interopRequireDefault(_10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// As of skoash 1.1.0 this component can be found at skoash.MediaCollection
	/* eslint-disable no-console */
	console.warn('As of skoash 1.1.0 this component can be found at skoash.MediaCollection');
	/* eslint-enable no-console */

	var MediaCollection = function (_skoash$Component) {
	    _inherits(MediaCollection, _skoash$Component);

	    function MediaCollection() {
	        _classCallCheck(this, MediaCollection);

	        return _possibleConstructorReturn(this, (MediaCollection.__proto__ || Object.getPrototypeOf(MediaCollection)).apply(this, arguments));
	    }

	    _createClass(MediaCollection, [{
	        key: 'play',
	        value: function play(ref) {
	            if (this.refs[ref]) {
	                this.refs[ref].play();
	                this.props.onPlay.call(this, ref);
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(MediaCollection.prototype.__proto__ || Object.getPrototypeOf(MediaCollection.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.play && props.play !== this.props.play) {
	                this.play(props.play);
	            }
	        }
	    }]);

	    return MediaCollection;
	}(skoash.Component);

	MediaCollection.defaultProps = _.defaults({
	    onPlay: _.noop
	}, skoash.Component.defaultProps);

		exports.default = MediaCollection;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(15);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(13);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(16);

	var _7 = _interopRequireDefault(_6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropper = function (_Draggable) {
	    _inherits(Dropper, _Draggable);

	    function Dropper() {
	        _classCallCheck(this, Dropper);

	        var _this = _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).call(this));

	        _this.state = _.defaults({
	            items: {},
	            classes: [],
	            itemCount: 0,
	            itemEndXs: {},
	            direction: ''
	        }, _this.state);

	        _this.next = _this.next.bind(_this);
	        return _this;
	    }

	    _createClass(Dropper, [{
	        key: 'next',
	        value: function next(on) {
	            var _this2 = this;

	            var items;
	            var index;
	            var classes = this.state.classes;

	            if (!this.state.started || !this.props.on && !on || this.props.gameState.paused) return;

	            index = this.state.itemCount;
	            items = this.state.items;

	            items[index] = this.refs.bin.get(1)[0];
	            if (typeof this.props.getClassNames === 'function') classes = this.props.getClassNames.call(this);

	            this.setState({
	                items: items,
	                classes: classes,
	                itemCount: index + 1
	            }, function () {
	                var timeoutFunction = function timeoutFunction(i) {
	                    var itemRef;
	                    var itemDOM;
	                    var itemEndXs;
	                    var onTransitionEnd;
	                    itemRef = _this2.refs['items-' + index];
	                    if (itemRef) {
	                        itemRef.addClassName(_this2.props.prepClasses[i]);
	                        _this2.props.onAddClassName.call(_this2, _this2.props.prepClasses[i]);
	                        if (i === _this2.props.prepClasses.length - 1) {
	                            itemEndXs = _this2.state.itemEndXs;
	                            itemEndXs[index] = _this2.state.endX;
	                            onTransitionEnd = function onTransitionEnd() {
	                                items = _this2.state.items;
	                                _this2.props.onTransitionEnd.call(_this2, itemRef);
	                                delete items[index];
	                                _this2.setState({
	                                    items: items,
	                                    itemEndXs: itemEndXs
	                                });
	                            };
	                            itemDOM = ReactDOM.findDOMNode(itemRef);
	                            itemDOM.addEventListener('transitionend', onTransitionEnd);
	                            itemDOM.addEventListener('animationend', onTransitionEnd);
	                        }
	                    }

	                    if (i === _this2.props.prepClasses.length) _this2.next();
	                };

	                var _loop = function _loop(i) {
	                    setTimeout(function () {
	                        timeoutFunction(i);
	                    }, i * _this2.props.prepTimeout);
	                };

	                for (var i = 0; i <= _this2.props.prepClasses.length; i++) {
	                    _loop(i);
	                }

	                _this2.updateGameState({
	                    path: _this2.props.refsTarget,
	                    data: {
	                        refs: _.filter(_this2.refs, function (v, k) {
	                            return !k.indexOf('items-');
	                        })
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'moveEvent',
	        value: function moveEvent(e) {
	            var endX;

	            if (e.targetTouches && e.targetTouches[0]) {
	                e.pageX = e.targetTouches[0].pageX;
	            }

	            endX = Math.min(Math.max(e.pageX - this.state.grabX, this.props.leftBound), this.props.rightBound);

	            this.setState({
	                endX: endX,
	                direction: endX > this.state.endX ? 'right' : 'left'
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.on === true && props.on !== this.props.on) {
	                this.next(true);
	            }
	        }
	    }, {
	        key: 'getItemStyle',
	        value: function getItemStyle(key, style) {
	            var endX;
	            var x;

	            endX = this.state.itemEndXs[key] || this.state.endX;
	            x = (endX - this.state.startX) / this.state.zoom;

	            return _.defaults({
	                transform: 'translateX(' + x + 'px)',
	                WebkitTransform: 'translateX(' + x + 'px)'
	            }, style);
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle() {
	            var x = (this.state.endX - this.state.startX) / this.state.zoom;

	            return {
	                transform: 'translateX(' + x + 'px)',
	                WebkitTransform: 'translateX(' + x + 'px)'
	            };
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('dropper', this.state.direction, _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'getClassNames', this).call(this));
	        }

	        /*
	         * shortid is intentionally not used for key here because we want to make sure
	         * that the element is transitioned and not replaced.
	         */

	    }, {
	        key: 'renderItems',
	        value: function renderItems() {
	            var _this3 = this;

	            return _.map(this.state.items, function (item, key) {
	                var ref = 'items-' + key;
	                if (!item) return null;
	                return React.createElement(item.type, _extends({}, item.props, {
	                    style: _this3.getItemStyle(key, item.props.style),
	                    className: item.props.className + ' ' + (_this3.state.classes ? _this3.state.classes[key] : ''),
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
	                {
	                    className: this.getClassNames()
	                },
	                this.renderBin(),
	                React.createElement(
	                    'div',
	                    {
	                        ref: 'el',
	                        className: 'el',
	                        style: this.getStyle()
	                    },
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
	}(_3.default);

	Dropper.defaultProps = _.defaults({
	    prepClasses: ['ready', 'set', 'go'],
	    prepTimeout: 1000,
	    bin: React.createElement(_5.default, {
	        bin: [React.createElement(_7.default, null)]
	    }),
	    onStart: function onStart() {
	        this.next();
	    },
	    onResume: function onResume() {
	        this.next();
	    },
	    leftBound: 0,
	    rightBound: 800,
	    refsTarget: 'dropper',
	    on: true,
	    onTransitionEnd: _.noop
	}, _3.default.defaultProps);

		exports.default = Dropper;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Draggable = function (_skoash$Component) {
	    _inherits(Draggable, _skoash$Component);

	    function Draggable() {
	        _classCallCheck(this, Draggable);

	        var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

	        _this.state = {
	            startX: 0,
	            startY: 0,
	            endX: 0,
	            endY: 0,
	            zoom: 1
	        };

	        _this.mouseDown = _this.mouseDown.bind(_this);
	        _this.mouseUp = _this.mouseUp.bind(_this);

	        _this.moveEvent = _this.moveEvent.bind(_this);

	        _this.touchStart = _this.touchStart.bind(_this);
	        _this.touchEnd = _this.touchEnd.bind(_this);
	        return _this;
	    }

	    _createClass(Draggable, [{
	        key: 'shouldDrag',
	        value: function shouldDrag() {
	            return true;
	        }
	    }, {
	        key: 'incomplete',
	        value: function incomplete() {
	            this.markIncorrect();
	            this.returnToStart();

	            _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'incomplete', this).call(this);
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
	        }
	    }, {
	        key: 'startEvent',
	        value: function startEvent(e, cb) {
	            var pageX;
	            var pageY;
	            var rect;
	            var startX;
	            var startY;
	            var endX;
	            var endY;
	            var grabX;
	            var grabY;

	            if (e.target !== this.refs.el) return;
	            if (!this.shouldDrag()) return;

	            if (e.targetTouches && e.targetTouches[0]) {
	                pageX = e.targetTouches[0].pageX;
	                pageY = e.targetTouches[0].pageY;
	                rect = e.target.getBoundingClientRect();
	                e = e.targetTouches[0];
	                e.offsetX = pageX - rect.left;
	                e.offsetY = pageY - rect.top;
	            }

	            grabX = e.offsetX;
	            grabY = e.offsetY;

	            startX = endX = e.pageX - grabX;
	            startY = endY = e.pageY - grabY;

	            if (!this.state.firstX) {
	                this.setState({
	                    firstX: startX,
	                    firstY: startY
	                });
	            }

	            if (!this.props.return) {
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

	            if (typeof this.props.dragRespond === 'function') {
	                this.props.dragRespond(this.props.message);
	            }

	            if (typeof cb === 'function') {
	                cb.call(this);
	            }
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
	            if (e.targetTouches && e.targetTouches[0]) {
	                e.pageX = e.targetTouches[0].pageX;
	                e.pageY = e.targetTouches[0].pageY;
	            }

	            this.setState({
	                endX: e.pageX - this.state.grabX,
	                endY: e.pageY - this.state.grabY
	            });
	        }
	    }, {
	        key: 'returnToStart',
	        value: function returnToStart() {
	            if (this.state.firstX) {
	                this.setState({
	                    dragging: false,
	                    return: true,
	                    endX: this.state.firstX,
	                    endY: this.state.firstY
	                });
	            }
	        }
	    }, {
	        key: 'endEvent',
	        value: function endEvent(cb) {
	            this.dropRespond();

	            if (this.props.return) {
	                this.returnToStart();
	            } else {
	                this.setState({
	                    dragging: false,
	                    return: this.state.return
	                });
	            }

	            if (typeof cb === 'function') {
	                cb.call(this);
	            }
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
	        key: 'dropRespond',
	        value: function dropRespond() {
	            var corners;

	            corners = this.setCorners();

	            if (typeof this.props.dropRespond === 'function') {
	                this.props.dropRespond(this.props.message, corners);
	            }
	        }
	    }, {
	        key: 'setCorners',
	        value: function setCorners() {
	            var top;
	            var left;
	            var width;
	            var height;
	            var el;
	            var corners = [];

	            left = 0;
	            top = 0;
	            el = this.refs.el;
	            width = el.offsetWidth;
	            height = el.offsetHeight;

	            while (el) {
	                if (el.className.indexOf('screen') !== -1) {
	                    break;
	                }

	                left += el.offsetLeft || 0;
	                top += el.offsetTop || 0;
	                el = el.offsetParent;
	            }

	            left += (this.state.endX - this.state.startX) / this.state.zoom;
	            top += (this.state.endY - this.state.startY) / this.state.zoom;

	            for (var i = 0; i < 4; i++) {
	                corners.push({
	                    x: left + width * (i === 1 || i === 2 ? 1 : 0),
	                    y: top + height * (i > 1 ? 1 : 0)
	                });
	            }

	            this.setState({
	                corners: corners
	            });

	            return corners;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.bootstrap();
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'bootstrap', this).call(this);

	            this.setZoom();

	            this.refs.el.addEventListener('mousedown', this.mouseDown);
	            this.refs.el.addEventListener('touchstart', this.touchStart);

	            window.addEventListener('resize', this.setZoom.bind(this));
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
	            var x;
	            var y;

	            x = (this.state.endX - this.state.startX) / this.state.zoom;
	            y = (this.state.endY - this.state.startY) / this.state.zoom;

	            return {
	                transform: 'translateX(' + x + 'px) translateY(' + y + 'px)',
	                WebkitTransform: 'translateX(' + x + 'px) translateY(' + y + 'px)'
	            };
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            var _classNames;

	            return (0, _classnames2.default)((_classNames = {
	                draggable: true
	            }, _defineProperty(_classNames, this.props.className, this.props.className), _defineProperty(_classNames, this.props.message, this.props.message), _defineProperty(_classNames, 'DRAGGING', this.state.dragging), _defineProperty(_classNames, 'RETURN', this.state.return), _defineProperty(_classNames, 'CORRECT', this.state.correct), _classNames), _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                {
	                    ref: 'el',
	                    className: this.getClassNames(),
	                    style: this.getStyle()
	                },
	                this.renderContentList()
	            );
	        }
	    }]);

	    return Draggable;
	}(skoash.Component);

		exports.default = Draggable;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catchable = function (_skoash$Component) {
	    _inherits(Catchable, _skoash$Component);

	    function Catchable() {
	        _classCallCheck(this, Catchable);

	        var _this = _possibleConstructorReturn(this, (Catchable.__proto__ || Object.getPrototypeOf(Catchable)).call(this));

	        _this.state = {
	            canCatch: true
	        };
	        _this.reset = _this.reset.bind(_this);
	        return _this;
	    }

	    _createClass(Catchable, [{
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
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('li', _extends({}, this.props, { className: this.getClassNames() }));
	        }
	    }]);

	    return Catchable;
	}(skoash.Component);

	Catchable.defaultProps = _.defaults({
	    disabled: false,
	    isCorrect: true,
	    reCatchable: true,
	    onCaught: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Catchable;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(18);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catcher = function (_Catch) {
	    _inherits(Catcher, _Catch);

	    function Catcher(props) {
	        _classCallCheck(this, Catcher);

	        var _this = _possibleConstructorReturn(this, (Catcher.__proto__ || Object.getPrototypeOf(Catcher)).call(this, props));

	        _this.state = _.defaults({
	            styles: []
	        }, _this.state);

	        _this.moveEvent = _this.moveEvent.bind(_this);
	        return _this;
	    }

	    _createClass(Catcher, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            skoash.Component.prototype.bootstrap.call(this);
	            window.addEventListener('resize', this.onResize);
	            this.onResize();

	            if (this.props.moveBuckets) {
	                window.addEventListener('mousemove', this.moveEvent);
	                window.addEventListener('touchmove', this.moveEvent);
	            }
	        }
	    }, {
	        key: 'moveEvent',
	        value: function moveEvent(e) {
	            this.props.onMove.call(this, e);
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

	            if (!this.state.started || this.state.paused) return;
	            _.each(this.bucketNodes, function (bucketNode, bucketRefKey) {
	                var bucketRect = bucketNode.getBoundingClientRect();
	                _.each(_this3.props.catchableRefs, function (catchableRef) {
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
	            var bucketCorners = [];
	            var catchableCorners = [];

	            for (var i = 0; i < 4; i++) {
	                bucketCorners.push({
	                    x: bucketRect.left + bucketRect.width * (i === 1 || i === 2 ? 1 : 0),
	                    y: bucketRect.top + bucketRect.height * (i > 1 ? 1 : 0)
	                });
	            }

	            for (var _i = 0; _i < 4; _i++) {
	                catchableCorners.push({
	                    x: catchRect.left + catchRect.width * (_i === 1 || _i === 2 ? 1 : 0),
	                    y: catchRect.top + catchRect.height * (_i > 1 ? 1 : 0)
	                });
	            }

	            return skoash.util.doIntersect(bucketCorners, catchableCorners);
	        }
	    }, {
	        key: 'selectCatchable',
	        value: function selectCatchable(bucketRef, catchableRef) {
	            if (!this.state.started || this.state.paused || !this.state.canCatch || !this.props.canCatch || !catchableRef.canCatch()) return;
	            catchableRef.markCaught();
	            if (catchableRef.props.message === bucketRef.props.message) {
	                this.correct(bucketRef, catchableRef);
	            } else {
	                this.incorrect(bucketRef, catchableRef);
	            }
	        }
	    }, {
	        key: 'correct',
	        value: function correct(bucketRef, catchableRef) {
	            this.playMedia('correct');
	            this.props.onCorrect.call(this, bucketRef, catchableRef);
	        }
	    }, {
	        key: 'incorrect',
	        value: function incorrect(bucketRef, catchableRef) {
	            this.playMedia('incorrect');
	            this.props.onIncorrect.call(this, bucketRef, catchableRef);
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('catcher', _get(Catcher.prototype.__proto__ || Object.getPrototypeOf(Catcher.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'renderBucket',
	        value: function renderBucket() {
	            var _this4 = this;

	            return _.map([].concat(this.props.bucket), function (bucket, key) {
	                return React.createElement(bucket.type, _extends({}, bucket.props, {
	                    ref: 'buckets-' + key,
	                    style: _this4.state.styles[key],
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { ref: 'catcher', className: this.getClassNames() },
	                this.renderContentList('assets'),
	                this.renderBucket()
	            );
	        }
	    }]);

	    return Catcher;
	}(_3.default);

	Catcher.defaultProps = _.defaults({
	    moveBuckets: false,
	    onMove: _.noop,
	    canCatch: true
	}, skoash.Component.defaultProps);

		exports.default = Catcher;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(16);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Catch = function (_skoash$Component) {
	    _inherits(Catch, _skoash$Component);

	    function Catch() {
	        _classCallCheck(this, Catch);

	        var _this = _possibleConstructorReturn(this, (Catch.__proto__ || Object.getPrototypeOf(Catch)).call(this));

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _catch_game_screen_component2.default)(props, ref, key, {
	        id: 'catch-game-level-two',
	        level: 2,
	        rows: 4,
	        timeout: 120000,
	        prepTimeout: 500,
	        bin: [{
	            className: 'mushroom',
	            message: ''
	        }, {
	            className: 'banana',
	            message: 'trash'
	        }, {
	            className: 'paper',
	            message: 'trash'
	        }, {
	            className: 'dog',
	            message: ''
	        }, {
	            className: 'battery',
	            message: 'trash'
	        }, {
	            className: 'duck',
	            message: ''
	        }, {
	            className: 'squirrel',
	            message: ''
	        }, {
	            className: 'tire',
	            message: 'trash'
	        }, {
	            className: 'blue-flower',
	            message: ''
	        }, {
	            className: 'yellow-flower',
	            message: ''
	        }, {
	            className: 'red-flower',
	            message: ''
	        }, {
	            className: 'purple-flower',
	            message: ''
	        }, {
	            className: 'glass',
	            message: 'trash'
	        }, {
	            className: 'plastic',
	            message: 'trash'
	        }],
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_effects/LevelUp.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Congratulations.mp3'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'try-again',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_effects/TryAgain.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_vos/TryAgain.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_vos/YouDidntWin.mp3'
	            })
	        )],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'sfx',
	            ref: 'miss',
	            src: 'media/_assets/_sounds/_effects/LosePoints.mp3',
	            complete: true
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                className: 'level-up',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'congratulations' }),
	                React.createElement('div', { className: 'level-up' })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                className: 'try-again',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'try-again' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};

	var _catch_game_screen_component = __webpack_require__(11);

	var _catch_game_screen_component2 = _interopRequireDefault(_catch_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _catch_game_screen_component2.default)(props, ref, key, {
	        id: 'catch-game-level-three',
	        level: 3,
	        rows: 5,
	        timeout: 120000,
	        prepTimeout: 400,
	        bin: [{
	            className: 'mushroom',
	            message: ''
	        }, {
	            className: 'banana',
	            message: 'trash'
	        }, {
	            className: 'paper',
	            message: 'trash'
	        }, {
	            className: 'dog',
	            message: ''
	        }, {
	            className: 'battery',
	            message: 'trash'
	        }, {
	            className: 'duck',
	            message: ''
	        }, {
	            className: 'squirrel',
	            message: ''
	        }, {
	            className: 'tire',
	            message: 'trash'
	        }, {
	            className: 'blue-flower',
	            message: ''
	        }, {
	            className: 'yellow-flower',
	            message: ''
	        }, {
	            className: 'red-flower',
	            message: ''
	        }, {
	            className: 'purple-flower',
	            message: ''
	        }, {
	            className: 'glass',
	            message: 'trash'
	        }, {
	            className: 'plastic',
	            message: 'trash'
	        }],
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_effects/WinTheGame1.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/YouveWon.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/YouvePickedUp.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                playTarget: 'fall',
	                src: 'media/_assets/_sounds/_effects/Litterbugfall.mp3'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'try-again',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_effects/TryAgain.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_vos/TryAgain.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: 'media/_assets/_sounds/_vos/YouDidntWin.mp3'
	            })
	        )],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'sfx',
	            ref: 'miss',
	            src: 'media/_assets/_sounds/_effects/LosePoints.mp3',
	            complete: true
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                className: (0, _classnames2.default)('level-up', 'youve-won', {
	                    fall: _.get(props, 'data.fall.playing')
	                }),
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: 'media/_assets/_images/litterbug_.png'
	            }),
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'congratulations' }),
	                React.createElement('div', { className: 'level-up' })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                className: 'try-again',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'try-again' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _catch_game_screen_component = __webpack_require__(11);

	var _catch_game_screen_component2 = _interopRequireDefault(_catch_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 21 */
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
	            id: 'clean-up-game-lvl-1'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: 'instructions' },
	            React.createElement(skoash.Audio, {
	                ref: 'vo-1',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-2',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/TossLitter.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-3',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Get100.mp3',
	                completeTarget: 'instructions'
	            })
	        ),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.reveal.play', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: null
	                        }
	                    });

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
	                { ref: 'complete', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-1',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/Level1.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-2',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/Wow.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-3',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/YouHaveGreat.mp3'
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'try-again', silentOnStart: true, complete: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-4',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/LevelLost.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-5',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/OhNo.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-6',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/ParkStill.mp3',
	                    complete: true
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'throw', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-7',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_effects/FastSwish.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-8',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_effects/WinPoints.mp3'
	                })
	            )
	        ),
	        React.createElement(_5.default, {
	            ref: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            className: (0, _classnames2.default)({
	                instructionsComplete: _.get(props, 'data.instructions.complete')
	            }),
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
	                { 'data-ref': 'instructions' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame instructions-lvl-1' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Toss the litter in the cans to',
	                        React.createElement('br', null),
	                        'clean up by clicking, aiming,',
	                        React.createElement('br', null),
	                        'and letting go!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Get'
	                    ),
	                    React.createElement('div', { className: 'hundred' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'points before the time'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'runs out to win!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'complete' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame complete-lvl-1' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'You have some great cleaning skills!',
	                        React.createElement('br', null),
	                        'Keep up the good work!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'try-again' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is still covered with trash',
	                        React.createElement('br', null),
	                        'but you still have a chance to clean',
	                        React.createElement('br', null),
	                        'and beat the Litterbug!'
	                    )
	                )
	            )]
	        }),
	        React.createElement(_7.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 5,
	            targetIndex: 2,
	            selected: _.get(props, 'data.cannon.fire'),
	            onSelect: function onSelect(target) {
	                var score = _.get(props, 'data.score.points', 0);
	                var classes = this.state.classes;
	                classes[target.props['data-key']] = 'SELECTED';

	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });

	                if (score < CONFIG.POINTS) score += target.props.value;

	                this.updateGameState({
	                    path: 'score',
	                    data: {
	                        points: score
	                    }
	                });

	                if (score >= CONFIG.POINTS & !_.get(props, 'data.game.complete')) {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'complete'
	                        }
	                    });

	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: 'complete'
	                        }
	                    });

	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            complete: true
	                        }
	                    });
	                }
	            },
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'five', name: 'five', value: 5, complete: true }), React.createElement(skoash.Component, { className: 'ten', name: 'ten', value: 10, complete: true }), React.createElement(skoash.Component, { className: 'twenty', name: 'twenty', value: 20, complete: true }), React.createElement(skoash.Component, { className: 'thirty', name: 'thirty', value: 30, complete: true })]
	            })
	        }),
	        React.createElement(_9.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            showNum: 4,
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'plastic-bottle', complete: true }), React.createElement(skoash.Component, { className: 'soda-can', complete: true }), React.createElement(skoash.Component, { className: 'banana-peal', complete: true }), React.createElement(skoash.Component, { className: 'glass-bottle', complete: true }), React.createElement(skoash.Component, { className: 'crumbled-paper', complete: true }), React.createElement(skoash.Component, { className: 'tuna-can', complete: true }), React.createElement(skoash.Component, { className: 'tire', complete: true }), React.createElement(skoash.Component, { className: 'battery', complete: true })]
	            }),
	            onFire: function onFire() {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        play: 'throw'
	                    }
	                });
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: false
	                    }
	                });
	            },
	            onReload: function onReload() {
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: true
	                    }
	                });
	            }
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'grass' },
	            React.createElement(
	                skoash.Component,
	                { className: 'stats' },
	                React.createElement(
	                    'span',
	                    { className: 'level' },
	                    CONFIG.LVL
	                ),
	                React.createElement(_13.default, {
	                    ref: 'timer',
	                    countDown: true,
	                    timeout: CONFIG.TIMER,
	                    stop: _.get(props, 'data.game.complete', false),
	                    complete: _.get(props, 'data.game.complete', false),
	                    checkComplete: _.get(props, 'data.game.start', false),
	                    restart: _.get(props, 'data.game.start', false),
	                    onComplete: function onComplete() {
	                        if (_.get(props, 'data.reveal.open')) return;
	                        if (_.get(props, 'data.score.points', 0) < CONFIG.POINTS) {
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    open: 'try-again'
	                                }
	                            });

	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    play: 'try-again'
	                                }
	                            });

	                            this.updateGameState({
	                                path: 'score',
	                                data: {
	                                    points: 0
	                                }
	                            });
	                        }
	                    }
	                }),
	                React.createElement(_15.default, {
	                    ref: 'score',
	                    max: CONFIG.POINTS,
	                    correct: _.get(props, 'data.score.points', 0),
	                    checkComplete: false,
	                    complete: _.get(props, 'data.score.points', 0) === CONFIG.POINTS
	                })
	            )
	        )
	    );
	};

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(12);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(22);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(23);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(34);

	var _9 = _interopRequireDefault(_8);

	var _10 = __webpack_require__(13);

	var _11 = _interopRequireDefault(_10);

	var _12 = __webpack_require__(35);

	var _13 = _interopRequireDefault(_12);

	var _14 = __webpack_require__(36);

	var _15 = _interopRequireDefault(_14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CONFIG = {
	    LVL: 1,
	    POINTS: 100,
	    TIMER: 30000
		};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RevealPrompt = function (_skoash$Component) {
	    _inherits(RevealPrompt, _skoash$Component);

	    function RevealPrompt() {
	        _classCallCheck(this, RevealPrompt);

	        var _this = _possibleConstructorReturn(this, (RevealPrompt.__proto__ || Object.getPrototypeOf(RevealPrompt)).call(this));

	        _this.state = {
	            openReveal: ''
	        };

	        _this.index = 0;
	        return _this;
	    }

	    _createClass(RevealPrompt, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            _get(RevealPrompt.prototype.__proto__ || Object.getPrototypeOf(RevealPrompt.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

	            if (nextProps.openReveal && nextProps.openReveal !== this.props.openReveal) {
	                this.open(nextProps.openReveal);
	            }

	            if (nextProps.closeReveal === true && nextProps.closeReveal !== this.props.closeReveal) {
	                this.close();
	            }
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(RevealPrompt.prototype.__proto__ || Object.getPrototypeOf(RevealPrompt.prototype), 'start', this).call(this);

	            if (this.props.openOnStart) {
	                this.open(this.props.openOnStart);
	            } else {
	                this.close();
	            }
	        }
	    }, {
	        key: 'open',
	        value: function open(message) {
	            var self = this;
	            self.setState({
	                open: true,
	                openReveal: '' + message
	            });

	            self.props.onOpen.call(self, message);

	            if (self.props.completeOnOpen) {
	                self.complete();
	            } else {
	                _.each(self.refs, function (ref, key) {
	                    if (ref && key === message) ref.complete();
	                });
	            }

	            if (self.props.autoClose) {
	                setTimeout(function () {
	                    self.close();
	                }, 2000);
	            }
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            var prevMessage = this.state.openReveal;

	            this.props.onClose.call(this, prevMessage);

	            this.setState({
	                open: false,
	                openReveal: ''
	            });
	        }
	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            var _this2 = this;

	            return this.props.list.map(function (li, key) {
	                var ref = li.ref == null ? key : li.ref;
	                return React.createElement(li.type, _extends({}, li.props, {
	                    type: 'li',
	                    className: _this2.getClass(li, key),
	                    'data-ref': ref,
	                    ref: ref,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(li, key) {
	            var _ClassNames;

	            return (0, _classnames2.default)((_ClassNames = {}, _defineProperty(_ClassNames, li.props.className, li.props.className), _defineProperty(_ClassNames, 'OPEN', this.state.openReveal.indexOf(key) !== -1 || this.state.openReveal.indexOf(li.props['data-ref']) !== -1 || this.state.openReveal.indexOf(li.ref) !== -1), _ClassNames));
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            var _ClassNames2;

	            return (0, _classnames2.default)(_get(RevealPrompt.prototype.__proto__ || Object.getPrototypeOf(RevealPrompt.prototype), 'getClassNames', this).call(this), 'reveal', (_ClassNames2 = {}, _defineProperty(_ClassNames2, 'open-' + this.state.openReveal, this.state.openReveal), _defineProperty(_ClassNames2, 'open-none', !this.state.openReveal), _ClassNames2));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'ul',
	                        null,
	                        this.renderList()
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: this.close.bind(this) })
	                )
	            );
	        }
	    }]);

	    return RevealPrompt;
	}(skoash.Component);

	exports.default = RevealPrompt;


	RevealPrompt.defaultProps = _.defaults({
	    list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
	    onOpen: _.noop,
	    onClose: _.noop,
	    closeDelay: 0
		}, skoash.Component.defaultProps);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid = __webpack_require__(24);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _2 = __webpack_require__(33);

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

	            var classes;
	            var list;
	            classes = this.state.classes;
	            list = this.state.list;
	            list = list.concat(this.refs.bin.get(1));
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(25);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(26);
	var encode = __webpack_require__(28);
	var decode = __webpack_require__(30);
	var isValid = __webpack_require__(31);

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
	var clusterWorkerId = __webpack_require__(32) || 0;

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(27);

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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(29);

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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(26);

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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(26);

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
/* 32 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

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

	            this.setState({
	                fire: true,
	                reload: false
	            }, function () {
	                setTimeout(function () {
	                    _this2.reload();
	                    _this2.next();
	                }, _this2.props.reloadTime);
	            });

	            this.props.onFire.call(this);
	        }
	    }, {
	        key: 'reload',
	        value: function reload() {
	            this.setState({
	                fire: false,
	                reload: true
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
	    onReload: _.noop,
	    onFire: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Cannon;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// As of skoash 1.1.0 this component can be found at skoash.Timer
	/* eslint-disable no-console */
	console.warn('As of skoash 1.1.0 this component can be found at skoash.Timer');
	/* eslint-enable no-console */

	var Timer = function (_skoash$Component) {
	    _inherits(Timer, _skoash$Component);

	    function Timer() {
	        _classCallCheck(this, Timer);

	        var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this));

	        _this.state = {
	            time: 0,
	            stamp: 0
	        };

	        _this.checkComplete = _this.checkComplete.bind(_this);
	        return _this;
	    }

	    _createClass(Timer, [{
	        key: 'checkComplete',
	        value: function checkComplete() {
	            var _this2 = this;

	            var time = Date.now();

	            if (!this.props.checkComplete) return;

	            if (!this.state.started || this.state.paused) return;

	            if (time >= this.state.stamp) {
	                this.setState({
	                    stamp: time + 1000,
	                    time: this.state.time + 1000
	                }, function () {
	                    if (_this2.state.time >= _this2.props.timeout) {
	                        _this2.complete();
	                        _this2.stop();
	                    } else {
	                        if (typeof _this2.props.onCheckComplete === 'function') {
	                            _this2.props.onCheckComplete.call(_this2);
	                        }
	                        window.requestAnimationFrame(_this2.checkComplete);
	                    }
	                });
	            } else {
	                window.requestAnimationFrame(this.checkComplete);
	            }
	        }
	    }, {
	        key: 'incompleteRefs',
	        value: function incompleteRefs() {
	            this.restart();
	        }
	    }, {
	        key: 'restart',
	        value: function restart() {
	            var _this3 = this;

	            if (!this.state.ready) return;
	            if (this.state.complete) this.incomplete();

	            this.setState({
	                time: 0,
	                stamp: 0
	            }, function () {
	                if (_this3.state.started) {
	                    _this3.checkComplete();
	                } else {
	                    _this3.start();
	                }
	            });
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (!this.state.started) return;
	            this.setState({
	                started: false
	            });
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            if (!this.state.started) return;
	            this.setState({
	                paused: true
	            });
	        }
	    }, {
	        key: 'resume',
	        value: function resume() {
	            var _this4 = this;

	            if (!this.state.paused) return;
	            this.setState({
	                paused: false
	            }, function () {
	                if (_this4.state.started) {
	                    _this4.checkComplete();
	                } else {
	                    _this4.start();
	                }
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Timer.prototype.__proto__ || Object.getPrototypeOf(Timer.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.restart && props.restart !== this.props.restart) {
	                this.restart();
	            }
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('timer', _get(Timer.prototype.__proto__ || Object.getPrototypeOf(Timer.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var time = this.props.getTime.call(this);
	            return React.createElement(
	                'div',
	                _extends({}, this.props, { className: this.getClassNames(), time: time }),
	                this.props.leadingContent,
	                React.createElement(
	                    'span',
	                    null,
	                    time
	                ),
	                this.props.children
	            );
	        }
	    }]);

	    return Timer;
	}(skoash.Component);

	Timer.defaultProps = _.defaults({
	    getTime: function getTime() {
	        return moment(this.props.countDown ? this.props.timeout - this.state.time : this.state.time).format(this.props.format);
	    },
	    format: 'm:ss',
	    leadingContent: '',
	    timeout: 60000,
	    countDown: false
	}, skoash.Component.defaultProps);

		exports.default = Timer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// As of skoash 1.1.0 this component can be found at skoash.Score
	/* eslint-disable no-console */
	console.warn('As of skoash 1.1.0 this component can be found at skoash.Score');
	/* eslint-enable no-console */

	var Score = function (_skoash$Component) {
	    _inherits(Score, _skoash$Component);

	    function Score() {
	        _classCallCheck(this, Score);

	        var _this = _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).call(this));

	        _this.state = {
	            score: 0
	        };

	        _this.checkComplete = _this.checkComplete.bind(_this);
	        return _this;
	    }

	    _createClass(Score, [{
	        key: 'checkComplete',
	        value: function checkComplete() {
	            if (!this.props.checkComplete || !this.state.ready) return;
	            if (!this.props.max) return;
	            if ((this.state.score >= this.props.max || this.props.correct >= this.props.max) && !this.state.complete) this.complete();
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'bootstrap', this).call(this);

	            this.setState({
	                score: this.props.startingScore
	            });
	        }
	    }, {
	        key: 'complete',
	        value: function complete() {
	            var _this2 = this;

	            _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'complete', this).call(this);

	            setTimeout(function () {
	                if (_this2.props.resetOnComplete) {
	                    _this2.setScore({
	                        correct: 0,
	                        incorrect: 0
	                    });
	                }
	            }, this.props.completeDelay);
	        }
	    }, {
	        key: 'checkScore',
	        value: function checkScore(props) {
	            if (!props.max) return;
	            if (this.state.score >= props.max && (!this.state.complete || props.multipleCompletes)) {
	                this.complete();
	            } else if (this.state.complete && !props.complete) {
	                this.incomplete();
	            }
	        }
	    }, {
	        key: 'up',
	        value: function up(increment) {
	            increment = _.isFinite(increment) ? increment : _.isFinite(this.props.increment) ? this.props.increment : 1;
	            if (!_.isFinite(increment)) throw 'increment must be finite';

	            this.updateScore(increment);
	        }
	    }, {
	        key: 'down',
	        value: function down(increment) {
	            increment = _.isFinite(increment) ? increment : _.isFinite(this.props.downIncrement) ? this.props.downIncrement : _.isFinite(this.props.increment) ? this.props.increment : 1;
	            if (!_.isFinite(increment)) throw 'increment must be finite';

	            this.updateScore(-1 * increment);
	        }
	    }, {
	        key: 'updateScore',
	        value: function updateScore(increment) {
	            var _this3 = this;

	            this.setState({
	                score: this.state.score + increment
	            }, function () {
	                _this3.updateGameState({
	                    path: _this3.props.dataTarget,
	                    data: {
	                        score: _this3.state.score
	                    }
	                });

	                _this3.checkScore(_this3.props);
	                _this3.props.onUpdateScore.call(_this3, _this3.state.score);
	            });
	        }
	    }, {
	        key: 'setScore',
	        value: function setScore(props) {
	            var _this4 = this;

	            var upIncrement;
	            var downIncrement;
	            var score;

	            if (_.isFinite(props)) {
	                score = props;
	            } else {
	                upIncrement = _.isFinite(props.increment) ? props.increment : 1;
	                downIncrement = _.isFinite(props.downIncrement) ? props.downIncrement : _.isFinite(props.increment) ? props.increment : 1;
	                score = upIncrement * props.correct - downIncrement * props.incorrect;
	            }

	            this.setState({
	                score: score
	            }, function () {
	                _this4.checkScore(props);
	                _this4.props.onUpdateScore.call(_this4, score);
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'componentWillReceiveProps', this).call(this, props);

	            if (props.correct !== this.props.correct || props.incorrect !== this.props.incorrect) {
	                this.setScore(props);
	            }
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('score', 'score-' + this.state.score, _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                _extends({}, this.props, {
	                    className: this.getClassNames(),
	                    'data-max': this.props.max,
	                    'data-score': this.state.score,
	                    score: this.state.score
	                }),
	                this.props.leadingContent,
	                React.createElement(
	                    'span',
	                    null,
	                    this.state.score
	                ),
	                this.props.children
	            );
	        }
	    }]);

	    return Score;
	}(skoash.Component);

	Score.defaultProps = _.defaults({
	    checkComplete: false,
	    startingScore: 0,
	    correct: 0,
	    incorrect: 0,
	    onUpdateScore: _.noop
	}, skoash.Component.defaultProps);

		exports.default = Score;

/***/ },
/* 37 */
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
	            id: 'clean-up-game-lvl-2'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: 'instructions' },
	            React.createElement(skoash.Audio, {
	                ref: 'vo-1',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-2',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/TossLitter.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-3',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Get150.mp3',
	                completeTarget: 'instructions'
	            })
	        ),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.reveal.play', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: null
	                        }
	                    });

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
	                { ref: 'complete', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-4',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/Level2.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-5',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/AmazingJob.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-6',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/ThankYouCaring.mp3'
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'try-again', silentOnStart: true, complete: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-7',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/LevelLost.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-8',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/OhNo.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-9',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/ParkStill.mp3',
	                    complete: true
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'throw', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-10',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_effects/FastSwish.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-11',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_effects/WinPoints.mp3'
	                })
	            )
	        ),
	        React.createElement(_5.default, {
	            ref: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            className: (0, _classnames2.default)({
	                instructionsComplete: _.get(props, 'data.instructions.complete')
	            }),
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
	                { 'data-ref': 'instructions' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame instructions-lvl-2' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Toss the litter in the cans to',
	                        React.createElement('br', null),
	                        'clean up by clicking, aiming,',
	                        React.createElement('br', null),
	                        'and letting go!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Get'
	                    ),
	                    React.createElement('div', { className: 'hundred' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'points before the time'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'runs out to win!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'complete' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame complete-lvl-2' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Thank you for caring so much',
	                        React.createElement('br', null),
	                        'about the environment!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'try-again' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is still covered with trash',
	                        React.createElement('br', null),
	                        'but you still have a chance to clean',
	                        React.createElement('br', null),
	                        'and beat the Litterbug!'
	                    )
	                )
	            )]
	        }),
	        React.createElement(_7.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 5,
	            targetIndex: 2,
	            selected: _.get(props, 'data.cannon.fire'),
	            onSelect: function onSelect(target) {
	                var score = _.get(props, 'data.score.points', 0);
	                var classes = this.state.classes;
	                classes[target.props['data-key']] = 'SELECTED';

	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });

	                if (score < CONFIG.POINTS) score += target.props.value;

	                this.updateGameState({
	                    path: 'score',
	                    data: {
	                        points: score
	                    }
	                });

	                if (score >= CONFIG.POINTS & !_.get(props, 'data.game.complete')) {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'complete'
	                        }
	                    });

	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: 'complete'
	                        }
	                    });

	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            complete: true
	                        }
	                    });
	                }
	            },
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'five', name: 'five', value: 5, complete: true }), React.createElement(skoash.Component, { className: 'ten', name: 'ten', value: 10, complete: true }), React.createElement(skoash.Component, { className: 'twenty', name: 'twenty', value: 20, complete: true }), React.createElement(skoash.Component, { className: 'thirty', name: 'thirty', value: 30, complete: true })]
	            })
	        }),
	        React.createElement(_9.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            showNum: 4,
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'plastic-bottle', complete: true }), React.createElement(skoash.Component, { className: 'soda-can', complete: true }), React.createElement(skoash.Component, { className: 'banana-peal', complete: true }), React.createElement(skoash.Component, { className: 'glass-bottle', complete: true }), React.createElement(skoash.Component, { className: 'crumbled-paper', complete: true }), React.createElement(skoash.Component, { className: 'tuna-can', complete: true }), React.createElement(skoash.Component, { className: 'tire', complete: true }), React.createElement(skoash.Component, { className: 'battery', complete: true })]
	            }),
	            onFire: function onFire() {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        play: 'throw'
	                    }
	                });
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: false
	                    }
	                });
	            },
	            onReload: function onReload() {
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: true
	                    }
	                });
	            }
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'grass' },
	            React.createElement(
	                skoash.Component,
	                { className: 'stats' },
	                React.createElement(
	                    'span',
	                    { className: 'level' },
	                    CONFIG.LVL
	                ),
	                React.createElement(_13.default, {
	                    ref: 'timer',
	                    countDown: true,
	                    timeout: CONFIG.TIMER,
	                    stop: _.get(props, 'data.game.complete', false),
	                    complete: _.get(props, 'data.game.complete', false),
	                    checkComplete: _.get(props, 'data.game.start', false),
	                    restart: _.get(props, 'data.game.start', false),
	                    onComplete: function onComplete() {
	                        if (_.get(props, 'data.reveal.open')) return;
	                        if (_.get(props, 'data.score.points', 0) < CONFIG.POINTS) {
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    open: 'try-again'
	                                }
	                            });

	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    play: 'try-again'
	                                }
	                            });

	                            this.updateGameState({
	                                path: 'score',
	                                data: {
	                                    points: 0
	                                }
	                            });
	                        }
	                    }
	                }),
	                React.createElement(_15.default, {
	                    ref: 'score',
	                    max: CONFIG.POINTS,
	                    correct: _.get(props, 'data.score.points', 0),
	                    checkComplete: false,
	                    complete: _.get(props, 'data.score.points', 0) === CONFIG.POINTS
	                })
	            )
	        )
	    );
	};

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(12);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(22);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(23);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(34);

	var _9 = _interopRequireDefault(_8);

	var _10 = __webpack_require__(13);

	var _11 = _interopRequireDefault(_10);

	var _12 = __webpack_require__(35);

	var _13 = _interopRequireDefault(_12);

	var _14 = __webpack_require__(36);

	var _15 = _interopRequireDefault(_14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CONFIG = {
	    LVL: 2,
	    POINTS: 150,
	    TIMER: 45000
		};

/***/ },
/* 38 */
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
	            id: 'clean-up-game-lvl-3'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: 'instructions' },
	            React.createElement(skoash.Audio, {
	                ref: 'vo-1',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-2',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/TossLitter.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-3',
	                type: 'voiceOver',
	                src: 'media/_assets/_sounds/_vos/Get200.mp3',
	                completeTarget: 'instructions'
	            })
	        ),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.reveal.play', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: null
	                        }
	                    });

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
	                { ref: 'complete', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-4',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/Level3.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-5',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/ParkClean.mp3'
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'try-again', silentOnStart: true, complete: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-6',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/LevelLost.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-7',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/OhNo.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-8',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_vos/ParkStill.mp3',
	                    complete: true
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'throw', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-9',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_effects/FastSwish.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-10',
	                    type: 'voiceOver',
	                    src: 'media/_assets/_sounds/_effects/WinPoints.mp3'
	                })
	            )
	        ),
	        React.createElement(_5.default, {
	            ref: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            className: (0, _classnames2.default)({
	                instructionsComplete: _.get(props, 'data.instructions.complete')
	            }),
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
	                { 'data-ref': 'instructions' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame instructions-lvl-3' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Toss the litter in the cans to',
	                        React.createElement('br', null),
	                        'clean up by clicking, aiming,',
	                        React.createElement('br', null),
	                        'and letting go!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Get'
	                    ),
	                    React.createElement('div', { className: 'hundred' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'points before the time'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'runs out to win!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'complete' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame complete-lvl-3' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is now clean',
	                        React.createElement('br', null),
	                        'You are an'
	                    ),
	                    React.createElement('div', { className: 'banner-2' })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'try-again' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is still covered with trash',
	                        React.createElement('br', null),
	                        'but you still have a chance to clean',
	                        React.createElement('br', null),
	                        'and beat the Litterbug!'
	                    )
	                )
	            )]
	        }),
	        React.createElement(_7.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 5,
	            targetIndex: 2,
	            selected: _.get(props, 'data.cannon.fire'),
	            onSelect: function onSelect(target) {
	                var score = _.get(props, 'data.score.points', 0);
	                var classes = this.state.classes;
	                classes[target.props['data-key']] = 'SELECTED';

	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });

	                if (score < CONFIG.POINTS) score += target.props.value;

	                this.updateGameState({
	                    path: 'score',
	                    data: {
	                        points: score
	                    }
	                });

	                if (score >= CONFIG.POINTS & !_.get(props, 'data.game.complete')) {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'complete'
	                        }
	                    });

	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: 'complete'
	                        }
	                    });

	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            complete: true
	                        }
	                    });
	                }
	            },
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'five', name: 'five', value: 5, complete: true }), React.createElement(skoash.Component, { className: 'ten', name: 'ten', value: 10, complete: true }), React.createElement(skoash.Component, { className: 'twenty', name: 'twenty', value: 20, complete: true }), React.createElement(skoash.Component, { className: 'thirty', name: 'thirty', value: 30, complete: true })]
	            })
	        }),
	        React.createElement(_9.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            showNum: 4,
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'plastic-bottle', complete: true }), React.createElement(skoash.Component, { className: 'soda-can', complete: true }), React.createElement(skoash.Component, { className: 'banana-peal', complete: true }), React.createElement(skoash.Component, { className: 'glass-bottle', complete: true }), React.createElement(skoash.Component, { className: 'crumbled-paper', complete: true }), React.createElement(skoash.Component, { className: 'tuna-can', complete: true }), React.createElement(skoash.Component, { className: 'tire', complete: true }), React.createElement(skoash.Component, { className: 'battery', complete: true })]
	            }),
	            onFire: function onFire() {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        play: 'throw'
	                    }
	                });
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: false
	                    }
	                });
	            },
	            onReload: function onReload() {
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: true
	                    }
	                });
	            }
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'grass' },
	            React.createElement(
	                skoash.Component,
	                { className: 'stats' },
	                React.createElement(
	                    'span',
	                    { className: 'level' },
	                    CONFIG.LVL
	                ),
	                React.createElement(_13.default, {
	                    ref: 'timer',
	                    countDown: true,
	                    timeout: CONFIG.TIMER,
	                    stop: _.get(props, 'data.game.complete', false),
	                    complete: _.get(props, 'data.game.complete', false),
	                    checkComplete: _.get(props, 'data.game.start', false),
	                    restart: _.get(props, 'data.game.start', false),
	                    onComplete: function onComplete() {
	                        if (_.get(props, 'data.reveal.open')) return;
	                        if (_.get(props, 'data.score.points', 0) < CONFIG.POINTS) {
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    open: 'try-again'
	                                }
	                            });

	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    play: 'try-again'
	                                }
	                            });

	                            this.updateGameState({
	                                path: 'score',
	                                data: {
	                                    points: 0
	                                }
	                            });
	                        }
	                    }
	                }),
	                React.createElement(_15.default, {
	                    ref: 'score',
	                    max: CONFIG.POINTS,
	                    correct: _.get(props, 'data.score.points', 0),
	                    checkComplete: false,
	                    complete: _.get(props, 'data.score.points', 0) === CONFIG.POINTS
	                })
	            )
	        )
	    );
	};

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(12);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(22);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(23);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(34);

	var _9 = _interopRequireDefault(_8);

	var _10 = __webpack_require__(13);

	var _11 = _interopRequireDefault(_10);

	var _12 = __webpack_require__(35);

	var _13 = _interopRequireDefault(_12);

	var _14 = __webpack_require__(36);

	var _15 = _interopRequireDefault(_14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CONFIG = {
	    LVL: 3,
	    POINTS: 200,
	    TIMER: 60000
		};

/***/ },
/* 39 */
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
	            id: "room"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: "media/_assets/_sounds/_vos/ThrowTrashRoom.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: "media/_assets/_sounds/_effects/No.mp3" }),
	        React.createElement("div", { className: "avatar animated" }),
	        React.createElement("div", { className: "banner animated" })
	    );
		};

/***/ },
/* 40 */
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
	            id: "school"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: "media/_assets/_sounds/_vos/ThrowTrashSchool.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: "media/_assets/_sounds/_effects/No.mp3" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "avatar animated" })
	    );
		};

/***/ },
/* 41 */
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
	            id: "ground"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: "media/_assets/_sounds/_vos/ShouldYouThrow.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: "media/_assets/_sounds/_effects/No.mp3" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "avatar animated" })
	    );
		};

/***/ },
/* 42 */
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
	            id: "sing-about-it"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: "media/_assets/_sounds/_vos/LetsSing.mp3" }),
	        React.createElement("div", { className: "mr-eco animated" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "dancers animated" })
	    );
		};

/***/ },
/* 43 */
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
	            id: "video"
	        }),
	        React.createElement(
	            skoash.Component,
	            { ref: "center", className: "center" },
	            React.createElement(
	                skoash.Component,
	                { ref: "frame", className: "frame" },
	                React.createElement(skoash.Video, { ref: "video", src: src })
	            )
	        )
	    );
	};

		var src = 'https://res.cloudinary.com/changemyworldnow/video/upload/v1455037034/Litterbug-Final_jjmrg7.mp4';

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
	            id: "good-for-you"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: "media/_assets/_sounds/_vos/ThankYou.mp3" }),
	        React.createElement("div", { className: "mr-eco animated" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "banner2 animated" }),
	        React.createElement(
	            skoash.Component,
	            { className: "sparkles" },
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null)
	        )
	    );
		};

/***/ },
/* 45 */
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
	            id: "take-pledge"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: "media/_assets/_sounds/_vos/AntiLitterPledge.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: "media/_assets/_sounds/_effects/S_BU_1.mp3" }),
	        React.createElement(skoash.Image, { ref: "bkg", className: "background", src: "media/_Frames/FR_1.png" }),
	        React.createElement("div", { className: "mr-eco" }),
	        React.createElement("div", { className: "banner" })
	    );
		};

/***/ },
/* 46 */
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
	            id: "commit"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: "media/_assets/_sounds/_vos/IPromise.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: "media/_assets/_sounds/_effects/S_BU_1.mp3" }),
	        React.createElement(
	            "div",
	            { className: "pledge" },
	            "I promise to ",
	            React.createElement("span", { className: "never" }),
	            " litter",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacerA" }),
	            "and to pick up the litter",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacerB" }),
	            "I see whenever I safely can.",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacer1" }),
	            "I will dispose of it",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacer2" }),
	            "in a trash can",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacer3" }),
	            "or a recycle bin."
	        ),
	        React.createElement("div", { className: "banner animated" })
	    );
		};

/***/ },
/* 47 */
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
	            id: "flip",
	            emitOnComplete: {
	                name: 'flip'
	            }
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: "media/_assets/_sprites/sprites.mr.eco-01.png" }),
	        React.createElement(skoash.Image, { className: "hidden", src: "media/_assets/_sprites/sprites.sing.thankyou.flip-01.png" }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: "media/_assets/_sounds/_vos/Flip.mp3" }),
	        React.createElement("div", { className: "words" }),
	        React.createElement(
	            "div",
	            { className: "flip-container animated" },
	            React.createElement("div", { className: "flip" })
	        ),
	        React.createElement("div", { className: "mr-eco animated" }),
	        React.createElement(skoash.Image, { className: "earned", src: "media/_assets/_animations/LitterbugEarnedFlips.gif" })
	    );
		};

/***/ },
/* 48 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0dGVyLWJ1Zy9haS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjYjZhNWFmYzM4ZWEyY2NjNTg2ZSIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvZGV2LXZhcmlhYmxlcy5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9qcy9tYWtlX21lZGlhX2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvbGl0dGVyLWJ1Zy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9jbGFzc25hbWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpdHRlci1idWcvY29uZmlnLmpzb24iLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvbGV0c19jbGVhbl91cF9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL2NhdGNoX2dhbWVfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvY2F0Y2hfZ2FtZV9zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL21lZGlhX2NvbGxlY3Rpb24vMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3JhbmRvbWl6ZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Ryb3BwZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2RyYWdnYWJsZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL2NhdGNoX2dhbWVfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvY2F0Y2hfZ2FtZV9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL2NsZWFuX3VwX2dhbWVfbHZsMV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmV2ZWFsX3Byb21wdC8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvMC4xLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvYWxwaGFiZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvZW5jb2RlLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tYnl0ZS1icm93c2VyLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2Fubm9uLzAuMi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy90aW1lci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2NvcmUvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9jbGVhbl91cF9nYW1lX2x2bDJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9jbGVhbl91cF9nYW1lX2x2bDNfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9yb29tX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvc2Nob29sX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvZ3JvdW5kX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvc2luZ19hYm91dF9pdF9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvZ29vZF9mb3JfeW91X3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvdGFrZV9wbGVkZ2Vfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9jb21taXRfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9mbGlwX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9xdWl0X3NjcmVlbi8wLjEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoY2FsbGJhY2spIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xuIFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0fVxuIFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0fSBjYXRjaChlKSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xuIFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdH1cblxuXG4gXHQvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iZWY0NWIwL3NyYy9zaGFyZWQvdXRpbHMvY2FuRGVmaW5lUHJvcGVydHkuanNcbiBcdHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuIFx0dHJ5IHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInhcIiwge1xuIFx0XHRcdGdldDogZnVuY3Rpb24oKSB7fVxuIFx0XHR9KTtcbiBcdFx0Y2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuIFx0fSBjYXRjaCh4KSB7XG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImNiNmE1YWZjMzhlYTJjY2M1ODZlXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXG4gXHRcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkpIHtcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgKGZ1bmN0aW9uKG5hbWUpIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGZuW25hbWVdID0gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBlbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkLCBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobnVsbCwgZm4pO1xuIFx0XHRcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR9XG5cbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwiZVwiLCB7XG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0dmFsdWU6IGVuc3VyZVxuIFx0XHRcdH0pO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGZuLmUgPSBlbnN1cmU7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjaztcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm51bWJlclwiKVxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RDYWxsYmFjaztcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSwgY2FsbGJhY2spIHtcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGZhbHNlO1xuIFx0XHRcdGNhbGxiYWNrID0gYXBwbHk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcbiBcdFx0XHR9O1xuIFx0XHR9XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRob3REb3dubG9hZE1hbmlmZXN0KGZ1bmN0aW9uKGVyciwgdXBkYXRlKSB7XG4gXHRcdFx0aWYoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0XHRpZighdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgbnVsbCk7XG4gXHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0fVxuXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwW3VwZGF0ZS5jW2ldXSA9IHRydWU7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDYWxsYmFjayA9IGNhbGxiYWNrO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBjYWxsYmFjayA9IGhvdENhbGxiYWNrO1xuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XG4gXHRcdGlmKCFjYWxsYmFjaykgcmV0dXJuO1xuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xuIFx0XHRcdG9wdGlvbnMgPSB7fTtcbiBcdFx0fSBlbHNlIGlmKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG4gXHRcdFx0fTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRvcHRpb25zID0ge307XG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZSkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbbW9kdWxlXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmKG1vZHVsZUlkID09PSAwKSB7XG4gXHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcbiBcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0dmFyIHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoIXJlc3VsdCkge1xuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhyZXN1bHQpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHRbMF0pO1xuIFx0XHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiByZXN1bHRbMV0pIHtcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHR2YXIgaWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgY2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2UsXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IGhvdEN1cnJlbnRQYXJlbnRzLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2I2YTVhZmMzOGVhMmNjYzU4NmUiLCJ3aW5kb3cuRU5WSVJPTk1FTlQgPSB7XG4gICAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vZi8nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ1bmRlZmluZWRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gIiwiKGZ1bmN0aW9uIChnYW1lTmFtZSkge1xuICAgIC8vIHJlbW92ZSB3aW5kb3cuTUVESUEgb25jZSBubyBnYW1lcyByZWZlcmVuY2UgaXRcbiAgICB2YXIgTUVESUEgPSB3aW5kb3cuTUVESUEgPSB7XG4gICAgICAgIEJBU0U6IEVOVklST05NRU5ULk1FRElBXG4gICAgfTtcblxuICAgIGNvbnN0IEdBTUUgPSAnZ2FtZXMvJztcbiAgICBjb25zdCBFRkZFQ1QgPSAnc291bmQtYXNzZXRzL2VmZmVjdHMvJztcbiAgICBjb25zdCBWTyA9ICdzb3VuZC1hc3NldHMvdm9zLyc7XG4gICAgY29uc3QgSU1BR0UgPSAnaW1hZ2UtYXNzZXRzLyc7XG4gICAgY29uc3QgU1BSSVRFID0gJ3Nwcml0ZXMtYW5pbWF0aW9ucy8nO1xuICAgIGNvbnN0IEZSQU1FID0gJ2ZyYW1lcy8nO1xuICAgIGNvbnN0IEZPTlQgPSAnZm9udHMvJztcbiAgICBjb25zdCBTSEFSRUQgPSAnc2hhcmVkLyc7XG4gICAgY29uc3QgTU9DS19HQU1FID0gJ21vY2stZ2FtZS8nO1xuXG4gICAgTUVESUEuRk9OVCA9IE1FRElBLkJBU0UgKyBGT05UO1xuICAgIE1FRElBLlNIQVJFRCA9IE1FRElBLkJBU0UgKyBHQU1FICsgU0hBUkVEO1xuXG4gICAgTUVESUEuR0FNRSA9IE1FRElBLkJBU0UgKyBHQU1FICsgZ2FtZU5hbWUgKyAnLyc7XG4gICAgTUVESUEuRUZGRUNUID0gTUVESUEuR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5WTyA9IE1FRElBLkdBTUUgKyBWTztcbiAgICBNRURJQS5JTUFHRSA9IE1FRElBLkdBTUUgKyBJTUFHRTtcbiAgICBNRURJQS5TUFJJVEUgPSBNRURJQS5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLkZSQU1FID0gTUVESUEuR0FNRSArIEZSQU1FO1xuICAgIE1FRElBLkZPTlQgPSBNRURJQS5HQU1FICsgRk9OVDtcblxuICAgIE1FRElBLk1PQ0sgPSB7fTtcbiAgICBNRURJQS5NT0NLLkdBTUUgPSBNRURJQS5CQVNFICsgR0FNRSArIE1PQ0tfR0FNRTtcbiAgICBNRURJQS5NT0NLLkVGRkVDVCA9IE1FRElBLk1PQ0suR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5NT0NLLlZPID0gTUVESUEuTU9DSy5HQU1FICsgVk87XG4gICAgTUVESUEuTU9DSy5JTUFHRSA9IE1FRElBLk1PQ0suR0FNRSArIElNQUdFO1xuICAgIE1FRElBLk1PQ0suU1BSSVRFID0gTUVESUEuTU9DSy5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLk1PQ0suRlJBTUUgPSBNRURJQS5NT0NLLkdBTUUgKyBGUkFNRTtcbiAgICBNRURJQS5NT0NLLkZPTlQgPSBNRURJQS5NT0NLLkdBTUUgKyBGT05UO1xuXG4gICAgd2luZG93LkNNV04uTUVESUEgPSBNRURJQTtcbn0od2luZG93LkNNV04uZ2FtZUZvbGRlcikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL21ha2VfbWVkaWFfZ2xvYmFscy5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuaW1wb3J0IExvYWRlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9sb2FkZXIvMC4xJztcblxuaW1wb3J0IGlPU1NjcmVlbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEnO1xuaW1wb3J0IFRpdGxlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90aXRsZV9zY3JlZW4nO1xuaW1wb3J0IExldHNDbGVhblVwU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXRzX2NsZWFuX3VwX3NjcmVlbic7XG5pbXBvcnQgQ2F0Y2hHYW1lTGV2ZWxPbmUgZnJvbSAnLi9jb21wb25lbnRzL2NhdGNoX2dhbWVfbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgQ2F0Y2hHYW1lTGV2ZWxUd28gZnJvbSAnLi9jb21wb25lbnRzL2NhdGNoX2dhbWVfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgQ2F0Y2hHYW1lTGV2ZWxUaHJlZSBmcm9tICcuL2NvbXBvbmVudHMvY2F0Y2hfZ2FtZV9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IENsZWFuVXBHYW1lTHZsMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvY2xlYW5fdXBfZ2FtZV9sdmwxX3NjcmVlbic7XG5pbXBvcnQgQ2xlYW5VcEdhbWVMdmwyU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9jbGVhbl91cF9nYW1lX2x2bDJfc2NyZWVuJztcbmltcG9ydCBDbGVhblVwR2FtZUx2bDNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2NsZWFuX3VwX2dhbWVfbHZsM19zY3JlZW4nO1xuaW1wb3J0IFJvb21TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3Jvb21fc2NyZWVuJztcbmltcG9ydCBTY2hvb2xTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3NjaG9vbF9zY3JlZW4nO1xuaW1wb3J0IEdyb3VuZFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZ3JvdW5kX3NjcmVlbic7XG5pbXBvcnQgU2luZ0Fib3V0SXRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3NpbmdfYWJvdXRfaXRfc2NyZWVuJztcbmltcG9ydCBWaWRlb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuJztcbmltcG9ydCBHb29kRm9yWW91U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9nb29kX2Zvcl95b3Vfc2NyZWVuJztcbmltcG9ydCBUYWtlUGxlZGdlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90YWtlX3BsZWRnZV9zY3JlZW4nO1xuaW1wb3J0IENvbW1pdFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvY29tbWl0X3NjcmVlbic7XG5pbXBvcnQgRmxpcFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmxpcF9zY3JlZW4nO1xuXG5pbXBvcnQgUXVpdFNjcmVlbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9xdWl0X3NjcmVlbi8wLjEnO1xuXG52YXIgTGl0dGVyQnVnID0gKFxuICAgIDxza29hc2guR2FtZVxuICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgc2NyZWVucz17W1xuICAgICAgICAgICAgaU9TU2NyZWVuLFxuICAgICAgICAgICAgVGl0bGVTY3JlZW4sXG4gICAgICAgICAgICBMZXRzQ2xlYW5VcFNjcmVlbixcbiAgICAgICAgICAgIENhdGNoR2FtZUxldmVsT25lLFxuICAgICAgICAgICAgQ2F0Y2hHYW1lTGV2ZWxUd28sXG4gICAgICAgICAgICBDYXRjaEdhbWVMZXZlbFRocmVlLFxuICAgICAgICAgICAgUm9vbVNjcmVlbixcbiAgICAgICAgICAgIFNjaG9vbFNjcmVlbixcbiAgICAgICAgICAgIEdyb3VuZFNjcmVlbixcbiAgICAgICAgICAgIFNpbmdBYm91dEl0U2NyZWVuLFxuICAgICAgICAgICAgVmlkZW9TY3JlZW4sXG4gICAgICAgICAgICBHb29kRm9yWW91U2NyZWVuLFxuICAgICAgICAgICAgQ2xlYW5VcEdhbWVMdmwxU2NyZWVuLFxuICAgICAgICAgICAgQ2xlYW5VcEdhbWVMdmwyU2NyZWVuLFxuICAgICAgICAgICAgQ2xlYW5VcEdhbWVMdmwzU2NyZWVuLFxuICAgICAgICAgICAgVGFrZVBsZWRnZVNjcmVlbixcbiAgICAgICAgICAgIENvbW1pdFNjcmVlbixcbiAgICAgICAgICAgIEZsaXBTY3JlZW4sXG4gICAgICAgIF19XG4gICAgICAgIG1lbnVzPXt7XG4gICAgICAgICAgICBxdWl0OiBRdWl0U2NyZWVuLFxuICAgICAgICB9fVxuICAgICAgICBsb2FkZXI9ezxMb2FkZXIgLz59XG4gICAgICAgIGdldEJhY2tncm91bmRJbmRleD17ZnVuY3Rpb24gKGluZGV4LCBpZCkge1xuICAgICAgICAgICAgc3dpdGNoIChpZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFuLXVwLWdhbWUtbHZsLTEnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFuLXVwLWdhbWUtbHZsLTInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFuLXVwLWdhbWUtbHZsLTMnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImJrZy0xXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9XCJtZWRpYS9fQktHL1NfQktHXzEubXAzXCIgbG9vcC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHJlZj1cImJrZy0yXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL0dhbWVUaGVtZU11c2ljJTIwMi5tcDNcIlxuICAgICAgICAgICAgICAgIGxvb3BcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJidXR0b25cIiB0eXBlPVwic2Z4XCIgc3JjPVwibWVkaWEvX0J1dHRvbnMvU19CVV8xLm1wM1wiIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSByZWY9XCJpbWctYmtnLTFcIiBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fQktHL0JLR18xLnBuZ1wiIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSByZWY9XCJpbWctYmtnLTJcIiBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fQktHL0JLR18yLnBuZ1wiIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSByZWY9XCJpbWctYmtnLTNcIiBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fQktHL0JLR18zLnBuZ1wiIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSByZWY9XCJpbWctYmtnLTRcIiBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fYXNzZXRzL19pbWFnZXMvQktHLjQuanBnXCIgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIHJlZj1cImltZy1ia2ctNVwiIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz1cIm1lZGlhL19CS0cvQktHXzUucG5nXCIgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19pbWFnZXMvQktHLjMucG5nXCJcbiAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9faW1hZ2VzL0JLRy41LnBuZ1wiXG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3Nwcml0ZXMvc3ByaXRlcy5nYW1lMi4xLTAxLnBuZyd9XG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3Nwcml0ZXMvc3ByaXRlcy5nYW1lMi4yLTAxLnBuZyd9XG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3Nwcml0ZXMvc3ByaXRlcy5nYW1lMi4zLTAxLW1pbi5qcGcnfVxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zcHJpdGVzL3Nwcml0ZXMuZ2FtZTIuNC0wMS5wbmcnfVxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zcHJpdGVzL3Nwcml0ZXMubXIuZWNvLTAxLnBuZyd9XG4gICAgICAgICAgICAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBkZWZhdWx0XCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdGl0bGVcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBjYXRjaC1nYW1lXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgbGV0cy1jbGVhbi11cFwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGNsZWFuLXVwLWdhbWVcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBzZWxlY3RcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBzdW5cIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBjb21taXRcIiAvPixcbiAgICAgICAgXX1cbiAgICAgICAgcGFzc0RhdGE9e2Z1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKG9wdHMpO1xuICAgICAgICB9fVxuICAgICAgICBnZXRDbGFzc05hbWVzPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lcyh7J1NVTic6IHRoaXMuc3RhdGUuc3VufSk7XG4gICAgICAgIH19XG4gICAgLz5cbik7XG5cbnNrb2FzaC5zdGFydChMaXR0ZXJCdWcpO1xuXG5pZiAobW9kdWxlLmhvdCkgbW9kdWxlLmhvdC5hY2NlcHQoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2xpdHRlci1idWcvaW5kZXguanMiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJpZFwiOiBcImxpdHRlci1idWdcIixcblx0XCJ2ZXJzaW9uXCI6IDIsXG5cdFwic2tvYXNoXCI6IFwiMS4xLjNcIixcblx0XCJkaW1lbnNpb25zXCI6IHtcblx0XHRcIndpZHRoXCI6IDk2MCxcblx0XHRcImhlaWdodFwiOiA1NDBcblx0fVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpdHRlci1idWcvY29uZmlnLmpzb25cbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cImxvYWRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPkxvYWRpbmchPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiaW9zLXNwbGFzaFwiXG4gICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgIGNvbXBsZXRlRGVsYXk9ezYwMDB9XG4gICAgICAgICAgICBuZXh0RGVsYXk9ezMwMDB9XG4gICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICAgIGhpZGVQcmV2XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNIQVJFRH1pb3Mtc3RhcnQtYmFsbC5wbmdgfSAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU0hBUkVEfWlvcy1zdGFydC1iYWxsLWFuaW0uZ2lmYH0gLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInRpdGxlXCJcbiAgICAgICAgICAgIGhpZGVQcmV2XG4gICAgICAgICAgICBjb21wbGV0ZURlbGF5PXs1MDAwfVxuICAgICAgICA+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwibGV0cy1jbGVhbi11cFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZSByZWY9XCJtZWRpYS1zZXF1ZW5jZVwiPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tMVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9MaXR0ZXJJc1RyYXNoLm1wM1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTJcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvUGFwZXJDYW5zQm90dGxlcy5tcDNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by0zXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0xldHNDbGVhblVwLm1wM1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcHkgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICBMaXR0ZXIgaXMgdHJhc2g8YnIvPlxuICAgICAgICAgICAgICAgIFBhcGVyLCBjYW5zLCBhbmQgYm90dGxlcyBvbiB0aGUgZ3JvdW5kPGJyLz5cbiAgICAgICAgICAgICAgICBtYWtlIGEgbWVzcyBhbmQgY2FuIGh1cnQgd2lsZGxpZmU8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCB0aGUgZW52aXJvbm1lbnQuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICByZWY9XCJpbWFnZVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFubmVyIGFuaW1hdGVkXCJcbiAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19pbWFnZXMvbGV0cy5jbGVhbi51cC5wbmdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvbGV0c19jbGVhbl91cF9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoR2FtZVNjcmVlbkNvbXBvbmVudCBmcm9tICcuL2NhdGNoX2dhbWVfc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gQ2F0Y2hHYW1lU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2NhdGNoLWdhbWUtbGV2ZWwtb25lJyxcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHJvd3M6IDMsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgcHJlcFRpbWVvdXQ6IDEwMDAsXG4gICAgICAgIG9wZW5PblN0YXJ0OiAnaW5zdHJ1Y3Rpb25zJyxcbiAgICAgICAgYmluOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnbXVzaHJvb20nLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2JhbmFuYScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ3RyYXNoJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdwYXBlcicsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ3RyYXNoJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdkb2cnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2JhdHRlcnknLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZHVjaycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnc3F1aXJyZWwnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RpcmUnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYmx1ZS1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3llbGxvdy1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3JlZC1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3B1cnBsZS1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2dsYXNzJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAndHJhc2gnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3BsYXN0aWMnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHZvczogW1xuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgcmVmPVwiaW5zdHJ1Y3Rpb25zXCJcbiAgICAgICAgICAgICAgICBzaWxlbnRPblN0YXJ0XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvSW5zdHJ1Y3Rpb25zLm1wMyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9QaWNrVXBMaXR0ZXIubXAzJ31cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVUYXJnZXQ9XCJpbnN0cnVjdGlvbnNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHJlZj1cImxldmVsLXVwXCJcbiAgICAgICAgICAgICAgICBzaWxlbnRPblN0YXJ0XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL0xldmVsVXAubXAzJ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0NvbmdyYXR1bGF0aW9ucy5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgICAgICAgICAgc2lsZW50T25TdGFydFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3NvdW5kcy9fZWZmZWN0cy9UcnlBZ2Fpbi5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvVHJ5QWdhaW4ubXAzJ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1lvdURpZG50V2luLm1wMyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+LFxuICAgICAgICBdLFxuICAgICAgICBzZng6IFtcbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICByZWY9XCJtaXNzXCJcbiAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvTG9zZVBvaW50cy5tcDMnfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAvPixcbiAgICAgICAgXSxcbiAgICAgICAgcmV2ZWFsTGlzdDogW1xuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICByZWY9XCJpbnN0cnVjdGlvbnNcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluc3RydWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc3RydWN0aW9uc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29yZHNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc0NvbXBsZXRlOiBfLmdldChwcm9wcywgJ2RhdGEuaW5zdHJ1Y3Rpb25zLmNvbXBsZXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgcmVmPVwibGV2ZWwtdXBcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxldmVsLXVwXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbmdyYXR1bGF0aW9uc1wiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxldmVsLXVwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJ5LWFnYWluXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ5LWFnYWluXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3Jkc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL2NhdGNoX2dhbWVfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBNZWRpYUNvbGxlY3Rpb24gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWVkaWFfY29sbGVjdGlvbi8wLjEnO1xuXG5pbXBvcnQgUmFuZG9taXplciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMSc7XG5pbXBvcnQgRHJvcHBlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9kcm9wcGVyLzAuMSc7XG5pbXBvcnQgQ2F0Y2hlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuMSc7XG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICB2YXIgb25PcGVuUmV2ZWFsO1xuICAgIHZhciBvbkNsb3NlUmV2ZWFsO1xuICAgIHZhciBvblNjb3JlQ29tcGxldGU7XG4gICAgdmFyIG9uVGltZXJDb21wbGV0ZTtcbiAgICB2YXIgb25BZGRDbGFzc05hbWU7XG4gICAgdmFyIG9uVHJhbnNpdGlvbkVuZDtcbiAgICB2YXIgb25QbGF5U0ZYO1xuICAgIHZhciBvbkNvcnJlY3RDYXRjaDtcbiAgICB2YXIgb25JbmNvcnJlY3RDYXRjaDtcbiAgICB2YXIgb25Nb3ZlO1xuICAgIHZhciBiaW47XG5cbiAgICBvbk9wZW5SZXZlYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdG9wOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBvbkNsb3NlUmV2ZWFsID0gZnVuY3Rpb24gKHByZXZNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdG9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjbG9zZTogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiAnb3BlblJldmVhbCcsXG4gICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ3Njb3JlJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiAwLFxuICAgICAgICAgICAgICAgIGluY29ycmVjdDogMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHByZXZNZXNzYWdlID09PSAnbGV2ZWwtdXAnKSB7XG4gICAgICAgICAgICBza29hc2guU2NyZWVuLnByb3RvdHlwZS5nb3RvKHBhcnNlSW50KGtleSwgMTApICsgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgb25TY29yZUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiAnb3BlblJldmVhbCcsXG4gICAgICAgICAgICBkYXRhOiAnbGV2ZWwtdXAnLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG9uVGltZXJDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCAnZGF0YS5vcGVuUmV2ZWFsJykgPT09ICdsZXZlbC11cCcpIHJldHVybjtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ29wZW5SZXZlYWwnLFxuICAgICAgICAgICAgZGF0YTogJ3RyeS1hZ2FpbicsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBvbkFkZENsYXNzTmFtZSA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PT0gJ2dvJykgcmV0dXJuO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiAnc2Z4JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBwbGF5aW5nOiAncHJpbnQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBvblRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoXy5nZXQocHJvcHMsICdkYXRhLm9wZW5SZXZlYWwnKSB8fCBwcm9wcy5nYW1lU3RhdGUucGF1c2VkIHx8XG4gICAgICBpdGVtLnByb3BzLm1lc3NhZ2UgIT09ICd0cmFzaCcgfHwgIWl0ZW0uc3RhdGUuY2FuQ2F0Y2gpIHJldHVybjtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ3Njb3JlJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBsaXR0ZXI6IF8uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5saXR0ZXInLCAwKSArIDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ3NmeCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcGxheWluZzogJ21pc3MnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgb25QbGF5U0ZYID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiAnc2Z4JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBwbGF5aW5nOiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgb25Db3JyZWN0Q2F0Y2ggPSBmdW5jdGlvbiAoYnVja2V0UmVmKSB7XG4gICAgICAgIGJ1Y2tldFJlZi5hZGRDbGFzc05hbWUoJ2NvcnJlY3QnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBidWNrZXRSZWYucmVtb3ZlQ2xhc3NOYW1lKCdjb3JyZWN0Jyk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiAnc2NvcmUnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IF8uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5jb3JyZWN0JywgMCkgKyAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG9uSW5jb3JyZWN0Q2F0Y2ggPSBmdW5jdGlvbiAoYnVja2V0UmVmKSB7XG4gICAgICAgIGJ1Y2tldFJlZi5hZGRDbGFzc05hbWUoJ2luY29ycmVjdCcpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJ1Y2tldFJlZi5yZW1vdmVDbGFzc05hbWUoJ2luY29ycmVjdCcpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogJ3Njb3JlJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpbmNvcnJlY3Q6IF8uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5pbmNvcnJlY3QnLCAwKSArIDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgb25Nb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHJlY3Q7XG4gICAgICAgIHZhciBzdHlsZXM7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzLnJlZnMuY2F0Y2hlcikgcmV0dXJuO1xuXG4gICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdKSB7XG4gICAgICAgICAgICByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBlID0gZS50YXJnZXRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgZS5vZmZzZXRZID0gZS5wYWdlWSAtIHJlY3QudG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGVzID0gdGhpcy5zdGF0ZS5zdHlsZXM7XG5cbiAgICAgICAgc3R5bGVzWzBdID0ge1xuICAgICAgICAgICAgdG9wOiBNYXRoLm1pbihlLm9mZnNldFksIDM2MCksXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdHlsZXMsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBiaW4gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMuYmluLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb3B0cy5yb3dzOyBqKyspIHtcbiAgICAgICAgICAgIGJpbi5wdXNoKFxuICAgICAgICAgICAgICAgIDxDYXRjaGFibGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtvcHRzLmJpbltpXS5jbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e29wdHMuYmluW2ldLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDQwMCAqIChqICsgLjQpIC8gb3B0cy5yb3dzLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9e29wdHMuaWR9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJyl9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e29wdHMudm9zfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnNmeC5wbGF5aW5nJyl9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e29wdHMuc2Z4fVxuICAgICAgICAgICAgICAgIG9uUGxheT17b25QbGF5U0ZYfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImJvdHRvbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGV2ZWxcIj5cbiAgICAgICAgICAgICAgICAgICAge29wdHMubGV2ZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtci1lY28tc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50PXsxMH1cbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17Xy5nZXQocHJvcHMsICdkYXRhLnNjb3JlLmNvcnJlY3QnLCAwKX1cbiAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0PXtfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUuaW5jb3JyZWN0JywgMCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e29uU2NvcmVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5TY29yZT5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpdHRlci1idWctc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50PXsxMH1cbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17Xy5nZXQocHJvcHMsICdkYXRhLnNjb3JlLmxpdHRlcicsIDApfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29tcGxldGUnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e29uVGltZXJDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5TY29yZT5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlRpbWVyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50RG93blxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtvcHRzLnRpbWVvdXR9XG4gICAgICAgICAgICAgICAgICAgIHN0b3A9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29tcGxldGUnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLnN0YXJ0JywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICByZXN0YXJ0PXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zdGFydCcsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17b25UaW1lckNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJtYWluXCI+XG4gICAgICAgICAgICAgICAgPERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgbGVmdEJvdW5kPXs3MH1cbiAgICAgICAgICAgICAgICAgICAgcmlnaHRCb3VuZD17ODIwfVxuICAgICAgICAgICAgICAgICAgICBvbj17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc3RhcnQnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0PXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zdGFydCcsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgc3RvcD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29tcGxldGUnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIHByZXBDbGFzc2VzPXtbJ3JlYWR5JywgJ2dvJ119XG4gICAgICAgICAgICAgICAgICAgIHByZXBUaW1lb3V0PXtvcHRzLnByZXBUaW1lb3V0fVxuICAgICAgICAgICAgICAgICAgICBvbkFkZENsYXNzTmFtZT17b25BZGRDbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kfVxuICAgICAgICAgICAgICAgICAgICBiaW49e1xuICAgICAgICAgICAgICAgICAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW49e2Jpbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9Ecm9wcGVyPlxuICAgICAgICAgICAgICAgIDxDYXRjaGVyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydFxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLnN0YXJ0JywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICBjYW5DYXRjaD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc3RhcnQnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIG1vdmVCdWNrZXRzXG4gICAgICAgICAgICAgICAgICAgIG9uTW92ZT17b25Nb3ZlfVxuICAgICAgICAgICAgICAgICAgICBidWNrZXQ9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cIm1yLWVjb1wiIG1lc3NhZ2U9XCJ0cmFzaFwiIC8+LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaGFibGVSZWZzPXtfLmdldChwcm9wcywgJ2RhdGEuZHJvcHBlci5yZWZzJywgW10pfVxuICAgICAgICAgICAgICAgICAgICBvbkNvcnJlY3Q9e29uQ29ycmVjdENhdGNofVxuICAgICAgICAgICAgICAgICAgICBvbkluY29ycmVjdD17b25JbmNvcnJlY3RDYXRjaH1cbiAgICAgICAgICAgICAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiY29ycmVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL1dpblBvaW50cy5tcDMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiaW5jb3JyZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvTG9zZVBvaW50cy5tcDMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDxza29hc2guUmV2ZWFsXG4gICAgICAgICAgICAgICAgb3Blbk9uU3RhcnQ9e29wdHMub3Blbk9uU3RhcnR9XG4gICAgICAgICAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgb3BlblJldmVhbD17Xy5nZXQocHJvcHMsICdkYXRhLm9wZW5SZXZlYWwnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xvc2VSZXZlYWw9e18uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgb25DbG9zZT17b25DbG9zZVJldmVhbH1cbiAgICAgICAgICAgICAgICBvbk9wZW49e29uT3BlblJldmVhbH1cbiAgICAgICAgICAgICAgICBsaXN0PXtvcHRzLnJldmVhbExpc3R9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9jYXRjaF9nYW1lX3NjcmVlbl9jb21wb25lbnQuanMiLCIvLyBBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmNvbnNvbGUud2FybignQXMgb2Ygc2tvYXNoIDEuMS4wIHRoaXMgY29tcG9uZW50IGNhbiBiZSBmb3VuZCBhdCBza29hc2guTWVkaWFDb2xsZWN0aW9uJyk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuY2xhc3MgTWVkaWFDb2xsZWN0aW9uIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgcGxheShyZWYpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmc1tyZWZdKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnNbcmVmXS5wbGF5KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUGxheS5jYWxsKHRoaXMsIHJlZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5wbGF5ICYmIHByb3BzLnBsYXkgIT09IHRoaXMucHJvcHMucGxheSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5KHByb3BzLnBsYXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5NZWRpYUNvbGxlY3Rpb24uZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgb25QbGF5OiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhQ29sbGVjdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL21lZGlhX2NvbGxlY3Rpb24vMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFJhbmRvbWl6ZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBnZXRBbGwoKSB7XG4gICAgICAgIHJldHVybiBfLnNodWZmbGUodGhpcy5wcm9wcy5iaW4pO1xuICAgIH1cblxuICAgIGdldChhbW91bnQgPSAxKSB7XG4gICAgICAgIHZhciBpdGVtcztcbiAgICAgICAgdmFyIGJpbiA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlbWFpbiAmJiB0aGlzLnN0YXRlLmJpbikge1xuICAgICAgICAgICAgYmluID0gdGhpcy5zdGF0ZS5iaW47XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoYmluLmxlbmd0aCA8IGFtb3VudCkge1xuICAgICAgICAgICAgYmluID0gYmluLmNvbmNhdChfLnNodWZmbGUodGhpcy5wcm9wcy5iaW4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zID0gYmluLnNwbGljZSgwLCBhbW91bnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlbWFpbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YmlufSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3JhbmRvbWl6ZXInLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlckJpbigpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRoaXMucHJvcHMuYmluLCAobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZiA9IGxpLnJlZiB8fCAobGkucHJvcHMgJiYgbGkucHJvcHNbJ2RhdGEtcmVmJ10pIHx8IGtleTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SYW5kb21pemVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGJpbjogW10sXG4gICAgcmVtYWluOiBmYWxzZSxcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ICgpID0+IGZhbHNlLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBSYW5kb21pemVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IERyYWdnYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC4xJztcblxuaW1wb3J0IFJhbmRvbWl6ZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEnO1xuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xJztcblxuY2xhc3MgRHJvcHBlciBleHRlbmRzIERyYWdnYWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICAgICAgY2xhc3NlczogW10sXG4gICAgICAgICAgICBpdGVtQ291bnQ6IDAsXG4gICAgICAgICAgICBpdGVtRW5kWHM6IHt9LFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnJyxcbiAgICAgICAgfSwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgbmV4dChvbikge1xuICAgICAgICB2YXIgaXRlbXM7XG4gICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgKCF0aGlzLnByb3BzLm9uICYmICFvbikgfHwgdGhpcy5wcm9wcy5nYW1lU3RhdGUucGF1c2VkKSByZXR1cm47XG5cbiAgICAgICAgaW5kZXggPSB0aGlzLnN0YXRlLml0ZW1Db3VudDtcbiAgICAgICAgaXRlbXMgPSB0aGlzLnN0YXRlLml0ZW1zO1xuXG4gICAgICAgIGl0ZW1zW2luZGV4XSA9IHRoaXMucmVmcy5iaW4uZ2V0KDEpWzBdO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuZ2V0Q2xhc3NOYW1lcyA9PT0gJ2Z1bmN0aW9uJykgY2xhc3NlcyA9IHRoaXMucHJvcHMuZ2V0Q2xhc3NOYW1lcy5jYWxsKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXRlbXMsXG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgaXRlbUNvdW50OiBpbmRleCArIDEsXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHZhciB0aW1lb3V0RnVuY3Rpb24gPSBpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVJlZjtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbURPTTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbUVuZFhzO1xuICAgICAgICAgICAgICAgIHZhciBvblRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgICAgICAgaXRlbVJlZiA9IHRoaXMucmVmc1snaXRlbXMtJyArIGluZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZSh0aGlzLnByb3BzLnByZXBDbGFzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFkZENsYXNzTmFtZS5jYWxsKHRoaXMsIHRoaXMucHJvcHMucHJlcENsYXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5wcm9wcy5wcmVwQ2xhc3Nlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtRW5kWHMgPSB0aGlzLnN0YXRlLml0ZW1FbmRYcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbmRYc1tpbmRleF0gPSB0aGlzLnN0YXRlLmVuZFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgPSB0aGlzLnN0YXRlLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25UcmFuc2l0aW9uRW5kLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbmRYc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1ET00gPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1ET00uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtRE9NLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5wcm9wcy5wcmVwQ2xhc3Nlcy5sZW5ndGgpIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5wcm9wcy5wcmVwQ2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0RnVuY3Rpb24oaSk7XG4gICAgICAgICAgICAgICAgfSwgaSAqIHRoaXMucHJvcHMucHJlcFRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5yZWZzVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVmczogXy5maWx0ZXIodGhpcy5yZWZzLCAodiwgaykgPT4gIWsuaW5kZXhPZignaXRlbXMtJykpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlRXZlbnQoZSkge1xuICAgICAgICB2YXIgZW5kWDtcblxuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkge1xuICAgICAgICAgICAgZS5wYWdlWCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZFggPSBNYXRoLm1pbihNYXRoLm1heChlLnBhZ2VYIC0gdGhpcy5zdGF0ZS5ncmFiWCwgdGhpcy5wcm9wcy5sZWZ0Qm91bmQpLCB0aGlzLnByb3BzLnJpZ2h0Qm91bmQpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZW5kWCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZW5kWCA+IHRoaXMuc3RhdGUuZW5kWCA/ICdyaWdodCcgOiAnbGVmdCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMub24gPT09IHRydWUgJiYgcHJvcHMub24gIT09IHRoaXMucHJvcHMub24pIHtcbiAgICAgICAgICAgIHRoaXMubmV4dCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEl0ZW1TdHlsZShrZXksIHN0eWxlKSB7XG4gICAgICAgIHZhciBlbmRYO1xuICAgICAgICB2YXIgeDtcblxuICAgICAgICBlbmRYID0gdGhpcy5zdGF0ZS5pdGVtRW5kWHNba2V5XSB8fCB0aGlzLnN0YXRlLmVuZFg7XG4gICAgICAgIHggPSAoKGVuZFggLSB0aGlzLnN0YXRlLnN0YXJ0WCkgLyB0aGlzLnN0YXRlLnpvb20pO1xuXG4gICAgICAgIHJldHVybiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KWAsXG4gICAgICAgICAgICBXZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7eH1weClgLFxuICAgICAgICB9LCBzdHlsZSk7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIHZhciB4ID0gKCh0aGlzLnN0YXRlLmVuZFggLSB0aGlzLnN0YXRlLnN0YXJ0WCkgLyB0aGlzLnN0YXRlLnpvb20pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7eH1weClgLFxuICAgICAgICAgICAgV2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3h9cHgpYCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnZHJvcHBlcicsIHRoaXMuc3RhdGUuZGlyZWN0aW9uLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc2hvcnRpZCBpcyBpbnRlbnRpb25hbGx5IG5vdCB1c2VkIGZvciBrZXkgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG8gbWFrZSBzdXJlXG4gICAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICAgKi9cbiAgICByZW5kZXJJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRoaXMuc3RhdGUuaXRlbXMsIChpdGVtLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciByZWYgPSAnaXRlbXMtJyArIGtleTtcbiAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpdGVtLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldEl0ZW1TdHlsZShrZXksIGl0ZW0ucHJvcHMuc3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2l0ZW0ucHJvcHMuY2xhc3NOYW1lfSAke3RoaXMuc3RhdGUuY2xhc3NlcyA/IHRoaXMuc3RhdGUuY2xhc3Nlc1trZXldIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1tZXNzYWdlPXtpdGVtLnByb3BzLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQmluKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuYmluLnR5cGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5iaW4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPVwiYmluXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJlbFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImVsXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRHJvcHBlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBwcmVwQ2xhc3NlczogWydyZWFkeScsICdzZXQnLCAnZ28nXSxcbiAgICBwcmVwVGltZW91dDogMTAwMCxcbiAgICBiaW46IChcbiAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgIGJpbj17W1xuICAgICAgICAgICAgICAgIDxDYXRjaGFibGUgLz4sXG4gICAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICksXG4gICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICB9LFxuICAgIG9uUmVzdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH0sXG4gICAgbGVmdEJvdW5kOiAwLFxuICAgIHJpZ2h0Qm91bmQ6IDgwMCxcbiAgICByZWZzVGFyZ2V0OiAnZHJvcHBlcicsXG4gICAgb246IHRydWUsXG4gICAgb25UcmFuc2l0aW9uRW5kOiBfLm5vb3AsXG59LCBEcmFnZ2FibGUuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcHBlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Ryb3BwZXIvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGFydFg6IDAsXG4gICAgICAgICAgICBzdGFydFk6IDAsXG4gICAgICAgICAgICBlbmRYOiAwLFxuICAgICAgICAgICAgZW5kWTogMCxcbiAgICAgICAgICAgIHpvb206IDEsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSB0aGlzLm1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm1vdXNlVXAgPSB0aGlzLm1vdXNlVXAuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLm1vdmVFdmVudCA9IHRoaXMubW92ZUV2ZW50LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0ID0gdGhpcy50b3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudG91Y2hFbmQgPSB0aGlzLnRvdWNoRW5kLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdWxkRHJhZygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaW5jb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5tYXJrSW5jb3JyZWN0KCk7XG4gICAgICAgIHRoaXMucmV0dXJuVG9TdGFydCgpO1xuXG4gICAgICAgIHN1cGVyLmluY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBtYXJrQ29ycmVjdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYXJrSW5jb3JyZWN0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydEV2ZW50KGUsIGNiKSB7XG4gICAgICAgIHZhciBwYWdlWDtcbiAgICAgICAgdmFyIHBhZ2VZO1xuICAgICAgICB2YXIgcmVjdDtcbiAgICAgICAgdmFyIHN0YXJ0WDtcbiAgICAgICAgdmFyIHN0YXJ0WTtcbiAgICAgICAgdmFyIGVuZFg7XG4gICAgICAgIHZhciBlbmRZO1xuICAgICAgICB2YXIgZ3JhYlg7XG4gICAgICAgIHZhciBncmFiWTtcblxuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMucmVmcy5lbCkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkRHJhZygpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgICAgICAgIHBhZ2VYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgICAgcGFnZVkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgICByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBlID0gZS50YXJnZXRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgZS5vZmZzZXRYID0gcGFnZVggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICBlLm9mZnNldFkgPSBwYWdlWSAtIHJlY3QudG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JhYlggPSBlLm9mZnNldFg7XG4gICAgICAgIGdyYWJZID0gZS5vZmZzZXRZO1xuXG4gICAgICAgIHN0YXJ0WCA9IGVuZFggPSBlLnBhZ2VYIC0gZ3JhYlg7XG4gICAgICAgIHN0YXJ0WSA9IGVuZFkgPSBlLnBhZ2VZIC0gZ3JhYlk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmZpcnN0WCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmlyc3RYOiBzdGFydFgsXG4gICAgICAgICAgICAgICAgZmlyc3RZOiBzdGFydFksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yZXR1cm4pIHtcbiAgICAgICAgICAgIHN0YXJ0WCA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWCkgP1xuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WCArIHRoaXMuc3RhdGUuZ3JhYlggLSBncmFiWCA6XG4gICAgICAgIHN0YXJ0WDtcbiAgICAgICAgICAgIHN0YXJ0WSA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWSkgP1xuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WSArIHRoaXMuc3RhdGUuZ3JhYlkgLSBncmFiWSA6XG4gICAgICAgIHN0YXJ0WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICAgICAgICByZXR1cm46IGZhbHNlLFxuICAgICAgICAgICAgc3RhcnRYLFxuICAgICAgICAgICAgc3RhcnRZLFxuICAgICAgICAgICAgZ3JhYlgsXG4gICAgICAgICAgICBncmFiWSxcbiAgICAgICAgICAgIGVuZFgsXG4gICAgICAgICAgICBlbmRZLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuZHJhZ1Jlc3BvbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZHJhZ1Jlc3BvbmQodGhpcy5wcm9wcy5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNiLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIH1cblxuICAgIGF0dGFjaFRvdWNoRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICB9XG5cbiAgICBtb3VzZURvd24oZSkge1xuICAgICAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hNb3VzZUV2ZW50cyk7XG4gICAgfVxuXG4gICAgdG91Y2hTdGFydChlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaFRvdWNoRXZlbnRzKTtcbiAgICB9XG5cbiAgICBtb3ZlRXZlbnQoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkge1xuICAgICAgICAgICAgZS5wYWdlWCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgIGUucGFnZVkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVuZFg6IGUucGFnZVggLSB0aGlzLnN0YXRlLmdyYWJYLFxuICAgICAgICAgICAgZW5kWTogZS5wYWdlWSAtIHRoaXMuc3RhdGUuZ3JhYlksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVyblRvU3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpcnN0WCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJldHVybjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmRYOiB0aGlzLnN0YXRlLmZpcnN0WCxcbiAgICAgICAgICAgICAgICBlbmRZOiB0aGlzLnN0YXRlLmZpcnN0WSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5kRXZlbnQoY2IpIHtcbiAgICAgICAgdGhpcy5kcm9wUmVzcG9uZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJldHVybikge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmV0dXJuOiB0aGlzLnN0YXRlLnJldHVybixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2IuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRldGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgfVxuXG4gICAgZGV0YWNoVG91Y2hFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICAgIH1cblxuICAgIG1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hNb3VzZUV2ZW50cyk7XG4gICAgfVxuXG4gICAgdG91Y2hFbmQoKSB7XG4gICAgICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hUb3VjaEV2ZW50cyk7XG4gICAgfVxuXG4gICAgZHJvcFJlc3BvbmQoKSB7XG4gICAgICAgIHZhciBjb3JuZXJzO1xuXG4gICAgICAgIGNvcm5lcnMgPSB0aGlzLnNldENvcm5lcnMoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuZHJvcFJlc3BvbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZHJvcFJlc3BvbmQodGhpcy5wcm9wcy5tZXNzYWdlLCBjb3JuZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvcm5lcnMoKSB7XG4gICAgICAgIHZhciB0b3A7XG4gICAgICAgIHZhciBsZWZ0O1xuICAgICAgICB2YXIgd2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQ7XG4gICAgICAgIHZhciBlbDtcbiAgICAgICAgdmFyIGNvcm5lcnMgPSBbXTtcblxuICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgdG9wID0gMDtcbiAgICAgICAgZWwgPSB0aGlzLnJlZnMuZWw7XG4gICAgICAgIHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc05hbWUuaW5kZXhPZignc2NyZWVuJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxlZnQgKz0gZWwub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgdG9wICs9IGVsLm9mZnNldFRvcCB8fCAwO1xuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZWZ0ICs9ICgodGhpcy5zdGF0ZS5lbmRYIC0gdGhpcy5zdGF0ZS5zdGFydFgpIC8gdGhpcy5zdGF0ZS56b29tKTtcbiAgICAgICAgdG9wICs9ICgodGhpcy5zdGF0ZS5lbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFkpIC8gdGhpcy5zdGF0ZS56b29tKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgY29ybmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBsZWZ0ICsgd2lkdGggKiAoaSA9PT0gMSB8fCBpID09PSAyID8gMSA6IDApLFxuICAgICAgICAgICAgICAgIHk6IHRvcCArIGhlaWdodCAqIChpID4gMSA/IDEgOiAwKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JuZXJzLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29ybmVycztcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5ib290c3RyYXAoKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgICAgIHRoaXMuc2V0Wm9vbSgpO1xuXG4gICAgICAgIHRoaXMucmVmcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgICAgIHRoaXMucmVmcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXRab29tLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHNldFpvb20oKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgem9vbTogc3RhdGUuc2NhbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIHZhciB4O1xuICAgICAgICB2YXIgeTtcblxuICAgICAgICB4ID0gKCh0aGlzLnN0YXRlLmVuZFggLSB0aGlzLnN0YXRlLnN0YXJ0WCkgLyB0aGlzLnN0YXRlLnpvb20pO1xuICAgICAgICB5ID0gKCh0aGlzLnN0YXRlLmVuZFkgLSB0aGlzLnN0YXRlLnN0YXJ0WSkgLyB0aGlzLnN0YXRlLnpvb20pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7eH1weCkgdHJhbnNsYXRlWSgke3l9cHgpYCxcbiAgICAgICAgICAgIFdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KSB0cmFuc2xhdGVZKCR7eX1weClgLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKHtcbiAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgW3RoaXMucHJvcHMubWVzc2FnZV06IHRoaXMucHJvcHMubWVzc2FnZSxcbiAgICAgICAgICAgIERSQUdHSU5HOiB0aGlzLnN0YXRlLmRyYWdnaW5nLFxuICAgICAgICAgICAgUkVUVVJOOiB0aGlzLnN0YXRlLnJldHVybixcbiAgICAgICAgICAgIENPUlJFQ1Q6IHRoaXMuc3RhdGUuY29ycmVjdCxcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPVwiZWxcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50TGlzdCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmFnZ2FibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIENhdGNoYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2FuQ2F0Y2g6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXNldCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F1Z2h0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DYXVnaHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBjYW5DYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuc3RhdGUuY2FuQ2F0Y2g7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2NhdGNoYWJsZScsIHtcbiAgICAgICAgICAgIENBVUdIVDogIXRoaXMuc3RhdGUuY2FuQ2F0Y2hcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVhZHkgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5yZUNhdGNoYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSB7Li4udGhpcy5wcm9wc30gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkNhdGNoYWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgaXNDb3JyZWN0OiB0cnVlLFxuICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgIG9uQ2F1Z2h0OiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGNoYWJsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoLzAuMSc7XG5cbmNsYXNzIENhdGNoZXIgZXh0ZW5kcyBDYXRjaCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIHN0eWxlczogW10sXG4gICAgICAgIH0sIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIHRoaXMubW92ZUV2ZW50ID0gdGhpcy5tb3ZlRXZlbnQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHNrb2FzaC5Db21wb25lbnQucHJvdG90eXBlLmJvb3RzdHJhcC5jYWxsKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZSk7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5tb3ZlQnVja2V0cykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRXZlbnQoZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uTW92ZS5jYWxsKHRoaXMsIGUpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuYnVja2V0Tm9kZXMgPSBfLnJlZHVjZSh0aGlzLnJlZnMsIChhLCB2LCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoay5pbmRleE9mKCdidWNrZXRzLScpKSByZXR1cm4gYTtcbiAgICAgICAgICAgIGFba10gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh2KTtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgICAgICAgdmFyIHpvb20gPSBzdGF0ZS5zY2FsZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NvbGxpc2lvbnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG4gICAgICAgIF8uZWFjaCh0aGlzLmJ1Y2tldE5vZGVzLCAoYnVja2V0Tm9kZSwgYnVja2V0UmVmS2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgYnVja2V0UmVjdCA9IGJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5wcm9wcy5jYXRjaGFibGVSZWZzLCBjYXRjaGFibGVSZWYgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIGNhdGNoYWJsZVJlZi5ET01Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhdGNoYWJsZSh0aGlzLnJlZnNbYnVja2V0UmVmS2V5XSwgY2F0Y2hhYmxlUmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hSZWN0KSB7XG4gICAgICAgIHZhciBidWNrZXRDb3JuZXJzID0gW107XG4gICAgICAgIHZhciBjYXRjaGFibGVDb3JuZXJzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGJ1Y2tldENvcm5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgeDogYnVja2V0UmVjdC5sZWZ0ICsgYnVja2V0UmVjdC53aWR0aCAqIChpID09PSAxIHx8IGkgPT09IDIgPyAxIDogMCksXG4gICAgICAgICAgICAgICAgeTogYnVja2V0UmVjdC50b3AgKyBidWNrZXRSZWN0LmhlaWdodCAqIChpID4gMSA/IDEgOiAwKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGNhdGNoYWJsZUNvcm5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgeDogY2F0Y2hSZWN0LmxlZnQgKyBjYXRjaFJlY3Qud2lkdGggKiAoaSA9PT0gMSB8fCBpID09PSAyID8gMSA6IDApLFxuICAgICAgICAgICAgICAgIHk6IGNhdGNoUmVjdC50b3AgKyBjYXRjaFJlY3QuaGVpZ2h0ICogKGkgPiAxID8gMSA6IDApLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2tvYXNoLnV0aWwuZG9JbnRlcnNlY3QoYnVja2V0Q29ybmVycywgY2F0Y2hhYmxlQ29ybmVycyk7XG4gICAgfVxuXG4gICAgc2VsZWN0Q2F0Y2hhYmxlKGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkIHx8ICF0aGlzLnN0YXRlLmNhbkNhdGNoIHx8XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy5jYW5DYXRjaCB8fCAhY2F0Y2hhYmxlUmVmLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICAgICAgY2F0Y2hhYmxlUmVmLm1hcmtDYXVnaHQoKTtcbiAgICAgICAgaWYgKGNhdGNoYWJsZVJlZi5wcm9wcy5tZXNzYWdlID09PSBidWNrZXRSZWYucHJvcHMubWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvcnJlY3QoYnVja2V0UmVmLCBjYXRjaGFibGVSZWYpIHtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2NvcnJlY3QnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvcnJlY3QuY2FsbCh0aGlzLCBidWNrZXRSZWYsIGNhdGNoYWJsZVJlZik7XG4gICAgfVxuXG4gICAgaW5jb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdpbmNvcnJlY3QnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkluY29ycmVjdC5jYWxsKHRoaXMsIGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2F0Y2hlcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQnVja2V0KCkge1xuICAgICAgICByZXR1cm4gXy5tYXAoW10uY29uY2F0KHRoaXMucHJvcHMuYnVja2V0KSwgKGJ1Y2tldCwga2V5KSA9PlxuICAgICAgICAgICAgPGJ1Y2tldC50eXBlXG4gICAgICAgICAgICAgICAgey4uLmJ1Y2tldC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eydidWNrZXRzLScgKyBrZXl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUuc3R5bGVzW2tleV19XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPVwiY2F0Y2hlclwiIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCdhc3NldHMnKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCdWNrZXQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ2F0Y2hlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBtb3ZlQnVja2V0czogZmFsc2UsXG4gICAgb25Nb3ZlOiBfLm5vb3AsXG4gICAgY2FuQ2F0Y2g6IHRydWUsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGNoZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEnO1xuXG5jbGFzcyBDYXRjaCBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjYW5DYXRjaDogdHJ1ZSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9ucyA9IHRoaXMuY2hlY2tDb2xsaXNpb25zLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICB0aGlzLmF0dGFjaE1vdXNlRXZlbnRzKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKTtcblxuICAgICAgICB0aGlzLmJ1Y2tldE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuYnVja2V0KTtcbiAgICAgICAgdGhpcy5jYXRjaGFibGVOb2RlcyA9IF8ubWFwKHRoaXMucHJvcHMuY2F0Y2hhYmxlcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzW2Ake2tleX0tY2F0Y2hhYmxlYF0pO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBfLmZvckVhY2godGhpcy5jYXRjaGFibGVOb2RlcywgZnVuY3Rpb24gKG5vZGUsIGtleSkge1xuICAgICAgICAgICAgdmFyIGNhdGNoYWJsZVJlZiA9IHRoaXMucmVmc1tgJHtrZXl9LWNhdGNoYWJsZWBdO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25pdGVyYXRpb24nLCBjYXRjaGFibGVSZWYucmVzZXQsIGZhbHNlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgdmFyIGNhdGNoUmVmID0gdGhpcy5yZWZzWydjYXRjaC1jb21wb25lbnQnXTtcbiAgICAgICAgaWYgKGNhdGNoUmVmKSB7XG4gICAgICAgICAgICBjYXRjaFJlZi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1vdXNlWDogZS5wYWdlWFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ2dldFN0YXRlJykudGhlbihzdGF0ZSA9PiB7XG4gICAgICAgICAgICB2YXIgem9vbSA9IHN0YXRlLnNjYWxlO1xuICAgICAgICAgICAgdmFyIGVkZ2VzID0gdGhpcy5nZXRFZGdlcyh0aGlzLmJ1Y2tldE5vZGUpO1xuICAgICAgICAgICAgdmFyIGJ1Y2tldFdpZHRoID0gZWRnZXMucmlnaHQgLSBlZGdlcy5sZWZ0O1xuICAgICAgICAgICAgdmFyIGxlZnRCb3VuZCA9IHRoaXMuYnVja2V0Tm9kZS5vZmZzZXRQYXJlbnQgP1xuICAgICAgICAgICAgICAgIHRoaXMuYnVja2V0Tm9kZS5vZmZzZXRQYXJlbnQub2Zmc2V0V2lkdGggLSBidWNrZXRXaWR0aCA6IDA7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1Y2tldFRvcDogZWRnZXMudG9wLFxuICAgICAgICAgICAgICAgIGJ1Y2tldEJvdHRvbTogZWRnZXMuYm90dG9tLFxuICAgICAgICAgICAgICAgIGJ1Y2tldFdpZHRoLFxuICAgICAgICAgICAgICAgIGxlZnRCb3VuZCxcbiAgICAgICAgICAgICAgICB6b29tXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRoaXMuY2hlY2tDb2xsaXNpb25zKTtcbiAgICAgICAgdGhpcy5ib290c3RyYXAoKTtcbiAgICB9XG5cbiAgICByZXN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9ucygpO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdXNlZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bWUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF1c2VkOiBmYWxzZVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdENhdGNoYWJsZShjYXRjaGFibGVOb2RlLCBrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQgfHwgIXRoaXMuc3RhdGUuY2FuQ2F0Y2ggfHxcbiAgICAgICAgICAgICFjYXRjaGFibGVOb2RlLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICAgICAgY2F0Y2hhYmxlTm9kZS5tYXJrQ2F1Z2h0KCk7XG4gICAgICAgIGlmIChjYXRjaGFibGVOb2RlLnByb3BzLmlzQ29ycmVjdCkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGNhdGNoYWJsZU5vZGUsIGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdChjYXRjaGFibGVOb2RlLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ycmVjdChjYXRjaGFibGUsIGtleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ29ycmVjdC5jYWxsKHRoaXMsIGNhdGNoYWJsZSwga2V5KTtcbiAgICB9XG5cbiAgICBpbmNvcnJlY3QoY2F0Y2hhYmxlLCBrZXkpIHtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2luY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgY2F0Y2hhYmxlLCBrZXkpO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucygpIHtcbiAgICAgICAgdmFyIGJ1Y2tldFJlY3QgPSB0aGlzLmJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNhdGNoYWJsZU5vZGVzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIHZhbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhdGNoYWJsZSh0aGlzLnJlZnNbYCR7a2V5fS1jYXRjaGFibGVgXSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hSZWN0KSB7XG4gICAgICAgIHZhciB4Q2VudGVyID0gY2F0Y2hSZWN0LmxlZnQgKyAoY2F0Y2hSZWN0LnJpZ2h0IC0gY2F0Y2hSZWN0LmxlZnQpIC8gMjtcbiAgICAgICAgdmFyIHlPZmZzZXQgPSAoY2F0Y2hSZWN0LmJvdHRvbSAtIGNhdGNoUmVjdC50b3ApIC8gNjtcbiAgICAgICAgcmV0dXJuIChidWNrZXRSZWN0LnRvcCA8IGNhdGNoUmVjdC5ib3R0b20gLSB5T2Zmc2V0ICYmIGJ1Y2tldFJlY3QudG9wID4gY2F0Y2hSZWN0LnRvcCArIHlPZmZzZXQgJiZcbiAgICB4Q2VudGVyID4gYnVja2V0UmVjdC5sZWZ0ICYmIHhDZW50ZXIgPCBidWNrZXRSZWN0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRFZGdlcyhlbCkge1xuICAgICAgICB2YXIgdG9wO1xuICAgICAgICB2YXIgbGVmdDtcbiAgICAgICAgdmFyIHdpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0O1xuXG4gICAgICAgIGxlZnQgPSAwO1xuICAgICAgICB0b3AgPSAwO1xuICAgICAgICB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgICBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgd2hpbGUgKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwuY2xhc3NOYW1lICYmIGVsLmNsYXNzTmFtZS5pbmRleE9mKCdzY3JlZW4nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGVmdCArPSBlbC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgICAgICB0b3AgKz0gZWwub2Zmc2V0VG9wIHx8IDA7XG4gICAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICBib3R0b206IHRvcCArIGhlaWdodCxcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodDogbGVmdCArIHdpZHRoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIHZhciBsZWZ0ID0gKHRoaXMuc3RhdGUubW91c2VYIC8gdGhpcy5zdGF0ZS56b29tKSAtICh0aGlzLnN0YXRlLmJ1Y2tldFdpZHRoIC8gMik7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJ1Y2tldEluQm91bmRzKSB7XG4gICAgICAgICAgICBsZWZ0ID0gbGVmdCA8IDEgPyAxIDogbGVmdDtcbiAgICAgICAgICAgIGxlZnQgPSBsZWZ0ID49IHRoaXMuc3RhdGUubGVmdEJvdW5kID8gdGhpcy5zdGF0ZS5sZWZ0Qm91bmQgLSAxIDogbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiBgJHtsZWZ0fXB4YFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlckJ1Y2tldCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmJ1Y2tldC50eXBlXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuYnVja2V0LnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj1cImJ1Y2tldFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2F0Y2hhYmxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2F0Y2hhYmxlcy5tYXAoKGl0ZW0sIGtleSkgPT5cbiAgICAgICAgICAgIDxDYXRjaGFibGVcbiAgICAgICAgICAgICAgICB7Li4uaXRlbS5wcm9wc31cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICByZWY9e2Ake2tleX0tY2F0Y2hhYmxlYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2NhdGNoJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj1cImNhdGNoLWNvbXBvbmVudFwiIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJpdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYXRjaGFibGVzKCl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCdWNrZXQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxufVxuXG5DYXRjaC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBjYXRjaGFibGVzOiBbXSxcbiAgICBidWNrZXRJbkJvdW5kczogdHJ1ZSxcbiAgICBidWNrZXQ6IDxza29hc2guQ29tcG9uZW50IC8+LFxuICAgIG9uQ29ycmVjdDogXy5ub29wLFxuICAgIG9uSW5jb3JyZWN0OiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGNoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2gvMC4xLmpzIiwiaW1wb3J0IENhdGNoR2FtZVNjcmVlbkNvbXBvbmVudCBmcm9tICcuL2NhdGNoX2dhbWVfc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gQ2F0Y2hHYW1lU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2NhdGNoLWdhbWUtbGV2ZWwtdHdvJyxcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHJvd3M6IDQsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgcHJlcFRpbWVvdXQ6IDUwMCxcbiAgICAgICAgYmluOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnbXVzaHJvb20nLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2JhbmFuYScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ3RyYXNoJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdwYXBlcicsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ3RyYXNoJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdkb2cnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2JhdHRlcnknLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZHVjaycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnc3F1aXJyZWwnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RpcmUnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYmx1ZS1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3llbGxvdy1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3JlZC1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3B1cnBsZS1mbG93ZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2dsYXNzJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAndHJhc2gnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3BsYXN0aWMnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHZvczogW1xuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgcmVmPVwibGV2ZWwtdXBcIlxuICAgICAgICAgICAgICAgIHNpbGVudE9uU3RhcnRcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvTGV2ZWxVcC5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvQ29uZ3JhdHVsYXRpb25zLm1wMyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+LFxuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgcmVmPVwidHJ5LWFnYWluXCJcbiAgICAgICAgICAgICAgICBzaWxlbnRPblN0YXJ0XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL1RyeUFnYWluLm1wMyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9UcnlBZ2Fpbi5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvWW91RGlkbnRXaW4ubXAzJ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT4sXG4gICAgICAgIF0sXG4gICAgICAgIHNmeDogW1xuICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgIHJlZj1cIm1pc3NcIlxuICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3NvdW5kcy9fZWZmZWN0cy9Mb3NlUG9pbnRzLm1wMyd9XG4gICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgIC8+LFxuICAgICAgICBdLFxuICAgICAgICByZXZlYWxMaXN0OiBbXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHJlZj1cImxldmVsLXVwXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsZXZlbC11cFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbmdyYXR1bGF0aW9uc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGV2ZWwtdXBcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgcmVmPVwidHJ5LWFnYWluXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0cnktYWdhaW5cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyeS1hZ2FpblwiIC8+XG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3Jkc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICBdXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvY2F0Y2hfZ2FtZV9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ2F0Y2hHYW1lU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vY2F0Y2hfZ2FtZV9zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBDYXRjaEdhbWVTY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnY2F0Y2gtZ2FtZS1sZXZlbC10aHJlZScsXG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICByb3dzOiA1LFxuICAgICAgICB0aW1lb3V0OiAxMjAwMDAsXG4gICAgICAgIHByZXBUaW1lb3V0OiA0MDAsXG4gICAgICAgIGJpbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ211c2hyb29tJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdiYW5hbmEnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAncGFwZXInLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd0cmFzaCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZG9nJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdiYXR0ZXJ5JyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAndHJhc2gnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2R1Y2snLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3NxdWlycmVsJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0aXJlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAndHJhc2gnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2JsdWUtZmxvd2VyJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd5ZWxsb3ctZmxvd2VyJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdyZWQtZmxvd2VyJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdwdXJwbGUtZmxvd2VyJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdnbGFzcycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ3RyYXNoJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdwbGFzdGljJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAndHJhc2gnXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICB2b3M6IFtcbiAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHJlZj1cImxldmVsLXVwXCJcbiAgICAgICAgICAgICAgICBzaWxlbnRPblN0YXJ0XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL1dpblRoZUdhbWUxLm1wMyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9Zb3V2ZVdvbi5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvWW91dmVQaWNrZWRVcC5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgcGxheVRhcmdldD1cImZhbGxcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvTGl0dGVyYnVnZmFsbC5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgICAgICAgICAgc2lsZW50T25TdGFydFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3NvdW5kcy9fZWZmZWN0cy9UcnlBZ2Fpbi5tcDMnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgc3JjPXsnbWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvVHJ5QWdhaW4ubXAzJ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17J21lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1lvdURpZG50V2luLm1wMyd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+LFxuICAgICAgICBdLFxuICAgICAgICBzZng6IFtcbiAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICByZWY9XCJtaXNzXCJcbiAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvTG9zZVBvaW50cy5tcDMnfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAvPixcbiAgICAgICAgXSxcbiAgICAgICAgcmV2ZWFsTGlzdDogW1xuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICByZWY9XCJsZXZlbC11cFwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdsZXZlbC11cCcsICd5b3V2ZS13b24nLCB7XG4gICAgICAgICAgICAgICAgICAgIGZhbGw6IF8uZ2V0KHByb3BzLCAnZGF0YS5mYWxsLnBsYXlpbmcnKVxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJsaVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICBzcmM9eydtZWRpYS9fYXNzZXRzL19pbWFnZXMvbGl0dGVyYnVnXy5wbmcnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25ncmF0dWxhdGlvbnNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxldmVsLXVwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHJlZj1cInRyeS1hZ2FpblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJ5LWFnYWluXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ5LWFnYWluXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3Jkc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTdGF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL2NhdGNoX2dhbWVfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBNZWRpYUNvbGxlY3Rpb24gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWVkaWFfY29sbGVjdGlvbi8wLjEnO1xuaW1wb3J0IFJldmVhbFByb21wdCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9yZXZlYWxfcHJvbXB0LzAuMSc7XG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvMC4xJztcbmltcG9ydCBDYW5ub24gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2Fubm9uLzAuMic7XG5pbXBvcnQgUmFuZG9taXplciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9yYW5kb21pemVyLzAuMSc7XG5pbXBvcnQgVGltZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvdGltZXIvMC4xJztcbmltcG9ydCBTY29yZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zY29yZS8wLjEnO1xuXG5jb25zdCBDT05GSUcgPSB7XG4gICAgTFZMOiAxLFxuICAgIFBPSU5UUzogMTAwLFxuICAgIFRJTUVSOiAzMDAwMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiY2xlYW4tdXAtZ2FtZS1sdmwtMVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZSByZWY9XCJpbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTFcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvSW5zdHJ1Y3Rpb25zLm1wM1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTJcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvVG9zc0xpdHRlci5tcDNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by0zXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0dldDEwMC5tcDNcIlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVRhcmdldD1cImluc3RydWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG5cbiAgICAgICAgICAgIDxNZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBwbGF5PXtfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLnBsYXknLCBudWxsKX1cbiAgICAgICAgICAgICAgICBvblBsYXk9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheTogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlIHJlZj1cImNvbXBsZXRlXCIgc2lsZW50T25TdGFydD5cbiAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by0xXCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9MZXZlbDEubXAzXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tMlwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvV293Lm1wM1wiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTNcIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1lvdUhhdmVHcmVhdC5tcDNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZSByZWY9XCJ0cnktYWdhaW5cIiBzaWxlbnRPblN0YXJ0IGNvbXBsZXRlPlxuICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTRcIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0xldmVsTG9zdC5tcDNcIlxuICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTVcIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL09oTm8ubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by02XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9QYXJrU3RpbGwubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZSByZWY9XCJ0aHJvd1wiIHNpbGVudE9uU3RhcnQ+XG4gICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tN1wiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL0Zhc3RTd2lzaC5tcDNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by04XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvV2luUG9pbnRzLm1wM1wiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICA8L01lZGlhQ29sbGVjdGlvbj5cblxuICAgICAgICAgICAgPFJldmVhbFByb21wdFxuICAgICAgICAgICAgICAgIHJlZj1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgb3Blbk9uU3RhcnQ9XCJpbnN0cnVjdGlvbnNcIlxuICAgICAgICAgICAgICAgIG9wZW5SZXZlYWw9e18uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIG51bGwpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc0NvbXBsZXRlOiBfLmdldChwcm9wcywgJ2RhdGEuaW5zdHJ1Y3Rpb25zLmNvbXBsZXRlJylcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbk9wZW49e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbkNsb3NlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgbGlzdD17W1xuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBkYXRhLXJlZj1cImluc3RydWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZnJhbWUgaW5zdHJ1Y3Rpb25zLWx2bC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb3NzIHRoZSBsaXR0ZXIgaW4gdGhlIGNhbnMgdG88YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW4gdXAgYnkgY2xpY2tpbmcsIGFpbWluZyw8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGxldHRpbmcgZ28hXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJodW5kcmVkXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzIGJlZm9yZSB0aGUgdGltZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVucyBvdXQgdG8gd2luIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PixcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgZGF0YS1yZWY9XCJjb21wbGV0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZnJhbWUgY29tcGxldGUtbHZsLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBoYXZlIHNvbWUgZ3JlYXQgY2xlYW5pbmcgc2tpbGxzITxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBLZWVwIHVwIHRoZSBnb29kIHdvcmshXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBkYXRhLXJlZj1cInRyeS1hZ2FpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBwYXJrIGlzIHN0aWxsIGNvdmVyZWQgd2l0aCB0cmFzaDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXQgeW91IHN0aWxsIGhhdmUgYSBjaGFuY2UgdG8gY2xlYW48YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGJlYXQgdGhlIExpdHRlcmJ1ZyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPENhcm91c2VsXG4gICAgICAgICAgICAgICAgcmVmPVwiY2Fyb3VzZWxcIlxuICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBzaG93TnVtPXs1fVxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4PXsyfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtfLmdldChwcm9wcywgJ2RhdGEuY2Fubm9uLmZpcmUnKX1cbiAgICAgICAgICAgICAgICBvblNlbGVjdD17ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUucG9pbnRzJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzW3RhcmdldC5wcm9wc1snZGF0YS1rZXknXV0gPSAnU0VMRUNURUQnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzW3RhcmdldC5wcm9wc1snZGF0YS1rZXknXV0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPCBDT05GSUcuUE9JTlRTKSBzY29yZSArPSB0YXJnZXQucHJvcHMudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3Njb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29yZSA+PSBDT05GSUcuUE9JTlRTICYgIV8uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICdjb21wbGV0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheTogJ2NvbXBsZXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJhbmRvbWl6ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW49e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmaXZlXCIgbmFtZT1cImZpdmVcIiB2YWx1ZT17NX0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidGVuXCIgbmFtZT1cInRlblwiIHZhbHVlPXsxMH0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidHdlbnR5XCIgbmFtZT1cInR3ZW50eVwiIHZhbHVlPXsyMH0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidGhpcnR5XCIgbmFtZT1cInRoaXJ0eVwiIHZhbHVlPXszMH0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxDYW5ub25cbiAgICAgICAgICAgICAgICByZWY9XCJjYW5ub25cIlxuICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICByZXZlcnNlUmVsb2FkPXt0cnVlfVxuICAgICAgICAgICAgICAgIGxhdW5jaEJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICByZWxvYWRUaW1lPXsyMDAwfVxuICAgICAgICAgICAgICAgIHNob3dOdW09ezR9XG4gICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgIDxSYW5kb21pemVyXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInJhbmRvbWl6ZXJcIlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBiaW49e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInBsYXN0aWMtYm90dGxlXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJzb2RhLWNhblwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiYmFuYW5hLXBlYWxcIiBjb21wbGV0ZSAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImdsYXNzLWJvdHRsZVwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiY3J1bWJsZWQtcGFwZXJcIiBjb21wbGV0ZSAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInR1bmEtY2FuXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJ0aXJlXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJiYXR0ZXJ5XCIgY29tcGxldGUvPixcbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uRmlyZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5OiAndGhyb3cnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnY2Fubm9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uUmVsb2FkPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdjYW5ub24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImdyYXNzXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwic3RhdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGV2ZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtDT05GSUcuTFZMfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPFRpbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJ0aW1lclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudERvd249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtDT05GSUcuVElNRVJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb21wbGV0ZScsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb21wbGV0ZScsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLnN0YXJ0JywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc3RhcnQnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5wb2ludHMnLCAwKSA8IENPTkZJRy5QT0lOVFMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogJ3RyeS1hZ2FpbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheTogJ3RyeS1hZ2FpbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3Njb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICA8U2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInNjb3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heD17Q09ORklHLlBPSU5UU31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e18uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5wb2ludHMnLCAwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5wb2ludHMnLCAwKSA9PT0gQ09ORklHLlBPSU5UU31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL2NsZWFuX3VwX2dhbWVfbHZsMV9zY3JlZW4uanMiLCJpbXBvcnQgQ2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV2ZWFsUHJvbXB0IGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIG9wZW5SZXZlYWw6ICcnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTtcblxuICAgICAgICBpZiAobmV4dFByb3BzLm9wZW5SZXZlYWwgJiYgbmV4dFByb3BzLm9wZW5SZXZlYWwgIT09IHRoaXMucHJvcHMub3BlblJldmVhbCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuKG5leHRQcm9wcy5vcGVuUmV2ZWFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuY2xvc2VSZXZlYWwgPT09IHRydWUgJiYgbmV4dFByb3BzLmNsb3NlUmV2ZWFsICE9PSB0aGlzLnByb3BzLmNsb3NlUmV2ZWFsKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vcGVuT25TdGFydCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuKHRoaXMucHJvcHMub3Blbk9uU3RhcnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbihtZXNzYWdlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICAgICAgb3BlblJldmVhbDogJycgKyBtZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnByb3BzLm9uT3Blbi5jYWxsKHNlbGYsIG1lc3NhZ2UpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmNvbXBsZXRlT25PcGVuKSB7XG4gICAgICAgICAgICBzZWxmLmNvbXBsZXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLmVhY2goc2VsZi5yZWZzLCAocmVmLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVmICYmIGtleSA9PT0gbWVzc2FnZSkgcmVmLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmF1dG9DbG9zZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdmFyIHByZXZNZXNzYWdlID0gdGhpcy5zdGF0ZS5vcGVuUmV2ZWFsO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25DbG9zZS5jYWxsKHRoaXMsIHByZXZNZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgb3BlblJldmVhbDogJycsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmxpc3QubWFwKChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVmID0gbGkucmVmID09IG51bGwgPyBrZXkgOiBsaS5yZWY7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICA8bGkudHlwZVxuICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzcyhsaSwga2V5KX1cbiAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3MobGksIGtleSkge1xuICAgICAgICByZXR1cm4gQ2xhc3NOYW1lcyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBbbGkucHJvcHMuY2xhc3NOYW1lXTogbGkucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIE9QRU46IHRoaXMuc3RhdGUub3BlblJldmVhbC5pbmRleE9mKGtleSkgIT09IC0xIHx8XG4gICAgICAgICAgdGhpcy5zdGF0ZS5vcGVuUmV2ZWFsLmluZGV4T2YobGkucHJvcHNbJ2RhdGEtcmVmJ10pICE9PSAtMSB8fFxuICAgICAgICAgIHRoaXMuc3RhdGUub3BlblJldmVhbC5pbmRleE9mKGxpLnJlZikgIT09IC0xXG4gICAgICAgICAgICB9XG4gICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gQ2xhc3NOYW1lcyhcbiAgICAgIHN1cGVyLmdldENsYXNzTmFtZXMoKSxcbiAgICAgICdyZXZlYWwnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFsnb3Blbi0nICsgdGhpcy5zdGF0ZS5vcGVuUmV2ZWFsXTogdGhpcy5zdGF0ZS5vcGVuUmV2ZWFsLFxuICAgICAgICAgICAgICAgICdvcGVuLW5vbmUnOiAhdGhpcy5zdGF0ZS5vcGVuUmV2ZWFsXG4gICAgICAgICAgICB9XG4gICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjbG9zZS1yZXZlYWxcIiBvbkNsaWNrPXt0aGlzLmNsb3NlLmJpbmQodGhpcyl9PjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SZXZlYWxQcm9tcHQuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgbGlzdDogW1xuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT5cbiAgICBdLFxuICAgIG9uT3BlbjogXy5ub29wLFxuICAgIG9uQ2xvc2U6IF8ubm9vcCxcbiAgICBjbG9zZURlbGF5OiAwLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcmV2ZWFsX3Byb21wdC8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuXG5pbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMSc7XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2VsZWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWQgJiYgbmV4dFByb3BzLnNlbGVjdGVkICE9PSB0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzO1xuICAgICAgICB2YXIgbGlzdDtcbiAgICAgICAgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICAgICAgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICAgICAgbGlzdCA9IGxpc3QuY29uY2F0KHRoaXMucmVmcy5iaW4uZ2V0KDEpKTtcbiAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBjbGFzc2VzWzBdID0gJyc7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgbGlzdCxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlc1swXSA9ICdMRUFWRSc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLnByb3BzLnBhdXNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICB2YXIgbGlzdDtcbiAgICAgICAgLy8gc2tvYXNoLkNvbXBvbmVudCBpcyBub3QgdGhlIHN1cGVyIGhlcmUsIGJ1dCB0aGlzIGlzIHdoYXQgd2Ugd2FudFxuICAgICAgICBza29hc2guQ29tcG9uZW50LnByb3RvdHlwZS5ib290c3RyYXAuY2FsbCh0aGlzKTtcblxuICAgICAgICBsaXN0ID0gdGhpcy5yZWZzLmJpbiA/IHRoaXMucmVmcy5iaW4uZ2V0KHRoaXMucHJvcHMuc2hvd051bSArIDEpIDogdGhpcy5wcm9wcy5saXN0O1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGlzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2Fyb3VzZWwnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAvKlxuICAgKiBzaG9ydGlkIGlzIGludGVudGlvbmFsbHkgbm90IHVzZWQgZm9yIGtleSBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICovXG4gICAgcmVuZGVyTGlzdCgpIHtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnN0YXRlLmxpc3QgfHwgdGhpcy5wcm9wcy5saXN0O1xuICAgICAgICByZXR1cm4gbGlzdC5tYXAoKGxpLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICB2YXIgb25UcmFuc2l0aW9uRW5kO1xuICAgICAgICAgICAgcmVmID0gbGkucmVmIHx8IGxpLnByb3BzWydkYXRhLXJlZiddIHx8IGtleTtcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZCA9IGtleSA9PT0gMCA/IHRoaXMubmV4dCA6IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGtleSwgbGkpfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e2xpLnByb3BzLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEta2V5PXtzaG9ydGlkKGtleSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIG9uQ2xpY2sgPSB0aGlzLnByb3BzLmNsaWNrYWJsZSA/IHRoaXMuc3RhdGUuc2VsZWN0RnVuY3Rpb24uYmluZCh0aGlzKSA6IG51bGw7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gb25DbGljaz17b25DbGlja30+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ2Fyb3VzZWwuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgc2hvd051bTogMyxcbiAgICB0YXJnZXRJbmRleDogMSxcbiAgICBwYXVzZTogNTAwLFxuICAgIGNsaWNrYWJsZTogZmFsc2UsXG4gICAgb25TZWxlY3Q6IF8ubm9vcCxcbn0sIFNlbGVjdGFibGUuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEuanMiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGVuY29kZSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG52YXIgZGVjb2RlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi9pcy12YWxpZCcpO1xuXG4vLyBJZ25vcmUgYWxsIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBjZXJ0YWluIHRpbWUgdG8gcmVkdWNlIHRoZSBzaXplIG9mIHRoZSBkYXRlIGVudHJvcHkgd2l0aG91dCBzYWNyaWZpY2luZyB1bmlxdWVuZXNzLlxuLy8gVGhpcyBudW1iZXIgc2hvdWxkIGJlIHVwZGF0ZWQgZXZlcnkgeWVhciBvciBzbyB0byBrZWVwIHRoZSBnZW5lcmF0ZWQgaWQgc2hvcnQuXG4vLyBUbyByZWdlbmVyYXRlIGBuZXcgRGF0ZSgpIC0gMGAgYW5kIGJ1bXAgdGhlIHZlcnNpb24uIEFsd2F5cyBidW1wIHRoZSB2ZXJzaW9uIVxudmFyIFJFRFVDRV9USU1FID0gMTQ1OTcwNzYwNjUxODtcblxuLy8gZG9uJ3QgY2hhbmdlIHVubGVzcyB3ZSBjaGFuZ2UgdGhlIGFsZ29zIG9yIFJFRFVDRV9USU1FXG4vLyBtdXN0IGJlIGFuIGludGVnZXIgYW5kIGxlc3MgdGhhbiAxNlxudmFyIHZlcnNpb24gPSA2O1xuXG4vLyBpZiB5b3UgYXJlIHVzaW5nIGNsdXN0ZXIgb3IgbXVsdGlwbGUgc2VydmVycyB1c2UgdGhpcyB0byBtYWtlIGVhY2ggaW5zdGFuY2Vcbi8vIGhhcyBhIHVuaXF1ZSB2YWx1ZSBmb3Igd29ya2VyXG4vLyBOb3RlOiBJIGRvbid0IGtub3cgaWYgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB3aGVuIHVzaW5nIHRoaXJkXG4vLyBwYXJ0eSBjbHVzdGVyIHNvbHV0aW9ucyBzdWNoIGFzIHBtMi5cbnZhciBjbHVzdGVyV29ya2VySWQgPSByZXF1aXJlKCcuL3V0aWwvY2x1c3Rlci13b3JrZXItaWQnKSB8fCAwO1xuXG4vLyBDb3VudGVyIGlzIHVzZWQgd2hlbiBzaG9ydGlkIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiBvbmUgc2Vjb25kLlxudmFyIGNvdW50ZXI7XG5cbi8vIFJlbWVtYmVyIHRoZSBsYXN0IHRpbWUgc2hvcnRpZCB3YXMgY2FsbGVkIGluIGNhc2UgY291bnRlciBpcyBuZWVkZWQuXG52YXIgcHJldmlvdXNTZWNvbmRzO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCB2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgc2Vjb25kcyk7XG5cbiAgICByZXR1cm4gc3RyO1xufVxuXG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuXG4vLyBFeHBvcnQgYWxsIG90aGVyIGZ1bmN0aW9ucyBhcyBwcm9wZXJ0aWVzIG9mIHRoZSBnZW5lcmF0ZSBmdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5zZWVkID0gc2VlZDtcbm1vZHVsZS5leHBvcnRzLndvcmtlciA9IHdvcmtlcjtcbm1vZHVsZS5leHBvcnRzLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xubW9kdWxlLmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMuaXNWYWxpZCA9IGlzVmFsaWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21Gcm9tU2VlZCA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQnKTtcblxudmFyIE9SSUdJTkFMID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXy0nO1xudmFyIGFscGhhYmV0O1xudmFyIHByZXZpb3VzU2VlZDtcblxudmFyIHNodWZmbGVkO1xuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBzaHVmZmxlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBpZiAoIV9hbHBoYWJldF8pIHtcbiAgICAgICAgaWYgKGFscGhhYmV0ICE9PSBPUklHSU5BTCkge1xuICAgICAgICAgICAgYWxwaGFiZXQgPSBPUklHSU5BTDtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfID09PSBhbHBoYWJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8ubGVuZ3RoICE9PSBPUklHSU5BTC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gWW91IHN1Ym1pdHRlZCAnICsgX2FscGhhYmV0Xy5sZW5ndGggKyAnIGNoYXJhY3RlcnM6ICcgKyBfYWxwaGFiZXRfKTtcbiAgICB9XG5cbiAgICB2YXIgdW5pcXVlID0gX2FscGhhYmV0Xy5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZCwgYXJyKXtcbiAgICAgICByZXR1cm4gaW5kICE9PSBhcnIubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBpZiAodW5pcXVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBUaGVzZSBjaGFyYWN0ZXJzIHdlcmUgbm90IHVuaXF1ZTogJyArIHVuaXF1ZS5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBhbHBoYWJldCA9IF9hbHBoYWJldF87XG4gICAgcmVzZXQoKTtcbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKTtcbiAgICByZXR1cm4gYWxwaGFiZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgIHJhbmRvbUZyb21TZWVkLnNlZWQoc2VlZCk7XG4gICAgaWYgKHByZXZpb3VzU2VlZCAhPT0gc2VlZCkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcmV2aW91c1NlZWQgPSBzZWVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSgpIHtcbiAgICBpZiAoIWFscGhhYmV0KSB7XG4gICAgICAgIHNldENoYXJhY3RlcnMoT1JJR0lOQUwpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcbiAgICB2YXIgdGFyZ2V0QXJyYXkgPSBbXTtcbiAgICB2YXIgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgIHZhciBjaGFyYWN0ZXJJbmRleDtcblxuICAgIHdoaWxlIChzb3VyY2VBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICAgICAgY2hhcmFjdGVySW5kZXggPSBNYXRoLmZsb29yKHIgKiBzb3VyY2VBcnJheS5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRBcnJheS5wdXNoKHNvdXJjZUFycmF5LnNwbGljZShjaGFyYWN0ZXJJbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0QXJyYXkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNodWZmbGVkKCkge1xuICAgIGlmIChzaHVmZmxlZCkge1xuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gICAgfVxuICAgIHNodWZmbGVkID0gc2h1ZmZsZSgpO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbn1cblxuLyoqXG4gKiBsb29rdXAgc2h1ZmZsZWQgbGV0dGVyXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGxvb2t1cChpbmRleCkge1xuICAgIHZhciBhbHBoYWJldFNodWZmbGVkID0gZ2V0U2h1ZmZsZWQoKTtcbiAgICByZXR1cm4gYWxwaGFiZXRTaHVmZmxlZFtpbmRleF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNoYXJhY3RlcnM6IGNoYXJhY3RlcnMsXG4gICAgc2VlZDogc2V0U2VlZCxcbiAgICBsb29rdXA6IGxvb2t1cCxcbiAgICBzaHVmZmxlZDogZ2V0U2h1ZmZsZWRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2FscGhhYmV0LmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21CeXRlID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWJ5dGUnKTtcblxuZnVuY3Rpb24gZW5jb2RlKGxvb2t1cCwgbnVtYmVyKSB7XG4gICAgdmFyIGxvb3BDb3VudGVyID0gMDtcbiAgICB2YXIgZG9uZTtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBzdHIgPSBzdHIgKyBsb29rdXAoICggKG51bWJlciA+PiAoNCAqIGxvb3BDb3VudGVyKSkgJiAweDBmICkgfCByYW5kb21CeXRlKCkgKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKTsgLy8gSUUgMTEgdXNlcyB3aW5kb3cubXNDcnlwdG9cblxuZnVuY3Rpb24gcmFuZG9tQnl0ZSgpIHtcbiAgICBpZiAoIWNyeXB0byB8fCAhY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSAmIDB4MzA7XG4gICAgfVxuICAgIHZhciBkZXN0ID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhkZXN0KTtcbiAgICByZXR1cm4gZGVzdFswXSAmIDB4MzA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tQnl0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuLyoqXG4gKiBEZWNvZGUgdGhlIGlkIHRvIGdldCB0aGUgdmVyc2lvbiBhbmQgd29ya2VyXG4gKiBNYWlubHkgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZy5cbiAqIEBwYXJhbSBpZCAtIHRoZSBzaG9ydGlkLWdlbmVyYXRlZCBpZC5cbiAqL1xuZnVuY3Rpb24gZGVjb2RlKGlkKSB7XG4gICAgdmFyIGNoYXJhY3RlcnMgPSBhbHBoYWJldC5zaHVmZmxlZCgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHZlcnNpb246IGNoYXJhY3RlcnMuaW5kZXhPZihpZC5zdWJzdHIoMCwgMSkpICYgMHgwZixcbiAgICAgICAgd29ya2VyOiBjaGFyYWN0ZXJzLmluZGV4T2YoaWQuc3Vic3RyKDEsIDEpKSAmIDB4MGZcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbmZ1bmN0aW9uIGlzU2hvcnRJZChpZCkge1xuICAgIGlmICghaWQgfHwgdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5sZW5ndGggPCA2ICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJhY3RlcnMgPSBhbHBoYWJldC5jaGFyYWN0ZXJzKCk7XG4gICAgdmFyIGxlbiA9IGlkLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuO2krKykge1xuICAgICAgICBpZiAoY2hhcmFjdGVycy5pbmRleE9mKGlkW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5TZWxlY3RhYmxlXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5jb25zb2xlLndhcm4oJ0FzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlNlbGVjdGFibGUnKTtcbi8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgU2VsZWN0YWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjbGFzc2VzOiB7fSxcbiAgICAgICAgICAgIHNlbGVjdEZ1bmN0aW9uOiB0aGlzLnNlbGVjdCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdmFyIHNlbGVjdENsYXNzO1xuICAgICAgICB2YXIgc2VsZWN0RnVuY3Rpb247XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgc2VsZWN0Q2xhc3MgPSB0aGlzLnByb3BzLnNlbGVjdENsYXNzIHx8IHRoaXMuc3RhdGUuc2VsZWN0Q2xhc3MgfHwgJ1NFTEVDVEVEJztcbiAgICAgICAgc2VsZWN0RnVuY3Rpb24gPSBzZWxlY3RDbGFzcyA9PT0gJ0hJR0hMSUdIVEVEJyA/IHRoaXMuaGlnaGxpZ2h0IDogdGhpcy5zZWxlY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0T25TdGFydCkge1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLnByb3BzLnNlbGVjdE9uU3RhcnRdID0gc2VsZWN0Q2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IHRydWUsXG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgc2VsZWN0RnVuY3Rpb24sXG4gICAgICAgICAgICBzZWxlY3RDbGFzcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgICAgICBpZiAodGhpcy5yZWZzLmJpbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgbGlzdDogdGhpcy5yZWZzLmJpbi5nZXRBbGwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcykge1xuICAgICAgICB2YXIgcmVmO1xuICAgICAgICB2YXIgZGF0YVJlZjtcbiAgICAgICAgdmFyIHRhcmdldDtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICB2YXIgaXNDb3JyZWN0O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YVJlZiA9IGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdMSScpO1xuXG4gICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBkYXRhUmVmID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZiA9IHNlbGYucmVmc1tkYXRhUmVmXTtcblxuICAgICAgICBpc0NvcnJlY3QgPSAocmVmICYmIHJlZi5wcm9wcyAmJiByZWYucHJvcHMuY29ycmVjdCkgfHxcbiAgICAgICAgICAgICghc2VsZi5wcm9wcy5hbnN3ZXJzIHx8ICFzZWxmLnByb3BzLmFuc3dlcnMubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgc2VsZi5wcm9wcy5hbnN3ZXJzLmluZGV4T2YoZGF0YVJlZikgIT09IC0xKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5hbGxvd0Rlc2VsZWN0ICYmIGNsYXNzZXNbZGF0YVJlZl0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjbGFzc2VzW2RhdGFSZWZdO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ29ycmVjdCkge1xuICAgICAgICAgICAgY2xhc3Nlc1tkYXRhUmVmXSA9IHNlbGYuc3RhdGUuc2VsZWN0Q2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYucHJvcHMuc2VsZWN0UmVzcG9uZC5jYWxsKHNlbGYsIGRhdGFSZWYpO1xuICAgICAgICBzZWxmLnByb3BzLm9uU2VsZWN0LmNhbGwoc2VsZiwgZGF0YVJlZik7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuY2hvb3NlT25lKSBzZWxmLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHNlbGYucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogcmVmXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5jb21wbGV0ZUxpc3RPbkNsaWNrKSB7XG4gICAgICAgICAgICBfLmVhY2goc2VsZi5yZWZzLCAociwgaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSBpZCkgXy5pbnZva2UociwgJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyLCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoayA9PT0gZGF0YVJlZikgXy5pbnZva2UociwgJ2NvbXBsZXRlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdChlKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodChlKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICB0aGlzLnNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzcyhrZXksIGxpKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKFxuICAgICAgICAgICAgbGkucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2tleV0sXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNbbGkucHJvcHNbJ2RhdGEtcmVmJ11dLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2xpLnByb3BzWydkYXRhLWtleSddXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdzZWxlY3RhYmxlJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5zZWxlY3QgJiYgcHJvcHMuc2VsZWN0ICE9PSB0aGlzLnByb3BzLnNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5jYWxsKHRoaXMsIHByb3BzLnNlbGVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5iaW4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0KCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMucHJvcHMubGlzdCB8fCB0aGlzLnN0YXRlLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIGRhdGFSZWYgPSBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICAgICAgICB2YXIgcmVmID0gbGkucmVmIHx8IGxpLnByb3BzLmlkIHx8IGRhdGFSZWY7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGxpLnByb3BzLm1lc3NhZ2UgfHwgJycgKyBrZXk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGtleSwgbGkpfVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtkYXRhUmVmfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IG9uQ2xpY2s9e3RoaXMuc3RhdGUuc2VsZWN0RnVuY3Rpb24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TZWxlY3RhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGxpc3Q6IFtcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+XG4gICAgXSxcbiAgICBzZWxlY3RDbGFzczogJ1NFTEVDVEVEJyxcbiAgICBjb21wbGV0ZUxpc3RPbkNsaWNrOiB0cnVlLFxuICAgIHNlbGVjdFJlc3BvbmQ6IF8ubm9vcCxcbiAgICBvblNlbGVjdDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0YWJsZS8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgQ2Fubm9uIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNsYXNzZXM6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5maXJlID0gdGhpcy5maXJlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVsb2FkID0gdGhpcy5yZWxvYWQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHZhciBsaXN0O1xuXG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgICAgIGxpc3QgPSB0aGlzLnJlZnMuYmluID8gdGhpcy5yZWZzLmJpbi5nZXQodGhpcy5wcm9wcy5zaG93TnVtICsgMSkgOiB0aGlzLnByb3BzLmxpc3Q7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsaXN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBzdXBlci5zdGFydCgpO1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB2YXIgY2xhc3NlcztcbiAgICAgICAgdmFyIGxpc3Q7XG4gICAgICAgIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG4gICAgICAgIGxpc3QgPSB0aGlzLnN0YXRlLmxpc3Q7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJldmVyc2VSZWxvYWQpIHtcbiAgICAgICAgICAgIGxpc3QgPSB0aGlzLnJlZnMuYmluLmdldCgxKS5jb25jYXQobGlzdCk7XG4gICAgICAgICAgICBsaXN0LnBvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdCA9IGxpc3QuY29uY2F0KHRoaXMucmVmcy5iaW4uZ2V0KDEpKTtcbiAgICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBjbGFzc2VzW3RoaXMuc3RhdGUubGlzdC5sZW5ndGggLSAxXSA9ICdMT0FERUQnO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgIGxpc3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlyZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBmaXJlOiB0cnVlLFxuICAgICAgICAgICAgcmVsb2FkOiBmYWxzZVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5yZWxvYWRUaW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkZpcmUuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZmlyZTogZmFsc2UsXG4gICAgICAgICAgICByZWxvYWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vblJlbG9hZC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYW5ub24nLCB7XG4gICAgICAgICAgICBGSVJFOiB0aGlzLnN0YXRlLmZpcmUsXG4gICAgICAgICAgICBSRUxPQUQ6IHRoaXMuc3RhdGUucmVsb2FkXG4gICAgICAgIH0sIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3Moa2V5LCBsaSkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgICAgICAgICdhbW1vJyxcbiAgICAgICAgICAgIGxpLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1trZXldXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQmluKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYmluKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuYmluLnR5cGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5iaW4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPVwiYmluXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQW1tbygpIHtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnN0YXRlLmxpc3QgfHwgdGhpcy5wcm9wcy5saXN0O1xuICAgICAgICByZXR1cm4gbGlzdC5tYXAoKGxpLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHNbJ2RhdGEtcmVmJ10gfHwga2V5O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGkucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGtleSwgbGkpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJMYXVuY2hCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5sYXVuY2hCdXR0b24pIHJldHVybjtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXVuY2gtYnV0dG9uXCIgb25DbGljaz17dGhpcy5maXJlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbW1vLWNvbnRhaW5lclwiIC8+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQW1tbygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhdW5jaEJ1dHRvbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYW5ub24uZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgc2hvd051bTogMyxcbiAgICByZXZlcnNlUmVsb2FkOiBmYWxzZSxcbiAgICBsaXN0OiBbXG4gICAgICAgIDxsaT48L2xpPixcbiAgICAgICAgPGxpPjwvbGk+LFxuICAgICAgICA8bGk+PC9saT4sXG4gICAgICAgIDxsaT48L2xpPlxuICAgIF0sXG4gICAgb25SZWxvYWQ6IF8ubm9vcCxcbiAgICBvbkZpcmU6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fubm9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2Fubm9uLzAuMi5qcyIsIi8vIEFzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlRpbWVyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5jb25zb2xlLndhcm4oJ0FzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlRpbWVyJyk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFRpbWVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRpbWU6IDAsXG4gICAgICAgICAgICBzdGFtcDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY2hlY2tDb21wbGV0ZSA9IHRoaXMuY2hlY2tDb21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNoZWNrQ29tcGxldGUoKSB7XG4gICAgICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuY2hlY2tDb21wbGV0ZSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRpbWUgPj0gdGhpcy5zdGF0ZS5zdGFtcCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhbXA6IHRpbWUgKyAxMDAwLFxuICAgICAgICAgICAgICAgIHRpbWU6IHRoaXMuc3RhdGUudGltZSArIDEwMDBcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50aW1lID49IHRoaXMucHJvcHMudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkNoZWNrQ29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGVja0NvbXBsZXRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29tcGxldGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5jb21wbGV0ZVJlZnMoKSB7XG4gICAgICAgIHRoaXMucmVzdGFydCgpO1xuICAgIH1cblxuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yZWFkeSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wbGV0ZSkgdGhpcy5pbmNvbXBsZXRlKCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0aW1lOiAwLFxuICAgICAgICAgICAgc3RhbXA6IDAsXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBhdXNlZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXN1bWUoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5wYXVzZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwYXVzZWQ6IGZhbHNlXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5yZXN0YXJ0ICYmIHByb3BzLnJlc3RhcnQgIT09IHRoaXMucHJvcHMucmVzdGFydCkge1xuICAgICAgICAgICAgdGhpcy5yZXN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygndGltZXInLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHRpbWUgPSB0aGlzLnByb3BzLmdldFRpbWUuY2FsbCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IHRpbWU9e3RpbWV9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxlYWRpbmdDb250ZW50fVxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICB7dGltZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblRpbWVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGdldFRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLnByb3BzLmNvdW50RG93biA/IHRoaXMucHJvcHMudGltZW91dCAtIHRoaXMuc3RhdGUudGltZSA6XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWUpLmZvcm1hdCh0aGlzLnByb3BzLmZvcm1hdCk7XG4gICAgfSxcbiAgICBmb3JtYXQ6ICdtOnNzJyxcbiAgICBsZWFkaW5nQ29udGVudDogJycsXG4gICAgdGltZW91dDogNjAwMDAsXG4gICAgY291bnREb3duOiBmYWxzZSxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgVGltZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy90aW1lci8wLjEuanMiLCIvLyBBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5TY29yZVxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuY29uc29sZS53YXJuKCdBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5TY29yZScpO1xuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBTY29yZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzY29yZTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY2hlY2tDb21wbGV0ZSA9IHRoaXMuY2hlY2tDb21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNoZWNrQ29tcGxldGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jaGVja0NvbXBsZXRlIHx8ICF0aGlzLnN0YXRlLnJlYWR5KSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5tYXgpIHJldHVybjtcbiAgICAgICAgaWYgKCh0aGlzLnN0YXRlLnNjb3JlID49IHRoaXMucHJvcHMubWF4IHx8IHRoaXMucHJvcHMuY29ycmVjdCA+PSB0aGlzLnByb3BzLm1heCkgJiZcbiAgICAgICAgICAgICF0aGlzLnN0YXRlLmNvbXBsZXRlKSB0aGlzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjb3JlOiB0aGlzLnByb3BzLnN0YXJ0aW5nU2NvcmVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcGxldGUoKSB7XG4gICAgICAgIHN1cGVyLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5yZXNldE9uQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNjb3JlKHtcbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdDogMCxcbiAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0OiAwLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLnByb3BzLmNvbXBsZXRlRGVsYXkpO1xuICAgIH1cblxuICAgIGNoZWNrU2NvcmUocHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wcy5tYXgpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2NvcmUgPj0gcHJvcHMubWF4ICYmICghdGhpcy5zdGF0ZS5jb21wbGV0ZSB8fCBwcm9wcy5tdWx0aXBsZUNvbXBsZXRlcykpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmNvbXBsZXRlICYmICFwcm9wcy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5pbmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cChpbmNyZW1lbnQpIHtcbiAgICAgICAgaW5jcmVtZW50ID0gXy5pc0Zpbml0ZShpbmNyZW1lbnQpID8gaW5jcmVtZW50IDogXy5pc0Zpbml0ZSh0aGlzLnByb3BzLmluY3JlbWVudCkgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbmNyZW1lbnQgOiAxO1xuICAgICAgICBpZiAoIV8uaXNGaW5pdGUoaW5jcmVtZW50KSkgdGhyb3cgJ2luY3JlbWVudCBtdXN0IGJlIGZpbml0ZSc7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY29yZShpbmNyZW1lbnQpO1xuICAgIH1cblxuICAgIGRvd24oaW5jcmVtZW50KSB7XG4gICAgICAgIGluY3JlbWVudCA9IF8uaXNGaW5pdGUoaW5jcmVtZW50KSA/IGluY3JlbWVudCA6IF8uaXNGaW5pdGUodGhpcy5wcm9wcy5kb3duSW5jcmVtZW50KSA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLmRvd25JbmNyZW1lbnQgOiBfLmlzRmluaXRlKHRoaXMucHJvcHMuaW5jcmVtZW50KSA/IHRoaXMucHJvcHMuaW5jcmVtZW50IDogMTtcbiAgICAgICAgaWYgKCFfLmlzRmluaXRlKGluY3JlbWVudCkpIHRocm93ICdpbmNyZW1lbnQgbXVzdCBiZSBmaW5pdGUnO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoLTEgKiBpbmNyZW1lbnQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlKGluY3JlbWVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjb3JlOiB0aGlzLnN0YXRlLnNjb3JlICsgaW5jcmVtZW50XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiB0aGlzLnByb3BzLmRhdGFUYXJnZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBzY29yZTogdGhpcy5zdGF0ZS5zY29yZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmNoZWNrU2NvcmUodGhpcy5wcm9wcyk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVXBkYXRlU2NvcmUuY2FsbCh0aGlzLCB0aGlzLnN0YXRlLnNjb3JlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0U2NvcmUocHJvcHMpIHtcbiAgICAgICAgdmFyIHVwSW5jcmVtZW50O1xuICAgICAgICB2YXIgZG93bkluY3JlbWVudDtcbiAgICAgICAgdmFyIHNjb3JlO1xuXG4gICAgICAgIGlmIChfLmlzRmluaXRlKHByb3BzKSkge1xuICAgICAgICAgICAgc2NvcmUgPSBwcm9wcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVwSW5jcmVtZW50ID0gXy5pc0Zpbml0ZShwcm9wcy5pbmNyZW1lbnQpID8gcHJvcHMuaW5jcmVtZW50IDogMTtcbiAgICAgICAgICAgIGRvd25JbmNyZW1lbnQgPSBfLmlzRmluaXRlKHByb3BzLmRvd25JbmNyZW1lbnQpID8gcHJvcHMuZG93bkluY3JlbWVudCA6XG4gICAgICAgIF8uaXNGaW5pdGUocHJvcHMuaW5jcmVtZW50KSA/IHByb3BzLmluY3JlbWVudCA6IDE7XG4gICAgICAgICAgICBzY29yZSA9IHVwSW5jcmVtZW50ICogcHJvcHMuY29ycmVjdCAtIGRvd25JbmNyZW1lbnQgKiBwcm9wcy5pbmNvcnJlY3Q7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjb3JlXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTY29yZShwcm9wcyk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVXBkYXRlU2NvcmUuY2FsbCh0aGlzLCBzY29yZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLmNvcnJlY3QgIT09IHRoaXMucHJvcHMuY29ycmVjdCB8fFxuICAgICAgcHJvcHMuaW5jb3JyZWN0ICE9PSB0aGlzLnByb3BzLmluY29ycmVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTY29yZShwcm9wcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgICdzY29yZScsXG4gICAgICBgc2NvcmUtJHt0aGlzLnN0YXRlLnNjb3JlfWAsXG4gICAgICBzdXBlci5nZXRDbGFzc05hbWVzKClcbiAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICAgICAgICAgIGRhdGEtbWF4PXt0aGlzLnByb3BzLm1heH1cbiAgICAgICAgICAgICAgICBkYXRhLXNjb3JlPXt0aGlzLnN0YXRlLnNjb3JlfVxuICAgICAgICAgICAgICAgIHNjb3JlPXt0aGlzLnN0YXRlLnNjb3JlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxlYWRpbmdDb250ZW50fVxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zY29yZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNjb3JlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGNoZWNrQ29tcGxldGU6IGZhbHNlLFxuICAgIHN0YXJ0aW5nU2NvcmU6IDAsXG4gICAgY29ycmVjdDogMCxcbiAgICBpbmNvcnJlY3Q6IDAsXG4gICAgb25VcGRhdGVTY29yZTogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBTY29yZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3Njb3JlLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgTWVkaWFDb2xsZWN0aW9uIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL21lZGlhX2NvbGxlY3Rpb24vMC4xJztcbmltcG9ydCBSZXZlYWxQcm9tcHQgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcmV2ZWFsX3Byb21wdC8wLjEnO1xuaW1wb3J0IENhcm91c2VsIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMSc7XG5pbXBvcnQgQ2Fubm9uIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Nhbm5vbi8wLjInO1xuaW1wb3J0IFJhbmRvbWl6ZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvcmFuZG9taXplci8wLjEnO1xuaW1wb3J0IFRpbWVyIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3RpbWVyLzAuMSc7XG5pbXBvcnQgU2NvcmUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvc2NvcmUvMC4xJztcblxuY29uc3QgQ09ORklHID0ge1xuICAgIExWTDogMixcbiAgICBQT0lOVFM6IDE1MCxcbiAgICBUSU1FUjogNDUwMDAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cImNsZWFuLXVwLWdhbWUtbHZsLTJcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwiaW5zdHJ1Y3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by0xXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0luc3RydWN0aW9ucy5tcDNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by0yXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1Rvc3NMaXR0ZXIubXAzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tM1wiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9HZXQxNTAubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVUYXJnZXQ9XCJpbnN0cnVjdGlvbnNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuXG4gICAgICAgICAgICA8TWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5wbGF5JywgbnVsbCl9XG4gICAgICAgICAgICAgICAgb25QbGF5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXk6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guTWVkaWFTZXF1ZW5jZSByZWY9XCJjb21wbGV0ZVwiIHNpbGVudE9uU3RhcnQ+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9MZXZlbDIubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0FtYXppbmdKb2IubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1RoYW5rWW91Q2FyaW5nLm1wM1wiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwidHJ5LWFnYWluXCIgc2lsZW50T25TdGFydCBjb21wbGV0ZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tN1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0xldmVsTG9zdC5tcDNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL09oTm8ubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9QYXJrU3RpbGwubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwidGhyb3dcIiBzaWxlbnRPblN0YXJ0PlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by0xMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fZWZmZWN0cy9GYXN0U3dpc2gubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tMTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvV2luUG9pbnRzLm1wM1wiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgIDwvTWVkaWFDb2xsZWN0aW9uPlxuXG4gICAgICAgICAgICA8UmV2ZWFsUHJvbXB0XG4gICAgICAgICAgICAgICAgcmVmPVwicmV2ZWFsXCJcbiAgICAgICAgICAgICAgICBvcGVuT25TdGFydD1cImluc3RydWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgb3BlblJldmVhbD17Xy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5vcGVuJywgbnVsbCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zQ29tcGxldGU6IF8uZ2V0KHByb3BzLCAnZGF0YS5pbnN0cnVjdGlvbnMuY29tcGxldGUnKVxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uT3Blbj17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGRhdGEtcmVmPVwiaW5zdHJ1Y3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZSBpbnN0cnVjdGlvbnMtbHZsLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvc3MgdGhlIGxpdHRlciBpbiB0aGUgY2FucyB0bzxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhbiB1cCBieSBjbGlja2luZywgYWltaW5nLDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgbGV0dGluZyBnbyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImh1bmRyZWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMgYmVmb3JlIHRoZSB0aW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5zIG91dCB0byB3aW4hXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBkYXRhLXJlZj1cImNvbXBsZXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZSBjb21wbGV0ZS1sdmwtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci0yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhhbmsgeW91IGZvciBjYXJpbmcgc28gbXVjaDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm91dCB0aGUgZW52aXJvbm1lbnQhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBkYXRhLXJlZj1cInRyeS1hZ2FpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBwYXJrIGlzIHN0aWxsIGNvdmVyZWQgd2l0aCB0cmFzaDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXQgeW91IHN0aWxsIGhhdmUgYSBjaGFuY2UgdG8gY2xlYW48YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGJlYXQgdGhlIExpdHRlcmJ1ZyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPENhcm91c2VsXG4gICAgICAgICAgICAgICAgcmVmPVwiY2Fyb3VzZWxcIlxuICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBzaG93TnVtPXs1fVxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4PXsyfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtfLmdldChwcm9wcywgJ2RhdGEuY2Fubm9uLmZpcmUnKX1cbiAgICAgICAgICAgICAgICBvblNlbGVjdD17ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUucG9pbnRzJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzW3RhcmdldC5wcm9wc1snZGF0YS1rZXknXV0gPSAnU0VMRUNURUQnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzW3RhcmdldC5wcm9wc1snZGF0YS1rZXknXV0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPCBDT05GSUcuUE9JTlRTKSBzY29yZSArPSB0YXJnZXQucHJvcHMudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3Njb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29yZSA+PSBDT05GSUcuUE9JTlRTICYgIV8uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLmNvbXBsZXRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICdjb21wbGV0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheTogJ2NvbXBsZXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2dhbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJhbmRvbWl6ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW49e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmaXZlXCIgbmFtZT1cImZpdmVcIiB2YWx1ZT17NX0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidGVuXCIgbmFtZT1cInRlblwiIHZhbHVlPXsxMH0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidHdlbnR5XCIgbmFtZT1cInR3ZW50eVwiIHZhbHVlPXsyMH0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidGhpcnR5XCIgbmFtZT1cInRoaXJ0eVwiIHZhbHVlPXszMH0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxDYW5ub25cbiAgICAgICAgICAgICAgICByZWY9XCJjYW5ub25cIlxuICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICByZXZlcnNlUmVsb2FkPXt0cnVlfVxuICAgICAgICAgICAgICAgIGxhdW5jaEJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICByZWxvYWRUaW1lPXsyMDAwfVxuICAgICAgICAgICAgICAgIHNob3dOdW09ezR9XG4gICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyYW5kb21pemVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgYmluPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInBsYXN0aWMtYm90dGxlXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInNvZGEtY2FuXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImJhbmFuYS1wZWFsXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImdsYXNzLWJvdHRsZVwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJjcnVtYmxlZC1wYXBlclwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJ0dW5hLWNhblwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJ0aXJlXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImJhdHRlcnlcIiBjb21wbGV0ZS8+LFxuICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uRmlyZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5OiAndGhyb3cnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnY2Fubm9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uUmVsb2FkPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdjYW5ub24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImdyYXNzXCI+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwic3RhdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGV2ZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtDT05GSUcuTFZMfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPFRpbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJ0aW1lclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudERvd249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtDT05GSUcuVElNRVJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb21wbGV0ZScsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5jb21wbGV0ZScsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLnN0YXJ0JywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuc3RhcnQnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5wb2ludHMnLCAwKSA8IENPTkZJRy5QT0lOVFMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogJ3RyeS1hZ2FpbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheTogJ3RyeS1hZ2FpbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3Njb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICA8U2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInNjb3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heD17Q09ORklHLlBPSU5UU31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e18uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5wb2ludHMnLCAwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e18uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5wb2ludHMnLCAwKSA9PT0gQ09ORklHLlBPSU5UU31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL2NsZWFuX3VwX2dhbWVfbHZsMl9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IE1lZGlhQ29sbGVjdGlvbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9tZWRpYV9jb2xsZWN0aW9uLzAuMSc7XG5pbXBvcnQgUmV2ZWFsUHJvbXB0IGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3JldmVhbF9wcm9tcHQvMC4xJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEnO1xuaW1wb3J0IENhbm5vbiBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYW5ub24vMC4yJztcbmltcG9ydCBSYW5kb21pemVyIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3JhbmRvbWl6ZXIvMC4xJztcbmltcG9ydCBUaW1lciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy90aW1lci8wLjEnO1xuaW1wb3J0IFNjb3JlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3Njb3JlLzAuMSc7XG5cbmNvbnN0IENPTkZJRyA9IHtcbiAgICBMVkw6IDMsXG4gICAgUE9JTlRTOiAyMDAsXG4gICAgVElNRVI6IDYwMDAwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJjbGVhbi11cC1nYW1lLWx2bC0zXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlIHJlZj1cImluc3RydWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tMVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9JbnN0cnVjdGlvbnMubXAzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tMlwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9Ub3NzTGl0dGVyLm1wM1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTNcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvR2V0MjAwLm1wM1wiXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlVGFyZ2V0PVwiaW5zdHJ1Y3Rpb25zXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cblxuICAgICAgICAgICAgPE1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICBwbGF5PXtfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLnBsYXknLCBudWxsKX1cbiAgICAgICAgICAgICAgb25QbGF5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5OiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAncmV2ZWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlIHJlZj1cImNvbXBsZXRlXCIgc2lsZW50T25TdGFydD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTRcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvTGV2ZWwzLm1wM1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTVcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvUGFya0NsZWFuLm1wM1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlIHJlZj1cInRyeS1hZ2FpblwiIHNpbGVudE9uU3RhcnQgY29tcGxldGU+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by02XCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0xldmVsTG9zdC5tcDNcIlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICByZWY9XCJ2by03XCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL09oTm8ubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tOFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9QYXJrU3RpbGwubXAzXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwidGhyb3dcIiBzaWxlbnRPblN0YXJ0PlxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidm8tOVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvRmFzdFN3aXNoLm1wM1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInZvLTEwXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fZWZmZWN0cy9XaW5Qb2ludHMubXAzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgPC9NZWRpYUNvbGxlY3Rpb24+XG5cbiAgICAgICAgICAgIDxSZXZlYWxQcm9tcHRcbiAgICAgICAgICAgICAgICByZWY9XCJyZXZlYWxcIlxuICAgICAgICAgICAgICAgIG9wZW5PblN0YXJ0PVwiaW5zdHJ1Y3Rpb25zXCJcbiAgICAgICAgICAgICAgICBvcGVuUmV2ZWFsPXtfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBudWxsKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNDb21wbGV0ZTogXy5nZXQocHJvcHMsICdkYXRhLmluc3RydWN0aW9ucy5jb21wbGV0ZScpXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25PcGVuPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbG9zZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgZGF0YS1yZWY9XCJpbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZSBpbnN0cnVjdGlvbnMtbHZsLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvc3MgdGhlIGxpdHRlciBpbiB0aGUgY2FucyB0bzxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhbiB1cCBieSBjbGlja2luZywgYWltaW5nLDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgbGV0dGluZyBnbyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImh1bmRyZWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMgYmVmb3JlIHRoZSB0aW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5zIG91dCB0byB3aW4hXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+LFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBkYXRhLXJlZj1cImNvbXBsZXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZSBjb21wbGV0ZS1sdmwtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIHBhcmsgaXMgbm93IGNsZWFuPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBhcmUgYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD4sXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGRhdGEtcmVmPVwidHJ5LWFnYWluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci0yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIHBhcmsgaXMgc3RpbGwgY292ZXJlZCB3aXRoIHRyYXNoPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dCB5b3Ugc3RpbGwgaGF2ZSBhIGNoYW5jZSB0byBjbGVhbjxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgYmVhdCB0aGUgTGl0dGVyYnVnIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8Q2Fyb3VzZWxcbiAgICAgICAgICAgICAgICByZWY9XCJjYXJvdXNlbFwiXG4gICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIHNob3dOdW09ezV9XG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg9ezJ9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e18uZ2V0KHByb3BzLCAnZGF0YS5jYW5ub24uZmlyZScpfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5zY29yZS5wb2ludHMnLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXNbdGFyZ2V0LnByb3BzWydkYXRhLWtleSddXSA9ICdTRUxFQ1RFRCc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXNbdGFyZ2V0LnByb3BzWydkYXRhLWtleSddXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29yZSA8IENPTkZJRy5QT0lOVFMpIHNjb3JlICs9IHRhcmdldC5wcm9wcy52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnc2NvcmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czogc2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlID49IENPTkZJRy5QT0lOVFMgJiAhXy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29tcGxldGUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogJ2NvbXBsZXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5OiAnY29tcGxldGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBiaW49e1xuICAgICAgICAgICAgICAgICAgPFJhbmRvbWl6ZXJcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwicmFuZG9taXplclwiXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGJpbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiZml2ZVwiIG5hbWU9XCJmaXZlXCIgdmFsdWU9ezV9IGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidGVuXCIgbmFtZT1cInRlblwiIHZhbHVlPXsxMH0gY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJ0d2VudHlcIiBuYW1lPVwidHdlbnR5XCIgdmFsdWU9ezIwfSBjb21wbGV0ZSAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInRoaXJ0eVwiIG5hbWU9XCJ0aGlydHlcIiB2YWx1ZT17MzB9IGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8Q2Fubm9uXG4gICAgICAgICAgICAgICAgcmVmPVwiY2Fubm9uXCJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnQ9e3RydWV9XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgcmV2ZXJzZVJlbG9hZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICBsYXVuY2hCdXR0b249e3RydWV9XG4gICAgICAgICAgICAgICAgcmVsb2FkVGltZT17MjAwMH1cbiAgICAgICAgICAgICAgICBzaG93TnVtPXs0fVxuICAgICAgICAgICAgICAgIGJpbj17XG4gICAgICAgICAgICAgICAgICA8UmFuZG9taXplclxuICAgICAgICAgICAgICAgICAgICByZWY9XCJyYW5kb21pemVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgYmluPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJwbGFzdGljLWJvdHRsZVwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwic29kYS1jYW5cIiBjb21wbGV0ZSAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImJhbmFuYS1wZWFsXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJnbGFzcy1ib3R0bGVcIiBjb21wbGV0ZSAvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNydW1ibGVkLXBhcGVyXCIgY29tcGxldGUgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJ0dW5hLWNhblwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwidGlyZVwiIGNvbXBsZXRlIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwiYmF0dGVyeVwiIGNvbXBsZXRlLz4sXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbkZpcmU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3JldmVhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheTogJ3Rocm93J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2Nhbm5vbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvblJlbG9hZD17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnY2Fubm9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJncmFzc1wiPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cInN0YXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxldmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Q09ORklHLkxWTH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgIDxUaW1lclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwidGltZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dD17Q09ORklHLlRJTUVSfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcD17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29tcGxldGUnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Xy5nZXQocHJvcHMsICdkYXRhLmdhbWUuY29tcGxldGUnLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuZ2FtZS5zdGFydCcsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RhcnQ9e18uZ2V0KHByb3BzLCAnZGF0YS5nYW1lLnN0YXJ0JywgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUucG9pbnRzJywgMCkgPCBDT05GSUcuUE9JTlRTKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICd0cnktYWdhaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdyZXZlYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXk6ICd0cnktYWdhaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICdzY29yZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJzY29yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg9e0NPTkZJRy5QT0lOVFN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUucG9pbnRzJywgMCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtfLmdldChwcm9wcywgJ2RhdGEuc2NvcmUucG9pbnRzJywgMCkgPT09IENPTkZJRy5QT0lOVFN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9jbGVhbl91cF9nYW1lX2x2bDNfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJyb29tXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ2b1wiIHR5cGU9XCJ2b2ljZU92ZXJcIiBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9UaHJvd1RyYXNoUm9vbS5tcDNcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJidXR0b25cIiBjb21wbGV0ZSB0eXBlPVwic2Z4XCIgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL05vLm1wM1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF2YXRhciBhbmltYXRlZFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lciBhbmltYXRlZFwiIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL3Jvb21fc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJzY2hvb2xcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInZvXCIgdHlwZT1cInZvaWNlT3ZlclwiIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1Rocm93VHJhc2hTY2hvb2wubXAzXCIgLz5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiYnV0dG9uXCIgY29tcGxldGUgdHlwZT1cInNmeFwiIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fZWZmZWN0cy9Oby5tcDNcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXIgYW5pbWF0ZWRcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdmF0YXIgYW5pbWF0ZWRcIiAvPlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9zY2hvb2xfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJncm91bmRcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInZvXCIgdHlwZT1cInZvaWNlT3ZlclwiIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1Nob3VsZFlvdVRocm93Lm1wM1wiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImJ1dHRvblwiIGNvbXBsZXRlIHR5cGU9XCJzZnhcIiBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvTm8ubXAzXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyIGFuaW1hdGVkXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXZhdGFyIGFuaW1hdGVkXCIgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvZ3JvdW5kX3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwic2luZy1hYm91dC1pdFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwidm9cIiB0eXBlPVwidm9pY2VPdmVyXCIgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvTGV0c1NpbmcubXAzXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXItZWNvIGFuaW1hdGVkXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyIGFuaW1hdGVkXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFuY2VycyBhbmltYXRlZFwiIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvbGl0dGVyLWJ1Zy9jb21wb25lbnRzL3NpbmdfYWJvdXRfaXRfc2NyZWVuLmpzIiwiY29uc3Qgc3JjID0gJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2NoYW5nZW15d29ybGRub3cvdmlkZW8vdXBsb2FkL3YxNDU1MDM3MDM0L0xpdHRlcmJ1Zy1GaW5hbF9qam1yZzcubXA0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJ2aWRlb1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHJlZj1cImNlbnRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IHJlZj1cImZyYW1lXCIgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5WaWRlbyByZWY9XCJ2aWRlb1wiIHNyYz17c3JjfSAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJnb29kLWZvci15b3VcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInZvXCIgdHlwZT1cInZvaWNlT3ZlclwiIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL1RoYW5rWW91Lm1wM1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1yLWVjbyBhbmltYXRlZFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lciBhbmltYXRlZFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lcjIgYW5pbWF0ZWRcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPVwic3BhcmtsZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2xpdHRlci1idWcvY29tcG9uZW50cy9nb29kX2Zvcl95b3Vfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJ0YWtlLXBsZWRnZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwidm9cIiB0eXBlPVwidm9pY2VPdmVyXCIgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL192b3MvQW50aUxpdHRlclBsZWRnZS5tcDNcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJidXR0b25cIiBjb21wbGV0ZSB0eXBlPVwic2Z4XCIgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc291bmRzL19lZmZlY3RzL1NfQlVfMS5tcDNcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSByZWY9XCJia2dcIiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kXCIgc3JjPVwibWVkaWEvX0ZyYW1lcy9GUl8xLnBuZ1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1yLWVjb1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXJcIj48L2Rpdj5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvdGFrZV9wbGVkZ2Vfc2NyZWVuLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJjb21taXRcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInZvXCIgdHlwZT1cInZvaWNlT3ZlclwiIHNyYz1cIm1lZGlhL19hc3NldHMvX3NvdW5kcy9fdm9zL0lQcm9taXNlLm1wM1wiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImJ1dHRvblwiIGNvbXBsZXRlIHR5cGU9XCJzZnhcIiBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX2VmZmVjdHMvU19CVV8xLm1wM1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsZWRnZVwiPlxuICAgICAgICAgICAgICAgIEkgcHJvbWlzZSB0byA8c3BhbiBjbGFzc05hbWU9XCJuZXZlclwiPjwvc3Bhbj4gbGl0dGVyXG4gICAgICAgICAgICAgICAgPGJyIC8+PHNwYW4gY2xhc3NOYW1lPVwic3BhY2VyQVwiPjwvc3Bhbj5hbmQgdG8gcGljayB1cCB0aGUgbGl0dGVyXG4gICAgICAgICAgICAgICAgPGJyIC8+PHNwYW4gY2xhc3NOYW1lPVwic3BhY2VyQlwiPjwvc3Bhbj5JIHNlZSB3aGVuZXZlciBJIHNhZmVseSBjYW4uXG4gICAgICAgICAgICAgICAgPGJyIC8+PHNwYW4gY2xhc3NOYW1lPVwic3BhY2VyMVwiPjwvc3Bhbj5JIHdpbGwgZGlzcG9zZSBvZiBpdFxuICAgICAgICAgICAgICAgIDxiciAvPjxzcGFuIGNsYXNzTmFtZT1cInNwYWNlcjJcIj48L3NwYW4+aW4gYSB0cmFzaCBjYW5cbiAgICAgICAgICAgICAgICA8YnIgLz48c3BhbiBjbGFzc05hbWU9XCJzcGFjZXIzXCI+PC9zcGFuPm9yIGEgcmVjeWNsZSBiaW4uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyIGFuaW1hdGVkXCIgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvY29tbWl0X3NjcmVlbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiZmxpcFwiXG4gICAgICAgICAgICBlbWl0T25Db21wbGV0ZT17e1xuICAgICAgICAgICAgICAgIG5hbWU6ICdmbGlwJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPVwibWVkaWEvX2Fzc2V0cy9fc3ByaXRlcy9zcHJpdGVzLm1yLmVjby0wMS5wbmdcIiAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9XCJtZWRpYS9fYXNzZXRzL19zcHJpdGVzL3Nwcml0ZXMuc2luZy50aGFua3lvdS5mbGlwLTAxLnBuZ1wiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJ2b2ljZU92ZXJcIiBzcmM9XCJtZWRpYS9fYXNzZXRzL19zb3VuZHMvX3Zvcy9GbGlwLm1wM1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRzXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxpcC1jb250YWluZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsaXBcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1yLWVjbyBhbmltYXRlZFwiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImVhcm5lZFwiIHNyYz1cIm1lZGlhL19hc3NldHMvX2FuaW1hdGlvbnMvTGl0dGVyYnVnRWFybmVkRmxpcHMuZ2lmXCIgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9saXR0ZXItYnVnL2NvbXBvbmVudHMvZmxpcF9zY3JlZW4uanMiLCJjbGFzcyBRdWl0U2NyZWVuIGV4dGVuZHMgc2tvYXNoLlNjcmVlbiB7XG4gICAgb2theSgpIHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ3F1aXQnKTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ21lbnVDbG9zZScsIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJBc3NldHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFzc2V0cykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYXNzZXRzLm1hcCgoYXNzZXQsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5hc3NldC5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YXNzZXQucmVmIHx8IGFzc2V0LnByb3BzWydkYXRhLXJlZiddIHx8ICgnYXNzZXQtJyArIGtleSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtrZXl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXsnc2NyZWVuICcgKyB0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXNzZXRzKCl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPkFyZSB5b3Ugc3VyZSB5b3U8YnIvPndhbnQgdG8gcXVpdD88L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPllvdXIgZ2FtZSBwcm9ncmVzcyB3aWxsIGJlIHNhdmVkPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicXVpdC15ZXNcIiBvbkNsaWNrPXt0aGlzLm9rYXkuYmluZCh0aGlzKX0+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInF1aXQtbm9cIiBvbkNsaWNrPXt0aGlzLmNhbmNlbC5iaW5kKHRoaXMpfT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChcbiAgICA8UXVpdFNjcmVlblxuICAgICAgICBpZD1cInF1aXRcIlxuICAgIC8+XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4vMC4xLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvakJBO0FDQ0E7QUFEQTs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QURDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDQ0E7QURDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FFcENBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBb0JBO0FBQ0E7QUZEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFhQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1RkE7QUFDQTtBQStGQTtBQUNBO0FFQ0E7Ozs7OztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUZBO0FBREE7QUFXQTs7OztBQWRBO0FBQ0E7QUxnQkE7Ozs7Ozs7Ozs7Ozs7O0FNakJBO0FOQ0E7QUFDQTtBQUFBO0FNRUE7QU5DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQVpBO0FBZUE7Ozs7Ozs7Ozs7Ozs7O0FPakJBO0FQQ0E7QU9HQTtBUENBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFVQTs7Ozs7Ozs7Ozs7Ozs7QVFaQTtBUkNBO0FBQ0E7QUFBQTtBUUVBO0FSQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBWEE7QUFpQkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUE3QkE7QUFvQ0E7Ozs7Ozs7Ozs7OztBU2xDQTtBVENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFSQTtBQWNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBUkE7QUFhQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBZEE7QUFxQkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FTREE7QUFHQTtBQUNBO0FUQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBWEE7QUFIQTtBQUxBO0FBdUJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUxBO0FBVUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQVJBO0FBSEE7QUFMQTtBQTVKQTtBQWtMQTtBQUNBO0FBeExBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FVSUE7QVZBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBVUNBO0FWQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FVREE7QUFGQTtBQU1BO0FWQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QVVEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FWQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBVURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QVZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUhBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FVRUE7QVZDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FVQ0E7QVZGQTtBQUlBO0FBQ0E7QVVDQTtBVkNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QVVDQTtBQUNBO0FWTkE7QUFRQTtBQVJBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QVVDQTtBQUNBO0FWTkE7QUFRQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QVVDQTtBQUNBO0FBQ0E7QUFDQTtBVlBBO0FBeEJBO0FBa0NBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FVQ0E7QUFDQTtBQUNBO0FBQ0E7QVZDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBWEE7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QVVDQTtBQUNBO0FBQ0E7QVZDQTtBQUdBO0FVQ0E7QVZDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQW5CQTtBQXJCQTtBQWdEQTtBQUNBO0FBQ0E7QUFDQTtBVUNBO0FBQ0E7QVZDQTtBQUNBO0FBUEE7QUFqR0E7QUE0R0E7QUFDQTtBQXBTQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FXTkE7QUFDQTtBQUNBO0FYQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFkQTtBQUNBO0FBZ0JBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBWTFCQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QVpDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBOzs7O0FBbERBO0FBQ0E7QUFvREE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QWE3REE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FiQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQVhBO0FBWUE7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCQTtBQWdDQTtBQUNBO0FBQ0E7QUFsQ0E7QUFDQTtBQThCQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBRkE7QUFNQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBSUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUxBO0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVhBO0FBZ0JBOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcEJBO0FBQ0E7QUFzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QWNqTkE7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QWRDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakJBO0FBa0JBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQVFBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFMQTtBQVFBOzs7O0FBclNBO0FBQ0E7QUF1U0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBZTFTQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QWZDQTtBQURBO0FBR0E7QUFMQTtBQU1BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTs7OztBQXhDQTtBQUNBO0FBMENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBZ0JwREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QWhCQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBUEE7QUFRQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFRQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFLQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBaUJ0SUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FqQkNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUhBO0FBTUE7OztBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFIQTtBQURBO0FBT0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQU9BOzs7O0FBaE5BO0FBQ0E7QUFtTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7QWtCOU5BO0FsQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQVJBO0FBYUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWRBO0FBcUJBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBTEE7QUFVQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBUkE7QUFIQTtBQUxBO0FBdEhBO0FBNElBO0FBQ0E7QUFoSkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FtQkVBO0FuQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWhCQTtBQXNCQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBZEE7QUFxQkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FtQkRBO0FBR0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBWEE7QUFnQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBbkJDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFSQTtBQUhBO0FBTEE7QUFySUE7QUEySkE7QUFDQTtBQWhLQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBb0JjQTtBcEJDQTtBQUNBO0FBQUE7QW9CRUE7QXBCQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFYQTtBQW1CQTtBQUFBO0FBQUE7QUFDQTtBb0JDQTtBQUNBO0FwQkNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBaEJBO0FBa0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQVhBO0FBaUJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQWJBO0FBb0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTkE7QUF2REE7QUFxRUE7QUFDQTtBQUNBO0FBQ0E7QW9CQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBcEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFkQTtBQURBO0FBb0JBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFIQTtBQURBO0FBVUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFIQTtBQURBO0FBeERBO0FBc0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FvQkNBO0FwQkNBO0FvQkNBO0FwQkNBO0FBQ0E7QW9CQ0E7QXBCQ0E7QUFEQTtBQUdBO0FBQ0E7QW9CQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBcEJDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FvQkNBO0FwQkNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQXJEQTtBQW1FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBOUNBO0FBaURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FvQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBcEJDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQWhDQTtBQW1DQTtBQUNBO0FBQ0E7QUFDQTtBb0JDQTtBQUNBO0FwQkxBO0FBeENBO0FBREE7QUF4UkE7QUE0VUE7QUFDQTtBQS9WQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBcUJWQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBckJDQTtBQURBO0FBQ0E7QUFHQTtBQVBBO0FBUUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFRQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFRQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQURBO0FBU0E7Ozs7QUFySEE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBcUJzSEE7QXJCQ0E7QUFNQTtBQUNBO0FBQ0E7QUFUQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FzQjFIQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QXRCSEE7QUFJQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFPQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7QXVCaElBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQ0E7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQUNBO0FoQ0NBO0FBQ0E7QUFHQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFPQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFGQTtBQUtBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBV0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQU9BOzs7O0FBN0tBO0FBQ0E7QUErS0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFDQTtBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QWlDcE1BO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBakNDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBUkE7QUFTQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFLQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7Ozs7QUFySUE7QUFDQTtBQXVJQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFWQTtBQUNBO0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBa0NsSkE7QUFDQTs7Ozs7Ozs7Ozs7QUFOQTtBQUNBO0FBQ0E7QWxDQ0E7QUFDQTtBQUdBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBUkE7QUFTQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFRQTs7OztBQTdHQTtBQUNBO0FBK0dBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBbUM3SEE7QUFDQTs7Ozs7Ozs7Ozs7QUFOQTtBQUNBO0FBQ0E7QW5DQ0E7QUFDQTtBQUdBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQVBBO0FBUUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFLQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFYQTtBQWNBOzs7O0FBdklBO0FBQ0E7QUF5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7OztBb0N6SUE7QXBDQ0E7QUFDQTtBQUFBO0FvQ0VBO0FwQ0NBO0FBQ0E7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBWEE7QUFtQkE7QUFBQTtBQUFBO0FBQ0E7QW9DQ0E7QUFDQTtBcENDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQWhCQTtBQWtCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFYQTtBQWlCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFiQTtBQW9CQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU5BO0FBdkRBO0FBcUVBO0FBQ0E7QUFDQTtBQUNBO0FvQ0NBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QXBDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZEE7QUFEQTtBQW9CQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBSEE7QUFEQTtBQVVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBSEE7QUFEQTtBQXhEQTtBQXNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBb0NDQTtBcENDQTtBb0NDQTtBcENDQTtBQUNBO0FvQ0NBO0FwQ0NBO0FBREE7QUFHQTtBQUNBO0FvQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QXBDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBb0NDQTtBcENDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFyREE7QUFtRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQTlDQTtBQWlEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBb0NDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QXBDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFoQ0E7QUFtQ0E7QUFDQTtBQUNBO0FBQ0E7QW9DQ0E7QUFDQTtBcENMQTtBQXhDQTtBQURBO0FBeFJBO0FBNFVBO0FBQ0E7QUEvVkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBOzs7Ozs7Ozs7Ozs7OztBcUNNQTtBckNDQTtBQUNBO0FBQUE7QXFDRUE7QXJDQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFYQTtBQW1CQTtBQUFBO0FBQUE7QUFDQTtBcUNDQTtBQUNBO0FyQ0NBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBaEJBO0FBa0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTkE7QUFZQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFiQTtBQW9CQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU5BO0FBbERBO0FBZ0VBO0FBQ0E7QUFDQTtBQUNBO0FxQ0NBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QXJDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZEE7QUFEQTtBQW9CQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBTkE7QUFEQTtBQVVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBSEE7QUFEQTtBQXhEQTtBQXNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBcUNDQTtBckNDQTtBcUNDQTtBckNDQTtBQUNBO0FxQ0NBO0FyQ0NBO0FBREE7QUFHQTtBQUNBO0FxQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QXJDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBcUNDQTtBckNDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFyREE7QUFtRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQTlDQTtBQWlEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBcUNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QXJDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFoQ0E7QUFtQ0E7QUFDQTtBQUNBO0FBQ0E7QXFDQ0E7QUFDQTtBckNMQTtBQXhDQTtBQURBO0FBblJBO0FBdVVBO0FBQ0E7QUExVkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBOzs7Ozs7Ozs7Ozs7OztBc0NWQTtBdENDQTtBQUNBO0FBQUE7QXNDRUE7QXRDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVlBOzs7Ozs7Ozs7Ozs7OztBdUNkQTtBdkNDQTtBQUNBO0FBQUE7QXVDRUE7QXZDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVlBOzs7Ozs7Ozs7Ozs7OztBd0NkQTtBeENDQTtBQUNBO0FBQUE7QXdDRUE7QXhDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVlBOzs7Ozs7Ozs7Ozs7OztBeUNkQTtBekNDQTtBQUNBO0FBQUE7QXlDRUE7QXpDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVlBOzs7Ozs7Ozs7Ozs7OztBMENaQTtBMUNDQTtBQUNBO0FBQUE7QTBDRUE7QTFDQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBTkE7QUFhQTtBQUNBO0FBbEJBOzs7Ozs7Ozs7Ozs7OztBMkNBQTtBM0NDQTtBQUNBO0FBQUE7QTJDRUE7QTNDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXhDQTtBQVZBO0FBc0RBOzs7Ozs7Ozs7Ozs7OztBNEN4REE7QTVDQ0E7QUFDQTtBQUFBO0E0Q0VBO0E1Q0NBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQWFBOzs7Ozs7Ozs7Ozs7OztBNkNmQTtBN0NDQTtBQUNBO0FBQUE7QTZDRUE7QTdDQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFGQTtBQUdBO0FBQUE7QUFIQTtBQUlBO0FBQUE7QUFKQTtBQUtBO0FBQUE7QUFMQTtBQU1BO0FBQUE7QUFOQTtBQUFBO0FBUUE7QUFoQkE7QUFtQkE7Ozs7Ozs7Ozs7Ozs7O0E4Q3JCQTtBOUNDQTtBQUNBO0FBQUE7QThDRUE7QTlDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUxBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQWpCQTtBQW9CQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBK0N0QkE7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBL0NDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBRkE7QUFZQTs7OztBQTNDQTtBQUNBO0FBOENBO0FBQ0E7QUFEQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==