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
/******/ 	var hotCurrentHash = "a91efe69fd141f4f7ee2"; // eslint-disable-line no-unused-vars
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

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

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

	var _hi_there_screen = __webpack_require__(11);

	var _hi_there_screen2 = _interopRequireDefault(_hi_there_screen);

	var _key_is_sorting_screen = __webpack_require__(14);

	var _key_is_sorting_screen2 = _interopRequireDefault(_key_is_sorting_screen);

	var _lights_screen = __webpack_require__(16);

	var _lights_screen2 = _interopRequireDefault(_lights_screen);

	var _five_ways_screen = __webpack_require__(18);

	var _five_ways_screen2 = _interopRequireDefault(_five_ways_screen);

	var _level_screen_component = __webpack_require__(20);

	var _level_screen_component2 = _interopRequireDefault(_level_screen_component);

	var _recycling_champion_one_info_screen = __webpack_require__(21);

	var _recycling_champion_one_info_screen2 = _interopRequireDefault(_recycling_champion_one_info_screen);

	var _recycling_champion_level_one_screen = __webpack_require__(22);

	var _recycling_champion_level_one_screen2 = _interopRequireDefault(_recycling_champion_level_one_screen);

	var _recycling_champion_two_info_screen = __webpack_require__(34);

	var _recycling_champion_two_info_screen2 = _interopRequireDefault(_recycling_champion_two_info_screen);

	var _recycling_champion_level_two_screen = __webpack_require__(35);

	var _recycling_champion_level_two_screen2 = _interopRequireDefault(_recycling_champion_level_two_screen);

	var _recycling_champion_three_info_screen = __webpack_require__(36);

	var _recycling_champion_three_info_screen2 = _interopRequireDefault(_recycling_champion_three_info_screen);

	var _recycling_champion_level_three_screen = __webpack_require__(37);

	var _recycling_champion_level_three_screen2 = _interopRequireDefault(_recycling_champion_level_three_screen);

	var _recycling_champion_four_info_screen = __webpack_require__(38);

	var _recycling_champion_four_info_screen2 = _interopRequireDefault(_recycling_champion_four_info_screen);

	var _recycling_champion_level_four_screen = __webpack_require__(39);

	var _recycling_champion_level_four_screen2 = _interopRequireDefault(_recycling_champion_level_four_screen);

	var _recycling_champion_five_info_screen = __webpack_require__(40);

	var _recycling_champion_five_info_screen2 = _interopRequireDefault(_recycling_champion_five_info_screen);

	var _recycling_champion_level_five_screen = __webpack_require__(41);

	var _recycling_champion_level_five_screen2 = _interopRequireDefault(_recycling_champion_level_five_screen);

	var _level_complete_screen_component = __webpack_require__(42);

	var _level_complete_screen_component2 = _interopRequireDefault(_level_complete_screen_component);

	var _priceless_pourer_one_info_screen = __webpack_require__(43);

	var _priceless_pourer_one_info_screen2 = _interopRequireDefault(_priceless_pourer_one_info_screen);

	var _priceless_pourer_level_one_screen = __webpack_require__(44);

	var _priceless_pourer_level_one_screen2 = _interopRequireDefault(_priceless_pourer_level_one_screen);

	var _priceless_pourer_two_info_screen = __webpack_require__(46);

	var _priceless_pourer_two_info_screen2 = _interopRequireDefault(_priceless_pourer_two_info_screen);

	var _priceless_pourer_level_two_screen = __webpack_require__(47);

	var _priceless_pourer_level_two_screen2 = _interopRequireDefault(_priceless_pourer_level_two_screen);

	var _priceless_pourer_three_info_screen = __webpack_require__(48);

	var _priceless_pourer_three_info_screen2 = _interopRequireDefault(_priceless_pourer_three_info_screen);

	var _priceless_pourer_level_three_screen = __webpack_require__(49);

	var _priceless_pourer_level_three_screen2 = _interopRequireDefault(_priceless_pourer_level_three_screen);

	var _priceless_pourer_four_info_screen = __webpack_require__(50);

	var _priceless_pourer_four_info_screen2 = _interopRequireDefault(_priceless_pourer_four_info_screen);

	var _priceless_pourer_level_four_screen = __webpack_require__(51);

	var _priceless_pourer_level_four_screen2 = _interopRequireDefault(_priceless_pourer_level_four_screen);

	var _priceless_pourer_five_info_screen = __webpack_require__(52);

	var _priceless_pourer_five_info_screen2 = _interopRequireDefault(_priceless_pourer_five_info_screen);

	var _priceless_pourer_level_five_screen = __webpack_require__(53);

	var _priceless_pourer_level_five_screen2 = _interopRequireDefault(_priceless_pourer_level_five_screen);

	var _fantastic_food_sharer_one_info_screen = __webpack_require__(54);

	var _fantastic_food_sharer_one_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_one_info_screen);

	var _fantastic_food_sharer_level_one_screen = __webpack_require__(55);

	var _fantastic_food_sharer_level_one_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_one_screen);

	var _fantastic_food_sharer_two_info_screen = __webpack_require__(57);

	var _fantastic_food_sharer_two_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_two_info_screen);

	var _fantastic_food_sharer_level_two_screen = __webpack_require__(58);

	var _fantastic_food_sharer_level_two_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_two_screen);

	var _fantastic_food_sharer_three_info_screen = __webpack_require__(59);

	var _fantastic_food_sharer_three_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_three_info_screen);

	var _fantastic_food_sharer_level_three_screen = __webpack_require__(60);

	var _fantastic_food_sharer_level_three_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_three_screen);

	var _fantastic_food_sharer_four_info_screen = __webpack_require__(61);

	var _fantastic_food_sharer_four_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_four_info_screen);

	var _fantastic_food_sharer_level_four_screen = __webpack_require__(62);

	var _fantastic_food_sharer_level_four_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_four_screen);

	var _fantastic_food_sharer_five_info_screen = __webpack_require__(63);

	var _fantastic_food_sharer_five_info_screen2 = _interopRequireDefault(_fantastic_food_sharer_five_info_screen);

	var _fantastic_food_sharer_level_five_screen = __webpack_require__(64);

	var _fantastic_food_sharer_level_five_screen2 = _interopRequireDefault(_fantastic_food_sharer_level_five_screen);

	var _dynamic_diverter_one_info_screen = __webpack_require__(65);

	var _dynamic_diverter_one_info_screen2 = _interopRequireDefault(_dynamic_diverter_one_info_screen);

	var _dynamic_diverter_level_one_screen = __webpack_require__(66);

	var _dynamic_diverter_level_one_screen2 = _interopRequireDefault(_dynamic_diverter_level_one_screen);

	var _dynamic_diverter_two_info_screen = __webpack_require__(82);

	var _dynamic_diverter_two_info_screen2 = _interopRequireDefault(_dynamic_diverter_two_info_screen);

	var _dynamic_diverter_level_two_screen = __webpack_require__(83);

	var _dynamic_diverter_level_two_screen2 = _interopRequireDefault(_dynamic_diverter_level_two_screen);

	var _dynamic_diverter_three_info_screen = __webpack_require__(84);

	var _dynamic_diverter_three_info_screen2 = _interopRequireDefault(_dynamic_diverter_three_info_screen);

	var _dynamic_diverter_level_three_screen = __webpack_require__(85);

	var _dynamic_diverter_level_three_screen2 = _interopRequireDefault(_dynamic_diverter_level_three_screen);

	var _dynamic_diverter_four_info_screen = __webpack_require__(86);

	var _dynamic_diverter_four_info_screen2 = _interopRequireDefault(_dynamic_diverter_four_info_screen);

	var _dynamic_diverter_level_four_screen = __webpack_require__(87);

	var _dynamic_diverter_level_four_screen2 = _interopRequireDefault(_dynamic_diverter_level_four_screen);

	var _dynamic_diverter_five_info_screen = __webpack_require__(88);

	var _dynamic_diverter_five_info_screen2 = _interopRequireDefault(_dynamic_diverter_five_info_screen);

	var _dynamic_diverter_level_five_screen = __webpack_require__(89);

	var _dynamic_diverter_level_five_screen2 = _interopRequireDefault(_dynamic_diverter_level_five_screen);

	var _want_to_stack_screen = __webpack_require__(90);

	var _want_to_stack_screen2 = _interopRequireDefault(_want_to_stack_screen);

	var _video_screen = __webpack_require__(91);

	var _video_screen2 = _interopRequireDefault(_video_screen);

	var _master_sorter_one_info_screen = __webpack_require__(92);

	var _master_sorter_one_info_screen2 = _interopRequireDefault(_master_sorter_one_info_screen);

	var _master_sorter_level_one_screen = __webpack_require__(93);

	var _master_sorter_level_one_screen2 = _interopRequireDefault(_master_sorter_level_one_screen);

	var _master_sorter_two_info_screen = __webpack_require__(96);

	var _master_sorter_two_info_screen2 = _interopRequireDefault(_master_sorter_two_info_screen);

	var _master_sorter_level_two_screen = __webpack_require__(97);

	var _master_sorter_level_two_screen2 = _interopRequireDefault(_master_sorter_level_two_screen);

	var _master_sorter_three_info_screen = __webpack_require__(98);

	var _master_sorter_three_info_screen2 = _interopRequireDefault(_master_sorter_three_info_screen);

	var _master_sorter_level_three_screen = __webpack_require__(99);

	var _master_sorter_level_three_screen2 = _interopRequireDefault(_master_sorter_level_three_screen);

	var _master_sorter_four_info_screen = __webpack_require__(100);

	var _master_sorter_four_info_screen2 = _interopRequireDefault(_master_sorter_four_info_screen);

	var _master_sorter_level_four_screen = __webpack_require__(101);

	var _master_sorter_level_four_screen2 = _interopRequireDefault(_master_sorter_level_four_screen);

	var _master_sorter_five_info_screen = __webpack_require__(102);

	var _master_sorter_five_info_screen2 = _interopRequireDefault(_master_sorter_five_info_screen);

	var _master_sorter_level_five_screen = __webpack_require__(103);

	var _master_sorter_level_five_screen2 = _interopRequireDefault(_master_sorter_level_five_screen);

	var _now_a_member_screen = __webpack_require__(104);

	var _now_a_member_screen2 = _interopRequireDefault(_now_a_member_screen);

	var _quit_screen = __webpack_require__(105);

	var _quit_screen2 = _interopRequireDefault(_quit_screen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	skoash.start(React.createElement(skoash.Game, {
	    config: _config2.default,
	    loader: React.createElement(_2.default, null),
	    screens: [_4.default, _title_screen2.default, _hi_there_screen2.default, _key_is_sorting_screen2.default, _lights_screen2.default, _five_ways_screen2.default, (0, _level_screen_component2.default)(1.0), _recycling_champion_one_info_screen2.default, _recycling_champion_level_one_screen2.default, (0, _level_screen_component2.default)(1.1), _recycling_champion_two_info_screen2.default, _recycling_champion_level_two_screen2.default, (0, _level_screen_component2.default)(1.2), _recycling_champion_three_info_screen2.default, _recycling_champion_level_three_screen2.default, (0, _level_screen_component2.default)(1.3), _recycling_champion_four_info_screen2.default, _recycling_champion_level_four_screen2.default, (0, _level_screen_component2.default)(1.4), _recycling_champion_five_info_screen2.default, _recycling_champion_level_five_screen2.default, (0, _level_screen_component2.default)(1.5), (0, _level_complete_screen_component2.default)(1), (0, _level_screen_component2.default)(2.0), _priceless_pourer_one_info_screen2.default, _priceless_pourer_level_one_screen2.default, (0, _level_screen_component2.default)(2.1), _priceless_pourer_two_info_screen2.default, _priceless_pourer_level_two_screen2.default, (0, _level_screen_component2.default)(2.2), _priceless_pourer_three_info_screen2.default, _priceless_pourer_level_three_screen2.default, (0, _level_screen_component2.default)(2.3), _priceless_pourer_four_info_screen2.default, _priceless_pourer_level_four_screen2.default, (0, _level_screen_component2.default)(2.4), _priceless_pourer_five_info_screen2.default, _priceless_pourer_level_five_screen2.default, (0, _level_screen_component2.default)(2.5), (0, _level_complete_screen_component2.default)(2), (0, _level_screen_component2.default)(3.0), _fantastic_food_sharer_one_info_screen2.default, _fantastic_food_sharer_level_one_screen2.default, (0, _level_screen_component2.default)(3.1), _fantastic_food_sharer_two_info_screen2.default, _fantastic_food_sharer_level_two_screen2.default, (0, _level_screen_component2.default)(3.2), _fantastic_food_sharer_three_info_screen2.default, _fantastic_food_sharer_level_three_screen2.default, (0, _level_screen_component2.default)(3.3), _fantastic_food_sharer_four_info_screen2.default, _fantastic_food_sharer_level_four_screen2.default, (0, _level_screen_component2.default)(3.4), _fantastic_food_sharer_five_info_screen2.default, _fantastic_food_sharer_level_five_screen2.default, (0, _level_screen_component2.default)(3.5), (0, _level_complete_screen_component2.default)(3), (0, _level_screen_component2.default)(4.0), _dynamic_diverter_one_info_screen2.default, _dynamic_diverter_level_one_screen2.default, (0, _level_screen_component2.default)(4.1), _dynamic_diverter_two_info_screen2.default, _dynamic_diverter_level_two_screen2.default, (0, _level_screen_component2.default)(4.2), _dynamic_diverter_three_info_screen2.default, _dynamic_diverter_level_three_screen2.default, (0, _level_screen_component2.default)(4.3), _dynamic_diverter_four_info_screen2.default, _dynamic_diverter_level_four_screen2.default, (0, _level_screen_component2.default)(4.4), _dynamic_diverter_five_info_screen2.default, _dynamic_diverter_level_five_screen2.default, (0, _level_screen_component2.default)(4.5), (0, _level_complete_screen_component2.default)(4), _want_to_stack_screen2.default, _video_screen2.default, (0, _level_screen_component2.default)(5.0), _master_sorter_one_info_screen2.default, _master_sorter_level_one_screen2.default, (0, _level_screen_component2.default)(5.1), _master_sorter_two_info_screen2.default, _master_sorter_level_two_screen2.default, (0, _level_screen_component2.default)(5.2), _master_sorter_three_info_screen2.default, _master_sorter_level_three_screen2.default, (0, _level_screen_component2.default)(5.3), _master_sorter_four_info_screen2.default, _master_sorter_level_four_screen2.default, (0, _level_screen_component2.default)(5.4), _master_sorter_five_info_screen2.default, _master_sorter_level_five_screen2.default, (0, _level_screen_component2.default)(5.5), (0, _level_complete_screen_component2.default)(5), _now_a_member_screen2.default, (0, _level_complete_screen_component2.default)(6)],
	    menus: {
	        quit: _quit_screen2.default
	    },
	    assets: [React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_recycle.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_liquids.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_landfill.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_foodshare.json' }), React.createElement(skoash.JSON, { src: CMWN.MEDIA.SPRITE + '_compost.json' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_recycle.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_liquids.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_landfill.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_foodshare.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + '_compost.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'purple.ribbon.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'luggage.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.star.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.01.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'frame.02.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.FRAME + 'transition.frame.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.SPRITE + 'sprite.mainnav.png' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'titlescrnbg.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.01.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.02.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.03.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.04.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.transition.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.recycle.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.landfill.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'background.trash.compost.jpg' }), React.createElement(skoash.Image, { className: 'hidden', src: CMWN.MEDIA.IMAGE + 'quit.background.jpg' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'button', src: CMWN.MEDIA.EFFECT + 'ButtonClick.mp3' }), React.createElement(skoash.Audio, { type: 'sfx', ref: 'screen-complete', src: MEDIA.EFFECT + 'NextAppear.mp3' }), React.createElement(skoash.Audio, { ref: 'BKG0', type: 'background', src: CMWN.MEDIA.EFFECT + 'titlescreen.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG1', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG1.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG2', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG2.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG3', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG3.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG4', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG4.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG5', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG5.mp3', loop: true }), React.createElement(skoash.Audio, { ref: 'BKG6', type: 'background', src: CMWN.MEDIA.EFFECT + 'BKG6.mp3', loop: true }), React.createElement('div', { className: 'background title' }), React.createElement('div', { className: 'background bkg1' }), React.createElement('div', { className: 'background bkg2' }), React.createElement('div', { className: 'background bkg3' }), React.createElement('div', { className: 'background bkg4' }), React.createElement('div', { className: 'background trash' }), React.createElement('div', { className: 'background transition' }), React.createElement('div', { className: 'background quit' })]
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    fireworks: _fireworks2.default
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
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

	var _classnames = __webpack_require__(13);

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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	var _items_recycle = __webpack_require__(15);

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
/* 15 */
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
/* 16 */
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

	var _items_landfill = __webpack_require__(17);

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
/* 17 */
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
/* 18 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	var _items_compost = __webpack_require__(19);

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
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'compost';
	var names = ['apple-core', 'banana-peel', 'carrot-sticks', 'celery-stick', 'chicken-leg', 'coffee-cup-2', 'coffee-cup', 'coffee-grounds', 'dirty-paper-food-container', 'empty-raisin-box-1', 'empty-raisin-box-2', 'empty-raisin-box-3', 'empty-raisin-box-4', 'food-soiled-paper-plate', 'ham-sandwich', 'napkin-1', 'napkin-2', 'napkin-3', 'napkin-4', 'orange-slice', 'pencil-shavings-1', 'pencil-shavings-2', 'pencil-shavings-3', 'pencil-shavings', 'pizza-crust', 'soiled-paper-tray-1', 'soiled-paper-tray-2', 'soiled-paper-tray-3', 'solied-paper-tray-4', 'teabag', 'used-paper-food-container', 'used-paper-sandwich-wrapper-1', 'used-paper-sandwich-wrapper-2', 'used-paper-sandwich-wrapper-4', 'used-takeout-containers', 'white-paper-towel-sheet'];

	exports.default = _.map(names, function (name, frame) {
	    return {
	        name: name,
	        bin: bin,
	        frame: frame
	    };
		});

/***/ },
/* 20 */
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

	var _classnames = __webpack_require__(13);

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
/* 21 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 22 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 23 */
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
	        var revealOpen = _.get(props, 'data.reveal.open', false);
	        var revealClose = _.get(props, 'data.reveal.close', false);
	        var play = _.get(props, 'data.play', null);

	        var audioArray = opts.getAudioArray();

	        if (itemRef) catchableRefs = [itemRef];

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
	        opts.playAudio = play ? play : drop && !opts.truckClassName ? 'drop' : pickUp ? 'pickUp' : opts.next ? 'next' : opts.pour ? 'pour' : opts.next ? 'correct' : revealOpen === 'resort' ? 'resort' : revealOpen === 'retry' ? 'retry' : opts.itemNew ? _.kebabCase(opts.itemName) : dropClass === 'TRAY-STACKING' && _.includes(opts.itemName, 'tray') ? 'tray' : opts.itemName ? 'select' : null;

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
	                    pause: revealOpen,
	                    resume: !revealOpen,
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
	                openReveal: revealOpen,
	                closeReveal: revealClose,
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

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(24);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(27);

	var _5 = _interopRequireDefault(_4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var PTS = 'pts';

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _2 = __webpack_require__(25);

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
/* 25 */
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

	var _2 = __webpack_require__(26);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

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
/* 27 */
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

	var _2 = __webpack_require__(28);

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
	                var refs = _.filter(_this3.refs, function (v, k) {
	                    return !k.indexOf(ITEM);
	                });
	                _this3.invokeChildrenFunction('markCatchable');

	                _this3.updateScreenData({
	                    key: _this3.props.refsTarget,
	                    data: {
	                        refs: refs,
	                        next: false
	                    }
	                });

	                _this3.props.onNext.call(_this3);
	            });
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

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
	    extraComponents: [React.createElement(skoash.Image, { className: 'hidden', scr: CMWN.MEDIA.IMAGE + 'pipe01.png' })]
		}, _default_game_opts2.default);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _items_to_sort = __webpack_require__(31);

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
	        frame: v.frame || 1,
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _items_compost = __webpack_require__(19);

	var _items_compost2 = _interopRequireDefault(_items_compost);

	var _items_food_share = __webpack_require__(32);

	var _items_food_share2 = _interopRequireDefault(_items_food_share);

	var _items_landfill = __webpack_require__(17);

	var _items_landfill2 = _interopRequireDefault(_items_landfill);

	var _items_liquids = __webpack_require__(33);

	var _items_liquids2 = _interopRequireDefault(_items_liquids);

	var _items_recycle = __webpack_require__(15);

	var _items_recycle2 = _interopRequireDefault(_items_recycle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = [].concat(_items_compost2.default).concat(_items_food_share2.default).concat(_items_landfill2.default).concat(_items_liquids2.default).concat(_items_recycle2.default);

/***/ },
/* 32 */
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
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bin = 'liquids';
	var names = ['half-full-energy-drink-bottle', 'full-plastic-water-bottle-1', 'full-plastic-water-bottle-2', 'full-plastic-water-bottle-3', 'full-plastic-water-bottle-4', 'half-full-lemonade-box-1', 'half-full-lemonade-box-4', 'half-full-chocolate-milk-carton', 'half-full-milk-carton-1', 'half-full-milk-carton-2', 'half-full-milk-carton-3', 'half-full-milk-carton-4', 'half-full-milk-carton-5', 'half-full-milk-carton-6', 'half-full-milk-carton-7', 'half-full-milk-carton-8', 'half-full-orange-juice-2'];

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
	    name: 'empty-milk-carton-8',
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
/* 34 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 35 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 36 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 37 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 38 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 39 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 40 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 41 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_recycling_champion_opts = __webpack_require__(29);

	var _default_recycling_champion_opts2 = _interopRequireDefault(_default_recycling_champion_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 42 */
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
	            )
	        );
	    };
	};

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/* 43 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 44 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	var _items_liquids = __webpack_require__(33);

	var _items_liquids2 = _interopRequireDefault(_items_liquids);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var binNames = ['liquids', 'recycle', 'landfill', 'compost'];

	var itemsToSort = _.filter(_items_to_sort2.default.concat(_items_liquids2.default).concat(_items_liquids2.default), function (item) {
	    return _.includes(binNames, item.bin);
	});

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
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
	                        var items = this.state.items;
	                        var index = this.firstItemIndex;
	                        var item = items[index];
	                        item.props.className = item.props.becomes.name;
	                        item.props.message = item.props.becomes.bin;
	                        item.props['data-message'] = item.props.becomes.bin;
	                        items[index] = item;
	                        this.setState({ items: items });
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
/* 46 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 47 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 48 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 49 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 50 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 51 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 52 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 53 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_priceless_pourer_opts = __webpack_require__(45);

	var _default_priceless_pourer_opts2 = _interopRequireDefault(_default_priceless_pourer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 54 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 55 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	var _items_food_share = __webpack_require__(32);

	var _items_food_share2 = _interopRequireDefault(_items_food_share);

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

	var itemsToSort = _.filter(_items_to_sort2.default.concat(_items_food_share2.default), function (item) {
	    return _.includes(binNames, item.bin);
	});

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
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
/* 57 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 58 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 59 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 60 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 61 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 62 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 63 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 64 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_fantastic_food_sharer_opts = __webpack_require__(56);

	var _default_fantastic_food_sharer_opts2 = _interopRequireDefault(_default_fantastic_food_sharer_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 65 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 1,
	        scoreToWin: 100
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 67 */
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

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(27);

	var _3 = _interopRequireDefault(_2);

	var _4 = __webpack_require__(68);

	var _5 = _interopRequireDefault(_4);

	var _6 = __webpack_require__(79);

	var _7 = _interopRequireDefault(_6);

	var _8 = __webpack_require__(80);

	var _9 = _interopRequireDefault(_8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PTS = 'pts';

	var getChildren = function getChildren(v) {
	    if (v.children) return v.children;

	    return React.createElement(skoash.Sprite, {
	        src: CMWN.MEDIA.SPRITE + '_' + _.replace(v.bin, '-', ''),
	        frame: v.frame || 1,
	        'static': true
	    });
		};

/***/ },
/* 68 */
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

	var _shortid = __webpack_require__(69);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _2 = __webpack_require__(78);

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

	            var list = this.state.list || this.props.list;
	            return list.map(function (li, key) {
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(70);


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(71);
	var encode = __webpack_require__(73);
	var decode = __webpack_require__(75);
	var isValid = __webpack_require__(76);

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
	var clusterWorkerId = __webpack_require__(77) || 0;

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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(72);

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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(74);

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
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(71);

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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(71);

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
/* 77 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;


/***/ },
/* 78 */
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _classnames = __webpack_require__(13);

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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_compost = __webpack_require__(19);

	var _items_compost2 = _interopRequireDefault(_items_compost);

	var _items_landfill = __webpack_require__(17);

	var _items_landfill2 = _interopRequireDefault(_items_landfill);

	var _items_recycle = __webpack_require__(15);

	var _items_recycle2 = _interopRequireDefault(_items_recycle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    pointsPerBin: 400,
	    scoreToWin: 1200,
	    dropperAmount: 2,
	    getDropperProps: function getDropperProps() {
	        return {
	            onNext: function onNext() {
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
	                var score = opts.score + opts.pointsPerItem;

	                draggable.markCorrect();

	                this.updateGameData({
	                    keys: [_.camelCase(opts.gameName), 'levels', opts.level],
	                    data: {
	                        score: score
	                    }
	                });

	                if (score % opts.pointsPerBin === 0) {
	                    this.updateScreenData({
	                        keys: ['manual-dropper', 'next'],
	                        data: true
	                    });
	                }
	            },
	            onIncorrect: function onIncorrect(draggable, dropzoneArray) {
	                var _this = this;

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

	    binItems: [{
	        name: 'recycle',
	        objects: [].concat(shuffledItemsCompost.splice(0, 2)).concat(shuffledItemsLandfill.splice(0, 2)).concat(shuffledItemsRecycle.splice(0, 6))
	    }, {
	        name: 'landfill',
	        objects: [].concat(shuffledItemsCompost.splice(0, 2)).concat(shuffledItemsLandfill.splice(0, 6)).concat(shuffledItemsRecycle.splice(0, 2))
	    }, {
	        name: 'compost',
	        objects: [].concat(shuffledItemsCompost.splice(0, 6)).concat(shuffledItemsLandfill.splice(0, 2)).concat(shuffledItemsRecycle.splice(0, 2))
	    }]
		}, _default_game_opts2.default);

/***/ },
/* 82 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 2,
	        scoreToWin: 150
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 84 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 3,
	        scoreToWin: 200
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 86 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 4,
	        scoreToWin: 250
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 88 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (props, ref, key) {
	    return (0, _dynamic_diverter_game_component2.default)(props, ref, key, _.defaults({
	        level: 5,
	        scoreToWin: 300
	    }, _default_dynamic_diverter_opts2.default));
	};

	var _dynamic_diverter_game_component = __webpack_require__(67);

	var _dynamic_diverter_game_component2 = _interopRequireDefault(_dynamic_diverter_game_component);

	var _default_dynamic_diverter_opts = __webpack_require__(81);

	var _default_dynamic_diverter_opts2 = _interopRequireDefault(_default_dynamic_diverter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 90 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 91 */
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
/* 92 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 93 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _default_game_opts = __webpack_require__(30);

	var _default_game_opts2 = _interopRequireDefault(_default_game_opts);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	var _trays_array = __webpack_require__(95);

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
	                    _this2.setState({ items: items });

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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _2 = __webpack_require__(28);

	var _3 = _interopRequireDefault(_2);

	var _items_to_sort = __webpack_require__(31);

	var _items_to_sort2 = _interopRequireDefault(_items_to_sort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        frame: v.frame || 1,
	        'static': true
	    });
	};

	var mapItems = function mapItems(itemNames) {
	    var items = _.filter(_items_to_sort2.default, function (item) {
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
/* 96 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 97 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 98 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 99 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 100 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 101 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 102 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 103 */
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

	var _dropper_game_component = __webpack_require__(23);

	var _dropper_game_component2 = _interopRequireDefault(_dropper_game_component);

	var _default_master_sorter_opts = __webpack_require__(94);

	var _default_master_sorter_opts2 = _interopRequireDefault(_default_master_sorter_opts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 104 */
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

	var _info_screen_component = __webpack_require__(12);

	var _info_screen_component2 = _interopRequireDefault(_info_screen_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 105 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTkxZWZlNjlmZDE0MWY0ZjdlZTIiLCJ3ZWJwYWNrOi8vL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vL21ha2VfbWVkaWFfZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29uZmlnLmpzb24iLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9lZmZlY3RzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2ZpcmV3b3Jrcy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pbmZvX3NjcmVlbl9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMva2V5X2lzX3NvcnRpbmdfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19yZWN5Y2xlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9saWdodHNfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19sYW5kZmlsbC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZml2ZV93YXlzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfY29tcG9zdC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGV2ZWxfc2NyZWVuX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX29uZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2gvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjIuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZ2FtZV9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc190b19zb3J0LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19mb29kX3NoYXJlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19saXF1aWRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX3RocmVlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9sZXZlbF9jb21wbGV0ZV9zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvZGVjb2RlLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcm9wem9uZS8wLjQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvd2FudF90b19zdGFja19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RyYXlzX2FycmF5LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL25vd19hX21lbWJlcl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3F1aXRfc2NyZWVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSBcclxuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XHJcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoY2FsbGJhY2spIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xyXG4gXHRcdHRyeSB7XHJcbiBcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gXHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XHJcbiBcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xyXG4gXHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gMTAwMDA7XHJcbiBcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XHJcbiBcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG4gXHRcdH1cclxuIFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0aWYocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XHJcbiBcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gXHRcdFx0XHQvLyB0aW1lb3V0XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIikpO1xyXG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcclxuIFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxyXG4gXHRcdFx0XHRjYWxsYmFjaygpO1xyXG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xyXG4gXHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXHJcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG4gXHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuIFx0XHRcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2soZSk7XHJcbiBcdFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIHVwZGF0ZSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0Ly8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYmVmNDViMC9zcmMvc2hhcmVkL3V0aWxzL2NhbkRlZmluZVByb3BlcnR5LmpzXHJcbiBcdHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xyXG4gXHR0cnkge1xyXG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgXCJ4XCIsIHtcclxuIFx0XHRcdGdldDogZnVuY3Rpb24oKSB7fVxyXG4gXHRcdH0pO1xyXG4gXHRcdGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcclxuIFx0fSBjYXRjaCh4KSB7XHJcbiBcdFx0Ly8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcclxuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJhOTFlZmU2OWZkMTQxZjRmN2VlMlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XHJcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuIFx0XHRcdFx0fSBlbHNlIGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuIFx0XHR9O1xyXG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkpIHtcclxuIFx0XHRcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcclxuIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIChmdW5jdGlvbihuYW1lKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuIFx0XHRcdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fShuYW1lKSkpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGZuW25hbWVdID0gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcclxuIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkLCBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG51bGwsIGZuKTtcclxuIFx0XHRcdFx0fSBmaW5hbGx5IHtcclxuIFx0XHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xyXG4gXHRcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcclxuIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XHJcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwiZVwiLCB7XHJcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdHZhbHVlOiBlbnN1cmVcclxuIFx0XHRcdH0pO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRmbi5lID0gZW5zdXJlO1xyXG4gXHRcdH1cclxuIFx0XHRyZXR1cm4gZm47XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhvdCA9IHtcclxuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcclxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXHJcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxyXG4gXHRcclxuIFx0XHRcdC8vIE1vZHVsZSBBUElcclxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2s7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjaztcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJudW1iZXJcIilcclxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcclxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcclxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcclxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxyXG4gXHRcdH07XHJcbiBcdFx0cmV0dXJuIGhvdDtcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XHJcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcclxuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdENhbGxiYWNrO1xyXG4gXHRcclxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXHJcbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XHJcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcclxuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHksIGNhbGxiYWNrKSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XHJcbiBcdFx0aWYodHlwZW9mIGFwcGx5ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBmYWxzZTtcclxuIFx0XHRcdGNhbGxiYWNrID0gYXBwbHk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbiBcdFx0aG90RG93bmxvYWRNYW5pZmVzdChmdW5jdGlvbihlcnIsIHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuIFx0XHRcdGlmKCF1cGRhdGUpIHtcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgbnVsbCk7XHJcbiBcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHVwZGF0ZS5jLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcFt1cGRhdGUuY1tpXV0gPSB0cnVlO1xyXG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xyXG4gXHRcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbiBcdFx0XHRyZXR1cm47XHJcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XHJcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XHJcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4gXHRcdHZhciBjYWxsYmFjayA9IGhvdENhbGxiYWNrO1xyXG4gXHRcdGhvdENhbGxiYWNrID0gbnVsbDtcclxuIFx0XHRpZighY2FsbGJhY2spIHJldHVybjtcclxuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XHJcbiBcdFx0XHRob3RBcHBseShob3RBcHBseU9uVXBkYXRlLCBjYWxsYmFjayk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpIHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcclxuIFx0XHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiBcdFx0XHRvcHRpb25zID0ge307XHJcbiBcdFx0fSBlbHNlIGlmKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGUpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbbW9kdWxlXTtcclxuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcclxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZighbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZClcclxuIFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZUlkID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyBtb2R1bGVJZCArIFwiIGluIFwiICsgcGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdFx0cXVldWUucHVzaChwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRyZXR1cm4gW291dGRhdGVkTW9kdWxlcywgb3V0ZGF0ZWREZXBlbmRlbmNpZXNdO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoIXJlc3VsdCkge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xyXG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzdWx0KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0WzBdKTtcclxuIFx0XHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiByZXN1bHRbMV0pIHtcclxuIFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0WzFdLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHRbMV1bbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcclxuIFx0XHRcdFx0Y2IoZGF0YSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xyXG4gXHRcclxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXHJcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxyXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSB7XHJcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcclxuIFx0XHRcdFx0XHR2YXIgaWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0aWYoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcclxuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRjYihvdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2UgaWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2UsXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IGhvdEN1cnJlbnRQYXJlbnRzLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTkxZWZlNjlmZDE0MWY0ZjdlZTIiLCJ3aW5kb3cuRU5WSVJPTk1FTlQgPSB7XG4gICAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vZi8nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGRldi12YXJpYWJsZXMuanMiLCIoZnVuY3Rpb24gKGdhbWVOYW1lKSB7XG4gICAgLy8gcmVtb3ZlIHdpbmRvdy5NRURJQSBvbmNlIG5vIGdhbWVzIHJlZmVyZW5jZSBpdFxuICAgIHZhciBNRURJQSA9IHdpbmRvdy5NRURJQSA9IHtcbiAgICAgICAgQkFTRTogRU5WSVJPTk1FTlQuTUVESUFcbiAgICB9O1xuXG4gICAgY29uc3QgR0FNRSA9ICdnYW1lcy8nO1xuICAgIGNvbnN0IEVGRkVDVCA9ICdzb3VuZC1hc3NldHMvZWZmZWN0cy8nO1xuICAgIGNvbnN0IFZPID0gJ3NvdW5kLWFzc2V0cy92b3MvJztcbiAgICBjb25zdCBJTUFHRSA9ICdpbWFnZS1hc3NldHMvJztcbiAgICBjb25zdCBTUFJJVEUgPSAnc3ByaXRlcy1hbmltYXRpb25zLyc7XG4gICAgY29uc3QgRlJBTUUgPSAnZnJhbWVzLyc7XG4gICAgY29uc3QgRk9OVCA9ICdmb250cy8nO1xuICAgIGNvbnN0IFNIQVJFRCA9ICdzaGFyZWQvJztcbiAgICBjb25zdCBNT0NLX0dBTUUgPSAnbW9jay1nYW1lLyc7XG5cbiAgICBNRURJQS5GT05UID0gTUVESUEuQkFTRSArIEZPTlQ7XG4gICAgTUVESUEuU0hBUkVEID0gTUVESUEuQkFTRSArIEdBTUUgKyBTSEFSRUQ7XG5cbiAgICBNRURJQS5HQU1FID0gTUVESUEuQkFTRSArIEdBTUUgKyBnYW1lTmFtZSArICcvJztcbiAgICBNRURJQS5FRkZFQ1QgPSBNRURJQS5HQU1FICsgRUZGRUNUO1xuICAgIE1FRElBLlZPID0gTUVESUEuR0FNRSArIFZPO1xuICAgIE1FRElBLklNQUdFID0gTUVESUEuR0FNRSArIElNQUdFO1xuICAgIE1FRElBLlNQUklURSA9IE1FRElBLkdBTUUgKyBTUFJJVEU7XG4gICAgTUVESUEuRlJBTUUgPSBNRURJQS5HQU1FICsgRlJBTUU7XG4gICAgTUVESUEuRk9OVCA9IE1FRElBLkdBTUUgKyBGT05UO1xuXG4gICAgTUVESUEuTU9DSyA9IHt9O1xuICAgIE1FRElBLk1PQ0suR0FNRSA9IE1FRElBLkJBU0UgKyBHQU1FICsgTU9DS19HQU1FO1xuICAgIE1FRElBLk1PQ0suRUZGRUNUID0gTUVESUEuTU9DSy5HQU1FICsgRUZGRUNUO1xuICAgIE1FRElBLk1PQ0suVk8gPSBNRURJQS5NT0NLLkdBTUUgKyBWTztcbiAgICBNRURJQS5NT0NLLklNQUdFID0gTUVESUEuTU9DSy5HQU1FICsgSU1BR0U7XG4gICAgTUVESUEuTU9DSy5TUFJJVEUgPSBNRURJQS5NT0NLLkdBTUUgKyBTUFJJVEU7XG4gICAgTUVESUEuTU9DSy5GUkFNRSA9IE1FRElBLk1PQ0suR0FNRSArIEZSQU1FO1xuICAgIE1FRElBLk1PQ0suRk9OVCA9IE1FRElBLk1PQ0suR0FNRSArIEZPTlQ7XG5cbiAgICB3aW5kb3cuQ01XTi5NRURJQSA9IE1FRElBO1xufSh3aW5kb3cuQ01XTi5nYW1lRm9sZGVyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMSc7XG5cbmltcG9ydCBpT1NTY3JlZW4gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xJztcblxuaW1wb3J0IFRpdGxlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90aXRsZV9zY3JlZW4nO1xuaW1wb3J0IEhpVGhlcmVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2hpX3RoZXJlX3NjcmVlbic7XG5pbXBvcnQgS2V5SXNTb3J0aW5nU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4nO1xuaW1wb3J0IExpZ2h0c1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbic7XG5pbXBvcnQgRml2ZVdheXNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZpdmVfd2F5c19zY3JlZW4nO1xuaW1wb3J0IExldmVsU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXZlbF9zY3JlZW5fY29tcG9uZW50JztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjFTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjNJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb240SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uNFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb241U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IExldmVsQ29tcGxldGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldmVsX2NvbXBsZXRlX3NjcmVlbl9jb21wb25lbnQnO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX29uZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIySW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyM0luZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI0SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9mb3VyX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI1SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI1U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vbmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3R3b19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3RocmVlX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZm91cl9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IFdhbnRUb1N0YWNrU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy93YW50X3RvX3N0YWNrX3NjcmVlbic7XG5pbXBvcnQgVmlkZW9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IE5vd0FNZW1iZXJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL25vd19hX21lbWJlcl9zY3JlZW4nO1xuaW1wb3J0IFF1aXRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3F1aXRfc2NyZWVuJztcblxuc2tvYXNoLnN0YXJ0KFxuICAgIDxza29hc2guR2FtZVxuICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgbG9hZGVyPXs8TG9hZGVyIC8+fVxuICAgICAgICBzY3JlZW5zPXtbXG4gICAgICAgICAgICBpT1NTY3JlZW4sXG4gICAgICAgICAgICBUaXRsZVNjcmVlbixcbiAgICAgICAgICAgIEhpVGhlcmVTY3JlZW4sXG4gICAgICAgICAgICBLZXlJc1NvcnRpbmdTY3JlZW4sXG4gICAgICAgICAgICBMaWdodHNTY3JlZW4sXG4gICAgICAgICAgICBGaXZlV2F5c1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMCksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24xU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS4xKSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjIpLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24zSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMyksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb240U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS40KSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbigxKSxcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMCksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjEpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi4yKSxcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMyksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjQpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oMiksXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjApLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjEpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjJJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjIpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjMpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjQpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjVJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbigzKSxcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMCksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjEpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC4yKSxcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMyksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjQpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oNCksXG4gICAgICAgICAgICBXYW50VG9TdGFja1NjcmVlbixcbiAgICAgICAgICAgIFZpZGVvU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4wKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyMVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuMSksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIySW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjIpLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyM0luZm9TY3JlZW4sXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIzU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4zKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyNFNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuNCksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXI1SW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbig1KSxcbiAgICAgICAgICAgIE5vd0FNZW1iZXJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDYpLFxuICAgICAgICBdfVxuICAgICAgICBtZW51cz17e1xuICAgICAgICAgICAgcXVpdDogUXVpdFNjcmVlbixcbiAgICAgICAgfX1cbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fcmVjeWNsZS5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGlxdWlkcy5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGFuZGZpbGwuanNvbmB9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5KU09OIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2Zvb2RzaGFyZS5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fY29tcG9zdC5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X3JlY3ljbGUucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xpcXVpZHMucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xhbmRmaWxsLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9mb29kc2hhcmUucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2NvbXBvc3QucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1wdXJwbGUucmliYm9uLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9bHVnZ2FnZS5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1zcHJpdGUuc3Rhci5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLkZSQU1FfWZyYW1lLjAxLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuRlJBTUV9ZnJhbWUuMDIucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5GUkFNRX10cmFuc2l0aW9uLmZyYW1lLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5tYWlubmF2LnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9dGl0bGVzY3JuYmcuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjAxLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC4wMi5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQuMDMuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjA0LmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFuc2l0aW9uLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFzaC5yZWN5Y2xlLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFzaC5sYW5kZmlsbC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQudHJhc2guY29tcG9zdC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXF1aXQuYmFja2dyb3VuZC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gdHlwZT1cInNmeFwiIHJlZj1cImJ1dHRvblwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QnV0dG9uQ2xpY2subXAzYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJzZnhcIiByZWY9XCJzY3JlZW4tY29tcGxldGVcIiBzcmM9e2Ake01FRElBLkVGRkVDVH1OZXh0QXBwZWFyLm1wM2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0cwXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfXRpdGxlc2NyZWVuLm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzFcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHMS5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0cyXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzIubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHM1wiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0czLm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzRcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHNC5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0c1XCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzUubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHNlwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0c2Lm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdGl0bGVcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2cxXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnMlwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZzNcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2c0XCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdHJhc2hcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCB0cmFuc2l0aW9uXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgcXVpdFwiIC8+LFxuICAgICAgICBdfVxuICAgIC8+XG4pO1xuXG5pZiAobW9kdWxlLmhvdCkgbW9kdWxlLmhvdC5hY2NlcHQoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJpZFwiOiBcImdyZWVuLXRlYW0tY2hhbGxlbmdlXCIsXG5cdFwidmVyc2lvblwiOiAxLFxuXHRcInNrb2FzaFwiOiBcIjEuMS40XCIsXG5cdFwiaGVhZF9pbmplY3Rpb25cIjogXCJcIixcblx0XCJkaW1lbnNpb25zXCI6IHtcblx0XHRcIndpZHRoXCI6IDk2MCxcblx0XHRcImhlaWdodFwiOiA1NDBcblx0fVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29uZmlnLmpzb25cbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cImxvYWRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPkxvYWRpbmchPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiaW9zLXNwbGFzaFwiXG4gICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgIGNvbXBsZXRlRGVsYXk9ezYwMDB9XG4gICAgICAgICAgICBuZXh0RGVsYXk9ezMwMDB9XG4gICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICAgIGhpZGVQcmV2XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNIQVJFRH1pb3Mtc3RhcnQtYmFsbC5wbmdgfSAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU0hBUkVEfWlvcy1zdGFydC1iYWxsLWFuaW0uZ2lmYH0gLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJpbXBvcnQgJ3NoYXJlZC9lZmZlY3RzL2luZGV4JztcblxuY29uc3QgRklSRVdPUktTID0gJ2ZpcmV3b3Jrcyc7XG5cbmxldCBvblN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWZmZWN0ID0gd2luZG93LkNNV04ubWFrZUVmZmVjdCgnZmlyZXdvcmtzJywgUmVhY3RET00uZmluZERPTU5vZGUodGhpcyksIHtcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaW1hZ2UpLFxuICAgIH0pO1xufTtcblxubGV0IG9uU3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBfLmludm9rZSh0aGlzLmVmZmVjdCwgJ2Rlc3Ryb3knKTtcbiAgICBkZWxldGUgdGhpcy5lZmZlY3Q7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInRpdGxlXCJcbiAgICAgICAgICAgIHNpbGVudENvbXBsZXRlXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89XCJCS0cwXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGgzIGNvbnRlbnQ9XCJHcmVlbiBUZWFtIENoYWxsZW5nZVwiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9Z3JhZGllbnQtdGV4dHVyZS5qcGdgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0cmFzaFwiXG4gICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXRpdGxldHJhc2hjYW4ucG5nYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2hhcmFjdGVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9Z3JlZW50ZWFtY2hhcmFjLnBuZ2B9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyYXlcIlxuICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXRyYXkucG5nYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17RklSRVdPUktTfVxuICAgICAgICAgICAgICAgIHJlZj17RklSRVdPUktTfVxuICAgICAgICAgICAgICAgIG9uU3RhcnQ9e29uU3RhcnR9XG4gICAgICAgICAgICAgICAgb25TdG9wPXtvblN0b3B9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICByZWY9XCJpbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXNjcm5iZy5qcGdgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsImltcG9ydCBlZmZlY3RzIGZyb20gJy4vZWZmZWN0cyc7XG5cbmxldCBtYWtlRWZmZWN0ID0gZnVuY3Rpb24gKGVmZmVjdE5hbWUsIG5vZGUsIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiBfLmludm9rZShlZmZlY3RzLCBlZmZlY3ROYW1lLCBub2RlLCBvcHRzKTtcbn07XG5cbmlmICghd2luZG93LkNNV04pIHdpbmRvdy5DTVdOID0ge307XG5pZiAoIXdpbmRvdy5DTVdOLm1ha2VFZmZlY3QpIHdpbmRvdy5DTVdOLm1ha2VFZmZlY3QgPSBtYWtlRWZmZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2VmZmVjdHMvaW5kZXguanMiLCJpbXBvcnQgZmlyZXdvcmtzIGZyb20gJy4vZmlyZXdvcmtzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGZpcmV3b3Jrc1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2VmZmVjdHMuanMiLCIvLyBjb2RlIHRha2VuIGZyb20gaHR0cDovL2NvZGVwZW4uaW8vaGFpZGFuZy9wZW4vZUJvcXl3XG5cbmNsYXNzIEZpcmV3b3JrcyB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgb3B0cykge1xuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQ0FOVkFTJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBub2RlLm9mZnNldEhlaWdodDtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBsZXQgcGF0ID0gJyMwMDAnO1xuXG4gICAgICAgIGlmIChvcHRzLmJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgbGV0IHRlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGxldCB0Q3R4ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuXG4gICAgICAgICAgICB0Q3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICBvcHRzLmJhY2tncm91bmRJbWFnZSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgb3B0cy5iYWNrZ3JvdW5kSW1hZ2UubmF0dXJhbFdpZHRoLFxuICAgICAgICAgICAgICAgIG9wdHMuYmFja2dyb3VuZEltYWdlLm5hdHVyYWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHRlbXBDYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHBhdCA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRlbXBDYW52YXMsICdyZXBlYXQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLmJhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgcGF0ID0gb3B0cy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNpemVcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gbm9kZS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICBjdHgucmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdDtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICAgICAgICAvLyBpbml0XG4gICAgICAgIGN0eC5yZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXQ7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIC8vIG9iamVjdHNcbiAgICAgICAgbGV0IGxpc3RGaXJlID0gW107XG4gICAgICAgIGxldCBsaXN0RmlyZXdvcmsgPSBbXTtcbiAgICAgICAgbGV0IGZpcmVOdW1iZXIgPSAxMDtcbiAgICAgICAgbGV0IGNlbnRlciA9IHsgeDogY2FudmFzLndpZHRoIC8gMiwgeTogY2FudmFzLmhlaWdodCAvIDIgfTtcbiAgICAgICAgbGV0IHJhbmdlID0gMTAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpcmVOdW1iZXI7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmUgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5yYW5kb20oKSAqIHJhbmdlIC8gMiAtIHJhbmdlIC8gNCArIGNlbnRlci54LFxuICAgICAgICAgICAgICAgIHk6IE1hdGgucmFuZG9tKCkgKiByYW5nZSAqIDIgKyBjYW52YXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNpemU6IE1hdGgucmFuZG9tKCkgKyA0LjUsXG4gICAgICAgICAgICAgICAgZmlsbDogJyNmZDEnLFxuICAgICAgICAgICAgICAgIHZ4OiBNYXRoLnJhbmRvbSgpIC0gMC41LFxuICAgICAgICAgICAgICAgIHZ5OiAtKE1hdGgucmFuZG9tKCkgKyA0KSxcbiAgICAgICAgICAgICAgICBheDogTWF0aC5yYW5kb20oKSAqIDAuMDIgLSAwLjAxLFxuICAgICAgICAgICAgICAgIGZhcjogTWF0aC5yYW5kb20oKSAqIHJhbmdlICsgKGNlbnRlci55IC0gcmFuZ2UpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZS5iYXNlID0ge1xuICAgICAgICAgICAgICAgIHg6IGZpcmUueCxcbiAgICAgICAgICAgICAgICB5OiBmaXJlLnksXG4gICAgICAgICAgICAgICAgdng6IGZpcmUudnhcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxpc3RGaXJlLnB1c2goZmlyZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvb3AgPSB0aGlzLmxvb3AuYmluZCh0aGlzLCBvcHRzLCBwYXQsIGNhbnZhcywgY3R4LCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrLCBmaXJlTnVtYmVyLCByYW5nZSk7XG5cbiAgICAgICAgdGhpcy5sb29wKCk7XG5cbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgfVxuXG4gICAgbG9vcChvcHRzLCBwYXQsIGNhbnZhcywgY3R4LCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrLCBmaXJlTnVtYmVyLCByYW5nZSkge1xuICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcCk7XG4gICAgICAgIHRoaXMudXBkYXRlKG9wdHMsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKTtcbiAgICAgICAgdGhpcy5kcmF3KG9wdHMsIHBhdCwgY2FudmFzLCBjdHgsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmspO1xuICAgIH1cblxuICAgIHJhbmRDb2xvcigpIHtcbiAgICAgICAgbGV0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgICAgICBsZXQgZyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG4gICAgICAgIGxldCBiID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbiAgICAgICAgcmV0dXJuIGByZ2IoJHtyfSwgJHtnfSwgJHtifSlgO1xuICAgIH1cblxuICAgIHVwZGF0ZShvcHRzLCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrLCBmaXJlTnVtYmVyLCByYW5nZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RGaXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyZSA9IGxpc3RGaXJlW2ldO1xuXG4gICAgICAgICAgICBpZiAoZmlyZS55IDw9IGZpcmUuZmFyKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FzZSBhZGQgZmlyZXdvcmtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLnJhbmRDb2xvcigpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZmlyZU51bWJlciAqIDU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyZXdvcmsgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBmaXJlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBmaXJlLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBNYXRoLnJhbmRvbSgpICsgNC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB2eDogTWF0aC5yYW5kb20oKSAqIDE1IC0gNy41LFxuICAgICAgICAgICAgICAgICAgICAgICAgdnk6IE1hdGgucmFuZG9tKCkgKiAtMTUgKyA0LjUsXG4gICAgICAgICAgICAgICAgICAgICAgICBheTogMC4wNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogcmFuZ2UgLyAyKSArIHJhbmdlIC8gMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmaXJld29yay5iYXNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogZmlyZXdvcmsubGlmZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IGZpcmV3b3JrLnNpemVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdEZpcmV3b3JrLnB1c2goZmlyZXdvcmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgIGZpcmUueSA9IGZpcmUuYmFzZS55O1xuICAgICAgICAgICAgICAgIGZpcmUueCA9IGZpcmUuYmFzZS54O1xuICAgICAgICAgICAgICAgIGZpcmUudnggPSBmaXJlLmJhc2Uudng7XG4gICAgICAgICAgICAgICAgZmlyZS5heCA9IE1hdGgucmFuZG9tKCkgKiAwLjAyIC0gMC4wMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZS54ICs9IGZpcmUudng7XG4gICAgICAgICAgICBmaXJlLnkgKz0gZmlyZS52eTtcbiAgICAgICAgICAgIGZpcmUudnggKz0gZmlyZS5heDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBsaXN0RmlyZXdvcmsubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBmaXJld29yayA9IGxpc3RGaXJld29ya1tpXTtcbiAgICAgICAgICAgIGlmIChmaXJld29yaykge1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLnggKz0gZmlyZXdvcmsudng7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsueSArPSBmaXJld29yay52eTtcbiAgICAgICAgICAgICAgICBmaXJld29yay52eSArPSBmaXJld29yay5heTtcbiAgICAgICAgICAgICAgICBmaXJld29yay5hbHBoYSA9IGZpcmV3b3JrLmxpZmUgLyBmaXJld29yay5iYXNlLmxpZmU7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsuc2l6ZSA9IGZpcmV3b3JrLmFscGhhICogZmlyZXdvcmsuYmFzZS5zaXplO1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLmFscGhhID0gZmlyZXdvcmsuYWxwaGEgPiAwLjYgPyAxIDogZmlyZXdvcmsuYWxwaGE7XG5cbiAgICAgICAgICAgICAgICBmaXJld29yay5saWZlLS07XG4gICAgICAgICAgICAgICAgaWYgKGZpcmV3b3JrLmxpZmUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0RmlyZXdvcmsuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcob3B0cywgcGF0LCBjYW52YXMsIGN0eCwgbGlzdEZpcmUsIGxpc3RGaXJld29yaykge1xuICAgICAgICAvLyBjbGVhclxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xODtcbiAgICAgICAgY3R4LnJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdDtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAvLyByZS1kcmF3XG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc2NyZWVuJztcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0RmlyZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmUgPSBsaXN0RmlyZVtpXTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoZmlyZS54LCBmaXJlLnksIGZpcmUuc2l6ZSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpcmUuZmlsbDtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RGaXJld29yay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmV3b3JrID0gbGlzdEZpcmV3b3JrW2ldO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gZmlyZXdvcmsuYWxwaGE7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKGZpcmV3b3JrLngsIGZpcmV3b3JrLnksIGZpcmV3b3JrLnNpemUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaXJld29yay5maWxsO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChub2RlLCBvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBGaXJld29ya3Mobm9kZSwgb3B0cyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9maXJld29ya3MuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdoaS10aGVyZScsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhpIHRoZXJlITxici8+XG4gICAgICAgICAgICAgICAgSSdtIGhlcmUgdG88YnIvPlxuICAgICAgICAgICAgICAgIHRlYWNoIHlvdSBhYm91dDxici8+XG4gICAgICAgICAgICAgICAgc29ydGluZyB3YXN0ZSBhdDxici8+XG4gICAgICAgICAgICAgICAgeW91ciBzY2hvb2whXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGlUaGVyZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IENIQVJBQ1RFUiA9IGAke0NNV04uTUVESUEuSU1BR0V9Z3JlZW50ZWFtY2hhcmFjLnBuZ2A7XG5jb25zdCBGUkFNRSA9IGAke0NNV04uTUVESUEuRlJBTUV9ZnJhbWUuMDEucG5nYDtcblxubGV0IHJlbmRlclZPID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMudm8pIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLnZvfS5tcDNgfVxuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgcmVuZGVyU0ZYID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMuc2Z4KSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgcmVmPVwic3RhcnRcIlxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH0ke29wdHMuc2Z4fS5tcDNgfVxuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgcmVuZGVySW1hZ2UgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIGlmIChvcHRzLnJlbmRlckltYWdlID09PSBmYWxzZSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImNoYXJhY3RlclwiIHNyYz17b3B0cy5pbWFnZSB8fCBDSEFSQUNURVJ9IC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9e29wdHMuaWR9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e29wdHMuYmFja2dyb3VuZEF1ZGlvfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpbmZvJywgb3B0cy5jbGFzc05hbWUpfVxuICAgICAgICA+XG4gICAgICAgICAgICB7cmVuZGVyVk8ob3B0cyl9XG4gICAgICAgICAgICB7cmVuZGVyU0ZYKG9wdHMpfVxuICAgICAgICAgICAge3JlbmRlckltYWdlKG9wdHMpfVxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e0ZSQU1FfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgIHtvcHRzLmNvbnRlbnR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9lbnRcbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17W10uY29uY2F0KG9wdHMuZXh0cmFzIHx8IFtdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2luZm9fc2NyZWVuX2NvbXBvbmVudC5qcyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmltcG9ydCBpdGVtc1JlY3ljbGUgZnJvbSAnLi9pdGVtc19yZWN5Y2xlJztcblxubGV0IGF1ZGlvUmVmcyA9IF8udW5pcShfLm1hcChpdGVtc1JlY3ljbGUsIHYgPT5cbiAgICBfLmtlYmFiQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKVxuKTtcblxudmFyIGFycmF5T2ZBdWRpbyA9IF8ubWFwKGF1ZGlvUmVmcywgKHYsIGspID0+XG4gICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgcmVmPXt2fVxuICAgICAgICBrZXk9e2t9XG4gICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5HQU1FICsgJ3NvdW5kLWFzc2V0cy9fdm9zaXRlbXMvJyArIHZ9Lm1wM2B9XG4gICAgICAgIGNvbXBsZXRlXG4gICAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdrZXktaXMtc29ydGluZycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3JpZ2h0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgVGhlIGtleSBpcyBTT1JUSU5HITxici8+XG4gICAgICAgICAgICAgICAgVGhlcmUgYXJlIDUgV0FZUzxici8+XG4gICAgICAgICAgICAgICAgeW91IGNhbiBzb3J0PGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgZm9vZCB3YXN0ZTxici8+XG4gICAgICAgICAgICAgICAgYXQgeW91ciBzY2hvb2wuLi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdUaGVLZXknLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzYnLFxuICAgICAgICBleHRyYXM6IGFycmF5T2ZBdWRpbyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4uanMiLCJsZXQgYmluID0gJ3JlY3ljbGUnO1xubGV0IG5hbWVzID0gW1xuICAgICdhbHVtaW51bS1iZXZlcmFnZS1jYW4nLFxuICAgICdhbHVtaW51bS1wYW4nLFxuICAgICdjYXJkYm9hcmQtYm94JyxcbiAgICAnY2xlYW4tYWx1bWludW0tZm9pbCcsXG4gICAgJ2VtcHR5LWFsdW1pbnVtLWNhbi0xJyxcbiAgICAnZW1wdHktYWx1bWludW0tY2FuLTInLFxuICAgICdlbXB0eS1hbHVtaW51bS1jYW4tMycsXG4gICAgJ2VtcHR5LWFsdW1pbnVtLWNhbi00JyxcbiAgICAnZW1wdHktYm94LW9mLWNyYWNrZXJzLTMnLFxuICAgICdlbXB0eS1jaG9jb2xhdGUtbWlsay1jYXJ0b24tNCcsXG4gICAgJ2VtcHR5LWNvb2tpZS1ib3gtMScsXG4gICAgJ2VtcHR5LWNvb2tpZS1ib3gtMicsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uJyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tMicsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTUnLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi02JyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tMTInLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi0xMycsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTE0JyxcbiAgICAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMScsXG4gICAgJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTInLFxuICAgICdlbXB0eS1wbGFzdGljLWJvdHRsZS0zJyxcbiAgICAnZW1wdHktcGxhc3RpYy1wYWNrYWdlJyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci0yJyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci0zJyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci01JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci02JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci03JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci04JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci05JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci0xMCcsXG4gICAgJ21ldGFsLWZvb2QtY2FuLTEnLFxuICAgICdtZXRhbC1mb29kLWNhbi0yJyxcbiAgICAnbWV0YWwtZm9vZC1jYW4tMycsXG4gICAgJ21ldGFsLWZvb2QtY2FuLTUnLFxuICAgICdwYXBlci1mb2xkZXInLFxuICAgICdwYXBlci1wYWNrYWdpbmcnLFxuICAgICdwYXBlci1wYWNrYWdpbmctMScsXG4gICAgJ3BhcGVyLXBhY2thZ2luZy04JyxcbiAgICAncGxhc3RpYy1jdXAtMScsXG4gICAgJ3BsYXN0aWMtY3VwLTInLFxuICAgICdwbGFzdGljLWN1cC0zJyxcbiAgICAncGxhc3RpYy1jdXAtNCcsXG4gICAgJ3BsYXN0aWMtY3VwLTUnLFxuICAgICdwbGFzdGljLWN1cC02JyxcbiAgICAncGxhc3RpYy1jdXAtNycsXG4gICAgJ3BsYXN0aWMtbGlkcy0xJyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctMicsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTQnLFxuICAgICdwbGFzdGljLXBhY2thZ2luZy01JyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctNicsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTcnLFxuICAgICd3cmFwcGluZy1wYXBlcicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX3JlY3ljbGUuanMiLCJpbXBvcnQgaXRlbUxhbmRmaWxsIGZyb20gJy4vaXRlbXNfbGFuZGZpbGwnO1xuXG5sZXQgYmluTmFtZXMgPSBbXG4gICAgJ3JlY3ljbGUnLFxuICAgICdsYW5kZmlsbCcsXG4gICAgJ2xpcXVpZHMnLFxuICAgICdjb21wb3N0JyxcbiAgICAnZm9vZC1zaGFyZScsXG5dO1xuXG5sZXQgcmV2ZWFsQ29udGVudCA9IHtcbiAgICByZWN5Y2xlOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgUkVDWUNMSU5HIGl0ZW1zIGFyZSB0aG9zZTxici8+XG4gICAgICAgICAgICB0aGF0IGNhbiBiZSByZXByb2Nlc3NlZCBhbmQ8YnIvPlxuICAgICAgICAgICAgbWFkZSBpbnRvIG5ldyBwcm9kdWN0cy48YnIvPlxuICAgICAgICAgICAgUGFwZXIsIG1ldGFsLCBhbmQgcGxhc3RpYyBhcmU8YnIvPlxuICAgICAgICAgICAgY29tbW9uIHJlY3ljbGFibGUgbWF0ZXJpYWxzLlxuICAgICAgICA8L3A+XG4gICAgKSxcbiAgICBsYW5kZmlsbDogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIExBTkRGSUxMIGl0ZW1zIGFyZSB0aGluZ3MgdGhhdDxici8+XG4gICAgICAgICAgICBqdXN0IGNhbid0IGJlIHJldXNlZCBpbiBhbnkgd2F5Ljxici8+XG4gICAgICAgICAgICBQdXQgeW91ciB0aGlua2luZyBjYXAgb24hPGJyLz5cbiAgICAgICAgICAgIExvb2sgZm9yIHdheXMgdG8gbWFrZTxici8+XG4gICAgICAgICAgICBkaWZmZXJlbnQgY2hvaWNlcyB0aGF0PGJyLz5cbiAgICAgICAgICAgIHJlZHVjZSBsYW5kZmlsbCB3YXN0ZS5cbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgbGlxdWlkczogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIExJUVVJRFMgbXVzdCBiZSBzZXBhcmF0ZWQ8YnIvPlxuICAgICAgICAgICAgZnJvbSB0aGVpciBjb250YWluZXJzITxici8+XG4gICAgICAgICAgICBUaGlzIGFsbG93cyBmb3IgdGhlIGNvbnRhaW5lcnM8YnIvPlxuICAgICAgICAgICAgdG8gYmUgcHJvcGVybHkgcHJvY2Vzc2VkLjxici8+XG4gICAgICAgICAgICBHZXQgcG91cmluZyFcbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgY29tcG9zdDogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIENPTVBPU1RJTkcgaXM8YnIvPlxuICAgICAgICAgICAgZmVydGlsaXplciBpbiB0aGUgbWFraW5nITxici8+XG4gICAgICAgICAgICBJdCdzIG1hZGUgZnJvbSBmb29kIHNjcmFwczxici8+XG4gICAgICAgICAgICBhbmQgb3JnYW5pYyBtYXRlcmlhbHM8YnIvPlxuICAgICAgICAgICAgdGhhdCBkZWNheSBhbmQgYmVjb21lPGJyLz5cbiAgICAgICAgICAgIGZvb2QgZm9yIHBsYW50cyFcbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgJ2Zvb2Qtc2hhcmUnOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgRk9PRCBTSEFSSU5HIGlzPGJyLz5cbiAgICAgICAgICAgIGEgZ3JlYXQgd2F5IHRvIGtlZXA8YnIvPlxuICAgICAgICAgICAgZnJvbSB3YXN0aW5nIGZvb2QhPGJyLz5cbiAgICAgICAgICAgIExlYXZlIGl0ZW1zIHRoYXQgb3RoZXJzPGJyLz5cbiAgICAgICAgICAgIGNhbiBtYWtlIGludG8gYSBzbmFjayFcbiAgICAgICAgPC9wPlxuICAgICksXG59O1xuXG5sZXQgcmV2ZWFsVk9zID0ge1xuICAgIHJlY3ljbGU6ICdSZWN5Y2xpbmdNYXRlcmlhbHMnLFxuICAgIGxhbmRmaWxsOiAnVGhpbmtpbmdDYXAnLFxuICAgIGxpcXVpZHM6ICdHZXRQb3VyaW5nJyxcbiAgICBjb21wb3N0OiAnQ29tcG9zdGluZ0V4cGxhaW4nLFxuICAgICdmb29kLXNoYXJlJzogJ0Zvb2RTaGFyaW5nRXhwbGFpbicsXG59O1xuXG5sZXQgYmluQ29tcG9uZW50cyA9IF8ubWFwKGJpbk5hbWVzLCBiaW4gPT5cbiAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9e2Jpbn0gbWVzc2FnZT17YmlufSAvPlxuKTtcblxubGV0IHJldmVhbExpc3QgPSBfLm1hcChyZXZlYWxDb250ZW50LCAoY29udGVudCwgcmVmKSA9PlxuICAgIDxza29hc2guQ29tcG9uZW50IHJlZj17cmVmfT5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgPC9za29hc2guQ29tcG9uZW50PlxuKTtcblxubGV0IG1lZGlhQ29sbGVjdGlvbkxpc3QgPSBfLm1hcChyZXZlYWxWT3MsIChjb250ZW50LCByZWYpID0+XG4gICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwidm9pY2VPdmVyXCIgcmVmPXtyZWZ9IHNyYz17YCR7Q01XTi5NRURJQS5WTyArIGNvbnRlbnR9Lm1wM2B9IC8+XG4pO1xuXG5sZXQgaW1hZ2VTcmNzID0gW1xuICAgIHtzcmM6IGAke0NNV04uTUVESUEuSU1BR0V9bGlnaHRzLnBuZ2B9LFxuICAgIHtzcmM6IGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5iaW5zLnBuZ2B9LFxuICAgIHtzcmM6IGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5idG4ucG5nYH0sXG5dO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1MYW5kZmlsbCwgdiA9PlxuICAgIF8ua2ViYWJDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpXG4pO1xuXG5sZXQgYXJyYXlPZkF1ZGlvID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT5cbiAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9e3Z9XG4gICAgICAgIGtleT17a31cbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYH1cbiAgICAgICAgY29tcGxldGVcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJsaWdodHNcIlxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPVwiQktHNlwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guUmVwZWF0ZXJcbiAgICAgICAgICAgICAgICBhbW91bnQ9e2ltYWdlU3Jjcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgaXRlbT17PHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiAvPn1cbiAgICAgICAgICAgICAgICBwcm9wcz17aW1hZ2VTcmNzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlnaHRzXCJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbnNcIlxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtiaW5Db21wb25lbnRzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtza29hc2gubWl4aW5zLlNlbGVjdGFibGVSZXZlYWwocHJvcHMsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlczogYmluQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICByZXZlYWxzOiByZXZlYWxMaXN0LFxuICAgICAgICAgICAgICAgIG1lZGlhOiBtZWRpYUNvbGxlY3Rpb25MaXN0LFxuICAgICAgICAgICAgICAgIFNlbGVjdGFibGVQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogJ0hJR0hMSUdIVEVEJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnNlbGVjdGFibGUudGFyZ2V0JykgJiYgJ2NsaWNrJ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiY2xpY2tcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNsaWNrUmVjQnV0dG9uLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JbmZvRnJhbWVNb3ZlMS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYUNvbGxlY3Rpb24+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvZW50XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgY29tcGxldGU9e3RydWV9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e1tdLmNvbmNhdChhcnJheU9mQXVkaW8gfHwgW10pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbi5qcyIsImxldCBiaW4gPSAnbGFuZGZpbGwnO1xubGV0IG5hbWVzID0gW1xuICAgICdhcHBsZXNhdWNlLXBvdWNoLTEnLFxuICAgICdhcHBsZXNhdWNlLXBvdWNoLTInLFxuICAgICdhcHBsZXNhdWNlLXBvdWNoLTMnLFxuICAgICdhcHBsZXNhdWNlLXBvdWNoLTQnLFxuICAgICdiYWctb2Ytd3JhcHBlcnMnLFxuICAgICdidWJibGUtd3JhcCcsXG4gICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlci0xJyxcbiAgICAnYnVycml0by13cmFwcGVyLTEnLFxuICAgICdidXJyaXRvLXdyYXBwZXItMicsXG4gICAgJ2J1cnJpdG8td3JhcHBlci0zJyxcbiAgICAnYnVycml0by13cmFwcGVyLTQnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItMScsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci0yJyxcbiAgICAnY2VyZWFsLWxpZC13cmFwcGVyLTMnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItNCcsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci01JyxcbiAgICAnZW1wdHktYmFnLW9mLWNoaXBzJyxcbiAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICdlbXB0eS1jaGlwLWJhZy0yJyxcbiAgICAnZW1wdHktY2hpcC1iYWctMycsXG4gICAgJ2VtcHR5LWNoaXAtYmFnLTQnLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTEnLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTInLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTMnLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTQnLFxuICAgICdlbXB0eS1zbmFjay13cmFwcGVyLTEnLFxuICAgICdlbXB0eS1zbmFjay13cmFwcGVyLTInLFxuICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXItMycsXG4gICAgJ2VuZXJneS1iYXItd3JhcHBlcicsXG4gICAgJ2VuZXJneS1iYXItd3JhcHBlci0yJyxcbiAgICAnZnJ1aXQtZHJpbmstZW1wdHktcG91Y2gnLFxuICAgICdmcnVpdC1zbmFjay13cmFwcGVyLTInLFxuICAgICdmcnVpdC1zbmFjay13cmFwcGVyLTMnLFxuICAgICdnaWZ0LXJpYmJvbnMnLFxuICAgICdncmFoYW0tY29va2llLXdyYXBwZXInLFxuICAgICdncmFoYW0tY29va2llLXdyYXBwZXItMicsXG4gICAgJ2p1aWNlLWJveCcsXG4gICAgJ2p1aWNlLWJveC0yJyxcbiAgICAnanVpY2UtYm94LTMnLFxuICAgICdqdWljZS1ib3gtNCcsXG4gICAgJ2p1aWNlLWJveC01JyxcbiAgICAncGxhc3RpYy1iYWdnaWUnLFxuICAgICdwbGFzdGljLWJhZ2dpZS0yJyxcbiAgICAncGxhc3RpYy1mb3JrJyxcbiAgICAncGxhc3RpYy1rbmlmZScsXG4gICAgJ3BsYXN0aWMtc3Bvb24nLFxuICAgICdwbGFzdGljLXNwb3JrJyxcbiAgICAncGxhc3RpYy1zdHJhd3MnLFxuICAgICdyZWQtZ2lmdC1ib3cnLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTEnLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTInLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTMnLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTUnLFxuICAgICdzdHlyb2ZvYW0tc291cC1jdXAnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19sYW5kZmlsbC5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zQ29tcG9zdCwgdiA9PlxuICAgIF8ua2ViYWJDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpXG4pO1xuXG52YXIgYXJyYXlPZkF1ZGlvID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT5cbiAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9e3Z9XG4gICAgICAgIGtleT17a31cbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYH1cbiAgICAgICAgY29tcGxldGVcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2ZpdmUtd2F5cycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3JpZ2h0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2l0aCA1IHdheXM8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHNvcnQgbGV0J3MgdGVzdDxici8+XG4gICAgICAgICAgICAgICAgeW91ciBrbm93bGVkZ2UhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnNVdheXMnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzYnLFxuICAgICAgICBleHRyYXM6IGFycmF5T2ZBdWRpbyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9maXZlX3dheXNfc2NyZWVuLmpzIiwibGV0IGJpbiA9ICdjb21wb3N0JztcbmxldCBuYW1lcyA9IFtcbiAgICAnYXBwbGUtY29yZScsXG4gICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAnY2Fycm90LXN0aWNrcycsXG4gICAgJ2NlbGVyeS1zdGljaycsXG4gICAgJ2NoaWNrZW4tbGVnJyxcbiAgICAnY29mZmVlLWN1cC0yJyxcbiAgICAnY29mZmVlLWN1cCcsXG4gICAgJ2NvZmZlZS1ncm91bmRzJyxcbiAgICAnZGlydHktcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTEnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTMnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTQnLFxuICAgICdmb29kLXNvaWxlZC1wYXBlci1wbGF0ZScsXG4gICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgJ25hcGtpbi0xJyxcbiAgICAnbmFwa2luLTInLFxuICAgICduYXBraW4tMycsXG4gICAgJ25hcGtpbi00JyxcbiAgICAnb3JhbmdlLXNsaWNlJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzLTEnLFxuICAgICdwZW5jaWwtc2hhdmluZ3MtMicsXG4gICAgJ3BlbmNpbC1zaGF2aW5ncy0zJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzJyxcbiAgICAncGl6emEtY3J1c3QnLFxuICAgICdzb2lsZWQtcGFwZXItdHJheS0xJyxcbiAgICAnc29pbGVkLXBhcGVyLXRyYXktMicsXG4gICAgJ3NvaWxlZC1wYXBlci10cmF5LTMnLFxuICAgICdzb2xpZWQtcGFwZXItdHJheS00JyxcbiAgICAndGVhYmFnJyxcbiAgICAndXNlZC1wYXBlci1mb29kLWNvbnRhaW5lcicsXG4gICAgJ3VzZWQtcGFwZXItc2FuZHdpY2gtd3JhcHBlci0xJyxcbiAgICAndXNlZC1wYXBlci1zYW5kd2ljaC13cmFwcGVyLTInLFxuICAgICd1c2VkLXBhcGVyLXNhbmR3aWNoLXdyYXBwZXItNCcsXG4gICAgJ3VzZWQtdGFrZW91dC1jb250YWluZXJzJyxcbiAgICAnd2hpdGUtcGFwZXItdG93ZWwtc2hlZXQnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19jb21wb3N0LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmxldCBsZXZlbEtleXMgPSBbXG4gICAgJ3JlY3ljbGluZ0NoYW1waW9uJyxcbiAgICAncHJpY2VsZXNzUG91cmVyJyxcbiAgICAnZmFudGFzdGljRm9vZFNoYXJlcicsXG4gICAgJ2R5bmFtaWNEaXZlcnRlcicsXG4gICAgJ21hc3RlclNvcnRlcicsXG5dO1xuXG5sZXQgbGV2ZWxOYW1lcyA9IFtcbiAgICA8cD5SZWN5Y2xpbmc8YnIvPkNoYW1waW9uPC9wPixcbiAgICA8cD5QcmljZWxlc3M8YnIvPlBvdXJlcjwvcD4sXG4gICAgPHA+RmFudGFzdGljPGJyLz5Gb29kIFNoYXJlcjwvcD4sXG4gICAgPHA+RHluYW1pYzxici8+RGl2ZXJ0ZXI8L3A+LFxuICAgIDxwPk1hc3Rlcjxici8+U29ydGVyPC9wPixcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChsZXZlbE51bWJlcikge1xuICAgIGxldCBsZXZlbEludCA9IF8uZmxvb3IobGV2ZWxOdW1iZXIpO1xuICAgIGxldCBsZXZlbEtleSA9IGxldmVsS2V5c1tsZXZlbEludCAtIDFdO1xuICAgIGxldCBsZXZlbE5hbWUgPSBsZXZlbE5hbWVzW2xldmVsSW50IC0gMV07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIGxldCBsZXZlbERhdGEgPSBfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLiR7bGV2ZWxLZXl9LmxldmVsc2AsIHt9KTtcbiAgICAgICAgbGV0IHJlcGVhdGVyUHJvcHMgPSBfLm1hcChfLmdldChwcm9wcywgJ2RhdGEuZWFybmVkJyksIChsZXZlbCwgaW5kZXgpID0+XG4gICAgICAgICAgICAoe2NsYXNzTmFtZTogbGV2ZWwucGxheWluZyAmJiBfLmdldChsZXZlbERhdGEsIGAke2luZGV4fS5jb21wbGV0ZWApID8gJ2Vhcm5lZCcgOiAnJ30pXG4gICAgICAgICk7XG4gICAgICAgIGxldCBhbGxFYXJuZWQgPSByZXBlYXRlclByb3BzLmxlbmd0aCA9PT0gNSAmJiBfLmV2ZXJ5KHJlcGVhdGVyUHJvcHMsIHYgPT4gdi5jbGFzc05hbWUpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBpZD17YHByZS1sZXZlbC0ke2xldmVsTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtsZXZlbEludH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhvcHRzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBBTExfRUFSTkVEOiBhbGxFYXJuZWQsXG4gICAgICAgICAgICAgICAgICAgIEFQUEVBUjogXy5nZXQocHJvcHMsICdkYXRhLmFwcGVhci5wbGF5aW5nJyksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1yb2xsaW5nLWR1bXBzZXIubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9XCJhcHBlYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxBcHBlYXIubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxDb21wbGV0ZS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF0uY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICAgICAgXy5tYXAobGV2ZWxEYXRhLCAoZGF0YSwgbGV2ZWwpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5VGFyZ2V0PXtbJ2Vhcm5lZCcsIGxldmVsXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9R2V0U3Rhci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU9e2RhdGEuY29tcGxldGUgPyAxIDogMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9cHVycGxlLnJpYmJvbi5wbmdgfSAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWx1Z2dhZ2UucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9ZmxpcHMucG5nYH0gLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlJlcGVhdGVyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YXJzXCJcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXs1fVxuICAgICAgICAgICAgICAgICAgICBwcm9wcz17cmVwZWF0ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPkxldmVsIHtsZXZlbEludH08L2gzPlxuICAgICAgICAgICAgICAgICAgICB7bGV2ZWxOYW1lfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICAgICApO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGV2ZWxfc2NyZWVuX2NvbXBvbmVudC5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi1vbmUtaW5mbycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3NtYWxsJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTGV0J3Mgc3RhcnQgd2l0aCBzaW1wbGUgc29ydGluZzxici8+XG4gICAgICAgICAgICAgICAgb2YgUmVjeWNsYWJsZXMsIENvbXBvc3RhYmxlczxici8+XG4gICAgICAgICAgICAgICAgYW5kIExhbmRmaWxsIGl0ZW1zLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBQdXNoIHRoZSBjb3JyZWN0IGJ1dHRvbiB0byBsYW5kPGJyLz5cbiAgICAgICAgICAgICAgICBpdGVtcyBpbiB0aGUgYmluIHRoZXkgYmVsb25nIHRvLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0xldHNTdGFydCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMSdcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgc2NvcmVUb1dpbjogNjY1LFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQnO1xuaW1wb3J0IE1hbnVhbERyb3BwZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xJztcblxuY29uc3QgUFRTID0gJ3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIGlmIChNYXRoLmFicyhwcm9wcy5nYW1lU3RhdGUuY3VycmVudFNjcmVlbkluZGV4IC0gcGFyc2VJbnQoa2V5LCAxMCkpID4gMikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake29wdHMuZ2FtZU5hbWV9LSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7b3B0cy5nYW1lTnVtYmVyfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzY3JlZW5Qcm9wcztcbiAgICAgICAgbGV0IHRpbWVyUHJvcHM7XG4gICAgICAgIGxldCByZXZlYWxQcm9wcztcbiAgICAgICAgbGV0IHNlbGVjdGFibGVQcm9wcztcbiAgICAgICAgbGV0IGRyb3BwZXJQcm9wcztcbiAgICAgICAgbGV0IGNhdGNoZXJQcm9wcztcbiAgICAgICAgbGV0IGxpZmVQcm9wcztcbiAgICAgICAgbGV0IGV4dHJhQ29tcG9uZW50cztcblxuICAgICAgICBjb25zdCBMRVZFTF9QQVRIID0gYGdhbWVTdGF0ZS5kYXRhLiR7Xy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSl9LmxldmVscy4ke29wdHMubGV2ZWx9YDtcblxuICAgICAgICBsZXQgY2F0Y2hhYmxlc0FycmF5ID0gb3B0cy5nZXRDYXRjaGFibGVzQXJyYXkoKTtcblxuICAgICAgICBsZXQgYmluQ29tcG9uZW50cyA9IF8ubWFwKG9wdHMuYmluTmFtZXMsIG5hbWUgPT5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT17bmFtZX0gbWVzc2FnZT17bmFtZX0gLz5cbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgc2NhbGUgPSBfLmdldChwcm9wcywgJ2dhbWVTdGF0ZS5zY2FsZScsIDEpO1xuICAgICAgICBsZXQgc3RhcnQgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc3RhcnRgLCBmYWxzZSk7XG4gICAgICAgIGxldCBnYW1lQ29tcGxldGUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uY29tcGxldGVgLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLmRyb3AnLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wQ2xhc3MgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuZHJvcENsYXNzJyk7XG4gICAgICAgIGxldCBwaWNrVXAgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIucGlja1VwJywgZmFsc2UpO1xuICAgICAgICBsZXQgb25QaWNrVXAgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIub25QaWNrVXAnKTtcbiAgICAgICAgbGV0IHNlbGVjdEl0ZW0gPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuc2VsZWN0SXRlbScpO1xuICAgICAgICBsZXQgY2F0Y2hhYmxlUmVmcyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5yZWZzJywgW10pO1xuICAgICAgICBsZXQgaXRlbVJlZiA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnJlZicpO1xuICAgICAgICBsZXQgcmVtb3ZlSXRlbUNsYXNzTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnJlbW92ZUNsYXNzTmFtZScpO1xuICAgICAgICBsZXQgaXRlbVRvcCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnRvcCcsIDApIC8gc2NhbGU7XG4gICAgICAgIGxldCBpdGVtTGVmdCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLmxlZnQnLCAwKSAvIHNjYWxlIHx8ICdhdXRvJztcbiAgICAgICAgbGV0IGNhdWdodCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5jYXRjaGVyLmNhdWdodCcsICcnKTtcbiAgICAgICAgbGV0IHJldmVhbE9wZW4gPSBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSk7XG4gICAgICAgIGxldCByZXZlYWxDbG9zZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSk7XG4gICAgICAgIGxldCBwbGF5ID0gXy5nZXQocHJvcHMsICdkYXRhLnBsYXknLCBudWxsKTtcblxuICAgICAgICBsZXQgYXVkaW9BcnJheSA9IG9wdHMuZ2V0QXVkaW9BcnJheSgpO1xuXG4gICAgICAgIGlmIChpdGVtUmVmKSBjYXRjaGFibGVSZWZzID0gW2l0ZW1SZWZdO1xuXG4gICAgICAgIG9wdHMubmV4dCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5uZXh0JywgZmFsc2UpO1xuICAgICAgICBvcHRzLml0ZW1SZWYgPSBpdGVtUmVmO1xuICAgICAgICBvcHRzLml0ZW1OYW1lID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ubmFtZScsICcnKTtcbiAgICAgICAgb3B0cy5pdGVtTmV3ID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ubmV3JywgZmFsc2UpO1xuICAgICAgICBvcHRzLml0ZW1DbGFzc05hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5jbGFzc05hbWUnKTtcbiAgICAgICAgb3B0cy5pdGVtQW1vdW50ID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0uYW1vdW50JywgMCk7XG4gICAgICAgIG9wdHMucG91ciA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLnBvdXInLCBmYWxzZSk7XG4gICAgICAgIG9wdHMuc2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaWdoU2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uaGlnaFNjb3JlYCwgMCk7XG4gICAgICAgIG9wdHMubGVmdCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5sZWZ0JywgMCk7XG4gICAgICAgIG9wdHMuaGl0cyA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaXRzYCwgMCk7XG4gICAgICAgIG9wdHMudHJ1Y2tDbGFzc05hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEudHJ1Y2tDbGFzc05hbWUnLCAnJyk7XG4gICAgICAgIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UgPSBfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS5tZXNzYWdlJywgJycpO1xuICAgICAgICBvcHRzLm1vdmVDbGF3ID0gXy5nZXQocHJvcHMsICdkYXRhLm1vdmVDbGF3JywgZmFsc2UpO1xuICAgICAgICBvcHRzLnBsYXlBdWRpbyA9IChcbiAgICAgICAgICAgIHBsYXkgPyBwbGF5IDpcbiAgICAgICAgICAgIGRyb3AgJiYgIW9wdHMudHJ1Y2tDbGFzc05hbWUgPyAnZHJvcCcgOlxuICAgICAgICAgICAgcGlja1VwID8gJ3BpY2tVcCcgOlxuICAgICAgICAgICAgb3B0cy5uZXh0ID8gJ25leHQnIDpcbiAgICAgICAgICAgIG9wdHMucG91ciA/ICdwb3VyJyA6XG4gICAgICAgICAgICBvcHRzLm5leHQgPyAnY29ycmVjdCcgOlxuICAgICAgICAgICAgcmV2ZWFsT3BlbiA9PT0gJ3Jlc29ydCcgPyAncmVzb3J0JyA6XG4gICAgICAgICAgICByZXZlYWxPcGVuID09PSAncmV0cnknID8gJ3JldHJ5JyA6XG4gICAgICAgICAgICBvcHRzLml0ZW1OZXcgPyBfLmtlYmFiQ2FzZShvcHRzLml0ZW1OYW1lKSA6XG4gICAgICAgICAgICBkcm9wQ2xhc3MgPT09ICdUUkFZLVNUQUNLSU5HJyAmJiBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICd0cmF5JykgPyAndHJheScgOlxuICAgICAgICAgICAgb3B0cy5pdGVtTmFtZSA/ICdzZWxlY3QnIDogbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNjcmVlblByb3BzID0gb3B0cy5nZXRTY3JlZW5Qcm9wcyhvcHRzKTtcbiAgICAgICAgdGltZXJQcm9wcyA9IG9wdHMuZ2V0VGltZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgcmV2ZWFsUHJvcHMgPSBvcHRzLmdldFJldmVhbFByb3BzKG9wdHMpO1xuICAgICAgICBzZWxlY3RhYmxlUHJvcHMgPSBvcHRzLmdldFNlbGVjdGFibGVQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJvcHBlclByb3BzID0gb3B0cy5nZXREcm9wcGVyUHJvcHMob3B0cyk7XG4gICAgICAgIGNhdGNoZXJQcm9wcyA9IG9wdHMuZ2V0Q2F0Y2hlclByb3BzKG9wdHMpO1xuICAgICAgICBsaWZlUHJvcHMgPSBvcHRzLmdldExpZmVQcm9wcyhvcHRzKTtcbiAgICAgICAgZXh0cmFDb21wb25lbnRzID0gb3B0cy5nZXRFeHRyYUNvbXBvbmVudHMob3B0cyk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9eyFnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtvcHRzLmdhbWVOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICB7Li4uc2NyZWVuUHJvcHN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wLWxlZnRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGV2ZWwtc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5zY29yZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7UFRTfVxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5TY29yZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5UaW1lclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbDogXy5nZXQocHJvcHMsICdkYXRhLnRpbWVyLmZpbmFsJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9XCJtbTpzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtvcHRzLnRpbWVvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWU9eyFyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4udGltZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpdGVtLW5hbWUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBQ1RJVkU6IG9wdHMuaXRlbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBpdGVtVG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogaXRlbUxlZnQsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdHMuaXRlbU5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaWZlXCJcbiAgICAgICAgICAgICAgICAgICAgbWF4PXswfVxuICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3Q9e29wdHMubWF4SGl0c31cbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5oaXRzfVxuICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmxpZmVQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxNYW51YWxEcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgYW1vdW50PXtvcHRzLmRyb3BwZXJBbW91bnR9XG4gICAgICAgICAgICAgICAgICAgIGRyb3A9e2Ryb3B9XG4gICAgICAgICAgICAgICAgICAgIHBpY2tVcD17cGlja1VwfVxuICAgICAgICAgICAgICAgICAgICBvblBpY2tVcD17b25QaWNrVXB9XG4gICAgICAgICAgICAgICAgICAgIG5leHQ9e29wdHMubmV4dH1cbiAgICAgICAgICAgICAgICAgICAgYmluPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbj17Y2F0Y2hhYmxlc0FycmF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpblxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke29wdHMubGVmdH1weClgXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNhdWdodD17Y2F1Z2h0fVxuICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M9e2Ryb3BDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgaXRlbVJlZj17aXRlbVJlZn1cbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzTmFtZT17b3B0cy5pdGVtQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICByZW1vdmVJdGVtQ2xhc3NOYW1lPXtyZW1vdmVJdGVtQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RJdGVtPXtzZWxlY3RJdGVtfVxuICAgICAgICAgICAgICAgICAgICB7Li4uZHJvcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdiaW5zJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgRElTQUJMRUQ6ICFvcHRzLml0ZW1OYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPENhdGNoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlT25TdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWNrZXQ9e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGFibGVSZWZzPXtjYXRjaGFibGVSZWZzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e2NhdWdodCB8fCAhc3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWU9e2Ryb3AgfHwgaXRlbVJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVGcmFjdGlvbj17b3B0cy5jb2xsaWRlRnJhY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uY2F0Y2hlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNlbGVjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RhYmxlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0PXtiaW5Db21wb25lbnRzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICB7ZXh0cmFDb21wb25lbnRzfVxuICAgICAgICAgICAgICAgIDxza29hc2guUmV2ZWFsXG4gICAgICAgICAgICAgICAgICAgIG9wZW5UYXJnZXQ9XCJyZXZlYWxcIlxuICAgICAgICAgICAgICAgICAgICBvcGVuUmV2ZWFsPXtyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICBjbG9zZVJldmVhbD17cmV2ZWFsQ2xvc2V9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLnJldmVhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJlc29ydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXRyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcGxheT17b3B0cy5wbGF5QXVkaW99XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXthdWRpb0FycmF5fVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tSZWFkeT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvblBsYXk9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAncGxheScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQuanMiLCJpbXBvcnQgQ2F0Y2ggZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2gvMC4xJztcblxuY2xhc3MgQ2F0Y2hlciBleHRlbmRzIENhdGNoIHtcbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHNrb2FzaC5Db21wb25lbnQucHJvdG90eXBlLmJvb3RzdHJhcC5jYWxsKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZSk7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmJ1Y2tldE5vZGVzID0gXy5yZWR1Y2UodGhpcy5yZWZzLCAoYSwgdiwgaykgPT4ge1xuICAgICAgICAgICAgaWYgKGsuaW5kZXhPZignYnVja2V0cy0nKSkgcmV0dXJuIGE7XG4gICAgICAgICAgICBhW2tdID0gUmVhY3RET00uZmluZERPTU5vZGUodik7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSwge30pO1xuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHZhciB6b29tID0gc3RhdGUuc2NhbGU7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB6b29tXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb25zKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCB0aGlzLnN0YXRlLnBhdXNlZCB8fCAhdGhpcy5zdGF0ZS5jYW5DYXRjaCkgcmV0dXJuO1xuICAgICAgICBfLmVhY2godGhpcy5idWNrZXROb2RlcywgKGJ1Y2tldE5vZGUsIGJ1Y2tldFJlZktleSkgPT4ge1xuICAgICAgICAgICAgdmFyIGJ1Y2tldFJlY3QgPSBidWNrZXROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgXy5lYWNoKHRoaXMucHJvcHMuY2F0Y2hhYmxlUmVmcywgY2F0Y2hhYmxlUmVmID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWNhdGNoYWJsZVJlZi5jYW5DYXRjaCgpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hhYmxlUmVmLkRPTU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2F0Y2hhYmxlKHRoaXMucmVmc1tidWNrZXRSZWZLZXldLCBjYXRjaGFibGVSZWYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuY2hlY2tDb2xsaXNpb25zKTtcbiAgICB9XG5cbiAgICBpc0NvbGxpZGluZyhidWNrZXRSZWN0LCBjYXRjaFJlY3QpIHtcbiAgICAgICAgdmFyIHhDZW50ZXIgPSBjYXRjaFJlY3QubGVmdCArIChjYXRjaFJlY3QucmlnaHQgLSBjYXRjaFJlY3QubGVmdCkgLyAyO1xuICAgICAgICB2YXIgeU9mZnNldCA9IChidWNrZXRSZWN0LmJvdHRvbSAtIGJ1Y2tldFJlY3QudG9wKSAqIHRoaXMucHJvcHMuY29sbGlkZUZyYWN0aW9uO1xuICAgICAgICByZXR1cm4gKGJ1Y2tldFJlY3QudG9wIC0geU9mZnNldCA8IGNhdGNoUmVjdC5ib3R0b20gJiYgYnVja2V0UmVjdC50b3AgKyB5T2Zmc2V0ID4gY2F0Y2hSZWN0LnRvcCAmJlxuICAgICAgICAgICAgeENlbnRlciA+IGJ1Y2tldFJlY3QubGVmdCAmJiB4Q2VudGVyIDwgYnVja2V0UmVjdC5yaWdodCk7XG4gICAgfVxuXG4gICAgc2VsZWN0Q2F0Y2hhYmxlKGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmKSB7XG4gICAgICAgIHZhciBjYXRjaGFibGVSZWZLZXk7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkIHx8XG4gICAgICAgICAgICAhdGhpcy5zdGF0ZS5jYW5DYXRjaCB8fCAhY2F0Y2hhYmxlUmVmLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICAgICAgY2F0Y2hhYmxlUmVmS2V5ID0gY2F0Y2hhYmxlUmVmLnByb3BzWydkYXRhLXJlZiddO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAga2V5czogW3RoaXMucHJvcHMuY2F1Z2h0VGFyZ2V0LCAnY2F1Z2h0J10sXG4gICAgICAgICAgICBkYXRhOiBjYXRjaGFibGVSZWZLZXksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2F0Y2hhYmxlUmVmLnByb3BzLm1lc3NhZ2UgPT09IGJ1Y2tldFJlZi5wcm9wcy5tZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3QoYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3QoYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ29ycmVjdC5jYWxsKHRoaXMsIGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KTtcbiAgICB9XG5cbiAgICBpbmNvcnJlY3QoYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpIHtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2luY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLnBhdXNlICYmIHByb3BzLnBhdXNlICE9PSB0aGlzLnByb3BzLnBhdXNlKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMucmVzdW1lICYmIHByb3BzLnJlc3VtZSAhPT0gdGhpcy5wcm9wcy5yZXN1bWUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCdWNrZXQoKSB7XG4gICAgICAgIHJldHVybiBfLm1hcChbXS5jb25jYXQodGhpcy5wcm9wcy5idWNrZXQpLCAoYnVja2V0LCBrZXkpID0+XG4gICAgICAgICAgICA8YnVja2V0LnR5cGVcbiAgICAgICAgICAgICAgICB7Li4uYnVja2V0LnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17J2J1Y2tldHMtJyArIGtleX1cbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCdhc3NldHMnKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCdWNrZXQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ2F0Y2hlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBjYXVnaHRUYXJnZXQ6ICdjYXRjaGVyJyxcbiAgICBjb2xsaWRlRnJhY3Rpb246IDEgLyA2LFxufSwgQ2F0Y2guZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2hlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoZXIvMC40LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMSc7XG5cbmNsYXNzIENhdGNoIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjYW5DYXRjaDogdHJ1ZSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9ucyA9IHRoaXMuY2hlY2tDb2xsaXNpb25zLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICB0aGlzLmF0dGFjaE1vdXNlRXZlbnRzKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKTtcblxuICAgICAgICB0aGlzLmJ1Y2tldE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuYnVja2V0KTtcbiAgICAgICAgdGhpcy5jYXRjaGFibGVOb2RlcyA9IF8ubWFwKHRoaXMucHJvcHMuY2F0Y2hhYmxlcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzW2Ake2tleX0tY2F0Y2hhYmxlYF0pO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBfLmZvckVhY2godGhpcy5jYXRjaGFibGVOb2RlcywgZnVuY3Rpb24gKG5vZGUsIGtleSkge1xuICAgICAgICAgICAgdmFyIGNhdGNoYWJsZVJlZiA9IHRoaXMucmVmc1tgJHtrZXl9LWNhdGNoYWJsZWBdO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25pdGVyYXRpb24nLCBjYXRjaGFibGVSZWYucmVzZXQsIGZhbHNlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgdmFyIGNhdGNoUmVmID0gdGhpcy5yZWZzWydjYXRjaC1jb21wb25lbnQnXTtcbiAgICAgICAgaWYgKGNhdGNoUmVmKSB7XG4gICAgICAgICAgICBjYXRjaFJlZi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1vdXNlWDogZS5wYWdlWFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ2dldFN0YXRlJykudGhlbihzdGF0ZSA9PiB7XG4gICAgICAgICAgICB2YXIgem9vbSA9IHN0YXRlLnNjYWxlO1xuICAgICAgICAgICAgdmFyIGVkZ2VzID0gdGhpcy5nZXRFZGdlcyh0aGlzLmJ1Y2tldE5vZGUpO1xuICAgICAgICAgICAgdmFyIGJ1Y2tldFdpZHRoID0gZWRnZXMucmlnaHQgLSBlZGdlcy5sZWZ0O1xuICAgICAgICAgICAgdmFyIGxlZnRCb3VuZCA9IHRoaXMuYnVja2V0Tm9kZS5vZmZzZXRQYXJlbnQgP1xuICAgICAgICAgICAgICAgIHRoaXMuYnVja2V0Tm9kZS5vZmZzZXRQYXJlbnQub2Zmc2V0V2lkdGggLSBidWNrZXRXaWR0aCA6IDA7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1Y2tldFRvcDogZWRnZXMudG9wLFxuICAgICAgICAgICAgICAgIGJ1Y2tldEJvdHRvbTogZWRnZXMuYm90dG9tLFxuICAgICAgICAgICAgICAgIGJ1Y2tldFdpZHRoLFxuICAgICAgICAgICAgICAgIGxlZnRCb3VuZCxcbiAgICAgICAgICAgICAgICB6b29tXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRoaXMuY2hlY2tDb2xsaXNpb25zKTtcbiAgICAgICAgdGhpcy5ib290c3RyYXAoKTtcbiAgICB9XG5cbiAgICByZXN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9ucygpO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdXNlZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bWUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF1c2VkOiBmYWxzZVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdENhdGNoYWJsZShjYXRjaGFibGVOb2RlLCBrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQgfHwgIXRoaXMuc3RhdGUuY2FuQ2F0Y2ggfHxcbiAgICAgICAgICAgICFjYXRjaGFibGVOb2RlLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICAgICAgY2F0Y2hhYmxlTm9kZS5tYXJrQ2F1Z2h0KCk7XG4gICAgICAgIGlmIChjYXRjaGFibGVOb2RlLnByb3BzLmlzQ29ycmVjdCkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGNhdGNoYWJsZU5vZGUsIGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdChjYXRjaGFibGVOb2RlLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ycmVjdChjYXRjaGFibGUsIGtleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ29ycmVjdC5jYWxsKHRoaXMsIGNhdGNoYWJsZSwga2V5KTtcbiAgICB9XG5cbiAgICBpbmNvcnJlY3QoY2F0Y2hhYmxlLCBrZXkpIHtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2luY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgY2F0Y2hhYmxlLCBrZXkpO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucygpIHtcbiAgICAgICAgdmFyIGJ1Y2tldFJlY3QgPSB0aGlzLmJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkKSByZXR1cm47XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNhdGNoYWJsZU5vZGVzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIHZhbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhdGNoYWJsZSh0aGlzLnJlZnNbYCR7a2V5fS1jYXRjaGFibGVgXSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrQ29sbGlzaW9ucyk7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgY2F0Y2hSZWN0KSB7XG4gICAgICAgIHZhciB4Q2VudGVyID0gY2F0Y2hSZWN0LmxlZnQgKyAoY2F0Y2hSZWN0LnJpZ2h0IC0gY2F0Y2hSZWN0LmxlZnQpIC8gMjtcbiAgICAgICAgdmFyIHlPZmZzZXQgPSAoY2F0Y2hSZWN0LmJvdHRvbSAtIGNhdGNoUmVjdC50b3ApIC8gNjtcbiAgICAgICAgcmV0dXJuIChidWNrZXRSZWN0LnRvcCA8IGNhdGNoUmVjdC5ib3R0b20gLSB5T2Zmc2V0ICYmIGJ1Y2tldFJlY3QudG9wID4gY2F0Y2hSZWN0LnRvcCArIHlPZmZzZXQgJiZcbiAgICAgICAgICAgIHhDZW50ZXIgPiBidWNrZXRSZWN0LmxlZnQgJiYgeENlbnRlciA8IGJ1Y2tldFJlY3QucmlnaHQpO1xuICAgIH1cblxuICAgIGdldEVkZ2VzKGVsKSB7XG4gICAgICAgIHZhciB0b3A7XG4gICAgICAgIHZhciBsZWZ0O1xuICAgICAgICB2YXIgd2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQ7XG5cbiAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgIHRvcCA9IDA7XG4gICAgICAgIHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc05hbWUgJiYgZWwuY2xhc3NOYW1lLmluZGV4T2YoJ3NjcmVlbicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZWZ0ICs9IGVsLm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIHRvcCArPSBlbC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgIGJvdHRvbTogdG9wICsgaGVpZ2h0LFxuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpIHtcbiAgICAgICAgdmFyIGxlZnQgPSAodGhpcy5zdGF0ZS5tb3VzZVggLyB0aGlzLnN0YXRlLnpvb20pIC0gKHRoaXMuc3RhdGUuYnVja2V0V2lkdGggLyAyKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYnVja2V0SW5Cb3VuZHMpIHtcbiAgICAgICAgICAgIGxlZnQgPSBsZWZ0IDwgMSA/IDEgOiBsZWZ0O1xuICAgICAgICAgICAgbGVmdCA9IGxlZnQgPj0gdGhpcy5zdGF0ZS5sZWZ0Qm91bmQgPyB0aGlzLnN0YXRlLmxlZnRCb3VuZCAtIDEgOiBsZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGAke2xlZnR9cHhgXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyQnVja2V0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuYnVja2V0LnR5cGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5idWNrZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPVwiYnVja2V0XCJcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDYXRjaGFibGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jYXRjaGFibGVzLm1hcCgoaXRlbSwga2V5KSA9PlxuICAgICAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIHJlZj17YCR7a2V5fS1jYXRjaGFibGVgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2F0Y2gnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPVwiY2F0Y2gtY29tcG9uZW50XCIgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhdGNoYWJsZXMoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJ1Y2tldCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG59XG5cbkNhdGNoLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGNhdGNoYWJsZXM6IFtdLFxuICAgIGJ1Y2tldEluQm91bmRzOiB0cnVlLFxuICAgIGJ1Y2tldDogPHNrb2FzaC5Db21wb25lbnQgLz4sXG4gICAgb25Db3JyZWN0OiBfLm5vb3AsXG4gICAgb25JbmNvcnJlY3Q6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2g7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgQ2F0Y2hhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2FuQ2F0Y2g6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXNldCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShvcHRzLCBjYikge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShvcHRzLCBjYik7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICAgICAgdGhpcy5ET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgfVxuXG4gICAgbWFya0NhdWdodCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NhbkNhdGNoOiBmYWxzZX0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2F1Z2h0LmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgY2FuQ2F0Y2goKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLnN0YXRlLmNhbkNhdGNoO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaGFibGUnLCB7XG4gICAgICAgICAgICBDQVVHSFQ6ICF0aGlzLnN0YXRlLmNhbkNhdGNoXG4gICAgICAgIH0sIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlYWR5ICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMucHJvcHMucmVDYXRjaGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NhbkNhdGNoOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkNhdGNoYWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgaXNDb3JyZWN0OiB0cnVlLFxuICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgIG9uQ2F1Z2h0OiBfLm5vb3AsXG4gICAgdHlwZTogJ2xpJyxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2hhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjInO1xuXG5jb25zdCBJVEVNID0gJ2l0ZW1zLSc7XG5jb25zdCBEUk9QUEVEID0gJ0RST1BQRUQnO1xuXG5jbGFzcyBEcm9wcGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgIGl0ZW1zOiB7fSxcbiAgICAgICAgfSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICAgICAgdGhpcy5ET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5pdGVtQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmZpcnN0SXRlbUluZGV4ID0gMDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGl0ZW1zOiB7fSxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZXh0KHRoaXMucHJvcHMuYW1vdW50LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZpcnN0SXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tJVEVNICsgdGhpcy5maXJzdEl0ZW1JbmRleF07XG4gICAgfVxuXG4gICAgZHJvcChwcm9wcykge1xuICAgICAgICB2YXIgaXRlbVJlZiA9IHRoaXMuZ2V0Rmlyc3RJdGVtKCk7XG4gICAgICAgIHByb3BzID0gcHJvcHMgfHwgdGhpcy5wcm9wcztcbiAgICAgICAgaXRlbVJlZi5hZGRDbGFzc05hbWUocHJvcHMuZHJvcENsYXNzIHx8IERST1BQRUQpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICBrZXk6IFtwcm9wcy5yZWZzVGFyZ2V0LCAnZHJvcCddLFxuICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BzLm9uRHJvcC5jYWxsKHRoaXMsIGl0ZW1SZWYpO1xuICAgIH1cblxuICAgIHBpY2tVcChwcm9wcykge1xuICAgICAgICB2YXIgaXRlbVJlZiA9IHRoaXMuZ2V0Rmlyc3RJdGVtKCk7XG4gICAgICAgIHByb3BzID0gcHJvcHMgfHwgdGhpcy5wcm9wcztcbiAgICAgICAgaXRlbVJlZi5yZW1vdmVDbGFzc05hbWUocHJvcHMuZHJvcENsYXNzIHx8IERST1BQRUQpO1xuICAgICAgICBpdGVtUmVmLnJlc2V0KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgIGtleTogW3Byb3BzLnJlZnNUYXJnZXQsICdwaWNrVXAnXSxcbiAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9wcy5vblBpY2tVcC5jYWxsKHRoaXMsIGl0ZW1SZWYpO1xuICAgIH1cblxuICAgIG5leHQoYW1vdW50ID0gMSwgc2hpZnQgPSB0cnVlKSB7XG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXM7XG5cbiAgICAgICAgXy5lYWNoKHRoaXMucmVmcy5iaW4uZ2V0KGFtb3VudCksIHYgPT4ge1xuICAgICAgICAgICAgaXRlbXNbdGhpcy5pdGVtQ291bnQrK10gPSAoXG4gICAgICAgICAgICAgICAgPHYudHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4udi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2hpZnQpIGRlbGV0ZSBpdGVtc1t0aGlzLmZpcnN0SXRlbUluZGV4KytdO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlZnMgPSBfLmZpbHRlcih0aGlzLnJlZnMsICh2LCBrKSA9PiAhay5pbmRleE9mKElURU0pKTtcbiAgICAgICAgICAgIHRoaXMuaW52b2tlQ2hpbGRyZW5GdW5jdGlvbignbWFya0NhdGNoYWJsZScpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleTogdGhpcy5wcm9wcy5yZWZzVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVmcyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvcHMub25OZXh0LmNhbGwodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhdWdodChjYXRjaGFibGVSZWZLZXkpIHtcbiAgICAgICAgXy5pbnZva2UodGhpcy5yZWZzW2NhdGNoYWJsZVJlZktleV0sICdtYXJrQ2F1Z2h0Jyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMubmV4dCA9PT0gdHJ1ZSAmJiBwcm9wcy5uZXh0ICE9PSB0aGlzLnByb3BzLm5leHQpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmRyb3AgPT09IHRydWUgJiYgcHJvcHMuZHJvcCAhPT0gdGhpcy5wcm9wcy5kcm9wKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3AocHJvcHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLnBpY2tVcCA9PT0gdHJ1ZSAmJiBwcm9wcy5waWNrVXAgIT09IHRoaXMucHJvcHMucGlja1VwKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tVcChwcm9wcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuY2F1Z2h0ICYmIHByb3BzLmNhdWdodCAhPT0gdGhpcy5wcm9wcy5jYXVnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuY2F1Z2h0KHByb3BzLmNhdWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnbWFudWFsLWRyb3BwZXInLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc2hvcnRpZCBpcyBpbnRlbnRpb25hbGx5IG5vdCB1c2VkIGZvciBrZXkgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG8gbWFrZSBzdXJlXG4gICAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICAgKi9cbiAgICByZW5kZXJJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRoaXMuc3RhdGUuaXRlbXMsIChpdGVtLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciByZWYgPSBJVEVNICsga2V5O1xuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGl0ZW0udHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4uaXRlbS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1tZXNzYWdlPXtpdGVtLnByb3BzLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQmluKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuYmluLnR5cGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5iaW4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPVwiYmluXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZD17dGhpcy5wcm9wcy5vblRyYW5zaXRpb25FbmQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnRMaXN0KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRHJvcHBlci5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkcm9wQ2xhc3M6IERST1BQRUQsXG4gICAgYW1vdW50OiAxLFxuICAgIGJpbjogKFxuICAgICAgICA8c2tvYXNoLlJhbmRvbWl6ZXJcbiAgICAgICAgICAgIGJpbj17W1xuICAgICAgICAgICAgICAgIDxDYXRjaGFibGUgLz4sXG4gICAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICksXG4gICAgcmVmc1RhcmdldDogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICBvbkRyb3A6IF8ubm9vcCxcbiAgICBvblBpY2tVcDogXy5ub29wLFxuICAgIG9uTmV4dDogXy5ub29wLFxuICAgIG5leHQ6IGZhbHNlLFxuICAgIGRyb3A6IGZhbHNlLFxuICAgIG9uVHJhbnNpdGlvbkVuZDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wcGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIENhdGNoYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNhdGNoYWJsZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXNldCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShvcHRzLCBjYikge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShvcHRzLCBjYik7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F1Z2h0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5jYXRjaGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2F0Y2hhYmxlOiBmYWxzZX0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2F1Z2h0LmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgbWFya0NhdGNoYWJsZSgpIHtcbiAgICAgICAgdGhpcy5ET01Ob2RlID0gdGhpcy5ET01Ob2RlIHx8IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jYXRjaGFibGUgJiYgdGhpcy5jYXRjaGFibGUpIHJldHVybjtcbiAgICAgICAgdGhpcy5jYXRjaGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNhdGNoYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuQ2F0Y2goKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLmNhdGNoYWJsZTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2F0Y2hhYmxlJywge1xuICAgICAgICAgICAgQ0FVR0hUOiAhdGhpcy5zdGF0ZS5jYXRjaGFibGVcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVhZHkgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5yZUNhdGNoYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jYXRjaGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2F0Y2hhYmxlOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkNhdGNoYWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgaXNDb3JyZWN0OiB0cnVlLFxuICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgIG9uQ2F1Z2h0OiBfLm5vb3AsXG4gICAgdHlwZTogJ2xpJyxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0Y2hhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMi5qcyIsImltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcblxuY29uc3QgYmluTmFtZXMgPSBbXG4gICAgJ3JlY3ljbGUnLFxuICAgICdsYW5kZmlsbCcsXG4gICAgJ2NvbXBvc3QnLFxuXTtcblxubGV0IGl0ZW1zVG9Tb3J0ID0gXy5maWx0ZXIoSXRlbXNUb1NvcnQsIGl0ZW0gPT4gXy5pbmNsdWRlcyhiaW5OYW1lcywgaXRlbS5iaW4pKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdyZWN5Y2xpbmctY2hhbXBpb24nLFxuICAgIGdhbWVOdW1iZXI6IDEsXG4gICAgYmluTmFtZXMsXG4gICAgaXRlbXNUb1NvcnQsXG4gICAgZXh0cmFDb21wb25lbnRzOiBbXG4gICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc2NyPXtgJHtDTVdOLk1FRElBLklNQUdFfXBpcGUwMS5wbmdgfSAvPixcbiAgICBdLFxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzLmpzIiwiaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yJztcblxuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmxldCBiaW5OYW1lcyA9IFtcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyb3BcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZWxlYXNlSXRlbTEubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJjb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9Q29ycmVjdFNlbGVjdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXRyeVwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfWxldmVsLWZhaWwubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwaWNrVXBcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JdGVtRmxpcC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdhbWVOYW1lOiAncmVjeWNsaW5nLWNoYW1waW9uJyxcbiAgICBnYW1lTnVtYmVyOiAxLFxuICAgIGxldmVsOiAxLFxuICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICBzY29yZVRvV2luOiA2MDAsXG4gICAgbWF4SGl0czogNSxcbiAgICBkcm9wcGVyQW1vdW50OiAzLFxuICAgIHBvaW50c1Blckl0ZW06IDk1LFxuICAgIHBvaW50c1Blck1pc3M6IDI1MCxcbiAgICBjb2xsaWRlRnJhY3Rpb246IDAsXG4gICAgZ2V0U2NyZWVuUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHM6IDAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFRpbWVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnNjb3JlID49IG9wdHMuc2NvcmVUb1dpbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hTY29yZTogTWF0aC5tYXgob3B0cy5zY29yZSwgb3B0cy5oaWdoU2NvcmUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmV0cnknLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25JbmNyZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2Vjb25kc0xlZnQgPSAodGhpcy5wcm9wcy50aW1lb3V0IC0gdGhpcy5zdGF0ZS50aW1lKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZHNMZWZ0ID09PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXk6ICd0aW1lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRSZXZlYWxQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbk9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIChwcmV2TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2TWVzc2FnZSB8fCBwcmV2TWVzc2FnZSA9PT0gJ3Jlc29ydCcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGlmIChwcmV2TWVzc2FnZSA9PT0gJ3JldHJ5Jykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnNjb3JlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5oaXRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFNlbGVjdGFibGVQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24gKGJpblJlZktleSkge1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzW2JpblJlZktleV0pLm9mZnNldExlZnQgLSA3ODU7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMubGVmdCA9PT0gbGVmdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdkcm9wJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdsZWZ0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RHJvcHBlclByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ET01Ob2RlICE9PSBlLnRhcmdldCB8fCBvcHRzLmxlZnQgPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Ryb3AnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbk5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKHRoaXMuZ2V0Rmlyc3RJdGVtKCkucHJvcHMuY2xhc3NOYW1lLCAvXFxkKy9nLCAnJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uUGlja1VwOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Ryb3BDbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAnJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDYXRjaGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db3JyZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzY29yZSddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAncGlja1VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0TGlmZVByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5zY29yZSA+PSBvcHRzLnNjb3JlVG9XaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoU2NvcmU6IE1hdGgubWF4KG9wdHMuc2NvcmUsIG9wdHMuaGlnaFNjb3JlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3JldHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEV4dHJhQ29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGNhdGNoYWJsZXNBcnJheTtcbiAgICB9LFxuICAgIGJpbk5hbWVzLFxuICAgIGl0ZW1zVG9Tb3J0LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2dhbWVfb3B0cy5qcyIsImltcG9ydCBpdGVtc0NvbXBvc3QgZnJvbSAnLi9pdGVtc19jb21wb3N0JztcbmltcG9ydCBpdGVtc0Zvb2RTaGFyZSBmcm9tICcuL2l0ZW1zX2Zvb2Rfc2hhcmUnO1xuaW1wb3J0IGl0ZW1zTGFuZGZpbGwgZnJvbSAnLi9pdGVtc19sYW5kZmlsbCc7XG5pbXBvcnQgaXRlbXNMaXF1aWRzIGZyb20gJy4vaXRlbXNfbGlxdWlkcyc7XG5pbXBvcnQgaXRlbXNSZWN5Y2xlIGZyb20gJy4vaXRlbXNfcmVjeWNsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFtdXG4gICAgLmNvbmNhdChpdGVtc0NvbXBvc3QpXG4gICAgLmNvbmNhdChpdGVtc0Zvb2RTaGFyZSlcbiAgICAuY29uY2F0KGl0ZW1zTGFuZGZpbGwpXG4gICAgLmNvbmNhdChpdGVtc0xpcXVpZHMpXG4gICAgLmNvbmNhdChpdGVtc1JlY3ljbGUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX3RvX3NvcnQuanMiLCJsZXQgYmluID0gJ2Zvb2Qtc2hhcmUnO1xubGV0IG5hbWVzID0gW1xuICAgICdiYWctb2YtcG90YXRvLWNoaXBzLTInLFxuICAgICdiYWctb2YtcG90YXRvLWNoaXBzLTMnLFxuICAgICdib3gtb2YtY2hlZGRhci1jcmFja2VycycsXG4gICAgJ2JveC1vZi1jb29raWVzJyxcbiAgICAnZnJlc2gtdW5vcGVuZWQtc2FuZHdpY2gnLFxuICAgICdrZXRjaHVwLXBhY2tldCcsXG4gICAgJ21heW8tcGFja2V0JyxcbiAgICAnbXVzdGFyZC1wYWNrZXQnLFxuICAgICdwYWNrYWdlLW9mLWRyaWVkLWZydWl0JyxcbiAgICAncGFja2FnZWQtZGlubmVyLXJvbGwnLFxuICAgICdwYWNrYWdlZC12ZWdldGFibGVzJyxcbiAgICAnc2VhbGVkLWFwcGxlc2F1Y2UnLFxuICAgICdzZWFsZWQtYmFnLW9mLWNhcnJvdHMnLFxuICAgICdzZWFsZWQtcG9wY29ybicsXG4gICAgJ3NlYWxlZC1jaG9jb2xhdGUtbWlsaycsXG4gICAgJ3NlYWxlZC1mcnVpdC1kcmluay0xJyxcbiAgICAnc2VhbGVkLWZydWl0LWRyaW5rLTInLFxuICAgICdzZWFsZWQtZnJ1aXQtZHJpbmstMycsXG4gICAgJ3NlYWxlZC1taWxrLTEnLFxuICAgICdzZWFsZWQtbWlsay0yJyxcbiAgICAnc2VhbGVkLW1pbGstMycsXG4gICAgJ3NlYWxlZC1vcmFuZ2UtanVpY2UnLFxuICAgICdzZWFsZWQtcHJldHplbCcsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jZXJlYWwnLFxuICAgICdzaW5nbGUtc2VydmUtY2VyZWFsLTInLFxuICAgICdzaW5nbGUtc2VydmUtY2VyZWFsLTMnLFxuICAgICdzaW5nbGUtc2VydmUtY29va2llcycsXG4gICAgJ3Vub3BlbmVkLWJveC1vZi1yYWlzaW5zJyxcbiAgICAndW5vcGVuZWQtY29va2llcy1wYWNrYWdlJyxcbiAgICAndW5vcGVuZWQtY3JhY2tlcnMtMScsXG4gICAgJ3Vub3BlbmVkLWNyYWNrZXJzLTInLFxuICAgICd1bm9wZW5lZC1jcmFja2Vycy0zJyxcbiAgICAndW5vcGVuZWQtZW5lcmd5LWJhcicsXG4gICAgJ3Vub3BlbmVkLWdyYWhhbS1jb29raWVzLTEnLFxuICAgICd1bm9wZW5lZC1ncmFoYW0tY29va2llcy0yJyxcbiAgICAndW5vcGVuZWQtZ3JhaGFtLWNvb2tpZXMtMycsXG4gICAgJ3Vub3BlbmVkLWdyYW5vbGEtYmFyJyxcbiAgICAndW5vcGVuZWQtanVpY2UtYm94LTEnLFxuICAgICd1bm9wZW5lZC1qdWljZS1ib3gtMicsXG4gICAgJ3Vub3BlbmVkLWp1aWNlLWJveC0zJyxcbiAgICAndW5vcGVuZWQtcGFjay1vZi1ncmFwZXMnLFxuICAgICd3aG9sZS1hcHBsZScsXG4gICAgJ3dob2xlLWJhbmFuYScsXG4gICAgJ3dob2xlLW9yYW5nZScsXG4gICAgJ3lvZ3VydC1jdXAtMScsXG4gICAgJ3lvZ3VydC1jdXAtMicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX2Zvb2Rfc2hhcmUuanMiLCJsZXQgYmluID0gJ2xpcXVpZHMnO1xubGV0IG5hbWVzID0gW1xuICAgICdoYWxmLWZ1bGwtZW5lcmd5LWRyaW5rLWJvdHRsZScsXG4gICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUtMScsXG4gICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUtMicsXG4gICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUtMycsXG4gICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUtNCcsXG4gICAgJ2hhbGYtZnVsbC1sZW1vbmFkZS1ib3gtMScsXG4gICAgJ2hhbGYtZnVsbC1sZW1vbmFkZS1ib3gtNCcsXG4gICAgJ2hhbGYtZnVsbC1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tMScsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi0yJyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTMnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tNCcsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi01JyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTYnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tNycsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi04JyxcbiAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZS0yJyxcbl07XG5cbmxldCBiZWNvbWVzID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTEnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTEnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTInLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTMnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTQnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2p1aWNlLWJveC0xJyxcbiAgICAgICAgYmluOiAnbGFuZGZpbGwnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnanVpY2UtYm94LTInLFxuICAgICAgICBiaW46ICdsYW5kZmlsbCcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1taWxrLWNhcnRvbicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24nLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTEnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTInLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTMnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTQnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTUnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTYnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTcnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTgnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW9yYW5nZS1qdWljZS0yJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IF8ubWFwKG5hbWVzLCAobmFtZSwgZnJhbWUpID0+ICh7XG4gICAgbmFtZSxcbiAgICBiaW4sXG4gICAgZnJhbWUsXG4gICAgYmVjb21lczogYmVjb21lc1tmcmFtZV0sXG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfbGlxdWlkcy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdXIgU29ydGluZyBTa2lsbHM8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSBuZWVkZWQgZm9yPGJyLz5cbiAgICAgICAgICAgICAgICB0aGlzIG5leHQgcm91bmQuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEdldCBSZWFkeS1TZXQtR28hXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnUmVhZHlTZXRHbycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMSdcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogNzYwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX3R3b19zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdyZWN5Y2xpbmctY2hhbXBpb24tdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIE5vdyB0aGF0IHlvdSBoYXZlPGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgaGFuZyBvZiB0aGlzIGxldCdzPGJyLz5cbiAgICAgICAgICAgICAgICBhZGQgc29tZSBzcGVlZC48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgR29vZCBsdWNrPGJyLz5cbiAgICAgICAgICAgICAgICBTcGVlZCBTb3J0aW5nIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1NwZWVkU29ydGluZycsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMSdcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBzY29yZVRvV2luOiA4NTUsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoYXQgd2FzIHNvbWU8YnIvPlxuICAgICAgICAgICAgICAgIFNwZWVkIFNvcnRpbmchPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGtpY2sgaXQ8YnIvPlxuICAgICAgICAgICAgICAgIGludG8gaGlnaCBkcml2ZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIaWdoRHJpdmUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzEnXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiA5NTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdyZWN5Y2xpbmctY2hhbXBpb24tZml2ZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTWFzdGVyIHRoaXMgbGV2ZWw8YnIvPlxuICAgICAgICAgICAgICAgIGFuZCB3aW4gdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBSZWN5Y2xlIENoYW1waW9uIEZsaXAhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEFjY3VyYWN5IGlzIGltcG9ydGFudC4uLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0NoYW1waW9uRmxpcCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMSdcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwNDUsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxubGV0IGZsaXBLZXlzID0gW1xuICAgICdyZWN5Y2xpbmctY2hhbXBpb24nLFxuICAgICdwcmljZWxlc3MtcG91cmVyJyxcbiAgICAnZmFudGFzdGljLWZvb2Qtc2hhcmVyJyxcbiAgICAnZHluYW1pYy1kaXZlcnRlcicsXG4gICAgJ21hc3Rlci1zb3J0ZXInLFxuICAgICdncmVlbi10ZWFtLWNoYWxsZW5nZScsXG5dO1xuXG5sZXQgbGV2ZWxOYW1lcyA9IFtcbiAgICAnUmVjeWNsaW5nIENoYW1waW9uJyxcbiAgICAnUHJpY2VsZXNzIFBvdXJlcicsXG4gICAgJ0ZhbnRhc3RpYyBGb29kIFNoYXJlcicsXG4gICAgJ0R5bmFtaWMgRGl2ZXJ0ZXInLFxuICAgICdNYXN0ZXIgU29ydGVyJyxcbl07XG5cbmxldCBudW1iZXJXb3JkcyA9IFtcbiAgICAnT25lJyxcbiAgICAnVHdvJyxcbiAgICAnVGhyZWUnLFxuICAgICdGb3VyJyxcbiAgICAnRml2ZScsXG5dO1xuXG5sZXQgZ2V0TGV2ZWxIZWFkZXIgPSBsZXZlbE51bWJlcldvcmQgPT4ge1xuICAgIGlmIChsZXZlbE51bWJlcldvcmQpIHJldHVybiA8aDMgY2xhc3NOYW1lPVwiYW5pbWF0ZWRcIj5MZXZlbCB7bGV2ZWxOdW1iZXJXb3JkfSBDb21wbGV0ZSE8L2gzPjtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlciBhbmltYXRlZFwiPlxuICAgICAgICAgICAgPGgzPkNPTkdSQVRVTEFUSU9OUyE8L2gzPlxuICAgICAgICAgICAgPGg0PllvdSBhcmUgYSBtZW1iZXIgb2YgR3JlZW4gVGVhbSE8L2g0PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxubGV0IGxpc3RMZXZlbHMgPSBsZXZlbE51bWJlciA9PlxuICAgIF8ubWFwKGxldmVsTmFtZXMsIChuYW1lLCBudW1iZXIpID0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtsZXZlbE51bWJlciA+IG51bWJlciA/ICdjb21wbGV0ZScgOiAnJ30+XG4gICAgICAgICAgICA8cD5MZXZlbCB7bnVtYmVyICsgMX08L3A+XG4gICAgICAgICAgICA8cD57bmFtZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChsZXZlbE51bWJlcikge1xuICAgIGxldCBsZXZlbE51bWJlcldvcmQgPSBudW1iZXJXb3Jkc1tsZXZlbE51bWJlciAtIDFdO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Bwb3N0LWxldmVsLSR7bGV2ZWxOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0cy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgQVBQRUFSOiBfLmdldChwcm9wcywgJ2RhdGEuYXBwZWFyLnBsYXlpbmcnKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke2xldmVsTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgZW1pdE9uQ29tcGxldGU9e3tcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2ZsaXAnLFxuICAgICAgICAgICAgICAgICAgICBnYW1lOiBmbGlwS2V5c1tsZXZlbE51bWJlciAtIDFdXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5GUkFNRX10cmFuc2l0aW9uLmZyYW1lLnBuZ2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9c3ByaXRlLmxldmVscy5wbmdgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGV2ZWxBd2FyZC5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9RmxpcEhvdmVyLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheVRhcmdldD1cImFwcGVhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUZsaXBEcm9wQm91bmNlLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guTWVkaWFTZXF1ZW5jZT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHtnZXRMZXZlbEhlYWRlcihsZXZlbE51bWJlcldvcmQpfVxuICAgICAgICAgICAgICAgICAgICB7bGlzdExldmVscyhsZXZlbE51bWJlcil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9sZXZlbF9jb21wbGV0ZV9zY3JlZW5fY29tcG9uZW50LmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1vbmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhleSBSZWN5Y2xlIENoYW1waW9uITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBOZXh0IHVw4oCUaXQncyBMaXF1aWRzITxici8+XG4gICAgICAgICAgICAgICAgUG91ciB0aGUgbGlxdWlkcyBhbmQ8YnIvPlxuICAgICAgICAgICAgICAgIHRoZW4gc29ydCB0aGUgY29udGFpbmVycy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdIZXlSZWN5Y2xlQ2hhbXBpb24nLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzInLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5cbmltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcbmltcG9ydCBJdGVtc0xpcXVpZCBmcm9tICcuL2l0ZW1zX2xpcXVpZHMnO1xuXG5jb25zdCBiaW5OYW1lcyA9IFtcbiAgICAnbGlxdWlkcycsXG4gICAgJ3JlY3ljbGUnLFxuICAgICdsYW5kZmlsbCcsXG4gICAgJ2NvbXBvc3QnLFxuXTtcblxubGV0IGl0ZW1zVG9Tb3J0ID0gXy5maWx0ZXIoXG4gICAgSXRlbXNUb1NvcnQuY29uY2F0KEl0ZW1zTGlxdWlkKS5jb25jYXQoSXRlbXNMaXF1aWQpLFxuICAgIGl0ZW0gPT4gXy5pbmNsdWRlcyhiaW5OYW1lcywgaXRlbS5iaW4pXG4pO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyb3BcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1DbGlja1JlY0J1dHRvbi5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db252ZXlvckJlbHQubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXNvcnRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZXNvcnRXYXJuaW5nLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmV0cnlcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1sZXZlbC1mYWlsLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicGlja1VwXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZsaXAubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwb3VyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGlxdWlkUG91ci5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdwcmljZWxlc3MtcG91cmVyJyxcbiAgICBnYW1lTnVtYmVyOiAyLFxuICAgIGRyb3BwZXJBbW91bnQ6IDQsXG4gICAgYmluTmFtZXMsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoYmluUmVmS2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnbWFudWFsLWRyb3BwZXInLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiBfLnRvVXBwZXIob3B0cy5iaW5OYW1lc1tiaW5SZWZLZXldKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RHJvcHBlclByb3BzKG9wdHMpIHtcbiAgICAgICAgbGV0IHByb3BzID0gZGVmYXVsdEdhbWVPcHRzLmdldERyb3BwZXJQcm9wcy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICAgIHByb3BzLm9uVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBsZXQgaXRlbVJlZiA9IHRoaXMucmVmc1snaXRlbXMtJyArIHRoaXMuZmlyc3RJdGVtSW5kZXhdO1xuICAgICAgICAgICAgbGV0IERPTU5vZGU7XG4gICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgIGlmIChlLnByb3BlcnR5TmFtZSAhPT0gJ2xlZnQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kcm9wQ2xhc3MgIT09ICdMSVFVSURTJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGl0ZW1SZWYucHJvcHMubWVzc2FnZSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAncGlja1VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIERPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKTtcblxuICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgIG9uQW5pbWF0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja1VwKF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmlyc3RJdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMuY2xhc3NOYW1lID0gaXRlbS5wcm9wcy5iZWNvbWVzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnByb3BzLm1lc3NhZ2UgPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbaW5kZXhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXy5zdGFydENhc2UoXy5yZXBsYWNlKGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lLCAvXFxkKy9nLCAnJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMucHJvcHMpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUgfHwgaXRlbVJlZi5zdGF0ZS5jbGFzc05hbWUuaW5kZXhPZignUE9VUicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIERPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBbJ2l0ZW0nLCAncG91ciddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9LFxuICAgIGdldENhdGNoZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGRlZmF1bHRHYW1lT3B0cy5nZXRDYXRjaGVyUHJvcHMuY2FsbCh0aGlzLCBvcHRzKTtcblxuICAgICAgICBwcm9wcy5vbkNvcnJlY3QgPSBmdW5jdGlvbiAoYnVja2V0UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChidWNrZXRSZWYucHJvcHMubWVzc2FnZSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICduZXh0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9LFxuICAgIGdldEV4dHJhQ29tcG9uZW50cyhvcHRzKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdtaWxrJztcblxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnQ2hvY29sYXRlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnY2hvY29sYXRlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnT3JhbmdlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnRnJ1aXQnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdmcnVpdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmVsdFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMS5jb252ZXlvci5iZWx0YH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5uZXh0fVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezI1MH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnY2hvY29sYXRlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIuY2hvY29sYXRlLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdmcnVpdCd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLmZydWl0Lmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnbWlsayd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdvcmFuZ2UnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5vcmFuZ2UuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH0sXG4gICAgaXRlbXNUb1NvcnQsXG4gICAgZ2V0QXVkaW9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGF1ZGlvQXJyYXk7XG4gICAgfSxcbiAgICBnZXRDYXRjaGFibGVzQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBjYXRjaGFibGVzQXJyYXk7XG4gICAgfSxcbn0sIGRlZmF1bHRHYW1lT3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSXQncyB0aW1lIHRvIGR1YWwhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIER1YWwgc29ydGluZyBpczxici8+XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50IGZvciBhY2N1cmFjeS48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgU2hvdyB3aGF0IHlvdSBrbm93IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0l0c1RpbWVUb0R1YWwnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzInLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDE1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFN1Y2Nlc3MgaXMgdHdpY2UgYXMgbmljZTxici8+XG4gICAgICAgICAgICAgICAgd2hlbiBkdWFsIHNvcnRpbmchPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGtpY2sgaXQgdXAgYSBub3RjaC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdLaWNrSXR1cEFOb3RjaCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBzY29yZVRvV2luOiAyMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZm91ci1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGV5IFN1cGVyIFNvcnRlciE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhpbmdzIGFyZSBhYm91dDxici8+XG4gICAgICAgICAgICAgICAgdG8gZ2V0IGNyYXp5Ljxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBJIGhvcGUgeW91J3JlIHJlYWR5IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hleVN1cGVyU29ydGVyJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cyJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZml2ZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTGV0J3MgdGFrZSB0aGlzPGJyLz5cbiAgICAgICAgICAgICAgICB0byB0aGUgbmV4dCBsZXZlbCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgWW91IGFyZSBhYm91dCB0bzxici8+XG4gICAgICAgICAgICAgICAgYmVjb21lIGE8YnIvPlxuICAgICAgICAgICAgICAgIFByaWNlbGVzcyBQb3VyZXIhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnVGFrZUl0VG90aGVOZXh0TGV2ZWwnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzInLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBzY29yZVRvV2luOiAzMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1vbmUtaW5mbycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3NtYWxsJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU2hhcmluZyBzbmFja3MgaXMganVzdCBhPGJyLz5cbiAgICAgICAgICAgICAgICBraW5kIHRoaW5nIHRvIGRvIGZvciBvdGhlcnMuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIElkZW50aWZ5IHRob3NlIGl0ZW1zIHRoYXQ8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSByZWFkeSB0byBlYXQtbm90IHdhc3RlPGJyLz5cbiAgICAgICAgICAgICAgICBhcyBGb29kIFNoYXJlIGl0ZW1zLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1NoYXJuaW5nU25hY2tzJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgdGltZW91dDogMTIwMDAwLFxuICAgICAgICBzY29yZVRvV2luOiAxMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjInO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5pbXBvcnQgSXRlbXNTaGFyZSBmcm9tICcuL2l0ZW1zX2Zvb2Rfc2hhcmUnO1xuXG5jb25zdCBQSUNLVVAgPSAnUElDS1VQJztcbmNvbnN0IERST1BQRUQgPSAnRFJPUFBFRCc7XG5jb25zdCBUSUxUID0gJ1RJTFQnO1xuY29uc3QgSVRFTVMgPSAnaXRlbXMtJztcblxuY29uc3QgVFJVQ0tfU1JDID0gQ01XTi5NRURJQS5TUFJJVEUgKyAnZHVtcHRydWNrLnBuZyc7XG5jb25zdCBCRUxUX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2xldmVsLjMuY29udmV5b3IuYmVsdCc7XG5jb25zdCBDTEFXX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2xldmVsM3JvYm90YXJtJztcbmNvbnN0IEZVTk5FTF9TUkMgPSBDTVdOLk1FRElBLlNQUklURSArICdmcm9udC5iYWNrLmZ1bm5lbCc7XG5cbmNvbnN0IGJpbk5hbWVzID0gW1xuICAgICdmb29kLXNoYXJlJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG4gICAgJ2xpcXVpZHMnLFxuXTtcblxuY29uc3Qgb25UcnVja1RyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAob3B0cywgZSkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTY3JlZW5EYXRhJywge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgZHJvcDogXy5pbmNsdWRlcyhlLnRhcmdldC5jbGFzc05hbWUsIFRJTFQpLFxuICAgICAgICAgICAgICAgIGRyb3BDbGFzczogXy50b1VwcGVyKF8uc25ha2VDYXNlKG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UpKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnc2VsZWN0YWJsZSc6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5jb25zdCBvbkl0ZW1QaWNrVXBUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGl0ZW1SZWYpIHtcbiAgICBpZiAoXy5pbmNsdWRlcyhpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSwgUElDS1VQKSkge1xuICAgICAgICBpdGVtUmVmLnJlbW92ZUFsbENsYXNzTmFtZXMoKTtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVNjcmVlbkRhdGEnLCB7XG4gICAgICAgICAgICBrZXk6ICd0cnVja0NsYXNzTmFtZScsXG4gICAgICAgICAgICBkYXRhOiAnJyxcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxubGV0IGl0ZW1zVG9Tb3J0ID0gXy5maWx0ZXIoXG4gICAgSXRlbXNUb1NvcnQuY29uY2F0KEl0ZW1zU2hhcmUpLFxuICAgIGl0ZW0gPT4gXy5pbmNsdWRlcyhiaW5OYW1lcywgaXRlbS5iaW4pXG4pO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwiZHJvcFwiIHNpbGVudE9uU3RhcnQ+XG4gICAgICAgIDxza29hc2guQXVkaW8gZGVsYXk9ezI2MDB9IHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GdW5uZWwubXAzYH0gLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1UcnVja0R1bXAubXAzYH0gLz5cbiAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db252ZXlvckJlbHQubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXNvcnRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZXNvcnRXYXJuaW5nLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmV0cnlcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1sZXZlbC1mYWlsLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicGlja1VwXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZsaXAubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwb3VyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGlxdWlkUG91ci5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdmYW50YXN0aWMtZm9vZC1zaGFyZXInLFxuICAgIGdhbWVOdW1iZXI6IDMsXG4gICAgYmluTmFtZXMsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChkYXRhUmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMucHJvcHMubGlzdFtkYXRhUmVmXS5wcm9wcy5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNsYXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnByb3BlcnR5TmFtZSA9PT0gJ3RvcCcgJiYgXy5pbmNsdWRlcyhlLnRhcmdldC5jbGFzc05hbWUsIERST1BQRUQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtUmVmID0gdGhpcy5yZWZzW0lURU1TICsgdGhpcy5maXJzdEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBET01Ob2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RydWNrQ2xhc3NOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFRJTFQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNlbGVjdGFibGVNZXNzYWdlICE9PSAnbGlxdWlkcycpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ3BpY2tVcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbVJlZik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgb25BbmltYXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tVcChfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnN0YXRlLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpcnN0SXRlbUluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5jbGFzc05hbWUgPSBpdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5tZXNzYWdlID0gaXRlbS5wcm9wcy5iZWNvbWVzLmJpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpdGVtc30sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rmlyc3RJdGVtKCkucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbdGhpcy5wcm9wcy5yZWZzVGFyZ2V0LCAncmVmcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoSVRFTVMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5yZXBsYWNlKGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lLCAvXFxkKy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVja0NsYXNzTmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSB8fCBpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZS5pbmRleE9mKCdQT1VSJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogWydpdGVtJywgJ3BvdXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25QaWNrVXA6IGZ1bmN0aW9uIChpdGVtUmVmKSB7XG4gICAgICAgICAgICAgICAgaXRlbVJlZi5yZW1vdmVBbGxDbGFzc05hbWVzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLkRPTU5vZGUpIGl0ZW1SZWYuRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLkRPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbVBpY2tVcFRyYW5zaXRpb25FbmQuYmluZChudWxsLCBpdGVtUmVmKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShQSUNLVVApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWNrQ2xhc3NOYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDYXRjaGVyUHJvcHMob3B0cykge1xuICAgICAgICB2YXIgcHJvcHMgPSBkZWZhdWx0R2FtZU9wdHMuZ2V0Q2F0Y2hlclByb3BzLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgcHJvcHMub25Db3JyZWN0ID0gZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UgIT09ICdsaXF1aWRzJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXh0cmFzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17VFJVQ0tfU1JDfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xhd1wiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17Q0xBV19TUkN9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5tb3ZlQ2xhd31cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDIwMCwgMjAwLCAyMDAsIDUwMCwgMTAwLCAxMDAwLCAyMDAsIDIwMCwgMjAwLCAyMDAsIDIwMCwgMjAwXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ21vdmVDbGF3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmVsdFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17QkVMVF9TUkN9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezUwMH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5uZXh0fVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2Nob2NvbGF0ZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLmNob2NvbGF0ZS5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnZnJ1aXQnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMy5mcnVpdC5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ21pbGsnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMy5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnb3JhbmdlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjMub3JhbmdlLmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJmdW5uZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtGVU5ORUxfU1JDfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZyb250XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17RlVOTkVMX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygndHJ1Y2snLCBvcHRzLnRydWNrQ2xhc3NOYW1lLCBvcHRzLnNlbGVjdGFibGVNZXNzYWdlKX1cbiAgICAgICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtvblRydWNrVHJhbnNpdGlvbkVuZC5iaW5kKG51bGwsIG9wdHMpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVjay1zdGFuZFwiIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBpdGVtc1RvU29ydCxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGNhdGNoYWJsZXNBcnJheTtcbiAgICB9LFxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFNoYXJlIFNvbWUgTW9yZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgWW91ciBzb3J0aW5nIHNraWxscyBhcmU8YnIvPlxuICAgICAgICAgICAgICAgIGFjdGlvbnMgb2Yga2luZG5lc3MuPGJyLz5cbiAgICAgICAgICAgICAgICBTaGFyZSB0aGUgbG92ZSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTaGFyZVRoZUxvdmUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzMnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBzY29yZVRvV2luOiAxNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFNwZWVkIFNoYXJlITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBHZXQgcmVhZHkgZm9yIGE8YnIvPlxuICAgICAgICAgICAgICAgIHJ1c2ggb2Yga2luZG5lc3MhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnU3BlZWRzaGFyZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMycsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItZm91ci1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGV5IFN1cGVyIFNoYXJlciE8YnIvPlxuICAgICAgICAgICAgICAgIEtpbmRuZXNzIGp1c3Q8YnIvPlxuICAgICAgICAgICAgICAgIHNreXJvY2tldGVkIGluPGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgbHVuY2hyb29tITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBkbyB0aGlzIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hleVN1cGVyU2hhcmVyU2t5cm9ja2V0ZWQnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzMnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUaGUgdGl0bGUgb2Y8YnIvPlxuICAgICAgICAgICAgICAgIEZhbnRhc3RpYyBGb29kLVNoYXJlcjxici8+XG4gICAgICAgICAgICAgICAgaXMgb24gdGhlIGhvcml6b24hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIG1ha2UgdGhpcyBoYXBwZW4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnT25UaGVIb3Jpem9uJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2R5bmFtaWMtZGl2ZXJ0ZXItb25lLWluZm8nLFxuICAgICAgICBjbGFzc05hbWU6ICdleGhhdXN0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIEp1c3QgYmVjYXVzZSBpdCdzIGluIHRoZSBiaW4tPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgZG9lc24ndCBtZWFuIGl0IHNob3VsZCBiZS48YnIvPlxuICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICBEcmFnIGl0ZW1zIHRvIHRoZSB2ZW50PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgdGhhdCBzaG91bGQgbm90IGJlIGluPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgdGhlIGJpbiB0byBiZSByZXNvcnRlZC5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fY29tcG9zdGB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnRHJhZ1RvQmluJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICAgICAgaW1hZ2U6IGAke0NNV04uTUVESUEuSU1BR0V9ZXhoYXVzdC5wbmdgLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBzY29yZVRvV2luOiAxMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IE1hbnVhbERyb3BwZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEnO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Ryb3B6b25lLzAuNCc7XG5pbXBvcnQgRHJhZ2dhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2RyYWdnYWJsZS8wLjQnO1xuXG5jb25zdCBQVFMgPSAncHRzJztcblxubGV0IGdldENoaWxkcmVuID0gdiA9PiB7XG4gICAgaWYgKHYuY2hpbGRyZW4pIHJldHVybiB2LmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9XyR7Xy5yZXBsYWNlKHYuYmluLCAnLScsICcnKX1gfVxuICAgICAgICAgICAgZnJhbWU9e3YuZnJhbWUgfHwgMX1cbiAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5LCBvcHRzID0ge30pIHtcbiAgICBpZiAoTWF0aC5hYnMocHJvcHMuZ2FtZVN0YXRlLmN1cnJlbnRTY3JlZW5JbmRleCAtIHBhcnNlSW50KGtleSwgMTApKSA+IDIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke29wdHMuZ2FtZU51bWJlcn1gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2NyZWVuUHJvcHM7XG4gICAgICAgIGxldCB0aW1lclByb3BzO1xuICAgICAgICBsZXQgZHJvcHBlclByb3BzO1xuICAgICAgICBsZXQgcmV2ZWFsUHJvcHM7XG4gICAgICAgIGxldCBsaWZlUHJvcHM7XG4gICAgICAgIGxldCBkcmFnZ2FibGVQcm9wcztcbiAgICAgICAgbGV0IGRyb3B6b25lUHJvcHM7XG5cbiAgICAgICAgbGV0IGJpbkNvbXBvbmVudHM7XG5cbiAgICAgICAgY29uc3QgTEVWRUxfUEFUSCA9IGBnYW1lU3RhdGUuZGF0YS4ke18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpfS5sZXZlbHMuJHtvcHRzLmxldmVsfWA7XG5cbiAgICAgICAgbGV0IHN0YXJ0ID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LnN0YXJ0YCwgZmFsc2UpO1xuICAgICAgICBsZXQgZ2FtZUNvbXBsZXRlID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmNvbXBsZXRlYCwgZmFsc2UpO1xuICAgICAgICBsZXQgZHJvcHBlZCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5kcmFnZ2FibGUuZHJvcHBlZCcpO1xuICAgICAgICBsZXQgZHJhZ2dpbmcgPSBfLmdldChwcm9wcywgJ2RhdGEuZHJhZ2dhYmxlLmRyYWdnaW5nJyk7XG4gICAgICAgIGxldCBpdGVtTmFtZSA9IF8uc3RhcnRDYXNlKFxuICAgICAgICAgICAgXy5yZXBsYWNlKF8uZ2V0KGRyYWdnaW5nLCAncHJvcHMuY2xhc3NOYW1lJywgJycpLCAvXFxkKy9nLCAnJylcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGJpbk5hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuYmluTmFtZScsICcnKTtcbiAgICAgICAgbGV0IHJldmVhbE9wZW4gPSBfLmdldChwcm9wcywgJ2RhdGEucmV2ZWFsLm9wZW4nLCBmYWxzZSk7XG4gICAgICAgIGxldCByZXZlYWxDbG9zZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwuY2xvc2UnLCBmYWxzZSk7XG4gICAgICAgIGxldCBjYXJvdXNlbE5leHQgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIubmV4dCcsIGZhbHNlKTtcbiAgICAgICAgbGV0IHBsYXkgPSBfLmdldChwcm9wcywgJ2RhdGEucGxheScsIG51bGwpO1xuXG4gICAgICAgIGxldCBhbnN3ZXJzID0gXy5maWx0ZXIob3B0cy5iaW5OYW1lcywgbmFtZSA9PiBuYW1lICE9PSBiaW5OYW1lKTtcblxuICAgICAgICBsZXQgYXVkaW9BcnJheSA9IG9wdHMuZ2V0QXVkaW9BcnJheSgpO1xuXG4gICAgICAgIG9wdHMuc2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaWdoU2NvcmUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uaGlnaFNjb3JlYCwgMCk7XG4gICAgICAgIG9wdHMuaGl0cyA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaXRzYCwgMCk7XG4gICAgICAgIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UgPSBfLmdldChwcm9wcywgJ2RhdGEuc2VsZWN0YWJsZS5tZXNzYWdlJywgJycpO1xuICAgICAgICBvcHRzLnBsYXlBdWRpbyA9IChcbiAgICAgICAgICAgIHBsYXkgPyBwbGF5IDpcbiAgICAgICAgICAgIHJldmVhbE9wZW4gPT09ICdyZXNvcnQnID8gJ3Jlc29ydCcgOlxuICAgICAgICAgICAgcmV2ZWFsT3BlbiA9PT0gJ3JldHJ5JyA/ICdyZXRyeScgOlxuICAgICAgICAgICAgXy5rZWJhYkNhc2UoaXRlbU5hbWUpIDogbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNjcmVlblByb3BzID0gb3B0cy5nZXRTY3JlZW5Qcm9wcyhvcHRzKTtcbiAgICAgICAgdGltZXJQcm9wcyA9IG9wdHMuZ2V0VGltZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJvcHBlclByb3BzID0gb3B0cy5nZXREcm9wcGVyUHJvcHMob3B0cyk7XG4gICAgICAgIHJldmVhbFByb3BzID0gb3B0cy5nZXRSZXZlYWxQcm9wcyhvcHRzKTtcbiAgICAgICAgbGlmZVByb3BzID0gb3B0cy5nZXRMaWZlUHJvcHMob3B0cyk7XG4gICAgICAgIGRyYWdnYWJsZVByb3BzID0gb3B0cy5nZXREcmFnZ2FibGVQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJvcHpvbmVQcm9wcyA9IG9wdHMuZ2V0RHJvcHpvbmVQcm9wcyhvcHRzKTtcblxuICAgICAgICBiaW5Db21wb25lbnRzID0gXy5tYXAob3B0cy5iaW5JdGVtcywgYmluID0+ICh7XG4gICAgICAgICAgICB0eXBlOiBDYXJvdXNlbCxcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBiaW4ubmFtZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBiaW4ubmFtZSxcbiAgICAgICAgICAgICAgICBzaG93TnVtOiAyMCxcbiAgICAgICAgICAgICAgICBuZXh0T25TdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYmluOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHNrb2FzaC5SYW5kb21pemVyLFxuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmluOiBfLm1hcChiaW4ub2JqZWN0cywgdiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IERyYWdnYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczogXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdi5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB2LmJpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVjb21lczogdi5iZWNvbWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogZ2V0Q2hpbGRyZW4odiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZHJhZ2dhYmxlUHJvcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBpZD17YCR7b3B0cy5nYW1lTmFtZX0tJHtvcHRzLmxldmVsfWB9XG4gICAgICAgICAgICAgICAgY29tcGxldGU9e2dhbWVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXshZ2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7b3B0cy5nYW1lTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgey4uLnNjcmVlblByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRvcC1sZWZ0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxldmVsLXNjb3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e29wdHMuc2NvcmV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge1BUU31cbiAgICAgICAgICAgICAgICAgICAgPC9za29hc2guU2NvcmU+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guVGltZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWw6IF8uZ2V0KHByb3BzLCAnZGF0YS50aW1lci5maW5hbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50RG93blxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0PVwibW06c3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dD17b3B0cy50aW1lb3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e2dhbWVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlPXtyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdW1lPXshcmV2ZWFsT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RhcnQ9e3N0YXJ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRpbWVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIml0ZW0tbmFtZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiaW4tbmFtZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtiaW5OYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlmZVwiXG4gICAgICAgICAgICAgICAgICAgIG1heD17MH1cbiAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0PXtvcHRzLm1heEhpdHN9XG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q9e29wdHMuaGl0c31cbiAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5saWZlUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8RHJvcHpvbmVcbiAgICAgICAgICAgICAgICAgICAgZHJvcHBlZD17ZHJvcHBlZH1cbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dpbmc9e2RyYWdnaW5nfVxuICAgICAgICAgICAgICAgICAgICB7Li4uZHJvcHpvbmVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgaW5jb3JyZWN0T25PdXRPZkJvdW5kcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lcz17Wzxza29hc2guQ29tcG9uZW50IGFuc3dlcnM9e2Fuc3dlcnN9IC8+XX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxNYW51YWxEcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbnNcIlxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ9e29wdHMuZHJvcHBlckFtb3VudH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dD17Y2Fyb3VzZWxOZXh0fVxuICAgICAgICAgICAgICAgICAgICBiaW49ezxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW49e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgIC8+fVxuICAgICAgICAgICAgICAgICAgICB7Li4uZHJvcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5SZXZlYWxcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgICAgIG9wZW5SZXZlYWw9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUmV2ZWFsPXtyZXZlYWxDbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLnJldmVhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJlc29ydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZXRyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJjb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYUNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcGxheT17b3B0cy5wbGF5QXVkaW99XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXthdWRpb0FycmF5fVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tSZWFkeT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuXG5pbXBvcnQgU2VsZWN0YWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMSc7XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2VsZWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTtcblxuICAgICAgICBpZiAobmV4dFByb3BzLnNlbGVjdGVkICYmIG5leHRQcm9wcy5zZWxlY3RlZCAhPT0gdGhpcy5wcm9wcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMubmV4dCAmJiBuZXh0UHJvcHMubmV4dCAhPT0gdGhpcy5wcm9wcy5uZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBzdXBlci5zdGFydCgpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5uZXh0T25TdGFydCkgdGhpcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5zdGF0ZS5saXN0O1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMucmVmcy5iaW4uZ2V0KDEpWzBdO1xuICAgICAgICBsaXN0ID0gbGlzdC5jb25jYXQoXG4gICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAgey4uLntcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEta2V5Jzogc2hvcnRpZC5nZW5lcmF0ZSgpXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgY2xhc3Nlc1swXSA9ICcnO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLnByb3BzLmVuYWJsZWQ7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgbGlzdCxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlc1swXSA9ICdMRUFWRSc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLnByb3BzLnBhdXNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICB2YXIgbGlzdDtcbiAgICAgICAgLy8gc2tvYXNoLkNvbXBvbmVudCBpcyBub3QgdGhlIHN1cGVyIGhlcmUsIGJ1dCB0aGlzIGlzIHdoYXQgd2Ugd2FudFxuICAgICAgICBza29hc2guQ29tcG9uZW50LnByb3RvdHlwZS5ib290c3RyYXAuY2FsbCh0aGlzKTtcblxuICAgICAgICBsaXN0ID0gdGhpcy5yZWZzLmJpbiA/IHRoaXMucmVmcy5iaW4uZ2V0KHRoaXMucHJvcHMuc2hvd051bSArIDEpIDogdGhpcy5wcm9wcy5saXN0O1xuXG4gICAgICAgIF8uZWFjaChsaXN0LCBpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGl0ZW0udHlwZVxuICAgICAgICAgICAgICAgICAgICB7Li4uaXRlbS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgey4uLntcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWtleSc6IHNob3J0aWQuZ2VuZXJhdGUoKVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxpc3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0SGVscGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGFUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiB0aGlzLnByb3BzLmRhdGFUYXJnZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMuc3RhdGUubGlzdFt0aGlzLnByb3BzLnRhcmdldEluZGV4XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdC5jYWxsKHRoaXMsIHRoaXMuc3RhdGUubGlzdFt0aGlzLnByb3BzLnRhcmdldEluZGV4XSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2Nhcm91c2VsJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHNob3J0aWQgaXMgaW50ZW50aW9uYWxseSBub3QgdXNlZCBmb3Iga2V5IGhlcmUgYmVjYXVzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZVxuICAgICAqIHRoYXQgdGhlIGVsZW1lbnQgaXMgdHJhbnNpdGlvbmVkIGFuZCBub3QgcmVwbGFjZWQuXG4gICAgICovXG4gICAgcmVuZGVyTGlzdCgpIHtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnN0YXRlLmxpc3QgfHwgdGhpcy5wcm9wcy5saXN0O1xuICAgICAgICByZXR1cm4gbGlzdC5tYXAoKGxpLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICB2YXIgb25UcmFuc2l0aW9uRW5kO1xuICAgICAgICAgICAgcmVmID0gbGkucmVmIHx8IGxpLnByb3BzWydkYXRhLXJlZiddIHx8IGtleTtcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZCA9IGtleSA9PT0gMCA/IHRoaXMubmV4dCA6IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGtleSwgbGkpfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e2xpLnByb3BzLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEta2V5PXtzaG9ydGlkKGtleSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIG9uQ2xpY2sgPSB0aGlzLnByb3BzLmNsaWNrYWJsZSA/IHRoaXMuc3RhdGUuc2VsZWN0RnVuY3Rpb24uYmluZCh0aGlzKSA6IG51bGw7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJpbigpfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gb25DbGljaz17b25DbGlja30+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ2Fyb3VzZWwuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgc2hvd051bTogMyxcbiAgICB0YXJnZXRJbmRleDogMSxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIG5leHRPblN0YXJ0OiB0cnVlLFxuICAgIHBhdXNlOiA1MDAsXG4gICAgY2xpY2thYmxlOiBmYWxzZSxcbiAgICBvblNlbGVjdDogXy5ub29wLFxufSwgU2VsZWN0YWJsZS5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMS5qcyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgZW5jb2RlID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbnZhciBkZWNvZGUgPSByZXF1aXJlKCcuL2RlY29kZScpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNDU5NzA3NjA2NTE4O1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDY7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIFJFRFVDRV9USU1FKSAqIDAuMDAxKTtcblxuICAgIGlmIChzZWNvbmRzID09PSBwcmV2aW91c1NlY29uZHMpIHtcbiAgICAgICAgY291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBwcmV2aW91c1NlY29uZHMgPSBzZWNvbmRzO1xuICAgIH1cblxuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIHZlcnNpb24pO1xuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIGNsdXN0ZXJXb3JrZXJJZCk7XG4gICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIGNvdW50ZXIpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIgKyBlbmNvZGUoYWxwaGFiZXQubG9va3VwLCBzZWNvbmRzKTtcblxuICAgIHJldHVybiBzdHI7XG59XG5cblxuLyoqXG4gKiBTZXQgdGhlIHNlZWQuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQgaWYgeW91IGRvbid0IHdhbnQgcGVvcGxlIHRvIHRyeSB0byBmaWd1cmUgb3V0IHlvdXIgaWQgc2NoZW1hLlxuICogZXhwb3NlZCBhcyBzaG9ydGlkLnNlZWQoaW50KVxuICogQHBhcmFtIHNlZWQgSW50ZWdlciB2YWx1ZSB0byBzZWVkIHRoZSByYW5kb20gYWxwaGFiZXQuICBBTFdBWVMgVVNFIFRIRSBTQU1FIFNFRUQgb3IgeW91IG1pZ2h0IGdldCBvdmVybGFwcy5cbiAqL1xuZnVuY3Rpb24gc2VlZChzZWVkVmFsdWUpIHtcbiAgICBhbHBoYWJldC5zZWVkKHNlZWRWYWx1ZSk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY2x1c3RlciB3b3JrZXIgb3IgbWFjaGluZSBpZFxuICogZXhwb3NlZCBhcyBzaG9ydGlkLndvcmtlcihpbnQpXG4gKiBAcGFyYW0gd29ya2VySWQgd29ya2VyIG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlci4gIE51bWJlciBsZXNzIHRoYW4gMTYgaXMgcmVjb21tZW5kZWQuXG4gKiByZXR1cm5zIHNob3J0aWQgbW9kdWxlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICovXG5mdW5jdGlvbiB3b3JrZXIod29ya2VySWQpIHtcbiAgICBjbHVzdGVyV29ya2VySWQgPSB3b3JrZXJJZDtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICpcbiAqIHNldHMgbmV3IGNoYXJhY3RlcnMgdG8gdXNlIGluIHRoZSBhbHBoYWJldFxuICogcmV0dXJucyB0aGUgc2h1ZmZsZWQgYWxwaGFiZXRcbiAqL1xuZnVuY3Rpb24gY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKSB7XG4gICAgaWYgKG5ld0NoYXJhY3RlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhbHBoYWJldC5jaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhbHBoYWJldC5zaHVmZmxlZCgpO1xufVxuXG5cbi8vIEV4cG9ydCBhbGwgb3RoZXIgZnVuY3Rpb25zIGFzIHByb3BlcnRpZXMgb2YgdGhlIGdlbmVyYXRlIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnNlZWQgPSBzZWVkO1xubW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xubW9kdWxlLmV4cG9ydHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG5tb2R1bGUuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkID0gaXNWYWxpZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvYWxwaGFiZXQuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gRm91bmQgdGhpcyBzZWVkLWJhc2VkIHJhbmRvbSBnZW5lcmF0b3Igc29tZXdoZXJlXG4vLyBCYXNlZCBvbiBUaGUgQ2VudHJhbCBSYW5kb21pemVyIDEuMyAoQykgMTk5NyBieSBQYXVsIEhvdWxlIChob3VsZUBtc2MuY29ybmVsbC5lZHUpXG5cbnZhciBzZWVkID0gMTtcblxuLyoqXG4gKiByZXR1cm4gYSByYW5kb20gbnVtYmVyIGJhc2VkIG9uIGEgc2VlZFxuICogQHBhcmFtIHNlZWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldE5leHRWYWx1ZSgpIHtcbiAgICBzZWVkID0gKHNlZWQgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwO1xuICAgIHJldHVybiBzZWVkLygyMzMyODAuMCk7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoX3NlZWRfKSB7XG4gICAgc2VlZCA9IF9zZWVkXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmV4dFZhbHVlOiBnZXROZXh0VmFsdWUsXG4gICAgc2VlZDogc2V0U2VlZFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUJ5dGUgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tYnl0ZScpO1xuXG5mdW5jdGlvbiBlbmNvZGUobG9va3VwLCBudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGxvb2t1cCggKCAobnVtYmVyID4+ICg0ICogbG9vcENvdW50ZXIpKSAmIDB4MGYgKSB8IHJhbmRvbUJ5dGUoKSApO1xuICAgICAgICBkb25lID0gbnVtYmVyIDwgKE1hdGgucG93KDE2LCBsb29wQ291bnRlciArIDEgKSApO1xuICAgICAgICBsb29wQ291bnRlcisrO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG5mdW5jdGlvbiByYW5kb21CeXRlKCkge1xuICAgIGlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpICYgMHgzMDtcbiAgICB9XG4gICAgdmFyIGRlc3QgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGRlc3QpO1xuICAgIHJldHVybiBkZXN0WzBdICYgMHgzMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG4vKipcbiAqIERlY29kZSB0aGUgaWQgdG8gZ2V0IHRoZSB2ZXJzaW9uIGFuZCB3b3JrZXJcbiAqIE1haW5seSBmb3IgZGVidWdnaW5nIGFuZCB0ZXN0aW5nLlxuICogQHBhcmFtIGlkIC0gdGhlIHNob3J0aWQtZ2VuZXJhdGVkIGlkLlxuICovXG5mdW5jdGlvbiBkZWNvZGUoaWQpIHtcbiAgICB2YXIgY2hhcmFjdGVycyA9IGFscGhhYmV0LnNodWZmbGVkKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmVyc2lvbjogY2hhcmFjdGVycy5pbmRleE9mKGlkLnN1YnN0cigwLCAxKSkgJiAweDBmLFxuICAgICAgICB3b3JrZXI6IGNoYXJhY3RlcnMuaW5kZXhPZihpZC5zdWJzdHIoMSwgMSkpICYgMHgwZlxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuZnVuY3Rpb24gaXNTaG9ydElkKGlkKSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8IGlkLmxlbmd0aCA8IDYgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcmFjdGVycyA9IGFscGhhYmV0LmNoYXJhY3RlcnMoKTtcbiAgICB2YXIgbGVuID0gaWQubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47aSsrKSB7XG4gICAgICAgIGlmIChjaGFyYWN0ZXJzLmluZGV4T2YoaWRbaV0pID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hvcnRJZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vc2hvcnRpZC9saWIvaXMtdmFsaWQuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEFzIG9mIHNrb2FzaCAxLjEuMCB0aGlzIGNvbXBvbmVudCBjYW4gYmUgZm91bmQgYXQgc2tvYXNoLlNlbGVjdGFibGVcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmNvbnNvbGUud2FybignQXMgb2Ygc2tvYXNoIDEuMS4wIHRoaXMgY29tcG9uZW50IGNhbiBiZSBmb3VuZCBhdCBza29hc2guU2VsZWN0YWJsZScpO1xuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBTZWxlY3RhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjbGFzc2VzOiB7fSxcbiAgICAgICAgICAgIHNlbGVjdEZ1bmN0aW9uOiB0aGlzLnNlbGVjdCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdmFyIHNlbGVjdENsYXNzO1xuICAgICAgICB2YXIgc2VsZWN0RnVuY3Rpb247XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgc2VsZWN0Q2xhc3MgPSB0aGlzLnByb3BzLnNlbGVjdENsYXNzIHx8IHRoaXMuc3RhdGUuc2VsZWN0Q2xhc3MgfHwgJ1NFTEVDVEVEJztcbiAgICAgICAgc2VsZWN0RnVuY3Rpb24gPSBzZWxlY3RDbGFzcyA9PT0gJ0hJR0hMSUdIVEVEJyA/IHRoaXMuaGlnaGxpZ2h0IDogdGhpcy5zZWxlY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0T25TdGFydCkge1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLnByb3BzLnNlbGVjdE9uU3RhcnRdID0gc2VsZWN0Q2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IHRydWUsXG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgc2VsZWN0RnVuY3Rpb24sXG4gICAgICAgICAgICBzZWxlY3RDbGFzcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYm9vdHN0cmFwKCkge1xuICAgICAgICBzdXBlci5ib290c3RyYXAoKTtcblxuICAgICAgICBpZiAodGhpcy5yZWZzLmJpbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgbGlzdDogdGhpcy5yZWZzLmJpbi5nZXRBbGwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcykge1xuICAgICAgICB2YXIgcmVmO1xuICAgICAgICB2YXIgZGF0YVJlZjtcbiAgICAgICAgdmFyIHRhcmdldDtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICB2YXIgaXNDb3JyZWN0O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YVJlZiA9IGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdMSScpO1xuXG4gICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBkYXRhUmVmID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZiA9IHNlbGYucmVmc1tkYXRhUmVmXTtcblxuICAgICAgICBpc0NvcnJlY3QgPSAocmVmICYmIHJlZi5wcm9wcyAmJiByZWYucHJvcHMuY29ycmVjdCkgfHxcbiAgICAgICAgICAgICghc2VsZi5wcm9wcy5hbnN3ZXJzIHx8ICFzZWxmLnByb3BzLmFuc3dlcnMubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgc2VsZi5wcm9wcy5hbnN3ZXJzLmluZGV4T2YoZGF0YVJlZikgIT09IC0xKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5hbGxvd0Rlc2VsZWN0ICYmIGNsYXNzZXNbZGF0YVJlZl0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjbGFzc2VzW2RhdGFSZWZdO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ29ycmVjdCkge1xuICAgICAgICAgICAgY2xhc3Nlc1tkYXRhUmVmXSA9IHNlbGYuc3RhdGUuc2VsZWN0Q2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYucHJvcHMuc2VsZWN0UmVzcG9uZC5jYWxsKHNlbGYsIGRhdGFSZWYpO1xuICAgICAgICBzZWxmLnByb3BzLm9uU2VsZWN0LmNhbGwoc2VsZiwgZGF0YVJlZik7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuY2hvb3NlT25lKSBzZWxmLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgaWYgKHNlbGYucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHNlbGYucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogcmVmXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5jb21wbGV0ZUxpc3RPbkNsaWNrKSB7XG4gICAgICAgICAgICBfLmVhY2goc2VsZi5yZWZzLCAociwgaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSBpZCkgXy5pbnZva2UociwgJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyLCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoayA9PT0gZGF0YVJlZikgXy5pbnZva2UociwgJ2NvbXBsZXRlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdChlKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodChlKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5zdGF0ZS5jbGFzc2VzO1xuICAgICAgICB0aGlzLnNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzcyhrZXksIGxpKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKFxuICAgICAgICAgICAgbGkucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2tleV0sXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNbbGkucHJvcHNbJ2RhdGEtcmVmJ11dLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGFzc2VzW2xpLnByb3BzWydkYXRhLWtleSddXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdzZWxlY3RhYmxlJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5zZWxlY3QgJiYgcHJvcHMuc2VsZWN0ICE9PSB0aGlzLnByb3BzLnNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5jYWxsKHRoaXMsIHByb3BzLnNlbGVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5iaW4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0KCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMucHJvcHMubGlzdCB8fCB0aGlzLnN0YXRlLmxpc3QgfHwgW107XG4gICAgICAgIHJldHVybiBfLm1hcChsaXN0LCAobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIGRhdGFSZWYgPSBsaS5wcm9wc1snZGF0YS1yZWYnXSB8fCBrZXk7XG4gICAgICAgICAgICB2YXIgcmVmID0gbGkucmVmIHx8IGxpLnByb3BzLmlkIHx8IGRhdGFSZWY7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGxpLnByb3BzLm1lc3NhZ2UgfHwgJycgKyBrZXk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5saS5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImxpXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzKGtleSwgbGkpfVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtkYXRhUmVmfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9IG9uQ2xpY2s9e3RoaXMuc3RhdGUuc2VsZWN0RnVuY3Rpb24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpc3QoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5TZWxlY3RhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIHNlbGVjdENsYXNzOiAnU0VMRUNURUQnLFxuICAgIGNvbXBsZXRlTGlzdE9uQ2xpY2s6IHRydWUsXG4gICAgc2VsZWN0UmVzcG9uZDogXy5ub29wLFxuICAgIG9uU2VsZWN0OiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBEcm9wem9uZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkcm9wem9uZTtcbiAgICAgICAgdmFyIGRyYWdnYWJsZTtcblxuICAgICAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgICAgIHNlbGYuZHJvcHpvbmVDb3JuZXJzID0gXy5tYXAoc2VsZi5wcm9wcy5kcm9wem9uZXMsICh2YWx1ZSwga2V5KSA9PlxuICAgICAgICAgICAgc2VsZi5nZXRDb3JuZXJzKFJlYWN0RE9NLmZpbmRET01Ob2RlKHNlbGYucmVmc1tgZHJvcHpvbmUtJHtrZXl9YF0pKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChzZWxmLmxvYWREYXRhICYmIHR5cGVvZiBzZWxmLmxvYWREYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgXy5mb3JJbihzZWxmLmxvYWREYXRhLCAocmVmMSwga2V5MSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWYxLnJlZiAmJiByZWYxLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5yZWZzLCAocmVmMiwga2V5MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleTIuaW5kZXhPZignZHJhZ2dhYmxlLScpID09PSAtMSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYucmVmc1trZXkxXSAmJiByZWYyLnByb3BzLm1lc3NhZ2UgPT09IHJlZjEucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUgPSBzZWxmLnJlZnNba2V5MV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlID0gcmVmMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogZHJhZ2dhYmxlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLnNldFN0YXRlKHJlZjEuc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29ycmVjdChkcmFnZ2FibGUsIGtleTEucmVwbGFjZSgnZHJvcHpvbmUtJywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JJbihzZWxmLmxvYWREYXRhLCAocmVmMiwga2V5MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWZzW2tleTJdLnNldFN0YXRlKHtjb250ZW50OiBbXX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYzLCBrZXkzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleTMuaW5kZXhPZignZHJhZ2dhYmxlLScpID09PSAtMSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmluY2x1ZGVzKHJlZjIsIHJlZjMucHJvcHMubWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWZzW2tleTJdLnN0YXRlLmNvbnRlbnQucHVzaChyZWYzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmMy5tYXJrQ29ycmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWREcmFnTkRyb3BEYXRhKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkcm9wem9uZTtcbiAgICAgICAgdmFyIGRyYWdnYWJsZTtcbiAgICAgICAgXy5mb3JJbihzZWxmLmxvYWREYXRhLCAocmVmMSwga2V5MSkgPT4ge1xuICAgICAgICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleTIuaW5kZXhPZignZHJhZ2dhYmxlLScpID09PSAtMSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnJlZnNba2V5MV0gJiYgcmVmMi5wcm9wcy5tZXNzYWdlID09PSByZWYxLnJlZikge1xuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSA9IHNlbGYucmVmc1trZXkxXTtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlID0gcmVmMjtcbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUuc2V0U3RhdGUoe2NvbnRlbnQ6IGRyYWdnYWJsZX0pO1xuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUocmVmMS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29ycmVjdChkcmFnZ2FibGUsIGtleTEucmVwbGFjZSgnZHJvcHpvbmUtJywgJycpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZE11bHRpQXNud2VyRGF0YSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZHJvcHpvbmU7XG4gICAgICAgIHZhciBkcmFnZ2FibGU7XG4gICAgICAgIF8uZm9ySW4oc2VsZi5sb2FkRGF0YSwgKHJlZjEsIGtleTEpID0+IHtcbiAgICAgICAgICAgIGRyb3B6b25lID0gc2VsZi5yZWZzW2tleTFdO1xuICAgICAgICAgICAgZHJvcHpvbmUuc2V0U3RhdGUoe2NvbnRlbnQ6IFtdfSk7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjIsIGtleTIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Mi5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlID0gcmVmMjtcbiAgICAgICAgICAgICAgICBpZiAoXy5pbmNsdWRlcyhyZWYxLCBkcmFnZ2FibGUucHJvcHMubWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUuc3RhdGUuY29udGVudC5wdXNoKGRyYWdnYWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZS5tYXJrQ29ycmVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRDb3JuZXJzKGVsKSB7XG4gICAgICAgIHZhciBvZmZzZXQ7XG4gICAgICAgIHZhciBjb3JuZXJzID0gW107XG5cbiAgICAgICAgb2Zmc2V0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGNvcm5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgeDogb2Zmc2V0LmxlZnQgKyBvZmZzZXQud2lkdGggKiAoaSA9PT0gMSB8fCBpID09PSAyID8gMSA6IDApLFxuICAgICAgICAgICAgICAgIHk6IG9mZnNldC50b3AgKyBvZmZzZXQuaGVpZ2h0ICogKGkgPiAxID8gMSA6IDApLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ybmVycztcbiAgICB9XG5cbiAgICBvbkRyb3AoZHJvcHBlZCkge1xuICAgICAgICB2YXIgZHJvcHBlZERPTTtcbiAgICAgICAgdmFyIGNvcm5lcnM7XG4gICAgICAgIHZhciBkcm9wem9uZVJlZjtcblxuICAgICAgICBkcm9wcGVkRE9NID0gZHJvcHBlZC5ET01Ob2RlIHx8IFJlYWN0RE9NLmZpbmRET01Ob2RlKGRyb3BwZWQpO1xuICAgICAgICBjb3JuZXJzID0gdGhpcy5nZXRDb3JuZXJzKGRyb3BwZWRET00pO1xuXG4gICAgICAgIGRyb3B6b25lUmVmID0gXy5yZWR1Y2UodGhpcy5wcm9wcy5kcm9wem9uZXMsIChhLCB2LCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2tvYXNoLnV0aWwuZG9JbnRlcnNlY3QoY29ybmVycywgdGhpcy5kcm9wem9uZUNvcm5lcnNba10pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgZHJvcHpvbmUtJHtrfWBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBpZiAoZHJvcHpvbmVSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuaW5Cb3VuZHMoZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vdXRPZkJvdW5kcyhkcm9wcGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvcHMub25Ecm9wLmNhbGwodGhpcywgZHJvcHBlZCk7XG4gICAgfVxuXG4gICAgb25EcmFnKGRyYWdnaW5nKSB7XG4gICAgICAgIF8uZWFjaCh0aGlzLnByb3BzLmRyb3B6b25lcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgIHZhciBkcm9wem9uZVJlZjtcbiAgICAgICAgICAgIHZhciBjb250YWlucztcbiAgICAgICAgICAgIGRyb3B6b25lUmVmID0gdGhpcy5yZWZzW2Bkcm9wem9uZS0ke2tleX1gXTtcbiAgICAgICAgICAgIGNvbnRhaW5zID0gZHJvcHpvbmVSZWYuY29udGFpbnMgfHwgW107XG4gICAgICAgICAgICBpbmRleCA9IGNvbnRhaW5zLmluZGV4T2YoZHJhZ2dpbmcpO1xuICAgICAgICAgICAgaWYgKH5pbmRleCkgY29udGFpbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGRyb3B6b25lUmVmLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25EcmFnLmNhbGwodGhpcywgZHJhZ2dpbmcpO1xuICAgIH1cblxuICAgIGluQm91bmRzKGRyb3BwZWQsIGRyb3B6b25lUmVmKSB7XG4gICAgICAgIGlmICghZHJvcHpvbmVSZWYucHJvcHMuYW5zd2VycyB8fCBkcm9wem9uZVJlZi5wcm9wcy5hbnN3ZXJzLmluZGV4T2YoZHJvcHBlZC5wcm9wcy5tZXNzYWdlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY29ycmVjdChkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdChkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvdXRPZkJvdW5kcyhkcm9wcGVkKSB7XG4gICAgICAgIC8vIHJlc3BvbmQgdG8gYW4gb3V0IG9mIGJvdW5kcyBkcm9wXG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdvdXQnKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5jb3JyZWN0T25PdXRPZkJvdW5kcykgdGhpcy5pbmNvcnJlY3QoZHJvcHBlZCk7XG4gICAgfVxuXG4gICAgY29ycmVjdChkcm9wcGVkLCBkcm9wem9uZVJlZikge1xuICAgICAgICAvLyByZXNwb25kIHRvIGNvcnJlY3QgZHJvcFxuICAgICAgICBkcm9wcGVkLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdjb3JyZWN0Jyk7XG5cbiAgICAgICAgZHJvcHpvbmVSZWYuY29udGFpbnMgPSAoZHJvcHpvbmVSZWYuY29udGFpbnMgfHwgW10pLmNvbmNhdChkcm9wcGVkKTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uQ29ycmVjdC5jYWxsKHRoaXMsIGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICB9XG5cbiAgICBpbmNvcnJlY3QoZHJvcHBlZCwgZHJvcHpvbmVSZWYpIHtcbiAgICAgICAgLy8gcmVzcG9uZCB0byBpbmNvcnJlY3QgZHJvcFxuICAgICAgICBkcm9wcGVkLm1hcmtJbmNvcnJlY3QoKTtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2luY29ycmVjdCcpO1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5jb3JyZWN0LmNhbGwodGhpcywgZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLmRyb3BwZWQgJiYgcHJvcHMuZHJvcHBlZCAhPT0gdGhpcy5wcm9wcy5kcm9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uRHJvcChwcm9wcy5kcm9wcGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5kcmFnZ2luZyAmJiBwcm9wcy5kcmFnZ2luZyAhPT0gdGhpcy5wcm9wcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5vbkRyYWcocHJvcHMuZHJhZ2dpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRHJvcHpvbmVzKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5wcm9wcy5kcm9wem9uZXMsIChjb21wb25lbnQsIGtleSkgPT5cbiAgICAgICAgICAgIDxjb21wb25lbnQudHlwZVxuICAgICAgICAgICAgICAgIHsuLi5jb21wb25lbnQucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtgZHJvcHpvbmUtJHtrZXl9YH1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2Ryb3B6b25lcycsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc30gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoJ2Fzc2V0cycpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckRyb3B6b25lcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Ecm9wem9uZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkcm9wem9uZXM6IFs8c2tvYXNoLkNvbXBvbmVudCAvPl0sXG4gICAgb25Db3JyZWN0OiBfLm5vb3AsXG4gICAgb25JbmNvcnJlY3Q6IF8ubm9vcCxcbiAgICBvbkRyYWc6IF8ubm9vcCxcbiAgICBvbkRyb3A6IF8ubm9vcCxcbiAgICBpbmNvcnJlY3RPbk91dE9mQm91bmRzOiB0cnVlLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wem9uZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2Ryb3B6b25lLzAuNC5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGVuZFg6IDAsXG4gICAgICAgICAgICBlbmRZOiAwLFxuICAgICAgICAgICAgem9vbTogMSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1vdXNlRG93biA9IHRoaXMubW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubW91c2VVcCA9IHRoaXMubW91c2VVcC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubW92ZUV2ZW50ID0gdGhpcy5tb3ZlRXZlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnRvdWNoU3RhcnQgPSB0aGlzLnRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50b3VjaEVuZCA9IHRoaXMudG91Y2hFbmQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnNldFpvb20gPSB0aGlzLnNldFpvb20uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzaG91bGREcmFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG91bGREcmFnLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgbWFya0NvcnJlY3QoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29ycmVjdDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFya0luY29ycmVjdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0OiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmV0dXJuT25JbmNvcnJlY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVG9TdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRFdmVudChlLCBjYikge1xuICAgICAgICB2YXIgcmVjdDtcbiAgICAgICAgdmFyIHN0YXJ0WDtcbiAgICAgICAgdmFyIHN0YXJ0WTtcbiAgICAgICAgdmFyIGVuZFg7XG4gICAgICAgIHZhciBlbmRZO1xuICAgICAgICB2YXIgZ3JhYlg7XG4gICAgICAgIHZhciBncmFiWTtcblxuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMuRE9NTm9kZSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkRHJhZygpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHtcbiAgICAgICAgICAgIHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGUgPSBlLnRhcmdldFRvdWNoZXNbMF07XG4gICAgICAgICAgICBlLm9mZnNldFggPSBlLnBhZ2VYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgZS5vZmZzZXRZID0gZS5wYWdlWSAtIHJlY3QudG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JhYlggPSBlLm9mZnNldFggLyB0aGlzLnN0YXRlLnpvb207XG4gICAgICAgIGdyYWJZID0gZS5vZmZzZXRZIC8gdGhpcy5zdGF0ZS56b29tO1xuXG4gICAgICAgIHN0YXJ0WCA9IGVuZFggPSAoZS5wYWdlWCAvIHRoaXMuc3RhdGUuem9vbSAtIGdyYWJYKTtcbiAgICAgICAgc3RhcnRZID0gZW5kWSA9IChlLnBhZ2VZIC8gdGhpcy5zdGF0ZS56b29tIC0gZ3JhYlkpO1xuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yZXR1cm4pIHtcbiAgICAgICAgICAgIHN0YXJ0WCA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWCkgP1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnRYICsgdGhpcy5zdGF0ZS5ncmFiWCAtIGdyYWJYIDpcbiAgICAgICAgICAgICAgICBzdGFydFg7XG4gICAgICAgICAgICBzdGFydFkgPSBfLmlzRmluaXRlKHRoaXMuc3RhdGUuZ3JhYlkpID9cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WSArIHRoaXMuc3RhdGUuZ3JhYlkgLSBncmFiWSA6XG4gICAgICAgICAgICAgICAgc3RhcnRZO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkcmFnZ2luZzogdHJ1ZSxcbiAgICAgICAgICAgIHJldHVybjogZmFsc2UsXG4gICAgICAgICAgICBzdGFydFgsXG4gICAgICAgICAgICBzdGFydFksXG4gICAgICAgICAgICBncmFiWCxcbiAgICAgICAgICAgIGdyYWJZLFxuICAgICAgICAgICAgZW5kWCxcbiAgICAgICAgICAgIGVuZFksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXRlKHtcbiAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZHJhZ2dhYmxlVGFyZ2V0LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGRyYWdnaW5nOiB0aGlzLFxuICAgICAgICAgICAgICAgIGRyb3BwZWQ6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25EcmFnLmNhbGwodGhpcywgdGhpcyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgY2IuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIH1cblxuICAgIGF0dGFjaFRvdWNoRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICB9XG5cbiAgICBtb3VzZURvd24oZSkge1xuICAgICAgICB0aGlzLnN0YXJ0RXZlbnQoZSwgdGhpcy5hdHRhY2hNb3VzZUV2ZW50cyk7XG4gICAgfVxuXG4gICAgdG91Y2hTdGFydChlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaFRvdWNoRXZlbnRzKTtcbiAgICB9XG5cbiAgICBtb3ZlRXZlbnQoZSkge1xuICAgICAgICBlID0gZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSA/IGUudGFyZ2V0VG91Y2hlc1swXSA6IGU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlbmRYOiAoZS5wYWdlWCAvIHRoaXMuc3RhdGUuem9vbSAtIHRoaXMuc3RhdGUuZ3JhYlgpLFxuICAgICAgICAgICAgZW5kWTogKGUucGFnZVkgLyB0aGlzLnN0YXRlLnpvb20gLSB0aGlzLnN0YXRlLmdyYWJZKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5kRXZlbnQoY2IpIHtcbiAgICAgICAgdGhpcy5vbkRyb3AoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZXR1cm4pIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVG9TdGFydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSBjYi5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHNldEVuZChlbmRYLCBlbmRZKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZW5kWCxcbiAgICAgICAgICAgIGVuZFlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuVG9TdGFydCgpIHtcbiAgICAgICAgdmFyIGVuZFg7XG4gICAgICAgIHZhciBlbmRZO1xuICAgICAgICB2YXIgZG9SZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3RheU9uQ29ycmVjdCAmJiB0aGlzLnN0YXRlLmNvcnJlY3QpIHtcbiAgICAgICAgICAgIGVuZFggPSB0aGlzLnN0YXRlLmVuZFg7XG4gICAgICAgICAgICBlbmRZID0gdGhpcy5zdGF0ZS5lbmRZO1xuICAgICAgICAgICAgZG9SZXR1cm4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuZFggPSB0aGlzLnN0YXRlLnN0YXJ0WDtcbiAgICAgICAgICAgIGVuZFkgPSB0aGlzLnN0YXRlLnN0YXJ0WTtcbiAgICAgICAgICAgIGRvUmV0dXJuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcmV0dXJuOiBkb1JldHVybixcbiAgICAgICAgICAgIGVuZFgsXG4gICAgICAgICAgICBlbmRZLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIH1cblxuICAgIGRldGFjaFRvdWNoRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICB9XG5cbiAgICBtb3VzZVVwKCkge1xuICAgICAgICB0aGlzLmVuZEV2ZW50KHRoaXMuZGV0YWNoTW91c2VFdmVudHMpO1xuICAgIH1cblxuICAgIHRvdWNoRW5kKCkge1xuICAgICAgICB0aGlzLmVuZEV2ZW50KHRoaXMuZGV0YWNoVG91Y2hFdmVudHMpO1xuICAgIH1cblxuICAgIG9uRHJvcCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kcmFnZ2FibGVUYXJnZXQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgZHJvcHBlZDogdGhpc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyb3AuY2FsbCh0aGlzLCB0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgICAgIHRoaXMuc2V0Wm9vbSgpO1xuXG4gICAgICAgIHRoaXMuRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgICAgIHRoaXMuRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXRab29tKTtcbiAgICB9XG5cbiAgICBzZXRab29tKCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHpvb206IHN0YXRlLnNjYWxlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFN0eWxlKCkge1xuICAgICAgICBsZXQgeCA9IHRoaXMuc3RhdGUuZW5kWCAtIHRoaXMuc3RhdGUuc3RhcnRYIHx8IDA7XG4gICAgICAgIGxldCB5ID0gdGhpcy5zdGF0ZS5lbmRZIC0gdGhpcy5zdGF0ZS5zdGFydFkgfHwgMDtcbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5zdGF0ZS5zY2FsZSB8fCAxO1xuICAgICAgICBsZXQgcm90YXRlID0gdGhpcy5zdGF0ZS5yb3RhdGUgfHwgMDtcbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eH1weCkgdHJhbnNsYXRlWSgke3l9cHgpIHNjYWxlKCR7c2NhbGV9KSByb3RhdGUoJHtyb3RhdGV9ZGVnKWA7XG5cbiAgICAgICAgcmV0dXJuIF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgdHJhbnNmb3JtLFxuICAgICAgICAgICAgV2Via2l0VHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgIH0sIHRoaXMuc3RhdGUuc3R5bGUsIHRoaXMucHJvcHMuc3R5bGUpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKHtcbiAgICAgICAgICAgIERSQUdHSU5HOiB0aGlzLnN0YXRlLmRyYWdnaW5nLFxuICAgICAgICAgICAgUkVUVVJOOiB0aGlzLnN0YXRlLnJldHVybixcbiAgICAgICAgICAgIENPUlJFQ1Q6IHRoaXMuc3RhdGUuY29ycmVjdCxcbiAgICAgICAgfSwgJ2RyYWdnYWJsZScsIHRoaXMuc3RhdGUuY2xhc3Nlcywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e3RoaXMucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRyYWdnYWJsZS5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBkcmFnZ2FibGVUYXJnZXQ6ICdkcmFnZ2FibGUnLFxuICAgIHNob3VsZERyYWc6ICgpID0+IHRydWUsXG4gICAgcmV0dXJuOiBmYWxzZSxcbiAgICByZXR1cm5PbkluY29ycmVjdDogZmFsc2UsXG4gICAgc3RheU9uQ29ycmVjdDogdHJ1ZSxcbiAgICBvbkRyb3A6IF8ubm9vcCxcbiAgICBvbkRyYWc6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgRHJhZ2dhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuNC5qcyIsImltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5cbmltcG9ydCBpdGVtc0NvbXBvc3QgZnJvbSAnLi9pdGVtc19jb21wb3N0JztcbmltcG9ydCBpdGVtc0xhbmRmaWxsIGZyb20gJy4vaXRlbXNfbGFuZGZpbGwnO1xuaW1wb3J0IGl0ZW1zUmVjeWNsZSBmcm9tICcuL2l0ZW1zX3JlY3ljbGUnO1xuXG5sZXQgc2h1ZmZsZWRJdGVtc0NvbXBvc3QgPSBfLnNodWZmbGUoaXRlbXNDb21wb3N0KTtcbmxldCBzaHVmZmxlZEl0ZW1zTGFuZGZpbGwgPSBfLnNodWZmbGUoaXRlbXNMYW5kZmlsbCk7XG5sZXQgc2h1ZmZsZWRJdGVtc1JlY3ljbGUgPSBfLnNodWZmbGUoaXRlbXNSZWN5Y2xlKTtcblxubGV0IGl0ZW1zVG9Tb3J0ID0gW10uY29uY2F0KGl0ZW1zQ29tcG9zdCkuY29uY2F0KGl0ZW1zTGFuZGZpbGwpLmNvbmNhdChpdGVtc1JlY3ljbGUpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXRyeVwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfWxldmVsLWZhaWwubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0aW1lclwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVNlY29uZFRpbWVyLm1wM2B9IC8+LFxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGdhbWVOYW1lOiAnZHluYW1pYy1kaXZlcnRlcicsXG4gICAgZ2FtZU51bWJlcjogNCxcbiAgICBwb2ludHNQZXJCaW46IDQwMCxcbiAgICBzY29yZVRvV2luOiAxMjAwLFxuICAgIGRyb3BwZXJBbW91bnQ6IDIsXG4gICAgZ2V0RHJvcHBlclByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdiaW5OYW1lJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUuaXRlbXNbdGhpcy5maXJzdEl0ZW1JbmRleF0ucHJvcHMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcmFnZ2FibGVQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogXy5yYW5kb20oMzAsIDcwKSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IF8ucmFuZG9tKDMwLCA3MCkgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiBfLnJhbmRvbSgxLCAxLjUpLFxuICAgICAgICAgICAgICAgICAgICByb3RhdGU6IF8ucmFuZG9tKC0zMCwgMzApLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3B6b25lUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db3JyZWN0OiBmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbTtcblxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZS5tYXJrQ29ycmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKHNjb3JlICUgb3B0cy5wb2ludHNQZXJCaW4pID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ25leHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY29ycmVjdDogZnVuY3Rpb24gKGRyYWdnYWJsZSwgZHJvcHpvbmVBcnJheSkge1xuICAgICAgICAgICAgICAgIGlmICghZHJvcHpvbmVBcnJheSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZW5kWDogZHJhZ2dhYmxlLnN0YXRlLmVuZFggKyAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGVuZFk6IGRyYWdnYWJsZS5zdGF0ZS5lbmRZICsgMjAwLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmVhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRzOiBvcHRzLmhpdHMgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IG9wdHMuc2NvcmUgLSBvcHRzLnBvaW50c1Blck1pc3MsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3NldHM6IFtcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db3JyZWN0U2VsZWN0Lm1wM2B9IC8+LFxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiaW5jb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9V3JvbmdTZWxlY3QubXAzYH0gLz4sXG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJkcmFnXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9RHJhZy5tcDNgfSAvPixcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyb3BcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1WYWN1dW0ubXAzYH0gLz4sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb25EcmFnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2RyYWcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlNZWRpYSgnZHJvcCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgYmluSXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3JlY3ljbGUnLFxuICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNDb21wb3N0LnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNMYW5kZmlsbC5zcGxpY2UoMCwgMikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zUmVjeWNsZS5zcGxpY2UoMCwgNikpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnbGFuZGZpbGwnLFxuICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNDb21wb3N0LnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNMYW5kZmlsbC5zcGxpY2UoMCwgNikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zUmVjeWNsZS5zcGxpY2UoMCwgMikpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY29tcG9zdCcsXG4gICAgICAgICAgICBvYmplY3RzOiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0NvbXBvc3Quc3BsaWNlKDAsIDYpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0xhbmRmaWxsLnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNSZWN5Y2xlLnNwbGljZSgwLCAyKSksXG4gICAgICAgIH0sXG4gICAgXVxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2R5bmFtaWMtZGl2ZXJ0ZXItdHdvLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTZW5kIG1pc3BsYWNlZCBpdGVtczxici8+XG4gICAgICAgICAgICAgICAgYmFjayB0byBiZSBzb3J0ZWQhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEhlbHAgb3RoZXJzIGJ5IGlkZW50aWZ5aW5nPGJyLz5cbiAgICAgICAgICAgICAgICBpdGVtcyBpbiB0aGUgd3JvbmcgYmluLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ01pc3BsYWNlZEl0ZW1zJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3R3b19pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2F5IHRvIFNvcnQhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFRoaXMgbmV4dCBsZXZlbCB0YWtlczxici8+XG4gICAgICAgICAgICAgICAgU3VwZXIgU29ydGluZyBTa2lsbHMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnV2F5VG9Tb3J0JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBzY29yZVRvV2luOiAyMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2R5bmFtaWMtZGl2ZXJ0ZXItZm91ci1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSXQncyBnZXR0aW5nIG1lc3N5IGluIGhlcmUhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFRoZXNlIGJpbnMgYXJlIGZ1bGw8YnIvPlxuICAgICAgICAgICAgICAgIG9mIHRoaW5ncyB0aGF0IHNob3VsZG4ndDxici8+XG4gICAgICAgICAgICAgICAgaGF2ZSBsYW5kZWQgaGVyZS48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgTGV0J3MgZ2V0IHNvcnRpbmchXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnR2V0dGluZ01lc3N5JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDI1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdkeW5hbWljLWRpdmVydGVyLWZpdmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFdhc3RlIERpdmVyc2lvbiBpcyB0aGU8YnIvPlxuICAgICAgICAgICAgICAgIG5hbWUgb2YgdGhlIGdhbWUuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFRoZSB0aXRsZSBvZjxici8+XG4gICAgICAgICAgICAgICAgRHluYW1pYyBEaXZlcnRlciBpczxici8+XG4gICAgICAgICAgICAgICAganVzdCBhcm91bmQgdGhlIGNvcm5lci5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdXYXN0ZURpdmVyc2lvbicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNCcsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA1LFxuICAgICAgICBzY29yZVRvV2luOiAzMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnd2FudC10by1zdGFjaycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3JpZ2h0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2h5IHdvdWxkIHlvdTxici8+XG4gICAgICAgICAgICAgICAgd2FudCB0byBzdGFjazxici8+XG4gICAgICAgICAgICAgICAgeW91ciB0cmF5P1xuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1doeVN0YWNrJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy93YW50X3RvX3N0YWNrX3NjcmVlbi5qcyIsImNvbnN0IFNSQyA9ICdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9jaGFuZ2VteXdvcmxkbm93L3ZpZGVvL3VwbG9hZC8nICtcbiAgICAndjE0ODY1MDc4NzMvYmFkX3N0YWNraW5nX2NvbXByZXNzZWRfbjNncnB3Lm1wNCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwidmlkZW9cIlxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPVwiQktHNVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guVmlkZW8gc3JjPXtTUkN9IC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItb25lLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBQcm9wZXIgdHJheSBzdGFja2luZzxici8+XG4gICAgICAgICAgICAgICAgaXMgYSBnYW1lIG9mIHNwYWNlLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBIb3cgbXVjaCBzcGFjZTxici8+XG4gICAgICAgICAgICAgICAgY2FuIHlvdSBzYXZlP1xuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0dhbWVPZlNwYWNlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c1JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX29uZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICB0aW1lb3V0OiAxMjAwMDAsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgZGVmYXVsdEdhbWVPcHRzIGZyb20gJy4vZGVmYXVsdF9nYW1lX29wdHMnO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5pbXBvcnQgdHJheXNBcnJheSBmcm9tICcuL3RyYXlzX2FycmF5JztcblxubGV0IHJlc29ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgIGRhdGE6ICdyZXNvcnQnLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxubGV0IGJpbk5hbWVzID0gW1xuICAgICdsaXF1aWRzJyxcbiAgICAnZm9vZC1zaGFyZScsXG4gICAgJ3JlY3ljbGUnLFxuICAgICdsYW5kZmlsbCcsXG4gICAgJ2NvbXBvc3QnLFxuICAgICd0cmF5LXN0YWNraW5nJyxcbiAgICAnaG9tZScsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIm5leHRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MdW5jaGJveFNsaWRlLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvbnZleW9yQmVsdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXRyeVwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfWxldmVsLWZhaWwubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwaWNrVXBcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JdGVtRmxpcC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBvdXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MaXF1aWRQb3VyLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwidHJheVwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVRyYXlTdGFja2VyUmFjay5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInNlbGVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1TZWxlY3QubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0aW1lclwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVNlY29uZFRpbWVyLm1wM2B9IC8+LFxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVmYXVsdHMoe1xuICAgIGdhbWVOYW1lOiAnbWFzdGVyLXNvcnRlcicsXG4gICAgZ2FtZU51bWJlcjogNSxcbiAgICBkcm9wcGVyQW1vdW50OiAyLFxuICAgIGJpbk5hbWVzLFxuICAgIGNvbGxpZGVGcmFjdGlvbjogLjQsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoYmluUmVmS2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRyb3BDbGFzcyA9IF8udG9VcHBlcihvcHRzLmJpbk5hbWVzW2JpblJlZktleV0pO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLml0ZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICdjbGFzc05hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRyb3BDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdtYW51YWwtZHJvcHBlcicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGxldCB0cmF5ID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUluZGV4ID0gXy5pbmRleE9mKHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnN0YXRlLmNsYXNzZXMsICdTRUxFQ1RFRCcpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtUmVmID0gIW9wdHMuaXRlbVJlZiA/IHRyYXkgOiB0cmF5LnJlZnNbJ2NoaWxkcmVuLTAnXS5yZWZzW2l0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgbGV0IERPTU5vZGU7XG4gICAgICAgICAgICAgICAgbGV0IG9uQW5pbWF0aW9uRW5kO1xuXG4gICAgICAgICAgICAgICAgaWYgKGUucHJvcGVydHlOYW1lICE9PSAndG9wJyB8fFxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5pbmNsdWRlcyhvcHRzLml0ZW1DbGFzc05hbWUsICdMSVFVSURTJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmluY2x1ZGVzKHRoaXMucHJvcHMuZHJvcENsYXNzLCAnTElRVUlEUycpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghb3B0cy5pdGVtUmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja1VwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdtYW51YWwtZHJvcHBlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1SZWYucHJvcHMubWVzc2FnZSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb3J0LmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtUmVmKTtcblxuICAgICAgICAgICAgICAgIGlmIChET01Ob2RlICE9PSBlLnRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgb25BbmltYXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmlyc3RJdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0YWJsZSA9IGl0ZW0ucHJvcHMuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RhYmxlLnByb3BzLmxpc3RbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtLnByb3BzLmNsYXNzTmFtZSA9IHNlbGVjdGVkSXRlbS5wcm9wcy5iZWNvbWVzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbS5wcm9wcy5tZXNzYWdlID0gc2VsZWN0ZWRJdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW0ucHJvcHNbJ2RhdGEtbWVzc2FnZSddID0gc2VsZWN0ZWRJdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpdGVtc30pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG9wdHMuaXRlbUFtb3VudCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmF5LnJlZnNbJ2NoaWxkcmVuLTAnXS5zZXRTdGF0ZSh7Y2xhc3Nlczoge319KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvdXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIERPTU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIV8uaW5jbHVkZXMob3B0cy5pdGVtQ2xhc3NOYW1lLCAnUE9VUicpKSB7XG4gICAgICAgICAgICAgICAgICAgIERPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZSgnUE9VUicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbJ2l0ZW0nLCAncG91ciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuaXRlbVJlZiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuaXRlbUNsYXNzTmFtZSAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMuaXRlbUNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5pdGVtQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0YWJsZSA9IHRoaXMucmVmc1snaXRlbXMtJyArIHRoaXMuZmlyc3RJdGVtSW5kZXhdLnJlZnNbJ2NoaWxkcmVuLTAnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2Yoc2VsZWN0YWJsZS5zdGF0ZS5jbGFzc2VzLCBzZWxlY3RhYmxlLnByb3BzLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZWN0YWJsZS5yZWZzW2l0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3NOYW1lKG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMucmVtb3ZlSXRlbUNsYXNzTmFtZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFByb3BzLnJlbW92ZUl0ZW1DbGFzc05hbWUgIT09IHRoaXMucHJvcHMuaXRlbUNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGFibGUgPSB0aGlzLnJlZnNbJ2l0ZW1zLScgKyB0aGlzLmZpcnN0SXRlbUluZGV4XS5yZWZzWydjaGlsZHJlbi0wJ107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbUluZGV4ID0gXy5pbmRleE9mKHNlbGVjdGFibGUuc3RhdGUuY2xhc3Nlcywgc2VsZWN0YWJsZS5wcm9wcy5zZWxlY3RDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGVjdGFibGUucmVmc1tpdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUFsbENsYXNzTmFtZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzTmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dFByb3BzLnNlbGVjdEl0ZW0gJiZcbiAgICAgICAgICAgICAgICAgICAgbmV4dFByb3BzLnNlbGVjdEl0ZW0gIT09IHRoaXMucHJvcHMuc2VsZWN0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHJheSA9IHRoaXMuZ2V0Rmlyc3RJdGVtKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYXkucHJvcHMubWVzc2FnZSA9PT0gJ2hvbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmF5LmFkZENsYXNzTmFtZSgnSE9NRScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0cmF5KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gXy5zdGFydENhc2UoXy5yZXBsYWNlKHRyYXkucHJvcHMuY2xhc3NOYW1lLCAvXFxkKy9nLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnQgPSByZWN0LmxlZnQgKyAocmVjdC5yaWdodCAtIHJlY3QubGVmdCkgKiAuOCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9wID0gcmVjdC50b3AgKyAocmVjdC5ib3R0b20gLSByZWN0LnRvcCkgKiAuOCAvIDI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IF8ucmVkdWNlKHRoaXMuZ2V0Rmlyc3RJdGVtKCkucmVmc1snY2hpbGRyZW4tMCddLnJlZnMsIChhLCByZWYpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgKyAocmVmLnByb3BzLm1lc3NhZ2UgPT09ICdsaXF1aWRzJyA/IDIgOiAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEl0ZW06IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldENhdGNoZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvcnJlY3Q6IGZ1bmN0aW9uIChidWNrZXRSZWYpIHtcbiAgICAgICAgICAgICAgICBsZXQgYW1vdW50ID0gb3B0cy5pdGVtQW1vdW50IC0gMTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLml0ZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NBVUdIVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0SXRlbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8uZ2V0KGJ1Y2tldFJlZiwgJ3Byb3BzLm1lc3NhZ2UnKSAhPT0gJ2xpcXVpZHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY29ycmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IG9wdHMuc2NvcmUgLSBvcHRzLnBvaW50c1Blck1pc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvcnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJheS1zdGFja2luZy10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYXkgU3RhY2tpbmdcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdjaG9jb2xhdGUnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5jaG9jb2xhdGUubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2ZydWl0J30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIuZnJ1aXQuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdtaWxrJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ29yYW5nZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLm9yYW5nZS5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRyYXlzQXJyYXk7XG4gICAgfSxcbn0sIGRlZmF1bHRHYW1lT3B0cyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMuanMiLCJpbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjInO1xuaW1wb3J0IEl0ZW1zVG9Tb3J0IGZyb20gJy4vaXRlbXNfdG9fc29ydCc7XG5cbmxldCBvblNlbGVjdCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBsZXQgcmVmID0gdGhpcy5yZWZzW2tleV07XG4gICAgbGV0IHJlY3QgPSBSZWFjdERPTS5maW5kRE9NTm9kZShyZWYpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UocmVmLnByb3BzLmNsYXNzTmFtZSwgL1xcZCsvZywgJycpKSxcbiAgICAgICAgICAgIG5ldzogdHJ1ZSxcbiAgICAgICAgICAgIHJlZixcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmxldCBvbkJvb3RzdHJhcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmludm9rZUNoaWxkcmVuRnVuY3Rpb24oJ21hcmtDYXRjaGFibGUnKTtcbn07XG5cbmxldCBnZXROYW1lID0gbmFtZSA9PiB7XG4gICAgaWYgKCFfLmluY2x1ZGVzKG5hbWUsICd0cmF5JykpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICd0cmF5LWJsdWUnLFxuICAgICAgICAgICAgJ3RyYXktcGluaycsXG4gICAgICAgIF1bXy5yYW5kb20oMCwgMSldO1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lO1xufTtcblxubGV0IGdldENoaWxkcmVuID0gdiA9PiB7XG4gICAgaWYgKHYuY2hpbGRyZW4pIHJldHVybiB2LmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9XyR7Xy5yZXBsYWNlKHYuYmluLCAnLScsICcnKX1gfVxuICAgICAgICAgICAgZnJhbWU9e3YuZnJhbWUgfHwgMX1cbiAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgbWFwSXRlbXMgPSBmdW5jdGlvbiAoaXRlbU5hbWVzKSB7XG4gICAgbGV0IGl0ZW1zID0gXy5maWx0ZXIoSXRlbXNUb1NvcnQsIGl0ZW0gPT4gXy5pbmNsdWRlcyhpdGVtTmFtZXMsIGl0ZW0ubmFtZSkpO1xuXG4gICAgcmV0dXJuIF8ubWFwKGl0ZW1zLCBpdGVtID0+XG4gICAgICAgIDxDYXRjaGFibGVcbiAgICAgICAgICAgIGNsYXNzTmFtZT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgbWVzc2FnZT17aXRlbS5iaW59XG4gICAgICAgICAgICByZUNhdGNoYWJsZT17dHJ1ZX1cbiAgICAgICAgICAgIGJlY29tZXM9e2l0ZW0uYmVjb21lc31cbiAgICAgICAgICAgIGNoaWxkcmVuPXtnZXRDaGlsZHJlbihpdGVtKX1cbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IHRyYXlEYXRhID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2NsZWFuLWFsdW1pbnVtLWZvaWwnLFxuICAgICAgICAgICAgJ2FwcGxlLWNvcmUnLFxuICAgICAgICAgICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlcicsXG4gICAgICAgICAgICAnYmFnLW9mLXBvdGF0by1jaGlwcycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdjaGlja2VuLWxlZycsXG4gICAgICAgICAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICAgICAgICAgJ3NlYWxlZC1wcmV0emVsJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgICAgICAgICAnd2hvbGUtYmFuYW5hJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtY2hvY29sYXRlLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgICAgICAgICAnZW1wdHktYmFnLW9mLWNoaXBzJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtY2hvY29sYXRlLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3BhcGVyLXBhY2thZ2luZycsXG4gICAgICAgICAgICAnb3JhbmdlLXNsaWNlJyxcbiAgICAgICAgICAgICdncmFoYW0tY29va2llLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3NlYWxlZC1wb3Bjb3JuJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2ZydWl0LXNuYWNrLXdyYXBwZXInLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ3VzZWQtcGFwZXItc2FuZHdpY2gtd3JhcHBlcicsXG4gICAgICAgICAgICAnZnJ1aXQtc25hY2std3JhcHBlcicsXG4gICAgICAgICAgICAncGFja2FnZS1vZi1kcmllZC1mcnVpdCcsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWxlbW9uYWRlLWJveCcsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICduYXBraW4nLFxuICAgICAgICAgICAgJ3N0eXJvZm9hbS1jb250YWluZXInLFxuICAgICAgICAgICAgJ3BhY2thZ2VkLWRpbm5lci1yb2xsJyxcbiAgICAgICAgICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2VtcHR5LXJhaXNpbi1ib3gnLFxuICAgICAgICAgICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlcicsXG4gICAgICAgICAgICAndW5vcGVuZWQtZ3Jhbm9sYS1iYXInLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZnJ1aXQtc25hY2std3JhcHBlcicsXG4gICAgICAgICAgICAnc2VhbGVkLWJhZy1vZi1jYXJyb3RzJyxcbiAgICAgICAgICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2NsZWFuLWFsdW1pbnVtLWZvaWwnLFxuICAgICAgICAgICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAgICAgICAgICdlbXB0eS1jaGlwLWJhZycsXG4gICAgICAgICAgICAnZnJlc2gtdW5vcGVuZWQtc2FuZHdpY2gnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1vcmFuZ2UtanVpY2UnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAndGVhYmFnJyxcbiAgICAgICAgICAgICdlbXB0eS1zbmFjay13cmFwcGVyJyxcbiAgICAgICAgICAgICdzZWFsZWQtYXBwbGVzYXVjZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnbWV0YWwtZm9vZC1jYW4nLFxuICAgICAgICAgICAgJ2NlbGVyeS1zdGljaycsXG4gICAgICAgICAgICAnZW5lcmd5LWJhci13cmFwcGVyJyxcbiAgICAgICAgICAgICdiYWctb2YtcG90YXRvLWNoaXBzJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktYm94LW9mLWNyYWNrZXJzJyxcbiAgICAgICAgICAgICdwbGFzdGljLXNwb3JrJyxcbiAgICAgICAgICAgICdib3gtb2YtY2hlZGRhci1jcmFja2VycycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICduYXBraW4nLFxuICAgICAgICAgICAgJ3BsYXN0aWMtYmFnZ2llJyxcbiAgICAgICAgICAgICd3aG9sZS1hcHBsZScsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdwbGFzdGljLWN1cCcsXG4gICAgICAgICAgICAnZGlydHktcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2FwcGxlc2F1Y2UtcG91Y2gnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnbWV0YWwtZm9vZC1jYW4nLFxuICAgICAgICAgICAgJ2NoaWNrZW4tbGVnJyxcbiAgICAgICAgICAgICd3aG9sZS1vcmFuZ2UnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1sZW1vbmFkZS1ib3gnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3BsYXN0aWMtY3VwJyxcbiAgICAgICAgICAgICduYXBraW4nLFxuICAgICAgICAgICAgJ2VtcHR5LWNoaXAtYmFnJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2NlbGVyeS1zdGljaycsXG4gICAgICAgICAgICAncGxhc3RpYy1zcG9vbicsXG4gICAgICAgICAgICAnc2VhbGVkLW1pbGsnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnY2xlYW4tYWx1bWludW0tZm9pbCcsXG4gICAgICAgICAgICAnZW1wdHktcmFpc2luLWJveCcsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdvcmFuZ2Utc2xpY2UnLFxuICAgICAgICAgICAgJ3BsYXN0aWMtc3RyYXdzJyxcbiAgICAgICAgICAgICdzZWFsZWQtcHJldHplbCcsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1jb29raWUtYm94JyxcbiAgICAgICAgICAgICdrZXRjaHVwLXBhY2tldCcsXG4gICAgICAgICAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAncGxhc3RpYy1jdXAnLFxuICAgICAgICAgICAgJ25hcGtpbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdhbHVtaW51bS1iZXZlcmFnZS1jYW4nLFxuICAgICAgICAgICAgJ2Zvb2Qtc29pbGVkLXBhcGVyLXBsYXRlJyxcbiAgICAgICAgICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3BhY2thZ2VkLXZlZ2V0YWJsZXMnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnY2Fycm90LXN0aWNrcycsXG4gICAgICAgICAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1vcmFuZ2UtanVpY2UnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3VzZWQtcGFwZXItc2FuZHdpY2gtd3JhcHBlcicsXG4gICAgICAgICAgICAnZ3JhaGFtLWNvb2tpZS13cmFwcGVyJyxcbiAgICAgICAgICAgICd1bm9wZW5lZC1wYWNrLW9mLWdyYXBlcycsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktbWlsay1jYXJ0b24nLFxuICAgICAgICAgICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgICAgICAgICAncGFja2FnZS1vZi1kcmllZC1mcnVpdCcsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWxlbW9uYWRlLWJveCcsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdiYW5hbmEtcGVlbCcsXG4gICAgICAgICAgICAnYnVycml0by13cmFwcGVyJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktcGxhc3RpYy1wYWNrYWdlJyxcbiAgICAgICAgICAgICdjZWxlcnktc3RpY2snLFxuICAgICAgICAgICAgJ2NlcmVhbC1saWQtd3JhcHBlcicsXG4gICAgICAgICAgICAnc2VhbGVkLWZydWl0LWRyaW5rJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdidXJyaXRvLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3BhY2thZ2VkLWRpbm5lci1yb2xsJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtb3JhbmdlLWp1aWNlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3BhcGVyLXBhY2thZ2luZycsXG4gICAgICAgICAgICAnbmFwa2luJyxcbiAgICAgICAgICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LWFsdW1pbnVtLWNhbicsXG4gICAgICAgICAgICAnYXBwbGUtY29yZScsXG4gICAgICAgICAgICAnYXBwbGVzYXVjZS1wb3VjaCcsXG4gICAgICAgICAgICAnbXVzdGFyZC1wYWNrZXQnLFxuICAgICAgICAgICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAncGxhc3RpYy1jdXAnLFxuICAgICAgICAgICAgJ29yYW5nZS1zbGljZScsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdib3gtb2YtY29va2llcycsXG4gICAgICAgICAgICAndW5vcGVuZWQtZW5lcmd5LWJhcicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1ib3gtb2YtY3JhY2tlcnMnLFxuICAgICAgICAgICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdjYXJyb3Qtc3RpY2tzJyxcbiAgICAgICAgICAgICdwbGFzdGljLXNwb29uJyxcbiAgICAgICAgICAgICdtYXlvLXBhY2tldCcsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktcGxhc3RpYy1ib3R0bGUnLFxuICAgICAgICAgICAgJ3NvaWxlZC1wYXBlci10cmF5JyxcbiAgICAgICAgICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3NlYWxlZC1hcHBsZXNhdWNlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LWNvb2tpZS1ib3gnLFxuICAgICAgICAgICAgJ2p1aWNlLWJveCcsXG4gICAgICAgICAgICAnc2VhbGVkLXBvcGNvcm4nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnYmFuYW5hLXBlZWwnLFxuICAgICAgICAgICAgJ2VtcHR5LWJhZy1vZi1jaGlwcycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWNhcnRvbi1vZi1taWxrJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdtZXRhbC1mb29kLWNhbicsXG4gICAgICAgICAgICAnZm9vZC1zb2lsZWQtcGFwZXItcGxhdGUnLFxuICAgICAgICAgICAgJ3BsYXN0aWMtc3BvcmsnLFxuICAgICAgICAgICAgJ2JveC1vZi1jaGVkZGFyLWNyYWNrZXJzJyxcbiAgICAgICAgXSxcbiAgICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAodHJheURhdGEsIGRhdGEgPT4ge1xuICAgIGxldCBiaW4gPSBfLmluY2x1ZGVzKGRhdGEubmFtZSwgJ3RyYXknKSA/ICd0cmF5LXN0YWNraW5nJyA6ICdob21lJztcbiAgICBsZXQgbmFtZSA9IGdldE5hbWUoZGF0YS5uYW1lKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGJpbixcbiAgICAgICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGJpbixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNlbGVjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQm9vdHN0cmFwPXtvbkJvb3RzdHJhcH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q9e21hcEl0ZW1zKGRhdGEuaXRlbXMpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgIH07XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy90cmF5c19hcnJheS5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdHdvLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBOb3QgYWxsIGx1bmNoZXMgYXJlPGJyLz5cbiAgICAgICAgICAgICAgICBjcmVhdGVkIGVxdWFsbHkuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFNvbWUgbHVuY2hlcyBjb21lIGZyb208YnIvPlxuICAgICAgICAgICAgICAgIGhvbWUgYW5kIHRoZXJlIGlzPGJyLz5cbiAgICAgICAgICAgICAgICBubyB0cmF5IHN0YWNraW5nIG5lZWRlZCFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdMdW5jaGVzQ3JlYXRlZEVxdWFsbHknLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDE1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdGhyZWUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEl0ZW1zIGZyb20gaG9tZTxici8+XG4gICAgICAgICAgICAgICAgY2FuIGJlIHRyaWNreSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhleSBhcmUgdW5pcXVlIGFuZCB5b3U8YnIvPlxuICAgICAgICAgICAgICAgIGFyZSBvbiB5b3VyIG93biB0byBzb3J0ITxici8+XG4gICAgICAgICAgICAgICAgQXNrIGZvciBoZWxwIGlmIHlvdTxici8+XG4gICAgICAgICAgICAgICAgYXJlIHVuc3VyZSBvZiBpdGVtcy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdJdGVtc0Zyb21Ib21lJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c1JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDIwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUaGlzIGlzIGEgdG91Z2g8YnIvPlxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZSBidXQgSSBzZWU8YnIvPlxuICAgICAgICAgICAgICAgIHlvdXIgbmV3IEZsaXA8YnIvPlxuICAgICAgICAgICAgICAgIG9uIHRoZSBob3Jpem9uITxici8+XG4gICAgICAgICAgICAgICAgTGV0J3MgR28hXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnVG91Z2hDaGFsbGVuZ2UnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiAyNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBZb3UgYXJlIGFib3V0IHRvIFdpbjxici8+XG4gICAgICAgICAgICAgICAgdGhlIGhpZ2hlc3QgaG9ub3IgZm9yIHRoZTxici8+XG4gICAgICAgICAgICAgICAgR3JlZW4gVGVhbSBDaGFsbGVuZ2UhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFdpbiB0aGlzIGxldmVsIHRvIGJlY29tZTxici8+XG4gICAgICAgICAgICAgICAgYSBNYXN0ZXIgU29ydGVyIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hpZ2hlc3RIb25vcicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdub3ctYS1tZW1iZXInLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBZb3UgYXJlIG5vdyBhIG1lbWJlcjxici8+XG4gICAgICAgICAgICAgICAgb2YgdGhlIEdyZWVuIFRlYW0hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEl0J3MgdGltZSB0byBzaGFyZTxici8+XG4gICAgICAgICAgICAgICAgaXQgd2l0aCB5b3VyPGJyLz5cbiAgICAgICAgICAgICAgICBmYW1pbHkgYW5kIGNvbW11bml0eSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdNZW1iZXJPZkdyZWVuVGVhbScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbm93X2FfbWVtYmVyX3NjcmVlbi5qcyIsImNsYXNzIFF1aXRTY3JlZW4gZXh0ZW5kcyBza29hc2guU2NyZWVuIHtcbiAgICBva2F5KCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcigncXVpdCcpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICBza29hc2gudHJpZ2dlcignbWVudUNsb3NlJywge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckFzc2V0cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXNzZXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hc3NldHMubWFwKChhc3NldCwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmFzc2V0LnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXthc3NldC5yZWYgfHwgYXNzZXQucHJvcHNbJ2RhdGEtcmVmJ10gfHwgKCdhc3NldC0nICsga2V5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgc2NyZWVuICR7dGhpcy5nZXRDbGFzc05hbWVzKCl9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBc3NldHMoKX1cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5BcmUgeW91IHN1cmU8YnIvPnlvdSB3YW50IHRvIHF1aXQ/PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJxdWl0LXllc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5va2F5LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInF1aXQtbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2FuY2VsLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKFxuICAgIDxRdWl0U2NyZWVuXG4gICAgICAgIGlkPVwicXVpdFwiXG4gICAgICAgIGFzc2V0cz17W1xuICAgICAgICBdfVxuICAgIC8+XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3F1aXRfc2NyZWVuLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDamtCQTtBQUNBO0FBREE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3BDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBaUdBO0FBQ0E7QUFEQTtBQUdBO0FBdkdBO0FBQ0E7QUF1SkE7Ozs7OztBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFGQTtBQURBO0FBV0E7Ozs7QUFkQTtBQUNBO0FBZ0JBOzs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFaQTtBQWVBOzs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQU5BO0FBekJBO0FBc0NBO0FBQ0E7QUF4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ1pBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFEQTs7Ozs7Ozs7Ozs7Ozs7QUMyTEE7QUFDQTtBQUNBO0FBQ0E7OztBQWhNQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNtQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWZBO0FBc0JBO0FBQ0E7QUE3REE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQXJDQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQURBOzs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQXVEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUM2Q0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUpBO0FBUUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBUEE7QUFIQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBNUNBO0FBbURBO0FBQ0E7QUE1SkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUF4Q0E7QUFDQTtBQWlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQXdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTs7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFzQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU5BO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUZBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFoQkE7QUEwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRkE7QUE3Q0E7QUFtREE7QUFDQTtBQUNBO0FBcEZBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFWQTtBQXdCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQVdBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFYQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBeUJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUVBO0FBRkE7QUFoQkE7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBaEJBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVhBO0FBOUhBO0FBNklBO0FBQ0E7QUFDQTtBQS9PQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFRQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFLQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSEE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBVEE7QUFVQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBSEE7QUFNQTs7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUhBO0FBREE7QUFPQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUpBO0FBT0E7Ozs7QUFoTkE7QUFDQTtBQW1OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoT0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUF0Q0E7QUFDQTtBQXdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25EQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBSEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTs7O0FBRUE7QUFDQTtBQUdBO0FBRkE7QUFLQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBVEE7QUFjQTs7OztBQXJLQTtBQUNBO0FBdUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJBO0FBQ0E7QUFrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQWhEQTtBQUNBO0FBa0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFoQkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBREE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFEQTtBQURBO0FBT0E7QUFDQTtBQXpDQTtBQTJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUF4QkE7QUEwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFMQTtBQURBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUExQkE7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBUkE7QUFEQTtBQWNBO0FBQ0E7QUFwQkE7QUFzQkE7QUF2REE7QUF5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQXBCQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQXJQQTs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBZ0RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUFBOzs7Ozs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFtQkE7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFDQTtBQUtBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7Ozs7Ozs7Ozs7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMkNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFUQTtBQWNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQVRBO0FBZUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBckNBO0FBMkNBO0FBQ0E7QUFDQTtBQS9GQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBT0E7QUFDQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFEQTtBQURBOzs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFWQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFSQTtBQURBO0FBY0E7QUFDQTtBQXBCQTtBQUNBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUxBO0FBREE7QUFXQTtBQUNBO0FBdEJBO0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUE3Q0E7QUEwREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNU5BOzs7Ozs7Ozs7Ozs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFDQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFaQTtBQWNBO0FBQ0E7QUFsQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUNBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWZBO0FBaUJBO0FBQ0E7QUFyQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQVZBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUxBO0FBREE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFQQTtBQURBO0FBV0E7QUFiQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFSQTtBQURBO0FBY0E7QUFDQTtBQXBCQTtBQUNBO0FBc0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBSkE7QUFNQTtBQUNBO0FBREE7QUFHQTtBQVZBO0FBREE7QUFjQTtBQUNBO0FBL0JBO0FBaUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBM0dBO0FBQ0E7QUFEQTtBQTRHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBUkE7QUFEQTtBQVlBO0FBdklBO0FBeUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFmQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVBBO0FBY0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQWpHQTtBQW9HQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvU0E7Ozs7Ozs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFDQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBRkE7QUFUQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBd0JBO0FBQ0E7QUE1QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbUJBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBRkE7QUFBQTtBQUZBO0FBRkE7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQXdCQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQVZBO0FBd0JBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSEE7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQWRBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBN0ZBO0FBREE7QUExRUE7QUFDQTtBQURBO0FBaUxBO0FBQ0E7QUFDQTtBQW5OQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFIQTtBQUlBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFPQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTs7Ozs7O0FDdkpBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQ0E7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQU9BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFNQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUZBO0FBT0E7Ozs7QUE3S0E7QUFDQTtBQStLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlMQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUhBO0FBREE7QUFPQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7O0FBcE1BO0FBQ0E7QUFzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTkE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQWtCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BOzs7O0FBM1BBO0FBQ0E7QUE2UEE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7Ozs7Ozs7Ozs7OztBQzFRQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFOQTtBQVFBO0FBVkE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBREE7QUFRQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoRUE7QUFrRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBUUE7QUFDQTtBQUZBO0FBUUE7QUFDQTtBQUZBO0FBcEhBOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFaQTtBQWNBO0FBQ0E7QUFsQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQU1BO0FBVkE7QUFZQTtBQUNBO0FBaEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFQQTtBQVVBO0FBQ0E7QUFoQkE7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBUkE7QUFEQTtBQWNBO0FBQ0E7QUFwQkE7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFsQkE7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBRkE7QUFTQTtBQWxCQTtBQUNBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFLQTtBQUNBO0FBREE7QUFOQTtBQURBO0FBWUE7QUE3TEE7QUErTEE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBakJBO0FBbUJBO0FBMUJBO0FBQ0E7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqR0E7QUFtR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBdkNBO0FBb0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNVlBOzs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBSkE7QUFGQTtBQW1CQTs7Ozs7Ozs7Ozs7O0FDL2FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUFMQTtBQWtCQTs7OztBQWpEQTtBQUNBO0FBb0RBO0FBQ0E7QUFDQTtBQUZBOzs7Iiwic291cmNlUm9vdCI6IiJ9