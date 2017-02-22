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
/******/ 	var hotCurrentHash = "97e6e1ed91a468ec800f"; // eslint-disable-line no-unused-vars
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
	
	    this.helpers.makeBackground.call(this);
	    this.helpers.makeGround.call(this);
	    this.helpers.makeDoor.call(this);
	    this.helpers.makePlatforms.call(this);
	
	    _5.default.call(this, {
	        left: 32,
	        top: this.game.world.height - 385,
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
	    this.player.canJump = true;
	
	    _2.default.call(this, 'collide', [[this.player, this.ground], [this.player, this.water, this.helpers.hitWater], [this.player, this.platforms], [this.player, this.bushes, this.helpers.hitBush], [this.player, this.obstacles, this.helpers.hitObstacle], [this.player, this.logs], [this.bushes, this.ground, this.helpers.stay], [this.bushes, this.platforms, this.helpers.stay], [this.trees, this.ground, this.helpers.stay], [this.trees, this.platforms, this.helpers.stay], [this.snakes, this.ground, this.helpers.stay], [this.snakes, this.platforms, this.helpers.stay], [this.snakes, this.water, this.helpers.turnAround], [this.holes, this.ground, this.helpers.stay], [this.bags, this.ground, this.helpers.stay], [this.bags, this.platforms, this.helpers.stay], [this.obstacles, this.ground, this.helpers.stay], [this.obstacles, this.platforms, this.helpers.stay], [this.doors, this.ground, this.helpers.stay]]);
	
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
	
	    if (this.controller.left) {
	        //  Move to the left
	        this.player.body.velocity.x = opts.leftSpeed;
	        this.player.animations.play('left');
	    } else if (this.controller.right) {
	        //  Move to the right
	        this.player.body.velocity.x = opts.rightSpeed;
	        this.player.animations.play('right');
	    } else {
	        //  Stand still
	        this.player.animations.stop();
	        this.player.frame = opts.stopFrame;
	    }
	
	    //  Allow the player to jump if they are touching the ground.
	    if (this.player.canJump && this.controller.up && this.player.body.touching.down) {
	        this.player.body.velocity.y = opts.upSpeed;
	        _.invoke(opts.jumpSound, 'play');
	    }
	
	    //  Allow the player to fall fast if they are not touching the ground.
	    if (this.controller.down && !this.player.body.touching.down) {
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
//# sourceMappingURL=ai.js.map