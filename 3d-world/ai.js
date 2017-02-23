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
/******/ 	var hotCurrentHash = "362998d373d1add8f104"; // eslint-disable-line no-unused-vars
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
	
	var _imagine_screen = __webpack_require__(8);
	
	var _imagine_screen2 = _interopRequireDefault(_imagine_screen);
	
	var _lets_learn_screen = __webpack_require__(10);
	
	var _lets_learn_screen2 = _interopRequireDefault(_lets_learn_screen);
	
	var _video_screen = __webpack_require__(11);
	
	var _video_screen2 = _interopRequireDefault(_video_screen);
	
	var _many_materials_screen = __webpack_require__(12);
	
	var _many_materials_screen2 = _interopRequireDefault(_many_materials_screen);
	
	var _sort_game_level_one_screen = __webpack_require__(13);
	
	var _sort_game_level_one_screen2 = _interopRequireDefault(_sort_game_level_one_screen);
	
	var _sort_game_level_two_screen = __webpack_require__(20);
	
	var _sort_game_level_two_screen2 = _interopRequireDefault(_sort_game_level_two_screen);
	
	var _sort_game_level_three_screen = __webpack_require__(21);
	
	var _sort_game_level_three_screen2 = _interopRequireDefault(_sort_game_level_three_screen);
	
	var _congratulations_screen = __webpack_require__(22);
	
	var _congratulations_screen2 = _interopRequireDefault(_congratulations_screen);
	
	var _help_the_world_screen = __webpack_require__(23);
	
	var _help_the_world_screen2 = _interopRequireDefault(_help_the_world_screen);
	
	var _bunch_of_problems_screen = __webpack_require__(24);
	
	var _bunch_of_problems_screen2 = _interopRequireDefault(_bunch_of_problems_screen);
	
	var _printer_screen = __webpack_require__(25);
	
	var _printer_screen2 = _interopRequireDefault(_printer_screen);
	
	var _now_that_you_learned_screen = __webpack_require__(29);
	
	var _now_that_you_learned_screen2 = _interopRequireDefault(_now_that_you_learned_screen);
	
	var _list_screen = __webpack_require__(30);
	
	var _list_screen2 = _interopRequireDefault(_list_screen);
	
	var _flip_screen = __webpack_require__(31);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _5 = __webpack_require__(32);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ThreeDWorld;
	
	ThreeDWorld = React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _imagine_screen2.default, _lets_learn_screen2.default, _video_screen2.default, _many_materials_screen2.default, _sort_game_level_one_screen2.default, _sort_game_level_two_screen2.default, _sort_game_level_three_screen2.default, _congratulations_screen2.default, _help_the_world_screen2.default, _bunch_of_problems_screen2.default, _printer_screen2.default, _now_that_you_learned_screen2.default, _list_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _6.default
	    },
	    assets: [React.createElement(skoash.Font, { name: 'Source Sans Pro' }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'Back.mp3' }), React.createElement(skoash.Audio, { ref: 'next', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'Next.mp3' }), React.createElement(skoash.Audio, { ref: 'back', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'Back.mp3' }), React.createElement(skoash.Audio, {
	        ref: 'screen-complete',
	        type: 'sfx',
	        src: CMWN.MEDIA.EFFECT + 'NextAppear.mp3'
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: CMWN.MEDIA.EFFECT + 'TitleScreen.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, { type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG1.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG2.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG3.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG4.mp3', loop: true }), React.createElement(skoash.Audio, { type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG5.mp3', loop: true }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bk.1.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg.2.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg.win.jpg' }), React.createElement('div', { className: 'background bkg-imagine' }), React.createElement('div', { className: 'background bkg-congratulations' }), React.createElement('div', { className: 'background bkg-printer' })],
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'ios-splash':
	                return;
	            case 'title':
	                return 0;
	            case 'imageine':
	            case 'lets-learn':
	                return 1;
	            case 'sort-game-level-one':
	            case 'sort-game-level-two':
	            case 'sort-game-level-three':
	            case 'congratulations':
	                return 3;
	            case 'help-the-world':
	            case 'bunch-of-problems':
	                return 4;
	            case 'printer':
	                return 5;
	            default:
	                return 2;
	        }
	    }
	});
	
	skoash.start(ThreeDWorld);
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "3d-world",
		"title": "3D World",
		"version": 1,
		"skoash": "1.1.4",
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
	        React.createElement(skoash.Image, { src: CMWN.MEDIA.SPRITE + 'title.gif' })
	    );
	};

/***/ },
/* 8 */
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
	            id: "imagine"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "sfx",
	            ref: "start",
	            src: CMWN.MEDIA.EFFECT + 'animation_appear.mp3'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: CMWN.MEDIA.EFFECT + 'text_type.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: CMWN.MEDIA.EFFECT + 'text_type.mp3',
	                sprite: [0, 2000]
	            })
	        ),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + 'VO_imagine.mp3',
	                completeTarget: "imagine"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + 'VO_it_already.mp3'
	            })
	        ),
	        React.createElement(skoash.Image, {
	            className: "printer show",
	            src: CMWN.MEDIA.IMAGE + 'img.printer01.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: (0, _classnames2.default)('question', {
	                show: !_.get(props, 'data.imagine.complete')
	            }),
	            src: CMWN.MEDIA.SPRITE + 'wand.gif'
	        }),
	        React.createElement(skoash.Image, {
	            className: (0, _classnames2.default)('answer', {
	                show: _.get(props, 'data.imagine.complete')
	            }),
	            src: CMWN.MEDIA.SPRITE + 'wand.and.printer_.gif'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'intro.speech.balloon.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "right" },
	            React.createElement(
	                "div",
	                {
	                    className: (0, _classnames2.default)('words', 'imagine', {
	                        start: !_.get(props, 'data.imagine.complete')
	                    })
	                },
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Imagine a magical item"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "that can make anything"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "you can think of!"
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                {
	                    className: (0, _classnames2.default)('words', 'exists', {
	                        start: _.get(props, 'data.imagine.complete')
	                    })
	                },
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "It already exists today."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "It's called 3D printing!"
	                    )
	                )
	            ),
	            React.createElement("div", { className: "minion" })
	        )
	    );
	};
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 9 */
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
/* 10 */
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
	            id: 'lets-learn',
	            onStart: function onStart() {
	                this.updateGameState({
	                    path: 'start',
	                    data: true
	                });
	            }
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.VO + 'VO_lets.mp3'
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'sfx',
	            ref: 'start',
	            src: CMWN.MEDIA.EFFECT + 'text_type.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.closeupminion.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'balloon',
	            src: CMWN.MEDIA.IMAGE + 'speech.balloon.1.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            null,
	            React.createElement(
	                'div',
	                {
	                    className: (0, _classnames2.default)('words', {
	                        start: _.get(props, 'data.start')
	                    })
	                },
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        'Let\u2019s learn about the'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        '3D printing process'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        'with this video'
	                    )
	                )
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 11 */
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
	            id: 'video'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'vid.scrn.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            null,
	            React.createElement(skoash.Video, { src: src })
	        )
	    );
	};
	
	var src = 'https://res.cloudinary.com/changemyworldnow/video/upload/v1479831566/' + '3D_Printing_FINAL_FILE_SMALLER_pfzv84.mp4';

/***/ },
/* 12 */
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
	            id: 'many-materials',
	            onStart: function onStart() {
	                this.updateGameState({
	                    path: 'start',
	                    data: true
	                });
	            }
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.VO + 'VO_wow.mp3'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'text_type.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'text_type.mp3',
	                sprite: [0, 1000]
	            })
	        ),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.closeupminion.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'balloon',
	            src: CMWN.MEDIA.IMAGE + 'speech.balloon.frame7.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            null,
	            React.createElement(
	                'div',
	                {
	                    className: (0, _classnames2.default)('words', {
	                        start: _.get(props, 'data.start')
	                    })
	                },
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        'Wow, there are many materials you can use'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        'to make things with a 3D printer!'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        'The most common are plastic and metal,'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        'but other materials can be used.'
	                    )
	                )
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _sort_game_screen_component2.default)(props, ref, key, {
	        id: 'sort-game-level-one',
	        timeout: 60000,
	        prepTimeout: 1000,
	        openOnStart: 'in-this',
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'in-this',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                completeTarget: 'in-this',
	                src: CMWN.MEDIA.VO + 'VO_in_this.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'VO_be_sure.mp3'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.EFFECT + 'level_up.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'VO_did_you1.mp3'
	            })
	        ), React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            ref: 'try-again',
	            complete: true,
	            src: CMWN.MEDIA.VO + 'VO_try_again.mp3'
	        })],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            completeTarget: 'sfx',
	            ref: 'print',
	            src: CMWN.MEDIA.EFFECT + 'print_item.mp3',
	            sprite: [0, 500]
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            { ref: 'in-this', type: 'li' },
	            React.createElement(skoash.Image, {
	                className: 'frame',
	                src: CMWN.MEDIA.FRAME + 'ins.green.frame.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'balloon',
	                src: CMWN.MEDIA.IMAGE + 'img.quit.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'bins',
	                src: CMWN.MEDIA.IMAGE + 'ins.bins.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	            }),
	            React.createElement(
	                'div',
	                {
	                    className: (0, _classnames2.default)('words', 'in-this-game', {
	                        show: !_.get(props, 'data.in-this.complete', false)
	                    })
	                },
	                React.createElement(
	                    'div',
	                    null,
	                    'In this game, you will sort items'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'dropped from the 3D printer'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'by the material it is made from.'
	                ),
	                React.createElement('div', { className: 'line' }),
	                React.createElement(
	                    'div',
	                    null,
	                    'Slide the printer head to'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'drop items into the correct bin.'
	                )
	            ),
	            React.createElement(
	                'div',
	                {
	                    className: (0, _classnames2.default)('words', 'be-sure', {
	                        show: _.get(props, 'data.in-this.complete', false)
	                    })
	                },
	                React.createElement(
	                    'div',
	                    null,
	                    'Be sure to collect enough points'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'before the timer runs out!'
	                ),
	                React.createElement(
	                    'button',
	                    {
	                        onClick: function onClick() {
	                            skoash.trigger('updateState', {
	                                path: 'reveal',
	                                data: {
	                                    close: true
	                                }
	                            });
	                        }
	                    },
	                    'Start Game'
	                )
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	            }),
	            React.createElement(
	                'h3',
	                null,
	                'LEVEL UP'
	            ),
	            React.createElement(
	                'h4',
	                null,
	                'Did You Know?'
	            ),
	            React.createElement(
	                'div',
	                null,
	                'Even food can be 3D printed!',
	                React.createElement('br', null),
	                'While still in the experimental stages,',
	                React.createElement('br', null),
	                'NASA hopes one day',
	                React.createElement('br', null),
	                'to print food in space!'
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'minion',
	                src: CMWN.MEDIA.IMAGE + 'try.again.minion.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.FRAME + 'try.again.frame.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.nav.png'
	            }),
	            React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    'TRY AGAIN'
	                ),
	                'You didn\'t win this time —',
	                React.createElement('br', null),
	                'but don\'t worry, you have another chance!'
	            )
	        )]
	    });
	};
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _sort_game_screen_component = __webpack_require__(14);
	
	var _sort_game_screen_component2 = _interopRequireDefault(_sort_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	    var onCloseReveal;
	    var onScoreComplete;
	    var onTimerComplete;
	    var onAddClassName;
	    var onCorrectCatch;
	    var onIncorrectCatch;
	
	    onCloseReveal = function onCloseReveal() {
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: false,
	                start: true,
	                restart: false
	            }
	        });
	        this.updateGameState({
	            path: 'closeReveal',
	            data: false
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
	        this.updateGameState({
	            path: 'game',
	            data: {
	                start: false
	            }
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
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: opts.id
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'thick.border.png'
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.reveal.open'),
	            children: opts.vos
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.sfx.playing'),
	            children: opts.sfx
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'left' },
	            React.createElement(
	                skoash.Score,
	                {
	                    max: 100,
	                    increment: 10,
	                    correct: _.get(props, 'data.score.correct', 0),
	                    incorrect: _.get(props, 'data.score.incorrect', 0),
	                    onComplete: onScoreComplete
	                },
	                React.createElement('div', null)
	            ),
	            React.createElement(skoash.Timer, {
	                countDown: true,
	                timeout: opts.timeout,
	                leadingContent: 'TIME LEFT',
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
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.game1.bins.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.game1.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.game1.printer.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.IMAGE + 'plus.png'
	            }),
	            React.createElement(
	                _3.default,
	                {
	                    on: _.get(props, 'data.game.start', false) && !_.get(props, 'gameState.paused'),
	                    start: _.get(props, 'data.game.start', false),
	                    stop: _.get(props, 'data.game.complete', false),
	                    prepClasses: ['starting', 'ready', 'set', 'go'],
	                    prepTimeout: opts.prepTimeout,
	                    onAddClassName: onAddClassName,
	                    bin: React.createElement(_5.default, {
	                        completeOnStart: true,
	                        checkComplete: false,
	                        bin: catchablesArray
	                    })
	                },
	                React.createElement(
	                    'div',
	                    { className: 'left' },
	                    React.createElement('div', null),
	                    React.createElement('div', null),
	                    React.createElement('div', null)
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'right' },
	                    React.createElement('div', null),
	                    React.createElement('div', null),
	                    React.createElement('div', null)
	                )
	            ),
	            React.createElement(_7.default, {
	                completeOnStart: true,
	                checkComplete: false,
	                start: _.get(props, 'data.game.start', false),
	                bucket: [React.createElement(skoash.Component, { className: 'plastic', message: 'plastic' }), React.createElement(skoash.Component, { className: 'metal', message: 'metal' }), React.createElement(skoash.Component, { className: 'other', message: 'other' })],
	                catchableRefs: _.get(props, 'data.dropper.refs', []),
	                onCorrect: onCorrectCatch,
	                onIncorrect: onIncorrectCatch,
	                assets: [React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    ref: 'correct',
	                    src: CMWN.MEDIA.EFFECT + 'Correct.mp3'
	                }), React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    ref: 'incorrect',
	                    src: CMWN.MEDIA.EFFECT + 'Incorrect.mp3'
	                })]
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: opts.openOnStart,
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.openReveal', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            list: opts.revealList
	        })
	    );
	};
	
	var _2 = __webpack_require__(15);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(16);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(18);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(17);
	
	var _9 = _interopRequireDefault(_8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var categoryArray = [{
	    name: 'metal',
	    items: ['fork', 'robot', 'slinky', 'nails', 'gears', 'key']
	}, {
	    name: 'other',
	    items: ['shoes', 'cake', 'block', 'burger', 'pizza']
	}, {
	    name: 'plastic',
	    items: ['truck', 'dice', 'lego', 'glasses']
	}];
	
	var catchablesArray = _.reduce(categoryArray, function (a, category) {
	    return a.concat(_.map(category.items, function (item) {
	        return React.createElement(_9.default, {
	            className: item,
	            message: category.name
	        });
	    }));
	}, []);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(16);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(17);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Dropper = function (_skoash$Component) {
	    _inherits(Dropper, _skoash$Component);
	
	    function Dropper() {
	        _classCallCheck(this, Dropper);
	
	        var _this = _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).call(this));
	
	        _this.state = _.defaults({
	            items: {},
	            itemCount: 0,
	            itemEndXs: {},
	            direction: '',
	            startX: 0,
	            startY: 0,
	            endX: 0,
	            endY: 0,
	            zoom: 1
	        }, _this.state);
	
	        _this.next = _this.next.bind(_this);
	        _this.moveEvent = _this.moveEvent.bind(_this);
	        _this.setZoom = _this.setZoom.bind(_this);
	        return _this;
	    }
	
	    _createClass(Dropper, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Dropper.prototype.__proto__ || Object.getPrototypeOf(Dropper.prototype), 'bootstrap', this).call(this);
	
	            this.setZoom();
	
	            this.refs.body.addEventListener('mousemove', this.moveEvent);
	            this.refs.body.addEventListener('touchmove', this.moveEvent);
	
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
	        key: 'next',
	        value: function next(on) {
	            var _this3 = this;
	
	            var items;
	            var index;
	
	            if (!this.state.started || !this.props.on && !on) return;
	
	            index = this.state.itemCount;
	            items = this.state.items;
	            items[index] = this.refs.bin.get(1)[0];
	
	            this.setState({
	                items: items,
	                itemCount: index + 1
	            }, function () {
	                var timeoutFunction = function timeoutFunction(i) {
	                    var itemRef;
	                    var itemEndXs;
	                    itemRef = _this3.refs['items-' + index];
	                    if (itemRef) {
	                        itemRef.addClassName(_this3.props.prepClasses[i]);
	                        _this3.props.onAddClassName.call(_this3, _this3.props.prepClasses[i]);
	                        if (i === _this3.props.prepClasses.length - 1) {
	                            itemEndXs = _this3.state.itemEndXs;
	                            itemEndXs[index] = _this3.state.endX;
	                            ReactDOM.findDOMNode(itemRef).addEventListener('transitionend', function () {
	                                items = _this3.state.items;
	                                delete items[index];
	                                _this3.setState({
	                                    items: items,
	                                    itemEndXs: itemEndXs
	                                });
	                            });
	                        }
	                    }
	
	                    if (i === _this3.props.prepClasses.length) _this3.next();
	                };
	
	                var _loop = function _loop(i) {
	                    setTimeout(function () {
	                        timeoutFunction(i);
	                    }, i * _this3.props.prepTimeout);
	                };
	
	                for (var i = 0; i <= _this3.props.prepClasses.length; i++) {
	                    _loop(i);
	                }
	
	                _this3.updateGameState({
	                    path: _this3.props.refsTarget,
	                    data: {
	                        refs: _.filter(_this3.refs, function (v, k) {
	                            return !k.indexOf('items-');
	                        })
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'moveEvent',
	        value: function moveEvent(e) {
	            var endX = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0].pageX : e.pageX;
	
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
	        value: function getItemStyle(key) {
	            var endX;
	            var x;
	
	            endX = this.state.itemEndXs[key] || this.state.endX;
	            x = (endX - this.state.startX) / this.state.zoom;
	
	            return {
	                transform: 'translateX(' + x + 'px)',
	                WebkitTransform: 'translateX(' + x + 'px)'
	            };
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
	            var _this4 = this;
	
	            return _.map(this.state.items, function (item, key) {
	                var ref = 'items-' + key;
	                if (!item) return null;
	                return React.createElement(item.type, _extends({}, item.props, {
	                    style: _this4.getItemStyle(key),
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
	                    ref: 'body',
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
	}(skoash.Component);
	
	Dropper.defaultProps = _.defaults({
	    prepClasses: ['ready', 'set', 'go'],
	    prepTimeout: 1000,
	    bin: React.createElement(_3.default, {
	        bin: [React.createElement(_5.default, null)]
	    }),
	    onStart: function onStart() {
	        this.next();
	    },
	    refsTarget: 'dropper',
	    on: true
	}, skoash.Component.defaultProps);
	
	exports.default = Dropper;

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
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// As of skoash 1.1.2 this component can be found at skoash.Randomizer
	/* eslint-disable no-console */
	console.warn('As of skoash 1.1.2 this component can be found at skoash.Randomizer');
	/* eslint-enable no-console */
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(9);
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _2 = __webpack_require__(19);
	
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
	        key: 'selectCatchable',
	        value: function selectCatchable(bucketRef, catchableRef) {
	            if (!this.state.started || this.state.paused || !this.state.canCatch || !catchableRef.canCatch()) return;
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
	
	exports.default = Catcher;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(17);
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _sort_game_screen_component2.default)(props, ref, key, {
	        id: 'sort-game-level-one',
	        timeout: 60000,
	        prepTimeout: 750,
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.EFFECT + 'level_up.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'VO_did_you2.mp3'
	            })
	        ), React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            ref: 'try-again',
	            complete: true,
	            src: CMWN.MEDIA.VO + 'VO_try_again.mp3'
	        })],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            completeTarget: 'sfx',
	            ref: 'print',
	            src: CMWN.MEDIA.EFFECT + 'print_item.mp3',
	            sprite: [0, 500]
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	            }),
	            React.createElement(
	                'h3',
	                null,
	                'LEVEL UP'
	            ),
	            React.createElement(
	                'h4',
	                null,
	                'Did You Know?'
	            ),
	            React.createElement(
	                'div',
	                null,
	                'MakerBot Factory in',
	                React.createElement('br', null),
	                'Brooklyn, New York uses 3D printers',
	                React.createElement('br', null),
	                'to print even more 3D printers!'
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'minion',
	                src: CMWN.MEDIA.IMAGE + 'try.again.minion.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.FRAME + 'try.again.frame.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.nav.png'
	            }),
	            React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    'TRY AGAIN'
	                ),
	                'You didn\'t win this time —',
	                React.createElement('br', null),
	                'but don\'t worry, you have another chance!'
	            )
	        )]
	    });
	};
	
	var _sort_game_screen_component = __webpack_require__(14);
	
	var _sort_game_screen_component2 = _interopRequireDefault(_sort_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _sort_game_screen_component2.default)(props, ref, key, {
	        id: 'sort-game-level-one',
	        timeout: 60000,
	        prepTimeout: 500,
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.EFFECT + 'level_up.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'VO_did_you3.mp3'
	            })
	        ), React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            ref: 'try-again',
	            complete: true,
	            src: CMWN.MEDIA.VO + 'VO_try_again.mp3'
	        })],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            completeTarget: 'sfx',
	            ref: 'print',
	            src: CMWN.MEDIA.EFFECT + 'print_item.mp3',
	            sprite: [0, 500]
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	            }),
	            React.createElement(
	                'h3',
	                null,
	                'LEVEL UP'
	            ),
	            React.createElement(
	                'h4',
	                null,
	                'Did You Know?'
	            ),
	            React.createElement(
	                'div',
	                null,
	                '3D printing can be better',
	                React.createElement('br', null),
	                'for the environment than standard',
	                React.createElement('br', null),
	                'manufacturing, because there is',
	                React.createElement('br', null),
	                'much less waste!'
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'minion',
	                src: CMWN.MEDIA.IMAGE + 'try.again.minion.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.FRAME + 'try.again.frame.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.SPRITE + 'sprite.nav.png'
	            }),
	            React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    'TRY AGAIN'
	                ),
	                'You didn\'t win this time —',
	                React.createElement('br', null),
	                'but don\'t worry, you have another chance!'
	            )
	        )]
	    });
	};
	
	var _sort_game_screen_component = __webpack_require__(14);
	
	var _sort_game_screen_component2 = _interopRequireDefault(_sort_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 22 */
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
	            id: "congratulations"
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'VO_Congratulations.mp3'
	        }),
	        React.createElement(
	            "div",
	            null,
	            "CONGRATULATIONS!"
	        ),
	        React.createElement(
	            "div",
	            null,
	            "YOU\u2019VE"
	        ),
	        React.createElement(
	            "div",
	            null,
	            "WON"
	        ),
	        React.createElement(
	            "div",
	            null,
	            "THE"
	        ),
	        React.createElement(
	            "div",
	            null,
	            "GAME"
	        )
	    );
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var jobs = ['designer', 'architect', 'surgeon', 'engineer', 'dentist', 'artist'];
	
	    var nextPhoto = function nextPhoto() {
	        skoash.trigger('updateState', {
	            path: 'selectable',
	            data: {
	                select: jobs[(jobs.indexOf(_.get(props, 'data.selectable.target.props.data-ref')) + 1) % jobs.length]
	            }
	        });
	    };
	
	    var onClose = function onClose() {
	        skoash.trigger('updateState', {
	            path: 'selectable',
	            data: {
	                target: null
	            }
	        });
	        skoash.trigger('updateState', {
	            path: 'reveal',
	            data: {
	                open: null
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'help-the-world'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.realworldgallery.png'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'ThereAreMany.mp3',
	                completeTarget: 'many',
	                volume: 4,
	                maxVolume: 4
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'VO_and_many.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open')
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: jobs[0],
	                src: CMWN.MEDIA.VO + 'VO_Product_Designers.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: jobs[1],
	                src: CMWN.MEDIA.VO + 'VO_Architects.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: jobs[2],
	                src: CMWN.MEDIA.VO + 'VO_Surgeons.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: jobs[3],
	                src: CMWN.MEDIA.VO + 'VO_Engineers.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: jobs[4],
	                src: CMWN.MEDIA.VO + 'VO_Dentists.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: jobs[5],
	                src: CMWN.MEDIA.VO + 'VO_Artists.mp3'
	            })
	        ),
	        React.createElement(
	            'div',
	            { className: 'header' },
	            React.createElement(
	                'p',
	                { className: (0, _classnames2.default)({ show: !_.get(props, 'data.many.complete') }) },
	                'There are many things',
	                React.createElement('br', null),
	                'you can create',
	                React.createElement('br', null),
	                'with your 3D printer...'
	            ),
	            React.createElement(
	                'p',
	                { className: (0, _classnames2.default)({ show: _.get(props, 'data.many.complete') }) },
	                '\u2026and many ways to help the world',
	                React.createElement('br', null),
	                'with the wonderful things you create!',
	                React.createElement('br', null),
	                'Click on the image to expand.'
	            )
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: 'selectable',
	            selectClass: 'HIGHLIGHTED',
	            select: _.get(props, 'data.selectable.select'),
	            list: [React.createElement(skoash.Component, {
	                type: 'li',
	                'data-ref': jobs[0]
	            }), React.createElement(skoash.Component, {
	                type: 'li',
	                'data-ref': jobs[1]
	            }), React.createElement(skoash.Component, {
	                type: 'li',
	                'data-ref': jobs[2]
	            }), React.createElement(skoash.Component, {
	                type: 'li',
	                'data-ref': jobs[3]
	            }), React.createElement(skoash.Component, {
	                type: 'li',
	                'data-ref': jobs[4]
	            }), React.createElement(skoash.Component, {
	                type: 'li',
	                'data-ref': jobs[5]
	            })]
	        }),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.selectable.target.props.data-ref'),
	            onClose: onClose,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': jobs[0]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Product designers'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'design and print useful objects for others!'
	                ),
	                React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': jobs[1]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Architects'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'create plans for housing that will',
	                    React.createElement('br', null),
	                    'be 3D printed!'
	                ),
	                React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': jobs[2]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Surgeon'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'turn x-rays into 3D models',
	                    React.createElement('br', null),
	                    'and repair injured body parts!'
	                ),
	                React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': jobs[3]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Engineers'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'make 3D models of your creations,',
	                    React.createElement('br', null),
	                    'and then print the real thing!'
	                ),
	                React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': jobs[4]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Dentists'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'print replacement teeth for your patients!'
	                ),
	                React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': jobs[5]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Artists'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'express themselves through the magic',
	                    React.createElement('br', null),
	                    'of 3D printing!'
	                ),
	                React.createElement('button', { className: 'next-photo', onClick: nextPhoto })
	            )]
	        })
	    );
	};
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);

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
	            id: "bunch-of-problems"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'VO_coming_up.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'sprite.closeupminion.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "balloon",
	            src: CMWN.MEDIA.IMAGE + 'img.speechballoon.up.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "words" },
	            React.createElement(
	                "div",
	                null,
	                "Coming up are a"
	            ),
	            React.createElement(
	                "div",
	                null,
	                "bunch of problems"
	            ),
	            React.createElement(
	                "div",
	                null,
	                "that need a 3D printer"
	            ),
	            React.createElement(
	                "div",
	                null,
	                "to solve!"
	            )
	        )
	    );
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onStart;
	    var startGame;
	    var closeReveal;
	    var onCorrect;
	    var onPrinted;
	    var reset;
	    var onTransitionEnd;
	
	    onStart = function onStart() {
	        _.each(this.refs.bottom.refs.slider.refs, function (slide) {
	            _.each(slide.refs, function (draggable) {
	                draggable.markIncorrect();
	            });
	        });
	    };
	
	    startGame = function startGame() {
	        skoash.trigger('updateState', {
	            path: 'reveal',
	            data: {
	                open: 'drag-it-here'
	            }
	        });
	    };
	
	    closeReveal = function closeReveal() {
	        skoash.trigger('updateState', {
	            path: 'reveal',
	            data: {
	                close: true
	            }
	        });
	
	        if (_.get(props, 'data.setTarget', 0) > 4) {
	            skoash.trigger('goto', {
	                index: parseInt(props.index, 10) + 1
	            });
	        }
	    };
	
	    onCorrect = function onCorrect(dropped) {
	        skoash.trigger('updateState', {
	            path: 'printed',
	            data: dropped
	        });
	        skoash.trigger('updateState', {
	            path: 'sfx',
	            data: {
	                playing: 'print'
	            }
	        });
	    };
	
	    onPrinted = function onPrinted() {
	        var dropped = _.get(props, 'data.printed');
	
	        if (dropped.props.message === _.get(props, 'data.target.object.props.name')) {
	            dropped.markCorrect();
	            skoash.trigger('updateState', {
	                path: 'transition',
	                data: true
	            });
	        } else {
	            dropped.markIncorrect();
	            reset();
	            skoash.trigger('updateState', {
	                path: 'sfx',
	                data: {
	                    playing: 'incorrect'
	                }
	            });
	            skoash.trigger('updateState', {
	                path: 'reveal',
	                data: {
	                    open: 'try-again'
	                }
	            });
	        }
	    };
	
	    reset = function reset() {
	        _.each(['printed', 'transition', 'layer1', 'layer2', 'layer3'], function (v) {
	            skoash.trigger('updateState', {
	                path: v,
	                data: false
	            });
	        });
	    };
	
	    onTransitionEnd = function onTransitionEnd() {
	        if (!_.get(props, 'data.transition')) return;
	        skoash.trigger('updateState', {
	            path: 'sfx',
	            data: {
	                playing: 'correct'
	            }
	        });
	        skoash.trigger('updateState', {
	            path: 'reveal',
	            data: {
	                open: _.get(props, 'data.printed.props.message')
	            }
	        });
	        if (_.get(props, 'data.setTarget', 0) < 4) reset();
	        skoash.trigger('updateState', {
	            path: 'setTarget',
	            data: _.get(props, 'data.setTarget', 0) + 1
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'printer',
	            onStart: onStart
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.game2.carouselarrow.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.game2.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'img.printer.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'img.leftbox.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.game2.brokenobj.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'img.winframe.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'img.popup.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'bkg.3.jpg'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'img.sparkle.png'
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.sfx.playing')
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                {
	                    ref: 'print',
	                    silentOnStart: true
	                },
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    playTarget: 'layer1',
	                    src: CMWN.MEDIA.EFFECT + 'Printing.mp3',
	                    sprite: [0, 1700]
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    playTarget: 'layer2',
	                    src: CMWN.MEDIA.EFFECT + 'Printing.mp3',
	                    sprite: [0, 1700]
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    playTarget: 'layer3',
	                    src: CMWN.MEDIA.EFFECT + 'Printing.mp3',
	                    onComplete: onPrinted,
	                    sprite: [0, 1700]
	                })
	            ),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                ref: 'correct',
	                src: CMWN.MEDIA.EFFECT + 'Correct2.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                ref: 'incorrect',
	                complete: true,
	                src: CMWN.MEDIA.EFFECT + 'Incorrect2.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open')
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'instructions',
	                src: CMWN.MEDIA.VO + 'VO_drag_item.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: targets[0],
	                src: CMWN.MEDIA.VO + 'VO_level1_great.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: targets[1],
	                src: CMWN.MEDIA.VO + 'VO_level2_amazing.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: targets[2],
	                src: CMWN.MEDIA.VO + 'VO_level3_excellent.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: targets[3],
	                src: CMWN.MEDIA.VO + 'VO_level4_one_more.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: targets[4],
	                src: CMWN.MEDIA.VO + 'VO_level5_wizard.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'targets' },
	            React.createElement(
	                'div',
	                null,
	                'What ',
	                React.createElement(
	                    'span',
	                    null,
	                    'ITEM'
	                ),
	                ' can',
	                React.createElement('br', null),
	                'solve this problem?'
	            ),
	            React.createElement(_3.default, {
	                setTarget: _.get(props, 'data.setTarget', 0),
	                checkComplete: false,
	                complete: _.get(props, 'data.setTarget', 0) > 4,
	                targets: [React.createElement(skoash.Component, { name: targets[0] }), React.createElement(skoash.Component, { name: targets[1] }), React.createElement(skoash.Component, { name: targets[2] }), React.createElement(skoash.Component, { name: targets[3] }), React.createElement(skoash.Component, { name: targets[4] })]
	            })
	        ),
	        React.createElement(_5.default, {
	            dropped: _.get(props, 'data.draggable.dropped'),
	            dropzones: [React.createElement(skoash.Component, {
	                answers: objects,
	                className: (0, _classnames2.default)(_.get(props, 'data.printed.props.message'), {
	                    transition: _.get(props, 'data.transition'),
	                    layer1: _.get(props, 'data.layer1.playing'),
	                    layer2: _.get(props, 'data.layer2.playing'),
	                    layer3: _.get(props, 'data.layer3.playing')
	                }),
	                onTransitionEnd: onTransitionEnd
	            })],
	            onCorrect: onCorrect
	        }),
	        React.createElement(
	            skoash.Component,
	            { ref: 'bottom', className: 'bottom' },
	            React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'span',
	                    null,
	                    'DRAG AND DROP'
	                ),
	                ' the item onto the printer above'
	            ),
	            React.createElement(
	                skoash.Slider,
	                { ref: 'slider' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[0]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[1]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[2]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[3]
	                    })
	                ),
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[4]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[5]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[6]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[7]
	                    })
	                ),
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[8]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[9]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[10]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[11]
	                    })
	                ),
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[12]
	                    }),
	                    React.createElement(_7.default, {
	                        returnOnIncorrect: true,
	                        stayOnCorrect: false,
	                        message: objects[13]
	                    })
	                )
	            )
	        ),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open'),
	            closeReveal: _.get(props, 'data.reveal.close'),
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': 'instructions'
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'Instructions'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'span',
	                        null,
	                        'DRAG'
	                    ),
	                    ' the item onto the',
	                    React.createElement('br', null),
	                    '3D printer that is the solution',
	                    React.createElement('br', null),
	                    'for each situation.'
	                ),
	                React.createElement('button', { onClick: startGame })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': 'drag-it-here',
	                    onClick: closeReveal
	                },
	                React.createElement(
	                    'div',
	                    null,
	                    'Drag it here.',
	                    React.createElement('br', null),
	                    'Press anywhere on the screen',
	                    React.createElement('br', null),
	                    'to continue.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    ref: targets[0]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'GREAT JOB!'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'Let\u2019s see if you can',
	                    React.createElement('br', null),
	                    'figure out this next one!'
	                ),
	                React.createElement('button', { onClick: closeReveal })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    ref: targets[1]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'YOU HAVE AMAZING',
	                    React.createElement('br', null),
	                    'PROBLEM-SOLVING',
	                    React.createElement('br', null),
	                    'SKILLS!'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'But this one might be harder\u2026'
	                ),
	                React.createElement('button', { onClick: closeReveal })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    ref: targets[2]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'EXCELLENT',
	                    React.createElement('br', null),
	                    'WORK!'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'Can you solve this next one?'
	                ),
	                React.createElement('button', { onClick: closeReveal })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    ref: targets[3]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'YOU\u2019VE DONE',
	                    React.createElement('br', null),
	                    'IT AGAIN!'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'Just one more to go!'
	                ),
	                React.createElement('button', { onClick: closeReveal })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    ref: targets[4]
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'YOU\u2019RE A',
	                    React.createElement('br', null),
	                    '3D PRINTING',
	                    React.createElement('br', null),
	                    'WIZARD'
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'and have solved all the problems!',
	                    React.createElement('br', null),
	                    'Thanks for playing!'
	                ),
	                React.createElement('button', { onClick: closeReveal })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    type: 'li',
	                    'data-ref': 'try-again'
	                },
	                React.createElement(
	                    'h3',
	                    null,
	                    'TRY',
	                    React.createElement('br', null),
	                    'AGAIN'
	                ),
	                React.createElement('button', { onClick: closeReveal })
	            )]
	        })
	    );
	};
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(26);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(27);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(28);
	
	var _7 = _interopRequireDefault(_6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var objects = ['umbrella', 'glasses', 'tire', 'shovel', 'link', 'bucket', 'boots', 'gloves', 'whistle', 'cup', 'phone', 'piece', 'tooth', 'ball'];
	
	var targets = ['tire', 'link', 'cup', 'phone', 'tooth'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Target = function (_skoash$Component) {
	    _inherits(Target, _skoash$Component);
	
	    function Target() {
	        _classCallCheck(this, Target);
	
	        return _possibleConstructorReturn(this, (Target.__proto__ || Object.getPrototypeOf(Target)).call(this));
	    }
	
	    _createClass(Target, [{
	        key: 'start',
	        value: function start() {
	            _get(Target.prototype.__proto__ || Object.getPrototypeOf(Target.prototype), 'start', this).call(this);
	            this.setTarget();
	        }
	    }, {
	        key: 'setTarget',
	        value: function setTarget() {
	            var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	            if (this.props.loop) idx = idx % this.props.targets.length;
	            if (idx >= this.props.targets.length) return;
	
	            this.updateGameState({
	                path: this.props.dataTarget,
	                data: {
	                    object: this.props.targets[idx]
	                }
	            });
	
	            this.props.onSetTarget.call(this);
	
	            this.setState({
	                idx: idx,
	                target: this.props.targets[idx]
	            });
	        }
	    }, {
	        key: 'nextTarget',
	        value: function nextTarget() {
	            this.setTarget(this.state.idx + 1);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Target.prototype.__proto__ || Object.getPrototypeOf(Target.prototype), 'componentWillReceiveProps', this).call(this, props);
	
	            if (_.isFinite(props.setTarget) && props.setTarget !== this.props.setTarget) {
	                this.setTarget(props.setTarget);
	            }
	
	            if (props.nextTarget && props.nextTarget !== this.props.nextTarget) {
	                this.nextTarget();
	            }
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('target', _get(Target.prototype.__proto__ || Object.getPrototypeOf(Target.prototype), 'getClassNames', this).call(this), _.get(this.state, 'target.props.name'));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                this.renderContentList('targets')
	            );
	        }
	    }]);
	
	    return Target;
	}(skoash.Component);
	
	Target.defaultProps = _.defaults({
	    targets: [React.createElement(skoash.Component, { target: '1' })],
	    dataTarget: 'target',
	    onUpdateState: _.noop,
	    onSetTarget: _.noop,
	    loop: false
	}, skoash.Component.defaultProps);
	
	exports.default = Target;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(9);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(9);
	
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
/* 29 */
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
	            id: "now-that-you-learned"
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'sprite.nav.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'VO_make_a.mp3'
	        }),
	        React.createElement(
	            "div",
	            null,
	            "Now that you\u2019ve learned",
	            React.createElement("br", null),
	            "so much about ",
	            React.createElement(
	                "span",
	                null,
	                "3D PRINTING"
	            ),
	            React.createElement("br", null),
	            "and what it can do, it\u2019s time to make",
	            React.createElement("br", null),
	            "a list of what YOU would like to print!"
	        )
	    );
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onDrag;
	    var testComplete;
	
	    onDrag = function onDrag() {
	        this.setState({
	            correct: false,
	            return: false
	        });
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'drag'
	            }
	        });
	    };
	
	    testComplete = function testComplete() {
	        if (this.refs['dropzone-0'].contains.length) this.complete();else this.incomplete();
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'list'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.minion.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'img.notepad.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'sprite.game3.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'img.greenarrows.png'
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.VO + 'VO_drag_and.mp3'
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.sfx.playing')
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'drag',
	                type: 'sfx',
	                completeTarget: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'Drag.mp3'
	            })
	        ),
	        React.createElement(skoash.Repeater, {
	            className: 'draggables',
	            amount: 13,
	            item: React.createElement(_3.default, {
	                'return': true,
	                returnOnIncorrect: true,
	                onDrag: onDrag
	            }),
	            props: [{ message: 'shoe' }, { message: 'lego' }, { message: 'dice' }, { message: 'ball' }, { message: 'crown' }, { message: 'bunny' }, { message: 'chess' }, { message: 'helmet' }, { message: 'bowling' }, { message: 'cup' }, { message: 'controller' }, { message: 'headphones' }, { message: 'guitar' }]
	        }),
	        React.createElement(
	            'div',
	            { className: 'arrows' },
	            React.createElement('div', null),
	            React.createElement('div', null),
	            React.createElement('div', null)
	        ),
	        React.createElement(_5.default, {
	            checkComplete: false,
	            onDrag: testComplete,
	            onCorrect: testComplete,
	            dropped: _.get(props, 'data.draggable.dropped'),
	            dragging: _.get(props, 'data.draggable.dragging'),
	            dropzones: [React.createElement(
	                skoash.Component,
	                null,
	                React.createElement(
	                    'span',
	                    null,
	                    'LIST OF ITEMS'
	                )
	            )]
	        }),
	        React.createElement(
	            'div',
	            { className: 'words' },
	            React.createElement(
	                'span',
	                null,
	                'Drag and Drop'
	            ),
	            React.createElement('br', null),
	            'the items to the list above.',
	            React.createElement('br', null),
	            'Choose as many as you like.'
	        )
	    );
	};
	
	var _2 = __webpack_require__(28);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(27);
	
	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onTransitionEnd;
	
	    onTransitionEnd = function onTransitionEnd() {
	        if (!_.get(props, 'data.layer2.complete')) return;
	        skoash.trigger('updateState', {
	            path: 'flip',
	            data: {
	                complete: true
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'flip',
	            emitOnComplete: {
	                name: 'flip'
	            }
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'VO_Flip.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'Printing.mp3',
	                playTarget: 'layer1',
	                sprite: [0, 1900]
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'Printing.mp3',
	                playTarget: 'layer2',
	                completeTarget: 'layer2',
	                sprite: [1900, 1900]
	            })
	        ),
	        React.createElement(skoash.Image, {
	            className: 'printer',
	            src: CMWN.MEDIA.IMAGE + 'img.flip.printer.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: (0, _classnames2.default)('earned-flip', {
	                show: _.get(props, 'data.flip.complete')
	            }),
	            src: MEDIA.BASE + 'Flips/3D%20world/3DW%20-%20Animated%20Earned%20Flip/3DW.AnimatedEarnedFliploop.gif'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: MEDIA.BASE + 'Flips/3D%20world/3DW-%20Static%20Image%20Flip/3DW.EarnedFlip.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'minion',
	            src: CMWN.MEDIA.IMAGE + 'img.flip.minion.png'
	        }),
	        React.createElement(skoash.Component, {
	            checkComplete: false,
	            complete: _.get(props, 'data.flip.complete'),
	            className: (0, _classnames2.default)('static-flip', {
	                layer1: _.get(props, 'data.layer1.playing'),
	                layer2: _.get(props, 'data.layer2.playing') || _.get(props, 'data.layer2.complete'),
	                move: _.get(props, 'data.layer2.complete'),
	                hide: _.get(props, 'data.flip.complete')
	            }),
	            onTransitionEnd: onTransitionEnd
	        }),
	        React.createElement(
	            'p',
	            { className: 'now' },
	            'Now you\u2019ve learned about ',
	            React.createElement(
	                'span',
	                null,
	                '3D PRINTING'
	            ),
	            React.createElement(
	                'span',
	                null,
	                '\u2026'
	            )
	        ),
	        React.createElement(
	            'p',
	            { className: 'lets' },
	            'Let\u2019s print you out',
	            React.createElement('br', null),
	            'a new ',
	            React.createElement(
	                'span',
	                null,
	                'FLIP'
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 32 */
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