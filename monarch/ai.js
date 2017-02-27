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
/******/ 	var hotCurrentHash = "65350f21d940049aba80"; // eslint-disable-line no-unused-vars
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
	
	var _info_video_one_screen = __webpack_require__(8);
	
	var _info_video_one_screen2 = _interopRequireDefault(_info_video_one_screen);
	
	var _life_stages_screen = __webpack_require__(9);
	
	var _life_stages_screen2 = _interopRequireDefault(_life_stages_screen);
	
	var _first_stage_screen = __webpack_require__(10);
	
	var _first_stage_screen2 = _interopRequireDefault(_first_stage_screen);
	
	var _instructions_1_screen = __webpack_require__(11);
	
	var _instructions_1_screen2 = _interopRequireDefault(_instructions_1_screen);
	
	var _bonus_level_one_screen = __webpack_require__(12);
	
	var _bonus_level_one_screen2 = _interopRequireDefault(_bonus_level_one_screen);
	
	var _bonus_level_two_screen = __webpack_require__(14);
	
	var _bonus_level_two_screen2 = _interopRequireDefault(_bonus_level_two_screen);
	
	var _video_pupa_screen = __webpack_require__(15);
	
	var _video_pupa_screen2 = _interopRequireDefault(_video_pupa_screen);
	
	var _info_you_won_screen = __webpack_require__(16);
	
	var _info_you_won_screen2 = _interopRequireDefault(_info_you_won_screen);
	
	var _info_migrate_screen = __webpack_require__(17);
	
	var _info_migrate_screen2 = _interopRequireDefault(_info_migrate_screen);
	
	var _info_video_two_screen = __webpack_require__(18);
	
	var _info_video_two_screen2 = _interopRequireDefault(_info_video_two_screen);
	
	var _monarch_generation_one_screen = __webpack_require__(19);
	
	var _monarch_generation_one_screen2 = _interopRequireDefault(_monarch_generation_one_screen);
	
	var _level_one_screen = __webpack_require__(22);
	
	var _level_one_screen2 = _interopRequireDefault(_level_one_screen);
	
	var _monarch_generation_two_screen = __webpack_require__(24);
	
	var _monarch_generation_two_screen2 = _interopRequireDefault(_monarch_generation_two_screen);
	
	var _level_two_screen = __webpack_require__(25);
	
	var _level_two_screen2 = _interopRequireDefault(_level_two_screen);
	
	var _monarch_generation_three_screen = __webpack_require__(26);
	
	var _monarch_generation_three_screen2 = _interopRequireDefault(_monarch_generation_three_screen);
	
	var _level_three_screen = __webpack_require__(27);
	
	var _level_three_screen2 = _interopRequireDefault(_level_three_screen);
	
	var _monarch_generation_four_screen = __webpack_require__(28);
	
	var _monarch_generation_four_screen2 = _interopRequireDefault(_monarch_generation_four_screen);
	
	var _flip_screen = __webpack_require__(29);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _quit_screen = __webpack_require__(30);
	
	var _quit_screen2 = _interopRequireDefault(_quit_screen);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _info_video_one_screen2.default, _life_stages_screen2.default, _first_stage_screen2.default, _instructions_1_screen2.default, _bonus_level_one_screen2.default, _bonus_level_two_screen2.default, _video_pupa_screen2.default, _info_you_won_screen2.default, _info_migrate_screen2.default, _info_video_two_screen2.default, _monarch_generation_one_screen2.default, _level_one_screen2.default, _monarch_generation_two_screen2.default, _level_two_screen2.default, _monarch_generation_three_screen2.default, _level_three_screen2.default, _monarch_generation_four_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _quit_screen2.default
	    },
	    assets: [React.createElement(skoash.Font, { name: 'Chelsea Market' }), React.createElement(skoash.Font, { name: 'Japers' }), React.createElement(skoash.Font, { name: 'Source Sans Pro' }),
	    // <skoash.Font name="CMWN" />,
	    React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: MEDIA.FRAME + 'monarch.fact.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: MEDIA.FRAME + 'try.again.frame.png'
	    }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background bkg-1' }), React.createElement('div', { className: 'background bkg-2' }), React.createElement('div', { className: 'background bkg-3' }), React.createElement('div', { className: 'background bkg-4' }), React.createElement('div', { className: 'background bkg-5' }), React.createElement(skoash.Audio, {
	        ref: 'button',
	        type: 'sfx',
	        src: MEDIA.EFFECT + 'Click.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'screen-complete',
	        type: 'sfx',
	        src: MEDIA.EFFECT + 'NextAppear.mp3'
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-1',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG_1.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-2',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG_2.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-3',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG_3.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-4',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG_4.mp3',
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
	    }), React.createElement(skoash.Audio, {
	        ref: 'bkg-bonus',
	        type: 'background',
	        src: MEDIA.EFFECT + 'BonusBKG.mp3'
	    })],
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'ios-splash':
	                return;
	            case 'title':
	                return 'bkg-1';
	            case 'life-stages':
	                return 'bkg-2';
	            case 'first-stage':
	            case 'instructions-1':
	            case 'video-pupa':
	            case 'video-monarch':
	            case 'info-migrate':
	                return 'bkg-3';
	            case 'bonus-level-one':
	            case 'bonus-level-two':
	            case 'info-video-two':
	                return 'bkg-4';
	            case 'monarch-generations-1':
	            case 'phaser-level-1':
	            case 'monarch-generations-2':
	            case 'phaser-level-2':
	            case 'monarch-generations-3':
	            case 'phaser-level-3':
	            case 'monarch-generations-4':
	                return 'bkg-3';
	            case 'flip':
	                return;
	            case 'info-video-one':
	                return; // no bkg audio
	        }
	    }
	}));
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "monarch",
		"version": 1,
		"skoash": "1.1.3",
		"head_injection": "<link href='https://fonts.googleapis.com/css?family=Chelsea+Market' rel='stylesheet'>",
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
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                delay: 1000,
	                src: MEDIA.EFFECT + "Shake.mp3",
	                onComplete: function onComplete() {
	                    this.play();
	                }
	            })
	        )
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
	            id: "info-video-one"
	        }),
	        React.createElement(
	            skoash.Component,
	            {
	                className: "video-container"
	            },
	            React.createElement(skoash.Video, {
	                src: SRC
	            })
	        )
	    );
	};
	
	var SRC = 'https://res.cloudinary.com/changemyworldnow/video/upload/v1486137157/MonarchNewVideo_gt0adm.mp4';

/***/ },
/* 9 */
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
	            id: 'life-stages'
	        }),
	        React.createElement(skoash.Audio, {
	            ref: 'stages',
	            type: 'voiceOver',
	            src: MEDIA.VO + 'ClickStages.mp3'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'header' },
	            React.createElement(
	                'h1',
	                null,
	                'CLICK TO REVEAL THE STAGES OF',
	                React.createElement('br', null),
	                'A MONARCH\'S LIFE'
	            )
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open', null),
	                onPlay: onPlay
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'egg',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'FourDays.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'caterpillar',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Milkweed.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'pupa',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'Pupa.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'monarch',
	                type: 'voiceOver',
	                src: MEDIA.VO + 'MonarchEmerges.mp3'
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: 'selectable',
	            selectClass: 'HIGHLIGHTED',
	            onSelect: onSelect,
	            list: [React.createElement(skoash.Component, {
	                'data-ref': 'egg',
	                className: 'question-mark egg',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'caterpillar',
	                className: 'question-mark caterpillar',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'pupa',
	                className: 'question-mark pupa',
	                correct: true
	            }), React.createElement(skoash.Component, {
	                'data-ref': 'monarch',
	                className: 'question-mark monarch',
	                correct: true
	            })]
	        }),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            closeTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'egg',
	                    className: 'frame standard egg'
	                },
	                React.createElement(skoash.Component, {
	                    className: 'life'
	                }),
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Egg'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'The Monarch starts',
	                    React.createElement('br', null),
	                    'as a tiny egg,',
	                    React.createElement('br', null),
	                    'which hatches',
	                    React.createElement('br', null),
	                    'in four days.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'caterpillar',
	                    className: 'frame standard caterpillar'
	                },
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Caterpillar'
	                ),
	                React.createElement(skoash.Component, {
	                    className: 'life'
	                }),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Then the caterpillar,',
	                    React.createElement('br', null),
	                    'which is the larval',
	                    React.createElement('br', null),
	                    'stage of the butterfly,',
	                    React.createElement('br', null),
	                    'spends its time eating',
	                    React.createElement('br', null),
	                    'the milkweed for',
	                    React.createElement('br', null),
	                    'two weeks.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'pupa',
	                    className: 'frame standard pupa'
	                },
	                React.createElement(skoash.Component, {
	                    className: 'life'
	                }),
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Pupa'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'The caterpillar then',
	                    React.createElement('br', null),
	                    'weaves a pupa,',
	                    React.createElement('br', null),
	                    'or chrysalis, around',
	                    React.createElement('br', null),
	                    'itself and stays',
	                    React.createElement('br', null),
	                    'inside for 10 days.'
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'monarch',
	                    className: 'frame standard monarch'
	                },
	                React.createElement(skoash.Component, {
	                    className: 'life'
	                }),
	                React.createElement(
	                    'h2',
	                    { className: 'label' },
	                    'Monarch'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'copy' },
	                    'Finally, the Monarch',
	                    React.createElement('br', null),
	                    'Butterfly emerges',
	                    React.createElement('br', null),
	                    'from the pupa!'
	                )
	            )]
	        })
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
	            id: "first-stage"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "FirstStage.mp3"
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame standard" },
	            React.createElement(
	                "h1",
	                { className: "header" },
	                "Let's start with my first stage of life,",
	                React.createElement("br", null),
	                "the Caterpillar!"
	            ),
	            React.createElement(
	                "span",
	                { className: "copy" },
	                "Only able to crawl, I am very vulnerable",
	                React.createElement("br", null),
	                "and have to avoid predators as I look for",
	                React.createElement("br", null),
	                "milkweed leaves to eat.",
	                React.createElement("br", null),
	                React.createElement("br", null),
	                "You can help me as I go about",
	                React.createElement("br", null),
	                "my daily life in the game ahead!"
	            )
	        )
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
	            id: "instructions-1"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "MoveCaterpillar.mp3"
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame standard" },
	            React.createElement(
	                "h1",
	                { className: "header" },
	                "INSTRUCTIONS"
	            ),
	            React.createElement(
	                "span",
	                { className: "copy" },
	                "Move the caterpillar from square",
	                React.createElement("br", null),
	                "to square. Collect the milkweed",
	                React.createElement("br", null),
	                "leaves before the timer runs out,",
	                React.createElement("br", null),
	                "and look out for predators!",
	                React.createElement("br", null),
	                "Flowers will bring you to a",
	                React.createElement("br", null),
	                "special bonus level!"
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
	
	exports.default = function (props, ref, key) {
	    return (0, _bonus_level_screen_component2.default)(props, ref, key, {
	        id: 'bonus-level-one',
	        levelNumber: 1,
	        timeout: 30000,
	        itemCount: 13,
	        pointValue: 150,
	        openOnStart: 'instructions',
	        map: MEDIA.IMAGE + 'labryinth-01.png',
	        image: MEDIA.IMAGE + 'map-01.png',
	        vos: [React.createElement(skoash.Audio, {
	            ref: 'instructions',
	            type: 'voiceOver',
	            src: MEDIA.VO + 'InThisBonusLevel.mp3'
	        }), React.createElement(skoash.Audio, {
	            ref: 'countdown',
	            type: 'voiceOver',
	            src: MEDIA.VO + 'Countdown.mp3'
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            { ref: 'instructions', className: 'reveal-frame labyrinth-frame instructions' },
	            React.createElement(
	                'h1',
	                { className: 'header' },
	                'INSTRUCTIONS'
	            ),
	            React.createElement(
	                'span',
	                { className: 'copy' },
	                'In this bonus round, try to',
	                React.createElement('br', null),
	                'get as many milkweed leaves',
	                React.createElement('br', null),
	                'as you can before the',
	                React.createElement('br', null),
	                'timer runs out'
	            )
	        ), React.createElement(
	            skoash.Component,
	            { ref: 'countdown', className: 'reveal-frame labyrinth-frame countdown' },
	            React.createElement(
	                'span',
	                { className: 'number three' },
	                '3'
	            ),
	            React.createElement(
	                'span',
	                { className: 'number two' },
	                '2'
	            ),
	            React.createElement(
	                'span',
	                { className: 'number one' },
	                '1'
	            )
	        ), React.createElement(
	            skoash.Component,
	            { ref: 'complete', className: 'reveal-frame complete' },
	            React.createElement(
	                'span',
	                { className: 'char1' },
	                'W'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char2' },
	                'O'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char3' },
	                'W'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char4' },
	                '!'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char5' },
	                '!'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char6' },
	                '!'
	            )
	        )]
	    });
	};
	
	var _bonus_level_screen_component = __webpack_require__(13);
	
	var _bonus_level_screen_component2 = _interopRequireDefault(_bonus_level_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	    var itemInteract;
	    var onComplete;
	    var onOpenReveal;
	    var onCloseReveal;
	    var items = [];
	
	    itemInteract = function itemInteract() {
	        this.complete();
	        this.disable();
	        this.updateGameState({
	            path: 'correct',
	            data: _.get(props, 'data.correct', 0) + 1
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
	
	    onOpenReveal = function onOpenReveal(message) {
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: true,
	                start: false,
	                vo: message,
	                sfx: message
	            }
	        });
	    };
	
	    onCloseReveal = function onCloseReveal(prevMessage) {
	        var _this = this;
	
	        if (prevMessage === 'instructions') {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'countdown'
	                }
	            });
	
	            setTimeout(function () {
	                _this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        open: '',
	                        close: true
	                    }
	                });
	            }, 5500);
	        }
	
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: false,
	                start: true,
	                restart: false
	            }
	        });
	
	        if (prevMessage === 'level-up') {
	            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	        }
	    };
	
	    for (var i = 0; i < opts.itemCount; i++) {
	        items.push(React.createElement(skoash.InteractiveItem, {
	            className: 'item-' + (i + 1),
	            checkComplete: false,
	            onInteract: itemInteract,
	            children: [React.createElement(skoash.Audio, {
	                ref: 'interact',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'MilkweedCollect.mp3',
	                complete: true
	            })]
	        }));
	    }
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: opts.id
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.game.vo'),
	            children: opts.vos
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.game.sfx')
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'countdown',
	                type: 'voiceOver',
	                src: MEDIA.EFFECT + 'BonusCountdown.mp3',
	                rate: .55,
	                complete: true
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openTarget: 'reveal',
	            openOnStart: opts.openOnStart,
	            openReveal: _.get(props, 'data.reveal.open', null),
	            closeReveal: _.get(props, 'data.reveal.close'),
	            onOpen: onOpenReveal,
	            onClose: onCloseReveal,
	            list: opts.revealList
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'timer-container' },
	            React.createElement(
	                'span',
	                { className: 'label' },
	                React.createElement(
	                    'strong',
	                    null,
	                    'Time: '
	                )
	            ),
	            React.createElement(skoash.Timer, {
	                countDown: true,
	                timeout: opts.timeout,
	                onComplete: onComplete,
	                checkComplete: _.get(props, 'data.game.start', false),
	                restart: _.get(props, 'data.game.start', false),
	                complete: _.get(props, 'data.game.complete', false)
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: 'score-container' },
	            React.createElement(
	                'span',
	                { className: 'label' },
	                React.createElement(
	                    'strong',
	                    null,
	                    'SCORE: '
	                )
	            ),
	            React.createElement(skoash.Score, {
	                increment: opts.pointValue,
	                max: opts.itemCount * opts.pointValue,
	                correct: _.get(props, 'data.correct', 0),
	                onComplete: onComplete,
	                complete: _.get(props, 'data.game.complete', false)
	            })
	        ),
	        React.createElement(skoash.Labyrinth, {
	            img: opts.image,
	            map: opts.map,
	            input: _.get(props, 'data.d-pad', {}),
	            startX: 50,
	            startY: 65,
	            speed: 3,
	            scale: _.get(props, 'gameState.scale', 1),
	            start: _.get(props, 'data.game.start', false),
	            items: items,
	            complete: _.get(props, 'data.game.complete', false)
	        }),
	        React.createElement(skoash.DPad, {
	            start: _.get(props, 'data.game.start', false),
	            stop: _.get(props, 'data.game.stop', false),
	            assets: [React.createElement(skoash.Audio, {
	                ref: 'keydown',
	                type: 'sfx',
	                src: MEDIA.EFFECT + 'CaterpillarMove.mp3',
	                complete: true
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
	
	exports.default = function (props, ref, key) {
	    return (0, _bonus_level_screen_component2.default)(props, ref, key, {
	        id: 'bonus-level-two',
	        levelNumber: 1,
	        timeout: 30000,
	        itemCount: 13,
	        pointValue: 150,
	        map: MEDIA.IMAGE + 'Labryinth-02.png',
	        image: MEDIA.IMAGE + 'map-02.png',
	        revealList: [React.createElement(
	            skoash.Component,
	            { ref: 'complete', className: 'reveal-frame complete' },
	            React.createElement(
	                'span',
	                { className: 'char1' },
	                'W'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char2' },
	                'O'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char3' },
	                'W'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char4' },
	                '!'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char5' },
	                '!'
	            ),
	            React.createElement(
	                'span',
	                { className: 'char6' },
	                '!'
	            )
	        )]
	    });
	};
	
	var _bonus_level_screen_component = __webpack_require__(13);
	
	var _bonus_level_screen_component2 = _interopRequireDefault(_bonus_level_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 15 */
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
	            id: 'info-video-pupa'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'video-container' },
	            React.createElement(skoash.Video, {
	                src: SRC
	            })
	        )
	    );
	};
	
	var SRC = 'https://res.cloudinary.com/changemyworldnow/video/upload/' + 'v1486138208/Monarch_Transformation_fmbavs.mp4';

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
	            id: "info-you-won"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: MEDIA.VO + "YouveWon.mp3"
	            })
	        ),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "sfx",
	                src: MEDIA.EFFECT + "GameWin_G1.mp3"
	            })
	        ),
	        React.createElement(
	            "h1",
	            { className: "header" },
	            "YOU'VE WON THE GAME!"
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame standard" },
	            React.createElement(
	                "span",
	                { className: "copy" },
	                "Thank you for helping find the",
	                React.createElement("br", null),
	                "milkweed leaves and avoid predators!",
	                React.createElement("br", null),
	                React.createElement("br", null),
	                "Now watch me transform from a",
	                React.createElement("br", null),
	                "caterpillar to a butterfly right",
	                React.createElement("br", null),
	                "before your eyes!"
	            )
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
	            id: "info-migrate"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "3000Milesmp3.mp3"
	        }),
	        React.createElement(skoash.Image, {
	            className: "butterfly",
	            src: MEDIA.IMAGE + "Monarchbutterfly.png"
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "copy-container" },
	            React.createElement(
	                "span",
	                { className: "copy" },
	                "Monarchs migrate south every",
	                React.createElement("br", null),
	                "winter. Ever wonder what it must",
	                React.createElement("br", null),
	                "be like to fly up to 3,000 miles -",
	                React.createElement("br", null),
	                "without an airplane?"
	            )
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
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'info-video-two'
	        }),
	        React.createElement(
	            skoash.Component,
	            {
	                className: 'video-container'
	            },
	            React.createElement(skoash.Video, {
	                src: SRC
	            })
	        )
	    );
	};
	
	var SRC = 'https://res.cloudinary.com/changemyworldnow/video/upload/' + 'v1486138692/Monarch_Workout_hmotnk_qdftsp.mp4';

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _monarch_generations_screen_component2.default)(props, ref, key, {
	        level: 1,
	        openOnStart: 'instructions',
	        factVO: 'FourGenerations',
	        factContent: React.createElement(
	            'p',
	            null,
	            'Every summer, Monarchs produce',
	            React.createElement('br', null),
	            'four generations. The first three',
	            React.createElement('br', null),
	            'generations have 2-6 week life',
	            React.createElement('br', null),
	            'spans. It all starts in Mexico',
	            React.createElement('br', null),
	            'during late March and early April,',
	            React.createElement('br', null),
	            'when the first eggs are laid as the',
	            React.createElement('br', null),
	            'Monarchs migrate north.'
	        )
	    });
	};
	
	var _monarch_generations_screen_component = __webpack_require__(20);
	
	var _monarch_generations_screen_component2 = _interopRequireDefault(_monarch_generations_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	    var onCloseReveal;
	    var onSelect;
	    var onAnimationEnd;
	    var getStarClassNames;
	
	    onCloseReveal = function onCloseReveal(prevMessage) {
	        if (!prevMessage) return;
	
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: null
	            }
	        });
	
	        if (prevMessage !== 'instructions') {
	            this.updateGameState({
	                path: ['animate'],
	                data: _defineProperty({}, opts.level, true)
	            });
	        }
	    };
	
	    onSelect = function onSelect() {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                open: 'fact'
	            }
	        });
	    };
	
	    onAnimationEnd = function onAnimationEnd() {
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
	            id: 'monarch-generations-' + opts.level
	        }),
	        hiddenImages,
	        React.createElement(
	            skoash.Component,
	            {
	                className: 'path'
	            },
	            _.map([1, 2, 3], function (level) {
	                return React.createElement(
	                    skoash.Component,
	                    {
	                        className: 'circle-' + level
	                    },
	                    _.map([1, 2, 3], function (star) {
	                        return React.createElement('div', { className: getStarClassNames(level, star) });
	                    })
	                );
	            }),
	            React.createElement(skoash.Selectable, {
	                onSelect: onSelect,
	                list: _.map([1, 2, 3, 4], function (star) {
	                    return React.createElement(skoash.Component, {
	                        type: 'li',
	                        className: (0, _classnames2.default)('butterfly-' + star, {
	                            animate: _.get(props, 'gameState.data.animate.' + star)
	                        }),
	                        onAnimationEnd: onAnimationEnd
	                    });
	                })
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: opts.openOnStart,
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'instructions',
	                    className: 'instructions',
	                    type: 'li'
	                },
	                React.createElement(
	                    'h4',
	                    null,
	                    'click anywhere on the screen to continue'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    'Click to reveal interesting',
	                    React.createElement('br', null),
	                    'facts about the four',
	                    React.createElement('br', null),
	                    'generations of Monarchs.'
	                ),
	                React.createElement(skoash.Image, {
	                    className: 'butterfly-a',
	                    src: MEDIA.IMAGE + 'orange.butterfly.png'
	                }),
	                React.createElement(skoash.Image, {
	                    className: 'butterfly-b',
	                    src: MEDIA.IMAGE + 'orange.butterfly.png'
	                }),
	                React.createElement(skoash.Image, {
	                    className: 'arrow-1',
	                    src: MEDIA.IMAGE + 'orange.arrow.png'
	                }),
	                React.createElement(skoash.Image, {
	                    className: 'arrow-2',
	                    src: MEDIA.IMAGE + 'orange.arrow.png'
	                })
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact',
	                    className: 'fact',
	                    type: 'li'
	                },
	                opts.factContent
	            )]
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.reveal.open')
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                {
	                    ref: 'instructions',
	                    silentOnStart: true,
	                    complete: !opts.openOnStart
	                },
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    src: MEDIA.VO + 'ClickAnywhere.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    ref: 'instructions',
	                    src: MEDIA.VO + 'FourGenerations.mp3'
	                })
	            ),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact',
	                src: '' + MEDIA.VO + opts.factVO + '.mp3'
	            })
	        )
	    );
	};
	
	var _classnames = __webpack_require__(21);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var hiddenImagesSrcs = [MEDIA.SPRITE + 'sprite.circles.png', MEDIA.SPRITE + 'sprite.starmap.png', MEDIA.SPRITE + 'sprite.butterflyhover.png', MEDIA.IMAGE + 'path.png', MEDIA.FRAME + 'frame.big.png'];
	
	var hiddenImages = _.map(hiddenImagesSrcs, function (image) {
	    return React.createElement(skoash.Image, { className: 'hidden', src: image });
	});

/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 1,
	        instructionsVO: 'LevelOneGenerations',
	        fact1VO: '250Eggs', // needs to be updated
	        fact2VO: '250Eggs',
	        fact3VO: '1179',
	        instructions: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'LEVEL ONE'
	            ),
	            'It takes energy to reproduce offspring!',
	            React.createElement('br', null),
	            'Land on milkweed leaves and lay all of your',
	            React.createElement('br', null),
	            'eggs for this season to win. Be sure to',
	            React.createElement('br', null),
	            'monitor your energy levels, stay hydrated,',
	            React.createElement('br', null),
	            'and watch out for predators.',
	            React.createElement('br', null),
	            'Collect stars for extra points!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            'While most Monarch eggs',
	            React.createElement('br', null),
	            'are laid on milkweed leaves,',
	            React.createElement('br', null),
	            'accidents do happen and eggs',
	            React.createElement('br', null),
	            'could be found on other plants.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            'Monarchs can lay a maximum',
	            React.createElement('br', null),
	            'of 250 eggs per day,',
	            React.createElement('br', null),
	            'one egg at a time.'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            'The highest number of eggs',
	            React.createElement('br', null),
	            'laid by a Monarch in',
	            React.createElement('br', null),
	            'captivity is 1179'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(23);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 23 */
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
	    };
	
	    getGameSrc = function getGameSrc() {
	        if (!_.get(props, 'data.game.screenStart')) return;
	        return '../monarchs-flyer/index.html?v=' + opts.level;
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
	                open: null
	            }
	        });
	
	        this.updateGameState({
	            path: 'd-pad',
	            data: {
	                pause: false
	            }
	        });
	
	        if (prevMessage === 'instructions') {
	            this.updateGameState({
	                path: ['game'],
	                data: {
	                    levels: _defineProperty({}, opts.level, {
	                        start: true
	                    })
	                }
	            });
	        } else if (prevMessage === 'replay') {
	            onScreenStart.call(this, false);
	
	            this.updateGameState({
	                path: ['game'],
	                data: {
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                },
	                callback: function callback() {
	                    startScreen.call(_this);
	                }
	            });
	        } else if (prevMessage === 'fact-1' && stars > 1) {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'fact-2'
	                }
	            });
	        } else if (prevMessage === 'fact-2' && stars > 2) {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'fact-3'
	                }
	            });
	        } else {
	            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
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
	        }
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
	                onComplete: onTimerComplete
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: 'instructions',
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            onOpen: onOpenReveal,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'instructions',
	                    className: 'frame square instructions',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.instructions
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-1',
	                    className: 'fact frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact1Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-2',
	                    className: 'fact frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact2Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-3',
	                    className: 'fact frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact3Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'replay',
	                    className: 'replay frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Don\'t give up!',
	                        React.createElement('br', null),
	                        'You still have another',
	                        React.createElement('br', null),
	                        'chance to help the',
	                        React.createElement('br', null),
	                        'Monarch complete',
	                        React.createElement('br', null),
	                        'its mission!'
	                    )
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
	                ref: 'instructions',
	                src: '' + MEDIA.VO + opts.instructionsVO + '.mp3'
	            }),
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
	                ref: 'replay',
	                src: MEDIA.VO + 'DontGiveUp.mp3',
	                complete: true
	            })
	        )
	    );
	};
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _monarch_generations_screen_component2.default)(props, ref, key, {
	        level: 2,
	        factVO: 'SpringGeneration',
	        factContent: React.createElement(
	            'p',
	            null,
	            'The spring Monarch generation',
	            React.createElement('br', null),
	            'then migrates further north as the',
	            React.createElement('br', null),
	            'weather gets warmer, starting in',
	            React.createElement('br', null),
	            'late April and continuing through',
	            React.createElement('br', null),
	            'June. Like the first generation,',
	            React.createElement('br', null),
	            'they lay their eggs and',
	            React.createElement('br', null),
	            'die weeks after.'
	        )
	    });
	};
	
	var _monarch_generations_screen_component = __webpack_require__(20);
	
	var _monarch_generations_screen_component2 = _interopRequireDefault(_monarch_generations_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 2,
	        instructionsVO: 'LevelTwoGenerations',
	        fact1VO: 'Tarsi',
	        fact2VO: 'Proboscis',
	        fact3VO: 'WaterAndFruitJuice',
	        instructions: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'LEVEL TWO'
	            ),
	            'Migrating Monarchs have a big appetite!',
	            React.createElement('br', null),
	            'Collect enough nectar from the flowers',
	            React.createElement('br', null),
	            'in order to get to the next level.',
	            React.createElement('br', null),
	            'Avoid getting tangled in spider webs',
	            React.createElement('br', null),
	            'and collect the power flowers',
	            React.createElement('br', null),
	            'to get extra strength.'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            'Monarch smell with their',
	            React.createElement('br', null),
	            'antennae and taste with their feet!',
	            React.createElement('br', null),
	            'The feet have receptors called',
	            React.createElement('br', null),
	            'tarsi that taste the sweet nectar.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            'Adult Monarchs feed on',
	            React.createElement('br', null),
	            'flower nectar by sucking it through',
	            React.createElement('br', null),
	            'a tube called a proboscis.'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            'In addition to flower nectar,',
	            React.createElement('br', null),
	            'Monarchs can also feed on',
	            React.createElement('br', null),
	            'water and fruit juice.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(23);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _monarch_generations_screen_component2.default)(props, ref, key, {
	        level: 3,
	        factVO: 'MigrationJourney',
	        factContent: React.createElement(
	            'p',
	            null,
	            'As the summer proceeds, the butterfly',
	            React.createElement('br', null),
	            'generations mature and continue',
	            React.createElement('br', null),
	            'migrating north. They will need all',
	            React.createElement('br', null),
	            'the energy they can get from flower',
	            React.createElement('br', null),
	            'nectar in order to flap their wings',
	            React.createElement('br', null),
	            'for the thousands of miles',
	            React.createElement('br', null),
	            'of their migration journey!'
	        )
	    });
	};
	
	var _monarch_generations_screen_component = __webpack_require__(20);
	
	var _monarch_generations_screen_component2 = _interopRequireDefault(_monarch_generations_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 3,
	        instructionsVO: 'Level3Generations',
	        fact1VO: 'MPH',
	        fact2VO: '3000Milesmp3',
	        fact3VO: 'Roost',
	        instructions: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'LEVEL THREE'
	            ),
	            'Hitch a ride on wind thermals to',
	            React.createElement('br', null),
	            'move ahead in your migration!',
	            React.createElement('br', null),
	            'Be sure to collect fruit and water',
	            React.createElement('br', null),
	            'for energy. Speed and distance',
	            React.createElement('br', null),
	            'is what this generation is about!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            'Monarchs fly between',
	            React.createElement('br', null),
	            '12 and 15 miles per hour.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            'North American Monarchs',
	            React.createElement('br', null),
	            'are the only butterflies',
	            React.createElement('br', null),
	            'that migrate such a long',
	            React.createElement('br', null),
	            'distance\u2014up to 3,000 miles.'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            'In Mexico they roost in trees',
	            React.createElement('br', null),
	            'in HUGE groups that may',
	            React.createElement('br', null),
	            'have millions of butterflies.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(23);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _monarch_generations_screen_component2.default)(props, ref, key, {
	        level: 4,
	        factVO: 'FourthGeneration',
	        factContent: React.createElement(
	            'p',
	            null,
	            'The fourth generation will migrate',
	            React.createElement('br', null),
	            'south for the winter and this',
	            React.createElement('br', null),
	            'group can live up to nine months!',
	            React.createElement('br', null),
	            'Living off of the sweet nectar, they',
	            React.createElement('br', null),
	            'patiently wait for the beginning',
	            React.createElement('br', null),
	            'of the spring so the whole process',
	            React.createElement('br', null),
	            'can begin again!'
	        )
	    });
	};
	
	var _monarch_generations_screen_component = __webpack_require__(20);
	
	var _monarch_generations_screen_component2 = _interopRequireDefault(_monarch_generations_screen_component);

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
	            id: "flip"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: MEDIA.VO + "Flip.mp3"
	        }),
	        React.createElement(skoash.Image, {
	            className: "butterfly",
	            src: MEDIA.IMAGE + "monarch-side.png"
	        }),
	        React.createElement(skoash.Image, {
	            className: "flip animated",
	            src: MEDIA.BASE + "Flips/Monarch%20Flip/MON_Animated_Earned_Flip/MON.AnimatedEarnedFlip.gif"
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "copy-container" },
	            React.createElement(
	                "span",
	                { className: "copy" },
	                "Understanding these",
	                React.createElement("br", null),
	                "beautiful insects is",
	                React.createElement("br", null),
	                "the first step to",
	                React.createElement("br", null),
	                "making a difference.",
	                React.createElement("br", null),
	                "Here's your",
	                React.createElement(
	                    "span",
	                    { className: "flip" },
	                    "FLIP!"
	                )
	            )
	        )
	    );
	};

/***/ },
/* 30 */
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
	    id: 'quit',
	    assets: [React.createElement(skoash.Audio, {
	        type: 'voiceOver',
	        src: MEDIA.VO + 'Quit.mp3'
	    })]
	});

/***/ }
/******/ ]);
//# sourceMappingURL=ai.js.map