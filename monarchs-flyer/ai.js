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
/******/ 	var hotCurrentHash = "5d45810eecaaf6989939"; // eslint-disable-line no-unused-vars
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
	
	var _opts = __webpack_require__(19);
	
	var _opts2 = _interopRequireDefault(_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var opts = _opts2.default[location.search.split('v=')[1] - 1 || 0];
	
	window.game = new _2.default({
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
	    _2.default.call(this, 'image', [['sky', MEDIA.IMAGE + 'level0' + this.opts.level + '.panorama.jpg'], ['wind', MEDIA.IMAGE + 'img.wind.png'], ['water', MEDIA.IMAGE + 'img.waterdrop.png'], ['web', MEDIA.IMAGE + 'img.spiderweb.png'], ['log', MEDIA.IMAGE + 'img.log.png'], ['leaf', MEDIA.IMAGE + 'img.leaf.png'], ['egg', MEDIA.IMAGE + 'img.egg.png'], ['cloud', MEDIA.IMAGE + 'img.cloud.png']]);
	
	    _2.default.call(this, 'spritesheet', [['wood', MEDIA.SPRITE + 'sprite.logs.png', 490, 125], ['land', MEDIA.SPRITE + 'sprite.land.png', 345, 245], ['fruits', MEDIA.SPRITE + 'sprite.fruits.png', 120, 105], ['flowers', MEDIA.SPRITE + 'sprite.flowers.png', 190, 180]]);
	
	    _2.default.call(this, 'atlas', [['butterfly', MEDIA.SPRITE + 'monarchsprite.png', MEDIA.SPRITE + 'monarchsprite.json'], ['crow', MEDIA.SPRITE + 'crowflyingsprite.png', MEDIA.SPRITE + 'crowflyingsprite.json'], ['star', MEDIA.SPRITE + 'starsprite.png', MEDIA.SPRITE + 'starsprite.json']]);
	
	    _2.default.call(this, 'audio', [['egg', MEDIA.EFFECT + 'EggDrop.mp3'], ['obstacle', MEDIA.EFFECT + 'BumpObstacles.mp3'], ['bird', MEDIA.EFFECT + 'Bird.mp3'], ['flower', MEDIA.EFFECT + 'PowerFlower.mp3'], ['water', MEDIA.EFFECT + 'Drop.mp3'], ['cloud', MEDIA.EFFECT + 'Cloud.mp3'], ['wind', MEDIA.EFFECT + 'Wind.mp3'], ['star', MEDIA.EFFECT + 'StarFact.mp3'], ['speed', MEDIA.EFFECT + 'SpeedBKG.mp3']]);
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
	        width: 30000,
	        height: 740,
	        top: -200
	    });
	
	    this.helpers.makeBackground.call(this);
	
	    _5.default.call(this, {
	        left: 300,
	        top: this.game.world.height - 650,
	        image: this.opts.playerImage,
	        bounceY: 0,
	        gravityY: 0,
	        body: this.opts.playerBody,
	        rightFrames: [0, 1, 2, 3],
	        scale: this.opts.playerScale,
	        onWorldBounds: this.helpers.onWorldCollide.bind(this)
	    });
	
	    this.helpers.makeItems.call(this);
	
	    this.data = _.defaults({
	        levels: _defineProperty({}, this.opts.level, {
	            start: true,
	            score: 0,
	            hits: 0
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
	    var _player$anchor,
	        _this = this;
	
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
	
	    if (!opts.body) {
	        opts.body = [this.player.body.width, this.player.body.height, 0, 0];
	    }
	    // defer here to prevent this.player.scale from overriding body size
	    // we might want to find a better way to do this
	    setTimeout(function () {
	        _this.player.body.width = Math.abs(opts.body[0] * opts.scale[0]);
	        _this.player.body.height = Math.abs(opts.body[1] * opts.scale[1]);
	        _this.player.body.offset.x = opts.body[2];
	        _this.player.body.offset.y = opts.body[3];
	    }, 0);
	
	    if (opts.onWorldBounds) {
	        this.player.body.onWorldBounds = new Phaser.Signal();
	        this.player.body.onWorldBounds.add(opts.onWorldBounds);
	    }
	
	    //  Our two animations, walking left and right.
	    this.player.animations.add('left', opts.leftFrames, opts.leftFrameRate, opts.leftLoop);
	    this.player.animations.add('right', opts.rightFrames, opts.rightFrameRate, opts.rightLoop);
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
	    var upSpeed;
	    var rightSpeed;
	
	    if (this.controller.pause || this.data.levels[this.opts.level].complete) {
	        this.controller = { pause: true };
	        this.game.paused = true;
	        return;
	    }
	
	    _2.default.call(this, 'overlap', [[this.player, this.logs, this.helpers.onLogOverlap], [this.player, this.woods, this.helpers.onWoodOverlap], [this.player, this.lands, this.helpers.onLandOverlap], [this.player, this.winds, this.helpers.onWindOverlap], [this.player, this.waters, this.helpers.onWaterOverlap], [this.player, this.webs, this.helpers.onWebOverlap], [this.player, this.leafs, this.helpers.onLeafOverlap], [this.player, this.clouds, this.helpers.onCloudOverlap], [this.player, this.fruits, this.helpers.onFruitOverlap], [this.player, this.flowers, this.helpers.onFlowerOverlap], [this.player, this.stars, this.helpers.onStarOverlap], [this.player, this.crows, this.helpers.onCrowOverlap]]);
	
	    upSpeed = this.player.fast ? this.opts.fastUpSpeed : this.player.slow ? this.opts.slowUpSpeed : this.opts.upSpeed;
	    rightSpeed = this.player.fast ? this.opts.fastRightSpeed : this.player.slow ? this.opts.slowRightSpeed : this.opts.rightSpeed;
	
	    _4.default.call(this, {
	        upSpeed: upSpeed,
	        rightSpeed: rightSpeed,
	        gravityY: this.opts.gravityY,
	        stopFrame: this.opts.playerStopFrame
	    });
	
	    this.game.camera.x = Math.min(Math.max(this.player.body.center.x - 400, 0), this.game.world.width - 800);
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
	        rightSpeed: 150,
	        gravityY: 300,
	        stopFrame: 0
	    });
	
	    //  Reset the players velocity (movement)
	    this.player.body.velocity.x = opts.rightSpeed;
	    this.player.animations.play('right');
	
	    //  fly if up or space are being pushed
	    if (this.controller.up) {
	        this.player.body.velocity.y = opts.upSpeed;
	        if (!this.player.body.gravity.y) {
	            this.player.body.gravity.y = opts.gravityY;
	        }
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _events = __webpack_require__(15);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _make_background = __webpack_require__(17);
	
	var _make_background2 = _interopRequireDefault(_make_background);
	
	var _make_items = __webpack_require__(18);
	
	var _make_items2 = _interopRequireDefault(_make_items);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _extends({
	    emitData: function emitData() {
	        //  emit event with data to skoash game
	        this.emitEvent({
	            updateGameState: {
	                path: ['game'],
	                data: this.data
	            }
	        });
	    }
	}, _events2.default, {
	    makeBackground: _make_background2.default,
	    makeItems: _make_items2.default
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _2 = __webpack_require__(16);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    onLogOverlap: function onLogOverlap() {
	        this.helpers.hitSomething.call(this, 1, this.audio.obstacle);
	    },
	    onWoodOverlap: function onWoodOverlap() {
	        this.helpers.hitSomething.call(this, 1, this.audio.obstacle);
	    },
	    onLandOverlap: function onLandOverlap() {
	        this.helpers.hitSomething.call(this, 1, this.audio.obstacle);
	    },
	    onCrowOverlap: function onCrowOverlap() {
	        this.helpers.hitSomething.call(this, 1, this.audio.bird);
	    },
	    onWorldCollide: function onWorldCollide() {
	        this.helpers.hitSomething.call(this, 1, this.audio.obstacle);
	    },
	    hitSomething: function hitSomething() {
	        var _this = this;
	
	        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	        var audio = arguments[1];
	
	        if (this.isHit) return;
	        this.isHit = true;
	
	        setTimeout(function () {
	            _this.isHit = false;
	        }, this.opts.hitDelay);
	
	        this.data.levels[this.opts.level].hits += i;
	        this.helpers.emitData.call(this);
	        _.invoke(audio, 'play');
	    },
	    onWindOverlap: function onWindOverlap(p, i) {
	        i.kill();
	        p.fast = (p.fast || 0) + 1;
	        setTimeout(function () {
	            p.fast--;
	        }, this.opts.fastDuration);
	        this.helpers.updateScore.call(this, 3);
	        this.audio.wind.play();
	    },
	    onWaterOverlap: function onWaterOverlap(p, i) {
	        i.kill();
	        this.helpers.addLife.call(this);
	        this.audio.water.play();
	    },
	    onWebOverlap: function onWebOverlap(p, i) {
	        i.kill();
	        p.slow = true;
	        setTimeout(function () {
	            p.slow = false;
	        }, this.opts.slowDuration);
	        this.helpers.hitSomething.call(this, 2);
	    },
	    onLeafOverlap: function onLeafOverlap(p, i) {
	        if (i.laid) return;
	        i.laid = true;
	        this.audio.egg.play();
	        _3.default.call(this, {
	            group: this.opts.groups.egg, defaultOpts: this.opts.itemProps.egg
	        }, [{
	            left: i.body.x + 50,
	            top: i.body.y
	        }]);
	        this.helpers.updateScore.call(this);
	    },
	    onCloudOverlap: function onCloudOverlap() {
	        this.helpers.hitSomething.call(this);
	        this.audio.cloud.play();
	    },
	    onFruitOverlap: function onFruitOverlap(p, i) {
	        i.kill();
	        this.helpers.updateScore.call(this);
	    },
	    onFlowerOverlap: function onFlowerOverlap(p, i) {
	        i.kill();
	        this.helpers.updateScore.call(this);
	        this.audio.flower.play();
	    },
	    onStarOverlap: function onStarOverlap(p, i) {
	        i.kill();
	        this.helpers.updateScore.call(this, 2);
	        this.audio.star.play();
	    },
	    addLife: function addLife() {
	        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	        this.data.levels[this.opts.level].hits = Math.max(0, this.data.levels[this.opts.level].hits - i);
	        this.helpers.emitData.call(this);
	    },
	    updateScore: function updateScore() {
	        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	        this.data.levels[this.opts.level].score += i;
	        this.helpers.emitData.call(this);
	    }
	};

/***/ },
/* 16 */
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
	        item.frame = opts.frame;
	
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
	
	            if (!opts.body) {
	                opts.body = [item.body.width, item.body.height, 0, 0];
	            }
	            // defer here to prevent item.scale from overriding body size
	            // we might want to find a better way to do this
	            setTimeout(function () {
	                item.body.width = Math.abs(opts.body[0] * opts.scale[0]);
	                item.body.height = Math.abs(opts.body[1] * opts.scale[1]);
	                item.body.offset.x = opts.body[2] * opts.scale[0];
	                item.body.offset.y = opts.body[3] * opts.scale[1];
	            }, 0);
	        }
	    });
	};
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var locations = [];
	    for (var left = 0; left < this.game.world.width; left += 2880) {
	        locations.push({ left: left });
	    }
	
	    _2.default.call(this, {
	        group: 'sky', enableBody: false, defaultOpts: {
	            collideWorldBounds: false,
	            top: 0,
	            image: 'sky',
	            scale: [.5, .5]
	        }
	    }, locations);
	};
	
	var _ = __webpack_require__(16);
	
	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var _this = this;
	
	    var defaultProps = this.opts.itemProps;
	    var groups = this.opts.groups;
	
	    var getObjects = function getObjects() {
	        var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var amounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        return objects.concat(_.shuffle(_.reduce(amounts, function (a, v, k) {
	            return a.concat(_.times(v || 0, function () {
	                return k;
	            }));
	        }, [])));
	    };
	
	    var objects = getObjects([], this.opts.itemAmounts);
	
	    var locations = _.defaults(_.reduce(this.opts.itemAmounts, function (a, v, k) {
	        a[k] = [];
	        return a;
	    }, {}), _.reduce(this.opts.obstacleAmounts, function (a, v, k) {
	        a[k] = [];
	        return a;
	    }, {}));
	
	    var placeObject = function placeObject(top, left) {
	        var object = objects.shift();
	        if (locations[object]) {
	            locations[object].push({
	                top: top,
	                left: left
	            });
	        }
	    };
	
	    for (var left = 500; left < this.game.world.width; left += 200) {
	        placeObject(200 * _.random(0, 2), left);
	        if (!objects.length) objects = getObjects([], this.opts.itemAmounts);
	    }
	
	    objects = getObjects([], this.opts.obstacleAmounts);
	
	    for (var _left = 500; _left < this.game.world.width; _left += 500) {
	        placeObject(100 + 200 * _.random(0, 1), _left);
	        if (!objects.length) objects = getObjects([], this.opts.obstacleAmounts);
	    }
	
	    _.each(locations, function (locationArray, key) {
	        if (key === 'blank') return;
	        _3.default.call(_this, {
	            group: groups[key], defaultOpts: defaultProps[key]
	        }, locationArray);
	    });
	
	    if (this.stars) {
	        _.each(this.stars.children, function (star) {
	            star.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
	            star.animations.play('spin');
	        });
	    }
	
	    if (this.crows) {
	        _.each(this.crows.children, function (crow) {
	            crow.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
	            crow.body.velocity.x = -200;
	            crow.animations.play('fly');
	        });
	    }
	};
	
	var _2 = __webpack_require__(16);
	
	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _opts = __webpack_require__(20);
	
	var _opts2 = _interopRequireDefault(_opts);
	
	var _opts3 = __webpack_require__(22);
	
	var _opts4 = _interopRequireDefault(_opts3);
	
	var _opts5 = __webpack_require__(23);
	
	var _opts6 = _interopRequireDefault(_opts5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = [_opts2.default, _opts4.default, _opts6.default];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _default_opts = __webpack_require__(21);
	
	var _default_opts2 = _interopRequireDefault(_default_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _.defaults({
	    level: 1,
	    itemAmounts: {
	        blank: 1,
	        star: 1,
	        crow: 1,
	        wind: 0,
	        water: 3,
	        web: 0,
	        leaf: 10,
	        cloud: 0,
	        fruit1: 0,
	        fruit2: 0,
	        fruit3: 0,
	        fruit4: 0,
	        flower1: 0,
	        flower2: 0,
	        flower3: 0,
	        flower4: 0,
	        flower5: 0,
	        flower6: 0
	    },
	    obstacleAmounts: {
	        log: 0,
	        land1: 0,
	        land2: 0,
	        land3: 0,
	        land4: 0,
	        land5: 0,
	        wood1: 1,
	        wood2: 1,
	        wood3: 1
	    }
	}, _default_opts2.default);

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// a crop should look like
	// [0, 0, 155, 140],
	
	var generalDefaultProps = {
	    image: 'land',
	    scale: [.5, .5]
	};
	
	var woodDefaultProps = {
	    image: 'wood',
	    scale: [.5, .5]
	};
	
	var fruitDefaultProps = {
	    image: 'fruits',
	    scale: [1, 1]
	};
	
	var flowerDefaultProps = {
	    image: 'flowers',
	    scale: [.5, .5]
	};
	
	exports.default = {
	    level: 1,
	    hitsPerLife: 10,
	    hitDelay: 1000,
	    bounceY: 0,
	    gravityY: 600,
	    playerImage: 'butterfly',
	    playerBody: [500, 100, 500, 500],
	    leftFrames: [5, 4, 3, 2, 1, 0],
	    leftFrameRate: 10,
	    leftLoop: true,
	    rightFrames: [6, 7, 8, 9, 10, 11],
	    rightFrameRate: 10,
	    rightLoop: true,
	    playerScale: [-.15, .15],
	    upSpeed: -250,
	    rightSpeed: 150,
	    fastUpSpeed: -250,
	    fastRightSpeed: 300,
	    fastDuration: 3000,
	    slowUpSpeed: -350,
	    slowRightSpeed: 100,
	    slowDuration: 2000,
	    playerStopFrame: 6,
	    boostTime: 3000,
	    itemProps: {
	        star: {
	            image: 'star',
	            scale: [.1, .1]
	        },
	        crow: {
	            image: 'crow',
	            scale: [-.1, .1],
	            collideWorldBounds: false
	        },
	        wind: {
	            image: 'wind'
	        },
	        water: {
	            image: 'water',
	            scale: [.75, .75]
	        },
	        web: {
	            image: 'web'
	        },
	        log: _.defaults({
	            image: 'log'
	        }, generalDefaultProps),
	        leaf: {
	            image: 'leaf'
	        },
	        egg: {
	            image: 'egg',
	            scale: [.75, .75]
	        },
	        cloud: _.defaults({
	            image: 'cloud'
	        }, generalDefaultProps),
	        wood1: _.defaults({
	            frame: 0,
	            body: [200, 125, 300, 0]
	        }, woodDefaultProps),
	        wood2: _.defaults({
	            frame: 1
	        }, woodDefaultProps),
	        wood3: _.defaults({
	            frame: 2,
	            body: [250, 125, 250, 0]
	        }, woodDefaultProps),
	        land1: _.defaults({
	            frame: 0
	        }, generalDefaultProps),
	        land2: _.defaults({
	            frame: 1
	        }, generalDefaultProps),
	        land3: _.defaults({
	            frame: 2
	        }, generalDefaultProps),
	        land4: _.defaults({
	            frame: 3
	        }, generalDefaultProps),
	        land5: _.defaults({
	            frame: 4
	        }, generalDefaultProps),
	        fruit1: _.defaults({
	            frame: 0
	        }, fruitDefaultProps),
	        fruit2: _.defaults({
	            frame: 1
	        }, fruitDefaultProps),
	        fruit3: _.defaults({
	            frame: 2
	        }, fruitDefaultProps),
	        fruit4: _.defaults({
	            frame: 3
	        }, fruitDefaultProps),
	        flower1: _.defaults({
	            frame: 0
	        }, flowerDefaultProps),
	        flower2: _.defaults({
	            frame: 1
	        }, flowerDefaultProps),
	        flower3: _.defaults({
	            frame: 2
	        }, flowerDefaultProps),
	        flower4: _.defaults({
	            frame: 3
	        }, flowerDefaultProps),
	        flower5: _.defaults({
	            frame: 4
	        }, flowerDefaultProps),
	        flower6: _.defaults({
	            frame: 5
	        }, flowerDefaultProps)
	    },
	    groups: {
	        star: 'stars',
	        crow: 'crows',
	        wind: 'winds',
	        water: 'waters',
	        web: 'webs',
	        log: 'logs',
	        leaf: 'leafs',
	        egg: 'eggs',
	        cloud: 'clouds',
	        wood1: 'logs',
	        wood2: 'logs',
	        wood3: 'logs',
	        land1: 'lands',
	        land2: 'lands',
	        land3: 'lands',
	        land4: 'lands',
	        land5: 'lands',
	        fruit1: 'fruits',
	        fruit2: 'fruits',
	        fruit3: 'fruits',
	        fruit4: 'fruits',
	        flower1: 'flowers',
	        flower2: 'flowers',
	        flower3: 'flowers',
	        flower4: 'flowers',
	        flower5: 'flowers',
	        flower6: 'flowers'
	    },
	    itemAmounts: {
	        blank: 0,
	        star: 0,
	        crow: 0,
	        wind: 0,
	        water: 0,
	        web: 0,
	        leaf: 0,
	        cloud: 0,
	        fruit1: 0,
	        fruit2: 0,
	        fruit3: 0,
	        fruit4: 0,
	        flower1: 0,
	        flower2: 0,
	        flower3: 0,
	        flower4: 0,
	        flower5: 0,
	        flower6: 0
	    },
	    obstacleAmounts: {
	        log: 0,
	        land1: 0,
	        land2: 0,
	        land3: 0,
	        land4: 0,
	        land5: 0,
	        wood1: 0,
	        wood2: 0,
	        wood3: 0
	    }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _default_opts = __webpack_require__(21);
	
	var _default_opts2 = _interopRequireDefault(_default_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _.defaults({
	    level: 2,
	    itemAmounts: {
	        blank: 1,
	        star: 1,
	        crow: 0,
	        wind: 0,
	        water: 3,
	        web: 2,
	        leaf: 0,
	        cloud: 3,
	        fruit1: 0,
	        fruit2: 0,
	        fruit3: 0,
	        fruit4: 0,
	        flower1: 2,
	        flower2: 2,
	        flower3: 2,
	        flower4: 2,
	        flower5: 2,
	        flower6: 2
	    },
	    obstacleAmounts: {
	        log: 10,
	        land1: 0,
	        land2: 0,
	        land3: 0,
	        land4: 0,
	        land5: 0,
	        wood1: 0,
	        wood2: 0,
	        wood3: 0
	    }
	}, _default_opts2.default);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _default_opts = __webpack_require__(21);
	
	var _default_opts2 = _interopRequireDefault(_default_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _.defaults({
	    level: 3,
	    itemAmounts: {
	        blank: 1,
	        star: 1,
	        crow: 1,
	        wind: 4,
	        water: 3,
	        web: 0,
	        leaf: 0,
	        cloud: 0,
	        fruit1: 2,
	        fruit2: 2,
	        fruit3: 2,
	        fruit4: 2,
	        flower1: 0,
	        flower2: 0,
	        flower3: 0,
	        flower4: 0,
	        flower5: 0,
	        flower6: 0
	    },
	    obstacleAmounts: {
	        log: 0,
	        land1: 2,
	        land2: 1,
	        land3: 1,
	        land4: 1,
	        land5: 1,
	        wood1: 0,
	        wood2: 0,
	        wood3: 0
	    }
	}, _default_opts2.default);

/***/ }
/******/ ]);
//# sourceMappingURL=ai.js.map