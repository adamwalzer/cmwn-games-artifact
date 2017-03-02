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
/******/ 	var hotCurrentHash = "4a28fd3928f9ebd5ba04"; // eslint-disable-line no-unused-vars
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
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _config = __webpack_require__(5);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _ = __webpack_require__(6);
	
	var _2 = _interopRequireDefault(_);
	
	var _3 = __webpack_require__(7);
	
	var _4 = _interopRequireDefault(_3);
	
	var _title_screen = __webpack_require__(8);
	
	var _title_screen2 = _interopRequireDefault(_title_screen);
	
	var _lets_clean_up_screen = __webpack_require__(9);
	
	var _lets_clean_up_screen2 = _interopRequireDefault(_lets_clean_up_screen);
	
	var _catch_game_level_one_screen = __webpack_require__(10);
	
	var _catch_game_level_one_screen2 = _interopRequireDefault(_catch_game_level_one_screen);
	
	var _catch_game_level_two_screen = __webpack_require__(19);
	
	var _catch_game_level_two_screen2 = _interopRequireDefault(_catch_game_level_two_screen);
	
	var _catch_game_level_three_screen = __webpack_require__(20);
	
	var _catch_game_level_three_screen2 = _interopRequireDefault(_catch_game_level_three_screen);
	
	var _clean_up_game_lvl1_screen = __webpack_require__(21);
	
	var _clean_up_game_lvl1_screen2 = _interopRequireDefault(_clean_up_game_lvl1_screen);
	
	var _clean_up_game_lvl2_screen = __webpack_require__(37);
	
	var _clean_up_game_lvl2_screen2 = _interopRequireDefault(_clean_up_game_lvl2_screen);
	
	var _clean_up_game_lvl3_screen = __webpack_require__(38);
	
	var _clean_up_game_lvl3_screen2 = _interopRequireDefault(_clean_up_game_lvl3_screen);
	
	var _room_screen = __webpack_require__(39);
	
	var _room_screen2 = _interopRequireDefault(_room_screen);
	
	var _school_screen = __webpack_require__(40);
	
	var _school_screen2 = _interopRequireDefault(_school_screen);
	
	var _ground_screen = __webpack_require__(41);
	
	var _ground_screen2 = _interopRequireDefault(_ground_screen);
	
	var _sing_about_it_screen = __webpack_require__(42);
	
	var _sing_about_it_screen2 = _interopRequireDefault(_sing_about_it_screen);
	
	var _video_screen = __webpack_require__(43);
	
	var _video_screen2 = _interopRequireDefault(_video_screen);
	
	var _good_for_you_screen = __webpack_require__(44);
	
	var _good_for_you_screen2 = _interopRequireDefault(_good_for_you_screen);
	
	var _take_pledge_screen = __webpack_require__(45);
	
	var _take_pledge_screen2 = _interopRequireDefault(_take_pledge_screen);
	
	var _commit_screen = __webpack_require__(46);
	
	var _commit_screen2 = _interopRequireDefault(_commit_screen);
	
	var _flip_screen = __webpack_require__(47);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _5 = __webpack_require__(48);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LitterBug = React.createElement(skoash.Game, {
	    config: _config2.default,
	    screens: [_4.default, _title_screen2.default, _lets_clean_up_screen2.default, _catch_game_level_one_screen2.default, _catch_game_level_two_screen2.default, _catch_game_level_three_screen2.default, _room_screen2.default, _school_screen2.default, _ground_screen2.default, _sing_about_it_screen2.default, _video_screen2.default, _good_for_you_screen2.default, _clean_up_game_lvl1_screen2.default, _clean_up_game_lvl2_screen2.default, _clean_up_game_lvl3_screen2.default, _take_pledge_screen2.default, _commit_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _6.default
	    },
	    loader: React.createElement(_2.default, null),
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'clean-up-game-lvl-1':
	            case 'clean-up-game-lvl-2':
	            case 'clean-up-game-lvl-3':
	                return 1;
	            default:
	                return 0;
	        }
	    },
	    assets: [React.createElement(skoash.Audio, { ref: 'bkg-1', type: 'background', src: CMWN.MEDIA.EFFECT + 's-bkg-1.mp3', loop: true }), React.createElement(skoash.Audio, {
	        ref: 'bkg-2',
	        type: 'background',
	        src: CMWN.MEDIA.EFFECT + 'game-theme-music-2.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-bu-1.mp3' }), React.createElement(skoash.Image, { ref: 'img-bkg-1', className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-1.png' }), React.createElement(skoash.Image, { ref: 'img-bkg-2', className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-2.png' }), React.createElement(skoash.Image, { ref: 'img-bkg-3', className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-3.png' }), React.createElement(skoash.Image, { ref: 'img-bkg-4', className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-4.jpg' }), React.createElement(skoash.Image, { ref: 'img-bkg-5', className: 'hidden', src: CMWN.MEDIA.IMAGE + 'bkg-5.png' }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: CMWN.MEDIA.IMAGE + 'bkg-3.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: CMWN.MEDIA.IMAGE + 'bkg-5.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: CMWN.MEDIA.SPRITE + 'sprites-game2-1-01.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: CMWN.MEDIA.SPRITE + 'sprites-game2-2-01.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: CMWN.MEDIA.SPRITE + 'sprites-game2-3-01-min.jpg'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: CMWN.MEDIA.SPRITE + 'sprites-game2-4-01.png'
	    }), React.createElement(skoash.Image, {
	        className: 'hidden',
	        src: CMWN.MEDIA.SPRITE + 'sprites-mr-eco-01.png'
	    }), React.createElement('div', { className: 'background default' }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background catch-game' }), React.createElement('div', { className: 'background lets-clean-up' }), React.createElement('div', { className: 'background clean-up-game' }), React.createElement('div', { className: 'background select' }), React.createElement('div', { className: 'background sun' }), React.createElement('div', { className: 'background commit' })],
	    passData: function passData(opts) {
	        this.setState(opts);
	    },
	    getClassNames: function getClassNames() {
	        return (0, _classnames2.default)({ 'SUN': this.state.sun });
	    }
	});
	
	skoash.start(LitterBug);
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"id": "litter-bug",
		"media_folder": "litterbug",
		"version": 2,
		"skoash": "1.1.3",
		"dimensions": {
			"width": 960,
			"height": 540
		}
	};

/***/ },
/* 6 */
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
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    return React.createElement(skoash.Screen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: "title",
	        hidePrev: true,
	        completeDelay: 5000
	    }));
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
	            id: "lets-clean-up"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: "media-sequence" },
	            React.createElement(skoash.Audio, {
	                ref: "vo-1",
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + "litter-is-trash.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                ref: "vo-2",
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + "paper-cans-bottles.mp3"
	            }),
	            React.createElement(skoash.Audio, {
	                ref: "vo-3",
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + "lets-clean-up.mp3"
	            })
	        ),
	        React.createElement(
	            "div",
	            { className: "copy animated" },
	            "Litter is trash",
	            React.createElement("br", null),
	            "Paper, cans, and bottles on the ground",
	            React.createElement("br", null),
	            "make a mess and can hurt wildlife",
	            React.createElement("br", null),
	            "and the environment."
	        ),
	        React.createElement(skoash.Image, {
	            ref: "image",
	            className: "banner animated",
	            src: CMWN.MEDIA.IMAGE + "lets-clean-up.png"
	        })
	    );
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _catch_game_screen_component2.default)(props, ref, key, {
	        id: 'catch-game-level-one',
	        level: 1,
	        rows: 3,
	        timeout: 120000,
	        prepTimeout: 1000,
	        openOnStart: 'instructions',
	        bin: [{
	            className: 'mushroom',
	            message: ''
	        }, {
	            className: 'banana',
	            message: 'trash'
	        }, {
	            className: 'paper',
	            message: 'trash'
	        }, {
	            className: 'dog',
	            message: ''
	        }, {
	            className: 'battery',
	            message: 'trash'
	        }, {
	            className: 'duck',
	            message: ''
	        }, {
	            className: 'squirrel',
	            message: ''
	        }, {
	            className: 'tire',
	            message: 'trash'
	        }, {
	            className: 'blue-flower',
	            message: ''
	        }, {
	            className: 'yellow-flower',
	            message: ''
	        }, {
	            className: 'red-flower',
	            message: ''
	        }, {
	            className: 'purple-flower',
	            message: ''
	        }, {
	            className: 'glass',
	            message: 'trash'
	        }, {
	            className: 'plastic',
	            message: 'trash'
	        }],
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'instructions',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'pick-up-litter.mp3',
	                completeTarget: 'instructions'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.EFFECT + 'level-up.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'congratulations.mp3'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'try-again',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.EFFECT + 'try-again.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.VO + 'try-again.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.VO + 'you-didnt-win.mp3'
	            })
	        )],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'sfx',
	            ref: 'miss',
	            src: CMWN.MEDIA.EFFECT + 'lose-points.mp3',
	            complete: true
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'instructions',
	                className: 'instructions',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'instructions' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    className: (0, _classnames2.default)({
	                        instructionsComplete: _.get(props, 'data.instructions.complete')
	                    }),
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                className: 'level-up',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'congratulations' }),
	                React.createElement('div', { className: 'level-up' })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                className: 'try-again',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'try-again' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _catch_game_screen_component = __webpack_require__(11);
	
	var _catch_game_screen_component2 = _interopRequireDefault(_catch_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (props, ref, key) {
	    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	    var onOpenReveal;
	    var onCloseReveal;
	    var onScoreComplete;
	    var onTimerComplete;
	    var onAddClassName;
	    var onTransitionEnd;
	    var onPlaySFX;
	    var onCorrectCatch;
	    var onIncorrectCatch;
	    var onMove;
	    var bin;
	
	    onOpenReveal = function onOpenReveal() {
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: true,
	                start: false
	            }
	        });
	    };
	
	    onCloseReveal = function onCloseReveal(prevMessage) {
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: false,
	                start: true
	            }
	        });
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                close: false
	            }
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
	
	        if (prevMessage === 'level-up') {
	            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	        }
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
	
	    onTransitionEnd = function onTransitionEnd(item) {
	        if (_.get(props, 'data.openReveal') || props.gameState.paused || item.props.message !== 'trash' || !item.state.canCatch) return;
	        this.updateGameState({
	            path: 'score',
	            data: {
	                litter: _.get(props, 'data.score.litter', 0) + 1
	            }
	        });
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: 'miss'
	            }
	        });
	    };
	
	    onPlaySFX = function onPlaySFX() {
	        this.updateGameState({
	            path: 'sfx',
	            data: {
	                playing: null
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
	
	    onMove = function onMove(e) {
	        var rect;
	        var styles;
	
	        if (e.target !== this.refs.catcher) return;
	
	        if (e.targetTouches && e.targetTouches[0]) {
	            rect = e.target.getBoundingClientRect();
	            e = e.targetTouches[0];
	            e.offsetY = e.pageY - rect.top;
	        }
	
	        styles = this.state.styles;
	
	        styles[0] = {
	            top: Math.min(e.offsetY, 360)
	        };
	
	        this.setState({
	            styles: styles
	        });
	    };
	
	    bin = [];
	    for (var i = 0; i < opts.bin.length; i++) {
	        for (var j = 0; j < opts.rows; j++) {
	            bin.push(React.createElement(_11.default, {
	                className: opts.bin[i].className,
	                message: opts.bin[i].message,
	                style: {
	                    top: 400 * (j + .4) / opts.rows
	                }
	            }));
	        }
	    }
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: opts.id
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.reveal.open'),
	            children: opts.vos
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.sfx.playing'),
	            children: opts.sfx,
	            onPlay: onPlaySFX
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'bottom' },
	            React.createElement(
	                'div',
	                { className: 'level' },
	                opts.level
	            ),
	            React.createElement(
	                skoash.Score,
	                {
	                    className: 'mr-eco-score',
	                    max: 100,
	                    increment: 10,
	                    correct: _.get(props, 'data.score.correct', 0),
	                    incorrect: _.get(props, 'data.score.incorrect', 0),
	                    onComplete: onScoreComplete
	                },
	                React.createElement('div', null)
	            ),
	            React.createElement(
	                skoash.Score,
	                {
	                    className: 'litter-bug-score',
	                    max: 100,
	                    increment: 10,
	                    correct: _.get(props, 'data.score.litter', 0),
	                    complete: _.get(props, 'data.game.complete', false),
	                    onComplete: onTimerComplete
	                },
	                React.createElement('div', null)
	            ),
	            React.createElement(skoash.Timer, {
	                countDown: true,
	                timeout: opts.timeout,
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
	            React.createElement(_7.default, {
	                leftBound: 70,
	                rightBound: 820,
	                on: _.get(props, 'data.game.start', false),
	                start: _.get(props, 'data.game.start', false),
	                stop: _.get(props, 'data.game.complete', false),
	                prepClasses: ['ready', 'go'],
	                prepTimeout: opts.prepTimeout,
	                onAddClassName: onAddClassName,
	                onTransitionEnd: onTransitionEnd,
	                bin: React.createElement(_5.default, {
	                    completeOnStart: true,
	                    checkComplete: false,
	                    bin: bin,
	                    remain: true
	                })
	            }),
	            React.createElement(_9.default, {
	                completeOnStart: true,
	                checkComplete: false,
	                start: _.get(props, 'data.game.start', false),
	                canCatch: _.get(props, 'data.game.start', false),
	                moveBuckets: true,
	                onMove: onMove,
	                bucket: [React.createElement(skoash.Component, { className: 'mr-eco', message: 'trash' })],
	                catchableRefs: _.get(props, 'data.dropper.refs', []),
	                onCorrect: onCorrectCatch,
	                onIncorrect: onIncorrectCatch,
	                assets: [React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    ref: 'correct',
	                    src: CMWN.MEDIA.EFFECT + 'win-points.mp3'
	                }), React.createElement(skoash.Audio, {
	                    type: 'sfx',
	                    ref: 'incorrect',
	                    src: CMWN.MEDIA.EFFECT + 'lose-points.mp3'
	                })]
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: opts.openOnStart,
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.openReveal', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            onOpen: onOpenReveal,
	            list: opts.revealList
	        })
	    );
	};
	
	var _2 = __webpack_require__(12);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(13);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(14);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(17);
	
	var _9 = _interopRequireDefault(_8);
	
	var _10 = __webpack_require__(16);
	
	var _11 = _interopRequireDefault(_10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(15);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(13);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(16);
	
	var _7 = _interopRequireDefault(_6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Dropper = function (_Draggable) {
	    _inherits(Dropper, _Draggable);
	
	    function Dropper() {
	        _classCallCheck(this, Dropper);
	
	        var _this = _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).call(this));
	
	        _this.state = _.defaults({
	            items: {},
	            classes: [],
	            itemCount: 0,
	            itemEndXs: {},
	            direction: ''
	        }, _this.state);
	
	        _this.next = _this.next.bind(_this);
	        return _this;
	    }
	
	    _createClass(Dropper, [{
	        key: 'next',
	        value: function next(on) {
	            var _this2 = this;
	
	            var items;
	            var index;
	            var classes;
	
	            if (!this.state.started || !this.props.on && !on || this.props.gameState.paused) return;
	
	            index = this.state.itemCount;
	            items = this.state.items;
	
	            items[index] = this.refs.bin.get(1)[0];
	            if (typeof this.props.getClassNames === 'function') classes = this.props.getClassNames.call(this);
	
	            this.setState({
	                items: items,
	                classes: classes,
	                itemCount: index + 1
	            }, function () {
	                var timeoutFunction = function timeoutFunction(i) {
	                    var itemRef;
	                    var itemDOM;
	                    var itemEndXs;
	                    var onTransitionEnd;
	                    itemRef = _this2.refs['items-' + index];
	                    if (itemRef) {
	                        itemRef.addClassName(_this2.props.prepClasses[i]);
	                        _this2.props.onAddClassName.call(_this2, _this2.props.prepClasses[i]);
	                        if (i === _this2.props.prepClasses.length - 1) {
	                            itemEndXs = _this2.state.itemEndXs;
	                            itemEndXs[index] = _this2.state.endX;
	                            onTransitionEnd = function onTransitionEnd() {
	                                items = _this2.state.items;
	                                _this2.props.onTransitionEnd.call(_this2, itemRef);
	                                delete items[index];
	                                _this2.setState({
	                                    items: items,
	                                    itemEndXs: itemEndXs
	                                });
	                            };
	                            itemDOM = ReactDOM.findDOMNode(itemRef);
	                            itemDOM.addEventListener('transitionend', onTransitionEnd);
	                            itemDOM.addEventListener('animationend', onTransitionEnd);
	                        }
	                    }
	
	                    if (i === _this2.props.prepClasses.length) _this2.next();
	                };
	
	                var _loop = function _loop(i) {
	                    setTimeout(function () {
	                        timeoutFunction(i);
	                    }, i * _this2.props.prepTimeout);
	                };
	
	                for (var i = 0; i <= _this2.props.prepClasses.length; i++) {
	                    _loop(i);
	                }
	
	                _this2.updateGameState({
	                    path: _this2.props.refsTarget,
	                    data: {
	                        refs: _.filter(_this2.refs, function (v, k) {
	                            return !k.indexOf('items-');
	                        })
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'moveEvent',
	        value: function moveEvent(e) {
	            var endX;
	
	            if (e.targetTouches && e.targetTouches[0]) {
	                e.pageX = e.targetTouches[0].pageX;
	            }
	
	            endX = Math.min(Math.max(e.pageX - this.state.grabX, this.props.leftBound), this.props.rightBound);
	
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
	        value: function getItemStyle(key, style) {
	            var endX;
	            var x;
	
	            endX = this.state.itemEndXs[key] || this.state.endX;
	            x = (endX - this.state.startX) / this.state.zoom;
	
	            return _.defaults({
	                transform: 'translateX(' + x + 'px)',
	                WebkitTransform: 'translateX(' + x + 'px)'
	            }, style);
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
	            var _this3 = this;
	
	            return _.map(this.state.items, function (item, key) {
	                var ref = 'items-' + key;
	                if (!item) return null;
	                return React.createElement(item.type, _extends({}, item.props, {
	                    style: _this3.getItemStyle(key, item.props.style),
	                    className: item.props.className + ' ' + _this3.state.classes[key],
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
	}(_3.default);
	
	Dropper.defaultProps = _.defaults({
	    prepClasses: ['ready', 'set', 'go'],
	    prepTimeout: 1000,
	    bin: React.createElement(_5.default, {
	        bin: [React.createElement(_7.default, null)]
	    }),
	    onStart: function onStart() {
	        this.next();
	    },
	    onResume: function onResume() {
	        this.next();
	    },
	    leftBound: 0,
	    rightBound: 800,
	    refsTarget: 'dropper',
	    on: true,
	    onTransitionEnd: _.noop
	}, _3.default.defaultProps);
	
	exports.default = Dropper;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Draggable = function (_skoash$Component) {
	    _inherits(Draggable, _skoash$Component);
	
	    function Draggable() {
	        _classCallCheck(this, Draggable);
	
	        var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));
	
	        _this.state = {
	            startX: 0,
	            startY: 0,
	            endX: 0,
	            endY: 0,
	            zoom: 1
	        };
	
	        _this.mouseDown = _this.mouseDown.bind(_this);
	        _this.mouseUp = _this.mouseUp.bind(_this);
	
	        _this.moveEvent = _this.moveEvent.bind(_this);
	
	        _this.touchStart = _this.touchStart.bind(_this);
	        _this.touchEnd = _this.touchEnd.bind(_this);
	        return _this;
	    }
	
	    _createClass(Draggable, [{
	        key: 'shouldDrag',
	        value: function shouldDrag() {
	            return true;
	        }
	    }, {
	        key: 'incomplete',
	        value: function incomplete() {
	            this.markIncorrect();
	            this.returnToStart();
	
	            _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'incomplete', this).call(this);
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
	        }
	    }, {
	        key: 'startEvent',
	        value: function startEvent(e, cb) {
	            var pageX;
	            var pageY;
	            var rect;
	            var startX;
	            var startY;
	            var endX;
	            var endY;
	            var grabX;
	            var grabY;
	
	            if (e.target !== this.refs.el) return;
	            if (!this.shouldDrag()) return;
	
	            if (e.targetTouches && e.targetTouches[0]) {
	                pageX = e.targetTouches[0].pageX;
	                pageY = e.targetTouches[0].pageY;
	                rect = e.target.getBoundingClientRect();
	                e = e.targetTouches[0];
	                e.offsetX = pageX - rect.left;
	                e.offsetY = pageY - rect.top;
	            }
	
	            grabX = e.offsetX;
	            grabY = e.offsetY;
	
	            startX = endX = e.pageX - grabX;
	            startY = endY = e.pageY - grabY;
	
	            if (!this.state.firstX) {
	                this.setState({
	                    firstX: startX,
	                    firstY: startY
	                });
	            }
	
	            if (!this.props.return) {
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
	
	            if (typeof this.props.dragRespond === 'function') {
	                this.props.dragRespond(this.props.message);
	            }
	
	            if (typeof cb === 'function') {
	                cb.call(this);
	            }
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
	            if (e.targetTouches && e.targetTouches[0]) {
	                e.pageX = e.targetTouches[0].pageX;
	                e.pageY = e.targetTouches[0].pageY;
	            }
	
	            this.setState({
	                endX: e.pageX - this.state.grabX,
	                endY: e.pageY - this.state.grabY
	            });
	        }
	    }, {
	        key: 'returnToStart',
	        value: function returnToStart() {
	            if (this.state.firstX) {
	                this.setState({
	                    dragging: false,
	                    return: true,
	                    endX: this.state.firstX,
	                    endY: this.state.firstY
	                });
	            }
	        }
	    }, {
	        key: 'endEvent',
	        value: function endEvent(cb) {
	            this.dropRespond();
	
	            if (this.props.return) {
	                this.returnToStart();
	            } else {
	                this.setState({
	                    dragging: false,
	                    return: this.state.return
	                });
	            }
	
	            if (typeof cb === 'function') {
	                cb.call(this);
	            }
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
	        key: 'dropRespond',
	        value: function dropRespond() {
	            var corners;
	
	            corners = this.setCorners();
	
	            if (typeof this.props.dropRespond === 'function') {
	                this.props.dropRespond(this.props.message, corners);
	            }
	        }
	    }, {
	        key: 'setCorners',
	        value: function setCorners() {
	            var top;
	            var left;
	            var width;
	            var height;
	            var el;
	            var corners = [];
	
	            left = 0;
	            top = 0;
	            el = this.refs.el;
	            width = el.offsetWidth;
	            height = el.offsetHeight;
	
	            while (el) {
	                if (el.className.indexOf('screen') !== -1) {
	                    break;
	                }
	
	                left += el.offsetLeft || 0;
	                top += el.offsetTop || 0;
	                el = el.offsetParent;
	            }
	
	            left += (this.state.endX - this.state.startX) / this.state.zoom;
	            top += (this.state.endY - this.state.startY) / this.state.zoom;
	
	            for (var i = 0; i < 4; i++) {
	                corners.push({
	                    x: left + width * (i === 1 || i === 2 ? 1 : 0),
	                    y: top + height * (i > 1 ? 1 : 0)
	                });
	            }
	
	            this.setState({
	                corners: corners
	            });
	
	            return corners;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.bootstrap();
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'bootstrap', this).call(this);
	
	            this.setZoom();
	
	            this.refs.el.addEventListener('mousedown', this.mouseDown);
	            this.refs.el.addEventListener('touchstart', this.touchStart);
	
	            window.addEventListener('resize', this.setZoom.bind(this));
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
	            var x;
	            var y;
	
	            x = (this.state.endX - this.state.startX) / this.state.zoom;
	            y = (this.state.endY - this.state.startY) / this.state.zoom;
	
	            return {
	                transform: 'translateX(' + x + 'px) translateY(' + y + 'px)',
	                WebkitTransform: 'translateX(' + x + 'px) translateY(' + y + 'px)'
	            };
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            var _classNames;
	
	            return (0, _classnames2.default)((_classNames = {
	                draggable: true
	            }, _defineProperty(_classNames, this.props.className, this.props.className), _defineProperty(_classNames, this.props.message, this.props.message), _defineProperty(_classNames, 'DRAGGING', this.state.dragging), _defineProperty(_classNames, 'RETURN', this.state.return), _defineProperty(_classNames, 'CORRECT', this.state.correct), _classNames), _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                {
	                    ref: 'el',
	                    className: this.getClassNames(),
	                    style: this.getStyle()
	                },
	                this.renderContentList()
	            );
	        }
	    }]);
	
	    return Draggable;
	}(skoash.Component);
	
	exports.default = Draggable;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(18);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Catcher = function (_Catch) {
	    _inherits(Catcher, _Catch);
	
	    function Catcher(props) {
	        _classCallCheck(this, Catcher);
	
	        var _this = _possibleConstructorReturn(this, (Catcher.__proto__ || Object.getPrototypeOf(Catcher)).call(this, props));
	
	        _this.state = _.defaults({
	            styles: []
	        }, _this.state);
	
	        _this.moveEvent = _this.moveEvent.bind(_this);
	        return _this;
	    }
	
	    _createClass(Catcher, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            skoash.Component.prototype.bootstrap.call(this);
	            window.addEventListener('resize', this.onResize);
	            this.onResize();
	
	            if (this.props.moveBuckets) {
	                window.addEventListener('mousemove', this.moveEvent);
	                window.addEventListener('touchmove', this.moveEvent);
	            }
	        }
	    }, {
	        key: 'moveEvent',
	        value: function moveEvent(e) {
	            this.props.onMove.call(this, e);
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
	        key: 'isColliding',
	        value: function isColliding(bucketRect, catchRect) {
	            var bucketCorners = [];
	            var catchableCorners = [];
	
	            for (var i = 0; i < 4; i++) {
	                bucketCorners.push({
	                    x: bucketRect.left + bucketRect.width * (i === 1 || i === 2 ? 1 : 0),
	                    y: bucketRect.top + bucketRect.height * (i > 1 ? 1 : 0)
	                });
	            }
	
	            for (var _i = 0; _i < 4; _i++) {
	                catchableCorners.push({
	                    x: catchRect.left + catchRect.width * (_i === 1 || _i === 2 ? 1 : 0),
	                    y: catchRect.top + catchRect.height * (_i > 1 ? 1 : 0)
	                });
	            }
	
	            return skoash.util.doIntersect(bucketCorners, catchableCorners);
	        }
	    }, {
	        key: 'selectCatchable',
	        value: function selectCatchable(bucketRef, catchableRef) {
	            if (!this.state.started || this.state.paused || !this.state.canCatch || !this.props.canCatch || !catchableRef.canCatch()) return;
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
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('catcher', _get(Catcher.prototype.__proto__ || Object.getPrototypeOf(Catcher.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'renderBucket',
	        value: function renderBucket() {
	            var _this4 = this;
	
	            return _.map([].concat(this.props.bucket), function (bucket, key) {
	                return React.createElement(bucket.type, _extends({}, bucket.props, {
	                    ref: 'buckets-' + key,
	                    style: _this4.state.styles[key],
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { ref: 'catcher', className: this.getClassNames() },
	                this.renderContentList('assets'),
	                this.renderBucket()
	            );
	        }
	    }]);
	
	    return Catcher;
	}(_3.default);
	
	Catcher.defaultProps = _.defaults({
	    moveBuckets: false,
	    onMove: _.noop,
	    canCatch: true
	}, skoash.Component.defaultProps);
	
	exports.default = Catcher;

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
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(16);
	
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _catch_game_screen_component2.default)(props, ref, key, {
	        id: 'catch-game-level-two',
	        level: 2,
	        rows: 4,
	        timeout: 120000,
	        prepTimeout: 500,
	        bin: [{
	            className: 'mushroom',
	            message: ''
	        }, {
	            className: 'banana',
	            message: 'trash'
	        }, {
	            className: 'paper',
	            message: 'trash'
	        }, {
	            className: 'dog',
	            message: ''
	        }, {
	            className: 'battery',
	            message: 'trash'
	        }, {
	            className: 'duck',
	            message: ''
	        }, {
	            className: 'squirrel',
	            message: ''
	        }, {
	            className: 'tire',
	            message: 'trash'
	        }, {
	            className: 'blue-flower',
	            message: ''
	        }, {
	            className: 'yellow-flower',
	            message: ''
	        }, {
	            className: 'red-flower',
	            message: ''
	        }, {
	            className: 'purple-flower',
	            message: ''
	        }, {
	            className: 'glass',
	            message: 'trash'
	        }, {
	            className: 'plastic',
	            message: 'trash'
	        }],
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.EFFECT + 'level-up.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'congratulations.mp3'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'try-again',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.EFFECT + 'try-again.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.VO + 'try-again.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.VO + 'you-didnt-win.mp3'
	            })
	        )],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'sfx',
	            ref: 'miss',
	            src: CMWN.MEDIA.EFFECT + 'lose-points.mp3',
	            complete: true
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                className: 'level-up',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'congratulations' }),
	                React.createElement('div', { className: 'level-up' })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                className: 'try-again',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'try-again' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};
	
	var _catch_game_screen_component = __webpack_require__(11);
	
	var _catch_game_screen_component2 = _interopRequireDefault(_catch_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _catch_game_screen_component2.default)(props, ref, key, {
	        id: 'catch-game-level-three',
	        level: 3,
	        rows: 5,
	        timeout: 120000,
	        prepTimeout: 400,
	        bin: [{
	            className: 'mushroom',
	            message: ''
	        }, {
	            className: 'banana',
	            message: 'trash'
	        }, {
	            className: 'paper',
	            message: 'trash'
	        }, {
	            className: 'dog',
	            message: ''
	        }, {
	            className: 'battery',
	            message: 'trash'
	        }, {
	            className: 'duck',
	            message: ''
	        }, {
	            className: 'squirrel',
	            message: ''
	        }, {
	            className: 'tire',
	            message: 'trash'
	        }, {
	            className: 'blue-flower',
	            message: ''
	        }, {
	            className: 'yellow-flower',
	            message: ''
	        }, {
	            className: 'red-flower',
	            message: ''
	        }, {
	            className: 'purple-flower',
	            message: ''
	        }, {
	            className: 'glass',
	            message: 'trash'
	        }, {
	            className: 'plastic',
	            message: 'trash'
	        }],
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'level-up',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.EFFECT + 'win-the-game-1.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'youve-won.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'youve-picked-up.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'sfx',
	                playTarget: 'fall',
	                src: CMWN.MEDIA.EFFECT + 'litterbugfall.mp3'
	            })
	        ), React.createElement(
	            skoash.MediaSequence,
	            {
	                ref: 'try-again',
	                silentOnStart: true
	            },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.EFFECT + 'try-again.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.VO + 'try-again.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                complete: true,
	                src: CMWN.MEDIA.VO + 'you-didnt-win.mp3'
	            })
	        )],
	        sfx: [React.createElement(skoash.Audio, {
	            type: 'sfx',
	            ref: 'miss',
	            src: CMWN.MEDIA.EFFECT + 'lose-points.mp3',
	            complete: true
	        })],
	        revealList: [React.createElement(
	            skoash.Component,
	            {
	                ref: 'level-up',
	                className: (0, _classnames2.default)('level-up', 'youve-won', {
	                    fall: _.get(props, 'data.fall.playing')
	                }),
	                type: 'li'
	            },
	            React.createElement(skoash.Image, {
	                className: 'hidden',
	                src: CMWN.MEDIA.IMAGE + 'litterbug.png'
	            }),
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'congratulations' }),
	                React.createElement('div', { className: 'level-up' })
	            )
	        ), React.createElement(
	            skoash.Component,
	            {
	                ref: 'try-again',
	                className: 'try-again',
	                type: 'li'
	            },
	            React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'try-again' }),
	                React.createElement('div', { className: 'words' }),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'reveal',
	                            data: {
	                                close: true
	                            }
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _catch_game_screen_component = __webpack_require__(11);
	
	var _catch_game_screen_component2 = _interopRequireDefault(_catch_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 21 */
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
	            id: 'clean-up-game-lvl-1'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: 'instructions' },
	            React.createElement(skoash.Audio, {
	                ref: 'vo-1',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-2',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'toss-litter.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-3',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'get-100.mp3',
	                completeTarget: 'instructions'
	            })
	        ),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.reveal.play', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: null
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: null
	                        }
	                    });
	                }
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'complete', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-1',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'level1.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-2',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'wow.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-3',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'you-have-great.mp3'
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'try-again', silentOnStart: true, complete: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-4',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'level-lost.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-5',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'oh-no.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-6',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'park-still.mp3',
	                    complete: true
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'throw', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-7',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.EFFECT + 'fast-swish.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-8',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.EFFECT + 'win-points.mp3'
	                })
	            )
	        ),
	        React.createElement(_5.default, {
	            ref: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            className: (0, _classnames2.default)({
	                instructionsComplete: _.get(props, 'data.instructions.complete')
	            }),
	            onOpen: function onOpen() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: true,
	                        start: false
	                    }
	                });
	            },
	            onClose: function onClose() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: false,
	                        start: true
	                    }
	                });
	            },
	            list: [React.createElement(
	                skoash.Component,
	                { 'data-ref': 'instructions' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame instructions-lvl-1' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Toss the litter in the cans to',
	                        React.createElement('br', null),
	                        'clean up by clicking, aiming,',
	                        React.createElement('br', null),
	                        'and letting go!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Get'
	                    ),
	                    React.createElement('div', { className: 'hundred' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'points before the time'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'runs out to win!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'complete' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame complete-lvl-1' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'You have some great cleaning skills!',
	                        React.createElement('br', null),
	                        'Keep up the good work!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'try-again' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is still covered with trash',
	                        React.createElement('br', null),
	                        'but you still have a chance to clean',
	                        React.createElement('br', null),
	                        'and beat the Litterbug!'
	                    )
	                )
	            )]
	        }),
	        React.createElement(_7.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 5,
	            targetIndex: 2,
	            selected: _.get(props, 'data.cannon.fire'),
	            onSelect: function onSelect(target) {
	                var score = _.get(props, 'data.score.points', 0);
	                var classes = this.state.classes;
	                classes[target.props['data-key']] = 'SELECTED';
	
	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });
	
	                if (score < CONFIG.POINTS) score += target.props.value;
	
	                this.updateGameState({
	                    path: 'score',
	                    data: {
	                        points: score
	                    }
	                });
	
	                if (score >= CONFIG.POINTS & !_.get(props, 'data.game.complete')) {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'complete'
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: 'complete'
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            complete: true
	                        }
	                    });
	                }
	            },
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'five', name: 'five', value: 5, complete: true }), React.createElement(skoash.Component, { className: 'ten', name: 'ten', value: 10, complete: true }), React.createElement(skoash.Component, { className: 'twenty', name: 'twenty', value: 20, complete: true }), React.createElement(skoash.Component, { className: 'thirty', name: 'thirty', value: 30, complete: true })]
	            })
	        }),
	        React.createElement(_9.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            showNum: 4,
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'plastic-bottle', complete: true }), React.createElement(skoash.Component, { className: 'soda-can', complete: true }), React.createElement(skoash.Component, { className: 'banana-peal', complete: true }), React.createElement(skoash.Component, { className: 'glass-bottle', complete: true }), React.createElement(skoash.Component, { className: 'crumbled-paper', complete: true }), React.createElement(skoash.Component, { className: 'tuna-can', complete: true }), React.createElement(skoash.Component, { className: 'tire', complete: true }), React.createElement(skoash.Component, { className: 'battery', complete: true })]
	            }),
	            onFire: function onFire() {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        play: 'throw'
	                    }
	                });
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: false
	                    }
	                });
	            },
	            onReload: function onReload() {
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: true
	                    }
	                });
	            }
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'grass' },
	            React.createElement(
	                skoash.Component,
	                { className: 'stats' },
	                React.createElement(
	                    'span',
	                    { className: 'level' },
	                    CONFIG.LVL
	                ),
	                React.createElement(_13.default, {
	                    ref: 'timer',
	                    countDown: true,
	                    timeout: CONFIG.TIMER,
	                    stop: _.get(props, 'data.game.complete', false),
	                    complete: _.get(props, 'data.game.complete', false),
	                    checkComplete: _.get(props, 'data.game.start', false),
	                    restart: _.get(props, 'data.game.start', false),
	                    onComplete: function onComplete() {
	                        if (_.get(props, 'data.reveal.open')) return;
	                        if (_.get(props, 'data.score.points', 0) < CONFIG.POINTS) {
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    open: 'try-again'
	                                }
	                            });
	
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    play: 'try-again'
	                                }
	                            });
	
	                            this.updateGameState({
	                                path: 'score',
	                                data: {
	                                    points: 0
	                                }
	                            });
	                        }
	                    }
	                }),
	                React.createElement(_15.default, {
	                    ref: 'score',
	                    max: CONFIG.POINTS,
	                    correct: _.get(props, 'data.score.points', 0),
	                    checkComplete: false,
	                    complete: _.get(props, 'data.score.points', 0) === CONFIG.POINTS
	                })
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(12);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(22);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(23);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(34);
	
	var _9 = _interopRequireDefault(_8);
	
	var _10 = __webpack_require__(13);
	
	var _11 = _interopRequireDefault(_10);
	
	var _12 = __webpack_require__(35);
	
	var _13 = _interopRequireDefault(_12);
	
	var _14 = __webpack_require__(36);
	
	var _15 = _interopRequireDefault(_14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CONFIG = {
	    LVL: 1,
	    POINTS: 100,
	    TIMER: 30000
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
	
	var _classnames = __webpack_require__(4);
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _shortid = __webpack_require__(24);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _2 = __webpack_require__(33);
	
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(25);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(26);
	var encode = __webpack_require__(28);
	var decode = __webpack_require__(30);
	var isValid = __webpack_require__(31);
	
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
	var clusterWorkerId = __webpack_require__(32) || 0;
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(27);
	
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(29);
	
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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(26);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(26);
	
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
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Cannon = function (_skoash$Component) {
	    _inherits(Cannon, _skoash$Component);
	
	    function Cannon() {
	        _classCallCheck(this, Cannon);
	
	        var _this = _possibleConstructorReturn(this, (Cannon.__proto__ || Object.getPrototypeOf(Cannon)).call(this));
	
	        _this.state = {
	            classes: {}
	        };
	
	        _this.fire = _this.fire.bind(_this);
	        _this.reload = _this.reload.bind(_this);
	        return _this;
	    }
	
	    _createClass(Cannon, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var list;
	
	            _get(Cannon.prototype.__proto__ || Object.getPrototypeOf(Cannon.prototype), 'bootstrap', this).call(this);
	
	            list = this.refs.bin ? this.refs.bin.get(this.props.showNum + 1) : this.props.list;
	
	            this.setState({
	                list: list
	            });
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            _get(Cannon.prototype.__proto__ || Object.getPrototypeOf(Cannon.prototype), 'start', this).call(this);
	            this.next();
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var classes;
	            var list;
	            classes = this.state.classes;
	            list = this.state.list;
	            if (this.props.reverseReload) {
	                list = this.refs.bin.get(1).concat(list);
	                list.pop();
	            } else {
	                list = list.concat(this.refs.bin.get(1));
	                list.shift();
	            }
	            classes[this.state.list.length - 1] = 'LOADED';
	            this.enabled = true;
	
	            this.setState({
	                classes: classes,
	                list: list
	            });
	        }
	    }, {
	        key: 'fire',
	        value: function fire() {
	            var _this2 = this;
	
	            var list = this.state.list || this.props.list || {};
	
	            this.setState({
	                fire: true,
	                reload: false
	            }, function () {
	                setTimeout(function () {
	                    _this2.reload();
	                    _this2.next();
	                }, _this2.props.reloadTime);
	            });
	
	            setTimeout(function () {
	                _this2.updateGameState({
	                    path: _this2.props.dataTarget,
	                    data: {
	                        play: 'fire',
	                        fired: list[_this2.state.list.length - 1]
	                    }
	                });
	            }, this.props.dataDelay);
	
	            this.props.onFire.call(this);
	        }
	    }, {
	        key: 'reload',
	        value: function reload() {
	            this.setState({
	                fire: false,
	                reload: true
	            });
	
	            this.updateGameState({
	                path: this.props.dataTarget,
	                data: {
	                    play: null,
	                    fired: null
	                }
	            });
	
	            this.props.onReload.call(this);
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('cannon', {
	                FIRE: this.state.fire,
	                RELOAD: this.state.reload
	            }, _get(Cannon.prototype.__proto__ || Object.getPrototypeOf(Cannon.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(key, li) {
	            return (0, _classnames2.default)('ammo', li.props.className, this.state.classes[key]);
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
	        key: 'renderAmmo',
	        value: function renderAmmo() {
	            var _this3 = this;
	
	            var list = this.state.list || this.props.list;
	            return list.map(function (li, key) {
	                var ref;
	                ref = li.ref || li.props['data-ref'] || key;
	                return React.createElement(li.type, _extends({}, li.props, {
	                    ref: ref,
	                    'data-ref': ref,
	                    key: key,
	                    className: _this3.getClass(key, li)
	                }));
	            });
	        }
	    }, {
	        key: 'renderLaunchButton',
	        value: function renderLaunchButton() {
	            if (!this.props.launchButton) return;
	
	            return React.createElement('div', { className: 'launch-button', onClick: this.fire });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                this.renderBin(),
	                React.createElement('div', { className: 'ammo-container' }),
	                this.renderAmmo(),
	                this.renderLaunchButton()
	            );
	        }
	    }]);
	
	    return Cannon;
	}(skoash.Component);
	
	Cannon.defaultProps = _.defaults({
	    showNum: 3,
	    reverseReload: false,
	    list: [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)],
	    dataTarget: 'game',
	    dataDelay: 0,
	    onReload: _.noop,
	    onFire: _.noop
	}, skoash.Component.defaultProps);
	
	exports.default = Cannon;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(4);
	
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
/* 37 */
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
	            id: 'clean-up-game-lvl-2'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: 'instructions' },
	            React.createElement(skoash.Audio, {
	                ref: 'vo-1',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-2',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'toss-litter.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-3',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'get-150.mp3',
	                completeTarget: 'instructions'
	            })
	        ),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.reveal.play', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: null
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: null
	                        }
	                    });
	                }
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'complete', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-4',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'level2.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-5',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'amazing-job.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-6',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'thank-you-caring.mp3'
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'try-again', silentOnStart: true, complete: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-7',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'level-lost.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-8',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'oh-no.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-9',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'park-still.mp3',
	                    complete: true
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'throw', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-10',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.EFFECT + 'fast-swish.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-11',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.EFFECT + 'win-points.mp3'
	                })
	            )
	        ),
	        React.createElement(_5.default, {
	            ref: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            className: (0, _classnames2.default)({
	                instructionsComplete: _.get(props, 'data.instructions.complete')
	            }),
	            onOpen: function onOpen() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: true,
	                        start: false
	                    }
	                });
	            },
	            onClose: function onClose() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: false,
	                        start: true
	                    }
	                });
	            },
	            list: [React.createElement(
	                skoash.Component,
	                { 'data-ref': 'instructions' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame instructions-lvl-2' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Toss the litter in the cans to',
	                        React.createElement('br', null),
	                        'clean up by clicking, aiming,',
	                        React.createElement('br', null),
	                        'and letting go!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Get'
	                    ),
	                    React.createElement('div', { className: 'hundred' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'points before the time'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'runs out to win!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'complete' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame complete-lvl-2' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Thank you for caring so much',
	                        React.createElement('br', null),
	                        'about the environment!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'try-again' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is still covered with trash',
	                        React.createElement('br', null),
	                        'but you still have a chance to clean',
	                        React.createElement('br', null),
	                        'and beat the Litterbug!'
	                    )
	                )
	            )]
	        }),
	        React.createElement(_7.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 5,
	            targetIndex: 2,
	            selected: _.get(props, 'data.cannon.fire'),
	            onSelect: function onSelect(target) {
	                var score = _.get(props, 'data.score.points', 0);
	                var classes = this.state.classes;
	                classes[target.props['data-key']] = 'SELECTED';
	
	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });
	
	                if (score < CONFIG.POINTS) score += target.props.value;
	
	                this.updateGameState({
	                    path: 'score',
	                    data: {
	                        points: score
	                    }
	                });
	
	                if (score >= CONFIG.POINTS & !_.get(props, 'data.game.complete')) {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'complete'
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: 'complete'
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            complete: true
	                        }
	                    });
	                }
	            },
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'five', name: 'five', value: 5, complete: true }), React.createElement(skoash.Component, { className: 'ten', name: 'ten', value: 10, complete: true }), React.createElement(skoash.Component, { className: 'twenty', name: 'twenty', value: 20, complete: true }), React.createElement(skoash.Component, { className: 'thirty', name: 'thirty', value: 30, complete: true })]
	            })
	        }),
	        React.createElement(_9.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            showNum: 4,
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'plastic-bottle', complete: true }), React.createElement(skoash.Component, { className: 'soda-can', complete: true }), React.createElement(skoash.Component, { className: 'banana-peal', complete: true }), React.createElement(skoash.Component, { className: 'glass-bottle', complete: true }), React.createElement(skoash.Component, { className: 'crumbled-paper', complete: true }), React.createElement(skoash.Component, { className: 'tuna-can', complete: true }), React.createElement(skoash.Component, { className: 'tire', complete: true }), React.createElement(skoash.Component, { className: 'battery', complete: true })]
	            }),
	            onFire: function onFire() {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        play: 'throw'
	                    }
	                });
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: false
	                    }
	                });
	            },
	            onReload: function onReload() {
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: true
	                    }
	                });
	            }
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'grass' },
	            React.createElement(
	                skoash.Component,
	                { className: 'stats' },
	                React.createElement(
	                    'span',
	                    { className: 'level' },
	                    CONFIG.LVL
	                ),
	                React.createElement(_13.default, {
	                    ref: 'timer',
	                    countDown: true,
	                    timeout: CONFIG.TIMER,
	                    stop: _.get(props, 'data.game.complete', false),
	                    complete: _.get(props, 'data.game.complete', false),
	                    checkComplete: _.get(props, 'data.game.start', false),
	                    restart: _.get(props, 'data.game.start', false),
	                    onComplete: function onComplete() {
	                        if (_.get(props, 'data.reveal.open')) return;
	                        if (_.get(props, 'data.score.points', 0) < CONFIG.POINTS) {
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    open: 'try-again'
	                                }
	                            });
	
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    play: 'try-again'
	                                }
	                            });
	
	                            this.updateGameState({
	                                path: 'score',
	                                data: {
	                                    points: 0
	                                }
	                            });
	                        }
	                    }
	                }),
	                React.createElement(_15.default, {
	                    ref: 'score',
	                    max: CONFIG.POINTS,
	                    correct: _.get(props, 'data.score.points', 0),
	                    checkComplete: false,
	                    complete: _.get(props, 'data.score.points', 0) === CONFIG.POINTS
	                })
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(12);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(22);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(23);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(34);
	
	var _9 = _interopRequireDefault(_8);
	
	var _10 = __webpack_require__(13);
	
	var _11 = _interopRequireDefault(_10);
	
	var _12 = __webpack_require__(35);
	
	var _13 = _interopRequireDefault(_12);
	
	var _14 = __webpack_require__(36);
	
	var _15 = _interopRequireDefault(_14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CONFIG = {
	    LVL: 2,
	    POINTS: 150,
	    TIMER: 45000
	};

/***/ },
/* 38 */
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
	            id: 'clean-up-game-lvl-3'
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            { ref: 'instructions' },
	            React.createElement(skoash.Audio, {
	                ref: 'vo-1',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'instructions.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-2',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'toss-litter.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'vo-3',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'get-200.mp3',
	                completeTarget: 'instructions'
	            })
	        ),
	        React.createElement(
	            _3.default,
	            {
	                play: _.get(props, 'data.reveal.play', null),
	                onPlay: function onPlay() {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: null
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: null
	                        }
	                    });
	                }
	            },
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'complete', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-4',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'level3.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-5',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'park-clean.mp3'
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'try-again', silentOnStart: true, complete: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-6',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'level-lost.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-7',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'oh-no.mp3',
	                    complete: true
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-8',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'park-still.mp3',
	                    complete: true
	                })
	            ),
	            React.createElement(
	                skoash.MediaSequence,
	                { ref: 'throw', silentOnStart: true },
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-9',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.EFFECT + 'fast-swish.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    ref: 'vo-10',
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.EFFECT + 'win-points.mp3'
	                })
	            )
	        ),
	        React.createElement(_5.default, {
	            ref: 'reveal',
	            openOnStart: 'instructions',
	            openReveal: _.get(props, 'data.reveal.open', null),
	            className: (0, _classnames2.default)({
	                instructionsComplete: _.get(props, 'data.instructions.complete')
	            }),
	            onOpen: function onOpen() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: true,
	                        start: false
	                    }
	                });
	            },
	            onClose: function onClose() {
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        stop: false,
	                        start: true
	                    }
	                });
	            },
	            list: [React.createElement(
	                skoash.Component,
	                { 'data-ref': 'instructions' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame instructions-lvl-3' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Toss the litter in the cans to',
	                        React.createElement('br', null),
	                        'clean up by clicking, aiming,',
	                        React.createElement('br', null),
	                        'and letting go!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'Get'
	                    ),
	                    React.createElement('div', { className: 'hundred' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'points before the time'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'runs out to win!'
	                    )
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'complete' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame complete-lvl-3' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is now clean',
	                        React.createElement('br', null),
	                        'You are an'
	                    ),
	                    React.createElement('div', { className: 'banner-2' })
	                )
	            ), React.createElement(
	                skoash.Component,
	                { 'data-ref': 'try-again' },
	                React.createElement(
	                    skoash.Component,
	                    { className: 'frame' },
	                    React.createElement('div', { className: 'banner' }),
	                    React.createElement('div', { className: 'banner-2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        'The park is still covered with trash',
	                        React.createElement('br', null),
	                        'but you still have a chance to clean',
	                        React.createElement('br', null),
	                        'and beat the Litterbug!'
	                    )
	                )
	            )]
	        }),
	        React.createElement(_7.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 5,
	            targetIndex: 2,
	            selected: _.get(props, 'data.cannon.fire'),
	            onSelect: function onSelect(target) {
	                var score = _.get(props, 'data.score.points', 0);
	                var classes = this.state.classes;
	                classes[target.props['data-key']] = 'SELECTED';
	
	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });
	
	                if (score < CONFIG.POINTS) score += target.props.value;
	
	                this.updateGameState({
	                    path: 'score',
	                    data: {
	                        points: score
	                    }
	                });
	
	                if (score >= CONFIG.POINTS & !_.get(props, 'data.game.complete')) {
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'complete'
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            play: 'complete'
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            complete: true
	                        }
	                    });
	                }
	            },
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'five', name: 'five', value: 5, complete: true }), React.createElement(skoash.Component, { className: 'ten', name: 'ten', value: 10, complete: true }), React.createElement(skoash.Component, { className: 'twenty', name: 'twenty', value: 20, complete: true }), React.createElement(skoash.Component, { className: 'thirty', name: 'thirty', value: 30, complete: true })]
	            })
	        }),
	        React.createElement(_9.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            showNum: 4,
	            bin: React.createElement(_11.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'plastic-bottle', complete: true }), React.createElement(skoash.Component, { className: 'soda-can', complete: true }), React.createElement(skoash.Component, { className: 'banana-peal', complete: true }), React.createElement(skoash.Component, { className: 'glass-bottle', complete: true }), React.createElement(skoash.Component, { className: 'crumbled-paper', complete: true }), React.createElement(skoash.Component, { className: 'tuna-can', complete: true }), React.createElement(skoash.Component, { className: 'tire', complete: true }), React.createElement(skoash.Component, { className: 'battery', complete: true })]
	            }),
	            onFire: function onFire() {
	                this.updateGameState({
	                    path: 'reveal',
	                    data: {
	                        play: 'throw'
	                    }
	                });
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: false
	                    }
	                });
	            },
	            onReload: function onReload() {
	                this.updateGameState({
	                    path: 'cannon',
	                    data: {
	                        fire: true
	                    }
	                });
	            }
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'grass' },
	            React.createElement(
	                skoash.Component,
	                { className: 'stats' },
	                React.createElement(
	                    'span',
	                    { className: 'level' },
	                    CONFIG.LVL
	                ),
	                React.createElement(_13.default, {
	                    ref: 'timer',
	                    countDown: true,
	                    timeout: CONFIG.TIMER,
	                    stop: _.get(props, 'data.game.complete', false),
	                    complete: _.get(props, 'data.game.complete', false),
	                    checkComplete: _.get(props, 'data.game.start', false),
	                    restart: _.get(props, 'data.game.start', false),
	                    onComplete: function onComplete() {
	                        if (_.get(props, 'data.reveal.open')) return;
	                        if (_.get(props, 'data.score.points', 0) < CONFIG.POINTS) {
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    open: 'try-again'
	                                }
	                            });
	
	                            this.updateGameState({
	                                path: 'reveal',
	                                data: {
	                                    play: 'try-again'
	                                }
	                            });
	
	                            this.updateGameState({
	                                path: 'score',
	                                data: {
	                                    points: 0
	                                }
	                            });
	                        }
	                    }
	                }),
	                React.createElement(_15.default, {
	                    ref: 'score',
	                    max: CONFIG.POINTS,
	                    correct: _.get(props, 'data.score.points', 0),
	                    checkComplete: false,
	                    complete: _.get(props, 'data.score.points', 0) === CONFIG.POINTS
	                })
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(12);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(22);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(23);
	
	var _7 = _interopRequireDefault(_6);
	
	var _8 = __webpack_require__(34);
	
	var _9 = _interopRequireDefault(_8);
	
	var _10 = __webpack_require__(13);
	
	var _11 = _interopRequireDefault(_10);
	
	var _12 = __webpack_require__(35);
	
	var _13 = _interopRequireDefault(_12);
	
	var _14 = __webpack_require__(36);
	
	var _15 = _interopRequireDefault(_14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CONFIG = {
	    LVL: 3,
	    POINTS: 200,
	    TIMER: 60000
	};

/***/ },
/* 39 */
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
	            id: "room"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "throw-trash-room.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: CMWN.MEDIA.EFFECT + "no.mp3" }),
	        React.createElement("div", { className: "avatar animated" }),
	        React.createElement("div", { className: "banner animated" })
	    );
	};

/***/ },
/* 40 */
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
	            id: "school"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "throw-trash-school.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: CMWN.MEDIA.EFFECT + "no.mp3" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "avatar animated" })
	    );
	};

/***/ },
/* 41 */
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
	            id: "ground"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "should-you-throw.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: CMWN.MEDIA.EFFECT + "no.mp3" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "avatar animated" })
	    );
	};

/***/ },
/* 42 */
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
	            id: "sing-about-it"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "lets-sing.mp3" }),
	        React.createElement("div", { className: "mr-eco animated" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "dancers animated" })
	    );
	};

/***/ },
/* 43 */
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
	            id: "video"
	        }),
	        React.createElement(
	            skoash.Component,
	            { ref: "center", className: "center" },
	            React.createElement(
	                skoash.Component,
	                { ref: "frame", className: "frame" },
	                React.createElement(skoash.Video, { ref: "video", src: src })
	            )
	        )
	    );
	};
	
	var src = 'https://res.cloudinary.com/changemyworldnow/video/upload/v1455037034/Litterbug-Final_jjmrg7.mp4';

/***/ },
/* 44 */
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
	            id: "good-for-you"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "thank-you.mp3" }),
	        React.createElement("div", { className: "mr-eco animated" }),
	        React.createElement("div", { className: "banner animated" }),
	        React.createElement("div", { className: "banner2 animated" }),
	        React.createElement(
	            skoash.Component,
	            { className: "sparkles" },
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null),
	            React.createElement("div", null)
	        )
	    );
	};

/***/ },
/* 45 */
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
	            id: "take-pledge"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "anti-litter-pledge.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: CMWN.MEDIA.EFFECT + "s-bu-1.mp3" }),
	        React.createElement(skoash.Image, { ref: "bkg", className: "background", src: CMWN.MEDIA.FRAME + "fr-1.png" }),
	        React.createElement("div", { className: "mr-eco" }),
	        React.createElement("div", { className: "banner" })
	    );
	};

/***/ },
/* 46 */
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
	            id: "commit"
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "i-promise.mp3" }),
	        React.createElement(skoash.Audio, { ref: "button", complete: true, type: "sfx", src: CMWN.MEDIA.EFFECT + "s-bu-1.mp3" }),
	        React.createElement(
	            "div",
	            { className: "pledge" },
	            "I promise to ",
	            React.createElement("span", { className: "never" }),
	            " litter",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacerA" }),
	            "and to pick up the litter",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacerB" }),
	            "I see whenever I safely can.",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacer1" }),
	            "I will dispose of it",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacer2" }),
	            "in a trash can",
	            React.createElement("br", null),
	            React.createElement("span", { className: "spacer3" }),
	            "or a recycle bin."
	        ),
	        React.createElement("div", { className: "banner animated" })
	    );
	};

/***/ },
/* 47 */
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
	        React.createElement(skoash.Image, { className: "hidden", src: CMWN.MEDIA.SPRITE + "sprites-mr-eco-01.png" }),
	        React.createElement(skoash.Image, { className: "hidden", src: CMWN.MEDIA.SPRITE + "sprites-sing-thankyou-flip-01.png" }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "flip.mp3" }),
	        React.createElement("div", { className: "words" }),
	        React.createElement(
	            "div",
	            { className: "flip-container animated" },
	            React.createElement("div", { className: "flip" })
	        ),
	        React.createElement("div", { className: "mr-eco animated" }),
	        React.createElement(skoash.Image, { className: "earned", src: CMWN.MEDIA.SPRITE + "litterbug-earned-flips.gif" })
	    );
	};

/***/ },
/* 48 */
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