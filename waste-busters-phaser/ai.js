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
/******/ 	var hotCurrentHash = "884c375878559eae5e46"; // eslint-disable-line no-unused-vars
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

	var _ = __webpack_require__(4);

	var _2 = _interopRequireDefault(_);

	var _preload = __webpack_require__(5);

	var _preload2 = _interopRequireDefault(_preload);

	var _create = __webpack_require__(7);

	var _create2 = _interopRequireDefault(_create);

	var _update = __webpack_require__(11);

	var _update2 = _interopRequireDefault(_update);

	var _helpers = __webpack_require__(14);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _opts = __webpack_require__(21);

	var _opts2 = _interopRequireDefault(_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var opts = _opts2.default[location.search.split('v=')[1] - 1 || 0];

	ENVIRONMENT.MEDIA += 'Games/WasteBusters/';

	new _2.default({
	    width: 960,
	    height: 540,
	    preload: _preload2.default,
	    create: _create2.default,
	    update: _update2.default,
	    helpers: _helpers2.default,
	    opts: opts
		});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	    function Game() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Game);

	        var update;

	        opts.preload = (opts.preload || _.noop).bind(this);
	        opts.create = (opts.create || _.noop).bind(this);
	        opts.update = (opts.update || _.noop).bind(this);

	        update = function () {
	            var _this = this;

	            if (!this.shouldUpdate) {
	                setTimeout(function () {
	                    _this.shouldUpdate = true;
	                    _this.emitEvent({ ready: true });
	                }, 100);
	                return;
	            }

	            opts.update();
	        }.bind(this);

	        opts = _.defaults(opts, {
	            width: 960,
	            height: 540,
	            renderer: Phaser.AUTO,
	            parent: '',
	            helpers: {},
	            state: { preload: opts.preload, create: opts.create, update: update }
	        });

	        this.helpers = opts.helpers;
	        this.opts = opts.opts;

	        this.game = new Phaser.Game(opts.width, opts.height, opts.renderer, opts.parent, opts.state);

	        this.attachEvents();
	    }

	    _createClass(Game, [{
	        key: 'attachEvents',
	        value: function attachEvents() {
	            var _this2 = this;

	            window.addEventListener('skoash-event', function (e) {
	                switch (e.name) {
	                    case 'controller-update':
	                        _this2.controller = e.data.controller;
	                        break;
	                    case 'data-update':
	                        _this2.data = _.defaults(e.data.data, _this2.data);
	                        break;
	                    case 'pause':
	                        _this2.game.paused = true;
	                        break;
	                    case 'resume':
	                        _this2.game.paused = false;
	                        break;
	                }
	            }, false);

	            document.domain = 'changemyworldnow.com';
	        }
	    }, {
	        key: 'emitEvent',
	        value: function emitEvent(opts) {
	            var e = new Event('game-event');
	            _.each(opts, function (v, k) {
	                e[k] = v;
	            });
	            if (window.frameElement) window.frameElement.dispatchEvent(e);
	        }
	    }]);

	    return Game;
	}();

		exports.default = Game;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    _2.default.call(this, 'image', [['sky', CMWN.MEDIA.IMAGE + 'game.1.bkg.sky.jpg'], ['clouds', CMWN.MEDIA.IMAGE + 'game.1.bkg.clouds.png'], ['ground', CMWN.MEDIA.SPRITE + 'game1.ground.png'], ['platforms', CMWN.MEDIA.SPRITE + 'game1.platform.png'],
	    // 930 x 140 pixels
	    ['items', CMWN.MEDIA.SPRITE + 'game1.5.png'],
	    // 1246 x 100 pixels
	    ['logs', CMWN.MEDIA.SPRITE + 'game1.logs.png'],
	    // 2100 x 360 pixels
	    ['trees', CMWN.MEDIA.SPRITE + 'game1.trees.png']]);

	    _2.default.call(this, 'spritesheet', [
	    // 6180 x 646 pixels
	    ['turtle', CMWN.MEDIA.SPRITE + 'turtle.walk.0.png', 515, 645], ['turtle3', CMWN.MEDIA.SPRITE + 'turtle.walk.3.png', 515, 645], ['turtle5', CMWN.MEDIA.SPRITE + 'turtle.walk.5.png', 515, 645],
	    // 1830 x 276 pixels
	    ['heart', CMWN.MEDIA.SPRITE + 'game1.hearts.png', 305, 276],
	    // 1726 x 310 pixels
	    ['recycle', CMWN.MEDIA.SPRITE + 'recycle-01.png', 345, 310],
	    // 1380 x 310 pixels
	    ['rainbowRecycle', CMWN.MEDIA.SPRITE + 'rainbow.recycle-01.png', 345, 310],
	    // 5750 x 286 pixels
	    ['truck', CMWN.MEDIA.SPRITE + 'truck.png', 575, 286],
	    // 1320 x 226 pixels
	    ['door', CMWN.MEDIA.SPRITE + 'door.open.png', 220, 226],
	    // 3600 x 326 pixels
	    ['jet', CMWN.MEDIA.SPRITE + 'jet.pack.png', 600, 326],
	    // 7860 x 410 pixels
	    ['snake0', CMWN.MEDIA.SPRITE + 'mother.slither-01.png', 655, 410],
	    // 7860 x 410 pixels
	    ['snake1', CMWN.MEDIA.SPRITE + 'sister.slither-01.png', 655, 410],
	    // 7860 x 410 pixels
	    ['snake2', CMWN.MEDIA.SPRITE + 'brother.slither-01.png', 655, 410]]);

	    _2.default.call(this, 'atlas', [['snake0up', CMWN.MEDIA.SPRITE + 'Mom.leaving.hole.png', CMWN.MEDIA.SPRITE + 'Mom.leaving.hole.json'], ['snake0down', CMWN.MEDIA.SPRITE + 'mom.going.to.hole.png?v=3', CMWN.MEDIA.SPRITE + 'mom.going.to.hole.json'], ['snake1up', CMWN.MEDIA.SPRITE + 'Sister.leave.hole.png', CMWN.MEDIA.SPRITE + 'Sister.leave.hole.json'], ['snake1down', CMWN.MEDIA.SPRITE + 'sister.down.hole.png?v=3', CMWN.MEDIA.SPRITE + 'sister.down.hole.json'], ['snake2up', CMWN.MEDIA.SPRITE + 'brother.leave.hole.png', CMWN.MEDIA.SPRITE + 'brother.leave.hole.json'], ['snake2down', CMWN.MEDIA.SPRITE + 'brother.down.hole.png?v=3', CMWN.MEDIA.SPRITE + 'brother.down.hole.json']]);

	    _2.default.call(this, 'audio', [['bush', CMWN.MEDIA.EFFECT + 'BumpOrLandOnBush.mp3'], ['stump', CMWN.MEDIA.EFFECT + 'BumpTreeStump.mp3'], ['truck', CMWN.MEDIA.EFFECT + 'DumpTruckZoom.mp3'], ['hole', CMWN.MEDIA.EFFECT + 'Fall_In_Hole.mp3'], ['log', CMWN.MEDIA.EFFECT + 'goInLog.mp3'], ['jump', CMWN.MEDIA.EFFECT + 'Jump.mp3'], ['water', CMWN.MEDIA.EFFECT + 'LandInWater.mp3'], ['heart', CMWN.MEDIA.EFFECT + 'LifeHeartCapture.mp3'], ['lightening', CMWN.MEDIA.EFFECT + 'LightingCapture.mp3'], ['bag', CMWN.MEDIA.EFFECT + 'PickUpTrashBag.mp3'],
	    // the empty sound is not currently used anywhere
	    // ['empty', `${CMWN.MEDIA.EFFECT}MissTrashBag.mp3`],
	    ['rainbowRecycle', CMWN.MEDIA.EFFECT + 'RecycleColors.mp3'], ['recycle', CMWN.MEDIA.EFFECT + 'RecycleGreen.mp3']]);
	};

	var _ = __webpack_require__(6);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image';
	    var optsArray = arguments[1];

	    if (fn === 'audio' && !this.audio) this.audio = {};
	    this.game.load.crossOrigin = 'anonymous';
	    _.each(optsArray, function (opts) {
	        var _game$load;

	        (_game$load = _this.game.load)[fn].apply(_game$load, _toConsumableArray(opts));
	        if (fn === 'audio') _this.audio[opts[0]] = true;
	    });
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    this.controller = {};

	    _3.default.call(this, {
	        width: 4000,
	        height: 740,
	        top: -200
	    });

	    this.cursors = this.game.input.keyboard.createCursorKeys();

	    this.helpers.makeBackground.call(this);
	    this.helpers.makeGround.call(this);
	    this.helpers.makeDoor.call(this);
	    this.helpers.makePlatforms.call(this);

	    _5.default.call(this, {
	        left: 32,
	        top: this.game.world.height - 450,
	        image: this.opts.playerImage,
	        bounceY: this.opts.bounceY,
	        gravityY: this.opts.gravityY,
	        body: this.opts.playerBody,
	        rightFrames: this.opts.rightFrames,
	        leftFrames: this.opts.leftFrames,
	        scale: this.opts.playerScale,
	        anchor: this.opts.playerAnchor
	    });

	    this.helpers.makeLogs.call(this);
	    this.helpers.makeItems.call(this);

	    this.data = _.defaults({
	        levels: _defineProperty({}, this.opts.level, {
	            start: true,
	            trucks: 0
	        })
	    }, this.data);

	    this.audio = _.reduce(this.audio, function (a, v, k) {
	        a[k] = _this.game.add.audio(k);
	        return a;
	    }, {});

	    this.helpers.emitData.call(this);
	};

	var _2 = __webpack_require__(8);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(9);

	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
		//import randomizeLocations from 'shared/phaser/methods/randomize_locations/0.1';

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    opts = _.defaults(opts, {
	        physics: Phaser.Physics.ARCADE,
	        disableVisibilityChange: true,
	        left: 0,
	        top: 0,
	        width: 2000,
	        height: 600
	    });

	    this.game.physics.startSystem(opts.physics);
	    this.game.stage.disableVisibilityChange = opts.disableVisibilityChange;
	    this.game.world.setBounds(opts.left, opts.top, opts.width, opts.height);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _player$anchor;

	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    opts = _.defaults(opts, {
	        left: 32,
	        top: 500,
	        image: 'dude',
	        bounceX: 0,
	        bounceY: 0.2,
	        gravityX: 0,
	        gravityY: 300,
	        collideWorldBounds: true,
	        checkCollisionUp: true,
	        checkCollisionDown: true,
	        checkCollisionRight: true,
	        checkCollisionLeft: true,
	        leftFrames: [0, 1, 2, 3],
	        leftFrameRate: 10,
	        leftLoop: true,
	        rightFrames: [5, 6, 7, 8],
	        rightFrameRate: 10,
	        rightLoop: true,
	        scale: [1, 1],
	        anchor: [.5, .5]
	    });

	    // The player and its settings
	    this.player = this.game.add.sprite(opts.left, opts.top, opts.image);

	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(this.player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    (_player$anchor = this.player.anchor).setTo.apply(_player$anchor, _toConsumableArray(opts.anchor));
	    (0, _3.default)(this.player, opts);
	    this.player.body.bounce.x = opts.bounceX;
	    this.player.body.bounce.y = opts.bounceY;
	    this.player.body.gravity.x = opts.gravityX;
	    this.player.body.gravity.y = opts.gravityY;
	    this.player.body.collideWorldBounds = opts.collideWorldBounds;
	    this.player.body.checkCollision.up = opts.checkCollisionUp;
	    this.player.body.checkCollision.down = opts.checkCollisionDown;
	    this.player.body.checkCollision.right = opts.checkCollisionRight;
	    this.player.body.checkCollision.left = opts.checkCollisionLeft;

	    //  Our two animations, walking left and right.
	    this.player.animations.add('left', opts.leftFrames, opts.leftFrameRate, opts.leftLoop);
	    this.player.animations.add('right', opts.rightFrames, opts.rightFrameRate, opts.rightLoop);
	    window.player = this.player;
	};

	var _2 = __webpack_require__(10);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (item) {
	    var _item$scale;

	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    opts = _.defaults(opts, {
	        scale: [1, 1]
	    });

	    (_item$scale = item.scale).setTo.apply(_item$scale, _toConsumableArray(opts.scale));

	    if (opts.body) {
	        // defer here to prevent this.player.scale from overriding body size
	        // we might want to find a better way to do this
	        setTimeout(function () {
	            item.body.width = opts.body[0] * opts.scale[0];
	            item.body.height = opts.body[1] * opts.scale[1];
	            item.body.offset.x = opts.body[2];
	            item.body.offset.y = opts.body[3];
	        }, 0);
	    }
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    this.player.canJump = true;

	    _2.default.call(this, 'collide', [[this.player, this.ground, this.helpers.hitGround], [this.player, this.water, this.helpers.hitWater], [this.player, this.platforms, this.helpers.hitGround], [this.player, this.bushes, this.helpers.hitBush], [this.player, this.obstacles, this.helpers.hitObstacle], [this.player, this.logs, this.helpers.hitGround], [this.bushes, this.ground, this.helpers.stay], [this.bushes, this.platforms, this.helpers.stay], [this.trees, this.ground, this.helpers.stay], [this.trees, this.platforms, this.helpers.stay], [this.snakes, this.ground, this.helpers.stay], [this.snakes, this.platforms, this.helpers.stay], [this.snakes, this.water, this.helpers.turnAround], [this.holes, this.ground, this.helpers.stay], [this.bags, this.ground, this.helpers.stay], [this.bags, this.platforms, this.helpers.stay], [this.obstacles, this.ground, this.helpers.stay], [this.obstacles, this.platforms, this.helpers.stay], [this.doors, this.ground, this.helpers.stay]]);

	    _2.default.call(this, 'overlap', [[this.player, this.logs, this.helpers.inLog]]);

	    if (!this.data.levels[this.opts.level].complete) {
	        if (this.player.boost) {
	            _4.default.call(this, {
	                upSpeed: this.opts.boostUpSpeed,
	                downSpeed: this.opts.boostDownSpeed,
	                leftSpeed: this.opts.boostLeftSpeed,
	                rightSpeed: this.opts.boostRightSpeed,
	                stopFrame: this.opts.boostPlayerStopFrame,
	                jumpSound: this.audio.jump
	            });
	        } else {
	            _4.default.call(this, {
	                upSpeed: this.opts.upSpeed,
	                downSpeed: this.opts.downSpeed,
	                leftSpeed: this.opts.leftSpeed,
	                rightSpeed: this.opts.rightSpeed,
	                stopFrame: this.opts.playerStopFrame,
	                jumpSound: this.audio.jump
	            });
	        }
	    } else if (this.data.levels[this.opts.level].doorOpen) {
	        this.player.body.velocity.x = 150;
	        this.player.body.collideWorldBounds = false;
	        this.player.animations.play('right');
	        this.game.physics.arcade.enable(this.player);
	    }

	    if (this.controller.pause) {
	        this.controller = { pause: true };
	        return;
	    }

	    _2.default.call(this, 'overlap', [[this.player, this.bags, this.helpers.collectBags], [this.player, this.hearts, this.helpers.collectHeart], [this.player, this.recycles, this.helpers.collectRecycling], [this.player, this.rainbowRecycles, this.helpers.collectRainbowRecycling], [this.player, this.trucks, this.helpers.loadTruck], [this.player, this.doors, this.helpers.exit], [this.player, this.lightening, this.helpers.collectLightening], [this.player, this.snakes, this.helpers.hitEnemy], [this.snakes, this.holes, this.helpers.activateSnake]]);

	    this.game.camera.x = Math.min(Math.max(this.player.centerX - 400, 0), this.game.world.width - 800);

	    this.clouds.children[0].position.x = -.25 * this.player.centerX;
	    this.clouds.children[1].position.x = 2975.5 - .25 * this.player.centerX;
	};

	var _ = __webpack_require__(12);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(13);

	var _4 = _interopRequireDefault(_3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'collide';
	    var optsArray = arguments[1];

	    _.each(optsArray, function (opts) {
	        var _game$physics$arcade;

	        opts = _.defaults(opts, [_this.player, _this.platforms, _.noop, null, _this]);
	        (_game$physics$arcade = _this.game.physics.arcade)[fn].apply(_game$physics$arcade, _toConsumableArray(opts));
	    });
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (opts) {
	    opts = _.defaults(opts, {
	        upSpeed: -350,
	        downSpeed: 500,
	        leftSpeed: -150,
	        rightSpeed: 150,
	        stopFrame: 4
	    });

	    //  Reset the players velocity (movement)
	    if (this.isHit) return;
	    this.player.body.velocity.x = 0;

	    if (this.cursors.left.isDown || this.controller.left) {
	        //  Move to the left
	        this.player.body.velocity.x = opts.leftSpeed;
	        this.player.animations.play('left');
	    } else if (this.cursors.right.isDown || this.controller.right) {
	        //  Move to the right
	        this.player.body.velocity.x = opts.rightSpeed;
	        this.player.animations.play('right');
	    } else {
	        //  Stand still
	        this.player.animations.stop();
	        this.player.frame = opts.stopFrame;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (this.player.canJump && (this.cursors.up.isDown || this.controller.up) && this.player.body.touching.down) {
	        this.player.body.velocity.y = opts.upSpeed;
	        _.invoke(opts.jumpSound, 'play');
	    }

	    //  Allow the player to fall fast if they are not touching the ground.
	    if ((this.cursors.down.isDown || this.controller.down) && !this.player.body.touching.down) {
	        this.player.body.velocity.y = opts.downSpeed;
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ = __webpack_require__(10);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(15);

	var _4 = _interopRequireDefault(_3);

	var _make_background = __webpack_require__(16);

	var _make_background2 = _interopRequireDefault(_make_background);

	var _make_ground = __webpack_require__(17);

	var _make_ground2 = _interopRequireDefault(_make_ground);

	var _make_platforms = __webpack_require__(18);

	var _make_platforms2 = _interopRequireDefault(_make_platforms);

	var _make_logs = __webpack_require__(19);

	var _make_logs2 = _interopRequireDefault(_make_logs);

	var _make_items = __webpack_require__(20);

	var _make_items2 = _interopRequireDefault(_make_items);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    emitData: function emitData() {
	        //  emit event with data to skoash game
	        this.emitEvent({
	            updateGameState: {
	                path: ['game'],
	                data: this.data
	            }
	        });
	    },
	    hitGround: function hitGround() {},
	    onHitBush: function onHitBush() {
	        this.audio.bush.play();
	    },
	    hitEnemy: function hitEnemy(p, e) {
	        if (!e.active) return;
	        this.helpers.hitSomething.call(this, p);
	        this.audio.hole.play();
	    },
	    hitObstacle: function hitObstacle(p) {
	        this.helpers.hitSomething.call(this, p);
	        this.audio.stump.play();
	    },
	    hitWater: function hitWater(p) {
	        this.helpers.hitSomething.call(this, p, 1, 1);
	        this.audio.water.play();
	    },
	    hitSomething: function hitSomething(p) {
	        var _this = this;

	        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

	        if (this.isHit) return;
	        this.isHit = true;
	        p.body.velocity.y = -1 * this.opts.hitVelocity;

	        p.body.velocity.x = (p.body.velocity.x === Math.abs(p.body.velocity.x) ? d : -1 * d) * this.opts.hitVelocity;

	        setTimeout(function () {
	            _this.isHit = false;
	        }, 1000);

	        this.data.hits += i;
	        this.helpers.emitData.call(this);
	        setTimeout(function () {
	            if (_this.data.hits >= _this.opts.hitsPerLife) {
	                _this.data.hits -= _this.opts.hitsPerLife;
	                _this.data.lives--;
	                _this.helpers.emitData.call(_this);
	            }
	        }, 250);
	    },
	    activateSnake: function activateSnake(snake, hole) {
	        var climb;
	        var shouldClimbUp = !snake.active && !snake.climbing;
	        var shouldClimbDown = snake.active && !snake.climbing && snake.body.velocity.x > 0 && snake.left < hole.left && snake.left > hole.left - 80;

	        if (shouldClimbUp) {
	            snake.left = hole.left - 25;
	            snake.loadTexture(snake.originalImage + 'up', 0);
	            climb = snake.animations.add('hole', [0, 1, 2, 3, 4, 5, 6], 10, false);
	            climb.onComplete.add(function () {
	                snake.loadTexture(snake.originalImage, 5);
	                snake.scale.setTo(.3, .3);
	                snake.left = snake.left - 25;
	                snake.top = snake.top - 25;
	                snake.animations.add('left', [5, 4, 3, 2, 1, 0], 10, true);
	                snake.animations.add('right', [6, 7, 8, 9, 10, 11], 10, true);
	                snake.animations.play('left');
	                snake.body.velocity.x = -100;
	                setTimeout(function () {
	                    snake.climbing = false;
	                }, 5000);
	            });
	            snake.width = 140;
	            snake.height = 100;
	            snake.animations.play('hole');
	            snake.active = true;
	            snake.climbing = true;
	        } else if (shouldClimbDown) {
	            snake.left = hole.left - 75;
	            snake.body.velocity.x = 0;
	            snake.loadTexture(snake.originalImage + 'down', 0);
	            snake.left = snake.left + 25;
	            snake.top = snake.top + 25;
	            climb = snake.animations.add('hole', [0, 1, 2, 3, 4, 5, 6], 10, false);
	            climb.onComplete.add(function () {
	                snake.loadTexture(null, 0);
	                snake.scale.setTo(.3, .3);
	                snake.left = snake.left - 25;
	                setTimeout(function () {
	                    snake.climbing = false;
	                }, 5000);
	            });
	            snake.width = 140;
	            snake.height = 100;
	            snake.animations.play('hole');
	            snake.active = false;
	            snake.climbing = true;
	        }
	    },
	    turnAround: function turnAround(enemy) {
	        if (enemy.isTurning) return;
	        enemy.isTurning = true;
	        enemy.body.velocity.x = -1 * enemy.body.velocity.x;
	        enemy.animations.play(enemy.body.velocity.x < 0 ? 'left' : 'right');
	        setTimeout(function () {
	            enemy.isTurning = false;
	        }, 500);
	    },
	    inLog: function inLog() {
	        var _this2 = this;

	        if (!this.player.canJump) return;
	        this.player.canJump = false;
	        (0, _2.default)(this.player, {
	            scale: this.opts.playerLogScale,
	            body: this.opts.playerBody
	        });
	        this.audio.log.play();
	        setTimeout(function () {
	            if (!_this2.game.physics.arcade.overlap(_this2.player, _this2.logs)) {
	                _this2.player.canJump = true;
	                (0, _2.default)(_this2.player, {
	                    scale: _this2.opts.playerScale,
	                    body: _this2.opts.playerBody
	                });
	            }
	        }, 100);
	    },
	    collectRecycling: function collectRecycling(player, recyclying) {
	        // Removes the recyclying from the screen
	        recyclying.kill();
	        this.audio.recycle.play();
	        //  update the lives
	        this.data.score += this.opts.recyclingScore;
	        this.helpers.emitData.call(this);
	    },
	    collectRainbowRecycling: function collectRainbowRecycling(player, recyclying) {
	        // Removes the recyclying from the screen
	        recyclying.kill();
	        this.audio.rainbowRecycle.play();
	        //  update the lives
	        this.data.score += this.opts.rainbowRecyclyingScore;
	        this.helpers.emitData.call(this);
	    },
	    collectHeart: function collectHeart(player, heart) {
	        if (this.data.lives === this.opts.maxLives) return;
	        // Removes the heart from the screen
	        heart.kill();
	        this.audio.heart.play();
	        //  update the lives
	        this.data.lives++;
	        this.helpers.emitData.call(this);
	    },
	    collectBags: function collectBags(player, bag) {
	        if (this.data.bagCount === this.opts.maxBags) return;
	        // Removes the bag from the screen
	        bag.kill();
	        this.audio.bag.play();
	        //  update the bagCount
	        this.data.bagCount++;
	        this.helpers.updatePlayer.call(this);
	        this.helpers.emitData.call(this);
	    },
	    collectLightening: function collectLightening(player, lightening) {
	        var _this3 = this;

	        player.boost = player.boost + 1 || 1;
	        lightening.kill();
	        this.audio.lightening.play();
	        this.helpers.updatePlayer.call(this);
	        setTimeout(function () {
	            player.boost--;
	            _this3.helpers.updatePlayer.call(_this3);
	        }, this.opts.boostTime);
	    },
	    updatePlayer: function updatePlayer() {
	        if (this.player.boost) {
	            this.player.loadTexture('jet', 3);
	            this.player.animations.add('left', this.opts.boostLeftFrames, this.opts.boostLeftFrameRate, this.opts.boostLeftLoop);
	            this.player.animations.add('right', this.opts.boostRightFrames, this.opts.boostRightFrameRate, this.opts.boostRightLoop);
	        } else {
	            if (this.data.bagCount === this.opts.maxBags) {
	                this.player.loadTexture('turtle5', this.player.frame);
	            } else if (this.data.bagCount >= this.opts.maxBags / 2) {
	                this.player.loadTexture('turtle3', this.player.frame);
	            } else {
	                this.player.loadTexture('turtle', this.player.frame);
	            }
	            this.player.animations.add('left', this.opts.leftFrames, this.opts.leftFrameRate, this.opts.leftLoop);
	            this.player.animations.add('right', this.opts.rightFrames, this.opts.rightFrameRate, this.opts.rightLoop);
	        }
	    },
	    stay: function stay(a) {
	        a.body.gravity.y = 0;
	        a.body.velocity.y = 0;
	    },
	    loadTruck: function loadTruck(player, truck) {
	        var _this4 = this;

	        if (truck.driving || this.data.bagCount !== this.opts.maxBags) return;
	        truck.driving = true;
	        setTimeout(function () {
	            _this4.audio.truck.play();
	        }, 500);
	        truck.animations.play('drive');
	        this.data.bagCount = 0;
	        this.data.levels[this.opts.level].trucks++;
	        this.helpers.updatePlayer.call(this);
	        if (this.data.levels[this.opts.level].trucks === this.opts.maxTrucks) {
	            this.doors.children[0].animations.play('open');
	            this.data.levels[this.opts.level].doorOpen = true;
	        }
	        this.helpers.emitData.call(this);
	    },

	    makeBackground: _make_background2.default,
	    makeGround: _make_ground2.default,
	    makePlatforms: _make_platforms2.default,
	    makeLogs: _make_logs2.default,
	    makeItems: _make_items2.default,
	    makeDoor: function makeDoor() {
	        _4.default.call(this, {
	            group: 'doors'
	        }, [{
	            image: 'door',
	            gravityY: 100,
	            body: [200, 200, 25, 25],
	            scale: [.5, .5],
	            collideWorldBounds: false,
	            left: this.game.world.width - 90,
	            top: 0
	        }]);

	        this.doors.children[0].animations.add('open', [5, 4, 3, 2, 1, 0], 10, false);
	        this.doors.children[0].animations.add('close', [0, 1, 2, 3, 4, 5], 10, false);
	        this.doors.children[0].animations.play('close');
	    },
	    exit: function exit() {
	        var _this5 = this;

	        if (this.data.levels[this.opts.level].trucks !== this.opts.maxTrucks) return;
	        if (this.data.levels[this.opts.level].complete) return;
	        this.data.levels[this.opts.level].complete = true;
	        this.player.body.collideWorldBounds = false;
	        this.helpers.emitData.call(this);
	        setTimeout(function () {
	            _this5.doors.children[0].animations.play('close');
	            _this5.data.levels[_this5.opts.level].doorOpen = false;
	            _this5.helpers.emitData.call(_this5);
	            _this5.player.body.velocity.x = 0;
	        }, 2500);
	    }
		};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var groupOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var optsArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    groupOpts.defaultOpts = _.defaults(groupOpts.defaultOpts, {
	        alpha: 1,
	        scale: [1, 1],
	        left: 0,
	        top: 0,
	        image: 'ground',
	        immovable: true,
	        bounceX: 1,
	        bounceY: 1,
	        gravityX: 0,
	        gravityY: 0,
	        collideWorldBounds: true,
	        checkCollisionUp: true,
	        checkCollisionDown: true,
	        checkCollisionRight: true,
	        checkCollisionLeft: true,
	        angle: 0,
	        anchor: [0, 0]
	    });

	    groupOpts = _.defaults(groupOpts, {
	        enableBody: true,
	        group: 'platforms'
	    });

	    if (!this[groupOpts.group]) {
	        // create the group we will be adding the items to
	        this[groupOpts.group] = this.game.add.group();
	        // enable physics for any object that is created in this group
	        this[groupOpts.group].enableBody = groupOpts.enableBody;
	    }

	    _.each(optsArray, function (options) {
	        var _item$scale, _item$anchor;

	        var opts = _.defaults({}, options, groupOpts.defaultOpts);

	        var item = _this[groupOpts.group].create(opts.left, opts.top, opts.image);

	        item.originalImage = opts.image;
	        item.alpha = opts.alpha;
	        (_item$scale = item.scale).setTo.apply(_item$scale, _toConsumableArray(opts.scale));
	        if (opts.crop) {
	            item.crop(new (Function.prototype.bind.apply(Phaser.Rectangle, [null].concat(_toConsumableArray(opts.crop))))());
	            if (groupOpts.enableBody) {
	                item.body.width = opts.crop[2];
	                item.body.height = opts.crop[3];
	            }
	        }
	        item.angle = opts.angle;
	        (_item$anchor = item.anchor).setTo.apply(_item$anchor, _toConsumableArray(opts.anchor));

	        if (groupOpts.enableBody) {
	            item.body.immovable = opts.immovable;
	            item.body.collideWorldBounds = opts.collideWorldBounds;
	            item.body.bounce.x = opts.bounceX;
	            item.body.bounce.y = opts.bounceY;
	            item.body.gravity.x = opts.gravityX;
	            item.body.gravity.y = opts.gravityY;
	            item.body.checkCollision.up = opts.checkCollisionUp;
	            item.body.checkCollision.down = opts.checkCollisionDown;
	            item.body.checkCollision.right = opts.checkCollisionRight;
	            item.body.checkCollision.left = opts.checkCollisionLeft;

	            if (opts.body) {
	                // defer here to prevent item.scale from overriding body size
	                // we might want to find a better way to do this
	                setTimeout(function () {
	                    item.body.width = opts.body[0] * opts.scale[0];
	                    item.body.height = opts.body[1] * opts.scale[1];
	                    item.body.offset.x = opts.body[2] * opts.scale[0];
	                    item.body.offset.y = opts.body[3] * opts.scale[1];
	                }, 0);
	            }
	        }
	    });
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    _2.default.call(this, {
	        group: 'sky', enableBody: false, defaultOpts: {
	            collideWorldBounds: false,
	            top: 0,
	            image: 'sky',
	            scale: [.5, .5]
	        }
	    }, [{ left: 0 }, { left: 2975.5 }]);

	    _2.default.call(this, {
	        group: 'clouds', enableBody: false, defaultOpts: {
	            collideWorldBounds: false,
	            top: 0,
	            image: 'clouds',
	            scale: [.5, .5]
	        }
	    }, [{ left: 0 }, { left: 2975.5 }]);
	};

	var _ = __webpack_require__(15);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var left = 0;
	    var groundOpts = [];
	    var waterOpts = [];
	    var random = 2;

	    var crops = [[20, 0, 380, 210], [545, 0, 200, 210], [865, 0, 380, 210], [1405, 0, 200, 210]];

	    var bodies = [[380, 140, 0, 60], [200, 140, 0, 60], [380, 140, 0, 60], [200, 140, 0, 60]];

	    while (left < this.game.world.width) {
	        random = _.random(random > 1 || left > this.game.world.width - 600 ? crops.length / 2 - 1 : crops.length - 1);
	        var crop = crops[random];
	        var body = bodies[random];

	        if (random < 2) {
	            groundOpts.push({
	                left: left,
	                crop: crop,
	                body: body
	            });
	        } else {
	            waterOpts.push({
	                left: left,
	                crop: crop,
	                body: body
	            });
	        }

	        left += crop[2] - 3;
	    }

	    var defaultOpts = {
	        top: 330,
	        collideWorldBounds: false,
	        image: 'ground'
	    };

	    _3.default.call(this, {
	        group: 'ground', defaultOpts: defaultOpts
	    }, groundOpts);

	    _3.default.call(this, {
	        group: 'water', defaultOpts: defaultOpts
	    }, waterOpts);
	};

	var _2 = __webpack_require__(15);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var crops = [[200, 0, 240, 96], [790, 0, 350, 96], [1290, 0, 645, 96]];

	    var bodies = [[200, 28, 0, 80], [310, 28, 0, 80], [605, 28, 0, 80]];

	    var platformParams = this.opts.setPlatforms || [];

	    var locations = this.opts.locations || [];

	    var platformOpts = [];

	    function addPlatform(location, i) {
	        platformOpts.push({
	            left: location[0],
	            top: location[1],
	            crop: crops[i],
	            body: bodies[i]
	        });
	    }

	    _.each(platformParams, function (params) {
	        addPlatform.apply(undefined, _toConsumableArray(params));
	    });

	    _.each(locations, function (location) {
	        addPlatform(location, _.random(crops.length - 1));
	    });

	    _3.default.call(this, {
	        group: 'platforms',
	        defaultOpts: {
	            top: 300,
	            collideWorldBounds: false,
	            image: 'platforms',
	            scale: [.5, .5],
	            checkCollisionDown: false,
	            checkCollisionRight: false,
	            checkCollisionLeft: false
	        }
	    }, platformOpts);
	};

	var _2 = __webpack_require__(15);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var crops = [[100, 0, 220, 100], [460, 0, 350, 100], [830, 0, 415, 100]];

	    var bodies = [[220, 100, 0, 0], [350, 100, 0, 0], [415, 100, 0, 0]];

	    var offsets = {
	        platforms: 0,
	        ground: 40
	    };

	    _.each(offsets, function (offset, location) {
	        _.each(_this[location].children, function (platform) {
	            var index;
	            if (platform.left < 400 || platform.left > _this.game.world.width - 400) return;
	            if (Math.random() < _this.opts[location + 'LogChance']) {
	                platform.hasLog = true;
	                index = Math.floor(Math.random() * (platform.width > 300 ? 3 : platform.width > 150 ? 2 : 1));
	                _3.default.call(_this, {
	                    group: 'logs',
	                    defaultOpts: {
	                        image: 'logs',
	                        scale: [.5, .5],
	                        alpha: .8,
	                        collideWorldBounds: false,
	                        checkCollisionRight: false,
	                        checkCollisionLeft: false
	                    }
	                }, [{
	                    top: platform.top + offset - 35,
	                    left: platform.left,
	                    crop: crops[Math.floor(index)],
	                    body: bodies[index]
	                }]);
	            }
	        });
	    });
	};

	var _2 = __webpack_require__(15);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var _this = this;

	    var defaultProps = this.opts.itemProps;
	    var groups = this.opts.groups;

	    var truckNumber = 1;
	    var truckTotal = this.opts.maxTrucks;

	    var getObjects = function getObjects() {
	        var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var amounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        return objects.concat(_.shuffle(_.reduce(amounts, function (a, v, k) {
	            return a.concat(_.times(v || 0, function () {
	                return k;
	            }));
	        }, [])));
	    };

	    var objects = getObjects([], this.opts.platformItemAmounts);

	    var locations = _.defaults(_.reduce(this.opts.platformItemAmounts, function (a, v, k) {
	        a[k] = [];
	        return a;
	    }, {}), _.reduce(this.opts.groundItemAmounts, function (a, v, k) {
	        a[k] = [];
	        return a;
	    }, {}));

	    var placeObject = function placeObject(platform, up, over) {
	        var object = objects.shift();
	        switch (object) {
	            case 'tree1':
	                up += 110;
	                break;
	            case 'tree2':
	            case 'tree3':
	            case 'tree5':
	            case 'tree7':
	                up += 90;
	                break;
	            case 'tree4':
	                up += 105;
	                break;
	            case 'tree6':
	                up += 95;
	                break;
	        }
	        if (platform.hasLog && !(object === 'bag' || object === 'blank')) {
	            objects.unshift(object);
	            object = 'blank';
	        }
	        if (locations[object]) {
	            locations[object].push({
	                top: platform.top - up,
	                left: platform.left + over
	            });
	        }
	    };

	    _.every(this.platforms.children, function (platform) {
	        placeObject(platform, 50, 30);
	        if (platform.width > 120) placeObject(platform, 50, 80);
	        if (platform.width > 200) placeObject(platform, 50, 170);
	        return objects.length;
	    });

	    objects = getObjects(objects, this.opts.groundItemAmounts);
	    objects.unshift('blank');
	    objects.unshift('blank');

	    _.every(this.ground.children, function (platform) {
	        if (truckNumber <= truckTotal && platform.left > _this.game.world.width * truckNumber / (truckTotal + 1.5)) {
	            locations.truck.push({
	                top: platform.top - 50,
	                left: platform.left
	            });
	            truckNumber++;
	            return true;
	        }
	        if (platform.left > _this.game.world.width - 200) return false;
	        placeObject(platform, 20, 30);
	        return objects.length;
	    });

	    // this makes sure that all the bags are placed
	    while (~objects.indexOf('bag')) {
	        locations.bag.push(locations.blank.shift());
	        objects[objects.indexOf('bag')] = 'blank';
	    }

	    _.each(locations, function (locationArray, key) {
	        var holeLocations;
	        var snakeLocations;
	        if (key === 'blank') return;
	        if (key === 'snake') {
	            holeLocations = _.map(locationArray, function (opts) {
	                return {
	                    top: opts.top,
	                    left: opts.left + 80
	                };
	            });
	            _3.default.call(_this, {
	                group: groups.hole, defaultOpts: defaultProps.hole
	            }, holeLocations);
	            snakeLocations = _.map(locationArray, function (opts) {
	                return {
	                    top: opts.top - 10,
	                    left: opts.left + 70,
	                    image: 'snake' + _.random(2)
	                };
	            });
	            _3.default.call(_this, {
	                group: groups.snake, defaultOpts: defaultProps.snake
	            }, snakeLocations);
	            return;
	        }
	        _3.default.call(_this, {
	            group: groups[key], defaultOpts: defaultProps[key]
	        }, locationArray);
	    });

	    _.each(_.get(this, 'hearts.children'), function (heart) {
	        heart.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
	        heart.animations.play('spin');
	    });

	    _.each(_.get(this, 'recycles.children'), function (recycle) {
	        recycle.animations.add('spin', [0, 1, 2, 3, 4], 10, true);
	        recycle.animations.play('spin');
	    });

	    _.each(_.get(this, 'rainbowRecycles.children'), function (recycle) {
	        recycle.animations.add('spin', [0, 1, 2, 3], 10, true);
	        recycle.animations.play('spin');
	    });

	    _.each(_.get(this, 'trucks.children'), function (truck) {
	        var drive = truck.animations.add('drive', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
	        drive.onComplete.add(function () {
	            truck.body.velocity.x = 200;
	        });
	    });

	    _.each(_.get(this, 'trees.children'), function (tree) {
	        tree.sendToBack();
	    });

	    _.each(_.get(this, 'snakes.children'), function (snake) {
	        snake.loadTexture(null, 0);
	    });
	};

	var _2 = __webpack_require__(15);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _opts = __webpack_require__(22);

	var _opts2 = _interopRequireDefault(_opts);

	var _opts3 = __webpack_require__(24);

	var _opts4 = _interopRequireDefault(_opts3);

	var _opts5 = __webpack_require__(25);

	var _opts6 = _interopRequireDefault(_opts5);

	var _opts7 = __webpack_require__(26);

	var _opts8 = _interopRequireDefault(_opts7);

	var _opts9 = __webpack_require__(27);

	var _opts10 = _interopRequireDefault(_opts9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = [_opts2.default, _opts4.default, _opts6.default, _opts8.default, _opts10.default];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(23);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 1,
	    platformsLogChance: 1 / 10,
	    groundLogChance: 0,
	    setPlatforms: [[[130, 80], 0], [[350, 160], 1], [[950, 160], 2], [[1050, 240], 0], [[2650, 80], 2], [[3600, 240], 0]],
	    locations: [[100, 240], [600, 240], [650, 80], [1350, 80], [1400, 240], [1700, 160], [1900, 80], [2050, 240], [2300, 160], [2550, 240], [2800, 160], [3000, 240], [3300, 160]],
	    platformItemAmounts: _.defaults({
	        squareBush: 1,
	        roundBush: 1,
	        snake: 0,
	        bag: 15,
	        blank: 10,
	        rock: 1,
	        stump: 1,
	        heart: 1,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 0,
	        tree1: 1,
	        tree2: 1,
	        tree3: 1,
	        tree4: 1
	    }, _default_opts2.default.platformItemAmounts),
	    groundItemAmounts: _.defaults({
	        squareBush: 1,
	        roundBush: 1,
	        hole: 2,
	        bag: 0,
	        blank: 5,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }, _default_opts2.default.groundItemAmounts)
		}, _default_opts2.default);

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var crops = [[0, 0, 155, 140], [155, 0, 155, 140], [310, 0, 155, 140], [465, 0, 155, 140], [620, 0, 155, 140], [775, 0, 155, 140], [930, 0, 155, 140], [0, 0, 300, 360], [300, 0, 300, 360], [600, 0, 300, 360], [900, 0, 300, 360], [1200, 0, 300, 360], [1500, 0, 300, 360], [1800, 0, 300, 360]];

	var generalDefaultProps = {
	    image: 'items',
	    gravityY: 12,
	    body: [115, 100, 20, 50],
	    scale: [.5, .5],
	    collideWorldBounds: false
	};

	var treeDefaultProps = {
	    image: 'trees',
	    gravityY: 12,
	    body: [300, 325, 0, 0],
	    scale: [.5, .5],
	    collideWorldBounds: false
	};

	var defaultItemAmounts = {
	    squareBush: 0,
	    roundBush: 0,
	    hole: 0,
	    snake: 0,
	    bag: 0,
	    blank: 0,
	    rock: 0,
	    stump: 0,
	    heart: 0,
	    recycle: 0,
	    raibowRecycle: 0,
	    lightening: 0,
	    tree1: 0,
	    tree2: 0,
	    tree3: 0,
	    tree4: 0,
	    tree5: 0,
	    tree6: 0,
	    tree7: 0,
	    truck: 0
	};

	exports.default = {
	    level: 1,
	    hitVelocity: 200,
	    recyclingScore: 100,
	    rainbowRecyclyingScore: 300,
	    hitsPerLife: 4,
	    maxLives: 3,
	    maxBags: 5,
	    maxTrucks: 3,
	    bounceY: .2,
	    gravityY: 400,
	    playerImage: 'turtle',
	    playerBody: [315, 396, 100, 150],
	    leftFrames: [5, 4, 3, 2, 1, 0],
	    leftFrameRate: 10,
	    leftLoop: true,
	    rightFrames: [6, 7, 8, 9, 10, 11],
	    rightFrameRate: 10,
	    rightLoop: true,
	    boostLeftFrames: [2, 1, 0],
	    boostLeftFrameRate: 10,
	    boostLeftLoop: true,
	    boostRightFrames: [3, 4, 5],
	    boostRightFrameRate: 10,
	    boostRightLoop: true,
	    playerAnchor: [.5, .8],
	    playerScale: [.15, .15],
	    playerLogScale: [.1, .1],
	    upSpeed: -350,
	    downSpeed: 500,
	    leftSpeed: -150,
	    rightSpeed: 150,
	    boostUpSpeed: -350,
	    boostDownSpeed: 500,
	    boostLeftSpeed: -300,
	    boostRightSpeed: 300,
	    playerStopFrame: 6,
	    boostPlayerStopFrame: 6,
	    boostTime: 3000,
	    platformsLogChance: 0,
	    groundLogChance: 0,
	    setPlatforms: [],
	    locations: [],
	    groups: {
	        squareBush: 'bushes',
	        roundBush: 'bushes',
	        snake: 'snakes',
	        hole: 'holes',
	        bag: 'bags',
	        rock: 'obstacles',
	        stump: 'obstacles',
	        heart: 'hearts',
	        recycle: 'recycles',
	        raibowRecycle: 'rainbowRecycles',
	        lightening: 'lightening',
	        truck: 'trucks',
	        tree1: 'trees',
	        tree2: 'trees',
	        tree3: 'trees',
	        tree4: 'trees',
	        tree5: 'trees',
	        tree6: 'trees',
	        tree7: 'trees'
	    },
	    itemProps: {
	        squareBush: _.defaults({
	            crop: crops[0]
	        }, generalDefaultProps),
	        roundBush: _.defaults({
	            crop: crops[1]
	        }, generalDefaultProps),
	        hole: _.defaults({
	            crop: crops[2],
	            body: [115, 20, 20, 50],
	            gravityY: 10000
	        }, generalDefaultProps),
	        bag: _.defaults({
	            crop: crops[3]
	        }, generalDefaultProps),
	        rock: _.defaults({
	            crop: crops[4]
	        }, generalDefaultProps),
	        stump: _.defaults({
	            crop: crops[5],
	            body: [115, 120, 20, 50]
	        }, generalDefaultProps),
	        lightening: _.defaults({
	            crop: crops[6],
	            gravityY: 0
	        }, generalDefaultProps),
	        heart: {
	            image: 'heart',
	            scale: [.15, .15]
	        },
	        recycle: {
	            image: 'recycle',
	            scale: [.15, .15]
	        },
	        raibowRecycle: {
	            image: 'rainbowRecycle',
	            scale: [.15, .15]
	        },
	        truck: {
	            image: 'truck',
	            scale: [.5, .5],
	            collideWorldBounds: false
	        },
	        tree1: _.defaults({
	            crop: crops[7],
	            body: null
	        }, treeDefaultProps),
	        tree2: _.defaults({
	            crop: crops[8]
	        }, treeDefaultProps),
	        tree3: _.defaults({
	            crop: crops[9]
	        }, treeDefaultProps),
	        tree4: _.defaults({
	            crop: crops[10],
	            body: null
	        }, treeDefaultProps),
	        tree5: _.defaults({
	            crop: crops[11]
	        }, treeDefaultProps),
	        tree6: _.defaults({
	            crop: crops[12]
	        }, treeDefaultProps),
	        tree7: _.defaults({
	            crop: crops[13]
	        }, treeDefaultProps),
	        snake: {
	            scale: [.25, .25],
	            gravityY: 12,
	            collideWorldBounds: false
	        }
	    },
	    platformItemAmounts: defaultItemAmounts,
	    groundItemAmounts: defaultItemAmounts
		};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(23);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 2,
	    platformsLogChance: 1 / 20,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[-30, 240], 0], [[3600, 240], 1], [[3200, 240], 1]],
	    locations: [[100, 160], [300, 240], [400, 80], [700, 160], [900, 240], [1000, 80], [1200, 160], [1300, 240], [1600, 240], [1650, 80], [1800, 160], [2000, 240], [2100, 80], [2400, 160], [2700, 240], [2800, 80], [3000, 160]],
	    platformItemAmounts: _.defaults({
	        squareBush: 2,
	        roundBush: 2,
	        snake: 0,
	        bag: 15,
	        blank: 10,
	        rock: 2,
	        stump: 2,
	        heart: 2,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 1,
	        tree1: 1,
	        tree6: 1,
	        tree7: 1
	    }, _default_opts2.default.platformItemAmounts),
	    groundItemAmounts: _.defaults({
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 0,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }, _default_opts2.default.groundItemAmounts)
		}, _default_opts2.default);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(23);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 3,
	    platformsLogChance: 1 / 20,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[-30, 160], 2], [[0, 240], 0], [[700, 240], 2], [[1100, 160], 1], [[1900, 240], 1], [[2200, 240], 2], [[3400, 160], 2]],
	    locations: [[300, 240], [400, 80], [650, 160], [900, 80], [1300, 240], [1350, 80], [1550, 160], [2000, 80], [2700, 80], [2700, 240], [3100, 240]],
	    platformItemAmounts: _.defaults({
	        squareBush: 2,
	        roundBush: 2,
	        snake: 0,
	        bag: 15,
	        blank: 10,
	        rock: 2,
	        stump: 2,
	        heart: 2,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 1,
	        tree2: 1,
	        tree4: 1,
	        tree5: 1
	    }, _default_opts2.default.platformItemAmounts),
	    groundItemAmounts: _.defaults({
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 0,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0,
	        tree1: 1
	    }, _default_opts2.default.groundItemAmounts)
		}, _default_opts2.default);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(23);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 4,
	    platformsLogChance: 0,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[0, 160], 1], [[1100, 160], 1], [[1650, 160], 2], [[2100, 80], 0], [[2500, 240], 1], [[2800, 160], 2], [[3400, 160], 1]],
	    locations: [[200, 80], [200, 240], [500, 160], [800, 240], [900, 80], [1250, 240], [1400, 80], [1950, 240], [2200, 160], [3100, 80], [3100, 240]],
	    platformItemAmounts: _.defaults({
	        squareBush: 1,
	        roundBush: 1,
	        snake: 0,
	        bag: 15,
	        blank: 5,
	        rock: 2,
	        stump: 2,
	        heart: 2,
	        recycle: 1,
	        raibowRecycle: 1,
	        lightening: 1,
	        tree1: 1,
	        tree2: 1,
	        tree3: 1,
	        tree6: 1,
	        tree7: 1
	    }, _default_opts2.default.platformItemAmounts),
	    groundItemAmounts: _.defaults({
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 0,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }, _default_opts2.default.groundItemAmounts)
		}, _default_opts2.default);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_opts = __webpack_require__(23);

	var _default_opts2 = _interopRequireDefault(_default_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _.defaults({
	    level: 5,
	    platformsLogChance: 1 / 10,
	    groundLogChance: 1 / 20,
	    setPlatforms: [[[0, 160], 1], [[400, 160], 2], [[700, 240], 2], [[950, 160], 2], [[1550, 160], 2], [[1800, 240], 2], [[3400, 80], 0], [[3400, 240], 0], [[3600, 160], 1]],
	    locations: [[200, 80], [200, 240], [850, 80], [1250, 240], [1300, 80], [1900, 80], [2200, 160], [2500, 240], [2800, 160], [3050, 240], [3100, 80]],
	    platformItemAmounts: _.defaults({
	        squareBush: 2,
	        roundBush: 2,
	        snake: 0,
	        bag: 15,
	        blank: 5,
	        rock: 3,
	        stump: 3,
	        heart: 2,
	        recycle: 2,
	        raibowRecycle: 2,
	        lightening: 1,
	        tree1: 1,
	        tree2: 1,
	        tree3: 1,
	        tree6: 1,
	        tree7: 1
	    }, _default_opts2.default.platformItemAmounts),
	    groundItemAmounts: _.defaults({
	        squareBush: 1,
	        roundBush: 1,
	        snake: 2,
	        bag: 0,
	        blank: 0,
	        rock: 1,
	        stump: 1,
	        heart: 0,
	        recycle: 0,
	        raibowRecycle: 0
	    }, _default_opts2.default.groundItemAmounts)
		}, _default_opts2.default);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzdGUtYnVzdGVycy1waGFzZXIvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODg0YzM3NTg3ODU1OWVhZTVlNDYiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvanMvbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2luZGV4LmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvY29tcG9uZW50cy9nYW1lLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9wcmVsb2FkLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9sb2FkX2Fzc2V0cy8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvY3JlYXRlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9zZXRfZ2FtZV9zdGFnZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9wbGF5ZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9zY2FsZV9pdGVtLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9yZXNwb25zZXMvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9tb3ZlX3BsYXllci8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX2l0ZW1zLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9tYWtlX2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9ncm91bmQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9wbGF0Zm9ybXMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9sb2dzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL21ha2VfaXRlbXMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9kZWZhdWx0X29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0czIuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0czMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0czQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0czUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoY2FsbGJhY2spIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xuIFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0fVxuIFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0fSBjYXRjaChlKSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xuIFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdH1cblxuXG4gXHQvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iZWY0NWIwL3NyYy9zaGFyZWQvdXRpbHMvY2FuRGVmaW5lUHJvcGVydHkuanNcbiBcdHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuIFx0dHJ5IHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInhcIiwge1xuIFx0XHRcdGdldDogZnVuY3Rpb24oKSB7fVxuIFx0XHR9KTtcbiBcdFx0Y2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuIFx0fSBjYXRjaCh4KSB7XG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjg4NGMzNzU4Nzg1NTllYWU1ZTQ2XCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXG4gXHRcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkpIHtcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgKGZ1bmN0aW9uKG5hbWUpIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGZuW25hbWVdID0gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBlbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkLCBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobnVsbCwgZm4pO1xuIFx0XHRcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR9XG5cbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwiZVwiLCB7XG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0dmFsdWU6IGVuc3VyZVxuIFx0XHRcdH0pO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGZuLmUgPSBlbnN1cmU7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjaztcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm51bWJlclwiKVxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZVxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RDYWxsYmFjaztcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSwgY2FsbGJhY2spIHtcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGZhbHNlO1xuIFx0XHRcdGNhbGxiYWNrID0gYXBwbHk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcbiBcdFx0XHR9O1xuIFx0XHR9XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRob3REb3dubG9hZE1hbmlmZXN0KGZ1bmN0aW9uKGVyciwgdXBkYXRlKSB7XG4gXHRcdFx0aWYoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiBcdFx0XHRpZighdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgbnVsbCk7XG4gXHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0fVxuXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwW3VwZGF0ZS5jW2ldXSA9IHRydWU7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDYWxsYmFjayA9IGNhbGxiYWNrO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBjYWxsYmFjayA9IGhvdENhbGxiYWNrO1xuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XG4gXHRcdGlmKCFjYWxsYmFjaykgcmV0dXJuO1xuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xuIFx0XHRcdG9wdGlvbnMgPSB7fTtcbiBcdFx0fSBlbHNlIGlmKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG4gXHRcdFx0fTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRvcHRpb25zID0ge307XG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZSkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbbW9kdWxlXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmKG1vZHVsZUlkID09PSAwKSB7XG4gXHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcbiBcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0dmFyIHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoIXJlc3VsdCkge1xuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhyZXN1bHQpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHRbMF0pO1xuIFx0XHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiByZXN1bHRbMV0pIHtcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHR2YXIgaWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgY2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcbiBcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2UsXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IGhvdEN1cnJlbnRQYXJlbnRzLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODg0YzM3NTg3ODU1OWVhZTVlNDYiLCJ3aW5kb3cuRU5WSVJPTk1FTlQgPSB7XG4gICAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vZi8nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL2Rldi12YXJpYWJsZXMuanMiLCJ1bmRlZmluZWRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gIiwiKGZ1bmN0aW9uIChnYW1lTmFtZSkge1xuICAgIC8vIHJlbW92ZSB3aW5kb3cuTUVESUEgb25jZSBubyBnYW1lcyByZWZlcmVuY2UgaXRcbiAgICB2YXIgTUVESUEgPSB3aW5kb3cuTUVESUEgPSB7XG4gICAgICAgIEJBU0U6IEVOVklST05NRU5ULk1FRElBXG4gICAgfTtcblxuICAgIGNvbnN0IEdBTUUgPSAnZ2FtZXMvJztcbiAgICBjb25zdCBFRkZFQ1QgPSAnc291bmQtYXNzZXRzL2VmZmVjdHMvJztcbiAgICBjb25zdCBWTyA9ICdzb3VuZC1hc3NldHMvdm9zLyc7XG4gICAgY29uc3QgSU1BR0UgPSAnaW1hZ2UtYXNzZXRzLyc7XG4gICAgY29uc3QgU1BSSVRFID0gJ3Nwcml0ZXMtYW5pbWF0aW9ucy8nO1xuICAgIGNvbnN0IEZSQU1FID0gJ2ZyYW1lcy8nO1xuICAgIGNvbnN0IEZPTlQgPSAnZm9udHMvJztcbiAgICBjb25zdCBTSEFSRUQgPSAnc2hhcmVkLyc7XG4gICAgY29uc3QgTU9DS19HQU1FID0gJ21vY2stZ2FtZS8nO1xuXG4gICAgTUVESUEuRk9OVCA9IE1FRElBLkJBU0UgKyBGT05UO1xuICAgIE1FRElBLlNIQVJFRCA9IE1FRElBLkJBU0UgKyBHQU1FICsgU0hBUkVEO1xuXG4gICAgTUVESUEuR0FNRSA9IE1FRElBLkJBU0UgKyBHQU1FICsgZ2FtZU5hbWUgKyAnLyc7XG4gICAgTUVESUEuRUZGRUNUID0gTUVESUEuR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5WTyA9IE1FRElBLkdBTUUgKyBWTztcbiAgICBNRURJQS5JTUFHRSA9IE1FRElBLkdBTUUgKyBJTUFHRTtcbiAgICBNRURJQS5TUFJJVEUgPSBNRURJQS5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLkZSQU1FID0gTUVESUEuR0FNRSArIEZSQU1FO1xuICAgIE1FRElBLkZPTlQgPSBNRURJQS5HQU1FICsgRk9OVDtcblxuICAgIE1FRElBLk1PQ0sgPSB7fTtcbiAgICBNRURJQS5NT0NLLkdBTUUgPSBNRURJQS5CQVNFICsgR0FNRSArIE1PQ0tfR0FNRTtcbiAgICBNRURJQS5NT0NLLkVGRkVDVCA9IE1FRElBLk1PQ0suR0FNRSArIEVGRkVDVDtcbiAgICBNRURJQS5NT0NLLlZPID0gTUVESUEuTU9DSy5HQU1FICsgVk87XG4gICAgTUVESUEuTU9DSy5JTUFHRSA9IE1FRElBLk1PQ0suR0FNRSArIElNQUdFO1xuICAgIE1FRElBLk1PQ0suU1BSSVRFID0gTUVESUEuTU9DSy5HQU1FICsgU1BSSVRFO1xuICAgIE1FRElBLk1PQ0suRlJBTUUgPSBNRURJQS5NT0NLLkdBTUUgKyBGUkFNRTtcbiAgICBNRURJQS5NT0NLLkZPTlQgPSBNRURJQS5NT0NLLkdBTUUgKyBGT05UO1xuXG4gICAgd2luZG93LkNNV04uTUVESUEgPSBNRURJQTtcbn0od2luZG93LkNNV04uZ2FtZUZvbGRlcikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2pzL21ha2VfbWVkaWFfZ2xvYmFscy5qcyIsImltcG9ydCBHYW1lIGZyb20gJ3NoYXJlZC9waGFzZXIvY29tcG9uZW50cy9nYW1lLzAuMSc7XG5pbXBvcnQgcHJlbG9hZCBmcm9tICcuL2pzL3ByZWxvYWQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2pzL2NyZWF0ZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJy4vanMvdXBkYXRlJztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vanMvaGVscGVycyc7XG5cbmltcG9ydCBvcHRzQXJyYXkgZnJvbSAnLi9qcy9vcHRzJztcblxudmFyIG9wdHMgPSBvcHRzQXJyYXlbbG9jYXRpb24uc2VhcmNoLnNwbGl0KCd2PScpWzFdIC0gMSB8fCAwXTtcblxuRU5WSVJPTk1FTlQuTUVESUEgKz0gJ0dhbWVzL1dhc3RlQnVzdGVycy8nO1xuXG5uZXcgR2FtZSh7XG4gICAgd2lkdGg6IDk2MCxcbiAgICBoZWlnaHQ6IDU0MCxcbiAgICBwcmVsb2FkLFxuICAgIGNyZWF0ZSxcbiAgICB1cGRhdGUsXG4gICAgaGVscGVycyxcbiAgICBvcHRzLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9pbmRleC5qcyIsImNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgICAgICB2YXIgdXBkYXRlO1xuXG4gICAgICAgIG9wdHMucHJlbG9hZCA9IChvcHRzLnByZWxvYWQgfHwgXy5ub29wKS5iaW5kKHRoaXMpO1xuICAgICAgICBvcHRzLmNyZWF0ZSA9IChvcHRzLmNyZWF0ZSB8fCBfLm5vb3ApLmJpbmQodGhpcyk7XG4gICAgICAgIG9wdHMudXBkYXRlID0gKG9wdHMudXBkYXRlIHx8IF8ubm9vcCkuYmluZCh0aGlzKTtcblxuICAgICAgICB1cGRhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNob3VsZFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KHsgcmVhZHk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9wdHMudXBkYXRlKCk7XG4gICAgICAgIH0pLmJpbmQodGhpcyk7XG5cbiAgICAgICAgb3B0cyA9IF8uZGVmYXVsdHMob3B0cywge1xuICAgICAgICAgICAgd2lkdGg6IDk2MCxcbiAgICAgICAgICAgIGhlaWdodDogNTQwLFxuICAgICAgICAgICAgcmVuZGVyZXI6IFBoYXNlci5BVVRPLFxuICAgICAgICAgICAgcGFyZW50OiAnJyxcbiAgICAgICAgICAgIGhlbHBlcnM6IHt9LFxuICAgICAgICAgICAgc3RhdGU6IHsgcHJlbG9hZDogb3B0cy5wcmVsb2FkLCBjcmVhdGU6IG9wdHMuY3JlYXRlLCB1cGRhdGUgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oZWxwZXJzID0gb3B0cy5oZWxwZXJzO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzLm9wdHM7XG5cbiAgICAgICAgdGhpcy5nYW1lID0gbmV3IFBoYXNlci5HYW1lKG9wdHMud2lkdGgsIG9wdHMuaGVpZ2h0LCBvcHRzLnJlbmRlcmVyLCBvcHRzLnBhcmVudCwgb3B0cy5zdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudHMoKTtcbiAgICB9XG5cbiAgICBhdHRhY2hFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdza29hc2gtZXZlbnQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250cm9sbGVyLXVwZGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlciA9IGUuZGF0YS5jb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRhLXVwZGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IF8uZGVmYXVsdHMoZS5kYXRhLmRhdGEsIHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Jlc3VtZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBkb2N1bWVudC5kb21haW4gPSAnY2hhbmdlbXl3b3JsZG5vdy5jb20nO1xuICAgIH1cblxuICAgIGVtaXRFdmVudChvcHRzKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEV2ZW50KCdnYW1lLWV2ZW50Jyk7XG4gICAgICAgIF8uZWFjaChvcHRzLCAodiwgaykgPT4ge1xuICAgICAgICAgICAgZVtrXSA9IHY7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAod2luZG93LmZyYW1lRWxlbWVudCkgd2luZG93LmZyYW1lRWxlbWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9waGFzZXIvY29tcG9uZW50cy9nYW1lLzAuMS5qcyIsImltcG9ydCBsb2FkQXNzZXRzIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9sb2FkX2Fzc2V0cy8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgbG9hZEFzc2V0cy5jYWxsKHRoaXMsICdpbWFnZScsIFtcbiAgICBbJ3NreScsIGAke0NNV04uTUVESUEuSU1BR0V9Z2FtZS4xLmJrZy5za3kuanBnYF0sXG4gICAgWydjbG91ZHMnLCBgJHtDTVdOLk1FRElBLklNQUdFfWdhbWUuMS5ia2cuY2xvdWRzLnBuZ2BdLFxuICAgIFsnZ3JvdW5kJywgYCR7Q01XTi5NRURJQS5TUFJJVEV9Z2FtZTEuZ3JvdW5kLnBuZ2BdLFxuICAgIFsncGxhdGZvcm1zJywgYCR7Q01XTi5NRURJQS5TUFJJVEV9Z2FtZTEucGxhdGZvcm0ucG5nYF0sXG4gICAgLy8gOTMwIHggMTQwIHBpeGVsc1xuICAgIFsnaXRlbXMnLCBgJHtDTVdOLk1FRElBLlNQUklURX1nYW1lMS41LnBuZ2BdLFxuICAgIC8vIDEyNDYgeCAxMDAgcGl4ZWxzXG4gICAgWydsb2dzJywgYCR7Q01XTi5NRURJQS5TUFJJVEV9Z2FtZTEubG9ncy5wbmdgXSxcbiAgICAvLyAyMTAwIHggMzYwIHBpeGVsc1xuICAgIFsndHJlZXMnLCBgJHtDTVdOLk1FRElBLlNQUklURX1nYW1lMS50cmVlcy5wbmdgXSxcbiAgICBdKTtcblxuICAgIGxvYWRBc3NldHMuY2FsbCh0aGlzLCAnc3ByaXRlc2hlZXQnLCBbXG4gICAgLy8gNjE4MCB4IDY0NiBwaXhlbHNcbiAgICBbJ3R1cnRsZScsIGAke0NNV04uTUVESUEuU1BSSVRFfXR1cnRsZS53YWxrLjAucG5nYCwgNTE1LCA2NDVdLFxuICAgIFsndHVydGxlMycsIGAke0NNV04uTUVESUEuU1BSSVRFfXR1cnRsZS53YWxrLjMucG5nYCwgNTE1LCA2NDVdLFxuICAgIFsndHVydGxlNScsIGAke0NNV04uTUVESUEuU1BSSVRFfXR1cnRsZS53YWxrLjUucG5nYCwgNTE1LCA2NDVdLFxuICAgIC8vIDE4MzAgeCAyNzYgcGl4ZWxzXG4gICAgWydoZWFydCcsIGAke0NNV04uTUVESUEuU1BSSVRFfWdhbWUxLmhlYXJ0cy5wbmdgLCAzMDUsIDI3Nl0sXG4gICAgLy8gMTcyNiB4IDMxMCBwaXhlbHNcbiAgICBbJ3JlY3ljbGUnLCBgJHtDTVdOLk1FRElBLlNQUklURX1yZWN5Y2xlLTAxLnBuZ2AsIDM0NSwgMzEwXSxcbiAgICAvLyAxMzgwIHggMzEwIHBpeGVsc1xuICAgIFsncmFpbmJvd1JlY3ljbGUnLCBgJHtDTVdOLk1FRElBLlNQUklURX1yYWluYm93LnJlY3ljbGUtMDEucG5nYCwgMzQ1LCAzMTBdLFxuICAgIC8vIDU3NTAgeCAyODYgcGl4ZWxzXG4gICAgWyd0cnVjaycsIGAke0NNV04uTUVESUEuU1BSSVRFfXRydWNrLnBuZ2AsIDU3NSwgMjg2XSxcbiAgICAvLyAxMzIwIHggMjI2IHBpeGVsc1xuICAgIFsnZG9vcicsIGAke0NNV04uTUVESUEuU1BSSVRFfWRvb3Iub3Blbi5wbmdgLCAyMjAsIDIyNl0sXG4gICAgLy8gMzYwMCB4IDMyNiBwaXhlbHNcbiAgICBbJ2pldCcsIGAke0NNV04uTUVESUEuU1BSSVRFfWpldC5wYWNrLnBuZ2AsIDYwMCwgMzI2XSxcbiAgICAvLyA3ODYwIHggNDEwIHBpeGVsc1xuICAgIFsnc25ha2UwJywgYCR7Q01XTi5NRURJQS5TUFJJVEV9bW90aGVyLnNsaXRoZXItMDEucG5nYCwgNjU1LCA0MTBdLFxuICAgIC8vIDc4NjAgeCA0MTAgcGl4ZWxzXG4gICAgWydzbmFrZTEnLCBgJHtDTVdOLk1FRElBLlNQUklURX1zaXN0ZXIuc2xpdGhlci0wMS5wbmdgLCA2NTUsIDQxMF0sXG4gICAgLy8gNzg2MCB4IDQxMCBwaXhlbHNcbiAgICBbJ3NuYWtlMicsIGAke0NNV04uTUVESUEuU1BSSVRFfWJyb3RoZXIuc2xpdGhlci0wMS5wbmdgLCA2NTUsIDQxMF0sXG4gICAgXSk7XG5cbiAgICBsb2FkQXNzZXRzLmNhbGwodGhpcywgJ2F0bGFzJywgW1xuICAgICAgICBbXG4gICAgICAgICAgICAnc25ha2UwdXAnLFxuICAgICAgICAgICAgYCR7Q01XTi5NRURJQS5TUFJJVEV9TW9tLmxlYXZpbmcuaG9sZS5wbmdgLFxuICAgICAgICAgICAgYCR7Q01XTi5NRURJQS5TUFJJVEV9TW9tLmxlYXZpbmcuaG9sZS5qc29uYFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAnc25ha2UwZG93bicsXG4gICAgICAgICAgICBgJHtDTVdOLk1FRElBLlNQUklURX1tb20uZ29pbmcudG8uaG9sZS5wbmc/dj0zYCxcbiAgICAgICAgICAgIGAke0NNV04uTUVESUEuU1BSSVRFfW1vbS5nb2luZy50by5ob2xlLmpzb25gXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdzbmFrZTF1cCcsXG4gICAgICAgICAgICBgJHtDTVdOLk1FRElBLlNQUklURX1TaXN0ZXIubGVhdmUuaG9sZS5wbmdgLFxuICAgICAgICAgICAgYCR7Q01XTi5NRURJQS5TUFJJVEV9U2lzdGVyLmxlYXZlLmhvbGUuanNvbmBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ3NuYWtlMWRvd24nLFxuICAgICAgICAgICAgYCR7Q01XTi5NRURJQS5TUFJJVEV9c2lzdGVyLmRvd24uaG9sZS5wbmc/dj0zYCxcbiAgICAgICAgICAgIGAke0NNV04uTUVESUEuU1BSSVRFfXNpc3Rlci5kb3duLmhvbGUuanNvbmBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ3NuYWtlMnVwJyxcbiAgICAgICAgICAgIGAke0NNV04uTUVESUEuU1BSSVRFfWJyb3RoZXIubGVhdmUuaG9sZS5wbmdgLFxuICAgICAgICAgICAgYCR7Q01XTi5NRURJQS5TUFJJVEV9YnJvdGhlci5sZWF2ZS5ob2xlLmpzb25gXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdzbmFrZTJkb3duJyxcbiAgICAgICAgICAgIGAke0NNV04uTUVESUEuU1BSSVRFfWJyb3RoZXIuZG93bi5ob2xlLnBuZz92PTNgLFxuICAgICAgICAgICAgYCR7Q01XTi5NRURJQS5TUFJJVEV9YnJvdGhlci5kb3duLmhvbGUuanNvbmBcbiAgICAgICAgXSxcbiAgICBdKTtcblxuICAgIGxvYWRBc3NldHMuY2FsbCh0aGlzLCAnYXVkaW8nLCBbXG4gICAgICAgIFsnYnVzaCcsIGAke0NNV04uTUVESUEuRUZGRUNUfUJ1bXBPckxhbmRPbkJ1c2gubXAzYF0sXG4gICAgICAgIFsnc3R1bXAnLCBgJHtDTVdOLk1FRElBLkVGRkVDVH1CdW1wVHJlZVN0dW1wLm1wM2BdLFxuICAgICAgICBbJ3RydWNrJywgYCR7Q01XTi5NRURJQS5FRkZFQ1R9RHVtcFRydWNrWm9vbS5tcDNgXSxcbiAgICAgICAgWydob2xlJywgYCR7Q01XTi5NRURJQS5FRkZFQ1R9RmFsbF9Jbl9Ib2xlLm1wM2BdLFxuICAgICAgICBbJ2xvZycsIGAke0NNV04uTUVESUEuRUZGRUNUfWdvSW5Mb2cubXAzYF0sXG4gICAgICAgIFsnanVtcCcsIGAke0NNV04uTUVESUEuRUZGRUNUfUp1bXAubXAzYF0sXG4gICAgICAgIFsnd2F0ZXInLCBgJHtDTVdOLk1FRElBLkVGRkVDVH1MYW5kSW5XYXRlci5tcDNgXSxcbiAgICAgICAgWydoZWFydCcsIGAke0NNV04uTUVESUEuRUZGRUNUfUxpZmVIZWFydENhcHR1cmUubXAzYF0sXG4gICAgICAgIFsnbGlnaHRlbmluZycsIGAke0NNV04uTUVESUEuRUZGRUNUfUxpZ2h0aW5nQ2FwdHVyZS5tcDNgXSxcbiAgICAgICAgWydiYWcnLCBgJHtDTVdOLk1FRElBLkVGRkVDVH1QaWNrVXBUcmFzaEJhZy5tcDNgXSxcbiAgICAgICAgLy8gdGhlIGVtcHR5IHNvdW5kIGlzIG5vdCBjdXJyZW50bHkgdXNlZCBhbnl3aGVyZVxuICAgICAgICAvLyBbJ2VtcHR5JywgYCR7Q01XTi5NRURJQS5FRkZFQ1R9TWlzc1RyYXNoQmFnLm1wM2BdLFxuICAgICAgICBbJ3JhaW5ib3dSZWN5Y2xlJywgYCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVjeWNsZUNvbG9ycy5tcDNgXSxcbiAgICAgICAgWydyZWN5Y2xlJywgYCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVjeWNsZUdyZWVuLm1wM2BdLFxuICAgIF0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvcHJlbG9hZC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmbiA9ICdpbWFnZScsIG9wdHNBcnJheSkge1xuICAgIGlmIChmbiA9PT0gJ2F1ZGlvJyAmJiAhdGhpcy5hdWRpbykgdGhpcy5hdWRpbyA9IHt9O1xuICAgIHRoaXMuZ2FtZS5sb2FkLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgXy5lYWNoKG9wdHNBcnJheSwgb3B0cyA9PiB7XG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkW2ZuXSguLi5vcHRzKTtcbiAgICAgICAgaWYgKGZuID09PSAnYXVkaW8nKSB0aGlzLmF1ZGlvW29wdHNbMF1dID0gdHJ1ZTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9waGFzZXIvbWV0aG9kcy9sb2FkX2Fzc2V0cy8wLjEuanMiLCJpbXBvcnQgc2V0R2FtZVN0YWdlIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9zZXRfZ2FtZV9zdGFnZS8wLjEnO1xuLy9pbXBvcnQgcmFuZG9taXplTG9jYXRpb25zIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9yYW5kb21pemVfbG9jYXRpb25zLzAuMSc7XG5pbXBvcnQgYWRkUGxheWVyIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9hZGRfcGxheWVyLzAuMSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSB7fTtcblxuICAgIHNldEdhbWVTdGFnZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgd2lkdGg6IDQwMDAsXG4gICAgICAgIGhlaWdodDogNzQwLFxuICAgICAgICB0b3A6IC0yMDAsXG4gICAgfSk7XG5cbiAgICB0aGlzLmN1cnNvcnMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgdGhpcy5oZWxwZXJzLm1ha2VCYWNrZ3JvdW5kLmNhbGwodGhpcyk7XG4gICAgdGhpcy5oZWxwZXJzLm1ha2VHcm91bmQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmhlbHBlcnMubWFrZURvb3IuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmhlbHBlcnMubWFrZVBsYXRmb3Jtcy5jYWxsKHRoaXMpO1xuXG4gICAgYWRkUGxheWVyLmNhbGwodGhpcywge1xuICAgICAgICBsZWZ0OiAzMixcbiAgICAgICAgdG9wOiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gNDUwLFxuICAgICAgICBpbWFnZTogdGhpcy5vcHRzLnBsYXllckltYWdlLFxuICAgICAgICBib3VuY2VZOiB0aGlzLm9wdHMuYm91bmNlWSxcbiAgICAgICAgZ3Jhdml0eVk6IHRoaXMub3B0cy5ncmF2aXR5WSxcbiAgICAgICAgYm9keTogdGhpcy5vcHRzLnBsYXllckJvZHksXG4gICAgICAgIHJpZ2h0RnJhbWVzOiB0aGlzLm9wdHMucmlnaHRGcmFtZXMsXG4gICAgICAgIGxlZnRGcmFtZXM6IHRoaXMub3B0cy5sZWZ0RnJhbWVzLFxuICAgICAgICBzY2FsZTogdGhpcy5vcHRzLnBsYXllclNjYWxlLFxuICAgICAgICBhbmNob3I6IHRoaXMub3B0cy5wbGF5ZXJBbmNob3IsXG4gICAgfSk7XG5cbiAgICB0aGlzLmhlbHBlcnMubWFrZUxvZ3MuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmhlbHBlcnMubWFrZUl0ZW1zLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLmRhdGEgPSBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWxzOiB7XG4gICAgICAgICAgICBbdGhpcy5vcHRzLmxldmVsXToge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydWNrczogMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHRoaXMuZGF0YSk7XG5cbiAgICB0aGlzLmF1ZGlvID0gXy5yZWR1Y2UodGhpcy5hdWRpbywgKGEsIHYsIGspID0+IHtcbiAgICAgICAgYVtrXSA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oayk7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH0sIHt9KTtcblxuICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvY3JlYXRlLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdHMgPSB7fSkge1xuICAgIG9wdHMgPSBfLmRlZmF1bHRzKG9wdHMsIHtcbiAgICAgICAgcGh5c2ljczogUGhhc2VyLlBoeXNpY3MuQVJDQURFLFxuICAgICAgICBkaXNhYmxlVmlzaWJpbGl0eUNoYW5nZTogdHJ1ZSxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB3aWR0aDogMjAwMCxcbiAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgfSk7XG5cbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShvcHRzLnBoeXNpY3MpO1xuICAgIHRoaXMuZ2FtZS5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IG9wdHMuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2U7XG4gICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhvcHRzLmxlZnQsIG9wdHMudG9wLCBvcHRzLndpZHRoLCBvcHRzLmhlaWdodCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvc2V0X2dhbWVfc3RhZ2UvMC4xLmpzIiwiaW1wb3J0IHNjYWxlSXRlbSBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvc2NhbGVfaXRlbS8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0cyA9IHt9KSB7XG4gICAgb3B0cyA9IF8uZGVmYXVsdHMob3B0cywge1xuICAgICAgICBsZWZ0OiAzMixcbiAgICAgICAgdG9wOiA1MDAsXG4gICAgICAgIGltYWdlOiAnZHVkZScsXG4gICAgICAgIGJvdW5jZVg6IDAsXG4gICAgICAgIGJvdW5jZVk6IDAuMixcbiAgICAgICAgZ3Jhdml0eVg6IDAsXG4gICAgICAgIGdyYXZpdHlZOiAzMDAsXG4gICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogdHJ1ZSxcbiAgICAgICAgY2hlY2tDb2xsaXNpb25VcDogdHJ1ZSxcbiAgICAgICAgY2hlY2tDb2xsaXNpb25Eb3duOiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvblJpZ2h0OiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvbkxlZnQ6IHRydWUsXG4gICAgICAgIGxlZnRGcmFtZXM6IFswLCAxLCAyLCAzXSxcbiAgICAgICAgbGVmdEZyYW1lUmF0ZTogMTAsXG4gICAgICAgIGxlZnRMb29wOiB0cnVlLFxuICAgICAgICByaWdodEZyYW1lczogWzUsIDYsIDcsIDhdLFxuICAgICAgICByaWdodEZyYW1lUmF0ZTogMTAsXG4gICAgICAgIHJpZ2h0TG9vcDogdHJ1ZSxcbiAgICAgICAgc2NhbGU6IFsxLCAxXSxcbiAgICAgICAgYW5jaG9yOiBbLjUsIC41XSxcbiAgICB9KTtcblxuICAgIC8vIFRoZSBwbGF5ZXIgYW5kIGl0cyBzZXR0aW5nc1xuICAgIHRoaXMucGxheWVyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUob3B0cy5sZWZ0LCBvcHRzLnRvcCwgb3B0cy5pbWFnZSk7XG5cbiAgICAvLyAgV2UgbmVlZCB0byBlbmFibGUgcGh5c2ljcyBvbiB0aGUgcGxheWVyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLnBsYXllcik7XG5cbiAgICAvLyAgUGxheWVyIHBoeXNpY3MgcHJvcGVydGllcy4gR2l2ZSB0aGUgbGl0dGxlIGd1eSBhIHNsaWdodCBib3VuY2UuXG4gICAgdGhpcy5wbGF5ZXIuYW5jaG9yLnNldFRvKC4uLm9wdHMuYW5jaG9yKTtcbiAgICBzY2FsZUl0ZW0odGhpcy5wbGF5ZXIsIG9wdHMpO1xuICAgIHRoaXMucGxheWVyLmJvZHkuYm91bmNlLnggPSBvcHRzLmJvdW5jZVg7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5ib3VuY2UueSA9IG9wdHMuYm91bmNlWTtcbiAgICB0aGlzLnBsYXllci5ib2R5LmdyYXZpdHkueCA9IG9wdHMuZ3Jhdml0eVg7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5ncmF2aXR5LnkgPSBvcHRzLmdyYXZpdHlZO1xuICAgIHRoaXMucGxheWVyLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gb3B0cy5jb2xsaWRlV29ybGRCb3VuZHM7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5jaGVja0NvbGxpc2lvbi51cCA9IG9wdHMuY2hlY2tDb2xsaXNpb25VcDtcbiAgICB0aGlzLnBsYXllci5ib2R5LmNoZWNrQ29sbGlzaW9uLmRvd24gPSBvcHRzLmNoZWNrQ29sbGlzaW9uRG93bjtcbiAgICB0aGlzLnBsYXllci5ib2R5LmNoZWNrQ29sbGlzaW9uLnJpZ2h0ID0gb3B0cy5jaGVja0NvbGxpc2lvblJpZ2h0O1xuICAgIHRoaXMucGxheWVyLmJvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCA9IG9wdHMuY2hlY2tDb2xsaXNpb25MZWZ0O1xuXG4gICAgLy8gIE91ciB0d28gYW5pbWF0aW9ucywgd2Fsa2luZyBsZWZ0IGFuZCByaWdodC5cbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbGVmdCcsIG9wdHMubGVmdEZyYW1lcywgb3B0cy5sZWZ0RnJhbWVSYXRlLCBvcHRzLmxlZnRMb29wKTtcbiAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgncmlnaHQnLCBvcHRzLnJpZ2h0RnJhbWVzLCBvcHRzLnJpZ2h0RnJhbWVSYXRlLCBvcHRzLnJpZ2h0TG9vcCk7XG4gICAgd2luZG93LnBsYXllciA9IHRoaXMucGxheWVyO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9wbGF5ZXIvMC4xLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGl0ZW0sIG9wdHMgPSB7fSkge1xuICAgIG9wdHMgPSBfLmRlZmF1bHRzKG9wdHMsIHtcbiAgICAgICAgc2NhbGU6IFsxLCAxXSxcbiAgICB9KTtcblxuICAgIGl0ZW0uc2NhbGUuc2V0VG8oLi4ub3B0cy5zY2FsZSk7XG5cbiAgICBpZiAob3B0cy5ib2R5KSB7XG4gICAgICAgIC8vIGRlZmVyIGhlcmUgdG8gcHJldmVudCB0aGlzLnBsYXllci5zY2FsZSBmcm9tIG92ZXJyaWRpbmcgYm9keSBzaXplXG4gICAgICAgIC8vIHdlIG1pZ2h0IHdhbnQgdG8gZmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhpc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYm9keS53aWR0aCA9IG9wdHMuYm9keVswXSAqIG9wdHMuc2NhbGVbMF07XG4gICAgICAgICAgICBpdGVtLmJvZHkuaGVpZ2h0ID0gb3B0cy5ib2R5WzFdICogb3B0cy5zY2FsZVsxXTtcbiAgICAgICAgICAgIGl0ZW0uYm9keS5vZmZzZXQueCA9IG9wdHMuYm9keVsyXTtcbiAgICAgICAgICAgIGl0ZW0uYm9keS5vZmZzZXQueSA9IG9wdHMuYm9keVszXTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL3NjYWxlX2l0ZW0vMC4xLmpzIiwiaW1wb3J0IGFkZFJlc3BvbnNlcyBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX3Jlc3BvbnNlcy8wLjEnO1xuaW1wb3J0IG1vdmVQbGF5ZXIgZnJvbSAnc2hhcmVkL3BoYXNlci9tZXRob2RzL21vdmVfcGxheWVyLzAuMSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBsYXllci5jYW5KdW1wID0gdHJ1ZTtcblxuICAgIGFkZFJlc3BvbnNlcy5jYWxsKHRoaXMsICdjb2xsaWRlJywgW1xuICAgIFt0aGlzLnBsYXllciwgdGhpcy5ncm91bmQsIHRoaXMuaGVscGVycy5oaXRHcm91bmRdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy53YXRlciwgdGhpcy5oZWxwZXJzLmhpdFdhdGVyXSxcbiAgICBbdGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm1zLCB0aGlzLmhlbHBlcnMuaGl0R3JvdW5kXSxcbiAgICBbdGhpcy5wbGF5ZXIsIHRoaXMuYnVzaGVzLCB0aGlzLmhlbHBlcnMuaGl0QnVzaF0sXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLm9ic3RhY2xlcywgdGhpcy5oZWxwZXJzLmhpdE9ic3RhY2xlXSxcbiAgICBbdGhpcy5wbGF5ZXIsIHRoaXMubG9ncywgdGhpcy5oZWxwZXJzLmhpdEdyb3VuZF0sXG4gICAgW3RoaXMuYnVzaGVzLCB0aGlzLmdyb3VuZCwgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIFt0aGlzLmJ1c2hlcywgdGhpcy5wbGF0Zm9ybXMsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy50cmVlcywgdGhpcy5ncm91bmQsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy50cmVlcywgdGhpcy5wbGF0Zm9ybXMsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy5zbmFrZXMsIHRoaXMuZ3JvdW5kLCB0aGlzLmhlbHBlcnMuc3RheV0sXG4gICAgW3RoaXMuc25ha2VzLCB0aGlzLnBsYXRmb3JtcywgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIFt0aGlzLnNuYWtlcywgdGhpcy53YXRlciwgdGhpcy5oZWxwZXJzLnR1cm5Bcm91bmRdLFxuICAgIFt0aGlzLmhvbGVzLCB0aGlzLmdyb3VuZCwgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIFt0aGlzLmJhZ3MsIHRoaXMuZ3JvdW5kLCB0aGlzLmhlbHBlcnMuc3RheV0sXG4gICAgW3RoaXMuYmFncywgdGhpcy5wbGF0Zm9ybXMsIHRoaXMuaGVscGVycy5zdGF5XSxcbiAgICBbdGhpcy5vYnN0YWNsZXMsIHRoaXMuZ3JvdW5kLCB0aGlzLmhlbHBlcnMuc3RheV0sXG4gICAgW3RoaXMub2JzdGFjbGVzLCB0aGlzLnBsYXRmb3JtcywgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIFt0aGlzLmRvb3JzLCB0aGlzLmdyb3VuZCwgdGhpcy5oZWxwZXJzLnN0YXldLFxuICAgIF0pO1xuXG4gICAgYWRkUmVzcG9uc2VzLmNhbGwodGhpcywgJ292ZXJsYXAnLCBbXG4gICAgW3RoaXMucGxheWVyLCB0aGlzLmxvZ3MsIHRoaXMuaGVscGVycy5pbkxvZ10sXG4gICAgXSk7XG5cbiAgICBpZiAoIXRoaXMuZGF0YS5sZXZlbHNbdGhpcy5vcHRzLmxldmVsXS5jb21wbGV0ZSkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuYm9vc3QpIHtcbiAgICAgICAgICAgIG1vdmVQbGF5ZXIuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdXBTcGVlZDogdGhpcy5vcHRzLmJvb3N0VXBTcGVlZCxcbiAgICAgICAgICAgICAgICBkb3duU3BlZWQ6IHRoaXMub3B0cy5ib29zdERvd25TcGVlZCxcbiAgICAgICAgICAgICAgICBsZWZ0U3BlZWQ6IHRoaXMub3B0cy5ib29zdExlZnRTcGVlZCxcbiAgICAgICAgICAgICAgICByaWdodFNwZWVkOiB0aGlzLm9wdHMuYm9vc3RSaWdodFNwZWVkLFxuICAgICAgICAgICAgICAgIHN0b3BGcmFtZTogdGhpcy5vcHRzLmJvb3N0UGxheWVyU3RvcEZyYW1lLFxuICAgICAgICAgICAgICAgIGp1bXBTb3VuZDogdGhpcy5hdWRpby5qdW1wLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb3ZlUGxheWVyLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgIHVwU3BlZWQ6IHRoaXMub3B0cy51cFNwZWVkLFxuICAgICAgICAgICAgICAgIGRvd25TcGVlZDogdGhpcy5vcHRzLmRvd25TcGVlZCxcbiAgICAgICAgICAgICAgICBsZWZ0U3BlZWQ6IHRoaXMub3B0cy5sZWZ0U3BlZWQsXG4gICAgICAgICAgICAgICAgcmlnaHRTcGVlZDogdGhpcy5vcHRzLnJpZ2h0U3BlZWQsXG4gICAgICAgICAgICAgICAgc3RvcEZyYW1lOiB0aGlzLm9wdHMucGxheWVyU3RvcEZyYW1lLFxuICAgICAgICAgICAgICAgIGp1bXBTb3VuZDogdGhpcy5hdWRpby5qdW1wLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5sZXZlbHNbdGhpcy5vcHRzLmxldmVsXS5kb29yT3Blbikge1xuICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAxNTA7XG4gICAgICAgIHRoaXMucGxheWVyLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgncmlnaHQnKTtcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLnBsYXllcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udHJvbGxlci5wYXVzZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSB7IHBhdXNlOiB0cnVlIH07XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhZGRSZXNwb25zZXMuY2FsbCh0aGlzLCAnb3ZlcmxhcCcsIFtcbiAgICBbdGhpcy5wbGF5ZXIsIHRoaXMuYmFncywgdGhpcy5oZWxwZXJzLmNvbGxlY3RCYWdzXSxcbiAgICBbdGhpcy5wbGF5ZXIsIHRoaXMuaGVhcnRzLCB0aGlzLmhlbHBlcnMuY29sbGVjdEhlYXJ0XSxcbiAgICBbdGhpcy5wbGF5ZXIsIHRoaXMucmVjeWNsZXMsIHRoaXMuaGVscGVycy5jb2xsZWN0UmVjeWNsaW5nXSxcbiAgICBbdGhpcy5wbGF5ZXIsIHRoaXMucmFpbmJvd1JlY3ljbGVzLCB0aGlzLmhlbHBlcnMuY29sbGVjdFJhaW5ib3dSZWN5Y2xpbmddLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy50cnVja3MsIHRoaXMuaGVscGVycy5sb2FkVHJ1Y2tdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5kb29ycywgdGhpcy5oZWxwZXJzLmV4aXRdLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5saWdodGVuaW5nLCB0aGlzLmhlbHBlcnMuY29sbGVjdExpZ2h0ZW5pbmddLFxuICAgIFt0aGlzLnBsYXllciwgdGhpcy5zbmFrZXMsIHRoaXMuaGVscGVycy5oaXRFbmVteV0sXG4gICAgW3RoaXMuc25ha2VzLCB0aGlzLmhvbGVzLCB0aGlzLmhlbHBlcnMuYWN0aXZhdGVTbmFrZV0sXG4gICAgXSk7XG5cbiAgICB0aGlzLmdhbWUuY2FtZXJhLnggPVxuICAgICAgICBNYXRoLm1pbihNYXRoLm1heCh0aGlzLnBsYXllci5jZW50ZXJYIC0gNDAwLCAwKSwgdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gODAwKTtcblxuICAgIHRoaXMuY2xvdWRzLmNoaWxkcmVuWzBdLnBvc2l0aW9uLnggPSAtLjI1ICogdGhpcy5wbGF5ZXIuY2VudGVyWDtcbiAgICB0aGlzLmNsb3Vkcy5jaGlsZHJlblsxXS5wb3NpdGlvbi54ID0gMjk3NS41IC0gLjI1ICogdGhpcy5wbGF5ZXIuY2VudGVyWDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL3VwZGF0ZS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmbiA9ICdjb2xsaWRlJywgb3B0c0FycmF5KSB7XG4gICAgXy5lYWNoKG9wdHNBcnJheSwgb3B0cyA9PiB7XG4gICAgICAgIG9wdHMgPSBfLmRlZmF1bHRzKG9wdHMsIFtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLFxuICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybXMsXG4gICAgICAgICAgICBfLm5vb3AsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgXSk7XG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZVtmbl0oLi4ub3B0cyk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvYWRkX3Jlc3BvbnNlcy8wLjEuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0cykge1xuICAgIG9wdHMgPSBfLmRlZmF1bHRzKG9wdHMsIHtcbiAgICAgICAgdXBTcGVlZDogLTM1MCxcbiAgICAgICAgZG93blNwZWVkOiA1MDAsXG4gICAgICAgIGxlZnRTcGVlZDogLTE1MCxcbiAgICAgICAgcmlnaHRTcGVlZDogMTUwLFxuICAgICAgICBzdG9wRnJhbWU6IDQsXG4gICAgfSk7XG5cbiAgICAvLyAgUmVzZXQgdGhlIHBsYXllcnMgdmVsb2NpdHkgKG1vdmVtZW50KVxuICAgIGlmICh0aGlzLmlzSGl0KSByZXR1cm47XG4gICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMDtcblxuICAgIGlmICh0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd24gfHwgdGhpcy5jb250cm9sbGVyLmxlZnQpIHtcbiAgICAgICAgLy8gIE1vdmUgdG8gdGhlIGxlZnRcbiAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gb3B0cy5sZWZ0U3BlZWQ7XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbGVmdCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93biB8fCB0aGlzLmNvbnRyb2xsZXIucmlnaHQpIHtcbiAgICAgICAgLy8gIE1vdmUgdG8gdGhlIHJpZ2h0XG4gICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IG9wdHMucmlnaHRTcGVlZDtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICBTdGFuZCBzdGlsbFxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnN0b3AoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuZnJhbWUgPSBvcHRzLnN0b3BGcmFtZTtcbiAgICB9XG5cbiAgICAvLyAgQWxsb3cgdGhlIHBsYXllciB0byBqdW1wIGlmIHRoZXkgYXJlIHRvdWNoaW5nIHRoZSBncm91bmQuXG4gICAgaWYgKHRoaXMucGxheWVyLmNhbkp1bXAgJiZcbiAgICAgICAgKHRoaXMuY3Vyc29ycy51cC5pc0Rvd24gfHwgdGhpcy5jb250cm9sbGVyLnVwKSAmJlxuICAgICAgICB0aGlzLnBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gb3B0cy51cFNwZWVkO1xuICAgICAgICBfLmludm9rZShvcHRzLmp1bXBTb3VuZCwgJ3BsYXknKTtcbiAgICB9XG5cbiAgICAvLyAgQWxsb3cgdGhlIHBsYXllciB0byBmYWxsIGZhc3QgaWYgdGhleSBhcmUgbm90IHRvdWNoaW5nIHRoZSBncm91bmQuXG4gICAgaWYgKCh0aGlzLmN1cnNvcnMuZG93bi5pc0Rvd24gfHwgdGhpcy5jb250cm9sbGVyLmRvd24pICYmICF0aGlzLnBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gb3B0cy5kb3duU3BlZWQ7XG4gICAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvcGhhc2VyL21ldGhvZHMvbW92ZV9wbGF5ZXIvMC4xLmpzIiwiaW1wb3J0IHNjYWxlSXRlbSBmcm9tICdzaGFyZWQvcGhhc2VyL21ldGhvZHMvc2NhbGVfaXRlbS8wLjEnO1xuaW1wb3J0IGFkZEl0ZW1zIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9hZGRfaXRlbXMvMC4xJztcblxuaW1wb3J0IG1ha2VCYWNrZ3JvdW5kIGZyb20gJy4vbWFrZV9iYWNrZ3JvdW5kJztcbmltcG9ydCBtYWtlR3JvdW5kIGZyb20gJy4vbWFrZV9ncm91bmQnO1xuaW1wb3J0IG1ha2VQbGF0Zm9ybXMgZnJvbSAnLi9tYWtlX3BsYXRmb3Jtcyc7XG5pbXBvcnQgbWFrZUxvZ3MgZnJvbSAnLi9tYWtlX2xvZ3MnO1xuaW1wb3J0IG1ha2VJdGVtcyBmcm9tICcuL21ha2VfaXRlbXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbWl0RGF0YSgpIHtcbiAgICAgICAgLy8gIGVtaXQgZXZlbnQgd2l0aCBkYXRhIHRvIHNrb2FzaCBnYW1lXG4gICAgICAgIHRoaXMuZW1pdEV2ZW50KHtcbiAgICAgICAgICAgIHVwZGF0ZUdhbWVTdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IFsnZ2FtZSddLFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGhpdEdyb3VuZCgpIHtcbiAgICB9LFxuICAgIG9uSGl0QnVzaCgpIHtcbiAgICAgICAgdGhpcy5hdWRpby5idXNoLnBsYXkoKTtcbiAgICB9LFxuICAgIGhpdEVuZW15KHAsIGUpIHtcbiAgICAgICAgaWYgKCFlLmFjdGl2ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhlbHBlcnMuaGl0U29tZXRoaW5nLmNhbGwodGhpcywgcCk7XG4gICAgICAgIHRoaXMuYXVkaW8uaG9sZS5wbGF5KCk7XG4gICAgfSxcbiAgICBoaXRPYnN0YWNsZShwKSB7XG4gICAgICAgIHRoaXMuaGVscGVycy5oaXRTb21ldGhpbmcuY2FsbCh0aGlzLCBwKTtcbiAgICAgICAgdGhpcy5hdWRpby5zdHVtcC5wbGF5KCk7XG4gICAgfSxcbiAgICBoaXRXYXRlcihwKSB7XG4gICAgICAgIHRoaXMuaGVscGVycy5oaXRTb21ldGhpbmcuY2FsbCh0aGlzLCBwLCAxLCAxKTtcbiAgICAgICAgdGhpcy5hdWRpby53YXRlci5wbGF5KCk7XG4gICAgfSxcbiAgICBoaXRTb21ldGhpbmcocCwgaSA9IDEsIGQgPSAtMSkge1xuICAgICAgICBpZiAodGhpcy5pc0hpdCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgcC5ib2R5LnZlbG9jaXR5LnkgPSAtMSAqIHRoaXMub3B0cy5oaXRWZWxvY2l0eTtcblxuICAgICAgICBwLmJvZHkudmVsb2NpdHkueCA9IChwLmJvZHkudmVsb2NpdHkueCA9PT0gTWF0aC5hYnMocC5ib2R5LnZlbG9jaXR5LngpID9cbiAgICAgICAgICAgIGQgOiAtMSAqIGQpICogdGhpcy5vcHRzLmhpdFZlbG9jaXR5O1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0hpdCA9IGZhbHNlO1xuICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICB0aGlzLmRhdGEuaGl0cyArPSBpO1xuICAgICAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmhpdHMgPj0gdGhpcy5vcHRzLmhpdHNQZXJMaWZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmhpdHMgLT0gdGhpcy5vcHRzLmhpdHNQZXJMaWZlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5saXZlcy0tO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyNTApO1xuICAgIH0sXG4gICAgYWN0aXZhdGVTbmFrZShzbmFrZSwgaG9sZSkge1xuICAgICAgICB2YXIgY2xpbWI7XG4gICAgICAgIHZhciBzaG91bGRDbGltYlVwID0gIXNuYWtlLmFjdGl2ZSAmJiAhc25ha2UuY2xpbWJpbmc7XG4gICAgICAgIHZhciBzaG91bGRDbGltYkRvd24gPSAoXG4gICAgICAgICAgICBzbmFrZS5hY3RpdmUgJiZcbiAgICAgICAgICAgICFzbmFrZS5jbGltYmluZyAmJlxuICAgICAgICAgICAgc25ha2UuYm9keS52ZWxvY2l0eS54ID4gMCAmJlxuICAgICAgICAgICAgc25ha2UubGVmdCA8IGhvbGUubGVmdCAmJlxuICAgICAgICAgICAgc25ha2UubGVmdCA+IGhvbGUubGVmdCAtIDgwXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNob3VsZENsaW1iVXApIHtcbiAgICAgICAgICAgIHNuYWtlLmxlZnQgPSBob2xlLmxlZnQgLSAyNTtcbiAgICAgICAgICAgIHNuYWtlLmxvYWRUZXh0dXJlKHNuYWtlLm9yaWdpbmFsSW1hZ2UgKyAndXAnLCAwKTtcbiAgICAgICAgICAgIGNsaW1iID0gc25ha2UuYW5pbWF0aW9ucy5hZGQoJ2hvbGUnLCBbMCwgMSwgMiwgMywgNCwgNSwgNl0sIDEwLCBmYWxzZSk7XG4gICAgICAgICAgICBjbGltYi5vbkNvbXBsZXRlLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc25ha2UubG9hZFRleHR1cmUoc25ha2Uub3JpZ2luYWxJbWFnZSwgNSk7XG4gICAgICAgICAgICAgICAgc25ha2Uuc2NhbGUuc2V0VG8oLjMsIC4zKTtcbiAgICAgICAgICAgICAgICBzbmFrZS5sZWZ0ID0gc25ha2UubGVmdCAtIDI1O1xuICAgICAgICAgICAgICAgIHNuYWtlLnRvcCA9IHNuYWtlLnRvcCAtIDI1O1xuICAgICAgICAgICAgICAgIHNuYWtlLmFuaW1hdGlvbnMuYWRkKCdsZWZ0JywgWzUsIDQsIDMsIDIsIDEsIDBdLCAxMCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgc25ha2UuYW5pbWF0aW9ucy5hZGQoJ3JpZ2h0JywgWzYsIDcsIDgsIDksIDEwLCAxMV0sIDEwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzbmFrZS5hbmltYXRpb25zLnBsYXkoJ2xlZnQnKTtcbiAgICAgICAgICAgICAgICBzbmFrZS5ib2R5LnZlbG9jaXR5LnggPSAtMTAwO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzbmFrZS5jbGltYmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzbmFrZS53aWR0aCA9IDE0MDtcbiAgICAgICAgICAgIHNuYWtlLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICAgIHNuYWtlLmFuaW1hdGlvbnMucGxheSgnaG9sZScpO1xuICAgICAgICAgICAgc25ha2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNuYWtlLmNsaW1iaW5nID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChzaG91bGRDbGltYkRvd24pIHtcbiAgICAgICAgICAgIHNuYWtlLmxlZnQgPSBob2xlLmxlZnQgLSA3NTtcbiAgICAgICAgICAgIHNuYWtlLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgICAgICAgICBzbmFrZS5sb2FkVGV4dHVyZShzbmFrZS5vcmlnaW5hbEltYWdlICsgJ2Rvd24nLCAwKTtcbiAgICAgICAgICAgIHNuYWtlLmxlZnQgPSBzbmFrZS5sZWZ0ICsgMjU7XG4gICAgICAgICAgICBzbmFrZS50b3AgPSBzbmFrZS50b3AgKyAyNTtcbiAgICAgICAgICAgIGNsaW1iID0gc25ha2UuYW5pbWF0aW9ucy5hZGQoJ2hvbGUnLCBbMCwgMSwgMiwgMywgNCwgNSwgNl0sIDEwLCBmYWxzZSk7XG4gICAgICAgICAgICBjbGltYi5vbkNvbXBsZXRlLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc25ha2UubG9hZFRleHR1cmUobnVsbCwgMCk7XG4gICAgICAgICAgICAgICAgc25ha2Uuc2NhbGUuc2V0VG8oLjMsIC4zKTtcbiAgICAgICAgICAgICAgICBzbmFrZS5sZWZ0ID0gc25ha2UubGVmdCAtIDI1O1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzbmFrZS5jbGltYmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzbmFrZS53aWR0aCA9IDE0MDtcbiAgICAgICAgICAgIHNuYWtlLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICAgIHNuYWtlLmFuaW1hdGlvbnMucGxheSgnaG9sZScpO1xuICAgICAgICAgICAgc25ha2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzbmFrZS5jbGltYmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHR1cm5Bcm91bmQoZW5lbXkpIHtcbiAgICAgICAgaWYgKGVuZW15LmlzVHVybmluZykgcmV0dXJuO1xuICAgICAgICBlbmVteS5pc1R1cm5pbmcgPSB0cnVlO1xuICAgICAgICBlbmVteS5ib2R5LnZlbG9jaXR5LnggPSAtMSAqIGVuZW15LmJvZHkudmVsb2NpdHkueDtcbiAgICAgICAgZW5lbXkuYW5pbWF0aW9ucy5wbGF5KGVuZW15LmJvZHkudmVsb2NpdHkueCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbmVteS5pc1R1cm5pbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9LFxuICAgIGluTG9nKCkge1xuICAgICAgICBpZiAoIXRoaXMucGxheWVyLmNhbkp1bXApIHJldHVybjtcbiAgICAgICAgdGhpcy5wbGF5ZXIuY2FuSnVtcCA9IGZhbHNlO1xuICAgICAgICBzY2FsZUl0ZW0odGhpcy5wbGF5ZXIsIHtcbiAgICAgICAgICAgIHNjYWxlOiB0aGlzLm9wdHMucGxheWVyTG9nU2NhbGUsXG4gICAgICAgICAgICBib2R5OiB0aGlzLm9wdHMucGxheWVyQm9keSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXVkaW8ubG9nLnBsYXkoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmxvZ3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY2FuSnVtcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2NhbGVJdGVtKHRoaXMucGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiB0aGlzLm9wdHMucGxheWVyU2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMub3B0cy5wbGF5ZXJCb2R5LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgIH0sXG4gICAgY29sbGVjdFJlY3ljbGluZyhwbGF5ZXIsIHJlY3ljbHlpbmcpIHtcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgcmVjeWNseWluZyBmcm9tIHRoZSBzY3JlZW5cbiAgICAgICAgcmVjeWNseWluZy5raWxsKCk7XG4gICAgICAgIHRoaXMuYXVkaW8ucmVjeWNsZS5wbGF5KCk7XG4gICAgICAgIC8vICB1cGRhdGUgdGhlIGxpdmVzXG4gICAgICAgIHRoaXMuZGF0YS5zY29yZSArPSB0aGlzLm9wdHMucmVjeWNsaW5nU2NvcmU7XG4gICAgICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgY29sbGVjdFJhaW5ib3dSZWN5Y2xpbmcocGxheWVyLCByZWN5Y2x5aW5nKSB7XG4gICAgICAgIC8vIFJlbW92ZXMgdGhlIHJlY3ljbHlpbmcgZnJvbSB0aGUgc2NyZWVuXG4gICAgICAgIHJlY3ljbHlpbmcua2lsbCgpO1xuICAgICAgICB0aGlzLmF1ZGlvLnJhaW5ib3dSZWN5Y2xlLnBsYXkoKTtcbiAgICAgICAgLy8gIHVwZGF0ZSB0aGUgbGl2ZXNcbiAgICAgICAgdGhpcy5kYXRhLnNjb3JlICs9IHRoaXMub3B0cy5yYWluYm93UmVjeWNseWluZ1Njb3JlO1xuICAgICAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbiAgICB9LFxuICAgIGNvbGxlY3RIZWFydChwbGF5ZXIsIGhlYXJ0KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubGl2ZXMgPT09IHRoaXMub3B0cy5tYXhMaXZlcykgcmV0dXJuO1xuICAgICAgICAvLyBSZW1vdmVzIHRoZSBoZWFydCBmcm9tIHRoZSBzY3JlZW5cbiAgICAgICAgaGVhcnQua2lsbCgpO1xuICAgICAgICB0aGlzLmF1ZGlvLmhlYXJ0LnBsYXkoKTtcbiAgICAgICAgLy8gIHVwZGF0ZSB0aGUgbGl2ZXNcbiAgICAgICAgdGhpcy5kYXRhLmxpdmVzKys7XG4gICAgICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgY29sbGVjdEJhZ3MocGxheWVyLCBiYWcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5iYWdDb3VudCA9PT0gdGhpcy5vcHRzLm1heEJhZ3MpIHJldHVybjtcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgYmFnIGZyb20gdGhlIHNjcmVlblxuICAgICAgICBiYWcua2lsbCgpO1xuICAgICAgICB0aGlzLmF1ZGlvLmJhZy5wbGF5KCk7XG4gICAgICAgIC8vICB1cGRhdGUgdGhlIGJhZ0NvdW50XG4gICAgICAgIHRoaXMuZGF0YS5iYWdDb3VudCsrO1xuICAgICAgICB0aGlzLmhlbHBlcnMudXBkYXRlUGxheWVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgY29sbGVjdExpZ2h0ZW5pbmcocGxheWVyLCBsaWdodGVuaW5nKSB7XG4gICAgICAgIHBsYXllci5ib29zdCA9IChwbGF5ZXIuYm9vc3QgKyAxKSB8fCAxO1xuICAgICAgICBsaWdodGVuaW5nLmtpbGwoKTtcbiAgICAgICAgdGhpcy5hdWRpby5saWdodGVuaW5nLnBsYXkoKTtcbiAgICAgICAgdGhpcy5oZWxwZXJzLnVwZGF0ZVBsYXllci5jYWxsKHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHBsYXllci5ib29zdC0tO1xuICAgICAgICAgICAgdGhpcy5oZWxwZXJzLnVwZGF0ZVBsYXllci5jYWxsKHRoaXMpO1xuICAgICAgICB9LCB0aGlzLm9wdHMuYm9vc3RUaW1lKTtcbiAgICB9LFxuICAgIHVwZGF0ZVBsYXllcigpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmJvb3N0KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5sb2FkVGV4dHVyZSgnamV0JywgMyk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbGVmdCcsIHRoaXMub3B0cy5ib29zdExlZnRGcmFtZXMsXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLmJvb3N0TGVmdEZyYW1lUmF0ZSwgdGhpcy5vcHRzLmJvb3N0TGVmdExvb3ApO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3JpZ2h0JywgdGhpcy5vcHRzLmJvb3N0UmlnaHRGcmFtZXMsXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLmJvb3N0UmlnaHRGcmFtZVJhdGUsIHRoaXMub3B0cy5ib29zdFJpZ2h0TG9vcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmJhZ0NvdW50ID09PSB0aGlzLm9wdHMubWF4QmFncykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxvYWRUZXh0dXJlKCd0dXJ0bGU1JywgdGhpcy5wbGF5ZXIuZnJhbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuYmFnQ291bnQgPj0gdGhpcy5vcHRzLm1heEJhZ3MgLyAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubG9hZFRleHR1cmUoJ3R1cnRsZTMnLCB0aGlzLnBsYXllci5mcmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxvYWRUZXh0dXJlKCd0dXJ0bGUnLCB0aGlzLnBsYXllci5mcmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnbGVmdCcsIHRoaXMub3B0cy5sZWZ0RnJhbWVzLFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5sZWZ0RnJhbWVSYXRlLCB0aGlzLm9wdHMubGVmdExvb3ApO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3JpZ2h0JywgdGhpcy5vcHRzLnJpZ2h0RnJhbWVzLFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5yaWdodEZyYW1lUmF0ZSwgdGhpcy5vcHRzLnJpZ2h0TG9vcCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0YXkoYSkge1xuICAgICAgICBhLmJvZHkuZ3Jhdml0eS55ID0gMDtcbiAgICAgICAgYS5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgIH0sXG4gICAgbG9hZFRydWNrKHBsYXllciwgdHJ1Y2spIHtcbiAgICAgICAgaWYgKHRydWNrLmRyaXZpbmcgfHwgdGhpcy5kYXRhLmJhZ0NvdW50ICE9PSB0aGlzLm9wdHMubWF4QmFncykgcmV0dXJuO1xuICAgICAgICB0cnVjay5kcml2aW5nID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnRydWNrLnBsYXkoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgdHJ1Y2suYW5pbWF0aW9ucy5wbGF5KCdkcml2ZScpO1xuICAgICAgICB0aGlzLmRhdGEuYmFnQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmRhdGEubGV2ZWxzW3RoaXMub3B0cy5sZXZlbF0udHJ1Y2tzKys7XG4gICAgICAgIHRoaXMuaGVscGVycy51cGRhdGVQbGF5ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZXZlbHNbdGhpcy5vcHRzLmxldmVsXS50cnVja3MgPT09IHRoaXMub3B0cy5tYXhUcnVja3MpIHtcbiAgICAgICAgICAgIHRoaXMuZG9vcnMuY2hpbGRyZW5bMF0uYW5pbWF0aW9ucy5wbGF5KCdvcGVuJyk7XG4gICAgICAgICAgICB0aGlzLmRhdGEubGV2ZWxzW3RoaXMub3B0cy5sZXZlbF0uZG9vck9wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgbWFrZUJhY2tncm91bmQsXG4gICAgbWFrZUdyb3VuZCxcbiAgICBtYWtlUGxhdGZvcm1zLFxuICAgIG1ha2VMb2dzLFxuICAgIG1ha2VJdGVtcyxcbiAgICBtYWtlRG9vcigpIHtcbiAgICAgICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICBncm91cDogJ2Rvb3JzJ1xuICAgICAgICB9LCBbe1xuICAgICAgICAgICAgaW1hZ2U6ICdkb29yJyxcbiAgICAgICAgICAgIGdyYXZpdHlZOiAxMDAsXG4gICAgICAgICAgICBib2R5OiBbMjAwLCAyMDAsIDI1LCAyNV0sXG4gICAgICAgICAgICBzY2FsZTogWy41LCAuNV0sXG4gICAgICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgbGVmdDogdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gOTAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgIH1dKTtcblxuICAgICAgICB0aGlzLmRvb3JzLmNoaWxkcmVuWzBdLmFuaW1hdGlvbnMuYWRkKCdvcGVuJywgWzUsIDQsIDMsIDIsIDEsIDBdLCAxMCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmRvb3JzLmNoaWxkcmVuWzBdLmFuaW1hdGlvbnMuYWRkKCdjbG9zZScsIFswLCAxLCAyLCAzLCA0LCA1XSwgMTAsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5kb29ycy5jaGlsZHJlblswXS5hbmltYXRpb25zLnBsYXkoJ2Nsb3NlJyk7XG4gICAgfSxcbiAgICBleGl0KCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxldmVsc1t0aGlzLm9wdHMubGV2ZWxdLnRydWNrcyAhPT0gdGhpcy5vcHRzLm1heFRydWNrcykgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxldmVsc1t0aGlzLm9wdHMubGV2ZWxdLmNvbXBsZXRlKSByZXR1cm47XG4gICAgICAgIHRoaXMuZGF0YS5sZXZlbHNbdGhpcy5vcHRzLmxldmVsXS5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucGxheWVyLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGVscGVycy5lbWl0RGF0YS5jYWxsKHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9vcnMuY2hpbGRyZW5bMF0uYW5pbWF0aW9ucy5wbGF5KCdjbG9zZScpO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmxldmVsc1t0aGlzLm9wdHMubGV2ZWxdLmRvb3JPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhlbHBlcnMuZW1pdERhdGEuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgICAgIH0sIDI1MDApO1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9oZWxwZXJzLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGdyb3VwT3B0cyA9IHt9LCBvcHRzQXJyYXkgPSBbXSkge1xuICAgIGdyb3VwT3B0cy5kZWZhdWx0T3B0cyA9IF8uZGVmYXVsdHMoZ3JvdXBPcHRzLmRlZmF1bHRPcHRzLCB7XG4gICAgICAgIGFscGhhOiAxLFxuICAgICAgICBzY2FsZTogWzEsIDFdLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGltYWdlOiAnZ3JvdW5kJyxcbiAgICAgICAgaW1tb3ZhYmxlOiB0cnVlLFxuICAgICAgICBib3VuY2VYOiAxLFxuICAgICAgICBib3VuY2VZOiAxLFxuICAgICAgICBncmF2aXR5WDogMCxcbiAgICAgICAgZ3Jhdml0eVk6IDAsXG4gICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogdHJ1ZSxcbiAgICAgICAgY2hlY2tDb2xsaXNpb25VcDogdHJ1ZSxcbiAgICAgICAgY2hlY2tDb2xsaXNpb25Eb3duOiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvblJpZ2h0OiB0cnVlLFxuICAgICAgICBjaGVja0NvbGxpc2lvbkxlZnQ6IHRydWUsXG4gICAgICAgIGFuZ2xlOiAwLFxuICAgICAgICBhbmNob3I6IFswLCAwXSxcbiAgICB9KTtcblxuICAgIGdyb3VwT3B0cyA9IF8uZGVmYXVsdHMoZ3JvdXBPcHRzLCB7XG4gICAgICAgIGVuYWJsZUJvZHk6IHRydWUsXG4gICAgICAgIGdyb3VwOiAncGxhdGZvcm1zJ1xuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzW2dyb3VwT3B0cy5ncm91cF0pIHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBncm91cCB3ZSB3aWxsIGJlIGFkZGluZyB0aGUgaXRlbXMgdG9cbiAgICAgICAgdGhpc1tncm91cE9wdHMuZ3JvdXBdID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICAvLyBlbmFibGUgcGh5c2ljcyBmb3IgYW55IG9iamVjdCB0aGF0IGlzIGNyZWF0ZWQgaW4gdGhpcyBncm91cFxuICAgICAgICB0aGlzW2dyb3VwT3B0cy5ncm91cF0uZW5hYmxlQm9keSA9IGdyb3VwT3B0cy5lbmFibGVCb2R5O1xuICAgIH1cblxuICAgIF8uZWFjaChvcHRzQXJyYXksIG9wdGlvbnMgPT4ge1xuICAgICAgICB2YXIgb3B0cyA9IF8uZGVmYXVsdHMoe30sIG9wdGlvbnMsIGdyb3VwT3B0cy5kZWZhdWx0T3B0cyk7XG5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2dyb3VwT3B0cy5ncm91cF0uY3JlYXRlKG9wdHMubGVmdCwgb3B0cy50b3AsIG9wdHMuaW1hZ2UpO1xuXG4gICAgICAgIGl0ZW0ub3JpZ2luYWxJbWFnZSA9IG9wdHMuaW1hZ2U7XG4gICAgICAgIGl0ZW0uYWxwaGEgPSBvcHRzLmFscGhhO1xuICAgICAgICBpdGVtLnNjYWxlLnNldFRvKC4uLm9wdHMuc2NhbGUpO1xuICAgICAgICBpZiAob3B0cy5jcm9wKSB7XG4gICAgICAgICAgICBpdGVtLmNyb3AobmV3IFBoYXNlci5SZWN0YW5nbGUoLi4ub3B0cy5jcm9wKSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXBPcHRzLmVuYWJsZUJvZHkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmJvZHkud2lkdGggPSBvcHRzLmNyb3BbMl07XG4gICAgICAgICAgICAgICAgaXRlbS5ib2R5LmhlaWdodCA9IG9wdHMuY3JvcFszXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpdGVtLmFuZ2xlID0gb3B0cy5hbmdsZTtcbiAgICAgICAgaXRlbS5hbmNob3Iuc2V0VG8oLi4ub3B0cy5hbmNob3IpO1xuXG4gICAgICAgIGlmIChncm91cE9wdHMuZW5hYmxlQm9keSkge1xuICAgICAgICAgICAgaXRlbS5ib2R5LmltbW92YWJsZSA9IG9wdHMuaW1tb3ZhYmxlO1xuICAgICAgICAgICAgaXRlbS5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IG9wdHMuY29sbGlkZVdvcmxkQm91bmRzO1xuICAgICAgICAgICAgaXRlbS5ib2R5LmJvdW5jZS54ID0gb3B0cy5ib3VuY2VYO1xuICAgICAgICAgICAgaXRlbS5ib2R5LmJvdW5jZS55ID0gb3B0cy5ib3VuY2VZO1xuICAgICAgICAgICAgaXRlbS5ib2R5LmdyYXZpdHkueCA9IG9wdHMuZ3Jhdml0eVg7XG4gICAgICAgICAgICBpdGVtLmJvZHkuZ3Jhdml0eS55ID0gb3B0cy5ncmF2aXR5WTtcbiAgICAgICAgICAgIGl0ZW0uYm9keS5jaGVja0NvbGxpc2lvbi51cCA9IG9wdHMuY2hlY2tDb2xsaXNpb25VcDtcbiAgICAgICAgICAgIGl0ZW0uYm9keS5jaGVja0NvbGxpc2lvbi5kb3duID0gb3B0cy5jaGVja0NvbGxpc2lvbkRvd247XG4gICAgICAgICAgICBpdGVtLmJvZHkuY2hlY2tDb2xsaXNpb24ucmlnaHQgPSBvcHRzLmNoZWNrQ29sbGlzaW9uUmlnaHQ7XG4gICAgICAgICAgICBpdGVtLmJvZHkuY2hlY2tDb2xsaXNpb24ubGVmdCA9IG9wdHMuY2hlY2tDb2xsaXNpb25MZWZ0O1xuXG4gICAgICAgICAgICBpZiAob3B0cy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgLy8gZGVmZXIgaGVyZSB0byBwcmV2ZW50IGl0ZW0uc2NhbGUgZnJvbSBvdmVycmlkaW5nIGJvZHkgc2l6ZVxuICAgICAgICAgICAgICAgIC8vIHdlIG1pZ2h0IHdhbnQgdG8gZmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhpc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJvZHkud2lkdGggPSBvcHRzLmJvZHlbMF0gKiBvcHRzLnNjYWxlWzBdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJvZHkuaGVpZ2h0ID0gb3B0cy5ib2R5WzFdICogb3B0cy5zY2FsZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5ib2R5Lm9mZnNldC54ID0gb3B0cy5ib2R5WzJdICogb3B0cy5zY2FsZVswXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5ib2R5Lm9mZnNldC55ID0gb3B0cy5ib2R5WzNdICogb3B0cy5zY2FsZVsxXTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9pdGVtcy8wLjEuanMiLCJpbXBvcnQgYWRkSXRlbXMgZnJvbSAnc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9pdGVtcy8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgIGdyb3VwOiAnc2t5JywgZW5hYmxlQm9keTogZmFsc2UsIGRlZmF1bHRPcHRzOiB7XG4gICAgICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgaW1hZ2U6ICdza3knLFxuICAgICAgICAgICAgc2NhbGU6IFsuNSwgLjVdLFxuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICB7IGxlZnQ6IDAgfSxcbiAgICAgICAgeyBsZWZ0OiAyOTc1LjUgfVxuICAgIF0pO1xuXG4gICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgIGdyb3VwOiAnY2xvdWRzJywgZW5hYmxlQm9keTogZmFsc2UsIGRlZmF1bHRPcHRzOiB7XG4gICAgICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgaW1hZ2U6ICdjbG91ZHMnLFxuICAgICAgICAgICAgc2NhbGU6IFsuNSwgLjVdLFxuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICB7IGxlZnQ6IDAgfSxcbiAgICAgICAgeyBsZWZ0OiAyOTc1LjUgfVxuICAgIF0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9iYWNrZ3JvdW5kLmpzIiwiaW1wb3J0IGFkZEl0ZW1zIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9hZGRfaXRlbXMvMC4xJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIHZhciBsZWZ0ID0gMDtcbiAgICB2YXIgZ3JvdW5kT3B0cyA9IFtdO1xuICAgIHZhciB3YXRlck9wdHMgPSBbXTtcbiAgICB2YXIgcmFuZG9tID0gMjtcblxuICAgIGxldCBjcm9wcyA9IFtcbiAgICAgICAgWzIwLCAwLCAzODAsIDIxMF0sXG4gICAgICAgIFs1NDUsIDAsIDIwMCwgMjEwXSxcbiAgICAgICAgWzg2NSwgMCwgMzgwLCAyMTBdLFxuICAgICAgICBbMTQwNSwgMCwgMjAwLCAyMTBdLFxuICAgIF07XG5cbiAgICBsZXQgYm9kaWVzID0gW1xuICAgICAgICBbMzgwLCAxNDAsIDAsIDYwXSxcbiAgICAgICAgWzIwMCwgMTQwLCAwLCA2MF0sXG4gICAgICAgIFszODAsIDE0MCwgMCwgNjBdLFxuICAgICAgICBbMjAwLCAxNDAsIDAsIDYwXSxcbiAgICBdO1xuXG4gICAgd2hpbGUgKGxlZnQgPCB0aGlzLmdhbWUud29ybGQud2lkdGgpIHtcbiAgICAgICAgcmFuZG9tID0gXy5yYW5kb20ocmFuZG9tID4gMSB8fCBsZWZ0ID4gdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gNjAwID9cbiAgICAgICAgICAgIGNyb3BzLmxlbmd0aCAvIDIgLSAxIDogY3JvcHMubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCBjcm9wID0gY3JvcHNbcmFuZG9tXTtcbiAgICAgICAgbGV0IGJvZHkgPSBib2RpZXNbcmFuZG9tXTtcblxuICAgICAgICBpZiAocmFuZG9tIDwgMikge1xuICAgICAgICAgICAgZ3JvdW5kT3B0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgIGNyb3AsXG4gICAgICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2F0ZXJPcHRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAgICAgY3JvcCxcbiAgICAgICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZWZ0ICs9IGNyb3BbMl0gLSAzO1xuICAgIH1cblxuICAgIGxldCBkZWZhdWx0T3B0cyA9IHtcbiAgICAgICAgdG9wOiAzMzAsXG4gICAgICAgIGNvbGxpZGVXb3JsZEJvdW5kczogZmFsc2UsXG4gICAgICAgIGltYWdlOiAnZ3JvdW5kJyxcbiAgICB9O1xuXG4gICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgIGdyb3VwOiAnZ3JvdW5kJywgZGVmYXVsdE9wdHNcbiAgICB9LCBncm91bmRPcHRzKTtcblxuICAgIGFkZEl0ZW1zLmNhbGwodGhpcywge1xuICAgICAgICBncm91cDogJ3dhdGVyJywgZGVmYXVsdE9wdHNcbiAgICB9LCB3YXRlck9wdHMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9ncm91bmQuanMiLCJpbXBvcnQgYWRkSXRlbXMgZnJvbSAnc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9pdGVtcy8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY3JvcHMgPSBbXG4gICAgICAgIFsyMDAsIDAsIDI0MCwgOTZdLFxuICAgICAgICBbNzkwLCAwLCAzNTAsIDk2XSxcbiAgICAgICAgWzEyOTAsIDAsIDY0NSwgOTZdLFxuICAgIF07XG5cbiAgICBjb25zdCBib2RpZXMgPSBbXG4gICAgICAgIFsyMDAsIDI4LCAwLCA4MF0sXG4gICAgICAgIFszMTAsIDI4LCAwLCA4MF0sXG4gICAgICAgIFs2MDUsIDI4LCAwLCA4MF0sXG4gICAgXTtcblxuICAgIGNvbnN0IHBsYXRmb3JtUGFyYW1zID0gdGhpcy5vcHRzLnNldFBsYXRmb3JtcyB8fCBbXTtcblxuICAgIGNvbnN0IGxvY2F0aW9ucyA9IHRoaXMub3B0cy5sb2NhdGlvbnMgfHwgW107XG5cbiAgICB2YXIgcGxhdGZvcm1PcHRzID0gW107XG5cbiAgICBmdW5jdGlvbiBhZGRQbGF0Zm9ybShsb2NhdGlvbiwgaSkge1xuICAgICAgICBwbGF0Zm9ybU9wdHMucHVzaCh7XG4gICAgICAgICAgICBsZWZ0OiBsb2NhdGlvblswXSxcbiAgICAgICAgICAgIHRvcDogbG9jYXRpb25bMV0sXG4gICAgICAgICAgICBjcm9wOiBjcm9wc1tpXSxcbiAgICAgICAgICAgIGJvZHk6IGJvZGllc1tpXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgXy5lYWNoKHBsYXRmb3JtUGFyYW1zLCBwYXJhbXMgPT4ge1xuICAgICAgICBhZGRQbGF0Zm9ybSguLi5wYXJhbXMpO1xuICAgIH0pO1xuXG4gICAgXy5lYWNoKGxvY2F0aW9ucywgbG9jYXRpb24gPT4ge1xuICAgICAgICBhZGRQbGF0Zm9ybShsb2NhdGlvbiwgXy5yYW5kb20oY3JvcHMubGVuZ3RoIC0gMSkpO1xuICAgIH0pO1xuXG4gICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgIGdyb3VwOiAncGxhdGZvcm1zJyxcbiAgICAgICAgZGVmYXVsdE9wdHM6IHtcbiAgICAgICAgICAgIHRvcDogMzAwLFxuICAgICAgICAgICAgY29sbGlkZVdvcmxkQm91bmRzOiBmYWxzZSxcbiAgICAgICAgICAgIGltYWdlOiAncGxhdGZvcm1zJyxcbiAgICAgICAgICAgIHNjYWxlOiBbLjUsIC41XSxcbiAgICAgICAgICAgIGNoZWNrQ29sbGlzaW9uRG93bjogZmFsc2UsXG4gICAgICAgICAgICBjaGVja0NvbGxpc2lvblJpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgIGNoZWNrQ29sbGlzaW9uTGVmdDogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9LCBwbGF0Zm9ybU9wdHMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9wbGF0Zm9ybXMuanMiLCJpbXBvcnQgYWRkSXRlbXMgZnJvbSAnc2hhcmVkL3BoYXNlci9tZXRob2RzL2FkZF9pdGVtcy8wLjEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY3JvcHMgPSBbXG4gICAgICAgIFsxMDAsIDAsIDIyMCwgMTAwXSxcbiAgICAgICAgWzQ2MCwgMCwgMzUwLCAxMDBdLFxuICAgICAgICBbODMwLCAwLCA0MTUsIDEwMF0sXG4gICAgXTtcblxuICAgIGNvbnN0IGJvZGllcyA9IFtcbiAgICAgICAgWzIyMCwgMTAwLCAwLCAwXSxcbiAgICAgICAgWzM1MCwgMTAwLCAwLCAwXSxcbiAgICAgICAgWzQxNSwgMTAwLCAwLCAwXSxcbiAgICBdO1xuXG4gICAgY29uc3Qgb2Zmc2V0cyA9IHtcbiAgICAgICAgcGxhdGZvcm1zOiAwLFxuICAgICAgICBncm91bmQ6IDQwXG4gICAgfTtcblxuICAgIF8uZWFjaChvZmZzZXRzLCAob2Zmc2V0LCBsb2NhdGlvbikgPT4ge1xuICAgICAgICBfLmVhY2godGhpc1tsb2NhdGlvbl0uY2hpbGRyZW4sIHBsYXRmb3JtID0+IHtcbiAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgIGlmIChwbGF0Zm9ybS5sZWZ0IDwgNDAwIHx8IHBsYXRmb3JtLmxlZnQgPiB0aGlzLmdhbWUud29ybGQud2lkdGggLSA0MDApIHJldHVybjtcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5vcHRzW2xvY2F0aW9uICsgJ0xvZ0NoYW5jZSddKSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0uaGFzTG9nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgIChwbGF0Zm9ybS53aWR0aCA+IDMwMCA/IDMgOiBwbGF0Zm9ybS53aWR0aCA+IDE1MCA/IDIgOiAxKSk7XG4gICAgICAgICAgICAgICAgYWRkSXRlbXMuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiAnbG9ncycsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogJ2xvZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFsuNSwgLjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGE6IC44LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZVdvcmxkQm91bmRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQ29sbGlzaW9uUmlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb2xsaXNpb25MZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIFt7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogcGxhdGZvcm0udG9wICsgb2Zmc2V0IC0gMzUsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHBsYXRmb3JtLmxlZnQsXG4gICAgICAgICAgICAgICAgICAgIGNyb3A6IGNyb3BzW01hdGguZmxvb3IoaW5kZXgpXSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9kaWVzW2luZGV4XSxcbiAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvbWFrZV9sb2dzLmpzIiwiaW1wb3J0IGFkZEl0ZW1zIGZyb20gJ3NoYXJlZC9waGFzZXIvbWV0aG9kcy9hZGRfaXRlbXMvMC4xJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9wcyA9IHRoaXMub3B0cy5pdGVtUHJvcHM7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5vcHRzLmdyb3VwcztcblxuICAgIHZhciB0cnVja051bWJlciA9IDE7XG4gICAgdmFyIHRydWNrVG90YWwgPSB0aGlzLm9wdHMubWF4VHJ1Y2tzO1xuXG4gICAgdmFyIGdldE9iamVjdHMgPSBmdW5jdGlvbiAob2JqZWN0cyA9IFtdLCBhbW91bnRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdHMuY29uY2F0KF8uc2h1ZmZsZShfLnJlZHVjZShhbW91bnRzLCAoYSwgdiwgaykgPT5cbiAgICAgICAgICAgIGEuY29uY2F0KF8udGltZXModiB8fCAwLCAoKSA9PiBrKSksIFtdKSkpO1xuICAgIH07XG5cbiAgICB2YXIgb2JqZWN0cyA9IGdldE9iamVjdHMoW10sIHRoaXMub3B0cy5wbGF0Zm9ybUl0ZW1BbW91bnRzKTtcblxuICAgIHZhciBsb2NhdGlvbnMgPSBfLmRlZmF1bHRzKF8ucmVkdWNlKHRoaXMub3B0cy5wbGF0Zm9ybUl0ZW1BbW91bnRzLCAoYSwgdiwgaykgPT4ge1xuICAgICAgICBhW2tdID0gW107XG4gICAgICAgIHJldHVybiBhO1xuICAgIH0sIHt9KSwgXy5yZWR1Y2UodGhpcy5vcHRzLmdyb3VuZEl0ZW1BbW91bnRzLCAoYSwgdiwgaykgPT4ge1xuICAgICAgICBhW2tdID0gW107XG4gICAgICAgIHJldHVybiBhO1xuICAgIH0sIHt9KSk7XG5cbiAgICB2YXIgcGxhY2VPYmplY3QgPSBmdW5jdGlvbiAocGxhdGZvcm0sIHVwLCBvdmVyKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSBvYmplY3RzLnNoaWZ0KCk7XG4gICAgICAgIHN3aXRjaCAob2JqZWN0KSB7XG4gICAgICAgICAgICBjYXNlICd0cmVlMSc6XG4gICAgICAgICAgICAgICAgdXAgKz0gMTEwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndHJlZTInOlxuICAgICAgICAgICAgY2FzZSAndHJlZTMnOlxuICAgICAgICAgICAgY2FzZSAndHJlZTUnOlxuICAgICAgICAgICAgY2FzZSAndHJlZTcnOlxuICAgICAgICAgICAgICAgIHVwICs9IDkwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndHJlZTQnOlxuICAgICAgICAgICAgICAgIHVwICs9IDEwNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RyZWU2JzpcbiAgICAgICAgICAgICAgICB1cCArPSA5NTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhdGZvcm0uaGFzTG9nICYmICEob2JqZWN0ID09PSAnYmFnJyB8fCBvYmplY3QgPT09ICdibGFuaycpKSB7XG4gICAgICAgICAgICBvYmplY3RzLnVuc2hpZnQob2JqZWN0KTtcbiAgICAgICAgICAgIG9iamVjdCA9ICdibGFuayc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2F0aW9uc1tvYmplY3RdKSB7XG4gICAgICAgICAgICBsb2NhdGlvbnNbb2JqZWN0XS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0b3A6IHBsYXRmb3JtLnRvcCAtIHVwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IHBsYXRmb3JtLmxlZnQgKyBvdmVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgXy5ldmVyeSh0aGlzLnBsYXRmb3Jtcy5jaGlsZHJlbiwgcGxhdGZvcm0gPT4ge1xuICAgICAgICBwbGFjZU9iamVjdChwbGF0Zm9ybSwgNTAsIDMwKTtcbiAgICAgICAgaWYgKHBsYXRmb3JtLndpZHRoID4gMTIwKSBwbGFjZU9iamVjdChwbGF0Zm9ybSwgNTAsIDgwKTtcbiAgICAgICAgaWYgKHBsYXRmb3JtLndpZHRoID4gMjAwKSBwbGFjZU9iamVjdChwbGF0Zm9ybSwgNTAsIDE3MCk7XG4gICAgICAgIHJldHVybiBvYmplY3RzLmxlbmd0aDtcbiAgICB9KTtcblxuICAgIG9iamVjdHMgPSBnZXRPYmplY3RzKG9iamVjdHMsIHRoaXMub3B0cy5ncm91bmRJdGVtQW1vdW50cyk7XG4gICAgb2JqZWN0cy51bnNoaWZ0KCdibGFuaycpO1xuICAgIG9iamVjdHMudW5zaGlmdCgnYmxhbmsnKTtcblxuICAgIF8uZXZlcnkodGhpcy5ncm91bmQuY2hpbGRyZW4sIHBsYXRmb3JtID0+IHtcbiAgICAgICAgaWYgKHRydWNrTnVtYmVyIDw9IHRydWNrVG90YWwgJiZcbiAgICAgICAgICAgIHBsYXRmb3JtLmxlZnQgPiB0aGlzLmdhbWUud29ybGQud2lkdGggKiB0cnVja051bWJlciAvICh0cnVja1RvdGFsICsgMS41KSkge1xuICAgICAgICAgICAgbG9jYXRpb25zLnRydWNrLnB1c2goe1xuICAgICAgICAgICAgICAgIHRvcDogcGxhdGZvcm0udG9wIC0gNTAsXG4gICAgICAgICAgICAgICAgbGVmdDogcGxhdGZvcm0ubGVmdCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ1Y2tOdW1iZXIrKztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF0Zm9ybS5sZWZ0ID4gdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gMjAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHBsYWNlT2JqZWN0KHBsYXRmb3JtLCAyMCwgMzApO1xuICAgICAgICByZXR1cm4gb2JqZWN0cy5sZW5ndGg7XG4gICAgfSk7XG5cbiAgICAvLyB0aGlzIG1ha2VzIHN1cmUgdGhhdCBhbGwgdGhlIGJhZ3MgYXJlIHBsYWNlZFxuICAgIHdoaWxlICh+b2JqZWN0cy5pbmRleE9mKCdiYWcnKSkge1xuICAgICAgICBsb2NhdGlvbnMuYmFnLnB1c2gobG9jYXRpb25zLmJsYW5rLnNoaWZ0KCkpO1xuICAgICAgICBvYmplY3RzW29iamVjdHMuaW5kZXhPZignYmFnJyldID0gJ2JsYW5rJztcbiAgICB9XG5cbiAgICBfLmVhY2gobG9jYXRpb25zLCAobG9jYXRpb25BcnJheSwga2V5KSA9PiB7XG4gICAgICAgIHZhciBob2xlTG9jYXRpb25zO1xuICAgICAgICB2YXIgc25ha2VMb2NhdGlvbnM7XG4gICAgICAgIGlmIChrZXkgPT09ICdibGFuaycpIHJldHVybjtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3NuYWtlJykge1xuICAgICAgICAgICAgaG9sZUxvY2F0aW9ucyA9IF8ubWFwKGxvY2F0aW9uQXJyYXksIG9wdHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogb3B0cy50b3AsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IG9wdHMubGVmdCArIDgwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFkZEl0ZW1zLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cHMuaG9sZSwgZGVmYXVsdE9wdHM6IGRlZmF1bHRQcm9wcy5ob2xlXG4gICAgICAgICAgICB9LCBob2xlTG9jYXRpb25zKTtcbiAgICAgICAgICAgIHNuYWtlTG9jYXRpb25zID0gXy5tYXAobG9jYXRpb25BcnJheSwgb3B0cyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBvcHRzLnRvcCAtIDEwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBvcHRzLmxlZnQgKyA3MCxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICdzbmFrZScgKyBfLnJhbmRvbSgyKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFkZEl0ZW1zLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cHMuc25ha2UsIGRlZmF1bHRPcHRzOiBkZWZhdWx0UHJvcHMuc25ha2VcbiAgICAgICAgICAgIH0sIHNuYWtlTG9jYXRpb25zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhZGRJdGVtcy5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgIGdyb3VwOiBncm91cHNba2V5XSwgZGVmYXVsdE9wdHM6IGRlZmF1bHRQcm9wc1trZXldXG4gICAgICAgIH0sIGxvY2F0aW9uQXJyYXkpO1xuICAgIH0pO1xuXG4gICAgXy5lYWNoKF8uZ2V0KHRoaXMsICdoZWFydHMuY2hpbGRyZW4nKSwgaGVhcnQgPT4ge1xuICAgICAgICBoZWFydC5hbmltYXRpb25zLmFkZCgnc3BpbicsIFswLCAxLCAyLCAzLCA0LCA1XSwgMTAsIHRydWUpO1xuICAgICAgICBoZWFydC5hbmltYXRpb25zLnBsYXkoJ3NwaW4nKTtcbiAgICB9KTtcblxuICAgIF8uZWFjaChfLmdldCh0aGlzLCAncmVjeWNsZXMuY2hpbGRyZW4nKSwgcmVjeWNsZSA9PiB7XG4gICAgICAgIHJlY3ljbGUuYW5pbWF0aW9ucy5hZGQoJ3NwaW4nLCBbMCwgMSwgMiwgMywgNF0sIDEwLCB0cnVlKTtcbiAgICAgICAgcmVjeWNsZS5hbmltYXRpb25zLnBsYXkoJ3NwaW4nKTtcbiAgICB9KTtcblxuICAgIF8uZWFjaChfLmdldCh0aGlzLCAncmFpbmJvd1JlY3ljbGVzLmNoaWxkcmVuJyksIHJlY3ljbGUgPT4ge1xuICAgICAgICByZWN5Y2xlLmFuaW1hdGlvbnMuYWRkKCdzcGluJywgWzAsIDEsIDIsIDNdLCAxMCwgdHJ1ZSk7XG4gICAgICAgIHJlY3ljbGUuYW5pbWF0aW9ucy5wbGF5KCdzcGluJyk7XG4gICAgfSk7XG5cbiAgICBfLmVhY2goXy5nZXQodGhpcywgJ3RydWNrcy5jaGlsZHJlbicpLCB0cnVjayA9PiB7XG4gICAgICAgIHZhciBkcml2ZSA9IHRydWNrLmFuaW1hdGlvbnMuYWRkKCdkcml2ZScsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSwgMTAsIGZhbHNlKTtcbiAgICAgICAgZHJpdmUub25Db21wbGV0ZS5hZGQoKCkgPT4ge1xuICAgICAgICAgICAgdHJ1Y2suYm9keS52ZWxvY2l0eS54ID0gMjAwO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIF8uZWFjaChfLmdldCh0aGlzLCAndHJlZXMuY2hpbGRyZW4nKSwgdHJlZSA9PiB7XG4gICAgICAgIHRyZWUuc2VuZFRvQmFjaygpO1xuICAgIH0pO1xuXG4gICAgXy5lYWNoKF8uZ2V0KHRoaXMsICdzbmFrZXMuY2hpbGRyZW4nKSwgc25ha2UgPT4ge1xuICAgICAgICBzbmFrZS5sb2FkVGV4dHVyZShudWxsLCAwKTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL21ha2VfaXRlbXMuanMiLCJpbXBvcnQgb3B0czEgZnJvbSAnLi9vcHRzMSc7XG5pbXBvcnQgb3B0czIgZnJvbSAnLi9vcHRzMic7XG5pbXBvcnQgb3B0czMgZnJvbSAnLi9vcHRzMyc7XG5pbXBvcnQgb3B0czQgZnJvbSAnLi9vcHRzNCc7XG5pbXBvcnQgb3B0czUgZnJvbSAnLi9vcHRzNSc7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgICBvcHRzMSxcbiAgICBvcHRzMixcbiAgICBvcHRzMyxcbiAgICBvcHRzNCxcbiAgICBvcHRzNSxcbl07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzLmpzIiwiaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgbGV2ZWw6IDEsXG4gICAgcGxhdGZvcm1zTG9nQ2hhbmNlOiAxIC8gMTAsXG4gICAgZ3JvdW5kTG9nQ2hhbmNlOiAwLFxuICAgIHNldFBsYXRmb3JtczogW1xuICAgICAgICBbWzEzMCwgODBdLCAwXSxcbiAgICAgICAgW1szNTAsIDE2MF0sIDFdLFxuICAgICAgICBbWzk1MCwgMTYwXSwgMl0sXG4gICAgICAgIFtbMTA1MCwgMjQwXSwgMF0sXG4gICAgICAgIFtbMjY1MCwgODBdLCAyXSxcbiAgICAgICAgW1szNjAwLCAyNDBdLCAwXSxcbiAgICBdLFxuICAgIGxvY2F0aW9uczogW1xuICAgICAgICBbMTAwLCAyNDBdLFxuICAgICAgICBbNjAwLCAyNDBdLFxuICAgICAgICBbNjUwLCA4MF0sXG4gICAgICAgIFsxMzUwLCA4MF0sXG4gICAgICAgIFsxNDAwLCAyNDBdLFxuICAgICAgICBbMTcwMCwgMTYwXSxcbiAgICAgICAgWzE5MDAsIDgwXSxcbiAgICAgICAgWzIwNTAsIDI0MF0sXG4gICAgICAgIFsyMzAwLCAxNjBdLFxuICAgICAgICBbMjU1MCwgMjQwXSxcbiAgICAgICAgWzI4MDAsIDE2MF0sXG4gICAgICAgIFszMDAwLCAyNDBdLFxuICAgICAgICBbMzMwMCwgMTYwXSxcbiAgICBdLFxuICAgIHBsYXRmb3JtSXRlbUFtb3VudHM6IF8uZGVmYXVsdHMoe1xuICAgICAgICBzcXVhcmVCdXNoOiAxLFxuICAgICAgICByb3VuZEJ1c2g6IDEsXG4gICAgICAgIHNuYWtlOiAwLFxuICAgICAgICBiYWc6IDE1LFxuICAgICAgICBibGFuazogMTAsXG4gICAgICAgIHJvY2s6IDEsXG4gICAgICAgIHN0dW1wOiAxLFxuICAgICAgICBoZWFydDogMSxcbiAgICAgICAgcmVjeWNsZTogMSxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMSxcbiAgICAgICAgbGlnaHRlbmluZzogMCxcbiAgICAgICAgdHJlZTE6IDEsXG4gICAgICAgIHRyZWUyOiAxLFxuICAgICAgICB0cmVlMzogMSxcbiAgICAgICAgdHJlZTQ6IDEsXG4gICAgfSwgZGVmYXVsdE9wdHMucGxhdGZvcm1JdGVtQW1vdW50cyksXG4gICAgZ3JvdW5kSXRlbUFtb3VudHM6IF8uZGVmYXVsdHMoe1xuICAgICAgICBzcXVhcmVCdXNoOiAxLFxuICAgICAgICByb3VuZEJ1c2g6IDEsXG4gICAgICAgIGhvbGU6IDIsXG4gICAgICAgIGJhZzogMCxcbiAgICAgICAgYmxhbms6IDUsXG4gICAgICAgIHJvY2s6IDEsXG4gICAgICAgIHN0dW1wOiAxLFxuICAgICAgICBoZWFydDogMCxcbiAgICAgICAgcmVjeWNsZTogMCxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMCxcbiAgICB9LCBkZWZhdWx0T3B0cy5ncm91bmRJdGVtQW1vdW50cyksXG59LCBkZWZhdWx0T3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzMS5qcyIsImNvbnN0IGNyb3BzID0gW1xuICAgIFswLCAwLCAxNTUsIDE0MF0sXG4gICAgWzE1NSwgMCwgMTU1LCAxNDBdLFxuICAgIFszMTAsIDAsIDE1NSwgMTQwXSxcbiAgICBbNDY1LCAwLCAxNTUsIDE0MF0sXG4gICAgWzYyMCwgMCwgMTU1LCAxNDBdLFxuICAgIFs3NzUsIDAsIDE1NSwgMTQwXSxcbiAgICBbOTMwLCAwLCAxNTUsIDE0MF0sXG4gICAgWzAsIDAsIDMwMCwgMzYwXSxcbiAgICBbMzAwLCAwLCAzMDAsIDM2MF0sXG4gICAgWzYwMCwgMCwgMzAwLCAzNjBdLFxuICAgIFs5MDAsIDAsIDMwMCwgMzYwXSxcbiAgICBbMTIwMCwgMCwgMzAwLCAzNjBdLFxuICAgIFsxNTAwLCAwLCAzMDAsIDM2MF0sXG4gICAgWzE4MDAsIDAsIDMwMCwgMzYwXSxcbl07XG5cbmNvbnN0IGdlbmVyYWxEZWZhdWx0UHJvcHMgPSB7XG4gICAgaW1hZ2U6ICdpdGVtcycsXG4gICAgZ3Jhdml0eVk6IDEyLFxuICAgIGJvZHk6IFsxMTUsIDEwMCwgMjAsIDUwXSxcbiAgICBzY2FsZTogWy41LCAuNV0sXG4gICAgY29sbGlkZVdvcmxkQm91bmRzOiBmYWxzZSxcbn07XG5cbmNvbnN0IHRyZWVEZWZhdWx0UHJvcHMgPSB7XG4gICAgaW1hZ2U6ICd0cmVlcycsXG4gICAgZ3Jhdml0eVk6IDEyLFxuICAgIGJvZHk6IFszMDAsIDMyNSwgMCwgMF0sXG4gICAgc2NhbGU6IFsuNSwgLjVdLFxuICAgIGNvbGxpZGVXb3JsZEJvdW5kczogZmFsc2UsXG59O1xuXG5jb25zdCBkZWZhdWx0SXRlbUFtb3VudHMgPSB7XG4gICAgc3F1YXJlQnVzaDogMCxcbiAgICByb3VuZEJ1c2g6IDAsXG4gICAgaG9sZTogMCxcbiAgICBzbmFrZTogMCxcbiAgICBiYWc6IDAsXG4gICAgYmxhbms6IDAsXG4gICAgcm9jazogMCxcbiAgICBzdHVtcDogMCxcbiAgICBoZWFydDogMCxcbiAgICByZWN5Y2xlOiAwLFxuICAgIHJhaWJvd1JlY3ljbGU6IDAsXG4gICAgbGlnaHRlbmluZzogMCxcbiAgICB0cmVlMTogMCxcbiAgICB0cmVlMjogMCxcbiAgICB0cmVlMzogMCxcbiAgICB0cmVlNDogMCxcbiAgICB0cmVlNTogMCxcbiAgICB0cmVlNjogMCxcbiAgICB0cmVlNzogMCxcbiAgICB0cnVjazogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsZXZlbDogMSxcbiAgICBoaXRWZWxvY2l0eTogMjAwLFxuICAgIHJlY3ljbGluZ1Njb3JlOiAxMDAsXG4gICAgcmFpbmJvd1JlY3ljbHlpbmdTY29yZTogMzAwLFxuICAgIGhpdHNQZXJMaWZlOiA0LFxuICAgIG1heExpdmVzOiAzLFxuICAgIG1heEJhZ3M6IDUsXG4gICAgbWF4VHJ1Y2tzOiAzLFxuICAgIGJvdW5jZVk6IC4yLFxuICAgIGdyYXZpdHlZOiA0MDAsXG4gICAgcGxheWVySW1hZ2U6ICd0dXJ0bGUnLFxuICAgIHBsYXllckJvZHk6IFszMTUsIDM5NiwgMTAwLCAxNTBdLFxuICAgIGxlZnRGcmFtZXM6IFs1LCA0LCAzLCAyLCAxLCAwXSxcbiAgICBsZWZ0RnJhbWVSYXRlOiAxMCxcbiAgICBsZWZ0TG9vcDogdHJ1ZSxcbiAgICByaWdodEZyYW1lczogWzYsIDcsIDgsIDksIDEwLCAxMV0sXG4gICAgcmlnaHRGcmFtZVJhdGU6IDEwLFxuICAgIHJpZ2h0TG9vcDogdHJ1ZSxcbiAgICBib29zdExlZnRGcmFtZXM6IFsyLCAxLCAwXSxcbiAgICBib29zdExlZnRGcmFtZVJhdGU6IDEwLFxuICAgIGJvb3N0TGVmdExvb3A6IHRydWUsXG4gICAgYm9vc3RSaWdodEZyYW1lczogWzMsIDQsIDVdLFxuICAgIGJvb3N0UmlnaHRGcmFtZVJhdGU6IDEwLFxuICAgIGJvb3N0UmlnaHRMb29wOiB0cnVlLFxuICAgIHBsYXllckFuY2hvcjogWy41LCAuOF0sXG4gICAgcGxheWVyU2NhbGU6IFsuMTUsIC4xNV0sXG4gICAgcGxheWVyTG9nU2NhbGU6IFsuMSwgLjFdLFxuICAgIHVwU3BlZWQ6IC0zNTAsXG4gICAgZG93blNwZWVkOiA1MDAsXG4gICAgbGVmdFNwZWVkOiAtMTUwLFxuICAgIHJpZ2h0U3BlZWQ6IDE1MCxcbiAgICBib29zdFVwU3BlZWQ6IC0zNTAsXG4gICAgYm9vc3REb3duU3BlZWQ6IDUwMCxcbiAgICBib29zdExlZnRTcGVlZDogLTMwMCxcbiAgICBib29zdFJpZ2h0U3BlZWQ6IDMwMCxcbiAgICBwbGF5ZXJTdG9wRnJhbWU6IDYsXG4gICAgYm9vc3RQbGF5ZXJTdG9wRnJhbWU6IDYsXG4gICAgYm9vc3RUaW1lOiAzMDAwLFxuICAgIHBsYXRmb3Jtc0xvZ0NoYW5jZTogMCxcbiAgICBncm91bmRMb2dDaGFuY2U6IDAsXG4gICAgc2V0UGxhdGZvcm1zOiBbXSxcbiAgICBsb2NhdGlvbnM6IFtdLFxuICAgIGdyb3Vwczoge1xuICAgICAgICBzcXVhcmVCdXNoOiAnYnVzaGVzJyxcbiAgICAgICAgcm91bmRCdXNoOiAnYnVzaGVzJyxcbiAgICAgICAgc25ha2U6ICdzbmFrZXMnLFxuICAgICAgICBob2xlOiAnaG9sZXMnLFxuICAgICAgICBiYWc6ICdiYWdzJyxcbiAgICAgICAgcm9jazogJ29ic3RhY2xlcycsXG4gICAgICAgIHN0dW1wOiAnb2JzdGFjbGVzJyxcbiAgICAgICAgaGVhcnQ6ICdoZWFydHMnLFxuICAgICAgICByZWN5Y2xlOiAncmVjeWNsZXMnLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAncmFpbmJvd1JlY3ljbGVzJyxcbiAgICAgICAgbGlnaHRlbmluZzogJ2xpZ2h0ZW5pbmcnLFxuICAgICAgICB0cnVjazogJ3RydWNrcycsXG4gICAgICAgIHRyZWUxOiAndHJlZXMnLFxuICAgICAgICB0cmVlMjogJ3RyZWVzJyxcbiAgICAgICAgdHJlZTM6ICd0cmVlcycsXG4gICAgICAgIHRyZWU0OiAndHJlZXMnLFxuICAgICAgICB0cmVlNTogJ3RyZWVzJyxcbiAgICAgICAgdHJlZTY6ICd0cmVlcycsXG4gICAgICAgIHRyZWU3OiAndHJlZXMnLFxuICAgIH0sXG4gICAgaXRlbVByb3BzOiB7XG4gICAgICAgIHNxdWFyZUJ1c2g6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbMF0sXG4gICAgICAgIH0sIGdlbmVyYWxEZWZhdWx0UHJvcHMpLFxuICAgICAgICByb3VuZEJ1c2g6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbMV0sXG4gICAgICAgIH0sIGdlbmVyYWxEZWZhdWx0UHJvcHMpLFxuICAgICAgICBob2xlOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzJdLFxuICAgICAgICAgICAgYm9keTogWzExNSwgMjAsIDIwLCA1MF0sXG4gICAgICAgICAgICBncmF2aXR5WTogMTAwMDAsXG4gICAgICAgIH0sIGdlbmVyYWxEZWZhdWx0UHJvcHMpLFxuICAgICAgICBiYWc6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbM10sXG4gICAgICAgIH0sIGdlbmVyYWxEZWZhdWx0UHJvcHMpLFxuICAgICAgICByb2NrOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzRdLFxuICAgICAgICB9LCBnZW5lcmFsRGVmYXVsdFByb3BzKSxcbiAgICAgICAgc3R1bXA6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbNV0sXG4gICAgICAgICAgICBib2R5OiBbMTE1LCAxMjAsIDIwLCA1MF0sXG4gICAgICAgIH0sIGdlbmVyYWxEZWZhdWx0UHJvcHMpLFxuICAgICAgICBsaWdodGVuaW5nOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzZdLFxuICAgICAgICAgICAgZ3Jhdml0eVk6IDAsXG4gICAgICAgIH0sIGdlbmVyYWxEZWZhdWx0UHJvcHMpLFxuICAgICAgICBoZWFydDoge1xuICAgICAgICAgICAgaW1hZ2U6ICdoZWFydCcsXG4gICAgICAgICAgICBzY2FsZTogWy4xNSwgLjE1XSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVjeWNsZToge1xuICAgICAgICAgICAgaW1hZ2U6ICdyZWN5Y2xlJyxcbiAgICAgICAgICAgIHNjYWxlOiBbLjE1LCAuMTVdLFxuICAgICAgICB9LFxuICAgICAgICByYWlib3dSZWN5Y2xlOiB7XG4gICAgICAgICAgICBpbWFnZTogJ3JhaW5ib3dSZWN5Y2xlJyxcbiAgICAgICAgICAgIHNjYWxlOiBbLjE1LCAuMTVdLFxuICAgICAgICB9LFxuICAgICAgICB0cnVjazoge1xuICAgICAgICAgICAgaW1hZ2U6ICd0cnVjaycsXG4gICAgICAgICAgICBzY2FsZTogWy41LCAuNV0sXG4gICAgICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB0cmVlMTogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1s3XSxcbiAgICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgIH0sIHRyZWVEZWZhdWx0UHJvcHMpLFxuICAgICAgICB0cmVlMjogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1s4XVxuICAgICAgICB9LCB0cmVlRGVmYXVsdFByb3BzKSxcbiAgICAgICAgdHJlZTM6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbOV1cbiAgICAgICAgfSwgdHJlZURlZmF1bHRQcm9wcyksXG4gICAgICAgIHRyZWU0OiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzEwXSxcbiAgICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgIH0sIHRyZWVEZWZhdWx0UHJvcHMpLFxuICAgICAgICB0cmVlNTogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBjcm9wOiBjcm9wc1sxMV1cbiAgICAgICAgfSwgdHJlZURlZmF1bHRQcm9wcyksXG4gICAgICAgIHRyZWU2OiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGNyb3A6IGNyb3BzWzEyXVxuICAgICAgICB9LCB0cmVlRGVmYXVsdFByb3BzKSxcbiAgICAgICAgdHJlZTc6IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgY3JvcDogY3JvcHNbMTNdXG4gICAgICAgIH0sIHRyZWVEZWZhdWx0UHJvcHMpLFxuICAgICAgICBzbmFrZToge1xuICAgICAgICAgICAgc2NhbGU6IFsuMjUsIC4yNV0sXG4gICAgICAgICAgICBncmF2aXR5WTogMTIsXG4gICAgICAgICAgICBjb2xsaWRlV29ybGRCb3VuZHM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBwbGF0Zm9ybUl0ZW1BbW91bnRzOiBkZWZhdWx0SXRlbUFtb3VudHMsXG4gICAgZ3JvdW5kSXRlbUFtb3VudHM6IGRlZmF1bHRJdGVtQW1vdW50cyxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9kZWZhdWx0X29wdHMuanMiLCJpbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBsZXZlbDogMixcbiAgICBwbGF0Zm9ybXNMb2dDaGFuY2U6IDEgLyAyMCxcbiAgICBncm91bmRMb2dDaGFuY2U6IDEgLyAyMCxcbiAgICBzZXRQbGF0Zm9ybXM6IFtcbiAgICAgICAgW1stMzAsIDI0MF0sIDBdLFxuICAgICAgICBbWzM2MDAsIDI0MF0sIDFdLFxuICAgICAgICBbWzMyMDAsIDI0MF0sIDFdLFxuICAgIF0sXG4gICAgbG9jYXRpb25zOiBbXG4gICAgICAgIFsxMDAsIDE2MF0sXG4gICAgICAgIFszMDAsIDI0MF0sXG4gICAgICAgIFs0MDAsIDgwXSxcbiAgICAgICAgWzcwMCwgMTYwXSxcbiAgICAgICAgWzkwMCwgMjQwXSxcbiAgICAgICAgWzEwMDAsIDgwXSxcbiAgICAgICAgWzEyMDAsIDE2MF0sXG4gICAgICAgIFsxMzAwLCAyNDBdLFxuICAgICAgICBbMTYwMCwgMjQwXSxcbiAgICAgICAgWzE2NTAsIDgwXSxcbiAgICAgICAgWzE4MDAsIDE2MF0sXG4gICAgICAgIFsyMDAwLCAyNDBdLFxuICAgICAgICBbMjEwMCwgODBdLFxuICAgICAgICBbMjQwMCwgMTYwXSxcbiAgICAgICAgWzI3MDAsIDI0MF0sXG4gICAgICAgIFsyODAwLCA4MF0sXG4gICAgICAgIFszMDAwLCAxNjBdLFxuICAgIF0sXG4gICAgcGxhdGZvcm1JdGVtQW1vdW50czogXy5kZWZhdWx0cyh7XG4gICAgICAgIHNxdWFyZUJ1c2g6IDIsXG4gICAgICAgIHJvdW5kQnVzaDogMixcbiAgICAgICAgc25ha2U6IDAsXG4gICAgICAgIGJhZzogMTUsXG4gICAgICAgIGJsYW5rOiAxMCxcbiAgICAgICAgcm9jazogMixcbiAgICAgICAgc3R1bXA6IDIsXG4gICAgICAgIGhlYXJ0OiAyLFxuICAgICAgICByZWN5Y2xlOiAxLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAxLFxuICAgICAgICBsaWdodGVuaW5nOiAxLFxuICAgICAgICB0cmVlMTogMSxcbiAgICAgICAgdHJlZTY6IDEsXG4gICAgICAgIHRyZWU3OiAxLFxuICAgIH0sIGRlZmF1bHRPcHRzLnBsYXRmb3JtSXRlbUFtb3VudHMpLFxuICAgIGdyb3VuZEl0ZW1BbW91bnRzOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgc3F1YXJlQnVzaDogMSxcbiAgICAgICAgcm91bmRCdXNoOiAxLFxuICAgICAgICBzbmFrZTogMixcbiAgICAgICAgYmFnOiAwLFxuICAgICAgICBibGFuazogMCxcbiAgICAgICAgcm9jazogMSxcbiAgICAgICAgc3R1bXA6IDEsXG4gICAgICAgIGhlYXJ0OiAwLFxuICAgICAgICByZWN5Y2xlOiAwLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAwLFxuICAgIH0sIGRlZmF1bHRPcHRzLmdyb3VuZEl0ZW1BbW91bnRzKSxcbn0sIGRlZmF1bHRPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL29wdHMyLmpzIiwiaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgbGV2ZWw6IDMsXG4gICAgcGxhdGZvcm1zTG9nQ2hhbmNlOiAxIC8gMjAsXG4gICAgZ3JvdW5kTG9nQ2hhbmNlOiAxIC8gMjAsXG4gICAgc2V0UGxhdGZvcm1zOiBbXG4gICAgICAgIFtbLTMwLCAxNjBdLCAyXSxcbiAgICAgICAgW1swLCAyNDBdLCAwXSxcbiAgICAgICAgW1s3MDAsIDI0MF0sIDJdLFxuICAgICAgICBbWzExMDAsIDE2MF0sIDFdLFxuICAgICAgICBbWzE5MDAsIDI0MF0sIDFdLFxuICAgICAgICBbWzIyMDAsIDI0MF0sIDJdLFxuICAgICAgICBbWzM0MDAsIDE2MF0sIDJdLFxuICAgIF0sXG4gICAgbG9jYXRpb25zOiBbXG4gICAgICAgIFszMDAsIDI0MF0sXG4gICAgICAgIFs0MDAsIDgwXSxcbiAgICAgICAgWzY1MCwgMTYwXSxcbiAgICAgICAgWzkwMCwgODBdLFxuICAgICAgICBbMTMwMCwgMjQwXSxcbiAgICAgICAgWzEzNTAsIDgwXSxcbiAgICAgICAgWzE1NTAsIDE2MF0sXG4gICAgICAgIFsyMDAwLCA4MF0sXG4gICAgICAgIFsyNzAwLCA4MF0sXG4gICAgICAgIFsyNzAwLCAyNDBdLFxuICAgICAgICBbMzEwMCwgMjQwXSxcbiAgICBdLFxuICAgIHBsYXRmb3JtSXRlbUFtb3VudHM6IF8uZGVmYXVsdHMoe1xuICAgICAgICBzcXVhcmVCdXNoOiAyLFxuICAgICAgICByb3VuZEJ1c2g6IDIsXG4gICAgICAgIHNuYWtlOiAwLFxuICAgICAgICBiYWc6IDE1LFxuICAgICAgICBibGFuazogMTAsXG4gICAgICAgIHJvY2s6IDIsXG4gICAgICAgIHN0dW1wOiAyLFxuICAgICAgICBoZWFydDogMixcbiAgICAgICAgcmVjeWNsZTogMSxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMSxcbiAgICAgICAgbGlnaHRlbmluZzogMSxcbiAgICAgICAgdHJlZTI6IDEsXG4gICAgICAgIHRyZWU0OiAxLFxuICAgICAgICB0cmVlNTogMSxcbiAgICB9LCBkZWZhdWx0T3B0cy5wbGF0Zm9ybUl0ZW1BbW91bnRzKSxcbiAgICBncm91bmRJdGVtQW1vdW50czogXy5kZWZhdWx0cyh7XG4gICAgICAgIHNxdWFyZUJ1c2g6IDEsXG4gICAgICAgIHJvdW5kQnVzaDogMSxcbiAgICAgICAgc25ha2U6IDIsXG4gICAgICAgIGJhZzogMCxcbiAgICAgICAgYmxhbms6IDAsXG4gICAgICAgIHJvY2s6IDEsXG4gICAgICAgIHN0dW1wOiAxLFxuICAgICAgICBoZWFydDogMCxcbiAgICAgICAgcmVjeWNsZTogMCxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMCxcbiAgICAgICAgdHJlZTE6IDEsXG4gICAgfSwgZGVmYXVsdE9wdHMuZ3JvdW5kSXRlbUFtb3VudHMpLFxufSwgZGVmYXVsdE9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvd2FzdGUtYnVzdGVycy1waGFzZXIvanMvb3B0czMuanMiLCJpbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBsZXZlbDogNCxcbiAgICBwbGF0Zm9ybXNMb2dDaGFuY2U6IDAsXG4gICAgZ3JvdW5kTG9nQ2hhbmNlOiAxIC8gMjAsXG4gICAgc2V0UGxhdGZvcm1zOiBbXG4gICAgICAgIFtbMCwgMTYwXSwgMV0sXG4gICAgICAgIFtbMTEwMCwgMTYwXSwgMV0sXG4gICAgICAgIFtbMTY1MCwgMTYwXSwgMl0sXG4gICAgICAgIFtbMjEwMCwgODBdLCAwXSxcbiAgICAgICAgW1syNTAwLCAyNDBdLCAxXSxcbiAgICAgICAgW1syODAwLCAxNjBdLCAyXSxcbiAgICAgICAgW1szNDAwLCAxNjBdLCAxXSxcbiAgICBdLFxuICAgIGxvY2F0aW9uczogW1xuICAgICAgICBbMjAwLCA4MF0sXG4gICAgICAgIFsyMDAsIDI0MF0sXG4gICAgICAgIFs1MDAsIDE2MF0sXG4gICAgICAgIFs4MDAsIDI0MF0sXG4gICAgICAgIFs5MDAsIDgwXSxcbiAgICAgICAgWzEyNTAsIDI0MF0sXG4gICAgICAgIFsxNDAwLCA4MF0sXG4gICAgICAgIFsxOTUwLCAyNDBdLFxuICAgICAgICBbMjIwMCwgMTYwXSxcbiAgICAgICAgWzMxMDAsIDgwXSxcbiAgICAgICAgWzMxMDAsIDI0MF0sXG4gICAgXSxcbiAgICBwbGF0Zm9ybUl0ZW1BbW91bnRzOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgc3F1YXJlQnVzaDogMSxcbiAgICAgICAgcm91bmRCdXNoOiAxLFxuICAgICAgICBzbmFrZTogMCxcbiAgICAgICAgYmFnOiAxNSxcbiAgICAgICAgYmxhbms6IDUsXG4gICAgICAgIHJvY2s6IDIsXG4gICAgICAgIHN0dW1wOiAyLFxuICAgICAgICBoZWFydDogMixcbiAgICAgICAgcmVjeWNsZTogMSxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMSxcbiAgICAgICAgbGlnaHRlbmluZzogMSxcbiAgICAgICAgdHJlZTE6IDEsXG4gICAgICAgIHRyZWUyOiAxLFxuICAgICAgICB0cmVlMzogMSxcbiAgICAgICAgdHJlZTY6IDEsXG4gICAgICAgIHRyZWU3OiAxLFxuICAgIH0sIGRlZmF1bHRPcHRzLnBsYXRmb3JtSXRlbUFtb3VudHMpLFxuICAgIGdyb3VuZEl0ZW1BbW91bnRzOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgc3F1YXJlQnVzaDogMSxcbiAgICAgICAgcm91bmRCdXNoOiAxLFxuICAgICAgICBzbmFrZTogMixcbiAgICAgICAgYmFnOiAwLFxuICAgICAgICBibGFuazogMCxcbiAgICAgICAgcm9jazogMSxcbiAgICAgICAgc3R1bXA6IDEsXG4gICAgICAgIGhlYXJ0OiAwLFxuICAgICAgICByZWN5Y2xlOiAwLFxuICAgICAgICByYWlib3dSZWN5Y2xlOiAwLFxuICAgIH0sIGRlZmF1bHRPcHRzLmdyb3VuZEl0ZW1BbW91bnRzKSxcbn0sIGRlZmF1bHRPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3dhc3RlLWJ1c3RlcnMtcGhhc2VyL2pzL29wdHM0LmpzIiwiaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgbGV2ZWw6IDUsXG4gICAgcGxhdGZvcm1zTG9nQ2hhbmNlOiAxIC8gMTAsXG4gICAgZ3JvdW5kTG9nQ2hhbmNlOiAxIC8gMjAsXG4gICAgc2V0UGxhdGZvcm1zOiBbXG4gICAgICAgIFtbMCwgMTYwXSwgMV0sXG4gICAgICAgIFtbNDAwLCAxNjBdLCAyXSxcbiAgICAgICAgW1s3MDAsIDI0MF0sIDJdLFxuICAgICAgICBbWzk1MCwgMTYwXSwgMl0sXG4gICAgICAgIFtbMTU1MCwgMTYwXSwgMl0sXG4gICAgICAgIFtbMTgwMCwgMjQwXSwgMl0sXG4gICAgICAgIFtbMzQwMCwgODBdLCAwXSxcbiAgICAgICAgW1szNDAwLCAyNDBdLCAwXSxcbiAgICAgICAgW1szNjAwLCAxNjBdLCAxXSxcbiAgICBdLFxuICAgIGxvY2F0aW9uczogW1xuICAgICAgICBbMjAwLCA4MF0sXG4gICAgICAgIFsyMDAsIDI0MF0sXG4gICAgICAgIFs4NTAsIDgwXSxcbiAgICAgICAgWzEyNTAsIDI0MF0sXG4gICAgICAgIFsxMzAwLCA4MF0sXG4gICAgICAgIFsxOTAwLCA4MF0sXG4gICAgICAgIFsyMjAwLCAxNjBdLFxuICAgICAgICBbMjUwMCwgMjQwXSxcbiAgICAgICAgWzI4MDAsIDE2MF0sXG4gICAgICAgIFszMDUwLCAyNDBdLFxuICAgICAgICBbMzEwMCwgODBdLFxuICAgIF0sXG4gICAgcGxhdGZvcm1JdGVtQW1vdW50czogXy5kZWZhdWx0cyh7XG4gICAgICAgIHNxdWFyZUJ1c2g6IDIsXG4gICAgICAgIHJvdW5kQnVzaDogMixcbiAgICAgICAgc25ha2U6IDAsXG4gICAgICAgIGJhZzogMTUsXG4gICAgICAgIGJsYW5rOiA1LFxuICAgICAgICByb2NrOiAzLFxuICAgICAgICBzdHVtcDogMyxcbiAgICAgICAgaGVhcnQ6IDIsXG4gICAgICAgIHJlY3ljbGU6IDIsXG4gICAgICAgIHJhaWJvd1JlY3ljbGU6IDIsXG4gICAgICAgIGxpZ2h0ZW5pbmc6IDEsXG4gICAgICAgIHRyZWUxOiAxLFxuICAgICAgICB0cmVlMjogMSxcbiAgICAgICAgdHJlZTM6IDEsXG4gICAgICAgIHRyZWU2OiAxLFxuICAgICAgICB0cmVlNzogMSxcbiAgICB9LCBkZWZhdWx0T3B0cy5wbGF0Zm9ybUl0ZW1BbW91bnRzKSxcbiAgICBncm91bmRJdGVtQW1vdW50czogXy5kZWZhdWx0cyh7XG4gICAgICAgIHNxdWFyZUJ1c2g6IDEsXG4gICAgICAgIHJvdW5kQnVzaDogMSxcbiAgICAgICAgc25ha2U6IDIsXG4gICAgICAgIGJhZzogMCxcbiAgICAgICAgYmxhbms6IDAsXG4gICAgICAgIHJvY2s6IDEsXG4gICAgICAgIHN0dW1wOiAxLFxuICAgICAgICBoZWFydDogMCxcbiAgICAgICAgcmVjeWNsZTogMCxcbiAgICAgICAgcmFpYm93UmVjeWNsZTogMCxcbiAgICB9LCBkZWZhdWx0T3B0cy5ncm91bmRJdGVtQW1vdW50cyksXG59LCBkZWZhdWx0T3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS93YXN0ZS1idXN0ZXJzLXBoYXNlci9qcy9vcHRzNS5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL2pCQTtBQ0NBO0FBREE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FEQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0NBO0FEQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBRXBDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBRVBBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUFBO0FBQ0E7QUhEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFaQTtBQWNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7OztBSWpFQTtBQUNBO0FKS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBSUNBO0FBQ0E7QUpHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFnQ0E7QUFXQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBM0ZBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBS0RBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBTEFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FNSkE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FOQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBQ0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7O0FBRkE7Ozs7Ozs7Ozs7OztBT0RBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QVBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBUVZBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FSQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwQkE7QUFDQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QVFDQTtBUkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBU0RBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QVRBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QVVmQTtBQUNBO0FBQ0E7QVZDQTtBQUNBO0FBcUJBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBVUNBO0FBQ0E7QUFDQTtBVkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQWxGQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QVdGQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QVhBQTtBQUFBO0FBQ0E7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FZWkE7QUFDQTtBQUNBO0FaQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QWF0Q0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBYkNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1UEE7Ozs7Ozs7Ozs7OztBY1ZBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBZEFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQUNBO0FBbUJBO0FjQ0E7QWRDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FlMUVBO0FBQ0E7QUFDQTtBZkNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQUNBO0FBV0E7QWVDQTtBZkNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVdBO0FBQ0E7QUEzQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FnQkNBO0FBQ0E7QUFDQTtBaEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQU1BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QWdCQ0E7QWhCQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBZ0JDQTtBaEJDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQTNEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QWlCQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBakJLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUZBO0FBWUE7QUFDQTtBQW5EQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBa0JDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBS0E7QUFDQTtBbEJLQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUZBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FtQkNBO0FBQUE7QUFDQTtBQUFBO0FuQkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBREE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwSkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FvQkRBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7Ozs7O0FBQ0E7QXJCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBNUNBOzs7Ozs7Ozs7OztBc0JGQTtBQUNBO0FBZ0JBO0F0QkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXBCQTtBQUNBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW5CQTtBQXFCQTtBQUNBO0FBQ0E7QXNCREE7QXRCR0E7QUFDQTtBc0JEQTtBdEJHQTtBQUNBO0FzQkNBO0F0QkNBO0FBSEE7QUFLQTtBQUNBO0FzQkRBO0F0QkdBO0FBQ0E7QXNCREE7QXRCR0E7QUFDQTtBc0JDQTtBdEJGQTtBQUlBO0FBQ0E7QXNCQ0E7QXRCRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBc0JDQTtBdEJGQTtBQUlBO0FBQ0E7QXNCREE7QXRCR0E7QUFDQTtBc0JEQTtBdEJHQTtBQUNBO0FzQkNBO0F0QkZBO0FBSUE7QUFDQTtBc0JEQTtBdEJHQTtBQUNBO0FzQkRBO0F0QkdBO0FBQ0E7QXNCREE7QXRCR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWxFQTtBQXdFQTtBQUNBO0FBeklBOzs7Ozs7Ozs7Ozs7QXVCeERBO0FBQ0E7Ozs7O0FBQ0E7QXZCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUE1Q0E7Ozs7Ozs7Ozs7OztBd0JGQTtBQUNBOzs7OztBQUNBO0F4QkNBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQTFDQTs7Ozs7Ozs7Ozs7O0F5QkZBO0FBQ0E7Ozs7O0FBQ0E7QXpCQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBNUNBOzs7Ozs7Ozs7Ozs7QTBCRkE7QUFDQTs7Ozs7QUFDQTtBMUJDQTtBQUNBO0FBQ0E7QUFDQTtBQVdBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhCQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUE5Q0E7OzsiLCJzb3VyY2VSb290IjoiIn0=