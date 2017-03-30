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
/******/ 	var hotCurrentHash = "2fd66ed69c0fe8092d15"; // eslint-disable-line no-unused-vars
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
	
	var _video_screen = __webpack_require__(8);
	
	var _video_screen2 = _interopRequireDefault(_video_screen);
	
	var _special_announcement_screen = __webpack_require__(9);
	
	var _special_announcement_screen2 = _interopRequireDefault(_special_announcement_screen);
	
	var _level_one_screen = __webpack_require__(10);
	
	var _level_one_screen2 = _interopRequireDefault(_level_one_screen);
	
	var _level_two_screen = __webpack_require__(13);
	
	var _level_two_screen2 = _interopRequireDefault(_level_two_screen);
	
	var _level_three_screen = __webpack_require__(14);
	
	var _level_three_screen2 = _interopRequireDefault(_level_three_screen);
	
	var _flip_screen = __webpack_require__(15);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _5 = __webpack_require__(16);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    screens: [_4.default, _title_screen2.default,
	    /*
	    BulbsScreen,
	    PigScreen,
	    InfoScreen,
	    */
	    _video_screen2.default, _special_announcement_screen2.default, _level_one_screen2.default, _level_two_screen2.default, _level_three_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _6.default
	    },
	    loader: React.createElement(_2.default, null),
	    assets: [React.createElement(skoash.Image, { className: 'background bkg-1', src: CMWN.MEDIA.IMAGE + 'bkg01.png' }), React.createElement(skoash.Image, { className: 'background bkg-2', src: CMWN.MEDIA.IMAGE + 'bkg02.png' }), React.createElement(skoash.Audio, { ref: 'bkg-1', type: 'background', src: CMWN.MEDIA.EFFECT + 's-bkg-1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'button', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-bu-1.mp3' }), React.createElement(skoash.Audio, { ref: 'screen-complete', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-bu-2.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 's-bu-3.mp3' })]
	}));
	// import BulbsScreen from './components/bulbs_screen';
	// import PigScreen from './components/pig_screen';
	// import InfoScreen from './components/info_screen';
	
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "be-bright",
		"version": 2,
		"skoash": "1.1.8",
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
	            playOnStart: "buzz",
	            completeOnStart: true,
	            completeDelay: 3000
	        }),
	        React.createElement(skoash.Image, {
	            ref: "background",
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + "bkg01.png"
	        }),
	        React.createElement(skoash.Audio, {
	            ref: "buzz",
	            type: "sfx",
	            src: CMWN.MEDIA.EFFECT + "s-1-2.mp3",
	            delay: 3000
	        }),
	        React.createElement(skoash.Image, {
	            ref: "bulb",
	            className: "bulb animated glow",
	            src: CMWN.MEDIA.IMAGE + "lightbulb-title-glow.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "bulb",
	            className: "bulb animated",
	            src: CMWN.MEDIA.IMAGE + "lightbulb-title.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "eco",
	            className: "eco",
	            src: CMWN.MEDIA.IMAGE + "mr-eco.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "hog",
	            className: "hog",
	            src: CMWN.MEDIA.IMAGE + "energyhog.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "presents",
	            className: "presents animated glow",
	            src: CMWN.MEDIA.IMAGE + "mreco-presents-glow.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "presents",
	            className: "presents animated",
	            src: CMWN.MEDIA.IMAGE + "mreco-presents.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "title",
	            className: "title animated glow",
	            src: CMWN.MEDIA.IMAGE + "bebright-title-glow.png"
	        }),
	        React.createElement(skoash.Image, {
	            ref: "title",
	            className: "title animated",
	            src: CMWN.MEDIA.IMAGE + "bebright-title.png"
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
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'video-screen'
	        }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'fr-2.png' }),
	        React.createElement(
	            skoash.Component,
	            { ref: 'center', className: 'center' },
	            React.createElement(
	                skoash.Component,
	                { ref: 'frame', className: 'frame video' },
	                React.createElement(skoash.Video, { ref: 'video', src: src })
	            )
	        )
	    );
	};
	
	var src = 'https://res.cloudinary.com/changemyworldnow/video/upload/v1455037011/' + 'Be_Bright_112015_DM_480p_ghb6vh_summbp.mp4';

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
	            id: "special-announcement-screen"
	        }),
	        React.createElement(skoash.Image, { className: "hidden", src: CMWN.MEDIA.IMAGE + "frame-specialannouncement.png" }),
	        React.createElement(skoash.Audio, { type: "voiceOver", src: CMWN.MEDIA.VO + "special-ann.mp3" }),
	        React.createElement(
	            skoash.Component,
	            { className: "labyrinth-frame" },
	            React.createElement(skoash.Image, { className: "eco", src: CMWN.MEDIA.IMAGE + "mr-eco.png" }),
	            React.createElement(
	                "div",
	                { className: "copy" },
	                React.createElement(
	                    "div",
	                    null,
	                    "Special"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Special"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Announcement!"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Announcement!"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Calling all"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Calling all"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Eco-Heroes!!"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Eco-Heroes!!"
	                )
	            )
	        )
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
	    var onCloseInstructions = function onCloseInstructions() {
	        skoash.trigger('updateState', {
	            path: 'openReveal',
	            data: 'count-down'
	        });
	
	        setTimeout(function () {
	            skoash.trigger('updateState', {
	                path: 'closeReveal',
	                data: true
	            });
	        }, 3000);
	    };
	
	    return (0, _labyrinth_screen_component2.default)(props, ref, key, {
	        id: 'labyrinth-level-one-screen',
	        levelNumber: 1,
	        itemsCount: 4,
	        enemiesCount: 3,
	        disableChance: .75,
	        disableInterval: 4000,
	        openOnStart: 'instructions',
	        vos: [React.createElement(skoash.Audio, {
	            ref: 'instructions',
	            type: 'voiceOver',
	            src: CMWN.MEDIA.VO + 'instructions.mp3',
	            playTarget: 'instructions',
	            completeTarget: 'instructions'
	        }), React.createElement(skoash.Audio, { ref: 'level-up', type: 'voiceOver', src: CMWN.MEDIA.VO + 'level-up1.mp3' }), React.createElement(skoash.Audio, { ref: 'try-again', type: 'voiceOver', src: CMWN.MEDIA.VO + 'try-again.mp3', complete: true })],
	        revealList: [React.createElement(
	            skoash.Component,
	            { ref: 'instructions', className: 'labyrinth-frame instructions' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(
	                'div',
	                { className: 'copy' },
	                React.createElement(
	                    'p',
	                    null,
	                    'Move Mr. Eco',
	                    React.createElement('br', null),
	                    'by using the arrow keys',
	                    React.createElement('br', null),
	                    'and help him',
	                    React.createElement('br', null),
	                    'turn off the lights!'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'reveal-arrows' },
	                    React.createElement('div', null),
	                    React.createElement('div', null),
	                    React.createElement('div', null),
	                    React.createElement('div', null)
	                ),
	                React.createElement('button', {
	                    onClick: onCloseInstructions
	                })
	            )
	        ), React.createElement(
	            skoash.Component,
	            { ref: 'count-down', className: 'labyrinth-frame count-down' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(
	                'div',
	                { className: 'count' },
	                React.createElement(
	                    'div',
	                    null,
	                    'READY'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'number one' },
	                    '1'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'number two' },
	                    '2'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'number three' },
	                    '3'
	                )
	            )
	        ), React.createElement(
	            skoash.Component,
	            { ref: 'level-up', className: 'labyrinth-frame level-up' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(
	                'div',
	                { className: 'copy' },
	                React.createElement(
	                    'p',
	                    null,
	                    React.createElement(
	                        'h2',
	                        null,
	                        'Level up!'
	                    ),
	                    React.createElement(
	                        'h2',
	                        null,
	                        'Level up!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'ECO-TIP:'
	                    ),
	                    ' Save energy by walking through your own house',
	                    React.createElement('br', null),
	                    'before you leave and making sure all the lights are out.'
	                )
	            )
	        ), React.createElement(
	            skoash.Component,
	            { ref: 'try-again', className: 'labyrinth-frame try-again' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(
	                'div',
	                { className: 'copy' },
	                React.createElement(
	                    'p',
	                    null,
	                    'Sorry,',
	                    React.createElement('br', null),
	                    'Try Again!'
	                ),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'closeReveal',
	                            data: true
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};
	
	var _labyrinth_screen_component = __webpack_require__(11);
	
	var _labyrinth_screen_component2 = _interopRequireDefault(_labyrinth_screen_component);

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
	
	    var itemInteract;
	    var enemyInteract;
	    var enemyDisable;
	    var onLabyrinthStart;
	    var onLabyrinthStop;
	    var onLabyrinthComplete;
	    var onTimerComplete;
	    var onOpenReveal;
	    var onCloseReveal;
	    var items = [];
	    var enemies = [];
	
	    itemInteract = function itemInteract() {
	        this.complete();
	        this.disable();
	        this.updateGameState({
	            path: 'correct',
	            data: _.get(props, 'data.correct', 0) + 1
	        });
	    };
	
	    enemyInteract = function enemyInteract() {
	        var _this = this;
	
	        this.setState({
	            hit: true
	        }, function () {
	            setTimeout(function () {
	                _this.setState({
	                    hit: false
	                });
	            }, 1000);
	        });
	    };
	
	    enemyDisable = function enemyDisable() {
	        var _this2 = this;
	
	        this.updateGameState({
	            path: 'game',
	            data: {
	                sfx: 'disable'
	            }
	        });
	        setTimeout(function () {
	            _this2.updateGameState({
	                path: 'game',
	                data: {
	                    sfx: null
	                }
	            });
	        }, 500);
	    };
	
	    onLabyrinthStart = function onLabyrinthStart() {
	        var _this3 = this;
	
	        clearInterval(this.interval);
	        this.interval = setInterval(function () {
	            var offset;
	            if (_.get(props, 'data.game.stop', false)) return;
	            offset = {
	                width: _this3.player.offsetWidth,
	                height: _this3.player.offsetHeight
	            };
	            _.each(_this3.enemies, function (enemy) {
	                if (_this3.doIntersect(_this3.state.playerX, _this3.state.playerY, offset, enemy)) return;
	                Math.random() < opts.disableChance ? enemy.disable() : enemy.enable();
	            });
	        }, opts.disableInterval);
	    };
	
	    onLabyrinthStop = function onLabyrinthStop() {
	        clearInterval(this.interval);
	    };
	
	    onLabyrinthComplete = function onLabyrinthComplete() {
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
	
	    onOpenReveal = function onOpenReveal(message) {
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: true,
	                start: false,
	                vo: message
	            }
	        });
	    };
	
	    onCloseReveal = function onCloseReveal(prevMessage) {
	        if (prevMessage === 'try-again' && !_.get(props, 'data.closeReveal')) {
	            skoash.trigger('quit');
	            return;
	        }
	
	        this.updateGameState({
	            path: 'game',
	            data: {
	                stop: false,
	                start: true,
	                restart: false
	            }
	        });
	        this.updateGameState({
	            path: 'closeReveal',
	            data: false
	        });
	        this.updateGameState({
	            path: 'openReveal',
	            data: null
	        });
	        this.updateGameState({
	            path: 'correct',
	            data: 0
	        });
	
	        if (prevMessage === 'level-up') {
	            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	        }
	    };
	
	    for (var i = 0; i < opts.itemsCount; i++) {
	        items.push(React.createElement(skoash.InteractiveItem, {
	            className: 'item-' + (i + 1),
	            checkComplete: false,
	            onInteract: itemInteract,
	            children: [React.createElement(skoash.Audio, {
	                ref: 'interact',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'light-capture.mp3',
	                complete: true
	            })]
	        }));
	    }
	
	    for (var _i = 0; _i < opts.enemiesCount; _i++) {
	        enemies.push(React.createElement(skoash.InteractiveItem, {
	            className: 'enemy-' + (_i + 1),
	            onInteract: enemyInteract,
	            onDisable: enemyDisable,
	            children: [React.createElement(skoash.Audio, {
	                ref: 'interact',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'energy-hog.mp3',
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
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'frame-yellow.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'frame-lvlup.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'frame-sorry.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'frame-win.png' }),
	        React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'inside-meter.png' }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.game.vo'),
	            children: opts.vos
	        }),
	        React.createElement(skoash.MediaCollection, {
	            play: _.get(props, 'data.game.sfx'),
	            children: [React.createElement(skoash.Audio, {
	                ref: 'disable',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'hog-disappear.mp3',
	                complete: true
	            })]
	        }),
	        React.createElement(skoash.Reveal, {
	            className: (0, _classnames2.default)({
	                PLAYING: _.get(props, 'data.instructions.playing')
	            }),
	            openOnStart: opts.openOnStart,
	            openReveal: _.get(props, 'data.openReveal'),
	            closeReveal: _.get(props, 'data.closeReveal'),
	            onOpen: onOpenReveal,
	            onClose: onCloseReveal,
	            list: opts.revealList
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'left' },
	            React.createElement(skoash.Image, { className: 'avatar', src: CMWN.MEDIA.IMAGE + 'mr-eco-avatar.png' }),
	            React.createElement(skoash.Score, {
	                increment: 10,
	                max: opts.itemsCount * 10,
	                correct: _.get(props, 'data.correct', 0)
	            })
	        ),
	        React.createElement(skoash.Labyrinth, {
	            img: CMWN.MEDIA.IMAGE + 'floor-plan.png',
	            map: CMWN.MEDIA.IMAGE + 'floor-plan-b-w.png',
	            input: _.get(props, 'data.d-pad', {}),
	            startX: 250,
	            startY: 385,
	            speed: 2,
	            scale: _.get(props, 'gameState.scale', 1),
	            start: _.get(props, 'data.game.start', false),
	            onStart: onLabyrinthStart,
	            onStop: onLabyrinthStop,
	            onComplete: onLabyrinthComplete,
	            assets: [React.createElement(skoash.Audio, { ref: 'collide', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'wall.mp3', complete: true })],
	            items: items,
	            enemies: enemies
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'level-container' },
	            React.createElement(skoash.Image, { className: 'level', src: CMWN.MEDIA.IMAGE + 'text-level.png' }),
	            React.createElement(
	                'span',
	                null,
	                opts.levelNumber
	            ),
	            React.createElement(skoash.Timer, {
	                countDown: true,
	                timeout: 60000,
	                leadingContent: 'TIME LEFT',
	                onComplete: onTimerComplete,
	                checkComplete: _.get(props, 'data.game.start', false),
	                restart: _.get(props, 'data.game.start', false),
	                complete: _.get(props, 'data.game.complete', false)
	            }),
	            React.createElement(
	                'h3',
	                null,
	                'TURN OFF'
	            ),
	            React.createElement(
	                'p',
	                null,
	                'the lights that other',
	                React.createElement('br', null),
	                'people leave on!'
	            )
	        ),
	        React.createElement(skoash.DPad, {
	            start: _.get(props, 'data.game.start', false),
	            stop: _.get(props, 'data.game.stop', false),
	            assets: [React.createElement(skoash.Audio, { ref: 'keydown', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'click.mp3', complete: true })]
	        })
	    );
	};
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	
	exports.default = function (props, ref, key) {
	    return (0, _labyrinth_screen_component2.default)(props, ref, key, {
	        id: 'labyrinth-level-two-screen',
	        levelNumber: 2,
	        itemsCount: 6,
	        enemiesCount: 4,
	        disableChance: .75,
	        disableInterval: 4000,
	        vos: [React.createElement(skoash.Audio, { ref: 'level-up', type: 'voiceOver', src: CMWN.MEDIA.VO + 'level-up2.mp3' }), React.createElement(skoash.Audio, { ref: 'try-again', type: 'voiceOver', src: CMWN.MEDIA.VO + 'try-again.mp3', complete: true })],
	        revealList: [React.createElement(
	            skoash.Component,
	            { ref: 'level-up', className: 'labyrinth-frame level-up' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(
	                'div',
	                { className: 'copy' },
	                React.createElement(
	                    'p',
	                    null,
	                    React.createElement(
	                        'h2',
	                        null,
	                        'Level up!'
	                    ),
	                    React.createElement(
	                        'h2',
	                        null,
	                        'Level up!'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'ECO-TIP:'
	                    ),
	                    ' Use notes to create reminders',
	                    React.createElement('br', null),
	                    'to help your family remember to flip that switch.'
	                )
	            )
	        ), React.createElement(
	            skoash.Component,
	            { ref: 'try-again', className: 'labyrinth-frame try-again' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(
	                'div',
	                { className: 'copy' },
	                React.createElement(
	                    'p',
	                    null,
	                    'Sorry,',
	                    React.createElement('br', null),
	                    'Try Again!'
	                ),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'closeReveal',
	                            data: true
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};
	
	var _labyrinth_screen_component = __webpack_require__(11);
	
	var _labyrinth_screen_component2 = _interopRequireDefault(_labyrinth_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _labyrinth_screen_component2.default)(props, ref, key, {
	        id: 'labyrinth-level-three-screen',
	        levelNumber: 3,
	        itemsCount: 7,
	        enemiesCount: 6,
	        disableChance: .75,
	        disableInterval: 2000,
	        vos: [React.createElement(
	            skoash.MediaSequence,
	            { ref: 'level-up', silentOnStart: true },
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'you-won.mp3',
	                sprite: [0, 2000]
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                playTarget: 'thanks',
	                src: CMWN.MEDIA.VO + 'you-won.mp3',
	                sprite: [2000, 2750]
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                playTarget: 'caring',
	                src: CMWN.MEDIA.VO + 'you-won.mp3',
	                sprite: [4750, 2000]
	            })
	        ), React.createElement(skoash.Audio, { ref: 'try-again', type: 'voiceOver', src: CMWN.MEDIA.VO + 'try-again.mp3', complete: true })],
	        revealList: [React.createElement(
	            skoash.Component,
	            { ref: 'level-up', className: 'labyrinth-frame win' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(skoash.Image, { className: 'trophy', src: CMWN.MEDIA.IMAGE + 'win-trophy.png' }),
	            React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'energyhog-greyscale.png' }),
	            React.createElement('div', { className: (0, _classnames2.default)('hog', {
	                    blur: _.get(props, 'data.thanks.playing'),
	                    hide: _.get(props, 'data.caring.playing')
	                }) }),
	            React.createElement(
	                'div',
	                { className: 'copy' },
	                React.createElement(
	                    'p',
	                    null,
	                    React.createElement(skoash.Image, { src: CMWN.MEDIA.IMAGE + 'text-congrats.png' }),
	                    React.createElement(skoash.Image, { src: CMWN.MEDIA.IMAGE + 'text-youvewon.png' }),
	                    React.createElement(
	                        'div',
	                        { className: (0, _classnames2.default)({ display: _.get(props, 'data.thanks.playing') }) },
	                        'Thanks for being an Eco-Hero'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: (0, _classnames2.default)({ display: _.get(props, 'data.caring.playing') }) },
	                        'and caring about the environment!'
	                    )
	                )
	            )
	        ), React.createElement(
	            skoash.Component,
	            { ref: 'try-again', className: 'labyrinth-frame try-again' },
	            React.createElement(skoash.Image, { className: 'eco', src: CMWN.MEDIA.IMAGE + 'mr-eco.png' }),
	            React.createElement(
	                'div',
	                { className: 'copy' },
	                React.createElement(
	                    'p',
	                    null,
	                    'Sorry,',
	                    React.createElement('br', null),
	                    'Try Again!'
	                ),
	                React.createElement('button', {
	                    onClick: function onClick() {
	                        skoash.trigger('updateState', {
	                            path: 'closeReveal',
	                            data: true
	                        });
	                    }
	                })
	            )
	        )]
	    });
	};
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _labyrinth_screen_component = __webpack_require__(11);
	
	var _labyrinth_screen_component2 = _interopRequireDefault(_labyrinth_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	            id: "flip",
	            emitOnComplete: {
	                name: 'flip'
	            }
	        }),
	        React.createElement(skoash.Audio, { ref: "vo", type: "voiceOver", src: CMWN.MEDIA.VO + "vo-10-1.mp3" }),
	        React.createElement(skoash.Audio, { ref: "start", type: "sfx", src: CMWN.MEDIA.EFFECT + "s-10-2.mp3", delay: 4000 }),
	        React.createElement(skoash.Image, { className: "flip", src: CMWN.MEDIA.SPRITE + "be-bright-earned.gif" }),
	        React.createElement(
	            skoash.Component,
	            { className: "text" },
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "h1",
	                    null,
	                    "GOOD JOB!"
	                ),
	                "Be a Super Light Saver Hero",
	                React.createElement("br", null),
	                "and",
	                React.createElement(skoash.Image, {
	                    ref: "flip-img",
	                    className: "inline animated",
	                    src: CMWN.MEDIA.IMAGE + "flip.png"
	                }),
	                React.createElement("br", null),
	                "that switch!"
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