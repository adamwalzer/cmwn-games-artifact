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
/******/ 	var hotCurrentHash = "ed8924ffc39ba6fd4f5c"; // eslint-disable-line no-unused-vars
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _config = __webpack_require__(4);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _2 = __webpack_require__(5);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(6);
	
	var _5 = _interopRequireDefault(_4);
	
	var _title_screen = __webpack_require__(7);
	
	var _title_screen2 = _interopRequireDefault(_title_screen);
	
	var _menu_screen = __webpack_require__(8);
	
	var _menu_screen2 = _interopRequireDefault(_menu_screen);
	
	var _friend_screen = __webpack_require__(9);
	
	var _friend_screen2 = _interopRequireDefault(_friend_screen);
	
	var _canvas_screen = __webpack_require__(23);
	
	var _canvas_screen2 = _interopRequireDefault(_canvas_screen);
	
	var _item_drawer_screen = __webpack_require__(28);
	
	var _item_drawer_screen2 = _interopRequireDefault(_item_drawer_screen);
	
	var _inbox_screen = __webpack_require__(29);
	
	var _inbox_screen2 = _interopRequireDefault(_inbox_screen);
	
	var _preview_screen = __webpack_require__(34);
	
	var _preview_screen2 = _interopRequireDefault(_preview_screen);
	
	var _send_screen = __webpack_require__(36);
	
	var _send_screen2 = _interopRequireDefault(_send_screen);
	
	var _sent_screen = __webpack_require__(37);
	
	var _sent_screen2 = _interopRequireDefault(_sent_screen);
	
	var _read_screen = __webpack_require__(38);
	
	var _read_screen2 = _interopRequireDefault(_read_screen);
	
	var _6 = __webpack_require__(39);
	
	var _7 = _interopRequireDefault(_6);
	
	var _save_menu = __webpack_require__(40);
	
	var _save_menu2 = _interopRequireDefault(_save_menu);
	
	var _collision_warning = __webpack_require__(41);
	
	var _collision_warning2 = _interopRequireDefault(_collision_warning);
	
	var _limit_warning = __webpack_require__(42);
	
	var _limit_warning2 = _interopRequireDefault(_limit_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DEFAULT_PROFILE_IMAGE = '';
	
	var SkribbleGame = function (_skoash$Game) {
	    _inherits(SkribbleGame, _skoash$Game);
	
	    function SkribbleGame() {
	        _classCallCheck(this, SkribbleGame);
	
	        return _possibleConstructorReturn(this, (SkribbleGame.__proto__ || Object.getPrototypeOf(SkribbleGame)).apply(this, arguments));
	    }
	
	    _createClass(SkribbleGame, [{
	        key: 'getRules',
	        value: function getRules() {
	            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            if (typeof opts.respond === 'function') {
	                return opts.respond(this.refs['screen-canvas'].getData());
	            }
	            return this.refs['screen-canvas'].getData();
	        }
	    }, {
	        key: 'save',
	        value: function save() {
	            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var skramble = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            /* eslint-disable camelcase */
	            var friend_to;
	            var rules;
	            var skribble;
	            var self = this;
	
	            friend_to = self.state.recipient && self.state.recipient.user_id ? self.state.recipient.user_id : null;
	            rules = self.getRules();
	            skribble = _extends({
	                'version': _config2.default.version
	            }, self.state.skribbleData, {
	                friend_to: friend_to,
	                skramble: skramble,
	                rules: rules
	            });
	
	            if (!rules.background && !rules.items.length && !rules.messages.length) {
	                return;
	            }
	
	            if (JSON.stringify(skribble) !== JSON.stringify(this.state.skribble)) {
	                self.emit({
	                    name: 'saveSkribble',
	                    game: self.props.config.id,
	                    skribble: skribble
	                }).then(function (skribbleData) {
	                    self.setState({
	                        skribbleData: skribbleData,
	                        skribble: skribble
	                    });
	                });
	            }
	            /* eslint-enable camelcase */
	        }
	    }, {
	        key: 'send',
	        value: function send() {
	            this.save({}, true);
	
	            this.refs['screen-canvas'].reset();
	            this.navigator.goto({
	                index: 'sent',
	                recipient: this.state.recipient
	            });
	
	            this.setState({
	                recipient: null,
	                skribbleData: null
	            });
	        }
	    }, {
	        key: 'loadSkribble',
	        value: function loadSkribble(opts) {
	            var _this2 = this;
	
	            this.setState({
	                skribbleData: opts.message
	            }, function () {
	                _this2.refs['screen-canvas'].addItems(opts.message);
	                _this2.navigator.goto({
	                    index: 'canvas',
	                    draft: true
	                });
	            });
	        }
	    }, {
	        key: 'getMedia',
	        value: function getMedia(path) {
	            var pathArray;
	            var self = this;
	
	            if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') path = path.path;
	            path = path || 'skribble/menu';
	            pathArray = path.split('/');
	            pathArray.shift();
	
	            return self.eventManager.emit({
	                name: 'getMedia',
	                path: path
	            }).then(function (d) {
	                var opts;
	                var currentOpts;
	                opts = {
	                    data: {},
	                    callback: function callback() {
	                        self.refs['screen-canvas'].setMenu();
	                        self.refs['screen-item-drawer'].updateData();
	                    }
	                };
	                currentOpts = opts.data;
	
	                pathArray.forEach(function (key, index) {
	                    currentOpts[key] = {
	                        items: {}
	                    };
	                    if (index !== pathArray.length - 1) {
	                        currentOpts = currentOpts[key].items;
	                    }
	                });
	
	                currentOpts[pathArray[pathArray.length - 1]] = _.clone(d);
	                currentOpts[pathArray[pathArray.length - 1]].items = {};
	
	                if (d.items) {
	                    d.items.forEach(function (item) {
	                        if (item.asset_type === 'folder' && item.name) {
	                            self.getMedia(path + '/' + item.name);
	                        }
	                        currentOpts[pathArray[pathArray.length - 1]].items[item.name] = item;
	                    });
	                }
	                self.updateData(opts);
	            });
	        }
	    }, {
	        key: 'showCollisionWarning',
	        value: function showCollisionWarning() {
	            if (!this.state.data.collisionWarning.show) return;
	            this.navigator.openMenu({ id: 'collisionWarning' });
	        }
	    }, {
	        key: 'showLimitWarning',
	        value: function showLimitWarning() {
	            this.navigator.openMenu({ id: 'limitWarning' });
	        }
	    }, {
	        key: 'addRecipient',
	        value: function addRecipient(recipient, cb) {
	            var _this3 = this;
	
	            var src;
	
	            if (recipient.src) {
	                recipient.profile_image = recipient.src; // eslint-disable-line camelcase
	            } else if (typeof recipient === 'string') {
	                if (this.state.data && this.state.data.user) {
	                    this.state.data.user.some(function (friend) {
	                        if (friend.friend_id === recipient) {
	                            recipient = friend;
	                            return true;
	                        }
	                        return false;
	                    });
	                }
	            }
	
	            if (typeof recipient === 'string') {
	                this.getData({
	                    name: 'getFriend',
	                    'friend_id': recipient,
	                    callback: function callback() {
	                        _this3.addRecipient(recipient, cb);
	                    }
	                });
	            } else {
	                src = recipient && recipient._embedded && recipient._embedded.image && recipient._embedded.image.url ? recipient._embedded.image.url : recipient.profile_image || DEFAULT_PROFILE_IMAGE;
	                this.setState({
	                    recipient: {
	                        'user_id': recipient.user_id || recipient.friend_id,
	                        name: recipient.name || recipient.username,
	                        src: src,
	                        // I need to get the flips earned back from the backend to do this.
	                        description: '',
	                        // description: friend.flips_earned + ' Flips Earned',
	                        'asset_type': 'friend'
	                    }
	                }, cb);
	            }
	        }
	    }, {
	        key: 'clickRecipient',
	        value: function clickRecipient() {
	            this.navigator.goto({
	                index: 'friend',
	                goto: this.state.currentScreenIndex
	            });
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            if (this.state.recipient) {
	                this.navigator.goto({ index: 'canvas' });
	            } else {
	                this.navigator.goto({
	                    index: 'friend',
	                    goto: 'canvas'
	                });
	            }
	        }
	    }, {
	        key: 'saveButton',
	        value: function saveButton() {
	            this.save();
	            this.navigator.openMenu({ id: 'save' });
	        }
	    }, {
	        key: 'renderRecipient',
	        value: function renderRecipient() {
	            var recipient = this.state.recipient;
	            var content = [];
	
	            if (!recipient) return;
	
	            if (recipient.name) {
	                content.push(React.createElement(
	                    'span',
	                    { className: 'name' },
	                    recipient.name
	                ));
	            }
	
	            if (recipient.src) {
	                content.push(React.createElement('img', { className: 'profile-image', src: recipient.src }));
	            }
	
	            return content;
	        }
	    }]);
	
	    return SkribbleGame;
	}(skoash.Game);
	
	skoash.start(React.createElement(SkribbleGame, {
	    config: _config2.default,
	    screens: {
	        0: _5.default,
	        1: _title_screen2.default,
	        menu: _menu_screen2.default,
	        friend: _friend_screen2.default,
	        canvas: _canvas_screen2.default,
	        'item-drawer': _item_drawer_screen2.default,
	        inbox: _inbox_screen2.default,
	        preview: _preview_screen2.default,
	        send: _send_screen2.default,
	        sent: _sent_screen2.default,
	        read: _read_screen2.default
	    },
	    menus: {
	        quit: _7.default,
	        save: _save_menu2.default,
	        collisionWarning: _collision_warning2.default,
	        limitWarning: _limit_warning2.default
	    },
	    loader: React.createElement(_3.default, null),
	    assets: [React.createElement(skoash.Audio, { ref: 'bkg1', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'bkg2', type: 'background', src: CMWN.MEDIA.EFFECT + 'IntroSequnce.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'AllButtons.mp3' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'waving-otter-2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'open-wide-otter-2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'joyful-otter-2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'antipation-otter-3.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'proud-of-you-2.gif' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'peeking-through-otter-2.gif' }), React.createElement('div', { className: 'background-1' }), React.createElement('div', { className: 'background-2' }), React.createElement('div', { className: 'background-3' }), React.createElement('div', { className: 'background-4' }), React.createElement('div', { className: 'background-5' }), React.createElement('div', { className: 'background-6' })],
	    onBootstrap: function onBootstrap() {
	        this.getFriends = _.throttle(this.getData.bind(this, { name: 'getFriends' }), 1000);
	        this.getMediaOnReady = _.throttle(this.getMedia.bind(this), 1000);
	
	        this.updateState({
	            path: ['collisionWarning'],
	            data: {
	                show: true
	            }
	        });
	    },
	    onReady: function onReady() {
	        this.getMediaOnReady();
	        this.getFriends();
	    },
	    renderMenu: function renderMenu() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'game-menu' },
	                React.createElement('button', { className: 'save', onClick: this.saveButton.bind(this) }),
	                React.createElement('button', {
	                    className: 'inbox',
	                    onClick: this.navigator.goto.bind(this, { index: 'inbox' })
	                }),
	                React.createElement('button', { className: 'create', onClick: this.create.bind(this) }),
	                React.createElement('button', { className: 'help', onClick: this.navigator.openMenu.bind(this, { id: 'help' }) }),
	                React.createElement('button', {
	                    className: 'close',
	                    onClick: this.navigator.openMenu.bind(this, { id: 'quit' })
	                })
	            ),
	            React.createElement(
	                'ul',
	                { className: 'menu recipient' },
	                React.createElement(
	                    'li',
	                    { onClick: this.clickRecipient.bind(this) },
	                    React.createElement(
	                        'span',
	                        null,
	                        this.renderRecipient()
	                    )
	                )
	            )
	        );
	    },
	    getGotoOpts: function getGotoOpts(opts) {
	        if (opts.index === 'send') {
	            if (!this.state.recipient || !this.state.recipient.name) {
	                opts.index = 'friend';
	                opts.goto = 'send';
	            }
	        }
	        return opts;
	    },
	    passData: function passData(opts) {
	        if (opts.name === 'add-item') {
	            this.refs['screen-canvas'].addItem(opts.message);
	            this.navigator.goto({ index: 'canvas' });
	        } else if (opts.name === 'add-recipient') {
	            this.addRecipient(opts.message, this.navigator.goto.bind(this, {
	                index: opts.goto || 'canvas'
	            }));
	        } else if (opts.name === 'send') {
	            this.send();
	        } else if (opts.name === 'showCollisionWarning') {
	            this.showCollisionWarning();
	        } else if (opts.name === 'showLimitWarning') {
	            this.showLimitWarning();
	        }
	    },
	    getTriggerEvents: function getTriggerEvents() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        opts.save = this.save;
	        opts.getMedia = this.getMedia;
	        opts.getRules = this.getRules;
	        opts.loadSkribble = this.loadSkribble;
	        return opts;
	    },
	    getData: function getData(opts) {
	        var _this4 = this;
	
	        var names = ['getFriends', 'getFriend', 'markAsRead'];
	
	        if (names.indexOf(opts.name) === -1) {
	            opts.name = 'getData';
	        }
	
	        return this.eventManager.emit(opts).then(function (data) {
	            _this4.updateData({
	                data: data,
	                callback: opts.callback
	            });
	        });
	    }
	}));
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "skribble",
		"version": 1,
		"skoash": "1.1.8",
		"dimensions": {
			"width": 1600,
			"height": 900
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
	            hidePrev: true,
	            nextDelay: 1000,
	            nextIndex: "menu",
	            backgroundAudio: "bkg2"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "title",
	            className: "title animated",
	            src: CMWN.MEDIA.IMAGE + "skribble-title.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "play",
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + "skribble-play-01.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "play-hover",
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + "skribble-hover.png"
	        })
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (props, ref, key) {
	    return React.createElement(MenuScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: "menu",
	        hidePrev: true,
	        hideNext: true,
	        load: true
	    }));
	};
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MenuScreen = function (_skoash$Screen) {
	    _inherits(MenuScreen, _skoash$Screen);
	
	    function MenuScreen() {
	        _classCallCheck(this, MenuScreen);
	
	        return _possibleConstructorReturn(this, (MenuScreen.__proto__ || Object.getPrototypeOf(MenuScreen)).apply(this, arguments));
	    }
	
	    _createClass(MenuScreen, [{
	        key: "renderContent",
	        value: function renderContent() {
	            return React.createElement(
	                "div",
	                null,
	                React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "HiThere.mp3" }),
	                React.createElement(skoash.Image, { className: "hidden", src: CMWN.MEDIA.IMAGE + "sk-bkg-1.png" }),
	                React.createElement(skoash.Image, { className: "otter", src: CMWN.MEDIA.SPRITE + "waving-otter-2.gif" }),
	                React.createElement(
	                    "div",
	                    { className: "bubble" },
	                    "Hi there!",
	                    React.createElement("br", null),
	                    "What would you",
	                    React.createElement("br", null),
	                    "like to do today?"
	                ),
	                React.createElement(
	                    "div",
	                    { className: "buttons" },
	                    React.createElement("button", { className: "make", onClick: this.goto.bind(this, {
	                            index: 'friend',
	                            goto: 'canvas'
	                        }, undefined) }),
	                    React.createElement("button", { className: "read", onClick: this.goto.bind(this, 'inbox', undefined) })
	                )
	            );
	        }
	    }]);
	
	    return MenuScreen;
	}(skoash.Screen);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (props, ref, key) {
	    return React.createElement(FriendScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'friends',
	        completeOnStart: true,
	        checkComplete: false,
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	var _ = __webpack_require__(10);
	
	var _2 = _interopRequireDefault(_);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DEFAULT_PROFILE_IMAGE = 'https://changemyworldnow.com/ff50fa329edc8a1d64add63c839fe541.png';
	
	var FriendScreen = function (_skoash$Screen) {
	    _inherits(FriendScreen, _skoash$Screen);
	
	    function FriendScreen(props) {
	        _classCallCheck(this, FriendScreen);
	
	        var _this = _possibleConstructorReturn(this, (FriendScreen.__proto__ || Object.getPrototypeOf(FriendScreen)).call(this, props));
	
	        _this.state = {
	            load: true,
	            complete: true,
	            recipient: {},
	            opts: {}
	        };
	        return _this;
	    }
	
	    _createClass(FriendScreen, [{
	        key: 'selectRespond',
	        value: function selectRespond(message) {
	            skoash.trigger('passData', {
	                name: 'add-recipient',
	                goto: this.state.opts.goto,
	                message: message
	            });
	        }
	    }, {
	        key: 'updateData',
	        value: function updateData(d) {
	            var data = d && d.user ? d.user : this.props.gameState.data.user || [];
	
	            data = data.map(function (friend) {
	                var src = friend._embedded.image && friend._embedded.image.url ? friend._embedded.image.url : DEFAULT_PROFILE_IMAGE;
	                return {
	                    'user_id': friend.friend_id,
	                    name: friend.username,
	                    src: src,
	                    // I need to get the flips earned back from the backend to do this.
	                    description: '',
	                    // description: friend.flips_earned + ' Flips Earned',
	                    'asset_type': 'friend'
	                };
	            });
	
	            this.setState({
	                data: data
	            });
	        }
	    }, {
	        key: 'open',
	        value: function open(opts) {
	            var recipient;
	            var self = this;
	
	            self.updateData();
	
	            skoash.trigger('getData', {
	                name: 'getFriends'
	            }).then(function (data) {
	                self.updateData.call(self, data);
	            });
	
	            recipient = self.props.gameState.recipient;
	
	            self.setState({
	                load: true,
	                open: true,
	                leave: false,
	                close: false,
	                recipient: recipient,
	                opts: opts
	            }, function () {
	                self.refs.drawer && self.refs.drawer.start();
	            });
	
	            if (!self.state.started) {
	                self.start();
	            }
	        }
	    }, {
	        key: 'suggestFriends',
	        value: function suggestFriends() {
	            window.open(window.location.origin.replace('games-', '').replace('games.', '') + '/friends/suggested');
	        }
	    }, {
	        key: 'save',
	        value: function save() {
	            skoash.trigger('goto', {
	                index: 'canvas'
	            });
	            skoash.trigger('openMenu', { id: 'save' });
	        }
	    }, {
	        key: 'renderOtter',
	        value: function renderOtter() {
	            var copy;
	            var src;
	            var imageSrc;
	
	            src = 'One';
	            imageSrc = CMWN.MEDIA.IMAGE + 'otter-static-greeting-one.png';
	            copy = React.createElement(
	                'span',
	                null,
	                'Don\'t have',
	                React.createElement('br', null),
	                'friends yet?',
	                React.createElement('br', null),
	                React.createElement('br', null),
	                'Let me suggest',
	                React.createElement('br', null),
	                'some for you.'
	            );
	
	            if (this.state.data && this.state.data.length) {
	                src = 'Two';
	                imageSrc = CMWN.MEDIA.SPRITE + 'open-wide-otter-2.gif';
	                copy = React.createElement(
	                    'span',
	                    null,
	                    'Let me find a friend',
	                    React.createElement('br', null),
	                    'to send your message to.'
	                );
	            }
	
	            return React.createElement(
	                'div',
	                { className: 'otter-container ' + src },
	                React.createElement(skoash.Image, { className: 'otter', src: imageSrc }),
	                React.createElement(
	                    'div',
	                    { className: 'bubble' },
	                    copy
	                )
	            );
	        }
	    }, {
	        key: 'renderFriends',
	        value: function renderFriends() {
	            if (this.state.data && this.state.data.length) {
	                return React.createElement(_2.default, {
	                    ref: 'drawer',
	                    scrollbarImg: CMWN.MEDIA.IMAGE + 'sk-btn-slider.png',
	                    selectRespond: this.selectRespond.bind(this),
	                    cancelRespond: this.back,
	                    categories: this.state.opts.categories,
	                    data: this.state.data,
	                    selectedItem: this.state.recipient,
	                    buttons: this.buttons,
	                    completeOnStart: true,
	                    checkComplete: false,
	                    className: 'goto-' + this.state.opts.goto
	                });
	            }
	
	            return React.createElement(
	                'div',
	                { className: 'goto-' + this.state.opts.goto },
	                React.createElement(skoash.Audio, { ref: 'vo', type: 'voiceOver', src: CMWN.MEDIA.VO + 'FindFriendSend.mp3' }),
	                React.createElement(
	                    'div',
	                    { className: 'item-drawer-container' },
	                    React.createElement(
	                        'div',
	                        { className: 'suggest-friends-buttons' },
	                        React.createElement('button', { className: 'continue', onClick: this.selectRespond.bind(this, {}) }),
	                        React.createElement('button', { className: 'suggest', onClick: this.suggestFriends }),
	                        React.createElement('button', { className: 'save-to-drafts', onClick: this.save })
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'header' }),
	                this.renderOtter(),
	                this.renderFriends()
	            );
	        }
	    }]);
	
	    return FriendScreen;
	}(skoash.Screen);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shortid = __webpack_require__(11);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(21);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(22);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ItemDrawer = function (_Selectable) {
	    _inherits(ItemDrawer, _Selectable);
	
	    function ItemDrawer() {
	        _classCallCheck(this, ItemDrawer);
	
	        return _possibleConstructorReturn(this, (ItemDrawer.__proto__ || Object.getPrototypeOf(ItemDrawer)).apply(this, arguments));
	    }
	
	    _createClass(ItemDrawer, [{
	        key: 'start',
	        value: function start() {
	            var items;
	            var selectedItem;
	            var selectClass;
	            var selectFunction;
	            var classes = {};
	            var self = this;
	
	            selectClass = this.props.selectClass || this.state.selectClass || 'SELECTED';
	            selectFunction = selectClass === 'HIGHLIGHTED' ? this.highlight : this.select;
	
	            items = self.props.data || [];
	
	            if (self.state.category && items[self.state.category]) {
	                items = items[self.state.category].items;
	            }
	
	            selectedItem = JSON.stringify(self.props.selectedItem);
	
	            _.each(items, function (item, key) {
	                if (self.props.selectedItem && JSON.stringify(item) === selectedItem) {
	                    classes[key] = selectClass;
	                }
	            });
	
	            if (this.props.selectOnStart) {
	                classes[this.props.selectOnStart] = selectClass;
	            }
	
	            this.setState({
	                started: true,
	                classes: classes,
	                selectClass: selectClass,
	                selectFunction: selectFunction,
	                categoryName: '',
	                category: ''
	            });
	
	            _.each(self.refs, function (ref) {
	                if (typeof ref.start === 'function') ref.start();
	            });
	        }
	    }, {
	        key: 'selectHelper',
	        value: function selectHelper(e) {
	            var li;
	            var message;
	            var key;
	            var type;
	            var categoryName;
	            var classes = [];
	
	            li = e.target.closest('LI');
	            if (!li) return;
	
	            key = li.getAttribute('data-ref');
	            if (!this.refs[key]) return;
	
	            type = this.refs[key].props.item.asset_type;
	            if (!type) return;
	
	            if (type === 'folder') {
	                categoryName = this.refs[key].props.item.name;
	                this.setState({
	                    category: key,
	                    categoryName: categoryName
	                });
	            } else {
	                message = this.refs[key].props.item;
	                classes[key] = this.props.selectClass;
	
	                this.setState({
	                    message: message,
	                    classes: classes
	                });
	            }
	        }
	    }, {
	        key: 'selectButton',
	        value: function selectButton() {
	            if (typeof this.props.selectRespond === 'function' && this.state.message) {
	                this.props.selectRespond(this.state.message);
	            }
	        }
	    }, {
	        key: 'continueButton',
	        value: function continueButton() {
	            if (typeof this.props.selectRespond === 'function') {
	                this.props.selectRespond({});
	            }
	        }
	    }, {
	        key: 'cancelButton',
	        value: function cancelButton() {
	            if (typeof this.props.cancelRespond === 'function') {
	                this.props.cancelRespond.call(this);
	            }
	        }
	    }, {
	        key: 'getCategory',
	        value: function getCategory() {
	            if (this.state.categoryName || this.props.categoryName) {
	                return this.state.categoryName || this.props.categoryName;
	            }
	
	            if (this.props.categories && this.props.categories.length) {
	                return this.props.categories[this.props.categories.length - 1];
	            }
	            return '';
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)({
	                'ANSWERED': _.values(this.state.classes).indexOf(this.state.selectClass) !== -1
	            }, this.props.className, 'item-drawer-component');
	        }
	    }, {
	        key: 'getULClass',
	        value: function getULClass() {
	            return (0, _classnames2.default)('item-drawer', {
	                COMPLETE: this.state.complete
	            }, this.props.categories ? this.props.categories.join(' ') : '');
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(key, item) {
	            return (0, _classnames2.default)(this.state.classes[key] || '', {
	                white: item && item.name && item.name.toLowerCase()[item.name.length - 1] === 'w'
	            });
	        }
	    }, {
	        key: 'renderButtons',
	        value: function renderButtons() {
	            return React.createElement(
	                'div',
	                { className: 'buttons' },
	                React.createElement('button', { className: 'select', onClick: this.selectButton.bind(this) }),
	                React.createElement('button', { className: 'continue', onClick: this.continueButton.bind(this) }),
	                React.createElement('button', { className: 'cancel', onClick: this.cancelButton.bind(this) })
	            );
	        }
	    }, {
	        key: 'renderItemContent',
	        value: function renderItemContent(item) {
	            var content = [];
	            var thumb;
	            var src;
	
	            if (item.src || item.thumb) {
	                src = item.thumb || item.src;
	            } else if (item.items) {
	                if (!_.isArray(item.items)) {
	                    item.items = _.values(item.items);
	                }
	
	                thumb = _.find(item.items, function (subitem) {
	                    return subitem.name === '_thumb';
	                });
	
	                if (thumb) src = thumb.thumb || thumb.src;
	
	                if (!src && item.items[0]) src = item.items[0].thumb || item.items[0].src;
	            }
	
	            if (src) {
	                content.push(React.createElement(skoash.Image, { src: src, key: 0 }));
	            }
	
	            if (item.name && (item.asset_type === 'folder' || item.asset_type === 'friend')) {
	                content.push(React.createElement(
	                    'span',
	                    { className: 'name', key: 1 },
	                    item.name
	                ));
	            }
	
	            if (item.description) {
	                content.push(React.createElement(
	                    'span',
	                    { className: 'description', key: 2 },
	                    item.description
	                ));
	            }
	
	            return content;
	        }
	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            var _this2 = this;
	
	            var items;
	            var self = this;
	
	            if (!this.props.data) return;
	
	            items = this.props.data;
	
	            if (this.state.category && items[this.state.category]) {
	                items = items[this.state.category].items;
	            }
	
	            if (!_.isArray(items)) {
	                items = _.values(items);
	            }
	
	            return items.sort(function (a, b) {
	                var aVal = !_.isNaN(window.parseInt(a.order)) ? window.parseInt(a.order) : Infinity;
	                var bVal = !_.isNaN(window.parseInt(b.order)) ? window.parseInt(b.order) : Infinity;
	                if (aVal === bVal) {
	                    if (a.name < b.name) return -1;
	                    if (a.name > b.name) return 1;
	                    return 0;
	                }
	                if (aVal < bVal) return -1;
	                return 1;
	            }).filter(function (item) {
	                return item.name !== '_thumb';
	            }).map(function (item, key) {
	                return React.createElement(
	                    skoash.ListItem,
	                    {
	                        className: _this2.getClass(key, item),
	                        ref: key,
	                        'data-ref': key,
	                        item: item,
	                        key: _shortid2.default.generate()
	                    },
	                    self.renderItemContent(item)
	                );
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: this.getClassNames() },
	                React.createElement(
	                    'div',
	                    { className: 'item-drawer-container' },
	                    React.createElement(
	                        'h2',
	                        null,
	                        this.getCategory()
	                    ),
	                    React.createElement(
	                        _5.default,
	                        { ref: 'scroll-area', img: this.props.scrollbarImg },
	                        React.createElement(
	                            'ul',
	                            {
	                                ref: 'list',
	                                className: this.getULClass(),
	                                onClick: this.state.selectFunction.bind(this)
	                            },
	                            this.renderList()
	                        )
	                    )
	                ),
	                this.renderButtons()
	            );
	        }
	    }]);
	
	    return ItemDrawer;
	}(_3.default);
	
	ItemDrawer.defaultProps = _.defaults({
	    scrollbarImg: '',
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        var items;
	        var quickCheck;
	        var itemsChanged;
	
	        items = nextProps.data || [];
	        if (nextState.category && items[nextState.category]) {
	            items = items[nextState.category].items;
	        }
	
	        quickCheck = _.reduce(items, function (a, i) {
	            return a + i.name;
	        }, '');
	
	        itemsChanged = this.quickCheck !== quickCheck;
	        if (itemsChanged) this.quickCheck = quickCheck;
	
	        return itemsChanged || nextProps.categoryName !== this.props.categoryName || JSON.stringify(this.state.classes) !== JSON.stringify(nextState.classes);
	    }
	}, _3.default.defaultProps);
	
	exports.default = ItemDrawer;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(12);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(13);
	var encode = __webpack_require__(15);
	var decode = __webpack_require__(17);
	var isValid = __webpack_require__(18);
	
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
	var clusterWorkerId = __webpack_require__(19) || 0;
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(14);
	
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(16);
	
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(13);
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(13);
	
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
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(20);
	
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// As of skoash 1.1.0 this component can be found at skoash.ScrollArea
	/* eslint-disable no-console */
	console.warn('As of skoash 1.1.0 this component can be found at skoash.ScrollArea');
	/* eslint-enable no-console */
	
	var IMAGE = 'image';
	var AREA = 'area';
	var CONTENT = 'content';
	var SCROLLBAR = 'scrollbar';
	var SCROLLER = 'scroller';
	
	var ScrollArea = function (_skoash$Component) {
	    _inherits(ScrollArea, _skoash$Component);
	
	    function ScrollArea() {
	        _classCallCheck(this, ScrollArea);
	
	        var _this = _possibleConstructorReturn(this, (ScrollArea.__proto__ || Object.getPrototypeOf(ScrollArea)).call(this));
	
	        _this.state = _.defaults({
	            startY: 0,
	            endY: 0,
	            zoom: 1
	        }, _this.state);
	
	        _this.setZoom = _this.setZoom.bind(_this);
	
	        _this.mouseDown = _this.mouseDown.bind(_this);
	        _this.mouseUp = _this.mouseUp.bind(_this);
	
	        _this.moveEvent = _this.moveEvent.bind(_this);
	
	        _this.touchStart = _this.touchStart.bind(_this);
	        _this.touchEnd = _this.touchEnd.bind(_this);
	        return _this;
	    }
	
	    _createClass(ScrollArea, [{
	        key: 'start',
	        value: function start() {
	            var _this2 = this;
	
	            _get(ScrollArea.prototype.__proto__ || Object.getPrototypeOf(ScrollArea.prototype), 'start', this).call(this, function () {
	                _this2[AREA].scrollTop = 0;
	                _this2.setState({
	                    startY: 0,
	                    endY: 0
	                });
	            });
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var _this3 = this;
	
	            _get(ScrollArea.prototype.__proto__ || Object.getPrototypeOf(ScrollArea.prototype), 'bootstrap', this).call(this);
	
	            this.setZoom();
	            window.addEventListener('resize', this.setZoom);
	
	            this[AREA] = ReactDOM.findDOMNode(this.refs[AREA]);
	            this[CONTENT] = ReactDOM.findDOMNode(this.refs[CONTENT]);
	            this[SCROLLBAR] = ReactDOM.findDOMNode(this.refs[SCROLLBAR]);
	            this[SCROLLER] = ReactDOM.findDOMNode(this.refs[SCROLLER]);
	
	            this[AREA].scrollTop = 0;
	
	            this[AREA].addEventListener('scroll', function (e) {
	                var areaScrollTop;
	                var endY;
	
	                if (!e.target || _this3.dragging) return;
	
	                areaScrollTop = e.target.scrollTop;
	                endY = (_this3[SCROLLBAR].offsetHeight - _this3.props.scrollbarHeight) * (areaScrollTop / (_this3[CONTENT].offsetHeight - _this3[AREA].offsetHeight));
	
	                _this3.setState({
	                    startY: 0,
	                    endY: endY
	                });
	            });
	
	            this[SCROLLER].addEventListener('mousedown', this.mouseDown);
	            this[SCROLLER].addEventListener('touchstart', this.touchStart);
	        }
	    }, {
	        key: 'setZoom',
	        value: function setZoom() {
	            var _this4 = this;
	
	            skoash.trigger('getState').then(function (state) {
	                _this4.setState({
	                    zoom: state.scale
	                });
	            });
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
	        key: 'startEvent',
	        value: function startEvent(e, cb) {
	            var startY;
	            var endY;
	
	            if (e.target !== this[SCROLLER]) return;
	
	            this.dragging = true;
	
	            e = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e;
	
	            endY = this.getEndY(e);
	            startY = this.state.startY || endY;
	
	            this.setState({
	                startY: startY,
	                endY: endY
	            });
	
	            if (typeof cb === 'function') cb.call(this);
	        }
	    }, {
	        key: 'getEndY',
	        value: function getEndY(e) {
	            return Math.min(Math.max(e.pageY / this.state.zoom, this.state.startY), this.state.startY + this[SCROLLBAR].getBoundingClientRect().height / this.state.zoom - this.props.scrollbarHeight);
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
	        key: 'moveEvent',
	        value: function moveEvent(e) {
	            var endY;
	
	            e = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e;
	
	            endY = this.getEndY(e);
	
	            this[AREA].scrollTop = (endY - this.state.startY) * (this[CONTENT].offsetHeight - this[AREA].offsetHeight) / (this[SCROLLBAR].offsetHeight - this.props.scrollbarHeight);
	
	            this.setState({
	                endY: endY
	            });
	        }
	    }, {
	        key: 'mouseUp',
	        value: function mouseUp() {
	            this.dragging = false;
	            this.detachMouseEvents();
	        }
	    }, {
	        key: 'touchEnd',
	        value: function touchEnd() {
	            this.dragging = false;
	            this.detachTouchEvents();
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
	        key: 'getScrollerStyle',
	        value: function getScrollerStyle() {
	            return {
	                backgroundImage: 'url(' + this.props.img + ')',
	                top: this.state.endY - this.state.startY
	            };
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)('scroll-area', _get(ScrollArea.prototype.__proto__ || Object.getPrototypeOf(ScrollArea.prototype), 'getClassNames', this).call(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (!this.props.shouldRender) return null;
	
	            return React.createElement(
	                this.props.type,
	                _extends({}, this.props, { className: this.getClassNames() }),
	                React.createElement(skoash.Image, { ref: IMAGE, className: 'hidden', src: this.props.img }),
	                React.createElement(
	                    'div',
	                    { ref: AREA, className: AREA },
	                    React.createElement(
	                        'div',
	                        { ref: CONTENT, className: CONTENT },
	                        this.renderContentList()
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    {
	                        ref: SCROLLBAR,
	                        className: SCROLLBAR
	                    },
	                    React.createElement('div', {
	                        ref: SCROLLER,
	                        className: SCROLLER,
	                        style: this.getScrollerStyle()
	                    })
	                )
	            );
	        }
	    }]);
	
	    return ScrollArea;
	}(skoash.Component);
	
	ScrollArea.defaultProps = _.defaults({
	    img: '',
	    scrollbarHeight: 100
	}, skoash.Component.defaultProps);
	
	exports.default = ScrollArea;

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
	
	exports.default = function (props, ref, key) {
	    return React.createElement(CanvasScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'canvas',
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	var _2 = __webpack_require__(24);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(27);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(21);
	
	var _7 = _interopRequireDefault(_6);
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import Reveal from 'shared/components/reveal/0.1';
	
	var CanvasScreen = function (_skoash$Screen) {
	    _inherits(CanvasScreen, _skoash$Screen);
	
	    function CanvasScreen(props) {
	        _classCallCheck(this, CanvasScreen);
	
	        var _this = _possibleConstructorReturn(this, (CanvasScreen.__proto__ || Object.getPrototypeOf(CanvasScreen)).call(this, props));
	
	        _this.state = {
	            load: true,
	            menu: {},
	            valid: true
	        };
	
	        _this.rightMenuList = [React.createElement(
	            'li',
	            { className: 'preview', onClick: _this.preview.bind(_this) },
	            React.createElement('span', null)
	        ), React.createElement(
	            'li',
	            { className: 'send', onClick: _this.send.bind(_this) },
	            React.createElement('span', null)
	        )];
	
	        _this.setValid = _this.setValid.bind(_this);
	        _this.closeReveal = _this.closeReveal.bind(_this);
	        _this.setHasAssets = _this.setHasAssets.bind(_this);
	        _this.onMouseOver = _this.onMouseOver.bind(_this);
	        return _this;
	    }
	
	    _createClass(CanvasScreen, [{
	        key: 'bootstrap',
	        value: function bootstrap() {
	            _get(CanvasScreen.prototype.__proto__ || Object.getPrototypeOf(CanvasScreen.prototype), 'bootstrap', this).call(this);
	
	            this.menuDOM = ReactDOM.findDOMNode(this.refs.menu);
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            return this.refs.canvas.getItems();
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.refs.canvas.reset();
	            this.setState({
	                background: false,
	                hasAssets: false
	            });
	        }
	    }, {
	        key: 'addItem',
	        value: function addItem(message) {
	            if (message) {
	                this.setState({
	                    hasAssets: true,
	                    background: this.state.background || message.asset_type === 'background'
	                });
	                this.refs.canvas.addItem(message, function () {
	                    skoash.trigger('save');
	                });
	            }
	        }
	    }, {
	        key: 'addItems',
	        value: function addItems(message) {
	            var hasAssets;
	            var background;
	
	            hasAssets = true;
	            background = !!message.rules.background;
	
	            this.mapRulesStringToNumbers(message.rules);
	
	            this.refs.canvas.setItems(message.rules);
	
	            this.setState({
	                hasAssets: hasAssets,
	                background: background
	            });
	
	            if (message.friend_to) {
	                skoash.trigger('passData', {
	                    name: 'add-recipient',
	                    message: message.friend_to
	                });
	            }
	        }
	    }, {
	        key: 'setMenu',
	        value: function setMenu() {
	            var menu;
	            var state = this.props.gameState;
	
	            if (state && state.data && state.data.menu) {
	                menu = state.data.menu;
	                this.setState({
	                    menu: menu
	                });
	            }
	        }
	    }, {
	        key: 'mapRulesStringToNumbers',
	        value: function mapRulesStringToNumbers(rules) {
	            if (!rules) return;
	
	            if (_.isArray(rules.items)) {
	                rules.items.forEach(function (item) {
	                    item.state.left = parseFloat(item.state.left);
	                    item.state.rotation = parseFloat(item.state.rotation);
	                    item.state.scale = parseFloat(item.state.scale);
	                    item.state.top = parseFloat(item.state.top);
	                });
	            }
	
	            if (_.isArray(rules.messages)) {
	                rules.messages.forEach(function (message) {
	                    message.state.left = parseFloat(message.state.left);
	                    message.state.rotation = parseFloat(message.state.rotation);
	                    message.state.scale = parseFloat(message.state.scale);
	                    message.state.top = parseFloat(message.state.top);
	                });
	            }
	
	            return rules;
	        }
	    }, {
	        key: 'open',
	        value: function open() {
	            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.setMenu();
	
	            if (this.refs && this.refs.menu) {
	                this.refs.menu.deactivate();
	            }
	
	            if (!opts.draft) skoash.trigger('save');
	
	            _get(CanvasScreen.prototype.__proto__ || Object.getPrototypeOf(CanvasScreen.prototype), 'open', this).call(this);
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            skoash.trigger('save');
	            _get(CanvasScreen.prototype.__proto__ || Object.getPrototypeOf(CanvasScreen.prototype), 'close', this).call(this);
	        }
	    }, {
	        key: 'setValid',
	        value: function setValid(valid) {
	            this.setState({
	                valid: valid
	            });
	        }
	    }, {
	        key: 'setHasAssets',
	        value: function setHasAssets(hasAssets) {
	            this.setState({
	                hasAssets: hasAssets
	            });
	        }
	    }, {
	        key: 'send',
	        value: function send() {
	            if (!this.state.valid) return;
	            this.goto('send');
	        }
	    }, {
	        key: 'preview',
	        value: function preview() {
	            if (!this.state.valid) return;
	            this.goto('preview');
	        }
	    }, {
	        key: 'closeReveal',
	        value: function closeReveal() {
	            if (this.refs && this.refs.reveal) {
	                this.refs.reveal.close();
	            }
	        }
	    }, {
	        key: 'onMouseOver',
	        value: function onMouseOver(e) {
	            var li = e.target.closest('LI');
	            var ul = e.target.closest('UL');
	
	            if (ul === this.menuDOM) {
	                if (!_.includes(li.className, 'SELECTED')) this.playMedia('slide');
	            } else {
	                this.playMedia('highlight');
	            }
	        }
	    }, {
	        key: 'getContainerClasses',
	        value: function getContainerClasses() {
	            return (0, _classnames2.default)({
	                'canvas-container': true,
	                BACKGROUND: this.state.background
	            });
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)({
	                'HAS-ASSETS': this.state.hasAssets,
	                'INVALID': !this.state.valid
	            }, skoash.Screen.prototype.getClassNames.call(this));
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(skoash.Audio, { ref: 'slide', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'MenuSlide.mp3' }),
	                React.createElement(skoash.Audio, { ref: 'highlight', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'Highlight.mp3' }),
	                React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'sk-frames-canvas.png' }),
	                React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sk-btn-friend.png' }),
	                React.createElement(_5.default, {
	                    ref: 'menu',
	                    items: this.state.menu.items,
	                    level: 0,
	                    lastLevel: 1,
	                    onStart: function onStart() {
	                        this.setState({ classes: {} });
	                    },
	                    onMouseOver: this.onMouseOver
	                }),
	                React.createElement(
	                    'div',
	                    { className: this.getContainerClasses() },
	                    React.createElement(_3.default, {
	                        ref: 'canvas',
	                        setValid: this.setValid,
	                        setHasAssets: this.setHasAssets,
	                        itemMinDim: 150
	                    })
	                ),
	                React.createElement(_7.default, { className: 'menu right-menu', list: this.rightMenuList })
	            );
	        }
	    }]);
	
	    return CanvasScreen;
	}(skoash.Screen);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(25);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Canvas = function (_skoash$Component) {
	    _inherits(Canvas, _skoash$Component);
	
	    function Canvas() {
	        _classCallCheck(this, Canvas);
	
	        var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this));
	
	        _this.state = {
	            background: null,
	            items: [],
	            messages: [],
	            offsetX: 0,
	            offsetY: 0,
	            active: false,
	            valid: true
	        };
	
	        _this.deleteItem = _this.deleteItem.bind(_this);
	        _this.checkItem = _this.checkItem.bind(_this);
	        _this.deactivateItems = _this.deactivateItems.bind(_this);
	        _this.relayerItems = _this.relayerItems.bind(_this);
	        _this.setValid = _this.setValid.bind(_this);
	        return _this;
	    }
	
	    _createClass(Canvas, [{
	        key: 'start',
	        value: function start() {
	            var dom = ReactDOM.findDOMNode(this);
	
	            _get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), 'start', this).call(this);
	
	            this.setState({
	                width: dom.offsetWidth,
	                height: dom.offsetHeight
	            });
	        }
	    }, {
	        key: 'getItems',
	        value: function getItems() {
	            var items;
	            var messages;
	            var self = this;
	
	            items = this.state.items.map(function (item, key) {
	                var state;
	
	                if (!self.refs['item-' + key]) return item;
	
	                state = self.refs['item-' + key].state;
	
	                item.state = {
	                    left: _.floor(state.left, 14),
	                    top: _.floor(state.top, 14),
	                    scale: _.floor(state.scale, 14),
	                    rotation: _.floor(state.rotation, 14),
	                    layer: state.layer,
	                    valid: state.valid,
	                    corners: state.corners
	                };
	
	                item.check = state.check;
	                item.mime_type = state.mime_type; // eslint-disable-line camelcase
	
	                return item;
	            });
	
	            messages = this.state.messages.map(function (item, key) {
	                var state;
	
	                if (!self.refs['message-' + key]) return item;
	
	                state = self.refs['message-' + key].state;
	
	                item.state = {
	                    left: _.floor(state.left, 14),
	                    top: _.floor(state.top, 14),
	                    scale: _.floor(state.scale, 14),
	                    rotation: _.floor(state.rotation, 14),
	                    layer: state.layer,
	                    valid: state.valid,
	                    corners: state.corners
	                };
	
	                item.check = state.check;
	                item.mime_type = state.mime_type; // eslint-disable-line camelcase
	
	                return item;
	            });
	
	            _.remove(items, function (n) {
	                return !n;
	            });
	
	            _.remove(messages, function (n) {
	                return !n;
	            });
	
	            return {
	                background: this.state.background,
	                items: items,
	                messages: messages
	            };
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.setState({
	                background: null,
	                items: [],
	                messages: []
	            });
	        }
	    }, {
	        key: 'setItems',
	        value: function setItems(message) {
	            var _this2 = this;
	
	            if (message) {
	                /*
	                 *
	                 * This makes sure the EditableAssets get cleared.
	                 *
	                 * This prevents the new assets from inheriting
	                 * state from the old assets.
	                 *
	                 */
	                this.setState({
	                    background: null,
	                    items: [],
	                    messages: []
	                }, function () {
	                    _this2.addItem(message.background);
	                    message.items.forEach(function (asset) {
	                        _this2.addItem(asset);
	                    });
	                    message.messages.forEach(function (asset) {
	                        _this2.addItem(asset);
	                    });
	                });
	            }
	        }
	    }, {
	        key: 'addItem',
	        value: function addItem(asset, cb) {
	            var _this3 = this;
	
	            var items;
	            var messages;
	            var index;
	            var count;
	
	            if (!asset) return;
	
	            if (asset.asset_type === 'background') {
	                this.setState({
	                    background: asset
	                }, function () {
	                    skoash.trigger('emit', {
	                        name: 'getMedia',
	                        'media_id': asset.media_id
	                    }).then(function (d) {
	                        var background = _this3.state.background;
	                        background.check = d.check;
	                        background.mime_type = d.mime_type; // eslint-disable-line camelcase
	                        _this3.setState({
	                            background: background
	                        }, cb);
	                    });
	                });
	            } else if (asset.asset_type === 'item') {
	                items = this.state.items;
	
	                count = _.reduce(items, function (c, v) {
	                    if (asset.src === v.src) c++;
	                    return c;
	                }, 1);
	
	                if (count > this.props.maxInstances) {
	                    skoash.trigger('openMenu', {
	                        id: 'limitWarning'
	                    });
	                    return;
	                }
	
	                items.push(asset);
	                index = items.indexOf(asset);
	
	                this.setState({
	                    items: items
	                }, function () {
	                    skoash.trigger('emit', {
	                        name: 'getMedia',
	                        'media_id': asset.media_id
	                    }).then(function (d) {
	                        asset.check = d.check;
	                        asset.mime_type = d.mime_type; // eslint-disable-line camelcase
	                        items[index] = asset;
	                        _this3.setState({
	                            items: items
	                        }, cb);
	                    });
	                });
	            } else if (asset.asset_type === 'message') {
	                messages = this.state.messages;
	
	                count = _.reduce(items, function (c, v) {
	                    if (asset.src === v.src) c++;
	                    return c;
	                }, 1);
	
	                if (count > this.props.maxInstances) return;
	
	                messages.push(asset);
	                index = messages.indexOf(asset);
	
	                this.setState({
	                    messages: messages
	                }, function () {
	                    skoash.trigger('emit', {
	                        name: 'getMedia',
	                        'media_id': asset.media_id
	                    }).then(function (d) {
	                        asset.check = d.check;
	                        asset.mime_type = d.mime_type; // eslint-disable-line camelcase
	                        messages[index] = asset;
	                        _this3.setState({
	                            messages: messages
	                        }, cb);
	                    });
	                });
	            }
	        }
	    }, {
	        key: 'deleteItem',
	        value: function deleteItem(key, type) {
	            var items;
	
	            items = this.state[type + 's'];
	            delete items[key];
	
	            this.setState(_defineProperty({}, type + 's', items));
	        }
	    }, {
	        key: 'deactivateItems',
	        value: function deactivateItems(exclude, type) {
	            var _this4 = this;
	
	            if ((typeof exclude === 'undefined' ? 'undefined' : _typeof(exclude)) === 'object' && exclude.target) {
	                if (exclude.target.tagName !== 'LI') return;
	                this.setState({
	                    active: false
	                });
	                if (!this.state.valid) {
	                    skoash.trigger('passData', {
	                        name: 'showCollisionWarning'
	                    });
	                }
	            }
	
	            if (typeof exclude === 'number') {
	                this.setState({
	                    active: true
	                });
	            }
	
	            this.state.items.map(function (item, key) {
	                if ((key !== exclude || type !== 'item') && _this4.refs['item-' + key]) {
	                    _this4.refs['item-' + key].deactivate();
	                }
	            });
	
	            this.state.messages.map(function (item, key) {
	                if ((key !== exclude || type !== 'message') && _this4.refs['message-' + key]) {
	                    _this4.refs['message-' + key].deactivate();
	                }
	            });
	        }
	    }, {
	        key: 'relayerItems',
	        value: function relayerItems(type) {
	            var _this5 = this;
	
	            var layers = [];
	
	            this.state[type + 's'].map(function (item, key) {
	                var layer;
	
	                layer = _this5.refs[type + '-' + key].state.layer;
	
	                if (layers.indexOf(layer) === -1) {
	                    layers.push(layer);
	                }
	            });
	
	            layers.sort(function (a, b) {
	                return a < b;
	            });
	
	            this.state[type + 's'].map(function (item, key) {
	                var oldLayer;
	                var newLayer;
	
	                oldLayer = _this5.refs[type + '-' + key].state.layer;
	                newLayer = type === 'message' ? 10000 : 1000;
	                newLayer = newLayer - layers.indexOf(oldLayer);
	
	                _this5.refs[type + '-' + key].relayer(newLayer);
	            });
	        }
	    }, {
	        key: 'checkItem',
	        value: function checkItem(key, type) {
	            var self = this;
	
	            return !self.refs[type + '-' + key].state.corners.length || self.isInBounds(key, type) && (self.refs[type + '-' + key].state.can_overlap || !self.state[type + 's'].some(function (item, index) {
	                return key !== index && !self.refs[type + '-' + index].state.can_overlap && self.refs[type + '-' + index].state.corners.length && skoash.util.doIntersect(self.refs[type + '-' + key].state.corners, self.refs[type + '-' + index].state.corners);
	            }));
	        }
	    }, {
	        key: 'isInBounds',
	        value: function isInBounds(key, type) {
	            return !this.state.width || !this.state.height || !(
	            // box to left
	            skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: 0, y: -this.state.height }, { x: 0, y: 2 * this.state.height }, { x: -this.state.width, y: 2 * this.state.height }, { x: -this.state.width, y: -this.state.height }]) ||
	            // box above
	            skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: -this.state.width, y: 0 }, { x: 2 * this.state.width, y: 0 }, { x: 2 * this.state.width, y: -this.state.height }, { x: this.state.width, y: -this.state.height }]) ||
	            // box to right
	            skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: this.state.width, y: -this.state.height }, { x: this.state.width, y: 2 * this.state.height }, { x: 2 * this.state.width, y: 2 * this.state.height }, { x: 2 * this.state.width, y: -this.state.height }]) ||
	            // box below
	            skoash.util.doIntersect(this.refs[type + '-' + key].state.corners, [{ x: -this.state.width, y: this.state.height }, { x: 2 * this.state.width, y: this.state.height }, { x: 2 * this.state.width, y: 2 * this.state.height }, { x: -this.state.width, y: 2 * this.state.height }]));
	        }
	    }, {
	        key: 'setValid',
	        value: function setValid(valid) {
	            this.setState({
	                valid: valid
	            });
	
	            this.props.setValid.call(this, valid);
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle() {
	            if (!this.state.background) return;
	
	            return {
	                backgroundImage: 'url(' + this.state.background.src + ')'
	            };
	        }
	    }, {
	        key: 'renderItems',
	        value: function renderItems() {
	            var _this6 = this;
	
	            var self = this;
	
	            return this.state.items.map(function (item, key) {
	                return React.createElement(_3.default, _extends({}, item, {
	                    'data-ref': key,
	                    minDim: _this6.props.itemMinDim,
	                    deleteItem: self.deleteItem,
	                    checkItem: self.checkItem,
	                    deactivateItems: self.deactivateItems,
	                    relayerItems: self.relayerItems,
	                    setValid: self.setValid,
	                    ref: 'item-' + key,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'renderMessages',
	        value: function renderMessages() {
	            var _this7 = this;
	
	            var self = this;
	
	            return this.state.messages.map(function (item, key) {
	                return React.createElement(_3.default, _extends({}, item, {
	                    'data-ref': key,
	                    minDim: _this7.props.messageMinDim,
	                    deleteItem: self.deleteItem,
	                    checkItem: self.checkItem,
	                    deactivateItems: self.deactivateItems,
	                    relayerItems: self.relayerItems,
	                    setValid: self.setValid,
	                    canvasWidth: _this7.state.width,
	                    canvasHeight: _this7.state.height,
	                    ref: 'message-' + key,
	                    key: key
	                }));
	            });
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)({
	                canvas: true,
	                ACTIVE: !this.props.preview && this.state.active
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'ul',
	                {
	                    className: this.getClassNames(),
	                    style: this.getStyle(),
	                    onClick: this.deactivateItems
	                },
	                this.renderItems(),
	                this.renderMessages()
	            );
	        }
	    }]);
	
	    return Canvas;
	}(skoash.Component);
	
	Canvas.defaultProps = _.defaults({
	    maxInstances: 5,
	    setValid: _.noop
	}, skoash.Component.defaultProps);
	
	exports.default = Canvas;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(26);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EditableAsset = function (_Draggable) {
	    _inherits(EditableAsset, _Draggable);
	
	    function EditableAsset() {
	        _classCallCheck(this, EditableAsset);
	
	        var _this = _possibleConstructorReturn(this, (EditableAsset.__proto__ || Object.getPrototypeOf(EditableAsset)).call(this));
	
	        _this.state = {
	            width: 0,
	            height: 0,
	            left: 0,
	            top: 0,
	            scale: .5,
	            minScale: .1,
	            maxScale: 1,
	            rotation: 0,
	            layer: 1000,
	            zoom: 1,
	            active: false,
	            valid: true,
	            corners: [],
	            lastValid: {}
	        };
	
	        _this.scale = _this.scale.bind(_this);
	        _this.adjustScale = _this.adjustScale.bind(_this);
	        _this.offScale = _this.offScale.bind(_this);
	
	        _this.rotate = _this.rotate.bind(_this);
	        _this.adjustRotation = _this.adjustRotation.bind(_this);
	        _this.offRotate = _this.offRotate.bind(_this);
	        return _this;
	    }
	
	    _createClass(EditableAsset, [{
	        key: 'shouldDrag',
	        value: function shouldDrag() {
	            return this.state.active;
	        }
	    }, {
	        key: 'activate',
	        value: function activate() {
	            this.setState({
	                active: true
	            });
	
	            if (typeof this.props.deactivateItems === 'function') {
	                this.props.deactivateItems(this.props['data-ref'], this.props.asset_type);
	            }
	        }
	    }, {
	        key: 'deactivate',
	        value: function deactivate() {
	            var _this2 = this;
	
	            if (!this.state.valid) {
	                this.setState({
	                    left: this.state.lastValid.left || this.state.left,
	                    top: this.state.lastValid.top || this.state.top,
	                    scale: this.state.lastValid.scale || this.state.scale,
	                    rotation: this.state.lastValid.rotation || this.state.rotation,
	                    active: false
	                }, function () {
	                    setTimeout(function () {
	                        _this2.checkItem();
	                    }, 0);
	                });
	            } else {
	                this.setState({
	                    active: false
	                });
	            }
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
	                endY: e.pageY - this.state.grabY,
	                left: (e.pageX - this.state.grabX - this.state.startX) / this.state.zoom,
	                top: (e.pageY - this.state.grabY - this.state.startY) / this.state.zoom
	            });
	            this.checkItem();
	        }
	    }, {
	        key: 'delete',
	        value: function _delete() {
	            if (typeof this.props.deleteItem === 'function') {
	                this.props.deleteItem(this.props['data-ref'], this.props.asset_type);
	            }
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate() {
	            this.refs.el.parentNode.addEventListener('mousemove', this.adjustRotation);
	            this.refs.el.parentNode.addEventListener('mouseup', this.offRotate);
	
	            this.refs.el.parentNode.addEventListener('touchmove', this.adjustRotation);
	            this.refs.el.parentNode.addEventListener('touchend', this.offRotate);
	        }
	    }, {
	        key: 'offRotate',
	        value: function offRotate() {
	            this.refs.el.parentNode.removeEventListener('mousemove', this.adjustRotation);
	            this.refs.el.parentNode.removeEventListener('mouseup', this.offRotate);
	
	            this.refs.el.parentNode.removeEventListener('touchmove', this.adjustRotation);
	            this.refs.el.parentNode.removeEventListener('touchend', this.offRotate);
	        }
	    }, {
	        key: 'adjustRotation',
	        value: function adjustRotation(e) {
	            var rotation;
	            var deltaX;
	            var deltaY;
	
	            if (e.targetTouches && e.targetTouches[0]) {
	                e.pageX = e.targetTouches[0].pageX;
	                e.pageY = e.targetTouches[0].pageY;
	            }
	
	            deltaX = e.pageX / this.state.zoom - this.refs.li.offsetParent.offsetLeft - (this.state.left + this.state.width / 2);
	            deltaY = e.pageY / this.state.zoom - this.refs.li.offsetParent.offsetTop - (this.state.top + this.state.height / 2);
	
	            rotation = Math.atan2(deltaY, deltaX) + Math.PI / 4 % (2 * Math.PI);
	
	            this.setState({
	                rotation: rotation
	            });
	
	            this.checkItem();
	        }
	    }, {
	        key: 'layer',
	        value: function layer() {
	            var layer;
	            var self = this;
	
	            layer = this.state.layer - 1;
	
	            this.setState({
	                layer: layer
	            }, function () {
	                if (typeof self.props.relayerItems === 'function') {
	                    self.props.relayerItems(self.props.asset_type);
	                }
	            });
	        }
	    }, {
	        key: 'relayer',
	        value: function relayer(layer) {
	            this.setState({
	                layer: layer
	            });
	        }
	    }, {
	        key: 'scale',
	        value: function scale() {
	            this.refs.el.parentNode.addEventListener('mousemove', this.adjustScale);
	            this.refs.el.parentNode.addEventListener('mouseup', this.offScale);
	
	            this.refs.el.parentNode.addEventListener('touchmove', this.adjustScale);
	            this.refs.el.parentNode.addEventListener('touchend', this.offScale);
	        }
	    }, {
	        key: 'offScale',
	        value: function offScale() {
	            this.refs.el.parentNode.removeEventListener('mousemove', this.adjustScale);
	            this.refs.el.parentNode.removeEventListener('mouseup', this.offScale);
	
	            this.refs.el.parentNode.removeEventListener('touchmove', this.adjustScale);
	            this.refs.el.parentNode.removeEventListener('touchend', this.offScale);
	        }
	    }, {
	        key: 'adjustScale',
	        value: function adjustScale(e) {
	            var scale;
	            var deltaX;
	            var deltaY;
	            var delta;
	            var base;
	
	            if (e.targetTouches && e.targetTouches[0]) {
	                e.pageX = e.targetTouches[0].pageX;
	                e.pageY = e.targetTouches[0].pageY;
	            }
	
	            deltaX = e.pageX / this.state.zoom - this.refs.li.offsetParent.offsetLeft / this.state.zoom - (this.state.left + this.state.width / 2);
	            deltaY = e.pageY / this.state.zoom - this.refs.li.offsetParent.offsetTop / this.state.zoom - (this.state.top + this.state.height / 2);
	
	            delta = Math.pow(Math.pow(deltaX, 2) + Math.pow(deltaY, 2), .5);
	            base = Math.pow(Math.pow(this.state.width / 2, 2) + Math.pow(this.state.height / 2, 2), .5);
	
	            scale = Math.max(Math.min(delta / base, 1), this.state.minScale);
	
	            this.setState({
	                scale: scale
	            });
	
	            this.checkItem();
	        }
	    }, {
	        key: 'checkItem',
	        value: function checkItem() {
	            var _this3 = this;
	
	            this.setCorners(function () {
	                var valid;
	
	                if (typeof _this3.props.checkItem === 'function') {
	                    valid = _this3.props.checkItem(_this3.props['data-ref'], _this3.props.asset_type);
	
	                    if (valid) {
	                        _this3.setState({
	                            valid: valid,
	                            lastValid: new Object(_this3.state)
	                        });
	                    } else {
	                        _this3.setState({
	                            valid: valid
	                        });
	                    }
	
	                    _this3.props.setValid.call(_this3, valid);
	                }
	            });
	        }
	    }, {
	        key: 'setCorners',
	        value: function setCorners(cb) {
	            var center;
	            var distance;
	            var angle;
	            var corners = [];
	
	            center = {
	                x: this.state.left + this.state.width / 2,
	                y: this.state.top + this.state.height / 2
	            };
	
	            distance = Math.pow(Math.pow(this.state.width * this.state.scale / 2, 2) + Math.pow(this.state.height * this.state.scale / 2, 2), .5);
	
	            for (var i = 0; i < 4; i++) {
	                angle = this.state.rotation;
	                angle += i < 2 ? 0 : Math.PI;
	                angle += Math.pow(-1, i) * Math.atan2(this.state.height, this.state.width);
	
	                corners.push({
	                    x: center.x + distance * Math.cos(angle),
	                    y: center.y + distance * Math.sin(angle)
	                });
	            }
	
	            this.setState({
	                corners: corners
	            }, cb);
	        }
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            var _this4 = this;
	
	            var image;
	            var self = this;
	
	            image = new Image();
	
	            image.onload = function () {
	                var offset;
	                var left;
	                var top;
	                var width;
	                var height;
	                var minDim;
	                var maxDim;
	                var minScale;
	                var maxScale;
	                var scale;
	
	                minDim = _this4.props.minDim || 40;
	                maxDim = _this4.props.maxDim || 400;
	                left = _this4.state.left;
	                top = _this4.state.top;
	                width = image.width;
	                height = image.height;
	
	                minScale = Math.max(minDim / width, minDim / height);
	                maxScale = Math.min(maxDim / width, maxDim / height, _this4.state.maxScale);
	                scale = self.props.state && self.props.state.scale ? self.props.state.scale : Math.max(Math.min(self.state.scale, maxScale), minScale);
	
	                if ((!_this4.state.height || !_this4.state.width) && !_this4.state.left && !_this4.state.top) {
	                    left = (_this4.props.canvasWidth - width) / 2;
	                    top = (_this4.props.canvasHeight - height) / 2;
	                }
	
	                offset = _this4.refs.el.getBoundingClientRect();
	
	                self.setState({
	                    left: left,
	                    top: top,
	                    startX: left * scale - offset.left / _this4.state.zoom,
	                    startY: top * scale - offset.top / _this4.state.zoom,
	                    grabX: width / 2,
	                    grabY: height / 2,
	                    width: width,
	                    height: height,
	                    minScale: minScale,
	                    scale: scale
	                }, function () {
	                    self.activate();
	                    self.checkItem();
	                });
	            };
	
	            image.src = this.props.src;
	        }
	    }, {
	        key: 'getLayer',
	        value: function getLayer() {
	            var layer = 1000;
	
	            if (this.props.state && this.props.state.layer) {
	                layer = this.props.state.layer;
	            } else {
	                switch (this.props.asset_type) {
	                    case 'background':
	                        layer = 1;
	                        break;
	                    case 'message':
	                        layer = 10000;
	                        break;
	                }
	            }
	
	            this.setState({
	                layer: layer
	            });
	        }
	    }, {
	        key: 'attachEvents',
	        value: function attachEvents() {
	            this.refs.scale.addEventListener('mousedown', this.scale);
	            this.refs.rotate.addEventListener('mousedown', this.rotate);
	
	            this.refs.scale.addEventListener('touchstart', this.scale);
	            this.refs.rotate.addEventListener('touchstart', this.rotate);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.bootstrap();
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var _this5 = this;
	
	            _get(EditableAsset.prototype.__proto__ || Object.getPrototypeOf(EditableAsset.prototype), 'bootstrap', this).call(this);
	
	            if (this.props.state) {
	                this.setState(this.props.state);
	            }
	
	            this.getSize();
	            this.getLayer();
	
	            this.attachEvents();
	
	            skoash.trigger('emit', {
	                name: 'getMedia',
	                'media_id': this.props.media_id
	            }).then(function (d) {
	                _this5.setState(d, function () {
	                    _this5.checkItem();
	                });
	            });
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.attachEvents();
	        }
	    }, {
	        key: 'getButtonStyle',
	        value: function getButtonStyle() {
	            var extraRotation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	            var style;
	            var transform = '';
	
	            transform += 'scale(' + 1 / this.state.scale + ') ';
	            transform += 'rotate(' + (-this.state.rotation - extraRotation) + 'rad) ';
	
	            style = {
	                transform: transform
	            };
	
	            return style;
	        }
	    }, {
	        key: 'getAssetStyle',
	        value: function getAssetStyle() {
	            var style;
	            var transform = '';
	
	            transform += 'scale(' + this.state.scale + ') ';
	            transform += 'rotate(' + this.state.rotation + 'rad) ';
	
	            style = {
	                backgroundImage: 'url("' + this.props.src + '")',
	                width: this.state.width,
	                height: this.state.height,
	                left: this.state.left,
	                top: this.state.top,
	                transform: transform,
	                zIndex: this.state.layer
	            };
	
	            return style;
	        }
	    }, {
	        key: 'getButtonsStyle',
	        value: function getButtonsStyle() {
	            var style;
	            var transform = '';
	
	            transform += 'scale(' + this.state.scale + ') ';
	            transform += 'rotate(' + this.state.rotation + 'rad) ';
	
	            style = {
	                width: this.state.width,
	                height: this.state.height,
	                left: this.state.left,
	                top: this.state.top,
	                transform: transform
	            };
	
	            return style;
	        }
	    }, {
	        key: 'getClasses',
	        value: function getClasses() {
	            return (0, _classnames2.default)({
	                DRAGGING: this.state.dragging,
	                RETURN: this.state.return,
	                ACTIVE: this.state.active,
	                INVALID: !this.state.valid
	            }, 'editable-asset', this.props.asset_type);
	        }
	    }, {
	        key: 'renderAsset',
	        value: function renderAsset() {
	            return React.createElement('div', {
	                ref: 'el',
	                className: 'asset',
	                style: this.getAssetStyle()
	            });
	        }
	    }, {
	        key: 'renderButtons',
	        value: function renderButtons() {
	            return React.createElement(
	                'div',
	                {
	                    className: 'buttons',
	                    style: this.getButtonsStyle()
	                },
	                React.createElement('button', {
	                    className: 'delete',
	                    style: this.getButtonStyle(),
	                    onClick: this.delete.bind(this)
	                }),
	                React.createElement('button', {
	                    ref: 'rotate',
	                    className: 'rotate',
	                    style: this.getButtonStyle()
	                }),
	                React.createElement('button', {
	                    className: 'layer',
	                    onClick: this.layer.bind(this),
	                    style: this.getButtonStyle()
	                }),
	                React.createElement('button', {
	                    ref: 'scale',
	                    className: 'scale',
	                    style: this.getButtonStyle(1.5708)
	                })
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'li',
	                {
	                    ref: 'li',
	                    className: this.getClasses(),
	                    onClick: this.activate.bind(this)
	                },
	                this.renderAsset(),
	                this.renderButtons()
	            );
	        }
	    }]);
	
	    return EditableAsset;
	}(_3.default);
	
	EditableAsset.defaultProps = _.defaults({
	    canvasWidth: 1280,
	    canvasHeight: 720,
	    setValid: _.identity
	}, _3.default.defaultProps);
	
	exports.default = EditableAsset;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(20);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _2 = __webpack_require__(21);
	
	var _3 = _interopRequireDefault(_2);
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = function (_Selectable) {
	    _inherits(Menu, _Selectable);
	
	    function Menu() {
	        _classCallCheck(this, Menu);
	
	        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));
	
	        _this.state = {
	            active: false,
	            selectClass: 'SELECTED',
	            classes: {}
	        };
	        return _this;
	    }
	
	    _createClass(Menu, [{
	        key: 'deactivate',
	        value: function deactivate() {
	            this.setState({
	                active: false
	            });
	
	            _.each(this.refs, function (ref) {
	                _.invoke(ref, 'deactivate');
	            });
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(e) {
	            var li;
	            var ul;
	            var dom;
	            var message;
	            var active = false;
	            var classes = [];
	
	            li = e.target.closest('LI');
	
	            if (!li) return;
	
	            ul = li.closest('UL');
	            dom = ReactDOM.findDOMNode(this); // eslint-disable-line no-undef
	
	            if (ul !== dom) return;
	
	            message = li.getAttribute('data-ref');
	
	            if (this.state.classes[message] !== this.state.selectClass) {
	                classes[message] = this.state.selectClass;
	                active = !this.props.inactive;
	            }
	
	            this.setState({
	                classes: classes,
	                active: active
	            });
	        }
	    }, {
	        key: 'renderItems',
	        value: function renderItems() {
	            var _this2 = this;
	
	            var self = this;
	
	            if (_typeof(this.props.items) !== 'object') return;
	
	            return Object.keys(this.props.items).map(function (key) {
	                var item;
	                var onClick;
	                var gotoObj;
	                var categories;
	                var isFinal;
	
	                categories = _this2.props.categories ? [].concat(_this2.props.categories) : [];
	                categories.push(key);
	
	                item = _this2.props.items[key];
	
	                isFinal = _typeof(item.items) !== 'object' || Object.prototype.toString.call(item.items) === '[object Array]' && item.items[0] && !item.items[0].items || typeof self.props.lastLevel === 'number' && self.props.lastLevel === self.props.level;
	
	                if (isFinal) {
	                    gotoObj = {
	                        index: 'item-drawer',
	                        categories: categories,
	                        categoryName: item.name
	                    };
	                    onClick = skoash.trigger.bind(null, 'goto', gotoObj);
	                }
	
	                return React.createElement(
	                    skoash.ListItem,
	                    {
	                        className: self.getClass(key),
	                        'data-ref': key,
	                        ref: key,
	                        key: key,
	                        onClick: onClick
	                    },
	                    React.createElement(
	                        'span',
	                        null,
	                        item.name || key
	                    ),
	                    function () {
	                        if (isFinal) return;
	                        return React.createElement(Menu, {
	                            ref: 'menu-' + key,
	                            categories: categories,
	                            items: item.items,
	                            inactive: true,
	                            level: (self.props.level || 0) + 1,
	                            lastLevel: self.props.lastLevel
	                        });
	                    }()
	                );
	            });
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(key) {
	            var _classNames;
	
	            return (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, key.replace(' ', '-'), true), _defineProperty(_classNames, this.state.classes[key] || '', true), _classNames));
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)({
	                menu: true,
	                ACTIVE: this.state.active
	            }, this.props.className);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'ul',
	                {
	                    className: this.getClassNames(),
	                    onClick: this.onClick.bind(this)
	                },
	                this.renderItems()
	            );
	        }
	    }]);
	
	    return Menu;
	}(_3.default);
	
	exports.default = Menu;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (props, ref, key) {
	    return React.createElement(ItemDrawerScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'item-drawer',
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	var _2 = __webpack_require__(10);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ItemDrawerScreen = function (_skoash$Screen) {
	    _inherits(ItemDrawerScreen, _skoash$Screen);
	
	    function ItemDrawerScreen(props) {
	        _classCallCheck(this, ItemDrawerScreen);
	
	        var _this = _possibleConstructorReturn(this, (ItemDrawerScreen.__proto__ || Object.getPrototypeOf(ItemDrawerScreen)).call(this, props));
	
	        _this.state = {
	            load: true,
	            opts: {
	                categories: []
	            }
	        };
	
	        return _this;
	    }
	
	    _createClass(ItemDrawerScreen, [{
	        key: 'selectRespond',
	        value: function selectRespond(message) {
	            skoash.trigger('passData', {
	                name: 'add-item',
	                message: message
	            });
	        }
	    }, {
	        key: 'updateData',
	        value: function updateData(d) {
	            var data = d ? d : this.props.gameState.data.menu.items;
	
	            this.state.opts.categories.forEach(function (key) {
	                if (data[key]) data = data[key];
	                if (data.items) data = data.items;
	            });
	
	            data = _.values(data);
	
	            this.setState({
	                data: data
	            });
	        }
	    }, {
	        key: 'open',
	        value: function open(opts) {
	            var _this2 = this;
	
	            this.setState({
	                load: true,
	                open: true,
	                leave: false,
	                close: false,
	                opts: opts,
	                data: null
	            }, function () {
	                _this2.updateData();
	            });
	
	            setTimeout(function () {
	                if (!_this2.state.started) _this2.start();
	            }, 250);
	        }
	    }, {
	        key: 'cancelRespond',
	        value: function cancelRespond() {
	            if (this.state.category) {
	                this.setState({
	                    category: '',
	                    categoryName: ''
	                });
	            } else {
	                skoash.trigger('goto', { index: 'canvas' });
	            }
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(_3.default, {
	                    ref: 'drawer',
	                    scrollbarImg: CMWN.MEDIA.IMAGE + 'sk-btn-slider.png',
	                    selectRespond: this.selectRespond.bind(this),
	                    cancelRespond: this.cancelRespond,
	                    categories: this.state.opts.categories,
	                    categoryName: this.state.opts.categoryName,
	                    data: this.state.data
	                })
	            );
	        }
	    }]);
	
	    return ItemDrawerScreen;
	}(skoash.Screen);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (props, ref, key) {
	    return React.createElement(InboxScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'inbox',
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	var _ = __webpack_require__(30);
	
	var _2 = _interopRequireDefault(_);
	
	var _3 = __webpack_require__(32);
	
	var _4 = _interopRequireDefault(_3);
	
	var _5 = __webpack_require__(33);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var inboxEmptyMessage = React.createElement(
	    'span',
	    null,
	    'You haven\'t received any Skribbles!',
	    React.createElement('br', null),
	    'Get started by sending some!'
	);
	var unreadEmptyMessage = React.createElement(
	    'span',
	    null,
	    'You don\'t have any',
	    React.createElement('br', null),
	    'unread Skribbles!'
	);
	var readEmptyMessage = React.createElement(
	    'span',
	    null,
	    'You don\'t have any',
	    React.createElement('br', null),
	    'read Skribbles!'
	);
	var sentEmptyMessage = React.createElement(
	    'span',
	    null,
	    'You haven\'t sent any Skribbles.',
	    React.createElement('br', null),
	    'Let\'s get started!'
	);
	var draftsEmptyMessage = React.createElement(
	    'span',
	    null,
	    'You don\'t have any drafts.',
	    React.createElement('br', null),
	    'Start Skribbling!'
	);
	
	var InboxScreen = function (_skoash$Screen) {
	    _inherits(InboxScreen, _skoash$Screen);
	
	    function InboxScreen(props) {
	        _classCallCheck(this, InboxScreen);
	
	        var _this = _possibleConstructorReturn(this, (InboxScreen.__proto__ || Object.getPrototypeOf(InboxScreen)).call(this, props));
	
	        _this.state = {
	            load: true
	        };
	
	        _this.selectableList = [React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null), React.createElement('li', null)];
	
	        _this.revealList = _this.getRevealList();
	
	        _this.readMessage = _this.readMessage.bind(_this);
	        _this.editMessage = _this.editMessage.bind(_this);
	        return _this;
	    }
	
	    _createClass(InboxScreen, [{
	        key: 'getRevealList',
	        value: function getRevealList(inbox, outbox, saved) {
	            var read;
	            var unread;
	            var props = this.props || {};
	
	            inbox = inbox || this.state.inbox || [];
	
	            read = inbox.filter(function (item) {
	                return item.read;
	            });
	
	            unread = inbox.filter(function (item) {
	                return !item.read;
	            });
	
	            outbox = outbox || this.state.outbox || [];
	            saved = saved || this.state.saved || [];
	
	            return [React.createElement(
	                'li',
	                null,
	                React.createElement(_4.default, {
	                    'data-ref': 'inbox',
	                    data: {
	                        items: inbox
	                    },
	                    emptyMessage: inboxEmptyMessage,
	                    selectRespond: this.readMessage,
	                    gameState: props.gameState
	                })
	            ), React.createElement(
	                'li',
	                null,
	                React.createElement(_4.default, {
	                    'data-ref': 'unread',
	                    data: {
	                        items: unread
	                    },
	                    emptyMessage: unreadEmptyMessage,
	                    selectRespond: this.readMessage,
	                    gameState: props.gameState
	                })
	            ), React.createElement(
	                'li',
	                null,
	                React.createElement(_4.default, {
	                    'data-ref': 'read',
	                    data: {
	                        items: read
	                    },
	                    emptyMessage: readEmptyMessage,
	                    selectRespond: this.readMessage,
	                    gameState: props.gameState
	                })
	            ), React.createElement(
	                'li',
	                null,
	                React.createElement(_4.default, {
	                    'data-ref': 'outbox',
	                    data: {
	                        items: outbox
	                    },
	                    emptyMessage: sentEmptyMessage,
	                    friendKey: 'friend_to',
	                    selectRespond: this.readMessage,
	                    gameState: props.gameState
	                })
	            ), React.createElement(
	                'li',
	                null,
	                React.createElement(_6.default, {
	                    'data-ref': 'saved',
	                    data: {
	                        items: saved
	                    },
	                    emptyMessage: draftsEmptyMessage,
	                    selectRespond: this.editMessage
	                })
	            )];
	        }
	    }, {
	        key: 'editMessage',
	        value: function editMessage(message) {
	            skoash.trigger('loadSkribble', {
	                message: message
	            });
	        }
	    }, {
	        key: 'readMessage',
	        value: function readMessage(message) {
	            skoash.trigger('goto', {
	                index: 'read',
	                message: message
	            });
	        }
	    }, {
	        key: 'updateData',
	        value: function updateData() {
	            var skribbles;
	            var inbox;
	            var outbox;
	            var saved;
	
	            skribbles = this.props.gameState.data.skribbles;
	            inbox = skribbles.received;
	            outbox = skribbles.sent;
	            saved = skribbles.draft;
	
	            this.revealList = this.getRevealList(inbox, outbox, saved);
	
	            this.setState({
	                inbox: inbox,
	                outbox: outbox,
	                saved: saved
	            });
	        }
	    }, {
	        key: 'updateGameData',
	        value: function updateGameData(data, status) {
	            var _this2 = this;
	
	            var opts = {
	                path: ['skribbles'],
	                data: _defineProperty({}, status, data.skribble),
	                callback: function callback() {
	                    _this2.updateData();
	                }
	            };
	            this.updateGameState(opts);
	        }
	    }, {
	        key: 'open',
	        value: function open() {
	            var self = this;
	
	            skoash.trigger('getData', {
	                status: 'received'
	            }).then(function (data) {
	                self.updateGameData(data, 'received');
	            });
	
	            skoash.trigger('getData', {
	                status: 'sent'
	            }).then(function (data) {
	                self.updateGameData(data, 'sent');
	            });
	
	            skoash.trigger('getData', {
	                status: 'draft'
	            }).then(function (data) {
	                self.updateGameData(data, 'draft');
	            });
	
	            self.setState({
	                load: true,
	                open: true,
	                leave: false,
	                close: false
	            });
	
	            setTimeout(function () {
	                if (!self.state.started) {
	                    self.start();
	                }
	            }, 250);
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'center' },
	                    React.createElement(
	                        'div',
	                        { className: 'frame' },
	                        React.createElement(_2.default, {
	                            ref: 'selectableReveal',
	                            selectableList: this.selectableList,
	                            revealList: this.revealList,
	                            selectOnStart: '0',
	                            openOnStart: '0'
	                        })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return InboxScreen;
	}(skoash.Screen);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _2 = __webpack_require__(21);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(31);
	
	var _5 = _interopRequireDefault(_4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SelectableReveal = function (_skoash$Component) {
	    _inherits(SelectableReveal, _skoash$Component);
	
	    function SelectableReveal() {
	        _classCallCheck(this, SelectableReveal);
	
	        return _possibleConstructorReturn(this, (SelectableReveal.__proto__ || Object.getPrototypeOf(SelectableReveal)).call(this));
	    }
	
	    _createClass(SelectableReveal, [{
	        key: 'start',
	        value: function start() {
	            _get(SelectableReveal.prototype.__proto__ || Object.getPrototypeOf(SelectableReveal.prototype), 'start', this).call(this);
	            this.setState({
	                canSelectOnStart: this.props.canSelectOnStart
	            });
	        }
	    }, {
	        key: 'open',
	        value: function open(message) {
	            this.refs.reveal.open(message);
	        }
	    }, {
	        key: 'selectRespond',
	        value: function selectRespond(message) {
	            if (this.props.answers.length) {
	                if (this.props.answers.indexOf(message) === -1) {
	                    this.playMedia('incorrect');
	                    if (this.props.revealAll) {
	                        if (typeof this.refs.reveal.open === 'function') {
	                            this.open(message);
	                        }
	                    }
	                } else {
	                    this.playMedia('correct');
	                    if (typeof this.refs.reveal.open === 'function') {
	                        this.open(message);
	                    }
	                }
	            } else {
	                if (this.props.allCorrect) this.playMedia('correct');
	                if (typeof this.refs.reveal.open === 'function') {
	                    this.open(message);
	                }
	            }
	        }
	    }, {
	        key: 'closeRespond',
	        value: function closeRespond() {
	            if (typeof this.props.closeRespond === 'function') {
	                this.props.closeRespond();
	            }
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
	        key: 'renderSelectable',
	        value: function renderSelectable() {
	            return React.createElement(_3.default, {
	                ref: 'selectable',
	                list: this.props.selectableList,
	                selectRespond: this.selectRespond.bind(this),
	                selectClass: this.props.selectableSelectClass,
	                completeOnSelect: this.props.selectableCompleteOnSelect,
	                checkComplete: this.props.selectableCheckComplete,
	                randomizeList: this.props.randomizeSelectableList,
	                selectOnStart: this.props.selectOnStart,
	                chooseOne: this.props.chooseOne,
	                answers: this.props.answers,
	                allowDeselect: this.props.allowDeselect
	            });
	        }
	    }, {
	        key: 'renderReveal',
	        value: function renderReveal() {
	            return React.createElement(_5.default, {
	                ref: 'reveal',
	                list: this.props.revealList,
	                assets: this.props.revealAssets,
	                closeRespond: this.closeRespond.bind(this),
	                completeOnOpen: this.props.revealCompleteOnOpen,
	                checkComplete: this.props.revealCheckComplete,
	                openOnStart: this.props.openOnStart,
	                hide: this.props.hideReveal,
	                openReveal: this.props.openReveal,
	                onOpen: this.props.onOpen,
	                openMultiple: false
	            });
	        }
	    }, {
	        key: 'getClasses',
	        value: function getClasses() {
	            var classes = '';
	
	            if (this.state.complete) classes += ' COMPLETE';
	
	            return classes;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'selectable-reveal' + this.getClasses() },
	                this.renderAssets(),
	                this.renderSelectable(),
	                this.renderReveal()
	            );
	        }
	    }]);
	
	    return SelectableReveal;
	}(skoash.Component);
	
	SelectableReveal.defaultProps = _.defaults({
	    answers: [],
	    canSelectOnStart: true
	}, skoash.Component.defaultProps);
	
	exports.default = SelectableReveal;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(20);
	
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
	                _this2.playMedia('asset-' + audio);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(21);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Inbox = function (_Selectable) {
	    _inherits(Inbox, _Selectable);
	
	    function Inbox() {
	        _classCallCheck(this, Inbox);
	
	        return _possibleConstructorReturn(this, (Inbox.__proto__ || Object.getPrototypeOf(Inbox)).call(this));
	    }
	
	    _createClass(Inbox, [{
	        key: 'selectHelper',
	        value: function selectHelper(e) {
	            var li;
	            var message;
	            var key;
	            var classes = [];
	
	            li = e.target.closest('LI');
	
	            if (!li) return;
	
	            key = li.getAttribute('data-ref');
	
	            if (!this.refs[key]) return;
	
	            message = this.refs[key].props.item;
	            classes[key] = this.props.selectClass;
	
	            this.setState({
	                message: message,
	                classes: classes
	            });
	
	            if (message.status !== 'COMPLETE') return;
	
	            if (typeof this.props.selectRespond === 'function' && message) {
	                this.props.selectRespond(message);
	            }
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(key, read) {
	            return (0, _classnames2.default)(this.state.classes[key], {
	                UNREAD: this.props.friendKey === 'created_by' && !read,
	                SENT: this.props.friendKey !== 'created_by'
	            });
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)({
	                'item-drawer': true,
	                COMPLETE: this.state.complete
	            }, this.props.className);
	        }
	    }, {
	        key: 'getStatusText',
	        value: function getStatusText(item) {
	            if (!item.status || item.status === 'COMPLETE') return '';
	            return item.status;
	        }
	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            var _this2 = this;
	
	            var items;
	            var friends;
	
	            if (!this.props.data || !this.props.data.items) return;
	
	            items = this.props.data.items;
	
	            if (!items.length) {
	                return React.createElement(
	                    'li',
	                    { className: 'empty' },
	                    this.props.emptyMessage
	                );
	            }
	
	            friends = _.get(this.props.gameState, 'data.user', []);
	
	            return _.map(items, function (item, key) {
	                var timestamp;
	                var image;
	                var name;
	                timestamp = moment.utc(item.updated).local();
	                key = 'message-' + key;
	
	                if (item[_this2.props.friendKey] == null) return null;
	
	                _.each(friends, function (friend) {
	                    if (item[_this2.props.friendKey] === friend.friend_id) {
	                        image = friend._embedded.image ? friend._embedded.image.url : '';
	                        name = friend.username;
	                    }
	                });
	
	                if (!name) {
	                    skoash.trigger('getData', {
	                        name: 'getFriend',
	                        'friend_id': item[_this2.props.friendKey]
	                    });
	                    name = '';
	                }
	
	                if (_this2.props.friendKey === 'friend_to') {
	                    item.sent = true;
	                }
	
	                return React.createElement(
	                    skoash.ListItem,
	                    {
	                        className: _this2.getClass(key, item.read),
	                        ref: key,
	                        'data-ref': key,
	                        item: item,
	                        key: key
	                    },
	                    React.createElement(skoash.Image, { src: image }),
	                    React.createElement(
	                        'span',
	                        { className: 'username' + (name.length > 15 ? ' long' : '') },
	                        name
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'timestamp' },
	                        React.createElement(
	                            'span',
	                            { className: 'date' },
	                            timestamp.format('MM.DD.YY')
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'time' },
	                            timestamp.format('h:mm a')
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'status ' + item.status },
	                        _this2.getStatusText(item)
	                    )
	                );
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'ul',
	                    { className: this.getClassNames(), onClick: this.state.selectFunction.bind(this) },
	                    this.renderList()
	                )
	            );
	        }
	    }]);
	
	    return Inbox;
	}(_3.default);
	
	Inbox.defaultProps = _.defaults({
	    friendKey: 'created_by',
	    gameState: {}
	}, _3.default.defaultProps);
	
	exports.default = Inbox;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ = __webpack_require__(21);
	
	var _2 = _interopRequireDefault(_);
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SavedMessages = function (_Selectable) {
	    _inherits(SavedMessages, _Selectable);
	
	    function SavedMessages() {
	        _classCallCheck(this, SavedMessages);
	
	        return _possibleConstructorReturn(this, (SavedMessages.__proto__ || Object.getPrototypeOf(SavedMessages)).call(this));
	    }
	
	    _createClass(SavedMessages, [{
	        key: 'selectHelper',
	        value: function selectHelper(e) {
	            var li;
	            var message;
	            var key;
	            var classes = [];
	
	            li = e.target.closest('LI');
	
	            if (!li) return;
	
	            key = li.getAttribute('data-ref');
	
	            message = this.refs[key].props.item;
	            classes[key] = this.state.selectClass;
	
	            this.setState({
	                message: message,
	                classes: classes
	            }, this.selectRespond.bind(this));
	        }
	    }, {
	        key: 'selectRespond',
	        value: function selectRespond() {
	            if (typeof this.props.selectRespond === 'function' && this.state.message) {
	                this.props.selectRespond(this.state.message);
	            }
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass(key) {
	            var _classNames;
	
	            return (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.state.classes[key] || '', true), _defineProperty(_classNames, 'DRAFT', true), _classNames));
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames() {
	            return (0, _classnames2.default)({
	                'item-drawer': true,
	                SAVED: true,
	                COMPLETE: this.state.complete
	            }, this.props.className);
	        }
	    }, {
	        key: 'renderThumb',
	        value: function renderThumb(item) {
	            var firstImg;
	            var background;
	
	            background = item && item.rules && item.rules.background && item.rules.background.src ? item.rules.background.src : '';
	
	            firstImg = item && item.rules && item.rules.items && item.rules.items[0] && item.rules.items[0].src ? item.rules.items[0].src : item && item.rules && item.rules.messages && item.rules.messages[0] && item.rules.messages[0].src ? item.rules.messages[0].src : '';
	
	            return React.createElement(
	                'div',
	                {
	                    className: 'thumbnail',
	                    style: {
	                        backgroundImage: 'url(' + background + ')'
	                    }
	                },
	                React.createElement(skoash.Image, { src: firstImg })
	            );
	        }
	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            var items;
	            var self = this;
	
	            if (!self.props.data || !self.props.data.items) return;
	
	            items = self.props.data.items;
	
	            if (!items.length) {
	                return React.createElement(
	                    'li',
	                    { className: 'empty' },
	                    this.props.emptyMessage
	                );
	            }
	
	            return items.map(function (item, key) {
	                var timestamp = moment.utc(item.updated).local();
	                return React.createElement(
	                    skoash.ListItem,
	                    {
	                        className: self.getClass(key),
	                        ref: key,
	                        'data-ref': key,
	                        item: item,
	                        key: key
	                    },
	                    self.renderThumb(item),
	                    React.createElement(
	                        'span',
	                        { className: 'timestamp' },
	                        React.createElement(
	                            'span',
	                            { className: 'date' },
	                            timestamp.format('MM.DD.YY')
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'time' },
	                            timestamp.format('h:mm a')
	                        )
	                    )
	                );
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'ul',
	                    { className: this.getClassNames(), onClick: this.state.selectFunction.bind(this) },
	                    this.renderList()
	                )
	            );
	        }
	    }]);
	
	    return SavedMessages;
	}(_2.default);
	
	exports.default = SavedMessages;

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
	
	exports.default = function (props, ref, key) {
	    return React.createElement(PreviewScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'preview',
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	var _ = __webpack_require__(24);
	
	var _2 = _interopRequireDefault(_);
	
	var _3 = __webpack_require__(21);
	
	var _4 = _interopRequireDefault(_3);
	
	var _5 = __webpack_require__(35);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var classNameText = {
	    skribbleBox: 'skribble-box',
	    box: 'box',
	    leftMenu: 'menu left-menu',
	    rightMenu: 'menu right-menu'
	};
	
	var refs = {
	    box: 'box',
	    canvas: 'canvas'
	};
	
	var PreviewScreen = function (_skoash$Screen) {
	    _inherits(PreviewScreen, _skoash$Screen);
	
	    function PreviewScreen(props) {
	        _classCallCheck(this, PreviewScreen);
	
	        var _this = _possibleConstructorReturn(this, (PreviewScreen.__proto__ || Object.getPrototypeOf(PreviewScreen)).call(this, props));
	
	        _this.state = {
	            load: true,
	            opts: {}
	        };
	
	        _this.leftMenuList = [React.createElement(
	            'li',
	            { className: 'edit', onClick: _this.goto.bind(_this, 'canvas') },
	            React.createElement('span', null)
	        )];
	
	        _this.rightMenuList = [React.createElement(
	            'li',
	            { className: 'send', onClick: _this.goto.bind(_this, 'send') },
	            React.createElement('span', null)
	        )];
	        return _this;
	    }
	
	    _createClass(PreviewScreen, [{
	        key: 'open',
	        value: function open(opts) {
	            var _this2 = this;
	
	            skoash.trigger('getRules').then(function (rules) {
	                _this2.refs[refs.box].refs[refs.canvas].setItems(rules);
	                _get(PreviewScreen.prototype.__proto__ || Object.getPrototypeOf(PreviewScreen.prototype), 'open', _this2).call(_this2, opts);
	            });
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(skoash.Audio, { ref: 'start', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'PreviewOpen.mp3' }),
	                React.createElement(
	                    skoash.Component,
	                    { ref: refs.box, className: classNameText.skribbleBox },
	                    React.createElement(_2.default, { ref: refs.canvas, preview: true }),
	                    React.createElement(_6.default, {
	                        className: 'sparkles',
	                        amount: 40
	                    }),
	                    React.createElement('div', { className: classNameText.box })
	                ),
	                React.createElement(_4.default, { className: classNameText.leftMenu, list: this.leftMenuList }),
	                React.createElement(_4.default, { className: classNameText.rightMenu, list: this.rightMenuList })
	            );
	        }
	    }]);
	
	    return PreviewScreen;
	}(skoash.Screen);

/***/ },
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (props, ref, key) {
	    return React.createElement(SendScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'send',
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	var _ = __webpack_require__(21);
	
	var _2 = _interopRequireDefault(_);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var classNameText = {
	    yourMessageTo: 'your-message-to',
	    isReady: 'is-ready',
	    changeFriend: 'change-friend',
	    character: 'character',
	    gift: 'gift',
	    header: 'header',
	    username: 'username'
	};
	
	var SendScreen = function (_skoash$Screen) {
	    _inherits(SendScreen, _skoash$Screen);
	
	    function SendScreen(props) {
	        _classCallCheck(this, SendScreen);
	
	        var _this = _possibleConstructorReturn(this, (SendScreen.__proto__ || Object.getPrototypeOf(SendScreen)).call(this, props));
	
	        _this.state.load = true;
	        _this.state.recipient = {};
	
	        _this.rightMenuList = [React.createElement(
	            'li',
	            { className: 'edit-right', onClick: _this.goto.bind(_this, 'canvas') },
	            React.createElement('span', null)
	        ), React.createElement(
	            'li',
	            { className: 'send', onClick: _this.send },
	            React.createElement('span', null)
	        )];
	        return _this;
	    }
	
	    _createClass(SendScreen, [{
	        key: 'open',
	        value: function open() {
	            var recipient = this.props.gameState.recipient || {};
	
	            this.setState({
	                load: true,
	                open: true,
	                leave: false,
	                close: false,
	                recipient: recipient
	            });
	
	            this.start();
	        }
	    }, {
	        key: 'send',
	        value: function send() {
	            skoash.trigger('passData', {
	                name: 'send'
	            });
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            var changeFriendClick = this.goto.bind(this, {
	                index: 'friend',
	                goto: 'send'
	            });
	
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: classNameText.header },
	                    React.createElement('span', { className: classNameText.yourMessageTo }),
	                    React.createElement(
	                        'span',
	                        { className: classNameText.username },
	                        this.state.recipient.name
	                    ),
	                    React.createElement('br', null),
	                    React.createElement('span', { className: classNameText.isReady }),
	                    React.createElement('button', { className: classNameText.changeFriend, onClick: changeFriendClick })
	                ),
	                React.createElement(
	                    'div',
	                    { className: classNameText.character },
	                    React.createElement(skoash.Image, { className: 'otter', src: CMWN.MEDIA.SPRITE + 'proud-of-you-2.gif' }),
	                    React.createElement(
	                        'div',
	                        { className: 'bubble' },
	                        'Are you sure',
	                        React.createElement('br', null),
	                        'you are ready to',
	                        React.createElement('br', null),
	                        'send your message?'
	                    )
	                ),
	                React.createElement('div', { className: classNameText.gift }),
	                React.createElement(_2.default, { className: 'menu right-menu', list: this.rightMenuList })
	            );
	        }
	    }]);
	
	    return SendScreen;
	}(skoash.Screen);

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (props, ref, key) {
	    return React.createElement(SentScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'sent',
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var classNameText = {
	    character: 'character',
	    header: 'header',
	    yourMessageTo: 'your-message-to',
	    username: 'username',
	    isReady: 'is-ready',
	    buttons: 'buttons',
	    createAnother: 'create-another',
	    inbox: 'inbox'
	};
	
	var text = {
	    yourMessageTo: 'YOUR MESSAGE TO:',
	    hasBeenSent: 'IS BEING SENT!'
	};
	
	var SentScreen = function (_skoash$Screen) {
	    _inherits(SentScreen, _skoash$Screen);
	
	    function SentScreen(props) {
	        _classCallCheck(this, SentScreen);
	
	        var _this = _possibleConstructorReturn(this, (SentScreen.__proto__ || Object.getPrototypeOf(SentScreen)).call(this, props));
	
	        _this.state = {
	            load: true,
	            opts: {
	                recipient: {}
	            }
	        };
	        return _this;
	    }
	
	    _createClass(SentScreen, [{
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(skoash.Audio, { ref: 'start', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SendSkribble.mp3' }),
	                React.createElement('div', { className: classNameText.character }),
	                React.createElement(
	                    'div',
	                    { className: classNameText.header },
	                    React.createElement(
	                        'span',
	                        { className: classNameText.yourMessageTo },
	                        text.yourMessageTo
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: classNameText.username },
	                        this.state.opts.recipient.name
	                    ),
	                    React.createElement('br', null),
	                    React.createElement(
	                        'span',
	                        { className: classNameText.isReady },
	                        text.hasBeenSent
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: classNameText.buttons },
	                    React.createElement('button', {
	                        className: classNameText.createAnother,
	                        onClick: this.goto.bind(this, 'friend')
	                    }),
	                    React.createElement('button', {
	                        className: classNameText.inbox,
	                        onClick: this.goto.bind(this, 'inbox')
	                    })
	                )
	            );
	        }
	    }]);
	
	    return SentScreen;
	}(skoash.Screen);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (props, ref, key) {
	    return React.createElement(ReadScreen, _extends({}, props, {
	        ref: ref,
	        key: key,
	        id: 'read',
	        hideNext: true,
	        hidePrev: true
	    }));
	};
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _2 = __webpack_require__(21);
	
	var _3 = _interopRequireDefault(_2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var classNameText = {
	    skribbleBox: 'skribble-box',
	    box: 'box',
	    leftMenu: 'menu left-menu',
	    rightMenu: 'menu right-menu',
	    sender: 'menu recipient sender'
	};
	
	var refs = {
	    box: 'box'
	};
	
	var ReadScreen = function (_skoash$Screen) {
	    _inherits(ReadScreen, _skoash$Screen);
	
	    function ReadScreen(props) {
	        _classCallCheck(this, ReadScreen);
	
	        var _this = _possibleConstructorReturn(this, (ReadScreen.__proto__ || Object.getPrototypeOf(ReadScreen)).call(this, props));
	
	        _this.state.load = true;
	        _this.state.message = { user: {} };
	
	        _this.leftMenuList = [React.createElement(
	            'li',
	            { className: 'inbox', onClick: _this.goto.bind(_this, 'inbox') },
	            React.createElement('span', null)
	        )];
	
	        _this.rightMenuList = [React.createElement(
	            'li',
	            { className: 'reply', onClick: _this.reply.bind(_this) },
	            React.createElement('span', null)
	        )];
	        return _this;
	    }
	
	    _createClass(ReadScreen, [{
	        key: 'reply',
	        value: function reply() {
	            skoash.trigger('passData', {
	                name: 'add-recipient',
	                message: this.state.message.created_by
	            });
	        }
	    }, {
	        key: 'open',
	        value: function open(opts) {
	            var message;
	            var friends;
	            var creater;
	
	            message = opts.message || {};
	
	            friends = this.props.gameState.data.user || [];
	            friends.forEach(function (friend) {
	                if (message.created_by === friend.friend_id) {
	                    creater = friend;
	                }
	            });
	
	            this.setState({
	                load: true,
	                open: true,
	                leave: false,
	                close: false,
	                message: message,
	                creater: creater
	            });
	
	            this.start();
	
	            skoash.trigger('getData', {
	                name: 'markAsRead',
	                'skribble_id': message.skribble_id
	            });
	        }
	    }, {
	        key: 'getSenderClassNames',
	        value: function getSenderClassNames() {
	            return (0, _classnames2.default)(classNameText.sender, {
	                HIDE: !this.state.creater || this.state.message.sent
	            });
	        }
	    }, {
	        key: 'renderSender',
	        value: function renderSender() {
	            var creater;
	            var content = [];
	
	            creater = this.state.creater;
	
	            if (!creater) return;
	
	            if (creater.username) {
	                content.push(React.createElement(
	                    'span',
	                    { className: 'name' },
	                    creater.username
	                ));
	            }
	
	            if (creater._embedded.image) {
	                content.push(React.createElement('img', { className: 'profile-image', src: creater._embedded.image.url }));
	            }
	
	            return content;
	        }
	    }, {
	        key: 'renderBoxContent',
	        value: function renderBoxContent() {
	            var url = _.get(this.state, 'message.url');
	
	            if (!url) return null;
	
	            return [React.createElement(skoash.Image, { src: this.state.message.url }), React.createElement('div', { className: classNameText.box })];
	        }
	    }, {
	        key: 'renderContent',
	        value: function renderContent() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(skoash.Audio, { ref: 'start', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'PreviewOpen.mp3' }),
	                React.createElement(
	                    'ul',
	                    { className: this.getSenderClassNames() },
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            this.renderSender()
	                        )
	                    )
	                ),
	                React.createElement(
	                    skoash.Component,
	                    { ref: refs.box, className: classNameText.skribbleBox },
	                    this.renderBoxContent()
	                ),
	                React.createElement(_3.default, { className: classNameText.leftMenu, list: this.leftMenuList }),
	                React.createElement(_3.default, { className: classNameText.rightMenu, list: this.rightMenuList })
	            );
	        }
	    }]);
	
	    return ReadScreen;
	}(skoash.Screen);

/***/ },
/* 39 */
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

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SaveMenu = function (_skoash$Screen) {
	    _inherits(SaveMenu, _skoash$Screen);
	
	    function SaveMenu() {
	        _classCallCheck(this, SaveMenu);
	
	        return _possibleConstructorReturn(this, (SaveMenu.__proto__ || Object.getPrototypeOf(SaveMenu)).apply(this, arguments));
	    }
	
	    _createClass(SaveMenu, [{
	        key: "cancel",
	        value: function cancel() {
	            this.close();
	            skoash.trigger('menuClose', {
	                id: this.props.id
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { id: this.props.id, className: this.getClassNames() },
	                React.createElement(skoash.Audio, { ref: "start", type: "sfx", src: CMWN.MEDIA.EFFECT + "SaveSkribble.mp3" }),
	                React.createElement(
	                    "div",
	                    { className: "center" },
	                    React.createElement(
	                        "div",
	                        { className: "frame" },
	                        React.createElement("button", { className: "quit-saved", onClick: this.cancel.bind(this) }),
	                        React.createElement(
	                            "h2",
	                            null,
	                            "Your progress"
	                        ),
	                        React.createElement(
	                            "h2",
	                            null,
	                            "has been saved"
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return SaveMenu;
	}(skoash.Screen);
	
	exports.default = React.createElement(SaveMenu, {
	    id: "save",
	    load: true
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _classnames = __webpack_require__(20);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CollisionWarning = function (_skoash$Screen) {
	    _inherits(CollisionWarning, _skoash$Screen);
	
	    function CollisionWarning(props) {
	        _classCallCheck(this, CollisionWarning);
	
	        var _this = _possibleConstructorReturn(this, (CollisionWarning.__proto__ || Object.getPrototypeOf(CollisionWarning)).call(this, props));
	
	        _this.cancel = _this.cancel.bind(_this);
	        _this.toggle = _this.toggle.bind(_this);
	        return _this;
	    }
	
	    _createClass(CollisionWarning, [{
	        key: 'cancel',
	        value: function cancel() {
	            this.close();
	            skoash.trigger('menuClose', {
	                id: this.props.id
	            });
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            this.updateGameState({
	                path: ['collisionWarning'],
	                data: {
	                    show: !_.get(this.props.gameState, 'data.collisionWarning.show')
	                }
	            });
	        }
	    }, {
	        key: 'getToggleClassNames',
	        value: function getToggleClassNames() {
	            return (0, _classnames2.default)('toggle-collision-warning', {
	                active: !_.get(this.props.gameState, 'data.collisionWarning.show')
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { id: this.props.id, className: this.getClassNames() },
	                React.createElement(skoash.Audio, { ref: 'start', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'WarningChime.mp3' }),
	                React.createElement(
	                    'div',
	                    { className: 'center' },
	                    React.createElement(
	                        'div',
	                        { className: 'frame' },
	                        React.createElement(skoash.Image, {
	                            ref: 'copy',
	                            className: 'copy',
	                            src: CMWN.MEDIA.IMAGE + 'text-youmustnotoverlapimgs.png'
	                        }),
	                        React.createElement('button', { className: this.getToggleClassNames(), onClick: this.toggle }),
	                        React.createElement('button', { className: 'close-collision-warning', onClick: this.cancel }),
	                        React.createElement(skoash.Image, {
	                            ref: 'otter',
	                            className: 'otter',
	                            src: CMWN.MEDIA.SPRITE + 'peeking-through-otter.gif'
	                        })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return CollisionWarning;
	}(skoash.Screen);
	
	exports.default = React.createElement(CollisionWarning, {
	    id: 'collisionWarning',
	    load: true
	});

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = React.createElement(
	    skoash.Screen,
	    {
	        id: "limitWarning",
	        load: true,
	        hidePrev: true,
	        hideNext: true
	    },
	    React.createElement(skoash.Audio, { ref: "start", type: "sfx", src: CMWN.MEDIA.EFFECT + "TooManyWarning.mp3" }),
	    React.createElement(skoash.Image, { className: "hidden", src: ENVIRONMENT.MEDIA + 'a479811171cf084bf86af4eac1f6dc28.png' }),
	    React.createElement(skoash.Image, { className: "hidden", src: ENVIRONMENT.MEDIA + '027b30f0d279ef41cd30eff22323051c.png' }),
	    React.createElement(skoash.Image, { className: "otter", src: ENVIRONMENT.MEDIA + 'e7c3a0ab64b457334e7be868609ee512.png' }),
	    React.createElement(skoash.Image, { className: "sign", src: ENVIRONMENT.MEDIA + '7434453a4692d4be9e898b6b8787c108.png' }),
	    React.createElement(
	        "div",
	        null,
	        "WARNING:",
	        React.createElement("br", null),
	        "You have exceeded the number of times",
	        React.createElement("br", null),
	        "you can use this item in your message.",
	        React.createElement("br", null),
	        "Please press ok to continue game."
	    ),
	    React.createElement("button", {
	        onClick: function onClick() {
	            skoash.trigger('menuClose', {
	                id: 'limitWarning'
	            });
	        }
	    })
	);

/***/ }
/******/ ]);
//# sourceMappingURL=ai.js.map