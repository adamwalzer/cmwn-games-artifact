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
/******/ 	var hotCurrentHash = "d9dfe17ccc0b6aef3784"; // eslint-disable-line no-unused-vars
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
	
	var _eat_and_drink_screen = __webpack_require__(8);
	
	var _eat_and_drink_screen2 = _interopRequireDefault(_eat_and_drink_screen);
	
	var _learn_and_create_screen = __webpack_require__(9);
	
	var _learn_and_create_screen2 = _interopRequireDefault(_learn_and_create_screen);
	
	var _what_happens_screen = __webpack_require__(10);
	
	var _what_happens_screen2 = _interopRequireDefault(_what_happens_screen);
	
	var _video_screen = __webpack_require__(11);
	
	var _video_screen2 = _interopRequireDefault(_video_screen);
	
	var _better_ways_screen = __webpack_require__(12);
	
	var _better_ways_screen2 = _interopRequireDefault(_better_ways_screen);
	
	var _click_cards_screen = __webpack_require__(14);
	
	var _click_cards_screen2 = _interopRequireDefault(_click_cards_screen);
	
	var _cards_screen = __webpack_require__(15);
	
	var _cards_screen2 = _interopRequireDefault(_cards_screen);
	
	var _time_to_collect_screen = __webpack_require__(16);
	
	var _time_to_collect_screen2 = _interopRequireDefault(_time_to_collect_screen);
	
	var _lets_play_screen = __webpack_require__(17);
	
	var _lets_play_screen2 = _interopRequireDefault(_lets_play_screen);
	
	var _remember_screen = __webpack_require__(18);
	
	var _remember_screen2 = _interopRequireDefault(_remember_screen);
	
	var _level_one_screen = __webpack_require__(19);
	
	var _level_one_screen2 = _interopRequireDefault(_level_one_screen);
	
	var _level_two_screen = __webpack_require__(21);
	
	var _level_two_screen2 = _interopRequireDefault(_level_two_screen);
	
	var _level_three_screen = __webpack_require__(22);
	
	var _level_three_screen2 = _interopRequireDefault(_level_three_screen);
	
	var _level_four_screen = __webpack_require__(23);
	
	var _level_four_screen2 = _interopRequireDefault(_level_four_screen);
	
	var _level_five_screen = __webpack_require__(24);
	
	var _level_five_screen2 = _interopRequireDefault(_level_five_screen);
	
	var _neighborhood_waste_screen = __webpack_require__(25);
	
	var _neighborhood_waste_screen2 = _interopRequireDefault(_neighborhood_waste_screen);
	
	var _types_of_waste_screen = __webpack_require__(26);
	
	var _types_of_waste_screen2 = _interopRequireDefault(_types_of_waste_screen);
	
	var _waste_sort_center_screen = __webpack_require__(27);
	
	var _waste_sort_center_screen2 = _interopRequireDefault(_waste_sort_center_screen);
	
	var _sorting_level_one_screen = __webpack_require__(28);
	
	var _sorting_level_one_screen2 = _interopRequireDefault(_sorting_level_one_screen);
	
	var _sorting_level_two_screen = __webpack_require__(43);
	
	var _sorting_level_two_screen2 = _interopRequireDefault(_sorting_level_two_screen);
	
	var _sorting_level_three_screen = __webpack_require__(44);
	
	var _sorting_level_three_screen2 = _interopRequireDefault(_sorting_level_three_screen);
	
	var _take_action_screen = __webpack_require__(45);
	
	var _take_action_screen2 = _interopRequireDefault(_take_action_screen);
	
	var _flip_screen = __webpack_require__(46);
	
	var _flip_screen2 = _interopRequireDefault(_flip_screen);
	
	var _5 = __webpack_require__(47);
	
	var _6 = _interopRequireDefault(_5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _eat_and_drink_screen2.default, _learn_and_create_screen2.default, _what_happens_screen2.default, _video_screen2.default, _better_ways_screen2.default, _click_cards_screen2.default, _cards_screen2.default, _time_to_collect_screen2.default, _lets_play_screen2.default, _remember_screen2.default, _level_one_screen2.default, _level_two_screen2.default, _level_three_screen2.default, _level_four_screen2.default, _level_five_screen2.default,
	    // BonusRoundScreen,
	    _neighborhood_waste_screen2.default, _types_of_waste_screen2.default, _waste_sort_center_screen2.default, _sorting_level_one_screen2.default, _sorting_level_two_screen2.default, _sorting_level_three_screen2.default, _take_action_screen2.default, _flip_screen2.default],
	    menus: {
	        quit: _6.default
	    },
	    assets: [React.createElement(skoash.Font, { name: 'Source Sans Pro' }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'game1.timelevelscore.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'game1.metericons.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'frames.intro-01.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'nav.png',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.SPRITE + 'BKG.1.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.IMAGE + 'BKG.1.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.IMAGE + 'BKG.2.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Image, {
	        src: MEDIA.IMAGE + 'BKG.3.jpg',
	        className: 'hidden'
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'OpeningSequence.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'CardSection.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKG.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'BonusRoundBKG.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'BKGWasteSortingGame.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'NextLevel.mp3',
	        loop: true
	    }), React.createElement(skoash.Audio, {
	        type: 'background',
	        src: MEDIA.EFFECT + 'FlipScreen.mp3'
	    }), React.createElement(skoash.Audio, {
	        type: 'sfx',
	        ref: 'button',
	        src: MEDIA.EFFECT + 'AllClick.mp3'
	    }), React.createElement(skoash.Audio, {
	        type: 'sfx',
	        ref: 'screen-complete',
	        src: MEDIA.EFFECT + 'NextAppear.mp3'
	    }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background everyday' }), React.createElement('div', { className: 'background cards' }), React.createElement('div', { className: 'background bkg-1' }), React.createElement('div', { className: 'background bkg-2' }), React.createElement('div', { className: 'background bkg-3' })],
	    getBackgroundIndex: function getBackgroundIndex(index, id) {
	        switch (id) {
	            case 'ios-splash':
	                return;
	            case 'title':
	            case 'eat-and-drink':
	            case 'learn-and-create':
	            case 'what-happens':
	            case 'better-ways':
	                return 0;
	            case 'click-cards':
	            case 'cards':
	            case 'time-to-collect':
	            case 'lets-play':
	            case 'remember':
	                return 1;
	            case 'phaser-level-1':
	            case 'phaser-level-2':
	            case 'phaser-level-3':
	            case 'phaser-level-4':
	            case 'phaser-level-5':
	                return 2;
	            case 'bonus-round':
	                return 3;
	            case 'neighborhood-waste':
	            case 'types-of-waste':
	                return 1;
	            case 'sorting-level-1':
	            case 'sorting-level-2':
	            case 'sorting-level-3':
	                return 4;
	            case 'take-action':
	                return 5;
	            case 'flip':
	                return 6;
	        }
	    },
	    renderMenu: function renderMenu() {
	        var _this = this;
	
	        return React.createElement(
	            'div',
	            { className: 'menu' },
	            React.createElement('button', { ref: 'pause', className: 'pause', onClick: function onClick() {
	                    if (_this.state.paused) {
	                        _this.resume();
	                    } else {
	                        _this.pause();
	                    }
	                } }),
	            React.createElement('button', { className: 'close', onClick: this.navigator.openMenu.bind(this, { id: 'quit' }) })
	        );
	    }
	}));
	// import BonusRoundScreen from './components/bonus_round_screen';
	
	
	if (true) module.hot.accept();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"id": "waste-busters",
		"version": 1,
		"skoash": "1.1.4",
		"head_injection": "<link href='https://fonts.googleapis.com/css?family=McLaren' rel='stylesheet'>",
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
	        React.createElement(skoash.Image, {
	            src: CMWN.MEDIA.IMAGE + 'PLTlogo.png',
	            className: "logo"
	        }),
	        React.createElement(skoash.Image, {
	            src: CMWN.MEDIA.IMAGE + 'title.png',
	            className: "title"
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
	
	exports.default = function (props, ref, key) {
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: "eat-and-drink"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'EveryDay.mp3'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-1" },
	            React.createElement(skoash.Component, { className: "intro-image-1" }),
	            React.createElement(
	                "p",
	                null,
	                "Every day, we",
	                React.createElement("br", null),
	                "eat and drink..."
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
	            id: "learn-and-create"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'AndEvery.mp3'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-1" },
	            React.createElement(skoash.Component, { className: "intro-image-2" }),
	            React.createElement(
	                "p",
	                null,
	                "And everyday, we",
	                React.createElement("br", null),
	                "use things to help",
	                React.createElement("br", null),
	                "us learn and create..."
	            )
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
	            id: "what-happens"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'ButWhat.mp3'
	        }),
	        React.createElement(skoash.Component, { className: "intro-image-1" }),
	        React.createElement(skoash.Component, { className: "intro-image-2" }),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-2" },
	            React.createElement(
	                "p",
	                null,
	                "But what happens to the items",
	                React.createElement("br", null),
	                "we don't need anymore?"
	            ),
	            React.createElement(
	                "h3",
	                null,
	                "Where do they all go?"
	            )
	        )
	    );
	};

/***/ },
/* 11 */
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
	            id: 'video'
	        }),
	        React.createElement(skoash.Image, { src: CMWN.MEDIA.IMAGE + 'frame.intro.video.png' }),
	        React.createElement(skoash.Video, { src: SRC })
	    );
	};
	
	var SRC = 'https://res.cloudinary.com/changemyworldnow/video/upload/' + 'v1486567397/WasteBusters_Final_For_Upload_ervtvn.mp4';

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

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
	            id: "better-ways"
	        }),
	        React.createElement(
	            skoash.MediaSequence,
	            null,
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.VO + 'AreThere.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                src: CMWN.MEDIA.EFFECT + 'YesShout.mp3',
	                playTarget: "yes"
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            { className: "frame-1" },
	            React.createElement(skoash.Component, { className: "intro-image-3" }),
	            React.createElement(
	                "p",
	                null,
	                "Are there better ways",
	                React.createElement("br", null),
	                "YOU can keep waste",
	                React.createElement("br", null),
	                "out of a landfill?"
	            )
	        ),
	        React.createElement(skoash.Image, {
	            className: (0, _classnames2.default)('yes animated', {
	                bounce: _.get(props, 'data.yes.playing')
	            }),
	            src: CMWN.MEDIA.IMAGE + 'yes.png'
	        })
	    );
	};
	
	var _classnames = __webpack_require__(13);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 13 */
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
/* 14 */
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
	            id: "click-cards"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'ClickTheCards.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "frame",
	            src: CMWN.MEDIA.IMAGE + 'frame.square.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "recycle",
	            src: CMWN.MEDIA.IMAGE + 'recycle.transparency.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "trash",
	            src: CMWN.MEDIA.IMAGE + 'cards.trash.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.4.png'
	        }),
	        React.createElement("div", { className: "turtle" }),
	        React.createElement(
	            "p",
	            null,
	            "Click the cards",
	            React.createElement("br", null),
	            "to find out how",
	            React.createElement("br", null),
	            "YOU can be a",
	            React.createElement("br", null),
	            "Waste Buster!"
	        ),
	        React.createElement(
	            "div",
	            { className: "hidden" },
	            IMAGES
	        )
	    );
	};
	
	var IMAGE_SRCS = [CMWN.MEDIA.IMAGE + "game.1.bkg.sky.jpg", CMWN.MEDIA.IMAGE + "game.1.bkg.clouds.png", CMWN.MEDIA.SPRITE + "game1.ground.png", CMWN.MEDIA.SPRITE + "game1.platform.png", CMWN.MEDIA.SPRITE + "game1.5.png", CMWN.MEDIA.SPRITE + "game1.logs.png", CMWN.MEDIA.SPRITE + "game1.trees.png"];
	
	var IMAGES = _.map(IMAGE_SRCS, function (src) {
	    return React.createElement(skoash.Image, { className: "hidden", src: src });
	});

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
	            id: "cards"
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.1.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.2.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.3.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.4.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'card.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'cards.trash.png'
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.selectable.target.props.message')
	            },
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "reduce",
	                src: CMWN.MEDIA.VO + 'ReduceStrong.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "reuse",
	                src: CMWN.MEDIA.VO + 'ReuseStrong.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "recycle",
	                src: CMWN.MEDIA.VO + 'RecycleStrong.mp3'
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: "selectable",
	            selectClass: "HIGHLIGHTED",
	            list: [React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "reduce" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement("div", null)
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "reuse" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement("div", null)
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "recycle" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement("div", null)
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            )]
	        }),
	        React.createElement(
	            "div",
	            { className: "hidden" },
	            IMAGES
	        )
	    );
	};
	
	var IMAGE_SRCS = [CMWN.MEDIA.SPRITE + "turtle.walk.0.png", CMWN.MEDIA.SPRITE + "turtle.walk.3.png", CMWN.MEDIA.SPRITE + "turtle.walk.5.png", CMWN.MEDIA.SPRITE + "game1.hearts.png", CMWN.MEDIA.SPRITE + "recycle-01.png", CMWN.MEDIA.SPRITE + "rainbow.recycle-01.png", CMWN.MEDIA.SPRITE + "truck.png", CMWN.MEDIA.SPRITE + "door.open.png", CMWN.MEDIA.SPRITE + "jet.pack.png", CMWN.MEDIA.SPRITE + "mother.slither-01.png", CMWN.MEDIA.SPRITE + "sister.slither-01.png", CMWN.MEDIA.SPRITE + "brother.slither-01.png"];
	
	var IMAGES = _.map(IMAGE_SRCS, function (src) {
	    return React.createElement(skoash.Image, { className: "hidden", src: src });
	});

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
	            id: "time-to-collect"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'ItsTimeToCollect.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.intro.trees.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame square" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "h3",
	                    null,
	                    "It's Time To Collect!"
	                ),
	                React.createElement(
	                    "p",
	                    null,
	                    "Navigate the neighborhood",
	                    React.createElement("br", null),
	                    "and collect all of the waste bags.",
	                    React.createElement("br", null),
	                    "Look for Waste Trucks",
	                    React.createElement("br", null),
	                    "to dump your basket."
	                ),
	                React.createElement("div", { className: "truck" }),
	                React.createElement("div", { className: "trash" })
	            )
	        ),
	        React.createElement("div", { className: "tree-1" }),
	        React.createElement("div", { className: "tree-2" }),
	        React.createElement("div", { className: "turtle" }),
	        React.createElement(
	            "div",
	            { className: "hidden" },
	            IMAGES,
	            JSONS
	        )
	    );
	};
	
	var IMAGE_SRCS = [CMWN.MEDIA.SPRITE + "Mom.leaving.hole.png", CMWN.MEDIA.SPRITE + "mom.going.to.hole.png?v=3", CMWN.MEDIA.SPRITE + "Sister.leave.hole.png", CMWN.MEDIA.SPRITE + "sister.down.hole.png?v=3", CMWN.MEDIA.SPRITE + "brother.leave.hole.png", CMWN.MEDIA.SPRITE + "brother.down.hole.png?v=3"];
	
	var JSON_SRCS = [CMWN.MEDIA.SPRITE + "Mom.leaving.hole.json", CMWN.MEDIA.SPRITE + "mom.going.to.hole.json", CMWN.MEDIA.SPRITE + "Sister.leave.hole.json", CMWN.MEDIA.SPRITE + "sister.down.hole.json", CMWN.MEDIA.SPRITE + "brother.leave.hole.json", CMWN.MEDIA.SPRITE + "brother.down.hole.json"];
	
	var IMAGES = _.map(IMAGE_SRCS, function (src) {
	    return React.createElement(skoash.Image, { className: "hidden", src: src });
	});
	
	var JSONS = _.map(JSON_SRCS, function (src) {
	    return React.createElement(skoash.JSON, { src: src });
	});

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
	            id: "lets-play"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Lets_Play.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.intro.trees.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame square" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "h3",
	                    null,
	                    "Let's Play a Game!"
	                ),
	                React.createElement(
	                    "p",
	                    null,
	                    "Watch Out!",
	                    React.createElement("br", null),
	                    "If you miss a waste bag it affects",
	                    React.createElement("br", null),
	                    "the health of the environment!",
	                    React.createElement("br", null),
	                    React.createElement("br", null),
	                    "Here is a hint! Be sure to unload",
	                    React.createElement("br", null),
	                    "your basket to access",
	                    React.createElement("br", null),
	                    "hidden waste bags!",
	                    React.createElement("br", null),
	                    "Let's clean up!"
	                )
	            )
	        ),
	        React.createElement("div", { className: "tree-1" }),
	        React.createElement("div", { className: "tree-2" }),
	        React.createElement("div", { className: "truck" }),
	        React.createElement(
	            "div",
	            { className: "hidden" },
	            AUDIO
	        )
	    );
	};
	
	var AUDIO_SRCS = [CMWN.MEDIA.EFFECT + "BumpOrLandOnBush.mp3", CMWN.MEDIA.EFFECT + "BumpTreeStump.mp3", CMWN.MEDIA.EFFECT + "DumpTruckZoom.mp3", CMWN.MEDIA.EFFECT + "Fall_In_Hole.mp3", CMWN.MEDIA.EFFECT + "goInLog.mp3", CMWN.MEDIA.EFFECT + "Jump.mp3", CMWN.MEDIA.EFFECT + "LandInWater.mp3", CMWN.MEDIA.EFFECT + "LifeHeartCapture.mp3", CMWN.MEDIA.EFFECT + "LightingCapture.mp3", CMWN.MEDIA.EFFECT + "PickUpTrashBag.mp3", CMWN.MEDIA.EFFECT + "RecycleColors.mp3", CMWN.MEDIA.EFFECT + "RecycleGreen.mp3"];
	
	var AUDIO = _.map(AUDIO_SRCS, function (src) {
	    return React.createElement(skoash.Audio, { type: "sfx", src: src });
	});

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
	            id: "remember"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Remember.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game1.intro.trees.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame square" },
	            React.createElement(skoash.Image, {
	                className: "banner",
	                src: CMWN.MEDIA.IMAGE + 'banner.png'
	            }),
	            React.createElement(skoash.Image, {
	                className: "remember",
	                src: CMWN.MEDIA.IMAGE + 'remember.1.png'
	            }),
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "p",
	                    null,
	                    "Always check with",
	                    React.createElement("br", null),
	                    "an adult before picking",
	                    React.createElement("br", null),
	                    "litter up outside!"
	                )
	            )
	        ),
	        React.createElement("div", { className: "tree-1" }),
	        React.createElement("div", { className: "tree-2" }),
	        React.createElement("div", { className: "newspaper" })
	    );
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 1,
	        introVO: 'Responsibly',
	        fact1VO: 'spills',
	        fact2VO: 'Utensils',
	        fact3VO: 'Separate',
	        introContent: React.createElement(
	            'p',
	            null,
	            'On this level, be sure to',
	            React.createElement('br', null),
	            'collect all the ',
	            React.createElement('span', { className: 'truck' }),
	            ' to',
	            React.createElement('br', null),
	            'reveal tips on how',
	            React.createElement('br', null),
	            'to responsibly',
	            React.createElement('br', null),
	            'deal with waste!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You can now use the tips you\'ve',
	            React.createElement('br', null),
	            'learned to help reduce',
	            React.createElement('br', null),
	            'the amount of waste',
	            React.createElement('br', null),
	            'created in the world!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Use Less Paper'
	            ),
	            'Tip: Tear off one paper',
	            React.createElement('br', null),
	            'towel sheet at a time',
	            React.createElement('br', null),
	            'to wipe up spills.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Use Metal Utensils'
	            ),
	            'Tip: Reusable metal spoons,',
	            React.createElement('br', null),
	            'knives and forks are',
	            React.createElement('br', null),
	            'the way to go!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Sort Recyclables from Waste'
	            ),
	            'Tip: Create or buy special bins',
	            React.createElement('br', null),
	            'to separate the metal,',
	            React.createElement('br', null),
	            'glass, paper and plastic',
	            React.createElement('br', null),
	            'from your waste.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(20);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

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
	
	    var startScreen;
	    var onScreenStart;
	    var onScreenStop;
	    var getGameSrc;
	    var onOpenReveal;
	    var onCloseReveal;
	    var onRespond;
	    var onTimerComplete;
	
	    startScreen = function startScreen() {
	        var screenStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var callback = arguments[1];
	
	        this.updateGameState({
	            path: 'game',
	            data: {
	                screenStart: screenStart
	            },
	            callback: callback
	        });
	    };
	
	    onScreenStart = function onScreenStart() {
	        var gameData = _.get(props, 'gameState.data.game');
	
	        startScreen.call(this);
	
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
	                hits: 0,
	                bagCount: 0,
	                score: 0,
	                lives: 1
	            })
	        });
	    };
	
	    onScreenStop = function onScreenStop() {
	        var _this = this;
	
	        startScreen.call(this, false, function () {
	            _this.updateGameState({
	                path: ['game'],
	                data: {
	                    bagCount: 0,
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                }
	            });
	
	            startScreen.call(_this);
	        });
	    };
	
	    getGameSrc = function getGameSrc() {
	        if (!_.get(props, 'data.game.screenStart')) return;
	        return '../waste-busters-runner/index.html?v=' + opts.level;
	    };
	
	    onOpenReveal = function onOpenReveal() {
	        var _this2 = this;
	
	        setTimeout(function () {
	            _this2.updateGameState({
	                path: 'd-pad',
	                data: {
	                    pause: true
	                }
	            });
	        }, 1000);
	    };
	
	    onCloseReveal = function onCloseReveal(prevMessage) {
	        this.updateGameState({
	            path: 'reveal',
	            data: {
	                close: false,
	                open: null
	            }
	        });
	
	        this.updateGameState({
	            path: 'd-pad',
	            data: {
	                pause: false
	            }
	        });
	
	        this.updateGameState({
	            path: ['game'],
	            data: {
	                levels: _defineProperty({}, opts.level, {
	                    start: true
	                })
	            }
	        });
	
	        if (prevMessage === 'complete') {
	            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
	        }
	    };
	
	    onRespond = function onRespond(options) {
	        var _this3 = this;
	
	        var trucks = _.get(props, 'gameState.data.game.levels.' + opts.level + '.trucks');
	        var complete = _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete');
	
	        if (_.get(options, 'updateGameState.data.game.lives') === 0) {
	            startScreen.call(this, false);
	
	            this.updateGameState({
	                path: ['game'],
	                data: {
	                    bagCount: 0,
	                    lives: 1,
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                }
	            });
	
	            setTimeout(function () {
	                startScreen.call(_this3);
	            }, 0);
	        }
	
	        if (_.get(options, 'updateGameState.data.game.levels.' + opts.level + '.start') && _.get(props, 'data.reveal.open', false)) {
	            this.updateGameState({
	                path: 'd-pad',
	                data: {
	                    pause: true
	                }
	            });
	        }
	
	        if (complete && _.get(props, 'data.reveal.wasOpened') !== 'complete') {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'complete',
	                    wasOpened: 'complete'
	                }
	            });
	        }
	
	        if (!complete && trucks && _.get(props, 'data.reveal.wasOpened') !== 'fact-' + trucks) {
	            this.updateGameState({
	                path: 'reveal',
	                data: {
	                    open: 'fact-' + trucks,
	                    wasOpened: 'fact-' + trucks
	                }
	            });
	        }
	    };
	
	    onTimerComplete = function onTimerComplete() {
	        var _this4 = this;
	
	        if (_.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false)) return;
	
	        startScreen.call(this, false, function () {
	            _this4.updateGameState({
	                path: ['game'],
	                data: {
	                    bagCount: 0,
	                    lives: _.get(props, 'gameState.data.game.lives', 1) - 1 || 1,
	                    levels: _defineProperty({}, opts.level, {
	                        start: false
	                    })
	                }
	            });
	
	            startScreen.call(_this4);
	        });
	    };
	
	    return React.createElement(
	        skoash.Screen,
	        _extends({}, props, {
	            ref: ref,
	            key: key,
	            id: 'phaser-level-' + opts.level,
	            onStart: onScreenStart,
	            onStop: onScreenStop
	        }),
	        React.createElement(skoash.GameEmbedder, {
	            src: getGameSrc(),
	            controller: _.get(props, 'data.d-pad'),
	            complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false),
	            data: _.get(props, 'gameState.data.game', {}),
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
	                className: 'bottom',
	                complete: _.get(props, 'gameState.data.game.levels.' + opts.level + '.complete', false)
	            },
	            React.createElement(
	                skoash.Component,
	                {
	                    className: 'left'
	                },
	                React.createElement(skoash.Score, {
	                    className: 'life',
	                    correct: 4 - _.get(props, 'gameState.data.game.hits', 0) || 0,
	                    setScore: true
	                }),
	                React.createElement(skoash.Score, {
	                    className: 'bags',
	                    correct: _.get(props, 'gameState.data.game.bagCount', 0),
	                    setScore: true
	                })
	            ),
	            React.createElement(
	                skoash.Component,
	                {
	                    className: 'middle'
	                },
	                React.createElement(skoash.Score, {
	                    className: 'level-score',
	                    correct: _.get(props, 'gameState.data.game.score', 0),
	                    setScore: true
	                }),
	                React.createElement(skoash.Component, {
	                    className: (0, _classnames2.default)('level', 'level-' + opts.level)
	                })
	            ),
	            React.createElement(
	                skoash.Component,
	                {
	                    className: 'right'
	                },
	                React.createElement(skoash.Score, {
	                    className: 'lives',
	                    correct: _.get(props, 'gameState.data.game.lives', 1),
	                    setScore: true
	                }),
	                React.createElement(skoash.Score, {
	                    className: 'trucks',
	                    correct: _.get(props, 'gameState.data.game.levels.' + opts.level + '.trucks'),
	                    setScore: true
	                }),
	                React.createElement(skoash.DPad, null)
	            )
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: 'intro',
	            openTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', false),
	            closeReveal: _.get(props, 'data.reveal.close', false),
	            onClose: onCloseReveal,
	            onOpen: onOpenReveal,
	            list: [React.createElement(
	                skoash.Component,
	                {
	                    ref: 'intro',
	                    className: 'intro frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.introContent
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-1',
	                    className: 'fact-1 frame square',
	                    type: 'li'
	                },
	                React.createElement('div', { className: 'banner' }),
	                React.createElement('div', { className: 'title' }),
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact1Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-2',
	                    className: 'fact-2 frame square',
	                    type: 'li'
	                },
	                React.createElement('div', { className: 'banner' }),
	                React.createElement('div', { className: 'title' }),
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact2Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'fact-3',
	                    className: 'fact-3 frame square',
	                    type: 'li'
	                },
	                React.createElement('div', { className: 'banner' }),
	                React.createElement('div', { className: 'title' }),
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.fact3Content
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'complete',
	                    className: 'complete frame square',
	                    type: 'li'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.completeContent
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
	                        'You have not won this level,',
	                        React.createElement('br', null),
	                        'but don\'t worry\u2014',
	                        React.createElement('br', null),
	                        'you have another chance!'
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
	                ref: 'intro',
	                src: '' + CMWN.MEDIA.VO + opts.introVO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'complete',
	                src: CMWN.MEDIA.VO + 'Level_' + opts.level + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-1',
	                src: '' + CMWN.MEDIA.VO + opts.fact1VO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-2',
	                src: '' + CMWN.MEDIA.VO + opts.fact2VO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'fact-3',
	                src: '' + CMWN.MEDIA.VO + opts.fact3VO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: 'voiceOver',
	                ref: 'replay',
	                src: CMWN.MEDIA.VO + 'Another_Chance.mp3',
	                complete: true
	            })
	        )
	    );
	};
	
	var _classnames = __webpack_require__(13);
	
	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 2,
	        introVO: 'landfill',
	        fact1VO: 'Portions',
	        fact2VO: 'Reusable_Bags',
	        fact3VO: 'Rules',
	        introContent: React.createElement(
	            'p',
	            null,
	            'In this level,',
	            React.createElement('br', null),
	            'you\'ll discover ways',
	            React.createElement('br', null),
	            'to keep waste',
	            React.createElement('br', null),
	            'out of the landfill!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'Excellent Work!',
	            React.createElement('br', null),
	            'Reusing certain items is one of',
	            React.createElement('br', null),
	            'the best ways to reduce',
	            React.createElement('br', null),
	            'waste\u2014and it saves',
	            React.createElement('br', null),
	            'you money too!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Choose Smaller Food Portions'
	            ),
	            'Tip: Sometimes our eyes can',
	            React.createElement('br', null),
	            'be bigger than our stomachs!',
	            React.createElement('br', null),
	            'Only take as much food',
	            React.createElement('br', null),
	            'as you can eat.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Carry Reusable Bags'
	            ),
	            'Tip: Keep a canvas bag with',
	            React.createElement('br', null),
	            'you wherever you go,',
	            React.createElement('br', null),
	            'so if you shop you can',
	            React.createElement('br', null),
	            'avoid using plastic!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Discover Recycling Rules'
	            ),
	            'Tip: Each city has their own',
	            React.createElement('br', null),
	            'recycling rules. Discover the',
	            React.createElement('br', null),
	            'rules for where you live!'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(20);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 3,
	        introVO: 'find_out_how',
	        fact1VO: 'Less_Packaging',
	        // this VO needs to be replaced
	        fact2VO: 'Reusable_Bags',
	        fact3VO: 'Friends',
	        introContent: React.createElement(
	            'p',
	            null,
	            'Learning ways to reduce,',
	            React.createElement('br', null),
	            'reuse and recycle is the',
	            React.createElement('br', null),
	            'goal\u2014collect all',
	            React.createElement('br', null),
	            'the ',
	            React.createElement('span', { className: 'truck' }),
	            ' to',
	            React.createElement('br', null),
	            'find out how!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You\'re a Recycling Wizard!',
	            React.createElement('br', null),
	            'Being mindful of how you',
	            React.createElement('br', null),
	            'handle waste helps',
	            React.createElement('br', null),
	            'keep the environment',
	            React.createElement('br', null),
	            'in great shape.'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Buy Items with Less Packaging'
	            ),
	            'Tip: Some products have more',
	            React.createElement('br', null),
	            'eco-friendly packaging than',
	            React.createElement('br', null),
	            'others. Be smart!'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Buy Clothing at a Thrift Shop'
	            ),
	            'Tip: Save gently used clothing',
	            React.createElement('br', null),
	            'from the landfill by buying',
	            React.createElement('br', null),
	            'at thrift stores!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Encourage Friends and',
	                React.createElement('br', null),
	                'Family to Recycle'
	            ),
	            'Tip: Give those closest to you',
	            React.createElement('br', null),
	            'friendly reminders to',
	            React.createElement('br', null),
	            'properly recycle their waste.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(20);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

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
	        level: 4,
	        introVO: 'And_The_World',
	        fact1VO: 'BothSides',
	        fact2VO: 'Container',
	        fact3VO: 'Electronics',
	        introContent: React.createElement(
	            'p',
	            null,
	            'By collecting the ',
	            React.createElement('span', { className: 'truck' }),
	            React.createElement('br', null),
	            'and disposing of waste',
	            React.createElement('br', null),
	            'properly, you can help',
	            React.createElement('br', null),
	            'both your community',
	            React.createElement('br', null),
	            'and the world!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You\'re a Recycling Wizard!',
	            React.createElement('br', null),
	            'Being mindful of how you',
	            React.createElement('br', null),
	            'handle waste helps',
	            React.createElement('br', null),
	            'keep the environment',
	            React.createElement('br', null),
	            'in great shape.'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Use Both Sides of a',
	                React.createElement('br', null),
	                'Piece of Paper'
	            ),
	            'Tip: Whether doing your homework',
	            React.createElement('br', null),
	            'or making a shopping list,',
	            React.createElement('br', null),
	            'writing on both sides of',
	            React.createElement('br', null),
	            'notepaper is the',
	            React.createElement('br', null),
	            'right thing to do!'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Put Your Lunch in',
	                React.createElement('br', null),
	                'a Reusable Container'
	            ),
	            'Tip: Instead of carrying your',
	            React.createElement('br', null),
	            'lunch in a paper or',
	            React.createElement('br', null),
	            'plastic bag, why not use',
	            React.createElement('br', null),
	            'a reusable container?'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Recycle Your Electronics'
	            ),
	            'Tip: Electronic waste contains',
	            React.createElement('br', null),
	            'hazardous materials and',
	            React.createElement('br', null),
	            'toxins and should always be',
	            React.createElement('br', null),
	            'recycled appropriately.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(20);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _phaser_game_screen_component2.default)(props, ref, key, {
	        level: 5,
	        introVO: 'AlmostThere',
	        fact1VO: 'Bulk',
	        fact2VO: 'Bottled_Water',
	        fact3VO: 'Boxes',
	        introContent: React.createElement(
	            'p',
	            null,
	            'You\'re almost there! Keep',
	            React.createElement('br', null),
	            'picking up waste and learning',
	            React.createElement('br', null),
	            'tips as you head',
	            React.createElement('br', null),
	            'to the finish line!'
	        ),
	        completeContent: React.createElement(
	            'p',
	            null,
	            'You\'ve won the game!',
	            React.createElement('br', null),
	            'Now take what you\'ve learned,',
	            React.createElement('br', null),
	            'go out into the world,',
	            React.createElement('br', null),
	            'and do your part!'
	        ),
	        fact1Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Buy In Bulk'
	            ),
	            'Tip: Individually-wrapped items',
	            React.createElement('br', null),
	            'use more packaging than',
	            React.createElement('br', null),
	            'a whole bunch of them',
	            React.createElement('br', null),
	            'sold in one package.'
	        ),
	        fact2Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Carry Water in a',
	                React.createElement('br', null),
	                'Reusable Water Bottle'
	            ),
	            'Tip: Bottled water uses containers',
	            React.createElement('br', null),
	            'designed to be used only once.',
	            React.createElement('br', null),
	            'But special reusable water',
	            React.createElement('br', null),
	            'bottles can be filled with',
	            React.createElement('br', null),
	            'water from your tap!'
	        ),
	        fact3Content: React.createElement(
	            'p',
	            null,
	            React.createElement(
	                'span',
	                null,
	                'Prepare Your Cardboard',
	                React.createElement('br', null),
	                'for Recycling'
	            ),
	            'Tip: Break boxes down to save',
	            React.createElement('br', null),
	            'space, and be sure',
	            React.createElement('br', null),
	            'to remove any food waste.'
	        )
	    });
	};
	
	var _phaser_game_screen_component = __webpack_require__(20);
	
	var _phaser_game_screen_component2 = _interopRequireDefault(_phaser_game_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	            id: "neighborhood-waste"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'identifywaste.mp3'
	        }),
	        React.createElement("div", { className: "tree-3" }),
	        React.createElement("div", { className: "tree-4" }),
	        React.createElement(skoash.Image, {
	            className: "turtle",
	            src: CMWN.MEDIA.IMAGE + 'main.turtle.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.4.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'frame.round.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame round" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                "Now that the",
	                React.createElement("br", null),
	                "neighborhood waste",
	                React.createElement("br", null),
	                "has been picked up, let's",
	                React.createElement("br", null),
	                "identify the different",
	                React.createElement("br", null),
	                "types of waste!"
	            )
	        )
	    );
	};

/***/ },
/* 26 */
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
	            id: "types-of-waste"
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.1.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.2.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'cards.3.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'card.png'
	        }),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.selectable.target.props.message')
	            },
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "compost",
	                src: CMWN.MEDIA.VO + 'compost.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "recycle",
	                src: CMWN.MEDIA.VO + 'Recycles.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                type: "voiceOver",
	                ref: "landfill",
	                src: CMWN.MEDIA.VO + 'Landfill_Desc.mp3'
	            })
	        ),
	        React.createElement(skoash.Selectable, {
	            dataTarget: "selectable",
	            selectClass: "HIGHLIGHTED",
	            list: [React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "compost" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement(
	                        "div",
	                        null,
	                        "Discarded organic matter",
	                        React.createElement("br", null),
	                        "such as plant scraps and",
	                        React.createElement("br", null),
	                        "egg shells can all be turned",
	                        React.createElement("br", null),
	                        "into mineral-rich soil."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "recycle" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement(
	                        "div",
	                        null,
	                        "Metal, glass, and certain",
	                        React.createElement("br", null),
	                        "types of paper and plastic",
	                        React.createElement("br", null),
	                        "can be recycled."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            ), React.createElement(
	                skoash.Component,
	                { type: "li", correct: true, message: "landfill" },
	                React.createElement(
	                    "div",
	                    { className: "side b" },
	                    React.createElement(
	                        "div",
	                        null,
	                        "Alas, not all waste can be",
	                        React.createElement("br", null),
	                        "recycled or composted.",
	                        React.createElement("br", null),
	                        "Soiled tissues, plastic",
	                        React.createElement("br", null),
	                        "diapers, and more are just",
	                        React.createElement("br", null),
	                        "some of the times that",
	                        React.createElement("br", null),
	                        "might end up in the landfill!"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "side a" },
	                    React.createElement("div", null)
	                )
	            )]
	        })
	    );
	};

/***/ },
/* 27 */
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
	            id: "waste-sort-center"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Help_Me.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "title",
	            src: CMWN.MEDIA.IMAGE + 'sort.title.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "turtle",
	            src: CMWN.MEDIA.IMAGE + 'main.turtle.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'frame.round.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame round" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                "Now that we've learned the",
	                React.createElement("br", null),
	                "best ways to separate waste,",
	                React.createElement("br", null),
	                "let's test your knowledge",
	                React.createElement("br", null),
	                "by helping me at the",
	                React.createElement("br", null),
	                "Waste Sorting Center."
	            )
	        )
	    );
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _sorting_game_component2.default)(props, ref, key, {
	        level: 1,
	        points: 100,
	        timer: 120000,
	        instructionsVO: 'Launch_The_Object',
	        completeVO: 'Waste_Sorting_Wizard',
	        completeSFX: 'LevelComplete',
	        instructions: React.createElement(
	            'p',
	            null,
	            'Launch the object into the correct bin before',
	            React.createElement('br', null),
	            'the timer runs out to get to the next level.',
	            React.createElement('br', null),
	            React.createElement('br', null),
	            'Should the waste be recycled,',
	            React.createElement('br', null),
	            'composted, or taken to the landfill?',
	            React.createElement('br', null),
	            'This is your chance to prove what',
	            React.createElement('br', null),
	            'you know and gain points!'
	        ),
	        complete: React.createElement(
	            'p',
	            null,
	            'Now try your hand at',
	            React.createElement('br', null),
	            'the next level of sorting!'
	        )
	    });
	};
	
	var _sorting_game_component = __webpack_require__(29);
	
	var _sorting_game_component2 = _interopRequireDefault(_sorting_game_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	            id: 'sorting-level-' + opts.level,
	            className: 'reveal-open-' + _.get(props, 'data.reveal.open', '')
	        }),
	        React.createElement(
	            skoash.MediaCollection,
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
	            React.createElement(
	                skoash.MediaSequence,
	                {
	                    ref: 'instructions',
	                    silentOnStart: true
	                },
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    src: CMWN.MEDIA.VO + 'Waste_Sorting_Center.mp3'
	                }),
	                React.createElement(skoash.Audio, {
	                    type: 'voiceOver',
	                    src: '' + CMWN.MEDIA.VO + opts.instructionsVO + '.mp3'
	                })
	            ),
	            React.createElement(skoash.Audio, {
	                ref: 'complete',
	                type: 'voiceOver',
	                src: '' + CMWN.MEDIA.VO + opts.completeVO + '.mp3'
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'retry',
	                type: 'voiceOver',
	                src: CMWN.MEDIA.VO + 'Keep_Sorting.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(
	            skoash.MediaCollection,
	            {
	                play: _.get(props, 'data.game.play', _.get(props, 'data.reveal.open', null))
	            },
	            React.createElement(skoash.Audio, {
	                ref: 'correct',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'Correct.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'incorrect',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'WrongBinForItem.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'warning',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'TenSecondsWarning.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'fire',
	                type: 'sfx',
	                src: CMWN.MEDIA.EFFECT + 'SlingshotRelease_sortButton.mp3',
	                complete: true
	            }),
	            React.createElement(skoash.Audio, {
	                ref: 'complete',
	                type: 'sfx',
	                src: '' + CMWN.MEDIA.EFFECT + opts.completeSFX + '.mp3',
	                complete: true
	            })
	        ),
	        React.createElement(
	            skoash.Component,
	            null,
	            images
	        ),
	        React.createElement(skoash.SpriteAnimation, {
	            className: 'slingshot',
	            src: CMWN.MEDIA.SPRITE + 'slingshot.png',
	            animate: _.get(props, 'data.game.firing', false),
	            animateOnStart: false,
	            frames: 6,
	            complete: true
	        }),
	        React.createElement(_3.default, {
	            ref: 'carousel',
	            completeOnStart: true,
	            checkComplete: false,
	            showNum: 7,
	            targetIndex: 4,
	            selected: _.get(props, 'data.game.fired'),
	            onSelect: function onSelect(target) {
	                var correct = _.get(props, 'data.game.correct', 0);
	                var incorrect = _.get(props, 'data.game.incorrect', 0);
	                var classes = this.state.classes;
	                var play;
	
	                classes[target.props['data-key']] = 'SELECTED';
	
	                this.setState({
	                    classes: classes
	                }, function () {
	                    setTimeout(function () {
	                        classes[target.props['data-key']] = '';
	                    }, 1000);
	                });
	
	                if (target.props.name === _.get(props, 'data.game.fired.props.message')) {
	                    correct++;
	                    play = 'correct';
	                } else {
	                    incorrect++;
	                    play = 'incorrect';
	                }
	
	                this.updateGameState({
	                    path: 'game',
	                    data: {
	                        correct: correct,
	                        incorrect: incorrect,
	                        play: play
	                    }
	                });
	            },
	            bin: React.createElement(_7.default, {
	                ref: 'randomizer',
	                completeOnStart: true,
	                checkComplete: false,
	                remain: true,
	                bin: [React.createElement(skoash.Component, { className: 'recycle', name: 'recycle' }), React.createElement(skoash.Component, { className: 'landfill', name: 'landfill' }), React.createElement(skoash.Component, { className: 'compost', name: 'compost' }), React.createElement(skoash.Component, { className: 'recycle', name: 'recycle' }), React.createElement(skoash.Component, { className: 'landfill', name: 'landfill' }), React.createElement(skoash.Component, { className: 'compost', name: 'compost' }), React.createElement(skoash.Component, { className: 'recycle', name: 'recycle' }), React.createElement(skoash.Component, { className: 'landfill', name: 'landfill' }), React.createElement(skoash.Component, { className: 'compost', name: 'compost' })]
	            })
	        }),
	        React.createElement(_5.default, {
	            ref: 'cannon',
	            completeOnStart: true,
	            checkComplete: false,
	            reverseReload: true,
	            launchButton: true,
	            reloadTime: 2000,
	            dataDelay: 1000,
	            showNum: 0,
	            bin: React.createElement(_7.default, {
	                completeOnStart: true,
	                checkComplete: false,
	                bin: [React.createElement(skoash.Component, { className: 'flowers', message: 'compost' }), React.createElement(skoash.Component, { className: 'paper', message: 'recycle' }), React.createElement(skoash.Component, { className: 'newspaper', message: 'recycle' }), React.createElement(skoash.Component, { className: 'napkin', message: 'landfill' }), React.createElement(skoash.Component, { className: 'lettuce', message: 'compost' }), React.createElement(skoash.Component, { className: 'juice', message: 'recycle' }), React.createElement(skoash.Component, { className: 'eggshell', message: 'compost' }), React.createElement(skoash.Component, { className: 'diaper', message: 'landfill' }), React.createElement(skoash.Component, { className: 'mug', message: 'landfill' }), React.createElement(skoash.Component, { className: 'coffee', message: 'compost' }), React.createElement(skoash.Component, { className: 'box', message: 'recycle' }), React.createElement(skoash.Component, { className: 'can', message: 'recycle' }), React.createElement(skoash.Component, { className: 'bottle', message: 'recycle' }), React.createElement(skoash.Component, { className: 'banana', message: 'compost' }), React.createElement(skoash.Component, { className: 'apple', message: 'compost' })]
	            })
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'stats' },
	            React.createElement(
	                'div',
	                { className: 'level' },
	                React.createElement(
	                    'p',
	                    null,
	                    'level'
	                ),
	                opts.level
	            ),
	            React.createElement(skoash.Timer, {
	                ref: 'timer',
	                countDown: true,
	                timeout: opts.timer,
	                stop: _.get(props, 'data.game.complete', false),
	                complete: _.get(props, 'data.game.complete', false),
	                checkComplete: _.get(props, 'data.game.start', false),
	                restart: _.get(props, 'data.game.start', false),
	                leadingContent: React.createElement(
	                    'p',
	                    null,
	                    'time'
	                ),
	                onComplete: function onComplete() {
	                    if (_.get(props, 'data.game.complete')) return;
	                    this.updateGameState({
	                        path: 'reveal',
	                        data: {
	                            open: 'retry'
	                        }
	                    });
	
	                    this.updateGameState({
	                        path: 'game',
	                        data: {
	                            correct: 0,
	                            incorrect: 0
	                        }
	                    });
	                }
	            }),
	            React.createElement(skoash.Score, {
	                ref: 'score',
	                max: opts.points,
	                increment: 10,
	                correct: _.get(props, 'data.game.correct', 0),
	                incorrect: _.get(props, 'data.game.incorrect', 0),
	                leadingContent: React.createElement(
	                    'p',
	                    null,
	                    'score'
	                ),
	                onComplete: function onComplete() {
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
	                }
	            })
	        ),
	        React.createElement(skoash.Reveal, {
	            openOnStart: 'instructions',
	            openTarget: 'reveal',
	            closeTarget: 'reveal',
	            openReveal: _.get(props, 'data.reveal.open', null),
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
	                {
	                    ref: 'instructions',
	                    className: 'instructions frame round'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.instructions
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'complete',
	                    className: 'complete frame round'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    opts.complete
	                )
	            ), React.createElement(
	                skoash.Component,
	                {
	                    ref: 'retry',
	                    className: 'retry frame round'
	                },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    React.createElement(
	                        'p',
	                        null,
	                        'Keep Sorting!',
	                        React.createElement('br', null),
	                        'If you don\'t succeed,',
	                        React.createElement('br', null),
	                        'try again!'
	                    )
	                )
	            )]
	        })
	    );
	};
	
	var _2 = __webpack_require__(30);
	
	var _3 = _interopRequireDefault(_2);
	
	var _4 = __webpack_require__(41);
	
	var _5 = _interopRequireDefault(_4);
	
	var _6 = __webpack_require__(42);
	
	var _7 = _interopRequireDefault(_6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var images = [];
	
	for (var i = 1; i < 9; i++) {
	    images.push(React.createElement(skoash.Image, {
	        key: i,
	        className: 'hidden',
	        src: CMWN.MEDIA.SPRITE + 'game2.' + i + '.png'
	    }));
	}
	
	images.push(React.createElement(skoash.Image, {
	    key: 9,
	    className: 'hidden',
	    src: CMWN.MEDIA.SPRITE + 'slingshot.png'
	}));

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
	
	var _classnames = __webpack_require__(13);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _shortid = __webpack_require__(31);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _2 = __webpack_require__(40);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(32);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(33);
	var encode = __webpack_require__(35);
	var decode = __webpack_require__(37);
	var isValid = __webpack_require__(38);
	
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
	var clusterWorkerId = __webpack_require__(39) || 0;
	
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(34);
	
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(36);
	
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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(33);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(33);
	
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
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(13);
	
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(13);
	
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classnames = __webpack_require__(13);
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _sorting_game_component2.default)(props, ref, key, {
	        level: 2,
	        points: 100,
	        timer: 120000,
	        instructionsVO: 'Get_Ready_Go',
	        completeVO: 'Waste_Sorting_Wizard',
	        completeSFX: 'LevelComplete',
	        instructions: React.createElement(
	            'p',
	            null,
	            'Sorting is just about to',
	            React.createElement('br', null),
	            'get a little tougher!',
	            React.createElement('br', null),
	            'Get Ready! Go!'
	        ),
	        complete: React.createElement(
	            'p',
	            null,
	            'Wow, you\'re doing',
	            React.createElement('br', null),
	            'amazing sorting work!',
	            React.createElement('br', null),
	            'Keep going and become',
	            React.createElement('br', null),
	            'a Sorting Champion!'
	        )
	    });
	};
	
	var _sorting_game_component = __webpack_require__(29);
	
	var _sorting_game_component2 = _interopRequireDefault(_sorting_game_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (props, ref, key) {
	    return (0, _sorting_game_component2.default)(props, ref, key, {
	        level: 3,
	        points: 100,
	        timer: 120000,
	        instructionsVO: 'Waste_Sorting_Action',
	        completeVO: 'Waste_Sorting_Wizard',
	        completeSFX: 'GameWon',
	        instructions: React.createElement(
	            'p',
	            null,
	            'The clock is set!',
	            React.createElement('br', null),
	            'Get ready for some',
	            React.createElement('br', null),
	            'challenging waste',
	            React.createElement('br', null),
	            'sorting action!'
	        ),
	        complete: React.createElement(
	            'p',
	            null,
	            'You are now a',
	            React.createElement(
	                'h3',
	                null,
	                'WASTE SORTING CHAMPION'
	            ),
	            'Thank you for learning',
	            React.createElement('br', null),
	            'about the right way',
	            React.createElement('br', null),
	            'to dispose of waste.'
	        )
	    });
	};
	
	var _sorting_game_component = __webpack_require__(29);
	
	var _sorting_game_component2 = _interopRequireDefault(_sorting_game_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	            id: "take-action"
	        }),
	        React.createElement(skoash.Audio, {
	            type: "voiceOver",
	            src: CMWN.MEDIA.VO + 'Home_and_School.mp3'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'banner.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.SPRITE + 'game2.4.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: "hidden",
	            src: CMWN.MEDIA.IMAGE + 'frame.round.png'
	        }),
	        React.createElement(
	            "div",
	            { className: "frame round" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                "Now that you've learned",
	                React.createElement("br", null),
	                "how to dispose of waste",
	                React.createElement("br", null),
	                "responsibly, take action in",
	                React.createElement("br", null),
	                "your home and school!"
	            )
	        )
	    );
	};

/***/ },
/* 46 */
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
	            id: 'flip',
	            emitOnComplete: {
	                name: 'flip'
	            }
	        }),
	        React.createElement(skoash.Audio, {
	            type: 'voiceOver',
	            src: CMWN.MEDIA.VO + 'filp.mp3',
	            playTarget: 'vo'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.IMAGE + 'frame.square.png'
	        }),
	        React.createElement(skoash.Image, {
	            className: 'hidden',
	            src: CMWN.MEDIA.SPRITE + 'flip.trees.png'
	        }),
	        React.createElement(
	            skoash.Component,
	            { className: 'frame square' },
	            React.createElement(
	                skoash.Component,
	                { className: 'content' },
	                React.createElement(skoash.Image, {
	                    className: (0, _classnames2.default)('flip', {
	                        show: _.get(props, 'data.vo.playing')
	                    }),
	                    src: flipEarned
	                }),
	                React.createElement(skoash.Image, {
	                    className: (0, _classnames2.default)('flip', {
	                        show: !_.get(props, 'data.vo.playing')
	                    }),
	                    src: flipStatic
	                }),
	                React.createElement(skoash.Image, {
	                    className: 'title',
	                    src: CMWN.MEDIA.IMAGE + 'flip.text.png'
	                }),
	                React.createElement(
	                    'p',
	                    null,
	                    'Thanks for taking',
	                    React.createElement('br', null),
	                    'the time to learn',
	                    React.createElement('br', null),
	                    'about how you',
	                    React.createElement('br', null),
	                    'can help the',
	                    React.createElement('br', null),
	                    'environment!'
	                )
	            )
	        )
	    );
	};
	
	var _classnames = __webpack_require__(13);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var flipEarned = CMWN.MEDIA.BASE + 'Flips/PLT%20Wastebuster%20Flip/PLT%20-%20Animated%20Earned%20Flip/PLT.AnimatedearnedFlip.gif';
	
	var flipStatic = CMWN.MEDIA.BASE + 'Flips/PLT%20Wastebuster%20Flip/PLT-%20Static%20Image%20Flip/PLT.StaticFlip.png';

/***/ },
/* 47 */
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