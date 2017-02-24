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
/******/ 	var hotCurrentHash = "e850497b405aa7be7983"; // eslint-disable-line no-unused-vars
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
	
	var _info_definition_of_a_drone_screen = __webpack_require__(8);
	
	var _info_definition_of_a_drone_screen2 = _interopRequireDefault(_info_definition_of_a_drone_screen);
	
	var _info_so_what_does_it_do_screen = __webpack_require__(9);
	
	var _info_so_what_does_it_do_screen2 = _interopRequireDefault(_info_so_what_does_it_do_screen);
	
	var _video_the_world_of_drones_screen = __webpack_require__(10);
	
	var _video_the_world_of_drones_screen2 = _interopRequireDefault(_video_the_world_of_drones_screen);
	
	var _types_of_drones_screen = __webpack_require__(11);
	
	var _types_of_drones_screen2 = _interopRequireDefault(_types_of_drones_screen);
	
	var _how_are_drones_controlled_screen = __webpack_require__(12);
	
	var _how_are_drones_controlled_screen2 = _interopRequireDefault(_how_are_drones_controlled_screen);
	
	var _why_would_you_want_a_drone_prt_one_screen = __webpack_require__(13);
	
	var _why_would_you_want_a_drone_prt_one_screen2 = _interopRequireDefault(_why_would_you_want_a_drone_prt_one_screen);
	
	var _why_would_you_want_a_drone_prt_two_screen = __webpack_require__(14);
	
	var _why_would_you_want_a_drone_prt_two_screen2 = _interopRequireDefault(_why_would_you_want_a_drone_prt_two_screen);
	
	var _parts_of_a_drone_screen = __webpack_require__(18);
	
	var _parts_of_a_drone_screen2 = _interopRequireDefault(_parts_of_a_drone_screen);
	
	var _info_lets_play_screen = __webpack_require__(19);
	
	var _info_lets_play_screen2 = _interopRequireDefault(_info_lets_play_screen);
	
	var _info_help_the_drone_screen = __webpack_require__(20);
	
	var _info_help_the_drone_screen2 = _interopRequireDefault(_info_help_the_drone_screen);
	
	var _drone_level_one_screen = __webpack_require__(21);
	
	var _drone_level_one_screen2 = _interopRequireDefault(_drone_level_one_screen);
	
	var _level_one_screen = __webpack_require__(23);
	
	var _level_one_screen2 = _interopRequireDefault(_level_one_screen);
	
	var _drone_level_two_screen = __webpack_require__(25);
	
	var _drone_level_two_screen2 = _interopRequireDefault(_drone_level_two_screen);
	
	var _level_two_screen = __webpack_require__(26);
	
	var _level_two_screen2 = _interopRequireDefault(_level_two_screen);
	
	var _drone_level_three_screen = __webpack_require__(27);
	
	var _drone_level_three_screen2 = _interopRequireDefault(_drone_level_three_screen);
	
	var _level_three_screen = __webpack_require__(28);
	
	var _level_three_screen2 = _interopRequireDefault(_level_three_screen);
	
	var _info_game_complete_screen = __webpack_require__(29);
	
	var _info_game_complete_screen2 = _interopRequireDefault(_info_game_complete_screen);
	
	var _flip_screen = __webpack_require__(30);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _quit_screen = __webpack_require__(31);
	
	var _quit_screen2 = _interopRequireDefault(_quit_screen);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import InfoWantedYourOwnDroneScreen from './components/info_wanted_your_own_drone_screen';
	// import InfoCustomizeYourOwnDroneScreen from './components/info_customize_your_own_drone_screen';
	// import CustomizeYourDroneScreen from './components/customize_your_drone_screen';
	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _info_definition_of_a_drone_screen2.default, _info_so_what_does_it_do_screen2.default, _video_the_world_of_drones_screen2.default, _types_of_drones_screen2.default, _how_are_drones_controlled_screen2.default, _why_would_you_want_a_drone_prt_one_screen2.default, _why_would_you_want_a_drone_prt_two_screen2.default,
	    // InfoWantedYourOwnDroneScreen, //temp removed from spec
	    // InfoCustomizeYourOwnDroneScreen, //temp removed from spec
	    // CustomizeYourDroneScreen, //temp removed from spec
	    _parts_of_a_drone_screen2.default, _info_lets_play_screen2.default, _info_help_the_drone_screen2.default, _drone_level_one_screen2.default, _level_one_screen2.default, _drone_level_two_screen2.default, _level_two_screen2.default, _drone_level_three_screen2.default, _level_three_screen2.default, _info_game_complete_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _quit_screen2.default
	    },
	    assets: [React.createElement(skoash.Font, { name: 'Lilita One' }), React.createElement(skoash.Font, { name: 'Luckiest Guy' }), React.createElement(skoash.Font, { name: 'Source Sans Pro' }), React.createElement(skoash.Font, { name: 'CMWN' }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background bkg-1' }), React.createElement('div', { className: 'background bkg-2' }), React.createElement('div', { className: 'background bkg-3' }), React.createElement('div', { className: 'background bkg-4' }), React.createElement('div', { className: 'background bkg-5' }), React.createElement('div', { className: 'background bkg-6' }), React.createElement('div', { className: 'background bkg-7' }), React.createElement('div', { className: 'background bkg-8' }), React.createElement('div', { className: 'background bkg-9' }), React.createElement('div', { className: 'background bkg-10' }), React.createElement(skoash.Audio, {
	        ref: 'button',
	        type: 'sfx',
	        src: MEDIA.EFFECT + 'click1.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'screen-complete',
	        type: 'sfx',
	        src: MEDIA.EFFECT + 'nextappear.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'title',
	        type: 'background',
	        src: MEDIA.EFFECT + 'Title.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-1',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG1.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-2',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG2.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-3',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG3.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-4',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG4.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-5',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG_5.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-6',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG_6.mp3',
	        loop: true
	    })],
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'ios-splash':
	                return;
	            case 'title':
	            case 'flip':
	                return 0;
	            case 'info-definition-of-a-drone':
	            case 'info-what-does-it-do':
	            case 'video-the-world-of-drones':
	            case 'types-of-drones':
	                return 1;
	            case 'how-are-drones-controlled':
	            case 'why-would-you-want-a-drone-prt-one':
	            case 'why-would-you-want-a-drone-prt-two':
	                return 2;
	            case 'info-wanted-your-own-drone':
	            case 'info-customize-your-own-drone':
	            case 'customize-your-drone':
	                return 3;
	            case 'parts-of-a-drone':
	                return 4;
	            case 'drone-level-1':
	            case 'phaser-level-1':
	                return 5;
	            case 'drone-level-2':
	            case 'phaser-level-2':
	            case 'drone-level-3':
	            case 'phaser-level-3':
	                return 6;
	        }
	    }
	}));
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "drone-zone",
		"version": 1,
		"skoash": "1.1.2",
		"head_injection": "<link href='https://fonts.googleapis.com/css?family=Lilita+One|Luckiest+Guy' rel='stylesheet'>",
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
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.SPRITE + "play-btn-01.gif" }),
	        React.createElement(skoash.Image, { className: "radar", src: MEDIA.IMAGE + "title.radar.png" }),
	        React.createElement(skoash.Image, { className: "drone", src: MEDIA.IMAGE + "title.drone.png" }),
	        React.createElement(skoash.Image, { className: "name", src: MEDIA.IMAGE + "title.name.png" })
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
	            id: "info-definition-of-a-drone"
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.IMAGE + "drone.png" }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: MEDIA.EFFECT + "AnswerReveal.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: MEDIA.EFFECT + "TextRevelLoop.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: MEDIA.VO + "DefinitionDrone.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: MEDIA.VO + "ADroneIs.mp3"
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame" },
	            React.createElement(
	                "h1",
	                null,
	                "DEFINITION OF A DRONE"
	            ),
	            React.createElement(
	                "span",
	                { className: "content" },
	                "A drone is an",
	                React.createElement("br", null),
	                "unmanned aerial vehicle",
	                React.createElement("br", null),
	                "(UAV)."
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
	            id: "info-what-does-it-do"
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.IMAGE + "drone.png" }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: MEDIA.EFFECT + "AnswerReveal.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: MEDIA.EFFECT + "TextRevelLoop.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: MEDIA.VO + "SoWhatDoes.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: MEDIA.VO + "ItIsAnAircraft.mp3"
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame" },
	            React.createElement(
	                "h1",
	                null,
	                "SO WHAT DOES IT DO?"
	            ),
	            React.createElement(
	                "span",
	                { className: "content" },
	                "It is an aircraft that does not",
	                React.createElement("br", null),
	                "contain a human pilot. Instead, the",
	                React.createElement("br", null),
	                "drone is remote controlled by a",
	                React.createElement("br", null),
	                "human or onboard computer."
	            )
	        )
	    );
	};

/***/ },
/* 10 */
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
	            id: 'video-the-world-of-drones'
	        }),
	        React.createElement(
	            'h1',
	            { className: 'header' },
	            'THE WORLD OF DRONES'
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'frame video' },
	            React.createElement(skoash.Video, { className: 'video', src: src })
	        )
	    );
	};
	
	var src = 'http://res.cloudinary.com/changemyworldnow/' + 'video/upload/v1485551205/Drone_Zone_FINAL_FOR_UPLOAD_cv4prl.mov';

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onSelect;
	    var onPlay;
	
	    onSelect = function onSelect(open) {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: open
	            }
	        });
	
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'reveal'
	            }
	        });
	    };
	
	    onPlay = function onPlay() {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: null
	            }
	        });
	
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: null
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'types-of-drones'
	        }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.qmarks.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.dronetypes.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.dronetypes.png' }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.sfx.playing', null),
	                onPlay: onPlay
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                {
	                    ref: 'reveal',
	                    silentOnStart: true
	                },
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    src: MEDIA.EFFECT + 'AnswerReveal.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    src: MEDIA.EFFECT + 'TextRevelLoop.mp3'
	                })
	            )
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'instructions',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'TypesOfDrones.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'military',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'MilitaryDrones.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'delivery',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'DelveryDrones.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'racing',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'RacingDrones.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'media',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'PhotoDrones.mp3'
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            closeTarget: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'instructions',
	                    className: 'frame instructions'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'TYPES OF DRONES'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'click to reveal all the',
	                    React.createElement('br', null),
	                    'different types of drones'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'military',
	                    className: 'frame military'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'MILITARY DRONES'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Drones have been used in the military for quite',
	                    React.createElement('br', null),
	                    'some time, for research, combat, and cargo delivery.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'delivery',
	                    className: 'frame delivery'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'DELIVERY DRONES'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Drones can be used to transport',
	                    React.createElement('br', null),
	                    'mail packages\u2026even pizzas!'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'racing',
	                    className: 'frame racing'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'RACING DRONES'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Some drones are designed for racing, with the ability',
	                    React.createElement('br', null),
	                    'to fly around 40-60 miles per hour!'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'media',
	                    className: 'frame media'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'PHOTO + VIDEO DRONES'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'A drone equipped with a video or still camera',
	                    React.createElement('br', null),
	                    'can record fantastic images!'
	                )
	            )]
	        }),
	        React.createElement(skoash.Selectable, {
	            dataTarget: 'selectable',
	            selectClass: 'HIGHLIGHTED',
	            onSelect: onSelect,
	            list: [React.createElement(skoash.Component, {
	                'data-ref': 'military',
	                className: 'question-mark military',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'delivery',
	                className: 'question-mark delivery',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'racing',
	                className: 'question-mark racing',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'media',
	                className: 'question-mark media',
	                correct: true
	            })]
	        })
	    );
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onSelect;
	    var onPlay;
	
	    onSelect = function onSelect(open) {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: open
	            }
	        });
	
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'reveal'
	            }
	        });
	    };
	
	    onPlay = function onPlay() {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: null
	            }
	        });
	
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: null
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'how-are-drones-controlled'
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: MEDIA.VO + 'HowAreDronesControlled.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: MEDIA.SPRITE + 'sprite.controllers.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'header' },
	            React.createElement(
	                'h1',
	                null,
	                'HOW ARE DRONES CONTROLLED?'
	            )
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.sfx.playing', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'reveal',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'Reveal_1.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'computers',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Computers.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'remote-control',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'RemoteControl.mp3'
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: 'selectable',
	            selectClass: 'HIGHLIGHTED',
	            onSelect: onSelect,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'computers',
	                    className: 'question-mark computers',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'click' },
	                    'click to reveal'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'computers'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'remote-control',
	                    className: 'question-mark remote-control',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'click' },
	                    'click to reveal'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'remote control'
	                )
	            )]
	        })
	    );
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onSelect;
	    var onPlay;
	
	    onSelect = function onSelect(open) {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: open
	            }
	        });
	
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'reveal'
	            }
	        });
	    };
	
	    onPlay = function onPlay() {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: null
	            }
	        });
	
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: null
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'why-would-you-want-a-drone-prt-one'
	        }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.jobgameframe.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.qmarkwsquare.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.blanksquares.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.jobicons.png' }),
	        React.createElement(
	            skoash.Component,
	            { className: 'header' },
	            React.createElement(
	                'h1',
	                null,
	                'WHY WOULD YOU WANT A DRONE?'
	            )
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.sfx.playing', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'reveal',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'Reveal_2.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'instructions',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'WhyWantADrone.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'construction',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Construction.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'sports',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Sports.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'police-duties',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'PoliceDuties.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'fire-fighting',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Firefighting.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'photography',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Photography.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'delivery',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Delivery.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'farming',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Farming.mp3'
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            closeTarget: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'instructions',
	                    className: 'frame job-round instructions'
	                },
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Click to reveal',
	                    React.createElement('br', null),
	                    'what you would',
	                    React.createElement('br', null),
	                    'want a drone for!'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'construction',
	                    className: 'frame job-round construction'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Construction'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Bring equipment',
	                    React.createElement('br', null),
	                    'to builders high',
	                    React.createElement('br', null),
	                    'up in the air.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'sports',
	                    className: 'frame job-round sports'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Sports'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'View and record',
	                    React.createElement('br', null),
	                    'sports matches.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'police-duties',
	                    className: 'frame job-round police-duties'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Police Duties'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Help people',
	                    React.createElement('br', null),
	                    'in emergencies.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fire-fighting',
	                    className: 'frame job-round fire-fighting'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Fire Fighting'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Bring water to',
	                    React.createElement('br', null),
	                    'remote regions',
	                    React.createElement('br', null),
	                    'to put out fires.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'photography',
	                    className: 'frame job-round photography'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Photography'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Get hard-to-reach',
	                    React.createElement('br', null),
	                    'camera angles.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'delivery',
	                    className: 'frame job-round delivery'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Delivery'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Drop off packages.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'farming',
	                    className: 'frame job-round farming'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Farming'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Oversee and help',
	                    React.createElement('br', null),
	                    'water crops.'
	                )
	            )]
	        }),
	        React.createElement(skoash.Selectable, {
	            dataTarget: 'selectable',
	            selectClass: 'HIGHLIGHTED',
	            onSelect: onSelect,
	            list: [React.createElement(skoash.Component, {
	                'data-ref': 'construction',
	                className: 'question-mark construction',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'sports',
	                className: 'question-mark sports',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'police-duties',
	                className: 'question-mark police-duties',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'fire-fighting',
	                className: 'question-mark fire-fighting',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'photography',
	                className: 'question-mark photography',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'delivery',
	                className: 'question-mark delivery',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'farming',
	                className: 'question-mark farming',
	                correct: true
	            })]
	        })
	    );
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var _React$createElement, _React$createElement2, _React$createElement3;
	
	    var onOpen;
	    var onPlay;
	    var onDrag;
	    var onDrop;
	    var onCorrect;
	    var onIncorrect;
	    var onComplete;
	
	    onOpen = function onOpen(message) {
	        this.updateGameState({
	            path: 'vos',
	            data: {
	                playing: message
	            }
	        });
	    };
	
	    onPlay = function onPlay() {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: null
	            }
	        });
	        this.updateGameState({
	            path: 'vos',
	            data: {
	                playing: null
	            }
	        });
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: null
	            }
	        });
	    };
	
	    onDrag = function onDrag() {
	        this.setState({
	            correct: false,
	            return: false
	        });
	    };
	
	    onDrop = function onDrop() {
	        this.returnToStart();
	    };
	
	    onCorrect = function onCorrect(dropped, dropzoneRef) {
	        this.updateGameState({
	            path: 'dropzone',
	            data: _defineProperty({}, dropzoneRef.props['data-ref'], true)
	        });
	
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'correct'
	            }
	        });
	
	        this.updateGameState({
	            path: 'vos',
	            data: {
	                playing: dropped.props.message
	            }
	        });
	    };
	
	    onIncorrect = function onIncorrect() {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: 'incorrect'
	            }
	        });
	    };
	
	    onComplete = function onComplete() {
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
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'why-would-you-want-a-drone-prt-two',
	            complete: _.get(props, 'data.game.complete', false)
	        }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.jobgameframe.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.qmarkwsquare.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.blanksquares.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.jobicons.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.bwjobs.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.jobimgs.png' }),
	        React.createElement(
	            skoash.Component,
	            { className: 'header' },
	            React.createElement(
	                'h1',
	                null,
	                'WHY WOULD YOU WANT A DRONE?'
	            )
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.sfx.playing', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'correct',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'Reveal_3.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'incorrect',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'TryAgain.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'complete',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'LevelComplete.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.vos.playing', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'instructions',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'LetsPutKnowTest.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'incorrect',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'TryAgainNotQuite.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'complete',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'ExcellentJob.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.vos.playing', null),
	                onPlay: onPlay,
	                onComplete: onComplete
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'construction',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'ConstructionShort.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'sports',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'SportsShort.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'police-duties',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'PoliceDutiesShort.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'fire-fighting',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'FirefightingShort.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'photography',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'PhotographyShort.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'delivery',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'DeliveryShort.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'farming',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'FarmingShort.mp3'
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            closeTarget: 'reveal',
	            openOnStart: 'instructions',
	            onOpen: onOpen,
	            openReveal: _.get(props, 'data.reveal.open', null),
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'instructions',
	                    className: 'frame job-round instructions'
	                },
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Let\'s put your',
	                    React.createElement('br', null),
	                    'knowledge to the test!',
	                    React.createElement('br', null),
	                    'Click and drag these',
	                    React.createElement('br', null),
	                    'tasks to the proper',
	                    React.createElement('br', null),
	                    'scenario where the',
	                    React.createElement('br', null),
	                    'drone could be used!'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'incorrect',
	                    className: 'frame incorrect'
	                },
	                React.createElement(
	                    'h2',
	                    null,
	                    'TRY AGAIN'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'That\'s not quite',
	                    React.createElement('br', null),
	                    'right, but don\'t',
	                    React.createElement('br', null),
	                    'worry, you have',
	                    React.createElement('br', null),
	                    'another chance!'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'complete',
	                    className: 'frame complete'
	                },
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Excellent Job!',
	                    React.createElement('br', null),
	                    'You are now an',
	                    React.createElement('br', null),
	                    'expert at drones!',
	                    React.createElement('br', null),
	                    'Now what will you',
	                    React.createElement('br', null),
	                    'use a drone for?'
	                )
	            )]
	        }),
	        React.createElement(_3.default, {
	            checkComplete: false,
	            dropped: _.get(props, 'data.draggable.dropped'),
	            dragging: _.get(props, 'data.draggable.dragging'),
	            onCorrect: onCorrect,
	            onIncorrect: onIncorrect,
	            dropzones: [React.createElement(skoash.Component, {
	                ref: 'construction',
	                className: (0, _classnames2.default)('job-round construction', {
	                    'CORRECT CONSTRUCTION': _.get(props, 'data.dropzone.construction')
	                }),
	                answers: ['construction']
	            }), React.createElement(skoash.Component, (_React$createElement = {
	                ref: 'sports',
	                className: 'job-round sports'
	            }, _defineProperty(_React$createElement, 'className', (0, _classnames2.default)('job-round sports', {
	                'CORRECT SPORTS': _.get(props, 'data.dropzone.sports')
	            })), _defineProperty(_React$createElement, 'answers', ['sports']), _React$createElement)), React.createElement(skoash.Component, (_React$createElement2 = {
	                ref: 'police-duties',
	                className: 'job-round police-duties'
	            }, _defineProperty(_React$createElement2, 'className', (0, _classnames2.default)('job-round police-duties', {
	                'CORRECT POLICE-DUTIES': _.get(props, 'data.dropzone[police-duties]')
	            })), _defineProperty(_React$createElement2, 'answers', ['police-duties']), _React$createElement2)), React.createElement(skoash.Component, (_React$createElement3 = {
	                ref: 'fire-fighting',
	                className: 'job-round fire-fighting'
	            }, _defineProperty(_React$createElement3, 'className', (0, _classnames2.default)('job-round fire-fighting', {
	                'CORRECT FIRE-FIGHTING': _.get(props, 'data.dropzone[fire-fighting]')
	            })), _defineProperty(_React$createElement3, 'answers', ['fire-fighting']), _React$createElement3)), React.createElement(skoash.Component, {
	                ref: 'photography',
	                className: (0, _classnames2.default)('job-round photography', {
	                    'CORRECT PHOTOGRAPHY': _.get(props, 'data.dropzone.photography')
	                }),
	                answers: ['photography']
	            }), React.createElement(skoash.Component, {
	                ref: 'delivery',
	                className: (0, _classnames2.default)('job-round delivery', {
	                    'CORRECT DELIVERY': _.get(props, 'data.dropzone.delivery')
	                }),
	                answers: ['delivery']
	            }), React.createElement(skoash.Component, {
	                ref: 'farming',
	                className: (0, _classnames2.default)('job-round farming', {
	                    'CORRECT FARMING': _.get(props, 'data.dropzone.farming')
	                }),
	                answers: ['farming']
	            })]
	        }),
	        React.createElement(skoash.Repeater, {
	            className: 'draggables',
	            amount: 13,
	            item: React.createElement(_5.default, {
	                'return': true,
	                returnOnIncorrect: true,
	                stayOnCorrect: false,
	                onDrag: onDrag,
	                onDrop: onDrop
	            }),
	            props: [{
	                message: 'construction',
	                className: 'construction'
	            }, {
	                message: 'farming',
	                className: 'farming'
	            }, {
	                message: 'delivery',
	                className: 'delivery'
	            }, {
	                message: 'fire-fighting',
	                className: 'fire-fighting'
	            }, {
	                message: 'police-duties',
	                className: 'police-duties'
	            }, {
	                message: 'photography',
	                className: 'photography'
	            }, {
	                message: 'sports',
	                className: 'sports'
	            }]
	        })
	    );
	};
	
	var _classnames = __webpack_require__(15);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(16);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(17);
	
	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(15);
	
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
	                    if (_this2.refs['dropzone-' + k].props.className.indexOf('CORRECT') === -1) {
	                        return _this2.refs['dropzone-' + k];
	                    }
	                }
	                return a;
	            }, false);
	
	            if (dropzoneRef) {
	                this.inBounds(dropped, dropzoneRef);
	            } else {
	                this.outOfBounds(dropped);
	            }
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
	            this.incorrect(dropped);
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
	            var _this4 = this;
	
	            return _.map(this.props.dropzones, function (component, key) {
	                return React.createElement(component.type, _extends({}, component.props, {
	                    ref: 'dropzone-' + key,
	                    'data-ref': component.ref,
	                    key: key,
	                    className: _this4.getDropzoneClassNames(component)
	                }));
	            });
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('dropzones', _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'getDropzoneClassNames',
	        value: function getDropzoneClassNames(dropzone) {
	            return (0, _classnames2.default)('dropzone', dropzone.props.className, _get(Dropzone.prototype.__proto__ || Object.getPrototypeOf(Dropzone.prototype), 'getClassNames', this).call(this));
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
	    onDrag: _.noop
	}, skoash.Component.defaultProps);
	
	exports.default = Dropzone;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(15);
	
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var onSelect;
	    var onPlay;
	
	    onSelect = function onSelect(open) {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: open
	            }
	        });
	    };
	
	    onPlay = function onPlay() {
	        this.updateGameState({
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
	            id: 'parts-of-a-drone'
	        }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.radarframe.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.IMAGE + 'droneparts.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.qmarks.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'sprite.parts.png' }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: MEDIA.VO + 'PartsOfADrone.mp3'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'header' },
	            React.createElement(
	                'h1',
	                null,
	                'PARTS OF A DRONE'
	            )
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'notice' },
	            React.createElement(
	                'span',
	                null,
	                'Click to reveal',
	                React.createElement('br', null),
	                'the different',
	                React.createElement('br', null),
	                'parts of a drone!'
	            )
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'motor',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Motor.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'lights',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Lights.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'propeller',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Propeller.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'central-core',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'CentralCore.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'landing-platform',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'LandingPlatform.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'camera',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'VideoCamera.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'arm',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Arm.mp3'
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: 'selectable',
	            selectClass: 'HIGHLIGHTED',
	            selectOnStart: 'instructions',
	            onSelect: onSelect,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'motor',
	                    className: 'question-mark motor',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'MOTOR'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'lights',
	                    className: 'question-mark lights',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'LIGHTS'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'propeller',
	                    className: 'question-mark propeller',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'PROPELLER'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'central-core',
	                    className: 'question-mark central-core',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'CENTRAL CORE'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'landing-platform',
	                    className: 'question-mark landing-platform',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'LANDING PLATFORM'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'camera',
	                    className: 'question-mark camera',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'CAMERA'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    'data-ref': 'arm',
	                    className: 'question-mark arm',
	                    correct: true
	                },
	                React.createElement(
	                    'span',
	                    { className: 'label' },
	                    'ARM'
	                )
	            )]
	        }),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            closeTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'motor',
	                    className: 'motor'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'MOTOR'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'lights',
	                    className: 'lights'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'LIGHTS'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'propeller',
	                    className: 'propeller'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'PROPELLER'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'central-core',
	                    className: 'central-core'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'CENTRAL CORE'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'landing-platform',
	                    className: 'landing-platform'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'LANDING PLATFORM'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'camera',
	                    className: 'camera'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'CAMERA'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'arm',
	                    className: 'arm'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'ARM'
	                )
	            )]
	        })
	    );
	};

/***/ },
/* 19 */
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
	            id: "info-lets-play"
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.SPRITE + "sprite.levelimgs.png" }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "LetsPlayAGame.mp3"
	        }),
	        React.createElement(skoash.Component, { className: "lvl lvl-1" }),
	        React.createElement(skoash.Component, { className: "lvl lvl-2" }),
	        React.createElement(skoash.Component, { className: "lvl lvl-3" }),
	        React.createElement(
	            "span",
	            { className: "copy" },
	            "LETS PLAY",
	            React.createElement("br", null),
	            "A GAME!"
	        )
	    );
	};

/***/ },
/* 20 */
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
	            id: "info-help-the-drone"
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.SPRITE + "sprite.levelimgs.png" }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "HelpTheDrone.mp3"
	        }),
	        React.createElement(skoash.Component, { className: "lvl lvl-1" }),
	        React.createElement(skoash.Component, { className: "lvl lvl-2" }),
	        React.createElement(skoash.Component, { className: "lvl lvl-3" }),
	        React.createElement(
	            "span",
	            { className: "copy" },
	            "HELP THE DRONE",
	            React.createElement("br", null),
	            "DO ITS DAILY",
	            React.createElement("br", null),
	            "ACTIVITIES!"
	        )
	    );
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _drone_levels_screen_component2.default)(props, ref, key, {
	        level: 1,
	        instructionsVO: 'LevelOneHelp',
	        instructions: React.createElement(
	            'span',
	            { className: 'copy' },
	            'Help the drone',
	            React.createElement('br', null),
	            'put out fires',
	            React.createElement('br', null),
	            'around the city',
	            React.createElement('br', null),
	            'before the timer',
	            React.createElement('br', null),
	            'runs out.'
	        )
	    });
	};
	
	var _drone_levels_screen_component = __webpack_require__(22);
	
	var _drone_levels_screen_component2 = _interopRequireDefault(_drone_levels_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	    var onSelect;
	    var getStarClassNames;
	
	    onSelect = function onSelect() {
	        if (_.get(props, 'gameState.currentScreenIndex') !== parseInt(key, 10)) return;
	        skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	    };
	
	    getStarClassNames = function getStarClassNames(level, star) {
	        return (0, _classnames2.default)({
	            earned: _.get(props, 'gameState.data.game.levels.' + level + '.mostStars', 0) >= star
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'drone-level-' + opts.level
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: '' + MEDIA.VO + opts.instructionsVO + '.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: MEDIA.SPRITE + 'sprite.starmap.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: MEDIA.SPRITE + 'sprite.pathicons.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: MEDIA.IMAGE + 'path.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: MEDIA.IMAGE + 'flygameframe.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'instructions' },
	            React.createElement(
	                'h1',
	                { className: 'level' },
	                'LEVEL: ',
	                opts.level
	            ),
	            opts.instructions
	        ),
	        React.createElement(
	            skoash.Component,
	            {
	                className: 'path'
	            },
	            React.createElement(skoash.Component, { className: 'drone' }),
	            React.createElement(
	                'span',
	                { className: 'start' },
	                'START'
	            ),
	            React.createElement(
	                'span',
	                { className: 'finish' },
	                'FINISH!'
	            ),
	            React.createElement(skoash.Selectable, {
	                onSelect: onSelect,
	                list: [React.createElement(
	                    skoash.Component,
	                    {
	                        type: 'li',
	                        className: 'lock-1'
	                    },
	                    React.createElement('div', { className: getStarClassNames(1, 1) }),
	                    React.createElement('div', { className: getStarClassNames(1, 2) }),
	                    React.createElement('div', { className: getStarClassNames(1, 3) }),
	                    React.createElement(
	                        'span',
	                        { className: 'level' },
	                        'Level: 1'
	                    )
	                ), React.createElement(
	                    skoash.Component,
	                    {
	                        type: 'li',
	                        className: 'lock-2'
	                    },
	                    React.createElement('div', { className: getStarClassNames(2, 1) }),
	                    React.createElement('div', { className: getStarClassNames(2, 2) }),
	                    React.createElement('div', { className: getStarClassNames(2, 3) }),
	                    React.createElement(
	                        'span',
	                        { className: 'level' },
	                        'Level: 2'
	                    )
	                ), React.createElement(
	                    skoash.Component,
	                    {
	                        type: 'li',
	                        className: 'lock-3'
	                    },
	                    React.createElement('div', { className: getStarClassNames(3, 1) }),
	                    React.createElement('div', { className: getStarClassNames(3, 2) }),
	                    React.createElement('div', { className: getStarClassNames(3, 3) }),
	                    React.createElement(
	                        'span',
	                        { className: 'level' },
	                        'Level: 3'
	                    )
	                )]
	            })
	        )
	    );
	};
	
	var _classnames = __webpack_require__(15);
	
	var _classnames2 = _interopRequireDefault(_classnames);

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
	        level: 1,
	        fact1VO: 'TheMovementsOf',
	        fact2VO: 'SearchRescue',
	        fact3VO: 'EmergencySituations',
	        completeVO: 'LevelOneComplete',
	        fact1Content: React.createElement(
	            'p',
	            null,
	            'The movements of some tiny drones,',
	            React.createElement('br', null),
	            'called miniature UAVs, are based',
	            React.createElement('br', null),
	            'on birds and insects.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            'Drones were used in search and',
	            React.createElement('br', null),
	            'rescue missions after hurricanes',
	            React.createElement('br', null),
	            'struck Texas and Louisiana in 2008.'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            'In emergency situations, drones can',
	            React.createElement('br', null),
	            'be used to quickly deliver medicine',
	            React.createElement('br', null),
	            'and life-saving equipment.'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You\'re a master firefighter.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(24);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	    var startScreen;
	    var onScreenStart;
	    var getGameSrc;
	    var onOpenReveal;
	    var onCloseReveal;
	    var onRespond;
	    var onTimerComplete;
	    var onScoreComplete;
	    var onLifeComplete;
	
	    startScreen = function startScreen() {
	        var screenStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        this.updateGameState({
	            path: 'game',
	            data: {
	                screenStart: screenStart
	            }
	        });
	    };
	
	    onScreenStart = function onScreenStart() {
	        var screenStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        var gameData = _.get(props, 'gameState.data.game');
	
	        startScreen.call(this, screenStart);
	
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
	                levels: _defineProperty({}, opts.level, {
	                    hits: 0,
	                    score: 0,
	                    stars: 0
	                })
	            })
	        });
	
	        this.updateGameState({
	            path: ['game'],
	            data: {
	                levels: _defineProperty({}, opts.level, {
	                    start: true
	                })
	            }
	        });
	
	        this.updateGameState({
	            path: 'timer',
	            data: {
	                complete: false
	            }
	        });
	    };
	
	    getGameSrc = function getGameSrc() {
	        if (!_.get(props, 'data.game.screenStart')) return;
	        return '../drone-zone-flyer/index.html?v=' + opts.level;
	    };
	
	    onOpenReveal = function onOpenReveal() {
	        this.updateGameState({
	            path: 'd-pad',
	            data: {
	                pause: true
	            }
	        });
	
	        this.updateGameState({
	            path: ['game'],
	            data: {
	                levels: _defineProperty({}, opts.level, {
	                    start: false
	                })
	            }
	        });
	    };
	
	    onCloseReveal = function onCloseReveal(prevMessage) {
	        var _this = this;
	
	        var stars = _.get(props, 'gameState.data.game.levels.' + opts.level + '.stars', 0);
	
	        if (!prevMessage) return;
	
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: null,
	                prevMessage: prevMessage
	            }
	        });
	
	        this.updateGameState({
	            path: 'd-pad',
	            data: {
	                pause: false
	            }
	        });
	
	        if (prevMessage === 'replay') {
	            onScreenStart.call(this, false);
	
	            this.updateGameState({
	                path: ['game'],
	                data: {
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                }
	            });
	
	            setTimeout(function () {
	                startScreen.call(_this);
	            }, 0);
	        } else if (stars > 0) {
	            if (prevMessage === 'fact-1') {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        open: 'fact-2'
	                    }
	                });
	            } else if (prevMessage === 'fact-2') {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        open: 'fact-3'
	                    }
	                });
	            } else if (prevMessage === 'fact-3') {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        open: 'complete'
	                    }
	                });
	            } else {
	                skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	            }
	        }
	    };
	
	    onRespond = function onRespond(options) {
	        if (_.get(options, 'updateGameState.data.game.levels.' + opts.level + '.hits') === 10) {
	            onTimerComplete.call(this);
	        }
	
	        if (_.get(options, 'updateGameState.data.game.levels.' + opts.level + '.start')) {
	            window.focus();
	        }
	    };
	
	    onTimerComplete = function onTimerComplete() {
	        var stars = _.get(props, 'gameState.data.game.levels.' + opts.level + '.stars', 0);
	
	        if (_.get(props, 'data.timer.complete')) return;
	
	        if (!stars) {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'replay'
	                }
	            });
	        } else {
	            this.updateGameState({
	                path: ['game'],
	                data: {
	                    levels: _defineProperty({}, opts.level, {
	                        complete: true,
	                        mostStars: Math.max(stars, _.get(props, 'gameState.data.game.levels.' + opts.level + '.mostStars', 0)),
	                        fact2Complete: stars === 1,
	                        fact3Complete: stars > 0 && stars < 3
	                    })
	                }
	            });
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'fact-1'
	                }
	            });
	            this.updateGameState({
	                path: 'timer',
	                data: {
	                    complete: true
	                }
	            });
	        }
	    };
	
	    onLifeComplete = function onLifeComplete() {
	        if (_.get(props, 'data.reveal.prevMessage') === 'replay') return;
	
	        onTimerComplete.call(this);
	    };
	
	    onScoreComplete = function onScoreComplete() {
	        this.updateGameState({
	            path: ['game'],
	            data: {
	                levels: _defineProperty({}, opts.level, {
	                    stars: _.get(props, 'gameState.data.game.levels.' + opts.level + '.stars', 0) + 1,
	                    score: 0
	                })
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'phaser-level-' + opts.level,
	            onStart: onScreenStart
	        }),
	        React.createElement(skoash.GameEmbedder, {
	            src: getGameSrc(),
	            controller: _.get(props, 'data.d-pad'),
	            complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false),
	            data: _.get(props, 'gameState.data.game', {}),
	            pause: _.get(props, 'data.d-pad.pause'),
	            resume: !_.get(props, 'data.d-pad.pause'),
	            onRespond: onRespond
	        }),
	        React.createElement(skoash.Timer, {
	            leadingContent: React.createElement(
	                'span',
	                { className: 'label' },
	                'TIME'
	            ),
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
	                className: 'gauges',
	                complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false)
	            },
	            React.createElement(skoash.DPad, {
	                onKeyAction: function onKeyAction(keyCode) {
	                    if (keyCode === 32) return 'up';
	                }
	            }),
	            React.createElement(skoash.Score, {
	                className: 'star-score',
	                correct: Math.min(3, _.get(props, 'gameState.data.game.levels.' + opts.level + '.stars', 0)),
	                setScore: true
	            }),
	            React.createElement(skoash.Score, {
	                className: 'level-score',
	                max: 10,
	                correct: _.get(props, 'gameState.data.game.levels.' + opts.level + '.score', 0),
	                setScore: true,
	                onComplete: onScoreComplete
	            }),
	            React.createElement(skoash.Score, {
	                className: 'life',
	                max: 0,
	                incorrect: 10,
	                correct: _.get(props, 'gameState.data.game.levels.' + opts.level + '.hits', 0) || 0,
	                setScore: true,
	                onComplete: onLifeComplete
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            onOpen: onOpenReveal,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-1',
	                    className: 'fact frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'DRONE FACT'
	                ),
	                opts.fact1Content
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-2',
	                    className: 'fact frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'DRONE FACT'
	                ),
	                opts.fact2Content
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-3',
	                    className: 'fact frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'DRONE FACT'
	                ),
	                opts.fact3Content
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'complete',
	                    className: 'complete frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'LEVEL ',
	                    opts.level,
	                    ' COMPLETE!'
	                ),
	                opts.completeContent
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'replay',
	                    className: 'replay frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'h1',
	                    { className: 'header' },
	                    'TRY AGAIN'
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'copy' },
	                    'You lost this round, but',
	                    React.createElement('br', null),
	                    'you have another chance',
	                    React.createElement('br', null),
	                    'to deliver victory!'
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
	                ref: 'fact-1',
	                src: '' + MEDIA.VO + opts.fact1VO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-2',
	                src: '' + MEDIA.VO + opts.fact2VO + '.mp3',
	                complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.fact2Complete', false)
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-3',
	                src: '' + MEDIA.VO + opts.fact3VO + '.mp3',
	                complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.fact3Complete', false)
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'complete',
	                src: '' + MEDIA.VO + opts.completeVO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'replay',
	                src: MEDIA.VO + 'TryAgain.mp3',
	                complete: true
	            })
	        )
	    );
	};
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _drone_levels_screen_component2.default)(props, ref, key, {
	        level: 2,
	        instructionsVO: 'LevelTwoHelp',
	        instructions: React.createElement(
	            'span',
	            { className: 'copy' },
	            'Help the drone',
	            React.createElement('br', null),
	            'deliver and mail',
	            React.createElement('br', null),
	            'packages around',
	            React.createElement('br', null),
	            'the neighborhood.'
	        )
	    });
	};
	
	var _drone_levels_screen_component = __webpack_require__(22);
	
	var _drone_levels_screen_component2 = _interopRequireDefault(_drone_levels_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 2,
	        fact1VO: 'Dominos',
	        fact2VO: 'DroneDecorate',
	        fact3VO: 'DronesArcheology',
	        completeVO: 'LevelTwoComplete',
	        fact1Content: React.createElement(
	            'p',
	            null,
	            'Domino\'s delivered the world\'s',
	            React.createElement('br', null),
	            'first pizza by drone in 2016.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            'Drones have been used to decorate',
	            React.createElement('br', null),
	            'stages for shows, reaching high areas.'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            'Drones are used in archeology',
	            React.createElement('br', null),
	            'to survey sites and take photos.'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'Thank you for dropping',
	            React.createElement('br', null),
	            'off all that mail.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(24);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _drone_levels_screen_component2.default)(props, ref, key, {
	        level: 3,
	        instructionsVO: 'LevelThreeHelp',
	        instructions: React.createElement(
	            'span',
	            { className: 'copy' },
	            'Help the drone',
	            React.createElement('br', null),
	            'plant and',
	            React.createElement('br', null),
	            'fertilize crops!'
	        )
	    });
	};
	
	var _drone_levels_screen_component = __webpack_require__(22);
	
	var _drone_levels_screen_component2 = _interopRequireDefault(_drone_levels_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 3,
	        fact1VO: 'DronesCanBeUsed',
	        fact2VO: 'DroneRacing',
	        fact3VO: 'WinterOlympics',
	        completeVO: 'LevelThreeComplete',
	        fact1Content: React.createElement(
	            'p',
	            null,
	            'Drones can be used in farming for',
	            React.createElement('br', null),
	            'many things, including dusting crops',
	            React.createElement('br', null),
	            'and monitoring livestock.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            'Drone racing as an amateur sport',
	            React.createElement('br', null),
	            'started in 2014 in Australia.'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            'Drones were used to film the',
	            React.createElement('br', null),
	            '2014 Winter Olympics.'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'The crops have been properly',
	            React.createElement('br', null),
	            'tended to, and will yield an',
	            React.createElement('br', null),
	            'amazing harvest!'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(24);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	            id: "info-game-complete"
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.IMAGE + "winscreen.png" }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "YouveWonTheGame.mp3"
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame fact" },
	            React.createElement(
	                "span",
	                { className: "copy" },
	                "YOU'VE WON",
	                React.createElement("br", null),
	                "THE GAME!"
	            )
	        )
	    );
	};

/***/ },
/* 30 */
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
	            id: "flip"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "HeresYourFlip.mp3"
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "header" },
	            React.createElement(
	                "span",
	                null,
	                "HERE'S YOUR FLIP!"
	            )
	        ),
	        React.createElement(skoash.Image, {
	            className: "flip",
	            src: MEDIA.SPRITE + "dz.animatedearnedflip.gif"
	        })
	    );
	};

/***/ },
/* 31 */
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
	                        'Are you sure you want to quit?'
	                    ),
	                    React.createElement(
	                        'h3',
	                        null,
	                        'Your progress will be saved.'
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
	    id: 'quit'
	});

/***/ }
/******/ ]);
//# sourceMappingURL=ai.js.map