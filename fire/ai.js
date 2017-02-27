/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
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
/******/
/******/ 	
/******/ 	
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
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "c43a65f8068f34872653"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
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
/******/ 	
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
/******/ 	
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
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
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
/******/ 	
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
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
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
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
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
/******/ 	
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
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
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
/******/ 	
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
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
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
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
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
/******/ 	
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
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
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
/******/ 	
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
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
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
/******/ 	
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
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
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
	
	var _info_chemical_screen = __webpack_require__(10);
	
	var _info_chemical_screen2 = _interopRequireDefault(_info_chemical_screen);
	
	var _info_fuel_oxygen_screen = __webpack_require__(11);
	
	var _info_fuel_oxygen_screen2 = _interopRequireDefault(_info_fuel_oxygen_screen);
	
	var _info_forrest_screen = __webpack_require__(12);
	
	var _info_forrest_screen2 = _interopRequireDefault(_info_forrest_screen);
	
	var _alarm_screen = __webpack_require__(13);
	
	var _alarm_screen2 = _interopRequireDefault(_alarm_screen);
	
	var _who_screen = __webpack_require__(14);
	
	var _who_screen2 = _interopRequireDefault(_who_screen);
	
	var _men_and_women_screen = __webpack_require__(15);
	
	var _men_and_women_screen2 = _interopRequireDefault(_men_and_women_screen);
	
	var _triangle_screen = __webpack_require__(16);
	
	var _triangle_screen2 = _interopRequireDefault(_triangle_screen);
	
	var _break_triangle_screen = __webpack_require__(20);
	
	var _break_triangle_screen2 = _interopRequireDefault(_break_triangle_screen);
	
	var _ladder_screen = __webpack_require__(21);
	
	var _ladder_screen2 = _interopRequireDefault(_ladder_screen);
	
	var _choose_screen = __webpack_require__(22);
	
	var _choose_screen2 = _interopRequireDefault(_choose_screen);
	
	var _need_screen = __webpack_require__(23);
	
	var _need_screen2 = _interopRequireDefault(_need_screen);
	
	var _flip_screen = __webpack_require__(24);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _5 = __webpack_require__(25);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Fire = React.createElement(skoash.Game, {
	    config: _config2.default,
	    screens: {
	        0: _4.default,
	        1: _title_screen2.default,
	        2: _info_chemical_screen2.default,
	        3: _info_fuel_oxygen_screen2.default,
	        4: _info_forrest_screen2.default,
	        5: _alarm_screen2.default,
	        6: _who_screen2.default,
	        7: _men_and_women_screen2.default,
	        8: _triangle_screen2.default,
	        9: _break_triangle_screen2.default,
	        10: _ladder_screen2.default,
	        11: _choose_screen2.default,
	        12: _need_screen2.default,
	        13: _flip_screen2.default
	    },
	    menus: {
	        quit: _6.default
	    },
	    loader: React.createElement(_2.default, null),
	    assets: [React.createElement(skoash.Audio, { ref: 'bkg-1', type: 'background', src: CMWN.MEDIA.EFFECT + 's-bkg-1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-bu-1.mp3' }), React.createElement(skoash.Audio, { ref: 'screen-complete', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-bu-2.mp3' }), React.createElement('div', { className: 'background BKG-2' }), React.createElement('div', { className: 'background BKG-3' })]
	});
	
	skoash.start(Fire);

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "fire",
		"version": 2,
		"skoash": "1.1.5",
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	
	    function random(min, max) {
	        return Math.random() * (max - min) * min;
	    }
	
	    function particleGenerator() {
	        var particle = {
	            amount: 500,
	            velocityY: -2,
	            velocityX: (random(1, 10) - 5) / 10,
	            size: random(3, 5) / 10,
	            alpha: 1,
	            delta: {
	                vy: 0.99,
	                vx: 1,
	                alpha: 0.97,
	                size: 0.02
	            }
	        };
	
	        return particle;
	    }
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "title",
	            checkComplete: false,
	            completeDelay: 2000,
	            completeOnStart: true
	        }),
	        React.createElement(_2.default, { src: CMWN.MEDIA.IMAGE + "particle.jpg", particle: particleGenerator }),
	        React.createElement(
	            skoash.Component,
	            { className: "title" },
	            React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-1-1.png" }),
	            React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-1-2.png" }),
	            React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-1-3.png" })
	        )
	    );
	};
	
	var _ = __webpack_require__(8);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _2 = __webpack_require__(9);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CursorCanvas = function (_skoash$Component) {
	    _inherits(CursorCanvas, _skoash$Component);
	
	    function CursorCanvas() {
	        _classCallCheck(this, CursorCanvas);
	
	        var _this = _possibleConstructorReturn(this, (CursorCanvas.__proto__ || Object.getPrototypeOf(CursorCanvas)).call(this));
	
	        _this.state = {
	            cursorX: 0,
	            cursorY: 0,
	            particles: [],
	            updateCanvas: null
	        };
	        return _this;
	    }
	
	    _createClass(CursorCanvas, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var context;
	            var image;
	            var updateCanvas;
	
	            _get(CursorCanvas.prototype.__proto__ || Object.getPrototypeOf(CursorCanvas.prototype), 'bootstrap', this).call(this);
	
	            if (this.refs.canvas && this.refs.particle) {
	                context = this.refs.canvas.getContext('2d');
	                image = ReactDOM.findDOMNode(this.refs.particle);
	                updateCanvas = window.setInterval(this.draw.bind(this, context, image), this.props.interval);
	
	                this.setState({
	                    updateCanvas: updateCanvas
	                });
	            }
	
	            window.addEventListener('mousemove', this.moveCursor.bind(this));
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.clearInterval(this.state.updateCanvas);
	
	            window.removeEventListener('mousemove', this.moveCursor);
	        }
	    }, {
	        key: 'moveCursor',
	        value: function moveCursor(e) {
	            var scale = skoash.trigger('getState').scale;
	            this.setState({
	                cursorX: e.clientX / scale,
	                cursorY: e.clientY / scale
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw(context, image) {
	            var p;
	            var particle;
	            var particles;
	            var gameWidth;
	            var gameHeight;
	            var scale;
	
	            if (typeof this.props.particle === 'function') {
	                p = this.props.particle();
	            } else {
	                p = this.props.particle;
	            }
	
	            particle = new _3.default({
	                x: this.state.cursorX,
	                y: this.state.cursorY,
	                velocityY: p.velocityY,
	                velocityX: p.velocityX,
	                size: p.size,
	                alpha: p.alpha
	            });
	            particles = this.state.particles;
	            particles.push(particle);
	
	            scale = skoash.trigger('getState').scale;
	            gameWidth = window.innerWidth / scale;
	            gameHeight = window.innerHeight / scale;
	
	            while (particles.length > this.props.particle.amount) {
	                particles.shift();
	            }context.globalAlpha = 1;
	            context.clearRect(0, 0, gameWidth, gameHeight);
	
	            for (var i = 0; i < particles.length; i++) {
	                particles[i].update(context, image, p.delta);
	            }
	            this.setState({ particles: particles });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'cursor' },
	                React.createElement(skoash.Image, { ref: 'particle', id: 'particle', src: this.props.src, hidden: true }),
	                React.createElement('canvas', { ref: 'canvas', id: 'canvas', width: '960', height: '540' })
	            );
	        }
	    }]);
	
	    return CursorCanvas;
	}(skoash.Component);
	
	CursorCanvas.defaultProps = _.defaults({
	    interval: 1000 / 60,
	    particle: {
	        amount: 500,
	        velocityY: -1,
	        velocityX: 0,
	        size: 1,
	        alpha: 1,
	        delta: {
	            vy: 1,
	            vx: 1,
	            alpha: 0.97,
	            size: 0.02
	        }
	    }
	}, skoash.Component.defaultProps);
	
	exports.default = CursorCanvas;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Particle = function () {
	    function Particle(particle) {
	        _classCallCheck(this, Particle);
	
	        this.x = particle.x;
	        this.y = particle.y;
	        this.velocityY = particle.velocityY;
	        this.velocityX = particle.velocityX;
	        this.size = particle.size;
	        this.alpha = particle.alpha;
	    }
	
	    _createClass(Particle, [{
	        key: "update",
	        value: function update(context, image, delta) {
	            this.y += this.velocityY;
	            this.x += this.velocityX;
	            this.velocityY *= delta.vy;
	            this.velocityX *= delta.vx;
	            if (this.alpha < 0) this.alpha = 0;
	            context.globalAlpha = this.alpha;
	            context.save();
	            context.translate(this.x, this.y);
	            context.scale(this.size, this.size);
	            context.drawImage(image, -image.width / 2, -image.height / 2);
	            context.restore();
	            this.alpha *= delta.alpha;
	            this.size += delta.size;
	        }
	    }]);
	
	    return Particle;
	}();
	
	exports.default = Particle;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var STATES = [{
	        audio: 'vo',
	        interval: 2000
	    }, {
	        audio: 'flame',
	        interval: 1000
	    }, {
	        audio: 'equal',
	        interval: 700
	    }, {
	        audio: 'text'
	    }];
	
	    var play = function play(open, i) {
	        var _this = this;
	
	        var state = STATES[i];
	
	        open += ' ' + _.toUpper(state.audio);
	        this.updateScreenData({
	            key: 'screen-2',
	            data: {
	                open: open,
	                play: state.audio
	            }
	        });
	
	        if (state.interval) {
	            setTimeout(function () {
	                play.call(_this, open, ++i);
	            }, state.interval);
	        }
	    };
	
	    var init = function init() {
	        var _this2 = this;
	
	        setTimeout(function () {
	            play.call(_this2, '', 0);
	        }, 100);
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'info-chemical',
	            onOpen: init,
	            className: _.get(props, 'data.screen-2.open', null)
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            { ref: 'media-collection', play: _.get(props, 'data.screen-2.play', null) },
	            React.createElement(skoash.Audio, {
	                ref: STATES[0].audio,
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-chemical-reaction.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: STATES[1].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-2-2.mp3',
	                volume: 0.5
	            }),
	            React.createElement(skoash.Audio, {
	                ref: STATES[2].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-2-3.mp3',
	                volume: 0.6
	            }),
	            React.createElement(skoash.Audio, {
	                ref: STATES[3].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-2-4.mp3',
	                volume: 0.6
	            })
	        ),
	        React.createElement(skoash.Image, { className: 'animated', src: CMWN.MEDIA.IMAGE + 'img-2-1.png' }),
	        React.createElement(skoash.Image, { className: 'animated flame', src: CMWN.MEDIA.IMAGE + 'img-2-2.png' }),
	        React.createElement(skoash.Image, { className: 'animated equal', src: CMWN.MEDIA.IMAGE + 'img-2-3.png' }),
	        React.createElement(
	            'h2',
	            { className: 'animated text' },
	            'Chemical',
	            React.createElement('br', null),
	            'Reaction'
	        )
	    );
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var STATES = [{
	        audio: 'wood',
	        interval: 1000
	    }, {
	        audio: 'plus',
	        interval: 1000
	    }, {
	        audio: 'o2',
	        interval: 1000
	    }, {
	        audio: 'equal',
	        interval: 1000
	    }, {
	        audio: 'fire'
	    }];
	
	    var play = function play(open, i) {
	        var _this = this;
	
	        var state = STATES[i];
	        var audio = state.audio;
	
	        if (audio === 'wood') audio += ' vo';
	
	        open += ' ' + _.toUpper(state.audio);
	
	        this.updateScreenData({
	            key: 'screen-3',
	            data: {
	                open: open,
	                play: audio
	            }
	        });
	
	        if (state.interval) {
	            setTimeout(function () {
	                play.call(_this, open, ++i);
	            }, state.interval);
	        }
	    };
	
	    var init = function init() {
	        var _this2 = this;
	
	        setTimeout(function () {
	            play.call(_this2, '', 0);
	        }, 100);
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'info-fuel-oxygen',
	            onOpen: init,
	            className: _.get(props, 'data.screen-3.open', null)
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.screen-3.play', null)
	            },
	            React.createElement(skoash.Audio, {
	                ref: STATES[0].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-3-2.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: STATES[1].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-3-4.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: STATES[2].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-3-2.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: STATES[3].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-3-4.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: STATES[4].audio,
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-3-3.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-fuel-oxygen-make-it-burn.mp3'
	            })
	        ),
	        React.createElement(skoash.Image, { className: 'animated wood', src: CMWN.MEDIA.IMAGE + 'img-3-1.png' }),
	        React.createElement(skoash.Image, { className: 'animated plus', src: CMWN.MEDIA.IMAGE + 'img-3-2.png' }),
	        React.createElement(skoash.Image, { className: 'animated o2', src: CMWN.MEDIA.IMAGE + 'img-3-3.png' }),
	        React.createElement(skoash.Image, { className: 'animated equal', src: CMWN.MEDIA.IMAGE + 'img-3-4.png' }),
	        React.createElement(skoash.Image, { className: 'animated fire', src: CMWN.MEDIA.IMAGE + 'img-3-5.png' }),
	        React.createElement(skoash.Image, { className: 'animated words', src: CMWN.MEDIA.IMAGE + 'img-3-6.png' })
	    );
	};

/***/ },
/* 12 */
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
	            id: "info-forrest"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "vo-fire-destroys-trees.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(skoash.Image, { className: "background", src: CMWN.MEDIA.FRAME + "fr-1.png" }),
	            React.createElement(
	                "p",
	                { className: "animated" },
	                "Fire destroys trees and homes and",
	                React.createElement("br", null),
	                "consumes landscapes and habitats."
	            )
	        )
	    );
	};

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
	            id: "alarm",
	            onComplete: function onComplete() {
	                skoash.trigger('goto', {
	                    index: props.index + 1
	                });
	            }
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: "media-sequence" },
	            React.createElement(skoash.Audio, {
	                ref: "title",
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + "vo-fire-breaks-out.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                ref: "directions",
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + "vo-click-and-show-you-know.mp3"
	            })
	        ),
	        React.createElement(
	            "p",
	            null,
	            "Click and show you know."
	        ),
	        React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-5-1.png" }),
	        React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-5-2.png" }),
	        React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-1-1.png" }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                ref: "media-collection",
	                play: _.get(props, 'data.selectable.target.props.data-ref', null)
	            },
	            React.createElement(skoash.Audio, { "data-ref": "alarm-sound", type: "sfx", src: CMWN.MEDIA.EFFECT + "s-5-1.mp3" })
	        ),
	        React.createElement(skoash.Selectable, {
	            ref: "selectable",
	            dataTarget: "selectable",
	            list: [React.createElement(skoash.Component, {
	                "data-ref": "alarm-sound",
	                className: "push-down",
	                correct: true
	            })]
	        })
	    );
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	exports.default = function (props, ref, key) {
	    var REVEAL_MSG = 0;
	    var JOBS = ['builder', 'plumber', 'firefighter', 'chef'];
	
	    var openReveal = function openReveal() {
	        this.updateScreenData({
	            key: 'reveal',
	            data: {
	                open: REVEAL_MSG
	            }
	        });
	    };
	
	    var play = function play(effect, callback) {
	        this.updateScreenData({
	            key: 'media-sfx',
	            data: {
	                effect: effect
	            },
	            callback: callback
	        });
	    };
	
	    var playSFX = function playSFX() {
	        var dataRef = _.get(props, 'data.selectable.target.props.data-ref', null);
	        var effect;
	
	        if (dataRef.length != null) {
	            effect = dataRef === 'firefighter' ? 'correct' : 'incorrect';
	            play.call(this, effect, play.bind(this, 'dummy', _.noop));
	        }
	    };
	
	    return React.createElement(
	        WhoScreenComponent,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'who',
	            className: _.get(props, 'data.reveal.open', null) !== null ? 'REVEAL-OPEN' : ''
	        }),
	        React.createElement(skoash.Audio, { ref: 'title', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-fire-breaks-out2.mp3' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'img-6-2.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'img-6-3.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'img-6-4.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'img-6-5.png' }),
	        React.createElement(skoash.Image, { className: 'animated', src: CMWN.MEDIA.IMAGE + 'img-6-1.png' }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.media-sfx.effect', null),
	                onComplete: openReveal
	            },
	            React.createElement(skoash.Audio, {
	                'data-ref': 'correct',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-6-2.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'incorrect',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-6-3.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.selectable.target.props.data-ref', null),
	                onPlay: playSFX
	            },
	            React.createElement(skoash.Audio, {
	                'data-ref': JOBS[0],
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-builder.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': JOBS[1],
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-plumber.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': JOBS[2],
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-firefighter.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': JOBS[3],
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-chef.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            ref: 'selectable',
	            dataTarget: 'selectable',
	            list: [React.createElement(skoash.ListItem, { 'data-ref': JOBS[0], className: 'animated', complete: true }), React.createElement(skoash.ListItem, { 'data-ref': JOBS[1], className: 'animated', complete: true }), React.createElement(skoash.ListItem, { 'data-ref': JOBS[2], className: 'animated', correct: true }), React.createElement(skoash.ListItem, { 'data-ref': JOBS[3], className: 'animated', complete: true })]
	        }),
	        React.createElement(skoash.Reveal, {
	            ref: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            assets: [React.createElement(skoash.Audio, {
	                'data-ref': 'open-sound',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-firefighting-tough.mp3'
	            })],
	            list: [React.createElement(
	                skoash.Component,
	                { className: 'frame' },
	                React.createElement(skoash.Image, { className: 'animated', src: CMWN.MEDIA.IMAGE + 'img-6-7.png' }),
	                React.createElement(
	                    'div',
	                    { className: 'animated' },
	                    React.createElement(skoash.Image, { className: 'background', src: CMWN.MEDIA.FRAME + 'fr-2.png' }),
	                    'Firefighting is one of the',
	                    React.createElement('br', null),
	                    'toughest jobs in the world',
	                    React.createElement('br', null),
	                    'and demands total teamwork.'
	                )
	            )]
	        })
	    );
	};
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WhoScreenComponent = function (_skoash$Screen) {
	    _inherits(WhoScreenComponent, _skoash$Screen);
	
	    function WhoScreenComponent() {
	        _classCallCheck(this, WhoScreenComponent);
	
	        return _possibleConstructorReturn(this, (WhoScreenComponent.__proto__ || Object.getPrototypeOf(WhoScreenComponent)).apply(this, arguments));
	    }
	
	    _createClass(WhoScreenComponent, [{
	        key: 'open',
	        value: function open(opts) {
	            _get(WhoScreenComponent.prototype.__proto__ || Object.getPrototypeOf(WhoScreenComponent.prototype), 'open', this).call(this, opts);
	
	            this.checkComplete = null;
	            this.refs.selectable.incompleteRefs();
	            this.checkComplete = _get(WhoScreenComponent.prototype.__proto__ || Object.getPrototypeOf(WhoScreenComponent.prototype), 'checkComplete', this);
	        }
	    }]);
	
	    return WhoScreenComponent;
	}(skoash.Screen);

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
	            id: "men-and-women"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: "media-sequence" },
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + "vo-men-women-firefighters.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + "vo-they-are-in-excellent-physical.mp3"
	            })
	        ),
	        React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-7-1.png" }),
	        React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-7-2.png" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame" },
	            React.createElement(skoash.Image, { className: "background", src: CMWN.MEDIA.FRAME + "fr-3.png" }),
	            React.createElement(
	                "div",
	                null,
	                "They are in great physical shape",
	                React.createElement("br", null),
	                " and also excellent mental shape.",
	                React.createElement("br", null),
	                "They constantly learn theory",
	                React.createElement("br", null),
	                " and firefighting techniques."
	            )
	        )
	    );
	};

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
	
	exports.default = function (props, ref, key) {
	    var openReveal = function openReveal(dropped) {
	        this.updateScreenData({
	            key: 'dropzone',
	            data: {
	                message: dropped.props.message
	            }
	        });
	    };
	
	    var revealComplete = function revealComplete() {
	        this.updateScreenData({
	            key: 'reveal',
	            data: {
	                complete: true
	            }
	        });
	    };
	
	    return React.createElement(
	        TriangleScreenComponent,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'triangle'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { className: 'title' },
	                React.createElement(skoash.Image, { src: CMWN.MEDIA.IMAGE + 'img-8-1.png' }),
	                React.createElement(
	                    'h3',
	                    null,
	                    'Choose the words and drag to form a triangle'
	                )
	            ),
	            React.createElement(
	                skoash.Component,
	                { className: 'frame' },
	                React.createElement(
	                    skoash.MediaSequence,
	                    null,
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        src: CMWN.MEDIA.VO + 'vo-three-things-make-fire-burn.mp3'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        src: CMWN.MEDIA.VO + 'vo-choose-the-words.mp3'
	                    })
	                ),
	                React.createElement(
	                    skoash.MediaCollection,
	                    {
	                        play: _.get(props, 'data.reveal.complete', null) ? 'complete' : _.get(props, 'data.draggable.dropped.props.message', null)
	                    },
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        'data-ref': 'air',
	                        src: CMWN.MEDIA.VO + 'vo-air.mp3'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        'data-ref': 'clouds',
	                        src: CMWN.MEDIA.VO + 'vo-clouds.mp3',
	                        complete: true
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        'data-ref': 'co2',
	                        src: CMWN.MEDIA.VO + 'vo-carbon-dioxide.mp3',
	                        complete: true
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        'data-ref': 'heat',
	                        src: CMWN.MEDIA.VO + 'vo-heat.mp3'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        'data-ref': 'smoke',
	                        src: CMWN.MEDIA.VO + 'vo-smoke.mp3',
	                        complete: true
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        'data-ref': 'fuel',
	                        src: CMWN.MEDIA.VO + 'vo-fuel.mp3'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'voiceOver',
	                        'data-ref': 'water',
	                        src: CMWN.MEDIA.VO + 'vo-water.mp3',
	                        complete: true
	                    }),
	                    React.createElement(skoash.Audio, {
	                        type: 'sfx',
	                        'data-ref': 'complete',
	                        src: CMWN.MEDIA.EFFECT + 's-8-3.mp3'
	                    }),
	                    ','
	                ),
	                React.createElement(skoash.Repeater, {
	                    className: 'draggables',
	                    amount: 7,
	                    item: React.createElement(_3.default, {
	                        returnOnIncorrect: true
	                    }),
	                    props: [{ message: 'air' }, { message: 'clouds', return: true }, { message: 'co2', return: true }, { message: 'heat' }, { message: 'smoke', return: true }, { message: 'fuel' }, { message: 'water', return: true }]
	                }),
	                React.createElement(skoash.Reveal, {
	                    ref: 'reveal',
	                    openMultiple: true,
	                    openReveal: _.get(props, 'data.dropzone.message', null),
	                    onComplete: revealComplete,
	                    list: [React.createElement(
	                        skoash.ListItem,
	                        { ref: 'fuel', correct: true },
	                        React.createElement(skoash.Image, { 'data-ref': 'fuel', src: CMWN.MEDIA.IMAGE + 'img-8-10b.png' }),
	                        React.createElement(skoash.Image, {
	                            className: 'side',
	                            'data-ref': 'heatSide',
	                            src: CMWN.MEDIA.IMAGE + 'img-8-10g.png'
	                        })
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { ref: 'heat', correct: true },
	                        React.createElement(skoash.Image, { 'data-ref': 'heat', src: CMWN.MEDIA.IMAGE + 'img-8-10c.png' }),
	                        React.createElement(skoash.Image, {
	                            className: 'side',
	                            'data-ref': 'fuelSide',
	                            src: CMWN.MEDIA.IMAGE + 'img-8-10f.png'
	                        })
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { ref: 'air', correct: true },
	                        React.createElement(skoash.Image, { 'data-ref': 'air', src: CMWN.MEDIA.IMAGE + 'img-8-10d.png' }),
	                        React.createElement(skoash.Image, {
	                            className: 'side',
	                            'data-ref': 'airSide',
	                            src: CMWN.MEDIA.IMAGE + 'img-8-10h.png'
	                        })
	                    )]
	                }),
	                React.createElement(_5.default, {
	                    ref: 'dropzone',
	                    dropped: _.get(props, 'data.draggable.dropped'),
	                    dragging: _.get(props, 'data.draggable.dragging'),
	                    onCorrect: openReveal,
	                    dropzones: [React.createElement(
	                        skoash.Component,
	                        { answers: ['fuel', 'heat', 'air'] },
	                        React.createElement(skoash.Image, {
	                            className: 'grey-triangle',
	                            src: CMWN.MEDIA.IMAGE + 'img-8-10a.png'
	                        }),
	                        React.createElement(skoash.Image, {
	                            className: 'color-triangle',
	                            src: CMWN.MEDIA.IMAGE + 'img-8-10e.png'
	                        })
	                    )],
	                    assets: [React.createElement(skoash.Audio, {
	                        type: 'sfx',
	                        'data-ref': 'incorrect',
	                        src: CMWN.MEDIA.EFFECT + 's-8-1.mp3',
	                        complete: true
	                    }), React.createElement(skoash.Audio, {
	                        type: 'sfx',
	                        'data-ref': 'correct',
	                        src: CMWN.MEDIA.EFFECT + 's-8-2.mp3'
	                    }), React.createElement(skoash.Audio, {
	                        type: 'sfx',
	                        'data-ref': 'drag',
	                        src: CMWN.MEDIA.EFFECT + 's-8-4.mp3'
	                    })]
	                })
	            )
	        )
	    );
	};
	
	var _2 = __webpack_require__(17);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(19);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TriangleScreenComponent = function (_skoash$Screen) {
	    _inherits(TriangleScreenComponent, _skoash$Screen);
	
	    function TriangleScreenComponent() {
	        _classCallCheck(this, TriangleScreenComponent);
	
	        return _possibleConstructorReturn(this, (TriangleScreenComponent.__proto__ || Object.getPrototypeOf(TriangleScreenComponent)).apply(this, arguments));
	    }
	
	    _createClass(TriangleScreenComponent, [{
	        key: 'open',
	        value: function open() {
	            var reveal;
	
	            _get(TriangleScreenComponent.prototype.__proto__ || Object.getPrototypeOf(TriangleScreenComponent.prototype), 'open', this).call(this);
	
	            this.checkComplete = null;
	            reveal = _.get(this.refs, 'children-0.refs.children-1.refs.reveal', null);
	            if (reveal) reveal.incompleteRefs();
	            this.incomplete();
	            this.checkComplete = _get(TriangleScreenComponent.prototype.__proto__ || Object.getPrototypeOf(TriangleScreenComponent.prototype), 'checkComplete', this);
	        }
	    }]);
	
	    return TriangleScreenComponent;
	}(skoash.Screen);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(18);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Draggable = function (_skoash$Component) {
	    _inherits(Draggable, _skoash$Component);
	
	    function Draggable(props) {
	        _classCallCheck(this, Draggable);
	
	        var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));
	
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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(18);
	
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
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var ANIMATE = ['HEAT', 'AIR', 'FUEL'];
	
	    var animate = function animate() {
	        var index = _.get(props, 'data.screen-9.index', 0);
	        var open = _.get(props, 'data.screen-9.open', '');
	        open += ' ' + ANIMATE[index];
	
	        this.updateScreenData({
	            key: 'screen-9',
	            data: {
	                index: index + 1,
	                open: open
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'break-triangle',
	            className: _.get(props, 'data.screen-9.open', null)
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'audio-sequence'
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'title',
	                src: CMWN.MEDIA.VO + 'vo-firefighters-break-the-triangle.mp3',
	                onComplete: animate
	            }),
	            React.createElement(skoash.Audio, { type: 'voiceOver',
	                'data-ref': 'heat',
	                src: CMWN.MEDIA.VO + 'vo-heat.mp3',
	                onComplete: animate
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'air',
	                src: CMWN.MEDIA.VO + 'vo-air.mp3',
	                onComplete: animate
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'fuel',
	                src: CMWN.MEDIA.VO + 'vo-fuel.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'theory',
	                src: CMWN.MEDIA.VO + 'vo-this-is-basic-firefighter-theory.mp3'
	            })
	        ),
	        React.createElement(
	            'p',
	            null,
	            'Firefighters break the triangle by removing',
	            React.createElement('br', null),
	            ' one of more these three sides.'
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'animated images' },
	            React.createElement(skoash.Image, {
	                className: 'animated fuel',
	                src: CMWN.MEDIA.IMAGE + 'img-8-10b.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'animated fuel side',
	                'data-ref': 'fuelSide',
	                src: CMWN.MEDIA.IMAGE + 'img-8-10g.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'animated heat',
	                src: CMWN.MEDIA.IMAGE + 'img-8-10c.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'animated heat side',
	                'data-ref': 'heatSide',
	                src: CMWN.MEDIA.IMAGE + 'img-8-10f.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'animated air',
	                src: CMWN.MEDIA.IMAGE + 'img-8-10d.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'animated air side',
	                'data-ref': 'airSide',
	                src: CMWN.MEDIA.IMAGE + 'img-8-10h.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'animated triangle',
	                src: CMWN.MEDIA.IMAGE + 'img-8-10e.png'
	            })
	        ),
	        React.createElement(
	            'h2',
	            null,
	            'This is basic firefighter theory!'
	        )
	    );
	};

/***/ },
/* 21 */
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
	            id: "ladder"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "vo-special-gear.mp3" }),
	        React.createElement(skoash.Image, { className: "animated", src: CMWN.MEDIA.IMAGE + "img-10-1.png" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(skoash.Image, { className: "background", src: CMWN.MEDIA.FRAME + "fr-2.png" }),
	            React.createElement(
	                "div",
	                null,
	                "Firefighters need lots of",
	                React.createElement("br", null),
	                "special gear to keep",
	                React.createElement("br", null),
	                "them safe and help",
	                React.createElement("br", null),
	                "them battle the flames."
	            )
	        )
	    );
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
	
	exports.default = function (props, ref, key) {
	    var clearCharacter = function clearCharacter() {
	        this.updateGameData({
	            key: 'character',
	            data: {
	                gender: null,
	                skin: null
	            }
	        });
	    };
	
	    var addGender = function addGender(gender) {
	        this.updateGameData({
	            key: 'character',
	            data: {
	                gender: gender
	            }
	        });
	
	        this.updateScreenData({
	            key: 'slide',
	            data: {
	                toggle: true
	            }
	        });
	    };
	
	    var addSkin = function addSkin(skin) {
	        this.updateGameData({
	            key: 'character',
	            data: {
	                skin: skin
	            }
	        });
	    };
	
	    var getClassNames = function getClassNames() {
	        var slideToggle = _.get(props, 'data.slide.toggle', false);
	        var gender = _.get(props, 'gameState.data.character.gender', null);
	
	        return (0, _classnames2.default)(_defineProperty({
	            GENDER: !slideToggle,
	            SKIN: slideToggle
	        }, gender, gender));
	    };
	
	    var nextScreen = function nextScreen(nextProps) {
	        if (nextProps.next && this.props.next !== nextProps.next) {
	            this.next();
	        }
	    };
	
	    return React.createElement(
	        ChooseScreenComponent,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'choose',
	            className: getClassNames(),
	            onOpen: clearCharacter,
	            slideToggle: _.get(props, 'data.slide.toggle', false),
	            hideNext: true,
	            next: _.get(props, 'gameState.data.character.skin', null) != null,
	            onComponentWillReceiveProps: nextScreen,
	            silentComplete: true
	        }),
	        React.createElement(skoash.Audio, { type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-choose-your-firefighter.mp3' }),
	        React.createElement(skoash.Image, { className: 'animated', src: CMWN.MEDIA.IMAGE + 'img-11-1.png' }),
	        React.createElement(
	            skoash.Component,
	            { className: 'center female-male' },
	            React.createElement(
	                skoash.Component,
	                { className: 'group' },
	                React.createElement(skoash.Selectable, {
	                    onSelect: addGender,
	                    list: [React.createElement(skoash.ListItem, { 'data-ref': 'female', id: 'gender-female', className: 'animated' }), React.createElement(skoash.ListItem, { 'data-ref': 'male', id: 'gender-male', className: 'animated' })]
	                })
	            )
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'center skin-color' },
	            React.createElement(
	                skoash.Component,
	                { className: 'group' },
	                React.createElement(skoash.Selectable, {
	                    onSelect: addSkin,
	                    list: [React.createElement(skoash.ListItem, { 'data-ref': 'light', id: 'skin-light', className: 'animated' }), React.createElement(skoash.ListItem, { 'data-ref': 'medium', id: 'skin-medium', className: 'animated' }), React.createElement(skoash.ListItem, { 'data-ref': 'dark', id: 'skin-dark', className: 'animated' })]
	                })
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(18);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChooseScreenComponent = function (_skoash$Screen) {
	    _inherits(ChooseScreenComponent, _skoash$Screen);
	
	    function ChooseScreenComponent() {
	        _classCallCheck(this, ChooseScreenComponent);
	
	        return _possibleConstructorReturn(this, (ChooseScreenComponent.__proto__ || Object.getPrototypeOf(ChooseScreenComponent)).apply(this, arguments));
	    }
	
	    _createClass(ChooseScreenComponent, [{
	        key: 'prev',
	        value: function prev() {
	            if (this.props.slideToggle) {
	                this.updateScreenData({
	                    key: 'slide',
	                    data: {
	                        toggle: false
	                    }
	                });
	
	                return;
	            }
	            _get(ChooseScreenComponent.prototype.__proto__ || Object.getPrototypeOf(ChooseScreenComponent.prototype), 'prev', this).call(this);
	        }
	    }]);
	
	    return ChooseScreenComponent;
	}(skoash.Screen);

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
	
	exports.default = function (props, ref, key) {
	    var ANSWERS = ['pants', 'jacket', 'hood', 'boots', 'mask', 'gloves', 'tank', 'walkie', 'axe', 'light', 'camera', 'punch'];
	
	    var OBJECTS = ['bun', 'tank', 'body', 'boots', 'pants', 'jacket', 'gloves', 'mask', 'straps', 'light', 'axe', 'walkie', 'camera', 'punch'];
	
	    var gender = _.get(props, 'gameState.data.character.gender', 'female');
	    var skin = _.get(props, 'gameState.data.character.skin', 'medium');
	
	    var openReveal = function openReveal(dropped) {
	        var droppedList = _.get(props, 'data.dropzone.droppedList', '');
	        var droppedMsg = 'dropped-' + dropped.props.message;
	        this.updateScreenData({
	            key: 'dropzone',
	            data: {
	                message: dropped.props.message,
	                droppedList: droppedList + ' ' + droppedMsg
	            }
	        });
	    };
	
	    var mediaComplete = function mediaComplete() {
	        this.updateScreenData({
	            key: 'media',
	            data: {
	                complete: 'complete'
	            }
	        });
	    };
	
	    return React.createElement(
	        NeedScreenComponent,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            className: skin + ' ' + gender,
	            id: 'need'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: 'media-sequence' },
	            React.createElement(skoash.Audio, { type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-imagine-yourea-firefighter.mp3' }),
	            React.createElement(skoash.Audio, { type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-drag-and-drop-to-outfit.mp3' })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                ref: 'media-vos',
	                play: _.get(props, 'data.dropzone.message', null),
	                onComplete: mediaComplete
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'pants',
	                src: CMWN.MEDIA.VO + 'vo-turnout-pants.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'jacket',
	                src: CMWN.MEDIA.VO + 'vo-turnout-jacket.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'hood',
	                src: CMWN.MEDIA.VO + 'vo-carbon-flash-hood.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'boots',
	                src: CMWN.MEDIA.VO + 'vo-chemical-proof-boots.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'mask',
	                src: CMWN.MEDIA.VO + 'vo-helmet-visor.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'gloves',
	                src: CMWN.MEDIA.VO + 'vo-safety-gloves.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'tank',
	                src: CMWN.MEDIA.VO + 'vo-tank-of-oxygen.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'axe',
	                src: CMWN.MEDIA.VO + 'vo-axe.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'walkie',
	                src: CMWN.MEDIA.VO + 'vo-hand-held-radio.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'light',
	                src: CMWN.MEDIA.VO + 'vo-flashlight.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'camera',
	                src: CMWN.MEDIA.VO + 'vo-thermal-imaging.mp3'
	            }),
	            ',',
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                'data-ref': 'punch',
	                src: CMWN.MEDIA.VO + 'vo-window-punch.mp3'
	            }),
	            ','
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                ref: 'media-sfx',
	                play: _.get(props, 'data.media.complete', null)
	            },
	            React.createElement(skoash.Audio, { 'data-ref': 'complete', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-12-3.mp3' }),
	            ','
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { className: 'frame' },
	                React.createElement(skoash.Image, { className: 'animated', src: CMWN.MEDIA.IMAGE + 'img-12-1.png' }),
	                React.createElement(skoash.Repeater, {
	                    className: 'draggables-left',
	                    ref: 'draggables-left',
	                    amount: 6,
	                    item: React.createElement(_3.default, { returnOnIncorrect: true }),
	                    props: ANSWERS.slice(0, 6).map(function (value) {
	                        return { message: value };
	                    })
	                }),
	                React.createElement(_5.default, {
	                    ref: 'dropzone',
	                    dropped: _.get(props, 'data.draggable.dropped'),
	                    dragging: _.get(props, 'data.draggable.dragging'),
	                    onCorrect: openReveal,
	                    dropzones: [React.createElement(skoash.Repeater, {
	                        className: _.get(props, 'data.dropzone.droppedList', null),
	                        amount: 16,
	                        answers: ANSWERS,
	                        props: OBJECTS.map(function (value) {
	                            return { className: value };
	                        })
	                    })],
	                    assets: [React.createElement(skoash.Audio, {
	                        type: 'sfx',
	                        'data-ref': 'correct',
	                        src: CMWN.MEDIA.EFFECT + 's-12-2.mp3'
	                    }), React.createElement(skoash.Audio, {
	                        type: 'sfx',
	                        'data-ref': 'drag',
	                        src: CMWN.MEDIA.EFFECT + 's-12-1.mp3'
	                    })]
	                }),
	                React.createElement(skoash.Repeater, {
	                    className: 'draggables-right',
	                    ref: 'draggables-right',
	                    amount: 6,
	                    item: React.createElement(_3.default, { returnOnIncorrect: true }),
	                    props: ANSWERS.slice(6).map(function (value) {
	                        return { message: value };
	                    })
	                }),
	                React.createElement(skoash.Reveal, {
	                    ref: 'reveal',
	                    openMultiple: true,
	                    openReveal: _.get(props, 'data.dropzone.message', null),
	                    list: [React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'pants' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'Nobody wears shorts in a fire!',
	                            React.createElement('br', null),
	                            ' You need these!'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'jacket' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'If there is a fire, you',
	                            React.createElement('br', null),
	                            ' need this special coat.'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'hood' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'This keeps every bit of',
	                            React.createElement('br', null),
	                            ' your head protected.'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'boots' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'They keep dangerous',
	                            React.createElement('br', null),
	                            ' chemicals off your feet.'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'mask' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'This protects your head and face.'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'gloves' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'Like boots do for your feet,',
	                            React.createElement('br', null),
	                            ' these protect your hands.'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'tank' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'This is a can of air',
	                            React.createElement('br', null),
	                            ' so you can breathe!'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'axe' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'This helps you get',
	                            React.createElement('br', null),
	                            ' through closed doors.'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'walkie' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'When shouting isn\'t enough',
	                            React.createElement('br', null),
	                            ' you need this.'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'light' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'Could be too dark to see',
	                            React.createElement('br', null),
	                            ' unless you have this!'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'camera' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'Need to see through',
	                            React.createElement('br', null),
	                            ' darkness and smoke?',
	                            React.createElement('br', null),
	                            ' This is for you!'
	                        )
	                    ), React.createElement(
	                        skoash.ListItem,
	                        { 'data-ref': 'punch' },
	                        React.createElement(
	                            'p',
	                            null,
	                            'This helps you break',
	                            React.createElement('br', null),
	                            ' through a window.'
	                        )
	                    )]
	                })
	            )
	        )
	    );
	};
	
	var _2 = __webpack_require__(17);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(19);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NeedScreenComponent = function (_skoash$Screen) {
	    _inherits(NeedScreenComponent, _skoash$Screen);
	
	    function NeedScreenComponent() {
	        _classCallCheck(this, NeedScreenComponent);
	
	        return _possibleConstructorReturn(this, (NeedScreenComponent.__proto__ || Object.getPrototypeOf(NeedScreenComponent)).apply(this, arguments));
	    }
	
	    _createClass(NeedScreenComponent, [{
	        key: 'open',
	        value: function open() {
	            var componentParent;
	
	            _get(NeedScreenComponent.prototype.__proto__ || Object.getPrototypeOf(NeedScreenComponent.prototype), 'open', this).call(this);
	
	            this.checkComplete = null;
	            this.refs['media-vos'].incompleteRefs();
	            componentParent = _.get(this.refs, 'children-3.refs.children-0', null);
	            if (componentParent) {
	                componentParent.refs['draggables-left'].incompleteRefs();
	                componentParent.refs['draggables-right'].incompleteRefs();
	            }
	            this.incomplete();
	            this.checkComplete = _get(NeedScreenComponent.prototype.__proto__ || Object.getPrototypeOf(NeedScreenComponent.prototype), 'checkComplete', this);
	        }
	    }]);
	
	    return NeedScreenComponent;
	}(skoash.Screen);

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
	            id: "flip",
	            playOnStart: "fire-sfx"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "vo-flip.mp3" }),
	        React.createElement(skoash.Audio, { type: "sfx", ref: "fire-sfx", src: CMWN.MEDIA.EFFECT + "s-13-1.mp3" }),
	        React.createElement(
	            "h2",
	            null,
	            "You just earned",
	            React.createElement("br", null),
	            " a red hot"
	        ),
	        React.createElement(
	            "div",
	            { className: "flip-text" },
	            "FLIP"
	        ),
	        React.createElement(skoash.Image, { className: "animated fire", src: CMWN.MEDIA.IMAGE + "img-1-1.png" }),
	        React.createElement(skoash.Image, { className: "animated flip", src: CMWN.MEDIA.IMAGE + "img-13-1.png" })
	    );
	};

/***/ },
/* 25 */
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
//# sourceMappingURL=ai.js.map