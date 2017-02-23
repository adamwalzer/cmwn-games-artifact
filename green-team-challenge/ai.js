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
/******/ 	var hotCurrentHash = "0a8054e0f1f782327917"; // eslint-disable-line no-unused-vars
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
	
	var _hi_there_screen = __webpack_require__(12);
	
	var _hi_there_screen2 = _interopRequireDefault(_hi_there_screen);
	
	var _key_is_sorting_screen = __webpack_require__(15);
	
	var _key_is_sorting_screen2 = _interopRequireDefault(_key_is_sorting_screen);
	
	var _lights_screen = __webpack_require__(17);
	
	var _lights_screen2 = _interopRequireDefault(_lights_screen);
	
	var _five_ways_screen = __webpack_require__(19);
	
	var _five_ways_screen2 = _interopRequireDefault(_five_ways_screen);
	
	var _level_screen_component = __webpack_require__(21);
	
	var _level_screen_component2 = _interopRequireDefault(_level_screen_component);
	
	var _recycling_champion_one_info_screen = __webpack_require__(22);
	
	var _recycling_champion_one_info_screen2 = _interopRequireDefault(_recycling_champion_one_info_screen);
	
	var _recycling_champion_level_one_screen = __webpack_require__(23);
	
	var _recycling_champion_level_one_screen2 = _interopRequireDefault(_recycling_champion_level_one_screen);
	
	var _recycling_champion_two_info_screen = __webpack_require__(35);
	
	var _recycling_champion_two_info_screen2 = _interopRequireDefault(_recycling_champion_two_info_screen);
	
	var _recycling_champion_level_two_screen = __webpack_require__(36);
	
	var _recycling_champion_level_two_screen2 = _interopRequireDefault(_recycling_champion_level_two_screen);
	
	var _recycling_champion_three_info_screen = __webpack_require__(37);
	
	var _recycling_champion_three_info_screen2 = _interopRequireDefault(_recycling_champion_three_info_screen);
	
	var _recycling_champion_level_three_screen = __webpack_require__(38);
	
	var _recycling_champion_level_three_screen2 = _interopRequireDefault(_recycling_champion_level_three_screen);
	
	var _recycling_champion_four_info_screen = __webpack_require__(39);
	
	var _recycling_champion_four_info_screen2 = _interopRequireDefault(_recycling_champion_four_info_screen);
	
	var _recycling_champion_level_four_screen = __webpack_require__(40);
	
	var _recycling_champion_level_four_screen2 = _interopRequireDefault(_recycling_champion_level_four_screen);
	
	var _recycling_champion_five_info_screen = __webpack_require__(41);
	
	var _recycling_champion_five_info_screen2 = _interopRequireDefault(_recycling_champion_five_info_screen);
	
	var _recycling_champion_level_five_screen = __webpack_require__(42);
	
	var _recycling_champion_level_five_screen2 = _interopRequireDefault(_recycling_champion_level_five_screen);
	
	var _level_complete_screen_component = __webpack_require__(43);
	
	var _level_complete_screen_component2 = _interopRequireDefault(_level_complete_screen_component);
	
	var _priceless_pourer_one_info_screen = __webpack_require__(44);
	
	var _priceless_pourer_one_info_screen2 = _interopRequireDefault(_priceless_pourer_one_info_screen);
	
	var _priceless_pourer_level_one_screen = __webpack_require__(45);
	
	var _priceless_pourer_level_one_screen2 = _interopRequireDefault(_priceless_pourer_level_one_screen);
	
	var _priceless_pourer_two_info_screen = __webpack_require__(47);
	
	var _priceless_pourer_two_info_screen2 = _interopRequireDefault(_priceless_pourer_two_info_screen);
	
	var _priceless_pourer_level_two_screen = __webpack_require__(48);
	
	var _priceless_pourer_level_two_screen2 = _interopRequireDefault(_priceless_pourer_level_two_screen);
	
	var _priceless_pourer_three_info_screen = __webpack_require__(49);
	
	var _priceless_pourer_three_info_screen2 = _interopRequireDefault(_priceless_pourer_three_info_screen);
	
	var _priceless_pourer_level_three_screen = __webpack_require__(50);
	
	var _priceless_pourer_level_three_screen2 = _interopRequireDefault(_priceless_pourer_level_three_screen);
	
	var _priceless_pourer_four_info_screen = __webpack_require__(51);
	
	var _priceless_pourer_four_info_screen2 = _interopRequireDefault(_priceless_pourer_four_info_screen);
	
	var _priceless_pourer_level_four_screen = __webpack_require__(52);
	
	var _priceless_pourer_level_four_screen2 = _interopRequireDefault(_priceless_pourer_level_four_screen);
	
	var _priceless_pourer_five_info_screen = __webpack_require__(53);
	
	var _priceless_pourer_five_info_screen2 = _interopRequireDefault(_priceless_pourer_five_info_screen);
	
	var _priceless_pourer_level_five_screen = __webpack_require__(54);
	
	var _priceless_pourer_level_five_screen2 = _interopRequireDefault(_priceless_pourer_level_five_screen);
	
	var _fantastic_food_sharer_one_info_screen = __webpack_require__(55);
	
	var _fantastic_food_sharer_one_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_one_info_screen);
	
	var _fantastic_food_sharer_level_one_screen = __webpack_require__(56);
	
	var _fantastic_food_sharer_level_one_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_one_screen);
	
	var _fantastic_food_sharer_two_info_screen = __webpack_require__(58);
	
	var _fantastic_food_sharer_two_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_two_info_screen);
	
	var _fantastic_food_sharer_level_two_screen = __webpack_require__(59);
	
	var _fantastic_food_sharer_level_two_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_two_screen);
	
	var _fantastic_food_sharer_three_info_screen = __webpack_require__(60);
	
	var _fantastic_food_sharer_three_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_three_info_screen);
	
	var _fantastic_food_sharer_level_three_screen = __webpack_require__(61);
	
	var _fantastic_food_sharer_level_three_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_three_screen);
	
	var _fantastic_food_sharer_four_info_screen = __webpack_require__(62);
	
	var _fantastic_food_sharer_four_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_four_info_screen);
	
	var _fantastic_food_sharer_level_four_screen = __webpack_require__(63);
	
	var _fantastic_food_sharer_level_four_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_four_screen);
	
	var _fantastic_food_sharer_five_info_screen = __webpack_require__(64);
	
	var _fantastic_food_sharer_five_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_five_info_screen);
	
	var _fantastic_food_sharer_level_five_screen = __webpack_require__(65);
	
	var _fantastic_food_sharer_level_five_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_five_screen);
	
	var _dynamic_diverter_one_info_screen = __webpack_require__(66);
	
	var _dynamic_diverter_one_info_screen2 = _interopRequireDefault(_dynamic_diverter_one_info_screen);
	
	var _dynamic_diverter_level_one_screen = __webpack_require__(67);
	
	var _dynamic_diverter_level_one_screen2 = _interopRequireDefault(_dynamic_diverter_level_one_screen);
	
	var _dynamic_diverter_two_info_screen = __webpack_require__(83);
	
	var _dynamic_diverter_two_info_screen2 = _interopRequireDefault(_dynamic_diverter_two_info_screen);
	
	var _dynamic_diverter_level_two_screen = __webpack_require__(84);
	
	var _dynamic_diverter_level_two_screen2 = _interopRequireDefault(_dynamic_diverter_level_two_screen);
	
	var _dynamic_diverter_three_info_screen = __webpack_require__(85);
	
	var _dynamic_diverter_three_info_screen2 = _interopRequireDefault(_dynamic_diverter_three_info_screen);
	
	var _dynamic_diverter_level_three_screen = __webpack_require__(86);
	
	var _dynamic_diverter_level_three_screen2 = _interopRequireDefault(_dynamic_diverter_level_three_screen);
	
	var _dynamic_diverter_four_info_screen = __webpack_require__(87);
	
	var _dynamic_diverter_four_info_screen2 = _interopRequireDefault(_dynamic_diverter_four_info_screen);
	
	var _dynamic_diverter_level_four_screen = __webpack_require__(88);
	
	var _dynamic_diverter_level_four_screen2 = _interopRequireDefault(_dynamic_diverter_level_four_screen);
	
	var _dynamic_diverter_five_info_screen = __webpack_require__(89);
	
	var _dynamic_diverter_five_info_screen2 = _interopRequireDefault(_dynamic_diverter_five_info_screen);
	
	var _dynamic_diverter_level_five_screen = __webpack_require__(90);
	
	var _dynamic_diverter_level_five_screen2 = _interopRequireDefault(_dynamic_diverter_level_five_screen);
	
	var _want_to_stack_screen = __webpack_require__(91);
	
	var _want_to_stack_screen2 = _interopRequireDefault(_want_to_stack_screen);
	
	var _video_screen = __webpack_require__(92);
	
	var _video_screen2 = _interopRequireDefault(_video_screen);
	
	var _master_sorter_one_info_screen = __webpack_require__(93);
	
	var _master_sorter_one_info_screen2 = _interopRequireDefault(_master_sorter_one_info_screen);
	
	var _master_sorter_level_one_screen = __webpack_require__(94);
	
	var _master_sorter_level_one_screen2 = _interopRequireDefault(_master_sorter_level_one_screen);
	
	var _master_sorter_two_info_screen = __webpack_require__(97);
	
	var _master_sorter_two_info_screen2 = _interopRequireDefault(_master_sorter_two_info_screen);
	
	var _master_sorter_level_two_screen = __webpack_require__(98);
	
	var _master_sorter_level_two_screen2 = _interopRequireDefault(_master_sorter_level_two_screen);
	
	var _master_sorter_three_info_screen = __webpack_require__(99);
	
	var _master_sorter_three_info_screen2 = _interopRequireDefault(_master_sorter_three_info_screen);
	
	var _master_sorter_level_three_screen = __webpack_require__(100);
	
	var _master_sorter_level_three_screen2 = _interopRequireDefault(_master_sorter_level_three_screen);
	
	var _master_sorter_four_info_screen = __webpack_require__(101);
	
	var _master_sorter_four_info_screen2 = _interopRequireDefault(_master_sorter_four_info_screen);
	
	var _master_sorter_level_four_screen = __webpack_require__(102);
	
	var _master_sorter_level_four_screen2 = _interopRequireDefault(_master_sorter_level_four_screen);
	
	var _master_sorter_five_info_screen = __webpack_require__(103);
	
	var _master_sorter_five_info_screen2 = _interopRequireDefault(_master_sorter_five_info_screen);
	
	var _master_sorter_level_five_screen = __webpack_require__(104);
	
	var _master_sorter_level_five_screen2 = _interopRequireDefault(_master_sorter_level_five_screen);
	
	var _now_a_member_screen = __webpack_require__(105);
	
	var _now_a_member_screen2 = _interopRequireDefault(_now_a_member_screen);
	
	var _quit_screen = __webpack_require__(106);
	
	var _quit_screen2 = _interopRequireDefault(_quit_screen);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screenBeforeAndAfter: 2,
	    screens: [_4.default, _title_screen2.default, _hi_there_screen2.default, _key_is_sorting_screen2.default, _lights_screen2.default, _five_ways_screen2.default, (0, _level_screen_component2.default)(1.0), _recycling_champion_one_info_screen2.default, _recycling_champion_level_one_screen2.default, (0, _level_screen_component2.default)(1.1), _recycling_champion_two_info_screen2.default, _recycling_champion_level_two_screen2.default, (0, _level_screen_component2.default)(1.2), _recycling_champion_three_info_screen2.default, _recycling_champion_level_three_screen2.default, (0, _level_screen_component2.default)(1.3), _recycling_champion_four_info_screen2.default, _recycling_champion_level_four_screen2.default, (0, _level_screen_component2.default)(1.4), _recycling_champion_five_info_screen2.default, _recycling_champion_level_five_screen2.default, (0, _level_screen_component2.default)(1.5), (0, _level_complete_screen_component2.default)(1), (0, _level_screen_component2.default)(2.0), _priceless_pourer_one_info_screen2.default, _priceless_pourer_level_one_screen2.default, (0, _level_screen_component2.default)(2.1), _priceless_pourer_two_info_screen2.default, _priceless_pourer_level_two_screen2.default, (0, _level_screen_component2.default)(2.2), _priceless_pourer_three_info_screen2.default, _priceless_pourer_level_three_screen2.default, (0, _level_screen_component2.default)(2.3), _priceless_pourer_four_info_screen2.default, _priceless_pourer_level_four_screen2.default, (0, _level_screen_component2.default)(2.4), _priceless_pourer_five_info_screen2.default, _priceless_pourer_level_five_screen2.default, (0, _level_screen_component2.default)(2.5), (0, _level_complete_screen_component2.default)(2), (0, _level_screen_component2.default)(3.0), _fantastic_food_sharer_one_info_screen2.default, _fantastic_food_sharer_level_one_screen2.default, (0, _level_screen_component2.default)(3.1), _fantastic_food_sharer_two_info_screen2.default, _fantastic_food_sharer_level_two_screen2.default, (0, _level_screen_component2.default)(3.2), _fantastic_food_sharer_three_info_screen2.default, _fantastic_food_sharer_level_three_screen2.default, (0, _level_screen_component2.default)(3.3), _fantastic_food_sharer_four_info_screen2.default, _fantastic_food_sharer_level_four_screen2.default, (0, _level_screen_component2.default)(3.4), _fantastic_food_sharer_five_info_screen2.default, _fantastic_food_sharer_level_five_screen2.default, (0, _level_screen_component2.default)(3.5), (0, _level_complete_screen_component2.default)(3), (0, _level_screen_component2.default)(4.0), _dynamic_diverter_one_info_screen2.default, _dynamic_diverter_level_one_screen2.default, (0, _level_screen_component2.default)(4.1), _dynamic_diverter_two_info_screen2.default, _dynamic_diverter_level_two_screen2.default, (0, _level_screen_component2.default)(4.2), _dynamic_diverter_three_info_screen2.default, _dynamic_diverter_level_three_screen2.default, (0, _level_screen_component2.default)(4.3), _dynamic_diverter_four_info_screen2.default, _dynamic_diverter_level_four_screen2.default, (0, _level_screen_component2.default)(4.4), _dynamic_diverter_five_info_screen2.default, _dynamic_diverter_level_five_screen2.default, (0, _level_screen_component2.default)(4.5), (0, _level_complete_screen_component2.default)(4), _want_to_stack_screen2.default, _video_screen2.default, (0, _level_screen_component2.default)(5.0), _master_sorter_one_info_screen2.default, _master_sorter_level_one_screen2.default, (0, _level_screen_component2.default)(5.1), _master_sorter_two_info_screen2.default, _master_sorter_level_two_screen2.default, (0, _level_screen_component2.default)(5.2), _master_sorter_three_info_screen2.default, _master_sorter_level_three_screen2.default, (0, _level_screen_component2.default)(5.3), _master_sorter_four_info_screen2.default, _master_sorter_level_four_screen2.default, (0, _level_screen_component2.default)(5.4), _master_sorter_five_info_screen2.default, _master_sorter_level_five_screen2.default, (0, _level_screen_component2.default)(5.5), (0, _level_complete_screen_component2.default)(5), _now_a_member_screen2.default, (0, _level_complete_screen_component2.default)(6)],
	    menus: {
	        quit: _quit_screen2.default
	    },
	    assets: [React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_recycle.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_liquids.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_landfill.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_foodshare.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_compost.json' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_recycle.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_liquids.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_landfill.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_foodshare.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_compost.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'purple.ribbon.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'luggage.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.star.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.01.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.02.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'transition.frame.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.mainnav.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'Img.anotherChance.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'img.resort.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'vertical.pipe.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'pipe.meter.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'container.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'titlescrnbg.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.01.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.02.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.03.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.04.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.transition.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.recycle.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.landfill.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.compost.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'quit.background.jpg' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'button', src: CMWN.MEDIA.EFFECT + 'ButtonClick.mp3' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'screen-complete', src: MEDIA.EFFECT + 'NextAppear.mp3' }), React.createElement(skoash.Audio, { ref: 'BKG0', type: 'background', src: CMWN.MEDIA.EFFECT + 'titlescreen.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG1', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG2', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG2.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG3', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG3.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG4', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG4.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG5', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG5.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG6', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG6.mp3', loop: true }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background bkg1' }), React.createElement('div', { className: 'background bkg2' }), React.createElement('div', { className: 'background bkg3' }), React.createElement('div', { className: 'background bkg4' }), React.createElement('div', { className: 'background trash' }), React.createElement('div', { className: 'background transition' }), React.createElement('div', { className: 'background quit' })]
	}));
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "green-team-challenge",
		"version": 1,
		"skoash": "1.1.4",
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
	            silentComplete: true,
	            backgroundAudio: 'BKG0'
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
	
	var _sparkle = __webpack_require__(11);
	
	var _sparkle2 = _interopRequireDefault(_sparkle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    fireworks: _fireworks2.default,
	    sparkle: _sparkle2.default
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (node, opts) {
	    return new Sparkle(node, opts);
	};
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* eslint-disable max-len */
	var css = '.sparkle-effect {' + 'display: block;' + 'position: absolute;' + 'top: 50%;' + 'left: 50%;' + 'background-repeat: no-repeat;' + 'background-position:center;' + 'background-size: 100% 100%;' + 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAMAAACJuGjuAAADAFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/LkhhAAAA/3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7rCNk1AAAbWElEQVR4AezcS8uU9QOHcf3/ayFWYyHixlnYAREHa9GhGCSxFjIgFthhxI1Y+RRibmwQEcRirIWIiynosBAHsRYiDG7sEMxGnoXII+LGgqmFWIueQNyIXcHNj3sffO/d9XkJ1wu4lvwXesQETdBqE6gJHROoCS+bQE3omUBNeM8EasKHJlAThiZogr4wQRM0NkET9LMJmqB5EzRBMxM0QX+boAliiZT3EA8bQXmP8pgRlNembQTlPclTRlBeh44RlPciLxlBeZvYZATl9egZQXmv8boRlNenbwTlvcO7RlDe+3xgBOUNGBhBeUc4YgTlDRkaQXmnOGUE5Y343AjKGzM2gvK+5TsjKG/CxAjK+5GfjKC8KVMjKG+BBSMo7wY3jKC8GTMjKO8P/jSC8hZZNILy/gEjKO4B4EEzKK0FtMygtNXAajMorQ1eQZS3AdhgBqU9DTxjBqV1ga4ZlPYK8KoZlNYDryDKewt42wxK2wXsMoPS5oA5MyjtAHDADEobgFcQ5X0MfGIGpX0KfGYGpY2AkRmU9jXwjRmUNgavIMq7AFwwg9IuAhfNoLQpOG9Q3jwwbwalLYBXEOX9AvxqBqX9BvxuBqUtgvMG5d0F7ppBaQCYQWHLAVhuCGWtAGCFIZTVBucNynscgCcMoawOAB1DKOt5AF4whLK64BVEeT1w3qC87QBsN4Sy+gD0DaGsPQDsMYSy5sAriPI+AucNyjsMwGFDKGsIwNAQyjoJwElDKGsEXkGUdwaAM4ZQ1jkAzhlCWRMAJoZQ1vcA/GAIZU3BK4jyrgJw1RDKug7AdUMoawbAzBDKug3AbUNkaRHyVxDpPgD3DRGl/0Hl/6ZIUgsqLVMkaRVUVpkiSW3IX0Gk9VBZb4okbYTKRlMkqQv5eYO0BSpbTJGkHuSvINIbUHnTFEnaCZWdpkjSHOTnDdJ+qOw3RZIGkL+CSMegcswUSToOleOmSNII8vMG6UuofGWKJI2hMjZFks5D5bwpkjSB/BVEmkJ+3iBdhsplUyRpASoLpkjSTajcNEWSZpC/gkh/QX7eIN2Byh1TJAkKUwRpGRTLjJGjFuSvINIaKNYYI0droVhrjBx1oOgYI0fPQvGcMXLUhfwVRNoKxVZj5GgbFNuMkaM+FH1j5Gg3FLuNkaM5yF9BpINQHDRGjg5BccgYORpCMTRGjk5AccIYORpB/goinYbitDFydBaKs8bI0QTy8wbpEhSXjJGjKeSvINIVKK4YI0fXoLhmjBzNID9vkG5BccsYOVqE/BVEugfFPWPEaCnUlpojRS3IzxuklVBbaY4UtaHWNkeK1kFtnTlS1IH8FUTqQn7eIG2G2mZzpKgHtZ45UrQDajvMkaI+5K8g0l6o7TVHivZBbZ85UjSA2sAcKToKtaPmUP4J8i979/7fVGH/cfwdAgXKpQRE7YCCGYJOqpOgKGNeWAQVZE6MDxQFnC7aydTxZaa4L2MyB5kXp2NWog8Fpx0zXlCUL2oEQRBRgkrVDcHIfShCLJQLxZL3t1ww55yENpdzTnP5PP+G/tDzOvm8j6yCCB09yqhHkYtEIZrA44x6HKZr1hPCaMWnw3yVjKqE2VoOt0AY7vzLYLqXGPUiTGb7QwGECUbe2oSbIOavgnSbXQRhivKpFphrMaMWw1RnLu8KYZKKfxTAVMsYtQxmGrSxFMIs1lcC7WCmKkZVwUSjagZBmKdw+cfFMNEaRq2BeTwHR8FMovPa9T8yfxPE5FUQ63SWw1yi57bwT2GaMKPCMEnrl1gBs4n+e/ZdDbPUMGoXzNHxXb5ihenE8LqDd8AkVIIpTlnN5YVoAuKGCB+0wAwtqdQSJui7lWs7o0mIcvJfLc3eBDFnFWRIDbf1RBMRFeTbHWC8LlTqAsPdeIB7+kM0XSglP+kGw/WgUg8YbVKEB4ajKUkoJTeXmjndYMJ4g/VxMjIKTUtCKVl9MQzWj0r9YKg2r8rFRkaEUrL2WrM2QUxYBTnxfVLCaEaEUjLyOxjqUioNgYF6riUljGZIKCX5NysMNIxKw2Ccc7eREkYzRBnrvdjK8OkGE8YbrthNShjNrKu/pR1hmLFUGgujuOtICaOZw/Is6/2nB4xSRqUyGMMyhaSE0UxSsID1tp4Ng0yg0gQYosVM1qsbDpE5iqpYb9dgGGMiafgqSLvXeUgZRCbpuon1DowxcrrB0PGGk1fKMERGOm0b60X+F0Z4kEoPQH+91/GQZy0QGRhK682wQn8VVKqA7n6yg4csKEBmklBKzm0D3c2i0izo7aq9PKSqCJlKQim5vLMRmyBGroKMq+MhG7pCZPI82tofGjDdYNx4g+UvJDM/jEooJb8+B/p6g0pvQE8FlWRWhFEJpeTuodDVEiotgY6KFpBZEkYllJJ1N0NPK6kUhH66rCKzJoxKKK13j0XfTRBjVkH6bMySxVxRWs0jnmpuzHQDuR56uShMZkkYFYNqecT8ttDLFiptgU6u2U9mTRgVoyI8IngydFJNpWro47cRMhvDqHyf5Mte0EctlWqhh2YP86hNXZEVRAWP2j4AuqAadNDKz6OqS5E15ED6qL1XQgftqdYeabMt5lG1g5AtROFCHlV3G9LXiWodka7un/GwLD15llBab5oF6SqhWgnSdNaWbP9InYRS8pkCpKk31XohPc6dPKYCWUpCKflWe103QdJeBbm+lse8ZEW2klBKrvoB0jKAagOQjokRUsJoLoRScsMZSMeFVLsQqbM+SlLCaG6EUjJ8AdIwlGpDkbLWc0gJozkTSsn9LqRuBNVGIFWd3iMljOZQKCUP3pn+JkjaqyD2z0kJo7mxJBn1UDOk6BaquZGafltJCaO5siQZ9VxLpGYc1VKs+ZfWkBJGc2dJMmqRLfWngPTHG375HSlhNJcOpKM+7YZUTKbaZKRgcoRRObEFKQfSUZvPTGcTJI1VkOZPUEG2IHNBGRV2DkLyplNtOpLVZh4VZAsyN/yBCrWjkLQZVJuBJJ30ARXk5DlXVFAh4klzuiH58YZTv6CCnDznVChVmG5Fcl6g2vNISv9tVJCT51wNpeRLrZPeBEljFWT4HipE3MhREkrJdzsiGYuo9jaScGsdmR9hVEIpufoUJGEp1ZYiYZZ7qVKBHCahlNzaN7nphhTHG1o8TTJ/wqiEUrJmCBK2mmqrkaB2b5ISRnNdGVUOjE1xE4TcgMQUf0hKGM1906gSmYQEbafadiTk9HVk3oRRWZJUeNyKhOykWjUSMXAHmUdhVJYkFV5tg0RQCwkYsY/MqzAqB9IK75+IxhVQqwUadXsd1cqQ6+RAWmFtTzSqiFpFaITlfmpMQ+6TA2mFbeeiMcXUKkbDCmZTQ7Ygc90Fe6i2e1iymyCNroJ0WEiNvDt5llBK1rmTnG5obLyhaxU15OQ5H5RRa4oFDelLrb5oQJ9N1JCT5/wwjVozW6ABA6k1EMd38bfU2F6KvCShlHy9HY5vMLUuwXGN3E9KGJVQeszKkxPcBGlkFWRChJQwKqE0al3vhKcbyGsRX7NHqCRhVEIpuWMAjmM0tUYjrlYvkBJGJZRq7L0q4cfIMsTT8R1SwqgsSVKrbhziGk+t8Yij+79JCaNiVIQx/mJBHOXUKkesH/+X9SSMinLGerYAsaZSaypiXLKLh0kYFRWMtaAIMe6n1n3QGn2AWrIFKQfSCqu6JPAHWAGNuyNUky1IOZDW2HgGNGZS6ymoWB+jgmxBis6fMlb4okY2QbSrIIUvM45yCAmlKvuvgcpcas2FwgnLGUcFhIRSjchvoTSfWvMRZV9DLTl5VpJQqvDXZohaQq0l+N45XzGOJYUQEkrj8LfC91ZQ6wMcc/luUsJooiSUkottsZsgsasgN31HShhNnIRS8rMSHLWOWl/iiD9SS8KoloRSrS1n4YjN1NqEQ5o/yVgSRrUklGrtdOKwampVo17b/yMljCZCliQ1aq/HIfuotQ/ASStICaOJkSVJjUg56jEW0CtEShhNmCxJajxqRVvGanvedlLCaOLkQFprTmsbY43Zy7hkC1JolTG+ZWczYbIFGUtMY3xbmRDZgoxPWGYyPXLy3DgJpY2Tk+f0SChNUBkaJySUJmsKRJIklGpJGE2fhFItCaP6kVCqIWE0DRJKJYyaQEKphNE0yZKkhFHjyJKkhFETyJKkhFGRpja2EvsVe5iwBT9znG0vsbWByHvNbSfaT3cMdA533eie4Jnq9T3hfzGwKFgV2hLez5TtD28JVQUXBV70P+HzTvVMcN/oGu4c6DjdfpKtOXKFaGfrYXf0cw5xXece55nsfcT3rH9+4P3gF1+Gq9kEqsNffhF8PzDf/6zvEe9kzzj3da4hzn4Oew9bO4gMU2Artp/huMB5pesm910e732+J/1zAu8EPw1tDR9gFjkQ3hr6LPhOYI7/Sd99Xs9d7ptcVzovcJxhL7YVQBijyGbv6TjXeZnrevftnnu8033/9L8RWLEytD68i3lhV3h9aOWKwBv+f/r+7r3Hc7v7etdlznMdPe22IogGtbJ1sZc6LnJe5frVLZ6J3gd8M/2vBJYG/xP6OlxH0YC68Neh/wSXBl7xz/Q94J3oueVXrhHOixyl9i62VsgPtk72Xo7znENdo913ev7krfD9yx94K/hRaGN4N4Uhdoc3hj4KvhXw/8tX4f2T5073aNdQ53mOXvZONmSVQls3+1mOQU7XNe4yz++9D/me9r8aWBb8PPRNOEKRUSLhb0KfB5cFXvU/7XvI+3tPmfsal3OQ4yx7N1shmoDV1tl+mmOA8wrXWPd4z5+9M3z+FwILg6tCm8N7KXLE3vDm0KrgwsALft8M7589491jXVc4BzhOs3e2WZG6trbu9rMdzsGuke7bPJO8D/ue8c8LLA+uDe34lnlPfLsjtDa4PDDP/4zvYe8kz23uka7BzvpC3N3WFhodOjvOd43x3Ot7LvBRqIYpEqIm9FHgOd+fPWNc5yNWe9spdsc5h8Pib+rD4t98lfVh8YNDYXEn857YeSj0flAfeit9f6sPvb85HHrPcdhPsbVP61XISYdfhfz88KuQacdehXyifRUiso321dQnx15NTTv8aurnzoGOHzXVq6m2thL72Y6fXeIa6f61Z5L3r75/+OcF3guuCe0IU2SY8I7QmuB7gXn+fxz+V+nX7pGuS468TG+LbNLMdoK9t2OAc5hrjHu8517vY77nng8sDH4c2hTeQ2GIveFNoY+DCwPPP+d7zHuvZ7x7jGuYc4Cjt/0EWzPkhda2rvYzHRc7r3a5b/Xc7X3QN8s/N/BucHVoW/ggRQMOhreFVgffDcz1z/I96L3bc6vbdbXzYseZ9q621hAN6tDRfqqjv/Ny1/XuOzxTvH/3zfa/GQh+GFofrmFeqAmvD30YDLzpn+37u3eK5w73Da7Lnf0dp9o7doAwRktbsb2P40LnL1w3u+8q997ve9L/cuCd4Gehr7Lt1w1fHf51w8v+J333e8vvct/s+oXzQkcfe7GtJUSGMT+bmP6Ybj5hfjaJ/5guvyAV0WziqmNS1vY34jFdyDDIsxYIA8iU0TQII8j4WhlEw2QuUmYihQEqZNhWGGAqNWRxxgSyjSUbWSaQNT9Z9UuD7I/KDqnZJIxqPWFBgoSE0bo5EkqF/mF078+HMtZ2CaUirTD6zXm4gLEGz5FQKtIIo6FewPmMdZ710cZDqRDljGvFSQBKGasUmBhpJJQKMSrCeOa1Rb1TGasngBtqJZSKBg2qZTxPNschJYxVgnrOnRJKRQNKqxnPH3GEjbFsOOSsLccNpUJ03cQ4vrsJR7VlrLY4rPtn8om5pMjXAmoux/cYC0fZFjOecuQ7UbiMcXx1DqL2U2sfjmnlZxyRURASRmOtsUOhmlrV+F6zhxlH7SBoCQmjy0+A0mZqbYLC+AhjVZdCTUgYfbkQKuuo9SWUrtnPWJu6QkgYVXrMCrUqalVB5aIwY1VJKJUwqhC5G1orqLUCan02SigVDYbR2tGIsYRaS6DRZZWEUtFAGN11CWLNp9Z8aBUtOG4oFRJG//tjxPEqteYiRkHlcUKpkA8//7s74qmkViViWe6LG0qFfKr+nY6Iaya1nkI84+ryPpSKaYzxQquEI2oF4rpqr4RSLTl5fqQZjuN+at2H+H6yQ0Kpipw8R/4nmUGHqTiO3uuoVVWEvCUnz/tH4vjKk3jaO3kltRYUIC+I0h3U+PZiNGA8tcbjuNq9LkuSR0kY3dQHDSlL6i61xSw5kD5MwmhVVzRoDLVGowGWKXIgXU/C6MIOaNh11LoWDXLXyYG0hNHZBWjEUGoNRcOu2E21PT9FfpEwer8FjRlMrUvQiHO35XUolTBadzsaN5BaA9GYnmvzOJRKGN03AgnoS62+aNSJ7+dtKJUwumMgElFKrVI0rs1reRpKZQty3elISAm1SpAA6+N5GUplC/LDYiTmB9QqRkImRfIvlMoW5JvtkKAiahUhMTceyLdQKifPT7dAogqo1QIJGlKTX6FUTp7vtSBx1ELC+m6VJck8OnmuuxXJ2Em1aiTulNWyJJnD3BEq7BmOpGyn2nYkodO7siSZJ2F0W38kZwPVNiAZrV+SA+m8CKNfnIokrabaaiTFOl0OpPMgjH5wEpJVRbUqJMkTkQPpXA+j89ogaUupthTJGlVLhckQuRZGn2iO5C2i2ttI2qCdORxKJYxGJiMVr1HtNSTvzM05G0oljH73S6TkBao9jxSUfJqjoVTCaM1lSE0l1SqRCtuinAylsgW5tR9SNINqM5CSls/lYCiVLcjP7UjVdKpNR2qaPZRzoVS2IN/rhJRN0+0A9c6DuRVK5eR5TmukbjJJnTqUa38uhVI5eX7UijSU67gAeUFYliRz5uQ5MhFpGUe125CGMzbIkmQ2s0bjU+0NSM8tVHMjHT9YJUuSORFGdzqRpuuodh3S0v4tOZDOgTC65SykawTVRiA9Bc/IgXTWh9HPuiNtQ6k2FGmyTJMD6SwPo4ttSN+FVLsQabutjkctKoTIujDqbwUdDKDaAKTvyr0SSrM3jD7cDHoopVopdDBgu4TSLA2jkfHQR2+q9YIeen0poTQrw+j+a6CTEqqVQBcnB7MwlMoWZPgi6KUT1TpCH23nZ10olS3IjX2gm/ZUaw+dNH8qy0KpbEFWdYGOqAbdWO7JqlAqJ88LiqCnWirVQkc312VPKJWT58oC6KqaStXQ09Dd2bIkKSfP91mgry1U2gJdnfN1Zi9Jiq4hHlI3DnrbQKX10NcP18qSZBaE0b1XQXdVVKqCzjovz/gDaQmjO34C/a2k0krorXBuhh9ISxhddxoMsIRKS6A764yMPpCWMLryZBjhDSq9AQP8PsJ62/ogA0kYfb0dDPGadhPEAGMOZGoolTA6qwWMUUmlShhi8K7MDKUSRqdYYJBZVJoFY5y9NQNDqYTROrdZI/EVMEiPf2dcKJUtyN1XwDgPUukBGKXj0gwLpbIFua2/ed9lnQbDtHoxo0KpbEGu7QkjTaTSRBjH+kgGhVI5eX7/RBhqApUmwEi/i2RKKJWT59famFDJTNs8vrY2M5Yk5eT5CSsMNpZKY2Gsi6tlSbKpXV7LyCQY7jrtJoixSjfJkmSTh9EDN8J4w6g0DEbr9okcSDdxGK25FCa4lEpDYLgOb8uBdJOG0a19YYaBVBoI47WcLQfSTRhGV58CU/SjUj+YwPIAIzdBNEkYfbcTzFFKpVKY4o6DEkqbQoV2YttAPajUA+a4ep/5oVSUc7oVZulCpS4wyU93mB1KxaiDHpiniEpFMMuP1psbSsWgmuthopZUagnTFH9sZigVpRsHwVRUgonavWleKBVdl58Jc9UwahfMVPB0BcwhimaXwGRhRoVhKsvUcphBFEy2wWwbGLUBJrt1JITxLMNbwnRrGLUGZrvsPAjDdWsG81UxqgqmO70YIictY9QymK8QIict/v927qVl6jKOwzh2WIjVWJQ8G2dhB0QcxEWHYpDEWsgfxAI7jLgRO0wh5sYG7ICIjLUQERzDDgtxEIsSYXBjh2JayLOxRsSNBVMLERdNIG7k6Rs3Nzf/rYvvb3d9XsL1Ai7VfiEHXEYR6wbgO9W+JYcLhhFPEOC4asfJ4YKjqh0lhwv6EesGYJ9q+8gBl55qPXLAZadqO8mBiCvI2+SASydi3QBsUW0LOeBSqVaRAy7rVVtPDri0I54gQCti3QCsVG0lOeDSVK1JDrg8otrD5IBLI+IJAixSbRE5YHNbxW1iwGemYkYMH1xTcY0YPphGPEGASyouEcMHF1VcJIYPxirGxPDBeRXnieGDUcQTBDil4hQxfHBCxQli+GCgwnjHBg6pOEQMH/QjniDAXhV7ieGDPSr2ECMC84YuMXywXcV2YvigE/EEATap2EQMH2xUsZEYPmhHrBuAJ1U8RQwftCKeIMAKFSuI4YPlKpYTwwcN1g2IsFjFYmIYQQUpnHBT2U1SOOEfniCIMGXdgAhXlV0lhRMmyiakcMIFZRdI4YQxTxBEGLFuQIQzys6QwglDZUNSOOFzZV+QwgkDniCIcFDZQVI4Yb+y/aRwQk9ZjxRO2KVsFymc0OUJgghblW0lhRNeUfYqKZxQKatI4YQNyjaQwgltniCIsEbZGlI4YZWyVaRwQlNZkxROWKZsGSmc0OAJggh3KbubFFZYULJACC/MWDcgwnUl1wnhhSlPEES4rOQyIbzwm5LfCeGFMesGRPheyQ+E8MKIJwginFZymhBeOKnkJCG8MGDdgAiHlRwmhBf6SvqE8MIHSj4kBLze5wkSAV3WDRGwQ8kOQsCro6RDCHhtVrKZEPCqeIJEQJt1QwQ8reQZQsCrpaRFCHg9quQxQsCryRMkApYqWUoIeC1RsoQQMFNCBrjdknSLDHCb8QSJgL8k/U0GuP0h6U8ywG0iaUIGuM1LmicD3MY8QSLgnKRzZIDbWUlnyQC3oaQhGeD2paSvyAC3AU+QCPhE0qdkgNsBSQfIALce64YI2C1pNxng1uUJEgHbJG0jA9xek/Q6GeBWsW6IgBckvUgGuLV5gkTAWklryQC31ZJWkwFuTdYNETAnaY4McGtIapABbvdIupcMsPtPIgL8ZqwbIuCGbhABflNNiQC/K7pCBPhNeIJEwFi/EgF+P+onIsBvpBER4Pe1viEC/IY8QSLgmI4RAX5HdIQI8OurTwT4faSPiQC/Hk+QCHhH7xIBfm/oTSLAr6MOEeD3kl4mAvwqniARsE7riAC/Z/UcEeDXUosI8HtcTxABfk2eIBHwoB4iAvzu0/1ECACRIAL+JUEETEkQAfMkiICfSRABQxJEwGckiIA+CSLgPRJEwFskiICKBBHwPAkioEWCCJgjQQQ8QII79D/eDQrIqmTAwgAAAABJRU5ErkJggg==);' + 'overflow: hidden;' + 'z-index: 2;' + 'color: tansparent;' + 'opacity: 0.0;' + 'animation: glitter 6s linear 0s infinite normal;' + '}' + '.sparkle-effect.small {' + 'width: 20px;' + 'height: 20px;' + '}' + '.sparkle-effect.medium {' + 'width: 30px;' + 'height: 30px;' + '}' + '.sparkle-effect.large {' + 'width: 50px;' + 'height: 50px;' + '}' + '@keyframes glitter {' + '0% {' + 'transform: scale(0.3) rotate(0deg);' + 'opacity: 0;' + '}' + '25% {' + 'transform: scale(1) rotate(360deg);' + 'opacity: 1;' + '}' + '50% {' + 'transform: scale(0.3) rotate(720deg);' + 'opacity: 0;' + '}' + '100% {' + 'transform: scale(0.3) rotate(0deg);' + 'opacity: 0;' + '}' + '}';
	/* eslint-enable */
	
	var Sparkle = function () {
	    function Sparkle(node, opts) {
	        _classCallCheck(this, Sparkle);
	
	        var style = document.createElement('style');
	        style.type = 'text/css';
	        if (style.styleSheet) {
	            style.styleSheet.cssText = css;
	        } else {
	            style.appendChild(document.createTextNode(css));
	        }
	
	        this.node = node;
	        this.node.appendChild(style);
	
	        this.opts = _.defaults(opts, {
	            stars: 100,
	            sparkle: 20
	        });
	
	        this.createStars();
	    }
	
	    _createClass(Sparkle, [{
	        key: 'createStars',
	        value: function createStars() {
	            var size = 'small';
	
	            for (var i = 0; i < this.opts.stars; i++) {
	                if (i % 2 === 0) {
	                    size = 'small';
	                } else if (i % 3 === 0) {
	                    size = 'medium';
	                } else {
	                    size = 'large';
	                }
	
	                this.createStar(size);
	            }
	        }
	    }, {
	        key: 'createStar',
	        value: function createStar(size) {
	            var sparkle = document.createElement('DIV');
	            sparkle.className = 'sparkle-effect ' + size;
	            sparkle.setAttribute('style', 'top: ' + (Math.random() * 100 + '%') + '; left: ' + (Math.random() * 100 + '%') + ';');
	
	            this.node.appendChild(sparkle);
	        }
	    }]);

	    return Sparkle;
	}();

/***/ },
/* 12 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 13 */
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
	
	var _classnames = __webpack_require__(14);
	
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
/* 14 */
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
/* 15 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);
	
	var _items_recycle = __webpack_require__(16);
	
	var _items_recycle2 = _interopRequireDefault(_items_recycle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var audioRefs = _.uniq(_.map(_items_recycle2.default, function (v) {
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'recycle';
	var names = ['aluminum-beverage-can', 'aluminum-pan', 'cardboard-box', 'clean-aluminum-foil', 'empty-aluminum-can-1', 'empty-aluminum-can-2', 'empty-aluminum-can-3', 'empty-aluminum-can-4', 'empty-box-of-crackers-3', 'empty-chocolate-milk-carton-4', 'empty-cookie-box-1', 'empty-cookie-box-2', 'empty-milk-carton', 'empty-milk-carton-2', 'empty-milk-carton-5', 'empty-milk-carton-6', 'empty-milk-carton-12', 'empty-milk-carton-13', 'empty-milk-carton-14', 'empty-plastic-bottle-1', 'empty-plastic-bottle-2', 'empty-plastic-bottle-3', 'empty-plastic-package', 'empty-yogurt-container-2', 'empty-yogurt-container-3', 'empty-yogurt-container-5', 'empty-yogurt-container-6', 'empty-yogurt-container-7', 'empty-yogurt-container-8', 'empty-yogurt-container-9', 'empty-yogurt-container-10', 'metal-food-can-1', 'metal-food-can-2', 'metal-food-can-3', 'metal-food-can-5', 'paper-folder', 'paper-packaging', 'paper-packaging-1', 'paper-packaging-8', 'plastic-cup-1', 'plastic-cup-2', 'plastic-cup-3', 'plastic-cup-4', 'plastic-cup-5', 'plastic-cup-6', 'plastic-cup-7', 'plastic-lids-1', 'plastic-packaging-2', 'plastic-packaging-4', 'plastic-packaging-5', 'plastic-packaging-6', 'plastic-packaging-7', 'wrapping-paper'];
	
	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
	});

/***/ },
/* 17 */
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
	
	var _items_landfill = __webpack_require__(18);
	
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
	
	var imageSrcs = [{ src: CMWN.MEDIA.IMAGE + 'lights.png' }, { src: CMWN.MEDIA.SPRITE + 'sprite.bins.png' }, { src: CMWN.MEDIA.SPRITE + 'sprite.btn.png' }];
	
	var audioRefs = _.uniq(_.map(_items_landfill2.default, function (v) {
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'landfill';
	var names = ['applesauce-pouch-1', 'applesauce-pouch-2', 'applesauce-pouch-3', 'applesauce-pouch-4', 'bag-of-wrappers', 'bubble-wrap', 'empty-cracker-wrapper-1', 'burrito-wrapper-1', 'burrito-wrapper-2', 'burrito-wrapper-3', 'burrito-wrapper-4', 'cereal-lid-wrapper-1', 'cereal-lid-wrapper-2', 'cereal-lid-wrapper-3', 'cereal-lid-wrapper-4', 'cereal-lid-wrapper-5', 'empty-bag-of-chips', 'empty-chip-bag', 'empty-chip-bag-2', 'empty-chip-bag-3', 'empty-chip-bag-4', 'empty-fruit-juice-plastic-1', 'empty-fruit-juice-plastic-2', 'empty-fruit-juice-plastic-3', 'empty-fruit-juice-plastic-4', 'empty-snack-wrapper-1', 'empty-snack-wrapper-2', 'empty-cracker-wrapper-3', 'energy-bar-wrapper', 'energy-bar-wrapper-2', 'fruit-drink-empty-pouch', 'fruit-snack-wrapper-2', 'fruit-snack-wrapper-3', 'gift-ribbons', 'graham-cookie-wrapper', 'graham-cookie-wrapper-2', 'juice-box', 'juice-box-2', 'juice-box-3', 'juice-box-4', 'juice-box-5', 'plastic-baggie', 'plastic-baggie-2', 'plastic-fork', 'plastic-knife', 'plastic-spoon', 'plastic-spork', 'plastic-straws', 'red-gift-bow', 'styrofoam-container-1', 'styrofoam-container-2', 'styrofoam-container-3', 'styrofoam-container-5', 'styrofoam-soup-cup'];
	
	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
	});

/***/ },
/* 19 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);
	
	var _items_compost = __webpack_require__(20);
	
	var _items_compost2 = _interopRequireDefault(_items_compost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var audioRefs = _.uniq(_.map(_items_compost2.default, function (v) {
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'compost';
	var names = ['apple-core', 'banana-peel', 'carrot-sticks', 'celery-stick', 'chicken-leg', 'coffee-cup-2', 'coffee-cup', 'coffee-grounds', 'dirty-paper-food-container', 'empty-raisin-box-1', 'empty-raisin-box-2', 'empty-raisin-box-3', 'empty-raisin-box-4', 'food-soiled-paper-plate', 'ham-sandwich', 'napkin-1', 'napkin-2', 'napkin-3', 'napkin-4', 'orange-slice', 'pencil-shavings-1', 'pencil-shavings-2', 'pencil-shavings-3', 'pencil-shavings', 'pizza-crust', 'soiled-paper-trays-1', 'soiled-paper-trays-2', 'soiled-paper-trays-3', 'soiled-paper-trays-4', 'teabag', 'used-paper-food-container', 'used-paper-sandwich-wrapper-1', 'used-paper-sandwich-wrapper-2', 'used-paper-sandwich-wrapper-4', 'used-takeout-containers', 'white-paper-towel-sheet'];
	
	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
	});

/***/ },
/* 21 */
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
	                    type: 'sfx',
	                    src: CMWN.MEDIA.EFFECT + 'rolling-dumpser.mp3'
	                }), React.createElement(skoash.Audio, {
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
	
	var _classnames = __webpack_require__(14);
	
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
/* 22 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 23 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_recycling_champion_opts = __webpack_require__(30);
	
	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 24 */
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
	        var play = _.get(props, 'data.play', null);
	
	        var audioArray = opts.getAudioArray();
	
	        if (itemRef) catchableRefs = [itemRef];
	
	        opts.revealOpen = _.get(props, 'data.reveal.open', false);
	        opts.revealClose = _.get(props, 'data.reveal.close', false);
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
	        opts.playAudio = play ? play : drop && !opts.truckClassName ? 'drop' : pickUp ? 'pickUp' : opts.next ? 'next' : opts.pour ? 'pour' : opts.next ? 'correct' : opts.revealOpen === 'resort' ? 'resort' : opts.revealOpen === 'retry' ? 'retry' : opts.itemNew ? _.kebabCase(opts.itemName) : dropClass === 'TRAY-STACKING' && _.includes(opts.itemName, 'tray') ? 'tray' : opts.itemName ? 'select' : null;
	
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
	                    className: (0, _classnames2.default)({
	                        final: _.get(props, 'data.timer.final')
	                    }),
	                    countDown: true,
	                    format: 'mm:ss',
	                    timeout: opts.timeout,
	                    complete: gameComplete,
	                    pause: opts.revealOpen,
	                    resume: !opts.revealOpen,
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
	                openReveal: opts.revealOpen,
	                closeReveal: opts.revealClose,
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
	                checkReady: false,
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
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(25);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(28);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PTS = 'pts';

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
	
	var _2 = __webpack_require__(26);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(27);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(29);
	
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
	                _this3.afterNext();
	            });
	        }
	    }, {
	        key: 'afterNext',
	        value: function afterNext() {
	            var refs = _.filter(this.refs, function (v, k) {
	                return !k.indexOf(ITEM);
	            });
	            this.invokeChildrenFunction('markCatchable');
	
	            this.updateScreenData({
	                key: this.props.refsTarget,
	                data: {
	                    refs: refs,
	                    next: false
	                }
	            });
	
	            this.props.onNext.call(this);
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _default_game_opts = __webpack_require__(31);
	
	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);
	
	var _items_to_sort = __webpack_require__(32);
	
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
	    getExtraComponents: function getExtraComponents() {
	        return [React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'pipe01.png' })];
	    }
	}, _default_game_opts2.default);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _2 = __webpack_require__(29);
	
	var _3 = _interopRequireDefault(_2);
	
	var _items_to_sort = __webpack_require__(32);
	
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
	        frame: v.frame || 0,
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
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
	
	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'drop', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ReleaseItem1.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'CorrectSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'retry', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'level-fail.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);
	
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
	                        data: {
	                            play: 'timer',
	                            timer: {
	                                final: true
	                            }
	                        }
	                    });
	                } else {
	                    this.updateScreenData({
	                        data: {
	                            timer: {
	                                final: false
	                            }
	                        }
	                    });
	                }
	            }
	        };
	    },
	    getRevealProps: function getRevealProps(opts) {
	        return {
	            onOpen: function onOpen() {
	                if (opts.revealOpen === 'next') return;
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _items_compost = __webpack_require__(20);
	
	var _items_compost2 = _interopRequireDefault(_items_compost);
	
	var _items_food_share = __webpack_require__(33);
	
	var _items_food_share2 = _interopRequireDefault(_items_food_share);
	
	var _items_landfill = __webpack_require__(18);
	
	var _items_landfill2 = _interopRequireDefault(_items_landfill);
	
	var _items_liquids = __webpack_require__(34);
	
	var _items_liquids2 = _interopRequireDefault(_items_liquids);
	
	var _items_recycle = __webpack_require__(16);
	
	var _items_recycle2 = _interopRequireDefault(_items_recycle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = [].concat(_items_compost2.default).concat(_items_food_share2.default).concat(_items_food_share2.default).concat(_items_food_share2.default).concat(_items_landfill2.default).concat(_items_liquids2.default).concat(_items_liquids2.default).concat(_items_liquids2.default).concat(_items_liquids2.default).concat(_items_liquids2.default).concat(_items_recycle2.default);

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'food-share';
	var names = ['bag-of-potato-chips-2', 'bag-of-potato-chips-3', 'box-of-cheddar-crackers', 'box-of-cookies', 'fresh-unopened-sandwich', 'ketchup-packet', 'mayo-packet', 'mustard-packet', 'package-of-dried-fruit', 'packaged-dinner-roll', 'packaged-vegetables', 'sealed-applesauce', 'sealed-bag-of-carrots', 'sealed-popcorn', 'sealed-chocolate-milk', 'sealed-fruit-drink-1', 'sealed-fruit-drink-2', 'sealed-fruit-drink-3', 'sealed-milk-1', 'sealed-milk-2', 'sealed-milk-3', 'sealed-orange-juice', 'sealed-pretzel', 'single-serve-cereal', 'single-serve-cereal-2', 'single-serve-cereal-3', 'single-serve-cookies', 'unopened-box-of-raisins', 'unopened-cookies-package', 'unopened-crackers-1', 'unopened-crackers-2', 'unopened-crackers-3', 'unopened-energy-bar', 'unopened-graham-cookies-1', 'unopened-graham-cookies-2', 'unopened-graham-cookies-3', 'unopened-granola-bar', 'unopened-juice-box-1', 'unopened-juice-box-2', 'unopened-juice-box-3', 'unopened-pack-of-grapes', 'whole-apple', 'whole-banana', 'whole-orange', 'yogurt-cup-1', 'yogurt-cup-2'];
	
	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'liquids';
	var names = ['half-full-energy-drink-bottle', 'full-plastic-water-bottle-1', 'full-plastic-water-bottle-2', 'full-plastic-water-bottle-3', 'full-plastic-water-bottle-4', 'half-full-lemonade-box-1', 'half-full-lemonade-box-4', 'half-full-chocolate-milk-carton', 'half-full-chocolate-milk-carton', 'half-full-milk-carton-1', 'half-full-milk-carton-2', 'half-full-milk-carton-3', 'half-full-milk-carton-4', 'half-full-milk-carton-5', 'half-full-milk-carton-6', 'half-full-milk-carton-7', 'half-full-milk-carton-8', 'half-full-orange-juice-2'];
	
	var becomes = [{
	    name: 'empty-plastic-bottle-1',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-bottle-1',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-bottle-2',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-bottle-3',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-bottle-4',
	    bin: 'recycle'
	}, {
	    name: 'juice-box-1',
	    bin: 'landfill'
	}, {
	    name: 'juice-box-2',
	    bin: 'landfill'
	}, {
	    name: 'empty-milk-carton',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton',
	    bin: 'recycle'
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
/* 35 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 36 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_recycling_champion_opts = __webpack_require__(30);
	
	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 37 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 38 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_recycling_champion_opts = __webpack_require__(30);
	
	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 39 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 40 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_recycling_champion_opts = __webpack_require__(30);
	
	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 41 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 42 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_recycling_champion_opts = __webpack_require__(30);
	
	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 43 */
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
	            ),
	            React.createElement(skoash.Component, {
	                className: SPARKEL,
	                onStart: onStart,
	                onStop: onStop
	            })
	        );
	    };
	};
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SPARKEL = 'sparkle';
	
	var onStart = function onStart() {
	    this.effect = window.CMWN.makeEffect('sparkle', ReactDOM.findDOMNode(this));
	};
	
	var onStop = function onStop() {
	    _.invoke(this.effect, 'destroy');
	    delete this.effect;
	};
	
	var flipKeys = ['recycling-champion', 'priceless-pourer', 'fantastic-food-sharer', 'dynamic-diverter', 'master-sorter', 'green-team-challenge'];
	
	var levelNames = ['Recycling Champion', 'Priceless Pourer', 'Fantastic Food Sharer', 'Dynamic Diverter', 'Master Sorter'];
	
	var numberWords = ['One', 'Two', 'Three', 'Four', 'Five'];
	
	var getLevelHeader = function getLevelHeader(levelNumberWord) {
	    if (levelNumberWord) return React.createElement(
	        'h3',
	        { className: 'animated' },
	        'Level ',
	        levelNumberWord,
	        ' Complete!'
	    );
	    return React.createElement(
	        'div',
	        { className: 'header animated' },
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
/* 44 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 45 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_priceless_pourer_opts = __webpack_require__(46);
	
	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(29);
	
	var _3 = _interopRequireDefault(_2);
	
	var _default_game_opts = __webpack_require__(31);
	
	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);
	
	var _items_to_sort = __webpack_require__(32);
	
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
	        frame: v.frame || 0,
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
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
	
	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'drop', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ClickRecButton.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'retry', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'level-fail.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);
	
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
	                        var _this2 = this;
	
	                        var items = this.state.items;
	                        var index = this.firstItemIndex;
	                        var item = items[index];
	                        item.props.className = item.props.becomes.name;
	                        item.props.message = item.props.becomes.bin;
	                        item.props['data-message'] = item.props.becomes.bin;
	                        items[index] = item;
	                        this.setState({ items: items }, function () {
	                            _this2.afterNext();
	                        });
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
	                        this.updateGameData({
	                            keys: [_.camelCase(opts.gameName), 'levels', opts.level, 'score'],
	                            data: opts.score + opts.pointsPerItem
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
/* 47 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 48 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_priceless_pourer_opts = __webpack_require__(46);
	
	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 49 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 50 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_priceless_pourer_opts = __webpack_require__(46);
	
	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 51 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 52 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_priceless_pourer_opts = __webpack_require__(46);
	
	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 53 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 54 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_priceless_pourer_opts = __webpack_require__(46);
	
	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 55 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 56 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_fantastic_food_sharer_opts = __webpack_require__(57);
	
	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(29);
	
	var _3 = _interopRequireDefault(_2);
	
	var _default_game_opts = __webpack_require__(31);
	
	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);
	
	var _items_to_sort = __webpack_require__(32);
	
	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PICKUP = 'PICKUP';
	var DROPPED = 'DROPPED';
	var TILT = 'TILT';
	var ITEMS = 'items-';
	
	var TRUCK_SRC = CMWN.MEDIA.SPRITE + 'dumptruck.png';
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
	        frame: v.frame || 0,
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
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
	    React.createElement(skoash.Audio, { delay: 2600, type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFunnel.mp3' }),
	    React.createElement(skoash.Audio, { type: 'sfx', src: CMWN.MEDIA.EFFECT + 'TruckDump.mp3' })
	), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'retry', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'level-fail.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);
	
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
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: TRUCK_SRC
	            }),
	            React.createElement(skoash.Sprite, {
	                className: 'claw',
	                src: CLAW_SRC,
	                frame: 0,
	                loop: false,
	                animate: opts.moveClaw,
	                duration: [200, 200, 200, 500, 100, 1000, 200, 200, 200, 200, 200, 200],
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
/* 58 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 59 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_fantastic_food_sharer_opts = __webpack_require__(57);
	
	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 60 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 61 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_fantastic_food_sharer_opts = __webpack_require__(57);
	
	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 62 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 63 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_fantastic_food_sharer_opts = __webpack_require__(57);
	
	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 64 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 65 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_fantastic_food_sharer_opts = __webpack_require__(57);
	
	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 66 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 1,
	        scoreToWin: 100,
	        binItems: binItems
	    }, _default_dynamic_diverter_opts2.default));
	};
	
	var _dynamic_diverter_game_component = __webpack_require__(68);
	
	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);
	
	var _default_dynamic_diverter_opts = __webpack_require__(82);
	
	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var binItems = _default_dynamic_diverter_opts2.default.getBinItems();

/***/ },
/* 68 */
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
	            opts.playAudio = play ? play : revealOpen === 'resort' ? 'resort' : revealOpen === 'retry' ? 'retry' : _.kebabCase(itemName);
	
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
	                    React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'next-bin.png' }),
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
	                            className: (0, _classnames2.default)({
	                                final: _.get(props, 'data.timer.final')
	                            }),
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
	                            ref: 'next',
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
	                        checkReady: false,
	                        complete: true
	                    })
	                )
	            };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	};
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(28);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(69);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(80);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(81);
	
	var _9 = _interopRequireDefault(_8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PTS = 'pts';
	
	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;
	
	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 0,
	        'static': true
	    });
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _shortid = __webpack_require__(70);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _2 = __webpack_require__(79);
	
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
	
	            var list = this.state.list || this.props.list || [];
	            return _.map(list, function (li, key) {
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(71);


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(72);
	var encode = __webpack_require__(74);
	var decode = __webpack_require__(76);
	var isValid = __webpack_require__(77);
	
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
	var clusterWorkerId = __webpack_require__(78) || 0;
	
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(73);
	
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
/* 73 */
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(75);
	
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
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(72);
	
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(72);
	
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
/* 78 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _default_game_opts = __webpack_require__(31);
	
	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);
	
	var _items_compost = __webpack_require__(20);
	
	var _items_compost2 = _interopRequireDefault(_items_compost);
	
	var _items_landfill = __webpack_require__(18);
	
	var _items_landfill2 = _interopRequireDefault(_items_landfill);
	
	var _items_recycle = __webpack_require__(16);
	
	var _items_recycle2 = _interopRequireDefault(_items_recycle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var itemsToRemove = 8;
	
	var shuffledItemsCompost = _.shuffle(_items_compost2.default);
	var shuffledItemsLandfill = _.shuffle(_items_landfill2.default);
	var shuffledItemsRecycle = _.shuffle(_items_recycle2.default);
	
	var itemsToSort = [].concat(_items_compost2.default).concat(_items_landfill2.default).concat(_items_recycle2.default);
	
	var audioRefs = _.uniq(_.map(itemsToSort, function (v) {
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
	
	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'retry', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'level-fail.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);
	
	exports.default = _.defaults({
	    gameName: 'dynamic-diverter',
	    gameNumber: 4,
	    scoreToWin: 1200,
	    timeout: 240000,
	    dropperAmount: 2,
	    getDropperProps: function getDropperProps() {
	        return {
	            onNext: function onNext() {
	                itemsToRemove = 8;
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
	                var _this = this;
	
	                var score = opts.score + opts.pointsPerItem;
	
	                itemsToRemove--;
	
	                draggable.markCorrect();
	
	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        score: score
	                    }
	                });
	
	                if (!itemsToRemove) {
	                    this.updateScreenData({
	                        data: {
	                            'manual-dropper': {
	                                next: true
	                            },
	                            reveal: {
	                                open: 'next'
	                            }
	                        },
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
	                }
	            },
	            onIncorrect: function onIncorrect(draggable, dropzoneArray) {
	                var _this2 = this;
	
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
	                            _this2.updateScreenData({
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
	
	    binItems: [],
	    getBinItems: function getBinItems() {
	        if (shuffledItemsCompost.length < 20) {
	            shuffledItemsCompost = shuffledItemsCompost.concat(_.shuffle(_items_compost2.default));
	        }
	
	        if (shuffledItemsLandfill.length < 20) {
	            shuffledItemsLandfill = shuffledItemsLandfill.concat(_.shuffle(_items_landfill2.default));
	        }
	
	        if (shuffledItemsRecycle.length < 20) {
	            shuffledItemsRecycle = shuffledItemsRecycle.concat(_.shuffle(_items_recycle2.default));
	        }
	
	        return [{
	            name: 'recycle',
	            objects: [].concat(shuffledItemsCompost.splice(0, 4)).concat(shuffledItemsLandfill.splice(0, 4)).concat(shuffledItemsRecycle.splice(0, 12))
	        }, {
	            name: 'landfill',
	            objects: [].concat(shuffledItemsCompost.splice(0, 4)).concat(shuffledItemsLandfill.splice(0, 12)).concat(shuffledItemsRecycle.splice(0, 4))
	        }, {
	            name: 'compost',
	            objects: [].concat(shuffledItemsCompost.splice(0, 12)).concat(shuffledItemsLandfill.splice(0, 4)).concat(shuffledItemsRecycle.splice(0, 4))
	        }];
	    }
	}, _default_game_opts2.default);

/***/ },
/* 83 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 2,
	        scoreToWin: 150,
	        binItems: binItems
	    }, _default_dynamic_diverter_opts2.default));
	};
	
	var _dynamic_diverter_game_component = __webpack_require__(68);
	
	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);
	
	var _default_dynamic_diverter_opts = __webpack_require__(82);
	
	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var binItems = _default_dynamic_diverter_opts2.default.getBinItems();

/***/ },
/* 85 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 3,
	        scoreToWin: 200,
	        binItems: binItems
	    }, _default_dynamic_diverter_opts2.default));
	};
	
	var _dynamic_diverter_game_component = __webpack_require__(68);
	
	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);
	
	var _default_dynamic_diverter_opts = __webpack_require__(82);
	
	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var binItems = _default_dynamic_diverter_opts2.default.getBinItems();

/***/ },
/* 87 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 4,
	        scoreToWin: 250,
	        binItems: binItems
	    }, _default_dynamic_diverter_opts2.default));
	};
	
	var _dynamic_diverter_game_component = __webpack_require__(68);
	
	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);
	
	var _default_dynamic_diverter_opts = __webpack_require__(82);
	
	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var binItems = _default_dynamic_diverter_opts2.default.getBinItems();

/***/ },
/* 89 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 5,
	        scoreToWin: 300,
	        binItems: binItems
	    }, _default_dynamic_diverter_opts2.default));
	};
	
	var _dynamic_diverter_game_component = __webpack_require__(68);
	
	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);
	
	var _default_dynamic_diverter_opts = __webpack_require__(82);
	
	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var binItems = _default_dynamic_diverter_opts2.default.getBinItems();

/***/ },
/* 91 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 92 */
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
/* 93 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 94 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_master_sorter_opts = __webpack_require__(95);
	
	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _default_game_opts = __webpack_require__(31);
	
	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);
	
	var _items_to_sort = __webpack_require__(32);
	
	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);
	
	var _trays_array = __webpack_require__(96);
	
	var _trays_array2 = _interopRequireDefault(_trays_array);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	var audioRefs = _.uniq(_.map(itemsToSort, function (v) {
	    return _.kebabCase(_.replace(v.name, /\d+/g, ''));
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
	
	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'next', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LunchboxSlide.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'retry', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'level-fail.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'tray', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'TrayStackerRack.mp3' }), React.createElement(skoash.Audio, { ref: 'select', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);
	
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
	                    _this2.setState({ items: items }, function () {
	                        _this2.afterNext();
	                    });
	
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
	        return _trays_array2.default;
	    }
	}, _default_game_opts2.default);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _2 = __webpack_require__(29);
	
	var _3 = _interopRequireDefault(_2);
	
	var _items_compost = __webpack_require__(20);
	
	var _items_compost2 = _interopRequireDefault(_items_compost);
	
	var _items_food_share = __webpack_require__(33);
	
	var _items_food_share2 = _interopRequireDefault(_items_food_share);
	
	var _items_landfill = __webpack_require__(18);
	
	var _items_landfill2 = _interopRequireDefault(_items_landfill);
	
	var _items_liquids = __webpack_require__(34);
	
	var _items_liquids2 = _interopRequireDefault(_items_liquids);
	
	var _items_recycle = __webpack_require__(16);
	
	var _items_recycle2 = _interopRequireDefault(_items_recycle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var itemsToSort = [].concat(_items_compost2.default).concat(_items_food_share2.default).concat(_items_landfill2.default).concat(_items_liquids2.default).concat(_items_recycle2.default);
	
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
	
	var onBootstrap = function onBootstrap() {
	    this.invokeChildrenFunction('markCatchable');
	};
	
	var getName = function getName(name) {
	    if (!_.includes(name, 'tray')) {
	        return ['tray-blue', 'tray-pink'][_.random(0, 1)];
	    }
	
	    return name;
	};
	
	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;
	
	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 0,
	        'static': true
	    });
	};
	
	var mapItems = function mapItems(itemNames) {
	    var items = _.filter(itemsToSort, function (item) {
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
	
	var trayData = [{
	    name: 'tray',
	    items: ['clean-aluminum-foil', 'apple-core', 'empty-cracker-wrapper', 'bag-of-potato-chips', 'half-full-milk-carton']
	}, {
	    name: 'lunchbox',
	    items: ['chicken-leg', 'empty-chip-bag', 'sealed-pretzel']
	}, {
	    name: 'tray',
	    items: ['empty-yogurt-container', 'ham-sandwich', 'whole-banana', 'half-full-chocolate-milk-carton']
	}, {
	    name: 'tray',
	    items: ['empty-yogurt-container', 'ham-sandwich', 'empty-bag-of-chips', 'half-full-chocolate-milk-carton']
	}, {
	    name: 'tray',
	    items: ['paper-packaging', 'orange-slice', 'graham-cookie-wrapper', 'sealed-popcorn', 'half-full-milk-carton']
	}, {
	    name: 'lunchbox',
	    items: ['empty-yogurt-container', 'fruit-snack-wrapper']
	}, {
	    name: 'lunchbox',
	    items: ['empty-yogurt-container', 'used-paper-sandwich-wrapper', 'fruit-snack-wrapper', 'package-of-dried-fruit', 'half-full-lemonade-box']
	}, {
	    name: 'tray',
	    items: ['napkin', 'styrofoam-container', 'packaged-dinner-roll', 'full-plastic-water-bottle']
	}, {
	    name: 'tray',
	    items: ['empty-yogurt-container', 'empty-raisin-box', 'empty-cracker-wrapper', 'unopened-granola-bar', 'half-full-milk-carton']
	}, {
	    name: 'lunchbox',
	    items: ['fruit-snack-wrapper', 'sealed-bag-of-carrots', 'full-plastic-water-bottle']
	}, {
	    name: 'tray',
	    items: ['clean-aluminum-foil', 'banana-peel', 'empty-chip-bag', 'fresh-unopened-sandwich', 'half-full-orange-juice']
	}, {
	    name: 'tray',
	    items: ['teabag', 'empty-snack-wrapper', 'sealed-applesauce']
	}, {
	    name: 'lunchbox',
	    items: ['metal-food-can', 'celery-stick', 'energy-bar-wrapper', 'bag-of-potato-chips', 'half-full-milk-carton']
	}, {
	    name: 'tray',
	    items: ['empty-box-of-crackers', 'plastic-spork', 'box-of-cheddar-crackers', 'half-full-orange-juice']
	}, {
	    name: 'tray',
	    items: ['napkin', 'plastic-baggie', 'whole-apple', 'half-full-milk-carton']
	}, {
	    name: 'lunchbox',
	    items: ['plastic-cup', 'dirty-paper-food-container', 'applesauce-pouch']
	}, {
	    name: 'tray',
	    items: ['metal-food-can', 'chicken-leg', 'whole-orange', 'half-full-lemonade-box']
	}, {
	    name: 'lunchbox',
	    items: ['plastic-cup', 'napkin', 'empty-chip-bag']
	}, {
	    name: 'tray',
	    items: ['empty-yogurt-container', 'celery-stick', 'plastic-spoon', 'sealed-milk', 'half-full-milk-carton']
	}, {
	    name: 'lunchbox',
	    items: ['clean-aluminum-foil', 'empty-raisin-box', 'half-full-chocolate-milk-carton']
	}, {
	    name: 'tray',
	    items: ['orange-slice', 'plastic-straws', 'sealed-pretzel']
	}, {
	    name: 'tray',
	    items: ['empty-cookie-box', 'ketchup-packet', 'full-plastic-water-bottle']
	}, {
	    name: 'lunchbox',
	    items: ['plastic-cup', 'napkin']
	}, {
	    name: 'tray',
	    items: ['aluminum-beverage-can', 'food-soiled-paper-plate', 'empty-cracker-wrapper', 'packaged-vegetables', 'half-full-chocolate-milk-carton']
	}, {
	    name: 'tray',
	    items: ['empty-yogurt-container', 'carrot-sticks', 'empty-chip-bag', 'half-full-orange-juice']
	}, {
	    name: 'lunchbox',
	    items: ['used-paper-sandwich-wrapper', 'graham-cookie-wrapper', 'unopened-pack-of-grapes']
	}, {
	    name: 'lunchbox',
	    items: ['empty-milk-carton', 'ham-sandwich', 'package-of-dried-fruit', 'half-full-lemonade-box']
	}, {
	    name: 'tray',
	    items: ['banana-peel', 'burrito-wrapper', 'half-full-milk-carton']
	}, {
	    name: 'tray',
	    items: ['empty-plastic-package', 'celery-stick', 'cereal-lid-wrapper', 'sealed-fruit-drink']
	}, {
	    name: 'lunchbox',
	    items: ['burrito-wrapper', 'packaged-dinner-roll', 'half-full-orange-juice']
	}, {
	    name: 'tray',
	    items: ['paper-packaging', 'napkin', 'empty-fruit-juice-plastic']
	}, {
	    name: 'tray',
	    items: ['empty-aluminum-can', 'apple-core', 'applesauce-pouch', 'mustard-packet', 'full-plastic-water-bottle']
	}, {
	    name: 'tray',
	    items: ['plastic-cup', 'orange-slice', 'half-full-milk-carton']
	}, {
	    name: 'lunchbox',
	    items: ['box-of-cookies', 'unopened-energy-bar']
	}, {
	    name: 'tray',
	    items: ['empty-box-of-crackers', 'ham-sandwich', 'half-full-chocolate-milk-carton']
	}, {
	    name: 'tray',
	    items: ['empty-yogurt-container', 'carrot-sticks', 'plastic-spoon', 'mayo-packet', 'half-full-orange-juice']
	}, {
	    name: 'lunchbox',
	    items: ['empty-plastic-bottle', 'soiled-paper-tray', 'empty-cracker-wrapper', 'sealed-applesauce']
	}, {
	    name: 'tray',
	    items: ['empty-cookie-box', 'juice-box', 'sealed-popcorn']
	}, {
	    name: 'tray',
	    items: ['banana-peel', 'empty-bag-of-chips', 'half-full-carton-of-milk']
	}, {
	    name: 'lunchbox',
	    items: ['metal-food-can', 'food-soiled-paper-plate', 'plastic-spork', 'box-of-cheddar-crackers']
	}];
	
	exports.default = _.map(trayData, function (data) {
	    var bin = _.includes(data.name, 'tray') ? 'tray-stacking' : 'home';
	    var name = getName(data.name);
	
	    return {
	        type: _3.default,
	        props: {
	            className: name,
	            message: bin,
	            reCatchable: true,
	            children: getChildren({
	                name: name,
	                bin: bin,
	                children: [React.createElement(skoash.Selectable, {
	                    onSelect: onSelect,
	                    onBootstrap: onBootstrap,
	                    list: mapItems(data.items)
	                })]
	            })
	        }
	    };
	});

/***/ },
/* 97 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
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
	        level: 2,
	        scoreToWin: 150
	    }, _default_master_sorter_opts2.default));
	};
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_master_sorter_opts = __webpack_require__(95);
	
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
	
	var _info_screen_component = __webpack_require__(13);
	
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
	        level: 3,
	        scoreToWin: 200
	    }, _default_master_sorter_opts2.default));
	};
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_master_sorter_opts = __webpack_require__(95);
	
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
	
	var _info_screen_component = __webpack_require__(13);
	
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
	        level: 4,
	        scoreToWin: 250
	    }, _default_master_sorter_opts2.default));
	};
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_master_sorter_opts = __webpack_require__(95);
	
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 104 */
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
	
	var _dropper_game_component = __webpack_require__(24);
	
	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);
	
	var _default_master_sorter_opts = __webpack_require__(95);
	
	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 105 */
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
	
	var _info_screen_component = __webpack_require__(13);
	
	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 106 */
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
//# sourceMappingURL=ai.js.map