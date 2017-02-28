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
/******/ 	var hotCurrentHash = "1d025c2b7cf89cb8721a"; // eslint-disable-line no-unused-vars
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
	
	var _excel_screen = __webpack_require__(8);
	
	var _excel_screen2 = _interopRequireDefault(_excel_screen);
	
	var _roles_screen = __webpack_require__(9);
	
	var _roles_screen2 = _interopRequireDefault(_roles_screen);
	
	var _look_out_screen = __webpack_require__(15);
	
	var _look_out_screen2 = _interopRequireDefault(_look_out_screen);
	
	var _video_screen = __webpack_require__(16);
	
	var _video_screen2 = _interopRequireDefault(_video_screen);
	
	var _feel_screen = __webpack_require__(17);
	
	var _feel_screen2 = _interopRequireDefault(_feel_screen);
	
	var _move_screen = __webpack_require__(18);
	
	var _move_screen2 = _interopRequireDefault(_move_screen);
	
	var _video_2_screen = __webpack_require__(19);
	
	var _video_2_screen2 = _interopRequireDefault(_video_2_screen);
	
	var _flip_screen = __webpack_require__(20);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _quit_screen = __webpack_require__(21);
	
	var _quit_screen2 = _interopRequireDefault(_quit_screen);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    screens: {
	        0: _4.default,
	        1: _title_screen2.default,
	        2: _excel_screen2.default,
	        3: _roles_screen2.default,
	        4: _look_out_screen2.default,
	        5: _video_screen2.default,
	        6: _feel_screen2.default,
	        7: _move_screen2.default,
	        8: _video_2_screen2.default,
	        9: _flip_screen2.default
	    },
	    menus: {
	        quit: _quit_screen2.default
	    },
	    loader: React.createElement(_2.default, null),
	    assets: [React.createElement(skoash.Audio, { ref: 'bkg-1', type: 'background', src: CMWN.MEDIA.EFFECT + 's-bkg-1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'bkg-2', type: 'background', src: CMWN.MEDIA.EFFECT + 's-bkg-2.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'bkg-3', type: 'background', src: CMWN.MEDIA.EFFECT + 's-13-1.mp3' }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-bu-1.mp3' }), React.createElement(skoash.Audio, { ref: 'close', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-close-1.mp3' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-1.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-2.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-4.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-5.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-6.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-7.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-8.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'fr-10.png' }), React.createElement('div', { className: 'background default' }), React.createElement('div', { className: 'background excel' }), React.createElement('div', { className: 'background look-out' }), React.createElement('div', { className: 'background feel' }), React.createElement('div', { className: 'background movie' }), React.createElement('div', { className: 'background upload' }), React.createElement('div', { className: 'background flip' })]
	}));
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "meerkat-mania",
		"version": 2,
		"skoash": "1.0.2",
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
	            id: "title",
	            checkComplete: false,
	            completeDelay: 2000,
	            completeOnStart: true
	        }),
	        React.createElement(skoash.Image, { "class": "animated", src: CMWN.MEDIA.IMAGE + "img-1-1.png" })
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
	            id: "excel"
	        }),
	        React.createElement(skoash.Audio, { type: "sfx", src: CMWN.MEDIA.EFFECT + "s-2-1.mp3", complete: true }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "vo-2-1.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame" },
	            React.createElement(skoash.Image, { className: "background", src: CMWN.MEDIA.FRAME + "fr-1.png" }),
	            React.createElement(
	                "p",
	                null,
	                "Meerkats excel as team players and everyone",
	                React.createElement("br", null),
	                "in the large Meerkat family, called a mob,",
	                React.createElement("br", null),
	                "participates in foraging for food,",
	                React.createElement("br", null),
	                "sentry duty and care of babies."
	            )
	        )
	    );
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var closeReveal = function closeReveal() {
	        skoash.trigger('updateState', {
	            path: 'reveal',
	            data: {
	                open: ''
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'roles'
	        }),
	        React.createElement(skoash.Audio, { ref: 'intro', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-3-1.mp3' }),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.reveal.open', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: null
	                        }
	                    });
	                }
	            },
	            React.createElement(skoash.Audio, { ref: 'sentry', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-3-2.mp3' }),
	            React.createElement(skoash.Audio, { ref: 'pup', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-3-3.mp3' }),
	            React.createElement(skoash.Audio, { ref: 'babysitter', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-3-4.mp3' }),
	            React.createElement(skoash.Audio, { ref: 'gatherer', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-3-5.mp3' }),
	            React.createElement(skoash.Audio, { ref: 'alpha-male', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-3-6.mp3' }),
	            React.createElement(skoash.Audio, { ref: 'alpha-female', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-3-7.mp3' })
	        ),
	        React.createElement(_5.default, {
	            ref: 'reveal',
	            openOnStart: 'intro',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            list: [React.createElement(
	                skoash.Component,
	                { 'data-ref': 'intro' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(skoash.Image, { ref: 'bkg', className: 'background', src: CMWN.MEDIA.FRAME + 'fr-1.png' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Every Meerkat has a job.',
	                        React.createElement('br', null),
	                        'Click on each to discover.'
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: closeReveal })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'sentry' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(skoash.Image, {
	                        ref: 'bkg',
	                        className: 'background',
	                        src: CMWN.MEDIA.FRAME + 'fr-2.png'
	                    }),
	                    React.createElement(skoash.Image, {
	                        ref: 'img',
	                        src: CMWN.MEDIA.IMAGE + 'img-3-2.png'
	                    }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'I stand watch!',
	                        React.createElement('br', null),
	                        'I look out for predators',
	                        React.createElement('br', null),
	                        'while the others forage for food.'
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: closeReveal })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'pup' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(skoash.Image, {
	                        ref: 'bkg',
	                        className: 'background',
	                        src: CMWN.MEDIA.FRAME + 'fr-3.png'
	                    }),
	                    React.createElement(skoash.Image, {
	                        ref: 'img',
	                        src: CMWN.MEDIA.IMAGE + 'img-3-4.png'
	                    }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'I\'m a pup so I\'m under 6 months old.',
	                        React.createElement('br', null),
	                        'I lived in the burrow for the first three weeks.',
	                        React.createElement('br', null),
	                        'Then I learn how to forage in the deserts and',
	                        React.createElement('br', null),
	                        'grasslands of Africa.'
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: closeReveal })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'babysitter' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(skoash.Image, {
	                        ref: 'bkg',
	                        className: 'background',
	                        src: CMWN.MEDIA.FRAME + 'fr-4.png'
	                    }),
	                    React.createElement(skoash.Image, {
	                        ref: 'img',
	                        src: CMWN.MEDIA.IMAGE + 'img-3-6.png'
	                    }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'I help babysit the pups!',
	                        React.createElement('br', null),
	                        'I teach them everything from how to',
	                        React.createElement('br', null),
	                        'safely eat a scorpion (yum!)',
	                        React.createElement('br', null),
	                        'to how to react to threats.'
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: closeReveal })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'gatherer' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(skoash.Image, {
	                        ref: 'bkg',
	                        className: 'background',
	                        src: CMWN.MEDIA.FRAME + 'fr-5.png'
	                    }),
	                    React.createElement(skoash.Image, {
	                        ref: 'img',
	                        src: CMWN.MEDIA.IMAGE + 'img-3-8.png'
	                    }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'As a meerkat, I\u2019m omnivorous so',
	                        React.createElement('br', null),
	                        'I eat both plants and animals.',
	                        React.createElement('br', null),
	                        'I enjoy anything from fruit',
	                        React.createElement('br', null),
	                        'to insects and small mammals.',
	                        React.createElement('br', null),
	                        'We foragers bring back',
	                        React.createElement('br', null),
	                        'food for the pups.'
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: closeReveal })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'alpha-male' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(skoash.Image, {
	                        ref: 'bkg',
	                        className: 'background',
	                        src: CMWN.MEDIA.FRAME + 'fr-6.png'
	                    }),
	                    React.createElement(skoash.Image, {
	                        ref: 'img',
	                        src: CMWN.MEDIA.IMAGE + 'img-3-10.png'
	                    }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Alpha males usually come',
	                        React.createElement('br', null),
	                        'from different mobs.',
	                        React.createElement('br', null),
	                        'I work with the alpha female to',
	                        React.createElement('br', null),
	                        'lead the group and care for the pups.'
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: closeReveal })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'alpha-female' },
	                React.createElement(
	                    skoash.Component,
	                    null,
	                    React.createElement(skoash.Image, {
	                        ref: 'bkg',
	                        className: 'background',
	                        src: CMWN.MEDIA.FRAME + 'fr-7.png'
	                    }),
	                    React.createElement(skoash.Image, {
	                        ref: 'img',
	                        src: CMWN.MEDIA.IMAGE + 'img-3-12.png'
	                    }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'As an alpha female, I lead the group',
	                        React.createElement('br', null),
	                        'and mother the pups along with',
	                        React.createElement('br', null),
	                        'the alpha male.',
	                        React.createElement('br', null),
	                        'Female Meerkats are dominant.'
	                    ),
	                    React.createElement('button', { className: 'close-reveal', onClick: closeReveal })
	                )
	            )]
	        }),
	        React.createElement(_7.default, {
	            selectClass: 'HIGHLIGHTED',
	            selectRespond: function selectRespond(message) {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        open: message
	                    }
	                });
	            },
	            list: [React.createElement(
	                skoash.Component,
	                { ref: 'sentry', 'data-ref': 'sentry', message: 'sentry' },
	                React.createElement(skoash.Image, {
	                    ref: 'img',
	                    'data-ref': 'sentry',
	                    message: 'sentry',
	                    src: CMWN.MEDIA.IMAGE + 'img-3-1.png'
	                })
	            ), React.createElement(
	                skoash.Component,
	                { ref: 'pup', 'data-ref': 'pup', message: 'pup' },
	                React.createElement(skoash.Image, {
	                    ref: 'img',
	                    'data-ref': 'pup',
	                    message: 'pup',
	                    src: CMWN.MEDIA.IMAGE + 'img-3-3.png'
	                })
	            ), React.createElement(
	                skoash.Component,
	                { ref: 'babysitter', 'data-ref': 'babysitter', message: 'babysitter' },
	                React.createElement(skoash.Image, {
	                    ref: 'img',
	                    'data-ref': 'babysitter',
	                    message: 'babysitter',
	                    src: CMWN.MEDIA.IMAGE + 'img-3-5.png'
	                })
	            ), React.createElement(
	                skoash.Component,
	                { ref: 'gatherer', 'data-ref': 'gatherer', message: 'gatherer' },
	                React.createElement(skoash.Image, {
	                    ref: 'img',
	                    'data-ref': 'gatherer',
	                    message: 'gatherer',
	                    src: CMWN.MEDIA.IMAGE + 'img-3-7.png'
	                })
	            ), React.createElement(
	                skoash.Component,
	                { ref: 'alpha-male', 'data-ref': 'alpha-male', message: 'alpha-male' },
	                React.createElement(skoash.Image, {
	                    ref: 'img',
	                    'data-ref': 'alpha-male',
	                    message: 'alpha-male',
	                    src: CMWN.MEDIA.IMAGE + 'img-3-9.png'
	                })
	            ), React.createElement(
	                skoash.Component,
	                { ref: 'alpha-female', 'data-ref': 'alpha-female', message: 'alpha-female' },
	                React.createElement(skoash.Image, {
	                    ref: 'img',
	                    'data-ref': 'alpha-female',
	                    message: 'alpha-female',
	                    src: CMWN.MEDIA.IMAGE + 'img-3-11.png'
	                })
	            )]
	        })
	    );
	};
	
	var _2 = __webpack_require__(10);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(11);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(13);
	
	var _7 = _interopRequireDefault(_6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(12);
	
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(14);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SelectableCanvas = function (_Selectable) {
	    _inherits(SelectableCanvas, _Selectable);
	
	    function SelectableCanvas() {
	        _classCallCheck(this, SelectableCanvas);
	
	        var _this = _possibleConstructorReturn(this, (SelectableCanvas.__proto__ || Object.getPrototypeOf(SelectableCanvas)).call(this));
	
	        _this.state = {
	            classes: {},
	            selectFunction: _this.select
	        };
	        return _this;
	    }
	
	    _createClass(SelectableCanvas, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var _this2 = this;
	
	            var offset;
	
	            _get(SelectableCanvas.prototype.__proto__ || Object.getPrototypeOf(SelectableCanvas.prototype), 'bootstrap', this).call(this);
	
	            this.buffer = this.refs.canvas || document.createElement('canvas');
	            this.buffer = document.createElement('canvas');
	            this.bctx = this.buffer.getContext('2d');
	
	            this.el = ReactDOM.findDOMNode(this);
	            offset = this.el.getBoundingClientRect();
	
	            this.buffer.width = offset.width;
	            this.buffer.height = offset.height;
	
	            this.items = [];
	
	            _.forIn(this.refs, function (component) {
	                var img = ReactDOM.findDOMNode(component.refs.img);
	                if (!component.refs) return;
	                if (img) _this2.items.push(img);
	            });
	        }
	    }, {
	        key: 'selectHelper',
	        value: function selectHelper(e, classes) {
	            var _this3 = this;
	
	            var offset;
	            var target;
	            var dataRef;
	
	            offset = this.el.getBoundingClientRect();
	            this.buffer.width = offset.width;
	            this.buffer.height = offset.height;
	
	            this.items.some(function (item, key) {
	                if (_this3.isImageTarget(item, e, offset)) {
	                    dataRef = item.getAttribute('data-ref');
	                    target = _this3.refs[dataRef] || _this3.refs[key];
	                    target.complete();
	                    classes[key] = _this3.props.selectClass;
	                    return true;
	                }
	
	                return false;
	            });
	
	            this.setState({
	                classes: classes
	            });
	
	            if (target && typeof this.props.selectRespond === 'function') {
	                this.props.selectRespond.call(this, target.props.message);
	            }
	
	            this.checkComplete();
	        }
	    }, {
	        key: 'isImageTarget',
	        value: function isImageTarget(image, e, parentOffset) {
	            var offset;
	            var pixel;
	
	            offset = image.getBoundingClientRect();
	
	            this.bctx.clearRect(0, 0, this.buffer.width, this.buffer.height);
	            this.bctx.drawImage(image, offset.left - parentOffset.left, offset.top - parentOffset.top, offset.width, offset.height);
	            pixel = this.bctx.getImageData(e.pageX, e.pageY, 1, 1);
	
	            this.bctx.fillStyle = 'blue';
	            this.bctx.fillRect(e.pageX, e.pageY, 5, 5);
	
	            // opaque pixel
	            return pixel.data[3] > 0;
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('selectable-canvas', _get(SelectableCanvas.prototype.__proto__ || Object.getPrototypeOf(SelectableCanvas.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement('canvas', { ref: 'canvas' }),
	                React.createElement(
	                    'ul',
	                    {
	                        className: this.getClassNames(),
	                        onClick: this.state.selectFunction.bind(this)
	                    },
	                    this.renderList()
	                )
	            );
	        }
	    }]);
	
	    return SelectableCanvas;
	}(_3.default);
	
	exports.default = SelectableCanvas;

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
	
	var _classnames = __webpack_require__(12);
	
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
	            id: "look-out"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, { type: "sfx", src: CMWN.MEDIA.EFFECT + "s-4-1.mp3" }),
	            React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "vo-4-1.mp3" })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame" },
	            React.createElement(skoash.Image, { className: "background", src: CMWN.MEDIA.FRAME + "fr-8.png" }),
	            React.createElement(
	                "p",
	                null,
	                "We meerkats really",
	                React.createElement("br", null),
	                "look out for each other.",
	                React.createElement("br", null),
	                "We make sure everyone",
	                React.createElement("br", null),
	                "is safe and has",
	                React.createElement("br", null),
	                "everything they need."
	            )
	        )
	    );
	};

/***/ },
/* 16 */
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
	            startDelay: 0
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { className: 'frame' },
	                React.createElement(skoash.Video, { src: src })
	            )
	        )
	    );
	};
	
	var src = 'https://res.cloudinary.com/changemyworldnow/video/upload/' + 'af_44100/v1460413987/Meerkat_Revision_Final_cjuf1q.mp4';

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
	            id: 'feel'
	        }),
	        React.createElement(skoash.Audio, { type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-6-11.mp3' }),
	        React.createElement(skoash.Audio, { ref: 'start', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-6-1.mp3' }),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.selection.target', null),
	                onPlay: function onPlay() {
	                    this.media.correct.play();
	
	                    this.updateGameState({
	                        path: 'selection',
	                        data: {
	                            target: null
	                        }
	                    });
	                }
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'correct',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 's-6-2.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'safe',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-1.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'loved',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-2.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'supported',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-3.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'important',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-4.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'included',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-5.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'valued',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-6.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'grateful',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-7.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'happy',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-8.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'secure',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-9.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'worthwhile',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'vo-6-10.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'frame' },
	            React.createElement(skoash.Image, { src: CMWN.MEDIA.IMAGE + 'img-6-1.png' }),
	            React.createElement(_5.default, {
	                selectClass: 'HIGHLIGHTED',
	                selectRespond: function selectRespond(target) {
	                    this.updateGameState({
	                        path: 'selection',
	                        data: {
	                            target: target
	                        }
	                    });
	                },
	                list: [React.createElement('li', { 'data-ref': 'safe' }), React.createElement('li', { 'data-ref': 'loved' }), React.createElement('li', { 'data-ref': 'supported' }), React.createElement('li', { 'data-ref': 'important' }), React.createElement('li', { 'data-ref': 'included' }), React.createElement('li', { 'data-ref': 'valued' }), React.createElement('li', { 'data-ref': 'grateful' }), React.createElement('li', { 'data-ref': 'happy' }), React.createElement('li', { 'data-ref': 'secure' }), React.createElement('li', { 'data-ref': 'worthwhile' })]
	            })
	        )
	    );
	};
	
	var _2 = __webpack_require__(10);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(14);
	
	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 18 */
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
	            id: "move"
	        }),
	        React.createElement(skoash.Audio, { ref: "start", type: "sfx", src: CMWN.MEDIA.EFFECT + "s-7-1.mp3", complete: true }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "vo-7-1.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame" },
	            React.createElement(skoash.Image, { className: "background", src: CMWN.MEDIA.FRAME + "fr-10.png" }),
	            React.createElement(
	                "p",
	                null,
	                "Check out the"
	            ),
	            React.createElement(skoash.Image, { src: CMWN.MEDIA.IMAGE + "img-7-1.png" })
	        )
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
	            id: "video-2",
	            startDelay: 0
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "center" },
	            React.createElement(
	                skoash.Component,
	                { className: "frame" },
	                React.createElement(skoash.Video, { src: src })
	            )
	        )
	    );
	};
	
	var src = 'https://res.cloudinary.com/changemyworldnow/video/upload/v1455033910/MeerkatMove_ovuzka.mp4';

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
	            id: "flip",
	            emitOnComplete: {
	                name: 'flip'
	            }
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "vo-13-1.mp3" }),
	            React.createElement(skoash.Audio, { playTarget: "flip", type: "sfx", src: CMWN.MEDIA.EFFECT + "s-13-2.mp3" })
	        ),
	        React.createElement(
	            "div",
	            { className: "frame" },
	            React.createElement(skoash.Image, { className: "background", src: CMWN.MEDIA.FRAME + "fr-11.png" }),
	            React.createElement(
	                "p",
	                null,
	                "Thank you for",
	                React.createElement("br", null),
	                "looking out for others",
	                React.createElement("br", null),
	                "and making the world",
	                React.createElement("br", null),
	                "a better place."
	            ),
	            React.createElement(skoash.Image, {
	                className: 'flip animated ' + (_.get(props, 'data.flip.playing', null) ? 'in' : ''),
	                src: CMWN.MEDIA.IMAGE + "img-13-1.png"
	            })
	        )
	    );
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
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
	                id: this.state.id
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { id: this.props.id, className: this.getClassNames() },
	                React.createElement(skoash.Audio, { ref: 'vo', type: 'voiceOver', src: CMWN.MEDIA.VO + 'vo-quit-screen.mp3' }),
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