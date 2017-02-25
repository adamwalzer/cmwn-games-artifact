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
/******/ 	var hotCurrentHash = "16264eb81f6be18e7276"; // eslint-disable-line no-unused-vars
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
	
	var _you_feel_screen = __webpack_require__(9);
	
	var _you_feel_screen2 = _interopRequireDefault(_you_feel_screen);
	
	var _water_pollution_screen = __webpack_require__(13);
	
	var _water_pollution_screen2 = _interopRequireDefault(_water_pollution_screen);
	
	var _healthy_water_screen = __webpack_require__(14);
	
	var _healthy_water_screen2 = _interopRequireDefault(_healthy_water_screen);
	
	var _clean_water_screen = __webpack_require__(15);
	
	var _clean_water_screen2 = _interopRequireDefault(_clean_water_screen);
	
	var _bubble_up_screen = __webpack_require__(16);
	
	var _bubble_up_screen2 = _interopRequireDefault(_bubble_up_screen);
	
	var _multi_bubbles_screen = __webpack_require__(17);
	
	var _multi_bubbles_screen2 = _interopRequireDefault(_multi_bubbles_screen);
	
	var _pollutes_water_screen = __webpack_require__(19);
	
	var _pollutes_water_screen2 = _interopRequireDefault(_pollutes_water_screen);
	
	var _trash_screen = __webpack_require__(20);
	
	var _trash_screen2 = _interopRequireDefault(_trash_screen);
	
	var _flip_screen = __webpack_require__(24);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _5 = __webpack_require__(25);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	ENVIRONMENT.MEDIA_GAME = ENVIRONMENT.MEDIA + 'Games/HappyFishFace/';
	
	// TODO: need BKG3 audio on media server AIM 12/15/16
	
	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    screens: {
	        0: _4.default,
	        1: _title_screen2.default,
	        2: _you_feel_screen2.default,
	        3: _water_pollution_screen2.default,
	        4: _healthy_water_screen2.default,
	        5: _clean_water_screen2.default,
	        6: _bubble_up_screen2.default,
	        7: _multi_bubbles_screen2.default,
	        8: _pollutes_water_screen2.default,
	        9: _trash_screen2.default,
	        10: _flip_screen2.default
	    },
	    menus: {
	        quit: _6.default
	    },
	    getBackgroundIndex: function getBackgroundIndex(index) {
	        if (index === 0) return;
	        if (index < 6) return 0;
	        if (index < 9) return 1;
	        return 2;
	    },
	    loader: React.createElement(_2.default, null),
	    assets: [React.createElement(skoash.Audio, { ref: 'bkg-1', type: 'background', src: 'media/_audio/_BKG/HFF_SX_BKG_1.mp3', loop: true }), React.createElement(skoash.Audio, {
	        ref: 'bkg-2',
	        type: 'background',
	        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/BKG1.mp3', loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-3',
	        type: 'background',
	        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/BKG2.mp3', loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'button',
	        type: 'sfx',
	        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/NextClick.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'screen-complete',
	        type: 'sfx',
	        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/NextAppear.mp3'
	    }), React.createElement(skoash.Image, {
	        ref: 'multibubbles-hidden',
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA_GAME + 'SpritesAnimations/IMG_7.1.png'
	    }), React.createElement(skoash.Image, {
	        ref: 'pollutants-hidden',
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA_GAME + 'SpritesAnimations/sprite.pollutant.png'
	    }), React.createElement(skoash.Image, {
	        ref: 'nonpollutants-hidden',
	        className: 'hidden',
	        src: ENVIRONMENT.MEDIA_GAME + 'SpritesAnimations/sprite.nonpollutant.png'
	    }), React.createElement('div', { className: 'background garbage' })],
	    getClassNames: function getClassNames() {
	        var index = this.state.currentScreenIndex;
	        if (index > 1 && index < 6) {
	            return 'garbage';
	        }
	    }
	}));

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "happy-fish-face",
		"version": 2,
		"skoash": "1.0.5",
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
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "title",
	            className: "screen",
	            checkComplete: false,
	            completeDelay: 2000,
	            completeOnStart: true
	        }),
	        React.createElement(skoash.Image, { ref: "background", className: "fish animated", src: "media/_images/_title/img_1.1.png" }),
	        React.createElement(skoash.Image, { ref: "title", className: "title animated", src: "media/_images/_title/img_1.2.png" }),
	        React.createElement(_2.default, { ref: "bubbles", className: "bubbles", amount: 14 })
	    );
	};
	
	var _ = __webpack_require__(8);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 8 */
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
	
	var Repeater = function (_skoash$Component) {
	    _inherits(Repeater, _skoash$Component);
	
	    function Repeater() {
	        _classCallCheck(this, Repeater);
	
	        return _possibleConstructorReturn(this, (Repeater.__proto__ || Object.getPrototypeOf(Repeater)).apply(this, arguments));
	    }
	
	    _createClass(Repeater, [{
	        key: 'renderContentList',
	        value: function renderContentList() {
	            var a = [];
	            for (var i = 0; i < this.props.amount; i++) {
	                a.push(React.createElement(this.props.item, _extends({ key: i }, this.props.props[i])));
	            }
	            return a;
	        }
	    }]);
	
	    return Repeater;
	}(skoash.Component);
	
	Repeater.defaultProps = _.defaults({
	    amount: 1,
	    item: 'div',
	    props: []
	}, skoash.Component.defaultProps);
	
	exports.default = Repeater;

/***/ },
/* 9 */
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
	            id: 'you-feel'
	        }),
	        React.createElement(skoash.Audio, { ref: 'vo', type: 'voiceOver',
	            src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/YouFeel.mp3'
	        }),
	        React.createElement(
	            _5.default,
	            {
	                play: _.get(props, 'data.media.play', null),
	                complete: _.get(props, 'data.media.complete', false),
	                onPlay: completeMC
	            },
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/LeftEmoji.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/CenterEmoji.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/RightEmoji.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { ref: 'center', className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { ref: 'group', className: 'group' },
	                React.createElement(
	                    skoash.Component,
	                    { ref: 'frame', className: 'frame', 'pl-bg': true },
	                    React.createElement(skoash.Image, { ref: 'title',
	                        src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/img_2.1.png'
	                    }),
	                    React.createElement(_3.default, {
	                        ref: 'selectable',
	                        onSelect: playAudio,
	                        chooseOne: true,
	                        list: [React.createElement(skoash.ListItem, { select: true, className: 'animated img-0' }), React.createElement(skoash.ListItem, { select: true, className: 'animated img-1' }), React.createElement(skoash.ListItem, { select: true, className: 'animated img-2' })]
	                    })
	                )
	            )
	        )
	    );
	};
	
	var _2 = __webpack_require__(10);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(12);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var playAudio = function playAudio(ref) {
	    this.updateGameState({
	        path: 'media',
	        data: {
	            play: 'children-' + ref
	        }
	    });
	};
	
	var completeMC = function completeMC() {
	    var self = this;
	    setTimeout(function () {
	        self.updateGameState({
	            path: 'media',
	            data: {
	                complete: true
	            }
	        });
	    }, 2000);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(11);
	
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
	
	    function Selectable(props) {
	        _classCallCheck(this, Selectable);
	
	        var _this = _possibleConstructorReturn(this, (Selectable.__proto__ || Object.getPrototypeOf(Selectable)).call(this, props));
	
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
	
	            var list = this.props.list || this.state.list || [];
	            return _.map(list, function (li, key) {
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
	    selectClass: 'SELECTED',
	    completeListOnClick: true,
	    selectRespond: _.noop,
	    onSelect: _.noop
	}, skoash.Component.defaultProps);
	
	exports.default = Selectable;

/***/ },
/* 11 */
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
	            id: "water-pollution"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: ENVIRONMENT.MEDIA_GAME + "SoundAssets/vos/WaterPollution.mp3"
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "center" },
	            React.createElement(
	                skoash.Component,
	                { className: "group" },
	                React.createElement(
	                    skoash.Component,
	                    { className: "frame", "pl-bg": true },
	                    React.createElement(skoash.Image, {
	                        className: "words",
	                        src: ENVIRONMENT.MEDIA_GAME + "ImageAssets/img_3.1.png"
	                    }),
	                    React.createElement(skoash.Image, {
	                        className: "fish",
	                        src: ENVIRONMENT.MEDIA_GAME + "ImageAssets/img_3.2.png"
	                    })
	                ),
	                React.createElement(_2.default, { className: "bubbles", amount: 14 })
	            )
	        )
	    );
	};
	
	var _ = __webpack_require__(8);
	
	var _2 = _interopRequireDefault(_);

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
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'healthy-water'
	        }),
	        React.createElement(skoash.Audio, {
	            ref: 'vo',
	            type: 'voiceOver',
	            src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/HealthyWater.mp3'
	        }),
	        React.createElement(
	            _5.default,
	            {
	                play: _.get(props, 'data.media.play', null)
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'wrong',
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Wrong.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'right',
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Right.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { ref: 'center', className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { ref: 'group', className: 'group' },
	                React.createElement(
	                    skoash.Component,
	                    { ref: 'frame', className: 'frame' },
	                    React.createElement(skoash.Image, {
	                        ref: 'words',
	                        className: 'words',
	                        src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/img_4.1.png'
	                    }),
	                    React.createElement(_3.default, {
	                        ref: 'selectable',
	                        onSelect: playAudio,
	                        list: [React.createElement(skoash.ListItem, { 'data-ref': 'wrong', className: 'animated' }), React.createElement(skoash.ListItem, { 'data-ref': 'right', className: 'animated', correct: true })]
	                    })
	                )
	            )
	        )
	    );
	};
	
	var _2 = __webpack_require__(10);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(12);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var playAudio = function playAudio(ref) {
	    this.updateGameState({
	        path: 'media',
	        data: {
	            play: ref
	        }
	    });
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
	            id: "clean-water"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: ENVIRONMENT.MEDIA_GAME + "SoundAssets/vos/CleanWater.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { ref: "center", className: "center" },
	            React.createElement(
	                skoash.Component,
	                { ref: "group", className: "group" },
	                React.createElement(
	                    skoash.Component,
	                    { ref: "frame", className: "frame", "pl-bg": true },
	                    React.createElement(
	                        "p",
	                        null,
	                        "And clean water is",
	                        React.createElement("br", null),
	                        " important for",
	                        React.createElement("br", null),
	                        " humans too!"
	                    ),
	                    React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + "ImageAssets/img_5.1.png" })
	                )
	            )
	        )
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
	            id: "bubble-up"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: "media-sequence" },
	            React.createElement(skoash.Audio, {
	                ref: "vo-1",
	                type: "voiceOver",
	                src: ENVIRONMENT.MEDIA_GAME + "SoundAssets/vos/BubbleUP.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                ref: "vo-2",
	                type: "voiceOver",
	                src: ENVIRONMENT.MEDIA_GAME + "SoundAssets/vos/Answer.mp3"
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "center" },
	            React.createElement(
	                skoash.Component,
	                { className: "group" },
	                React.createElement(
	                    skoash.Component,
	                    { ref: "frame", className: "frame" },
	                    React.createElement(
	                        skoash.Component,
	                        { ref: "center", className: "center" },
	                        React.createElement(
	                            skoash.Component,
	                            null,
	                            React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + "ImageAssets/img_6.1.png" }),
	                            React.createElement(
	                                "p",
	                                null,
	                                "Answer the question by",
	                                React.createElement("br", null),
	                                " popping the correct bubbles."
	                            )
	                        )
	                    )
	                )
	            )
	        )
	    );
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onSelect = function onSelect(r, isCorrect) {
	        var correct = _.get(props, 'data.score.correct', 0);
	        var incorrect = _.get(props, 'data.score.incorrect', 0);
	        var cbRef = 'dummy';
	
	        if (isCorrect) {
	            correct++;
	            cbRef = 'slide-up';
	            updateMeter.call(this, correct);
	        } else {
	            incorrect++;
	            r = 'incorrect';
	        }
	
	        playAudio.call(this, r, playAudio.bind(this, cbRef, _.noop));
	
	        this.updateGameState({
	            path: 'score',
	            data: {
	                correct: correct,
	                incorrect: incorrect
	            }
	        });
	    };
	
	    var playAudio = function playAudio(r, cb) {
	        this.updateGameState({
	            path: 'media',
	            data: {
	                play: r
	            },
	            callback: cb
	        });
	    };
	
	    var updateMeter = function updateMeter(correct) {
	        var percent = correct / CORRECT_BUBBLES * 100;
	        this.updateGameState({
	            path: 'meter',
	            data: {
	                height: percent,
	                complete: percent >= 100
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'multi-bubbles'
	        }),
	        React.createElement(skoash.Audio, {
	            ref: 'vo',
	            type: 'voiceOver',
	            src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/WhatCan.mp3'
	        }),
	        React.createElement(
	            _9.default,
	            {
	                ref: 'media-collection',
	                play: _.get(props, 'data.media.play', null)
	            },
	            React.createElement(skoash.Audio, {
	                'data-ref': 'swim',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/Swim.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'washFace',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/WashFace.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'drinkIt',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/DrinkIt.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'brushTeeth',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/BrushTeeth.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'takeShowers',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/TakeShowers.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'cleanHouse',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/CleanHouse.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'cook',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/Cook.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'growCrops',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/GrowCrops.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'laundry',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/Laundry.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'washDishes',
	                type: 'voiceOver',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/WashDishes.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'incorrect',
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Wrong.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'slide-up',
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/SwervySlideUp.mp3',
	                volume: .4
	            })
	        ),
	        React.createElement(_5.default, { className: 'bubbles', ammount: 14 }),
	        React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/IMG_7.1.png', className: 'clean-water' }),
	        React.createElement(
	            skoash.Component,
	            { className: 'meter' },
	            React.createElement(skoash.Image, {
	                src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/stroke.png',
	                className: 'stroke'
	            }),
	            React.createElement(
	                skoash.Component,
	                { className: 'fill' },
	                React.createElement(
	                    skoash.Component,
	                    { style: { 'height': _.get(props, 'data.meter.height', 0) + '%' } },
	                    React.createElement(skoash.Image, {
	                        src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/meter.fill.png'
	                    })
	                ),
	                React.createElement(
	                    skoash.Component,
	                    { style: { 'height': _.get(props, 'data.meter.height', 0) + '%' },
	                        className: (0, _classnames2.default)({ 'complete': _.get(props, 'data.meter.complete', false) })
	                    },
	                    React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/img_1.1.png' }),
	                    React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/sickfish.png' })
	                )
	            )
	        ),
	        React.createElement(_7.default, {
	            ref: 'selectable',
	            onSelect: onSelect,
	            selectClass: 'HIGHLIGHTED',
	            list: [React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'swim' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'washFace' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'drinkIt' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'playBasketball' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'brushTeeth' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'tellTime' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'takeShowers' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'cleanHouse' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'cook' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'crochet' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'growCrops' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'zipline' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'read' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'laundry' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'drive' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'washDishes' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'sleep' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'tapDance' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'flyAKite' }), React.createElement(skoash.ListItem, { select: true, 'data-ref': 'talk' })]
	        }),
	        React.createElement(_3.default, {
	            ref: 'score',
	            correct: _.get(props, 'data.score.correct', 0),
	            incorrect: _.get(props, 'data.score.incorrect', 0),
	            leadingContent: React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/IMG_7.2.png' }),
	            checkComplete: false,
	            complete: true,
	            increment: INCREMENT,
	            downIncrement: DECREMENT
	        })
	    );
	};
	
	var _classnames = __webpack_require__(11);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(18);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(8);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(10);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(12);
	
	var _9 = _interopRequireDefault(_8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var INCREMENT = 10;
	var DECREMENT = 10;
	var CORRECT_BUBBLES = 10;

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
	
	var _classnames = __webpack_require__(11);
	
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
	
	            if (props.setScore || props.correct !== this.props.correct || props.incorrect !== this.props.incorrect) {
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
	    setScore: false,
	    onUpdateScore: _.noop
	}, skoash.Component.defaultProps);
	
	exports.default = Score;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var starContainerClasses = (0, _classnames2.default)({
	        'star-1': _.get(props, 'data.star-1.playing', false),
	        'star-2': _.get(props, 'data.star-2.playing', false),
	        'star-3': _.get(props, 'data.star-3.playing', false)
	    }, 'stars-container');
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'pollutes-water'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { className: 'group' },
	                React.createElement(
	                    skoash.MediaSequence,
	                    { ref: 'media-sequence' },
	                    React.createElement(skoash.Audio, {
	                        ref: 'star-1',
	                        type: 'sfx',
	                        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Star1.mp3',
	                        playTarget: 'star-1'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        ref: 'star-2',
	                        type: 'sfx',
	                        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Star2.mp3',
	                        playTarget: 'star-2'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        ref: 'star-3',
	                        type: 'sfx',
	                        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Star3.mp3',
	                        playTarget: 'star-3'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        ref: 'vo-1',
	                        type: 'voiceOver',
	                        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/PollutesWater.mp3'
	                    }),
	                    React.createElement(skoash.Audio, {
	                        ref: 'vo-2',
	                        type: 'voiceOver',
	                        src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/Remove.mp3'
	                    })
	                ),
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame' },
	                    React.createElement(
	                        skoash.Component,
	                        { className: starContainerClasses },
	                        React.createElement('div', { className: 'stars' })
	                    ),
	                    React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/img_8.1.png' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        'In this game remove everything',
	                        React.createElement('br', null),
	                        ' that doesn\'t belong in the water.'
	                    )
	                )
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(11);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	exports.default = function (props, ref, key) {
	
	    var playAudio = function playAudio(play, playNext) {
	        var callback = playNext ? playAudio.bind(this, playNext) : _.noop;
	        this.updateGameState({
	            path: 'media',
	            data: {
	                play: play
	            },
	            callback: callback
	        });
	    };
	
	    var onSelect = function onSelect(r, isCorrect) {
	        var play = isCorrect ? 'correct' : 'incorrect';
	        playAudio.call(this, play, 'dummy');
	    };
	
	    var openReveal = function openReveal(open) {
	        var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.noop;
	
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: open
	            },
	            callback: cb
	        });
	    };
	
	    var timerAction = function timerAction(action, nextAction) {
	        var callback = nextAction ? timerAction.bind(this, nextAction) : _.noop;
	
	        this.updateGameState({
	            path: 'timer',
	            data: {
	                action: action
	            },
	            callback: callback
	        });
	    };
	
	    var selectableComplete = function selectableComplete() {
	        openReveal.call(this, GOOD_JOB, timerAction.bind(this, 'stop', 'complete'));
	    };
	
	    var timerComplete = function timerComplete() {
	        if (_.get(props, 'data.reveal.open', '') === GOOD_JOB) return;
	
	        openReveal.call(this, TRY_AGAIN);
	    };
	
	    var revealClose = function revealClose(r) {
	        var self = this;
	
	        openReveal.call(self, null);
	
	        if (r === TRY_AGAIN) {
	            timerAction.call(self, 'restart');
	            self.updateGameState({
	                path: 'selectable',
	                data: {
	                    incompleteRefs: true
	                },
	                callback: function callback() {
	                    self.updateGameState({
	                        path: 'selectable',
	                        data: {
	                            incompleteRefs: false
	                        }
	                    });
	                }
	            });
	        }
	    };
	
	    return React.createElement(
	        TrashScreenComponent,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'trash',
	            className: _.get(props, 'data.reveal.open', null) ? 'REVEAL-OPEN' : ''
	        }),
	        React.createElement(
	            _3.default,
	            {
	                ref: 'collection',
	                play: _.get(props, 'data.media.play', null)
	            },
	            React.createElement(skoash.Audio, {
	                'data-ref': 'correct',
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Right.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': 'incorrect',
	                type: 'sfx',
	                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/effects/Wrong.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { className: 'group' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'center' },
	                    React.createElement(_7.default, {
	                        ref: 'reveal',
	                        className: 'center',
	                        onClose: revealClose,
	                        openReveal: _.get(props, 'data.reveal.open', null),
	                        list: [React.createElement(
	                            skoash.Component,
	                            { type: 'li', complete: true },
	                            React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/img_10.2.png' }),
	                            React.createElement(
	                                'p',
	                                null,
	                                'You ran out of time!'
	                            )
	                        ), React.createElement(
	                            skoash.Component,
	                            { type: 'li', className: 'tryAgain' },
	                            React.createElement(skoash.Image, { src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/img_10.1.png' }),
	                            React.createElement(
	                                'p',
	                                null,
	                                'Take this offline.',
	                                React.createElement('br', null),
	                                ' Never throw the trash in the water.'
	                            )
	                        )],
	                        assets: [React.createElement(skoash.Audio, {
	                            type: 'voiceOver',
	                            src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/TryAgain.mp3',
	                            complete: true
	                        }), React.createElement(
	                            skoash.MediaSequence,
	                            { silentOnStart: true },
	                            React.createElement(skoash.Audio, {
	                                type: 'voiceOver',
	                                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/GoodJob.mp3',
	                                complete: true
	                            }),
	                            React.createElement(skoash.Audio, {
	                                type: 'voiceOver',
	                                src: ENVIRONMENT.MEDIA_GAME + 'SoundAssets/vos/NeverThrow.mp3',
	                                complete: true
	                            })
	                        )]
	                    })
	                ),
	                React.createElement(_9.default, {
	                    ref: 'timer',
	                    countDown: true,
	                    action: _.get(props, 'data.timer.action', null),
	                    timeout: 90000,
	                    leadingContent: React.createElement(skoash.Image, {
	                        src: ENVIRONMENT.MEDIA_GAME + 'ImageAssets/img_9.1.png'
	                    }),
	                    onComplete: timerComplete
	                }),
	                React.createElement(_5.default, {
	                    ref: 'selectable',
	                    selectClass: 'HIGHLIGHTED',
	                    onComplete: selectableComplete,
	                    onSelect: onSelect,
	                    incompleteRefs: _.get(props, 'data.selectable.incompleteRefs', false),
	                    list: [React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'tire' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'floss' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'shoes' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'water' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'soda' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'bottle1' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'chips' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'necklace' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'bottle2' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'bottle3' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'beaker' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'oil' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'fries' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'bottle4' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'sauce' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'lightbulb' }), React.createElement(skoash.ListItem, { correct: true, 'data-ref': 'lotion' }), React.createElement(skoash.ListItem, { 'data-ref': 'coral' }), React.createElement(skoash.ListItem, { 'data-ref': 'crab' }), React.createElement(skoash.ListItem, { 'data-ref': 'octopus' }), React.createElement(skoash.ListItem, { 'data-ref': 'shell1' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish1' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish1', className: 'duplicate' }), React.createElement(skoash.ListItem, { 'data-ref': 'seahorse' }), React.createElement(skoash.ListItem, { 'data-ref': 'turtle' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish2' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish3' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish3', className: 'duplicate' }), React.createElement(skoash.ListItem, { 'data-ref': 'jellyfish' }), React.createElement(skoash.ListItem, { 'data-ref': 'jellyfish', className: 'duplicate' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish4' }), React.createElement(skoash.ListItem, { 'data-ref': 'lobster' }), React.createElement(skoash.ListItem, { 'data-ref': 'shell2' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish5' }), React.createElement(skoash.ListItem, { 'data-ref': 'fish5', className: 'duplicate' }), React.createElement(skoash.ListItem, { 'data-ref': 'starfish' })]
	                })
	            )
	        )
	    );
	};
	
	var _2 = __webpack_require__(12);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(10);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(21);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(22);
	
	var _9 = _interopRequireDefault(_8);
	
	var _10 = __webpack_require__(23);
	
	var _11 = _interopRequireDefault(_10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TRY_AGAIN = '0';
	var GOOD_JOB = '1';
	
	var TrashScreenComponent = function (_CustomCursorScreen) {
	    _inherits(TrashScreenComponent, _CustomCursorScreen);
	
	    function TrashScreenComponent() {
	        _classCallCheck(this, TrashScreenComponent);
	
	        return _possibleConstructorReturn(this, (TrashScreenComponent.__proto__ || Object.getPrototypeOf(TrashScreenComponent)).apply(this, arguments));
	    }
	
	    _createClass(TrashScreenComponent, [{
	        key: 'start',
	        value: function start() {
	            var center;
	
	            _get(TrashScreenComponent.prototype.__proto__ || Object.getPrototypeOf(TrashScreenComponent.prototype), 'start', this).call(this);
	
	            center = this.refs['children-1'].refs['children-0'];
	            ['selectable', 'timer', 'children-0'].forEach(function (ref) {
	                center.refs[ref].incompleteRefs();
	            });
	
	            this.incomplete();
	        }
	    }]);

	    return TrashScreenComponent;
	}(_11.default);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(11);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// As of skoash 1.1.0 this component can be found at skoash.Reveal
	/* eslint-disable no-console */
	console.warn('As of skoash 1.1.0 this component can be found at skoash.Reveal');
	/* eslint-enable no-console */
	
	var Reveal = function (_skoash$Component) {
	    _inherits(Reveal, _skoash$Component);
	
	    function Reveal() {
	        _classCallCheck(this, Reveal);
	
	        var _this = _possibleConstructorReturn(this, (Reveal.__proto__ || Object.getPrototypeOf(Reveal)).call(this));
	
	        _this.state = {
	            openReveal: '',
	            currentlyOpen: []
	        };
	
	        _this.index = 0;
	        return _this;
	    }
	
	    _createClass(Reveal, [{
	        key: 'incomplete',
	        value: function incomplete() {
	            this.setState({
	                openReveal: '',
	                currentlyOpen: []
	            });
	
	            _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'incomplete', this).call(this);
	        }
	    }, {
	        key: 'open',
	        value: function open(message) {
	            var self = this;
	            var currentlyOpen = this.props.openMultiple ? this.state.currentlyOpen.concat(message) : [message];
	
	            self.setState({
	                open: true,
	                openReveal: message,
	                currentlyOpen: currentlyOpen
	            });
	
	            self.playAudio(message);
	
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
	
	            if (self.props.openTarget) {
	                self.updateGameState({
	                    path: self.props.openTarget,
	                    data: {
	                        open: '' + message,
	                        close: false
	                    }
	                });
	            }
	
	            self.props.onOpen.call(self, message);
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            var prevMessage;
	            var currentlyOpen;
	            var openReveal;
	            var open;
	
	            prevMessage = this.state.openReveal;
	            currentlyOpen = this.state.currentlyOpen;
	            currentlyOpen.splice(currentlyOpen.indexOf(prevMessage), 1);
	            open = currentlyOpen.length > 0;
	            openReveal = open ? currentlyOpen[currentlyOpen.length - 1] : '';
	
	            this.setState({
	                open: open,
	                openReveal: openReveal,
	                currentlyOpen: currentlyOpen
	            });
	
	            if (!opts.silent) this.playMedia('close-sound');
	
	            this.props.onClose.call(this, prevMessage);
	
	            if (typeof this.props.closeRespond === 'function') {
	                this.props.closeRespond(prevMessage);
	            }
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'start', this).call(this);
	            if (this.props.openOnStart != null) {
	                this.open(this.props.openOnStart);
	            } else if (this.props.start && typeof this.props.start === 'function') {
	                this.props.start.call(this);
	            } else {
	                this.close({ silent: true });
	            }
	        }
	    }, {
	        key: 'playAudio',
	        value: function playAudio(message) {
	            var _this2 = this;
	
	            var messages;
	
	            message += '';
	
	            this.playMedia('open-sound');
	
	            messages = message.split(' ');
	            messages.map(function (audio) {
	                _this2.playMedia(audio);
	            });
	        }
	    }, {
	        key: 'renderAssets',
	        value: function renderAssets() {
	            if (this.props.assets) {
	                return this.props.assets.map(function (asset, key) {
	                    var ref = asset.ref || asset.props['data-ref'] || 'asset-' + key;
	                    return React.createElement(asset.type, _extends({}, asset.props, {
	                        'data-ref': key,
	                        ref: ref,
	                        key: key
	                    }));
	                });
	            }
	
	            return null;
	        }
	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            var _this3 = this;
	
	            var list = this.props.list;
	
	            return list.map(function (li, key) {
	                var ref = li.ref || li.props['data-ref'] || key;
	                return React.createElement(li.type, _extends({}, li.props, {
	                    type: 'li',
	                    className: _this3.getClass(li, key),
	                    'data-ref': ref,
	                    ref: ref,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'componentWillReceiveProps', this).call(this, props);
	
	            if (props.openReveal != null && props.openReveal !== this.props.openReveal) {
	                this.open(props.openReveal);
	            }
	
	            if (props.closeReveal !== this.props.closeReveal) {
	                if (props.closeReveal === true) {
	                    this.close();
	                } else if (Number.isInteger(props.closeReveal)) {
	                    for (var i = 0; i < props.closeReveal; i++) {
	                        this.close();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(li, key) {
	            var classes = '';
	
	            if (li.props.className) classes = li.props.className;
	
	            if (this.state.currentlyOpen.indexOf(key) !== -1 || this.state.currentlyOpen.indexOf('' + key) !== -1 || this.state.currentlyOpen.indexOf(li.props['data-ref']) !== -1 || this.state.currentlyOpen.indexOf(li.ref) !== -1) {
	                classes = (0, _classnames2.default)(classes, 'OPEN');
	            }
	
	            return classes;
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            var classes;
	            var open = 'open-none';
	
	            if (this.state.open) {
	                open = '';
	                this.state.currentlyOpen.forEach(function (ref) {
	                    open += 'open-' + ref;
	                });
	            }
	
	            classes = (0, _classnames2.default)('reveal', open, _get(Reveal.prototype.__proto__ || Object.getPrototypeOf(Reveal.prototype), 'getClassNames', this).call(this));
	
	            return classes;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                this.renderAssets(),
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
	
	    return Reveal;
	}(skoash.Component);
	
	Reveal.defaultProps = _.defaults({
	    list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
	    openMultiple: false,
	    onOpen: _.noop,
	    onClose: _.noop
	}, skoash.Component.defaultProps);
	
	exports.default = Reveal;

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
	
	var _classnames = __webpack_require__(11);
	
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
	
	            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            props = _.defaults(props, this.props);
	            if (props.pause || !this.state.paused) return;
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
	
	            if (props.pause && props.pause !== this.props.pause) {
	                this.pause(props);
	            }
	
	            if (props.resume && props.resume !== this.props.resume) {
	                this.resume(props);
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
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CustomCursorScreen = function (_skoash$Screen) {
	    _inherits(CustomCursorScreen, _skoash$Screen);
	
	    function CustomCursorScreen() {
	        _classCallCheck(this, CustomCursorScreen);
	
	        var _this = _possibleConstructorReturn(this, (CustomCursorScreen.__proto__ || Object.getPrototypeOf(CustomCursorScreen)).call(this));
	
	        _this.state = {
	            cursorLeft: 0,
	            cursorTop: 0,
	            touchstart: false,
	            revealOpen: false
	        };
	
	        _this.zoom = 1;
	
	        _this.moveCursor = _this.moveCursor.bind(_this);
	        _this.touchstart = _this.touchstart.bind(_this);
	        _this.resize = _this.resize.bind(_this);
	        return _this;
	    }
	
	    _createClass(CustomCursorScreen, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(CustomCursorScreen.prototype.__proto__ || Object.getPrototypeOf(CustomCursorScreen.prototype), 'bootstrap', this).call(this);
	
	            window.addEventListener('mousemove', this.moveCursor);
	            window.addEventListener('touchstart', this.touchstart);
	
	            window.addEventListener('resize', this.resize);
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	            var _this2 = this;
	
	            skoash.trigger('getState').then(function (state) {
	                _this2.zoom = state.scale;
	            });
	        }
	    }, {
	        key: 'moveCursor',
	        value: function moveCursor(e) {
	            this.setState({
	                cursorLeft: e.clientX / this.zoom - 50,
	                cursorTop: e.clientY / this.zoom - 65
	            });
	        }
	    }, {
	        key: 'touchstart',
	        value: function touchstart() {
	            this.setState({
	                touchstart: true
	            });
	        }
	    }, {
	        key: 'renderCursor',
	        value: function renderCursor() {
	            var cursor;
	            var className;
	            var ref;
	            var props = [];
	            cursor = this.props.cursor;
	            className = ref = 'cursor';
	            if (cursor && cursor.props) {
	                props = cursor.props;
	                className = className + ' ' + cursor.props.className;
	                ref = cursor.ref || ref;
	            }
	            return React.createElement('div', _extends({}, props, {
	                ref: ref,
	                className: className,
	                style: {
	                    left: this.state.cursorLeft,
	                    top: this.state.cursorTop
	                }
	            }));
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                this.renderCursor(),
	                this.renderContentList()
	            );
	        }
	    }]);
	
	    return CustomCursorScreen;
	}(skoash.Screen);
	
	exports.default = CustomCursorScreen;

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
	            className: "large-frame",
	            emitOnComplete: {
	                name: 'flip'
	            }
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: ENVIRONMENT.MEDIA_GAME + "SoundAssets/vos/ThankYou.mp3",
	                completeTarget: "vo",
	                sprite: [0, 3500]
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: ENVIRONMENT.MEDIA_GAME + "SoundAssets/vos/ThankYou.mp3",
	                sprite: [3500, 2000]
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "center" },
	            React.createElement(
	                skoash.Component,
	                { className: "group" },
	                React.createElement(
	                    skoash.Component,
	                    { className: "frame", "pl-bg": true },
	                    React.createElement(skoash.Image, {
	                        className: "fish",
	                        src: ENVIRONMENT.MEDIA_GAME + "ImageAssets/img_11.1.png"
	                    }),
	                    React.createElement(
	                        skoash.Component,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "Let me say thank you",
	                            React.createElement("br", null),
	                            " for cleaning up",
	                            React.createElement("br", null),
	                            " with a new"
	                        ),
	                        React.createElement(
	                            skoash.Component,
	                            {
	                                className: 'flip-container' + (_.get(props, 'data.vo.complete', false) ? ' show' : '')
	                            },
	                            React.createElement(skoash.Image, {
	                                className: "flip",
	                                src: ENVIRONMENT.MEDIA_GAME + "ImageAssets/img_11.2.png"
	                            })
	                        )
	                    )
	                )
	            )
	        )
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