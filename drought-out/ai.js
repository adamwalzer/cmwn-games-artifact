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
/******/ 	var hotCurrentHash = "115bc49e147865083da3"; // eslint-disable-line no-unused-vars
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
	
	var _think_screen = __webpack_require__(8);
	
	var _think_screen2 = _interopRequireDefault(_think_screen);
	
	var _info_no_water_screen = __webpack_require__(9);
	
	var _info_no_water_screen2 = _interopRequireDefault(_info_no_water_screen);
	
	var _humans_animals_screen = __webpack_require__(10);
	
	var _humans_animals_screen2 = _interopRequireDefault(_humans_animals_screen);
	
	var _info_use_water_screen = __webpack_require__(11);
	
	var _info_use_water_screen2 = _interopRequireDefault(_info_use_water_screen);
	
	var _balloons_screen = __webpack_require__(12);
	
	var _balloons_screen2 = _interopRequireDefault(_balloons_screen);
	
	var _great_job_screen = __webpack_require__(16);
	
	var _great_job_screen2 = _interopRequireDefault(_great_job_screen);
	
	var _drought_effects_screen = __webpack_require__(17);
	
	var _drought_effects_screen2 = _interopRequireDefault(_drought_effects_screen);
	
	var _environment_effects_screen = __webpack_require__(18);
	
	var _environment_effects_screen2 = _interopRequireDefault(_environment_effects_screen);
	
	var _what_can_we_do_screen = __webpack_require__(19);
	
	var _what_can_we_do_screen2 = _interopRequireDefault(_what_can_we_do_screen);
	
	var _drain_screen = __webpack_require__(20);
	
	var _drain_screen2 = _interopRequireDefault(_drain_screen);
	
	var _using_less_screen = __webpack_require__(21);
	
	var _using_less_screen2 = _interopRequireDefault(_using_less_screen);
	
	var _shower_screen = __webpack_require__(22);
	
	var _shower_screen2 = _interopRequireDefault(_shower_screen);
	
	var _conserve_screen = __webpack_require__(23);
	
	var _conserve_screen2 = _interopRequireDefault(_conserve_screen);
	
	var _hero_screen = __webpack_require__(24);
	
	var _hero_screen2 = _interopRequireDefault(_hero_screen);
	
	var _flip_screen = __webpack_require__(25);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _5 = __webpack_require__(26);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DroughtOut;
	
	DroughtOut = React.createElement(skoash.Game, {
	    config: _config2.default,
	    screens: [_4.default, _title_screen2.default, _think_screen2.default, _info_no_water_screen2.default, _humans_animals_screen2.default, _info_use_water_screen2.default, _balloons_screen2.default, _great_job_screen2.default, _drought_effects_screen2.default, _environment_effects_screen2.default, _what_can_we_do_screen2.default, _drain_screen2.default, _using_less_screen2.default, _shower_screen2.default, _conserve_screen2.default, _hero_screen2.default, _flip_screen2.default],
	
	    menus: {
	        quit: _6.default
	    },
	    loader: React.createElement(_2.default, null),
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'title':
	                return 0;
	            case 'think':
	                return;
	            case 'info-no-water':
	            case 'info-impact':
	            case 'info-need-water':
	            case 'info-use-water':
	                return 1;
	            case 'balloons':
	            case 'info-great-job':
	                return 2;
	            case 'info-environment-effects':
	            case 'environment-effects':
	            case 'what-can-we-do':
	                return 3;
	            case 'conserve':
	            case 'hero':
	                return 4;
	            case 'info-drain':
	            case 'shower':
	                return 5;
	            case 'info-using-less':
	                return 6;
	            case 'flip':
	                return 7;
	        }
	    },
	    assets: [React.createElement(skoash.Audio, {
	        ref: 'bkg-0',
	        type: 'background',
	        src: MEDIA.EFFECT + 'Theme.mp3'
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
	        src: MEDIA.EFFECT + 'BKG4.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-5',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG5.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-6',
	        type: 'background',
	        src: MEDIA.EFFECT + 'CashRegister.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-7',
	        type: 'background',
	        src: MEDIA.EFFECT + 'FlipBKG.mp3',
	        volume: .8
	    }), React.createElement(skoash.Audio, {
	        ref: 'button',
	        type: 'sfx',
	        src: MEDIA.EFFECT + 'Next.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'screen-complete',
	        type: 'sfx',
	        src: MEDIA.EFFECT + 'WhooHoo.mp3'
	    }), React.createElement('div', { className: 'background-1' }), React.createElement('div', { className: 'background-2' }), React.createElement('div', { className: 'background-3' }), React.createElement('div', { className: 'background-4' }), React.createElement('div', { className: 'background-5' }), React.createElement(skoash.Image, {
	        ref: 'bkg-image-1',
	        className: 'hidden',
	        src: MEDIA.IMAGE + 'BKG_1.jpg'
	    }), React.createElement(skoash.Image, {
	        ref: 'bkg-image-2',
	        className: 'hidden',
	        src: MEDIA.IMAGE + 'BKG_2.jpg'
	    }), React.createElement(skoash.Image, {
	        ref: 'bkg-image-3',
	        className: 'hidden',
	        src: MEDIA.IMAGE + 'BKG_3.jpg'
	    }), React.createElement(skoash.Image, {
	        ref: 'bkg-image-4',
	        className: 'hidden',
	        src: MEDIA.IMAGE + 'BKG_4.jpg'
	    }), React.createElement(skoash.Image, {
	        ref: 'bkg-image-5',
	        className: 'hidden',
	        src: MEDIA.IMAGE + 'BKG_5.jpg'
	    }), React.createElement(skoash.Image, {
	        ref: 'buttons',
	        className: 'hidden',
	        src: MEDIA.SPRITE + 'BU_1.png'
	    })]
	});
	
	skoash.start(DroughtOut);
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "drought-out",
		"media_folder": "drought-out",
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
	            completeDelay: 3000,
	            completeOnStart: true,
	            playOnStart: "bird-wing-flap"
	        }),
	        React.createElement(skoash.Audio, {
	            ref: "bird-wing-flap",
	            type: "sfx",
	            delay: 3000,
	            src: MEDIA.EFFECT + "BirdWingFlap.mp3",
	            complete: true,
	            checkComplete: false
	        }),
	        React.createElement(skoash.Image, { className: "animated title", src: MEDIA.IMAGE + "img_1.1.png" }),
	        React.createElement(skoash.Sprite, {
	            className: "falcon",
	            src: MEDIA.SPRITE + "Falcon_5-01",
	            frame: 0,
	            frames: 9,
	            animate: true
	        }),
	        React.createElement(skoash.Sprite, {
	            className: "tumbleweed",
	            src: MEDIA.SPRITE + "tumbleweed",
	            animate: true
	        })
	    );
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var ANSWERS = ['dry', 'parched', 'dusty', 'hot', 'no-water', 'thirsty', 'arid'];
	
	    var onSelect = function onSelect(target) {
	        if (ANSWERS.indexOf(target) < 0) ref = 'incorrect';
	        playAudio.call(this, target, playAudio.bind(this, 'dummy', _.noop));
	        // the dummy update allows the incorrect sound to be played repeatedly
	    };
	
	    var playAudio = function playAudio(target, cb) {
	        this.updateScreenData({
	            key: 'selectable',
	            data: {
	                play: target
	            },
	            callback: cb
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'think',
	            className: 'large-frame'
	        }),
	        React.createElement(skoash.Audio, { type: 'voiceOver', src: MEDIA.VO + 'WhatDoYou.mp3' }),
	        React.createElement(skoash.Image, { className: 'hidden', ref: 'hidden', src: MEDIA.IMAGE + 'FR_1.png' }),
	        React.createElement(
	            skoash.Component,
	            { className: 'frame animated' },
	            React.createElement(
	                'p',
	                null,
	                'What do you think of when you hear',
	                React.createElement('br', null),
	                'the word ',
	                React.createElement('span', { className: 'inline drought-word' })
	            ),
	            React.createElement(
	                skoash.MediaCollection,
	                {
	                    ref: 'media-collection',
	                    play: _.get(props, 'data.selectable.play', null)
	                },
	                React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    'data-ref': 'incorrect',
	                    src: MEDIA.EFFECT + 'Wrong.mp3',
	                    complete: true,
	                    checkComplete: false
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    'data-ref': 'dry',
	                    src: MEDIA.VO + 'WhatDry.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    'data-ref': 'parched',
	                    src: MEDIA.VO + 'WhatParched.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    'data-ref': 'dusty',
	                    src: MEDIA.VO + 'WhatDusty.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    'data-ref': 'hot',
	                    src: MEDIA.VO + 'WhatHot.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    'data-ref': 'no-water',
	                    src: MEDIA.VO + 'WhatNoWater.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    'data-ref': 'thirsty',
	                    src: MEDIA.VO + 'WhatThirsty.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    'data-ref': 'arid',
	                    src: MEDIA.VO + 'WhatArid.mp3'
	                })
	            ),
	            React.createElement(skoash.Selectable, {
	                ref: 'selectable',
	                selectClass: 'HIGHLIGHTED',
	                onSelect: onSelect,
	                answers: ANSWERS,
	                list: [React.createElement(skoash.ListItem, { className: 'dry', 'data-ref': 'dry', correct: true }), React.createElement(skoash.ListItem, { className: 'green', 'data-ref': 'incorrect' }), React.createElement(skoash.ListItem, { className: 'parched', 'data-ref': 'parched', correct: true }), React.createElement(skoash.ListItem, { className: 'monsoon', 'data-ref': 'incorrect' }), React.createElement(skoash.ListItem, { className: 'damp', 'data-ref': 'incorrect' }), React.createElement(skoash.ListItem, { className: 'dusty', 'data-ref': 'dusty', correct: true }), React.createElement(skoash.ListItem, { className: 'hot', 'data-ref': 'hot', correct: true }), React.createElement(skoash.ListItem, { className: 'no-water', 'data-ref': 'no-water', correct: true }), React.createElement(skoash.ListItem, { className: 'thirsty', 'data-ref': 'thirsty', correct: true }), React.createElement(skoash.ListItem, { className: 'wet', 'data-ref': 'incorrect' }), React.createElement(skoash.ListItem, { className: 'tropical', 'data-ref': 'incorrect' }), React.createElement(skoash.ListItem, { className: 'arid', 'data-ref': 'arid', correct: true }), React.createElement(skoash.ListItem, { className: 'steamy', 'data-ref': 'incorrect' }), React.createElement(skoash.ListItem, { className: 'balmy', 'data-ref': 'incorrect' }), React.createElement(skoash.ListItem, { className: 'swampy', 'data-ref': 'incorrect' })]
	            })
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
	            id: "info-no-water",
	            className: "large-frame",
	            restartBackground: true
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                ref: "vo",
	                type: "voiceOver",
	                src: MEDIA.VO + "WhenThere.mp3",
	                delay: 6500,
	                completeTarget: "vo"
	            }),
	            React.createElement(skoash.Audio, {
	                ref: "stamp",
	                type: "sfx",
	                src: MEDIA.EFFECT + "Stamp.mp3"
	            })
	        ),
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.IMAGE + "FR_4.png" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(
	                "p",
	                null,
	                "When there is less rain and snow",
	                React.createElement("br", null),
	                "consistently over a period of years,",
	                React.createElement("br", null),
	                "it causes drought."
	            ),
	            React.createElement(skoash.Image, {
	                id: "stamp-img",
	                className: 'animated ' + (_.get(props, 'data.vo.complete') ? 'TRANSLATE' : ''),
	                src: MEDIA.IMAGE + "img_3.1.png"
	            })
	        )
	    );
	};

/***/ },
/* 10 */
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
	            id: "humans-animals",
	            className: "small-frame",
	            playOnStart: "tumbleweed"
	        }),
	        React.createElement(skoash.Audio, {
	            ref: "tumbleweed",
	            type: "sfx",
	            src: MEDIA.EFFECT + "Tumbleweed.mp3",
	            loop: true,
	            complete: true,
	            checkComplete: false
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: MEDIA.VO + "HumansAnimals.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(
	                "p",
	                null,
	                "Humans, animals and ",
	                React.createElement("br", null),
	                "plants need ",
	                React.createElement("br", null),
	                "water to live!"
	            )
	        ),
	        React.createElement(skoash.Sprite, {
	            className: "tumbleweed",
	            src: MEDIA.SPRITE + "tumbleweed",
	            animate: true
	        })
	    );
	};

/***/ },
/* 11 */
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
	            id: "info-use-water",
	            className: "large-frame"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "ClickTo.mp3",
	            volume: 2
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(skoash.Image, { src: MEDIA.IMAGE + "img_6.1.png" }),
	            React.createElement(
	                "p",
	                null,
	                "Click to reveal things",
	                React.createElement("br", null),
	                " that we use water for",
	                React.createElement("br", null),
	                " almost every day!"
	            )
	        )
	    );
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	// TODO fix cursor scaling on SelectableCanvasMove AIM 2/1/17
	
	exports.default = function (props, ref, key) {
	    var BALLOONS = [{
	        x: 15,
	        y: 432,
	        text: 'bathing'
	    }, {
	        x: 307,
	        y: 632,
	        text: 'drinking'
	    }, {
	        x: 460,
	        y: 832,
	        text: 'canoeing'
	    }, {
	        x: 614,
	        y: 1032,
	        text: 'factories'
	    }, {
	        x: 768,
	        y: 1232,
	        text: 'washing'
	    }, {
	        x: 256,
	        y: 568,
	        text: 'swimming'
	    }, {
	        x: 409,
	        y: 768,
	        text: 'brushing'
	    }, {
	        x: 409,
	        y: 768,
	        text: 'electricity'
	    }, {
	        x: 563,
	        y: 968,
	        text: 'cooking'
	    }, {
	        x: 716,
	        y: 1168,
	        text: 'rafting'
	    }, {
	        x: 204,
	        y: 504,
	        text: 'water'
	    }, {
	        x: 358,
	        y: 704,
	        text: 'growing'
	    }, {
	        x: 512,
	        y: 904,
	        text: 'lawns'
	    }, {
	        x: 665,
	        y: 1104,
	        text: 'flowers'
	    }, {
	        x: 153,
	        y: 440,
	        text: 'animal'
	    }];
	
	    var playSFX = function playSFX() {
	        var sfx;
	        var target = _.get(props, 'data.selection.target.props.data-ref', null);
	        var index = _.findIndex(BALLOONS, function (value) {
	            return value.text === target;
	        });
	
	        if (0 <= index && index < 7) sfx = 'yellow';else if (7 <= index && index < 11) sfx = 'green';else if (11 <= index && index < 14) sfx = 'red';
	
	        return sfx;
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({
	            id: 'balloons'
	        }, props, {
	            ref: ref,
	            key: key
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: playSFX()
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'yellow',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'Select1.mp3',
	                volume: .6
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'green',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'Select2.mp3',
	                volume: .4
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'red',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'Select3.mp3',
	                volume: .4
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.selection.target.props.data-ref', null)
	            },
	            BALLOONS.map(function (value, index) {
	                return React.createElement(skoash.Audio, {
	                    ref: value.text,
	                    type: 'voiceOver',
	                    src: MEDIA.VO + 'Things' + _.upperFirst(value.text) + '.mp3',
	                    key: index
	                });
	            })
	        ),
	        React.createElement(skoash.Image, { src: MEDIA.IMAGE + 'img_7.1.png' }),
	        React.createElement(_3.default, {
	            ref: 'selectable-canvas-move',
	            selectClass: 'HIGHLIGHTED',
	            onSelect: function onSelect(target) {
	                this.updateScreenData({
	                    key: 'selection',
	                    data: {
	                        target: target
	                    }
	                });
	            },
	            items: BALLOONS.map(function (value, index) {
	                return React.createElement(skoash.Image, {
	                    src: MEDIA.SPRITE + 'img_7.2.png',
	                    'data-ref': value.text,
	                    backgroundRow: index,
	                    x: value.x, y: value.y,
	                    crossOrigin: 'Anonymous'
	                });
	            })
	        })
	    );
	};
	
	var _2 = __webpack_require__(13);
	
	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(15);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Item = function Item(component, context) {
	    this.position = {
	        x: component.props.x,
	        y: component.props.y
	    };
	    this.margin = 0;
	    this.left = 0;
	    this.selected = false;
	    this.speed = (Math.random() * 5 % 3 + 2) / 2;
	
	    this.component = component;
	    this.image = ReactDOM.findDOMNode(component);
	
	    this.context = context;
	
	    this.backgroundSize = {
	        width: 200,
	        height: 200
	    };
	    this.size = {
	        width: 360,
	        height: 460
	    };
	
	    this.render = function () {
	        this.context.drawImage(this.image, this.left, this.component.props.backgroundRow * this.image.naturalHeight / 15, this.size.width, this.size.height, this.position.x, this.position.y, this.backgroundSize.width, this.backgroundSize.height);
	    };
	
	    this.hover = function () {
	        if (!this.selected) this.left = this.image.naturalWidth / 3;
	    };
	
	    this.unhover = function () {
	        if (!this.selected) this.left = 0;
	    };
	
	    this.select = function () {
	        this.selected = true;
	        this.left = this.image.naturalWidth * 2 / 3;
	    };
	
	    this.deselect = function () {
	        this.selected = false;
	        this.left = 0;
	    };
	
	    // this.is = function (_type) {
	    //   return $(this.image).is(_type);
	    // };
	
	    // this.id = function () {
	    //   return this.$image.id();
	    // };
	
	    return this;
	};
	
	var SelectableCanvasMove = function (_SelectableCanvas) {
	    _inherits(SelectableCanvasMove, _SelectableCanvas);
	
	    function SelectableCanvasMove() {
	        _classCallCheck(this, SelectableCanvasMove);
	
	        var _this = _possibleConstructorReturn(this, (SelectableCanvasMove.__proto__ || Object.getPrototypeOf(SelectableCanvasMove)).call(this));
	
	        _this.state = {
	            classes: {},
	            selectFunction: _this.highlight
	        };
	
	        _this.move = _this.move.bind(_this);
	        _this.onHover = _this.onHover.bind(_this);
	        return _this;
	    }
	
	    _createClass(SelectableCanvasMove, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var _this2 = this;
	
	            skoash.Selectable.prototype.bootstrap.call(this);
	
	            this.buffer = document.createElement('canvas');
	
	            this.el = ReactDOM.findDOMNode(this);
	
	            this.setDimensions();
	
	            this.bctx = this.buffer.getContext('2d');
	            this.context = this.refs.canvas.getContext('2d');
	
	            this.items = [];
	
	            _.forIn(this.refs, function (item) {
	                if (!(item instanceof skoash.Image)) return;
	                _this2.items.push(new Item(item, _this2.context));
	            });
	
	            this.itemsReverse = _.reverse(_.clone(this.items));
	        }
	    }, {
	        key: 'setDimensions',
	        value: function setDimensions() {
	            this.refs.canvas.width = this.el.offsetWidth;
	            this.refs.canvas.height = this.el.offsetHeight;
	            this.buffer.width = this.el.offsetWidth;
	            this.buffer.height = this.el.offsetHeight;
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.setDimensions();
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(SelectableCanvasMove.prototype.__proto__ || Object.getPrototypeOf(SelectableCanvasMove.prototype), 'start', this).call(this);
	
	            this.isRunning = true;
	            window.requestAnimationFrame(this.move);
	            _.each(this.items, function (item) {
	                return item.deselect();
	            });
	        }
	    }, {
	        key: 'move',
	        value: function move() {
	            var _this3 = this;
	
	            this.context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
	            _.each(this.items, function (item) {
	                var y;
	                var height;
	                item.position.y -= item.speed;
	
	                y = item.position.y + item.margin;
	                height = item.size.height;
	
	                if (y + height < 0) item.position.y = _this3.el.offsetHeight * 1.1;
	
	                item.render();
	            });
	
	            if (this.isRunning) window.requestAnimationFrame(this.move);
	        }
	    }, {
	        key: 'selectHelper',
	        value: function selectHelper(e, classes) {
	            var _this4 = this;
	
	            var target;
	            this.itemsReverse.some(function (item, key) {
	                if (_this4.isImageTarget(item, e)) {
	                    item.select();
	                    target = item.component;
	                    target.complete();
	                    classes[key] = _this4.props.selectClass;
	                    return true;
	                }
	
	                return false;
	            });
	
	            this.setState({
	                classes: classes
	            });
	
	            this.props.onSelect.call(this, target);
	
	            this.checkComplete();
	        }
	    }, {
	        key: 'onHover',
	        value: function onHover(e) {
	            var _this5 = this;
	
	            this.itemsReverse.forEach(function (item) {
	                item.unhover();
	            });
	
	            this.itemsReverse.some(function (item) {
	                if (_this5.isImageTarget(item, e)) {
	                    item.hover();
	                    return true;
	                }
	                return false;
	            });
	        }
	    }, {
	        key: 'isImageTarget',
	        value: function isImageTarget(item, e) {
	            var pixel;
	
	            this.bctx.clearRect(0, 0, this.buffer.width, this.buffer.height);
	            this.bctx.drawImage(item.image, item.left, item.component.props.backgroundRow * item.image.naturalHeight / 15, item.size.width, item.size.height, item.position.x, item.position.y, item.backgroundSize.width, item.backgroundSize.height);
	            pixel = this.bctx.getImageData(e.pageX, e.pageY, 1, 1);
	
	            this.bctx.fillStyle = 'blue';
	            this.bctx.fillRect(e.pageX, e.pageY, 5, 5);
	
	            // opaque pixel
	            return pixel.data[3] > 0;
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('selectable-canvas-move', _get(SelectableCanvasMove.prototype.__proto__ || Object.getPrototypeOf(SelectableCanvasMove.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                React.createElement(
	                    'div',
	                    { className: 'items hidden' },
	                    this.renderContentList('items')
	                ),
	                React.createElement('canvas', {
	                    ref: 'canvas',
	                    onClick: this.state.selectFunction.bind(this),
	                    onMouseMove: this.onHover
	                })
	            );
	        }
	    }]);
	
	    return SelectableCanvasMove;
	}(_3.default);
	
	SelectableCanvasMove.defaultProps = _.defaults({
	    items: [],
	    onSelect: _.noop
	}, _3.default.defaultProps);
	
	exports.default = SelectableCanvasMove;

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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(14);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SelectableCanvas = function (_skoash$Selectable) {
	    _inherits(SelectableCanvas, _skoash$Selectable);
	
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
	}(skoash.Selectable);
	
	exports.default = SelectableCanvas;

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
	            id: "great-job",
	            className: "large-frame"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, { ref: "great-job", type: "voiceOver", src: MEDIA.VO + "GreatJob.mp3" })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(skoash.Image, { src: MEDIA.IMAGE + "img_8.1.png" }),
	            React.createElement(
	                "p",
	                null,
	                "Now let's look",
	                React.createElement("br", null),
	                " at the impact of drought."
	            ),
	            React.createElement(skoash.Image, { src: MEDIA.IMAGE + "img_8.2.png" })
	        )
	    );
	};

/***/ },
/* 17 */
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
	            id: "drought-effects",
	            className: "large-frame"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: MEDIA.VO + "DroughtCan.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(skoash.Image, { className: "falcon", src: MEDIA.IMAGE + "falcon.png" }),
	            React.createElement(
	                "p",
	                null,
	                "Drought can have",
	                React.createElement("br", null),
	                " severe effects on",
	                React.createElement("br", null),
	                " the environment.",
	                React.createElement("br", null),
	                "It's really bad for",
	                React.createElement("br", null),
	                " humans, too!"
	            ),
	            React.createElement(skoash.Image, { className: "cactus", src: MEDIA.IMAGE + "img_9.1.png" })
	        )
	    );
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var REVEALS = ['less', 'loss', 'erosion', 'endangered', 'threats', 'unable'];
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'environment-effects',
	            className: 'bottom-frame'
	        }),
	        React.createElement(skoash.Audio, { type: 'voiceOver', src: MEDIA.VO + 'EffectsDrought.mp3' }),
	        React.createElement(skoash.Selectable, {
	            ref: 'selectable',
	            list: _.map(REVEALS, function (value) {
	                return React.createElement(skoash.ListItem, { 'data-ref': value });
	            }),
	            selectClass: 'HIGHLIGHTED',
	            className: 'scroll-selectable',
	            dataTarget: 'selectable'
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                ref: 'media-collection',
	                play: _.get(props, 'data.media.open', null)
	            },
	            React.createElement(skoash.Audio, {
	                'data-ref': REVEALS[0],
	                type: 'voiceOver',
	                src: MEDIA.VO + 'EffectsLess.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': REVEALS[1],
	                type: 'voiceOver',
	                src: MEDIA.VO + 'EffectsLoss.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': REVEALS[2],
	                type: 'voiceOver',
	                src: MEDIA.VO + 'EffectsErosion.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': REVEALS[3],
	                type: 'voiceOver',
	                src: MEDIA.VO + 'EffectsEndangered.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': REVEALS[4],
	                type: 'voiceOver',
	                src: MEDIA.VO + 'EffectsThreats.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                'data-ref': REVEALS[5],
	                type: 'voiceOver',
	                src: MEDIA.VO + 'EffectsUnable.mp3'
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { ref: 'frame', className: 'frame animated' },
	            React.createElement(skoash.Image, { src: MEDIA.IMAGE + 'img_10.7.png' }),
	            React.createElement(skoash.Reveal, {
	                ref: 'reveal',
	                className: 'scroll-reveal',
	                openTarget: 'media',
	                openReveal: _.get(props, 'data.selectable.target.props.data-ref'),
	                list: [React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': REVEALS[0] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Less food and water.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': REVEALS[1] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Loss of habitat',
	                        React.createElement('br', null),
	                        ' for fish and wildlife.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': REVEALS[2] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Erosion of soil.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': REVEALS[3] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Endangered species',
	                        React.createElement('br', null),
	                        ' could face extinction.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': REVEALS[4] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Threats to homes and lives',
	                        React.createElement('br', null),
	                        ' from forest fires.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': REVEALS[5] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Unable to play in the water.'
	                    )
	                )]
	            })
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
	            id: "what-can-we-do"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: MEDIA.VO + "WhatCanWe.mp3" }),
	        React.createElement(skoash.Image, { src: MEDIA.IMAGE + "img_11.1.png" }),
	        React.createElement(
	            skoash.Component,
	            { className: "flip-card-component bt" },
	            React.createElement(skoash.Selectable, {
	                ref: "selectable-card",
	                className: "flip-card-component",
	                list: [React.createElement(
	                    skoash.Component,
	                    { type: "li", correct: true, "data-ref": "flip conservation" },
	                    React.createElement("div", { className: "side b center inline" }),
	                    React.createElement("div", { className: "side a center inline" })
	                )],
	                selectClass: "HIGHLIGHTED",
	                dataTarget: "selectable"
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                ref: "media-collection",
	                play: _.get(props, 'data.selectable.target.props.data-ref', null)
	            },
	            React.createElement(skoash.Audio, {
	                "data-ref": "conservation",
	                type: "voiceOver",
	                src: MEDIA.VO + "FirstLine.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                "data-ref": "flip",
	                type: "voiceOver",
	                src: MEDIA.EFFECT + "CardFlip.mp3"
	            })
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
	            id: "info-drain"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                ref: "info",
	                type: "voiceOver",
	                src: MEDIA.VO + "WeNowUse.mp3",
	                completeTarget: "vo"
	            }),
	            React.createElement(skoash.Audio, { ref: "drain", type: "sfx", src: MEDIA.EFFECT + "Spin.mp3" })
	        ),
	        React.createElement(skoash.Image, { src: MEDIA.IMAGE + "img_12.1.png" }),
	        React.createElement(
	            "p",
	            { className: 'animated ' + (_.get(props, 'data.vo.complete') ? 'draining' : '') },
	            "Today we use",
	            React.createElement("br", null),
	            "127% more water",
	            React.createElement("br", null),
	            "than we did in 1950!",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "Most of that water",
	            React.createElement("br", null),
	            "swirls down the drain."
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
	            id: "info-using-less"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "UsingLess.mp3"
	        }),
	        React.createElement(skoash.Image, { src: MEDIA.IMAGE + "img_13.1.png" }),
	        React.createElement(
	            "p",
	            null,
	            "Using less",
	            React.createElement("br", null),
	            " adds up!"
	        )
	    );
	};

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
	            id: "shower"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: MEDIA.VO + "IfYouDecrease.mp3" }),
	        React.createElement(skoash.Image, { className: "hidden", src: MEDIA.SPRITE + "sprites.cards.png" }),
	        React.createElement(skoash.Image, { className: "title", src: MEDIA.IMAGE + "img_14.1.png" }),
	        React.createElement(
	            "p",
	            null,
	            "Turn each card."
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "flip-card-component bt" },
	            React.createElement(skoash.Selectable, {
	                ref: "selectable-card",
	                className: "flip-card-component",
	                list: [React.createElement(
	                    skoash.Component,
	                    { type: "li", correct: true, "data-ref": "day" },
	                    React.createElement("div", { className: "side b center inline" }),
	                    React.createElement("div", { className: "side a center inline" })
	                ), React.createElement(
	                    skoash.Component,
	                    { type: "li", correct: true, "data-ref": "week" },
	                    React.createElement("div", { className: "side b center inline" }),
	                    React.createElement("div", { className: "side a center inline" })
	                ), React.createElement(
	                    skoash.Component,
	                    { type: "li", correct: true, "data-ref": "year" },
	                    React.createElement("div", { className: "side b center inline" }),
	                    React.createElement("div", { className: "side a center inline" })
	                )],
	                selectClass: "HIGHLIGHTED",
	                dataTarget: "selectable"
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                ref: "media-collection",
	                play: _.get(props, 'data.selectable.target.props.data-ref')
	            },
	            React.createElement(skoash.Audio, { "data-ref": "day", type: "voiceOver", src: MEDIA.VO + "5Gallons.mp3" }),
	            React.createElement(skoash.Audio, { "data-ref": "week", type: "voiceOver", src: MEDIA.VO + "35Gallons.mp3" }),
	            React.createElement(skoash.Audio, { "data-ref": "year", type: "voiceOver", src: MEDIA.VO + "1680Gallons.mp3" })
	        )
	    );
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	
	    var WAYS = ['dishes', 'teeth', 'plants', 'clothes', 'lukewarm', 'cooler', 'trash', 'car'];
	
	    var openReveal = function openReveal() {
	        var index = _.get(props, 'data.reveal.index', -1);
	        if (!_.isFinite(index) || index > 7) index = -1;
	        this.updateScreenData({
	            key: 'reveal',
	            data: {
	                index: index + 1
	            }
	        });
	    };
	
	    var closeReveal = function closeReveal() {
	        this.updateScreenData({
	            key: 'reveal',
	            data: {
	                close: true
	            }
	        });
	
	        updateMeterHeight.call(this);
	    };
	
	    var updateMeterHeight = function updateMeterHeight() {
	        var complete = false;
	        var height = _.get(props, 'data.meter.height', 0);
	
	        if (!_.isFinite(height) || height >= 7) {
	            height = 7;
	            complete = true;
	        }
	
	        this.updateScreenData({
	            key: 'meter',
	            data: {
	                height: height + 1,
	                complete: complete
	            }
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'conserve',
	            className: _.get(props, 'data.selectable.target') ? 'SELECTING' : null
	        }),
	        React.createElement(skoash.Image, { src: MEDIA.IMAGE + 'img_15.1.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.IMAGE + 'FR_4.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'img_sp_15.1.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: MEDIA.SPRITE + 'img_15.3.png' }),
	        React.createElement('div', {
	            id: 'door-sprite',
	            className: _.get(props, 'data.reveal.open.length', -1) > 0 ? 'open' : ''
	        }),
	        React.createElement(
	            skoash.Component,
	            { id: 'meter-sprite' },
	            [].concat(_toConsumableArray(Array(WAYS.length + 1))).map(function (value, index) {
	                return React.createElement(skoash.Component, {
	                    className: _.get(props, 'data.meter.height', -1) === index ? 'visible' : '',
	                    key: index
	                });
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.meter.complete', false) ? 'meter-complete' : ''
	            },
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                'data-ref': 'meter-complete',
	                src: MEDIA.EFFECT + 'Harmonica.mp3'
	            })
	        ),
	        React.createElement(skoash.Audio, { type: 'voiceOver', src: MEDIA.VO + 'WaysConserve.mp3' }),
	        React.createElement(skoash.Selectable, {
	            ref: 'selectable',
	            list: [React.createElement('li', {
	                id: 'door',
	                className: _.get(props, 'data.reveal.open.length', -1) > 0 ? 'open' : ''
	            })],
	            dataTarget: 'selectable',
	            onSelect: openReveal
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: WAYS[_.get(props, 'data.reveal.index', null)] + ' ' + _
	            },
	            WAYS.map(function (value) {
	                return React.createElement(skoash.Audio, {
	                    onComplete: closeReveal,
	                    type: 'voiceOver',
	                    'data-ref': value,
	                    src: MEDIA.VO + 'Ways' + _.upperFirst(value) + '.mp3'
	                });
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { ref: 'frame', className: 'frame animated' },
	            React.createElement(skoash.Reveal, {
	                ref: 'reveal',
	                openTarget: 'reveal',
	                openReveal: WAYS[_.get(props, 'data.reveal.index', null)],
	                closeReveal: _.get(props, 'data.reveal.close'),
	                list: [React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[0] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Don\'t let the water',
	                        React.createElement('br', null),
	                        'run while',
	                        React.createElement('br', null),
	                        'washing dishes.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[1] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Don\'t let the water',
	                        React.createElement('br', null),
	                        'run continuously while',
	                        React.createElement('br', null),
	                        'brushing your teeth.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[2] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Use leftover water from',
	                        React.createElement('br', null),
	                        'the melted ice in your',
	                        React.createElement('br', null),
	                        'glass to water your plants.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[3] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Only wash full loads',
	                        React.createElement('br', null),
	                        'of clothes.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[4] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Use lukewarm water.',
	                        React.createElement('br', null),
	                        React.createElement('br', null),
	                        'Don\'t let it',
	                        React.createElement('br', null),
	                        'run to warm up.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[5] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Collect rain water in',
	                        React.createElement('br', null),
	                        'a bucket for plants or',
	                        React.createElement('br', null),
	                        'cleaning or even flushing.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[6] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Throw trash in',
	                        React.createElement('br', null),
	                        'a waste basket.',
	                        React.createElement('br', null),
	                        React.createElement('br', null),
	                        'Don\'t flush it.'
	                    )
	                ), React.createElement(
	                    skoash.ListItem,
	                    { 'data-ref': WAYS[7] },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Wash the car in the grass',
	                        React.createElement('br', null),
	                        'instead of the driveway.'
	                    )
	                )],
	                assets: [React.createElement(skoash.Audio, {
	                    'data-ref': 'open-sound',
	                    type: 'sfx',
	                    src: MEDIA.EFFECT + 'RevealOpen.mp3'
	                }), React.createElement(skoash.Audio, {
	                    'data-ref': 'close-sound',
	                    type: 'sfx',
	                    src: MEDIA.EFFECT + 'RevealClosed.mp3',
	                    delay: 500
	                })]
	            })
	        )
	    );
	};
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
	            id: "hero",
	            className: "large-frame"
	        }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: MEDIA.VO + "BeAHero.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(skoash.Image, { src: MEDIA.IMAGE + "img_16.1.png" }),
	            React.createElement(
	                "p",
	                null,
	                "Take this real world!",
	                React.createElement("br", null),
	                "Do ",
	                React.createElement(skoash.Image, { className: "inline", src: MEDIA.IMAGE + "img_16.2.png" }),
	                "and show your family",
	                React.createElement("br", null),
	                " how they can be heroes too."
	            )
	        )
	    );
	};

/***/ },
/* 25 */
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
	                src: MEDIA.VO + "DOFlip.mp3",
	                completeTarget: "vo",
	                volume: 2
	            }),
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: MEDIA.EFFECT + "Rattle.mp3"
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame animated" },
	            React.createElement(
	                "h3",
	                null,
	                "Thank you."
	            ),
	            React.createElement(
	                "p",
	                null,
	                "You learned a lot about",
	                React.createElement("br", null),
	                "how to save water!",
	                React.createElement("br", null),
	                "Now lets work together",
	                React.createElement("br", null),
	                "to get the Drought Out."
	            ),
	            React.createElement(skoash.Image, {
	                className: 'animated ' + (_.get(props, 'data.vo.complete') ? 'shaking' : ''),
	                src: MEDIA.IMAGE + "img_17.1.png"
	            })
	        )
	    );
	};

/***/ },
/* 26 */
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