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
/******/ 	var hotCurrentHash = "52a62dd0c54cbdebbcf2"; // eslint-disable-line no-unused-vars
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
	        opts.playAudio = play ? play : drop && !opts.truckClassName ? 'drop' : pickUp ? 'pickUp' : opts.next ? 'next' : opts.pour ? 'pour' : opts.next ? 'correct' : revealOpen === 'resort' ? 'resort' : opts.itemNew ? _.kebabCase(opts.itemName) : dropClass === 'TRAY-STACKING' && _.includes(opts.itemName, 'tray') ? 'tray' : opts.itemName ? 'select' : null;

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

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'drop', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ReleaseItem1.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'CorrectSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

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
	    name: 'empty-plastic-bottle-2',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-bottle-3',
	    bin: 'recycle'
	}, {
	    name: 'empty-plastic-bottle-4',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton',
	    bin: 'recycle'
	}, {
	    name: 'empty-milk-carton',
	    bin: 'recycle'
	}, {
	    name: 'empty-aluminum-can-1',
	    bin: 'recycle'
	}, {
	    name: 'juice-box-1',
	    bin: 'landfill'
	}, {
	    name: 'juice-box-2',
	    bin: 'landfill'
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
	    name: 'empty-plastic-bottle-2',
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

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'drop', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ClickRecButton.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

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
	    React.createElement(skoash.Audio, { delay: 4600, type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFunnel.mp3' }),
	    React.createElement(skoash.Audio, { type: 'sfx', src: CMWN.MEDIA.EFFECT + 'TruckDump.mp3' })
	), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

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
	            React.createElement(skoash.Sprite, {
	                className: 'claw',
	                src: CLAW_SRC,
	                frame: 0,
	                loop: false,
	                animate: opts.moveClaw,
	                duration: [200, 200, 200, 500, 100, 3000, 200, 200, 200, 200, 200, 200],
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
	            opts.playAudio = play ? play : revealOpen === 'resort' ? 'resort' : _.kebabCase(itemName);

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

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

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

	audioArray = audioArray.concat([React.createElement(skoash.Audio, { ref: 'next', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LunchboxSlide.mp3' }), React.createElement(skoash.Audio, { ref: 'correct', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ConveyorBelt.mp3' }), React.createElement(skoash.Audio, { ref: 'resort', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ResortWarning.mp3' }), React.createElement(skoash.Audio, { ref: 'pickUp', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemFlip.mp3' }), React.createElement(skoash.Audio, { ref: 'pour', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'LiquidPour.mp3' }), React.createElement(skoash.Audio, { ref: 'tray', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'TrayStackerRack.mp3' }), React.createElement(skoash.Audio, { ref: 'select', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'ItemSelect.mp3' }), React.createElement(skoash.Audio, { ref: 'timer', type: 'sfx', src: CMWN.MEDIA.EFFECT + 'SecondTimer.mp3' })]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvYWkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTJhNjJkZDBjNTRjYmRlYmJjZjIiLCJ3ZWJwYWNrOi8vL2Rldi12YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vL21ha2VfbWVkaWFfZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29uZmlnLmpzb24iLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9lZmZlY3RzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2ZpcmV3b3Jrcy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pbmZvX3NjcmVlbl9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMva2V5X2lzX3NvcnRpbmdfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19yZWN5Y2xlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9saWdodHNfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19sYW5kZmlsbC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZml2ZV93YXlzX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfY29tcG9zdC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGV2ZWxfc2NyZWVuX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX29uZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2gvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjEuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbWFudWFsX2Ryb3BwZXIvMC4xLmpzIiwid2VicGFjazovLy9saWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjIuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZ2FtZV9vcHRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc190b19zb3J0LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19mb29kX3NoYXJlLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19saXF1aWRzLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX3RocmVlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9sZXZlbF9jb21wbGV0ZV9zY3JlZW5fY29tcG9uZW50LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX29uZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb25lX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cy5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXJvdXNlbC8wLjEuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zaG9ydGlkL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2hvcnRpZC9saWIvZGVjb2RlLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzIiwid2VicGFjazovLy8uLi9+L3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3RhYmxlLzAuMS5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcm9wem9uZS8wLjQuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuNC5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZml2ZV9pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvd2FudF90b19zdGFja19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZGVmYXVsdF9tYXN0ZXJfc29ydGVyX29wdHMuanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RyYXlzX2FycmF5LmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3R3b19pbmZvX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX3RocmVlX3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwid2VicGFjazovLy9saWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL25vd19hX21lbWJlcl9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL2xpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3F1aXRfc2NyZWVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSBcclxuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XHJcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoY2FsbGJhY2spIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xyXG4gXHRcdHRyeSB7XHJcbiBcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gXHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XHJcbiBcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xyXG4gXHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gMTAwMDA7XHJcbiBcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XHJcbiBcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG4gXHRcdH1cclxuIFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0aWYocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XHJcbiBcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gXHRcdFx0XHQvLyB0aW1lb3V0XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIikpO1xyXG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcclxuIFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxyXG4gXHRcdFx0XHRjYWxsYmFjaygpO1xyXG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xyXG4gXHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXHJcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG4gXHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuIFx0XHRcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2soZSk7XHJcbiBcdFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIHVwZGF0ZSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0Ly8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYmVmNDViMC9zcmMvc2hhcmVkL3V0aWxzL2NhbkRlZmluZVByb3BlcnR5LmpzXHJcbiBcdHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xyXG4gXHR0cnkge1xyXG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgXCJ4XCIsIHtcclxuIFx0XHRcdGdldDogZnVuY3Rpb24oKSB7fVxyXG4gXHRcdH0pO1xyXG4gXHRcdGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcclxuIFx0fSBjYXRjaCh4KSB7XHJcbiBcdFx0Ly8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcclxuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI1MmE2MmRkMGM1NGNiZGViYmNmMlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XHJcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuIFx0XHRcdFx0fSBlbHNlIGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuIFx0XHR9O1xyXG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkpIHtcclxuIFx0XHRcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcclxuIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIChmdW5jdGlvbihuYW1lKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuIFx0XHRcdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fShuYW1lKSkpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGZuW25hbWVdID0gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcclxuIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkLCBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG51bGwsIGZuKTtcclxuIFx0XHRcdFx0fSBmaW5hbGx5IHtcclxuIFx0XHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xyXG4gXHRcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcclxuIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XHJcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwiZVwiLCB7XHJcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdHZhbHVlOiBlbnN1cmVcclxuIFx0XHRcdH0pO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRmbi5lID0gZW5zdXJlO1xyXG4gXHRcdH1cclxuIFx0XHRyZXR1cm4gZm47XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhvdCA9IHtcclxuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcclxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXHJcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxyXG4gXHRcclxuIFx0XHRcdC8vIE1vZHVsZSBBUElcclxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2s7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjaztcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJudW1iZXJcIilcclxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcclxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcclxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcclxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxyXG4gXHRcdH07XHJcbiBcdFx0cmV0dXJuIGhvdDtcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XHJcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcclxuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdENhbGxiYWNrO1xyXG4gXHRcclxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXHJcbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XHJcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcclxuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHksIGNhbGxiYWNrKSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XHJcbiBcdFx0aWYodHlwZW9mIGFwcGx5ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBmYWxzZTtcclxuIFx0XHRcdGNhbGxiYWNrID0gYXBwbHk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbiBcdFx0aG90RG93bmxvYWRNYW5pZmVzdChmdW5jdGlvbihlcnIsIHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuIFx0XHRcdGlmKCF1cGRhdGUpIHtcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgbnVsbCk7XHJcbiBcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHVwZGF0ZS5jLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcFt1cGRhdGUuY1tpXV0gPSB0cnVlO1xyXG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xyXG4gXHRcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbiBcdFx0XHRyZXR1cm47XHJcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XHJcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XHJcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4gXHRcdHZhciBjYWxsYmFjayA9IGhvdENhbGxiYWNrO1xyXG4gXHRcdGhvdENhbGxiYWNrID0gbnVsbDtcclxuIFx0XHRpZighY2FsbGJhY2spIHJldHVybjtcclxuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XHJcbiBcdFx0XHRob3RBcHBseShob3RBcHBseU9uVXBkYXRlLCBjYWxsYmFjayk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpIHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcclxuIFx0XHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiBcdFx0XHRvcHRpb25zID0ge307XHJcbiBcdFx0fSBlbHNlIGlmKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGUpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbbW9kdWxlXTtcclxuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcclxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZighbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZClcclxuIFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZUlkID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyBtb2R1bGVJZCArIFwiIGluIFwiICsgcGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdFx0cXVldWUucHVzaChwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRyZXR1cm4gW291dGRhdGVkTW9kdWxlcywgb3V0ZGF0ZWREZXBlbmRlbmNpZXNdO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoIXJlc3VsdCkge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xyXG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzdWx0KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0WzBdKTtcclxuIFx0XHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiByZXN1bHRbMV0pIHtcclxuIFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0WzFdLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHRbMV1bbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcclxuIFx0XHRcdFx0Y2IoZGF0YSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xyXG4gXHRcclxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXHJcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxyXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSB7XHJcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcclxuIFx0XHRcdFx0XHR2YXIgaWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0aWYoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcclxuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRjYihvdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2UgaWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2UsXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IGhvdEN1cnJlbnRQYXJlbnRzLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTJhNjJkZDBjNTRjYmRlYmJjZjIiLCJ3aW5kb3cuRU5WSVJPTk1FTlQgPSB7XG4gICAgTUVESUE6ICdodHRwczovL21lZGlhLXN0YWdpbmcuY2hhbmdlbXl3b3JsZG5vdy5jb20vZi8nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGRldi12YXJpYWJsZXMuanMiLCIoZnVuY3Rpb24gKGdhbWVOYW1lKSB7XG4gICAgLy8gcmVtb3ZlIHdpbmRvdy5NRURJQSBvbmNlIG5vIGdhbWVzIHJlZmVyZW5jZSBpdFxuICAgIHZhciBNRURJQSA9IHdpbmRvdy5NRURJQSA9IHtcbiAgICAgICAgQkFTRTogRU5WSVJPTk1FTlQuTUVESUFcbiAgICB9O1xuXG4gICAgY29uc3QgR0FNRSA9ICdnYW1lcy8nO1xuICAgIGNvbnN0IEVGRkVDVCA9ICdzb3VuZC1hc3NldHMvZWZmZWN0cy8nO1xuICAgIGNvbnN0IFZPID0gJ3NvdW5kLWFzc2V0cy92b3MvJztcbiAgICBjb25zdCBJTUFHRSA9ICdpbWFnZS1hc3NldHMvJztcbiAgICBjb25zdCBTUFJJVEUgPSAnc3ByaXRlcy1hbmltYXRpb25zLyc7XG4gICAgY29uc3QgRlJBTUUgPSAnZnJhbWVzLyc7XG4gICAgY29uc3QgRk9OVCA9ICdmb250cy8nO1xuICAgIGNvbnN0IFNIQVJFRCA9ICdzaGFyZWQvJztcbiAgICBjb25zdCBNT0NLX0dBTUUgPSAnbW9jay1nYW1lLyc7XG5cbiAgICBNRURJQS5GT05UID0gTUVESUEuQkFTRSArIEZPTlQ7XG4gICAgTUVESUEuU0hBUkVEID0gTUVESUEuQkFTRSArIEdBTUUgKyBTSEFSRUQ7XG5cbiAgICBNRURJQS5HQU1FID0gTUVESUEuQkFTRSArIEdBTUUgKyBnYW1lTmFtZSArICcvJztcbiAgICBNRURJQS5FRkZFQ1QgPSBNRURJQS5HQU1FICsgRUZGRUNUO1xuICAgIE1FRElBLlZPID0gTUVESUEuR0FNRSArIFZPO1xuICAgIE1FRElBLklNQUdFID0gTUVESUEuR0FNRSArIElNQUdFO1xuICAgIE1FRElBLlNQUklURSA9IE1FRElBLkdBTUUgKyBTUFJJVEU7XG4gICAgTUVESUEuRlJBTUUgPSBNRURJQS5HQU1FICsgRlJBTUU7XG4gICAgTUVESUEuRk9OVCA9IE1FRElBLkdBTUUgKyBGT05UO1xuXG4gICAgTUVESUEuTU9DSyA9IHt9O1xuICAgIE1FRElBLk1PQ0suR0FNRSA9IE1FRElBLkJBU0UgKyBHQU1FICsgTU9DS19HQU1FO1xuICAgIE1FRElBLk1PQ0suRUZGRUNUID0gTUVESUEuTU9DSy5HQU1FICsgRUZGRUNUO1xuICAgIE1FRElBLk1PQ0suVk8gPSBNRURJQS5NT0NLLkdBTUUgKyBWTztcbiAgICBNRURJQS5NT0NLLklNQUdFID0gTUVESUEuTU9DSy5HQU1FICsgSU1BR0U7XG4gICAgTUVESUEuTU9DSy5TUFJJVEUgPSBNRURJQS5NT0NLLkdBTUUgKyBTUFJJVEU7XG4gICAgTUVESUEuTU9DSy5GUkFNRSA9IE1FRElBLk1PQ0suR0FNRSArIEZSQU1FO1xuICAgIE1FRElBLk1PQ0suRk9OVCA9IE1FRElBLk1PQ0suR0FNRSArIEZPTlQ7XG5cbiAgICB3aW5kb3cuQ01XTi5NRURJQSA9IE1FRElBO1xufSh3aW5kb3cuQ01XTi5nYW1lRm9sZGVyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbWFrZV9tZWRpYV9nbG9iYWxzLmpzIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMSc7XG5cbmltcG9ydCBpT1NTY3JlZW4gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvaW9zX3NwbGFzaF9zY3JlZW4vMC4xJztcblxuaW1wb3J0IFRpdGxlU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy90aXRsZV9zY3JlZW4nO1xuaW1wb3J0IEhpVGhlcmVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2hpX3RoZXJlX3NjcmVlbic7XG5pbXBvcnQgS2V5SXNTb3J0aW5nU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4nO1xuaW1wb3J0IExpZ2h0c1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbic7XG5pbXBvcnQgRml2ZVdheXNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZpdmVfd2F5c19zY3JlZW4nO1xuaW1wb3J0IExldmVsU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9sZXZlbF9zY3JlZW5fY29tcG9uZW50JztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjFTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjNJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb240SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFJlY3ljbGluZ0NoYW1waW9uNFNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcmVjeWNsaW5nX2NoYW1waW9uX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBSZWN5Y2xpbmdDaGFtcGlvbjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUmVjeWNsaW5nQ2hhbXBpb241U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IExldmVsQ29tcGxldGVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2xldmVsX2NvbXBsZXRlX3NjcmVlbl9jb21wb25lbnQnO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjFJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX29uZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyMVNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF9vbmVfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXIySW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdHdvX3NjcmVlbic7XG5pbXBvcnQgUHJpY2VsZXNzUG91cmVyM0luZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfdGhyZWVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IFByaWNlbGVzc1BvdXJlcjNTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI0SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9mb3VyX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI0U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZvdXJfc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI1SW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuJztcbmltcG9ydCBQcmljZWxlc3NQb3VyZXI1U2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZpdmVfc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vbmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfb25lX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdHdvX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3R3b19zY3JlZW4nO1xuaW1wb3J0IEZhbnRhc3RpY0Zvb2RTaGFyZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3RocmVlX2luZm9fc2NyZWVuJztcbmltcG9ydCBGYW50YXN0aWNGb29kU2hhcmVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX3RocmVlX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZm91cl9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9mb3VyX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfZml2ZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRmFudGFzdGljRm9vZFNoYXJlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9maXZlX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBEeW5hbWljRGl2ZXJ0ZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgRHluYW1pY0RpdmVydGVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IER5bmFtaWNEaXZlcnRlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IFdhbnRUb1N0YWNrU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy93YW50X3RvX3N0YWNrX3NjcmVlbic7XG5pbXBvcnQgVmlkZW9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3ZpZGVvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMUluZm9TY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfb25lX2luZm9fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIxU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2xldmVsX29uZV9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjJJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX3R3b19pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyMlNjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuJztcbmltcG9ydCBNYXN0ZXJTb3J0ZXIzSW5mb1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90aHJlZV9pbmZvX3NjcmVlbic7XG5pbXBvcnQgTWFzdGVyU29ydGVyM1NjcmVlbiBmcm9tICcuL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjRJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZvdXJfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZm91cl9zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjVJbmZvU2NyZWVuIGZyb20gJy4vY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4nO1xuaW1wb3J0IE1hc3RlclNvcnRlcjVTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4nO1xuaW1wb3J0IE5vd0FNZW1iZXJTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL25vd19hX21lbWJlcl9zY3JlZW4nO1xuaW1wb3J0IFF1aXRTY3JlZW4gZnJvbSAnLi9jb21wb25lbnRzL3F1aXRfc2NyZWVuJztcblxuc2tvYXNoLnN0YXJ0KFxuICAgIDxza29hc2guR2FtZVxuICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgbG9hZGVyPXs8TG9hZGVyIC8+fVxuICAgICAgICBzY3JlZW5zPXtbXG4gICAgICAgICAgICBpT1NTY3JlZW4sXG4gICAgICAgICAgICBUaXRsZVNjcmVlbixcbiAgICAgICAgICAgIEhpVGhlcmVTY3JlZW4sXG4gICAgICAgICAgICBLZXlJc1NvcnRpbmdTY3JlZW4sXG4gICAgICAgICAgICBMaWdodHNTY3JlZW4sXG4gICAgICAgICAgICBGaXZlV2F5c1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMCksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24xU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS4xKSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjIpLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb24zSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDEuMyksXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUmVjeWNsaW5nQ2hhbXBpb240U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMS40KSxcbiAgICAgICAgICAgIFJlY3ljbGluZ0NoYW1waW9uNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBSZWN5Y2xpbmdDaGFtcGlvbjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigxLjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbigxKSxcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMCksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjEpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi4yKSxcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDIuMyksXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIFByaWNlbGVzc1BvdXJlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigyLjQpLFxuICAgICAgICAgICAgUHJpY2VsZXNzUG91cmVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBQcmljZWxlc3NQb3VyZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oMi41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oMiksXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjApLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjEpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjJJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjIpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjNTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjMpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjQpLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjVJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRmFudGFzdGljRm9vZFNoYXJlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbigzLjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbigzKSxcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMCksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIxSW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjFTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjEpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyMkluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXIyU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC4yKSxcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjNJbmZvU2NyZWVuLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyM1NjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDQuMyksXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI0SW5mb1NjcmVlbixcbiAgICAgICAgICAgIER5bmFtaWNEaXZlcnRlcjRTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig0LjQpLFxuICAgICAgICAgICAgRHluYW1pY0RpdmVydGVyNUluZm9TY3JlZW4sXG4gICAgICAgICAgICBEeW5hbWljRGl2ZXJ0ZXI1U2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNC41KSxcbiAgICAgICAgICAgIExldmVsQ29tcGxldGVTY3JlZW4oNCksXG4gICAgICAgICAgICBXYW50VG9TdGFja1NjcmVlbixcbiAgICAgICAgICAgIFZpZGVvU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4wKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjFJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyMVNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuMSksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIySW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjIpLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyM0luZm9TY3JlZW4sXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXIzU2NyZWVuLFxuICAgICAgICAgICAgTGV2ZWxTY3JlZW4oNS4zKSxcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjRJbmZvU2NyZWVuLFxuICAgICAgICAgICAgTWFzdGVyU29ydGVyNFNjcmVlbixcbiAgICAgICAgICAgIExldmVsU2NyZWVuKDUuNCksXG4gICAgICAgICAgICBNYXN0ZXJTb3J0ZXI1SW5mb1NjcmVlbixcbiAgICAgICAgICAgIE1hc3RlclNvcnRlcjVTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbFNjcmVlbig1LjUpLFxuICAgICAgICAgICAgTGV2ZWxDb21wbGV0ZVNjcmVlbig1KSxcbiAgICAgICAgICAgIE5vd0FNZW1iZXJTY3JlZW4sXG4gICAgICAgICAgICBMZXZlbENvbXBsZXRlU2NyZWVuKDYpLFxuICAgICAgICBdfVxuICAgICAgICBtZW51cz17e1xuICAgICAgICAgICAgcXVpdDogUXVpdFNjcmVlbixcbiAgICAgICAgfX1cbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fcmVjeWNsZS5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGlxdWlkcy5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fbGFuZGZpbGwuanNvbmB9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5KU09OIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2Zvb2RzaGFyZS5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkpTT04gc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fY29tcG9zdC5qc29uYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X3JlY3ljbGUucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xpcXVpZHMucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2xhbmRmaWxsLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9mb29kc2hhcmUucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9X2NvbXBvc3QucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1wdXJwbGUucmliYm9uLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9bHVnZ2FnZS5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1zcHJpdGUuc3Rhci5wbmdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLkZSQU1FfWZyYW1lLjAxLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuRlJBTUV9ZnJhbWUuMDIucG5nYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5GUkFNRX10cmFuc2l0aW9uLmZyYW1lLnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5tYWlubmF2LnBuZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9dGl0bGVzY3JuYmcuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjAxLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC4wMi5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQuMDMuanBnYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1iYWNrZ3JvdW5kLjA0LmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFuc2l0aW9uLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFzaC5yZWN5Y2xlLmpwZ2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9YmFja2dyb3VuZC50cmFzaC5sYW5kZmlsbC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfWJhY2tncm91bmQudHJhc2guY29tcG9zdC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXF1aXQuYmFja2dyb3VuZC5qcGdgfSAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gdHlwZT1cInNmeFwiIHJlZj1cImJ1dHRvblwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QnV0dG9uQ2xpY2subXAzYH0gLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHR5cGU9XCJzZnhcIiByZWY9XCJzY3JlZW4tY29tcGxldGVcIiBzcmM9e2Ake01FRElBLkVGRkVDVH1OZXh0QXBwZWFyLm1wM2B9IC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0cwXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfXRpdGxlc2NyZWVuLm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzFcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHMS5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0cyXCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzIubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHM1wiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0czLm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cIkJLRzRcIiB0eXBlPVwiYmFja2dyb3VuZFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9QktHNC5tcDNgfSBsb29wIC8+LFxuICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJCS0c1XCIgdHlwZT1cImJhY2tncm91bmRcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUJLRzUubXAzYH0gbG9vcCAvPixcbiAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiQktHNlwiIHR5cGU9XCJiYWNrZ3JvdW5kXCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1CS0c2Lm1wM2B9IGxvb3AgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdGl0bGVcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2cxXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgYmtnMlwiIC8+LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYWNrZ3JvdW5kIGJrZzNcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCBia2c0XCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgdHJhc2hcIiAvPixcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFja2dyb3VuZCB0cmFuc2l0aW9uXCIgLz4sXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhY2tncm91bmQgcXVpdFwiIC8+LFxuICAgICAgICBdfVxuICAgIC8+XG4pO1xuXG5pZiAobW9kdWxlLmhvdCkgbW9kdWxlLmhvdC5hY2NlcHQoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJpZFwiOiBcImdyZWVuLXRlYW0tY2hhbGxlbmdlXCIsXG5cdFwidmVyc2lvblwiOiAxLFxuXHRcInNrb2FzaFwiOiBcIjEuMS40XCIsXG5cdFwiaGVhZF9pbmplY3Rpb25cIjogXCJcIixcblx0XCJkaW1lbnNpb25zXCI6IHtcblx0XHRcIndpZHRoXCI6IDk2MCxcblx0XHRcImhlaWdodFwiOiA1NDBcblx0fVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29uZmlnLmpzb25cbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cImxvYWRlclwiIGNsYXNzTmFtZT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPkxvYWRpbmchPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXIgYW5pbWF0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGVyLzAuMS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlkPVwiaW9zLXNwbGFzaFwiXG4gICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgIGNvbXBsZXRlRGVsYXk9ezYwMDB9XG4gICAgICAgICAgICBuZXh0RGVsYXk9ezMwMDB9XG4gICAgICAgICAgICBjb21wbGV0ZU9uU3RhcnRcbiAgICAgICAgICAgIGhpZGVQcmV2XG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNIQVJFRH1pb3Mtc3RhcnQtYmFsbC5wbmdgfSAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuU0hBUkVEfWlvcy1zdGFydC1iYWxsLWFuaW0uZ2lmYH0gLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9pb3Nfc3BsYXNoX3NjcmVlbi8wLjEuanMiLCJpbXBvcnQgJ3NoYXJlZC9lZmZlY3RzL2luZGV4JztcblxuY29uc3QgRklSRVdPUktTID0gJ2ZpcmV3b3Jrcyc7XG5cbmxldCBvblN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWZmZWN0ID0gd2luZG93LkNNV04ubWFrZUVmZmVjdCgnZmlyZXdvcmtzJywgUmVhY3RET00uZmluZERPTU5vZGUodGhpcyksIHtcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaW1hZ2UpLFxuICAgIH0pO1xufTtcblxubGV0IG9uU3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBfLmludm9rZSh0aGlzLmVmZmVjdCwgJ2Rlc3Ryb3knKTtcbiAgICBkZWxldGUgdGhpcy5lZmZlY3Q7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD1cInRpdGxlXCJcbiAgICAgICAgICAgIHNpbGVudENvbXBsZXRlXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89XCJCS0cwXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGgzIGNvbnRlbnQ9XCJHcmVlbiBUZWFtIENoYWxsZW5nZVwiIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9Z3JhZGllbnQtdGV4dHVyZS5qcGdgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0cmFzaFwiXG4gICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLklNQUdFfXRpdGxldHJhc2hjYW4ucG5nYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkltYWdlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2hhcmFjdGVyXCJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9Z3JlZW50ZWFtY2hhcmFjLnBuZ2B9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyYXlcIlxuICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXRyYXkucG5nYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17RklSRVdPUktTfVxuICAgICAgICAgICAgICAgIHJlZj17RklSRVdPUktTfVxuICAgICAgICAgICAgICAgIG9uU3RhcnQ9e29uU3RhcnR9XG4gICAgICAgICAgICAgICAgb25TdG9wPXtvblN0b3B9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZVxuICAgICAgICAgICAgICAgICAgICByZWY9XCJpbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX10aXRsZXNjcm5iZy5qcGdgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RpdGxlX3NjcmVlbi5qcyIsImltcG9ydCBlZmZlY3RzIGZyb20gJy4vZWZmZWN0cyc7XG5cbmxldCBtYWtlRWZmZWN0ID0gZnVuY3Rpb24gKGVmZmVjdE5hbWUsIG5vZGUsIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiBfLmludm9rZShlZmZlY3RzLCBlZmZlY3ROYW1lLCBub2RlLCBvcHRzKTtcbn07XG5cbmlmICghd2luZG93LkNNV04pIHdpbmRvdy5DTVdOID0ge307XG5pZiAoIXdpbmRvdy5DTVdOLm1ha2VFZmZlY3QpIHdpbmRvdy5DTVdOLm1ha2VFZmZlY3QgPSBtYWtlRWZmZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2VmZmVjdHMvaW5kZXguanMiLCJpbXBvcnQgZmlyZXdvcmtzIGZyb20gJy4vZmlyZXdvcmtzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGZpcmV3b3Jrc1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9lZmZlY3RzL2VmZmVjdHMuanMiLCIvLyBjb2RlIHRha2VuIGZyb20gaHR0cDovL2NvZGVwZW4uaW8vaGFpZGFuZy9wZW4vZUJvcXl3XG5cbmNsYXNzIEZpcmV3b3JrcyB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgb3B0cykge1xuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQ0FOVkFTJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBub2RlLm9mZnNldEhlaWdodDtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBsZXQgcGF0ID0gJyMwMDAnO1xuXG4gICAgICAgIGlmIChvcHRzLmJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgbGV0IHRlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGxldCB0Q3R4ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuXG4gICAgICAgICAgICB0Q3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICBvcHRzLmJhY2tncm91bmRJbWFnZSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgb3B0cy5iYWNrZ3JvdW5kSW1hZ2UubmF0dXJhbFdpZHRoLFxuICAgICAgICAgICAgICAgIG9wdHMuYmFja2dyb3VuZEltYWdlLm5hdHVyYWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHRlbXBDYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHBhdCA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRlbXBDYW52YXMsICdyZXBlYXQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLmJhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgcGF0ID0gb3B0cy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNpemVcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gbm9kZS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICBjdHgucmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdDtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICAgICAgICAvLyBpbml0XG4gICAgICAgIGN0eC5yZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXQ7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIC8vIG9iamVjdHNcbiAgICAgICAgbGV0IGxpc3RGaXJlID0gW107XG4gICAgICAgIGxldCBsaXN0RmlyZXdvcmsgPSBbXTtcbiAgICAgICAgbGV0IGZpcmVOdW1iZXIgPSAxMDtcbiAgICAgICAgbGV0IGNlbnRlciA9IHsgeDogY2FudmFzLndpZHRoIC8gMiwgeTogY2FudmFzLmhlaWdodCAvIDIgfTtcbiAgICAgICAgbGV0IHJhbmdlID0gMTAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpcmVOdW1iZXI7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmUgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5yYW5kb20oKSAqIHJhbmdlIC8gMiAtIHJhbmdlIC8gNCArIGNlbnRlci54LFxuICAgICAgICAgICAgICAgIHk6IE1hdGgucmFuZG9tKCkgKiByYW5nZSAqIDIgKyBjYW52YXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNpemU6IE1hdGgucmFuZG9tKCkgKyA0LjUsXG4gICAgICAgICAgICAgICAgZmlsbDogJyNmZDEnLFxuICAgICAgICAgICAgICAgIHZ4OiBNYXRoLnJhbmRvbSgpIC0gMC41LFxuICAgICAgICAgICAgICAgIHZ5OiAtKE1hdGgucmFuZG9tKCkgKyA0KSxcbiAgICAgICAgICAgICAgICBheDogTWF0aC5yYW5kb20oKSAqIDAuMDIgLSAwLjAxLFxuICAgICAgICAgICAgICAgIGZhcjogTWF0aC5yYW5kb20oKSAqIHJhbmdlICsgKGNlbnRlci55IC0gcmFuZ2UpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZS5iYXNlID0ge1xuICAgICAgICAgICAgICAgIHg6IGZpcmUueCxcbiAgICAgICAgICAgICAgICB5OiBmaXJlLnksXG4gICAgICAgICAgICAgICAgdng6IGZpcmUudnhcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxpc3RGaXJlLnB1c2goZmlyZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvb3AgPSB0aGlzLmxvb3AuYmluZCh0aGlzLCBvcHRzLCBwYXQsIGNhbnZhcywgY3R4LCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrLCBmaXJlTnVtYmVyLCByYW5nZSk7XG5cbiAgICAgICAgdGhpcy5sb29wKCk7XG5cbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgfVxuXG4gICAgbG9vcChvcHRzLCBwYXQsIGNhbnZhcywgY3R4LCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrLCBmaXJlTnVtYmVyLCByYW5nZSkge1xuICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcCk7XG4gICAgICAgIHRoaXMudXBkYXRlKG9wdHMsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmssIGZpcmVOdW1iZXIsIHJhbmdlKTtcbiAgICAgICAgdGhpcy5kcmF3KG9wdHMsIHBhdCwgY2FudmFzLCBjdHgsIGxpc3RGaXJlLCBsaXN0RmlyZXdvcmspO1xuICAgIH1cblxuICAgIHJhbmRDb2xvcigpIHtcbiAgICAgICAgbGV0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgICAgICBsZXQgZyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG4gICAgICAgIGxldCBiID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbiAgICAgICAgcmV0dXJuIGByZ2IoJHtyfSwgJHtnfSwgJHtifSlgO1xuICAgIH1cblxuICAgIHVwZGF0ZShvcHRzLCBsaXN0RmlyZSwgbGlzdEZpcmV3b3JrLCBmaXJlTnVtYmVyLCByYW5nZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RGaXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyZSA9IGxpc3RGaXJlW2ldO1xuXG4gICAgICAgICAgICBpZiAoZmlyZS55IDw9IGZpcmUuZmFyKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FzZSBhZGQgZmlyZXdvcmtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLnJhbmRDb2xvcigpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZmlyZU51bWJlciAqIDU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyZXdvcmsgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBmaXJlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBmaXJlLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBNYXRoLnJhbmRvbSgpICsgNC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB2eDogTWF0aC5yYW5kb20oKSAqIDE1IC0gNy41LFxuICAgICAgICAgICAgICAgICAgICAgICAgdnk6IE1hdGgucmFuZG9tKCkgKiAtMTUgKyA0LjUsXG4gICAgICAgICAgICAgICAgICAgICAgICBheTogMC4wNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogcmFuZ2UgLyAyKSArIHJhbmdlIC8gMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmaXJld29yay5iYXNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlmZTogZmlyZXdvcmsubGlmZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IGZpcmV3b3JrLnNpemVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdEZpcmV3b3JrLnB1c2goZmlyZXdvcmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgIGZpcmUueSA9IGZpcmUuYmFzZS55O1xuICAgICAgICAgICAgICAgIGZpcmUueCA9IGZpcmUuYmFzZS54O1xuICAgICAgICAgICAgICAgIGZpcmUudnggPSBmaXJlLmJhc2Uudng7XG4gICAgICAgICAgICAgICAgZmlyZS5heCA9IE1hdGgucmFuZG9tKCkgKiAwLjAyIC0gMC4wMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZS54ICs9IGZpcmUudng7XG4gICAgICAgICAgICBmaXJlLnkgKz0gZmlyZS52eTtcbiAgICAgICAgICAgIGZpcmUudnggKz0gZmlyZS5heDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBsaXN0RmlyZXdvcmsubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBmaXJld29yayA9IGxpc3RGaXJld29ya1tpXTtcbiAgICAgICAgICAgIGlmIChmaXJld29yaykge1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLnggKz0gZmlyZXdvcmsudng7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsueSArPSBmaXJld29yay52eTtcbiAgICAgICAgICAgICAgICBmaXJld29yay52eSArPSBmaXJld29yay5heTtcbiAgICAgICAgICAgICAgICBmaXJld29yay5hbHBoYSA9IGZpcmV3b3JrLmxpZmUgLyBmaXJld29yay5iYXNlLmxpZmU7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsuc2l6ZSA9IGZpcmV3b3JrLmFscGhhICogZmlyZXdvcmsuYmFzZS5zaXplO1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrLmFscGhhID0gZmlyZXdvcmsuYWxwaGEgPiAwLjYgPyAxIDogZmlyZXdvcmsuYWxwaGE7XG5cbiAgICAgICAgICAgICAgICBmaXJld29yay5saWZlLS07XG4gICAgICAgICAgICAgICAgaWYgKGZpcmV3b3JrLmxpZmUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0RmlyZXdvcmsuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcob3B0cywgcGF0LCBjYW52YXMsIGN0eCwgbGlzdEZpcmUsIGxpc3RGaXJld29yaykge1xuICAgICAgICAvLyBjbGVhclxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xODtcbiAgICAgICAgY3R4LnJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdDtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAvLyByZS1kcmF3XG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc2NyZWVuJztcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0RmlyZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmUgPSBsaXN0RmlyZVtpXTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoZmlyZS54LCBmaXJlLnksIGZpcmUuc2l6ZSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpcmUuZmlsbDtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RGaXJld29yay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpcmV3b3JrID0gbGlzdEZpcmV3b3JrW2ldO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gZmlyZXdvcmsuYWxwaGE7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKGZpcmV3b3JrLngsIGZpcmV3b3JrLnksIGZpcmV3b3JrLnNpemUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaXJld29yay5maWxsO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChub2RlLCBvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBGaXJld29ya3Mobm9kZSwgb3B0cyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvZWZmZWN0cy9maXJld29ya3MuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdoaS10aGVyZScsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhpIHRoZXJlITxici8+XG4gICAgICAgICAgICAgICAgSSdtIGhlcmUgdG88YnIvPlxuICAgICAgICAgICAgICAgIHRlYWNoIHlvdSBhYm91dDxici8+XG4gICAgICAgICAgICAgICAgc29ydGluZyB3YXN0ZSBhdDxici8+XG4gICAgICAgICAgICAgICAgeW91ciBzY2hvb2whXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGlUaGVyZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaGlfdGhlcmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IENIQVJBQ1RFUiA9IGAke0NNV04uTUVESUEuSU1BR0V9Z3JlZW50ZWFtY2hhcmFjLnBuZ2A7XG5jb25zdCBGUkFNRSA9IGAke0NNV04uTUVESUEuRlJBTUV9ZnJhbWUuMDEucG5nYDtcblxubGV0IHJlbmRlclZPID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMudm8pIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgdHlwZT1cInZvaWNlT3ZlclwiXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuVk99JHtvcHRzLnZvfS5tcDNgfVxuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgcmVuZGVyU0ZYID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMuc2Z4KSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgcmVmPVwic3RhcnRcIlxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH0ke29wdHMuc2Z4fS5tcDNgfVxuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgcmVuZGVySW1hZ2UgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIGlmIChvcHRzLnJlbmRlckltYWdlID09PSBmYWxzZSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImNoYXJhY3RlclwiIHNyYz17b3B0cy5pbWFnZSB8fCBDSEFSQUNURVJ9IC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9e29wdHMuaWR9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e29wdHMuYmFja2dyb3VuZEF1ZGlvfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpbmZvJywgb3B0cy5jbGFzc05hbWUpfVxuICAgICAgICA+XG4gICAgICAgICAgICB7cmVuZGVyVk8ob3B0cyl9XG4gICAgICAgICAgICB7cmVuZGVyU0ZYKG9wdHMpfVxuICAgICAgICAgICAge3JlbmRlckltYWdlKG9wdHMpfVxuICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e0ZSQU1FfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgIHtvcHRzLmNvbnRlbnR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9lbnRcbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17W10uY29uY2F0KG9wdHMuZXh0cmFzIHx8IFtdKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2luZm9fc2NyZWVuX2NvbXBvbmVudC5qcyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmltcG9ydCBpdGVtc1JlY3ljbGUgZnJvbSAnLi9pdGVtc19yZWN5Y2xlJztcblxubGV0IGF1ZGlvUmVmcyA9IF8udW5pcShfLm1hcChpdGVtc1JlY3ljbGUsIHYgPT5cbiAgICBfLmtlYmFiQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKVxuKTtcblxudmFyIGFycmF5T2ZBdWRpbyA9IF8ubWFwKGF1ZGlvUmVmcywgKHYsIGspID0+XG4gICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICB0eXBlPVwidm9pY2VPdmVyXCJcbiAgICAgICAgcmVmPXt2fVxuICAgICAgICBrZXk9e2t9XG4gICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5HQU1FICsgJ3NvdW5kLWFzc2V0cy9fdm9zaXRlbXMvJyArIHZ9Lm1wM2B9XG4gICAgICAgIGNvbXBsZXRlXG4gICAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdrZXktaXMtc29ydGluZycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3JpZ2h0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgVGhlIGtleSBpcyBTT1JUSU5HITxici8+XG4gICAgICAgICAgICAgICAgVGhlcmUgYXJlIDUgV0FZUzxici8+XG4gICAgICAgICAgICAgICAgeW91IGNhbiBzb3J0PGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgZm9vZCB3YXN0ZTxici8+XG4gICAgICAgICAgICAgICAgYXQgeW91ciBzY2hvb2wuLi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdUaGVLZXknLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzYnLFxuICAgICAgICBleHRyYXM6IGFycmF5T2ZBdWRpbyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9rZXlfaXNfc29ydGluZ19zY3JlZW4uanMiLCJsZXQgYmluID0gJ3JlY3ljbGUnO1xubGV0IG5hbWVzID0gW1xuICAgICdhbHVtaW51bS1iZXZlcmFnZS1jYW4nLFxuICAgICdhbHVtaW51bS1wYW4nLFxuICAgICdjYXJkYm9hcmQtYm94JyxcbiAgICAnY2xlYW4tYWx1bWludW0tZm9pbCcsXG4gICAgJ2VtcHR5LWFsdW1pbnVtLWNhbi0xJyxcbiAgICAnZW1wdHktYWx1bWludW0tY2FuLTInLFxuICAgICdlbXB0eS1hbHVtaW51bS1jYW4tMycsXG4gICAgJ2VtcHR5LWFsdW1pbnVtLWNhbi00JyxcbiAgICAnZW1wdHktYm94LW9mLWNyYWNrZXJzLTMnLFxuICAgICdlbXB0eS1jaG9jb2xhdGUtbWlsay1jYXJ0b24tNCcsXG4gICAgJ2VtcHR5LWNvb2tpZS1ib3gtMScsXG4gICAgJ2VtcHR5LWNvb2tpZS1ib3gtMicsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uJyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tMicsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTUnLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi02JyxcbiAgICAnZW1wdHktbWlsay1jYXJ0b24tMTInLFxuICAgICdlbXB0eS1taWxrLWNhcnRvbi0xMycsXG4gICAgJ2VtcHR5LW1pbGstY2FydG9uLTE0JyxcbiAgICAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMScsXG4gICAgJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTInLFxuICAgICdlbXB0eS1wbGFzdGljLWJvdHRsZS0zJyxcbiAgICAnZW1wdHktcGxhc3RpYy1wYWNrYWdlJyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci0yJyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci0zJyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci01JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci02JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci03JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci04JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci05JyxcbiAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lci0xMCcsXG4gICAgJ21ldGFsLWZvb2QtY2FuLTEnLFxuICAgICdtZXRhbC1mb29kLWNhbi0yJyxcbiAgICAnbWV0YWwtZm9vZC1jYW4tMycsXG4gICAgJ21ldGFsLWZvb2QtY2FuLTUnLFxuICAgICdwYXBlci1mb2xkZXInLFxuICAgICdwYXBlci1wYWNrYWdpbmcnLFxuICAgICdwYXBlci1wYWNrYWdpbmctMScsXG4gICAgJ3BhcGVyLXBhY2thZ2luZy04JyxcbiAgICAncGxhc3RpYy1jdXAtMScsXG4gICAgJ3BsYXN0aWMtY3VwLTInLFxuICAgICdwbGFzdGljLWN1cC0zJyxcbiAgICAncGxhc3RpYy1jdXAtNCcsXG4gICAgJ3BsYXN0aWMtY3VwLTUnLFxuICAgICdwbGFzdGljLWN1cC02JyxcbiAgICAncGxhc3RpYy1jdXAtNycsXG4gICAgJ3BsYXN0aWMtbGlkcy0xJyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctMicsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTQnLFxuICAgICdwbGFzdGljLXBhY2thZ2luZy01JyxcbiAgICAncGxhc3RpYy1wYWNrYWdpbmctNicsXG4gICAgJ3BsYXN0aWMtcGFja2FnaW5nLTcnLFxuICAgICd3cmFwcGluZy1wYXBlcicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcChuYW1lcywgKG5hbWUsIGZyYW1lKSA9PiAoe1xuICAgIG5hbWUsXG4gICAgYmluLFxuICAgIGZyYW1lLFxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2l0ZW1zX3JlY3ljbGUuanMiLCJpbXBvcnQgaXRlbUxhbmRmaWxsIGZyb20gJy4vaXRlbXNfbGFuZGZpbGwnO1xuXG5sZXQgYmluTmFtZXMgPSBbXG4gICAgJ3JlY3ljbGUnLFxuICAgICdsYW5kZmlsbCcsXG4gICAgJ2xpcXVpZHMnLFxuICAgICdjb21wb3N0JyxcbiAgICAnZm9vZC1zaGFyZScsXG5dO1xuXG5sZXQgcmV2ZWFsQ29udGVudCA9IHtcbiAgICByZWN5Y2xlOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgUkVDWUNMSU5HIGl0ZW1zIGFyZSB0aG9zZTxici8+XG4gICAgICAgICAgICB0aGF0IGNhbiBiZSByZXByb2Nlc3NlZCBhbmQ8YnIvPlxuICAgICAgICAgICAgbWFkZSBpbnRvIG5ldyBwcm9kdWN0cy48YnIvPlxuICAgICAgICAgICAgUGFwZXIsIG1ldGFsLCBhbmQgcGxhc3RpYyBhcmU8YnIvPlxuICAgICAgICAgICAgY29tbW9uIHJlY3ljbGFibGUgbWF0ZXJpYWxzLlxuICAgICAgICA8L3A+XG4gICAgKSxcbiAgICBsYW5kZmlsbDogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIExBTkRGSUxMIGl0ZW1zIGFyZSB0aGluZ3MgdGhhdDxici8+XG4gICAgICAgICAgICBqdXN0IGNhbid0IGJlIHJldXNlZCBpbiBhbnkgd2F5Ljxici8+XG4gICAgICAgICAgICBQdXQgeW91ciB0aGlua2luZyBjYXAgb24hPGJyLz5cbiAgICAgICAgICAgIExvb2sgZm9yIHdheXMgdG8gbWFrZTxici8+XG4gICAgICAgICAgICBkaWZmZXJlbnQgY2hvaWNlcyB0aGF0PGJyLz5cbiAgICAgICAgICAgIHJlZHVjZSBsYW5kZmlsbCB3YXN0ZS5cbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgbGlxdWlkczogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIExJUVVJRFMgbXVzdCBiZSBzZXBhcmF0ZWQ8YnIvPlxuICAgICAgICAgICAgZnJvbSB0aGVpciBjb250YWluZXJzITxici8+XG4gICAgICAgICAgICBUaGlzIGFsbG93cyBmb3IgdGhlIGNvbnRhaW5lcnM8YnIvPlxuICAgICAgICAgICAgdG8gYmUgcHJvcGVybHkgcHJvY2Vzc2VkLjxici8+XG4gICAgICAgICAgICBHZXQgcG91cmluZyFcbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgY29tcG9zdDogKFxuICAgICAgICA8cD5cbiAgICAgICAgICAgIENPTVBPU1RJTkcgaXM8YnIvPlxuICAgICAgICAgICAgZmVydGlsaXplciBpbiB0aGUgbWFraW5nITxici8+XG4gICAgICAgICAgICBJdCdzIG1hZGUgZnJvbSBmb29kIHNjcmFwczxici8+XG4gICAgICAgICAgICBhbmQgb3JnYW5pYyBtYXRlcmlhbHM8YnIvPlxuICAgICAgICAgICAgdGhhdCBkZWNheSBhbmQgYmVjb21lPGJyLz5cbiAgICAgICAgICAgIGZvb2QgZm9yIHBsYW50cyFcbiAgICAgICAgPC9wPlxuICAgICksXG4gICAgJ2Zvb2Qtc2hhcmUnOiAoXG4gICAgICAgIDxwPlxuICAgICAgICAgICAgRk9PRCBTSEFSSU5HIGlzPGJyLz5cbiAgICAgICAgICAgIGEgZ3JlYXQgd2F5IHRvIGtlZXA8YnIvPlxuICAgICAgICAgICAgZnJvbSB3YXN0aW5nIGZvb2QhPGJyLz5cbiAgICAgICAgICAgIExlYXZlIGl0ZW1zIHRoYXQgb3RoZXJzPGJyLz5cbiAgICAgICAgICAgIGNhbiBtYWtlIGludG8gYSBzbmFjayFcbiAgICAgICAgPC9wPlxuICAgICksXG59O1xuXG5sZXQgcmV2ZWFsVk9zID0ge1xuICAgIHJlY3ljbGU6ICdSZWN5Y2xpbmdNYXRlcmlhbHMnLFxuICAgIGxhbmRmaWxsOiAnVGhpbmtpbmdDYXAnLFxuICAgIGxpcXVpZHM6ICdHZXRQb3VyaW5nJyxcbiAgICBjb21wb3N0OiAnQ29tcG9zdGluZ0V4cGxhaW4nLFxuICAgICdmb29kLXNoYXJlJzogJ0Zvb2RTaGFyaW5nRXhwbGFpbicsXG59O1xuXG5sZXQgYmluQ29tcG9uZW50cyA9IF8ubWFwKGJpbk5hbWVzLCBiaW4gPT5cbiAgICA8c2tvYXNoLkNvbXBvbmVudCBjbGFzc05hbWU9e2Jpbn0gbWVzc2FnZT17YmlufSAvPlxuKTtcblxubGV0IHJldmVhbExpc3QgPSBfLm1hcChyZXZlYWxDb250ZW50LCAoY29udGVudCwgcmVmKSA9PlxuICAgIDxza29hc2guQ29tcG9uZW50IHJlZj17cmVmfT5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgPC9za29hc2guQ29tcG9uZW50PlxuKTtcblxubGV0IG1lZGlhQ29sbGVjdGlvbkxpc3QgPSBfLm1hcChyZXZlYWxWT3MsIChjb250ZW50LCByZWYpID0+XG4gICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwidm9pY2VPdmVyXCIgcmVmPXtyZWZ9IHNyYz17YCR7Q01XTi5NRURJQS5WTyArIGNvbnRlbnR9Lm1wM2B9IC8+XG4pO1xuXG5sZXQgaW1hZ2VTcmNzID0gW1xuICAgIHtzcmM6IGAke0NNV04uTUVESUEuSU1BR0V9bGlnaHRzLnBuZ2B9LFxuICAgIHtzcmM6IGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5iaW5zLnBuZ2B9LFxuICAgIHtzcmM6IGAke0NNV04uTUVESUEuU1BSSVRFfXNwcml0ZS5idG4ucG5nYH0sXG5dO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1MYW5kZmlsbCwgdiA9PlxuICAgIF8ua2ViYWJDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpXG4pO1xuXG5sZXQgYXJyYXlPZkF1ZGlvID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT5cbiAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9e3Z9XG4gICAgICAgIGtleT17a31cbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYH1cbiAgICAgICAgY29tcGxldGVcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJsaWdodHNcIlxuICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPVwiQktHNlwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxza29hc2guUmVwZWF0ZXJcbiAgICAgICAgICAgICAgICBhbW91bnQ9e2ltYWdlU3Jjcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgaXRlbT17PHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiAvPn1cbiAgICAgICAgICAgICAgICBwcm9wcz17aW1hZ2VTcmNzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlnaHRzXCJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbj17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbnNcIlxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtiaW5Db21wb25lbnRzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtza29hc2gubWl4aW5zLlNlbGVjdGFibGVSZXZlYWwocHJvcHMsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlczogYmluQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICByZXZlYWxzOiByZXZlYWxMaXN0LFxuICAgICAgICAgICAgICAgIG1lZGlhOiBtZWRpYUNvbGxlY3Rpb25MaXN0LFxuICAgICAgICAgICAgICAgIFNlbGVjdGFibGVQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogJ0hJR0hMSUdIVEVEJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxza29hc2guTWVkaWFDb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgcGxheT17Xy5nZXQocHJvcHMsICdkYXRhLnNlbGVjdGFibGUudGFyZ2V0JykgJiYgJ2NsaWNrJ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwiY2xpY2tcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNsaWNrUmVjQnV0dG9uLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JbmZvRnJhbWVNb3ZlMS5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYUNvbGxlY3Rpb24+XG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvZW50XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgY29tcGxldGU9e3RydWV9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e1tdLmNvbmNhdChhcnJheU9mQXVkaW8gfHwgW10pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbGlnaHRzX3NjcmVlbi5qcyIsImxldCBiaW4gPSAnbGFuZGZpbGwnO1xubGV0IG5hbWVzID0gW1xuICAgICdhcHBsZXNhdWNlLXBvdWNoLTEnLFxuICAgICdhcHBsZXNhdWNlLXBvdWNoLTInLFxuICAgICdhcHBsZXNhdWNlLXBvdWNoLTMnLFxuICAgICdhcHBsZXNhdWNlLXBvdWNoLTQnLFxuICAgICdiYWctb2Ytd3JhcHBlcnMnLFxuICAgICdidWJibGUtd3JhcCcsXG4gICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlci0xJyxcbiAgICAnYnVycml0by13cmFwcGVyLTEnLFxuICAgICdidXJyaXRvLXdyYXBwZXItMicsXG4gICAgJ2J1cnJpdG8td3JhcHBlci0zJyxcbiAgICAnYnVycml0by13cmFwcGVyLTQnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItMScsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci0yJyxcbiAgICAnY2VyZWFsLWxpZC13cmFwcGVyLTMnLFxuICAgICdjZXJlYWwtbGlkLXdyYXBwZXItNCcsXG4gICAgJ2NlcmVhbC1saWQtd3JhcHBlci01JyxcbiAgICAnZW1wdHktYmFnLW9mLWNoaXBzJyxcbiAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICdlbXB0eS1jaGlwLWJhZy0yJyxcbiAgICAnZW1wdHktY2hpcC1iYWctMycsXG4gICAgJ2VtcHR5LWNoaXAtYmFnLTQnLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTEnLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTInLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTMnLFxuICAgICdlbXB0eS1mcnVpdC1qdWljZS1wbGFzdGljLTQnLFxuICAgICdlbXB0eS1zbmFjay13cmFwcGVyLTEnLFxuICAgICdlbXB0eS1zbmFjay13cmFwcGVyLTInLFxuICAgICdlbXB0eS1jcmFja2VyLXdyYXBwZXItMycsXG4gICAgJ2VuZXJneS1iYXItd3JhcHBlcicsXG4gICAgJ2VuZXJneS1iYXItd3JhcHBlci0yJyxcbiAgICAnZnJ1aXQtZHJpbmstZW1wdHktcG91Y2gnLFxuICAgICdmcnVpdC1zbmFjay13cmFwcGVyLTInLFxuICAgICdmcnVpdC1zbmFjay13cmFwcGVyLTMnLFxuICAgICdnaWZ0LXJpYmJvbnMnLFxuICAgICdncmFoYW0tY29va2llLXdyYXBwZXInLFxuICAgICdncmFoYW0tY29va2llLXdyYXBwZXItMicsXG4gICAgJ2p1aWNlLWJveCcsXG4gICAgJ2p1aWNlLWJveC0yJyxcbiAgICAnanVpY2UtYm94LTMnLFxuICAgICdqdWljZS1ib3gtNCcsXG4gICAgJ2p1aWNlLWJveC01JyxcbiAgICAncGxhc3RpYy1iYWdnaWUnLFxuICAgICdwbGFzdGljLWJhZ2dpZS0yJyxcbiAgICAncGxhc3RpYy1mb3JrJyxcbiAgICAncGxhc3RpYy1rbmlmZScsXG4gICAgJ3BsYXN0aWMtc3Bvb24nLFxuICAgICdwbGFzdGljLXNwb3JrJyxcbiAgICAncGxhc3RpYy1zdHJhd3MnLFxuICAgICdyZWQtZ2lmdC1ib3cnLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTEnLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTInLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTMnLFxuICAgICdzdHlyb2ZvYW0tY29udGFpbmVyLTUnLFxuICAgICdzdHlyb2ZvYW0tc291cC1jdXAnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19sYW5kZmlsbC5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zQ29tcG9zdCwgdiA9PlxuICAgIF8ua2ViYWJDYXNlKF8ucmVwbGFjZSh2Lm5hbWUsIC9cXGQrL2csICcnKSkpXG4pO1xuXG52YXIgYXJyYXlPZkF1ZGlvID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT5cbiAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgIHR5cGU9XCJ2b2ljZU92ZXJcIlxuICAgICAgICByZWY9e3Z9XG4gICAgICAgIGtleT17a31cbiAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYH1cbiAgICAgICAgY29tcGxldGVcbiAgICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2ZpdmUtd2F5cycsXG4gICAgICAgIGNsYXNzTmFtZTogJ3JpZ2h0JyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2l0aCA1IHdheXM8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHNvcnQgbGV0J3MgdGVzdDxici8+XG4gICAgICAgICAgICAgICAgeW91ciBrbm93bGVkZ2UhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnNVdheXMnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzYnLFxuICAgICAgICBleHRyYXM6IGFycmF5T2ZBdWRpbyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9maXZlX3dheXNfc2NyZWVuLmpzIiwibGV0IGJpbiA9ICdjb21wb3N0JztcbmxldCBuYW1lcyA9IFtcbiAgICAnYXBwbGUtY29yZScsXG4gICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAnY2Fycm90LXN0aWNrcycsXG4gICAgJ2NlbGVyeS1zdGljaycsXG4gICAgJ2NoaWNrZW4tbGVnJyxcbiAgICAnY29mZmVlLWN1cC0yJyxcbiAgICAnY29mZmVlLWN1cCcsXG4gICAgJ2NvZmZlZS1ncm91bmRzJyxcbiAgICAnZGlydHktcGFwZXItZm9vZC1jb250YWluZXInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTEnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTInLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTMnLFxuICAgICdlbXB0eS1yYWlzaW4tYm94LTQnLFxuICAgICdmb29kLXNvaWxlZC1wYXBlci1wbGF0ZScsXG4gICAgJ2hhbS1zYW5kd2ljaCcsXG4gICAgJ25hcGtpbi0xJyxcbiAgICAnbmFwa2luLTInLFxuICAgICduYXBraW4tMycsXG4gICAgJ25hcGtpbi00JyxcbiAgICAnb3JhbmdlLXNsaWNlJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzLTEnLFxuICAgICdwZW5jaWwtc2hhdmluZ3MtMicsXG4gICAgJ3BlbmNpbC1zaGF2aW5ncy0zJyxcbiAgICAncGVuY2lsLXNoYXZpbmdzJyxcbiAgICAncGl6emEtY3J1c3QnLFxuICAgICdzb2lsZWQtcGFwZXItdHJheS0xJyxcbiAgICAnc29pbGVkLXBhcGVyLXRyYXktMicsXG4gICAgJ3NvaWxlZC1wYXBlci10cmF5LTMnLFxuICAgICdzb2xpZWQtcGFwZXItdHJheS00JyxcbiAgICAndGVhYmFnJyxcbiAgICAndXNlZC1wYXBlci1mb29kLWNvbnRhaW5lcicsXG4gICAgJ3VzZWQtcGFwZXItc2FuZHdpY2gtd3JhcHBlci0xJyxcbiAgICAndXNlZC1wYXBlci1zYW5kd2ljaC13cmFwcGVyLTInLFxuICAgICd1c2VkLXBhcGVyLXNhbmR3aWNoLXdyYXBwZXItNCcsXG4gICAgJ3VzZWQtdGFrZW91dC1jb250YWluZXJzJyxcbiAgICAnd2hpdGUtcGFwZXItdG93ZWwtc2hlZXQnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19jb21wb3N0LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmxldCBsZXZlbEtleXMgPSBbXG4gICAgJ3JlY3ljbGluZ0NoYW1waW9uJyxcbiAgICAncHJpY2VsZXNzUG91cmVyJyxcbiAgICAnZmFudGFzdGljRm9vZFNoYXJlcicsXG4gICAgJ2R5bmFtaWNEaXZlcnRlcicsXG4gICAgJ21hc3RlclNvcnRlcicsXG5dO1xuXG5sZXQgbGV2ZWxOYW1lcyA9IFtcbiAgICA8cD5SZWN5Y2xpbmc8YnIvPkNoYW1waW9uPC9wPixcbiAgICA8cD5QcmljZWxlc3M8YnIvPlBvdXJlcjwvcD4sXG4gICAgPHA+RmFudGFzdGljPGJyLz5Gb29kIFNoYXJlcjwvcD4sXG4gICAgPHA+RHluYW1pYzxici8+RGl2ZXJ0ZXI8L3A+LFxuICAgIDxwPk1hc3Rlcjxici8+U29ydGVyPC9wPixcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChsZXZlbE51bWJlcikge1xuICAgIGxldCBsZXZlbEludCA9IF8uZmxvb3IobGV2ZWxOdW1iZXIpO1xuICAgIGxldCBsZXZlbEtleSA9IGxldmVsS2V5c1tsZXZlbEludCAtIDFdO1xuICAgIGxldCBsZXZlbE5hbWUgPSBsZXZlbE5hbWVzW2xldmVsSW50IC0gMV07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIGxldCBsZXZlbERhdGEgPSBfLmdldChwcm9wcywgYGdhbWVTdGF0ZS5kYXRhLiR7bGV2ZWxLZXl9LmxldmVsc2AsIHt9KTtcbiAgICAgICAgbGV0IHJlcGVhdGVyUHJvcHMgPSBfLm1hcChfLmdldChwcm9wcywgJ2RhdGEuZWFybmVkJyksIChsZXZlbCwgaW5kZXgpID0+XG4gICAgICAgICAgICAoe2NsYXNzTmFtZTogbGV2ZWwucGxheWluZyAmJiBfLmdldChsZXZlbERhdGEsIGAke2luZGV4fS5jb21wbGV0ZWApID8gJ2Vhcm5lZCcgOiAnJ30pXG4gICAgICAgICk7XG4gICAgICAgIGxldCBhbGxFYXJuZWQgPSByZXBlYXRlclByb3BzLmxlbmd0aCA9PT0gNSAmJiBfLmV2ZXJ5KHJlcGVhdGVyUHJvcHMsIHYgPT4gdi5jbGFzc05hbWUpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBpZD17YHByZS1sZXZlbC0ke2xldmVsTnVtYmVyfWB9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtsZXZlbEludH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhvcHRzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBBTExfRUFSTkVEOiBhbGxFYXJuZWQsXG4gICAgICAgICAgICAgICAgICAgIEFQUEVBUjogXy5nZXQocHJvcHMsICdkYXRhLmFwcGVhci5wbGF5aW5nJyksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5NZWRpYVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVRhcmdldD1cImFwcGVhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MZXZlbEFwcGVhci5tcDNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MZXZlbENvbXBsZXRlLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPixcbiAgICAgICAgICAgICAgICAgICAgXS5jb25jYXQoXG4gICAgICAgICAgICAgICAgICAgICAgICBfLm1hcChsZXZlbERhdGEsIChkYXRhLCBsZXZlbCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlUYXJnZXQ9e1snZWFybmVkJywgbGV2ZWxdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2Z4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1HZXRTdGFyLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVtZT17ZGF0YS5jb21wbGV0ZSA/IDEgOiAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkltYWdlIGNsYXNzTmFtZT1cImhpZGRlblwiIHNyYz17YCR7Q01XTi5NRURJQS5JTUFHRX1wdXJwbGUucmliYm9uLnBuZ2B9IC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzcmM9e2Ake0NNV04uTUVESUEuSU1BR0V9bHVnZ2FnZS5wbmdgfSAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2UgY2xhc3NOYW1lPVwiaGlkZGVuXCIgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1mbGlwcy5wbmdgfSAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guUmVwZWF0ZXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RhcnNcIlxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ9ezV9XG4gICAgICAgICAgICAgICAgICAgIHByb3BzPXtyZXBlYXRlclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+TGV2ZWwge2xldmVsSW50fTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIHtsZXZlbE5hbWV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3Nrb2FzaC5TY3JlZW4+XG4gICAgICAgICk7XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9sZXZlbF9zY3JlZW5fY29tcG9uZW50LmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLW9uZS1pbmZvJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc21hbGwnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBMZXQncyBzdGFydCB3aXRoIHNpbXBsZSBzb3J0aW5nPGJyLz5cbiAgICAgICAgICAgICAgICBvZiBSZWN5Y2xhYmxlcywgQ29tcG9zdGFibGVzPGJyLz5cbiAgICAgICAgICAgICAgICBhbmQgTGFuZGZpbGwgaXRlbXMuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIFB1c2ggdGhlIGNvcnJlY3QgYnV0dG9uIHRvIGxhbmQ8YnIvPlxuICAgICAgICAgICAgICAgIGl0ZW1zIGluIHRoZSBiaW4gdGhleSBiZWxvbmcgdG8uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnTGV0c1N0YXJ0JyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBzY29yZVRvV2luOiA2NjUsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2F0Y2hlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGVyLzAuNCc7XG5pbXBvcnQgTWFudWFsRHJvcHBlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEnO1xuXG5jb25zdCBQVFMgPSAncHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgaWYgKE1hdGguYWJzKHByb3BzLmdhbWVTdGF0ZS5jdXJyZW50U2NyZWVuSW5kZXggLSBwYXJzZUludChrZXksIDEwKSkgPiAyKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBpZD17YCR7b3B0cy5nYW1lTmFtZX0tJHtvcHRzLmxldmVsfWB9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtvcHRzLmdhbWVOdW1iZXJ9YH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNjcmVlblByb3BzO1xuICAgICAgICBsZXQgdGltZXJQcm9wcztcbiAgICAgICAgbGV0IHJldmVhbFByb3BzO1xuICAgICAgICBsZXQgc2VsZWN0YWJsZVByb3BzO1xuICAgICAgICBsZXQgZHJvcHBlclByb3BzO1xuICAgICAgICBsZXQgY2F0Y2hlclByb3BzO1xuICAgICAgICBsZXQgbGlmZVByb3BzO1xuICAgICAgICBsZXQgZXh0cmFDb21wb25lbnRzO1xuXG4gICAgICAgIGNvbnN0IExFVkVMX1BBVEggPSBgZ2FtZVN0YXRlLmRhdGEuJHtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKX0ubGV2ZWxzLiR7b3B0cy5sZXZlbH1gO1xuXG4gICAgICAgIGxldCBjYXRjaGFibGVzQXJyYXkgPSBvcHRzLmdldENhdGNoYWJsZXNBcnJheSgpO1xuXG4gICAgICAgIGxldCBiaW5Db21wb25lbnRzID0gXy5tYXAob3B0cy5iaW5OYW1lcywgbmFtZSA9PlxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQgY2xhc3NOYW1lPXtuYW1lfSBtZXNzYWdlPXtuYW1lfSAvPlxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBzY2FsZSA9IF8uZ2V0KHByb3BzLCAnZ2FtZVN0YXRlLnNjYWxlJywgMSk7XG4gICAgICAgIGxldCBzdGFydCA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5zdGFydGAsIGZhbHNlKTtcbiAgICAgICAgbGV0IGdhbWVDb21wbGV0ZSA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5jb21wbGV0ZWAsIGZhbHNlKTtcbiAgICAgICAgbGV0IGRyb3AgPSBfLmdldChwcm9wcywgJ2RhdGEubWFudWFsLWRyb3BwZXIuZHJvcCcsIGZhbHNlKTtcbiAgICAgICAgbGV0IGRyb3BDbGFzcyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5kcm9wQ2xhc3MnKTtcbiAgICAgICAgbGV0IHBpY2tVcCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5waWNrVXAnLCBmYWxzZSk7XG4gICAgICAgIGxldCBvblBpY2tVcCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5vblBpY2tVcCcpO1xuICAgICAgICBsZXQgc2VsZWN0SXRlbSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5zZWxlY3RJdGVtJyk7XG4gICAgICAgIGxldCBjYXRjaGFibGVSZWZzID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLnJlZnMnLCBbXSk7XG4gICAgICAgIGxldCBpdGVtUmVmID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ucmVmJyk7XG4gICAgICAgIGxldCByZW1vdmVJdGVtQ2xhc3NOYW1lID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ucmVtb3ZlQ2xhc3NOYW1lJyk7XG4gICAgICAgIGxldCBpdGVtVG9wID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0udG9wJywgMCkgLyBzY2FsZTtcbiAgICAgICAgbGV0IGl0ZW1MZWZ0ID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ubGVmdCcsIDApIC8gc2NhbGUgfHwgJ2F1dG8nO1xuICAgICAgICBsZXQgY2F1Z2h0ID0gXy5nZXQocHJvcHMsICdkYXRhLmNhdGNoZXIuY2F1Z2h0JywgJycpO1xuICAgICAgICBsZXQgcmV2ZWFsT3BlbiA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIGZhbHNlKTtcbiAgICAgICAgbGV0IHJldmVhbENsb3NlID0gXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5jbG9zZScsIGZhbHNlKTtcbiAgICAgICAgbGV0IHBsYXkgPSBfLmdldChwcm9wcywgJ2RhdGEucGxheScsIG51bGwpO1xuXG4gICAgICAgIGxldCBhdWRpb0FycmF5ID0gb3B0cy5nZXRBdWRpb0FycmF5KCk7XG5cbiAgICAgICAgaWYgKGl0ZW1SZWYpIGNhdGNoYWJsZVJlZnMgPSBbaXRlbVJlZl07XG5cbiAgICAgICAgb3B0cy5uZXh0ID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLm5leHQnLCBmYWxzZSk7XG4gICAgICAgIG9wdHMuaXRlbVJlZiA9IGl0ZW1SZWY7XG4gICAgICAgIG9wdHMuaXRlbU5hbWUgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5uYW1lJywgJycpO1xuICAgICAgICBvcHRzLml0ZW1OZXcgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5uZXcnLCBmYWxzZSk7XG4gICAgICAgIG9wdHMuaXRlbUNsYXNzTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5pdGVtLmNsYXNzTmFtZScpO1xuICAgICAgICBvcHRzLml0ZW1BbW91bnQgPSBfLmdldChwcm9wcywgJ2RhdGEuaXRlbS5hbW91bnQnLCAwKTtcbiAgICAgICAgb3B0cy5wb3VyID0gXy5nZXQocHJvcHMsICdkYXRhLml0ZW0ucG91cicsIGZhbHNlKTtcbiAgICAgICAgb3B0cy5zY29yZSA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5zY29yZWAsIDApO1xuICAgICAgICBvcHRzLmhpZ2hTY29yZSA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaWdoU2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5sZWZ0ID0gXy5nZXQocHJvcHMsICdkYXRhLm1hbnVhbC1kcm9wcGVyLmxlZnQnLCAwKTtcbiAgICAgICAgb3B0cy5oaXRzID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmhpdHNgLCAwKTtcbiAgICAgICAgb3B0cy50cnVja0NsYXNzTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS50cnVja0NsYXNzTmFtZScsICcnKTtcbiAgICAgICAgb3B0cy5zZWxlY3RhYmxlTWVzc2FnZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLm1lc3NhZ2UnLCAnJyk7XG4gICAgICAgIG9wdHMubW92ZUNsYXcgPSBfLmdldChwcm9wcywgJ2RhdGEubW92ZUNsYXcnLCBmYWxzZSk7XG4gICAgICAgIG9wdHMucGxheUF1ZGlvID0gKFxuICAgICAgICAgICAgcGxheSA/IHBsYXkgOlxuICAgICAgICAgICAgZHJvcCAmJiAhb3B0cy50cnVja0NsYXNzTmFtZSA/ICdkcm9wJyA6XG4gICAgICAgICAgICBwaWNrVXAgPyAncGlja1VwJyA6XG4gICAgICAgICAgICBvcHRzLm5leHQgPyAnbmV4dCcgOlxuICAgICAgICAgICAgb3B0cy5wb3VyID8gJ3BvdXInIDpcbiAgICAgICAgICAgIG9wdHMubmV4dCA/ICdjb3JyZWN0JyA6XG4gICAgICAgICAgICByZXZlYWxPcGVuID09PSAncmVzb3J0JyA/ICdyZXNvcnQnIDpcbiAgICAgICAgICAgIG9wdHMuaXRlbU5ldyA/IF8ua2ViYWJDYXNlKG9wdHMuaXRlbU5hbWUpIDpcbiAgICAgICAgICAgIGRyb3BDbGFzcyA9PT0gJ1RSQVktU1RBQ0tJTkcnICYmIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ3RyYXknKSA/ICd0cmF5JyA6XG4gICAgICAgICAgICBvcHRzLml0ZW1OYW1lID8gJ3NlbGVjdCcgOiBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgc2NyZWVuUHJvcHMgPSBvcHRzLmdldFNjcmVlblByb3BzKG9wdHMpO1xuICAgICAgICB0aW1lclByb3BzID0gb3B0cy5nZXRUaW1lclByb3BzKG9wdHMpO1xuICAgICAgICByZXZlYWxQcm9wcyA9IG9wdHMuZ2V0UmV2ZWFsUHJvcHMob3B0cyk7XG4gICAgICAgIHNlbGVjdGFibGVQcm9wcyA9IG9wdHMuZ2V0U2VsZWN0YWJsZVByb3BzKG9wdHMpO1xuICAgICAgICBkcm9wcGVyUHJvcHMgPSBvcHRzLmdldERyb3BwZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgY2F0Y2hlclByb3BzID0gb3B0cy5nZXRDYXRjaGVyUHJvcHMob3B0cyk7XG4gICAgICAgIGxpZmVQcm9wcyA9IG9wdHMuZ2V0TGlmZVByb3BzKG9wdHMpO1xuICAgICAgICBleHRyYUNvbXBvbmVudHMgPSBvcHRzLmdldEV4dHJhQ29tcG9uZW50cyhvcHRzKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake29wdHMuZ2FtZU5hbWV9LSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17IWdhbWVDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89e2BCS0cke29wdHMuZ2FtZU51bWJlcn1gfVxuICAgICAgICAgICAgICAgIHsuLi5zY3JlZW5Qcm9wc31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsZXZlbC1zY29yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtvcHRzLnNjb3JlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtQVFN9XG4gICAgICAgICAgICAgICAgICAgIDwvc2tvYXNoLlNjb3JlPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlRpbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsOiBfLmdldChwcm9wcywgJ2RhdGEudGltZXIuZmluYWwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudERvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD1cIm1tOnNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ9e29wdHMudGltZW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXVzZT17cmV2ZWFsT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZT17IXJldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0YXJ0PXtzdGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aW1lclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2l0ZW0tbmFtZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFDVElWRTogb3B0cy5pdGVtTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGl0ZW1Ub3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBpdGVtTGVmdCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0cy5pdGVtTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNjb3JlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpZmVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9ezB9XG4gICAgICAgICAgICAgICAgICAgIGluY29ycmVjdD17b3B0cy5tYXhIaXRzfVxuICAgICAgICAgICAgICAgICAgICBjb3JyZWN0PXtvcHRzLmhpdHN9XG4gICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ubGlmZVByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPE1hbnVhbERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ9e29wdHMuZHJvcHBlckFtb3VudH1cbiAgICAgICAgICAgICAgICAgICAgZHJvcD17ZHJvcH1cbiAgICAgICAgICAgICAgICAgICAgcGlja1VwPXtwaWNrVXB9XG4gICAgICAgICAgICAgICAgICAgIG9uUGlja1VwPXtvblBpY2tVcH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dD17b3B0cy5uZXh0fVxuICAgICAgICAgICAgICAgICAgICBiaW49e1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5SYW5kb21pemVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluPXtjYXRjaGFibGVzQXJyYXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7b3B0cy5sZWZ0fXB4KWBcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2F1Z2h0PXtjYXVnaHR9XG4gICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzcz17ZHJvcENsYXNzfVxuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmPXtpdGVtUmVmfVxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3NOYW1lPXtvcHRzLml0ZW1DbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW1DbGFzc05hbWU9e3JlbW92ZUl0ZW1DbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEl0ZW09e3NlbGVjdEl0ZW19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5kcm9wcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2JpbnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBESVNBQkxFRDogIW9wdHMuaXRlbU5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2F0Y2hlclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVPblN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0PXtzdGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Y2tldD17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoYWJsZVJlZnM9e2NhdGNoYWJsZVJlZnN9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXVzZT17Y2F1Z2h0IHx8ICFzdGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZT17ZHJvcCB8fCBpdGVtUmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZUZyYWN0aW9uPXtvcHRzLmNvbGxpZGVGcmFjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5jYXRjaGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdGFibGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q9e2JpbkNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIHtleHRyYUNvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5SZXZlYWxcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhcmdldD1cInJldmVhbFwiXG4gICAgICAgICAgICAgICAgICAgIG9wZW5SZXZlYWw9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUmV2ZWFsPXtyZXZlYWxDbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ucmV2ZWFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmVzb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBwbGF5PXtvcHRzLnBsYXlBdWRpb31cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW49e2F1ZGlvQXJyYXl9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjaGVja1JlYWR5PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uUGxheT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdwbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHJvcHBlcl9nYW1lX2NvbXBvbmVudC5qcyIsImltcG9ydCBDYXRjaCBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaC8wLjEnO1xuXG5jbGFzcyBDYXRjaGVyIGV4dGVuZHMgQ2F0Y2gge1xuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgc2tvYXNoLkNvbXBvbmVudC5wcm90b3R5cGUuYm9vdHN0cmFwLmNhbGwodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuYnVja2V0Tm9kZXMgPSBfLnJlZHVjZSh0aGlzLnJlZnMsIChhLCB2LCBrKSA9PiB7XG4gICAgICAgICAgICBpZiAoay5pbmRleE9mKCdidWNrZXRzLScpKSByZXR1cm4gYTtcbiAgICAgICAgICAgIGFba10gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh2KTtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgICAgICAgdmFyIHpvb20gPSBzdGF0ZS5zY2FsZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NvbGxpc2lvbnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zdGFydGVkIHx8IHRoaXMuc3RhdGUucGF1c2VkIHx8ICF0aGlzLnN0YXRlLmNhbkNhdGNoKSByZXR1cm47XG4gICAgICAgIF8uZWFjaCh0aGlzLmJ1Y2tldE5vZGVzLCAoYnVja2V0Tm9kZSwgYnVja2V0UmVmS2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgYnVja2V0UmVjdCA9IGJ1Y2tldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5wcm9wcy5jYXRjaGFibGVSZWZzLCBjYXRjaGFibGVSZWYgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2F0Y2hhYmxlUmVmLmNhbkNhdGNoKCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGluZyhidWNrZXRSZWN0LCBjYXRjaGFibGVSZWYuRE9NTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDYXRjaGFibGUodGhpcy5yZWZzW2J1Y2tldFJlZktleV0sIGNhdGNoYWJsZVJlZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5jaGVja0NvbGxpc2lvbnMpO1xuICAgIH1cblxuICAgIGlzQ29sbGlkaW5nKGJ1Y2tldFJlY3QsIGNhdGNoUmVjdCkge1xuICAgICAgICB2YXIgeENlbnRlciA9IGNhdGNoUmVjdC5sZWZ0ICsgKGNhdGNoUmVjdC5yaWdodCAtIGNhdGNoUmVjdC5sZWZ0KSAvIDI7XG4gICAgICAgIHZhciB5T2Zmc2V0ID0gKGJ1Y2tldFJlY3QuYm90dG9tIC0gYnVja2V0UmVjdC50b3ApICogdGhpcy5wcm9wcy5jb2xsaWRlRnJhY3Rpb247XG4gICAgICAgIHJldHVybiAoYnVja2V0UmVjdC50b3AgLSB5T2Zmc2V0IDwgY2F0Y2hSZWN0LmJvdHRvbSAmJiBidWNrZXRSZWN0LnRvcCArIHlPZmZzZXQgPiBjYXRjaFJlY3QudG9wICYmXG4gICAgICAgICAgICB4Q2VudGVyID4gYnVja2V0UmVjdC5sZWZ0ICYmIHhDZW50ZXIgPCBidWNrZXRSZWN0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICBzZWxlY3RDYXRjaGFibGUoYnVja2V0UmVmLCBjYXRjaGFibGVSZWYpIHtcbiAgICAgICAgdmFyIGNhdGNoYWJsZVJlZktleTtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQgfHxcbiAgICAgICAgICAgICF0aGlzLnN0YXRlLmNhbkNhdGNoIHx8ICFjYXRjaGFibGVSZWYuY2FuQ2F0Y2goKSkgcmV0dXJuO1xuICAgICAgICBjYXRjaGFibGVSZWZLZXkgPSBjYXRjaGFibGVSZWYucHJvcHNbJ2RhdGEtcmVmJ107XG4gICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICBrZXlzOiBbdGhpcy5wcm9wcy5jYXVnaHRUYXJnZXQsICdjYXVnaHQnXSxcbiAgICAgICAgICAgIGRhdGE6IGNhdGNoYWJsZVJlZktleSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYXRjaGFibGVSZWYucHJvcHMubWVzc2FnZSA9PT0gYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3JyZWN0KGJ1Y2tldFJlZiwgY2F0Y2hhYmxlUmVmS2V5KSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdjb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgYnVja2V0UmVmLCBjYXRjaGFibGVSZWZLZXkpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBidWNrZXRSZWYsIGNhdGNoYWJsZVJlZktleSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMucGF1c2UgJiYgcHJvcHMucGF1c2UgIT09IHRoaXMucHJvcHMucGF1c2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5yZXN1bWUgJiYgcHJvcHMucmVzdW1lICE9PSB0aGlzLnByb3BzLnJlc3VtZSkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJ1Y2tldCgpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKFtdLmNvbmNhdCh0aGlzLnByb3BzLmJ1Y2tldCksIChidWNrZXQsIGtleSkgPT5cbiAgICAgICAgICAgIDxidWNrZXQudHlwZVxuICAgICAgICAgICAgICAgIHsuLi5idWNrZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXsnYnVja2V0cy0nICsga2V5fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoJ2Fzc2V0cycpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJ1Y2tldCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYXRjaGVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGNhdWdodFRhcmdldDogJ2NhdGNoZXInLFxuICAgIGNvbGxpZGVGcmFjdGlvbjogMSAvIDYsXG59LCBDYXRjaC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hlci8wLjQuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xJztcblxuY2xhc3MgQ2F0Y2ggZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNhbkNhdGNoOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25SZXNpemUgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zID0gdGhpcy5jaGVja0NvbGxpc2lvbnMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoTW91c2VFdmVudHMoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpO1xuXG4gICAgICAgIHRoaXMuYnVja2V0Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5idWNrZXQpO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZU5vZGVzID0gXy5tYXAodGhpcy5wcm9wcy5jYXRjaGFibGVzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbYCR7a2V5fS1jYXRjaGFibGVgXSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNhdGNoYWJsZU5vZGVzLCBmdW5jdGlvbiAobm9kZSwga2V5KSB7XG4gICAgICAgICAgICB2YXIgY2F0Y2hhYmxlUmVmID0gdGhpcy5yZWZzW2Ake2tleX0tY2F0Y2hhYmxlYF07XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbml0ZXJhdGlvbicsIGNhdGNoYWJsZVJlZi5yZXNldCwgZmFsc2UpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGF0dGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB2YXIgY2F0Y2hSZWYgPSB0aGlzLnJlZnNbJ2NhdGNoLWNvbXBvbmVudCddO1xuICAgICAgICBpZiAoY2F0Y2hSZWYpIHtcbiAgICAgICAgICAgIGNhdGNoUmVmLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgY2F0Y2hSZWYuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgY2F0Y2hSZWYuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbW91c2VYOiBlLnBhZ2VYXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBza29hc2gudHJpZ2dlcignZ2V0U3RhdGUnKS50aGVuKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHZhciB6b29tID0gc3RhdGUuc2NhbGU7XG4gICAgICAgICAgICB2YXIgZWRnZXMgPSB0aGlzLmdldEVkZ2VzKHRoaXMuYnVja2V0Tm9kZSk7XG4gICAgICAgICAgICB2YXIgYnVja2V0V2lkdGggPSBlZGdlcy5yaWdodCAtIGVkZ2VzLmxlZnQ7XG4gICAgICAgICAgICB2YXIgbGVmdEJvdW5kID0gdGhpcy5idWNrZXROb2RlLm9mZnNldFBhcmVudCA/XG4gICAgICAgICAgICAgICAgdGhpcy5idWNrZXROb2RlLm9mZnNldFBhcmVudC5vZmZzZXRXaWR0aCAtIGJ1Y2tldFdpZHRoIDogMDtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVja2V0VG9wOiBlZGdlcy50b3AsXG4gICAgICAgICAgICAgICAgYnVja2V0Qm90dG9tOiBlZGdlcy5ib3R0b20sXG4gICAgICAgICAgICAgICAgYnVja2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgbGVmdEJvdW5kLFxuICAgICAgICAgICAgICAgIHpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGhpcy5jaGVja0NvbGxpc2lvbnMpO1xuICAgICAgICB0aGlzLmJvb3RzdHJhcCgpO1xuICAgIH1cblxuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zKCk7XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdGFydGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF1c2VkOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwYXVzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0Q2F0Y2hhYmxlKGNhdGNoYWJsZU5vZGUsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc3RhcnRlZCB8fCB0aGlzLnN0YXRlLnBhdXNlZCB8fCAhdGhpcy5zdGF0ZS5jYW5DYXRjaCB8fFxuICAgICAgICAgICAgIWNhdGNoYWJsZU5vZGUuY2FuQ2F0Y2goKSkgcmV0dXJuO1xuICAgICAgICBjYXRjaGFibGVOb2RlLm1hcmtDYXVnaHQoKTtcbiAgICAgICAgaWYgKGNhdGNoYWJsZU5vZGUucHJvcHMuaXNDb3JyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3QoY2F0Y2hhYmxlTm9kZSwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGNhdGNoYWJsZU5vZGUsIGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3JyZWN0KGNhdGNoYWJsZSwga2V5KSB7XG4gICAgICAgIHRoaXMucGxheU1lZGlhKCdjb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgY2F0Y2hhYmxlLCBrZXkpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChjYXRjaGFibGUsIGtleSkge1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBjYXRjaGFibGUsIGtleSk7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb25zKCkge1xuICAgICAgICB2YXIgYnVja2V0UmVjdCA9IHRoaXMuYnVja2V0Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnN0YXJ0ZWQgfHwgdGhpcy5zdGF0ZS5wYXVzZWQpIHJldHVybjtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuY2F0Y2hhYmxlTm9kZXMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRpbmcoYnVja2V0UmVjdCwgdmFsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2F0Y2hhYmxlKHRoaXMucmVmc1tgJHtrZXl9LWNhdGNoYWJsZWBdLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuY2hlY2tDb2xsaXNpb25zKTtcbiAgICB9XG5cbiAgICBpc0NvbGxpZGluZyhidWNrZXRSZWN0LCBjYXRjaFJlY3QpIHtcbiAgICAgICAgdmFyIHhDZW50ZXIgPSBjYXRjaFJlY3QubGVmdCArIChjYXRjaFJlY3QucmlnaHQgLSBjYXRjaFJlY3QubGVmdCkgLyAyO1xuICAgICAgICB2YXIgeU9mZnNldCA9IChjYXRjaFJlY3QuYm90dG9tIC0gY2F0Y2hSZWN0LnRvcCkgLyA2O1xuICAgICAgICByZXR1cm4gKGJ1Y2tldFJlY3QudG9wIDwgY2F0Y2hSZWN0LmJvdHRvbSAtIHlPZmZzZXQgJiYgYnVja2V0UmVjdC50b3AgPiBjYXRjaFJlY3QudG9wICsgeU9mZnNldCAmJlxuICAgICAgICAgICAgeENlbnRlciA+IGJ1Y2tldFJlY3QubGVmdCAmJiB4Q2VudGVyIDwgYnVja2V0UmVjdC5yaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0RWRnZXMoZWwpIHtcbiAgICAgICAgdmFyIHRvcDtcbiAgICAgICAgdmFyIGxlZnQ7XG4gICAgICAgIHZhciB3aWR0aDtcbiAgICAgICAgdmFyIGhlaWdodDtcblxuICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgdG9wID0gMDtcbiAgICAgICAgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHdoaWxlIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLmNsYXNzTmFtZSAmJiBlbC5jbGFzc05hbWUuaW5kZXhPZignc2NyZWVuJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxlZnQgKz0gZWwub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgdG9wICs9IGVsLm9mZnNldFRvcCB8fCAwO1xuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgYm90dG9tOiB0b3AgKyBoZWlnaHQsXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQ6IGxlZnQgKyB3aWR0aFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFN0eWxlKCkge1xuICAgICAgICB2YXIgbGVmdCA9ICh0aGlzLnN0YXRlLm1vdXNlWCAvIHRoaXMuc3RhdGUuem9vbSkgLSAodGhpcy5zdGF0ZS5idWNrZXRXaWR0aCAvIDIpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5idWNrZXRJbkJvdW5kcykge1xuICAgICAgICAgICAgbGVmdCA9IGxlZnQgPCAxID8gMSA6IGxlZnQ7XG4gICAgICAgICAgICBsZWZ0ID0gbGVmdCA+PSB0aGlzLnN0YXRlLmxlZnRCb3VuZCA/IHRoaXMuc3RhdGUubGVmdEJvdW5kIC0gMSA6IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogYCR7bGVmdH1weGBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJCdWNrZXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5idWNrZXQudHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJ1Y2tldC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJidWNrZXRcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNhdGNoYWJsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNhdGNoYWJsZXMubWFwKChpdGVtLCBrZXkpID0+XG4gICAgICAgICAgICA8Q2F0Y2hhYmxlXG4gICAgICAgICAgICAgICAgey4uLml0ZW0ucHJvcHN9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgcmVmPXtgJHtrZXl9LWNhdGNoYWJsZWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaCcsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9XCJjYXRjaC1jb21wb25lbnRcIiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2F0Y2hhYmxlcygpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQnVja2V0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbn1cblxuQ2F0Y2guZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgY2F0Y2hhYmxlczogW10sXG4gICAgYnVja2V0SW5Cb3VuZHM6IHRydWUsXG4gICAgYnVja2V0OiA8c2tvYXNoLkNvbXBvbmVudCAvPixcbiAgICBvbkNvcnJlY3Q6IF8ubm9vcCxcbiAgICBvbkluY29ycmVjdDogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL2NhdGNoLzAuMS5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBDYXRjaGFibGUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjYW5DYXRjaDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKG9wdHMsIGNiKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F1Z2h0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DYXVnaHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBjYW5DYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuc3RhdGUuY2FuQ2F0Y2g7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ2NhdGNoYWJsZScsIHtcbiAgICAgICAgICAgIENBVUdIVDogIXRoaXMuc3RhdGUuY2FuQ2F0Y2hcbiAgICAgICAgfSwgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVhZHkgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5yZUNhdGNoYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2FuQ2F0Y2g6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQ2F0Y2hhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBpc0NvcnJlY3Q6IHRydWUsXG4gICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgb25DYXVnaHQ6IF8ubm9vcCxcbiAgICB0eXBlOiAnbGknLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5cbmNvbnN0IElURU0gPSAnaXRlbXMtJztcbmNvbnN0IERST1BQRUQgPSAnRFJPUFBFRCc7XG5cbmNsYXNzIERyb3BwZXIgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IF8uZGVmYXVsdHMoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLml0ZW1Db3VudCA9IDA7XG4gICAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXRlbXM6IHt9LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5leHQodGhpcy5wcm9wcy5hbW91bnQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3RJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzW0lURU0gKyB0aGlzLmZpcnN0SXRlbUluZGV4XTtcbiAgICB9XG5cbiAgICBkcm9wKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgIGtleTogW3Byb3BzLnJlZnNUYXJnZXQsICdkcm9wJ10sXG4gICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcHMub25Ecm9wLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgcGlja1VwKHByb3BzKSB7XG4gICAgICAgIHZhciBpdGVtUmVmID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuICAgICAgICBpdGVtUmVmLnJlbW92ZUNsYXNzTmFtZShwcm9wcy5kcm9wQ2xhc3MgfHwgRFJPUFBFRCk7XG4gICAgICAgIGl0ZW1SZWYucmVzZXQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAga2V5OiBbcHJvcHMucmVmc1RhcmdldCwgJ3BpY2tVcCddLFxuICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BzLm9uUGlja1VwLmNhbGwodGhpcywgaXRlbVJlZik7XG4gICAgfVxuXG4gICAgbmV4dChhbW91bnQgPSAxLCBzaGlmdCA9IHRydWUpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcblxuICAgICAgICBfLmVhY2godGhpcy5yZWZzLmJpbi5nZXQoYW1vdW50KSwgdiA9PiB7XG4gICAgICAgICAgICBpdGVtc1t0aGlzLml0ZW1Db3VudCsrXSA9IChcbiAgICAgICAgICAgICAgICA8di50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi52LnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBvblJlYWR5PXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzaGlmdCkgZGVsZXRlIGl0ZW1zW3RoaXMuZmlyc3RJdGVtSW5kZXgrK107XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVmcyA9IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoSVRFTSkpO1xuICAgICAgICAgICAgdGhpcy5pbnZva2VDaGlsZHJlbkZ1bmN0aW9uKCdtYXJrQ2F0Y2hhYmxlJyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLnByb3BzLnJlZnNUYXJnZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICByZWZzLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk5leHQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2F1Z2h0KGNhdGNoYWJsZVJlZktleSkge1xuICAgICAgICBfLmludm9rZSh0aGlzLnJlZnNbY2F0Y2hhYmxlUmVmS2V5XSwgJ21hcmtDYXVnaHQnKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5uZXh0ID09PSB0cnVlICYmIHByb3BzLm5leHQgIT09IHRoaXMucHJvcHMubmV4dCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZHJvcCA9PT0gdHJ1ZSAmJiBwcm9wcy5kcm9wICE9PSB0aGlzLnByb3BzLmRyb3ApIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcChwcm9wcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMucGlja1VwID09PSB0cnVlICYmIHByb3BzLnBpY2tVcCAhPT0gdGhpcy5wcm9wcy5waWNrVXApIHtcbiAgICAgICAgICAgIHRoaXMucGlja1VwKHByb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5jYXVnaHQgJiYgcHJvcHMuY2F1Z2h0ICE9PSB0aGlzLnByb3BzLmNhdWdodCkge1xuICAgICAgICAgICAgdGhpcy5jYXVnaHQocHJvcHMuY2F1Z2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdtYW51YWwtZHJvcHBlcicsIHN1cGVyLmdldENsYXNzTmFtZXMoKSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBzaG9ydGlkIGlzIGludGVudGlvbmFsbHkgbm90IHVzZWQgZm9yIGtleSBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICAgKiB0aGF0IHRoZSBlbGVtZW50IGlzIHRyYW5zaXRpb25lZCBhbmQgbm90IHJlcGxhY2VkLlxuICAgICAqL1xuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gXy5tYXAodGhpcy5zdGF0ZS5pdGVtcywgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZiA9IElURU0gKyBrZXk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW1lc3NhZ2U9e2l0ZW0ucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJCaW4oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5iaW4udHlwZVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJpbi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9XCJiaW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXt0aGlzLnByb3BzLm9uVHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudExpc3QoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Ecm9wcGVyLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyb3BDbGFzczogRFJPUFBFRCxcbiAgICBhbW91bnQ6IDEsXG4gICAgYmluOiAoXG4gICAgICAgIDxza29hc2guUmFuZG9taXplclxuICAgICAgICAgICAgYmluPXtbXG4gICAgICAgICAgICAgICAgPENhdGNoYWJsZSAvPixcbiAgICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgKSxcbiAgICByZWZzVGFyZ2V0OiAnbWFudWFsLWRyb3BwZXInLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIG9uUGlja1VwOiBfLm5vb3AsXG4gICAgb25OZXh0OiBfLm5vb3AsXG4gICAgbmV4dDogZmFsc2UsXG4gICAgZHJvcDogZmFsc2UsXG4gICAgb25UcmFuc2l0aW9uRW5kOiBfLm5vb3AsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BwZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEuanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgQ2F0Y2hhYmxlIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2F0Y2hhYmxlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKG9wdHMsIGNiKTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuICAgIH1cblxuICAgIG1hcmtDYXVnaHQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yZWFkeSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjYXRjaGFibGU6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DYXVnaHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ2F0Y2hhYmxlKCkge1xuICAgICAgICB0aGlzLkRPTU5vZGUgPSB0aGlzLkRPTU5vZGUgfHwgUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNhdGNoYWJsZSAmJiB0aGlzLmNhdGNoYWJsZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5DYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMuY2F0Y2hhYmxlO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKCdjYXRjaGFibGUnLCB7XG4gICAgICAgICAgICBDQVVHSFQ6ICF0aGlzLnN0YXRlLmNhdGNoYWJsZVxuICAgICAgICB9LCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZWFkeSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLnByb3BzLnJlQ2F0Y2hhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGNoYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjYXRjaGFibGU6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQ2F0Y2hhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBpc0NvcnJlY3Q6IHRydWUsXG4gICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgb25DYXVnaHQ6IF8ubm9vcCxcbiAgICB0eXBlOiAnbGknLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRjaGFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yLmpzIiwiaW1wb3J0IGRlZmF1bHRHYW1lT3B0cyBmcm9tICcuL2RlZmF1bHRfZ2FtZV9vcHRzJztcbmltcG9ydCBJdGVtc1RvU29ydCBmcm9tICcuL2l0ZW1zX3RvX3NvcnQnO1xuXG5jb25zdCBiaW5OYW1lcyA9IFtcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbikpO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBnYW1lTmFtZTogJ3JlY3ljbGluZy1jaGFtcGlvbicsXG4gICAgZ2FtZU51bWJlcjogMSxcbiAgICBiaW5OYW1lcyxcbiAgICBpdGVtc1RvU29ydCxcbiAgICBleHRyYUNvbXBvbmVudHM6IFtcbiAgICAgICAgPHNrb2FzaC5JbWFnZSBjbGFzc05hbWU9XCJoaWRkZW5cIiBzY3I9e2Ake0NNV04uTUVESUEuSU1BR0V9cGlwZTAxLnBuZ2B9IC8+LFxuICAgIF0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMuanMiLCJpbXBvcnQgQ2F0Y2hhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2NhdGNoYWJsZS8wLjInO1xuXG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcblxubGV0IGJpbk5hbWVzID0gW1xuICAgICdyZWN5Y2xlJyxcbiAgICAnbGFuZGZpbGwnLFxuICAgICdjb21wb3N0Jyxcbl07XG5cbmxldCBpdGVtc1RvU29ydCA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoYmluTmFtZXMsIGl0ZW0uYmluKSk7XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IGNhdGNoYWJsZXNBcnJheSA9IF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+ICh7XG4gICAgdHlwZTogQ2F0Y2hhYmxlLFxuICAgIHByb3BzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogdi5uYW1lLFxuICAgICAgICBtZXNzYWdlOiB2LmJpbixcbiAgICAgICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgICAgIGJlY29tZXM6IHYuYmVjb21lcyxcbiAgICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKHYpLFxuICAgIH0sXG59KSk7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT5cbiAgICBfLmtlYmFiQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwiZHJvcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlbGVhc2VJdGVtMS5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db3JyZWN0U2VsZWN0Lm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBpY2tVcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GbGlwLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwidGltZXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1TZWNvbmRUaW1lci5tcDNgfSAvPixcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2FtZU5hbWU6ICdyZWN5Y2xpbmctY2hhbXBpb24nLFxuICAgIGdhbWVOdW1iZXI6IDEsXG4gICAgbGV2ZWw6IDEsXG4gICAgdGltZW91dDogMTIwMDAwLFxuICAgIHNjb3JlVG9XaW46IDYwMCxcbiAgICBtYXhIaXRzOiA1LFxuICAgIGRyb3BwZXJBbW91bnQ6IDMsXG4gICAgcG9pbnRzUGVySXRlbTogOTUsXG4gICAgcG9pbnRzUGVyTWlzczogMjUwLFxuICAgIGNvbGxpZGVGcmFjdGlvbjogMCxcbiAgICBnZXRTY3JlZW5Qcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0czogMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc3RhcnQnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0VGltZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuc2NvcmUgPj0gb3B0cy5zY29yZVRvV2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaFNjb3JlOiBNYXRoLm1heChvcHRzLnNjb3JlLCBvcHRzLmhpZ2hTY29yZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXRyeScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkluY3JlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBzZWNvbmRzTGVmdCA9ICh0aGlzLnByb3BzLnRpbWVvdXQgLSB0aGlzLnN0YXRlLnRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kc0xlZnQgPT09IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheTogJ3RpbWVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFJldmVhbFByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uT3BlbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc3RhcnQnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25DbG9zZTogZnVuY3Rpb24gKHByZXZNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIXByZXZNZXNzYWdlIHx8IHByZXZNZXNzYWdlID09PSAncmVzb3J0JykgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlID09PSAncmV0cnknKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2NvcmUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmhpdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoYmluUmVmS2V5KSB7XG4gICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbYmluUmVmS2V5XSkub2Zmc2V0TGVmdCAtIDc4NTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5sZWZ0ID09PSBsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Ryb3AnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ2xlZnQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGxlZnQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLkRPTU5vZGUgIT09IGUudGFyZ2V0IHx8IG9wdHMubGVmdCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnZHJvcCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25QaWNrVXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFsnbWFudWFsLWRyb3BwZXInLCAnZHJvcENsYXNzJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICcnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldENhdGNoZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvcnJlY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuc2NvcmUgKyBvcHRzLnBvaW50c1Blckl0ZW0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICduZXh0J10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25JbmNvcnJlY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0cyA9IG9wdHMuaGl0cyArIDE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0cyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpdHMgPT09IG9wdHMubWF4SGl0cykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdwaWNrVXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmVhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY2tVcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1Z2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRMaWZlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnNjb3JlID49IG9wdHMuc2NvcmVUb1dpbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hTY29yZTogTWF0aC5tYXgob3B0cy5zY29yZSwgb3B0cy5oaWdoU2NvcmUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmV0cnknLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RXh0cmFDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gY2F0Y2hhYmxlc0FycmF5O1xuICAgIH0sXG4gICAgYmluTmFtZXMsXG4gICAgaXRlbXNUb1NvcnQsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZ2FtZV9vcHRzLmpzIiwiaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuaW1wb3J0IGl0ZW1zRm9vZFNoYXJlIGZyb20gJy4vaXRlbXNfZm9vZF9zaGFyZSc7XG5pbXBvcnQgaXRlbXNMYW5kZmlsbCBmcm9tICcuL2l0ZW1zX2xhbmRmaWxsJztcbmltcG9ydCBpdGVtc0xpcXVpZHMgZnJvbSAnLi9pdGVtc19saXF1aWRzJztcbmltcG9ydCBpdGVtc1JlY3ljbGUgZnJvbSAnLi9pdGVtc19yZWN5Y2xlJztcblxuZXhwb3J0IGRlZmF1bHQgW11cbiAgICAuY29uY2F0KGl0ZW1zQ29tcG9zdClcbiAgICAuY29uY2F0KGl0ZW1zRm9vZFNoYXJlKVxuICAgIC5jb25jYXQoaXRlbXNMYW5kZmlsbClcbiAgICAuY29uY2F0KGl0ZW1zTGlxdWlkcylcbiAgICAuY29uY2F0KGl0ZW1zUmVjeWNsZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfdG9fc29ydC5qcyIsImxldCBiaW4gPSAnZm9vZC1zaGFyZSc7XG5sZXQgbmFtZXMgPSBbXG4gICAgJ2JhZy1vZi1wb3RhdG8tY2hpcHMtMicsXG4gICAgJ2JhZy1vZi1wb3RhdG8tY2hpcHMtMycsXG4gICAgJ2JveC1vZi1jaGVkZGFyLWNyYWNrZXJzJyxcbiAgICAnYm94LW9mLWNvb2tpZXMnLFxuICAgICdmcmVzaC11bm9wZW5lZC1zYW5kd2ljaCcsXG4gICAgJ2tldGNodXAtcGFja2V0JyxcbiAgICAnbWF5by1wYWNrZXQnLFxuICAgICdtdXN0YXJkLXBhY2tldCcsXG4gICAgJ3BhY2thZ2Utb2YtZHJpZWQtZnJ1aXQnLFxuICAgICdwYWNrYWdlZC1kaW5uZXItcm9sbCcsXG4gICAgJ3BhY2thZ2VkLXZlZ2V0YWJsZXMnLFxuICAgICdzZWFsZWQtYXBwbGVzYXVjZScsXG4gICAgJ3NlYWxlZC1iYWctb2YtY2Fycm90cycsXG4gICAgJ3NlYWxlZC1wb3Bjb3JuJyxcbiAgICAnc2VhbGVkLWNob2NvbGF0ZS1taWxrJyxcbiAgICAnc2VhbGVkLWZydWl0LWRyaW5rLTEnLFxuICAgICdzZWFsZWQtZnJ1aXQtZHJpbmstMicsXG4gICAgJ3NlYWxlZC1mcnVpdC1kcmluay0zJyxcbiAgICAnc2VhbGVkLW1pbGstMScsXG4gICAgJ3NlYWxlZC1taWxrLTInLFxuICAgICdzZWFsZWQtbWlsay0zJyxcbiAgICAnc2VhbGVkLW9yYW5nZS1qdWljZScsXG4gICAgJ3NlYWxlZC1wcmV0emVsJyxcbiAgICAnc2luZ2xlLXNlcnZlLWNlcmVhbCcsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jZXJlYWwtMicsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jZXJlYWwtMycsXG4gICAgJ3NpbmdsZS1zZXJ2ZS1jb29raWVzJyxcbiAgICAndW5vcGVuZWQtYm94LW9mLXJhaXNpbnMnLFxuICAgICd1bm9wZW5lZC1jb29raWVzLXBhY2thZ2UnLFxuICAgICd1bm9wZW5lZC1jcmFja2Vycy0xJyxcbiAgICAndW5vcGVuZWQtY3JhY2tlcnMtMicsXG4gICAgJ3Vub3BlbmVkLWNyYWNrZXJzLTMnLFxuICAgICd1bm9wZW5lZC1lbmVyZ3ktYmFyJyxcbiAgICAndW5vcGVuZWQtZ3JhaGFtLWNvb2tpZXMtMScsXG4gICAgJ3Vub3BlbmVkLWdyYWhhbS1jb29raWVzLTInLFxuICAgICd1bm9wZW5lZC1ncmFoYW0tY29va2llcy0zJyxcbiAgICAndW5vcGVuZWQtZ3Jhbm9sYS1iYXInLFxuICAgICd1bm9wZW5lZC1qdWljZS1ib3gtMScsXG4gICAgJ3Vub3BlbmVkLWp1aWNlLWJveC0yJyxcbiAgICAndW5vcGVuZWQtanVpY2UtYm94LTMnLFxuICAgICd1bm9wZW5lZC1wYWNrLW9mLWdyYXBlcycsXG4gICAgJ3dob2xlLWFwcGxlJyxcbiAgICAnd2hvbGUtYmFuYW5hJyxcbiAgICAnd2hvbGUtb3JhbmdlJyxcbiAgICAneW9ndXJ0LWN1cC0xJyxcbiAgICAneW9ndXJ0LWN1cC0yJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IF8ubWFwKG5hbWVzLCAobmFtZSwgZnJhbWUpID0+ICh7XG4gICAgbmFtZSxcbiAgICBiaW4sXG4gICAgZnJhbWUsXG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvaXRlbXNfZm9vZF9zaGFyZS5qcyIsImxldCBiaW4gPSAnbGlxdWlkcyc7XG5sZXQgbmFtZXMgPSBbXG4gICAgJ2hhbGYtZnVsbC1lbmVyZ3ktZHJpbmstYm90dGxlJyxcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0xJyxcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0yJyxcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS0zJyxcbiAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZS00JyxcbiAgICAnaGFsZi1mdWxsLWxlbW9uYWRlLWJveC0xJyxcbiAgICAnaGFsZi1mdWxsLWxlbW9uYWRlLWJveC00JyxcbiAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi0xJyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTInLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tMycsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi00JyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTUnLFxuICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24tNicsXG4gICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbi03JyxcbiAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uLTgnLFxuICAgICdoYWxmLWZ1bGwtb3JhbmdlLWp1aWNlLTInLFxuXTtcblxubGV0IGJlY29tZXMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMScsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMicsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktcGxhc3RpYy1ib3R0bGUtMycsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktcGxhc3RpYy1ib3R0bGUtNCcsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZW1wdHktbWlsay1jYXJ0b24nLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uJyxcbiAgICAgICAgYmluOiAncmVjeWNsZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdlbXB0eS1hbHVtaW51bS1jYW4tMScsXG4gICAgICAgIGJpbjogJ3JlY3ljbGUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnanVpY2UtYm94LTEnLFxuICAgICAgICBiaW46ICdsYW5kZmlsbCcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdqdWljZS1ib3gtMicsXG4gICAgICAgIGJpbjogJ2xhbmRmaWxsJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTEnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTInLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTMnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTQnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTUnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTYnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTcnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LW1pbGstY2FydG9uLTgnLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2VtcHR5LXBsYXN0aWMtYm90dGxlLTInLFxuICAgICAgICBiaW46ICdyZWN5Y2xlJyxcbiAgICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgXy5tYXAobmFtZXMsIChuYW1lLCBmcmFtZSkgPT4gKHtcbiAgICBuYW1lLFxuICAgIGJpbixcbiAgICBmcmFtZSxcbiAgICBiZWNvbWVzOiBiZWNvbWVzW2ZyYW1lXSxcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9pdGVtc19saXF1aWRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncmVjeWNsaW5nLWNoYW1waW9uLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91ciBTb3J0aW5nIFNraWxsczxici8+XG4gICAgICAgICAgICAgICAgYXJlIG5lZWRlZCBmb3I8YnIvPlxuICAgICAgICAgICAgICAgIHRoaXMgbmV4dCByb3VuZC48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgR2V0IFJlYWR5LVNldC1HbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdSZWFkeVNldEdvJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcmVjeWNsaW5nX2NoYW1waW9uX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBzY29yZVRvV2luOiA3NjAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fbGV2ZWxfdHdvX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTm93IHRoYXQgeW91IGhhdmU8YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBoYW5nIG9mIHRoaXMgbGV0J3M8YnIvPlxuICAgICAgICAgICAgICAgIGFkZCBzb21lIHNwZWVkLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBHb29kIGx1Y2s8YnIvPlxuICAgICAgICAgICAgICAgIFNwZWVkIFNvcnRpbmchXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnU3BlZWRTb3J0aW5nJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl90aHJlZV9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDg1NSxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdyZWN5Y2xpbmctY2hhbXBpb24tZm91ci1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgVGhhdCB3YXMgc29tZTxici8+XG4gICAgICAgICAgICAgICAgU3BlZWQgU29ydGluZyE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgTGV0J3Mga2ljayBpdDxici8+XG4gICAgICAgICAgICAgICAgaW50byBoaWdoIGRyaXZlIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hpZ2hEcml2ZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMSdcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9yZWN5Y2xpbmdfY2hhbXBpb25fZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9yZWN5Y2xpbmdfY2hhbXBpb25fb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDk1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3JlY3ljbGluZy1jaGFtcGlvbi1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBNYXN0ZXIgdGhpcyBsZXZlbDxici8+XG4gICAgICAgICAgICAgICAgYW5kIHdpbiB0aGU8YnIvPlxuICAgICAgICAgICAgICAgIFJlY3ljbGUgQ2hhbXBpb24gRmxpcCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgQWNjdXJhY3kgaXMgaW1wb3J0YW50Li4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnQ2hhbXBpb25GbGlwJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cxJ1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3JlY3ljbGluZ19jaGFtcGlvbl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgc2NvcmVUb1dpbjogMTA0NSxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3JlY3ljbGluZ19jaGFtcGlvbl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5sZXQgZmxpcEtleXMgPSBbXG4gICAgJ3JlY3ljbGluZy1jaGFtcGlvbicsXG4gICAgJ3ByaWNlbGVzcy1wb3VyZXInLFxuICAgICdmYW50YXN0aWMtZm9vZC1zaGFyZXInLFxuICAgICdkeW5hbWljLWRpdmVydGVyJyxcbiAgICAnbWFzdGVyLXNvcnRlcicsXG4gICAgJ2dyZWVuLXRlYW0tY2hhbGxlbmdlJyxcbl07XG5cbmxldCBsZXZlbE5hbWVzID0gW1xuICAgICdSZWN5Y2xpbmcgQ2hhbXBpb24nLFxuICAgICdQcmljZWxlc3MgUG91cmVyJyxcbiAgICAnRmFudGFzdGljIEZvb2QgU2hhcmVyJyxcbiAgICAnRHluYW1pYyBEaXZlcnRlcicsXG4gICAgJ01hc3RlciBTb3J0ZXInLFxuXTtcblxubGV0IG51bWJlcldvcmRzID0gW1xuICAgICdPbmUnLFxuICAgICdUd28nLFxuICAgICdUaHJlZScsXG4gICAgJ0ZvdXInLFxuICAgICdGaXZlJyxcbl07XG5cbmxldCBnZXRMZXZlbEhlYWRlciA9IGxldmVsTnVtYmVyV29yZCA9PiB7XG4gICAgaWYgKGxldmVsTnVtYmVyV29yZCkgcmV0dXJuIDxoMyBjbGFzc05hbWU9XCJhbmltYXRlZFwiPkxldmVsIHtsZXZlbE51bWJlcldvcmR9IENvbXBsZXRlITwvaDM+O1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyIGFuaW1hdGVkXCI+XG4gICAgICAgICAgICA8aDM+Q09OR1JBVFVMQVRJT05TITwvaDM+XG4gICAgICAgICAgICA8aDQ+WW91IGFyZSBhIG1lbWJlciBvZiBHcmVlbiBUZWFtITwvaDQ+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5sZXQgbGlzdExldmVscyA9IGxldmVsTnVtYmVyID0+XG4gICAgXy5tYXAobGV2ZWxOYW1lcywgKG5hbWUsIG51bWJlcikgPT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2xldmVsTnVtYmVyID4gbnVtYmVyID8gJ2NvbXBsZXRlJyA6ICcnfT5cbiAgICAgICAgICAgIDxwPkxldmVsIHtudW1iZXIgKyAxfTwvcD5cbiAgICAgICAgICAgIDxwPntuYW1lfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGxldmVsTnVtYmVyKSB7XG4gICAgbGV0IGxldmVsTnVtYmVyV29yZCA9IG51bWJlcldvcmRzW2xldmVsTnVtYmVyIC0gMV07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLlNjcmVlblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBpZD17YHBvc3QtbGV2ZWwtJHtsZXZlbE51bWJlcn1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhvcHRzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBBUFBFQVI6IF8uZ2V0KHByb3BzLCAnZGF0YS5hcHBlYXIucGxheWluZycpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7bGV2ZWxOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICBlbWl0T25Db21wbGV0ZT17e1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsXG4gICAgICAgICAgICAgICAgICAgIGdhbWU6IGZsaXBLZXlzW2xldmVsTnVtYmVyIC0gMV1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkZSQU1FfXRyYW5zaXRpb24uZnJhbWUucG5nYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1zcHJpdGUubGV2ZWxzLnBuZ2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2U+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MZXZlbEF3YXJkLm1wM2B9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1GbGlwSG92ZXIubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInNmeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5VGFyZ2V0PVwiYXBwZWFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9RmxpcERyb3BCb3VuY2UubXAzYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAge2dldExldmVsSGVhZGVyKGxldmVsTnVtYmVyV29yZCl9XG4gICAgICAgICAgICAgICAgICAgIHtsaXN0TGV2ZWxzKGxldmVsTnVtYmVyKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICAgICAgKTtcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2xldmVsX2NvbXBsZXRlX3NjcmVlbl9jb21wb25lbnQuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLW9uZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGV5IFJlY3ljbGUgQ2hhbXBpb24hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIE5leHQgdXDigJRpdCdzIExpcXVpZHMhPGJyLz5cbiAgICAgICAgICAgICAgICBQb3VyIHRoZSBsaXF1aWRzIGFuZDxici8+XG4gICAgICAgICAgICAgICAgdGhlbiBzb3J0IHRoZSBjb250YWluZXJzLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0hleVJlY3ljbGVDaGFtcGlvbicsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgdGltZW91dDogMTIwMDAwLFxuICAgICAgICBzY29yZVRvV2luOiAxMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX29uZV9zY3JlZW4uanMiLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENhdGNoYWJsZSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9jYXRjaGFibGUvMC4yJztcblxuaW1wb3J0IGRlZmF1bHRHYW1lT3B0cyBmcm9tICcuL2RlZmF1bHRfZ2FtZV9vcHRzJztcbmltcG9ydCBJdGVtc1RvU29ydCBmcm9tICcuL2l0ZW1zX3RvX3NvcnQnO1xuaW1wb3J0IEl0ZW1zTGlxdWlkIGZyb20gJy4vaXRlbXNfbGlxdWlkcyc7XG5cbmNvbnN0IGJpbk5hbWVzID0gW1xuICAgICdsaXF1aWRzJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG5dO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBfLmZpbHRlcihcbiAgICBJdGVtc1RvU29ydC5jb25jYXQoSXRlbXNMaXF1aWQpLmNvbmNhdChJdGVtc0xpcXVpZCksXG4gICAgaXRlbSA9PiBfLmluY2x1ZGVzKGJpbk5hbWVzLCBpdGVtLmJpbilcbik7XG5cbmxldCBnZXRDaGlsZHJlbiA9IHYgPT4ge1xuICAgIGlmICh2LmNoaWxkcmVuKSByZXR1cm4gdi5jaGlsZHJlbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV8ke18ucmVwbGFjZSh2LmJpbiwgJy0nLCAnJyl9YH1cbiAgICAgICAgICAgIGZyYW1lPXt2LmZyYW1lIHx8IDF9XG4gICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgLz5cbiAgICApO1xufTtcblxubGV0IGNhdGNoYWJsZXNBcnJheSA9IF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+ICh7XG4gICAgdHlwZTogQ2F0Y2hhYmxlLFxuICAgIHByb3BzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogdi5uYW1lLFxuICAgICAgICBtZXNzYWdlOiB2LmJpbixcbiAgICAgICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgICAgIGJlY29tZXM6IHYuYmVjb21lcyxcbiAgICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKHYpLFxuICAgIH0sXG59KSk7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT5cbiAgICBfLmtlYmFiQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwiZHJvcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNsaWNrUmVjQnV0dG9uLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvbnZleW9yQmVsdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInJlc29ydFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVJlc29ydFdhcm5pbmcubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwaWNrVXBcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1JdGVtRmxpcC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBvdXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1MaXF1aWRQb3VyLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwidGltZXJcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1TZWNvbmRUaW1lci5tcDNgfSAvPixcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlZmF1bHRzKHtcbiAgICBnYW1lTmFtZTogJ3ByaWNlbGVzcy1wb3VyZXInLFxuICAgIGdhbWVOdW1iZXI6IDIsXG4gICAgZHJvcHBlckFtb3VudDogNCxcbiAgICBiaW5OYW1lcyxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChiaW5SZWZLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdtYW51YWwtZHJvcHBlcicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M6IF8udG9VcHBlcihvcHRzLmJpbk5hbWVzW2JpblJlZktleV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICBsZXQgcHJvcHMgPSBkZWZhdWx0R2FtZU9wdHMuZ2V0RHJvcHBlclByb3BzLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgcHJvcHMub25UcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGxldCBpdGVtUmVmID0gdGhpcy5yZWZzWydpdGVtcy0nICsgdGhpcy5maXJzdEl0ZW1JbmRleF07XG4gICAgICAgICAgICBsZXQgRE9NTm9kZTtcbiAgICAgICAgICAgIGxldCBvbkFuaW1hdGlvbkVuZDtcblxuICAgICAgICAgICAgaWYgKGUucHJvcGVydHlOYW1lICE9PSAnbGVmdCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRyb3BDbGFzcyAhPT0gJ0xJUVVJRFMnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0cyA9IG9wdHMuaGl0cyArIDE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0cyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpdHMgPT09IG9wdHMubWF4SGl0cykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydtYW51YWwtZHJvcHBlcicsICdwaWNrVXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogWydyZXZlYWwnLCAnb3BlbiddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmVhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY2tVcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1Z2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuXG4gICAgICAgICAgICBpZiAoRE9NTm9kZSAhPT0gZS50YXJnZXQpIHJldHVybjtcblxuICAgICAgICAgICAgb25BbmltYXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrVXAoXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgIG9uUGlja1VwOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnN0YXRlLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maXJzdEl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5jbGFzc05hbWUgPSBpdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMubWVzc2FnZSA9IGl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnByb3BzWydkYXRhLW1lc3NhZ2UnXSA9IGl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UoaXRlbS5wcm9wcy5iZWNvbWVzLm5hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3VyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIERPTU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25BbmltYXRpb25FbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5wcm9wcykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCFpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSB8fCBpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZS5pbmRleE9mKCdQT1VSJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgaXRlbVJlZi5hZGRDbGFzc05hbWUoJ1BPVVInKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFsnaXRlbScsICdwb3VyJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hlclByb3BzKG9wdHMpIHtcbiAgICAgICAgdmFyIHByb3BzID0gZGVmYXVsdEdhbWVPcHRzLmdldENhdGNoZXJQcm9wcy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICAgIHByb3BzLm9uQ29ycmVjdCA9IGZ1bmN0aW9uIChidWNrZXRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzY29yZSddLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuc2NvcmUgKyBvcHRzLnBvaW50c1Blckl0ZW0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGJ1Y2tldFJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ25leHQnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH0sXG4gICAgZ2V0RXh0cmFDb21wb25lbnRzKG9wdHMpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJ21pbGsnO1xuXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICdDaG9jb2xhdGUnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdjaG9jb2xhdGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICdPcmFuZ2UnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdvcmFuZ2UnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfLmluY2x1ZGVzKG9wdHMuaXRlbU5hbWUsICdGcnVpdCcpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2ZydWl0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZWx0XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4xLmNvbnZleW9yLmJlbHRgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLm5leHR9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17MjUwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdjaG9jb2xhdGUnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5jaG9jb2xhdGUubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2ZydWl0J30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIuZnJ1aXQuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdtaWxrJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIubWlsa2B9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ29yYW5nZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLm9yYW5nZS5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBpdGVtc1RvU29ydCxcbiAgICBnZXRBdWRpb0FycmF5KCkge1xuICAgICAgICByZXR1cm4gYXVkaW9BcnJheTtcbiAgICB9LFxuICAgIGdldENhdGNoYWJsZXNBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGNhdGNoYWJsZXNBcnJheTtcbiAgICB9LFxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cy5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ3ByaWNlbGVzcy1wb3VyZXItdHdvLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJdCdzIHRpbWUgdG8gZHVhbCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgRHVhbCBzb3J0aW5nIGlzPGJyLz5cbiAgICAgICAgICAgICAgICBpbXBvcnRhbnQgZm9yIGFjY3VyYWN5Ljxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBTaG93IHdoYXQgeW91IGtub3chXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSXRzVGltZVRvRHVhbCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfcHJpY2VsZXNzX3BvdXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU3VjY2VzcyBpcyB0d2ljZSBhcyBuaWNlPGJyLz5cbiAgICAgICAgICAgICAgICB3aGVuIGR1YWwgc29ydGluZyE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgTGV0J3Mga2ljayBpdCB1cCBhIG5vdGNoLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0tpY2tJdHVwQU5vdGNoJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0cyJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX3RocmVlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDIwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXkgU3VwZXIgU29ydGVyITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGluZ3MgYXJlIGFib3V0PGJyLz5cbiAgICAgICAgICAgICAgICB0byBnZXQgY3JhenkuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEkgaG9wZSB5b3UncmUgcmVhZHkhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGV5U3VwZXJTb3J0ZXInLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzInLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9wcmljZWxlc3NfcG91cmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiAyNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9wcmljZWxlc3NfcG91cmVyX2xldmVsX2ZvdXJfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1maXZlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBMZXQncyB0YWtlIHRoaXM8YnIvPlxuICAgICAgICAgICAgICAgIHRvIHRoZSBuZXh0IGxldmVsITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBZb3UgYXJlIGFib3V0IHRvPGJyLz5cbiAgICAgICAgICAgICAgICBiZWNvbWUgYTxici8+XG4gICAgICAgICAgICAgICAgUHJpY2VsZXNzIFBvdXJlciFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdUYWtlSXRUb3RoZU5leHRMZXZlbCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMicsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcHJpY2VsZXNzX3BvdXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X3ByaWNlbGVzc19wb3VyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3ByaWNlbGVzc19wb3VyZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLW9uZS1pbmZvJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc21hbGwnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTaGFyaW5nIHNuYWNrcyBpcyBqdXN0IGE8YnIvPlxuICAgICAgICAgICAgICAgIGtpbmQgdGhpbmcgdG8gZG8gZm9yIG90aGVycy48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgSWRlbnRpZnkgdGhvc2UgaXRlbXMgdGhhdDxici8+XG4gICAgICAgICAgICAgICAgYXJlIHJlYWR5IHRvIGVhdC1ub3Qgd2FzdGU8YnIvPlxuICAgICAgICAgICAgICAgIGFzIEZvb2QgU2hhcmUgaXRlbXMuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnU2hhcm5pbmdTbmFja3MnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzMnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICB0aW1lb3V0OiAxMjAwMDAsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5cbmltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcbmltcG9ydCBJdGVtc1NoYXJlIGZyb20gJy4vaXRlbXNfZm9vZF9zaGFyZSc7XG5cbmNvbnN0IFBJQ0tVUCA9ICdQSUNLVVAnO1xuY29uc3QgRFJPUFBFRCA9ICdEUk9QUEVEJztcbmNvbnN0IFRJTFQgPSAnVElMVCc7XG5jb25zdCBJVEVNUyA9ICdpdGVtcy0nO1xuXG5jb25zdCBCRUxUX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2xldmVsLjMuY29udmV5b3IuYmVsdCc7XG5jb25zdCBDTEFXX1NSQyA9IENNV04uTUVESUEuU1BSSVRFICsgJ2xldmVsM3JvYm90YXJtJztcbmNvbnN0IEZVTk5FTF9TUkMgPSBDTVdOLk1FRElBLlNQUklURSArICdmcm9udC5iYWNrLmZ1bm5lbCc7XG5cbmNvbnN0IGJpbk5hbWVzID0gW1xuICAgICdmb29kLXNoYXJlJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG4gICAgJ2xpcXVpZHMnLFxuXTtcblxuY29uc3Qgb25UcnVja1RyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAob3B0cywgZSkge1xuICAgIHNrb2FzaC50cmlnZ2VyKCd1cGRhdGVTY3JlZW5EYXRhJywge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgZHJvcDogXy5pbmNsdWRlcyhlLnRhcmdldC5jbGFzc05hbWUsIFRJTFQpLFxuICAgICAgICAgICAgICAgIGRyb3BDbGFzczogXy50b1VwcGVyKF8uc25ha2VDYXNlKG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UpKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnc2VsZWN0YWJsZSc6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5jb25zdCBvbkl0ZW1QaWNrVXBUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGl0ZW1SZWYpIHtcbiAgICBpZiAoXy5pbmNsdWRlcyhpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSwgUElDS1VQKSkge1xuICAgICAgICBpdGVtUmVmLnJlbW92ZUFsbENsYXNzTmFtZXMoKTtcbiAgICAgICAgc2tvYXNoLnRyaWdnZXIoJ3VwZGF0ZVNjcmVlbkRhdGEnLCB7XG4gICAgICAgICAgICBrZXk6ICd0cnVja0NsYXNzTmFtZScsXG4gICAgICAgICAgICBkYXRhOiAnJyxcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxubGV0IGl0ZW1zVG9Tb3J0ID0gXy5maWx0ZXIoXG4gICAgSXRlbXNUb1NvcnQuY29uY2F0KEl0ZW1zU2hhcmUpLFxuICAgIGl0ZW0gPT4gXy5pbmNsdWRlcyhiaW5OYW1lcywgaXRlbS5iaW4pXG4pO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBjYXRjaGFibGVzQXJyYXkgPSBfLm1hcChpdGVtc1RvU29ydCwgdiA9PiAoe1xuICAgIHR5cGU6IENhdGNoYWJsZSxcbiAgICBwcm9wczoge1xuICAgICAgICBjbGFzc05hbWU6IHYubmFtZSxcbiAgICAgICAgbWVzc2FnZTogdi5iaW4sXG4gICAgICAgIHJlQ2F0Y2hhYmxlOiB0cnVlLFxuICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICB9LFxufSkpO1xuXG5sZXQgYXVkaW9SZWZzID0gXy51bmlxKF8ubWFwKGl0ZW1zVG9Tb3J0LCB2ID0+XG4gICAgXy5rZWJhYkNhc2UoXy5yZXBsYWNlKHYubmFtZSwgL1xcZCsvZywgJycpKSlcbik7XG5cbmxldCBhdWRpb0FycmF5ID0gXy5tYXAoYXVkaW9SZWZzLCAodiwgaykgPT4gKHtcbiAgICB0eXBlOiBza29hc2guQXVkaW8sXG4gICAgcmVmOiB2LFxuICAgIGtleTogayxcbiAgICBwcm9wczoge1xuICAgICAgICB0eXBlOiAndm9pY2VPdmVyJyxcbiAgICAgICAgc3JjOiBgJHtDTVdOLk1FRElBLkdBTUUgKyAnc291bmQtYXNzZXRzL192b3NpdGVtcy8nICsgdn0ubXAzYCxcbiAgICAgICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgIGtleXM6IFsnaXRlbScsICduZXcnXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pKTtcblxuYXVkaW9BcnJheSA9IGF1ZGlvQXJyYXkuY29uY2F0KFtcbiAgICA8c2tvYXNoLk1lZGlhU2VxdWVuY2UgcmVmPVwiZHJvcFwiIHNpbGVudE9uU3RhcnQ+XG4gICAgICAgIDxza29hc2guQXVkaW8gZGVsYXk9ezQ2MDB9IHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GdW5uZWwubXAzYH0gLz5cbiAgICAgICAgPHNrb2FzaC5BdWRpbyB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1UcnVja0R1bXAubXAzYH0gLz5cbiAgICA8L3Nrb2FzaC5NZWRpYVNlcXVlbmNlPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Db252ZXlvckJlbHQubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJyZXNvcnRcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1SZXNvcnRXYXJuaW5nLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicGlja1VwXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbUZsaXAubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJwb3VyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9TGlxdWlkUG91ci5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdmYW50YXN0aWMtZm9vZC1zaGFyZXInLFxuICAgIGdhbWVOdW1iZXI6IDMsXG4gICAgYmluTmFtZXMsXG4gICAgZ2V0U2VsZWN0YWJsZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChkYXRhUmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMucHJvcHMubGlzdFtkYXRhUmVmXS5wcm9wcy5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNsYXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREcm9wcGVyUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnByb3BlcnR5TmFtZSA9PT0gJ3RvcCcgJiYgXy5pbmNsdWRlcyhlLnRhcmdldC5jbGFzc05hbWUsIERST1BQRUQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtUmVmID0gdGhpcy5yZWZzW0lURU1TICsgdGhpcy5maXJzdEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBET01Ob2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RydWNrQ2xhc3NOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFRJTFQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNlbGVjdGFibGVNZXNzYWdlICE9PSAnbGlxdWlkcycpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaXRzID0gb3B0cy5oaXRzICsgMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0cyA9PT0gb3B0cy5tYXhIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ3BpY2tVcCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAncmVzb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlja1VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbVJlZik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgb25BbmltYXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tVcChfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBpY2tVcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnN0YXRlLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpcnN0SXRlbUluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5jbGFzc05hbWUgPSBpdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5tZXNzYWdlID0gaXRlbS5wcm9wcy5iZWNvbWVzLmJpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBpdGVtLnByb3BzLmJlY29tZXMuYmluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpdGVtc30sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rmlyc3RJdGVtKCkucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbdGhpcy5wcm9wcy5yZWZzVGFyZ2V0LCAncmVmcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IF8uZmlsdGVyKHRoaXMucmVmcywgKHYsIGspID0+ICFrLmluZGV4T2YoSVRFTVMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5yZXBsYWNlKGl0ZW0ucHJvcHMuYmVjb21lcy5uYW1lLCAvXFxkKy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzczogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVja0NsYXNzTmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZSB8fCBpdGVtUmVmLnN0YXRlLmNsYXNzTmFtZS5pbmRleE9mKCdQT1VSJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIG9uQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogWydpdGVtJywgJ3BvdXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25QaWNrVXA6IGZ1bmN0aW9uIChpdGVtUmVmKSB7XG4gICAgICAgICAgICAgICAgaXRlbVJlZi5yZW1vdmVBbGxDbGFzc05hbWVzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtUmVmLkRPTU5vZGUpIGl0ZW1SZWYuRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLkRPTU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbVBpY2tVcFRyYW5zaXRpb25FbmQuYmluZChudWxsLCBpdGVtUmVmKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpdGVtUmVmLmFkZENsYXNzTmFtZShQSUNLVVApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWNrQ2xhc3NOYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRDYXRjaGVyUHJvcHMob3B0cykge1xuICAgICAgICB2YXIgcHJvcHMgPSBkZWZhdWx0R2FtZU9wdHMuZ2V0Q2F0Y2hlclByb3BzLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgcHJvcHMub25Db3JyZWN0ID0gZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbCwgJ3Njb3JlJ10sXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zY29yZSArIG9wdHMucG9pbnRzUGVySXRlbSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYnVja2V0UmVmLnByb3BzLm1lc3NhZ2UgIT09ICdsaXF1aWRzJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRFeHRyYUNvbXBvbmVudHMob3B0cykge1xuICAgICAgICBsZXQgY29sb3IgPSAnbWlsayc7XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0Nob2NvbGF0ZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ2Nob2NvbGF0ZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ09yYW5nZScpOlxuICAgICAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF8uaW5jbHVkZXMob3B0cy5pdGVtTmFtZSwgJ0ZydWl0Jyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnZnJ1aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXh0cmFzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGF3XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtDTEFXX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLm1vdmVDbGF3fVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17W1xuICAgICAgICAgICAgICAgICAgICAgICAgMjAwLCAyMDAsIDIwMCwgNTAwLCAxMDAsIDMwMDAsIDIwMCwgMjAwLCAyMDAsIDIwMCwgMjAwLCAyMDBcbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnbW92ZUNsYXcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZWx0XCJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtCRUxUX1NSQ31cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NTAwfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLm5leHR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnY2hvY29sYXRlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjMuY2hvY29sYXRlLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdmcnVpdCd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLmZydWl0Lmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnbWlsayd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4zLm1pbGtgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guU3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygncG91cicsIHtzaG93OiBvcHRzLnBvdXIgJiYgY29sb3IgPT09ICdvcmFuZ2UnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMy5vcmFuZ2UuanVpY2VgfVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXtvcHRzLnBvdXJ9XG4gICAgICAgICAgICAgICAgICAgIGxvb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17NjAwfVxuICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJhbWU6IHRoaXMucHJvcHMuZnJhbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImZ1bm5lbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e0ZVTk5FTF9TUkN9XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZT17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZnJvbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtGVU5ORUxfU1JDfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd0cnVjaycsIG9wdHMudHJ1Y2tDbGFzc05hbWUsIG9wdHMuc2VsZWN0YWJsZU1lc3NhZ2UpfVxuICAgICAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ9e29uVHJ1Y2tUcmFuc2l0aW9uRW5kLmJpbmQobnVsbCwgb3B0cyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydWNrLXN0YW5kXCIgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGl0ZW1zVG9Tb3J0LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gY2F0Y2hhYmxlc0FycmF5O1xuICAgIH0sXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMuanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLXR3by1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU2hhcmUgU29tZSBNb3JlITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBZb3VyIHNvcnRpbmcgc2tpbGxzIGFyZTxici8+XG4gICAgICAgICAgICAgICAgYWN0aW9ucyBvZiBraW5kbmVzcy48YnIvPlxuICAgICAgICAgICAgICAgIFNoYXJlIHRoZSBsb3ZlIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1NoYXJlVGhlTG92ZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMycsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX3R3b19pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEcm9wcGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2Ryb3BwZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9mYW50YXN0aWNfZm9vZF9zaGFyZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIHNjb3JlVG9XaW46IDE1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU3BlZWQgU2hhcmUhPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEdldCByZWFkeSBmb3IgYTxici8+XG4gICAgICAgICAgICAgICAgcnVzaCBvZiBraW5kbmVzcyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdTcGVlZHNoYXJlJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0czJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBzY29yZVRvV2luOiAyMDAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXkgU3VwZXIgU2hhcmVyITxici8+XG4gICAgICAgICAgICAgICAgS2luZG5lc3MganVzdDxici8+XG4gICAgICAgICAgICAgICAgc2t5cm9ja2V0ZWQgaW48YnIvPlxuICAgICAgICAgICAgICAgIHRoZSBsdW5jaHJvb20hPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIExldCdzIGRvIHRoaXMhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGV5U3VwZXJTaGFyZXJTa3lyb2NrZXRlZCcsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHMycsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2ZvdXJfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZmFudGFzdGljX2Zvb2Rfc2hhcmVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIERyb3BwZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBzY29yZVRvV2luOiAyNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9mYW50YXN0aWNfZm9vZF9zaGFyZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZpdmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoZSB0aXRsZSBvZjxici8+XG4gICAgICAgICAgICAgICAgRmFudGFzdGljIEZvb2QtU2hhcmVyPGJyLz5cbiAgICAgICAgICAgICAgICBpcyBvbiB0aGUgaG9yaXpvbiE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgTGV0J3MgbWFrZSB0aGlzIGhhcHBlbi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdPblRoZUhvcml6b24nLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzMnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2ZhbnRhc3RpY19mb29kX3NoYXJlcl9maXZlX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2ZhbnRhc3RpY19mb29kX3NoYXJlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgc2NvcmVUb1dpbjogMzAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZmFudGFzdGljX2Zvb2Rfc2hhcmVyX2xldmVsX2ZpdmVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1vbmUtaW5mbycsXG4gICAgICAgIGNsYXNzTmFtZTogJ2V4aGF1c3QnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgSnVzdCBiZWNhdXNlIGl0J3MgaW4gdGhlIGJpbi08YnIvPlxuICAgICAgICAgICAgICAgICAgICBkb2Vzbid0IG1lYW4gaXQgc2hvdWxkIGJlLjxici8+XG4gICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgIERyYWcgaXRlbXMgdG8gdGhlIHZlbnQ8YnIvPlxuICAgICAgICAgICAgICAgICAgICB0aGF0IHNob3VsZCBub3QgYmUgaW48YnIvPlxuICAgICAgICAgICAgICAgICAgICB0aGUgYmluIHRvIGJlIHJlc29ydGVkLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfV9jb21wb3N0YH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdEcmFnVG9CaW4nLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgICAgICBpbWFnZTogYCR7Q01XTi5NRURJQS5JTUFHRX1leGhhdXN0LnBuZ2AsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9vbmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHNjb3JlVG9XaW46IDEwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfb25lX3NjcmVlbi5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgTWFudWFsRHJvcHBlciBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9tYW51YWxfZHJvcHBlci8wLjEnO1xuaW1wb3J0IENhcm91c2VsIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL2Nhcm91c2VsLzAuMSc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvZHJvcHpvbmUvMC40JztcbmltcG9ydCBEcmFnZ2FibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvZHJhZ2dhYmxlLzAuNCc7XG5cbmNvbnN0IFBUUyA9ICdwdHMnO1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXksIG9wdHMgPSB7fSkge1xuICAgIGlmIChNYXRoLmFicyhwcm9wcy5nYW1lU3RhdGUuY3VycmVudFNjcmVlbkluZGV4IC0gcGFyc2VJbnQoa2V5LCAxMCkpID4gMikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5TY3JlZW5cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake29wdHMuZ2FtZU5hbWV9LSR7b3B0cy5sZXZlbH1gfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdWRpbz17YEJLRyR7b3B0cy5nYW1lTnVtYmVyfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzY3JlZW5Qcm9wcztcbiAgICAgICAgbGV0IHRpbWVyUHJvcHM7XG4gICAgICAgIGxldCBkcm9wcGVyUHJvcHM7XG4gICAgICAgIGxldCByZXZlYWxQcm9wcztcbiAgICAgICAgbGV0IGxpZmVQcm9wcztcbiAgICAgICAgbGV0IGRyYWdnYWJsZVByb3BzO1xuICAgICAgICBsZXQgZHJvcHpvbmVQcm9wcztcblxuICAgICAgICBsZXQgYmluQ29tcG9uZW50cztcblxuICAgICAgICBjb25zdCBMRVZFTF9QQVRIID0gYGdhbWVTdGF0ZS5kYXRhLiR7Xy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSl9LmxldmVscy4ke29wdHMubGV2ZWx9YDtcblxuICAgICAgICBsZXQgc3RhcnQgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uc3RhcnRgLCBmYWxzZSk7XG4gICAgICAgIGxldCBnYW1lQ29tcGxldGUgPSBfLmdldChwcm9wcywgYCR7TEVWRUxfUEFUSH0uY29tcGxldGVgLCBmYWxzZSk7XG4gICAgICAgIGxldCBkcm9wcGVkID0gXy5nZXQocHJvcHMsICdkYXRhLmRyYWdnYWJsZS5kcm9wcGVkJyk7XG4gICAgICAgIGxldCBkcmFnZ2luZyA9IF8uZ2V0KHByb3BzLCAnZGF0YS5kcmFnZ2FibGUuZHJhZ2dpbmcnKTtcbiAgICAgICAgbGV0IGl0ZW1OYW1lID0gXy5zdGFydENhc2UoXG4gICAgICAgICAgICBfLnJlcGxhY2UoXy5nZXQoZHJhZ2dpbmcsICdwcm9wcy5jbGFzc05hbWUnLCAnJyksIC9cXGQrL2csICcnKVxuICAgICAgICApO1xuICAgICAgICBsZXQgYmluTmFtZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5iaW5OYW1lJywgJycpO1xuICAgICAgICBsZXQgcmV2ZWFsT3BlbiA9IF8uZ2V0KHByb3BzLCAnZGF0YS5yZXZlYWwub3BlbicsIGZhbHNlKTtcbiAgICAgICAgbGV0IHJldmVhbENsb3NlID0gXy5nZXQocHJvcHMsICdkYXRhLnJldmVhbC5jbG9zZScsIGZhbHNlKTtcbiAgICAgICAgbGV0IGNhcm91c2VsTmV4dCA9IF8uZ2V0KHByb3BzLCAnZGF0YS5tYW51YWwtZHJvcHBlci5uZXh0JywgZmFsc2UpO1xuICAgICAgICBsZXQgcGxheSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5wbGF5JywgbnVsbCk7XG5cbiAgICAgICAgbGV0IGFuc3dlcnMgPSBfLmZpbHRlcihvcHRzLmJpbk5hbWVzLCBuYW1lID0+IG5hbWUgIT09IGJpbk5hbWUpO1xuXG4gICAgICAgIGxldCBhdWRpb0FycmF5ID0gb3B0cy5nZXRBdWRpb0FycmF5KCk7XG5cbiAgICAgICAgb3B0cy5zY29yZSA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5zY29yZWAsIDApO1xuICAgICAgICBvcHRzLmhpZ2hTY29yZSA9IF8uZ2V0KHByb3BzLCBgJHtMRVZFTF9QQVRIfS5oaWdoU2NvcmVgLCAwKTtcbiAgICAgICAgb3B0cy5oaXRzID0gXy5nZXQocHJvcHMsIGAke0xFVkVMX1BBVEh9LmhpdHNgLCAwKTtcbiAgICAgICAgb3B0cy5zZWxlY3RhYmxlTWVzc2FnZSA9IF8uZ2V0KHByb3BzLCAnZGF0YS5zZWxlY3RhYmxlLm1lc3NhZ2UnLCAnJyk7XG4gICAgICAgIG9wdHMucGxheUF1ZGlvID0gKFxuICAgICAgICAgICAgcGxheSA/IHBsYXkgOlxuICAgICAgICAgICAgcmV2ZWFsT3BlbiA9PT0gJ3Jlc29ydCcgPyAncmVzb3J0JyA6XG4gICAgICAgICAgICBfLmtlYmFiQ2FzZShpdGVtTmFtZSkgOiBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgc2NyZWVuUHJvcHMgPSBvcHRzLmdldFNjcmVlblByb3BzKG9wdHMpO1xuICAgICAgICB0aW1lclByb3BzID0gb3B0cy5nZXRUaW1lclByb3BzKG9wdHMpO1xuICAgICAgICBkcm9wcGVyUHJvcHMgPSBvcHRzLmdldERyb3BwZXJQcm9wcyhvcHRzKTtcbiAgICAgICAgcmV2ZWFsUHJvcHMgPSBvcHRzLmdldFJldmVhbFByb3BzKG9wdHMpO1xuICAgICAgICBsaWZlUHJvcHMgPSBvcHRzLmdldExpZmVQcm9wcyhvcHRzKTtcbiAgICAgICAgZHJhZ2dhYmxlUHJvcHMgPSBvcHRzLmdldERyYWdnYWJsZVByb3BzKG9wdHMpO1xuICAgICAgICBkcm9wem9uZVByb3BzID0gb3B0cy5nZXREcm9wem9uZVByb3BzKG9wdHMpO1xuXG4gICAgICAgIGJpbkNvbXBvbmVudHMgPSBfLm1hcChvcHRzLmJpbkl0ZW1zLCBiaW4gPT4gKHtcbiAgICAgICAgICAgIHR5cGU6IENhcm91c2VsLFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGJpbi5uYW1lLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGJpbi5uYW1lLFxuICAgICAgICAgICAgICAgIHNob3dOdW06IDIwLFxuICAgICAgICAgICAgICAgIG5leHRPblN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBiaW46IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogc2tvYXNoLlJhbmRvbWl6ZXIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW46IF8ubWFwKGJpbi5vYmplY3RzLCB2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRHJhZ2dhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiBfLmRlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB2Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHYuYmluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWNvbWVzOiB2LmJlY29tZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBnZXRDaGlsZHJlbih2KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBkcmFnZ2FibGVQcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIGlkPXtgJHtvcHRzLmdhbWVOYW1lfS0ke29wdHMubGV2ZWx9YH1cbiAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9eyFnYW1lQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF1ZGlvPXtgQktHJHtvcHRzLmdhbWVOdW1iZXJ9YH1cbiAgICAgICAgICAgICAgICB7Li4uc2NyZWVuUHJvcHN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wLWxlZnRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGV2ZWwtc2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5zY29yZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjb3JlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7UFRTfVxuICAgICAgICAgICAgICAgICAgICA8L3Nrb2FzaC5TY29yZT5cbiAgICAgICAgICAgICAgICAgICAgPHNrb2FzaC5UaW1lclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbDogXy5nZXQocHJvcHMsICdkYXRhLnRpbWVyLmZpbmFsJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9XCJtbTpzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXtvcHRzLnRpbWVvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17Z2FtZUNvbXBsZXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2U9e3JldmVhbE9wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWU9eyFyZXZlYWxPcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdGFydD17c3RhcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4udGltZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaXRlbS1uYW1lXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW1OYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJpbi1uYW1lXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Jpbk5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3Nrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TY29yZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaWZlXCJcbiAgICAgICAgICAgICAgICAgICAgbWF4PXswfVxuICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3Q9e29wdHMubWF4SGl0c31cbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdD17b3B0cy5oaXRzfVxuICAgICAgICAgICAgICAgICAgICBzZXRTY29yZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmxpZmVQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxEcm9wem9uZVxuICAgICAgICAgICAgICAgICAgICBkcm9wcGVkPXtkcm9wcGVkfVxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2luZz17ZHJhZ2dpbmd9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5kcm9wem9uZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpbmNvcnJlY3RPbk91dE9mQm91bmRzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmVzPXtbPHNrb2FzaC5Db21wb25lbnQgYW5zd2Vycz17YW5zd2Vyc30gLz5dfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPE1hbnVhbERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmluc1wiXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudD17b3B0cy5kcm9wcGVyQW1vdW50fVxuICAgICAgICAgICAgICAgICAgICBuZXh0PXtjYXJvdXNlbE5leHR9XG4gICAgICAgICAgICAgICAgICAgIGJpbj17PHNrb2FzaC5SYW5kb21pemVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbj17YmluQ29tcG9uZW50c31cbiAgICAgICAgICAgICAgICAgICAgLz59XG4gICAgICAgICAgICAgICAgICAgIHsuLi5kcm9wcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlJldmVhbFxuICAgICAgICAgICAgICAgICAgICBvcGVuVGFyZ2V0PVwicmV2ZWFsXCJcbiAgICAgICAgICAgICAgICAgICAgb3BlblJldmVhbD17cmV2ZWFsT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgY2xvc2VSZXZlYWw9e3JldmVhbENsb3NlfVxuICAgICAgICAgICAgICAgICAgICB7Li4ucmV2ZWFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmVzb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz4sXG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLk1lZGlhQ29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBwbGF5PXtvcHRzLnBsYXlBdWRpb31cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW49e2F1ZGlvQXJyYXl9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjaGVja1JlYWR5PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e3RydWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLlNjcmVlbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudC5qcyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHNob3J0aWQgZnJvbSAnc2hvcnRpZCc7XG5cbmltcG9ydCBTZWxlY3RhYmxlIGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xJztcblxuY2xhc3MgQ2Fyb3VzZWwgZXh0ZW5kcyBTZWxlY3RhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWQgJiYgbmV4dFByb3BzLnNlbGVjdGVkICE9PSB0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5uZXh0ICYmIG5leHRQcm9wcy5uZXh0ICE9PSB0aGlzLnByb3BzLm5leHQpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm5leHRPblN0YXJ0KSB0aGlzLm5leHQoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IHRoaXMuc3RhdGUuY2xhc3NlcztcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnN0YXRlLmxpc3Q7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5yZWZzLmJpbi5nZXQoMSlbMF07XG4gICAgICAgIGxpc3QgPSBsaXN0LmNvbmNhdChcbiAgICAgICAgICAgIDxpdGVtLnR5cGVcbiAgICAgICAgICAgICAgICB7Li4uaXRlbS5wcm9wc31cbiAgICAgICAgICAgICAgICB7Li4ue1xuICAgICAgICAgICAgICAgICAgICAnZGF0YS1rZXknOiBzaG9ydGlkLmdlbmVyYXRlKClcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBjbGFzc2VzWzBdID0gJyc7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMucHJvcHMuZW5hYmxlZDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBsaXN0LFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzWzBdID0gJ0xFQVZFJztcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMucHJvcHMucGF1c2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHZhciBsaXN0O1xuICAgICAgICAvLyBza29hc2guQ29tcG9uZW50IGlzIG5vdCB0aGUgc3VwZXIgaGVyZSwgYnV0IHRoaXMgaXMgd2hhdCB3ZSB3YW50XG4gICAgICAgIHNrb2FzaC5Db21wb25lbnQucHJvdG90eXBlLmJvb3RzdHJhcC5jYWxsKHRoaXMpO1xuXG4gICAgICAgIGxpc3QgPSB0aGlzLnJlZnMuYmluID8gdGhpcy5yZWZzLmJpbi5nZXQodGhpcy5wcm9wcy5zaG93TnVtICsgMSkgOiB0aGlzLnByb3BzLmxpc3Q7XG5cbiAgICAgICAgXy5lYWNoKGxpc3QsIGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aXRlbS50eXBlXG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICB7Li4ue1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEta2V5Jzogc2hvcnRpZC5nZW5lcmF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGlzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RIZWxwZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YVRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMucHJvcHMuZGF0YVRhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5zdGF0ZS5saXN0W3RoaXMucHJvcHMudGFyZ2V0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnY2Fyb3VzZWwnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc2hvcnRpZCBpcyBpbnRlbnRpb25hbGx5IG5vdCB1c2VkIGZvciBrZXkgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG8gbWFrZSBzdXJlXG4gICAgICogdGhhdCB0aGUgZWxlbWVudCBpcyB0cmFuc2l0aW9uZWQgYW5kIG5vdCByZXBsYWNlZC5cbiAgICAgKi9cbiAgICByZW5kZXJMaXN0KCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RhdGUubGlzdCB8fCB0aGlzLnByb3BzLmxpc3Q7XG4gICAgICAgIHJldHVybiBsaXN0Lm1hcCgobGksIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgIHZhciBvblRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgICByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHNbJ2RhdGEtcmVmJ10gfHwga2V5O1xuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kID0ga2V5ID09PSAwID8gdGhpcy5uZXh0IDogbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17bGkucHJvcHMubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmR9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1rZXk9e3Nob3J0aWQoa2V5KX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgb25DbGljayA9IHRoaXMucHJvcHMuY2xpY2thYmxlID8gdGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQmluKCl9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DYXJvdXNlbC5kZWZhdWx0UHJvcHMgPSBfLmRlZmF1bHRzKHtcbiAgICBzaG93TnVtOiAzLFxuICAgIHRhcmdldEluZGV4OiAxLFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgbmV4dE9uU3RhcnQ6IHRydWUsXG4gICAgcGF1c2U6IDUwMCxcbiAgICBjbGlja2FibGU6IGZhbHNlLFxuICAgIG9uU2VsZWN0OiBfLm5vb3AsXG59LCBTZWxlY3RhYmxlLmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvMC4xLmpzIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciBlbmNvZGUgPSByZXF1aXJlKCcuL2VuY29kZScpO1xudmFyIGRlY29kZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG52YXIgaXNWYWxpZCA9IHJlcXVpcmUoJy4vaXMtdmFsaWQnKTtcblxuLy8gSWdub3JlIGFsbCBtaWxsaXNlY29uZHMgYmVmb3JlIGEgY2VydGFpbiB0aW1lIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiB0aGUgZGF0ZSBlbnRyb3B5IHdpdGhvdXQgc2FjcmlmaWNpbmcgdW5pcXVlbmVzcy5cbi8vIFRoaXMgbnVtYmVyIHNob3VsZCBiZSB1cGRhdGVkIGV2ZXJ5IHllYXIgb3Igc28gdG8ga2VlcCB0aGUgZ2VuZXJhdGVkIGlkIHNob3J0LlxuLy8gVG8gcmVnZW5lcmF0ZSBgbmV3IERhdGUoKSAtIDBgIGFuZCBidW1wIHRoZSB2ZXJzaW9uLiBBbHdheXMgYnVtcCB0aGUgdmVyc2lvbiFcbnZhciBSRURVQ0VfVElNRSA9IDE0NTk3MDc2MDY1MTg7XG5cbi8vIGRvbid0IGNoYW5nZSB1bmxlc3Mgd2UgY2hhbmdlIHRoZSBhbGdvcyBvciBSRURVQ0VfVElNRVxuLy8gbXVzdCBiZSBhbiBpbnRlZ2VyIGFuZCBsZXNzIHRoYW4gMTZcbnZhciB2ZXJzaW9uID0gNjtcblxuLy8gaWYgeW91IGFyZSB1c2luZyBjbHVzdGVyIG9yIG11bHRpcGxlIHNlcnZlcnMgdXNlIHRoaXMgdG8gbWFrZSBlYWNoIGluc3RhbmNlXG4vLyBoYXMgYSB1bmlxdWUgdmFsdWUgZm9yIHdvcmtlclxuLy8gTm90ZTogSSBkb24ndCBrbm93IGlmIHRoaXMgaXMgYXV0b21hdGljYWxseSBzZXQgd2hlbiB1c2luZyB0aGlyZFxuLy8gcGFydHkgY2x1c3RlciBzb2x1dGlvbnMgc3VjaCBhcyBwbTIuXG52YXIgY2x1c3RlcldvcmtlcklkID0gcmVxdWlyZSgnLi91dGlsL2NsdXN0ZXItd29ya2VyLWlkJykgfHwgMDtcblxuLy8gQ291bnRlciBpcyB1c2VkIHdoZW4gc2hvcnRpZCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gb25lIHNlY29uZC5cbnZhciBjb3VudGVyO1xuXG4vLyBSZW1lbWJlciB0aGUgbGFzdCB0aW1lIHNob3J0aWQgd2FzIGNhbGxlZCBpbiBjYXNlIGNvdW50ZXIgaXMgbmVlZGVkLlxudmFyIHByZXZpb3VzU2Vjb25kcztcblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gUkVEVUNFX1RJTUUpICogMC4wMDEpO1xuXG4gICAgaWYgKHNlY29uZHMgPT09IHByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIHByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgdmVyc2lvbik7XG4gICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgY2x1c3RlcldvcmtlcklkKTtcbiAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgc3RyID0gc3RyICsgZW5jb2RlKGFscGhhYmV0Lmxvb2t1cCwgY291bnRlcik7XG4gICAgfVxuICAgIHN0ciA9IHN0ciArIGVuY29kZShhbHBoYWJldC5sb29rdXAsIHNlY29uZHMpO1xuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuXG4vKipcbiAqIFNldCB0aGUgc2VlZC5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBpZiB5b3UgZG9uJ3Qgd2FudCBwZW9wbGUgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgeW91ciBpZCBzY2hlbWEuXG4gKiBleHBvc2VkIGFzIHNob3J0aWQuc2VlZChpbnQpXG4gKiBAcGFyYW0gc2VlZCBJbnRlZ2VyIHZhbHVlIHRvIHNlZWQgdGhlIHJhbmRvbSBhbHBoYWJldC4gIEFMV0FZUyBVU0UgVEhFIFNBTUUgU0VFRCBvciB5b3UgbWlnaHQgZ2V0IG92ZXJsYXBzLlxuICovXG5mdW5jdGlvbiBzZWVkKHNlZWRWYWx1ZSkge1xuICAgIGFscGhhYmV0LnNlZWQoc2VlZFZhbHVlKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjbHVzdGVyIHdvcmtlciBvciBtYWNoaW5lIGlkXG4gKiBleHBvc2VkIGFzIHNob3J0aWQud29ya2VyKGludClcbiAqIEBwYXJhbSB3b3JrZXJJZCB3b3JrZXIgbXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyLiAgTnVtYmVyIGxlc3MgdGhhbiAxNiBpcyByZWNvbW1lbmRlZC5cbiAqIHJldHVybnMgc2hvcnRpZCBtb2R1bGUgc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gKi9cbmZ1bmN0aW9uIHdvcmtlcih3b3JrZXJJZCkge1xuICAgIGNsdXN0ZXJXb3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKlxuICogc2V0cyBuZXcgY2hhcmFjdGVycyB0byB1c2UgaW4gdGhlIGFscGhhYmV0XG4gKiByZXR1cm5zIHRoZSBzaHVmZmxlZCBhbHBoYWJldFxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpIHtcbiAgICBpZiAobmV3Q2hhcmFjdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFscGhhYmV0LmNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFscGhhYmV0LnNodWZmbGVkKCk7XG59XG5cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tRnJvbVNlZWQgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkJyk7XG5cbnZhciBPUklHSU5BTCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl8tJztcbnZhciBhbHBoYWJldDtcbnZhciBwcmV2aW91c1NlZWQ7XG5cbnZhciBzaHVmZmxlZDtcblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgc2h1ZmZsZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgaWYgKCFfYWxwaGFiZXRfKSB7XG4gICAgICAgIGlmIChhbHBoYWJldCAhPT0gT1JJR0lOQUwpIHtcbiAgICAgICAgICAgIGFscGhhYmV0ID0gT1JJR0lOQUw7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0XyA9PT0gYWxwaGFiZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfLmxlbmd0aCAhPT0gT1JJR0lOQUwubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFlvdSBzdWJtaXR0ZWQgJyArIF9hbHBoYWJldF8ubGVuZ3RoICsgJyBjaGFyYWN0ZXJzOiAnICsgX2FscGhhYmV0Xyk7XG4gICAgfVxuXG4gICAgdmFyIHVuaXF1ZSA9IF9hbHBoYWJldF8uc3BsaXQoJycpLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmQsIGFycil7XG4gICAgICAgcmV0dXJuIGluZCAhPT0gYXJyLmxhc3RJbmRleE9mKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgaWYgKHVuaXF1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gVGhlc2UgY2hhcmFjdGVycyB3ZXJlIG5vdCB1bmlxdWU6ICcgKyB1bmlxdWUuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgYWxwaGFiZXQgPSBfYWxwaGFiZXRfO1xuICAgIHJlc2V0KCk7XG59XG5cbmZ1bmN0aW9uIGNoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xyk7XG4gICAgcmV0dXJuIGFscGhhYmV0O1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKHNlZWQpIHtcbiAgICByYW5kb21Gcm9tU2VlZC5zZWVkKHNlZWQpO1xuICAgIGlmIChwcmV2aW91c1NlZWQgIT09IHNlZWQpIHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcHJldmlvdXNTZWVkID0gc2VlZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNodWZmbGUoKSB7XG4gICAgaWYgKCFhbHBoYWJldCkge1xuICAgICAgICBzZXRDaGFyYWN0ZXJzKE9SSUdJTkFMKTtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XG4gICAgdmFyIHRhcmdldEFycmF5ID0gW107XG4gICAgdmFyIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICB2YXIgY2hhcmFjdGVySW5kZXg7XG5cbiAgICB3aGlsZSAoc291cmNlQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgICAgIGNoYXJhY3RlckluZGV4ID0gTWF0aC5mbG9vcihyICogc291cmNlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgdGFyZ2V0QXJyYXkucHVzaChzb3VyY2VBcnJheS5zcGxpY2UoY2hhcmFjdGVySW5kZXgsIDEpWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldEFycmF5LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTaHVmZmxlZCgpIHtcbiAgICBpZiAoc2h1ZmZsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNodWZmbGVkO1xuICAgIH1cbiAgICBzaHVmZmxlZCA9IHNodWZmbGUoKTtcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG59XG5cbi8qKlxuICogbG9va3VwIHNodWZmbGVkIGxldHRlclxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBsb29rdXAoaW5kZXgpIHtcbiAgICB2YXIgYWxwaGFiZXRTaHVmZmxlZCA9IGdldFNodWZmbGVkKCk7XG4gICAgcmV0dXJuIGFscGhhYmV0U2h1ZmZsZWRbaW5kZXhdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuICAgIHNlZWQ6IHNldFNlZWQsXG4gICAgbG9va3VwOiBsb29rdXAsXG4gICAgc2h1ZmZsZWQ6IGdldFNodWZmbGVkXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9hbHBoYWJldC5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGb3VuZCB0aGlzIHNlZWQtYmFzZWQgcmFuZG9tIGdlbmVyYXRvciBzb21ld2hlcmVcbi8vIEJhc2VkIG9uIFRoZSBDZW50cmFsIFJhbmRvbWl6ZXIgMS4zIChDKSAxOTk3IGJ5IFBhdWwgSG91bGUgKGhvdWxlQG1zYy5jb3JuZWxsLmVkdSlcblxudmFyIHNlZWQgPSAxO1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBudW1iZXIgYmFzZWQgb24gYSBzZWVkXG4gKiBAcGFyYW0gc2VlZFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TmV4dFZhbHVlKCkge1xuICAgIHNlZWQgPSAoc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XG4gICAgcmV0dXJuIHNlZWQvKDIzMzI4MC4wKTtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChfc2VlZF8pIHtcbiAgICBzZWVkID0gX3NlZWRfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuZXh0VmFsdWU6IGdldE5leHRWYWx1ZSxcbiAgICBzZWVkOiBzZXRTZWVkXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tQnl0ZSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG5cbmZ1bmN0aW9uIGVuY29kZShsb29rdXAsIG51bWJlcikge1xuICAgIHZhciBsb29wQ291bnRlciA9IDA7XG4gICAgdmFyIGRvbmU7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgc3RyID0gc3RyICsgbG9va3VwKCAoIChudW1iZXIgPj4gKDQgKiBsb29wQ291bnRlcikpICYgMHgwZiApIHwgcmFuZG9tQnl0ZSgpICk7XG4gICAgICAgIGRvbmUgPSBudW1iZXIgPCAoTWF0aC5wb3coMTYsIGxvb3BDb3VudGVyICsgMSApICk7XG4gICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyeXB0byA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmICh3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0byk7IC8vIElFIDExIHVzZXMgd2luZG93Lm1zQ3J5cHRvXG5cbmZ1bmN0aW9uIHJhbmRvbUJ5dGUoKSB7XG4gICAgaWYgKCFjcnlwdG8gfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikgJiAweDMwO1xuICAgIH1cbiAgICB2YXIgZGVzdCA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoZGVzdCk7XG4gICAgcmV0dXJuIGRlc3RbMF0gJiAweDMwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbUJ5dGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tYnl0ZS1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbi8qKlxuICogRGVjb2RlIHRoZSBpZCB0byBnZXQgdGhlIHZlcnNpb24gYW5kIHdvcmtlclxuICogTWFpbmx5IGZvciBkZWJ1Z2dpbmcgYW5kIHRlc3RpbmcuXG4gKiBAcGFyYW0gaWQgLSB0aGUgc2hvcnRpZC1nZW5lcmF0ZWQgaWQuXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShpZCkge1xuICAgIHZhciBjaGFyYWN0ZXJzID0gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB2ZXJzaW9uOiBjaGFyYWN0ZXJzLmluZGV4T2YoaWQuc3Vic3RyKDAsIDEpKSAmIDB4MGYsXG4gICAgICAgIHdvcmtlcjogY2hhcmFjdGVycy5pbmRleE9mKGlkLnN1YnN0cigxLCAxKSkgJiAweDBmXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBjaGFyYWN0ZXJzID0gYWxwaGFiZXQuY2hhcmFjdGVycygpO1xuICAgIHZhciBsZW4gPSBpZC5sZW5ndGg7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjtpKyspIHtcbiAgICAgICAgaWYgKGNoYXJhY3RlcnMuaW5kZXhPZihpZFtpXSkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaG9ydElkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9zaG9ydGlkL2xpYi9pcy12YWxpZC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQXMgb2Ygc2tvYXNoIDEuMS4wIHRoaXMgY29tcG9uZW50IGNhbiBiZSBmb3VuZCBhdCBza29hc2guU2VsZWN0YWJsZVxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuY29uc29sZS53YXJuKCdBcyBvZiBza29hc2ggMS4xLjAgdGhpcyBjb21wb25lbnQgY2FuIGJlIGZvdW5kIGF0IHNrb2FzaC5TZWxlY3RhYmxlJyk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFNlbGVjdGFibGUgZXh0ZW5kcyBza29hc2guQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgICAgICAgc2VsZWN0RnVuY3Rpb246IHRoaXMuc2VsZWN0LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgc2VsZWN0Q2xhc3M7XG4gICAgICAgIHZhciBzZWxlY3RGdW5jdGlvbjtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG5cbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICBzZWxlY3RDbGFzcyA9IHRoaXMucHJvcHMuc2VsZWN0Q2xhc3MgfHwgdGhpcy5zdGF0ZS5zZWxlY3RDbGFzcyB8fCAnU0VMRUNURUQnO1xuICAgICAgICBzZWxlY3RGdW5jdGlvbiA9IHNlbGVjdENsYXNzID09PSAnSElHSExJR0hURUQnID8gdGhpcy5oaWdobGlnaHQgOiB0aGlzLnNlbGVjdDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RPblN0YXJ0KSB7XG4gICAgICAgICAgICBjbGFzc2VzW3RoaXMucHJvcHMuc2VsZWN0T25TdGFydF0gPSBzZWxlY3RDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBzZWxlY3RGdW5jdGlvbixcbiAgICAgICAgICAgIHNlbGVjdENsYXNzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBib290c3RyYXAoKSB7XG4gICAgICAgIHN1cGVyLmJvb3RzdHJhcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlZnMuYmluKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBsaXN0OiB0aGlzLnJlZnMuYmluLmdldEFsbCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEhlbHBlcihlLCBjbGFzc2VzKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHZhciBkYXRhUmVmO1xuICAgICAgICB2YXIgdGFyZ2V0O1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIHZhciBpc0NvcnJlY3Q7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhUmVmID0gZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ0xJJyk7XG5cbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgIGRhdGFSZWYgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmID0gc2VsZi5yZWZzW2RhdGFSZWZdO1xuXG4gICAgICAgIGlzQ29ycmVjdCA9IChyZWYgJiYgcmVmLnByb3BzICYmIHJlZi5wcm9wcy5jb3JyZWN0KSB8fFxuICAgICAgICAgICAgKCFzZWxmLnByb3BzLmFuc3dlcnMgfHwgIXNlbGYucHJvcHMuYW5zd2Vycy5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBzZWxmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkYXRhUmVmKSAhPT0gLTEpO1xuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmFsbG93RGVzZWxlY3QgJiYgY2xhc3Nlc1tkYXRhUmVmXSkge1xuICAgICAgICAgICAgZGVsZXRlIGNsYXNzZXNbZGF0YVJlZl07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb3JyZWN0KSB7XG4gICAgICAgICAgICBjbGFzc2VzW2RhdGFSZWZdID0gc2VsZi5zdGF0ZS5zZWxlY3RDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5wcm9wcy5zZWxlY3RSZXNwb25kLmNhbGwoc2VsZiwgZGF0YVJlZik7XG4gICAgICAgIHNlbGYucHJvcHMub25TZWxlY3QuY2FsbChzZWxmLCBkYXRhUmVmKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5jaG9vc2VPbmUpIHNlbGYuY29tcGxldGUoKTtcblxuICAgICAgICBpZiAoc2VsZi5wcm9wcy5kYXRhVGFyZ2V0KSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogc2VsZi5wcm9wcy5kYXRhVGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiByZWZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLnByb3BzLmNvbXBsZXRlTGlzdE9uQ2xpY2spIHtcbiAgICAgICAgICAgIF8uZWFjaChzZWxmLnJlZnMsIChyLCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IGlkKSBfLmludm9rZShyLCAnY29tcGxldGUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5lYWNoKHNlbGYucmVmcywgKHIsIGspID0+IHtcbiAgICAgICAgICAgIGlmIChrID09PSBkYXRhUmVmKSBfLmludm9rZShyLCAnY29tcGxldGUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RIZWxwZXIoZSwgY2xhc3Nlcyk7XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0KGUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnN0YXRlLmNsYXNzZXM7XG4gICAgICAgIHRoaXMuc2VsZWN0SGVscGVyKGUsIGNsYXNzZXMpO1xuICAgIH1cblxuICAgIGdldENsYXNzKGtleSwgbGkpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoXG4gICAgICAgICAgICBsaS5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNba2V5XSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY2xhc3Nlc1tsaS5wcm9wc1snZGF0YS1yZWYnXV0sXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNsYXNzZXNbbGkucHJvcHNbJ2RhdGEta2V5J11dXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoJ3NlbGVjdGFibGUnLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLnNlbGVjdCAmJiBwcm9wcy5zZWxlY3QgIT09IHRoaXMucHJvcHMuc2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdEZ1bmN0aW9uLmNhbGwodGhpcywgcHJvcHMuc2VsZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJpbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmJpbikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmJpbi50eXBlXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuYmluLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj1cImJpblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3QoKSB7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5wcm9wcy5saXN0IHx8IHRoaXMuc3RhdGUubGlzdCB8fCBbXTtcbiAgICAgICAgcmV0dXJuIF8ubWFwKGxpc3QsIChsaSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXIgZGF0YVJlZiA9IGxpLnByb3BzWydkYXRhLXJlZiddIHx8IGtleTtcbiAgICAgICAgICAgIHZhciByZWYgPSBsaS5yZWYgfHwgbGkucHJvcHMuaWQgfHwgZGF0YVJlZjtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbGkucHJvcHMubWVzc2FnZSB8fCAnJyArIGtleTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgey4uLmxpLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibGlcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3Moa2V5LCBsaSl9XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1yZWY9e2RhdGFSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCaW4oKX1cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0gb25DbGljaz17dGhpcy5zdGF0ZS5zZWxlY3RGdW5jdGlvbi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNlbGVjdGFibGUuZGVmYXVsdFByb3BzID0gXy5kZWZhdWx0cyh7XG4gICAgc2VsZWN0Q2xhc3M6ICdTRUxFQ1RFRCcsXG4gICAgY29tcGxldGVMaXN0T25DbGljazogdHJ1ZSxcbiAgICBzZWxlY3RSZXNwb25kOiBfLm5vb3AsXG4gICAgb25TZWxlY3Q6IF8ubm9vcCxcbn0sIHNrb2FzaC5Db21wb25lbnQuZGVmYXVsdFByb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0YWJsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdGFibGUvMC4xLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyb3B6b25lIGV4dGVuZHMgc2tvYXNoLkNvbXBvbmVudCB7XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRyb3B6b25lO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlO1xuXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgc2VsZi5kcm9wem9uZUNvcm5lcnMgPSBfLm1hcChzZWxmLnByb3BzLmRyb3B6b25lcywgKHZhbHVlLCBrZXkpID0+XG4gICAgICAgICAgICBzZWxmLmdldENvcm5lcnMoUmVhY3RET00uZmluZERPTU5vZGUoc2VsZi5yZWZzW2Bkcm9wem9uZS0ke2tleX1gXSkpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNlbGYubG9hZERhdGEgJiYgdHlwZW9mIHNlbGYubG9hZERhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZjEucmVmICYmIHJlZjEuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JJbihzZWxmLnJlZnMsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5Mi5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZWZzW2tleTFdICYmIHJlZjIucHJvcHMubWVzc2FnZSA9PT0gcmVmMS5yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSA9IHNlbGYucmVmc1trZXkxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLnNldFN0YXRlKHtjb250ZW50OiBkcmFnZ2FibGV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUocmVmMS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3JyZWN0KGRyYWdnYWJsZSwga2V5MS5yZXBsYWNlKCdkcm9wem9uZS0nLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYyLCBrZXkyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZnNba2V5Ml0uc2V0U3RhdGUoe2NvbnRlbnQ6IFtdfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjMsIGtleTMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5My5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaW5jbHVkZXMocmVmMiwgcmVmMy5wcm9wcy5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZnNba2V5Ml0uc3RhdGUuY29udGVudC5wdXNoKHJlZjMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWYzLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZERyYWdORHJvcERhdGEoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRyb3B6b25lO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlO1xuICAgICAgICBfLmZvckluKHNlbGYubG9hZERhdGEsIChyZWYxLCBrZXkxKSA9PiB7XG4gICAgICAgICAgICBfLmZvckluKHNlbGYucmVmcywgKHJlZjIsIGtleTIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Mi5pbmRleE9mKCdkcmFnZ2FibGUtJykgPT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmVmc1trZXkxXSAmJiByZWYyLnByb3BzLm1lc3NhZ2UgPT09IHJlZjEucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lID0gc2VsZi5yZWZzW2tleTFdO1xuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogZHJhZ2dhYmxlfSk7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZS5zZXRTdGF0ZShyZWYxLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3JyZWN0KGRyYWdnYWJsZSwga2V5MS5yZXBsYWNlKCdkcm9wem9uZS0nLCAnJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkTXVsdGlBc253ZXJEYXRhKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkcm9wem9uZTtcbiAgICAgICAgdmFyIGRyYWdnYWJsZTtcbiAgICAgICAgXy5mb3JJbihzZWxmLmxvYWREYXRhLCAocmVmMSwga2V5MSkgPT4ge1xuICAgICAgICAgICAgZHJvcHpvbmUgPSBzZWxmLnJlZnNba2V5MV07XG4gICAgICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y29udGVudDogW119KTtcbiAgICAgICAgICAgIF8uZm9ySW4oc2VsZi5yZWZzLCAocmVmMiwga2V5MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkyLmluZGV4T2YoJ2RyYWdnYWJsZS0nKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSByZWYyO1xuICAgICAgICAgICAgICAgIGlmIChfLmluY2x1ZGVzKHJlZjEsIGRyYWdnYWJsZS5wcm9wcy5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZS5zdGF0ZS5jb250ZW50LnB1c2goZHJhZ2dhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLm1hcmtDb3JyZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENvcm5lcnMoZWwpIHtcbiAgICAgICAgdmFyIG9mZnNldDtcbiAgICAgICAgdmFyIGNvcm5lcnMgPSBbXTtcblxuICAgICAgICBvZmZzZXQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgY29ybmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBvZmZzZXQubGVmdCArIG9mZnNldC53aWR0aCAqIChpID09PSAxIHx8IGkgPT09IDIgPyAxIDogMCksXG4gICAgICAgICAgICAgICAgeTogb2Zmc2V0LnRvcCArIG9mZnNldC5oZWlnaHQgKiAoaSA+IDEgPyAxIDogMCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JuZXJzO1xuICAgIH1cblxuICAgIG9uRHJvcChkcm9wcGVkKSB7XG4gICAgICAgIHZhciBkcm9wcGVkRE9NO1xuICAgICAgICB2YXIgY29ybmVycztcbiAgICAgICAgdmFyIGRyb3B6b25lUmVmO1xuXG4gICAgICAgIGRyb3BwZWRET00gPSBkcm9wcGVkLkRPTU5vZGUgfHwgUmVhY3RET00uZmluZERPTU5vZGUoZHJvcHBlZCk7XG4gICAgICAgIGNvcm5lcnMgPSB0aGlzLmdldENvcm5lcnMoZHJvcHBlZERPTSk7XG5cbiAgICAgICAgZHJvcHpvbmVSZWYgPSBfLnJlZHVjZSh0aGlzLnByb3BzLmRyb3B6b25lcywgKGEsIHYsIGspID0+IHtcbiAgICAgICAgICAgIGlmIChza29hc2gudXRpbC5kb0ludGVyc2VjdChjb3JuZXJzLCB0aGlzLmRyb3B6b25lQ29ybmVyc1trXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2Bkcm9wem9uZS0ke2t9YF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChkcm9wem9uZVJlZikge1xuICAgICAgICAgICAgdGhpcy5pbkJvdW5kcyhkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm91dE9mQm91bmRzKGRyb3BwZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyb3AuY2FsbCh0aGlzLCBkcm9wcGVkKTtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dpbmcpIHtcbiAgICAgICAgXy5lYWNoKHRoaXMucHJvcHMuZHJvcHpvbmVzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgICAgdmFyIGRyb3B6b25lUmVmO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5zO1xuICAgICAgICAgICAgZHJvcHpvbmVSZWYgPSB0aGlzLnJlZnNbYGRyb3B6b25lLSR7a2V5fWBdO1xuICAgICAgICAgICAgY29udGFpbnMgPSBkcm9wem9uZVJlZi5jb250YWlucyB8fCBbXTtcbiAgICAgICAgICAgIGluZGV4ID0gY29udGFpbnMuaW5kZXhPZihkcmFnZ2luZyk7XG4gICAgICAgICAgICBpZiAofmluZGV4KSBjb250YWlucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZHJvcHpvbmVSZWYuY29udGFpbnMgPSBjb250YWlucztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyYWcuY2FsbCh0aGlzLCBkcmFnZ2luZyk7XG4gICAgfVxuXG4gICAgaW5Cb3VuZHMoZHJvcHBlZCwgZHJvcHpvbmVSZWYpIHtcbiAgICAgICAgaWYgKCFkcm9wem9uZVJlZi5wcm9wcy5hbnN3ZXJzIHx8IGRyb3B6b25lUmVmLnByb3BzLmFuc3dlcnMuaW5kZXhPZihkcm9wcGVkLnByb3BzLm1lc3NhZ2UpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG91dE9mQm91bmRzKGRyb3BwZWQpIHtcbiAgICAgICAgLy8gcmVzcG9uZCB0byBhbiBvdXQgb2YgYm91bmRzIGRyb3BcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ291dCcpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmNvcnJlY3RPbk91dE9mQm91bmRzKSB0aGlzLmluY29ycmVjdChkcm9wcGVkKTtcbiAgICB9XG5cbiAgICBjb3JyZWN0KGRyb3BwZWQsIGRyb3B6b25lUmVmKSB7XG4gICAgICAgIC8vIHJlc3BvbmQgdG8gY29ycmVjdCBkcm9wXG4gICAgICAgIGRyb3BwZWQubWFya0NvcnJlY3QoKTtcbiAgICAgICAgdGhpcy5wbGF5TWVkaWEoJ2NvcnJlY3QnKTtcblxuICAgICAgICBkcm9wem9uZVJlZi5jb250YWlucyA9IChkcm9wem9uZVJlZi5jb250YWlucyB8fCBbXSkuY29uY2F0KGRyb3BwZWQpO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25Db3JyZWN0LmNhbGwodGhpcywgZHJvcHBlZCwgZHJvcHpvbmVSZWYpO1xuICAgIH1cblxuICAgIGluY29ycmVjdChkcm9wcGVkLCBkcm9wem9uZVJlZikge1xuICAgICAgICAvLyByZXNwb25kIHRvIGluY29ycmVjdCBkcm9wXG4gICAgICAgIGRyb3BwZWQubWFya0luY29ycmVjdCgpO1xuICAgICAgICB0aGlzLnBsYXlNZWRpYSgnaW5jb3JyZWN0Jyk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbmNvcnJlY3QuY2FsbCh0aGlzLCBkcm9wcGVkLCBkcm9wem9uZVJlZik7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKTtcblxuICAgICAgICBpZiAocHJvcHMuZHJvcHBlZCAmJiBwcm9wcy5kcm9wcGVkICE9PSB0aGlzLnByb3BzLmRyb3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Ecm9wKHByb3BzLmRyb3BwZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmRyYWdnaW5nICYmIHByb3BzLmRyYWdnaW5nICE9PSB0aGlzLnByb3BzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZyhwcm9wcy5kcmFnZ2luZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEcm9wem9uZXMoKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnByb3BzLmRyb3B6b25lcywgKGNvbXBvbmVudCwga2V5KSA9PlxuICAgICAgICAgICAgPGNvbXBvbmVudC50eXBlXG4gICAgICAgICAgICAgICAgey4uLmNvbXBvbmVudC5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e2Bkcm9wem9uZS0ke2tleX1gfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWVzKCkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcygnZHJvcHpvbmVzJywgc3VwZXIuZ2V0Q2xhc3NOYW1lcygpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50TGlzdCgnYXNzZXRzJyl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRHJvcHpvbmVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRyb3B6b25lLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyb3B6b25lczogWzxza29hc2guQ29tcG9uZW50IC8+XSxcbiAgICBvbkNvcnJlY3Q6IF8ubm9vcCxcbiAgICBvbkluY29ycmVjdDogXy5ub29wLFxuICAgIG9uRHJhZzogXy5ub29wLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIGluY29ycmVjdE9uT3V0T2ZCb3VuZHM6IHRydWUsXG59LCBza29hc2guQ29tcG9uZW50LmRlZmF1bHRQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvc2hhcmVkL2NvbXBvbmVudHMvZHJvcHpvbmUvMC40LmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIHNrb2FzaC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZW5kWDogMCxcbiAgICAgICAgICAgIGVuZFk6IDAsXG4gICAgICAgICAgICB6b29tOiAxLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubW91c2VEb3duID0gdGhpcy5tb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5tb3VzZVVwID0gdGhpcy5tb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5tb3ZlRXZlbnQgPSB0aGlzLm1vdmVFdmVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMudG91Y2hTdGFydCA9IHRoaXMudG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnRvdWNoRW5kID0gdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2V0Wm9vbSA9IHRoaXMuc2V0Wm9vbS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3VsZERyYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNob3VsZERyYWcuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBtYXJrQ29ycmVjdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb3JyZWN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYXJrSW5jb3JyZWN0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZXR1cm5PbkluY29ycmVjdCkge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEV2ZW50KGUsIGNiKSB7XG4gICAgICAgIHZhciByZWN0O1xuICAgICAgICB2YXIgc3RhcnRYO1xuICAgICAgICB2YXIgc3RhcnRZO1xuICAgICAgICB2YXIgZW5kWDtcbiAgICAgICAgdmFyIGVuZFk7XG4gICAgICAgIHZhciBncmFiWDtcbiAgICAgICAgdmFyIGdyYWJZO1xuXG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcy5ET01Ob2RlKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5zaG91bGREcmFnKCkpIHJldHVybjtcblxuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkge1xuICAgICAgICAgICAgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgZSA9IGUudGFyZ2V0VG91Y2hlc1swXTtcbiAgICAgICAgICAgIGUub2Zmc2V0WCA9IGUucGFnZVggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICBlLm9mZnNldFkgPSBlLnBhZ2VZIC0gcmVjdC50b3A7XG4gICAgICAgIH1cblxuICAgICAgICBncmFiWCA9IGUub2Zmc2V0WCAvIHRoaXMuc3RhdGUuem9vbTtcbiAgICAgICAgZ3JhYlkgPSBlLm9mZnNldFkgLyB0aGlzLnN0YXRlLnpvb207XG5cbiAgICAgICAgc3RhcnRYID0gZW5kWCA9IChlLnBhZ2VYIC8gdGhpcy5zdGF0ZS56b29tIC0gZ3JhYlgpO1xuICAgICAgICBzdGFydFkgPSBlbmRZID0gKGUucGFnZVkgLyB0aGlzLnN0YXRlLnpvb20gLSBncmFiWSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJldHVybikge1xuICAgICAgICAgICAgc3RhcnRYID0gXy5pc0Zpbml0ZSh0aGlzLnN0YXRlLmdyYWJYKSA/XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydFggKyB0aGlzLnN0YXRlLmdyYWJYIC0gZ3JhYlggOlxuICAgICAgICAgICAgICAgIHN0YXJ0WDtcbiAgICAgICAgICAgIHN0YXJ0WSA9IF8uaXNGaW5pdGUodGhpcy5zdGF0ZS5ncmFiWSkgP1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnRZICsgdGhpcy5zdGF0ZS5ncmFiWSAtIGdyYWJZIDpcbiAgICAgICAgICAgICAgICBzdGFydFk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRyYWdnaW5nOiB0cnVlLFxuICAgICAgICAgICAgcmV0dXJuOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXJ0WCxcbiAgICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICAgIGdyYWJYLFxuICAgICAgICAgICAgZ3JhYlksXG4gICAgICAgICAgICBlbmRYLFxuICAgICAgICAgICAgZW5kWSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdGUoe1xuICAgICAgICAgICAgcGF0aDogdGhpcy5wcm9wcy5kcmFnZ2FibGVUYXJnZXQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IHRoaXMsXG4gICAgICAgICAgICAgICAgZHJvcHBlZDogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyYWcuY2FsbCh0aGlzLCB0aGlzKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSBjYi5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIGF0dGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG91Y2hFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICAgIH1cblxuICAgIG1vdXNlRG93bihlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRFdmVudChlLCB0aGlzLmF0dGFjaE1vdXNlRXZlbnRzKTtcbiAgICB9XG5cbiAgICB0b3VjaFN0YXJ0KGUpIHtcbiAgICAgICAgdGhpcy5zdGFydEV2ZW50KGUsIHRoaXMuYXR0YWNoVG91Y2hFdmVudHMpO1xuICAgIH1cblxuICAgIG1vdmVFdmVudChlKSB7XG4gICAgICAgIGUgPSBlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdID8gZS50YXJnZXRUb3VjaGVzWzBdIDogZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVuZFg6IChlLnBhZ2VYIC8gdGhpcy5zdGF0ZS56b29tIC0gdGhpcy5zdGF0ZS5ncmFiWCksXG4gICAgICAgICAgICBlbmRZOiAoZS5wYWdlWSAvIHRoaXMuc3RhdGUuem9vbSAtIHRoaXMuc3RhdGUuZ3JhYlkpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbmRFdmVudChjYikge1xuICAgICAgICB0aGlzLm9uRHJvcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJldHVybikge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5Ub1N0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIGNiLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0RW5kKGVuZFgsIGVuZFkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlbmRYLFxuICAgICAgICAgICAgZW5kWVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm5Ub1N0YXJ0KCkge1xuICAgICAgICB2YXIgZW5kWDtcbiAgICAgICAgdmFyIGVuZFk7XG4gICAgICAgIHZhciBkb1JldHVybjtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdGF5T25Db3JyZWN0ICYmIHRoaXMuc3RhdGUuY29ycmVjdCkge1xuICAgICAgICAgICAgZW5kWCA9IHRoaXMuc3RhdGUuZW5kWDtcbiAgICAgICAgICAgIGVuZFkgPSB0aGlzLnN0YXRlLmVuZFk7XG4gICAgICAgICAgICBkb1JldHVybiA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kWCA9IHRoaXMuc3RhdGUuc3RhcnRYO1xuICAgICAgICAgICAgZW5kWSA9IHRoaXMuc3RhdGUuc3RhcnRZO1xuICAgICAgICAgICAgZG9SZXR1cm4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICByZXR1cm46IGRvUmV0dXJuLFxuICAgICAgICAgICAgZW5kWCxcbiAgICAgICAgICAgIGVuZFksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRldGFjaE1vdXNlRXZlbnRzKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgfVxuXG4gICAgZGV0YWNoVG91Y2hFdmVudHMoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQpO1xuICAgIH1cblxuICAgIG1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hNb3VzZUV2ZW50cyk7XG4gICAgfVxuXG4gICAgdG91Y2hFbmQoKSB7XG4gICAgICAgIHRoaXMuZW5kRXZlbnQodGhpcy5kZXRhY2hUb3VjaEV2ZW50cyk7XG4gICAgfVxuXG4gICAgb25Ecm9wKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTdGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLnByb3BzLmRyYWdnYWJsZVRhcmdldCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICBkcm9wcGVkOiB0aGlzXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb3BzLm9uRHJvcC5jYWxsKHRoaXMsIHRoaXMpO1xuICAgIH1cblxuICAgIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgc3VwZXIuYm9vdHN0cmFwKCk7XG5cbiAgICAgICAgdGhpcy5zZXRab29tKCk7XG5cbiAgICAgICAgdGhpcy5ET01Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG5cbiAgICAgICAgdGhpcy5ET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICAgICAgdGhpcy5ET01Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldFpvb20pO1xuICAgIH1cblxuICAgIHNldFpvb20oKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdnZXRTdGF0ZScpLnRoZW4oc3RhdGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgem9vbTogc3RhdGUuc2NhbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIGxldCB4ID0gdGhpcy5zdGF0ZS5lbmRYIC0gdGhpcy5zdGF0ZS5zdGFydFggfHwgMDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLnN0YXRlLmVuZFkgLSB0aGlzLnN0YXRlLnN0YXJ0WSB8fCAwO1xuICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLnN0YXRlLnNjYWxlIHx8IDE7XG4gICAgICAgIGxldCByb3RhdGUgPSB0aGlzLnN0YXRlLnJvdGF0ZSB8fCAwO1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt4fXB4KSB0cmFuc2xhdGVZKCR7eX1weCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcblxuICAgICAgICByZXR1cm4gXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICB0cmFuc2Zvcm0sXG4gICAgICAgICAgICBXZWJraXRUcmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgfSwgdGhpcy5zdGF0ZS5zdHlsZSwgdGhpcy5wcm9wcy5zdHlsZSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoe1xuICAgICAgICAgICAgRFJBR0dJTkc6IHRoaXMuc3RhdGUuZHJhZ2dpbmcsXG4gICAgICAgICAgICBSRVRVUk46IHRoaXMuc3RhdGUucmV0dXJuLFxuICAgICAgICAgICAgQ09SUkVDVDogdGhpcy5zdGF0ZS5jb3JyZWN0LFxuICAgICAgICB9LCAnZHJhZ2dhYmxlJywgdGhpcy5zdGF0ZS5jbGFzc2VzLCBzdXBlci5nZXRDbGFzc05hbWVzKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICAgICAgICAgIGRhdGEtbWVzc2FnZT17dGhpcy5wcm9wcy5tZXNzYWdlfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49e3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuRHJhZ2dhYmxlLmRlZmF1bHRQcm9wcyA9IF8uZGVmYXVsdHMoe1xuICAgIGRyYWdnYWJsZVRhcmdldDogJ2RyYWdnYWJsZScsXG4gICAgc2hvdWxkRHJhZzogKCkgPT4gdHJ1ZSxcbiAgICByZXR1cm46IGZhbHNlLFxuICAgIHJldHVybk9uSW5jb3JyZWN0OiBmYWxzZSxcbiAgICBzdGF5T25Db3JyZWN0OiB0cnVlLFxuICAgIG9uRHJvcDogXy5ub29wLFxuICAgIG9uRHJhZzogXy5ub29wLFxufSwgc2tvYXNoLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBEcmFnZ2FibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9zaGFyZWQvY29tcG9uZW50cy9kcmFnZ2FibGUvMC40LmpzIiwiaW1wb3J0IGRlZmF1bHRHYW1lT3B0cyBmcm9tICcuL2RlZmF1bHRfZ2FtZV9vcHRzJztcblxuaW1wb3J0IGl0ZW1zQ29tcG9zdCBmcm9tICcuL2l0ZW1zX2NvbXBvc3QnO1xuaW1wb3J0IGl0ZW1zTGFuZGZpbGwgZnJvbSAnLi9pdGVtc19sYW5kZmlsbCc7XG5pbXBvcnQgaXRlbXNSZWN5Y2xlIGZyb20gJy4vaXRlbXNfcmVjeWNsZSc7XG5cbmxldCBzaHVmZmxlZEl0ZW1zQ29tcG9zdCA9IF8uc2h1ZmZsZShpdGVtc0NvbXBvc3QpO1xubGV0IHNodWZmbGVkSXRlbXNMYW5kZmlsbCA9IF8uc2h1ZmZsZShpdGVtc0xhbmRmaWxsKTtcbmxldCBzaHVmZmxlZEl0ZW1zUmVjeWNsZSA9IF8uc2h1ZmZsZShpdGVtc1JlY3ljbGUpO1xuXG5sZXQgaXRlbXNUb1NvcnQgPSBbXS5jb25jYXQoaXRlbXNDb21wb3N0KS5jb25jYXQoaXRlbXNMYW5kZmlsbCkuY29uY2F0KGl0ZW1zUmVjeWNsZSk7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT5cbiAgICBfLmtlYmFiQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdkeW5hbWljLWRpdmVydGVyJyxcbiAgICBnYW1lTnVtYmVyOiA0LFxuICAgIHBvaW50c1BlckJpbjogNDAwLFxuICAgIHNjb3JlVG9XaW46IDEyMDAsXG4gICAgZHJvcHBlckFtb3VudDogMixcbiAgICBnZXREcm9wcGVyUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbk5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ21hbnVhbC1kcm9wcGVyJywgJ2Jpbk5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZS5pdGVtc1t0aGlzLmZpcnN0SXRlbUluZGV4XS5wcm9wcy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyYWdnYWJsZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBfLnJhbmRvbSgzMCwgNzApICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogXy5yYW5kb20oMzAsIDcwKSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IF8ucmFuZG9tKDEsIDEuNSksXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogXy5yYW5kb20oLTMwLCAzMCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RHJvcHpvbmVQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNvcnJlY3Q6IGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlLm1hcmtDb3JyZWN0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICgoc2NvcmUgJSBvcHRzLnBvaW50c1BlckJpbikgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFsnbWFudWFsLWRyb3BwZXInLCAnbmV4dCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoZHJhZ2dhYmxlLCBkcm9wem9uZUFycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkcm9wem9uZUFycmF5KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBlbmRYOiBkcmFnZ2FibGUuc3RhdGUuZW5kWCArIDIwMCxcbiAgICAgICAgICAgICAgICAgICAgZW5kWTogZHJhZ2dhYmxlLnN0YXRlLmVuZFkgKyAyMDAsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBbJ3JldmVhbCcsICdvcGVuJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICdyZXNvcnQnLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZWFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHM6IG9wdHMuaGl0cyArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzc2V0czogW1xuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiY29ycmVjdFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUNvcnJlY3RTZWxlY3QubXAzYH0gLz4sXG4gICAgICAgICAgICAgICAgPHNrb2FzaC5BdWRpbyByZWY9XCJpbmNvcnJlY3RcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1Xcm9uZ1NlbGVjdC5tcDNgfSAvPixcbiAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cImRyYWdcIiB0eXBlPVwic2Z4XCIgc3JjPXtgJHtDTVdOLk1FRElBLkVGRkVDVH1EcmFnLm1wM2B9IC8+LFxuICAgICAgICAgICAgICAgIDxza29hc2guQXVkaW8gcmVmPVwiZHJvcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfVZhY3V1bS5tcDNgfSAvPixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvbkRyYWc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlNZWRpYSgnZHJhZycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRHJvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheU1lZGlhKCdkcm9wJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QXVkaW9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIGF1ZGlvQXJyYXk7XG4gICAgfSxcbiAgICBiaW5JdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncmVjeWNsZScsXG4gICAgICAgICAgICBvYmplY3RzOiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0NvbXBvc3Quc3BsaWNlKDAsIDIpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0xhbmRmaWxsLnNwbGljZSgwLCAyKSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNSZWN5Y2xlLnNwbGljZSgwLCA2KSksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdsYW5kZmlsbCcsXG4gICAgICAgICAgICBvYmplY3RzOiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0NvbXBvc3Quc3BsaWNlKDAsIDIpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc0xhbmRmaWxsLnNwbGljZSgwLCA2KSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KHNodWZmbGVkSXRlbXNSZWN5Y2xlLnNwbGljZSgwLCAyKSksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjb21wb3N0JyxcbiAgICAgICAgICAgIG9iamVjdHM6IFtdXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zQ29tcG9zdC5zcGxpY2UoMCwgNikpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChzaHVmZmxlZEl0ZW1zTGFuZGZpbGwuc3BsaWNlKDAsIDIpKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoc2h1ZmZsZWRJdGVtc1JlY3ljbGUuc3BsaWNlKDAsIDIpKSxcbiAgICAgICAgfSxcbiAgICBdXG59LCBkZWZhdWx0R2FtZU9wdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFNlbmQgbWlzcGxhY2VkIGl0ZW1zPGJyLz5cbiAgICAgICAgICAgICAgICBiYWNrIHRvIGJlIHNvcnRlZCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgSGVscCBvdGhlcnMgYnkgaWRlbnRpZnlpbmc8YnIvPlxuICAgICAgICAgICAgICAgIGl0ZW1zIGluIHRoZSB3cm9uZyBiaW4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnTWlzcGxhY2VkSXRlbXMnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdHdvX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQgZnJvbSAnLi9keW5hbWljX2RpdmVydGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfZHluYW1pY19kaXZlcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwgXy5kZWZhdWx0cyh7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBzY29yZVRvV2luOiAxNTAsXG4gICAgfSwgZGVmYXVsdE9wdHMpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2xldmVsX3R3b19zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdkeW5hbWljLWRpdmVydGVyLXRocmVlLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXYXkgdG8gU29ydCE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhpcyBuZXh0IGxldmVsIHRha2VzPGJyLz5cbiAgICAgICAgICAgICAgICBTdXBlciBTb3J0aW5nIFNraWxscyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdXYXlUb1NvcnQnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIHNjb3JlVG9XaW46IDIwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfdGhyZWVfc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAnZHluYW1pYy1kaXZlcnRlci1mb3VyLWluZm8nLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBJdCdzIGdldHRpbmcgbWVzc3kgaW4gaGVyZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhlc2UgYmlucyBhcmUgZnVsbDxici8+XG4gICAgICAgICAgICAgICAgb2YgdGhpbmdzIHRoYXQgc2hvdWxkbid0PGJyLz5cbiAgICAgICAgICAgICAgICBoYXZlIGxhbmRlZCBoZXJlLjxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBnZXQgc29ydGluZyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdHZXR0aW5nTWVzc3knLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzQnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfZm91cl9pbmZvX3NjcmVlbi5qcyIsImltcG9ydCBEeW5hbWljRGl2ZXJ0ZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHluYW1pY19kaXZlcnRlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X2R5bmFtaWNfZGl2ZXJ0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgc2NvcmVUb1dpbjogMjUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvZHluYW1pY19kaXZlcnRlcl9sZXZlbF9mb3VyX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ2R5bmFtaWMtZGl2ZXJ0ZXItZml2ZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgV2FzdGUgRGl2ZXJzaW9uIGlzIHRoZTxici8+XG4gICAgICAgICAgICAgICAgbmFtZSBvZiB0aGUgZ2FtZS48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgVGhlIHRpdGxlIG9mPGJyLz5cbiAgICAgICAgICAgICAgICBEeW5hbWljIERpdmVydGVyIGlzPGJyLz5cbiAgICAgICAgICAgICAgICBqdXN0IGFyb3VuZCB0aGUgY29ybmVyLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ1dhc3RlRGl2ZXJzaW9uJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c0JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9keW5hbWljX2RpdmVydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHluYW1pY0RpdmVydGVyR2FtZUNvbXBvbmVudCBmcm9tICcuL2R5bmFtaWNfZGl2ZXJ0ZXJfZ2FtZV9jb21wb25lbnQnO1xuaW1wb3J0IGRlZmF1bHRPcHRzIGZyb20gJy4vZGVmYXVsdF9keW5hbWljX2RpdmVydGVyX29wdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIER5bmFtaWNEaXZlcnRlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIHNjb3JlVG9XaW46IDMwMCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL2R5bmFtaWNfZGl2ZXJ0ZXJfbGV2ZWxfZml2ZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICd3YW50LXRvLXN0YWNrJyxcbiAgICAgICAgY2xhc3NOYW1lOiAncmlnaHQnLFxuICAgICAgICBjb250ZW50OiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXaHkgd291bGQgeW91PGJyLz5cbiAgICAgICAgICAgICAgICB3YW50IHRvIHN0YWNrPGJyLz5cbiAgICAgICAgICAgICAgICB5b3VyIHRyYXk/XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnV2h5U3RhY2snLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3dhbnRfdG9fc3RhY2tfc2NyZWVuLmpzIiwiY29uc3QgU1JDID0gJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2NoYW5nZW15d29ybGRub3cvdmlkZW8vdXBsb2FkLycgK1xuICAgICd2MTQ4NjUwNzg3My9iYWRfc3RhY2tpbmdfY29tcHJlc3NlZF9uM2dycHcubXA0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxza29hc2guU2NyZWVuXG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaWQ9XCJ2aWRlb1wiXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXVkaW89XCJCS0c1XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNrb2FzaC5WaWRlbyBzcmM9e1NSQ30gLz5cbiAgICAgICAgPC9za29hc2guU2NyZWVuPlxuICAgICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvdmlkZW9fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci1vbmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFByb3BlciB0cmF5IHN0YWNraW5nPGJyLz5cbiAgICAgICAgICAgICAgICBpcyBhIGdhbWUgb2Ygc3BhY2UuPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIEhvdyBtdWNoIHNwYWNlPGJyLz5cbiAgICAgICAgICAgICAgICBjYW4geW91IHNhdmU/XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnR2FtZU9mU3BhY2UnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfb25lX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIHRpbWVvdXQ6IDEyMDAwMCxcbiAgICAgICAgc2NvcmVUb1dpbjogMTAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9vbmVfc2NyZWVuLmpzIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBkZWZhdWx0R2FtZU9wdHMgZnJvbSAnLi9kZWZhdWx0X2dhbWVfb3B0cyc7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcbmltcG9ydCB0cmF5c0FycmF5IGZyb20gJy4vdHJheXNfYXJyYXknO1xuXG5sZXQgcmVzb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgIGtleXM6IFsncmV2ZWFsJywgJ29wZW4nXSxcbiAgICAgICAgZGF0YTogJ3Jlc29ydCcsXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXZlYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYW51YWwtZHJvcHBlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWNrVXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5sZXQgYmluTmFtZXMgPSBbXG4gICAgJ2xpcXVpZHMnLFxuICAgICdmb29kLXNoYXJlJyxcbiAgICAncmVjeWNsZScsXG4gICAgJ2xhbmRmaWxsJyxcbiAgICAnY29tcG9zdCcsXG4gICAgJ3RyYXktc3RhY2tpbmcnLFxuICAgICdob21lJyxcbl07XG5cbmxldCBpdGVtc1RvU29ydCA9IF8uZmlsdGVyKEl0ZW1zVG9Tb3J0LCBpdGVtID0+IF8uaW5jbHVkZXMoYmluTmFtZXMsIGl0ZW0uYmluKSk7XG5cbmxldCBhdWRpb1JlZnMgPSBfLnVuaXEoXy5tYXAoaXRlbXNUb1NvcnQsIHYgPT5cbiAgICBfLmtlYmFiQ2FzZShfLnJlcGxhY2Uodi5uYW1lLCAvXFxkKy9nLCAnJykpKVxuKTtcblxubGV0IGF1ZGlvQXJyYXkgPSBfLm1hcChhdWRpb1JlZnMsICh2LCBrKSA9PiAoe1xuICAgIHR5cGU6IHNrb2FzaC5BdWRpbyxcbiAgICByZWY6IHYsXG4gICAga2V5OiBrLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHR5cGU6ICd2b2ljZU92ZXInLFxuICAgICAgICBzcmM6IGAke0NNV04uTUVESUEuR0FNRSArICdzb3VuZC1hc3NldHMvX3Zvc2l0ZW1zLycgKyB2fS5tcDNgLFxuICAgICAgICBvblBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ25ldyddLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSkpO1xuXG5hdWRpb0FycmF5ID0gYXVkaW9BcnJheS5jb25jYXQoW1xuICAgIDxza29hc2guQXVkaW8gcmVmPVwibmV4dFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUx1bmNoYm94U2xpZGUubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJjb3JyZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9Q29udmV5b3JCZWx0Lm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicmVzb3J0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9UmVzb3J0V2FybmluZy5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInBpY2tVcFwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUl0ZW1GbGlwLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwicG91clwiIHR5cGU9XCJzZnhcIiBzcmM9e2Ake0NNV04uTUVESUEuRUZGRUNUfUxpcXVpZFBvdXIubXAzYH0gLz4sXG4gICAgPHNrb2FzaC5BdWRpbyByZWY9XCJ0cmF5XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9VHJheVN0YWNrZXJSYWNrLm1wM2B9IC8+LFxuICAgIDxza29hc2guQXVkaW8gcmVmPVwic2VsZWN0XCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9SXRlbVNlbGVjdC5tcDNgfSAvPixcbiAgICA8c2tvYXNoLkF1ZGlvIHJlZj1cInRpbWVyXCIgdHlwZT1cInNmeFwiIHNyYz17YCR7Q01XTi5NRURJQS5FRkZFQ1R9U2Vjb25kVGltZXIubXAzYH0gLz4sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgXy5kZWZhdWx0cyh7XG4gICAgZ2FtZU5hbWU6ICdtYXN0ZXItc29ydGVyJyxcbiAgICBnYW1lTnVtYmVyOiA1LFxuICAgIGRyb3BwZXJBbW91bnQ6IDIsXG4gICAgYmluTmFtZXMsXG4gICAgY29sbGlkZUZyYWN0aW9uOiAuNCxcbiAgICBnZXRTZWxlY3RhYmxlUHJvcHMob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChiaW5SZWZLZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHJvcENsYXNzID0gXy50b1VwcGVyKG9wdHMuYmluTmFtZXNbYmluUmVmS2V5XSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuaXRlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogWydpdGVtJywgJ2NsYXNzTmFtZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZHJvcENsYXNzLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERyb3BwZXJQcm9wcyhvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyYXkgPSB0aGlzLmdldEZpcnN0SXRlbSgpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2YodHJheS5yZWZzWydjaGlsZHJlbi0wJ10uc3RhdGUuY2xhc3NlcywgJ1NFTEVDVEVEJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1SZWYgPSAhb3B0cy5pdGVtUmVmID8gdHJheSA6IHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnJlZnNbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICBsZXQgRE9NTm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgb25BbmltYXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgIT09ICd0b3AnIHx8XG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmluY2x1ZGVzKG9wdHMuaXRlbUNsYXNzTmFtZSwgJ0xJUVVJRFMnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIV8uaW5jbHVkZXModGhpcy5wcm9wcy5kcm9wQ2xhc3MsICdMSVFVSURTJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLml0ZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ21hbnVhbC1kcm9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wQ2xhc3M6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbVJlZi5wcm9wcy5tZXNzYWdlICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW18uY2FtZWxDYXNlKG9wdHMuZ2FtZU5hbWUpLCAnbGV2ZWxzJywgb3B0cy5sZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBvcHRzLnNjb3JlIC0gb3B0cy5wb2ludHNQZXJNaXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpdHMgPT09IG9wdHMubWF4SGl0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNvcnQuY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgRE9NTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW1SZWYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKERPTU5vZGUgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBvbkFuaW1hdGlvbkVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maXJzdEl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RhYmxlID0gaXRlbS5wcm9wcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGFibGUucHJvcHMubGlzdFtpdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW0ucHJvcHMuY2xhc3NOYW1lID0gc2VsZWN0ZWRJdGVtLnByb3BzLmJlY29tZXMubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtLnByb3BzLm1lc3NhZ2UgPSBzZWxlY3RlZEl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbS5wcm9wc1snZGF0YS1tZXNzYWdlJ10gPSBzZWxlY3RlZEl0ZW0ucHJvcHMuYmVjb21lcy5iaW47XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2luZGV4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBbXy5jYW1lbENhc2Uob3B0cy5nYW1lTmFtZSksICdsZXZlbHMnLCBvcHRzLmxldmVsLCAnc2NvcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuc2NvcmUgKyBvcHRzLnBvaW50c1Blckl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogb3B0cy5pdGVtQW1vdW50IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYXkucmVmc1snY2hpbGRyZW4tMCddLnNldFN0YXRlKHtjbGFzc2VzOiB7fX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91cjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghXy5pbmNsdWRlcyhvcHRzLml0ZW1DbGFzc05hbWUsICdQT1VSJykpIHtcbiAgICAgICAgICAgICAgICAgICAgRE9NTm9kZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBvbkFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1SZWYuYWRkQ2xhc3NOYW1lKCdQT1VSJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFsnaXRlbScsICdwb3VyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5pdGVtUmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQcm9wcy5pdGVtQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLml0ZW1DbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RhYmxlID0gdGhpcy5yZWZzWydpdGVtcy0nICsgdGhpcy5maXJzdEl0ZW1JbmRleF0ucmVmc1snY2hpbGRyZW4tMCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JbmRleCA9IF8uaW5kZXhPZihzZWxlY3RhYmxlLnN0YXRlLmNsYXNzZXMsIHNlbGVjdGFibGUucHJvcHMuc2VsZWN0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxlY3RhYmxlLnJlZnNbaXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzc05hbWUobmV4dFByb3BzLml0ZW1DbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5yZW1vdmVJdGVtQ2xhc3NOYW1lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMucmVtb3ZlSXRlbUNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5pdGVtQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0YWJsZSA9IHRoaXMucmVmc1snaXRlbXMtJyArIHRoaXMuZmlyc3RJdGVtSW5kZXhdLnJlZnNbJ2NoaWxkcmVuLTAnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSBfLmluZGV4T2Yoc2VsZWN0YWJsZS5zdGF0ZS5jbGFzc2VzLCBzZWxlY3RhYmxlLnByb3BzLnNlbGVjdENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZWN0YWJsZS5yZWZzW2l0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQWxsQ2xhc3NOYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NOYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0SXRlbSAmJlxuICAgICAgICAgICAgICAgICAgICBuZXh0UHJvcHMuc2VsZWN0SXRlbSAhPT0gdGhpcy5wcm9wcy5zZWxlY3RJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmF5ID0gdGhpcy5nZXRGaXJzdEl0ZW0oKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJheS5wcm9wcy5tZXNzYWdlID09PSAnaG9tZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYXkuYWRkQ2xhc3NOYW1lKCdIT01FJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRyYXkpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBfLnN0YXJ0Q2FzZShfLnJlcGxhY2UodHJheS5wcm9wcy5jbGFzc05hbWUsIC9cXGQrL2csICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IHJlY3QubGVmdCArIChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSAqIC44IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b3AgPSByZWN0LnRvcCArIChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSAqIC44IC8gMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogXy5yZWR1Y2UodGhpcy5nZXRGaXJzdEl0ZW0oKS5yZWZzWydjaGlsZHJlbi0wJ10ucmVmcywgKGEsIHJlZikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSArIChyZWYucHJvcHMubWVzc2FnZSA9PT0gJ2xpcXVpZHMnID8gMiA6IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0SXRlbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hlclByb3BzKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ29ycmVjdDogZnVuY3Rpb24gKGJ1Y2tldFJlZikge1xuICAgICAgICAgICAgICAgIGxldCBhbW91bnQgPSBvcHRzLml0ZW1BbW91bnQgLSAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWwsICdzY29yZSddLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNjb3JlICsgb3B0cy5wb2ludHNQZXJJdGVtLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuaXRlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ0FVR0hUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnbWFudWFsLWRyb3BwZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RJdGVtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENsYXNzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5nZXQoYnVja2V0UmVmLCAncHJvcHMubWVzc2FnZScpICE9PSAnbGlxdWlkcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFudWFsLWRyb3BwZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5jb3JyZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdHMgPSBvcHRzLmhpdHMgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFtfLmNhbWVsQ2FzZShvcHRzLmdhbWVOYW1lKSwgJ2xldmVscycsIG9wdHMubGV2ZWxdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogb3B0cy5zY29yZSAtIG9wdHMucG9pbnRzUGVyTWlzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NyZWVuRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc05hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRzID09PSBvcHRzLm1heEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hbnVhbC1kcm9wcGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29ydC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEV4dHJhQ29tcG9uZW50cyhvcHRzKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdtaWxrJztcblxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnQ2hvY29sYXRlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnY2hvY29sYXRlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnT3JhbmdlJyk6XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXy5pbmNsdWRlcyhvcHRzLml0ZW1OYW1lLCAnRnJ1aXQnKTpcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdmcnVpdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNrb2FzaC5Db21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmF5LXN0YWNraW5nLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgVHJheSBTdGFja2luZ1xuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ2Nob2NvbGF0ZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1sZXZlbC4yLmNob2NvbGF0ZS5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnZnJ1aXQnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5mcnVpdC5qdWljZWB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e29wdHMucG91cn1cbiAgICAgICAgICAgICAgICAgICAgbG9vcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs2MDB9XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lPXswfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmcmFtZTogdGhpcy5wcm9wcy5mcmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNrb2FzaC5TcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwb3VyJywge3Nob3c6IG9wdHMucG91ciAmJiBjb2xvciA9PT0gJ21pbGsnfSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17YCR7Q01XTi5NRURJQS5TUFJJVEV9bGV2ZWwuMi5taWxrYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BvdXInLCB7c2hvdzogb3B0cy5wb3VyICYmIGNvbG9yID09PSAnb3JhbmdlJ30pfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2Ake0NNV04uTUVESUEuU1BSSVRFfWxldmVsLjIub3JhbmdlLmp1aWNlYH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17b3B0cy5wb3VyfVxuICAgICAgICAgICAgICAgICAgICBsb29wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249ezYwMH1cbiAgICAgICAgICAgICAgICAgICAgZnJhbWU9ezB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9e2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyYW1lOiB0aGlzLnByb3BzLmZyYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc2tvYXNoLkNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGdldEF1ZGlvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBhdWRpb0FycmF5O1xuICAgIH0sXG4gICAgZ2V0Q2F0Y2hhYmxlc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gdHJheXNBcnJheTtcbiAgICB9LFxufSwgZGVmYXVsdEdhbWVPcHRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cy5qcyIsImltcG9ydCBDYXRjaGFibGUgZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvY2F0Y2hhYmxlLzAuMic7XG5pbXBvcnQgSXRlbXNUb1NvcnQgZnJvbSAnLi9pdGVtc190b19zb3J0JztcblxubGV0IG9uU2VsZWN0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGxldCByZWYgPSB0aGlzLnJlZnNba2V5XTtcbiAgICBsZXQgcmVjdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHJlZikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy51cGRhdGVTY3JlZW5EYXRhKHtcbiAgICAgICAga2V5OiAnaXRlbScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG5hbWU6IF8uc3RhcnRDYXNlKF8ucmVwbGFjZShyZWYucHJvcHMuY2xhc3NOYW1lLCAvXFxkKy9nLCAnJykpLFxuICAgICAgICAgICAgbmV3OiB0cnVlLFxuICAgICAgICAgICAgcmVmLFxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxubGV0IG9uQm9vdHN0cmFwID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaW52b2tlQ2hpbGRyZW5GdW5jdGlvbignbWFya0NhdGNoYWJsZScpO1xufTtcblxubGV0IGdldE5hbWUgPSBuYW1lID0+IHtcbiAgICBpZiAoIV8uaW5jbHVkZXMobmFtZSwgJ3RyYXknKSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJ3RyYXktYmx1ZScsXG4gICAgICAgICAgICAndHJheS1waW5rJyxcbiAgICAgICAgXVtfLnJhbmRvbSgwLCAxKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG59O1xuXG5sZXQgZ2V0Q2hpbGRyZW4gPSB2ID0+IHtcbiAgICBpZiAodi5jaGlsZHJlbikgcmV0dXJuIHYuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c2tvYXNoLlNwcml0ZVxuICAgICAgICAgICAgc3JjPXtgJHtDTVdOLk1FRElBLlNQUklURX1fJHtfLnJlcGxhY2Uodi5iaW4sICctJywgJycpfWB9XG4gICAgICAgICAgICBmcmFtZT17di5mcmFtZSB8fCAxfVxuICAgICAgICAgICAgc3RhdGljXG4gICAgICAgIC8+XG4gICAgKTtcbn07XG5cbmxldCBtYXBJdGVtcyA9IGZ1bmN0aW9uIChpdGVtTmFtZXMpIHtcbiAgICBsZXQgaXRlbXMgPSBfLmZpbHRlcihJdGVtc1RvU29ydCwgaXRlbSA9PiBfLmluY2x1ZGVzKGl0ZW1OYW1lcywgaXRlbS5uYW1lKSk7XG5cbiAgICByZXR1cm4gXy5tYXAoaXRlbXMsIGl0ZW0gPT5cbiAgICAgICAgPENhdGNoYWJsZVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtpdGVtLm5hbWV9XG4gICAgICAgICAgICBtZXNzYWdlPXtpdGVtLmJpbn1cbiAgICAgICAgICAgIHJlQ2F0Y2hhYmxlPXt0cnVlfVxuICAgICAgICAgICAgYmVjb21lcz17aXRlbS5iZWNvbWVzfVxuICAgICAgICAgICAgY2hpbGRyZW49e2dldENoaWxkcmVuKGl0ZW0pfVxuICAgICAgICAvPlxuICAgICk7XG59O1xuXG5sZXQgdHJheURhdGEgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnY2xlYW4tYWx1bWludW0tZm9pbCcsXG4gICAgICAgICAgICAnYXBwbGUtY29yZScsXG4gICAgICAgICAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyJyxcbiAgICAgICAgICAgICdiYWctb2YtcG90YXRvLWNoaXBzJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2NoaWNrZW4tbGVnJyxcbiAgICAgICAgICAgICdlbXB0eS1jaGlwLWJhZycsXG4gICAgICAgICAgICAnc2VhbGVkLXByZXR6ZWwnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnaGFtLXNhbmR3aWNoJyxcbiAgICAgICAgICAgICd3aG9sZS1iYW5hbmEnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnaGFtLXNhbmR3aWNoJyxcbiAgICAgICAgICAgICdlbXB0eS1iYWctb2YtY2hpcHMnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1jaG9jb2xhdGUtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAncGFwZXItcGFja2FnaW5nJyxcbiAgICAgICAgICAgICdvcmFuZ2Utc2xpY2UnLFxuICAgICAgICAgICAgJ2dyYWhhbS1jb29raWUtd3JhcHBlcicsXG4gICAgICAgICAgICAnc2VhbGVkLXBvcGNvcm4nLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnZnJ1aXQtc25hY2std3JhcHBlcicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAndXNlZC1wYXBlci1zYW5kd2ljaC13cmFwcGVyJyxcbiAgICAgICAgICAgICdmcnVpdC1zbmFjay13cmFwcGVyJyxcbiAgICAgICAgICAgICdwYWNrYWdlLW9mLWRyaWVkLWZydWl0JyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94JyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ25hcGtpbicsXG4gICAgICAgICAgICAnc3R5cm9mb2FtLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAncGFja2FnZWQtZGlubmVyLXJvbGwnLFxuICAgICAgICAgICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnZW1wdHktcmFpc2luLWJveCcsXG4gICAgICAgICAgICAnZW1wdHktY3JhY2tlci13cmFwcGVyJyxcbiAgICAgICAgICAgICd1bm9wZW5lZC1ncmFub2xhLWJhcicsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdmcnVpdC1zbmFjay13cmFwcGVyJyxcbiAgICAgICAgICAgICdzZWFsZWQtYmFnLW9mLWNhcnJvdHMnLFxuICAgICAgICAgICAgJ2Z1bGwtcGxhc3RpYy13YXRlci1ib3R0bGUnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnY2xlYW4tYWx1bWludW0tZm9pbCcsXG4gICAgICAgICAgICAnYmFuYW5hLXBlZWwnLFxuICAgICAgICAgICAgJ2VtcHR5LWNoaXAtYmFnJyxcbiAgICAgICAgICAgICdmcmVzaC11bm9wZW5lZC1zYW5kd2ljaCcsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICd0ZWFiYWcnLFxuICAgICAgICAgICAgJ2VtcHR5LXNuYWNrLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3NlYWxlZC1hcHBsZXNhdWNlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdtZXRhbC1mb29kLWNhbicsXG4gICAgICAgICAgICAnY2VsZXJ5LXN0aWNrJyxcbiAgICAgICAgICAgICdlbmVyZ3ktYmFyLXdyYXBwZXInLFxuICAgICAgICAgICAgJ2JhZy1vZi1wb3RhdG8tY2hpcHMnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1ib3gtb2YtY3JhY2tlcnMnLFxuICAgICAgICAgICAgJ3BsYXN0aWMtc3BvcmsnLFxuICAgICAgICAgICAgJ2JveC1vZi1jaGVkZGFyLWNyYWNrZXJzJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtb3JhbmdlLWp1aWNlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ25hcGtpbicsXG4gICAgICAgICAgICAncGxhc3RpYy1iYWdnaWUnLFxuICAgICAgICAgICAgJ3dob2xlLWFwcGxlJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ3BsYXN0aWMtY3VwJyxcbiAgICAgICAgICAgICdkaXJ0eS1wYXBlci1mb29kLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnYXBwbGVzYXVjZS1wb3VjaCcsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdtZXRhbC1mb29kLWNhbicsXG4gICAgICAgICAgICAnY2hpY2tlbi1sZWcnLFxuICAgICAgICAgICAgJ3dob2xlLW9yYW5nZScsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWxlbW9uYWRlLWJveCcsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAncGxhc3RpYy1jdXAnLFxuICAgICAgICAgICAgJ25hcGtpbicsXG4gICAgICAgICAgICAnZW1wdHktY2hpcC1iYWcnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHkteW9ndXJ0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnY2VsZXJ5LXN0aWNrJyxcbiAgICAgICAgICAgICdwbGFzdGljLXNwb29uJyxcbiAgICAgICAgICAgICdzZWFsZWQtbWlsaycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdjbGVhbi1hbHVtaW51bS1mb2lsJyxcbiAgICAgICAgICAgICdlbXB0eS1yYWlzaW4tYm94JyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtY2hvY29sYXRlLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ29yYW5nZS1zbGljZScsXG4gICAgICAgICAgICAncGxhc3RpYy1zdHJhd3MnLFxuICAgICAgICAgICAgJ3NlYWxlZC1wcmV0emVsJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LWNvb2tpZS1ib3gnLFxuICAgICAgICAgICAgJ2tldGNodXAtcGFja2V0JyxcbiAgICAgICAgICAgICdmdWxsLXBsYXN0aWMtd2F0ZXItYm90dGxlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdwbGFzdGljLWN1cCcsXG4gICAgICAgICAgICAnbmFwa2luJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2FsdW1pbnVtLWJldmVyYWdlLWNhbicsXG4gICAgICAgICAgICAnZm9vZC1zb2lsZWQtcGFwZXItcGxhdGUnLFxuICAgICAgICAgICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlcicsXG4gICAgICAgICAgICAncGFja2FnZWQtdmVnZXRhYmxlcycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLWNob2NvbGF0ZS1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS15b2d1cnQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICdjYXJyb3Qtc3RpY2tzJyxcbiAgICAgICAgICAgICdlbXB0eS1jaGlwLWJhZycsXG4gICAgICAgICAgICAnaGFsZi1mdWxsLW9yYW5nZS1qdWljZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdsdW5jaGJveCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAndXNlZC1wYXBlci1zYW5kd2ljaC13cmFwcGVyJyxcbiAgICAgICAgICAgICdncmFoYW0tY29va2llLXdyYXBwZXInLFxuICAgICAgICAgICAgJ3Vub3BlbmVkLXBhY2stb2YtZ3JhcGVzJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1taWxrLWNhcnRvbicsXG4gICAgICAgICAgICAnaGFtLXNhbmR3aWNoJyxcbiAgICAgICAgICAgICdwYWNrYWdlLW9mLWRyaWVkLWZydWl0JyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbGVtb25hZGUtYm94JyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2JhbmFuYS1wZWVsJyxcbiAgICAgICAgICAgICdidXJyaXRvLXdyYXBwZXInLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1taWxrLWNhcnRvbicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1wbGFzdGljLXBhY2thZ2UnLFxuICAgICAgICAgICAgJ2NlbGVyeS1zdGljaycsXG4gICAgICAgICAgICAnY2VyZWFsLWxpZC13cmFwcGVyJyxcbiAgICAgICAgICAgICdzZWFsZWQtZnJ1aXQtZHJpbmsnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2J1cnJpdG8td3JhcHBlcicsXG4gICAgICAgICAgICAncGFja2FnZWQtZGlubmVyLXJvbGwnLFxuICAgICAgICAgICAgJ2hhbGYtZnVsbC1vcmFuZ2UtanVpY2UnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAncGFwZXItcGFja2FnaW5nJyxcbiAgICAgICAgICAgICduYXBraW4nLFxuICAgICAgICAgICAgJ2VtcHR5LWZydWl0LWp1aWNlLXBsYXN0aWMnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktYWx1bWludW0tY2FuJyxcbiAgICAgICAgICAgICdhcHBsZS1jb3JlJyxcbiAgICAgICAgICAgICdhcHBsZXNhdWNlLXBvdWNoJyxcbiAgICAgICAgICAgICdtdXN0YXJkLXBhY2tldCcsXG4gICAgICAgICAgICAnZnVsbC1wbGFzdGljLXdhdGVyLWJvdHRsZScsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdwbGFzdGljLWN1cCcsXG4gICAgICAgICAgICAnb3JhbmdlLXNsaWNlJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtbWlsay1jYXJ0b24nLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2JveC1vZi1jb29raWVzJyxcbiAgICAgICAgICAgICd1bm9wZW5lZC1lbmVyZ3ktYmFyJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LWJveC1vZi1jcmFja2VycycsXG4gICAgICAgICAgICAnaGFtLXNhbmR3aWNoJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtY2hvY29sYXRlLW1pbGstY2FydG9uJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3RyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ2VtcHR5LXlvZ3VydC1jb250YWluZXInLFxuICAgICAgICAgICAgJ2NhcnJvdC1zdGlja3MnLFxuICAgICAgICAgICAgJ3BsYXN0aWMtc3Bvb24nLFxuICAgICAgICAgICAgJ21heW8tcGFja2V0JyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtb3JhbmdlLWp1aWNlJyxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2x1bmNoYm94JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdlbXB0eS1wbGFzdGljLWJvdHRsZScsXG4gICAgICAgICAgICAnc29pbGVkLXBhcGVyLXRyYXknLFxuICAgICAgICAgICAgJ2VtcHR5LWNyYWNrZXItd3JhcHBlcicsXG4gICAgICAgICAgICAnc2VhbGVkLWFwcGxlc2F1Y2UnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndHJheScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnZW1wdHktY29va2llLWJveCcsXG4gICAgICAgICAgICAnanVpY2UtYm94JyxcbiAgICAgICAgICAgICdzZWFsZWQtcG9wY29ybicsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd0cmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdiYW5hbmEtcGVlbCcsXG4gICAgICAgICAgICAnZW1wdHktYmFnLW9mLWNoaXBzJyxcbiAgICAgICAgICAgICdoYWxmLWZ1bGwtY2FydG9uLW9mLW1pbGsnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbHVuY2hib3gnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ21ldGFsLWZvb2QtY2FuJyxcbiAgICAgICAgICAgICdmb29kLXNvaWxlZC1wYXBlci1wbGF0ZScsXG4gICAgICAgICAgICAncGxhc3RpYy1zcG9yaycsXG4gICAgICAgICAgICAnYm94LW9mLWNoZWRkYXItY3JhY2tlcnMnLFxuICAgICAgICBdLFxuICAgIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBfLm1hcCh0cmF5RGF0YSwgZGF0YSA9PiB7XG4gICAgbGV0IGJpbiA9IF8uaW5jbHVkZXMoZGF0YS5uYW1lLCAndHJheScpID8gJ3RyYXktc3RhY2tpbmcnIDogJ2hvbWUnO1xuICAgIGxldCBuYW1lID0gZ2V0TmFtZShkYXRhLm5hbWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQ2F0Y2hhYmxlLFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBuYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogYmluLFxuICAgICAgICAgICAgcmVDYXRjaGFibGU6IHRydWUsXG4gICAgICAgICAgICBjaGlsZHJlbjogZ2V0Q2hpbGRyZW4oe1xuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgYmluLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIDxza29hc2guU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Cb290c3RyYXA9e29uQm9vdHN0cmFwfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdD17bWFwSXRlbXMoZGF0YS5pdGVtcyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgfTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL3RyYXlzX2FycmF5LmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10d28taW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIE5vdCBhbGwgbHVuY2hlcyBhcmU8YnIvPlxuICAgICAgICAgICAgICAgIGNyZWF0ZWQgZXF1YWxseS48YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgU29tZSBsdW5jaGVzIGNvbWUgZnJvbTxici8+XG4gICAgICAgICAgICAgICAgaG9tZSBhbmQgdGhlcmUgaXM8YnIvPlxuICAgICAgICAgICAgICAgIG5vIHRyYXkgc3RhY2tpbmcgbmVlZGVkIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0x1bmNoZXNDcmVhdGVkRXF1YWxseScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl90d29faW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgc2NvcmVUb1dpbjogMTUwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90d29fc2NyZWVuLmpzIiwiaW1wb3J0IEluZm9TY3JlZW5Db21wb25lbnQgZnJvbSAnLi9pbmZvX3NjcmVlbl9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHJlZiwga2V5KSB7XG4gICAgcmV0dXJuIEluZm9TY3JlZW5Db21wb25lbnQocHJvcHMsIHJlZiwga2V5LCB7XG4gICAgICAgIGlkOiAncHJpY2VsZXNzLXBvdXJlci10aHJlZS1pbmZvJyxcbiAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSXRlbXMgZnJvbSBob21lPGJyLz5cbiAgICAgICAgICAgICAgICBjYW4gYmUgdHJpY2t5ITxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICBUaGV5IGFyZSB1bmlxdWUgYW5kIHlvdTxici8+XG4gICAgICAgICAgICAgICAgYXJlIG9uIHlvdXIgb3duIHRvIHNvcnQhPGJyLz5cbiAgICAgICAgICAgICAgICBBc2sgZm9yIGhlbHAgaWYgeW91PGJyLz5cbiAgICAgICAgICAgICAgICBhcmUgdW5zdXJlIG9mIGl0ZW1zLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ0l0ZW1zRnJvbUhvbWUnLFxuICAgICAgICBzZng6ICdJbmZvRnJhbWVNb3ZlMScsXG4gICAgICAgIGJhY2tncm91bmRBdWRpbzogJ0JLRzUnLFxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfdGhyZWVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgc2NvcmVUb1dpbjogMjAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF90aHJlZV9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZvdXItaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFRoaXMgaXMgYSB0b3VnaDxici8+XG4gICAgICAgICAgICAgICAgY2hhbGxlbmdlIGJ1dCBJIHNlZTxici8+XG4gICAgICAgICAgICAgICAgeW91ciBuZXcgRmxpcDxici8+XG4gICAgICAgICAgICAgICAgb24gdGhlIGhvcml6b24hPGJyLz5cbiAgICAgICAgICAgICAgICBMZXQncyBHbyFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKSxcbiAgICAgICAgdm86ICdUb3VnaENoYWxsZW5nZScsXG4gICAgICAgIHNmeDogJ0luZm9GcmFtZU1vdmUxJyxcbiAgICAgICAgYmFja2dyb3VuZEF1ZGlvOiAnQktHNScsXG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9mb3VyX2luZm9fc2NyZWVuLmpzIiwiaW1wb3J0IERyb3BwZXJHYW1lQ29tcG9uZW50IGZyb20gJy4vZHJvcHBlcl9nYW1lX2NvbXBvbmVudCc7XG5pbXBvcnQgZGVmYXVsdE9wdHMgZnJvbSAnLi9kZWZhdWx0X21hc3Rlcl9zb3J0ZXJfb3B0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gRHJvcHBlckdhbWVDb21wb25lbnQocHJvcHMsIHJlZiwga2V5LCBfLmRlZmF1bHRzKHtcbiAgICAgICAgbGV2ZWw6IDQsXG4gICAgICAgIHNjb3JlVG9XaW46IDI1MCxcbiAgICB9LCBkZWZhdWx0T3B0cykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYnJhcnkvZ2FtZS1ncmVlbi10ZWFtLWNoYWxsZW5nZS9jb21wb25lbnRzL21hc3Rlcl9zb3J0ZXJfbGV2ZWxfZm91cl9zY3JlZW4uanMiLCJpbXBvcnQgSW5mb1NjcmVlbkNvbXBvbmVudCBmcm9tICcuL2luZm9fc2NyZWVuX2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcmVmLCBrZXkpIHtcbiAgICByZXR1cm4gSW5mb1NjcmVlbkNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIHtcbiAgICAgICAgaWQ6ICdwcmljZWxlc3MtcG91cmVyLWZpdmUtaW5mbycsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSBhcmUgYWJvdXQgdG8gV2luPGJyLz5cbiAgICAgICAgICAgICAgICB0aGUgaGlnaGVzdCBob25vciBmb3IgdGhlPGJyLz5cbiAgICAgICAgICAgICAgICBHcmVlbiBUZWFtIENoYWxsZW5nZSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgV2luIHRoaXMgbGV2ZWwgdG8gYmVjb21lPGJyLz5cbiAgICAgICAgICAgICAgICBhIE1hc3RlciBTb3J0ZXIhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICksXG4gICAgICAgIHZvOiAnSGlnaGVzdEhvbm9yJyxcbiAgICAgICAgc2Z4OiAnSW5mb0ZyYW1lTW92ZTEnLFxuICAgICAgICBiYWNrZ3JvdW5kQXVkaW86ICdCS0c1JyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9tYXN0ZXJfc29ydGVyX2ZpdmVfaW5mb19zY3JlZW4uanMiLCJpbXBvcnQgRHJvcHBlckdhbWVDb21wb25lbnQgZnJvbSAnLi9kcm9wcGVyX2dhbWVfY29tcG9uZW50JztcbmltcG9ydCBkZWZhdWx0T3B0cyBmcm9tICcuL2RlZmF1bHRfbWFzdGVyX3NvcnRlcl9vcHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBEcm9wcGVyR2FtZUNvbXBvbmVudChwcm9wcywgcmVmLCBrZXksIF8uZGVmYXVsdHMoe1xuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgc2NvcmVUb1dpbjogMzAwLFxuICAgIH0sIGRlZmF1bHRPcHRzKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvbWFzdGVyX3NvcnRlcl9sZXZlbF9maXZlX3NjcmVlbi5qcyIsImltcG9ydCBJbmZvU2NyZWVuQ29tcG9uZW50IGZyb20gJy4vaW5mb19zY3JlZW5fY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByZWYsIGtleSkge1xuICAgIHJldHVybiBJbmZvU2NyZWVuQ29tcG9uZW50KHByb3BzLCByZWYsIGtleSwge1xuICAgICAgICBpZDogJ25vdy1hLW1lbWJlcicsXG4gICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIFlvdSBhcmUgbm93IGEgbWVtYmVyPGJyLz5cbiAgICAgICAgICAgICAgICBvZiB0aGUgR3JlZW4gVGVhbSE8YnIvPlxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgSXQncyB0aW1lIHRvIHNoYXJlPGJyLz5cbiAgICAgICAgICAgICAgICBpdCB3aXRoIHlvdXI8YnIvPlxuICAgICAgICAgICAgICAgIGZhbWlseSBhbmQgY29tbXVuaXR5IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApLFxuICAgICAgICB2bzogJ01lbWJlck9mR3JlZW5UZWFtJyxcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWJyYXJ5L2dhbWUtZ3JlZW4tdGVhbS1jaGFsbGVuZ2UvY29tcG9uZW50cy9ub3dfYV9tZW1iZXJfc2NyZWVuLmpzIiwiY2xhc3MgUXVpdFNjcmVlbiBleHRlbmRzIHNrb2FzaC5TY3JlZW4ge1xuICAgIG9rYXkoKSB7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdxdWl0Jyk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHNrb2FzaC50cmlnZ2VyKCdtZW51Q2xvc2UnLCB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQXNzZXRzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hc3NldHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFzc2V0cy5tYXAoKGFzc2V0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8c2tvYXNoLkF1ZGlvXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uYXNzZXQucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e2Fzc2V0LnJlZiB8fCBhc3NldC5wcm9wc1snZGF0YS1yZWYnXSB8fCAoJ2Fzc2V0LScgKyBrZXkpfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXJlZj17a2V5fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BzY3JlZW4gJHt0aGlzLmdldENsYXNzTmFtZXMoKX1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFzc2V0cygpfVxuICAgICAgICAgICAgICAgIDxza29hc2guQ29tcG9uZW50IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPkFyZSB5b3Ugc3VyZTxici8+eW91IHdhbnQgdG8gcXVpdD88L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInF1aXQteWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9rYXkuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicXVpdC1ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jYW5jZWwuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9za29hc2guQ29tcG9uZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoXG4gICAgPFF1aXRTY3JlZW5cbiAgICAgICAgaWQ9XCJxdWl0XCJcbiAgICAgICAgYXNzZXRzPXtbXG4gICAgICAgIF19XG4gICAgLz5cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGlicmFyeS9nYW1lLWdyZWVuLXRlYW0tY2hhbGxlbmdlL2NvbXBvbmVudHMvcXVpdF9zY3JlZW4uanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqa0JBO0FBQ0E7QUFEQTs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcENBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFpR0E7QUFDQTtBQURBO0FBR0E7QUF2R0E7QUFDQTtBQXVKQTs7Ozs7O0FDN05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUZBO0FBREE7QUFXQTs7OztBQWRBO0FBQ0E7QUFnQkE7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQVpBO0FBZUE7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUF6QkE7QUFzQ0E7QUFDQTtBQXhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDWkE7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQURBOzs7Ozs7Ozs7Ozs7OztBQzJMQTtBQUNBO0FBQ0E7QUFDQTs7O0FBaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ21DQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBZkE7QUFzQkE7QUFDQTtBQTdEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckNBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBdURBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQzZDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBSkE7QUFRQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFQQTtBQUhBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUE1Q0E7QUFtREE7QUFDQTtBQTVKQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQXhDQTtBQUNBO0FBaURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTs7Ozs7Ozs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBd0RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUFBOzs7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5DQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQURBOzs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQXNDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUFXQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBRkE7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQVpBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUZBO0FBekNBO0FBK0NBO0FBQ0E7QUFDQTtBQWhGQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQXJCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBVkE7QUF3QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFXQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBWEE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXRCQTtBQXlCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBV0E7QUFFQTtBQUZBO0FBaEJBO0FBcUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQWhCQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFYQTtBQTlIQTtBQTZJQTtBQUNBO0FBQ0E7QUE5T0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBUUE7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7Ozs7OztBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEhBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUhBO0FBTUE7OztBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFIQTtBQURBO0FBT0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFKQTtBQU9BOzs7O0FBaE5BO0FBQ0E7QUFtTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7Ozs7O0FDaE9BO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUxBO0FBTUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBdENBO0FBQ0E7QUF3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUhBO0FBTUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVRBO0FBY0E7Ozs7QUFyS0E7QUFDQTtBQXVLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhCQTtBQUNBO0FBa0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbE1BO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUxBO0FBTUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFoREE7QUFDQTtBQWtEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBOzs7Ozs7Ozs7Ozs7QUNYQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQUFBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFSQTtBQUpBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBaEJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQURBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFEQTtBQU9BO0FBQ0E7QUF6Q0E7QUEyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBeEJBO0FBMEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFEQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBMUJBO0FBNEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBc0JBO0FBdkRBO0FBeURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFwQkE7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFyUEE7Ozs7Ozs7Ozs7OztBQy9EQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBOzs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQWdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTs7Ozs7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBbUJBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUFBOzs7Ozs7Ozs7Ozs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzJDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBVEE7QUFjQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFUQTtBQWVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQXJDQTtBQTJDQTtBQUNBO0FBQ0E7QUEvRkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQU9BO0FBQ0E7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBREE7QUFEQTs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBRkE7QUFBQTtBQUNBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBUkE7QUFKQTtBQUFBO0FBQ0E7QUFlQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBUkE7QUFEQTtBQWNBO0FBQ0E7QUFwQkE7QUFDQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFMQTtBQURBO0FBV0E7QUFDQTtBQXRCQTtBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBN0NBO0FBMERBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTVOQTs7Ozs7Ozs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBQ0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBbEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFDQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFWQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFEQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFHQTtBQVBBO0FBREE7QUFXQTtBQWJBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQVJBO0FBREE7QUFjQTtBQUNBO0FBcEJBO0FBQ0E7QUFzQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFKQTtBQU1BO0FBQ0E7QUFEQTtBQUdBO0FBVkE7QUFEQTtBQWNBO0FBQ0E7QUEvQkE7QUFpQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUEzR0E7QUFDQTtBQURBO0FBNEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFSQTtBQURBO0FBWUE7QUF2SUE7QUF5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFmQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVBBO0FBY0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQTdGQTtBQWdHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzU0E7Ozs7Ozs7Ozs7OztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFDQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBQ0E7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBRkE7QUFUQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBd0JBO0FBQ0E7QUE1QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbUJBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBRkE7QUFBQTtBQUZBO0FBRkE7QUFMQTtBQUZBO0FBQUE7QUFDQTtBQXdCQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQVZBO0FBd0JBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSEE7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQWRBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBN0ZBO0FBREE7QUF6RUE7QUFDQTtBQURBO0FBZ0xBO0FBQ0E7QUFDQTtBQWxOQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFIQTtBQUlBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFPQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTs7Ozs7O0FDdkpBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQ0E7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQU9BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFNQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUZBO0FBS0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUZBO0FBT0E7Ozs7QUE3S0E7QUFDQTtBQStLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlMQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUhBO0FBREE7QUFPQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7O0FBcE1BO0FBQ0E7QUFzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTkE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQWtCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BOzs7O0FBM1BBO0FBQ0E7QUE2UEE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7Ozs7Ozs7Ozs7OztBQzFRQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFOQTtBQVFBO0FBVkE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBREE7QUFRQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoRUE7QUFrRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBUUE7QUFDQTtBQUZBO0FBUUE7QUFDQTtBQUZBO0FBcEhBOzs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBbkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUhBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFaQTtBQWNBO0FBQ0E7QUFsQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFwQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFBQTtBQU1BO0FBVkE7QUFZQTtBQUNBO0FBaEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFQQTtBQVVBO0FBQ0E7QUFoQkE7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQW5CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBVkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBUkE7QUFEQTtBQWNBO0FBQ0E7QUFwQkE7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQVJBO0FBSkE7QUFBQTtBQUNBO0FBZUE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFsQkE7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBRkE7QUFTQTtBQWxCQTtBQUNBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFLQTtBQUNBO0FBREE7QUFOQTtBQURBO0FBWUE7QUE3TEE7QUErTEE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBakJBO0FBbUJBO0FBMUJBO0FBQ0E7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBREE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqR0E7QUFtR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBdkNBO0FBb0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNVlBOzs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFGQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFRQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFXQTtBQUNBO0FBRkE7QUFVQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFTQTtBQUNBO0FBRkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUpBO0FBSkE7QUFGQTtBQW1CQTs7Ozs7Ozs7Ozs7O0FDL2FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBcEJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBSUE7QUFKQTtBQUtBO0FBTEE7QUFNQTtBQU5BO0FBQUE7QUFVQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBckJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0VBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBVEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUpBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFuQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFUQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFMQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQXBCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQVRBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBQUE7QUFTQTtBQVpBO0FBY0E7QUFDQTtBQWxCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBTkE7QUFMQTtBQWtCQTs7OztBQWpEQTtBQUNBO0FBb0RBO0FBQ0E7QUFDQTtBQUZBOzs7Iiwic291cmNlUm9vdCI6IiJ9